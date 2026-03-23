import {
  savePublishedForm,
  getPublishedForms,
  getPublishedFormBySlug,
} from "../Services/formsService.js";

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

export async function listPublishedForms(request, reply) {
  try {
    const forms = await getPublishedForms();

    return reply.status(200).send(forms);
  } catch (error) {
    request.log.error(error);

    return reply.status(500).send({
      error: "Erro ao buscar formulários.",
      details: error.message,
    });
  }
}

export async function getFormBySlug(request, reply) {
  try {
    const { slug } = request.params;

    const form = await getPublishedFormBySlug(slug);

    return reply.status(200).send(form);
  } catch (error) {
    request.log.error(error);

    return reply.status(404).send({
      error: "Formulário não encontrado.",
      details: error.message,
    });
  }
}