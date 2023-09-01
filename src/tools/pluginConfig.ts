import { type Config } from '../types'

const GM_KEY = 'ptHelper_config'
export const getPluginConfig = async () => {
  const res = (await GM.getValue(GM_KEY)) as Config
  return res
}

export const setPluginConfig = async (value: Config) => {
  GM.setValue(GM_KEY, value)
}
