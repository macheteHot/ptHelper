import { Button, message } from 'antd'
import { useEffect, type FC, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { getContentsDiv } from '../tools'
import type { Config } from '../types'
import { getPluginConfig } from '../tools/pluginConfig'
import { clientDownload } from '../tools/downloadTorrent'

type DownloadBtnProps = {
  tr: HTMLElementTagNameMap['tr']
}

const DownloadBtn: FC<DownloadBtnProps> = ({ tr }) => {
  const [config, setConfig] = useState<Config>()

  useEffect(() => {
    getPluginConfig().then(setConfig)
  }, [])

  function onClick() {
    const linkList = [...tr.querySelectorAll('a')].map((_) => _.href)
    const downloadLink = linkList.find((url) =>
      url.match(/\/download\.php\?id=./),
    )
    if (downloadLink) {
      clientDownload(downloadLink)
    } else {
      message.error('没有找到下载链接,请联系开发者')
    }
  }

  return (
    <Button type="primary" onClick={onClick} className="fs-12 p-x-4 m-x-4 ">
      {config?.client === 2 ? 'Transmission' : 'qBittorrent'} 下载
    </Button>
  )
}

async function addTorrentPageDownload() {
  if (window.top !== window.self) return // in iframe
  const { pathname } = window.location
  if (!/^\/torrents.php$/.test(pathname)) return // not in torrents

  const trList = document.querySelectorAll(
    '.torrents>tbody>tr:not(:first-child)',
  ) as NodeListOf<HTMLTableRowElement>

  trList.forEach((tr) => {
    tr.classList.add('hover-bg-red')
    const div = getContentsDiv()
    const root = createRoot(div)
    root.render(<DownloadBtn tr={tr} />)
    const td = tr.querySelector('td')
    if (td?.firstChild) {
      td.insertBefore(div, td.firstChild)
    }
  })
}

export default function modifyTorrentPage() {
  addTorrentPageDownload()
}
