import { photoAuditAnswers } from '../../../data/quizzes/photo-audit-answers';

export function GET() {
  return new Response(JSON.stringify(photoAuditAnswers), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
