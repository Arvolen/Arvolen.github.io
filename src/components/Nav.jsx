import { useEffect, useState } from 'react'
import { profile } from '../data/profile.js'

const STORAGE_KEY = 'arlen-theme'
const LINKS = [
  ['About', '#about'],
  ['Skills', '#skills'],
  ['Journey', '#journey'],
  ['Work', '#work'],
  ['Contact', '#contact'],
]

function readStoredTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

export default function Nav() {
  const [theme, setTheme] = useState(() => readStoredTheme())
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    if (theme) root.setAttribute('data-theme', theme)
    else root.removeAttribute('data-theme')
  }, [theme])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleTheme = () => {
    const isDark =
      theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)
    const next = isDark ? 'light' : 'dark'
    setTheme(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* storage unavailable — theme just won't persist */
    }
  }

  const { resume, github } = profile.links

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''} ${open ? 'nav--open' : ''}`}>
      <div className="nav-inner">
        <a href="#top" className="nav-logo" aria-label="Back to top">
          {profile.initials}
        </a>

        <div className="nav-links">
          {LINKS.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </div>

        <div className="nav-actions">
          <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle colour theme">
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
              <path
                d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
          {resume ? (
            <a className="pill pill--sm" href={resume} target="_blank" rel="noreferrer">
              Résumé PDF ↓
            </a>
          ) : (
            <a className="pill pill--sm" href={github} target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
          )}
          <button
            className="icon-btn nav-burger"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={open}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </nav>
  )
}
