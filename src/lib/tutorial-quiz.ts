export type Choice = { id: string; text: string };
type QuestionContent = {
  id: string;
  title: string;
  skill: string;
  scenario: string;
  prompt: string;
  evidence?: { caption: string; columns: string[]; rows: string[][] };
  tool?: string;
  illustration?: { src: string; alt: string; caption: string; width: number; height: number };
};
export type QuizQuestion = QuestionContent & (
  | { type: 'choice'; options: Choice[] }
  | { type: 'number'; inputLabel: string }
);
export type TutorialQuiz = { id: string; title: string; intro: string; context: string; questions: QuizQuestion[] };
export type QuizAttempt = Record<string, string>;
export type AnswerKey = Record<string, { answer: string | number; explanation: string }>;

export function hasResponse(question: QuizQuestion, value: unknown): value is string {
  if (typeof value !== 'string' || !value.trim()) return false;
  if (question.type === 'choice') return question.options.some(option => option.id === value);
  return /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(value.trim()) && Number.isFinite(Number(value));
}

export function unansweredQuestions(quiz: TutorialQuiz, attempt: QuizAttempt): string[] {
  return quiz.questions.filter(question => !hasResponse(question, attempt[question.id])).map(q => q.id);
}

export function responseText(question: QuizQuestion, value: string | number): string {
  return question.type === 'choice'
    ? question.options.find(option => option.id === value)?.text ?? String(value)
    : String(value);
}

// Completion is checked before looking at even one answer. Wrong but valid
// responses count as attempts; this is a completion gate, not a mastery gate.
export function gradeQuiz(quiz: TutorialQuiz, attempt: QuizAttempt, key: AnswerKey) {
  const missing = unansweredQuestions(quiz, attempt);
  if (missing.length) return { status: 'incomplete' as const, missing };
  const feedback = quiz.questions.map(question => {
    const entry = key[question.id];
    if (!entry || typeof entry.explanation !== 'string' ||
      (question.type === 'number' ? typeof entry.answer !== 'number' || !Number.isFinite(entry.answer)
        : !question.options.some(option => option.id === entry.answer))) {
      throw new Error('The answer key does not match this quiz.');
    }
    const correct = question.type === 'number'
      ? Number(attempt[question.id]) === entry.answer
      : attempt[question.id] === entry.answer;
    return {
      id: question.id, title: question.title, correct,
      response: responseText(question, attempt[question.id].trim()),
      answer: responseText(question, entry.answer), explanation: entry.explanation,
    };
  });
  return {
    status: 'complete' as const,
    score: feedback.filter(item => item.correct).length,
    total: quiz.questions.length,
    feedback,
  };
}
