export default function CheckboxField({ field, value, onChange }) {
  return (
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
  );
}