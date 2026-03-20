export default function BuilderInspector({
  selectedQuestion,
  onUpdateQuestion,
}) {
  if (!selectedQuestion) {
    return (
      <aside className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm h-fit">
        <p className="text-sm text-gray-500">
          Selecione uma pergunta para editar.
        </p>
      </aside>
    );
  }

  function updateOption(index, value) {
    const updatedOptions = [...(selectedQuestion.options || [])];
    updatedOptions[index] = value;
    onUpdateQuestion("options", updatedOptions);
  }

  function addOption() {
    const updatedOptions = [...(selectedQuestion.options || []), `Opção ${(selectedQuestion.options?.length || 0) + 1}`];
    onUpdateQuestion("options", updatedOptions);
  }

  function removeOption(index) {
    const updatedOptions = (selectedQuestion.options || []).filter(
      (_, optionIndex) => optionIndex !== index
    );

    onUpdateQuestion("options", updatedOptions);
  }

  return (
    <aside className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm h-fit">
      <h2 className="text-lg font-semibold text-gray-900 mb-5">
        Propriedades
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Título
          </label>
          <input
            type="text"
            value={selectedQuestion.title}
            onChange={(e) => onUpdateQuestion("title", e.target.value)}
            className="w-full rounded-xl bg-gray-100 px-4 py-3 outline-none border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descrição
          </label>
          <textarea
            value={selectedQuestion.description}
            onChange={(e) => onUpdateQuestion("description", e.target.value)}
            className="w-full rounded-xl bg-gray-100 px-4 py-3 h-24 outline-none border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none"
          />
        </div>

        {(selectedQuestion.type === "text" ||
          selectedQuestion.type === "textarea") && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Placeholder
            </label>
            <input
              type="text"
              value={selectedQuestion.placeholder || ""}
              onChange={(e) => onUpdateQuestion("placeholder", e.target.value)}
              className="w-full rounded-xl bg-gray-100 px-4 py-3 outline-none border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        )}

        {selectedQuestion.type === "choice" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Opções
            </label>

            <div className="space-y-3">
              {(selectedQuestion.options || []).map((option, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                    className="flex-1 rounded-xl bg-gray-100 px-4 py-3 outline-none border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                  <button
                    type="button"
                    onClick={() => removeOption(index)}
                    className="px-3 py-3 text-sm text-red-500 hover:text-red-600"
                  >
                    Remover
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={addOption}
                className="w-full border border-dashed border-gray-300 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 hover:border-blue-400 hover:text-blue-600 transition"
              >
                + Adicionar opção
              </button>
            </div>
          </div>
        )}

        <label className="flex items-center gap-3 pt-2">
          <input
            type="checkbox"
            checked={selectedQuestion.required}
            onChange={(e) => onUpdateQuestion("required", e.target.checked)}
            className="h-5 w-5 accent-black"
          />
          <span className="text-sm text-gray-800">Pergunta obrigatória</span>
        </label>
      </div>
    </aside>
  );
}