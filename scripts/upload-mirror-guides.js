const axios = require('axios')
const fs = require('fs')
const path = require('path')

const CONFIG = {
  NOTION_TOKEN: process.env.NOTION_TOKEN,
  DATABASE_ID: process.env.NOTION_DATABASE_ID,
  NOTION_API_VERSION: '2022-06-28',
  DELAY_MS: 350
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// 镜像站指南文件夹列表
const MIRROR_FOLDERS = [
  'chatgpt-gpt4o-mirror',
  'chatgpt-o1-preview-mirror',
  'claude-37-opus-mirror',
  'claude-35-sonnet-mirror',
  'grok-41-mirror',
  'grok-4-standard-mirror',
  'grok-3-mirror',
  'gemini-25-pro-mirror',
  'gemini-20-flash-mirror',
  'deepseek-v3-mirror'
]

async function uploadMirrorGuide(folderName) {
  const folderPath = path.join(__dirname, '../posts', folderName)
  const readmePath = path.join(folderPath, 'README.md')

  if (!fs.existsSync(readmePath)) {
    console.error(`❌ README.md not found in ${folderName}`)
    return false
  }

  const content = fs.readFileSync(readmePath, 'utf-8')
  const lines = content.split('\n')

  // 提取第一行作为标题（去掉 # 符号）
  const title = lines[0].replace(/^#\s*/, '').trim()

  console.log(`📝 准备上传: ${title}`)

  // 构建 Notion 页面 payload
  const payload = {
    parent: { database_id: CONFIG.DATABASE_ID },
    properties: {
      title: {
        title: [{ text: { content: title } }]
      },
      tags: {
        multi_select: [
          { name: '镜像站' },
          { name: 'AI工具' },
          { name: '国内使用' }
        ]
      },
      category: {
        select: { name: '人工智能' }
      },
      status: {
        select: { name: 'Published' }
      },
      type: {
        select: { name: 'Post' }
      },
      date: {
        date: { start: '2026-01-04' }
      }
    },
    children: [
      {
        object: 'block',
        type: 'paragraph',
        paragraph: {
          rich_text: [{
            type: 'text',
            text: { content: '详细内容请访问博客查看完整的镜像站使用指南。' }
          }]
        }
      }
    ]
  }

  try {
    const response = await axios.post(
      'https://api.notion.com/v1/pages',
      payload,
      {
        headers: {
          'Authorization': `Bearer ${CONFIG.NOTION_TOKEN}`,
          'Notion-Version': CONFIG.NOTION_API_VERSION,
          'Content-Type': 'application/json'
        }
      }
    )

    console.log(`✅ 成功上传: ${title}`)
    return true
  } catch (error) {
    console.error(`❌ 上传失败 ${title}:`, error.response?.data || error.message)
    return false
  }
}

async function main() {
  console.log('🚀 开始上传镜像站使用指南到 Notion...\n')
  console.log(`📊 总共需要上传 ${MIRROR_FOLDERS.length} 篇文章\n`)

  let successCount = 0
  let failCount = 0

  for (const folder of MIRROR_FOLDERS) {
    const success = await uploadMirrorGuide(folder)
    if (success) {
      successCount++
    } else {
      failCount++
    }

    // 延迟以避免 API 限流
    await delay(CONFIG.DELAY_MS)
  }

  console.log('\n' + '='.repeat(50))
  console.log(`📈 上传完成！成功: ${successCount}, 失败: ${failCount}`)
  console.log('='.repeat(50))
}

main().catch(console.error)
