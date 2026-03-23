import { useEffect, useState } from "react";
import Header from "../../App/Components/Header";
import FormCard from "../../App/Components/FormCard";

export default function Home() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchForms() {
      try {
        const response = await fetch("http://localhost:3000/api/forms");
        const data = await response.json();

        const formattedForms = data.map((form) => ({
          id: form.id,
          slug: form.slug,
          title: form.title,
          description: form.description,
          tag: form.tag || "Personalizado",
          fields: form.fields || 0,
          isPublished: true,
        }));

        setForms(formattedForms);
      } catch (error) {
        console.error("Erro ao buscar formulários:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchForms();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />

      <main className="pt-28">
        <section className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm text-sm text-gray-600 mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Sistema ativo • {forms.length} formulários disponíveis
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Formulários Personalizados
            </h1>

            <h2 className="text-4xl md:text-5xl font-bold text-blue-600 mt-2 leading-tight">
              Integrados ao Microsoft Forms
            </h2>

            <p className="max-w-2xl mx-auto text-gray-600 mt-5 text-base md:text-lg">
              Interface moderna e profissional para coleta de respostas com
              integração preparada para Microsoft 365 e Power Automate.
            </p>
          </div>

          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-gray-900 text-center mb-8">
              Escolha um formulário
            </h3>

            {loading ? (
              <p className="text-center text-gray-500">Carregando formulários...</p>
            ) : forms.length === 0 ? (
              <p className="text-center text-gray-500">
                Nenhum formulário publicado ainda.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {forms.map((form) => (
                  <FormCard
                    key={form.id}
                    id={form.id}
                    slug={form.slug}
                    title={form.title}
                    description={form.description}
                    tag={form.tag}
                    fields={form.fields}
                    isPublished={form.isPublished}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}