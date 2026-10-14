import { useEffect, useState } from 'react'
import { site, navLinks } from '../data/content.js'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
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
