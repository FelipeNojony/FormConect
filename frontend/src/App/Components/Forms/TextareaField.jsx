export default function TextareaField({ field, value, error, onChange }) {
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
        required={false}
        maxLength={maxLength}
        onChange={onChange}
        className={`w-full rounded-xl px-4 py-4 h-36 text-gray-700 placeholder:text-gray-400 outline-none border transition resize-none ${
          error
            ? "bg-red-50 border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100"
            : "bg-gray-100 border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        }`}
      />

      <div className="flex items-center justify-between mt-2">
        {error ? (
          <p className="text-sm text-red-500">{error}</p>
        ) : (
          <span></span>
        )}

        <p className="text-sm text-gray-500">
          {currentLength} / {maxLength} caracteres
        </p>
      </div>
    </div>
  );
}