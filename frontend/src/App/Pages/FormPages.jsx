import { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../App/Components/Header";
import BackButton from "../../App/Components/BackButton";
import DynamicForm from "../../App/Components/Forms/DynamicForm";
import FormsConfig from "../Data/FormsConfig";
import api from "../../Services/Api";
import { toast } from "sonner";

export default function FormPage() {
  const { id } = useParams();
  const formConfig = FormsConfig[id];

  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, type, value, checked } = e.target;

    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  }

  function validateForm() {
    const newErrors = {};

    formConfig.fields.forEach((field) => {
      const value = formData[field.name];

      if (field.required) {
        if (field.type === "checkbox") {
          if (!value) {
            newErrors[field.name] = "Este campo é obrigatório.";
          }
        } else if (!value || String(value).trim() === "") {
          newErrors[field.name] = "Este campo é obrigatório.";
        }
      }

      if (field.type === "email" && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          newErrors[field.name] = "Digite um e-mail válido.";
        }
      }

      if (field.name === "telefone" && value) {
        const onlyNumbers = value.replace(/\D/g, "");
        if (onlyNumbers.length < 10) {
          newErrors[field.name] = "Digite um telefone válido.";
        }
      }

      if (field.type === "textarea" && field.required && value) {
        if (String(value).trim().length < 10) {
          newErrors[field.name] = "Digite pelo menos 10 caracteres.";
        }
      }
    });

    return newErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      toast.error("Corrija os campos antes de enviar.");
      return;
    }

    setLoading(true);

    try {
      await api.post("/submit", {
        formType: id,
        ...formData,
      });

      toast.success("Formulário enviado com sucesso!");

      setFormData({});
      setErrors({});
    } catch (error) {
      toast.error("Erro ao enviar formulário");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (!formConfig) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Header />
        <div className="pt-28 max-w-4xl mx-auto px-6">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 text-center">
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

      <div className="pt-28 max-w-4xl mx-auto px-6 pb-12">
        <BackButton />

        <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-8 md:p-10">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xs bg-blue-100 text-blue-600 px-4 py-2 rounded-full font-medium">
              {formConfig.tag}
            </span>

            <span className="text-sm text-gray-400">
              {formConfig.fields.length} campos
            </span>
          </div>

          <h1 className="text-3xl font-bold text-gray-950 mb-3">
            {formConfig.title}
          </h1>

          <p className="text-gray-500 text-lg mb-8">
            {formConfig.description}
          </p>

          <div className="border-t border-gray-200 pt-6 mb-8">
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
              Integrado ao Microsoft Forms
            </div>
          </div>

          <DynamicForm
            fields={formConfig.fields}
            formData={formData}
            errors={errors}
            loading={loading}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <h3 className="text-blue-800 font-semibold text-lg mb-2">
            🔒 Seus dados estão seguros
          </h3>
          <p className="text-blue-700 text-sm leading-6">
            Todas as informações são enviadas de forma segura via Power Automate
            e armazenadas no Microsoft Forms, seguindo as políticas de privacidade da Microsoft.
          </p>
        </div>
      </div>
    </div>
  );
}