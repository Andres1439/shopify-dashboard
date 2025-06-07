import { useState } from "react";
import { TitleBar } from "@shopify/app-bridge-react";
import {
  Box,
  Card,
  Layout,
  Page,
  Text,
  BlockStack,
  Link as PolarisLink,
} from "@shopify/polaris";
import { json } from "@remix-run/node";

export const loader = async () => {
  // Placeholder loader - ajusta según necesites cargar datos para esta interfaz
  return json({ products: [] });
};

export default function ProductosPage() {
  const [productos] = useState([]); // Usar useLoaderData si se implementa un loader que devuelva productos

  return (
    <Page>
      <TitleBar title="Productos" />
      <div className="productos-container">
        <header className="productos-header">
          <div className="header-info">
            <h1 className="page-title">Productos</h1>
            <p className="page-description">Administre su inventario de productos en todas las tiendas</p>
          </div>
          <div className="filtros">
            <select className="select-filtro">
              <option value="">Todos los productos</option>
              <option value="activos">Activos</option>
              <option value="inactivos">Inactivos</option>
            </select>
          </div>
        </header>

        {productos.length === 0 ? (
          <div className="sin-datos">
            <p>Sin datos disponibles</p>
          </div>
        ) : (
          <div className="productos-grid">
            {/* Aquí irían los productos */}
          </div>
        )}

        <div className="estadisticas">
          <div className="estadistica-card">
            <h3>Total Productos</h3>
            <p className="numero">0</p>
          </div>
          <div className="estadistica-card">
            <h3>Productos Activos</h3>
            <p className="numero">0</p>
          </div>
          <div className="estadistica-card">
            <h3>Productos Inactivos</h3>
            <p className="numero">0</p>
          </div>
        </div>

        <div className="graficos">
          <div className="grafico-card">
            <h3>Distribución de Productos</h3>
            <div className="grafico-placeholder">
              <p>Gráfico de distribución</p>
            </div>
          </div>
          <div className="grafico-card">
            <h3>Tendencia de Productos</h3>
            <div className="grafico-placeholder">
              <p>Gráfico de tendencia</p>
            </div>
          </div>
        </div>

        <style>{`
          .productos-container {
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

          .productos-header {
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

          .select-filtro {
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

          .productos-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 2rem;
            margin-bottom: 3rem;
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
            .productos-header {
              flex-direction: column;
              align-items: stretch;
              gap: 1rem;
            }

            .filtros {
              flex-direction: column;
              align-items: stretch;
            }

            .select-filtro {
              width: 100%;
              min-width: 0;
            }

            .estadisticas {
              grid-template-columns: 1fr;
            }

            .graficos {
              grid-template-columns: 1fr;
            }

            .productos-container {
              padding: 1.5rem;
            }

            .estadistica-card, .grafico-card {
              padding: 2rem;
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