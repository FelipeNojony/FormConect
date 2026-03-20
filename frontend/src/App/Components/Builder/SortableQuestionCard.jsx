import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function SortableQuestionCard({
  question,
  index,
  isSelected,
  onSelectQuestion,
  onDeleteQuestion,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: question.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={() => onSelectQuestion(question.id)}
      className={`bg-white border rounded-3xl p-6 shadow-sm cursor-pointer transition ${
        isSelected
          ? "border-blue-500 ring-2 ring-blue-100"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs text-gray-400 mb-2">
            Pergunta {index + 1} • {question.type}
          </p>

          <h3 className="text-lg font-semibold text-gray-900">
            {question.title || "Sem título"}
          </h3>

          {question.description && (
            <p className="text-sm text-gray-500 mt-2">
              {question.description}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            {...attributes}
            {...listeners}
            onClick={(e) => e.stopPropagation()}
            className="text-sm text-gray-500 hover:text-black cursor-grab active:cursor-grabbing"
            title="Arrastar"
          >
            ☰
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteQuestion(question.id);
            }}
            className="text-sm text-red-500 hover:text-red-600"
          >
            Excluir
          </button>
        </div>
      </div>

      <div className="mt-5">
        {question.type === "text" && (
          <div className="bg-gray-100 rounded-xl px-4 py-3 text-sm text-gray-400">
            {question.placeholder || "Digite sua resposta"}
          </div>
        )}

        {question.type === "textarea" && (
          <div className="bg-gray-100 rounded-xl px-4 py-5 text-sm text-gray-400">
            {question.placeholder || "Digite sua resposta longa"}
          </div>
        )}

        {question.type === "choice" && (
          <div className="space-y-2">
            {question.options?.map((option, i) => (
              <div
                key={i}
                className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3"
              >
                <span className="w-4 h-4 rounded-full border border-gray-400" />
                <span className="text-sm text-gray-700">{option}</span>
              </div>
            ))}
          </div>
        )}

        {question.type === "date" && (
          <div className="bg-gray-100 rounded-xl px-4 py-3 text-sm text-gray-400">
            dd/mm/aaaa
          </div>
        )}
      </div>

      <div className="mt-4 text-xs text-gray-400">
        {question.required ? "Obrigatória" : "Opcional"}
      </div>
    </div>
  );
}