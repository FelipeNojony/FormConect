import axios from "axios";

export async function sendToMicrosoft(data) {
  const webhookUrl = process.env.WEBHOOK_URL;

  if (!webhookUrl) {
    throw new Error("WEBHOOK_URL não definida no .env");
  }

  await axios.post(webhookUrl, data);
}