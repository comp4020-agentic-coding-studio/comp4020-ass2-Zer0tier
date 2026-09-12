export function downloadJSON(value: unknown, filename: string) {
  const url = URL.createObjectURL(new Blob([JSON.stringify(value, null, 2) + '\n'], { type: 'application/json' }));
  const link = document.createElement('a');
  link.href = url; link.download = filename;
  document.body.append(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export function textNode<K extends keyof HTMLElementTagNameMap>(tag: K, text: string) {
  const element = document.createElement(tag);
  element.textContent = text;
  return element;
}
