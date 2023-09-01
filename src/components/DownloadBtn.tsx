import { useState, type FC, useEffect } from 'react'
import { Button, message } from 'antd'
import { type Config } from '../types'
import { getPluginConfig } from '../tools/pluginConfig'

// type DownloadBtnProps = HTMLAttributes<HTMLElement>

const DownloadBtn: FC = () => {
  const [config, setConfig] = useState<Config>()

  useEffect(() => {
    getPluginConfig().then(setConfig)
  }, [])

  function clientDownload() {
    const downloadApiUrl = new URL(config!.url as string)
    if (config?.client === 1) {
      downloadApiUrl.pathname = '/api/v2/torrents/add'
      const originDownloadBtn = document.querySelector(
        'a[title="下载种子"]',
      ) as HTMLAnchorElement | undefined
      if (!originDownloadBtn) {
        message.error('当前站点不支持,请联系开发者')
        return
      }
      const formData = new FormData()
      const payload = {
        autoTMM: false,
        savepath: config.savePath,
        urls: originDownloadBtn.href,
        cookie: document.cookie,
      }
      Object.entries(payload ?? {}).forEach(([key, value]) => {
        formData.append(key, value as unknown as string)
      })
      GM.xmlHttpRequest({
        // url: downloadApiUrl,
        url: downloadApiUrl.href,
        method: 'POST',
        data: formData as unknown as string,
        onload: (res) => {
          if (res.status === 200) {
            message.success('开始下载!')
          }
        },
      })
    } else {
      message.error('暂不支持 Transmission')
    }
  }

  return (
    <>
      <Button size="small" type="primary" onClick={clientDownload}>
        {config?.client === 2 ? 'Transmission' : 'qBittorrent'} 下载
      </Button>
      <span className="m-x-4">|</span>
    </>
  )
}

export default DownloadBtn
