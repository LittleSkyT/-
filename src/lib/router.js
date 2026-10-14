import { useEffect, useState } from 'react'

/* ============================================================
   极简 hash 路由：整站只有两种状态 —— 「首页」和「作品详情页」。
   用 hash 而不是 History API，是因为站点部署在 GitHub Pages 的子目录下
   （https://littleskyt.github.io/-/），pushState 出来的路径刷新时会 404，
   hash 不会。所以详情页的地址长这样：#/case/wang-yi-wei-qi
   ============================================================ */

const CASE_PREFIX = '#/case/'
const listeners = new Set()

const notify = () => listeners.forEach((fn) => fn())

export function readCaseId() {
  const { hash } = window.location
  if (!hash.startsWith(CASE_PREFIX)) return null
  const raw = hash.slice(CASE_PREFIX.length)
  if (!raw) return null
  try {
    return decodeURIComponent(raw)
  } catch {
    return raw
  }
}

/* 当前路由。放在模块级而不是 state 里，是为了在 hashchange 触发的那一刻
   就能判断出这次是「首页 → 详情页」还是别的转换。 */
let currentId = readCaseId()

/* 从首页点进详情页时，首页停在哪一屏。返回时用它把用户放回去。 */
let homeScrollY = 0

export const takeHomeScroll = () => homeScrollY

/* 所有路由变更的唯一入口（hashchange / popstate / closeCase 都走这里）。
   关键：homeScrollY 只在「首页 → 详情页」这一次转换时记录。
   不能把它写在组件的挂载副作用里 —— React 的 StrictMode 在开发环境
   会重复执行挂载副作用，第二次执行时页面已经滚到顶部，
   会把刚记住的位置覆盖成 0（这个坑实际踩过：返回后停在顶部）。 */
function sync() {
  const next = readCaseId()
  if (next && !currentId) homeScrollY = window.scrollY || 0
  currentId = next
  notify()
}

/* 详情页的返回：摘掉 hash。
   不用 window.location.hash = '' 是因为那样会留下一个孤立的 '#'，
   浏览器还可能顺手把页面滚回顶部。 */
export function closeCase() {
  if (!readCaseId()) return
  window.history.pushState(
    null,
    '',
    window.location.pathname + window.location.search,
  )
  sync()
}

export function useCaseId() {
  const [id, setId] = useState(readCaseId)

  useEffect(() => {
    const update = () => setId(readCaseId())
    window.addEventListener('hashchange', sync)
    window.addEventListener('popstate', sync)
    listeners.add(update)
    return () => {
      window.removeEventListener('hashchange', sync)
      window.removeEventListener('popstate', sync)
      listeners.delete(update)
    }
  }, [])

  return id
}
