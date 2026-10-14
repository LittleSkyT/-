import { site } from '../data/content.js'
import Reveal from './Reveal.jsx'

export default function Contact() {
  return (
    <section className="contact section" id="contact">
      <div className="container contact__inner">
        <Reveal className="contact__head">
          <span className="section__index section__index--light">06</span>
          <h2 className="contact__title">
            一起创作点
            <br />
            好东西
          </h2>
          <p className="contact__lead">有项目想聊聊？欢迎随时联系，通常 24 小时内回复。</p>
          <a className="btn btn--solid contact__mail" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <ul className="contact__social">
            <li>
              <a href="#contact">微信：{site.wechat}</a>
            </li>
            <li>
              <a href="#contact">微博：{site.weibo}</a>
            </li>
            <li>
              <a href="#contact">小红书</a>
            </li>
            <li>
              <a href="#contact">Behance</a>
            </li>
          </ul>
        </Reveal>

        <Reveal className="contact__form-wrap" delay={120}>
          <form
            className="contact__form"
            onSubmit={(e) => {
              e.preventDefault()
              alert('基础预览版暂未接入表单服务，可直接邮件联系。')
            }}
          >
            <label className="field">
              <span>姓名 / 称呼</span>
              <input type="text" name="name" placeholder="怎么称呼您" />
            </label>
            <label className="field">
              <span>邮箱 / 微信</span>
              <input type="text" name="contact" placeholder="方便联系您的方式" />
            </label>
            <label className="field">
              <span>项目简述</span>
              <textarea name="message" rows="4" placeholder="简单说说你的需求：类型、体量、期望时间…" />
            </label>
            <button type="submit" className="btn btn--solid contact__submit">
              发送需求
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
