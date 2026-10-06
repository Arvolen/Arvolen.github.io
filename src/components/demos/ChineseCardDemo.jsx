import { useRef, useState } from 'react'
import DemoFrame, { Notes } from './DemoFrame.jsx'
import { comparePinyin, normalize, sm2, toDiacritics } from './pinyin.js'

// HSK 1 cards with made-up review history so the SM-2 intervals vary.
const DECK = [
  { hanzi: '你好', pinyin: 'ni3 hao3', meaning: 'hello', state: { ease: 2.5, intervalDays: 6, reps: 2 } },
  { hanzi: '谢谢', pinyin: 'xie4 xie', meaning: 'thank you', state: { ease: 2.6, intervalDays: 15, reps: 3 } },
  { hanzi: '女儿', pinyin: 'nü3 er2', meaning: 'daughter', state: { ease: 2.5, intervalDays: 1, reps: 1 } },
  { hanzi: '学生', pinyin: 'xue2 sheng1', meaning: 'student', state: { ease: 2.36, intervalDays: 0, reps: 0 } },
  { hanzi: '老师', pinyin: 'lao3 shi1', meaning: 'teacher', state: { ease: 2.2, intervalDays: 9, reps: 4 } },
]

const GRADES = [
  { label: 'Again', q: 0 },
  { label: 'Hard', q: 3 },
  { label: 'Good', q: 4 },
  { label: 'Easy', q: 5 },
]

const VERDICT = {
  correct: { text: 'Correct', cls: 'is-correct' },
  'tones-off': { text: 'Right letters, wrong tones', cls: 'is-partial' },
  wrong: { text: 'Not quite', cls: 'is-wrong' },
}

const fmtDays = (d) => (d < 30 ? `${d}d` : `${(d / 30).toFixed(1)}mo`)

function suggestions(card) {
  const letters = normalize(card.pinyin).replace(/[1-5]/g, '')
  const list = [card.pinyin, toDiacritics(card.pinyin), letters]
  if (card.pinyin.includes('ü')) list.push(card.pinyin.replace(/ü/g, 'v'))
  return list
}

function speak(text) {
  try {
    const u = new SpeechSynthesisUtterance(text)
    u.lang = 'zh-CN'
    u.rate = 0.85
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(u)
  } catch {
    /* speech not available */
  }
}

export default function ChineseCardDemo() {
  const [idx, setIdx] = useState(0)
  const [input, setInput] = useState('')
  const [verdict, setVerdict] = useState(null)
  const [results, setResults] = useState([])
  const inputRef = useRef(null)
  const canSpeak = typeof window !== 'undefined' && 'speechSynthesis' in window

  const done = idx >= DECK.length
  const card = DECK[idx]

  const check = (e) => {
    e?.preventDefault()
    if (verdict || !input.trim()) return
    setVerdict(comparePinyin(input, card.pinyin))
  }

  const grade = () => {
    setResults((r) => [...r, verdict])
    setIdx((i) => i + 1)
    setInput('')
    setVerdict(null)
    requestAnimationFrame(() => inputRef.current?.focus({ preventScroll: true }))
  }

  const restart = () => {
    setIdx(0)
    setInput('')
    setVerdict(null)
    setResults([])
  }

  const preview = input.trim() ? toDiacritics(input) : ''

  const stage = (
    <div className="phone phone--ink">
      <div className="phone-notch" />
      <div className="phone-screen cc">
        <div className="cc-top">
          <span className="cc-deck">HSK 1 · 汉字 → pinyin</span>
          <span className="cc-streak">🔥 5</span>
        </div>
        <div className="cc-progress">
          <span style={{ width: `${(Math.min(idx, DECK.length) / DECK.length) * 100}%` }} />
        </div>

        {!done ? (
          <>
            <div className="cc-card">
              <span className="cc-count">
                {idx + 1} / {DECK.length}
              </span>
              <span className="cc-hanzi" lang="zh-CN">
                {card.hanzi}
              </span>
              {verdict && (
                <div className="cc-answer">
                  <span className="cc-pinyin">{toDiacritics(card.pinyin)}</span>
                  <span className="cc-meaning">{card.meaning}</span>
                  {canSpeak && (
                    <button className="cc-listen" onClick={() => speak(card.hanzi)}>
                      听 Listen
                    </button>
                  )}
                </div>
              )}
            </div>

            {verdict && <div className={`cc-verdict ${VERDICT[verdict].cls}`}>{VERDICT[verdict].text}</div>}

            {!verdict ? (
              <form className="cc-form" onSubmit={check}>
                <label className="cc-label" htmlFor="cc-input">
                  Type the pinyin
                </label>
                <input
                  id="cc-input"
                  ref={inputRef}
                  className="cc-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="ni3 · nǐ · nv3 · ni"
                  autoComplete="off"
                  autoCapitalize="off"
                  spellCheck="false"
                />
                <p className="cc-preview">{preview ? <>reads as <b>{preview}</b></> : ' '}</p>
                <div className="cc-chips">
                  {suggestions(card).map((s) => (
                    <button type="button" key={s} onClick={() => setInput(s)}>
                      {s}
                    </button>
                  ))}
                </div>
                <button className="cc-btn" type="submit" disabled={!input.trim()}>
                  Check answer
                </button>
              </form>
            ) : (
              <div className="cc-grades">
                {GRADES.map((g) => (
                  <button key={g.label} onClick={grade} className={`cc-grade cc-grade--${g.label.toLowerCase()}`}>
                    <span>{g.label}</span>
                    <small>{fmtDays(sm2(card.state, g.q).intervalDays)}</small>
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="cc-done">
            <span className="cc-done-mark" lang="zh-CN">
              完
            </span>
            <p className="cc-done-title">Session complete</p>
            <p className="cc-done-stats">
              {results.filter((r) => r === 'correct').length} correct ·{' '}
              {results.filter((r) => r === 'tones-off').length} tones off ·{' '}
              {results.filter((r) => r === 'wrong').length} missed
            </p>
            <p className="cc-done-streak">🔥 6-day streak · studied today</p>
            <button className="cc-btn" onClick={restart}>
              Study again
            </button>
          </div>
        )}
      </div>
    </div>
  )

  const notes = (
    <Notes
      title="This one is the real logic"
      hood={[
        'Pinyin normaliser and SM-2 scheduler ported from the app\'s TypeScript',
        'Any input style collapses to one canonical form: nǐ / ni3 / nv3 → ni3, nü3',
        '"Tones off" is gentler feedback, but still not counted as correct for scheduling',
        'Each grade button shows the next review interval SM-2 would schedule',
      ]}
    >
      <p>
        Type the pinyin for each character in any style — tone numbers, tone marks, <code>v</code> for ü, or no tones
        at all — or tap a suggestion. Try leaving the tones off to see the in-between verdict.
      </p>
    </Notes>
  )

  return <DemoFrame stage={stage} notes={notes} />
}
