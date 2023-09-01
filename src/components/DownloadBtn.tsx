import { useState, type FC, useEffect } from 'react'
import { Button, message } from 'antd'
import { type Config } from '../types'
import { getPluginConfig } from '../tools/pluginConfig'
import { clientDownload } from '../tools/downloadTorrent'

// type DownloadBtnProps = HTMLAttributes<HTMLElement>

const DownloadBtn: FC = () => {
  const [config, setConfig] = useState<Config>()

  useEffect(() => {
    getPluginConfig().then(setConfig)
  }, [])

  function downloadTorrent() {
    const originDownloadBtn = document.querySelector('a[title="下载种子"]') as
      | HTMLAnchorElement
      | undefined
    if (!originDownloadBtn) {
      message.error('当前站点不支持,请联系开发者!')
      return
    }
    clientDownload(originDownloadBtn.href)
  }

  return (
    <>
      <Button size="small" type="primary" onClick={downloadTorrent}>
        {config?.client === 2 ? 'Transmission' : 'qBittorrent'} 下载
      </Button>
      <span className="m-x-4">|</span>
    </>
  )
}

export default DownloadBtn
