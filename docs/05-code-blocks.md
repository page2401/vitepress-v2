---
title: "05. 高阶代码块与语法高亮"
description: "实测 VitePress v2 (2.0.0-alpha.21) 在 Vite 8 Rolldown 管线下对 Shiki [title]、{3,7-9} 行高亮、[!code ++/--] Diff 与 ::: code-group 的 100% 延续性。"
outline: [2, 3]
---

# 05. 高阶代码块与语法高亮 <Badge type="tip" text="vitepress@2.0-alpha.21 · Shiki" />

与 `vitepress-v1` 对照验证：**VitePress v2 (`2.0.0-alpha.21`)** 在底层升级至 Vite 8 / Rolldown 构建管线并启用 `srcDir: 'docs'` 后，其代码块高阶语法（Shiki 双主题 CSS 变量、`[title]`、`{3,7-9}`、`[!code ++]` 与 `::: code-group`）与 v1 保持 **100% 零破坏性兼容**，同时在生成的 `<div class="language-ts" dir="ltr">` 上默认补充了双向文本隔离属性 `dir="ltr"`。

## 1. 代码块文件名标题栏与基础语法高亮

延续 VitePress 方言传统，通过 `::: code-group` + `[scripts/resolve-route.ts]` 渲染顶部文件名标签栏（注意：本文件位于 `docs/05-code-blocks.md`，因未列入 `rewrites` 映射表，线上路由保留为 `/05-code-blocks`）：

::: code-group

```ts [scripts/resolve-route.ts]
export interface RouteContext {
  basePath: string
  slug: string
  cleanUrls: boolean
}

export function formatDocRoute(ctx: RouteContext): string {
  const prefix = ctx.basePath.endsWith('/') ? ctx.basePath : `${ctx.basePath}/`
  const normalized = ctx.slug.replace(/^\/+|\/+$/g, '')
  if (!normalized || normalized === 'index') return prefix
  return ctx.cleanUrls ? `${prefix}${normalized}/` : `${prefix}${normalized}.html`
}
```

:::

::: info v2 `preWrapper.ts` 细节对比
在 `vitepress@2.0.0-alpha.21` 中，独立代码块写 ```` ```ts [scripts/resolve-route.ts] ```` 依然会被 `token.info.replace(/\[.*\]/, '')` 静默剥离标题，仅在 `::: code-group` 中由 `extractTitle` 提取为标签名；新增改进是复制按钮原生注入了 `data-copied` 多语言回执属性。
:::

## 2. 关键行聚焦与高亮（Line Highlighting）

通过紧随语言名的 `{3,7-9}` 标记，在构建期静态高亮第 `3` 行与第 `7–9` 行，无需任何客户端高亮脚本：

```json{3,7-9}
{
  "id": "ssg-benchmark",
  "routeStyle": "clean",
  "strictZeroCdn": true,
  "markdown": {
    "mathEngine": "katex",
    "diagramEngine": "mermaid",
    "lineHighlight": true,
    "codeTransformers": ["diff", "focus"]
  }
}
```

## 3. 保留 TypeScript 词法着色的行级 Diff

借助内置 Shiki `transformerNotationDiff`，在保持完整 TypeScript 关键字与函数签名高亮的同时，利用行尾 `// [!code --]` 与 `// [!code ++]` 标注安全路径校验重构前后的增删差异：

```ts
export function mountSubsite(baseDir: string, subPath: string): string | null {
  const cleanRel = decodeURIComponent(subPath).replace(/\.\./g, '') // [!code --]
  return `${baseDir}/${cleanRel}` // [!code --]
  const resolvedBase = path.resolve(baseDir) // [!code ++]
  const target = path.resolve(resolvedBase, decodeURIComponent(subPath).replace(/^\/+/, '')) // [!code ++]
  return target.startsWith(`${resolvedBase}${path.sep}`) ? target : null // [!code ++]
}
```

## 4. 多语言运行时命令组（`::: code-group`）

多语言安装与构建指令通过原生 `::: code-group` 横向收束，从 VitePress v1 迁移至 v2 无需改动一行 Markdown：

::: code-group

```bash [Node.js (package.json)]
npm ci && npm run build
```

```bash [Deno 2 (deno.json)]
deno task build
```

```bash [Python (requirements.txt)]
pip install -r requirements.txt && sphinx-build -b dirhtml . _build/dirhtml
```

```bash [Ruby (Gemfile)]
bundle install && bundle exec jekyll build
```

:::

## 5. 四大底层高亮引擎能力对照小结

| 高亮引擎代表 | 典型采用框架 | 构建期零运行时 JS | 原生行号 / 行高亮 | 保留词法着色的 Diff |
| :--- | :--- | :--- | :--- | :--- |
| **Shiki / Expressive Code** | **VitePress v1/v2**、VuePress v2、Starlight、Fumadocs、Nuxt | ✅ 纯静态内联 CSS 变量 | ✅ `{3,7-9}` / `[!code highlight]` | ✅ `// [!code ++]` |
| **Prism.js** | Docusaurus、VuePress v1、Eleventy (plugin) | ✅ 静态 Token 类名 | ✅ `{3,7-9}` / 魔法注释 | ⚠️ 需配 diff-highlight 插件 |
| **Pygments / Rouge** | MkDocs Material、Sphinx、Pelican、Jekyll | ✅ Python/Ruby 编译直出 | ✅ `hl_lines` / `emphasize-lines` | ⚠️ 仅标准 `diff` 块红绿 |
| **Chroma / Giallo / hljs** | Hugo (Go Chroma)、Zola (Rust Giallo)、mdBook (hljs) | ✅ (mdBook 为客户端 hljs) | ✅ Hugo/Zola 原生 `hl_lines` | ⚠️ 仅标准 `diff` 块红绿 |
