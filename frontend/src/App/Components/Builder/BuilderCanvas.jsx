import SortableQuestionCard from "./SortableQuestionCard";

export default function BuilderCanvas({
  questions,
  selectedQuestionId,
  onSelectQuestion,
  onDeleteQuestion,
}) {
  return (
    <main className="space-y-4">
      <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
        <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-medium">
          Builder
        </span>

        <h1 className="text-3xl font-bold text-gray-950 mt-4">
          Novo formulário
        </h1>

        <p className="text-gray-500 mt-2">
          Monte seu formulário com a mesma lógica do Microsoft Forms.
        </p>
      </div>

      {questions.map((question, index) => (
        <SortableQuestionCard
          key={question.id}
          question={question}
          index={index}
          isSelected={question.id === selectedQuestionId}
          onSelectQuestion={onSelectQuestion}
          onDeleteQuestion={onDeleteQuestion}
        />
      ))}
    </main>
  );
}