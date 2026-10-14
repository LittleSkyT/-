import { useEffect, useRef } from 'react'
import { site } from '../data/content.js'
import { caseStudies, getCaseStudy } from '../data/caseStudies.js'
import { closeCase } from '../lib/router.js'
import PixelSnow from './PixelSnow.jsx'
import Signature from './Signature.jsx'
import './CaseDetail.css'

/* 兜底配色：万一某个案例忘了写 palette，也不会白底黑字崩掉 */
const FALLBACK_PALETTE = caseStudies[0]?.palette || {
  bg: '#050a15',
  surface: '#0b1424',
  line: 'rgba(150, 190, 235, 0.16)',
  ink: '#e8eef8',
  inkSoft: 'rgba(232, 238, 248, 0.72)',
  inkFaint: 'rgba(232, 238, 248, 0.40)',
  accent: '#38e07b',
  accentSoft: 'rgba(56, 224, 123, 0.14)',
}

const pad = (n) => String(n).padStart(2, '0')

/* 正文块渲染：数组里可以混排
     · 字符串                      → 一个段落
     · { image, caption }          → 单张插图（收窄居中）
     · { image, caption, wide:true } → 单张放满正文栏，整幅成稿用这个
     · { images: [{src,caption}] } → 一组插图并排
   插图就出现在它被写到的那个位置，段落和图片可以任意穿插。 */
const renderProse = (items, prefix) =>
  items?.map((item, i) => {
    const key = `${prefix}-${i}`
    if (typeof item === 'string') return <p key={key}>{item}</p>
    const list = item.images || [{ src: item.image, caption: item.caption }]
    const shape =
      list.length === 1 ? (item.wide ? ' case__figures--wide' : ' case__figures--single') : ''
    return (
      <div className={`case__figures${shape}`} key={key}>
        {list.map((media, k) => (
          <figure className="case__figure" key={`${key}-${k}`}>
            <img src={media.src} alt={media.caption || ''} loading="lazy" />
            {media.caption ? <figcaption>{media.caption}</figcaption> : null}
          </figure>
        ))}
      </div>
    )
  })

