import { useEffect, useState } from 'react'
import { site, navLinks } from '../data/content.js'

/* dark：首页滚过深色区边界后由 Home 传进来，让导航栏也跟着换成深色。
   这里不自己测量，是因为深色区的进度由 Home 的那个 rAF 循环统一算，
   两处各算一遍，迟早会错开半屏。 */
export default function Navbar({ dark = false }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const className = ['nav', scrolled && 'nav--scrolled', dark && 'is-night']
    .filter(Boolean)
    .join(' ')

  return (
    <header className={className}>
      <div className="nav__inner">
        <a href="#top" className="nav__brand" onClick={() => setOpen(false)}>
          <span className="nav__mark">{site.name.slice(0, 1)}</span>
          <span className="nav__name">
            {site.name}
            <em>{site.netName}</em>
          </span>
        </a>

        <nav className={`nav__links ${open ? 'is-open' : ''}`}>
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="nav__link" onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="#contact" className="btn btn--solid nav__cta" onClick={() => setOpen(false)}>
            联系我
          </a>
        </nav>

        <button
          className="nav__toggle"
          aria-label={open ? '关闭菜单' : '打开菜单'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
