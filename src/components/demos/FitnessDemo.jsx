import { useEffect, useRef, useState } from 'react'
import DemoFrame, { Notes } from './DemoFrame.jsx'

const TABS = [
  { id: 'food', num: '01', label: 'Food scan' },
  { id: 'pose', num: '02', label: 'Form check' },
  { id: 'equipment', num: '03', label: 'Equipment' },
  { id: 'coach', num: '04', label: 'AI coach' },
]

// Gamification mirrors the backend: level up when XP >= level * 100.
function useXp() {
  const [state, setState] = useState({ level: 3, xp: 280 })
  const [toast, setToast] = useState(null)
  const timer = useRef()

  const award = (amount, goal) => {
    setState((s) => {
      const xp = s.xp + amount
      const levelUp = xp >= s.level * 100
      const next = { level: levelUp ? s.level + 1 : s.level, xp }
      setToast({
        id: Date.now(),
        text: levelUp ? `Level up! You reached Lv ${next.level}` : `+${amount} XP · ${goal}`,
        big: levelUp,
      })
      return next
    })
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setToast(null), 2600)
  }

  useEffect(() => () => clearTimeout(timer.current), [])
  return { ...state, toast, award }
}

export default function FitnessDemo() {
  const [tab, setTab] = useState('food')
  const xp = useXp()
  const screenRef = useRef(null)

  useEffect(() => {
    if (screenRef.current) screenRef.current.scrollTop = 0
  }, [tab])

  const titles = { food: 'Food Log', pose: 'Pose Analysis', equipment: 'Equipment Scan', coach: 'VitCoach' }
  const toNext = (xp.level * 100 - xp.xp) / 100
  const pct = Math.max(0, Math.min(100, 100 - toNext * 100))

  const stage = (
    <div className="phone">
      <div className="phone-notch" />
      <div className="phone-screen fit" ref={screenRef}>
        <div className="fit-status">
          <span>9:41</span>
          <span className="fit-status-icons">▂▄▆ ◔</span>
        </div>
        <header className="fit-head">
          <div>
            <p className="fit-eyebrow">VitCoach</p>
            <h5 className="fit-title">{titles[tab]}</h5>
          </div>
          <div className="fit-xp" title="Daily goals award XP">
            <span>Lv {xp.level}</span>
            <span className="fit-xp-bar">
              <span style={{ width: `${pct}%` }} />
            </span>
          </div>
        </header>

        {tab === 'food' && <FoodScan award={xp.award} screenRef={screenRef} />}
        {tab === 'pose' && <PoseCheck award={xp.award} screenRef={screenRef} />}
        {tab === 'equipment' && <EquipmentScan award={xp.award} screenRef={screenRef} />}
        {tab === 'coach' && <CoachChat />}
      </div>
      {xp.toast && (
        <div key={xp.toast.id} className={`fit-toast ${xp.toast.big ? 'is-big' : ''}`}>
          {xp.toast.text}
        </div>
      )}
    </div>
  )

  return <DemoFrame tabs={TABS} active={tab} onTab={setTab} stage={stage} notes={NOTES[tab]} />
}

/* ------------------------------------------------------------------ */
/* Notes                                                               */
/* ------------------------------------------------------------------ */

const NOTES = {
  food: (
    <Notes
      title="Snap a meal, get the macros"
      hood={[
        'ResNet-50 written and trained from scratch in PyTorch',
        '224 food classes, including Thai and Malaysian dishes',
        'Top prediction → lookup in a nutrition table (kcal, protein, carbs, fat)',
        'Logging a meal counts towards the "log 3 meals" daily goal',
      ]}
    >
      <p>
        Pick one of the sample photos and press <strong>Scan</strong>. The classifier returns its top guesses with
        confidence, then the app looks up calories and macros for the winning class and lets you log it.
      </p>
    </Notes>
  ),
  pose: (
    <Notes
      title="Your rep vs. a reference rep"
      hood={[
        'MoveNet Lightning (TensorFlow Hub) finds 17 body keypoints per frame',
        'Dynamic Time Warping lines your rep up with a reference recording',
        'Joint angles (knees, elbows) compared frame-by-frame with cosine similarity',
        'Score ≥ 90 → "Excellent", ≥ 75 → "Good job", below → "room for improvement"',
      ]}
    >
      <p>
        The solid skeleton is you; the dashed one is the reference. Upload a set and the backend extracts the
        keypoints, aligns the two movements in time, and scores how closely your joint angles follow the reference.
      </p>
    </Notes>
  ),
  equipment: (
    <Notes
      title="What is this machine, and what do I do on it?"
      hood={[
        'Second ResNet-50 trained on 19 gym-equipment classes',
        'Prediction is matched against an exercise dataset by equipment',
        'Suggestions include target muscle and difficulty (1–5)',
      ]}
    >
      <p>
        New to the gym? Point the camera at a machine. The model recognises it and suggests exercises you can do on
        it, so nobody has to stand there pretending to know what the rowing machine is for.
      </p>
    </Notes>
  ),
  coach: (
    <Notes
      title="A coach that knows who it's talking to"
      hood={[
        'Google Gemini behind a Django endpoint',
        'Your profile (age, height, weight, goal, activity level) is injected into the system prompt',
        'Guardrails keep it on fitness topics and add a see-a-professional reminder',
        'Chat sessions and history are stored per user',
      ]}
    >
      <p>
        Tap a question. The answers are scripted for this demo, but they show the real behaviour: advice tailored to
        the profile, and a polite refusal when you go off-topic.
      </p>
    </Notes>
  ),
}

