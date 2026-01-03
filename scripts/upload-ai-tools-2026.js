const axios = require('axios')
const fs = require('fs')
const path = require('path')

const CONFIG = {
  NOTION_TOKEN: process.env.NOTION_TOKEN,
  DATABASE_ID: process.env.NOTION_DATABASE_ID,
  NOTION_API_VERSION: '2022-06-28',
  DELAY_MS: 350
}

const headers = {
  'Authorization': `Bearer ${CONFIG.NOTION_TOKEN}`,
  'Notion-Version': CONFIG.NOTION_API_VERSION,
  'Content-Type': 'application/json'
}

async function uploadArticle(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')
  const match = content.match(/---\n([\s\S]*?)\n---/)
  
  if (!match) {
    console.log(`⚠️  跳过: ${path.basename(filePath)} (无 frontmatter)`)
    return
  }

  const frontmatter = match[1]
  const title = frontmatter.match(/title:\s*(.+)/)?.[1] || path.basename(filePath, '.md')
  const tags = frontmatter.match(/tags:\s*\[(.*?)\]/)?.[1]?.split(',').map(t => t.trim()) || ['人工智能']
  const category = frontmatter.match(/category:\s*(.+)/)?.[1] || '人工智能'
  const summary = frontmatter.match(/summary:\s*(.+)/)?.[1] || ''
  const slug = frontmatter.match(/slug:\s*(.+)/)?.[1] || ''

  const properties = {
    title: { title: [{ text: { content: title } }] },
    type: { select: { name: 'Post' } },
    status: { select: { name: 'Published' } },
    tags: { multi_select: tags.map(tag => ({ name: tag })) },
    category: { select: { name: category } }
  }

  if (summary) {
    properties.summary = { rich_text: [{ text: { content: summary.substring(0, 2000) } }] }
  }

  if (slug) {
    properties.slug = { rich_text: [{ text: { content: slug } }] }
  }

  const payload = {
    parent: { database_id: CONFIG.DATABASE_ID },
    properties,
    children: [{ object: 'block', type: 'paragraph', paragraph: { rich_text: [{ text: { content: '详细内容请访问博客...' } }] } }]
  }

  try {
    const response = await axios.post('https://api.notion.com/v1/pages', payload, { headers })
    console.log(`✅ ${title}`)
    console.log(`   链接: ${response.data.url}\n`)
    return true
  } catch (error) {
    console.error(`❌ ${title}`)
    console.error(`   错误: ${error.response?.data || error.message}\n`)
    return false
  }
}

async function main() {
  const folderPath = 'posts/ai-tools-2026'
  const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.md'))

  console.log(`📚 找到 ${files.length} 篇文章\n`)

  let successCount = 0
  for (const file of files) {
    const success = await uploadArticle(path.join(folderPath, file))
    if (success) successCount++
    await new Promise(resolve => setTimeout(resolve, CONFIG.DELAY_MS))
  }

  console.log(`\n✅ 上传完成：${successCount}/${files.length}`)
}

main().catch(console.error)
