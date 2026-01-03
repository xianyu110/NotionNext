---
title: "快速开始：本地Markdown使用指南"
date: 2024-12-31
category: "教程"
tags:
  - 入门
  - Markdown
summary: 教你如何在NotionNext中使用本地Markdown文件
status: "Published"
---

# 快速开始

## 1. 创建文章

在 `posts` 目录下创建 `.md` 文件：

```markdown
---
title: 文章标题
date: 2024-12-31
category: 分类名称
tags:
  - 标签1
  - 标签2
summary: 文章摘要
status: Published  # Published 或 Draft
author: 作者名
password: ''  # 可选：文章密码
---

文章内容...
```

## 2. 支持的Frontmatter字段

- **title**: 文章标题（必填）
- **date**: 发布日期
- **category**: 分类
- **tags**: 标签列表
- **summary**: 文章摘要
- **status**: 发布状态
- **author**: 作者
- **password**: 文章密码保护

## 3. Markdown特性

支持所有标准Markdown语法：

### 标题
### 列表
- 项目1
- 项目2

### 代码块
```js
console.log('Hello World!')
```

### 表格
| 列1 | 列2 |
|-----|-----|
| 值1 | 值2 |

### 图片
![图片描述](图片URL)

## 4. 构建和预览

```bash
# 开发模式
npm run dev

# 生产构建
npm run build
npm run start
```

就是这么简单！