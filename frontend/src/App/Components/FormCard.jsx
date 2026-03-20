import { useNavigate } from "react-router-dom";

export default function FormCard({
  id,
  slug,
  title,
  description,
  tag,
  fields,
  isPublished,
}) {
  const navigate = useNavigate();

  function handleNavigate() {
    if (isPublished) {
      navigate(`/form/publicado/${slug}`);
      return;
    }

    navigate(`/form/${id}`);
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition duration-300">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        </div>

        <span className="shrink-0 text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
          {tag}
        </span>
      </div>

      <div className="flex items-center justify-between mt-6">
        <span className="text-sm text-gray-500">{fields} campos</span>

        <button
          onClick={handleNavigate}
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Preencher →
        </button>
      </div>
    </div>
  );
}