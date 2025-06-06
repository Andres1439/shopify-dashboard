import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getOrders } from "../services/orders.server";

export const loader = async ({ request }) => {
  try {
    const orders = await getOrders(request);
    return json({ orders });
  } catch (error) {
    console.error("Error obteniendo órdenes:", error);
    return json({ orders: [] });
  }
};

export default function Ordenes() {
  const { orders } = useLoaderData();

  return (
    <div className="ordenes-container">
      <header className="ordenes-header">
        <div className="header-info">
          <h1>Órdenes</h1>
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
          {orders.map(order => (
            <div key={order.id} className="orden-card">
              <h4>{order.name}</h4>
              <p>Estado: {order.displayFinancialStatus}</p>
              <p>Fecha: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>Total: {order.totalPriceSet.shopMoney.amount} {order.totalPriceSet.shopMoney.currencyCode}</p>
            </div>
          ))}
        </div>
      )}

      <div className="estadisticas">
        <div className="estadistica-card">
          <h3>Total Órdenes</h3>
          <p className="numero">0</p>
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
          padding: 1rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .ordenes-header {
          display: flex;
          flex-direction: row; /* En escritorio, alinear en fila */
          justify-content: space-between; /* Distribuye espacio entre los elementos */
          align-items: flex-start; /* Alinea los elementos al inicio del eje cruzado (arriba) */
          margin-bottom: 2rem;
          flex-wrap: wrap; /* Permite que los elementos se envuelvan en pantallas pequeñas */
          gap: 1rem; /* Espacio entre los bloques de info y filtros */
        }

        .header-info {
          display: flex;
          flex-direction: column; /* Apila título y descripción verticalmente */
          gap: 0.3rem; /* Espacio entre título y descripción */
        }

        .page-description {
          color: #6b7280;
          font-size: 1rem;
          margin-top: 0;
          margin-bottom: 0; /* Espacio controlado por el gap del padre */
        }

        .filtros {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          align-items: center;
        }

        .select-filtro,
        .fecha-filtro {
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          background-color: white;
          min-width: 200px;
        }

        .sin-datos {
          text-align: center;
          padding: 3rem;
          background-color: #f8f9fa;
          border-radius: 8px;
          color: #666;
          margin-bottom: 2rem;
        }

        .ordenes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .estadisticas {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .estadistica-card {
          background-color: white;
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .estadistica-card h3 {
          margin: 0;
          color: #666;
          font-size: 0.9rem;
        }

        .numero {
          font-size: 2rem;
          font-weight: bold;
          margin: 0.5rem 0 0;
          color: #333;
        }

        .graficos {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1rem;
        }

        .grafico-card {
          background-color: white;
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .grafico-card h3 {
          margin: 0 0 1rem;
          color: #333;
        }

        .grafico-placeholder {
          height: 200px;
          background-color: #f8f9fa;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #666;
        }

        @media (max-width: 768px) {
          .ordenes-header {
            flex-direction: column; /* Apila en móvil */
            align-items: stretch;
            gap: 1rem; /* Espacio entre elementos apilados */
          }

          .filtros {
            flex-direction: column; /* Apila filtros en móvil */
            align-items: stretch;
          }

          .select-filtro,
          .fecha-filtro {
            width: 100%;
          }

          .estadisticas {
            grid-template-columns: 1fr;
          }

          .graficos {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
} 