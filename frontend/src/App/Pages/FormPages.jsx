import { useState } from "react";
import api from "../../Services/Api";

export default function FormPage() {
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
      await api.post("/submit", form);
      alert("Enviado com sucesso!");
    } catch (error) {
      alert("Erro ao enviar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <h1>FormConnect</h1>

      <form onSubmit={handleSubmit}>
        <input name="nome" placeholder="Nome" onChange={handleChange} required />
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <textarea name="mensagem" placeholder="Mensagem" onChange={handleChange} />

        <button type="submit">
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </div>
  );
}