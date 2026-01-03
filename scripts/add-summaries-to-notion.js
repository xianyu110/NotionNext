const axios = require('axios')

// ===== 配置区域 =====
const CONFIG = {
  NOTION_TOKEN: process.env.NOTION_TOKEN || 'YOUR_NOTION_INTEGRATION_TOKEN',
  DATABASE_ID: process.env.NOTION_DATABASE_ID || 'YOUR_DATABASE_ID',
  NOTION_API_VERSION: '2022-06-28',
  DELAY_MS: 350 // Notion API 限流：每秒最多 3 个请求
}

// Notion API 请求头
const headers = {
  'Authorization': `Bearer ${CONFIG.NOTION_TOKEN}`,
  'Notion-Version': CONFIG.NOTION_API_VERSION,
  'Content-Type': 'application/json'
}

/**
 * 获取数据库中的所有页面
 */
async function getAllPages() {
  const allPages = []
  let cursor = undefined

  try {
    do {
      const response = await axios.post(
        `https://api.notion.com/v1/databases/${CONFIG.DATABASE_ID}/query`,
        {
          start_cursor: cursor,
          filter: {
            property: 'type',
            select: { equals: 'Post' }
          }
        },
        { headers }
      )

      allPages.push(...response.data.results)
      cursor = response.data.next_cursor
    } while (cursor)

    return allPages
  } catch (error) {
    console.error('❌ 获取页面失败:', error.response?.data || error.message)
    throw error
  }
}

/**
 * 获取页面的内容块
 */
async function getPageBlocks(pageId) {
  try {
    const response = await axios.get(
      `https://api.notion.com/v1/blocks/${pageId}/children?page_size=100`,
      { headers }
    )
    return response.data.results
  } catch (error) {
    console.error(`❌ 获取页面 ${pageId} 内容失败:`, error.response?.data || error.message)
    return []
  }
}

/**
 * 从块中提取文本内容
 */
function extractTextFromBlocks(blocks) {
  let text = ''

  for (const block of blocks) {
    const type = block.type

    if (type === 'paragraph' && block.paragraph?.rich_text) {
      text += block.paragraph.rich_text.map(t => t.plain_text).join('') + ' '
    } else if (type === 'heading_1' && block.heading_1?.rich_text) {
      text += block.heading_1.rich_text.map(t => t.plain_text).join('') + ' '
    } else if (type === 'heading_2' && block.heading_2?.rich_text) {
      text += block.heading_2.rich_text.map(t => t.plain_text).join('') + ' '
    } else if (type === 'heading_3' && block.heading_3?.rich_text) {
      text += block.heading_3.rich_text.map(t => t.plain_text).join('') + ' '
    }

    // 提取足够的文本后停止（最多 500 字符，确保能生成 150 字的摘要）
    if (text.length > 500) break
  }

  return text.trim()
}

/**
 * 生成摘要（取前 150 字符）
 */
function generateSummary(text, maxLength = 150) {
  if (!text || text.length === 0) {
    return '暂无摘要'
  }

  // 移除多余空格
  text = text.replace(/\s+/g, ' ').trim()

  if (text.length <= maxLength) {
    return text
  }

  // 截取到 maxLength，并尝试在最近的句号、问号、感叹号处截断
  let summary = text.substring(0, maxLength)
  const lastPunctuation = Math.max(
    summary.lastIndexOf('。'),
    summary.lastIndexOf('！'),
    summary.lastIndexOf('？'),
    summary.lastIndexOf('.'),
    summary.lastIndexOf('!'),
    summary.lastIndexOf('?')
  )

  if (lastPunctuation > maxLength * 0.6) { // 如果标点在合理位置
    summary = summary.substring(0, lastPunctuation + 1)
  } else {
    summary += '...'
  }

  return summary
}

/**
 * 更新页面的 summary 属性
 */
async function updatePageSummary(pageId, summary) {
  try {
    await axios.patch(
      `https://api.notion.com/v1/pages/${pageId}`,
      {
        properties: {
          summary: {
            rich_text: [
              {
                text: {
                  content: summary
                }
              }
            ]
          }
        }
      },
      { headers }
    )
    return true
  } catch (error) {
    console.error(`❌ 更新失败:`, error.response?.data || error.message)
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
  console.log('🚀 开始为文章生成并添加 summary...\n')

  // 1. 获取所有 Post 类型的页面
  console.log('📚 正在获取所有 Post 类型的页面...')
  const pages = await getAllPages()
  console.log(`✅ 找到 ${pages.length} 篇文章\n`)

  let successCount = 0
  let skipCount = 0
  let failCount = 0

  // 2. 遍历每个页面
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i]
    const pageId = page.id
    const title = page.properties.title?.title?.[0]?.plain_text || page.properties.Name?.title?.[0]?.plain_text || '未命名'
    const existingSummary = page.properties.summary?.rich_text?.[0]?.plain_text

    console.log(`[${i + 1}/${pages.length}] 处理: ${title}`)

    // 检查是否已有 summary
    if (existingSummary && existingSummary.trim() !== '') {
      console.log(`⏭️  跳过（已有摘要）\n`)
      skipCount++
      continue
    }

    // 获取页面内容
    const blocks = await getPageBlocks(pageId)
    await delay(CONFIG.DELAY_MS)

    if (blocks.length === 0) {
      console.log(`⚠️  跳过（页面无内容）\n`)
      skipCount++
      continue
    }

    // 提取文本并生成摘要
    const text = extractTextFromBlocks(blocks)
    const summary = generateSummary(text)

    console.log(`   摘要: ${summary.substring(0, 80)}${summary.length > 80 ? '...' : ''}`)

    // 更新 summary
    const success = await updatePageSummary(pageId, summary)
    await delay(CONFIG.DELAY_MS)

    if (success) {
      console.log(`✅ 更新成功\n`)
      successCount++
    } else {
      console.log(`❌ 更新失败\n`)
      failCount++
    }
  }

  // 3. 输出统计
  console.log('\n' + '='.repeat(50))
  console.log('✅ 处理完成！')
  console.log(`   总文章数: ${pages.length}`)
  console.log(`   ✅ 成功: ${successCount}`)
  console.log(`   ⏭️  跳过: ${skipCount}`)
  console.log(`   ❌ 失败: ${failCount}`)
  console.log('='.repeat(50))
}

// 运行脚本
main().catch(error => {
  console.error('💥 脚本执行失败:', error)
  process.exit(1)
})
