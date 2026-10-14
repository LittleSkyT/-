import { useEffect, useState } from 'react'

/* ============================================================
   极简 hash 路由：整站只有三种状态 ——
     · 首页                  地址里没有 hash 前缀
     · 作品详情页   #/case/<id>
     · 全部作品     #/gallery
   用 hash 而不是 History API，是因为站点部署在 GitHub Pages 的
   子目录下（https://littleskyt.github.io/-/），pushState 出来的
   路径刷新时会 404，hash 不会。
   ============================================================ */

const CASE_PREFIX = '#/case/'
const GALLERY_HASH = '#/gallery'
const listeners = new Set()

const notify = () => listeners.forEach((fn) => fn())

export function readRoute() {
  const { hash } = window.location

  if (hash.startsWith(CASE_PREFIX)) {
    const raw = hash.slice(CASE_PREFIX.length)
    if (raw) {
      let id = raw
      try {
        id = decodeURIComponent(raw)
      } catch {
        /* hash 里有非法转义就原样用，别让整页崩掉 */
      }
      return { name: 'case', id }
    }
  }

  if (hash === GALLERY_HASH) return { name: 'gallery' }

  return { name: 'home' }
}

/* 当前路由。放在模块级而不是 state 里，是为了在 hashchange 触发的
   那一刻就能判断出这次是「首页 → 子页」还是别的转换。 */
let currentRoute = readRoute()

/* 从首页点进子页时，首页停在哪一屏。返回时用它把用户放回去。 */
let homeScrollY = 0

export const takeHomeScroll = () => homeScrollY

/* 所有路由变更的唯一入口（hashchange / popstate / closeCase 都走这里）。
   关键：homeScrollY 只在「首页 → 子页」这一次转换时记录。
   不能把它写在组件的挂载副作用里 —— React 的 StrictMode 在开发环境
   会重复执行挂载副作用，第二次执行时页面已经滚到顶部，
   会把刚记住的位置覆盖成 0（这个坑实际踩过：返回后停在顶部）。 */
function sync() {
  const next = readRoute()
  if (next.name !== 'home' && currentRoute.name === 'home') {
    homeScrollY = window.scrollY || 0
  }
  currentRoute = next
  notify()
}

/* 子页的返回：摘掉 hash。
   不用 window.location.hash = '' 是因为那样会留下一个孤立的 '#'，
   浏览器还可能顺手把页面滚回顶部。
   名字是历史原因留下的，但它对 #/gallery 一样管用。 */
export function closeCase() {
  if (readRoute().name === 'home') return
  window.history.pushState(
    null,
    '',
    window.location.pathname + window.location.search,
  )
  sync()
}

export function useRoute() {
  const [route, setRoute] = useState(readRoute)

  useEffect(() => {
    const update = () => setRoute(readRoute())
    window.addEventListener('hashchange', sync)
    window.addEventListener('popstate', sync)
    listeners.add(update)
    return () => {
      window.removeEventListener('hashchange', sync)
      window.removeEventListener('popstate', sync)
      listeners.delete(update)
    }
  }, [])

  return route
}
