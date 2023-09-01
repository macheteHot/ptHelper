/* eslint-disable  */
const { ConcatSource } = require("webpack-sources");
const { Compilation, ModuleFilenameHelpers, Template } = require('webpack')

const wrapComment = (str) => {
  if (!str.includes('\n')) {
    return Template.toComment(str)
  }
  return `/*!\n * ${str
    .replace(/\*\//g, '* /')
    .split('\n')
    .join('\n * ')
    .replace(/\s+\n/g, '\n')
    .trimEnd()}\n */`
}

class BannerPlugin {
  constructor(options) {
    if (typeof options === 'string' || typeof options === 'function') {
      options = {
        banner: options,
      }
    }

    this.options = options

    const bannerOption = options.banner
    if (typeof bannerOption === 'function') {
      const getBanner = bannerOption
      this.banner = this.options.raw
        ? getBanner
        : /** @type {BannerFunction} */ (data) => wrapComment(getBanner(data))
    } else {
      const banner = this.options.raw ? bannerOption : wrapComment(bannerOption)
      this.banner = () => banner
    }
  }

  /**
   * Apply the plugin
   * @param {Compiler} compiler the compiler instance
   * @returns {void}
   */
  apply(compiler) {
    const { options } = this
    const { banner } = this
    const matchObject = ModuleFilenameHelpers.matchObject.bind(
      undefined,
      options,
    )
    const cache = new WeakMap()

    compiler.hooks.compilation.tap('BannerPlugin', (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: 'BannerPlugin',
          stage: Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_TRANSFER,
        },
        () => {
          for (const chunk of compilation.chunks) {
            if (options.entryOnly && !chunk.canBeInitial()) {
              continue
            }

            for (const file of chunk.files) {
              if (!matchObject(file)) {
                continue
              }

              const data = {
                chunk,
                filename: file,
              }

              const comment = compilation.getPath(banner, data)

              compilation.updateAsset(file, (old) => {
                const cached = cache.get(old)
                if (!cached || cached.comment !== comment) {
                  const source = options.footer
                    ? new ConcatSource(old, '\n', comment)
                    : new ConcatSource(comment, '\n', old)
                  cache.set(old, { source, comment })
                  return source
                }
                return cached.source
              })
            }
          }
        },
      )
    })
  }
}

module.exports = BannerPlugin
