import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DndContext,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import Header from "../Components/Header";
import BuilderSidebar from "../Components/Builder/BuilderSidebar";
import BuilderCanvas from "../Components/Builder/BuilderCanvas";
import BuilderInspector from "../Components/Builder/BuilderInspector";
import { toast } from "sonner";

const STORAGE_KEY = "formconnect-builder-data";
const PUBLISHED_FORMS_KEY = "formconnect-published-forms";
const EDITING_FORM_KEY = "formconnect-editing-form";

function createDefaultQuestion() {
  return {
    id: crypto.randomUUID(),
    type: "text",
    title: "Nova pergunta",
    description: "",
    required: false,
    placeholder: "Digite sua resposta",
  };
}

function createDefaultForm() {
  return {
    title: "Novo formulário",
    description: "Descreva o objetivo deste formulário",
    questions: [createDefaultQuestion()],
    tag: "Personalizado", // 👈 novo
    slug: null,
    publishedId: null,
  };
}

function generateSlug(title) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function BuilderPage() {
  const navigate = useNavigate();

  const [builderData, setBuilderData] = useState(() => {
  const editingForm = localStorage.getItem(EDITING_FORM_KEY);
  

  if (editingForm) {
    try {
      const parsedEditingForm = JSON.parse(editingForm);

      return {
        title: parsedEditingForm.title || "Novo formulário",
        description:
          parsedEditingForm.description || "Descreva o objetivo deste formulário",
        questions: parsedEditingForm.questions || [createDefaultQuestion()],
        slug: parsedEditingForm.slug || null,
        publishedId: parsedEditingForm.id || null,
      };
    } catch (error) {
      console.error("Erro ao carregar formulário em edição:", error);
    }
  }

  const savedData = localStorage.getItem(STORAGE_KEY);

  if (savedData) {
    try {
      const parsedSavedData = JSON.parse(savedData);

      return {
        ...parsedSavedData,
        slug: parsedSavedData.slug || null,
        publishedId: parsedSavedData.publishedId || null,
      };
    } catch (error) {
      console.error("Erro ao carregar builder:", error);
    }
  }

  return {
    ...createDefaultForm(),
    slug: null,
    publishedId: null,
  };
});

  const [selectedQuestionId, setSelectedQuestionId] = useState(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);

    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        return parsed.questions?.[0]?.id || null;
      } catch (error) {
        return null;
      }
    }

    return null;
  });

  const { title, description, questions } = builderData;
  

  const selectedQuestion = questions.find(
    (question) => question.id === selectedQuestionId
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(builderData));
  }, [builderData]);

  useEffect(() => {
    if (!selectedQuestionId && questions.length > 0) {
      setSelectedQuestionId(questions[0].id);
    }
  }, [questions, selectedQuestionId]);

  function handleCreateNewForm() {
  const defaultForm = createDefaultForm();

  setBuilderData(defaultForm);
  setSelectedQuestionId(defaultForm.questions[0].id);

  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(EDITING_FORM_KEY);

  toast.success("Pronto para criar um novo formulário!");
}

  function updateForm(field, value) {
    setBuilderData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function addQuestion(type) {
    const baseQuestion = {
      id: crypto.randomUUID(),
      type,
      title: "Nova pergunta",
      description: "",
      required: false,
    };

    if (type === "text") baseQuestion.placeholder = "Digite sua resposta";
    if (type === "textarea") baseQuestion.placeholder = "Digite sua resposta";
    if (type === "choice") baseQuestion.options = ["Opção 1", "Opção 2"];
    if (type === "date") baseQuestion.placeholder = "";

    setBuilderData((prev) => ({
      ...prev,
      questions: [...prev.questions, baseQuestion],
    }));

    setSelectedQuestionId(baseQuestion.id);
    toast.success("Pergunta adicionada");
  }

  function updateQuestion(field, value) {
    setBuilderData((prev) => ({
      ...prev,
      questions: prev.questions.map((question) =>
        question.id === selectedQuestionId
          ? { ...question, [field]: value }
          : question
      ),
    }));
  }

  function deleteQuestion(id) {
    const updatedQuestions = questions.filter((question) => question.id !== id);

    setBuilderData((prev) => ({
      ...prev,
      questions: updatedQuestions,
    }));

    if (selectedQuestionId === id) {
      setSelectedQuestionId(updatedQuestions[0]?.id || null);
    }

    toast.success("Pergunta removida");
  }

  function handleDragEnd(event) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setBuilderData((prev) => {
      const oldIndex = prev.questions.findIndex((item) => item.id === active.id);
      const newIndex = prev.questions.findIndex((item) => item.id === over.id);

      return {
        ...prev,
        questions: arrayMove(prev.questions, oldIndex, newIndex),
      };
    });
  }

  async function handleCopyJson() {
    try {
      await navigator.clipboard.writeText(JSON.stringify(builderData, null, 2));
      toast.success("JSON copiado para a área de transferência");
    } catch (error) {
      console.error(error);
      toast.error("Não foi possível copiar o JSON");
    }
  }

  function handleResetBuilder() {
  const defaultForm = createDefaultForm();
  setBuilderData(defaultForm);
  setSelectedQuestionId(defaultForm.questions[0].id);

  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(EDITING_FORM_KEY);

  toast.success("Builder resetado");
}

 async function handlePublishForm() {
  try {
    const slug = builderData.slug || generateSlug(builderData.title || "novo-formulario");

    const payload = {
      title: builderData.title,
      description: builderData.description,
      slug,
      tag: builderData.tag || "Personalizado",
      status: "published",
      questions: builderData.questions,
    };

    const response = await fetch("http://localhost:3000/api/forms/publish", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Erro ao publicar formulário.");
    }

    const result = await response.json();

    setBuilderData((prev) => ({
      ...prev,
      slug: result.slug,
      publishedId: result.formId,
    }));

    toast.success("Formulário publicado com sucesso!");
  } catch (error) {
    console.error(error);
    toast.error("Erro ao publicar formulário");
  }
}

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <div className="max-w-7xl mx-auto px-6 pt-28 pb-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <button
  onClick={() => navigate("/admin")}
  className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition"
