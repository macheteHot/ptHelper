/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'unocss'
import { presetScalpel } from 'unocss-preset-scalpel'

export default defineConfig({
  presets: [
    presetScalpel({
      important: true,
    }),
  ],
})
