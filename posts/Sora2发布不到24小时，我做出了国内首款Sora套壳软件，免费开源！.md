---
title: "Sora2发布不到24小时，我做出了国内首款Sora套壳软件，免费开源！"
date: Fri Jan 02 2026 23:54:52 GMT+0800 (China Standard Time)
category: "人工智能"
tags: ["#开源","#人工智能","#sora","#openai"]
summary: ""
author: "xianyu120"
status: "Published"
---

## Sora2发布不到24小时，我做出了国内首款Sora套壳软件，免费开源！

> 🚀 从0到1，24小时完成Sora2 API集成，打造国内首个开源Sora对话和视频生成应用！

### 🎯 项目背景

OpenAI在2025年10月1日正式发布了Sora2，作为新一代的AI视频生成模型，它不仅能够生成高质量的视频，还支持流式对话功能。当我看到这个消息后，立刻意识到这是一个绝佳的学习和实践机会。

**时间线：**

  * 🕐 10月1日 上午9点 - Sora2正式发布
  * 💻 10月1日 上午10点 - 开始构思项目架构
  * ⚡ 10月1日 下午3点 - 完成核心功能开发
  * 🎉 10月1日 晚上9点 - 项目上线并开源

### 💡 为什么要做这个项目？

  1. **技术追新** \- Sora2刚发布，抢先体验最新AI技术
  2. **学以致用** \- 将API集成、流式响应等技术实战应用
  3. **开源共享** \- 帮助更多开发者快速上手Sora2
  4. **填补空白** \- 国内还没有开源的Sora2应用示例

### 🛠️ 技术栈

  * **前端** : 原生 JavaScript + Tailwind CSS
  * **后端** : Node.js + Express
  * **API** : Sora2 API (通过MaynorAPIPro平台)
  * **部署** : Vercel
  * **版本控制** : Git + GitHub

### 🎨 核心功能展示

#### 1\. 流式对话界面

![image-20251001214738276](https://i-blog.csdnimg.cn/img_convert/76651f976d2505873065b607e5047b10.png)

**功能亮点：**

  * ✅ 实时流式响应，逐字显示AI回复
  * ✅ 现代化UI设计，参考ChatGPT界面风格
  * ✅ 支持Markdown格式渲染（代码高亮、粗体、斜体等）
  * ✅ 本地历史记录保存，刷新页面不丢失

**技术实现：**

    
    
    // 使用Fetch API + ReadableStream处理流式数据
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    
    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
    
        // 解析SSE格式数据
        const chunk = decoder.decode(value);
        // 实时更新UI
        updateMessage(chunk);
    }
    

#### 2\. 视频生成功能

