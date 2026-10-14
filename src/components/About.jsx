import { site, stats, experience, profile } from '../data/content.js'
import { icons } from './icons.jsx'
import Reveal from './Reveal.jsx'
import BorderGlow from './BorderGlow.jsx'
import aboutBg from '../assets/about-bg.jpg'

export default function About() {
  return (
    <section className="about section" id="about">
      {/* 背景图：左 100% → 右 0% */}
      <div className="about__bg" aria-hidden="true">
        <img src={aboutBg} alt="" />
      </div>

      <div className="container">
        <Reveal className="section__head">
          <span className="section__index">01</span>
          <h2 className="section__title">关于我</h2>
          <p className="section__intro">一位把「好沟通、好作品、好交付」当成习惯的插画师。</p>
        </Reveal>

        <Reveal className="about__panel">
          <BorderGlow
            className="about__glass"
            backgroundColor="transparent"
            edgeSensitivity={52}
            glowColor="338 70 60"
            borderRadius={30}
            glowRadius={30}
            glowIntensity={1.4}
            coneSpread={30}
            animated
            colors={['#bb8a9a', '#8da4bf', '#e2c8d3']}
            fillOpacity={0}
          >
            <div className="about__glass-inner">
              <div className="about__intro">
                <p className="about__lead">
                  你好，我是{site.name}，一名拥有六年接稿经验的自由插画师 / 原画师。
                </p>
                <p className="about__text">
                  从绘本、品牌视觉到游戏原画，我习惯站在甲方的立场去理解每一次委托——
                  先想清楚「这张画要用在哪里」，再动手。正因为如此，许多客户从一次合作变成了长期伙伴。
                </p>
                <p className="about__text">
                  比起炫技，我更在意画面是否准确、克制、耐看，能否在真实的使用场景里成立。
                </p>
              </div>

              <ul className="info-list">
                {profile.map((item) => (
                  <li
                    className={`info-list__item ${item.icon ? 'info-list__item--icon' : 'info-list__item--text'}`}
                    key={item.value}
                  >
                    <span className="info-list__label">
                      {item.icon ? icons[item.icon] : item.label}
                      {item.icon && <span className="sr-only">{item.title}</span>}
                    </span>
                    {item.href ? (
                      <a className="info-list__value" href={item.href}>
                        {item.value}
                      </a>
                    ) : (
                      <span className="info-list__value">{item.value}</span>
                    )}
                  </li>
                ))}
              </ul>

              <div className="about__stats">
                {stats.map((s) => (
                  <div className="stat" key={s.label}>
                    <strong>{s.value}</strong>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>

              <div className="about__timeline">
                <h3 className="about__subtitle">接稿与求学经历</h3>
                <ol className="timeline">
                  {experience.map((e) => (
                    <li className="timeline__item" key={e.year}>
                      <span className="timeline__year">{e.year}</span>
                      <div className="timeline__body">
                        <strong>{e.title}</strong>
                        <p>{e.desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </BorderGlow>
        </Reveal>
      </div>
    </section>
  )
}
