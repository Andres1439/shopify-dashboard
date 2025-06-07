import type { HeadersFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useRouteError } from "@remix-run/react";
import { boundary } from "@shopify/shopify-app-remix/server";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import { NavMenu } from "@shopify/app-bridge-react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";

import { authenticate } from "../shopify.server";
import prisma from "../db.server";
import { SubscriptionPlan, SubscriptionStatus } from '@prisma/client';

interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

const SHOP_DATA_QUERY = `
  query {
    shop {
      id
      name
      myshopifyDomain
      ianaTimezone
      currencyCode
      plan {
        displayName
      }
    }
  }
`;

export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

// Cache para los datos de la tienda
const shopCache = new Map();

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin, session } = await authenticate.admin(request);
  const shopDomain = session.shop;

  // Verificar si los datos están en caché y son recientes (menos de 5 minutos)
  const cachedData = shopCache.get(shopDomain);
  if (cachedData && Date.now() - cachedData.timestamp < 5 * 60 * 1000) {
    return json({ 
      apiKey: process.env.SHOPIFY_API_KEY || "",
      shop: cachedData.data 
    });
  }

  try {
    const shopDataResponse = await admin.graphql(SHOP_DATA_QUERY);
    const shopData = await shopDataResponse.json() as GraphQLResponse<{ shop: any }>;
    
    if (shopData.errors) {
      console.error("GraphQL Errors:", shopData.errors);
      throw new Error("Failed to fetch shop data");
    }
    
    const shop = shopData.data?.shop;
    if (!shop) {
      throw new Error("No shop data returned");
    }

    const accessToken = session.accessToken;

    const dataForUpsert = {
      where: { shop_domain: shopDomain },
      update: {
        shop_name: shop.name,
        access_token: accessToken,
        timezone: shop.ianaTimezone,
        currency: shop.currencyCode,
        updated_at: new Date(),
        last_active_at: new Date(),
      },
      create: {
        shop_domain: shopDomain,
        shop_name: shop.name,
        access_token: accessToken,
        subscription_plan: SubscriptionPlan.FREE,
        subscription_status: SubscriptionStatus.TRIALING,
        webhook_endpoints: {},
        timezone: shop.ianaTimezone,
        currency: shop.currencyCode,
        last_active_at: new Date(),
      },
    };

    await prisma.shops.upsert(dataForUpsert);

    // Guardar en caché
    const cacheData = {
      data: shop,
      timestamp: Date.now()
    };
    shopCache.set(shopDomain, cacheData);

    return json({ 
      apiKey: process.env.SHOPIFY_API_KEY || "",
      shop: shop 
    });

  } catch (error) {
    console.error("Error saving shop data:", error);
    // Retorna datos básicos incluso si hay error
    return json({ 
      apiKey: process.env.SHOPIFY_API_KEY || "",
      shop: null 
    });
  }
};

export default function App() {
  const { apiKey, shop } = useLoaderData<typeof loader>();

  return (
    <AppProvider isEmbeddedApp apiKey={apiKey}>
      <NavMenu>
        <Link to="/app" rel="home">
          Home
        </Link>
        <Link to="/app/productos">Productos</Link>
        <Link to="/app/ordenes">Órdenes</Link>
        <Link to="/app/chatbot">Chatbot</Link>
        <Link to="/app/pricing">Pricing</Link>
      </NavMenu>
      <Outlet context={{ shop }} />
    </AppProvider>
  );
}

export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers: HeadersFunction = (headersArgs) => {
  return boundary.headers(headersArgs);
};