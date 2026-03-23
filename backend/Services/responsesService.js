import { supabase } from "../Lib/Supabase.js";

export async function saveFormResponse({ slug, answers, metadata = {} }) {
  const { data: form, error: formError } = await supabase
    .from("forms")
    .select("id, title")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (formError || !form) {
    throw new Error("Formulário não encontrado.");
  }

  const { data: questions, error: questionsError } = await supabase
    .from("form_questions")
    .select("id, title, type, required")
    .eq("form_id", form.id);

  if (questionsError) {
    throw questionsError;
  }

  const questionMap = new Map(questions.map((question) => [question.id, question]));

  const { data: createdResponse, error: responseError } = await supabase
    .from("form_responses")
    .insert({
      form_id: form.id,
      metadata,
    })
    .select("id")
    .single();

  if (responseError) {
    throw responseError;
  }

  const answersRows = Object.entries(answers).map(([questionId, answerValue]) => {
    const question = questionMap.get(questionId);

    return {
      response_id: createdResponse.id,
      question_id: questionId,
      answer_text:
        typeof answerValue === "string" ||
        typeof answerValue === "number" ||
        typeof answerValue === "boolean"
          ? String(answerValue)
          : null,
      answer_json:
        typeof answerValue === "object" && answerValue !== null
          ? answerValue
          : null,
    };
  });

  if (answersRows.length > 0) {
    const { error: insertAnswersError } = await supabase
      .from("form_response_answers")
      .insert(answersRows);

    if (insertAnswersError) {
      throw insertAnswersError;
    }
  }

  return {
    responseId: createdResponse.id,
    formTitle: form.title,
  };
}

export async function getResponsesByFormSlug(slug) {
  const { data: form, error: formError } = await supabase
    .from("forms")
    .select("id, title, description, slug, tag")
    .eq("slug", slug)
    .single();

  if (formError || !form) {
    throw new Error("Formulário não encontrado.");
  }

  const { data: questions, error: questionsError } = await supabase
    .from("form_questions")
    .select("id, title, type, position")
    .eq("form_id", form.id)
    .order("position", { ascending: true });

  if (questionsError) {
    throw questionsError;
  }

  const { data: responses, error: responsesError } = await supabase
    .from("form_responses")
    .select("id, submitted_at")
    .eq("form_id", form.id)
    .order("submitted_at", { ascending: false });

  if (responsesError) {
    throw responsesError;
  }

  const responseIds = responses.map((response) => response.id);

  let answers = [];

  if (responseIds.length > 0) {
    const { data: answersData, error: answersError } = await supabase
      .from("form_response_answers")
      .select("id, response_id, question_id, answer_text, answer_json")
      .in("response_id", responseIds);

    if (answersError) {
      throw answersError;
    }

    answers = answersData;
  }

  const questionsMap = new Map(questions.map((question) => [question.id, question.title]));

  const groupedResponses = responses.map((response) => {
    const responseAnswers = answers.filter(
      (answer) => answer.response_id === response.id
    );

    const formattedAnswers = {};

    responseAnswers.forEach((answer) => {
      const questionTitle = questionsMap.get(answer.question_id) || answer.question_id;

      formattedAnswers[questionTitle] =
        answer.answer_json !== null ? answer.answer_json : answer.answer_text;
    });

    return {
      id: response.id,
      createdAt: response.submitted_at,
      answers: formattedAnswers,
    };
  });

  return {
    form,
    totalResponses: groupedResponses.length,
    responses: groupedResponses,
  };
}