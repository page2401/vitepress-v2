---
title: "02. 流程图与时序图"
description: "测试 VitePress v2 (2.0.0-alpha.21) 绕过旧插件约束直连 Mermaid 12 渲染复杂图表。"
outline: [2, 3]
---

# 02. 流程图与时序图（Mermaid） <Badge type="tip" text="mermaid@12.3.0" />

在大版本升级至 `vitepress@2.0.0-alpha.21` 时，v1 常用的社区插件 `vitepress-plugin-mermaid@2.0.17` 因声明了 `peer vitepress@"^1.0.0"` 而无法直接安装。本子站改为在 `.vitepress/config.mts` 中覆写 `md.renderer.rules.fence` 并挂载 `.vitepress/theme/MermaidBlock.vue` 组件，**仅用 35 行代码便摆脱了三方插件锁死，直接升上最新 `mermaid@12.3.0`**！

## 1. 复杂子图与架构流程图（`flowchart TD`）

```mermaid
flowchart TD
    subgraph MainRepo["主仓库 page2401.github.io"]
        Spec["相似 *.md 基准规范"]
        SubPtr["Git Submodule 指针 (sites/*)"]
        Workbench["对比工作台源码 (main)"]
    end

    subgraph SubRepo["独立子仓库 (vitepress-v2)"]
        SrcBranch["main 分支: docs/ 源码 + 自定义 Mermaid 12 组件"]
        Actions{"GitHub Actions 构建"}
        PageBranch["page 孤儿分支: 纯静态 HTML/CSS/JS"]
        SrcBranch --> Actions
        Actions -->|"构建通过 + .nojekyll"| PageBranch
    end

    SubPtr -.->|"跟踪最新提交"| SrcBranch
    Workbench -->|"构建期提取真实 *.md"| Portal["https://page.2401.xyz/"]
    PageBranch -->|"GitHub Organization Pages"| SubSite["https://page.2401.xyz/vitepress-v2/"]
```

## 2. 编译管线交互时序图（`sequenceDiagram`）

```mermaid
sequenceDiagram
    autonumber
    actor Author as 文档作者
    participant Git as 子模块 main 分支
    participant CI as GitHub Actions (Node 22)
    participant Engine as VitePress 2.0-alpha 编译器
    participant Pages as GitHub Pages (page 分支)

    Author->>Git: 提交 docs/*.md 文档
    Git->>CI: 触发 deploy-page.yml 工作流
    activate CI
    CI->>Engine: 执行 vitepress build
    activate Engine
    alt 包含数学公式 ($...$ / $$...$$)
        Engine->>Engine: markdown-it-mathjax3 编译为内联 SVG
    else 包含 Mermaid 代码块
        Engine->>Engine: fence 规则编译为 <MermaidBlock> (Mermaid 12)
    end
    Engine-->>CI: 输出静态产物至 .vitepress/dist
    deactivate Engine
    CI->>Pages: force_orphan 推送产物与 .nojekyll
    deactivate CI
    Pages-->>Author: 子路径 /vitepress-v2/ 即刻生效
```

## 3. 子模块同步状态机（`stateDiagram-v2`）

```mermaid
stateDiagram-v2
    [*] --> CleanSubmodule: git clone --recurse-submodules
    CleanSubmodule --> SubmoduleModified: 编辑子模块 *.md 基准文档
    SubmoduleModified --> SubmodulePushed: 子模块 commit & push origin main
    SubmodulePushed --> PageDeploying: 子仓库 Actions 自动更新 page 分支
    SubmodulePushed --> MainRepoUpdated: 主仓库 git add sites/* 更新指针
    PageDeploying --> LiveSynced: 子站实测渲染已就绪
    MainRepoUpdated --> LiveSynced: 主站源码差异视图已同步
    LiveSynced --> [*]
```
