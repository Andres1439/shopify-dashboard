import { authenticate } from "../shopify.server";
import type { LoaderFunctionArgs } from "@remix-run/node";

interface Order {
  id: string;
  name: string;
  createdAt: string;
  displayFinancialStatus: string;
  totalPriceSet: {
    shopMoney: {
      amount: string;
      currencyCode: string;
    };
  };
}

export async function getOrders(request: LoaderFunctionArgs["request"]): Promise<Order[]> {
  const { admin } = await authenticate.admin(request);
  const response = await admin.graphql(`
    query {
      orders(first: 20) {
        edges {
          node {
            id
            name
            createdAt
            displayFinancialStatus
            totalPriceSet {
              shopMoney {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `);
  const data = await response.json();
  return (data.data.orders.edges as { node: Order }[]).map((edge) => edge.node);
} 