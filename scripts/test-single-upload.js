const fs = require('fs')
const path = require('path')
const axios = require('axios')
const matter = require('gray-matter')

const CONFIG = {
  NOTION_TOKEN: process.env.NOTION_TOKEN,
  DATABASE_ID: process.env.NOTION_DATABASE_ID
}

async function createNotionPage(article) {
  const url = 'https://api.notion.com/v1/pages'

  const properties = {
    title: { title: [{ text: { content: article.title } }] },
    status: { select: { name: article.status || 'Published' } }
  }

  if (article.category) properties.category = { select: { name: article.category } }
  if (article.tags && article.tags.length > 0) {
    properties.tags = { multi_select: article.tags.map(tag => ({ name: tag.replace(/^#/, '') })) }
  }
  if (article.date) properties.date = { date: { start: new Date(article.date).toISOString() } }
  if (article.summary) properties.summary = { rich_text: [{ text: { content: article.summary } }] }

  const children = []

  // 预处理：合并被换行的图片链接
  let processedContent = article.content
    .replace(/!\[([^\]]*)\]\((https?:\/\/[^\s)]*?-)\s*\n\s*([^\s)]+)\)/g, '![$1]($2$3)')
    .replace(/!\[([^\]]*)\]\(\s*\n\s*(https?:\/\/[^\s)]+)\)/g, '![$1]($2)')
    .replace(/!\[([^\]]*)\]\((https?:\/\/[^\s)]+)\s*\n\s*\)/g, '![$1]($2)')

  const lines = processedContent.split('\n')
  let i = 0

  while (i < lines.length && children.length < 100) {
    const line = lines[i].trim()

    if (!line) {
      i++
      continue
    }

    // 图片
    const imageMatch = line.match(/!\[([^\]]*)\]\((https?:\/\/[^\s)]+)\)/)
    if (imageMatch) {
      const [fullMatch, alt, url] = imageMatch
      if (line === fullMatch) {
        children.push({
          object: 'block',
          type: 'image',
          image: {
            type: 'external',
            external: { url },
            caption: alt ? [{ text: { content: alt } }] : []
          }
        })
        console.log(`  ✅ 发现图片: ${url.substring(0, 50)}...`)
        i++
        continue
      }
    }

    // 其他内容简化处理
    if (line.startsWith('#')) {
      const level = line.match(/^#+/)[0].length
      const text = line.replace(/^#+\s*/, '').substring(0, 2000)
      const type = level === 1 ? 'heading_1' : level === 2 ? 'heading_2' : 'heading_3'
      children.push({
        object: 'block',
        type,
        [type]: { rich_text: [{ text: { content: text } }] }
      })
    } else {
      children.push({
        object: 'block',
        type: 'paragraph',
        paragraph: { rich_text: [{ text: { content: line.substring(0, 2000) } }] }
      })
    }
    i++
  }

  const payload = {
    parent: { database_id: CONFIG.DATABASE_ID },
    properties,
    children: children.slice(0, 100)
  }

  const headers = {
    'Authorization': `Bearer ${CONFIG.NOTION_TOKEN}`,
    'Notion-Version': '2022-06-28',
    'Content-Type': 'application/json'
  }

  const response = await axios.post(url, payload, { headers })
  return response.data
}

function parseMarkdownFile(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContent)
  const fileName = path.basename(filePath, '.md')

  return {
    title: data.title || fileName,
    date: data.date,
    category: data.category,
    tags: data.tags || [],
    summary: data.summary || '',
    status: data.status || 'Published',
    author: data.author,
    content: content
  }
}

async function testUpload() {
  const filePath = 'posts/利用ChatGPT完成2024 年高教社杯全国大学生数学建模竞赛题目【A-B-C-D-E题】完整思路.md'

  console.log('📝 测试上传:', filePath)
  const article = parseMarkdownFile(filePath)
  console.log('📄 文章标题:', article.title)

  const result = await createNotionPage(article)
  console.log('\n✅ 上传成功!')
  console.log('🔗 链接:', result.url)
}

testUpload().catch(console.error)
