import { LoaderFunctionArgs } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import prisma from "../db.server"; // Importar tu cliente de Prisma

// Consulta GraphQL para obtener los datos de la tienda
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

export async function loader({ request }: LoaderFunctionArgs) {
  console.log("--- auth.callback.tsx loader started ---");

  const { admin, session } = await authenticate.admin(request);

  console.log("Shopify authentication successful.");

  // Obtener información de la tienda usando GraphQL
  const shopDataResponse = await admin.graphql(SHOP_DATA_QUERY);
  const shopData = await shopDataResponse.json();

  console.log("Shop data from Shopify API:", JSON.stringify(shopData, null, 2));

  const shop = shopData.data.shop;
  const shopDomain = shop.myshopifyDomain;
  const accessToken = session.accessToken;

  const dataForUpsert = {
    where: { shop_domain: shopDomain },
    update: {
      shop_name: shop.name,
      access_token: accessToken, // Actualizar access token si cambia
      timezone: shop.timezone,
      currency: shop.currencyCode,
      updated_at: new Date(),
      last_active_at: new Date(),
    },
    create: {
      shop_domain: shopDomain,
      shop_name: shop.name,
      access_token: accessToken,
      subscription_plan: "FREE", // Asigna un plan por defecto
      subscription_status: "TRIALING", // Asigna un status por defecto
      webhook_endpoints: {}, // Objeto vacío o estructura por defecto
      timezone: shop.timezone,
      currency: shop.currencyCode,
      last_active_at: new Date(),
    },
  };

  console.log("Data prepared for prisma.shops.upsert:", JSON.stringify(dataForUpsert, null, 2));

  try {
    // Usar upsert para crear o actualizar la tienda
    const result = await prisma.shops.upsert(dataForUpsert);
    console.log("prisma.shops.upsert result:", result);
    console.log("Shop data saved successfully.");

  } catch (error) {
    console.error("Error saving shop data:", error);
    // Considerar cómo manejar errores de base de datos, tal vez redirigir a una página de error
  }

  console.log("--- auth.callback.tsx loader finished ---");

  // Redirigir a la página de inicio de la app después de la autenticación
  throw Response.redirect("/app");
} 