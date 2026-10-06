import { useEffect, useState } from 'react'

export default function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a href="#top" className={`to-top ${show ? 'is-shown' : ''}`} aria-label="Back to top" tabIndex={show ? 0 : -1}>
      ↑
    </a>
  )
}
