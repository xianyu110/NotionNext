---
title: "精通 Codex：从入门到高阶的终极使用技巧"
date: Fri Jan 02 2026 23:55:04 GMT+0800 (China Standard Time)
category: "人工智能"
tags: ["#人工智能","#gemini"]
summary: ""
author: "xianyu120"
status: "Published"
---

* * *

## 精通 Codex：从入门到高阶的终极使用技巧

Codex 作为 OpenAI
推出的强大编程助手，不仅能完成基础的代码生成和重构，更隐藏着许多能极大提升开发效率的高阶功能。本文将带你从基础配置出发，一步步解锁 Codex
的全部潜力，让你成为真正的 Codex 大师。

### 一、 基础配置：通往高阶之路的第一步

在探索高级技巧之前，确保你的 Codex 环境已经正确配置。无论是 IDE 插件还是 CLI 工具，一个稳定的基础是发挥其全部能力的前提。

#### CLI 环境安装

对于追求极致效率的开发者，CLI（命令行工具）是必不可少的。

  1. **环境要求** ：macOS 12+ / Ubuntu 20.04+ / Debian 10+，或 Windows 11 的 WSL2。**强烈建议在类 Unix 环境下使用** 。

  2. **安装 Node.js** ：确保已安装 Node.js 18 或更高版本。

  3. **全局安装 Codex CLI** ：
    
        npm install -g @openai/codex
    

  4. **登录授权** ：
    
        # 使用 OpenAI 账户登录（会跳转浏览器授权）
    codex login
    
    # 或直接使用 API 密钥登录
    codex login --api-key "你的OpenAI-API密钥"
    

#### 密钥获取：

Codex无需魔法：https://717ka.com/p/ew6l8oz2h3q9gwiq95dm4oam

自备魔法版（可用网页版codex）：https://717ka.com/p/g49l27e3so5lp2czo1lx9dud

ClaudeCode（赠送Codex)： https://717ka.com/p/d1q6n6lycx1mw9c2l01pyquq

#### VS Code/Cursor 插件配置

  1. **安装插件** ：在 VS Code 或 Cursor 的插件市场搜索 **Codex** 并安装。

> **注意** ：`0.5.9` 及之后的版本有重大调整，如果无法适应，建议使用 `0.5.8` 或更早版本。

  2. **打开插件配置** ：  
![打开插件配置](https://i-blog.csdnimg.cn/img_convert/5768c54cc4f04e144c8e414384fad9b9.webp?x-oss-
process=image/format,png)

  3. **编辑`setting.json`**：点击 “在 setting.json 中编辑”，添加以下配置。这里以使用中转站为例：  
![编辑
setting.json](https://i-blog.csdnimg.cn/img_convert/fb25691a1b247f7507e560b9d87e77e9.webp?x-oss-
process=image/format,png)

    
        {
        // ... 其他配置
        "chatgpt.apiBase": "https://code.claude-opus.top/openai", // 配置你自己的中转 API 地址
        "chatgpt.config": {
            "preferred_auth_method": "apikey",
            "model": "gpt-5-codex",
            "model_reasoning_effort": "high", // 默认开启高推理模式
            "disable_response_storage": true,
            "wire_api":"responses"
        }
    }
    

  4. **配置 API Key** ：Codex 需要授权才能使用。推荐使用 **API Key** 方式。  
