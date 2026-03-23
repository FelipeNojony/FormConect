import {
  saveFormResponse,
  getResponsesByFormSlug,
} from "../Services/responsesService.js";

export async function submitFormResponse(request, reply) {
  try {
    const { slug } = request.params;
    const { answers } = request.body;

    const metadata = {
      userAgent: request.headers["user-agent"] || null,
    };

    const result = await saveFormResponse({
      slug,
      answers,
      metadata,
    });

    return reply.status(200).send({
      message: "Resposta salva com sucesso.",
      ...result,
    });
  } catch (error) {
    request.log.error(error);

    return reply.status(500).send({
      error: "Erro ao salvar resposta.",
      details: error.message,
    });
  }
}

export async function listFormResponses(request, reply) {
  try {
    const { slug } = request.params;

    const result = await getResponsesByFormSlug(slug);

    return reply.status(200).send(result);
  } catch (error) {
    request.log.error(error);

    return reply.status(404).send({
      error: "Erro ao buscar respostas.",
      details: error.message,
    });
  }
}