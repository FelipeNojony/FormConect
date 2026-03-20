import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import { toast } from "sonner";

const STORAGE_KEY = "formconnect-builder-data";

export default function BuilderPreviewPage() {
  const navigate = useNavigate();

  const [builderData] = useState(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);

    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (error) {
        console.error("Erro ao carregar preview:", error);
      }
    }

    return {
      title: "Formulário não encontrado",
      description: "Nenhum formulário foi salvo ainda.",
      questions: [],
    };
  });

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

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
      console.log("Respostas do preview:", formData);
      toast.success("Preview enviado com sucesso!");
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
            placeholder={question.placeholder || ""}
            required={question.required}
            value={formData[question.id] || ""}
            onChange={handleChange}
            className="w-full rounded-xl bg-gray-100 px-4 py-4 text-gray-700 placeholder:text-gray-400 outline-none border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
          />
        );

      case "textarea":
        return (
          <textarea
            name={question.id}
            placeholder={question.placeholder || ""}
            required={question.required}
            value={formData[question.id] || ""}
            onChange={handleChange}
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
            Tipo de campo não suportado no preview.
          </p>
        );
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="pt-28 max-w-4xl mx-auto px-6 pb-12">
        <button
          onClick={() => navigate("/admin/builder")}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition mb-6"
        >
          <span className="text-lg">←</span>
          Voltar para o builder
        </button>

        <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-8 md:p-10">
          <div className="mb-8">
            <span className="text-xs bg-blue-100 text-blue-600 px-4 py-2 rounded-full font-medium">
              Preview
            </span>

            <h1 className="text-3xl font-bold text-gray-950 mt-4">
              {builderData.title}
            </h1>

            <p className="text-gray-500 text-lg mt-3">
              {builderData.description}
            </p>
          </div>

          {builderData.questions.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">
                Nenhuma pergunta foi adicionada ao formulário ainda.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {builderData.questions.map((question, index) => (
                <div key={question.id} className="border-t border-gray-200 pt-6">
                  <div className="mb-4">
                    <p className="text-xs text-gray-400 mb-2">
                      Pergunta {index + 1}
                    </p>

                    <h2 className="text-lg font-semibold text-gray-950">
                      {question.title || "Sem título"}
                      {question.required && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </h2>

                    {question.description && (
                      <p className="text-sm text-gray-500 mt-2">
                        {question.description}
                      </p>
                    )}
                  </div>

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
                  "Enviar Preview"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}