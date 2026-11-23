---
title: "01. 专属标注与元数据"
description: "测试 VitePress v2 (2.0.0-alpha.21) 的 Frontmatter、::: 容器、折叠块与 GFM Alerts 兼容性。"
outline: [2, 3]
---

# 01. 专属标注与元数据 <Badge type="tip" text="vitepress@2.0-alpha.21" />

不同静态网站生成器对“提示框 / 标注（Callouts / Admonitions）”和页面元数据的语法约定存在显著分歧。本页验证 **VitePress v2 (`2.0.0-alpha.21`)** 与 v1 的延续性。

## 1. Frontmatter 元数据机制

VitePress v2 继续保持**宽松型 YAML Frontmatter**，无需像 Astro Content Layer 那样预定义 Zod Schema，任意自定义字段均可通过 `useData().frontmatter` 读取，目录层级依然通过 `outline: [2, 3]` 控制。

- **当前页标题字段**：`title: "01. 专属标注与元数据"`
- **目录深度字段**：`outline: [2, 3]`
- **内联徽章支持**：内置全局组件 `<Badge type="info" text="Info" />` `<Badge type="warning" text="Warning" />` `<Badge type="danger" text="Danger" />` 与 v1 完全一致。

## 2. 标准提示容器（Triple-Colon Containers）

VitePress v2 保持 `::: <类型> [可选自定义标题]` 语法，与 v1 正文 100% 兼容：

::: info
默认信息提示块：静态站点对比平台的每个子模块均独立维护 `main`（源码）与 `page`（构建产物）双分支，互不污染提交历史。
:::

::: tip 性能优化建议（自定义标题）
在 VitePress v2 中，自定义标题同样直接写在 `::: tip ` 空格之后，支持内部嵌套行内代码如 `srcDir: 'docs'` 与加粗强调。
:::

::: warning 版本边界注意
从 VitePress v1 升级到 v2 时，正文 Markdown 标注零破坏性变更；真正的破坏性变更集中在三方插件的 `peerDependencies` 锁死问题上。
:::

::: danger 不可逆分支覆盖警告
自动化流水线在向 `page` 分支推送构建产物时会启用 `force_orphan: true`，切勿在 `page` 分支直接手工修改代码！
:::

## 3. 原生可折叠详情容器（Details Block）

::: details 点击展开查看 VitePress v2 容器语法源码结构
```markdown
::: tip 性能优化建议（自定义标题）
自定义标题直接跟在类型关键字空格后。
:::
```
除了代码块，折叠容器内同样支持列表、表格与数学公式 $f(x) = x^2 + 1$。
:::

## 4. GitHub 风格引用警报（GFM Alerts）兼容性

> [!NOTE]
> 这是一段标准的 GitHub Flavored Markdown `[!NOTE]` 警报文本。VitePress v2 同样原生支持将其解析为提示框。

> [!IMPORTANT]
> 跨平台迁移 Markdown 文档时，是否原生兼容 `> [!IMPORTANT]` 与 `> [!WARNING]` 直接决定了旧文档的改造成本。

> [!CAUTION]
> 若目标生成器未内置 GFM Alert 解析器，上方标记会退化为普通引用块并原样露出 `[!CAUTION]` 字符串。
