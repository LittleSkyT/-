import { site, navLinks } from '../data/content.js'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span className="footer__copy">
          © {new Date().getFullYear()} {site.name} · {site.nameEn}
        </span>
        <nav className="footer__nav">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <a href="#top" className="footer__top">
          回到顶部 ↑
        </a>
      </div>
    </footer>
  )
}
