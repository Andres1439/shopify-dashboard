import { LoaderFunctionArgs } from "@remix-run/node";
import { authenticate } from "../shopify.server";

export async function loader({ request }: LoaderFunctionArgs) {
  await authenticate.admin(request);

  // Redirigir a la página de inicio de la app después de la autenticación
  throw Response.redirect("/app");
} 