import signUrl from '../assets/sign.webp'
import './Signature.css'

/* 签名图是一张透明底的白墨（白 + 浅灰两级）。
   深色底上直接放就行；放到浅色底上会整块看不见，
   所以浅色底开 signature--ink，用 invert 把它翻成墨色 ——
   注意是 invert(1) 不是 brightness(0)：前者能保住图里那层浅灰的层次，
   后者会压成一坨纯黑。 */
export default function Signature({ onLight = false, className = '', style }) {
  return (
    <img
      className={['signature', onLight && 'signature--ink', className].filter(Boolean).join(' ')}
      src={signUrl}
      alt="李长春 签名"
      style={style}
      draggable="false"
    />
  )
}
