import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Components/Header";

export default function ResponsesPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [responses, setResponses] = useState([]);
  const [totalResponses, setTotalResponses] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResponses() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/forms/${slug}/responses`
        );

        if (!response.ok) {
          throw new Error("Erro ao buscar respostas");
        }

        const data = await response.json();

        setForm(data.form);
        setResponses(data.responses || []);
        setTotalResponses(data.totalResponses || 0);
      } catch (error) {
        console.error(error);
        setForm(null);
        setResponses([]);
        setTotalResponses(0);
      } finally {
        setLoading(false);
      }
    }

    fetchResponses();
  }, [slug]);

  function formatDate(dateString) {
    if (!dateString) return "Data não disponível";

    return new Date(dateString).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <div className="max-w-6xl mx-auto px-6 pt-28 pb-12">
        <button
          onClick={() => navigate("/admin")}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition mb-6"
        >
          <span className="text-lg">←</span>
          Voltar para o painel
        </button>

        {loading ? (
          <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-8 text-center">
            <p className="text-gray-500">Carregando respostas...</p>
          </div>
        ) : !form ? (
          <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-950 mb-2">
              Formulário não encontrado
            </h1>
            <p className="text-gray-500">
              Não foi possível carregar as respostas deste formulário.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-medium">
                Respostas
              </span>

              <h1 className="text-4xl font-bold text-gray-950 mt-4">
                {form.title}
              </h1>

              <p className="text-gray-500 mt-3 text-lg max-w-2xl">
                {form.description || "Visualize as respostas recebidas para este formulário."}
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Resumo</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5">
                  <p className="text-sm text-gray-500">Total de respostas</p>
                  <p className="text-3xl font-bold text-gray-950 mt-2">
                    {totalResponses}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5">
                  <p className="text-sm text-gray-500">Slug</p>
                  <p className="text-lg font-semibold text-gray-950 mt-2 break-all">
                    {form.slug}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5">
                  <p className="text-sm text-gray-500">Tipo</p>
                  <p className="text-lg font-semibold text-gray-950 mt-2">
                    {form.tag || "Personalizado"}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-6">
              <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Lista de respostas
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Todas as submissões recebidas para este formulário.
                  </p>
                </div>
              </div>

              {responses.length === 0 ? (
                <div className="text-center py-14">
                  <p className="text-gray-500 text-lg">
                    Nenhuma resposta recebida ainda.
                  </p>
                </div>
              ) : (
                <div className="space-y-5">
                  {responses.map((response, index) => (
                    <div
                      key={response.id}
                      className="border border-gray-200 rounded-2xl p-5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-950">
                            Resposta #{responses.length - index}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            Enviada em {formatDate(response.createdAt)}
                          </p>
                        </div>

                        <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
                          {form.title}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(response.answers || {}).map(
                          ([questionTitle, answerValue]) => (
                            <div
                              key={questionTitle}
                              className="rounded-2xl bg-slate-50 border border-slate-200 p-4"
                            >
                              <p className="text-sm font-medium text-gray-900 mb-2">
                                {questionTitle}
                              </p>

                              <p className="text-sm text-gray-600 break-words">
                                {typeof answerValue === "boolean"
                                  ? answerValue
                                    ? "Sim"
                                    : "Não"
                                  : answerValue || "—"}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}