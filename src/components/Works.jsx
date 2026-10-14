import { useState } from 'react'
import { projects } from '../data/content.js'
import CircularCarousel from './CircularCarousel.jsx'
import Reveal from './Reveal.jsx'

// 环形轮播要求所有卡片同一尺寸，图片按 object-fit: cover 裁切填满卡片。
// 比例由 CircularCarousel 的 aspectRatio 决定（宽 ÷ 高），见交付说明中的图片规格。
const CAROUSEL_ITEMS = projects.map((p) => ({
  src: p.img,
  alt: p.title,
  title: p.title,
  subtitle: p.category,
}))

export default function Works() {
  const [active, setActive] = useState(0)
  const current = projects[active] ?? projects[0]

  return (
    <section className="works section" id="works">
      <div className="container">
        <Reveal className="section__head section__head--split">
          <div>
            <span className="section__index">02</span>
            <h2 className="section__title">精选作品</h2>
          </div>
          <p className="section__intro">从商业委托到个人创作，每一件都用心打磨。</p>
        </Reveal>

        <div className="works__carousel">
          <CircularCarousel
            items={CAROUSEL_ITEMS}
            preset="orbit"
            intro="assemble"
            cardWidth={254}
            aspectRatio={0.75}
            gap={11}
            tilt={-17}
            curve={0}
            perspective={1300}
            speed={14}
            autoplay="step"
            interval={6}
            momentum={0.4}
            innerShade={0.78}
            cornerRadius={13}
            captions
            fadeColor="#070a14"
            onChange={setActive}
          />
        </div>

        <Reveal className="works__detail" delay={120}>
          <div className="works__detail-body" key={active}>
            {/* desc 是可选的：以后想给某件作品加一句说明，直接在 content.js 里补 desc 字段即可 */}
            {current.desc ? <p className="works__detail-desc">{current.desc}</p> : null}
            <span className="works__detail-year">{current.date}</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
