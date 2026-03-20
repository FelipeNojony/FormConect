import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";

export default function AdminPage() {
  const navigate = useNavigate();

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
            Gerencie formulários, crie novas estruturas e acompanhe a evolução do sistema.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Builder de Formulários
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Crie e edite formulários com uma experiência visual parecida com Microsoft Forms.
            </p>

            <button
              onClick={() => navigate("/admin/builder")}
              className="w-full bg-black text-white py-3 rounded-xl font-medium hover:opacity-90 transition"
            >
              Abrir Builder
            </button>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Formulários Publicados
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Visualize os formulários já criados e gerencie suas versões.
            </p>

            <button
              className="w-full border border-gray-200 text-gray-800 py-3 rounded-xl font-medium hover:bg-gray-50 transition"
            >
              Em breve
            </button>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Respostas e Analytics
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Acompanhe respostas, métricas de uso e integrações futuras.
            </p>

            <button
              className="w-full border border-gray-200 text-gray-800 py-3 rounded-xl font-medium hover:bg-gray-50 transition"
            >
              Em breve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}