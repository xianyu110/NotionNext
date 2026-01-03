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

async function updatePageType(pageId, title) {
  const url = `https://api.notion.com/v1/pages/${pageId}`
  const headers = {
    'Authorization': `Bearer ${CONFIG.NOTION_TOKEN}`,
    'Notion-Version': '2022-06-28',
    'Content-Type': 'application/json'
  }

  const payload = {
    properties: {
      type: {
        select: { name: 'Post' }
      }
    }
  }

  await axios.patch(url, payload, { headers })
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

async function updateAllToPost() {
  console.log('🔄 开始更新所有页面的 type 为 Post...\n')

  const pages = await getAllPages()
  console.log(`📚 共找到 ${pages.length} 个页面\n`)

  let updated = 0
  for (const page of pages) {
    try {
      const title = page.properties.title?.title?.[0]?.plain_text || '无标题'
      await updatePageType(page.id, title)
      updated++
      console.log(`✅ [${updated}/${pages.length}] 已更新: ${title}`)
      await sleep(300)
    } catch (error) {
      console.error(`❌ 更新失败: ${error.message}`)
    }
  }

  console.log('\n' + '='.repeat(60))
  console.log(`✅ 更新完成！共更新 ${updated} 个页面为 Post`)
  console.log('='.repeat(60))
}

updateAllToPost().catch(console.error)
