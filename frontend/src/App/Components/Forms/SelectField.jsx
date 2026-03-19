export default function SelectField({ field, value, error, onChange }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-950 mb-2">
        {field.label} {field.required && <span className="text-red-500">*</span>}
      </label>

      <select
        name={field.name}
        value={value || ""}
        required={false}
        onChange={onChange}
        className={`w-full rounded-xl px-4 py-4 text-gray-700 outline-none border transition ${
          error
            ? "bg-red-50 border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100"
            : "bg-gray-100 border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        }`}
      >
        <option value="" disabled>
          {field.placeholder || "Selecione uma opção"}
        </option>

        {field.options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
    </div>
  );
}