import FormField from "./FormField";

export default function DynamicForm({
  fields,
  formData,
  errors,
  loading,
  onChange,
  onSubmit,
}) {
  const visibleFields = fields.filter((field) => {
    if (!field.showWhen) return true;

    return formData[field.showWhen.field] === field.showWhen.value;
  });

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {visibleFields.map((field) => (
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
        className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            Enviando...
          </>
        ) : (
          "Enviar Formulário"
        )}
      </button>
    </form>
  );
}