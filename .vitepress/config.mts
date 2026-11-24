import { defineConfig } from 'vitepress'

const rawBase = process.env.BASE_PATH || '/vitepress-v2/'
const base = rawBase.endsWith('/') ? rawBase : `${rawBase}/`

export default defineConfig({
  lang: 'zh-CN',
  title: 'VitePress v2 (2.0-alpha)',
  description: 'SSG 多版本实测基准子站 — VitePress 2.0.0-alpha.21 + srcDir 隔离 + 原生 Mermaid 12',
  base,
  srcDir: 'docs',
  cleanUrls: true,
  lastUpdated: false,
  markdown: {
    math: true,
    lineNumbers: true,
    config(md) {
      const defaultFence = md.renderer.rules.fence!.bind(md.renderer.rules)
      md.renderer.rules.fence = (tokens, idx, options, env, self) => {
        const token = tokens[idx]
        if (token.info.trim() === 'mermaid') {
          const b64 = Buffer.from(token.content, 'utf-8').toString('base64')
          return `<MermaidBlock code="${b64}" />`
        }
        return defaultFence(tokens, idx, options, env, self)
      }
    }
  },
  themeConfig: {
    siteTitle: 'VitePress v2 · alpha.21',
    nav: [
      { text: '← 返回对比总站', link: 'https://page.2401.xyz/' },
      { text: '01. 标注', link: '/01-annotations' },
      { text: '02. 流程图', link: '/02-diagrams' },
      { text: '03. 公式', link: '/03-math' },
      { text: '04. 目录结构', link: '/04-directory/' },
      { text: '05. 代码高亮', link: '/05-code-blocks' }
    ],
    sidebar: [
      {
        text: 'VitePress v2 基准套件',
        items: [
          { text: '00. 版本与基准概览', link: '/' },
          { text: '01. 专属标注与元数据', link: '/01-annotations' },
          { text: '02. 流程图与时序图', link: '/02-diagrams' },
          { text: '03. 数学公式排版', link: '/03-math' },
          {
            text: '04. 目录结构与路由取舍',
            collapsed: false,
            items: [
              { text: 'srcDir 隔离与重命名映射', link: '/04-directory/' },
              {
                text: 'nested 子目录（rewrites 净化 URL）',
                collapsed: false,
                items: [
                  { text: 'A. rewrites 抹除 01- 前缀', link: '/04-directory/nested/clean-prefix' },
                  { text: 'B. public 目录跟随迁移陷阱', link: '/04-directory/nested/public-trap' }
                ]
              }
            ]
          },
          { text: '05. 高阶代码块与语法高亮', link: '/05-code-blocks' }
        ]
      }
    ],
    outline: {
      level: [2, 3],
      label: '本页目录'
    },
    search: {
      provider: 'local'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/page2401/vitepress-v2' }
    ],
    footer: {
      message: '独立子模块仓库 page2401/vitepress-v2 · main 存源码 / page 发产物',
      copyright: 'page.2401.xyz Static Site Generator Benchmark'
    }
  },
  rewrites: {
    '04-directory/nested/01-clean-prefix.md': '04-directory/nested/clean-prefix.md',
    '04-directory/nested/02-public-trap.md': '04-directory/nested/public-trap.md'
  }
})
