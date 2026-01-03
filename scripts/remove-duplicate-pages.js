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
async function removeDuplicates() {
  console.log('🔍 开始检查重复页面...\n')

  // 获取所有页面
  const pages = await getAllPages()
  console.log(`📚 共找到 ${pages.length} 个页面\n`)

  // 按标题分组
  const titleMap = new Map()

  pages.forEach(page => {
    const titleArray = page.properties.title?.title || []
    const title = titleArray.map(t => t.plain_text).join('')

    if (!titleMap.has(title)) {
      titleMap.set(title, [])
    }

    titleMap.get(title).push({
      id: page.id,
      created: page.created_time,
      url: page.url
    })
  })

  // 找出重复的标题
  const duplicates = []
  titleMap.forEach((pageList, title) => {
    if (pageList.length > 1) {
      // 按创建时间排序，保留最早的
      pageList.sort((a, b) => new Date(a.created) - new Date(b.created))
      duplicates.push({
        title,
        keep: pageList[0],
        remove: pageList.slice(1)
      })
    }
  })

  if (duplicates.length === 0) {
    console.log('✅ 没有发现重复页面')
    return
  }

  console.log(`⚠️  发现 ${duplicates.length} 个重复标题\n`)

  // 显示将要删除的页面
  let totalToRemove = 0
  duplicates.forEach(({ title, keep, remove }) => {
    console.log(`📄 "${title}"`)
    console.log(`   保留: ${keep.created} - ${keep.url}`)
    console.log(`   删除: ${remove.length} 个重复页面`)
    totalToRemove += remove.length
  })

  console.log(`\n⚠️  即将删除 ${totalToRemove} 个重复页面`)
  console.log('⏳ 5秒后开始执行...\n')

  await sleep(5000)

  // 删除重复页面
  let deleted = 0
  for (const { title, remove } of duplicates) {
    for (const page of remove) {
      try {
        await deletePage(page.id)
        deleted++
        console.log(`✅ [${deleted}/${totalToRemove}] 已删除: "${title}"`)
        await sleep(300) // 避免限流
      } catch (error) {
        console.error(`❌ 删除失败: "${title}" - ${error.message}`)
      }
    }
  }

  console.log('\n' + '='.repeat(60))
  console.log(`✅ 去重完成！删除了 ${deleted} 个重复页面`)
  console.log('='.repeat(60))
}

// 运行
removeDuplicates().catch(console.error)
