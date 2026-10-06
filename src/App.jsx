import { useEffect } from 'react'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Journey from './components/Journey.jsx'
import Work from './components/Work.jsx'
import Extras from './components/Extras.jsx'
import Contact from './components/Contact.jsx'
import BackToTop from './components/BackToTop.jsx'

// Fades elements with the `reveal` class in as they scroll into view.
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

export default function App() {
  useReveal()

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Journey />
        <Work />
        <Extras />
        <Contact />
      </main>
      <BackToTop />
    </>
  )
}
