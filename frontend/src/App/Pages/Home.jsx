import Header from "../../App/Components/Header";
import FormCard from "../../App/Components/FormCard";
import FormsConfig from "../Data/FormsConfig";
import { useEffect, useState } from "react";

const PUBLISHED_FORMS_KEY = "formconnect-published-forms";


export default function Home() {

    const [publishedForms, setPublishedForms] = useState([]);

useEffect(() => {
  const savedPublishedForms = JSON.parse(
    localStorage.getItem(PUBLISHED_FORMS_KEY) || "[]"
  );

  setPublishedForms(savedPublishedForms);
}, []);

  const defaultForms = [
    {
      id: "contato",
      title: FormsConfig.contato.title,
      description: FormsConfig.contato.description,
      tag: FormsConfig.contato.tag,
      fields: FormsConfig.contato.fields.length,
    },
    {
      id: "satisfacao",
      title: FormsConfig.satisfacao.title,
      description: FormsConfig.satisfacao.description,
      tag: FormsConfig.satisfacao.tag,
      fields: FormsConfig.satisfacao.fields.length,
    },
    {
      id: "evento",
      title: FormsConfig.evento.title,
      description: FormsConfig.evento.description,
      tag: FormsConfig.evento.tag,
      fields: FormsConfig.evento.fields.length,
    },
    {
      id: "candidatos",
      title: FormsConfig.candidatos.title,
      description: FormsConfig.candidatos.description,
      tag: FormsConfig.candidatos.tag,
      fields: FormsConfig.candidatos.fields.length,
    },
  ];

  const forms = [
  ...defaultForms,
  ...publishedForms.map((form) => ({
    id: `published-${form.slug}`,
    slug: form.slug,
    title: form.title,
    description: form.description,
    tag: form.tag || "Personalizado",
    fields: form.fields || form.questions?.length || 0,
    isPublished: true,
  })),
];

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
          </div>

          <div className="pb-14">
            <h3 className="text-2xl font-semibold text-gray-900 text-center mb-8">
              Recursos do sistema
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div className="text-2xl mb-4">🧩</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Formulários dinâmicos
                </h4>
                <p className="text-sm text-gray-600">
                  Estrutura preparada para múltiplos formulários com campos reutilizáveis.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div className="text-2xl mb-4">⚡</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Integração pronta
                </h4>
                <p className="text-sm text-gray-600">
                  Backend preparado para envio de respostas ao Power Automate por webhook.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div className="text-2xl mb-4">📊</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Base para dashboard
                </h4>
                <p className="text-sm text-gray-600">
                  Arquitetura pensada para evoluir para painel administrativo e modo SaaS.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}