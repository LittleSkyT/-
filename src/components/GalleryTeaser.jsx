import { galleryItems } from '../data/gallery.js'
import DriftWall from './DriftWall.jsx'
import Reveal from './Reveal.jsx'
import './GalleryTeaser.css'

/* ============================================================
   首页「全部作品」入口
   一条斜着缓缓上漂的作品墙（DriftWall，从 React Bits 移植），
   整块可点，进入 #/gallery。
   16 张缩略图全部上墙，DriftWall 自己把它们分成 5 列并循环拷贝填满。
   用 decorative：墙只是装饰，点击由外层那个链接整块承接。
   ============================================================ */
const WALL_ITEMS = galleryItems.map((item) => ({
  image: item.thumb,
  title: item.title,
}))

export default function GalleryTeaser() {
  if (!galleryItems.length) return null

  return (
    <section className="gallery-teaser section" id="gallery">
      <div className="container">
        <Reveal className="section__head section__head--split">
          <div>
            <span className="section__index">04</span>
            <h2 className="section__title">全部作品</h2>
          </div>
          <p className="section__intro">
            {galleryItems.length} 件作品的完整图录，点开任意一张看大图。
          </p>
        </Reveal>

        <Reveal>
          <a className="gallery-teaser__card" href="#/gallery">
            <div className="gallery-teaser__wall">
              <DriftWall
                items={WALL_ITEMS}
                columns={5}
                tileWidth={220}
                tileHeight={144}
                gap={18}
                tilt={16}
                turn={-14}
                perspective={1700}
                depth={120}
                speed={26}
                direction="up"
                variance={0.55}
                parallax={1.7}
                lift={36}
                fade={0.4}
                dim={0.8}
                overlayColor="#060010"
                decorative
              />
            </div>

            <div className="gallery-teaser__meta">
              <div className="gallery-teaser__lead">
                <span className="gallery-teaser__eyebrow">Gallery</span>
                <h3 className="gallery-teaser__title">全部作品</h3>
              </div>

              <div className="gallery-teaser__tail">
                <p className="gallery-teaser__line">
                  {galleryItems.length} 件 · 横图与竖图混排
                </p>
                <span className="gallery-teaser__cta">
                  打开作品集
                  <i aria-hidden="true">→</i>
                </span>
              </div>
            </div>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
