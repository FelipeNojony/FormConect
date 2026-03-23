import { savePublishedForm } from "../Services/formsService.js";

export async function publishForm(request, reply) {
  try {
    const payload = request.body;

    const result = await savePublishedForm(payload);

    return reply.status(200).send({
      message: "Formulário salvo com sucesso.",
      ...result,
    });
  } catch (error) {
    request.log.error(error);

    return reply.status(500).send({
      error: "Erro ao salvar formulário no Supabase.",
      details: error.message,
    });
  }
}