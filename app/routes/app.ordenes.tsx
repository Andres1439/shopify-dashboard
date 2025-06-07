import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { TitleBar } from "@shopify/app-bridge-react";
import {
  Box,
  Card,
  Layout,
  Page,
  Text,
  BlockStack,
  Link as PolarisLink,
  DataTable,
  Pagination,
} from "@shopify/polaris";
import { getOrders } from "../services/orders.server";
import { authenticate } from "../shopify.server";
import prisma from "../db.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin } = await authenticate.admin(request);
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = 10;
  const skip = (page - 1) * limit;

  // Obtener órdenes con paginación
  const [orders, totalOrders] = await Promise.all([
    prisma.orders.findMany({
      skip,
      take: limit,
      orderBy: { created_at: "desc" },
      select: {
        id: true,
        order_id: true,
        order_number: true,
        customer_email: true,
        total_price: true,
        status: true,
        created_at: true,
      },
    }),
    prisma.orders.count(),
  ]);

  return json({
    orders,
    pagination: {
      page,
      totalPages: Math.ceil(totalOrders / limit),
      totalOrders,
    },
  });
};

export default function OrdenesPage() {
  const { orders, pagination } = useLoaderData<typeof loader>();

  const rows = orders.map((order) => [
    order.order_number,
    order.customer_email,
    `$${order.total_price}`,
    order.status,
    new Date(order.created_at).toLocaleDateString(),
  ]);

  return (
    <Page>
      <TitleBar title="Órdenes" />
      <div className="ordenes-container">
        <header className="ordenes-header">
          <div className="header-info">
            <h1 className="page-title">Órdenes</h1>
            <p className="page-description">Rastrea y gestiona todos los pedidos de tus tiendas</p>
          </div>
          <div className="filtros">
            <select className="select-filtro">
              <option value="">Todas las órdenes</option>
              <option value="pendientes">Pendientes</option>
              <option value="completadas">Completadas</option>
              <option value="canceladas">Canceladas</option>
            </select>
            <input 
              type="date" 
              className="fecha-filtro"
              placeholder="Filtrar por fecha"
            />
          </div>
        </header>

        {orders.length === 0 ? (
          <div className="sin-datos">
            <p>Sin órdenes disponibles</p>
          </div>
        ) : (
          <div className="ordenes-grid">
            <DataTable
              columnContentTypes={["text", "text", "numeric", "text", "text"]}
              headings={["Número", "Cliente", "Total", "Estado", "Fecha"]}
              rows={rows}
            />
          </div>
        )}

        <div style={{ padding: "1rem", textAlign: "center" }}>
          <Pagination
            hasPrevious={pagination.page > 1}
            onPrevious={() => {
              const url = new URL(window.location.href);
              url.searchParams.set("page", String(pagination.page - 1));
              window.location.href = url.toString();
            }}
            hasNext={pagination.page < pagination.totalPages}
            onNext={() => {
              const url = new URL(window.location.href);
              url.searchParams.set("page", String(pagination.page + 1));
              window.location.href = url.toString();
            }}
          />
        </div>

        <div className="estadisticas">
          <div className="estadistica-card">
            <h3>Total Órdenes</h3>
            <p className="numero">{pagination.totalOrders}</p>
          </div>
          <div className="estadistica-card">
            <h3>Órdenes Pendientes</h3>
            <p className="numero">0</p>
          </div>
          <div className="estadistica-card">
            <h3>Órdenes Completadas</h3>
            <p className="numero">0</p>
          </div>
          <div className="estadistica-card">
            <h3>Valor Total</h3>
            <p className="numero">$0</p>
          </div>
        </div>

        <div className="graficos">
          <div className="grafico-card">
            <h3>Estado de Órdenes</h3>
            <div className="grafico-placeholder">
              <p>Gráfico de distribución por estado</p>
            </div>
          </div>
          <div className="grafico-card">
            <h3>Tendencia de Órdenes</h3>
            <div className="grafico-placeholder">
              <p>Gráfico de tendencia diaria</p>
            </div>
          </div>
        </div>

        <style>{`
          .ordenes-container {
            padding: 2rem;
            max-width: 1400px;
            margin: 0 auto;
          }

          .page-title {
            font-size: 2.2rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
            margin-top: 0;
          }

          .ordenes-header {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 3rem;
            flex-wrap: wrap;
            gap: 2rem;
          }

          .header-info {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
          }

          .page-description {
            color: #6b7280;
            font-size: 1.1rem;
            margin-top: 0;
            margin-bottom: 0;
          }

          .filtros {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
            align-items: center;
          }

          .select-filtro,
          .fecha-filtro {
            padding: 0.75rem 1.2rem;
            border: 1px solid #ddd;
            border-radius: 4px;
            background-color: white;
            min-width: 250px;
            font-size: 1.1rem;
          }

          .sin-datos {
            text-align: center;
            padding: 5rem;
            background-color: #f8f9fa;
            border-radius: 8px;
            color: #666;
            margin-bottom: 3rem;
            font-size: 1.4rem;
          }

          .ordenes-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 2rem;
            margin-bottom: 3rem;
          }

          .orden-card {
            background-color: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }

          .orden-card h4 {
            margin-top: 0;
            margin-bottom: 0.75rem;
            font-size: 1.2rem;
            color: #333;
          }

          .orden-card p {
            margin: 0.5rem 0;
            font-size: 1.1rem;
            color: #555;
          }

          .estadisticas {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin-bottom: 3rem;
          }

          .estadistica-card {
            background-color: white;
            padding: 2.5rem;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }

          .estadistica-card h3 {
            margin: 0;
            color: #666;
            font-size: 1.1rem;
          }

          .numero {
            font-size: 3rem;
            font-weight: bold;
            margin: 0.75rem 0 0;
            color: #333;
          }

          .graficos {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 2rem;
          }

          .grafico-card {
            background-color: white;
            padding: 2.5rem;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }

          .grafico-card h3 {
            margin: 0 0 1.5rem;
            color: #333;
            font-size: 1.3rem;
          }

          .grafico-placeholder {
            height: 300px;
            background-color: #f8f9fa;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #666;
            font-size: 1.2rem;
          }

          @media (max-width: 768px) {
            .ordenes-header {
              flex-direction: column;
              align-items: stretch;
              gap: 1rem;
            }

            .filtros {
              flex-direction: column;
              align-items: stretch;
            }

            .select-filtro,
            .fecha-filtro {
              width: 100%;
              min-width: 0;
            }

            .estadisticas {
              grid-template-columns: 1fr;
            }

            .graficos {
              grid-template-columns: 1fr;
            }

            .ordenes-container {
              padding: 1.5rem;
            }

            .orden-card, .estadistica-card, .grafico-card {
              padding: 2rem;
            }

            .orden-card h4 {
              font-size: 1.1rem;
            }

            .orden-card p {
              font-size: 1rem;
            }

            .numero {
              font-size: 2.5rem;
            }
            .grafico-placeholder {
              height: 250px;
            }
          }
        `}</style>
      </div>
    </Page>
  );
} 