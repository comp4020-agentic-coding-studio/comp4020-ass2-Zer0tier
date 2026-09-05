import source from '../../lib/romance-models.ts?raw';
import ts from 'typescript';

// An additional teaching download, not a modification of the generated API.
export function GET() {
  const { outputText } = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } });
  return new Response(outputText, { headers: { 'Content-Type': 'text/javascript; charset=utf-8' } });
}
