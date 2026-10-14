import Home from './Home.jsx'
import CaseDetail from './components/CaseDetail.jsx'
import { useCaseId } from './lib/router.js'

/* 整站只有一个开关：地址里有没有 #/case/<id>。
   有 → 渲染作品详情页；没有 → 渲染首页。
   两页各自管自己的滚动位置和画布，切过去时另一页是完全卸载的。 */
export default function App() {
  const activeId = useCaseId()

  return activeId ? <CaseDetail id={activeId} /> : <Home />
}
