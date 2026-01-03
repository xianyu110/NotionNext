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
  DELAY_MS: 350
}

const headers = {
  'Authorization': `Bearer ${CONFIG.NOTION_TOKEN}`,
  'Notion-Version': CONFIG.NOTION_API_VERSION,
  'Content-Type': 'application/json'
}

/**
 * 生成摘要
 */
function generateSummary(content, maxLength = 150) {
  if (!content || content.length === 0) {
    return '暂无摘要'
  }

  // 移除 Markdown 标记
  let text = content
    .replace(/!\[.*?\]\(.*?\)/g, '') // 图片
    .replace(/#{1,6}\s+/g, '') // 标题
    .replace(/\*\*(.+?)\*\*/g, '$1') // 加粗
    .replace(/\*(.+?)\*/g, '$1') // 斜体
    .replace(/```[\s\S]*?```/g, '') // 代码块
    .replace(/`(.+?)`/g, '$1') // 行内代码
    .replace(/\[(.+?)\]\(.+?\)/g, '$1') // 链接
    .replace(/\n/g, ' ') // 换行
    .replace(/\s+/g, ' ') // 多余空格
    .trim()

  if (text.length <= maxLength) {
    return text
  }

  let summary = text.substring(0, maxLength)
  const lastPunctuation = Math.max(
    summary.lastIndexOf('。'),
    summary.lastIndexOf('！'),
    summary.lastIndexOf('？'),
    summary.lastIndexOf('.'),
    summary.lastIndexOf('!'),
    summary.lastIndexOf('?')
  )

  if (lastPunctuation > maxLength * 0.6) {
    summary = summary.substring(0, lastPunctuation + 1)
  } else {
    summary += '...'
  }

  return summary
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
        { start_cursor: cursor },
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
 * 创建或更新页面（只包含元数据，不包含内容）
 */
async function upsertPage(article, existingPageId = null) {
  const properties = {
    title: {
      title: [{ text: { content: article.title || '未命名文章' } }]
    },
    type: {
      select: { name: 'Post' }
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
      multi_select: article.tags.map(tag => ({ name: tag.replace('#', '') }))
    }
  }
  if (article.date) {
    properties.date = { date: { start: new Date(article.date).toISOString().split('T')[0] } }
  }
  if (article.slug) {
    properties.slug = { rich_text: [{ text: { content: article.slug } }] }
  }
  if (article.summary) {
    properties.summary = { rich_text: [{ text: { content: article.summary.substring(0, 2000) } }] }
  }

  try {
    if (existingPageId) {
      // 更新现有页面
      await axios.patch(
        `https://api.notion.com/v1/pages/${existingPageId}`,
        { properties },
        { headers }
      )
      return { id: existingPageId, url: `https://www.notion.so/${existingPageId.replace(/-/g, '')}` }
    } else {
      // 创建新页面（带引导内容）
      const initialContent = [
        {
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [
              {
                type: 'text',
                text: { content: '📝 请在此处粘贴文章内容（支持从 Markdown 直接粘贴）' },
                annotations: { color: 'gray' }
              }
            ]
          }
        },
        {
          object: 'block',
          type: 'divider',
          divider: {}
        }
      ]

      const payload = {
        parent: { database_id: CONFIG.DATABASE_ID },
        properties,
        children: initialContent
      }

      const response = await axios.post(
        'https://api.notion.com/v1/pages',
        payload,
        { headers }
      )

      return response.data
    }
  } catch (error) {
    console.error('上传失败:', error.response?.data || error.message)
    throw error
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
  console.log('🚀 开始上传文章元数据（不包含正文）...\n')

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

  let createdCount = 0
  let updatedCount = 0
  let skipCount = 0

  // 4. 处理每篇文章
  for (let i = 0; i < files.length; i++) {
    const filePath = files[i]
    const fileName = path.basename(filePath, '.md')

    try {
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      const { data: frontmatter, content } = matter(fileContent)
      const title = frontmatter.title || fileName

      console.log(`[${i + 1}/${files.length}] 处理: ${title}`)

      // 生成摘要（如果没有）
      const summary = frontmatter.summary || generateSummary(content)

      const article = {
        title,
        category: frontmatter.category,
        tags: frontmatter.tags || [],
        date: frontmatter.date,
        slug: frontmatter.slug,
        status: frontmatter.status || 'Published',
        summary
      }

      // 检查是否已存在
      const existingPageId = notionPageMap.get(title)

      if (existingPageId) {
        // 更新元数据
        await upsertPage(article, existingPageId)
        await delay(CONFIG.DELAY_MS)
        console.log(`✅ 更新元数据成功\n`)
        updatedCount++
      } else {
        // 创建新页面
        const result = await upsertPage(article)
        await delay(CONFIG.DELAY_MS)
        console.log(`✅ 创建成功: ${result.url}`)
        console.log(`   💡 提示：请在 Notion 中打开此页面，粘贴文章内容\n`)
        createdCount++
      }
    } catch (error) {
      console.log(`❌ 处理失败: ${error.message}\n`)
    }
  }

  // 5. 统计
  console.log('\n' + '='.repeat(50))
  console.log('✅ 处理完成！')
  console.log(`   总文章数: ${files.length}`)
  console.log(`   ✅ 新建: ${createdCount}`)
  console.log(`   ✅ 更新: ${updatedCount}`)
  console.log('='.repeat(50))
  console.log('\n💡 下一步：')
  console.log('   1. 打开 Notion 数据库')
  console.log('   2. 找到标有 "📝 请在此处粘贴文章内容" 的页面')
  console.log('   3. 复制本地 Markdown 内容，直接粘贴到 Notion')
  console.log('   4. Notion 会自动处理格式和图片！')
}

main().catch(error => {
  console.error('💥 脚本执行失败:', error)
  process.exit(1)
})
