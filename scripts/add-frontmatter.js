const fs = require('fs')
const path = require('path')

const MIRROR_FILES = [
  {
    file: 'chatgpt-gpt4o-mirror-guide.md',
    title: 'ChatGPT官网镜像站使用指南（国内直连）｜ChatGPT GPT-4o中文版入口推荐',
    tags: ['人工智能', 'ChatGPT', 'GPT-4o', '镜像站', '国内使用']
  },
  {
    file: 'chatgpt-o1-preview-mirror-guide.md',
    title: 'ChatGPT o1-preview官网镜像站使用指南（国内直连）｜o1深度推理模型入口',
    tags: ['人工智能', 'ChatGPT', 'o1-preview', '镜像站', '深度推理']
  },
  {
    file: 'claude-37-opus-mirror-guide.md',
    title: 'Claude官网镜像站使用指南（国内直连）｜Claude 3.7 Opus中文版入口推荐',
    tags: ['人工智能', 'Claude', 'Anthropic', '镜像站', '国内使用']
  },
  {
    file: 'claude-35-sonnet-mirror-guide.md',
    title: 'Claude官网镜像站使用指南（国内直连）｜Claude 3.5 Sonnet中文版入口推荐',
    tags: ['人工智能', 'Claude', 'Anthropic', '镜像站', '性价比']
  },
  {
    file: 'grok-41-mirror-guide.md',
    title: 'Grok官网镜像站使用指南（国内直连）｜Grok 4.1中文版入口推荐',
    tags: ['人工智能', 'Grok', 'xAI', '镜像站', '马斯克']
  },
  {
    file: 'grok-4-standard-mirror-guide.md',
    title: 'Grok官网镜像站使用指南（国内直连）｜Grok 4标准版中文版入口推荐',
    tags: ['人工智能', 'Grok', 'xAI', '镜像站', '性价比']
  },
  {
    file: 'grok-3-mirror-guide.md',
    title: 'Grok官网镜像站使用指南（国内直连）｜Grok 3免费版中文版入口推荐',
    tags: ['人工智能', 'Grok', 'xAI', '镜像站', '免费']
  },
  {
    file: 'gemini-25-pro-mirror-guide.md',
    title: 'Gemini官网镜像站使用指南（国内直连）｜Gemini 2.5 Pro中文版入口推荐',
    tags: ['人工智能', 'Gemini', 'Google AI', '镜像站', '国内使用']
  },
  {
    file: 'gemini-20-flash-mirror-guide.md',
    title: 'Google Gemini官网镜像站使用指南（国内直连）｜Gemini 2.0 Flash高速版中文版入口推荐',
    tags: ['人工智能', 'Gemini', 'Google AI', '镜像站', '高速']
  },
  {
    file: 'deepseek-v3-mirror-guide.md',
    title: 'DeepSeek官网镜像站使用指南（国内直连）｜DeepSeek V3中文版入口推荐',
    tags: ['人工智能', 'DeepSeek', '国产AI', '镜像站', '开源']
  }
]

function addFrontmatter(fileInfo) {
  const filePath = path.join(__dirname, '../posts', fileInfo.file)

  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${fileInfo.file}`)
    return false
  }

  const content = fs.readFileSync(filePath, 'utf-8')

  // 如果已经有frontmatter，跳过
  if (content.startsWith('---')) {
    console.log(`⏭️  Skipping ${fileInfo.file} (already has frontmatter)`)
    return true
  }

  // 生成frontmatter
  const frontmatter = `---
title: "${fileInfo.title}"
date: ${new Date().toString()}
category: "人工智能"
tags: ${JSON.stringify(fileInfo.tags.map(tag => `#${tag}`))}
summary: "国内直连AI镜像站使用指南，无需翻墙即可使用。"
author: "MaynorAI"
status: "Published"
---

`

  const newContent = frontmatter + content

  try {
    fs.writeFileSync(filePath, newContent, 'utf-8')
    console.log(`✅ Added frontmatter to: ${fileInfo.file}`)
    return true
  } catch (error) {
    console.error(`❌ Failed to update ${fileInfo.file}:`, error.message)
    return false
  }
}

function main() {
  console.log('🚀 开始为镜像站指南添加 frontmatter...\n')

  let successCount = 0
  let failCount = 0

  MIRROR_FILES.forEach(fileInfo => {
    const success = addFrontmatter(fileInfo)
    if (success) {
      successCount++
    } else {
      failCount++
    }
  })

  console.log('\n' + '='.repeat(50))
  console.log(`📈 完成！成功: ${successCount}, 失败: ${failCount}`)
  console.log('='.repeat(50))
}

main()
