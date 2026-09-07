import { messageAuditAnswers } from '../../../data/quizzes/message-audit-answers';

export function GET() {
  return new Response(JSON.stringify(messageAuditAnswers), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
