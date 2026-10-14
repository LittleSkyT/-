import { useCallback, useEffect, useRef, useState } from 'react'
import ChromaGrid from './ChromaGrid.jsx'
import PixelSnow from './PixelSnow.jsx'
import { galleryItems } from '../data/gallery.js'
import { site } from '../data/content.js'
import { closeCase } from '../lib/router.js'
import './Gallery.css'

const pad = (n) => String(n).padStart(2, '0')

/* 这一页的点缀色，和 Gallery.css 里的 --g-accent 是同一个值。
   背景那层雪直接用它上色，深底走 lightMode=false 那套（雪花自己发光）。 */
const GALLERY_ACCENT = '#bb8a9a'

/* ChromaGrid 只吃它认得的字段。accent 是每张图自己的主色。
   没有 title 就用「作品 NN」—— 我看不到图，真名字只有作者能给。 */
const GRID_ITEMS = galleryItems.map((item) => ({
  image: item.thumb,
  title: item.title,
  accent: item.accent,
}))

/* ============================================================
   全部作品页（#/gallery）
   作品按 ChromaGrid（React Bits）排布，点任一张打开大图查看器：
   左右箭头 / ← → 切换，Esc 或点背景关闭。
   ============================================================ */
export default function Gallery() {
  const [openIndex, setOpenIndex] = useState(-1)
  const rootRef = useRef(null)
  const closeRef = useRef(null)
  const items = galleryItems
  const total = items.length
  const isOpen = openIndex >= 0

  const close = useCallback(() => setOpenIndex(-1), [])
  const step = useCallback(
    (delta) => {
      setOpenIndex((cur) => (cur < 0 ? cur : (cur + delta + total) % total))
    },
    [total],
  )

  /* 进页面从顶部开始，并把焦点挪过来，键盘和读屏用户不会留在上一页 */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    rootRef.current?.focus({ preventScroll: true })
  }, [])

  /* 标签页标题跟着换 */
  useEffect(() => {
    const previous = document.title
    document.title = `全部作品 · ${site.name}`
    return () => {
      document.title = previous
    }
  }, [])

  /* 查看器打开时：键盘接管 + 锁住背景滚动 + 焦点给关闭按钮 */
  useEffect(() => {
    if (!isOpen) return undefined

    const onKey = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        close()
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault()
        step(-1)
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        step(1)
      }
    }

    const { body } = document
    const prevOverflow = body.style.overflow
    body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    closeRef.current?.focus({ preventScroll: true })

    return () => {
      body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen, close, step])

  return (
    <main className="gallery" ref={rootRef} tabIndex={-1}>
      {/* 背景粒子：整页一层雪，和作品详情页（CaseDetail）用的是同一套参数，
          只有颜色换成本页的点缀色。雪层 z-index: 0，正文在 CSS 里抬到它上面。 */}
      <div className="gallery__snow" aria-hidden="true">
        <PixelSnow
          color={GALLERY_ACCENT}
          variant="square"
          density={0.17}
          speed={2.35}
          wind={-1.25}
          sway={1.4}
          flakeSize={1.05}
          pixelSize={2}
          depth={0.15}
          brightness={1.25}
          glow={1.1}
          twinkle={0.9}
          fade={0.6}
          opacity={0.6}
          lightMode={false}
        />
      </div>

      {/* 常驻返回栏：任何时候都在，不用滚回顶部才能退出 */}
      <div className="gallery__bar">
        <div className="container gallery__bar-inner">
          <button type="button" className="gallery__back" onClick={closeCase}>
            <span aria-hidden="true">←</span> 返回首页
          </button>
          <span className="gallery__bar-mark">
            {site.name} · {site.role}
          </span>
        </div>
      </div>

      <header className="gallery__head">
        <div className="container">
          <span className="gallery__eyebrow">Gallery</span>
          <h1 className="gallery__title">全部作品</h1>
          <p className="gallery__intro">
            共 {total} 件 · 点开任意一张看完整画面
          </p>
        </div>
      </header>

      <div className="container gallery__grid-wrap">
        <ChromaGrid
          className="gallery__chroma"
          items={GRID_ITEMS}
          columns={3}
          radius={250}
          reveal="card"
          aspectRatio="4 / 3"
          cardRadius={21}
          showInfo={false}
          softness={0.65}
          fadeOut={1.25}
          onSelect={(index) => setOpenIndex(index)}
        />
      </div>

      {/* ---------- 大图查看器 ---------- */}
      {isOpen ? (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="查看大图"
          onClick={(event) => {
            if (event.target === event.currentTarget) close()
          }}
        >
          <button
            ref={closeRef}
            type="button"
            className="lightbox__close"
            onClick={close}
            aria-label="关闭"
          >
            <span aria-hidden="true">×</span>
          </button>

          <button
            type="button"
            className="lightbox__nav lightbox__nav--prev"
            onClick={() => step(-1)}
            aria-label="上一张"
          >
            <span aria-hidden="true">‹</span>
          </button>

          <figure className="lightbox__stage">
            <img
              src={items[openIndex].full}
              alt={items[openIndex].title}
              width={items[openIndex].fullSize[0]}
              height={items[openIndex].fullSize[1]}
            />
            <figcaption className="lightbox__meta">
              <span className="lightbox__counter">
                {pad(openIndex + 1)} / {pad(total)}
              </span>
              <span className="lightbox__hint">← → 切换 · Esc 关闭</span>
            </figcaption>
          </figure>

          <button
            type="button"
            className="lightbox__nav lightbox__nav--next"
            onClick={() => step(1)}
            aria-label="下一张"
          >
            <span aria-hidden="true">›</span>
          </button>
        </div>
      ) : null}
    </main>
  )
}
