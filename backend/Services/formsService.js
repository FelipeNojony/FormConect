import { supabase } from "../Lib/Supabase.js";

export async function savePublishedForm(formData) {
  const {
    title,
    description,
    slug,
    tag = "Personalizado",
    status = "published",
    questions = [],
  } = formData;

  if (!title || !slug) {
    throw new Error("Título e slug são obrigatórios.");
  }

  const { data: existingForm, error: findError } = await supabase
    .from("forms")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();

  if (findError) {
    throw findError;
  }

  let formId;

  if (existingForm) {
    const { data: updatedForm, error: updateError } = await supabase
      .from("forms")
      .update({
        title,
        description,
        tag,
        status,
      })
      .eq("id", existingForm.id)
      .select("id")
      .single();

    if (updateError) {
      throw updateError;
    }

    formId = updatedForm.id;

    const { error: deleteQuestionsError } = await supabase
      .from("form_questions")
      .delete()
      .eq("form_id", formId);

    if (deleteQuestionsError) {
      throw deleteQuestionsError;
    }
  } else {
    const { data: createdForm, error: insertError } = await supabase
      .from("forms")
      .insert({
        title,
        description,
        slug,
        tag,
        status,
      })
      .select("id")
      .single();

    if (insertError) {
      throw insertError;
    }

    formId = createdForm.id;
  }

  if (questions.length > 0) {
    const questionRows = questions.map((question, index) => ({
      form_id: formId,
      type: question.type,
      title: question.title || "Sem título",
      description: question.description || null,
      required: question.required || false,
      placeholder: question.placeholder || null,
      options: question.options || null,
      position: index,
      settings: question.settings || {},
    }));

    const { error: insertQuestionsError } = await supabase
      .from("form_questions")
      .insert(questionRows);

    if (insertQuestionsError) {
      throw insertQuestionsError;
    }
  }

  return { formId, slug };
}

export async function getPublishedForms() {
  const { data, error } = await supabase
    .from("forms")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}

export async function getPublishedFormBySlug(slug) {
  const { data: form, error: formError } = await supabase
    .from("forms")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (formError) {
    throw formError;
  }

  const { data: questions, error: questionsError } = await supabase
    .from("form_questions")
    .select("*")
    .eq("form_id", form.id)
    .order("position", { ascending: true });

  if (questionsError) {
    throw questionsError;
  }

  return {
    ...form,
    questions,
    fields: questions.length,
  };
}