import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import About from './components/About.jsx'
import Works from './components/Works.jsx'
import CaseFeature from './components/CaseFeature.jsx'
import GalleryTeaser from './components/GalleryTeaser.jsx'
import Strengths from './components/Strengths.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import PatternWaves from './components/PatternWaves.jsx'
import TerminalRain from './components/TerminalRain.jsx'
import { takeHomeScroll } from './lib/router.js'

/* 深色区渐变跨度 = 「精选作品」首个文字到深色区顶端距离（lead）的 1.4 倍。
   以 lead 为基准而不是视口比例，是为了保证背景在文字进入视口之前就已经全暗：
   任何交叉淡入都要经过一段中灰底，那时深色字和浅色字都不清楚，
   所以那段中灰必须落在区块顶部的空白留白里，不能有文字。 */
const DARK_TAIL = 1.4
/* 背景层在 progress 到 0.6 时已完全不透明（文字在 1 / 1.4 ≈ 0.714 才进入视口） */
const DARK_BG_DONE = 0.6
/* progress 跨过该值把文字/卡片切到深色。0.32 时深色区只露出约 45% lead 的空白留白，
   还没有任何文字进入视口，等文字真正浮现时配色已经切换完毕。 */
const DARK_FLIP = 0.32

const RAIN_COLORS = ['#1a44ff', '#ff7eeb']

const clamp01 = (value) => Math.min(Math.max(value, 0), 1)

/* 首页。
   active：这一页当前是不是显示着。详情页打开时首页会被整体卸载再重建，
   所以这里恒为 true；写成 prop 是为了让「可见时才测量」这件事显式，
   将来如果改成隐藏而不是卸载，不会漏掉重新测量那一步。 */
export default function Home({ active = true }) {
  const darkZoneRef = useRef(null)
  const [isDark, setIsDark] = useState(false)

  /* 从详情页返回时回到点进去的那一屏。
     用 useLayoutEffect 是因为要赶在浏览器绘制之前落位，
     否则会先闪一下顶部再跳过去。behavior 必须显式写 instant：
     index.css 里 html 设了 scroll-behavior: smooth，不写会滚一段动画。 */
  useLayoutEffect(() => {
    const y = takeHomeScroll()
    if (y > 0) window.scrollTo({ top: y, behavior: 'instant' })
  }, [])

  useEffect(() => {
    if (!active) return undefined
    const zone = darkZoneRef.current
    if (!zone) return undefined

    let frameId = 0
    let dark = false
    /* 深色区里第一个会进入视口的文字块（「精选作品」的区块标题头） */
    const head = zone.querySelector('.section__head')

    const measure = () => {
      frameId = 0
      const rect = zone.getBoundingClientRect()
      const viewport = window.innerHeight || 1

      // lead：该文字块距深色区顶端的高度。每帧重算，窄屏留白变小时也能跟上
      const rawLead = head
        ? head.getBoundingClientRect().top - rect.top
        : viewport * 0.2
      const lead = Math.max(rawLead, viewport * 0.08)
      const span = lead * DARK_TAIL

      // 深色区当前露出的高度 → 0..1
      const progress = clamp01((viewport - rect.top) / span)

      // 连续值直接写 DOM，避免每帧 setState 触发整棵树重渲染
      zone.style.setProperty('--dz-progress', progress.toFixed(4))
      // 背景层提前到底：progress = 0.6 就全不透明，早于文字进入视口的 0.714
      zone.style.setProperty(
        '--dz-bg',
        Math.min(1, progress / DARK_BG_DONE).toFixed(4),
      )
      // 只有跨过阈值才切换一次 React 状态
      const next = progress >= DARK_FLIP
      if (next !== dark) {
        dark = next
        setIsDark(next)
      }
    }

    const schedule = () => {
      if (frameId) return
      frameId = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      if (frameId) cancelAnimationFrame(frameId)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [active])

  return (
    <>
      <Navbar dark={isDark} />
      <main>
        <Hero />
        <Marquee />

        {/* 首页之后：整段共用一层字符波纹背景 */}
        <div className="detail">
          <div className="detail__waves" aria-hidden="true">
            <PatternWaves
              preset="terminal"
              color="#7288a3"
              backgroundColor="transparent"
              opacity={0.8}
              fade="center"
              fadeSize={0.8}
              interactive
              cursorSize={25}
              cursorStrength={0.15}
              spacing={13}
              depth={1.4}
              light={-12}
              shine={0.45}
              contrast={1.3}
              speed={0.4}
              scale={0.8}
              direction={237}
            />
          </div>

          <About />

          {/* 精选作品起：深色系 + 终端字符雨 */}
          <div
            ref={darkZoneRef}
            className={`darkzone${isDark ? ' is-dark' : ''}`}
          >
            <div className="darkzone__bg" aria-hidden="true">
              <div className="darkzone__wash" />
              <TerminalRain
                colors={RAIN_COLORS}
                glyphs="01"
                glyphSize={19}
                spacing={2.95}
                density={1}
                trail={10}
                speed={0.65}
                variance={0.88}
                shuffle={0.86}
                mirror
                depth={1}
                glow={0.28}
                intensity={0.65}
                slowRadius={140}
                slowStrength={0.2}
                burstSize={0.7}
              />
            </div>

            <Works />
            <CaseFeature />
            <GalleryTeaser />
            <Strengths />
            <Contact />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
