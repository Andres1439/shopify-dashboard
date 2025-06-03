import { useState } from "react";

export default function Productos() {
  const [productos] = useState([]); // Aquí se conectaría con la API de Shopify

  return (
    <div className="productos-container">
      <header className="productos-header">
        <div className="header-info">
          <h1>Productos</h1>
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
          padding: 1rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .productos-header {
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

        .select-filtro {
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

        .productos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
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
          .productos-header {
            flex-direction: column; /* Apila en móvil */
            align-items: stretch;
            gap: 1rem; /* Espacio entre elementos apilados */
          }

          .filtros {
            flex-direction: column; /* Apila filtros en móvil */
            align-items: stretch;
          }

          .select-filtro {
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