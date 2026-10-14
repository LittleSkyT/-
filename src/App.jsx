import Home from './Home.jsx'
import CaseDetail from './components/CaseDetail.jsx'
import Gallery from './components/Gallery.jsx'
import { useRoute } from './lib/router.js'

/* 整站是一个 hash 开关：
     #/case/<id> → 作品详情页
     #/gallery   → 全部作品页（16 张缩略图）
     都没有      → 首页
   三页各自管自己的滚动位置和画布，切过去时另外两页是完全卸载的。 */
export default function App() {
  const route = useRoute()

  if (route.name === 'case') return <CaseDetail id={route.id} />
  if (route.name === 'gallery') return <Gallery />

  return <Home />
}
