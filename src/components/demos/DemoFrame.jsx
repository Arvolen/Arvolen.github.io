// Shared wrapper for the interactive project demos: header bar, optional tabs,
// the device/stage on the left and explanatory notes on the right.
export default function DemoFrame({ tabs, active, onTab, stage, notes }) {
  return (
    <div className="demo">
      <div className="demo-bar">
        <span className="demo-badge">
          <span className="demo-led" /> Try it
        </span>
        <span className="demo-disclaimer">Interactive illustration · sample data</span>
      </div>

      {tabs && (
        <div className="demo-tabs" role="tablist">
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={active === t.id}
              className={`demo-tab ${active === t.id ? 'is-active' : ''}`}
              onClick={() => onTab(t.id)}
            >
              <span className="demo-tab-num">{t.num}</span> {t.label}
            </button>
          ))}
        </div>
      )}

      <div className="demo-stage">
        <div className="demo-device">{stage}</div>
        <div className="demo-notes">{notes}</div>
      </div>
    </div>
  )
}

export function Notes({ title, children, hood }) {
  return (
    <>
      <h4 className="demo-notes-title">{title}</h4>
      <div className="demo-notes-body">{children}</div>
      {hood && (
        <>
          <span className="label">Under the hood</span>
          <ul className="hood">
            {hood.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </>
      )}
    </>
  )
}
