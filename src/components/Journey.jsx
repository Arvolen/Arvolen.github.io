import { journey } from '../data/profile.js'
import SectionHead from './SectionHead.jsx'

export default function Journey() {
  return (
    <section id="journey" className="section">
      <div className="wrap">
        <SectionHead eyebrow="Journey" title="Where I've been" center />
        <ol className="timeline">
          {journey.map((item, i) => (
            <li key={item.title} className={`tl-item ${i % 2 ? 'is-right' : 'is-left'}`}>
              <span className="tl-dot" aria-hidden="true" />
              <article className="tl-card reveal">
                <p className="tl-period">{item.period}</p>
                <h3 className="tl-title">{item.title}</h3>
                <p className="tl-org">{item.org}</p>
                <ul className="tl-points">
                  {item.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <ul className="chips">
                  {item.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
