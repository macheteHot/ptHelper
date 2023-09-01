import { createRoot } from 'react-dom/client'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import dayjs from 'dayjs'
import Setting from './components/Setting'
import 'dayjs/locale/zh-cn'
import './css/index.css'
// eslint-disable-next-line import/no-unresolved
import 'uno.css'
// pages
import modifyDetailPage from './pages/details'
import modifyTorrentPage from './pages/torrents'
import { getContentsDiv } from './tools'

dayjs.locale('zh-cn')

async function main() {
  GM.addStyle(await GM.getResourceText('antdCss'))
  if (window.top !== window.self) return // in iframe
  const app = getContentsDiv('pt-helper')
  const root = createRoot(app)
  root.render(
    <ConfigProvider locale={zhCN}>
      <Setting />
    </ConfigProvider>,
  )
  document.body.appendChild(app)
}

main()

modifyDetailPage()
modifyTorrentPage()
