const axios = require('axios')

// ===== 配置区域 =====
const CONFIG = {
  NOTION_TOKEN: process.env.NOTION_TOKEN || 'YOUR_NOTION_INTEGRATION_TOKEN',
  DATABASE_ID: process.env.NOTION_DATABASE_ID || 'YOUR_DATABASE_ID',
  NOTION_API_VERSION: '2022-06-28',
  DELAY_MS: 350
}

const headers = {
  'Authorization': `Bearer ${CONFIG.NOTION_TOKEN}`,
  'Notion-Version': CONFIG.NOTION_API_VERSION,
  'Content-Type': 'application/json'
}

/**
 * 将标题转换为 slug
 */
function titleToSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // 移除特殊字符
    .replace(/\s+/g, '-')     // 空格转为短横线
    .replace(/--+/g, '-')     // 多个短横线合并
    .replace(/^-+|-+$/g, '')  // 移除首尾短横线
    .substring(0, 50)         // 限制长度
    || `article-${Date.now()}` // 如果为空，使用时间戳
}

/**
 * 获取所有 Post 页面
 */
async function getAllPosts() {
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
    return []
  }
}

/**
 * 更新页面 slug
 */
async function updatePageSlug(pageId, slug) {
  try {
    await axios.patch(
      `https://api.notion.com/v1/pages/${pageId}`,
      {
        properties: {
          slug: {
            rich_text: [{ text: { content: slug } }]
          }
        }
      },
      { headers }
    )
    return true
  } catch (error) {
    console.error('更新失败:', error.response?.data || error.message)
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
  console.log('🔧 开始为文章生成缺失的 slug...\n')

  const pages = await getAllPosts()
  console.log(`📚 找到 ${pages.length} 篇文章\n`)

  let generatedCount = 0
  let skippedCount = 0

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i]
    const title = page.properties.title?.title?.[0]?.plain_text || ''
    const existingSlug = page.properties.slug?.rich_text?.[0]?.plain_text || ''

    console.log(`[${i + 1}/${pages.length}] ${title}`)

    if (!existingSlug || existingSlug.trim() === '') {
      const newSlug = titleToSlug(title)
      console.log(`   📝 生成 slug: ${newSlug}`)

      const success = await updatePageSlug(page.id, newSlug)
      await delay(CONFIG.DELAY_MS)

      if (success) {
        console.log(`   ✅ 更新成功\n`)
        generatedCount++
      } else {
        console.log(`   ❌ 更新失败\n`)
      }
    } else {
      console.log(`   ⏭️  已有 slug: ${existingSlug}\n`)
      skippedCount++
    }
  }

  console.log('\n' + '='.repeat(50))
  console.log('✅ 处理完成！')
  console.log(`   📝 生成: ${generatedCount}`)
  console.log(`   ⏭️  跳过: ${skippedCount}`)
  console.log('='.repeat(50))
}

main().catch(error => {
  console.error('💥 脚本执行失败:', error)
  process.exit(1)
})
