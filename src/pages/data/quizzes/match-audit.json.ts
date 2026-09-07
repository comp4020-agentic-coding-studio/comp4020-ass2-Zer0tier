import { matchAuditAnswers } from '../../../data/quizzes/match-audit-answers';

export function GET() {
  return new Response(JSON.stringify(matchAuditAnswers), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
