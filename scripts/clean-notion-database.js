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
 * 获取所有页面
 */
async function getAllPages() {
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
    console.error('❌ 获取页面失败:', error.response?.data || error.message)
    return []
  }
}

/**
 * 删除页面（归档）
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
    console.error('删除失败:', error.response?.data || error.message)
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
  console.log('🧹 开始清理 Notion 数据库示例数据...\n')

  // 需要删除的示例数据标题关键词
  const KEYWORDS_TO_DELETE = [
    '配置中心',
    '公告',
    '模板说明',
    '示例文章',
    '加锁文章',
    'EMPTY-ARTICLE',
    '绑定成功测试',
    '空白文章',
    '未发布文章',
    'example-',
    'Github',
    '友链',
    '关于',
    '首页',
    '搜索',
    '友情链接',
    '建站教程',
    'NotionNext介绍',
    'NotionNext操作说明',
    '写作是最值得投资的技能',
    '往期整理',
    '历史归档',
    '文章分类',
    '文章标签',
    '关于我',
    'English'
  ]

  const pages = await getAllPages()
  console.log(`📚 找到 ${pages.length} 个页面\n`)

  let deletedCount = 0
  let keptCount = 0

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i]
    const title = page.properties.title?.title?.[0]?.plain_text || ''
    const type = page.properties.type?.select?.name || ''
    const slug = page.properties.slug?.rich_text?.[0]?.plain_text || ''

    console.log(`[${i + 1}/${pages.length}] ${title || '(无标题)'}`)

    // 判断是否为示例数据
    const shouldDelete =
      KEYWORDS_TO_DELETE.some(keyword => title.includes(keyword)) ||
      type === 'Config' ||
      type === 'Notice' ||
      type === 'Menu' ||
      type === 'SubMenu' ||
      type === 'Page' ||
      slug.startsWith('example-') ||
      slug === 'links' ||
      slug === 'about' ||
      slug === 'invisible'

    if (shouldDelete) {
      console.log(`   🗑️  删除示例数据`)
      await archivePage(page.id)
      await delay(CONFIG.DELAY_MS)
      deletedCount++
    } else {
      console.log(`   ✅ 保留`)
      keptCount++
    }
  }

  console.log('\n' + '='.repeat(50))
  console.log('✅ 清理完成！')
  console.log(`   🗑️  删除: ${deletedCount}`)
  console.log(`   ✅ 保留: ${keptCount}`)
  console.log('='.repeat(50))
}

main().catch(error => {
  console.error('💥 脚本执行失败:', error)
  process.exit(1)
})
