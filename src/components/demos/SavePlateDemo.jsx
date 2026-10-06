import { useEffect, useRef, useState } from 'react'
import DemoFrame, { Notes } from './DemoFrame.jsx'

const TABS = [
  { id: 'vendor', num: '01', label: 'Vendor' },
  { id: 'ngo', num: '02', label: 'NGO' },
]

const INITIAL = [
  { id: 1, emoji: '🥖', name: 'Sourdough loaves', qty: '10 loaves', vendor: 'Roti House', reason: 'Near expiry', pickup: '20:00', status: 'AVAILABLE', mine: false },
  { id: 2, emoji: '🍎', name: 'Mixed fruit box', qty: '5 kg', vendor: 'FreshMart', reason: 'Cosmetic issue', pickup: '18:30', status: 'AVAILABLE', mine: false },
]

const DRAFT = { emoji: '🍱', name: 'Nasi lemak bungkus', qty: '15 packs', reason: 'Surplus stock', pickup: '21:30' }

const STATUS_LABEL = { AVAILABLE: 'Available', CLAIMED: 'Claimed', RECEIVED: 'Received' }

// Each user action replays the cloud calls it triggers in the real deployment.
const TRACES = {
  publish: (item) => [
    ['client', `POST /api/v1/food-items/  "${item.name}"`],
    ['nginx', 'Nginx :443 → Gunicorn worker (EC2)'],
    ['django', 'Django REST · VendorOnly permission ✓'],
    ['dynamo', 'DynamoDB PutItem · FoodItems · status=AVAILABLE'],
    ['sns', 'SNS Publish · new-food-alerts → 128 subscribers'],
  ],
  claim: (item, left) => [
    ['client', `POST /api/v1/claims/  food_item=${item.id}`],
    ['nginx', 'Nginx :443 → Gunicorn worker (EC2)'],
    ['django', `Quota check · ${left + 1} free claims → ${left}`],
    ['dynamo', 'DynamoDB UpdateItem · status=CLAIMED'],
    ['sns', `SNS Publish · notify ${item.vendor}`],
  ],
  receive: (item) => [
    ['client', `PATCH /api/v1/claims/${item.id}/  status=RECEIVED`],
    ['nginx', 'Nginx :443 → Gunicorn worker (EC2)'],
    ['dynamo', 'DynamoDB UpdateItem · status=RECEIVED'],
  ],
}

const SVC = {
  client: 'S3 · React',
  nginx: 'Nginx',
  django: 'EC2 · Django',
  dynamo: 'DynamoDB',
  sns: 'SNS',
}

