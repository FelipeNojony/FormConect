export default function CheckboxField({ field, value, error, onChange }) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          name={field.name}
          checked={!!value}
          onChange={onChange}
          className="h-5 w-5 rounded border-gray-300 accent-black"
        />

        <label className="text-base text-gray-900">
          {field.label}
        </label>
      </div>

      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
    </div>
  );
}