export default function TextareaField({ field, value, onChange }) {
  const currentLength = value?.length || 0;
  const maxLength = field.maxLength || 500;

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-950 mb-2">
        {field.label} {field.required && <span className="text-red-500">*</span>}
      </label>

      <textarea
        name={field.name}
        value={value || ""}
        placeholder={field.placeholder}
        required={field.required}
        maxLength={maxLength}
        onChange={onChange}
        className="w-full rounded-xl bg-gray-100 px-4 py-4 h-36 text-gray-700 placeholder:text-gray-400 outline-none border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition resize-none"
      />

      <p className="text-sm text-gray-500 mt-3">
        {currentLength} / {maxLength} caracteres
      </p>
    </div>
  );
}