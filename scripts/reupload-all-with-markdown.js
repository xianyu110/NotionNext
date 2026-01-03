const axios = require('axios')
const matter = require('gray-matter')
const fs = require('fs')
const path = require('path')

// ===== 配置区域 =====
const CONFIG = {
  NOTION_TOKEN: process.env.NOTION_TOKEN || 'YOUR_NOTION_INTEGRATION_TOKEN',
  DATABASE_ID: process.env.NOTION_DATABASE_ID || 'YOUR_DATABASE_ID',
  NOTION_API_VERSION: '2022-06-28',
  POSTS_DIR: 'posts',
  DELAY_MS: 350 // 防止 API 限流
}

const headers = {
  'Authorization': `Bearer ${CONFIG.NOTION_TOKEN}`,
  'Notion-Version': CONFIG.NOTION_API_VERSION,
  'Content-Type': 'application/json'
}

/**
 * 解析 Markdown 为 Notion 块（完整版）
 */
function parseMarkdownToBlocks(markdown) {
  const blocks = []
  const lines = markdown.split('\n')
  let i = 0

  while (i < lines.length) {
    const line = lines[i].trim()

    // 跳过空行和分隔符
    if (!line || line === '* * *' || line === '---' || line === '***') {
      i++
      continue
    }

    // 图片
    const imageMatch = line.match(/^!\[(.*?)\]\((https?:\/\/[^\s)]+)\)/)
    if (imageMatch) {
      const [, alt, url] = imageMatch
      blocks.push({
        object: 'block',
        type: 'image',
        image: {
          type: 'external',
          external: { url },
          caption: alt ? [{ text: { content: alt.substring(0, 100) } }] : []
        }
      })
      i++
      continue
    }

    // 标题
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/)
    if (headingMatch) {
      const [, hashes, content] = headingMatch
      const level = Math.min(hashes.length, 3)
      const type = `heading_${level}`
      const text = content.replace(/\*\*/g, '').replace(/__/g, '')
      blocks.push({
        object: 'block',
        type,
        [type]: {
          rich_text: [{ text: { content: text.substring(0, 2000) } }]
        }
      })
      i++
      continue
    }

    // 无序列表
    if (line.match(/^[\*\-]\s+/)) {
      const listItems = []
      while (i < lines.length && lines[i].trim().match(/^[\*\-]\s+/)) {
        const itemText = lines[i].trim().replace(/^[\*\-]\s+/, '').replace(/\*\*/g, '').replace(/_/g, '')
        listItems.push(itemText)
        i++
      }
      listItems.forEach(item => {
        if (item.length > 0) {
          blocks.push({
            object: 'block',
            type: 'bulleted_list_item',
            bulleted_list_item: {
              rich_text: [{ text: { content: item.substring(0, 2000) } }]
            }
          })
        }
      })
      continue
    }

    // 有序列表
    if (line.match(/^\d+\.\s+/)) {
      const listItems = []
      while (i < lines.length && lines[i].trim().match(/^\d+\.\s+/)) {
        const itemText = lines[i].trim().replace(/^\d+\.\s+/, '').replace(/\*\*/g, '').replace(/_/g, '')
        listItems.push(itemText)
        i++
      }
      listItems.forEach(item => {
        if (item.length > 0) {
          blocks.push({
            object: 'block',
            type: 'numbered_list_item',
            numbered_list_item: {
              rich_text: [{ text: { content: item.substring(0, 2000) } }]
            }
          })
        }
      })
      continue
    }

    // 代码块
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

    // 引用
    if (line.startsWith('>')) {
      const quoteText = line.substring(1).trim().replace(/\*\*/g, '')
      blocks.push({
        object: 'block',
        type: 'quote',
        quote: {
          rich_text: [{ text: { content: quoteText.substring(0, 2000) } }]
        }
      })
      i++
      continue
    }

    // 普通段落
    if (line) {
      let paragraph = line
      i++
      while (i < lines.length && lines[i].trim() &&
             !lines[i].trim().match(/^(#{1,6}\s|[\*\-]\s|\d+\.\s|```|>|!\[)/)) {
        paragraph += ' ' + lines[i].trim()
        i++
      }

      // 移除 Markdown 标记
      paragraph = paragraph.replace(/\*\*(.+?)\*\*/g, '$1')
                           .replace(/__(.+?)__/g, '$1')
                           .replace(/\*(.+?)\*/g, '$1')
                           .replace(/_(.+?)_/g, '$1')

      // 拆分超长段落
      if (paragraph.length > 2000) {
        const chunks = paragraph.match(/.{1,1999}/g) || [paragraph]
        chunks.forEach(chunk => {
          blocks.push({
            object: 'block',
            type: 'paragraph',
            paragraph: {
              rich_text: [{ text: { content: chunk } }]
            }
          })
        })
      } else {
        blocks.push({
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [{ text: { content: paragraph } }]
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
 * 获取所有 Notion 页面
 */
async function getAllNotionPages() {
  const allPages = []
  let cursor = undefined

  try {
    do {
      const response = await axios.post(
        `https://api.notion.com/v1/databases/${CONFIG.DATABASE_ID}/query`,
        {
          start_cursor: cursor,
          filter: { property: 'type', select: { equals: 'Post' } }
        },
        { headers }
      )
      allPages.push(...response.data.results)
      cursor = response.data.next_cursor
    } while (cursor)

    return allPages
  } catch (error) {
    console.error('❌ 获取 Notion 页面失败:', error.response?.data || error.message)
    return []
  }
}

/**
 * 删除页面的所有子块
 */
async function deletePageBlocks(pageId) {
  try {
    const response = await axios.get(
      `https://api.notion.com/v1/blocks/${pageId}/children?page_size=100`,
      { headers }
    )
    const blocks = response.data.results

    for (const block of blocks) {
      await axios.delete(`https://api.notion.com/v1/blocks/${block.id}`, { headers })
      await delay(100)
    }
  } catch (error) {
    console.error(`警告：删除块失败`, error.response?.data?.message || error.message)
  }
}

/**
 * 更新页面内容
 */
async function updatePageContent(pageId, blocks) {
  // 限制块数量
  const blocksToUpload = blocks.slice(0, 100)

  try {
    await axios.patch(
      `https://api.notion.com/v1/blocks/${pageId}/children`,
      { children: blocksToUpload },
      { headers }
    )
    return true
  } catch (error) {
    console.error(`更新失败:`, error.response?.data || error.message)
    return false
  }
}

/**
 * 延迟函数
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * 主函数
 */
async function main() {
  console.log('🚀 开始重新上传所有文章（完整 Markdown 解析）...\n')

  // 1. 获取所有本地文章
  const files = fs.readdirSync(CONFIG.POSTS_DIR)
    .filter(f => f.endsWith('.md'))
    .map(f => path.join(CONFIG.POSTS_DIR, f))

  console.log(`📚 找到 ${files.length} 篇本地文章\n`)

  // 2. 获取所有 Notion 页面
  console.log('📥 正在获取 Notion 数据库中的文章...')
  const notionPages = await getAllNotionPages()
  console.log(`✅ 找到 ${notionPages.length} 篇 Notion 文章\n`)

  // 3. 创建标题映射
  const notionPageMap = new Map()
  notionPages.forEach(page => {
    const title = page.properties.title?.title?.[0]?.plain_text ||
                  page.properties.Name?.title?.[0]?.plain_text
    if (title) {
      notionPageMap.set(title, page.id)
    }
  })

  let successCount = 0
  let failCount = 0

  // 4. 处理每篇文章
  for (let i = 0; i < files.length; i++) {
    const filePath = files[i]
    const fileName = path.basename(filePath, '.md')

    try {
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      const { data: frontmatter, content } = matter(fileContent)
      const title = frontmatter.title || fileName

      console.log(`[${i + 1}/${files.length}] 处理: ${title}`)

      // 检查是否已存在
      const pageId = notionPageMap.get(title)
      if (!pageId) {
        console.log(`⏭️  跳过（Notion 中未找到）\n`)
        continue
      }

      // 解析 Markdown
      const blocks = parseMarkdownToBlocks(content)
      console.log(`   解析: ${blocks.length} 个块`)

      // 删除旧内容
      console.log(`   删除旧内容...`)
      await deletePageBlocks(pageId)
      await delay(CONFIG.DELAY_MS)

      // 更新新内容
      console.log(`   上传新内容...`)
      const success = await updatePageContent(pageId, blocks)
      await delay(CONFIG.DELAY_MS)

      if (success) {
        console.log(`✅ 更新成功\n`)
        successCount++
      } else {
        console.log(`❌ 更新失败\n`)
        failCount++
      }
    } catch (error) {
      console.log(`❌ 处理失败: ${error.message}\n`)
      failCount++
    }
  }

  // 5. 统计
  console.log('\n' + '='.repeat(50))
  console.log('✅ 处理完成！')
  console.log(`   总文章数: ${files.length}`)
  console.log(`   ✅ 成功: ${successCount}`)
  console.log(`   ❌ 失败: ${failCount}`)
  console.log('='.repeat(50))
}

main().catch(error => {
  console.error('💥 脚本执行失败:', error)
  process.exit(1)
})
