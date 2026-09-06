// SLOP1276: declared toy pipeline for the supplied English-language exercises.
// Count the original string's code points, without trimming or normalisation.
// Lowercase; maximal ASCII a-z/0-9 runs are tokens. All other characters split.
// No stemming or stop-word removal. Match every exact phrase; union token spans
// so overlapping or duplicate phrases never count the same token twice.
export function analyseBio(text, phrases = ['must love dogs', 'partner in crime']) {
  if (typeof text !== 'string' || !Array.isArray(phrases) ||
      phrases.some(phrase => typeof phrase !== 'string')) {
    throw new TypeError('Supply a string and an array of phrase strings.');
  }
  const tokenize = value => value.toLowerCase().match(/[a-z0-9]+/g) ?? [];
  const tokens = tokenize(text);
  const matched = new Set();
  for (const phrase of phrases) {
    const words = tokenize(phrase);
    if (!words.length) throw new RangeError('A phrase must contain at least one ASCII word token.');
    for (let start = 0; start <= tokens.length - words.length; start++) {
      if (words.every((word, offset) => word === tokens[start + offset])) {
        words.forEach((_, offset) => matched.add(start + offset));
      }
    }
  }
  const codePoints = [...text].length;
  return {
    codePoints,
    withinBudget: codePoints <= 150,
    tokens,
    matchedIndices: [...matched].sort((a, b) => a - b),
    matchedTokens: matched.size,
    tokenShare: tokens.length ? matched.size / tokens.length : null,
  };
}
