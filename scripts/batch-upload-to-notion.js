const fs = require('fs')
const path = require('path')
const axios = require('axios')
const matter = require('gray-matter')

// ===== 配置区域 =====
const CONFIG = {
  // 从环境变量或这里直接配置
  NOTION_TOKEN: process.env.NOTION_TOKEN || 'YOUR_NOTION_INTEGRATION_TOKEN',
  DATABASE_ID: process.env.NOTION_DATABASE_ID || 'YOUR_DATABASE_ID',
  POSTS_DIR: path.join(__dirname, '../posts'),
  // 每次请求之间的延迟（毫秒），避免触发 Notion API 限流
  REQUEST_DELAY: 500
}

// ===== Notion API 请求函数 =====
async function createNotionPage(article) {
  const url = 'https://api.notion.com/v1/pages'

  // 构建 Notion 属性
  const properties = {
    title: {
      title: [{ text: { content: article.title } }]
    },
    status: {
      select: { name: article.status || 'Published' }
    }
  }

  // 可选字段
  if (article.category) {
    properties.category = { select: { name: article.category } }
  }

  if (article.tags && article.tags.length > 0) {
    properties.tags = {
      multi_select: article.tags.map(tag => ({ name: tag.replace(/^#/, '') }))
    }
  }

  if (article.date) {
    properties.date = { date: { start: new Date(article.date).toISOString() } }
  }

  if (article.summary) {
    properties.summary = {
      rich_text: [{ text: { content: article.summary } }]
    }
  }

  // 构建文章内容块（简化版：将整个内容作为代码块）
  const children = []

  // 预处理：合并被换行的图片链接
  let processedContent = article.content
    // 处理 ![alt](https://xxx-\nyyy.png) 格式
    .replace(/!\[([^\]]*)\]\((https?:\/\/[^\s)]*?-)\s*\n\s*([^\s)]+)\)/g, '![$1]($2$3)')
    // 处理 ![alt](\nhttps://xxx.png) 格式
    .replace(/!\[([^\]]*)\]\(\s*\n\s*(https?:\/\/[^\s)]+)\)/g, '![$1]($2)')
    // 处理 ![alt](https://xxx.png\n) 格式
    .replace(/!\[([^\]]*)\]\((https?:\/\/[^\s)]+)\s*\n\s*\)/g, '![$1]($2)')

  const lines = processedContent.split('\n')
  let i = 0

  while (i < lines.length && children.length < 100) {
    const line = lines[i].trim()

    if (!line) {
      i++
      continue
    }

    // 图片 ![alt](url) - 支持行内图片
    const imageMatch = line.match(/!\[([^\]]*)\]\((https?:\/\/[^\s)]+)\)/)
    if (imageMatch) {
      const [fullMatch, alt, url] = imageMatch

      // 如果整行就是图片，添加图片块
      if (line === fullMatch) {
        children.push({
          object: 'block',
          type: 'image',
          image: {
            type: 'external',
            external: { url },
            caption: alt ? [{ text: { content: alt } }] : []
          }
        })
        i++
        continue
      }
      // 否则作为段落处理（行内图片）
    }

    // 标题
    if (line.startsWith('#### ')) {
      children.push({
        object: 'block',
        type: 'heading_3',
        heading_3: {
          rich_text: [{ text: { content: line.replace('#### ', '').substring(0, 2000) } }]
        }
      })
      i++
      continue
    }

    if (line.startsWith('### ')) {
      children.push({
        object: 'block',
        type: 'heading_3',
        heading_3: {
          rich_text: [{ text: { content: line.replace('### ', '').substring(0, 2000) } }]
        }
      })
      i++
      continue
    }

    if (line.startsWith('## ')) {
      children.push({
        object: 'block',
        type: 'heading_2',
        heading_2: {
          rich_text: [{ text: { content: line.replace('## ', '').substring(0, 2000) } }]
        }
      })
      i++
      continue
    }

    if (line.startsWith('# ')) {
      children.push({
        object: 'block',
        type: 'heading_1',
        heading_1: {
          rich_text: [{ text: { content: line.replace('# ', '').substring(0, 2000) } }]
        }
      })
      i++
      continue
    }

    // 代码块
    if (line.startsWith('```')) {
      const lang = line.substring(3).trim() || 'plain text'
      i++
      const codeLines = []
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i])
        i++
      }
      const code = codeLines.join('\n').substring(0, 2000)
      children.push({
        object: 'block',
        type: 'code',
        code: {
          language: lang,
          rich_text: [{ text: { content: code } }]
        }
      })
      i++
      continue
    }

    // 引用
    if (line.startsWith('> ')) {
      const quoteLines = []
      while (i < lines.length && lines[i].trim().startsWith('> ')) {
        quoteLines.push(lines[i].trim().substring(2))
        i++
      }
      const quote = quoteLines.join('\n').substring(0, 2000)
      children.push({
        object: 'block',
        type: 'quote',
        quote: {
          rich_text: [{ text: { content: quote } }]
        }
      })
      continue
    }

    // 无序列表
    if (line.match(/^[\*\-\+]\s/)) {
      const listItems = []
      while (i < lines.length && lines[i].trim().match(/^[\*\-\+]\s/)) {
        listItems.push(lines[i].trim().substring(2))
        i++
      }
      listItems.forEach(item => {
        children.push({
          object: 'block',
          type: 'bulleted_list_item',
          bulleted_list_item: {
            rich_text: [{ text: { content: item.substring(0, 2000) } }]
          }
        })
      })
      continue
    }

    // 有序列表
    if (line.match(/^\d+\.\s/)) {
      const listItems = []
      while (i < lines.length && lines[i].trim().match(/^\d+\.\s/)) {
        listItems.push(lines[i].trim().replace(/^\d+\.\s/, ''))
        i++
      }
      listItems.forEach(item => {
        children.push({
          object: 'block',
          type: 'numbered_list_item',
          numbered_list_item: {
            rich_text: [{ text: { content: item.substring(0, 2000) } }]
          }
        })
      })
      continue
    }

    // 分隔线
    if (line.match(/^[\-\*_]{3,}$/)) {
      children.push({
        object: 'block',
        type: 'divider',
        divider: {}
      })
      i++
      continue
    }

    // 普通段落
    const paraLines = []
    while (i < lines.length && lines[i].trim() &&
           !lines[i].trim().match(/^[#>\-\*\+\d]/) &&
           !lines[i].trim().startsWith('```') &&
           !lines[i].trim().startsWith('!')) {
      paraLines.push(lines[i])
      i++
    }

    if (paraLines.length > 0) {
      const text = paraLines.join('\n').trim()
      if (text.length > 2000) {
        const chunks = text.match(/.{1,1999}/g) || [text]
        chunks.forEach(chunk => {
          children.push({
            object: 'block',
            type: 'paragraph',
            paragraph: {
              rich_text: [{ text: { content: chunk } }]
            }
          })
        })
      } else {
        children.push({
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [{ text: { content: text } }]
          }
        })
      }
    } else {
      i++
    }
  }

  const payload = {
    parent: { database_id: CONFIG.DATABASE_ID },
    properties,
    children: children.slice(0, 100) // 限制前 100 个块
  }

  const headers = {
    'Authorization': `Bearer ${CONFIG.NOTION_TOKEN}`,
    'Notion-Version': '2022-06-28',
    'Content-Type': 'application/json'
  }

  const response = await axios.post(url, payload, { headers })
  return response.data
}

