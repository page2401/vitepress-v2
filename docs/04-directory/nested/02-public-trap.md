---
title: "嵌套实测 B：srcDir 下的 public 目录迁移陷阱"
---

# 嵌套实测 B：`srcDir` 下的 `public` 目录迁移陷阱

在 Astro 等前端框架中，无论页面放在 `src/` 哪一层，静态资源始终固定在仓库根目录 `public/`；但在 VitePress 中，一旦设置 `srcDir: 'docs'`：

- 根路径静态目录会变成 **`docs/public/`**（而 `.vitepress/` 配置目录却依然留在仓库根目录 `.vitepress/`，或也可放进 `docs/.vitepress/`）。
- 这种“配置可在外、静态资源必须在内”的不对称约定，极易导致开发者把 `.nojekyll` 或图标放错位置。

- [返回《04. 目录结构与路由取舍》](../)
