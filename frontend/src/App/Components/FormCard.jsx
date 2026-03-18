export default function FormCard({ title, description, tag, fields }) {
  return (
    <div className="bg-white rounded-2xl border p-6 shadow-sm hover:shadow-md transition">
      
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-lg">{title}</h3>
        <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
          {tag}
        </span>
      </div>

      <p className="text-gray-600 text-sm mb-4">{description}</p>

      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-500">{fields} campos</span>

        <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
          Preencher →
        </button>
      </div>
    </div>
  );
}