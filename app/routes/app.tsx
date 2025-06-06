import type { HeadersFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useRouteError } from "@remix-run/react";
import { boundary } from "@shopify/shopify-app-remix/server";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import { NavMenu } from "@shopify/app-bridge-react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";

import { authenticate } from "../shopify.server";
import prisma from "../db.server";

const SHOP_DATA_QUERY = `
  query {
    shop {
      id
      name
      myshopifyDomain
      timezone
      currencyCode
      plan {
        displayName
      }
    }
  }
`;

export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  console.log("--- app/routes/app.tsx loader started ---");

  const { admin, session } = await authenticate.admin(request);

  console.log("Shopify authentication successful in app.tsx loader.");

  try {
    const shopDataResponse = await admin.graphql(SHOP_DATA_QUERY);
    const shopData = await shopDataResponse.json();

    console.log("Shop data from Shopify API (in app.tsx loader):");
    // console.log(JSON.stringify(shopData, null, 2)); // Descomentar para ver la data completa

    const shop = shopData.data.shop;
    const shopDomain = shop.myshopifyDomain;
    const accessToken = session.accessToken;

    const dataForUpsert = {
      where: { shop_domain: shopDomain },
      update: {
        shop_name: shop.name,
        access_token: accessToken,
        timezone: shop.timezone,
        currency: shop.currencyCode,
        updated_at: new Date(),
        last_active_at: new Date(),
      },
      create: {
        shop_domain: shopDomain,
        shop_name: shop.name,
        access_token: accessToken,
        subscription_plan: "FREE",
        subscription_status: "TRIALING",
        webhook_endpoints: {}, 
        timezone: shop.timezone,
        currency: shop.currencyCode,
        last_active_at: new Date(),
      },
    };

    // console.log("Data prepared for prisma.shops.upsert (in app.tsx loader):");
    // console.log(JSON.stringify(dataForUpsert, null, 2)); // Descomentar para ver la data completa

    const result = await prisma.shops.upsert(dataForUpsert);
    console.log("prisma.shops.upsert result (in app.tsx loader):");
    // console.log(result); // Descomentar para ver el resultado completo
    console.log("Shop data saved successfully (in app.tsx loader).");

  } catch (error) {
    console.error("Error saving shop data (in app.tsx loader):", error);
  }

  console.log("--- app/routes/app.tsx loader finished ---");

  return json({ apiKey: process.env.SHOPIFY_API_KEY || "" });
};

export default function App() {
  const { apiKey } = useLoaderData<typeof loader>();

  return (
    <AppProvider isEmbeddedApp apiKey={apiKey}>
      <NavMenu>
        <Link to="/app" rel="home">
          Home
        </Link>
        <Link to="/app/additional">Additional page</Link>
      </NavMenu>
      <Outlet />
    </AppProvider>
  );
}

export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers: HeadersFunction = (headersArgs) => {
  return boundary.headers(headersArgs);
};
