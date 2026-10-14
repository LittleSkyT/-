import { site, navLinks } from '../data/content.js'
import Signature from './Signature.jsx'

export default function Footer() {
  return (
    <footer className="footer">
      {/* 页脚是深色底，签名保持原样的白墨 */}
      <div className="container footer__sign">
        <Signature />
      </div>
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
