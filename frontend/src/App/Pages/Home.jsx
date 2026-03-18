import Header from "../Components/Header";
import FormCard from "../Components/FormCard";
import FeatureCard from "../Components/FeatureCard";

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />

      <div className="pt-28 max-w-6xl mx-auto px-6">
        
        {/* HERO */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold">
            Formulários Personalizados
          </h1>

          <h2 className="text-4xl font-bold text-blue-600 mt-2">
            Integrados ao Microsoft Forms
          </h2>

          <p className="text-gray-600 mt-4 max-w-xl mx-auto">
            Interface moderna e profissional para coletar respostas
            automaticamente enviadas via Power Automate.
          </p>

          <div className="mt-4 text-sm text-gray-500">
            🟢 Sistema Ativo • 4 Formulários Disponíveis
          </div>
        </div>

        {/* FORMULÁRIOS */}
        <h2 className="text-xl font-semibold mb-6 text-center">
          Escolha um Formulário
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <FormCard
            title="Formulário de Contato"
            description="Entre em contato conosco. Responderemos em até 24 horas."
            tag="Atendimento"
            fields={6}
          />

          <FormCard
            title="Pesquisa de Satisfação"
            description="Sua opinião é muito importante para nós!"
            tag="Feedback"
            fields={5}
          />

          <FormCard
            title="Inscrição em Evento"
            description="Cadastre-se para nosso próximo evento."
            tag="Eventos"
            fields={8}
          />

          <FormCard
            title="Cadastro de Candidatos"
            description="Candidate-se às nossas vagas disponíveis."
            tag="RH"
            fields={9}
          />
        </div>

        {/* FEATURES */}
        <h2 className="text-xl font-semibold text-center mb-6">
          Recursos do Sistema
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <FeatureCard
            icon="📄"
            title="Formulários Dinâmicos"
            description="Campos personalizáveis com validação."
          />

          <FeatureCard
            icon="📊"
            title="Dashboard Completo"
            description="Visualize respostas em tempo real."
          />

          <FeatureCard
            icon="⚙️"
            title="Integração Microsoft"
            description="Envio automático via Power Automate."
          />
        </div>

        {/* FOOTER */}
        <div className="text-center text-sm text-gray-500 pb-10">
          Sistema de Formulários Profissional • Integrado ao Microsoft Forms
        </div>
      </div>
    </div>
  );
}