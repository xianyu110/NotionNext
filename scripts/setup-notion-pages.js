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
 * 创建页面
 */
async function createPage(pageData) {
  try {
    const response = await axios.post(
      'https://api.notion.com/v1/pages',
      pageData,
      { headers }
    )
    return response.data
  } catch (error) {
    console.error('创建失败:', error.response?.data || error.message)
    throw error
  }
}

/**
 * 延迟函数
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * 系统页面配置
 */
const SYSTEM_PAGES = [
  // 关于页面
  {
    type: 'Page',
    title: '关于',
    slug: 'about',
    status: 'Published',
    summary: 'MaynorAI - AI 工具探索者 | 编程爱好者 | 技术分享博主',
    content: [
      {
        object: 'block',
        type: 'heading_1',
        heading_1: {
          rich_text: [{ text: { content: '关于 Maynor' } }]
        }
      },
      {
        object: 'block',
        type: 'paragraph',
        paragraph: {
          rich_text: [{ text: { content: '你好！我是 Maynor，一名热爱编程和 AI 技术的博主。' } }]
        }
      },
      {
        object: 'block',
        type: 'heading_2',
        heading_2: {
          rich_text: [{ text: { content: '我的技能' } }]
        }
      },
      {
        object: 'block',
        type: 'bulleted_list_item',
        bulleted_list_item: {
          rich_text: [{ text: { content: '🤖 AI 工具探索与应用（ChatGPT、Claude、Gemini 等）' } }]
        }
      },
      {
        object: 'block',
        type: 'bulleted_list_item',
        bulleted_list_item: {
          rich_text: [{ text: { content: '💻 全栈开发（Python、JavaScript、TypeScript、React）' } }]
        }
      },
      {
        object: 'block',
        type: 'bulleted_list_item',
        bulleted_list_item: {
          rich_text: [{ text: { content: '📝 技术写作与知识分享' } }]
        }
      },
      {
        object: 'block',
        type: 'bulleted_list_item',
        bulleted_list_item: {
          rich_text: [{ text: { content: '🚀 互联网产品与运营' } }]
        }
      },
      {
        object: 'block',
        type: 'heading_2',
        heading_2: {
          rich_text: [{ text: { content: '联系方式' } }]
        }
      },
      {
        object: 'block',
        type: 'paragraph',
        paragraph: {
          rich_text: [
            { text: { content: '📧 Email: ' } },
            { text: { content: 'contact@maynor1024.live' } }
          ]
        }
      },
      {
        object: 'block',
        type: 'paragraph',
        paragraph: {
          rich_text: [
            { text: { content: '🔗 GitHub: ' } },
            {
              text: { content: 'https://github.com/xianyu110', link: { url: 'https://github.com/xianyu110' } }
            }
          ]
        }
      },
      {
        object: 'block',
        type: 'paragraph',
        paragraph: {
          rich_text: [
            { text: { content: '🌐 AI 平台: ' } },
            {
              text: { content: 'https://agi2.maynor1024.live', link: { url: 'https://agi2.maynor1024.live' } }
            }
          ]
        }
      }
    ]
  },

  // 首页菜单
  {
    type: 'Menu',
    title: '首页',
    slug: '/',
    status: 'Invisible',
    icon: 'fas fa-home',
    summary: '跳转到首页 / 的菜单'
  },

  // 搜索菜单
  {
    type: 'Menu',
    title: '搜索',
    slug: '/search',
    status: 'Invisible',
    icon: 'fas fa-search',
    summary: '跳转到搜索页的菜单'
  },

  // 归档菜单
  {
    type: 'Menu',
    title: '归档',
    slug: '/archive',
    status: 'Published',
    icon: 'fas fa-archive',
    summary: '文章归档'
  },

  // 分类菜单
  {
    type: 'Menu',
    title: '分类',
    slug: '/category',
    status: 'Published',
    icon: 'fas fa-th',
    summary: '文章分类'
  },

  // 标签菜单
  {
    type: 'Menu',
    title: '标签',
    slug: '/tag',
    status: 'Published',
    icon: 'fas fa-tag',
    summary: '文章标签'
  }
]

/**
 * 主函数
 */
async function main() {
  console.log('🚀 开始创建系统页面...\n')

  for (let i = 0; i < SYSTEM_PAGES.length; i++) {
    const pageConfig = SYSTEM_PAGES[i]

    console.log(`[${i + 1}/${SYSTEM_PAGES.length}] 创建: ${pageConfig.title} (${pageConfig.type})`)

    const properties = {
      title: {
        title: [{ text: { content: pageConfig.title } }]
      },
      type: {
        select: { name: pageConfig.type }
      },
      status: {
        select: { name: pageConfig.status }
      },
      slug: {
        rich_text: [{ text: { content: pageConfig.slug } }]
      }
    }

    if (pageConfig.summary) {
      properties.summary = {
        rich_text: [{ text: { content: pageConfig.summary } }]
      }
    }

    if (pageConfig.icon) {
      properties.icon = {
        rich_text: [{ text: { content: pageConfig.icon } }]
      }
    }

    const payload = {
      parent: { database_id: CONFIG.DATABASE_ID },
      properties,
      children: pageConfig.content || [
        {
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [{ text: { content: '' } }]
          }
        }
      ]
    }

    try {
      const result = await createPage(payload)
      console.log(`✅ 创建成功: ${result.url}\n`)
      await delay(CONFIG.DELAY_MS)
    } catch (error) {
      console.log(`❌ 创建失败\n`)
    }
  }

  console.log('='.repeat(50))
  console.log('✅ 系统页面创建完成！')
  console.log('='.repeat(50))
}

main().catch(error => {
  console.error('💥 脚本执行失败:', error)
  process.exit(1)
})
