---
title: "嵌套实测 A：rewrites 抹除 01- 前缀的双刃剑"
---

# 嵌套实测 A：rewrites 抹除 01- 前缀的双刃剑

- **物理文件路径**：`docs/04-directory/nested/01-clean-prefix.md`
- **重写后访问路由**：`/vitepress-v2/04-directory/nested/clean-prefix`

::: warning 双刃剑效应：Markdown 内部链接被迫写重写后的名字
注意看上一页跳转到本页的 Markdown 链接：必须写 `[...](./nested/clean-prefix)` 而不是真实文件名 `./nested/01-clean-prefix.md`！这意味着在 GitHub 网页端或 VS Code 里按住 Ctrl 点击该链接会提示文件不存在，破坏了离线可跳转性。
:::

- [返回《04. 目录结构与路由取舍》](../)
- [下一篇：《嵌套实测 B：docs/public 静态目录陷阱》](./public-trap)
