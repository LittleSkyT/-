import { strengths } from '../data/content.js'
import { icons } from './icons.jsx'
import Reveal from './Reveal.jsx'

export default function Strengths() {
  return (
    <section className="strengths section" id="strengths">
      <div className="container">
        <Reveal className="section__head">
          <span className="section__index">03</span>
          <h2 className="section__title">我的优势</h2>
          <p className="section__intro">为什么客户愿意长期合作。</p>
        </Reveal>

        <div className="strengths__grid">
          {strengths.map((s, i) => (
            <Reveal className="strength" key={s.title} delay={i * 80}>
              <span className="strength__icon">{icons[s.icon]}</span>
              <h3 className="strength__title">{s.title}</h3>
              <p className="strength__desc">{s.desc}</p>
              <span className="strength__index">0{i + 1}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
