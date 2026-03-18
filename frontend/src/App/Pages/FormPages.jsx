import { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../App/Components/Header";
import api from "../../Services/Api";

const forms = {
  contato: {
    title: "Formulário de Contato",
    description: "Preencha os dados abaixo e entraremos em contato.",
  },
  satisfacao: {
    title: "Pesquisa de Satisfação",
    description: "Conte para nós como foi sua experiência.",
  },
  evento: {
    title: "Inscrição em Evento",
    description: "Preencha seus dados para participar do evento.",
  },
  candidatos: {
    title: "Cadastro de Candidatos",
    description: "Envie suas informações para o nosso banco de talentos.",
  },
};

export default function FormPage() {
  const { id } = useParams();
  const formConfig = forms[id];

  const [form, setForm] = useState({
    nome: "",
    email: "",
    mensagem: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/submit", {
        formType: id,
        ...form,
      });
      alert("Enviado com sucesso!");
    } catch (error) {
      alert("Erro ao enviar");
    } finally {
      setLoading(false);
    }
  }

  if (!formConfig) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Header />
        <div className="pt-28 max-w-xl mx-auto px-6">
          <div className="bg-white border rounded-2xl shadow-sm p-8 text-center">
            <h1 className="text-2xl font-bold mb-2">Formulário não encontrado</h1>
            <p className="text-gray-500">
              O formulário que você tentou acessar não existe.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />

      <div className="pt-28 max-w-xl mx-auto px-6">
        <div className="bg-white border rounded-2xl shadow-sm p-8">
          <h1 className="text-2xl font-bold mb-2">{formConfig.title}</h1>

          <p className="text-gray-500 text-sm mb-6">
            {formConfig.description}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Nome</label>
              <input
                name="nome"
                placeholder="Seu nome"
                onChange={handleChange}
                required
                className="w-full mt-1 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                name="email"
                type="email"
                placeholder="seu@email.com"
                onChange={handleChange}
                required
                className="w-full mt-1 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Mensagem</label>
              <textarea
                name="mensagem"
                placeholder="Digite sua mensagem..."
                onChange={handleChange}
                className="w-full mt-1 border rounded-lg p-3 h-28 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Enviando..." : "Enviar formulário"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}