>
  <span className="text-lg">←</span>
  Voltar para o painel
</button>
            <h1 className="text-3xl font-bold text-gray-950 mt-3">
              Construtor de Formulários
            </h1>
            
            <p className="text-gray-500 mt-2">
              Edite, reorganize e salve a estrutura do formulário em JSON.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">

            <button
  onClick={handleCreateNewForm}
  className="border border-gray-200 bg-white px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
>
  Novo formulário
</button>
            <button
              onClick={() => navigate("/admin/builder/preview")}
              className="border border-gray-200 bg-white px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              Visualizar formulário
            </button>

            <button
              onClick={handlePublishForm}
              className="bg-black text-white px-4 py-3 rounded-xl text-sm font-medium hover:opacity-90 transition"
            >
              Salvar e publicar
            </button>

            <button
              onClick={handleCopyJson}
              className="border border-gray-200 bg-white px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              Copiar JSON
            </button>

            <button
              onClick={handleResetBuilder}
              className="border border-red-200 bg-white px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition"
            >
              Resetar builder
            </button>
          </div>
        </div>

        <div className="mb-6 bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título do formulário
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => updateForm("title", e.target.value)}
                className="w-full rounded-xl bg-gray-100 px-4 py-3 outline-none border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição do formulário
              </label>
              <textarea
                value={description}
                onChange={(e) => updateForm("description", e.target.value)}
                className="w-full rounded-xl bg-gray-100 px-4 py-3 h-24 outline-none border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)_320px] gap-6">
          <BuilderSidebar onAddQuestion={addQuestion} />

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={questions.map((question) => question.id)}
              strategy={verticalListSortingStrategy}
            >
              <BuilderCanvas
                formTitle={title}
                formDescription={description}
                questions={questions}
                selectedQuestionId={selectedQuestionId}
                onSelectQuestion={setSelectedQuestionId}
                onDeleteQuestion={deleteQuestion}
              />
            </SortableContext>
          </DndContext>

          <BuilderInspector
            selectedQuestion={selectedQuestion}
            onUpdateQuestion={updateQuestion}
          />
        </div>
      </div>
    </div>
  );
}