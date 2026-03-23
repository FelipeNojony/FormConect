import {
  submitFormResponse,
  listFormResponses,
} from "../Controllers/responsesController.js";

export default async function ResponsesRoutes(app) {
  app.post("/:slug/responses", submitFormResponse);
  app.get("/:slug/responses", listFormResponses);
}