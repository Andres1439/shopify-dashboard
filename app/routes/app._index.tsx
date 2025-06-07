import { useEffect } from "react";
import type { ActionFunctionArgs, LoaderFunctionArgs, LoaderFunction } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import {
  Page,
  Layout,
  Text,
  Card,
  Button,
  BlockStack,
  Box,
  List,
  Link,
  InlineStack,
  Grid,
  Icon,
} from "@shopify/polaris";
import { TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";
import { redirect } from "@remix-run/node";
import { XCircleIcon, OrderIcon, ProductIcon, ChatIcon, CircleLeftIcon, PhoneIcon } from '@shopify/polaris-icons';


export const action = async ({ request }: ActionFunctionArgs) => {
  const { admin } = await authenticate.admin(request);
  const color = ["Red", "Orange", "Yellow", "Green"][
    Math.floor(Math.random() * 4)
  ];
  const response = await admin.graphql(
    `#graphql
      mutation populateProduct($product: ProductCreateInput!) {
        productCreate(product: $product) {
          product {
            id
            title
            handle
            status
            variants(first: 10) {
              edges {
                node {
                  id
                  price
                  barcode
                  createdAt
                }
              }
            }
          }
        }
      }`,
    {
      variables: {
        product: {
          title: `${color} Snowboard`,
        },
      },
    },
  );
  const responseJson = await response.json();

  const product = responseJson.data!.productCreate!.product!;
  const variantId = product.variants.edges[0]!.node!.id!;

  const variantResponse = await admin.graphql(
    `#graphql
    mutation shopifyRemixTemplateUpdateVariant($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
      productVariantsBulkUpdate(productId: $productId, variants: $variants) {
        productVariants {
          id
          price
          barcode
          createdAt
        }
      }
    }`,
    {
      variables: {
        productId: product.id,
        variants: [{ id: variantId, price: "100.00" }],
      },
    },
  );

  const variantResponseJson = await variantResponse.json();

  return {
    product: responseJson!.data!.productCreate!.product,
    variant:
      variantResponseJson!.data!.productVariantsBulkUpdate!.productVariants,
  };
};

export default function IndexPage() {
  return (
    <Page>
      <TitleBar title="Verify COD Orders" />
      <BlockStack gap="500">
        {/* Sección de Bienvenida y Introducción */}
        <Card>
          <BlockStack gap="300">
            <Text as="h2" variant="headingLg">
              Bienvenido a Verify COD Orders
            </Text>
            <Text as="p" variant="bodyMd">
              Optimiza la gestión de tus pedidos Contra Entrega (COD) y mejora la comunicación con tus clientes.
              Nuestra aplicación te ayuda a reducir devoluciones, agilizar el proceso de entrega y obtener información valiosa sobre tus operaciones.
            </Text>
          </BlockStack>
        </Card>

        {/* Sección de Navegación Principal */}
        <Card>
          <BlockStack gap="500">
            <Text as="h3" variant="headingMd">
              Acceso Rápido
            </Text>
            <Grid>
              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                <Button
                  fullWidth
                  size="large"
                  variant="primary"
                  url="/app/productos"
                  icon={ProductIcon}
                >
                  Productos
                </Button>
              </Grid.Cell>

              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                <Button
                  fullWidth
                  size="large"
                  variant="primary"
                  url="/app/ordenes"
                  icon={OrderIcon}
                >
                  Órdenes
                </Button>
              </Grid.Cell>

              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                <Button
                  fullWidth
                  size="large"
                  variant="primary"
                  url="/app/chatbot"
                  icon={ChatIcon}
                >
                  Chatbot
                </Button>
              </Grid.Cell>

              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                <Button
                  fullWidth
                  size="large"
                  variant="primary"
                  url="/app/pricing"
                  icon={XCircleIcon}
                >
                  Planes
                </Button>
              </Grid.Cell>
            </Grid>
          </BlockStack>
        </Card>

        {/* Sección de Características Clave */}
        <Card>
          <BlockStack gap="500">
            <Text as="h3" variant="headingMd">
              Características Clave
            </Text>
            <Grid>
              {/* Característica 1: Análisis de Métricas */}
              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                 <BlockStack gap="200">
                   <Icon
                    source={CircleLeftIcon}
                    tone="base"
                  />
                  <Text as="h4" variant="headingSm">
                    Análisis e Informes
                  </Text>
                  <Text as="p" variant="bodyMd">
                    Accede a métricas clave para entender el rendimiento de tus operaciones COD.
                  </Text>
                </BlockStack>
              </Grid.Cell>

              {/* Característica 2: Chatbot Integrado */}
              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                 <BlockStack gap="200">
                   <Icon
                    source={ChatIcon}
                    tone="base"
                  />
                  <Text as="h4" variant="headingSm">
                    Chatbot de Soporte
                  </Text>
                  <Text as="p" variant="bodyMd">
                    Utiliza un chatbot para responder preguntas frecuentes y gestionar tickets de clientes.
                  </Text>
                </BlockStack>
              </Grid.Cell>

               {/* Nueva Característica: Llamadas con IA */}
              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                 <BlockStack gap="200">
                   <Icon
                    source={PhoneIcon}
                    tone="base"
                  />
                  <Text as="h4" variant="headingSm">
                    Llamadas con IA
                  </Text>
                  <Text as="p" variant="bodyMd">
                    Permite la verificación automática de pedidos mediante llamadas potenciadas por inteligencia artificial.
                  </Text>
                </BlockStack>
              </Grid.Cell>

              {/* Nueva Característica: Atención por WhatsApp (reutilizando ChatIcon)*/}
              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                 <BlockStack gap="200">
                   <Icon
                    source={ChatIcon} // Reutilizando ChatIcon
                    tone="base"
                   />
                   <Text as="h4" variant="headingSm">
                     Atención por WhatsApp
                   </Text>
                   <Text as="p" variant="bodyMd">
                     Ofrece a tus clientes la opción de interactuar y verificar pedidos directamente por WhatsApp.
                   </Text>
                 </BlockStack>
              </Grid.Cell>

            </Grid>
          </BlockStack>
        </Card>

        {/* Puedes añadir más secciones como testimonios, un llamado a la acción, etc. */}

      </BlockStack>
    </Page>
  );
}
