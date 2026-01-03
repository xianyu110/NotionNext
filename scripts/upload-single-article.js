const axios = require('axios')
const matter = require('gray-matter')
const fs = require('fs')

// ===== 配置区域 =====
const CONFIG = {
  NOTION_TOKEN: process.env.NOTION_TOKEN || 'YOUR_NOTION_INTEGRATION_TOKEN',
  DATABASE_ID: process.env.NOTION_DATABASE_ID || 'YOUR_DATABASE_ID',
  NOTION_API_VERSION: '2022-06-28',
  FILE_PATH: process.argv[2] // 从命令行获取文件路径
}

const headers = {
  'Authorization': `Bearer ${CONFIG.NOTION_TOKEN}`,
  'Notion-Version': CONFIG.NOTION_API_VERSION,
  'Content-Type': 'application/json'
}

/**
 * 解析 Markdown 为 Notion 块
 */
function parseMarkdownToBlocks(markdown) {
  const blocks = []
  const lines = markdown.split('\n')
  let i = 0

  // 跳过 frontmatter
  if (lines[0] === '---') {
    i = lines.findIndex((line, idx) => idx > 0 && line === '---') + 1
  }

  while (i < lines.length) {
    const line = lines[i].trim()

    // 跳过空行和分隔符
    if (!line || line === '* * *' || line === '---' || line === '***') {
      i++
      continue
    }

    // 图片：![alt](url)
    const imageMatch = line.match(/^!\[(.*?)\]\((https?:\/\/[^\s)]+)\)/)
    if (imageMatch) {
      const [, alt, url] = imageMatch
      blocks.push({
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

    // 标题 1-6
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/)
    if (headingMatch) {
      const [, hashes, content] = headingMatch
      const level = Math.min(hashes.length, 3) // Notion 只支持 h1-h3
      const type = `heading_${level}`
      blocks.push({
        object: 'block',
        type,
        [type]: {
          rich_text: parseRichText(content)
        }
      })
      i++
      continue
    }

    // 无序列表：以 * 或 - 开头
    if (line.match(/^[\*\-]\s+/)) {
      const listItems = []
      while (i < lines.length && lines[i].trim().match(/^[\*\-]\s+/)) {
        const itemText = lines[i].trim().replace(/^[\*\-]\s+/, '')
        listItems.push(itemText)
        i++
      }
      listItems.forEach(item => {
        blocks.push({
          object: 'block',
          type: 'bulleted_list_item',
          bulleted_list_item: {
            rich_text: parseRichText(item)
          }
        })
      })
      continue
    }

    // 有序列表：以数字开头
    if (line.match(/^\d+\.\s+/)) {
      const listItems = []
      while (i < lines.length && lines[i].trim().match(/^\d+\.\s+/)) {
        const itemText = lines[i].trim().replace(/^\d+\.\s+/, '')
        listItems.push(itemText)
        i++
      }
      listItems.forEach(item => {
        blocks.push({
          object: 'block',
          type: 'numbered_list_item',
          numbered_list_item: {
            rich_text: parseRichText(item)
          }
        })
      })
      continue
    }

    // 代码块：```
    if (line.startsWith('```')) {
      const language = line.substring(3).trim() || 'plain text'
      const codeLines = []
      i++
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i])
        i++
      }
      const code = codeLines.join('\n')
      if (code.trim()) {
        blocks.push({
          object: 'block',
          type: 'code',
          code: {
            rich_text: [{ text: { content: code.substring(0, 2000) } }],
            language: language === 'js' ? 'javascript' : language
          }
        })
      }
      i++
      continue
    }

    // 引用：以 > 开头
    if (line.startsWith('>')) {
      const quoteText = line.substring(1).trim()
      blocks.push({
        object: 'block',
        type: 'quote',
        quote: {
          rich_text: parseRichText(quoteText)
        }
      })
      i++
      continue
    }

    // 普通段落
    if (line) {
      // 收集连续的非空行作为一个段落
      let paragraph = line
      i++
      while (i < lines.length && lines[i].trim() &&
             !lines[i].trim().match(/^(#{1,6}\s|[\*\-]\s|\d+\.\s|```|>|!\[)/)) {
        paragraph += ' ' + lines[i].trim()
        i++
      }

      // 拆分超长段落（Notion 限制 2000 字符）
      if (paragraph.length > 2000) {
        const chunks = paragraph.match(/.{1,1999}/g) || [paragraph]
        chunks.forEach(chunk => {
          blocks.push({
            object: 'block',
            type: 'paragraph',
            paragraph: {
              rich_text: parseRichText(chunk)
            }
          })
        })
      } else {
        blocks.push({
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: parseRichText(paragraph)
          }
        })
      }
      continue
    }

    i++
  }

  return blocks
}

