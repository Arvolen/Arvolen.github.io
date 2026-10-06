import { profile } from '../data/profile.js'
import { RichText } from './SectionHead.jsx'

export default function Hero() {
  return (
    <header id="top" className="hero">
      <div className="wrap">
        <p className="eyebrow eyebrow--line hero-in" style={{ '--d': '0ms' }}>
          {profile.location}
        </p>

        <h1 className="hero-name hero-in" style={{ '--d': '80ms' }}>
          {profile.name}
        </h1>

        <p className="hero-headline hero-in" style={{ '--d': '160ms' }}>
          <RichText text={profile.headline} />
        </p>

        <div className="hero-actions hero-in" style={{ '--d': '240ms' }}>
          <a className="pill pill--lift" href="#work">
            See the work <span className="pill-dot">→</span>
          </a>
          <a className="pill pill--dashed" href="#fitness">
            <span className="status-dot" /> Every main project has a live demo
            <span className="tag-pop">try it</span>
          </a>
        </div>

        <dl className="hero-stats hero-in" style={{ '--d': '320ms' }}>
          {profile.stats.map((s) => (
            <div key={s.label}>
              <dt>{s.value}</dt>
              <dd>{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </header>
  )
}
