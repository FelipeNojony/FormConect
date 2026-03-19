export default function TextField({ field, value, error, onChange }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-950 mb-2">
        {field.label} {field.required && <span className="text-red-500">*</span>}
      </label>

      <input
        type={field.type}
        name={field.name}
        value={value || ""}
        placeholder={field.placeholder || ""}
        required={false}
        onChange={onChange}
        className={`w-full rounded-xl px-4 py-4 text-gray-700 placeholder:text-gray-400 outline-none border transition ${
          error
            ? "bg-red-50 border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100"
            : "bg-gray-100 border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        }`}
      />

      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
    </div>
  );
}