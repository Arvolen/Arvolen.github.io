import { education, profile } from '../data/profile.js'

export default function About() {
  const { github, linkedin, resume } = profile.links

  return (
    <section id="about" className="section">
      <div className="wrap about">
        <figure className="about-photo reveal">
          <img src={profile.photo} alt={`Portrait of ${profile.name}`} width="288" height="384" />
          <figcaption>
            <span className="status-dot" /> {profile.status}
          </figcaption>
        </figure>

        <div className="about-text reveal" style={{ '--delay': '100ms' }}>
          <span className="eyebrow eyebrow--line">About</span>
          <h2 className="about-hi">Hi there! I'm {profile.name}.</h2>
          <p className="about-lead">{profile.intro}</p>
          {profile.about.map((para, i) => (
            <p key={i} className="about-para">
              {para}
            </p>
          ))}

          <ul className="facts">
            <li>
              <span>📍</span> {profile.location}
            </li>
            <li>
              <span>🎓</span> {education.school.replace(' of Technology & Innovation', '')} · {education.period}
            </li>
            <li>
              <span>💬</span> {profile.spokenLanguages.map((l) => l.name.replace('Bahasa ', '')).join(' · ')}
            </li>
          </ul>

          <div className="about-actions">
            <a className="pill pill--lift" href="#contact">
              Get in touch <span className="pill-dot">→</span>
            </a>
            {resume && (
              <a className="pill" href={resume} target="_blank" rel="noreferrer">
                Résumé PDF ↓
              </a>
            )}
            {github && (
              <a className="pill" href={github} target="_blank" rel="noreferrer">
                GitHub ↗
              </a>
            )}
            {linkedin && (
              <a className="pill" href={linkedin} target="_blank" rel="noreferrer">
                LinkedIn ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
