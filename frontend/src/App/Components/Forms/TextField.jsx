export default function TextField({ field, value, onChange }) {
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
        required={field.required}
        onChange={onChange}
        className="w-full rounded-xl bg-gray-100 px-4 py-4 text-gray-700 placeholder:text-gray-400 outline-none border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
      />
    </div>
  );
}