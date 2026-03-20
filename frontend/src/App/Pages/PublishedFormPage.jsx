import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Components/Header";
import { toast } from "sonner";

const PUBLISHED_FORMS_KEY = "formconnect-published-forms";

export default function PublishedFormPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const form = useMemo(() => {
    const publishedForms = JSON.parse(
      localStorage.getItem(PUBLISHED_FORMS_KEY) || "[]"
    );

    return publishedForms.find((item) => item.slug === slug);
  }, [slug]);

  function handleChange(e) {
    const { name, type, value, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      console.log("Resposta do formulário publicado:", {
        slug,
        formData,
      });

      toast.success("Formulário enviado com sucesso!");
      setLoading(false);
    }, 1000);
  }

  function renderField(question) {
    switch (question.type) {
      case "text":
      case "email":
      case "date":
        return (
          <input
            type={question.type}
            name={question.id}
            value={formData[question.id] || ""}
            onChange={handleChange}
            placeholder={question.placeholder || ""}
            required={question.required}
            className="w-full rounded-xl bg-gray-100 px-4 py-4 text-gray-700 placeholder:text-gray-400 outline-none border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
          />
        );

      case "textarea":
        return (
          <textarea
            name={question.id}
            value={formData[question.id] || ""}
            onChange={handleChange}
            placeholder={question.placeholder || ""}
            required={question.required}
            className="w-full rounded-xl bg-gray-100 px-4 py-4 h-32 text-gray-700 placeholder:text-gray-400 outline-none border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition resize-none"
          />
        );

      case "choice":
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <label
                key={index}
                className="flex items-center gap-3 text-base text-gray-900 cursor-pointer"
              >
                <input
                  type="radio"
                  name={question.id}
                  value={option}
                  checked={formData[question.id] === option}
                  onChange={handleChange}
                  className="h-4 w-4 accent-black"
                />
                {option}
              </label>
            ))}
          </div>
        );

      default:
        return (
          <p className="text-sm text-red-500">
            Tipo de campo não suportado.
          </p>
        );
    }
  }

  if (!form) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-28 max-w-4xl mx-auto px-6">
          <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-950 mb-2">
              Formulário não encontrado
            </h1>
            <p className="text-gray-500">
              Esse formulário não existe ou ainda não foi publicado.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="pt-28 max-w-4xl mx-auto px-6 pb-12">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition mb-6"
        >
          <span className="text-lg">←</span>
          Voltar para a home
        </button>

        <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-8 md:p-10">
          <div className="mb-8">
            <span className="text-xs bg-blue-100 text-blue-600 px-4 py-2 rounded-full font-medium">
              Publicado
            </span>

            <h1 className="text-3xl font-bold text-gray-950 mt-4">
              {form.title}
            </h1>

            <p className="text-gray-500 text-lg mt-3">
              {form.description}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {form.questions.map((question, index) => (
              <div key={question.id} className="border-t border-gray-200 pt-6">
                <p className="text-xs text-gray-400 mb-2">
                  Pergunta {index + 1}
                </p>

                <h2 className="text-lg font-semibold text-gray-950 mb-3">
                  {question.title}
                  {question.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </h2>

                {question.description && (
                  <p className="text-sm text-gray-500 mb-4">
                    {question.description}
                  </p>
                )}

                {renderField(question)}
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Enviando...
                </>
              ) : (
                "Enviar formulário"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}