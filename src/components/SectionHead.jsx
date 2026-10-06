export default function SectionHead({ eyebrow, title, lede, center = false }) {
  return (
    <header className={`section-head reveal ${center ? 'is-center' : ''}`}>
      <span className="eyebrow eyebrow--line">{eyebrow}</span>
      <h2 className="section-title">{title}</h2>
      {lede && <p className="section-lede">{lede}</p>}
    </header>
  )
}

// Renders **bold** segments inside an otherwise plain string.
export function RichText({ text }) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') ? <strong key={i}>{part.slice(2, -2)}</strong> : part,
  )
}
