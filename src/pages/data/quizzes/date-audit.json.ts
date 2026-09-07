import { dateAuditAnswers } from '../../../data/quizzes/date-audit-answers';

export function GET() {
  return new Response(JSON.stringify(dateAuditAnswers), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
