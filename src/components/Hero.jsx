import { site, heroPanels } from '../data/content.js'
import PatternWaves from './PatternWaves.jsx'
import AccordionGallery from './AccordionGallery.jsx'
import TechText from './TechText.jsx'

const TITLE_FONT = "'Cormorant Garamond', 'Noto Serif SC', 'Songti SC', 'STSong', Georgia, serif"

// 两行标题共用参数；颜色单独指定
const TITLE_PROPS = {
  fontFamily: TITLE_FONT,
  fontWeight: 600,
  fontSize: 106,
  letterSpacing: -0.01,
  accentColor: '#bb8a9a',
  reveal: 'area',
  reach: 200,
  softness: 0.5,
  dashLength: 4,
  dashGap: 2,
  strokeWidth: 0.5,
  specks: 15,
  align: 'left'
}

export default function Hero() {
  return (
    <section className="hero" id="top">
      {/* 柔和光影底色 */}
      <div className="hero__aurora" aria-hidden="true">
        <span className="aurora aurora--a" />
        <span className="aurora aurora--b" />
        <span className="aurora aurora--c" />
      </div>

      {/* WebGL 波纹图案背景 */}
      <div className="hero__waves" aria-hidden="true">
        <PatternWaves
          preset="lines"
          color="#7288a3"
          backgroundColor="transparent"
          fade="edges"
          fadeSize={0.35}
          opacity={1}
          contrast={1.5}
          interactive
          cursorSize={26}
          cursorStrength={0.3}
          speed={0.3}
        />
      </div>

      {/* 细腻噪点 */}
      <div className="hero__grain" aria-hidden="true" />

      {/* 内容盒：与全站 1700px 版心对齐，左右留白对称 */}
      <div className="hero__inner">
        {/* 左：文案 */}
        <div className="hero__left">
          <div className="hero__lead">
            <p className="hero__eyebrow">插画师 · 原画师 · 商业插画</p>

            <h1 className="hero__title">
              <span className="hero__title-line">
                <TechText text="献给想象" color="#2e3240" {...TITLE_PROPS} />
              </span>
              <span className="hero__title-line">
                <TechText text="无尽的山海" color="#7288a3" {...TITLE_PROPS} />
              </span>
            </h1>

            <p className="hero__name">
              {site.name}
              <em>{site.netName}</em>
            </p>

            <p className="hero__meta-line">
              Illustration · 商业插画 / 原画 / 绘本 · 六年接稿经验
            </p>

            <div className="hero__actions">
              <a href="#works" className="btn btn--solid">
                查看精选作品
              </a>
              <a href="#contact" className="btn btn--ghost">
                开始合作
              </a>
            </div>
          </div>

          <div className="hero__foot">
            <span className="hero__year">2026</span>
            <span className="hero__foot-label">现居福建 · 接受远程委托</span>
          </div>
        </div>

        {/* 右：手风琴画廊 */}
        <div className="hero__panels">
          <AccordionGallery
            items={heroPanels}
            defaultIndex={0}
            expandRatio={0.5}
            height={640}
            gap={10}
            radius={16}
            trigger="hover"
            duration={0.65}
            ease="power4.out"
            accentColor="#bb8a9a"
            overlayColor="#2e3240"
            textColor="#f6f5f9"
            showLabels={false}
            grayscale
            parallax={0.5}
            tilt={8}
          />
        </div>
      </div>
    </section>
  )
}
