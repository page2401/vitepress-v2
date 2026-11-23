---
layout: home

hero:
  name: "VitePress v2"
  text: "新一代预览版基准实测"
  tagline: "锁定版本 vitepress@2.0.0-alpha.21 · srcDir 隔离 + 自定义组件接入 Mermaid 12"
  actions:
    - theme: brand
      text: "01. 专属标注与元数据 →"
      link: /01-annotations
    - theme: alt
      text: "02. 流程图 Mermaid 12"
      link: /02-diagrams
    - theme: alt
      text: "04. 目录与 rewrites"
      link: /04-directory/

features:
  - title: "01. 延续 v1 双轨标注语法"
    details: "100% 兼容 ::: info / tip / warning / danger / details 与 GitHub > [!NOTE] 警报块，从 v1 迁移正文零语法改造成本。"
    link: /01-annotations
  - title: "02. 脱离旧插件直连 Mermaid 12"
    details: "因社区 vitepress-plugin-mermaid 锁死 peer vitepress@^1.0，v2 改由 .vitepress/theme 自定义 Vue 组件直连最新 mermaid@12.3.0。"
    link: /02-diagrams
  - title: "03. MathJax 3 仍限定 v4"
    details: "即便升级到 2.0.0-alpha.21，peerOptional 依然限定 markdown-it-mathjax3@^4（锁定 4.3.2），输出零客户端构建期 SVG。"
    link: /03-math
  - title: "04. srcDir: 'docs' 与 rewrites 实测"
    details: "启用 srcDir 彻底免去 srcExclude 排除 README.md，并通过 rewrites 抹除 01- 前缀，但暴露出 docs/public/ 迁移与映射表维护代价。"
    link: /04-directory/
---

## 子模块版本档案（对比 `vitepress-v1`）

| 依赖模块 | 精确锁定版本 | 与 v1 (`1.6.4`) 的核心差异 |
| :--- | :--- | :--- |
| `vitepress` | `2.0.0-alpha.21` | 底层构建管线升级，ESM 优先架构 |
| `mermaid` | `12.3.0` | 摆脱旧三方插件约束，通过 30 行原生主题扩展直连 v12 |
| `markdown-it-mathjax3` | `4.3.2` | `peerOptional` 仍为 `^4`，尚未升级至 `5.x` |