![image-20251001214800669](https://i-blog.csdnimg.cn/img_convert/2810cf33141e04397c3e9ad5846b6e77.png)

**功能特性：**

  * 🎬 支持文字描述生成视频
  * 📊 实时显示生成进度（带动画进度条）
  * 🎥 内置视频播放器，即时预览
  * ⬇️ 一键下载生成的视频

**进度显示效果：**

    
    
    ⌛️ 任务正在队列中，请耐心等待...
    🏃 进度：36.0%  [████████░░░░░░░░░░]
    🏃 进度：52.3%  [████████████░░░░░░]
    🏃 进度：79.7%  [██████████████████]
    ✅ 视频生成成功！
    

#### 3\. 响应式设计

![image-20251001214816336](https://i-blog.csdnimg.cn/img_convert/42ecf3ecab74eef734074dde25b99ffa.png)

**适配特点：**

  * 📱 完美支持移动端、平板、PC端
  * 🎯 自适应布局，不同屏幕尺寸最佳体验
  * 🌈 渐变色设计，视觉效果出众
  * ⚡ 流畅的动画效果和交互反馈

### 🔥 技术难点与解决方案

#### 难点1: 流式响应处理

**问题：** Sora2 API返回的是SSE（Server-Sent Events）格式，需要实时解析

**解决方案：**

    
    
    // 1. 服务端转发流式数据
    response.data.on('data', (chunk) => {
        const formatted = `data: ${chunk}\n\n`;
        res.write(formatted);
    });
    
    // 2. 前端解析SSE流
    buffer += decoder.decode(value);
    const lines = buffer.split('\n');
    for (const line of lines) {
        if (line.startsWith('data: ')) {
            const json = JSON.parse(line.slice(6));
            handleChunk(json);
        }
    }
    

#### 难点2: 进度显示优化

**问题：** 视频生成需要1-2分钟，如何让用户感知进度？

**解决方案：**

  * 实时解析进度信息（36% → 52% → 79%）
  * CSS动画进度条，视觉反馈
  * Emoji状态提示（⌛️ → 🏃 → ✅）

#### 难点3: 环境变量安全

**问题：** API密钥不能提交到GitHub

**解决方案：**

    
    
    # .gitignore
    .env
    node_modules/
    
    # .env.example（提供模板）
    SORA_API_KEY=your-api-key-here
    SORA_BASE_URL=https://apipro.maynor1024.live/
    

### 📊 项目数据

**开发数据：**

  * ⏱️ 开发时间：8小时
  * 💻 代码行数：~500行
  * 📦 依赖包：4个（express、axios、cors、dotenv）
  * 🎯 提交次数：5次
  * ⭐ GitHub Stars：期待你的支持！

### 🚀 快速开始

#### 本地运行

    
    
    # 1. 克隆项目
    git clone https://github.com/xianyu110/sora.git
    cd sora
    
    # 2. 安装依赖
    npm install
    
    # 3. 配置环境变量
    cp .env.example .env
    # 编辑.env，填入你的API密钥
    
    # 4. 启动项目
    npm run dev
    

访问 http://localhost:3000 即可使用！

#### 在线体验

🌐 **在线地址：** https://sora-three-lake.vercel.app

（需要配置API密钥才能使用完整功能）

### 🚢 Vercel部署教程（手把手教学）

想要部署自己的Sora应用？跟着下面的步骤，5分钟搞定！

#### 📋 准备工作

  1. **GitHub账号** \- 用于托管代码
  2. **Vercel账号** \- 访问 https://vercel.com 注册（可以直接用GitHub登录）
  3. **MaynorAPIPro API密钥** \- 访问 https://apipro.maynor1024.live/ 获取

#### 🎬 详细步骤

##### 第一步：Fork项目到你的GitHub

  1. 访问项目地址：https://github.com/xianyu110/sora
  2. 点击右上角的 **“Fork”** 按钮
  3. 等待几秒钟，项目就复制到你的账号下了

![外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传](https://img-
home.csdnimg.cn/images/20230724024159.png?origin_url=https%3A%2F%2Fimg.shields.io%2Fbadge%2FStep%25201-Fork%2520Repository-
blue%3Fstyle%3Dfor-the-badge%26logo%3Dgithub&pos_id=img-
EfeNVbxb-1759326863939)

##### 第二步：导入项目到Vercel

  1. 访问 https://vercel.com/new
  2. 选择 **“Import Git Repository”**
  3. 找到你刚刚Fork的 `sora` 项目
  4. 点击 **“Import”** 按钮

![外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传](https://img-
home.csdnimg.cn/images/20230724024159.png?origin_url=https%3A%2F%2Fimg.shields.io%2Fbadge%2FStep%25202-Import%2520to%2520Vercel-
black%3Fstyle%3Dfor-the-badge%26logo%3Dvercel&pos_id=img-
zOjjmQRL-1759326863939)

##### 第三步：配置环境变量（最重要！）

在Vercel的配置页面：

  1. 找到 **“Environment Variables”** 区域
  2. 添加以下两个变量：

    
    
    变量名: SORA_API_KEY
    值: 你的API密钥（从MaynorAPIPro获取）
    
    变量名: SORA_BASE_URL
    值: https://apipro.maynor1024.live/
    

**配置截图示例：**

    
    
    ┌─────────────────────────────────────────┐
    │ Environment Variables                    │
    ├─────────────────────────────────────────┤
    │ SORA_API_KEY    │ sk-xxxxxxxxxxxxx      │
    │ SORA_BASE_URL   │ https://apipro...     │
    └─────────────────────────────────────────┘
    

  3. 点击 **“Add”** 按钮保存每个变量

![外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传](https://img-
home.csdnimg.cn/images/20230724024159.png?origin_url=https%3A%2F%2Fimg.shields.io%2Fbadge%2FStep%25203-Add%2520Environment%2520Variables-
green%3Fstyle%3Dfor-the-badge%26logo%3Ddotenv&pos_id=img-
KFxQUJ4v-1759326863940)

##### 第四步：部署项目

  1. 确认配置无误后，点击 **“Deploy”** 按钮
  2. 等待1-2分钟，Vercel会自动构建和部署
  3. 看到 **“Congratulations!”** 页面就成功了！

![外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传](https://img-
home.csdnimg.cn/images/20230724024159.png?origin_url=https%3A%2F%2Fimg.shields.io%2Fbadge%2FStep%25204-Deploying-
yellow%3Fstyle%3Dfor-the-badge%26logo%3Dvercel&pos_id=img-
Qv7vU0re-1759326863940)

##### 第五步：访问你的应用

  1. Vercel会自动分配一个域名，类似：`your-project-name.vercel.app`
  2. 点击 **“Visit”** 按钮访问你的应用
  3. 开始使用吧！

![外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传](https://img-
home.csdnimg.cn/images/20230724024159.png?origin_url=https%3A%2F%2Fimg.shields.io%2Fbadge%2FStep%25205-Visit%2520Your%2520App-
success%3Fstyle%3Dfor-the-
badge%26logo%3Dcheckmarx&pos_id=img-1CRIbDHE-1759326863940)

#### 🔧 常见问题解决

##### 问题1: 部署失败显示 “Cannot GET /”

**原因：** 缺少 `vercel.json` 配置文件

**解决：** 确保你的项目根目录有 `vercel.json` 文件（最新代码已包含）

##### 问题2: API请求失败

**原因：** 环境变量没有配置或配置错误

**解决步骤：**

  1. 进入Vercel项目 → Settings → Environment Variables
  2. 检查 `SORA_API_KEY` 和 `SORA_BASE_URL` 是否正确
  3. 修改后点击项目页面的 **“Redeploy”** 按钮重新部署

##### 问题3: 部署后显示404

**原因：** 路由配置问题

**解决：** 确保 `vercel.json` 中的路由配置如下：

    
    
    {
      "routes": [
        {
          "src": "/(.*)",
          "dest": "server.js"
        }
      ]
    }
    

#### 🎯 部署后的优化建议

##### 1\. 自定义域名

如果你有自己的域名：

  1. 进入 Vercel 项目 → Settings → Domains
  2. 添加你的域名
  3. 按照提示配置DNS记录

##### 2\. 查看实时日志

想看应用运行日志？

  1. 进入 Vercel 项目 → Deployments
  2. 点击最新的部署
  3. 查看 **“Functions”** 标签页的日志

##### 3\. 自动部署

配置完成后，每次你向GitHub推送代码，Vercel会自动重新部署！

    
    
    # 本地修改代码后
    git add .
    git commit -m "更新功能"
    git push origin main
    # Vercel会自动检测并部署
    

#### 📊 部署成功指标

✅ **成功标志：**

  * Vercel显示绿色的 “Ready” 状态
  * 访问域名能看到应用界面
  * 能够正常发送消息并收到回复
  * 浏览器控制台没有错误

#### 💡 进阶技巧

##### 使用Vercel CLI（可选）

如果你喜欢命令行：

    
    
    # 1. 安装Vercel CLI
    npm i -g vercel
    
    # 2. 登录
    vercel login
    
    # 3. 部署
    vercel
    
    # 4. 部署到生产环境
    vercel --prod
    

##### 预览部署

每次推送代码，Vercel会创建预览部署：

  * 主分支 → 生产环境
  * 其他分支 → 预览环境

可以在合并代码前先测试！

#### 🎉 恭喜！

如果你完成了以上步骤，说明你已经成功部署了自己的Sora应用！

**分享你的应用：**

  * 把域名分享给朋友
  * 在社交媒体展示
  * 继续定制开发

* * *

### 📝 项目结构

    
    
    sora/
    ├── public/              # 前端文件
    │   ├── index.html      # 主页面
    │   └── app.js          # 前端逻辑
    ├── server.js           # Express服务器
    ├── sora2.js            # Sora2 API客户端
    ├── .env.example        # 环境变量模板
    ├── package.json        # 项目配置
    ├── vercel.json         # Vercel部署配置
    └── README.md           # 项目文档
    

### 🎓 学到了什么？

#### 技术层面

  1. **流式数据处理** \- SSE协议、ReadableStream API
  2. **API集成** \- RESTful API、错误处理、重试机制
  3. **前后端交互** \- Express路由、CORS配置
  4. **部署实践** \- Vercel部署、环境变量配置

#### 产品思维

  1. **用户体验** \- 加载状态、错误提示、动画反馈
  2. **界面设计** \- 参考优秀产品、色彩搭配
  3. **文档编写** \- README、代码注释、使用说明

#### 开发效率

  1. **快速原型** \- MVP思维，先实现核心功能
  2. **渐进增强** \- 从基础到高级，逐步完善
  3. **代码复用** \- 封装工具函数，提高可维护性

### 💭 心得体会

#### 为什么能在24小时内完成？

  1. **目标明确** \- 只做核心功能，不追求完美
  2. **技术选型** \- 选择熟悉的技术栈，减少学习成本
  3. **快速迭代** \- 边开发边测试，及时发现问题
  4. **AI辅助** \- 使用Claude Code提高开发效率

#### 遇到的挑战

  1. **API文档不全** \- 通过实验和调试摸索接口
  2. **流式响应调试** \- 需要理解SSE协议和异步流处理
  3. **前端状态管理** \- 处理消息历史、加载状态等

#### 未来优化方向

  * 添加用户认证系统
  * 支持多种视频分辨率
  * 优化移动端交互体验
  * 添加更多自定义选项
  * 支持视频编辑功能

### 🌟 开源的意义

**为什么选择开源？**

  1. **学习交流** \- 帮助其他开发者快速上手Sora2
  2. **社区贡献** \- 让更多人参与完善项目
  3. **技术分享** \- 分享实践经验和技术方案
  4. **个人成长** \- 通过反馈不断提升技术能力

### 📢 特别说明

⚠️ **重要：本项目仅支持 MaynorAPIPro 平台的 API**

  * 官网：https://apipro.maynor1024.live/
  * 需要注册账号并获取API密钥
  * 其他平台的API密钥将无法使用

### 🔗 相关链接

  * 📦 **GitHub仓库** : https://github.com/xianyu110/sora
  * 🌐 **在线演示** : https://sora-three-lake.vercel.app
  * 📖 **详细文档** : [README.md](https://github.com/xianyu110/sora/blob/main/README.md)
  * 💬 **问题反馈** : [GitHub Issues](https://github.com/xianyu110/sora/issues)

### 👨‍💻 关于作者

一个热爱技术的全栈开发者，喜欢尝试新技术，乐于分享经验。

  * GitHub: [@xianyu110](https://github.com/xianyu110)
  * 如果觉得项目有帮助，欢迎 ⭐️ Star 支持！

### 🎉 结语

从Sora2发布到项目上线，24小时的时间虽然紧张，但也充满了乐趣和成就感。这个项目证明了：**只要行动起来，任何想法都可以快速变成现实。**

希望这个开源项目能帮助到正在学习Sora2 API的开发者们！如果你有任何问题或建议，欢迎在GitHub上提Issue或PR。

**让我们一起探索AI的无限可能！** 🚀

* * *

⭐️ **如果这个项目对你有帮助，别忘了给个Star哦！** ⭐️

![image-20251001214816336](https://i-blog.csdnimg.cn/img_convert/d25f8312e8a516cdbadc208938e115f8.png)

