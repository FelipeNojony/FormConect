import {
  publishForm,
  listPublishedForms,
  getFormBySlug,
} from "../Controllers/formControllers.js";

export default async function FormsRoutes(app) {
  app.post("/publish", publishForm);
  app.get("/", listPublishedForms);
  app.get("/:slug", getFormBySlug);
}