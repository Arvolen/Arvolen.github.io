import { education, profile } from '../data/profile.js'
import SectionHead from './SectionHead.jsx'

export default function Extras() {
  return (
    <section className="section section--band">
      <div className="wrap">
        <SectionHead eyebrow="The rest of it" title="Education, languages, right now" />
        <div className="extras">
          <article className="extra-card reveal">
            <p className="extra-label">Education</p>
            <h4 className="extra-title">{education.degree}</h4>
            <p className="extra-sub">{education.school}</p>
            <p className="extra-meta">
              {education.period} · <b>{education.detail}</b>
            </p>
          </article>

          <article className="extra-card reveal" style={{ '--delay': '80ms' }}>
            <p className="extra-label">Languages</p>
            <ul className="lang-list">
              {profile.spokenLanguages.map((l) => (
                <li key={l.name}>
                  <span>{l.name}</span>
                  <span className="lang-level">{l.level}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="extra-card reveal" style={{ '--delay': '160ms' }}>
            <p className="extra-label">Right now</p>
            <ul className="now-list">
              <li>
                <span className="status-dot" /> {profile.status}
              </li>
              <li>📚 Studying HSK Mandarin — with my own ChineseCard app</li>
              <li>🤖 Building with LLM APIs and agents</li>
              <li>📍 Based in {profile.location}</li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  )
}
