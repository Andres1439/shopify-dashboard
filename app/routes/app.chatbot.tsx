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

export default function ChatbotPage() {
  const [config, setConfig] = useState({
    botName: "ShopBot",
    botPersonality: "Friendly",
    mensajeBienvenida: "¡Hola! ¿En qué puedo ayudarte hoy?",
    horarioAtencion: {
      inicio: "09:00",
      fin: "18:00",
      zonaHoraria: "America/Mexico_City"
    },
    respuestasAutomaticas: [
      { pregunta: "¿Cuánto cuesta el envío?", respuesta: "El envío es gratuito para compras mayores a $500" },
      { pregunta: "¿Cuánto tarda en llegar?", respuesta: "El tiempo de entrega es de 3-5 días hábiles" }
    ],
    estado: "activo"
  });

  const [nuevaRespuesta, setNuevaRespuesta] = useState({ pregunta: "", respuesta: "" });

  return (
    <Page>
      <TitleBar title="Chatbot" />
      <div className="chatbot-bg">
        <div className="chatbot-container">
          <header className="chatbot-header-main">
            <h1 className="chatbot-title">Chatbot</h1>
            <p className="chatbot-desc">Configura y gestiona tu chatbot de IA para atención al cliente.</p>
          </header>

          <div className="content-columns">
            <div className="left-column">
              <section className="chatbot-section-card">
                <h2 className="section-title">Configuración Básica</h2>
                <p className="section-description">Configura los ajustes básicos para tu chatbot.</p>
                <div className="settings-section">
                  <p className="settings-description">Habilita o deshabilita el chatbot en tus tiendas</p>
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      checked={config.estado === "activo"}
                      onChange={(e) => setConfig({...config, estado: e.target.checked ? "activo" : "inactivo"})}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="settings-fields">
                  <div className="settings-field">
                    <label htmlFor="botName">Nombre del Bot</label>
                    <input
                      type="text"
                      value={config.botName || "ShopBot"}
                      onChange={e => setConfig({...config, botName: e.target.value})}
                      placeholder="ShopBot"
                    />
                  </div>
                </div>
                <div className="settings-section">
                  <label className="settings-label">Mensaje de Bienvenida</label>
                  <textarea
                    className="settings-input"
                    value={config.mensajeBienvenida}
                    onChange={e => setConfig({...config, mensajeBienvenida: e.target.value})}
                    rows={4}
                    placeholder="¡Hola! ¿En qué puedo ayudarte hoy?"
                  />
                </div>
              </section>
            </div>

            <div className="right-column">
              <section className="chatbot-section-card">
                <h2 className="section-title">Tickets Creados</h2>
                 <p className="section-description">Información sobre los tickets de soporte generados por el chatbot.</p>
                 <div className="tickets-info">
                   <div className="ticket-item">
                     <p><strong>Ticket ID:</strong> #T12345</p>
                     <p><strong>Motivo:</strong> Problema con pedido</p>
                     <p><strong>Fecha:</strong> 2023-10-27</p>
                   </div>
                   <div className="ticket-item">
                     <p><strong>Ticket ID:</strong> #T12346</p>
                     <p><strong>Motivo:</strong> Consulta de producto</p>
                     <p><strong>Fecha:</strong> 2023-10-27</p>
                   </div>
                    <div className="ticket-item">
                     <p><strong>Ticket ID:</strong> #T12347</p>
                     <p><strong>Motivo:</strong> Información de envío</p>
                     <p><strong>Fecha:</strong> 2023-10-27</p>
                   </div>
                 </div>
              </section>
            </div>
          </div>

          <section className="chatbot-section-card">
            <h2 className="section-title">Métricas del Chatbot</h2>
            <p className="section-description">Monitoriza el rendimiento de tu chatbot en tiempo real.</p>
            <div className="chatbot-metrics-grid">
              <div className="metric-card">
                <h3>Total de Conversaciones</h3>
                <div className="metric-value">1,234</div>
                <div className="metric-sub">+20.1% desde el mes pasado</div>
              </div>
              <div className="metric-card">
                <h3>Tasa de Resolución</h3>
                <div className="metric-value">87%</div>
                <div className="metric-sub">+5.2% desde el mes pasado</div>
              </div>
              <div className="metric-card">
                <h3>Tiempo Promedio de Respuesta</h3>
                <div className="metric-value">1.2s</div>
                <div className="metric-sub">-0.3s desde el mes pasado</div>
              </div>
            </div>
          </section>
        </div>
        <style>{`
          .chatbot-bg {
            min-height: 100vh;
            padding: 2rem 0;
          }
          .chatbot-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
            display: flex;
            flex-direction: column;
            gap: 2rem;
          }
          .chatbot-header-main {
            margin-bottom: 0;
          }
          .chatbot-title {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
            margin-top: 0;
          }
          .chatbot-desc {
            color: #6b7280;
            font-size: 1.08rem;
            margin-bottom: 0;
            margin-top: 0;
          }
           .chatbot-section-card {
            background: #fff;
            border-radius: 16px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.06);
            padding: 2rem;
          }
          .content-columns {
            display: flex;
            gap: 3rem;
            flex-wrap: wrap;
          }
          .left-column, .right-column {
            flex: 1;
          }
          .left-column > .chatbot-section-card, 
          .right-column > .chatbot-section-card {
            height: 100%;
            display: flex;
            flex-direction: column;
          }
          @media (max-width: 768px) {
             .left-column, .right-column {
               width: 100%;
                flex-basis: auto;
             }
           }
          .section-title {
             font-size: 1.4rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
          }
          .section-description {
            color: #6b7280;
            font-size: 1rem;
            margin-bottom: 1.5rem;
          }
          .settings-title {
             font-size: 1.2rem;
            font-weight: 600;
            margin-bottom: 0.2rem;
          }
          .settings-subtitle {
            color: #6b7280;
            font-size: 1rem;
            margin-bottom: 1.5rem;
          }
          .settings-section {
            margin-bottom: 1.5rem;
            padding-bottom: 1.5rem;
            border-bottom: 1px solid #eee;
          }
          .content-columns .left-column section > .settings-section:last-child {
             border-bottom: none;
             padding-bottom: 0;
          }
          .settings-label {
            font-weight: 500;
            display: block;
            margin-bottom: 0.5rem;
            color: #333;
          }
          .settings-description {
            color: #6b7280;
            font-size: 0.95rem;
            margin-bottom: 1rem;
          }
          .settings-fields {
          }
          .settings-field {
            margin-bottom: 1.5rem;
          }
           .settings-field:last-child {
             margin-bottom: 0;
          }
          .settings-input,
          .settings-field input[type="text"],
          .settings-field textarea {
            width: 100%;
            padding: 0.75rem 1rem;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 1rem;
            line-height: 1.5;
            margin-bottom: 0;
            background: #fff;
            box-sizing: border-box;
            font-family: inherit;
            color: #333;
          }
          .settings-input:focus,
          .settings-field input[type="text"]:focus,
          .settings-field textarea:focus {
            outline: 2px solid #2563eb;
            border-color: #2563eb;
          }
          .settings-section .switch {
             margin-top: 0;
             margin-bottom: 0;
             display: block;
          }
           .settings-section > .settings-description:first-child {
              margin-top: 0;
           }
          .switch {
            position: relative;
            display: inline-block;
            width: 44px;
            height: 24px;
            margin-top: 0.3rem;
          }
          .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            transition: .4s;
            border-radius: 24px;
          }
          .slider:before {
            position: absolute;
            content: "";
            height: 18px;
            width: 18px;
            left: 3px;
            bottom: 3px;
            background-color: white;
            transition: .4s;
            border-radius: 50%;
          }
          input:checked + .slider {
            background-color: #2563eb;
          }
          input:checked + .slider:before {
            transform: translateX(20px);
          }
          .chatbot-metrics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
          }
          .metric-card {
            background: #fff;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.04);
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
          }
          .metric-card h3 {
            font-size: 1rem;
            font-weight: 500;
            color: #6b7280;
            margin-top: 0;
            margin-bottom: 0.5rem;
          }
          .metric-value {
            font-size: 2rem;
            font-weight: 700;
            color: #333;
            margin-bottom: 0.5rem;
            margin-top: 0.5rem;
          }
          .metric-sub {
            font-size: 0.9rem;
            color: #6b7280;
            white-space: normal;
            margin-top: 0.5rem;
          }
          .tickets-info {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
          .ticket-item {
            border: 1px solid #eee;
            border-radius: 8px;
            padding: 1rem;
            background-color: #fafafa;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }
          .ticket-item p {
            margin: 0;
            font-size: 1rem;
            line-height: 1.4;
            color: #555;
            font-family: inherit;
          }
          .ticket-item strong {
            color: #333;
            font-weight: 600;
            margin-right: 0.5rem;
          }
          .switch input {
            opacity: 0;
            width: 0;
            height: 0;
          }
        `}</style>
      </div>
    </Page>
  );
} 