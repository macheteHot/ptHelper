import { message } from 'antd'
import { getPluginConfig } from './pluginConfig'
// 调用客户端下载
export async function clientDownload(downloadLink: string) {
  const config = await getPluginConfig()
  if (!config.url) {
    message.error('你还没有设置完客户端信息!')
    return
  }
  const downloadApiUrl = new URL(config.url)
  if (config?.client === 1) {
    downloadApiUrl.pathname = '/api/v2/torrents/add'
    const formData = new FormData()
    const payload = {
      autoTMM: false,
      savepath: config.savePath,
      urls: downloadLink,
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