export default function SavePlateDemo() {
  const [role, setRole] = useState('vendor')
  const [items, setItems] = useState(INITIAL)
  const [published, setPublished] = useState(false)
  const [quota, setQuota] = useState(8)
  const [trace, setTrace] = useState([])
  const [shown, setShown] = useState(0)
  const [alert, setAlert] = useState(null)
  const timers = useRef([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const runTrace = (lines, onDone) => {
    timers.current.forEach(clearTimeout)
    setTrace(lines)
    setShown(0)
    timers.current = lines.map((_, i) =>
      setTimeout(() => {
        setShown(i + 1)
        if (i === lines.length - 1 && onDone) onDone()
      }, (i + 1) * 380),
    )
  }

  const publish = () => {
    const item = { ...DRAFT, id: 3, vendor: 'Kedai Mak Cik', status: 'AVAILABLE', mine: true }
    setPublished(true)
    setItems((list) => [item, ...list])
    runTrace(TRACES.publish(item), () => setAlert(item))
  }

  const claim = (item) => {
    if (quota === 0) return
    const left = quota - 1
    setQuota(left)
    setItems((list) => list.map((it) => (it.id === item.id ? { ...it, status: 'CLAIMED' } : it)))
    runTrace(TRACES.claim(item, left))
  }

  const receive = (item) => {
    setItems((list) => list.map((it) => (it.id === item.id ? { ...it, status: 'RECEIVED' } : it)))
    runTrace(TRACES.receive(item))
  }

  const reset = () => {
    timers.current.forEach(clearTimeout)
    setItems(INITIAL)
    setPublished(false)
    setQuota(8)
    setTrace([])
    setShown(0)
    setAlert(null)
    setRole('vendor')
  }

  const mine = items.filter((it) => it.mine)

  const stage = (
    <div className="browser">
      <div className="browser-bar">
        <span className="browser-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="browser-url">saveplate · {role === 'vendor' ? '/vendor/dashboard' : '/ngo/browse'}</span>
      </div>

      <div className="sp">
        <header className="sp-head">
          <span className="sp-logo">
            <span>●</span> SavePlate
          </span>
          <span className="sp-user">
            {role === 'vendor' ? 'Kedai Mak Cik · Vendor' : 'Food Aid KL · NGO'}
            <span className={`sp-bell ${alert && role === 'ngo' ? 'has-alert' : ''}`} aria-label="Notifications">
              🔔
            </span>
          </span>
        </header>

        {role === 'ngo' && alert && (
          <div className="sp-alert">
            <span>📧</span>
            <div>
              <b>New food near you:</b> {alert.name} ({alert.qty}) from {alert.vendor}
              <small>Sent by Amazon SNS to your email</small>
            </div>
            <button onClick={() => setAlert(null)} aria-label="Dismiss">
              ×
            </button>
          </div>
        )}

        {role === 'vendor' ? (
          <div className="sp-body">
            <section className="sp-panel">
              <h5>List surplus food</h5>
              <div className="sp-form">
                <label>
                  Item <span>{DRAFT.name}</span>
                </label>
                <label>
                  Quantity <span>{DRAFT.qty}</span>
                </label>
                <label>
                  Reason <span>{DRAFT.reason}</span>
                </label>
                <label>
                  Pickup by <span>{DRAFT.pickup}</span>
                </label>
                <label>
                  Price <span>RM 0.00 · free</span>
                </label>
              </div>
              <button className="sp-btn" onClick={publish} disabled={published}>
                {published ? '✓ Published' : 'Publish listing'}
              </button>
            </section>

            <section className="sp-panel">
              <h5>Your listings</h5>
              {mine.length === 0 && <p className="sp-empty">Nothing listed yet. Publish the draft to see it here.</p>}
              {mine.map((it) => (
                <div className="sp-row" key={it.id}>
                  <span className="sp-emoji">{it.emoji}</span>
                  <div className="sp-row-main">
                    <b>{it.name}</b>
                    <small>
                      {it.qty} · pickup {it.pickup}
                    </small>
                  </div>
                  <span className={`sp-status is-${it.status.toLowerCase()}`}>{STATUS_LABEL[it.status]}</span>
                  {it.status === 'CLAIMED' && (
                    <button className="sp-btn sp-btn--small" onClick={() => receive(it)}>
                      Confirm pickup
                    </button>
                  )}
                </div>
              ))}
              {published && mine[0]?.status === 'AVAILABLE' && (
                <p className="sp-hint">→ Switch to the NGO tab to claim it.</p>
              )}
              {mine[0]?.status === 'RECEIVED' && <p className="sp-hint">✓ 15 meals saved from the bin.</p>}
            </section>
          </div>
        ) : (
          <div className="sp-body sp-body--ngo">
            <div className="sp-quota">
              <span>Free claims left this week</span>
              <span className="sp-quota-pips">
                {Array.from({ length: 8 }, (_, i) => (
                  <i key={i} className={i < quota ? 'on' : ''} />
                ))}
              </span>
              <b>{quota}/8</b>
            </div>
            <div className="sp-feed">
              {items.map((it) => (
                <article className={`sp-card ${it.mine ? 'is-new' : ''}`} key={it.id}>
                  <span className="sp-card-img">{it.emoji}</span>
                  <div className="sp-card-main">
                    <b>{it.name}</b>
                    <small>
                      {it.vendor} · {it.qty}
                    </small>
                    <small>
                      {it.reason} · pickup by {it.pickup}
                    </small>
                  </div>
                  {it.status === 'AVAILABLE' ? (
                    <button className="sp-btn sp-btn--small" onClick={() => claim(it)} disabled={quota === 0}>
                      Claim
                    </button>
                  ) : (
                    <span className={`sp-status is-${it.status.toLowerCase()}`}>{STATUS_LABEL[it.status]}</span>
                  )}
                </article>
              ))}
            </div>
            {mine[0]?.status === 'CLAIMED' && (
              <p className="sp-hint">→ Back on the Vendor tab, confirm the pickup to close the loop.</p>
            )}
          </div>
        )}
      </div>
    </div>
  )

  const notes = (
    <Notes title="Follow one plate of food through the cloud">
      <p>
        Publish the draft as the vendor, switch to the NGO to get the alert and claim it, then confirm the pickup as
        the vendor. Every action below is replayed as the calls it makes in the AWS deployment.
      </p>
      <div className="trace" aria-live="polite">
        <div className="trace-head">
          <span>Cloud trace</span>
          <button onClick={reset}>Reset demo</button>
        </div>
        {trace.length === 0 && <p className="trace-empty">Waiting for a request…</p>}
        <ol>
          {trace.slice(0, shown).map(([svc, text], i) => (
            <li key={i} className={`trace-${svc}`}>
              <span className="trace-svc">{SVC[svc]}</span>
              <span className="trace-text">{text}</span>
            </li>
          ))}
        </ol>
      </div>
    </Notes>
  )

  return <DemoFrame tabs={TABS} active={role} onTab={setRole} stage={stage} notes={notes} />
}
