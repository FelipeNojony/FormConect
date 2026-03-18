import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";

import formRoutes from "./Routes/formRoutes.js";

dotenv.config();

const app = Fastify({
  logger: true,
});

await app.register(cors);
await app.register(formRoutes, { prefix: "/submit" });

try {
  await app.listen({ port: 3000 });
  console.log("Servidor rodando na porta 3000");
} catch (err) {
  app.log.error(err);
  process.exit(1);
}