const axios = require('axios')

// ===== 配置区域 =====
const CONFIG = {
  NOTION_TOKEN: process.env.NOTION_TOKEN || 'YOUR_NOTION_INTEGRATION_TOKEN',
  DATABASE_ID: process.env.NOTION_DATABASE_ID || 'YOUR_DATABASE_ID',
  REQUEST_DELAY: 500 // 每次请求之间的延迟（毫秒）
}

// ===== 延迟函数 =====
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// ===== 获取数据库中的所有页面 =====
async function getAllPages() {
  const url = 'https://api.notion.com/v1/databases/' + CONFIG.DATABASE_ID + '/query'

  const headers = {
    'Authorization': `Bearer ${CONFIG.NOTION_TOKEN}`,
    'Notion-Version': '2022-06-28',
    'Content-Type': 'application/json'
  }

  let allPages = []
  let hasMore = true
  let startCursor = undefined

  while (hasMore) {
    const payload = {
      page_size: 100,
      ...(startCursor && { start_cursor: startCursor })
    }

    const response = await axios.post(url, payload, { headers })
    allPages = allPages.concat(response.data.results)
    hasMore = response.data.has_more
    startCursor = response.data.next_cursor

    if (hasMore) {
      await sleep(CONFIG.REQUEST_DELAY)
    }
  }

  return allPages
}

// ===== 更新页面的 type 字段为 Post =====
async function updatePageType(pageId) {
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

  const response = await axios.patch(url, payload, { headers })
  return response.data
}

// ===== 主函数 =====
async function batchUpdateToPost() {
  console.log('🚀 开始批量更新文章类型为 Post...\n')

  // 检查配置
  if (CONFIG.NOTION_TOKEN === 'YOUR_NOTION_INTEGRATION_TOKEN') {
    console.error('❌ 错误：请先配置 NOTION_TOKEN')
    process.exit(1)
  }

  if (CONFIG.DATABASE_ID === 'YOUR_DATABASE_ID') {
    console.error('❌ 错误：请先配置 DATABASE_ID')
    process.exit(1)
  }

  try {
    // 获取所有页面
    console.log('📚 正在获取数据库中的所有页面...')
    const pages = await getAllPages()
    console.log(`✅ 找到 ${pages.length} 个页面\n`)

    const results = {
      success: [],
      failed: [],
      skipped: []
    }

    // 逐个更新
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i]
      const pageId = page.id
      const title = page.properties.title?.title?.[0]?.text?.content || '未命名'
      const currentType = page.properties.type?.select?.name

      try {
        // 如果已经是 Post，跳过
        if (currentType === 'Post') {
          results.skipped.push({ title, currentType })
          console.log(`[${i + 1}/${pages.length}] ⏭️  跳过: ${title} (已经是 Post)`)
        } else {
          console.log(`[${i + 1}/${pages.length}] 🔄 更新: ${title} (${currentType || '空'} → Post)`)
          await updatePageType(pageId)
          results.success.push({ title, oldType: currentType })
          console.log(`✅ 成功: ${title}\n`)
        }

        // 延迟，避免触发限流
        if (i < pages.length - 1) {
          await sleep(CONFIG.REQUEST_DELAY)
        }
      } catch (error) {
        results.failed.push({
          title,
          error: error.response?.data?.message || error.message
        })
        console.error(`❌ 失败: ${title}`)
        console.error(`   原因: ${error.response?.data?.message || error.message}\n`)
      }
    }

    // 输出总结
    console.log('\n' + '='.repeat(60))
    console.log('📊 更新完成统计:')
    console.log(`   ✅ 成功更新: ${results.success.length}`)
    console.log(`   ⏭️  跳过（已是Post）: ${results.skipped.length}`)
    console.log(`   ❌ 失败: ${results.failed.length}`)
    console.log('='.repeat(60))

    if (results.success.length > 0) {
      console.log('\n已更新的文章:')
      results.success.forEach(({ title, oldType }) => {
        console.log(`   ✅ ${title} (${oldType || '空'} → Post)`)
      })
    }

    if (results.failed.length > 0) {
      console.log('\n失败的文章:')
      results.failed.forEach(({ title, error }) => {
        console.log(`   ❌ ${title}: ${error}`)
      })
    }

    console.log('\n🎉 全部完成！')
  } catch (error) {
    console.error('❌ 发生错误:', error.message)
    if (error.response?.data) {
      console.error('详细信息:', error.response.data)
    }
    process.exit(1)
  }
}

// 运行
batchUpdateToPost().catch(console.error)