/**
 * 解析富文本（支持加粗、斜体、链接）
 */
function parseRichText(text) {
  const richText = []

  // 简化处理：暂不解析行内格式，避免复杂度
  // 可以后续增强支持 **bold**、*italic*、[link](url)

  // 移除 Markdown 加粗标记
  text = text.replace(/\*\*(.+?)\*\*/g, '$1')
  text = text.replace(/__(.+?)__/g, '$1')

  // 移除斜体标记
  text = text.replace(/\*(.+?)\*/g, '$1')
  text = text.replace(/_(.+?)_/g, '$1')

  richText.push({
    type: 'text',
    text: { content: text }
  })

  return richText
}

/**
 * 上传文章到 Notion
 */
async function uploadArticle(filePath) {
  console.log(`📖 正在读取文件: ${filePath}`)

  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data: frontmatter, content } = matter(fileContent)

  console.log(`\n文章信息：`)
  console.log(`  标题: ${frontmatter.title}`)
  console.log(`  分类: ${frontmatter.category || '未分类'}`)
  console.log(`  标签: ${frontmatter.tags?.join(', ') || '无'}`)

  // 解析内容为 Notion 块
  console.log(`\n🔄 正在解析 Markdown...`)
  const blocks = parseMarkdownToBlocks(content)
  console.log(`✅ 解析完成，共 ${blocks.length} 个块`)

  // 限制块数量（Notion API 单次最多 100 个）
  const blocksToUpload = blocks.slice(0, 100)
  if (blocks.length > 100) {
    console.log(`⚠️  内容过长，只上传前 100 个块（总共 ${blocks.length} 个）`)
  }

  // 构建属性
  const properties = {
    title: {
      title: [{ text: { content: frontmatter.title || '未命名文章' } }]
    },
    type: {
      select: { name: 'Post' }
    },
    status: {
      select: { name: frontmatter.status || 'Published' }
    }
  }

  // 可选字段
  if (frontmatter.category) {
    properties.category = { select: { name: frontmatter.category } }
  }
  if (frontmatter.tags && frontmatter.tags.length > 0) {
    properties.tags = {
      multi_select: frontmatter.tags.map(tag => ({ name: tag.replace('#', '') }))
    }
  }
  if (frontmatter.date) {
    properties.date = { date: { start: new Date(frontmatter.date).toISOString().split('T')[0] } }
  }
  if (frontmatter.slug) {
    properties.slug = { rich_text: [{ text: { content: frontmatter.slug } }] }
  }
  if (frontmatter.summary) {
    properties.summary = { rich_text: [{ text: { content: frontmatter.summary } }] }
  }

  const payload = {
    parent: { database_id: CONFIG.DATABASE_ID },
    properties,
    children: blocksToUpload
  }

  // 上传到 Notion
  try {
    console.log(`\n🚀 正在上传到 Notion...`)
    const response = await axios.post(
      'https://api.notion.com/v1/pages',
      payload,
      { headers }
    )

    console.log(`\n✅ 上传成功！`)
    console.log(`   Notion 链接: ${response.data.url}`)
    return response.data
  } catch (error) {
    console.error(`\n❌ 上传失败:`, error.response?.data || error.message)
    throw error
  }
}

// 主函数
async function main() {
  if (!CONFIG.FILE_PATH) {
    console.error('❌ 错误：请提供文件路径')
    console.log('\n用法：')
    console.log('  node scripts/upload-single-article.js "posts/文章名.md"')
    process.exit(1)
  }

  if (!fs.existsSync(CONFIG.FILE_PATH)) {
    console.error(`❌ 错误：文件不存在 - ${CONFIG.FILE_PATH}`)
    process.exit(1)
  }

  try {
    await uploadArticle(CONFIG.FILE_PATH)
  } catch (error) {
    console.error('💥 脚本执行失败')
    process.exit(1)
  }
}

main()
