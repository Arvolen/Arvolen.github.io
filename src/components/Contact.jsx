import { useState } from 'react'
import { profile } from '../data/profile.js'

export default function Contact() {
  const { email, github, linkedin, resume } = profile.links
  const [form, setForm] = useState({ name: '', from: '', message: '' })
  const year = new Date().getFullYear()

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  // No backend needed: the message is handed to the visitor's own email app.
  const send = (e) => {
    e.preventDefault()
    const subject = `Portfolio message from ${form.name || 'a visitor'}`
    const body = `${form.message}\n\n— ${form.name}${form.from ? ` (${form.from})` : ''}`
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <section id="contact" className="section contact">
      <div className="wrap contact-grid">
        <div className="contact-text reveal">
          <span className="eyebrow eyebrow--line">Contact</span>
          <h2 className="section-title">Let's build something together.</h2>
          <p className="section-lede">
            Hiring, collaborating, or just curious about one of the projects? Email is the best way to reach me — I
            reply to every message.
          </p>
          <a className="contact-email" href={`mailto:${email}`}>
            {email}
          </a>
          <div className="contact-links">
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
            {resume && (
              <a className="pill" href={resume} target="_blank" rel="noreferrer">
                Résumé ↓
              </a>
            )}
          </div>
        </div>

        <form className="contact-form reveal" style={{ '--delay': '100ms' }} onSubmit={send}>
          <h3>Send a message</h3>
          <label>
            Your name
            <input value={form.name} onChange={update('name')} placeholder="Jane Doe" required />
          </label>
          <label>
            Your email
            <input type="email" value={form.from} onChange={update('from')} placeholder="jane@company.com" />
          </label>
          <label>
            Message
            <textarea
              rows="4"
              value={form.message}
              onChange={update('message')}
              placeholder="Hi Arlen, I'd like to talk about…"
              required
            />
          </label>
          <button className="pill pill--lift pill--solid" type="submit">
            Open in my email app <span className="pill-dot">→</span>
          </button>
          <p className="form-note">Nothing is stored — this just drafts an email for you.</p>
        </form>
      </div>

      <footer className="footer wrap">
        <span>
          © {year} {profile.name} · {profile.location}
        </span>
        <span>Built with React · hosted free on GitHub Pages</span>
      </footer>
    </section>
  )
}
