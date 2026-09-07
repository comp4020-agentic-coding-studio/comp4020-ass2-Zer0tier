import { threatAuditAnswers } from '../../../data/quizzes/threat-audit-answers';

export function GET() {
  return new Response(JSON.stringify(threatAuditAnswers), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
