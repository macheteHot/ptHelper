import { createRoot } from 'react-dom/client'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import dayjs from 'dayjs'
import Setting from './components/Setting'
import DownloadBtn from './components/DownloadBtn'
import 'dayjs/locale/zh-cn'
// eslint-disable-next-line import/no-unresolved
import 'uno.css'

dayjs.locale('zh-cn')

async function main() {
  GM.addStyle(await GM.getResourceText('antdCss'))
  if (window.top !== window.self) return // in iframe
  const app = document.createElement('div')
  app.classList.add('pt-helper')
  app.style.display = 'contents'
  const root = createRoot(app)
  root.render(
    <ConfigProvider locale={zhCN}>
      <Setting />
    </ConfigProvider>,
  )
  document.body.appendChild(app)
}

main()

async function injectDetailPage() {
  if (window.top !== window.self) return // in iframe
  const { pathname } = window.location
  if (!/^\/details/.test(pathname)) return // not in details
  const container = document.createElement('div')
  container.style.display = 'contents'
  const root = createRoot(container)
  root.render(
    <ConfigProvider locale={zhCN}>
      <DownloadBtn />
    </ConfigProvider>,
  )
  const originDownloadBtn = document.querySelector(
    'a[title="下载种子"]',
  ) as HTMLDivElement
  originDownloadBtn.parentElement!.insertBefore(container, originDownloadBtn)
}

injectDetailPage()
