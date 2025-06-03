import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Sidebar } from "./components/Sidebar";

export default function App() {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="preconnect" href="https://cdn.shopify.com/" />
        <link
          rel="stylesheet"
          href="https://cdn.shopify.com/static/fonts/inter/v4/styles.css"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="app-container">
          <Sidebar />
          <main className="main-content">
            <Outlet />
          </main>
        </div>
        <style>{`
          body {
            margin: 0;
            padding: 0;
            font-family: 'Inter', sans-serif;
          }

          .app-container {
            display: flex;
            min-height: 100vh;
          }

          .main-content {
            flex: 1;
            margin-left: 220px;
            padding: 2rem;
            transition: margin-left 0.3s ease;
          }

          @media (max-width: 1200px) {
            .main-content {
              margin-left: 50px;
            }
          }

          @media (max-width: 768px) {
            .main-content {
              margin-left: 50px;
            }
          }
        `}</style>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
