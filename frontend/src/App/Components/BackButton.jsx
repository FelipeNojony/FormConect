import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BackButton({ label = "Voltar" }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="
        flex items-center gap-2
        text-sm text-gray-500
        hover:text-blue-600
        transition-all duration-200
        mb-6 group
      "
    >
      <ArrowLeft
        size={18}
        className="
          transition-transform duration-200
          group-hover:-translate-x-1
        "
      />

      <span>{label}</span>
    </button>
  );
}