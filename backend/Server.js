import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";

import FormsRoutes from "./Routes/FormsRoutes.js";
import ResponsesRoutes from "./Routes/ResponsesRoutes.js";

dotenv.config();

const app = Fastify({
  logger: true,
});

await app.register(cors);
await app.register(FormsRoutes, { prefix: "/api/forms" });
await app.register(ResponsesRoutes, { prefix: "/api/forms" });

try {
  await app.listen({ port: 3000 });
  console.log("Servidor rodando na porta 3000");
} catch (err) {
  app.log.error(err);
  process.exit(1);
}