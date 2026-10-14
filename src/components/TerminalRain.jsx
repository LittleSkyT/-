import { useEffect, useRef } from 'react'
import './TerminalRain.css'

/**
 * TerminalRain · 终端字符雨背景
 *
 * 说明：React Bits Pro 的 Terminal Rain 是付费组件，且安装命令预设了 shadcn +
 * Tailwind + TypeScript，本工程三者都没有。这里是自写的等价实现——纯 canvas 2D，
 * 零依赖，参数语义对齐 样式/作品.txt 里给出的那份配置。
 *
 * 参数
 *  colors        字符颜色（按列循环取用）
 *  glyphs        组成雨幕的字符集
 *  glyphSize     字符字号（px）
 *  spacing       列间距倍率（相对字形宽度，2.95 → 列距约 35px）
 *  density       参与下落的列占比 0–1
 *  trail         每个字符头后面拖尾的字符数
 *  speed         下落速度倍率
 *  variance      各列速度差异 0–1
 *  shuffle       拖尾字符的随机闪烁频率 0–1
 *  mirror        水平镜像
 *  depth         视差层数（1 = 单层）
 *  glow          字符光晕强度
 *  intensity     整体不透明度
 *  slowRadius    指针减速影响半径（px）
 *  slowStrength  指针减速强度 0–1
 *  burstSize     字符头的高光放大倍率
 */
const FALLBACK_GLYPHS = '01'
const FALLBACK_COLORS = ['#1a44ff', '#ff7eeb']
const MONO_FONT =
  'ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace'

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

/**
 * 把一个字形预渲染成一张带光晕的小图。
 * 每帧对上百个字符调 shadowBlur 会很贵，烘焙成精灵图后只剩 drawImage。
 */
function makeGlyphSprite(char, color, fontSize, glowPx) {
  const pad = Math.ceil(glowPx * 2.4) + 2
  const width = Math.ceil(fontSize * 0.92) + pad * 2
  const height = Math.ceil(fontSize * 1.34) + pad * 2
  const canvas = document.createElement('canvas')
  const dpr = clamp(window.devicePixelRatio || 1, 1, 2)
  canvas.width = Math.max(1, Math.ceil(width * dpr))
  canvas.height = Math.max(1, Math.ceil(height * dpr))
  const ctx = canvas.getContext('2d')
  if (ctx) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.font = `600 ${fontSize.toFixed(2)}px ${MONO_FONT}`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = color
    ctx.shadowColor = color
    ctx.shadowBlur = glowPx
    // 叠两遍让光晕更实，单遍会偏虚
    ctx.fillText(char, width / 2, height / 2)
    ctx.fillText(char, width / 2, height / 2)
  }
  return { canvas, width, height }
}