/* ------------------------------------------------------------------ */
/* Food scan                                                           */
/* ------------------------------------------------------------------ */

// Nutrition values are the actual rows from the app's food_info.csv.
const FOODS = [
  {
    emoji: '🍛',
    name: 'Fried Rice',
    serving: 'chicken, 1 cup',
    kcal: 350, protein: 15, carbs: 50, fat: 10,
    preds: [['fried_rice', 91.4], ['bibimbap', 5.2], ['paella', 1.9]],
  },
  {
    emoji: '🥗',
    name: 'Caesar Salad',
    serving: 'with chicken',
    kcal: 450, protein: 30, carbs: 10, fat: 32,
    preds: [['caesar_salad', 88.1], ['greek_salad', 7.3], ['beet_salad', 2.6]],
  },
  {
    emoji: '🍜',
    name: 'Pad Thai',
    serving: 'with shrimp',
    kcal: 500, protein: 20, carbs: 70, fat: 18,
    preds: [['pad_thai', 84.7], ['YamWoonSen', 9.8], ['fried_rice', 3.1]],
  },
]

const MACRO_COLORS = { protein: '#ff6a3d', carbs: '#f5c04a', fat: '#6cc3ff' }

function scrollScreenDown(screenRef) {
  requestAnimationFrame(() => {
    const el = screenRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  })
}

function useScan(duration, screenRef) {
  const [phase, setPhase] = useState('idle')
  const timer = useRef()
  useEffect(() => () => clearTimeout(timer.current), [])
  const start = () => {
    setPhase('scanning')
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      setPhase('done')
      scrollScreenDown(screenRef)
    }, duration)
  }
  const reset = () => {
    clearTimeout(timer.current)
    setPhase('idle')
  }
  return [phase, start, reset]
}

function Viewfinder({ emoji, phase, label }) {
  return (
    <div className={`fit-viewfinder is-${phase}`}>
      <span className="vf-corner tl" />
      <span className="vf-corner tr" />
      <span className="vf-corner bl" />
      <span className="vf-corner br" />
      <span className="vf-subject">{emoji}</span>
      {phase === 'scanning' && <span className="vf-line" />}
      <span className="vf-label">{phase === 'scanning' ? 'Running model…' : label}</span>
    </div>
  )
}

function Samples({ items, sel, onPick }) {
  return (
    <div className="fit-samples">
      <span>Sample photos</span>
      <div>
        {items.map((it, i) => (
          <button
            key={it.name}
            className={`fit-thumb ${i === sel ? 'is-on' : ''}`}
            onClick={() => onPick(i)}
            aria-label={it.name}
          >
            {it.emoji}
          </button>
        ))}
      </div>
    </div>
  )
}

function Predictions({ preds }) {
  return (
    <ul className="fit-preds">
      {preds.map(([cls, p], i) => (
        <li key={cls} className={i === 0 ? 'is-top' : ''}>
          <span className="fit-pred-name">{cls}</span>
          <span className="fit-pred-bar">
            <span style={{ '--w': `${p}%`, animationDelay: `${i * 120}ms` }} />
          </span>
          <span className="fit-pred-pct">{p.toFixed(1)}%</span>
        </li>
      ))}
    </ul>
  )
}

