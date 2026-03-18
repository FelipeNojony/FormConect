import Header from "../../App/Components/Header";
import FormCard from "../../App/Components/FormCard";

export default function Home() {
  const forms = [
    {
      id: "contato",
      title: "Formulário de Contato",
      description: "Entre em contato conosco. Responderemos em até 24 horas.",
      tag: "Atendimento",
      fields: 3,
    },
    {
      id: "satisfacao",
      title: "Pesquisa de Satisfação",
      description: "Sua opinião é muito importante para melhorarmos nossos serviços.",
      tag: "Feedback",
      fields: 3,
    },
    {
      id: "evento",
      title: "Inscrição em Evento",
      description: "Garanta sua participação no próximo evento da empresa.",
      tag: "Eventos",
      fields: 3,
    },
    {
      id: "candidatos",
      title: "Cadastro de Candidatos",
      description: "Envie seus dados para o nosso banco de talentos.",
      tag: "RH",
      fields: 3,
    },
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
                  title={form.title}
                  description={form.description}
                  tag={form.tag}
                  fields={form.fields}
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