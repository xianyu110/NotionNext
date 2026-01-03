const axios = require('axios')

// ===== 配置区域 =====
const CONFIG = {
  NOTION_TOKEN: process.env.NOTION_TOKEN || 'YOUR_NOTION_INTEGRATION_TOKEN',
  DATABASE_ID: process.env.NOTION_DATABASE_ID || 'YOUR_DATABASE_ID'
}

// ===== 获取数据库中所有页面 =====
async function getAllPages() {
  const url = `https://api.notion.com/v1/databases/${CONFIG.DATABASE_ID}/query`
  const headers = {
    'Authorization': `Bearer ${CONFIG.NOTION_TOKEN}`,
    'Notion-Version': '2022-06-28',
    'Content-Type': 'application/json'
  }

  let allPages = []
  let hasMore = true
  let startCursor = undefined

  while (hasMore) {
    const payload = startCursor ? { start_cursor: startCursor } : {}
    const response = await axios.post(url, payload, { headers })

    allPages = allPages.concat(response.data.results)
    hasMore = response.data.has_more
    startCursor = response.data.next_cursor
  }

  return allPages
}

// ===== 删除页面 =====
async function deletePage(pageId) {
  const url = `https://api.notion.com/v1/pages/${pageId}`
  const headers = {
    'Authorization': `Bearer ${CONFIG.NOTION_TOKEN}`,
    'Notion-Version': '2022-06-28',
    'Content-Type': 'application/json'
  }

  await axios.patch(url, { archived: true }, { headers })
}

// ===== 延迟函数 =====
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// ===== 主函数 =====
async function deleteAllPages() {
  console.log('🗑️  开始清空数据库...\n')

  // 获取所有页面
  const pages = await getAllPages()
  console.log(`📚 共找到 ${pages.length} 个页面\n`)

  if (pages.length === 0) {
    console.log('✅ 数据库已经是空的')
    return
  }

  console.log(`⚠️  即将删除所有 ${pages.length} 个页面`)
  console.log('⏳ 5秒后开始执行...\n')

  await sleep(5000)

  // 删除所有页面
  let deleted = 0
  for (const page of pages) {
    try {
      await deletePage(page.id)
      deleted++
      console.log(`✅ [${deleted}/${pages.length}] 已删除`)
      await sleep(300) // 避免限流
    } catch (error) {
      console.error(`❌ 删除失败: ${error.message}`)
    }
  }

  console.log('\n' + '='.repeat(60))
  console.log(`✅ 清空完成！删除了 ${deleted} 个页面`)
  console.log('='.repeat(60))
}

// 运行
deleteAllPages().catch(console.error)