export default function CaseDetail({ id }) {
  const study = getCaseStudy(id)
  const rootRef = useRef(null)
  const palette = study?.palette || FALLBACK_PALETTE
  /* 深底和浅底的粒子表现刚好相反：
     深底关掉 lightMode，让雪花自己发光；
     浅底要打开 lightMode 走另一套上色（见 PixelSnow.jsx 的 uLightMode），
     同时把亮度、辉光、不透明度压下来，免得彩色像素在浅底上糊成一片。 */
  const lightMode = palette.mode === 'light'

  /* 进详情页必须从顶部开始，否则会停在首页那个滚动位置；
     同时把焦点挪过来，键盘和读屏用户不会继续停在原来那一段。
     首页的滚动位置由 router.js 在导航那一刻记录，不在这里记 —— 详见那里的注释。 */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    rootRef.current?.focus({ preventScroll: true })
  }, [id])

  /* 标签页标题跟着换，分享出去的链接有个像样的名字 */
  useEffect(() => {
    if (!study) return undefined
    const previous = document.title
    document.title = `${study.title} · ${study.category} · ${site.name}`
    return () => {
      document.title = previous
    }
  }, [study])

  /* 详情页底色比首页深得多，给 body 也刷上，
     免得手机上橡皮筋回弹时露出首页的浅色 */
  useEffect(() => {
    const { body } = document
    const previous = body.style.background
    body.style.background = palette.bg
    return () => {
      body.style.background = previous
    }
  }, [palette])

  const style = {
    '--case-bg': palette.bg,
    '--case-surface': palette.surface,
    '--case-line': palette.line,
    '--case-ink': palette.ink,
    '--case-ink-soft': palette.inkSoft,
    '--case-ink-faint': palette.inkFaint,
    '--case-accent': palette.accent,
    '--case-accent-soft': palette.accentSoft,
  }

  if (!study) {
    return (
      <main className="case case--missing" style={style} ref={rootRef} tabIndex={-1}>
        <div className="case__missing">
          <p>没有找到这个作品。</p>
          <button type="button" className="case__back" onClick={closeCase}>
            <span aria-hidden="true">←</span> 返回精选作品
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="case" style={style} ref={rootRef} tabIndex={-1}>
      {/* 背景粒子：整页一层雪。
          颜色直接取该作品的 palette.accent，以后换作品会自动跟着换色；
          深底和浅底走两套表现，由 palette.mode 决定（见下面的 lightMode）。 */}
      <div className="case__snow" aria-hidden="true">
        <PixelSnow
          color={palette.accent}
          variant="square"
          density={0.17}
          speed={2.35}
          wind={-1.25}
          sway={1.4}
          flakeSize={1.05}
          pixelSize={2}
          depth={0.15}
          brightness={lightMode ? 0.8 : 1.25}
          glow={lightMode ? 0.4 : 1.1}
          twinkle={0.9}
          fade={0.6}
          opacity={lightMode ? 0.42 : 0.6}
          lightMode={lightMode}
        />
      </div>

      {/* 常驻返回栏：任何时候都在，不用滚回顶部才能退出 */}
      <div className="case__bar">
        <div className="container case__bar-inner">
          <button type="button" className="case__back" onClick={closeCase}>
            <span aria-hidden="true">←</span> 返回精选作品
          </button>
          <span className="case__bar-mark">
            {site.name} · {site.role}
          </span>
        </div>
      </div>

      {study.placeholder ? (
        <div className="case__notice">
          <div className="container">
            当前是<strong>占位内容</strong>：文案与步骤图都还没替换。请编辑{' '}
            <code>src/data/caseStudies.js</code>，改成你自己的需求、思路和过程图，
            改完把这条案例的 <code>placeholder</code> 设为 <code>false</code>
            ，这条提示就会自动消失。
          </div>
        </div>
      ) : null}

      {/* ---------- 首屏：大图 ---------- */}
      <header className="case__hero">
        <div className="container case__hero-inner">
          {/* 宽屏时这一栏在左、大图在右，标题和作品并排一站就能看全，
              不用先滚过一张整屏高的竖图 */}
          <div className="case__hero-copy">
            <span className="case__eyebrow">Case Study {study.no}</span>
            <h1 className="case__title">{study.title}</h1>

            <ul className="case__meta">
              <li>
                <span className="case__meta-label">角色 · 题材</span>
                <span className="case__meta-value">{study.category}</span>
              </li>
              <li>
                <span className="case__meta-label">完成日期</span>
                <span className="case__meta-value">{study.date}</span>
              </li>
              {study.type ? (
                <li>
                  <span className="case__meta-label">类型</span>
                  <span className="case__meta-value">{study.type}</span>
                </li>
              ) : null}
            </ul>
          </div>

          <figure className="case__cover">
            <img
              src={study.cover}
              alt={study.coverAlt || `${study.title} · 完整作品`}
            />
          </figure>
        </div>
      </header>

      {/* ---------- 01 拿到的需求 ---------- */}
      {study.brief?.length || study.briefFacts?.length ? (
        <section className="case__block">
          <div className="container case__block-inner">
            <h2 className="case__heading">
              <span className="case__no">01</span>拿到的需求
            </h2>
            <div className="case__body">
              {renderProse(study.brief, 'brief')}

              {study.briefFacts?.length ? (
                <dl className="case__facts">
                  {study.briefFacts.map((fact) => (
                    <div className="case__fact" key={fact.label}>
                      <dt>{fact.label}</dt>
                      <dd>{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      {/* ---------- 02 创作思路（内容全空时整块不渲染，和 03 一样） ---------- */}
      {study.approach?.length || study.approachPoints?.length || study.finale || study.summary?.length ? (
      <section className="case__block">
        <div className="container case__block-inner">
          <h2 className="case__heading">
            <span className="case__no">02</span>创作思路
          </h2>
          <div className="case__body">
            {renderProse(study.approach, 'approach')}

            {/* 终稿：和上面的插图同栏同宽（都撑满正文栏），作为整段的落点 */}
            {study.finale ? (
              <figure className="case__finale">
                <img
                  src={study.finale.image}
                  alt={study.finale.alt || study.finale.caption || ''}
                />
                {study.finale.caption ? (
                  <figcaption>{study.finale.caption}</figcaption>
                ) : null}
              </figure>
            ) : null}

            {study.approachPoints?.length ? (
              <ul className="case__points">
                {study.approachPoints.map((point) => (
                  <li className="case__point" key={point.title}>
                    <h3 className="case__point-title">{point.title}</h3>
                    <p className="case__point-desc">{point.desc}</p>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {/* 总结：整页的最后一块 */}
          {study.summary?.length ? (
            <div className="case__closing">
              <h2 className="case__heading">总结</h2>
              <div className="case__closing-body">
                {study.summary.map((line, i) => (
                  <p key={`summary-${i}`}>{line}</p>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>
      ) : null}

      {/* ---------- 03 创作步骤（steps 为空时整块不渲染） ---------- */}
      {study.steps?.length ? (
      <section className="case__block">
        <div className="container case__block-inner case__block-inner--wide">
          <h2 className="case__heading">
            <span className="case__no">03</span>创作步骤
          </h2>

          <ol className="case__steps">
            {study.steps?.map((step, i) => (
              <li className="case__step" key={`step-${i}`}>
                <div className="case__step-side">
                  <span className="case__step-no">{pad(i + 1)}</span>
                  <h3 className="case__step-caption">{step.caption}</h3>
                  {step.note ? (
                    <p className="case__step-note">{step.note}</p>
                  ) : null}
                </div>

                <div className="case__step-media">
                  {step.image ? (
                    <img src={step.image} alt={step.caption} loading="lazy" />
                  ) : (
                    /* 还没放图时的虚线占位框：尺寸和真图一致，换图不会跳版 */
                    <div className="case__frame">
                      <span>步骤图 {pad(i + 1)}</span>
                      <span className="case__frame-hint">待替换</span>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      ) : null}

      {/* ---------- 页脚 ---------- */}
      <footer className="case__foot">
        <div className="container case__foot-inner">
          <button type="button" className="case__back" onClick={closeCase}>
            <span aria-hidden="true">←</span> 返回精选作品
          </button>
          <a className="case__mail" href={`mailto:${site.email}`}>
            聊聊你的项目
            <span aria-hidden="true">→</span>
          </a>
        </div>
        {/* 页脚落款：底色跟 palette 走，浅色页要靠 onLight 把白墨翻过来 */}
        <div className="container case__sign">
          <Signature onLight={lightMode} />
        </div>
      </footer>
    </main>
  )
}
