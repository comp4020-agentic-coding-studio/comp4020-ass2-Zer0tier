import { followupAuditAnswers } from '../../../data/quizzes/followup-audit-answers';

export function GET() {
  return new Response(JSON.stringify(followupAuditAnswers), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