export default function TerminalRain({
  colors = FALLBACK_COLORS,
  glyphs = FALLBACK_GLYPHS,
  glyphSize = 19,
  spacing = 2.95,
  density = 1,
  trail = 10,
  speed = 0.65,
  variance = 0.88,
  shuffle = 0.86,
  mirror = false,
  depth = 1,
  glow = 0.28,
  intensity = 0.65,
  slowRadius = 140,
  slowStrength = 0.2,
  burstSize = 0.7,
  className = '',
  style,
}) {
  const hostRef = useRef(null)
  const canvasRef = useRef(null)

  // colors 常常是字面量数组，直接进依赖会导致每次渲染都重建动画
  const colorKey = Array.isArray(colors) ? colors.join('|') : ''

  useEffect(() => {
    const host = hostRef.current
    const canvas = canvasRef.current
    if (!host || !canvas) return undefined

    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    const chars = String(glyphs || FALLBACK_GLYPHS).split('').filter(Boolean)
    if (chars.length === 0) chars.push('0')
    const palette =
      Array.isArray(colors) && colors.length > 0 ? colors.slice() : FALLBACK_COLORS.slice()

    const size = clamp(Number(glyphSize) || 19, 6, 96)
    const trailCount = Math.max(1, Math.round(Number(trail) || 10))
    const layerCount = Math.max(1, Math.round(Number(depth) || 1))
    const activeRatio = clamp(Number(density) || 1, 0.02, 1)
    const baseSpeed = size * 8 * clamp(Number(speed) || 0.65, 0.02, 6)
    const speedSpread = clamp(Number(variance) || 0, 0, 1) * 0.5
    const flickerRate = clamp(Number(shuffle) || 0, 0, 1) * 0.05
    const glowAmount = clamp(Number(glow) || 0, 0, 2)
    const strength = clamp(Number(intensity) || 0.65, 0.02, 1)
    const hoverRadius = Math.max(0, Number(slowRadius) || 0)
    const hoverSlow = clamp(Number(slowStrength) || 0, 0, 0.95)
    const headBoost = clamp(Number(burstSize) || 0, 0, 2)
    const basePitch = Math.max(size * 0.62 * (Number(spacing) || 2.95), size * 0.9)

    const reduceMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // 视差层：depth=1 时只有一层
    const layers = []
    for (let i = 0; i < layerCount; i += 1) {
      const t = layerCount === 1 ? 0 : i / (layerCount - 1)
      const layerSize = size * (1 - t * 0.22)
      const glowPx = layerSize * glowAmount * (1 - t * 0.45)
      layers.push({
        step: layerSize * 1.12,
        pitch: basePitch * (1 - t * 0.16),
        alpha: (1 - t * 0.5) * strength,
        speed: baseSpeed * (1 - t * 0.42),
        offset: Math.random(),
        body: palette.map((color) =>
          chars.map((char) => makeGlyphSprite(char, color, layerSize, glowPx)),
        ),
        head: palette.map((color) =>
          chars.map((char) =>
            makeGlyphSprite(
              char,
              color,
              layerSize * (1 + headBoost * 0.09),
              glowPx * (2.2 + headBoost * 2),
            ),
          ),
        ),
        columns: [],
      })
    }

    let width = 0
    let height = 0
    let frameId = 0
    let resizeFrameId = 0
    let lastTime = 0
    let inView = true
    const pointer = { x: -1e5, y: -1e5 }

    const pickIndex = () => (Math.random() * chars.length) | 0

    const seedLayer = (layer) => {
      const count = Math.max(1, Math.round(width / layer.pitch))
      const pitch = width / count
      const columns = []
      for (let i = 0; i < count; i += 1) {
        if (Math.random() > activeRatio) continue
        const column = {
          x: pitch * (i + 0.5 + layer.offset * 0.6),
          y: Math.random() * (height + layer.step * trailCount) - layer.step * trailCount,
          velocity: layer.speed,
          color: i % palette.length,
          alpha: 0.45 + Math.random() * 0.55,
          cell: Number.NEGATIVE_INFINITY,
          chars: new Array(trailCount + 1),
        }
        for (let k = 0; k <= trailCount; k += 1) column.chars[k] = pickIndex()
        columns.push(column)
      }
      layer.columns = columns
    }

    const resize = () => {
      const rect = host.getBoundingClientRect()
      width = Math.max(1, rect.width)
      height = Math.max(1, rect.height)
      const dpr = clamp(window.devicePixelRatio || 1, 1, 2)
      canvas.width = Math.max(1, Math.round(width * dpr))
      canvas.height = Math.max(1, Math.round(height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      for (let i = 0; i < layers.length; i += 1) seedLayer(layers[i])
    }

    const advance = (layer, dt) => {
      const { step, speed, columns } = layer
      for (let c = 0; c < columns.length; c += 1) {
        const column = columns[c]

        let factor = 1
        if (hoverRadius > 0) {
          const dx = column.x - pointer.x
          const dy = column.y - pointer.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < hoverRadius) {
            factor = 1 - hoverSlow * (1 - distance / hoverRadius)
          }
        }
        column.y += column.velocity * factor * dt

        // 字符头每前进一格换一次字
        const cell = Math.floor(column.y / step)
        if (cell !== column.cell) {
          column.cell = cell
          column.chars[0] = pickIndex()
        }
        // 拖尾随机闪烁
        if (Math.random() < flickerRate) {
          const index = 1 + ((Math.random() * trailCount) | 0)
          if (index <= trailCount) column.chars[index] = pickIndex()
        }

        // 整条拖尾越过底边 → 回到顶部重新下落
        if (column.y - trailCount * step > height) {
          column.y = -step * (1 + Math.random() * trailCount * 2)
          column.velocity = speed * (1 + (Math.random() * 2 - 1) * speedSpread)
          column.alpha = 0.45 + Math.random() * 0.55
          for (let k = 0; k <= trailCount; k += 1) column.chars[k] = pickIndex()
          column.cell = Number.NEGATIVE_INFINITY
        }
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height)
      for (let l = 0; l < layers.length; l += 1) {
        const layer = layers[l]
        const { step, columns } = layer
        for (let c = 0; c < columns.length; c += 1) {
          const column = columns[c]
          const drawX = mirror ? width - column.x : column.x
          const bodySprites = layer.body[column.color]
          const headSprites = layer.head[column.color]
          for (let i = trailCount; i >= 0; i -= 1) {
            const y = column.y - i * step
            if (y < -step * 2 || y > height + step * 2) continue
            const sprite = (i === 0 ? headSprites : bodySprites)[column.chars[i]]
            if (!sprite) continue
            const falloff = 1 - i / (trailCount + 1.2)
            const alpha = clamp(layer.alpha * column.alpha * falloff * falloff, 0, 1)
            if (alpha < 0.012) continue
            ctx.globalAlpha = alpha
            ctx.drawImage(
              sprite.canvas,
              drawX - sprite.width / 2,
              y - sprite.height / 2,
              sprite.width,
              sprite.height,
            )
          }
        }
      }
      ctx.globalAlpha = 1
    }

    function tick(time) {
      frameId = requestAnimationFrame(tick)
      const dt = lastTime ? Math.min((time - lastTime) / 1000, 0.06) : 0
      lastTime = time
      if (dt <= 0) return
      for (let i = 0; i < layers.length; i += 1) advance(layers[i], dt)
      render()
    }

    const start = () => {
      if (frameId || reduceMotion) return
      lastTime = 0
      frameId = requestAnimationFrame(tick)
    }
    const stop = () => {
      if (frameId) cancelAnimationFrame(frameId)
      frameId = 0
    }

    resize()

    const resizeObserver =
      typeof ResizeObserver === 'undefined'
        ? null
        : new ResizeObserver(() => {
            if (resizeFrameId) return
            resizeFrameId = requestAnimationFrame(() => {
              resizeFrameId = 0
              resize()
              if (reduceMotion) render()
            })
          })
    if (resizeObserver) {
      resizeObserver.observe(host)
    } else {
      window.addEventListener('resize', resize)
    }

    // 深色区在首屏之下，离开视口就停掉 rAF，别白烧 CPU
    const intersectionObserver =
      typeof IntersectionObserver === 'undefined'
        ? null
        : new IntersectionObserver(
            (entries) => {
              const entry = entries[entries.length - 1]
              inView = entry.isIntersecting
              if (inView) start()
              else stop()
            },
            { rootMargin: '160px' },
          )
    if (!intersectionObserver) inView = true

    const onPointerMove = (event) => {
      const rect = host.getBoundingClientRect()
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
    }
    const onPointerLeave = () => {
      pointer.x = -1e5
      pointer.y = -1e5
    }
    const onVisibilityChange = () => {
      if (document.hidden) stop()
      else if (inView) start()
    }

    if (hoverRadius > 0) {
      window.addEventListener('pointermove', onPointerMove, { passive: true })
      window.addEventListener('pointerleave', onPointerLeave, { passive: true })
    }
    document.addEventListener('visibilitychange', onVisibilityChange)

    if (reduceMotion) {
      render()
    } else if (intersectionObserver) {
      intersectionObserver.observe(host)
    } else {
      start()
    }

    return () => {
      stop()
      if (resizeFrameId) cancelAnimationFrame(resizeFrameId)
      if (intersectionObserver) intersectionObserver.disconnect()
      if (resizeObserver) resizeObserver.disconnect()
      else window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [
    colorKey,
    glyphs,
    glyphSize,
    spacing,
    density,
    trail,
    speed,
    variance,
    shuffle,
    mirror,
    depth,
    glow,
    intensity,
    slowRadius,
    slowStrength,
    burstSize,
  ])

  return (
    <div
      ref={hostRef}
      className={`terminal-rain ${className}`.trim()}
      style={style}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="terminal-rain__canvas" />
    </div>
  )
}
