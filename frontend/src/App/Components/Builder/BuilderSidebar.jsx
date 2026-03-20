export default function BuilderSidebar({ onAddQuestion }) {
  const types = [
    { label: "Texto", type: "text" },
    { label: "Texto longo", type: "textarea" },
    { label: "Escolha", type: "choice" },
    { label: "Data", type: "date" },
  ];

  return (
    <aside className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm h-fit">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">
        Tipos de pergunta
      </h2>
      <p className="text-sm text-gray-500 mb-5">
        Clique para adicionar ao formulário
      </p>

      <div className="space-y-3">
        {types.map((item) => (
          <button
            key={item.type}
            onClick={() => onAddQuestion(item.type)}
            className="w-full text-left border border-gray-200 rounded-2xl px-4 py-4 hover:bg-gray-50 transition"
          >
            <span className="font-medium text-gray-900">{item.label}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}