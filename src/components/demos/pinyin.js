// Ported from ChineseCard (src/pinyin/normalize.ts, toDiacritics.ts, src/srs/sm2.ts)
// so the demo on the site runs the app's real logic.

const DIACRITIC_MAP = {
  ā: ['a', 1], á: ['a', 2], ǎ: ['a', 3], à: ['a', 4],
  ē: ['e', 1], é: ['e', 2], ě: ['e', 3], è: ['e', 4],
  ī: ['i', 1], í: ['i', 2], ǐ: ['i', 3], ì: ['i', 4],
  ō: ['o', 1], ó: ['o', 2], ǒ: ['o', 3], ò: ['o', 4],
  ū: ['u', 1], ú: ['u', 2], ǔ: ['u', 3], ù: ['u', 4],
  ǖ: ['ü', 1], ǘ: ['ü', 2], ǚ: ['ü', 3], ǜ: ['ü', 4],
}

function normalizeSyllable(raw) {
  let letters = ''
  let tone = null
  let trailingDigit = null
  for (const ch of raw.toLowerCase().trim()) {
    const mapped = DIACRITIC_MAP[ch]
    if (mapped) {
      letters += mapped[0]
      tone = mapped[1]
    } else if (ch === 'v') {
      letters += 'ü'
    } else if (ch >= '1' && ch <= '5') {
      trailingDigit = Number(ch)
    } else if (/[a-zü]/.test(ch)) {
      letters += ch
    }
  }
  if (trailingDigit !== null) tone = trailingDigit >= 1 && trailingDigit <= 4 ? trailingDigit : null
  return { letters, tone }
}

export function normalize(raw) {
  if (!raw) return ''
  return raw
    .trim()
    .split(/\s+/)
    .map((s) => {
      const { letters, tone } = normalizeSyllable(s)
      return tone == null ? letters : `${letters}${tone}`
    })
    .join(' ')
}

const lettersOnly = (raw) => normalize(raw).replace(/[1-5]/g, '')

export function comparePinyin(user, expected) {
  if (!user.trim()) return 'wrong'
  if (normalize(user) === normalize(expected)) return 'correct'
  if (lettersOnly(user) === lettersOnly(expected)) return 'tones-off'
  return 'wrong'
}

const TONE_MARKS = {
  a: ['a', 'ā', 'á', 'ǎ', 'à'],
  e: ['e', 'ē', 'é', 'ě', 'è'],
  i: ['i', 'ī', 'í', 'ǐ', 'ì'],
  o: ['o', 'ō', 'ó', 'ǒ', 'ò'],
  u: ['u', 'ū', 'ú', 'ǔ', 'ù'],
  ü: ['ü', 'ǖ', 'ǘ', 'ǚ', 'ǜ'],
}

function findToneVowelIndex(letters) {
  for (const p of ['a', 'o', 'e']) {
    const idx = letters.indexOf(p)
    if (idx >= 0) return idx
  }
  for (let i = letters.length - 1; i >= 0; i--) if ('iuü'.includes(letters[i])) return i
  return -1
}

function syllableToDiacritic(letters, tone) {
  if (tone == null || tone < 1 || tone > 4) return letters
  const idx = findToneVowelIndex(letters)
  if (idx < 0) return letters
  const marked = TONE_MARKS[letters[idx]]?.[tone]
  return marked ? letters.slice(0, idx) + marked + letters.slice(idx + 1) : letters
}

export function toDiacritics(raw) {
  if (!raw) return ''
  return raw
    .trim()
    .split(/\s+/)
    .map((s) => {
      const { letters, tone } = normalizeSyllable(s)
      return syllableToDiacritic(letters, tone)
    })
    .join(' ')
}

export function sm2(prev, grade) {
  let ease = prev.ease + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02))
  if (ease < 1.3) ease = 1.3
  let { reps } = prev
  let intervalDays
  if (grade < 3) {
    reps = 0
    intervalDays = 1
  } else if (reps === 0) {
    intervalDays = 1
    reps = 1
  } else if (reps === 1) {
    intervalDays = 6
    reps = 2
  } else {
    intervalDays = Math.max(1, Math.round(prev.intervalDays * ease))
    reps += 1
  }
  return { ease, intervalDays, reps }
}
