import FormField from "./FormField";

export default function DynamicForm({
  fields,
  formData,
  errors,
  loading,
  onChange,
  onSubmit,
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {fields.map((field) => (
        <FormField
          key={field.name}
          field={field}
          value={formData[field.name]}
          error={errors[field.name]}
          onChange={onChange}
        />
      ))}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50"
      >
        {loading ? "Enviando..." : "Enviar Formulário"}
      </button>
    </form>
  );
}