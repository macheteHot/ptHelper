import { useState, type FC, type HTMLAttributes } from 'react'
import { Button } from 'antd'
import SettingPanel from './SettingPanel'

type settingProps = HTMLAttributes<HTMLElement>

const setting: FC<settingProps> = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button
        className="flex-flex-start-center position-fixed p-x-6 p-y-8 br-r-0 z-index-9999"
        style={{ inset: ' 50px 0px auto auto' }}
        onClick={() => {
          console.log('open !')
          setOpen(true)
        }}
      >
        <span className="fs-18">⚙️</span>
        <span>PT助手设置</span>
      </Button>
      <SettingPanel
        open={open}
        onClose={() => {
          setOpen(false)
        }}
      />
    </>
  )
}

export default setting
