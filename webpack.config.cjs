/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
const path = require('node:path')
const fs = require('node:fs')
const UnoCSS = require('@unocss/webpack').default
const BannerPlugin = require('./banner.cjs')

const bannerStr = fs.readFileSync(path.resolve('./assets/banner.txt'), {
  encoding: 'utf-8',
})

module.exports = (env, argv) => {
  return {
    entry: './src/main.tsx',
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
      antd: 'antd',
      dayjs: 'dayjs',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                compilerOptions: {
                  noEmit: false,
                },
              },
            },
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.d\.ts$/,
          loader: 'ignore-loader',
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    plugins: [
      UnoCSS(),
      new BannerPlugin({
        banner: argv.mode === 'production' ? bannerStr : '',
        raw: true,
      }),
    ],
    optimization: {
      realContentHash: true,
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
  }
}
