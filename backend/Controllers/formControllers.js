import { sendToMicrosoft } from "../services/microsoftService.js";

export async function submitForm(request, reply) {
  try {
    const data = request.body;

    await sendToMicrosoft(data);

    console.log("Form enviado:", data);

    return reply.status(200).send({ message: "Sucesso" });
  } catch (error) {
    request.log.error(error);

    return reply.status(500).send({
      error: "Erro ao enviar formulário",
    });
  }
}