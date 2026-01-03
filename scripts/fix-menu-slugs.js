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
 * 获取所有 Menu 和 SubMenu 页面
 */
async function getAllMenuPages() {
  const allPages = []
  let cursor = undefined

  try {
    do {
      const response = await axios.post(
        `https://api.notion.com/v1/databases/${CONFIG.DATABASE_ID}/query`,
        {
          start_cursor: cursor,
          filter: {
            or: [
              { property: 'type', select: { equals: 'Menu' } },
              { property: 'type', select: { equals: 'SubMenu' } }
            ]
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
async function updatePageSlug(pageId, newSlug) {
  try {
    await axios.patch(
      `https://api.notion.com/v1/pages/${pageId}`,
      {
        properties: {
          slug: {
            rich_text: [{ text: { content: newSlug } }]
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
 * 归档页面
 */
async function archivePage(pageId) {
  try {
    await axios.patch(
      `https://api.notion.com/v1/pages/${pageId}`,
      { archived: true },
      { headers }
    )
    return true
  } catch (error) {
    console.error('归档失败:', error.response?.data || error.message)
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
  console.log('🔧 开始修复 Menu slug...\n')

  const pages = await getAllMenuPages()
  console.log(`📚 找到 ${pages.length} 个菜单页面\n`)

  let fixedCount = 0
  let archivedCount = 0

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i]
    const title = page.properties.title?.title?.[0]?.plain_text || ''
    const type = page.properties.type?.select?.name || ''
    const slug = page.properties.slug?.rich_text?.[0]?.plain_text || ''

    console.log(`[${i + 1}/${pages.length}] ${title} (${type}) - slug: ${slug}`)

    // 检查是否有问题的 slug
    if (slug === '#' || slug === '/' || slug === '') {
      // 首页菜单保留
      if (title === '首页' && slug === '/') {
        console.log(`   ✅ 保留首页菜单\n`)
        continue
      }

      // 其他特殊字符的菜单，归档或修复
      if (slug === '#') {
        console.log(`   🗑️  归档无效菜单（slug 为 #）`)
        await archivePage(page.id)
        await delay(CONFIG.DELAY_MS)
        archivedCount++
      } else {
        console.log(`   ⚠️  跳过\n`)
      }
    } else {
      console.log(`   ✅ 正常\n`)
    }
  }

  console.log('\n' + '='.repeat(50))
  console.log('✅ 修复完成！')
  console.log(`   🔧 修复: ${fixedCount}`)
  console.log(`   🗑️  归档: ${archivedCount}`)
  console.log('='.repeat(50))
}

main().catch(error => {
  console.error('💥 脚本执行失败:', error)
  process.exit(1)
})
