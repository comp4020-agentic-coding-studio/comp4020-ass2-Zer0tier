import { gradeQuiz, hasResponse, unansweredQuestions, type AnswerKey, type QuizAttempt, type TutorialQuiz } from '../lib/tutorial-quiz';

export function initTutorialQuizzes() {
  for (const root of document.querySelectorAll<HTMLElement>('[data-tutorial-quiz]')) {
    if (root.dataset.enhanced) continue;
    const quiz = JSON.parse(root.querySelector('[data-quiz-definition]')!.textContent!) as TutorialQuiz;
    const form = root.querySelector<HTMLFormElement>('[data-quiz-form]')!;
    const fields = [...form.querySelectorAll<HTMLFieldSetElement>('[data-quiz-question]')];
    const steps = [...form.querySelectorAll<HTMLButtonElement>('[data-quiz-step]')];
    const status = form.querySelector<HTMLElement>('[data-quiz-status]')!;
    const progress = form.querySelector<HTMLProgressElement>('[data-quiz-progress]')!;
    const previous = form.querySelector<HTMLButtonElement>('[data-quiz-previous]')!;
    const next = form.querySelector<HTMLButtonElement>('[data-quiz-next]')!;
    const unanswered = form.querySelector<HTMLButtonElement>('[data-quiz-unanswered]')!;
    const submit = form.querySelector<HTMLButtonElement>('[data-quiz-submit]')!;
    const unlock = form.querySelector<HTMLElement>('[data-quiz-unlock]')!;
    const error = form.querySelector<HTMLElement>('[data-quiz-error]')!;
    const errorList = form.querySelector<HTMLElement>('[data-error-list]')!;
    const loadError = form.querySelector<HTMLElement>('[data-quiz-load-error]')!;
    const results = root.querySelector<HTMLElement>('[data-quiz-results]')!;
    const resultTitle = results.querySelector<HTMLElement>('[data-quiz-result-title]')!;
    const feedbackList = results.querySelector<HTMLElement>('[data-quiz-feedback]')!;
    let current = 0;
    let loading = false;
    let reviewed = false;

    const readAttempt = (): QuizAttempt => Object.fromEntries(
      [...new FormData(form)].map(([name, value]) => [name, String(value)]),
    );
    function showCase(index: number, focus = true) {
      current = Math.max(0, Math.min(fields.length - 1, index));
      fields.forEach((field, i) => { field.hidden = i !== current; });
      steps.forEach((step, i) => {
        if (i === current) step.setAttribute('aria-current', 'step');
        else step.removeAttribute('aria-current');
      });
      updateProgress();
      if (focus) fields[current].querySelector('legend')!.focus();
    }
    function updateProgress() {
      const attempt = readAttempt();
      const missing = unansweredQuestions(quiz, attempt);
      const count = quiz.questions.length - missing.length;
      status.textContent = `${count} of ${quiz.questions.length} answered.${missing.length ? ' Answers stay hidden.' : ' Ready to reveal.'}`;
      progress.value = count;
      steps.forEach((step, i) => {
        const answered = !missing.includes(quiz.questions[i].id);
        step.dataset.answered = String(answered);
        const label = answered ? 'Answered' : 'Unanswered';
        step.querySelector('[data-step-status]')!.textContent = label;
        step.setAttribute('aria-label', `Case ${i + 1}: ${quiz.questions[i].title}, ${label.toLowerCase()}`);
      });
      submit.disabled = loading || missing.length > 0;
      previous.disabled = current === 0;
      next.hidden = current === fields.length - 1;
      unanswered.hidden = current !== fields.length - 1 || missing.length === 0;
      unlock.textContent = missing.length
        ? `Answer all ${quiz.questions.length} cases to unlock your score and the worked explanations.`
        : 'Every case has a response. Review your choices or reveal all answers together.';
    }
    function clearFieldError(index: number) {
      const message = fields[index].querySelector<HTMLElement>('[data-question-error]')!;
      message.textContent = '';
      message.hidden = true;
      fields[index].querySelectorAll('input').forEach(input => input.removeAttribute('aria-invalid'));
    }
    function showMissing(missing: string[]) {
      errorList.replaceChildren();
      quiz.questions.forEach((question, index) => {
        clearFieldError(index);
        if (!missing.includes(question.id)) return;
        const message = question.type === 'number' ? 'Enter one number without words.' : 'Choose a response for this case.';
        const fieldError = fields[index].querySelector<HTMLElement>('[data-question-error]')!;
        fieldError.textContent = message;
        fieldError.hidden = false;
        fields[index].querySelectorAll('input').forEach(input => input.setAttribute('aria-invalid', 'true'));
        const item = document.createElement('li');
        const link = document.createElement('a');
        link.href = `#${fields[index].id}`;
        link.textContent = `Case ${index + 1}: ${question.title}`;
        link.addEventListener('click', event => {
          event.preventDefault();
          showCase(index);
          fields[index].querySelector('input')!.focus();
        });
        item.append(link);
        errorList.append(item);
      });
      error.hidden = false;
      error.focus();
    }

    steps.forEach((step, index) => step.addEventListener('click', () => showCase(index)));
    previous.addEventListener('click', () => showCase(current - 1));
    next.addEventListener('click', () => showCase(current + 1));
    unanswered.addEventListener('click', () => {
      const first = unansweredQuestions(quiz, readAttempt())[0];
      showCase(quiz.questions.findIndex(question => question.id === first));
    });
    form.addEventListener('input', () => {
      if (loading || reviewed) return;
      const attempt = readAttempt();
      quiz.questions.forEach((question, index) => {
        if (hasResponse(question, attempt[question.id])) clearFieldError(index);
      });
      error.hidden = true;
      loadError.hidden = true;
      updateProgress();
    });
    form.addEventListener('submit', async event => {
      event.preventDefault();
      if (loading || reviewed) return;
      const attempt = readAttempt();
      const missing = unansweredQuestions(quiz, attempt);
      // Do not request the solution resource for an incomplete attempt, even
      // if submit is triggered via Enter or outside the disabled button.
      if (missing.length) { showMissing(missing); return; }
      loading = true;
      form.inert = true;
      submit.disabled = true;
      submit.textContent = 'Opening your audit…';
      error.hidden = true;
      loadError.hidden = true;
      status.textContent = 'All cases answered. Loading the worked explanations.';
      try {
        const response = await fetch(root.dataset.answersUrl!);
        if (!response.ok) throw new Error('Could not load the explanations.');
        const key = await response.json() as AnswerKey;
        const result = gradeQuiz(quiz, attempt, key);
        if (result.status !== 'complete') throw new Error('The attempt is incomplete.');
        // Build the review off-DOM; incomplete or failed attempts insert no
        // answers. Use textContent so typed responses never become markup.
        const review = document.createDocumentFragment();
        result.feedback.forEach((item, index) => {
          const article = document.createElement('article');
          article.dataset.correct = String(item.correct);
          const title = document.createElement('h4');
          title.textContent = `${index + 1}. ${item.title}`;
          const verdict = document.createElement('p');
          verdict.className = 'quiz-verdict';
          verdict.textContent = item.correct ? 'Correct response' : 'Revisit this case';
          article.append(title, verdict);
          for (const [label, text] of [['Your response', item.response], ['Answer', item.answer], ['Why', item.explanation]]) {
            const paragraph = document.createElement('p');
            const strong = document.createElement('strong');
            strong.textContent = `${label}: `;
            paragraph.append(strong, document.createTextNode(text));
            article.append(paragraph);
          }
          review.append(article);
        });
        feedbackList.replaceChildren(review);
        resultTitle.textContent = `${result.score} of ${result.total} cases checked correctly`;
        results.querySelector('[data-quiz-result-message]')!.textContent = result.score === result.total
          ? 'A clean sweep. Check that your reasoning matches the working below before signing off your audit.'
          : 'Good audits make room for corrections. Compare your choices with the working below, then try another pass if it helps.';
        reviewed = true;
        form.hidden = true;
        results.hidden = false;
        root.dataset.state = 'review';
        resultTitle.focus();
      } catch {
        loadError.textContent = 'The explanations could not load. Your responses are kept. Select Reveal answers to try again.';
        loadError.hidden = false;
      } finally {
        loading = false;
        form.inert = false;
        submit.textContent = 'Reveal answers';
        updateProgress();
        if (!reviewed) submit.focus();
      }
    });
    results.querySelector('[data-quiz-retry]')!.addEventListener('click', () => {
      form.reset();
      reviewed = false;
      feedbackList.replaceChildren();
      resultTitle.textContent = '';
      results.hidden = true;
      form.hidden = false;
      error.hidden = true;
      loadError.hidden = true;
      fields.forEach((_, i) => clearFieldError(i));
      root.dataset.state = 'attempt';
      showCase(0);
    });
    root.querySelector<HTMLElement>('[data-quiz-fallback]')!.hidden = true;
    root.querySelectorAll<HTMLElement>('[data-quiz-controls]').forEach(element => { element.hidden = false; });
    // Avoid browser form restoration silently carrying a previous attempt into
    // a fresh load. Within an attempt, back/next keeps every chosen response.
    form.reset();
    showCase(0, false);
    root.dataset.enhanced = 'true';
  }
}
