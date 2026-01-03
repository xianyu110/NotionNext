const axios = require('axios')

// ===== 配置区域 =====
const CONFIG = {
  NOTION_TOKEN: process.env.NOTION_TOKEN || 'YOUR_NOTION_INTEGRATION_TOKEN',
  DATABASE_ID: process.env.NOTION_DATABASE_ID || 'YOUR_DATABASE_ID',
  NOTION_API_VERSION: '2022-06-28',
  DELAY_MS: 350, // Notion API 限流：每秒最多 3 个请求
  MAX_RELATED_POSTS: 3 // 每篇文章推荐的相关文章数量
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
          },
          page_size: 100
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
 * 提取页面元数据
 */
function extractPageMetadata(page) {
  return {
    id: page.id,
    url: page.url,
    title: page.properties.title?.title?.[0]?.plain_text || page.properties.Name?.title?.[0]?.plain_text || '未命名',
    tags: page.properties.tags?.multi_select?.map(t => t.name) || [],
    category: page.properties.category?.select?.name || '',
    summary: page.properties.summary?.rich_text?.[0]?.plain_text || ''
  }
}

/**
 * 计算两篇文章的相似度（基于标签和分类）
 */
function calculateSimilarity(post1, post2) {
  let score = 0

  // 相同分类加 50 分
  if (post1.category && post1.category === post2.category) {
    score += 50
  }

  // 相同标签，每个加 20 分
  const commonTags = post1.tags.filter(tag => post2.tags.includes(tag))
  score += commonTags.length * 20

  return score
}

/**
 * 查找相关文章
 */
function findRelatedPosts(currentPost, allPosts, maxCount = 3) {
  const postsWithScores = allPosts
    .filter(post => post.id !== currentPost.id) // 排除自己
    .map(post => ({
      ...post,
      similarity: calculateSimilarity(currentPost, post)
    }))
    .filter(post => post.similarity > 0) // 只保留有相关性的
    .sort((a, b) => b.similarity - a.similarity) // 按相似度排序
    .slice(0, maxCount) // 取前 N 篇

  return postsWithScores
}

/**
 * 获取页面的所有内容块
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
 * 检查页面是否已有"相关推荐"模块
 */
function hasRelatedSection(blocks) {
  return blocks.some(block => {
    const text = extractTextFromBlock(block)
    return text.includes('相关推荐') || text.includes('相关阅读') || text.includes('延伸阅读')
  })
}

/**
 * 从块中提取文本
 */
function extractTextFromBlock(block) {
  const type = block.type
  if (type === 'paragraph' && block.paragraph?.rich_text) {
    return block.paragraph.rich_text.map(t => t.plain_text).join('')
  } else if (type === 'heading_2' && block.heading_2?.rich_text) {
    return block.heading_2.rich_text.map(t => t.plain_text).join('')
  }
  return ''
}

/**
 * 在页面末尾添加相关文章推荐
 */
async function appendRelatedPosts(pageId, relatedPosts) {
  if (relatedPosts.length === 0) {
    return false
  }

  // 构建相关推荐块
  const blocks = [
    {
      object: 'block',
      type: 'divider',
      divider: {}
    },
    {
      object: 'block',
      type: 'heading_2',
      heading_2: {
        rich_text: [
          {
            type: 'text',
            text: { content: '📚 相关推荐' }
          }
        ]
      }
    }
  ]

  // 添加每篇推荐文章
  relatedPosts.forEach((post, index) => {
    blocks.push({
      object: 'block',
      type: 'paragraph',
      paragraph: {
        rich_text: [
          {
            type: 'text',
            text: { content: `${index + 1}. ` }
          },
          {
            type: 'text',
            text: {
              content: post.title,
              link: { url: post.url }
            },
            annotations: {
              bold: true
            }
          },
          {
            type: 'text',
            text: { content: post.summary ? ` - ${post.summary.substring(0, 80)}...` : '' }
          }
        ]
      }
    })
  })

  try {
    await axios.patch(
      `https://api.notion.com/v1/blocks/${pageId}/children`,
      { children: blocks },
      { headers }
    )
    return true
  } catch (error) {
    console.error(`❌ 添加相关推荐失败:`, error.response?.data || error.message)
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
  console.log('🚀 开始为文章添加内链（相关推荐）...\n')

  // 1. 获取所有文章
  console.log('📚 正在获取所有文章...')
  const pages = await getAllPages()
  console.log(`✅ 找到 ${pages.length} 篇文章\n`)

  // 2. 提取所有文章的元数据
  const allPosts = pages.map(extractPageMetadata)

  let successCount = 0
  let skipCount = 0
  let noRelatedCount = 0

  // 3. 为每篇文章添加相关推荐
  for (let i = 0; i < allPosts.length; i++) {
    const currentPost = allPosts[i]
    console.log(`[${i + 1}/${allPosts.length}] 处理: ${currentPost.title}`)

    // 获取页面内容，检查是否已有相关推荐
    const blocks = await getPageBlocks(currentPost.id)
    await delay(CONFIG.DELAY_MS)

    if (hasRelatedSection(blocks)) {
      console.log(`⏭️  跳过（已有相关推荐）\n`)
      skipCount++
      continue
    }

    // 查找相关文章
    const relatedPosts = findRelatedPosts(currentPost, allPosts, CONFIG.MAX_RELATED_POSTS)

    if (relatedPosts.length === 0) {
      console.log(`⚠️  无相关文章（缺少标签/分类）\n`)
      noRelatedCount++
      continue
    }

    console.log(`   找到 ${relatedPosts.length} 篇相关文章:`)
    relatedPosts.forEach(post => {
      console.log(`      - ${post.title} (相似度: ${post.similarity})`)
    })

    // 添加相关推荐
    const success = await appendRelatedPosts(currentPost.id, relatedPosts)
    await delay(CONFIG.DELAY_MS)

    if (success) {
      console.log(`✅ 添加成功\n`)
      successCount++
    } else {
      console.log(`❌ 添加失败\n`)
    }
  }

  // 4. 输出统计
  console.log('\n' + '='.repeat(50))
  console.log('✅ 处理完成！')
  console.log(`   总文章数: ${allPosts.length}`)
  console.log(`   ✅ 成功添加: ${successCount}`)
  console.log(`   ⏭️  已有推荐: ${skipCount}`)
  console.log(`   ⚠️  无相关文章: ${noRelatedCount}`)
  console.log('='.repeat(50))
  console.log('\n💡 提示：为文章添加更多标签和分类，可以提高内链匹配率！')
}

// 运行脚本
main().catch(error => {
  console.error('💥 脚本执行失败:', error)
  process.exit(1)
})
