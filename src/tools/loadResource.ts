/* eslint-disable @typescript-eslint/no-extra-semi */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable func-names */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
interface LoadConfig {
  url: string
  type?: 'css' | 'js'
  attribute?: Record<string, string>
}

;(window as any).loadResource = async function (
  resourceList: Array<LoadConfig | string>,
) {
  function _throwError(str: string): never {
    throw new Error(str)
  }
  function _load(config: Required<LoadConfig>): Promise<undefined> {
    const { url, type, attribute } = config
    return new Promise((resolve) => {
      if (document.head.innerHTML.includes(url)) {
        // 已经加载过了
        resolve(undefined)
      } else {
        const tagName = type === 'js' ? 'script' : 'link'
        const eleNode = document.createElement(tagName)
        Object.assign(
          eleNode,
          {
            onload() {
              resolve(undefined)
            },
          },
          type === 'js'
            ? {
                type: 'text/javascript',
                src: url,
              }
            : {
                type: 'text/css',
                rel: 'stylesheet',
                href: url,
              },
          attribute,
        )
        document.head.appendChild(eleNode)
      }
    })
  }

  const mathResourceRegex = /^.*\.(js|css)/
  for (const resource of resourceList) {
    if (typeof resource === 'string') {
      const [, type] =
        (resource.match(mathResourceRegex) as [string, 'js' | 'css']) || []
      if (type === undefined) {
        _throwError(`resource type error: ${resource}`)
      }
      await _load({ url: resource, type, attribute: {} })
    } else {
      if (resource.type && !['js', 'css'].includes(resource.type)) {
        _throwError(`resource type error: ${resource.type}`)
      }
      if (!resource.type) {
        // eslint-disable-next-line no-nested-ternary
        const type = resource.url.endsWith('.js')
          ? 'js'
          : resource.url.endsWith('.css')
          ? 'css'
          : null
        if (type === null) {
          _throwError(`resource type error: ${resource.url}`)
        }
        await _load({
          ...resource,
          type,
          attribute: resource.attribute || {},
        })
      } else {
        await _load({
          ...resource,
          type: resource.type!,
          attribute: resource.attribute || {},
        })
      }
    }
  }
}
