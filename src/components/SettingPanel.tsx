import { Button, Drawer, Form, Input, Radio, message } from 'antd'
import { type FC, type HTMLAttributes, useEffect } from 'react'
import { type Config } from '../types'
import { getPluginConfig, setPluginConfig } from '../tools/pluginConfig'

type SettingPanelProps = HTMLAttributes<HTMLElement> & {
  onClose: () => void
  open: boolean
}

const SettingPanel: FC<SettingPanelProps> = ({ onClose, open }) => {
  const [form] = Form.useForm<Config>()

  const getConfig = async () => {
    const config = await getPluginConfig()
    form.setFieldsValue(config)
  }

  useEffect(() => {
    if (open) {
      getConfig()
    }
  }, [open])

  const onFinish = async (values: Config) => {
    setPluginConfig(values)
    message.success('保存成功!')
    onClose()
  }

  const onFinishFailed = (errorInfo: unknown) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Drawer
      title="PT助手设置"
      placement="right"
      onClose={() => {
        form.resetFields()
        onClose()
      }}
      open={open}
    >
      <Form
        layout="vertical"
        name="setting"
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item label="客户端选择" name="client">
          <Radio.Group>
            <Radio value={1}>qBittorrent</Radio>
            <Radio value={2}>Transmission</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="客户端地址" name="url">
          <Input type="url" />
        </Form.Item>
        <Form.Item label="保存文件到" name="savePath">
          <Input type="href" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  )
}

export default SettingPanel