![选择授权方式](https://i-blog.csdnimg.cn/img_convert/b90abe967686a1349aac04a9d72a0c6b.png)

在用户主目录下找到 `~/.codex/auth.json` 文件（没有则新建），填入你的 Key：

    
        {
      "OPENAI_API_KEY": "sk-xxx...你的密钥"
    }
    

### 二、 性能拉满：解锁 Codex 的“狂暴模式”

这部分是高阶技巧的核心，我们将通过特定的命令和配置，让 Codex 发挥出 100% 的战斗力。

#### 技巧 1：满血配置启动命令

忘记简单的 `codex "..."` 吧！使用下面这条 **“满血命令”** ，直接将 Codex 的性能拉满：

    
    
    codex -m gpt-5-codex -c model_reasoning_effort="high" -c model_reasoning_summary_format=experimental --search --dangerously-bypass-approvals-and-sandbox
    

这条命令的含金量在于：

  * `-m gpt-5-codex`：**强制使用最强的 gpt-5-codex 模型** ，专为编程优化。
  * `-c model_reasoning_effort="high"`：**将推理力度拉到最高** ，让它花更多时间深度思考复杂问题。
  * `-c model_reasoning_summary_format=experimental`：**开启“解释模式”** ，每一步操作都会生成结构化总结，方便你审查它的思路。
  * `--search`：**启用网页搜索工具** ，让 Codex 能联网查询最新资料。
  * `--dangerously-bypass-approvals-and-sandbox`：**这是最刺激的狂暴模式！** 无需任何手动审批，直接在你的文件系统上执行读写操作。不完成任务誓不罢休！**（请在绝对信任的环境下使用）**

![Codex CLI
交互界面](https://i-blog.csdnimg.cn/img_convert/19607f6a936f947108361fdef4f67d03.png)

#### 技巧 2：设置专属快捷方式（Alias）

每次都输入上面那串长命令太麻烦了。通过设置 `alias`（别名），你可以用一个简短的命令来触发满血模式。

将以下命令添加到你的 `~/.bashrc`, `~/.zshrc` 或其他 shell 配置文件中：

    
    
    alias codex='codex -m gpt-5-codex -c model_reasoning_effort="high" -c model_reasoning_summary_format=experimental --search --dangerously-bypass-approvals-and-sandbox'
    

保存后，执行 `source ~/.zshrc` (或对应文件) 使其生效。现在，你只需在终端输入 `codex`，就是以满血配置启动了！

### 三、 高阶定制：让 Codex 成为你的专属专家

#### 技巧 3：用 `AGENTS.md` 喂养项目专属知识

这是 Codex 最强大的功能之一。通过在项目中创建 **`AGENTS.md`** 文件，你可以为 Codex 提供关于该项目的
**“长期记忆”和“行动指南”** 。

`AGENTS.md` 的作用类似于给 AI 看的 README，它会始终遵循文件中的规则。

  * **项目根目录`/AGENTS.md`**：定义整个项目的规范，团队共享。
  * **子目录`/AGENTS.md`**：针对特定模块的详细说明。
  * **全局`~/.codex/AGENTS.md`**：定义你的个人全局偏好。

**`AGENTS.md` 示例：**

    
    
    # AGENTS.md
    
    ## 项目简介
    这是一个基于 Next.js + TypeScript 的电商后台管理系统。
    
    ## 开发规范
    - **代码风格**：必须遵循 Prettier + ESLint 规范。
    - **命名规范**：所有组件和变量使用驼峰命名法。
    - **提交信息**：严格遵循 Conventional Commits 格式。
    
    ## 常用命令
    - **启动开发环境**：`npm run dev`
    - **运行测试**：`npm test`
    - **构建生产包**：`npm run build`
    
    ## 注意事项
    - **禁止**直接修改 `dist` 文件夹下的任何内容。
    - 开发新功能时，**必须**编写对应的单元测试。
    

#### 技巧 4：深度定制 `config.toml` 配置文件

Codex 的所有全局配置都存放在 `~/.codex/config.toml` 文件中。与 Claude Code 的 `json` 不同，Codex
使用 `toml` 格式，提供了更精细的控制。

![MCP
配置入口](https://i-blog.csdnimg.cn/img_convert/275ee57f751869a6240b4c9ac570ec1f.png)

**常用配置项：**

    
    
    # 更换默认模型
    model = "gpt-4o"
    
    # 调整默认审批策略
    # 'untrusted' (默认): 运行不信任的命令前提示
    # 'never' (完全信任): 从不提示，自动执行
    # 'on-failure': 命令在沙箱中失败时，请求许可以非沙箱模式重试
    approval_policy = "untrusted"
    
    # 配置沙箱模式
    # 'read-only' | 'workspace-write' | 'danger-full-access'
    sandbox_mode = "workspace-write"
    
    # 设置 Profile (配置文件组)，为不同场景创建独立配置
    [profiles.safe_mode]
    model = "gpt-3.5-turbo"
    approval_policy = "untrusted"
    sandbox_mode = "read-only" # 只读沙箱
    

启动时可通过 `codex --profile safe_mode "..."` 来调用特定配置。

**MCP 配置示例 (以 context7 为例):**

    
    
    [mcp_servers.Context7]
    command = "npx"
    args = ["-y", "@upstash/context7-mcp@latest"]
    

![MCP
验证](https://i-blog.csdnimg.cn/img_convert/0491fed4db08e30657421fc1e2d136b0.png)  
![MCP
使用](https://i-blog.csdnimg.cn/img_convert/c4bca1e35c6a40f243247f93926a012f.png)

#### 技巧 5：灵活的权限审批管理

在交互模式中，你可以随时通过 `/approvals` 命令来动态调整当前会话的权限级别。

![权限审批级别](https://i-blog.csdnimg.cn/img_convert/4622481df47e7874347a14d1bb72e274.png)

  * **只读 (Read Only)** : 最安全，任何修改或执行操作都需要你手动批准。
  * **自动 (Auto)** : 默认模式，允许在工作区内自动修改和运行命令，访问外部资源时会请求批准。
  * **完全访问 (Full Access)** : **最高风险** ，拥有完全的磁盘和网络访问权限，没有任何提示。

### 四、 终极工作流：打造 Codex + Claude Code 编程搭子

尽管 Codex 功能强大，尤其在 **后端逻辑、算法实现、项目重构** 等方面表现出色，但 Claude Code 在 **UI 构建、前端细节实现**
上仍有优势。最强的开发者，会让它们协同工作。

#### 核心差异对比

对比维度| Claude Code| Codex (基于 GPT-5)  
---|---|---  
**交互风格**|  热情、顺从| 简洁、专业  
**核心优势**| **UI 界面类工作、前端细节实现、快速修复小型 Bug**| **后端逻辑、算法实现、项目重构、架构设计**  
**代码质量**|  质量高，但有时会过度优化，增加代码复杂性| **改动克制，精准命中，倾向于进行最少必要改动**  
**性能**|  响应速度较快| 深度思考模式下较慢，但结果更精确  
**账号政策**|  限制较多| 仅需 Plus 订阅，账号稳定  
  
#### “左右互搏”协同工作流

这是一种通过交叉审核来确保代码质量的终极工作流：

  1. **方案设计** ：由 **Claude Code** 快速生成初步方案和前端界面。
  2. **方案评审** ：将方案交由 **Codex** 进行逻辑和架构层面的审核与“挑刺”。
  3. **达成共识** ：将 Codex 的意见反馈给 Claude Code，进行多轮讨论，直至二者对方案达成一致。
  4. **代码实现** ：由 **Claude Code** 根据最终方案编写具体代码。
  5. **代码审查 (Code Review)** ：将生成的代码交由 **Codex** 进行审查。
  6. **迭代修复** ：重复步骤 3-5，直至代码通过双方审核后提交。

![协同工作流](https://i-blog.csdnimg.cn/img_convert/6f372aa3d744510037d44e1461f91df1.webp?x-oss-
process=image/format,png)

### 五、 究极彩蛋：学习官方系统提示词

想知道 Codex 的“底层思想”吗？OpenAI 已经公开了它的系统提示词！通过学习它，你可以更好地理解其工作原理，从而写出更精准的指令。

![官方系统提示词](https://i-blog.csdnimg.cn/img_convert/cce6d6dd678f88f6aad10d0bd347ce19.png)

**官方文档地址** ：<https://github.com/openai/codex/blob/main/codex-
rs/core/gpt_5_codex_prompt.md>

* * *

