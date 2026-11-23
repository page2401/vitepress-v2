import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import MermaidBlock from './MermaidBlock.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('MermaidBlock', MermaidBlock)
  }
} satisfies Theme
