import { communicationAuditAnswers } from '../../../data/quizzes/communication-audit-answers';

export function GET() {
  return new Response(JSON.stringify(communicationAuditAnswers), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
