import { useState } from 'react'
import { featured, more } from '../data/projects.js'
import SectionHead from './SectionHead.jsx'
import FitnessDemo from './demos/FitnessDemo.jsx'
import SavePlateDemo from './demos/SavePlateDemo.jsx'
import ChineseCardDemo from './demos/ChineseCardDemo.jsx'

const DEMOS = {
  fitness: FitnessDemo,
  saveplate: SavePlateDemo,
  chinesecard: ChineseCardDemo,
}

export function Cover({ cover, title, big = false, children }) {
  return (
    <div
      className={`cover ${big ? 'cover--big' : ''}`}
      style={{ '--from': cover.from, '--to': cover.to }}
      role="img"
      aria-label={`${title} cover art`}
    >
      <span className="cover-grid" aria-hidden="true" />
      <span className="cover-emoji" lang="zh-CN" aria-hidden="true">
        {cover.emoji}
      </span>
      {children}
    </div>
  )
}

function FeaturedRow({ project: p, index }) {
  const [open, setOpen] = useState(false)
  const Demo = DEMOS[p.id]
  const github = p.links.find((l) => l.href.includes('github.com'))

  const toggle = () => setOpen((o) => !o)

  return (
    <article id={p.id} className={`feature accent-${p.accent} ${index % 2 ? 'is-flipped' : ''}`}>
      <div className="feature-row">
        <div className="feature-text reveal">
          <p className="feature-meta">
            {p.code} / {p.year} · {p.kind}
          </p>
          <h3 className="feature-title">{p.title}</h3>
          <p className="feature-sub">{p.subtitle}</p>
          <p className="feature-tagline">{p.tagline}</p>
          <ul className="feature-points">
            {p.highlights.slice(0, 3).map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
          <ul className="chips">
            {p.stack.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <div className="feature-actions">
            {Demo && (
              <button className="pill pill--lift pill--accent" onClick={toggle} aria-expanded={open}>
                {open ? 'Hide the demo' : 'Try the live demo'}
                <span className="pill-dot">{open ? '×' : '▶'}</span>
              </button>
            )}
            {github && (
              <a className="pill" href={github.href} target="_blank" rel="noreferrer">
                Source on GitHub ↗
              </a>
            )}
          </div>
        </div>

        <button className="feature-visual reveal" onClick={toggle} aria-label={`Open the ${p.title} demo`}>
          <Cover cover={p.cover} title={p.title} big>
            <span className="cover-title">{p.title}</span>
            <span className="cover-stats">
              {p.stats.map((s) => (
                <span key={s.label} className="cover-stat">
                  <b>{s.value}</b> {s.label}
                </span>
              ))}
            </span>
            <span className="cover-cta">▶ Interactive demo</span>
          </Cover>
        </button>
      </div>

      {Demo && open && (
        <div className="feature-demo">
          <Demo />
        </div>
      )}
    </article>
  )
}

export default function Work() {
  return (
    <section id="work" className="section">
      <div className="wrap">
        <SectionHead
          eyebrow="Selected work"
          title="Things I've built"
          lede="Three projects I'm proudest of — each one with a hands-on demo you can play with right here."
        />
        {featured.map((p, i) => (
          <FeaturedRow key={p.id} project={p} index={i} />
        ))}

        <h3 className="subhead reveal">More projects</h3>
        <div className="cards">
          {more.map((p, i) => (
            <article key={p.id} className="card reveal" style={{ '--delay': `${i * 70}ms` }}>
              <Cover cover={p.cover} title={p.title}>
                <span className="cover-year">{p.year}</span>
              </Cover>
              <div className="card-body">
                <p className="card-kind">{p.kind}</p>
                <h4 className="card-title">{p.title}</h4>
                <p className="card-blurb">{p.blurb}</p>
                <ul className="chips chips--sm">
                  {p.stack.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <div className="card-foot">
                  {p.href ? (
                    <a className="pill pill--sm" href={p.href} target="_blank" rel="noreferrer">
                      View on GitHub ↗
                    </a>
                  ) : (
                    <span className="card-private">Private repository</span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
