export default function RadioField({ field, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-950 mb-3">
        {field.label} {field.required && <span className="text-red-500">*</span>}
      </label>

      <div className="space-y-3">
        {field.options.map((option) => (
          <label
            key={option}
            className="flex items-center gap-3 text-base text-gray-900 cursor-pointer"
          >
            <input
              type="radio"
              name={field.name}
              value={option}
              checked={value === option}
              required={field.required}
              onChange={onChange}
              className="h-4 w-4 accent-black"
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
}