function FoodScan({ award, screenRef }) {
  const [sel, setSel] = useState(0)
  const [logged, setLogged] = useState(false)
  const [phase, scan, reset] = useScan(1500, screenRef)
  const food = FOODS[sel]

  const pick = (i) => {
    setSel(i)
    setLogged(false)
    reset()
  }

  const macroKcal = { protein: food.protein * 4, carbs: food.carbs * 4, fat: food.fat * 9 }
  const total = macroKcal.protein + macroKcal.carbs + macroKcal.fat
  const C = 2 * Math.PI * 38
  let offset = 0

  return (
    <div className="fit-body">
      <Viewfinder emoji={food.emoji} phase={phase} label="Point at your meal" />
      <Samples items={FOODS} sel={sel} onPick={pick} />

      {phase !== 'done' && (
        <button className="fit-btn" onClick={scan} disabled={phase === 'scanning'}>
          {phase === 'scanning' ? 'Scanning…' : 'Scan meal'}
        </button>
      )}

      {phase === 'done' && (
        <div className="fit-result">
          <p className="fit-section">Prediction</p>
          <Predictions preds={food.preds} />

          <div className="fit-card fit-nutri">
            <div className="fit-nutri-head">
              <div>
                <p className="fit-food">{food.name}</p>
                <p className="fit-serving">{food.serving}</p>
              </div>
              <div className="fit-kcal">
                <span>{food.kcal}</span> kcal
              </div>
            </div>
            <div className="fit-nutri-body">
              <svg viewBox="0 0 100 100" className="fit-donut" aria-hidden="true">
                <circle cx="50" cy="50" r="38" className="fit-donut-track" />
                {Object.entries(macroKcal).map(([k, v]) => {
                  const len = (v / total) * C
                  const seg = (
                    <circle
                      key={k}
                      cx="50"
                      cy="50"
                      r="38"
                      stroke={MACRO_COLORS[k]}
                      strokeDasharray={`${len} ${C - len}`}
                      strokeDashoffset={-offset}
                      className="fit-donut-seg"
                    />
                  )
                  offset += len
                  return seg
                })}
              </svg>
              <ul className="fit-macros">
                {['protein', 'carbs', 'fat'].map((k) => (
                  <li key={k}>
                    <span className="fit-dot" style={{ background: MACRO_COLORS[k] }} />
                    <span className="fit-macro-name">{k}</span>
                    <span className="fit-macro-val">{food[k]} g</span>
                    <span className="fit-macro-pct">{Math.round((macroKcal[k] / total) * 100)}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <button
            className="fit-btn"
            disabled={logged}
            onClick={() => {
              setLogged(true)
              award(10, 'Log 3 meals (1/3)')
            }}
          >
            {logged ? '✓ Logged to today' : 'Log this meal'}
          </button>
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Pose check                                                          */
/* ------------------------------------------------------------------ */

// Side-view keypoints (subset of MoveNet's 17) for the top and bottom of each rep.
const POSES = {
  squat: {
    label: 'Squat',
    joint: ['hip', 'knee', 'ankle'],
    jointName: 'Knee',
    score: 84,
    ref: {
      a: { head: [120, 34], shoulder: [120, 64], elbow: [132, 100], wrist: [140, 132], hip: [120, 140], knee: [122, 205], ankle: [120, 268], toe: [142, 270] },
      b: { head: [140, 96], shoulder: [134, 124], elbow: [166, 130], wrist: [198, 128], hip: [84, 184], knee: [140, 200], ankle: [120, 268], toe: [142, 270] },
    },
    user: {
      a: { head: [120, 34], shoulder: [120, 64], elbow: [132, 100], wrist: [140, 132], hip: [120, 140], knee: [122, 205], ankle: [120, 268], toe: [142, 270] },
      b: { head: [146, 88], shoulder: [138, 116], elbow: [168, 124], wrist: [198, 122], hip: [94, 172], knee: [146, 194], ankle: [120, 268], toe: [142, 270] },
    },
  },
  pushup: {
    label: 'Push-up',
    joint: ['shoulder', 'elbow', 'wrist'],
    jointName: 'Elbow',
    score: 92,
    ref: {
      a: { head: [50, 147], shoulder: [72, 156], elbow: [72, 196], wrist: [72, 236], hip: [150, 190], knee: [192, 208], ankle: [228, 224], toe: [236, 236] },
      b: { head: [50, 180], shoulder: [72, 185], elbow: [103, 210], wrist: [72, 236], hip: [150, 204], knee: [192, 215], ankle: [228, 224], toe: [236, 236] },
    },
    user: {
      a: { head: [50, 147], shoulder: [72, 156], elbow: [72, 196], wrist: [72, 236], hip: [150, 192], knee: [192, 209], ankle: [228, 224], toe: [236, 236] },
      b: { head: [50, 178], shoulder: [72, 182], elbow: [102, 207], wrist: [72, 236], hip: [150, 212], knee: [192, 219], ankle: [228, 224], toe: [236, 236] },
    },
  },
}

const BONES = [
  ['shoulder', 'elbow'],
  ['elbow', 'wrist'],
  ['shoulder', 'hip'],
  ['hip', 'knee'],
  ['knee', 'ankle'],
  ['ankle', 'toe'],
  ['head', 'shoulder'],
]

const lerpPose = (a, b, t) =>
  Object.fromEntries(Object.keys(a).map((k) => [k, [a[k][0] + (b[k][0] - a[k][0]) * t, a[k][1] + (b[k][1] - a[k][1]) * t]]))

function angle(a, b, c) {
  const ba = [a[0] - b[0], a[1] - b[1]]
  const bc = [c[0] - b[0], c[1] - b[1]]
  const cos = (ba[0] * bc[0] + ba[1] * bc[1]) / (Math.hypot(...ba) * Math.hypot(...bc))
  return (Math.acos(Math.max(-1, Math.min(1, cos))) * 180) / Math.PI
}

function useRepCycle(period = 2600) {
  const [t, setT] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setT(1)
      return
    }
    let raf
    const start = performance.now()
    const tick = (now) => {
      setT((1 - Math.cos(((now - start) / period) * 2 * Math.PI)) / 2)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [period])
  return t
}

function Skeleton({ pose, className }) {
  return (
    <g className={className}>
      {BONES.map(([a, b]) => (
        <line key={a + b} x1={pose[a][0]} y1={pose[a][1]} x2={pose[b][0]} y2={pose[b][1]} />
      ))}
      <circle cx={pose.head[0]} cy={pose.head[1]} r="11" className="sk-head" />
      {Object.entries(pose).map(([k, [x, y]]) => k !== 'head' && <circle key={k} cx={x} cy={y} r="3.6" className="sk-joint" />)}
    </g>
  )
}

const ANALYSIS_STEPS = ['Extracting keypoints · 96 frames', 'Aligning reps with DTW', 'Comparing joint angles']

function feedbackFor(score) {
  if (score >= 90) return `Excellent form! Your overall score was ${score}%. Keep up the great work.`
  if (score >= 75)
    return `Good job! Your form was solid with a score of ${score}%. Try to focus on consistency in your next set.`
  return `There's room for improvement. Your score was ${score}%. Watch the reference video again and focus on matching the movement.`
}

function PoseCheck({ award, screenRef }) {
  const [ex, setEx] = useState('squat')
  const [step, setStep] = useState(-1) // -1 idle, 0..2 analysing, 3 done
  const t = useRepCycle()
  const timers = useRef([])
  const cfg = POSES[ex]

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const choose = (k) => {
    timers.current.forEach(clearTimeout)
    setEx(k)
    setStep(-1)
  }

  const analyse = () => {
    timers.current.forEach(clearTimeout)
    setStep(0)
    timers.current = [1, 2, 3].map((s) =>
      setTimeout(() => {
        setStep(s)
        if (s === 3) {
          award(20, 'Use pose analysis')
          scrollScreenDown(screenRef)
        }
      }, s * 700),
    )
  }

  const ref = lerpPose(cfg.ref.a, cfg.ref.b, t)
  const user = lerpPose(cfg.user.a, cfg.user.b, t)
  const [j1, j2, j3] = cfg.joint
  const userAngle = Math.round(angle(user[j1], user[j2], user[j3]))
  const refAngle = Math.round(angle(ref[j1], ref[j2], ref[j3]))

  // Deterministic per-frame similarity curve for the sparkline.
  const frames = Array.from({ length: 36 }, (_, i) =>
    Math.min(99, cfg.score + 6 * Math.sin(i / 2.2) - (i % 9 === 4 ? 9 : 0) + (ex === 'pushup' ? 1 : 0)),
  )
  const spark = frames.map((v, i) => `${(i / (frames.length - 1)) * 220},${60 - ((v - 60) / 40) * 56}`).join(' ')

  const R = 30
  const C = 2 * Math.PI * R

  return (
    <div className="fit-body">
      <div className="fit-seg">
        {Object.entries(POSES).map(([k, p]) => (
          <button key={k} className={ex === k ? 'is-on' : ''} onClick={() => choose(k)}>
            {p.label}
          </button>
        ))}
      </div>

      <div className="fit-video">
        <span className="fit-rec">● REC · {cfg.label.toLowerCase()}.mp4</span>
        <svg viewBox="0 0 260 290" className="fit-skeleton" role="img" aria-label={`${cfg.label} skeleton animation`}>
          <line x1="10" y1="272" x2="250" y2="272" className="sk-ground" />
          <Skeleton pose={ref} className="sk-ref" />
          <Skeleton pose={user} className="sk-user" />
          <circle cx={user[j2][0]} cy={user[j2][1]} r="14" className="sk-angle-ring" />
        </svg>
        <div className="fit-angles">
          <span>
            {cfg.jointName} · you <b>{userAngle}°</b>
          </span>
          <span>
            ref <b>{refAngle}°</b>
          </span>
        </div>
      </div>

      <div className="fit-legend">
        <span>
          <i className="lg-user" /> You
        </span>
        <span>
          <i className="lg-ref" /> Reference
        </span>
      </div>

      {step === -1 && (
        <button className="fit-btn" onClick={analyse}>
          Analyse my set
        </button>
      )}

      {step >= 0 && step < 3 && (
        <ul className="fit-steps">
          {ANALYSIS_STEPS.map((s, i) => (
            <li key={s} className={i < step ? 'is-done' : i === step ? 'is-now' : ''}>
              {i < step ? '✓' : i === step ? '◌' : '·'} {s}
            </li>
          ))}
        </ul>
      )}

      {step === 3 && (
        <div className="fit-result">
          <div className="fit-card fit-score">
            <svg viewBox="0 0 80 80" className="fit-ring" aria-hidden="true">
              <circle cx="40" cy="40" r={R} className="fit-ring-track" />
              <circle
                cx="40"
                cy="40"
                r={R}
                className="fit-ring-val"
                strokeDasharray={C}
                strokeDashoffset={C * (1 - cfg.score / 100)}
              />
            </svg>
            <div>
              <p className="fit-score-num">{cfg.score}%</p>
              <p className="fit-score-label">form similarity</p>
            </div>
          </div>
          <p className="fit-feedback">{feedbackFor(cfg.score)}</p>
          <p className="fit-section">Per-frame similarity</p>
          <svg viewBox="0 0 220 64" className="fit-spark" aria-hidden="true">
            <line x1="0" x2="220" y1={60 - ((75 - 60) / 40) * 56} y2={60 - ((75 - 60) / 40) * 56} className="fit-spark-th" />
            <polyline points={spark} />
          </svg>
          <button className="fit-btn fit-btn--ghost" onClick={() => setStep(-1)}>
            Record another set
          </button>
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Equipment scan                                                      */
/* ------------------------------------------------------------------ */

const EQUIPMENT = [
  {
    emoji: '🏋️',
    name: 'Barbell',
    preds: [['barbell', 93.2], ['bench_press', 4.1], ['Smith Machine', 1.6]],
    exercises: [
      ['Barbell Back Squat', 'Quadriceps', 3],
      ['Bent-over Row', 'Back', 3],
      ['Barbell Curl', 'Biceps', 2],
    ],
  },
  {
    emoji: '🏃',
    name: 'Treadmill',
    preds: [['treadmill', 89.5], ['elliptical', 6.8], ['statis-bicycle', 2.2]],
    exercises: [
      ['Incline Walk', 'Glutes · Calves', 1],
      ['Steady-state Jog', 'Cardio', 2],
      ['Interval Sprints', 'Cardio', 4],
    ],
  },
  {
    emoji: '🚣',
    name: 'Rowing machine',
    preds: [['rowing_machine', 86.9], ['multi_machine', 7.7], ['leg-press', 3.4]],
    exercises: [
      ['Steady Row', 'Back · Legs', 2],
      ['Row Pyramid', 'Full body', 3],
      ['250 m Power Strokes', 'Full body', 4],
    ],
  },
]

function EquipmentScan({ award, screenRef }) {
  const [sel, setSel] = useState(0)
  const [phase, scan, reset] = useScan(1300, screenRef)
  const eq = EQUIPMENT[sel]

  const pick = (i) => {
    setSel(i)
    reset()
  }

  return (
    <div className="fit-body">
      <Viewfinder emoji={eq.emoji} phase={phase} label="Point at a machine" />
      <Samples items={EQUIPMENT} sel={sel} onPick={pick} />

      {phase !== 'done' && (
        <button
          className="fit-btn"
          disabled={phase === 'scanning'}
          onClick={() => {
            scan()
            setTimeout(() => award(15, 'Scan gym equipment'), 1300)
          }}
        >
          {phase === 'scanning' ? 'Identifying…' : 'Identify equipment'}
        </button>
      )}

      {phase === 'done' && (
        <div className="fit-result">
          <p className="fit-section">Prediction</p>
          <Predictions preds={eq.preds} />
          <p className="fit-section">Try these on the {eq.name.toLowerCase()}</p>
          <ul className="fit-exercises">
            {eq.exercises.map(([name, muscle, diff]) => (
              <li key={name} className="fit-card">
                <div>
                  <p className="fit-ex-name">{name}</p>
                  <p className="fit-ex-muscle">{muscle}</p>
                </div>
                <span className="fit-diff" aria-label={`Difficulty ${diff} of 5`}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <i key={n} className={n <= diff ? 'on' : ''} />
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Coach chat                                                          */
/* ------------------------------------------------------------------ */

const SCRIPT = [
  {
    q: 'Make me a 3-day beginner plan',
    a: "Here's a simple full-body plan for your fat-loss goal:\n\nMon — Squats 3×10, Push-ups 3×8, Rows 3×10\nWed — 25 min incline walk + core circuit\nFri — Lunges 3×10, Shoulder press 3×10, Plank 3×30s\n\nAdd one rep per set each week. Remember to check with a doctor or certified trainer before starting a new program!",
  },
  {
    q: 'How much protein do I need?',
    a: 'At 70 kg and training 3× a week, aim for roughly 1.6 g per kg — about 110 g of protein a day. Spread it over 3–4 meals: eggs, chicken, tofu, Greek yoghurt and fish are easy wins.',
  },
  {
    q: 'Who won the last World Cup?',
    a: "That's an interesting question, but my expertise is in fitness and health. How can I help you with your workout routine today?",
  },
]

function CoachChat() {
  const [msgs, setMsgs] = useState([
    { from: 'bot', text: "Hi! I'm VitCoach 👋 I've read your profile. Ask me anything about training or nutrition." },
  ])
  const [typing, setTyping] = useState(false)
  const [used, setUsed] = useState([])
  const listRef = useRef(null)
  const timers = useRef([])

  useEffect(() => () => timers.current.forEach((t) => clearTimeout(t) || clearInterval(t)), [])

  useEffect(() => {
    const el = listRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [msgs, typing])

  const ask = (i) => {
    const { q, a } = SCRIPT[i]
    setUsed((u) => [...u, i])
    setMsgs((m) => [...m, { from: 'me', text: q }])
    setTyping(true)
    const t1 = setTimeout(() => {
      setTyping(false)
      setMsgs((m) => [...m, { from: 'bot', text: '' }])
      let n = 0
      const iv = setInterval(() => {
        n += 3
        setMsgs((m) => {
          const copy = m.slice()
          copy[copy.length - 1] = { from: 'bot', text: a.slice(0, n) }
          return copy
        })
        if (n >= a.length) clearInterval(iv)
      }, 16)
      timers.current.push(iv)
    }, 800)
    timers.current.push(t1)
  }

  const streaming = typing || (msgs.at(-1).from === 'bot' && used.length > 0 && msgs.at(-1).text.length < SCRIPT[used.at(-1)].a.length)

  return (
    <div className="fit-chat">
      <div className="fit-profile">22 y · 175 cm · 70 kg · Goal: lose fat · Active 3×/wk</div>
      <div className="fit-msgs" ref={listRef}>
        {msgs.map((m, i) => (
          <p key={i} className={`fit-msg is-${m.from}`}>
            {m.text}
          </p>
        ))}
        {typing && (
          <p className="fit-msg is-bot fit-typing">
            <i />
            <i />
            <i />
          </p>
        )}
      </div>
      <div className="fit-prompts">
        {SCRIPT.map((s, i) =>
          used.includes(i) ? null : (
            <button key={s.q} onClick={() => ask(i)} disabled={streaming}>
              {s.q}
            </button>
          ),
        )}
        {used.length === SCRIPT.length && <span className="fit-prompts-done">That's the whole script — thanks for chatting!</span>}
      </div>
    </div>
  )
}
