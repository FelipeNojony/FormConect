import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Home from "./App/Pages/Home";
import FormPage from "./App/Pages/FormPages";
import BuilderPage from "./App/Pages/BuilderPage";
import AdminPage from "./App/Pages/AdminPage";
import BuilderPreviewPage from "./App/Pages/BuilderPreviewPage";
import PublishedFormPage from "./App/Pages/PublishedFormPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form/:id" element={<FormPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/builder" element={<BuilderPage />} />
        <Route path="/admin/builder/preview" element={<BuilderPreviewPage />} />
        <Route path="/form/publicado/:slug" element={<PublishedFormPage />} />
      </Routes>

      <Toaster position="top-right" richColors />
    </>
  );
}

export default App;