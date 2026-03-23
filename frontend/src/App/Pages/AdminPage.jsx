import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import { toast } from "sonner";

const EDITING_FORM_KEY = "formconnect-editing-form";

export default function AdminPage() {
  const navigate = useNavigate();
  const [publishedForms, setPublishedForms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("Todos");

  useEffect(() => {
    loadPublishedForms();
  }, []);

  async function loadPublishedForms() {
    try {
      const response = await fetch("http://localhost:3000/api/forms");
      const data = await response.json();
      setPublishedForms(data);
    } catch (error) {
      console.error("Erro ao carregar formulários:", error);
      toast.error("Erro ao carregar formulários");
    }
  }

  async function handleDeleteForm(slug) {
    toast.error("Exclusão pelo banco será o próximo passo.");
  }

  function handleEditForm(form) {
    localStorage.setItem(EDITING_FORM_KEY, JSON.stringify(form));
    navigate("/admin/builder");
  }

  function formatDate(dateString) {
    if (!dateString) return "Data não disponível";

    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  const availableTags = useMemo(() => {
    const tags = publishedForms.map((form) => form.tag || "Personalizado");
    return ["Todos", ...new Set(tags)];
  }, [publishedForms]);

  const filteredForms = useMemo(() => {
    return publishedForms.filter((form) => {
      const matchesSearch = form.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesTag =
        selectedTag === "Todos" || (form.tag || "Personalizado") === selectedTag;

      return matchesSearch && matchesTag;
    });
  }, [publishedForms, searchTerm, selectedTag]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <div className="max-w-6xl mx-auto px-6 pt-28 pb-12">
        <div className="mb-10">
          <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-medium">
            Admin
          </span>

          <h1 className="text-4xl font-bold text-gray-950 mt-4">
            Painel Administrativo
          </h1>

          <p className="text-gray-500 mt-3 text-lg max-w-2xl">
            Gerencie formulários publicados e acesse o builder para criar novos.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-3">
          <button
            onClick={() => navigate("/admin/builder")}
            className="bg-black text-white px-5 py-3 rounded-xl font-medium hover:opacity-90 transition"
          >
            Abrir Builder
          </button>

          <button
            onClick={() => navigate("/")}
            className="border border-gray-200 bg-white px-5 py-3 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            Ir para Home
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Resumo</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5">
              <p className="text-sm text-gray-500">Formulários publicados</p>
              <p className="text-3xl font-bold text-gray-950 mt-2">
                {publishedForms.length}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5">
              <p className="text-sm text-gray-500">Resultados filtrados</p>
              <p className="text-3xl font-bold text-gray-950 mt-2">
                {filteredForms.length}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5">
              <p className="text-sm text-gray-500">Modo</p>
              <p className="text-lg font-semibold text-gray-950 mt-2">
                Supabase
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-6">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Formulários publicados
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Visualize, filtre e gerencie os formulários criados no builder.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full lg:w-auto">
              <input
                type="text"
                placeholder="Buscar por título..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-72 rounded-xl bg-gray-100 px-4 py-3 outline-none border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="w-full md:w-52 rounded-xl bg-gray-100 px-4 py-3 outline-none border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                {availableTags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {filteredForms.length === 0 ? (
            <div className="text-center py-14">
              <p className="text-gray-500 text-lg">
                Nenhum formulário encontrado com os filtros atuais.
              </p>

              <button
                onClick={() => navigate("/admin/builder")}
                className="mt-5 bg-black text-white px-5 py-3 rounded-xl font-medium hover:opacity-90 transition"
              >
                Criar formulário
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredForms.map((form) => (
                <div
                  key={form.id}
                  className="border border-gray-200 rounded-2xl p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                        {form.tag || "Personalizado"}
                      </span>

                      <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
                        Publicado em {formatDate(form.created_at)}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-950">
                      {form.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {form.description}
                    </p>

                    <p className="text-xs text-gray-400 mt-3">
                      Slug: {form.slug}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => navigate(`/form/publicado/${form.slug}`)}
                      className="border border-gray-200 bg-white px-4 py-2 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                    >
                      Visualizar
                    </button>

                    <button
                      onClick={() => handleEditForm(form)}
                      className="border border-gray-200 bg-white px-4 py-2 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => navigate(`/admin/respostas/${form.slug}`)}
                      className="border border-gray-200 bg-white px-4 py-2 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                    >
                      Respostas
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}