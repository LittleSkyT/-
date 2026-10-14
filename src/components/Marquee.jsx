import { marqueeItems } from '../data/content.js'

export default function Marquee() {
  const items = [...marqueeItems, ...marqueeItems]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {items.map((t, i) => (
          <span className="marquee__item" key={i}>
            {t}
            <i>✦</i>
          </span>
        ))}
      </div>
    </div>
  )
}
