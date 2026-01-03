const axios = require('axios')

const CONFIG = {
  NOTION_TOKEN: process.env.NOTION_TOKEN,
  DATABASE_ID: process.env.NOTION_DATABASE_ID
}

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

async function deletePage(pageId) {
  const url = `https://api.notion.com/v1/pages/${pageId}`
  const headers = {
    'Authorization': `Bearer ${CONFIG.NOTION_TOKEN}`,
    'Notion-Version': '2022-06-28',
    'Content-Type': 'application/json'
  }

  await axios.patch(url, { archived: true }, { headers })
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

async function deleteOldPages() {
  console.log('🔍 开始查找旧页面...\n')

  const pages = await getAllPages()
  console.log(`📚 共找到 ${pages.length} 个页面\n`)

  // 获取今天的开始时间（UTC）
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // 筛选出今天之前创建的页面
  const oldPages = pages.filter(page => {
    const createdTime = new Date(page.created_time)
    return createdTime < today
  })

  console.log(`⚠️  找到 ${oldPages.length} 个今天之前创建的页面`)

  if (oldPages.length === 0) {
    console.log('✅ 没有需要删除的旧页面')
    return
  }

  console.log('⏳ 5秒后开始删除...\n')
  await sleep(5000)

  let deleted = 0
  for (const page of oldPages) {
    try {
      await deletePage(page.id)
      deleted++
      const title = page.properties.title?.title?.[0]?.plain_text || '无标题'
      console.log(`✅ [${deleted}/${oldPages.length}] 已删除: ${title}`)
      await sleep(300)
    } catch (error) {
      console.error(`❌ 删除失败: ${error.message}`)
    }
  }

  console.log('\n' + '='.repeat(60))
  console.log(`✅ 清理完成！删除了 ${deleted} 个旧页面`)
  console.log('='.repeat(60))
}

deleteOldPages().catch(console.error)
