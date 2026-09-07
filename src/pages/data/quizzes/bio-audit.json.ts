import { bioAuditAnswers } from '../../../data/quizzes/bio-audit-answers';

export function GET() {
  return new Response(JSON.stringify(bioAuditAnswers), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
