import { maintenanceAuditAnswers } from '../../../data/quizzes/maintenance-audit-answers';

export function GET() {
  return new Response(JSON.stringify(maintenanceAuditAnswers), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
