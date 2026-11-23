---
title: "04. 目录结构与路由取舍"
description: "实测 VitePress 配置 srcDir: 'docs' 与 rewrites 路由重写后的优势与隐性陷阱。"
outline: [2, 3]
---

# 04. 目录结构与路由取舍 <Badge type="info" text="srcDir + rewrites 模式" />

为了与 `vitepress-v1`（根目录平铺模式）形成对照，本 `vitepress-v2` 子模块专门采用了 VitePress 的另一种经典目录组织方案：**`srcDir: 'docs'` + `rewrites` 路由重写**。

## 1. 解决了什么？又引入了什么新痛点？

| 调整项 | 相比 `vitepress-v1` 解决的问题 | 新引入的副作用 / 陷阱 |
| :--- | :--- | :--- |
| **`srcDir: 'docs'`** | 根目录 `README.md` 与 `package.json` 自动与正文隔离，不再需要手写 `srcExclude` | **静态资源目录隐式搬家**：`public/` 必须跟着搬进 `docs/public/`！若习惯性把 `.nojekyll` 或 `CNAME` 放在根 `public/` 下，构建时会被静默丢弃 |
| **`rewrites` 路由映射** | 本地保留 `01-clean-prefix.md` 方便编辑器排序，同时线上生成纯净的 `/clean-prefix` URL | 每增加一篇带序号文档都必须在 `config.mts` 里同步写两处（`sidebar` 一处 + `rewrites` 一处），心智负担翻倍 |

## 2. 嵌套子目录实测入口

- [进入嵌套子页 A（物理名 `01-clean-prefix.md` -> 路由 `/clean-prefix`）](./nested/clean-prefix)
- [进入嵌套子页 B（物理名 `02-public-trap.md` -> 路由 `/public-trap`）](./nested/public-trap)
