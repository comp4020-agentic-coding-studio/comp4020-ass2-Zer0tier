import { platformAuditAnswers } from '../../../data/quizzes/platform-audit-answers';

export function GET() {
  return new Response(JSON.stringify(platformAuditAnswers), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
