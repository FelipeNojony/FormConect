export default async function formRoutes(app, options) {
  app.post("/", async (request, reply) => {
    try {
      const data = request.body;

      console.log("Form recebido:", data);

      return { message: "Sucesso" };
    } catch (error) {
      reply.status(500).send({ error: "Erro ao enviar formulário" });
    }
  });
}