import { handoverAuditAnswers } from '../../../data/quizzes/handover-audit-answers';

export function GET() {
  return new Response(JSON.stringify(handoverAuditAnswers), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
