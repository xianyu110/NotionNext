# Notion 批量上传脚本使用指南

## 📋 准备工作

### 1. 获取 Notion Integration Token

1. 访问 https://www.notion.so/my-integrations
2. 点击 **"+ New integration"**
3. 填写信息：
   - Name: `NotionNext Uploader`（随意命名）
   - Associated workspace: 选择你的工作区
   - Type: Internal Integration
4. 点击 **Submit**
5. 复制显示的 **Internal Integration Token**（格式：`secret_xxxxx`）

### 2. 获取 Database ID

从你的截图可以看到，数据库页面 URL 类似：
```
https://screeching-margin-fda.notion.site/xxxxxxxxxxxxx
```

Database ID 就是 URL 中的那一串 ID（32 位十六进制，没有连字符）

**或者：**
1. 打开你的 Notion 数据库页面
2. 点击右上角 `···` → `Copy link`
3. 粘贴链接，格式类似：`https://www.notion.so/xxxxx?v=yyyy`
4. `xxxxx` 部分就是 Database ID（去掉连字符）

### 3. 分享数据库给 Integration

⚠️ **这一步很重要！**

1. 打开你的 Notion 数据库页面（MaynorAI's Blog）
2. 点击右上角 `···`
3. 找到 `Connections` → 点击
4. 选择你刚创建的 Integration（`NotionNext Uploader`）
5. 确认连接

如果不做这一步，脚本会报 `unauthorized` 错误！

## 🚀 使用步骤

### 方法一：通过环境变量配置（推荐）

1. **安装依赖**
```bash
npm install axios gray-matter
```

2. **设置环境变量**
```bash
export NOTION_TOKEN="secret_你的token"
export NOTION_DATABASE_ID="你的数据库ID"
```

3. **运行脚本**
```bash
node scripts/batch-upload-to-notion.js
```

### 方法二：直接修改脚本

1. **安装依赖**
```bash
npm install axios gray-matter
```

2. **编辑脚本** `scripts/batch-upload-to-notion.js`

找到配置区域，填入你的信息：
```javascript
const CONFIG = {
  NOTION_TOKEN: 'secret_你的实际token',
  DATABASE_ID: '你的实际数据库ID',
  POSTS_DIR: path.join(__dirname, '../posts'),
  REQUEST_DELAY: 500
}
```

3. **运行脚本**
```bash
node scripts/batch-upload-to-notion.js
```

## 📊 运行示例

```
🚀 开始批量上传文章到 Notion...

📚 找到 19 篇文章

[1/19] 正在上传: 我做了一个免费的 DeepResearch 网站，让科研变得更简单.md
✅ 成功: 我做了一个免费的 DeepResearch 网站，让科研变得更简单
   链接: https://www.notion.so/xxxxx

[2/19] 正在上传: 效率飙升 10 倍！最全 Claude Skill 市场发现：10,000+ 实用技能一键"白嫖"！.md
✅ 成功: 效率飙升 10 倍！最全 Claude Skill 市场发现
   链接: https://www.notion.so/xxxxx

...

============================================================
📊 上传完成统计:
   ✅ 成功: 19
   ❌ 失败: 0
============================================================
```

## ⚙️ 配置说明

### REQUEST_DELAY（请求延迟）

- 默认值：`500` 毫秒（0.5 秒）
- 作用：避免触发 Notion API 限流
- 如果你的账号有更高的 API 限额，可以减小这个值

### 内容处理限制

为避免超过 Notion API 限制：
- 每篇文章最多上传 **100 个内容块**
- 每个段落最长 **2000 字符**
- 超出部分会被截断并标记 `...`

## 🔧 常见问题

### 1. 报错：`unauthorized`

**原因**：数据库未分享给 Integration

**解决**：参考上方"分享数据库给 Integration"步骤

### 2. 报错：`object_not_found`

**原因**：Database ID 错误

**解决**：重新确认 Database ID 是否正确

### 3. 字段不匹配

**原因**：你的 Notion 数据库字段名与脚本不一致

**解决**：根据你的实际字段修改脚本中的 `properties` 部分

常见字段映射：
- `title` → 文章标题（必须）
- `status` → 状态（Published/Draft）
- `category` → 分类
- `tags` → 标签（多选）
- `date` → 发布日期
- `summary` → 摘要

### 4. 内容显示不完整

这是正常的。由于 Notion API 限制，脚本只上传前 100 个块。

**解决方案**：
- 使用本脚本先创建页面结构
- 然后在 Notion 中手动补充详细内容
- 或者使用 Notion Import 功能导入完整 Markdown

## 💡 进阶用法

### 只上传指定文章

修改脚本中的文件过滤逻辑：
```javascript
const files = fs.readdirSync(CONFIG.POSTS_DIR)
  .filter(file => file.endsWith('.md') && file.includes('关键词'))
```

### 自定义内容转换

在 `parseMarkdownFile` 函数中添加自定义解析逻辑。

### 上传到多个数据库

复制配置，修改 `DATABASE_ID`，多次运行脚本。

## 📝 注意事项

1. ⚠️ 首次运行建议先测试 1-2 篇文章
2. ⚠️ Notion 免费版有 API 请求限制（3 requests/second）
3. ⚠️ 上传后检查格式，必要时手动调整
4. ⚠️ 不要将 Token 提交到 Git 仓库

## 🎯 下一步

上传成功后，你的 NotionNext 博客会自动从 Notion 同步这些文章！

需要等待缓存更新（默认 60 秒），或者重新部署触发更新。
