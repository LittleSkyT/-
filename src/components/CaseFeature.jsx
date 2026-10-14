import { caseStudies } from '../data/caseStudies.js'
import Reveal from './Reveal.jsx'
import './CaseFeature.css'

/* ============================================================
   首页「创作过程」入口
   一块大图展示完整作品 + 一段克制的说明，整块可点，
   跳到 src/lib/router.js 认得的 hash 地址：#/case/<id>
   ============================================================ */
export default function CaseFeature() {
  if (!caseStudies.length) return null

  return (
    <section className="case-feature section" id="process">
      <div className="container">
        <Reveal className="section__head section__head--split">
          <div>
            <span className="section__index">03</span>
            <h2 className="section__title">创作过程</h2>
          </div>
          <p className="section__intro">
            一件作品的完整记录：从拿到的需求，到思路，到每一步。
          </p>
        </Reveal>

        <div className="case-feature__list">
          {caseStudies.map((study, i) => (
            <Reveal key={study.id} delay={i * 90}>
              <a className="case-feature__card" href={`#/case/${study.id}`}>
                <figure className="case-feature__media">
                  <img
                    src={study.cover}
                    alt={study.coverAlt || `${study.title} · 完整作品`}
                    loading="lazy"
                  />
                </figure>

                <div className="case-feature__meta">
                  <span className="case-feature__eyebrow">
                    Case Study {study.no}
                  </span>
                  <h3 className="case-feature__title">{study.title}</h3>
                  <p className="case-feature__line">
                    {study.category} · {study.date}
                  </p>
                  <span className="case-feature__cta">
                    查看创作过程
                    <i aria-hidden="true">→</i>
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
