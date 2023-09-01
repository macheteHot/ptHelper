import { createRoot } from 'react-dom/client'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import DownloadBtn from '../components/DownloadBtn'

async function injectDownloadBtn() {
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

export default function modifyTorrentPage() {
  injectDownloadBtn()
}
