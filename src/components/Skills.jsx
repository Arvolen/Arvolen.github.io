import { skills } from '../data/profile.js'
import SectionHead from './SectionHead.jsx'

export default function Skills() {
  return (
    <section id="skills" className="section section--band">
      <div className="wrap">
        <SectionHead eyebrow="Toolbox" title="What I build with" />
        <div className="skill-table">
          {skills.map((group, gi) => (
            <div className="skill-row reveal" key={group.group} style={{ '--delay': `${gi * 50}ms` }}>
              <p className="skill-group">{group.group}</p>
              <ul className="skill-chips">
                {group.items.map((it) => (
                  <li key={it.name} className="skill-chip">
                    {it.icon ? (
                      <img
                        src={it.icon}
                        alt=""
                        width="18"
                        height="18"
                        loading="lazy"
                        className={it.dark ? 'invert-dark' : ''}
                      />
                    ) : (
                      <span className="skill-mono" aria-hidden="true">
                        {it.name[0]}
                      </span>
                    )}
                    {it.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