// ===== 解析 Markdown 文件 =====
function parseMarkdownFile(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContent)

  const fileName = path.basename(filePath, '.md')

  return {
    title: data.title || fileName,
    date: data.date,
    category: data.category,
    tags: data.tags || [],
    summary: data.summary || '',
    status: data.status || 'Published',
    author: data.author,
    content: content
  }
}

// ===== 延迟函数 =====
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// ===== 主函数 =====
async function batchUpload() {
  console.log('🚀 开始批量上传文章到 Notion...\n')

  // 检查配置
  if (CONFIG.NOTION_TOKEN === 'YOUR_NOTION_INTEGRATION_TOKEN') {
    console.error('❌ 错误：请先配置 NOTION_TOKEN')
    console.log('💡 提示：在脚本中设置或通过环境变量传入')
    process.exit(1)
  }

  if (CONFIG.DATABASE_ID === 'YOUR_DATABASE_ID') {
    console.error('❌ 错误：请先配置 DATABASE_ID')
    console.log('💡 提示：在脚本中设置或通过环境变量传入')
    process.exit(1)
  }

  // 读取所有 Markdown 文件
  const files = fs.readdirSync(CONFIG.POSTS_DIR)
    .filter(file => file.endsWith('.md'))

  console.log(`📚 找到 ${files.length} 篇文章\n`)

  const results = {
    success: [],
    failed: []
  }

  // 逐个上传
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const filePath = path.join(CONFIG.POSTS_DIR, file)

    try {
      console.log(`[${i + 1}/${files.length}] 正在上传: ${file}`)

      const article = parseMarkdownFile(filePath)
      const result = await createNotionPage(article)

      results.success.push({ file, url: result.url })
      console.log(`✅ 成功: ${article.title}`)
      console.log(`   链接: ${result.url}\n`)

      // 延迟，避免触发限流
      if (i < files.length - 1) {
        await sleep(CONFIG.REQUEST_DELAY)
      }
    } catch (error) {
      results.failed.push({
        file,
        error: error.response?.data?.message || error.message
      })
      console.error(`❌ 失败: ${file}`)
      console.error(`   原因: ${error.response?.data?.message || error.message}\n`)
    }
  }

  // 输出总结
  console.log('\n' + '='.repeat(60))
  console.log('📊 上传完成统计:')
  console.log(`   ✅ 成功: ${results.success.length}`)
  console.log(`   ❌ 失败: ${results.failed.length}`)
  console.log('='.repeat(60))

  if (results.failed.length > 0) {
    console.log('\n失败的文章:')
    results.failed.forEach(({ file, error }) => {
      console.log(`   - ${file}: ${error}`)
    })
  }
}

// 运行
batchUpload().catch(console.error)
