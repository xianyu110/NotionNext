---
title: "Claude Code 快速入门指南"
date: Fri Jan 02 2026 23:55:50 GMT+0800 (China Standard Time)
category: "人工智能"
tags: ["#人工智能"]
summary: ""
author: "xianyu120"
status: "Published"
---

#### 文章目录

  * Claude Code 快速入门指南
  *     * 1\. 安装与配置
    *       * 1.1 系统要求
      * 1.2 安装步骤
    * 2\. API密钥获取与配置
    *       * 2.1 注册账户
      * 2.2 创建API密钥
    * 3\. 配置文件设置
    *       * 3.1 API密钥配置
      * 3.2 权限设置（可选）
      * 3.3 工作目录配置（可选）
      * 3.4 省流、一键脚本
    * 4\. 基础使用
    *       * 4.1 启动方式
      * 4.2 常用命令
      * 4.3 快捷键
    * 5\. 高级功能
    *       * 5.1 CLI参考
      * 5.2 交互式模式
      * 5.3 斜杠命令
    * 6\. 实战教程
    *       * 6.1 理解新代码库
      * 6.2 高效修复Bug
      * 6.3 代码重构
      * 6.4 处理测试
      * 6.5 创建Pull Request
      * 6.6 处理文档
      * 6.7 使用图像
      * 6.8 设置项目记忆
      * 6.9 Unix风格实用程序
      * 6.10 MCP服务器配置
    * 7\. 进阶特性
    *       * 7.1 IDE集成
      * 7.2 模型切换和配置
      * 7.3 上下文管理
      * 7.4 对话恢复
      * 7.5 图像处理
      * 7.6 深入思考
      * 7.7 Git高级操作
      * 7.8 其他高级功能
    * 8\. 常见问题解决
    *       * 8.1 存储记忆问题
      * 8.2 模型名称问题
      * 8.3 命令行错误
      * 8.4 清理Claude Code
      * 8.5 API错误
      * 8.6 OAuth验证错误
      * 8.7 响应超时问题
    * 9\. 结语

## Claude Code 快速入门指南

欢迎使用Claude Code！这个强大的AI编程助手能够帮助您提高编程效率，自动化开发任务。

### 1\. 安装与配置

#### 1.1 系统要求

  * **操作系统** : macOS 10.15+, Ubuntu 20.04+/Debian 10+, 或 Windows via WSL
  * **硬件** : 4GB+ RAM
  * **软件** : Node.js 18+
  * **网络** : 需要互联网连接进行身份验证和AI处理

#### 1.2 安装步骤

使用npm进行全局安装：

    
    
    npm install -g @anthropic-ai/claude-code
    

**重要** : 不要使用 `sudo npm install -g`，这可能导致权限问题和安全风险。

安装完成后，导航到您的项目目录并启动Claude Code：

    
    
    cd your-awesome-project
    claude
    

### 2\. API密钥获取与配置

#### 2.1 注册账户

  1. 访问 **<https://apipro.maynor1024.live>**
  2. 点击 **注册按钮** 创建新账户
  3. 填写必要的注册信息

#### 2.2 创建API密钥

  1. 登录成功后，进入 **API密钥管理页面**
  2. 创建一个新的API密钥分组
  3. 选择 **“ClaudeCode”** 作为分组名称
  4. **生成并复制** 您的API密钥

### 3\. 配置文件设置

#### 3.1 API密钥配置

创建或编辑配置文件：

  * **用户设置 (全局)** : `~/.claude/settings.json`
  * **项目设置 (项目级)** : `.claude/settings.json`

配置文件示例：

    
    
    {
        "env": {
          "ANTHROPIC_API_KEY": "您的APIkey",
          "ANTHROPIC_BASE_URL": "https://apipro.maynor1024.live",
          "CLAUDE_CODE_MAX_OUTPUT_TOKENS": 64000,
          "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": 1,
          "CLAUDE_MODEL": "Claude模型名称"
        },
        "permissions": {
          "allow": [],
          "deny": []
        }
      }
    

#### 3.2 权限设置（可选）

Claude Code采用保守的权限策略，默认需要用户确认可能修改系统的操作。您可以自定义允许的工具列表：

  * 使用 **/permissions** 命令添加或移除工具
  * 编辑 **settings.json** 文件进行批量配置
  * 使用 **–allowedTools** CLI标志设置会话特定权限

#### 3.3 工作目录配置（可选）

配置Claude可以访问的附加工作目录：

    
    
    {
      "permissions": {
        "additionalDirectories": ["../docs/", "../shared/"]
      }
    }
    

#### 3.4 省流、一键脚本

购买了API之后，只需要修改这个脚本第8行的`readonly API_KEY=""`，填上你的APIkey(令牌)，再将这个脚本保存为
**claudecode.sh** ，然后打开终端：

    
    
    chmod +x claudecode.sh
    ./claudecode.sh
    

跟着提示走就好了。

    
    
    #!/bin/bash
    
    # ==============================================================================
    # 🔧 配置区域 - 请在这里设置您的 API 配置
    # ==============================================================================
    
    # 🔑 API 密钥 - 请填入您的 API 密钥
    readonly API_KEY=""
    
    # 🌐 API 基础地址 - 请填入您的 API 基础地址 (例如: "https://apipro.maynor1024.live")
    readonly API_BASE_URL="https://apipro.maynor1024.live"
    
    # ==============================================================================
    # 以下内容请勿修改
    # ==============================================================================
    
    # 脚本常量
    readonly CLAUDE_COMMAND="claude"
    readonly NPM_PACKAGE="@anthropic-ai/claude-code"
    readonly CLAUDE_DIR="$HOME/.claude"
    readonly SETTINGS_FILE="$CLAUDE_DIR/settings.json"
    
    # ... (脚本其余部分保持不变) ...
    

### 4\. 基础使用

#### 4.1 启动方式

**交互式模式**

    
    
    claude
    

**带初始提示启动**

    
    
    claude "explain this project"
    

**非交互式模式**

    
    
    claude -p "explain this function"
    

**处理管道输入**

    
    
    cat logs.txt | claude -p "explain"
    

#### 4.2 常用命令

  * `claude update` \- 更新到最新版本
  * `claude -c` \- 继续最近的对话
  * `claude -r <session-id>` \- 恢复特定会话
  * `claude mcp` \- 配置MCP服务器

#### 4.3 快捷键

**通用控制**

  * **Ctrl+C** : 取消当前输入或生成
  * **Ctrl+D** : 退出Claude Code会话
  * **Ctrl+L** : 清除终端屏幕
  * **Up/Down** : 浏览命令历史
  * **Esc + Esc** : 编辑上一条消息

**多行输入**

  * **\ + Enter** : 适用于所有终端
  * **Option+Enter** : macOS默认
  * **Shift+Enter** : 执行`/terminal-setup`后可用

### 5\. 高级功能

#### 5.1 CLI参考

Claude Code提供丰富的命令行选项来自定义其行为：

**基础CLI命令**

命令| 描述| 示例  
---|---|---  
**`claude`**|  启动交互式REPL| `claude`  
**`claude "query"`**|  带初始提示启动REPL| `claude "explain this project"`  
**`claude -p "query"`**|  通过SDK查询后退出| `claude -p "explain this function"`  
**`claude -c`**|  继续最近的对话| `claude -c`  
**`claude update`**|  更新到最新版本| `claude update`  
  
**重要CLI标志**

标志| 描述| 示例  
---|---|---  
**`--allowedTools`**|  允许的工具列表| `--allowedTools "Bash(git log:*)" "Read"`  
**`--verbose`**|  启用详细日志| `claude --verbose`  
**`--model`**|  设置使用的模型| `claude --model claude-sonnet-4`  
**`--permission-mode`**|  指定权限模式| `claude --permission-mode plan`  
**`--dangerously-skip-permissions`**|  跳过权限提示（谨慎使用）| `claude --dangerously-
skip-permissions`  
  
#### 5.2 交互式模式

**Vim模式**  
启用vim风格编辑：

    
    
    /vim
    

**模式切换**

  * **Esc** : 进入NORMAL模式
  * **i** : 在光标前插入
  * **a** : 在光标后插入
  * **o** : 在下方新建行

**导航（NORMAL模式）**

  * **h/j/k/l** : 左/下/上/右移动
  * **w** : 下一个单词
  * **0** : 行首
  * **$** : 行尾
  * **gg** : 文本开头
  * **G** : 文本结尾

#### 5.3 斜杠命令

**基础命令**

命令| 描述| 示例  
---|---|---  
**/help**|  显示帮助信息| `/help`  
**/clear**|  清除对话历史| `/clear`  
**/config**|  管理配置| `/config`  
**/permissions**|  管理权限| `/permissions`  
**/vim**|  启用vim模式| `/vim`  
  
**高级命令**

命令| 描述| 功能  
---|---|---  
**/init**|  初始化项目| 自动生成CLAUDE.md文件  
**/terminal-setup**|  设置终端| 配置键盘快捷键  
**/project: <command>**| 项目特定命令| 运行项目自定义命令  
  
**自定义斜杠命令**

  1. 在 `.claude/commands/` 目录创建Markdown文件
  2. 文件名即为命令名
  3. 内容为命令模板，可使用 **`$ARGUMENTS`** 占位符

### 6\. 实战教程

#### 6.1 理解新代码库

**快速了解代码库概况**

> 给我一个代码库概览
>
> 解释这里使用的主要架构模式
>
> 关键的数据模型有哪些？
>
> 认证是如何处理的？

**小技巧：** 从广泛的问题入手，然后逐步聚焦到具体领域。

**查找相关代码**

> 查找处理用户认证的文件
>
> 这些认证文件是如何协同工作的？
>
> 从前端到数据库，跟踪登录过程

**小技巧：** 明确你想要查找的内容，使用项目中领域特有的语言。

#### 6.2 高效修复Bug

**诊断错误消息**

> 我在运行 npm test 时看到错误
>
> 提供一些修复 user.ts 中 @ts-ignore 的方法
>
> 更新 user.ts，添加你建议的 null 检查

**小技巧：** 告诉 Claude 用于重现问题的命令，并提供堆栈跟踪。

#### 6.3 代码重构

**现代化旧代码**

> 查找我们代码库中弃用的 API
>
> 建议如何重构 utils.js，使用现代 JavaScript 特性
>
> 重构 utils.js，使用 ES2024 特性，同时保持原有行为
>
> 对重构后的代码运行测试

**小技巧：** 进行小步、可测试的增量式重构。

#### 6.4 处理测试

**添加测试覆盖率**

> 查找 NotificationsService.swift 中未覆盖的函数
>
> 为通知服务添加测试
>
> 为通知服务中的边缘情况添加测试用例
>
> 运行新测试，修复任何失败

**小技巧：** 要求覆盖边缘情况和错误条件的测试。

#### 6.5 创建Pull Request

**生成全面的PR**

> 总结我对认证模块所做的更改
>
> 创建一个 PR
>
> 增强 PR 描述，补充有关安全性改进的更多信息
>
> 添加关于如何测试这些更改的信息

**小技巧：** 直接要求 Claude 为你创建一个 PR，并在提交前审查。

#### 6.6 处理文档

**生成代码文档**

> 查找 auth 模块中没有适当 JSDoc 注释的函数
>
> 为 auth.js 中未注释的函数添加 JSDoc 注释
>
> 改进生成的文档，增加更多上下文和示例
>
> 检查文档是否符合我们项目的标准

**小技巧：** 指定你所需的文档风格（如 JSDoc、docstrings 等）。

#### 6.7 使用图像

**分析图像和屏幕截图**

  1. **将图像拖入** Claude Code 窗口
  2. **复制并粘贴** 图像至 CLI (ctrl+v)
  3. **提供图像路径** ：`> 分析此图像：/path/to/your/image.png`

**请求 Claude 分析图像：**

> 这是错误的截图，是什么导致了它？
>
> 生成与这个设计草图匹配的 CSS
>
> 用什么 HTML 结构可以重建这个组件？

**小技巧：** 提供错误、UI 设计或图表的截图，以便获得更好的上下文。

#### 6.8 设置项目记忆

**创建有效的CLAUDE.md文件**

> /init

**小技巧：** 在 **CLAUDE.md** 中包括常用命令（如构建、测试、检查）、代码风格偏好和重要架构模式。

#### 6.9 Unix风格实用程序

**添加到验证过程**

    
    
    // package.json
    {
      "scripts": {
        "lint:claude": "claude -p '你是一个代码检查工具...'"
      }
    }
    

**管道输入输出**

    
    
    cat build-error.txt | claude -p '简明扼要地解释这个构建错误的根本原因' > output.txt
    

#### 6.10 MCP服务器配置

**添加 MCP Stdio 服务器：**

  * `claude mcp add my-server -e API_KEY=123 -- /path/to/server arg1 arg2`

**管理 MCP 服务器：**

  * `claude mcp list`
  * `claude mcp get my-server`
  * `claude mcp remove my-server`

### 7\. 进阶特性

#### 7.1 IDE集成

  * Claude Code 支持 **VSCode** 与 **JetBrains** 。
  * 在 VSCode 内置终端唤起 Claude Code，插件将 **自动安装** 。
  * JetBrains 用户需手动下载插件。
  * 使用 **`/ide`** 命令测试连接。

#### 7.2 模型切换和配置

  * 强烈推荐使用 **Claude 4 Sonnet** （计费倍率仅为Opus的1/5）。
  * 使用 **/model** 命令在 Claude Code 中切换模型。

#### 7.3 上下文管理

  * 对于长上下文，建议使用 **/compact [您的描述]** 命令来压缩以节省点数。

#### 7.4 对话恢复

  * `claude --continue`：恢复 **上次** 的对话。
  * `claude --resume`：显示 **交互式对话选择器** ，选择历史会话。

#### 7.5 图像处理

  * **拖放图像** 、**粘贴图像** 或 **提供图像路径** 。

  * 使用自然语言提问，例如：

> 这是错误的截图。是什么导致了它？
>
> 生成CSS以匹配这个设计模型。

#### 7.6 深入思考

  * 通过自然语言要求其进行 **深入思考** 。

> 我需要使用OAuth2为我们的API实现一个新的身份验证系统。**深入思考** 在我们的代码库中实现这一点的最佳方法。
>
> **思考** 这种方法中潜在的安全漏洞。

#### 7.7 Git高级操作

  * 支持使用自然语言操作Git，如：**`> 提交我的更改`**、**`> 创建一个 pr`**。
  * 使用 **Git工作树** (`git worktree add ...`) 创建隔离的编码环境。

#### 7.8 其他高级功能

  * 支持用作 **类Unix工具** 。
  * 支持 **自定义斜杠指令** 。
  * 支持 **GitHub Actions集成** 和 **SDK开发** 。

### 8\. 常见问题解决

#### 8.1 存储记忆问题

Claude Code 将记忆存储在 **`~/.claude`** 中，请不要删除此目录。

#### 8.2 模型名称问题

这是由于Claude Code在处理简单任务时，不会使用Claude 4系列模型。

#### 8.3 命令行错误

此类问题在 **WSL** 上常见，是Agent自身的错误。推荐使用 **MacOS/Ubuntu** 。

#### 8.4 清理Claude Code

执行以下命令清理Claude Code的登录信息：

    
    
    rm ~/.claude* -rf
    

#### 8.5 API错误

遇到 **API Error** 、**Tools Error** 通常是网络问题，请退出后使用 `claude -c` 重新执行。

#### 8.6 OAuth验证错误

  * 确保环境变量中 **没有配置任何代理** 。
  * 如果问题依旧，**复制终端中的链接** 并通过验证码方式验证。

#### 8.7 响应超时问题

  * 按下 **`ctrl+c`** 并重启Claude Code。
  * 如果命令行无响应，杀死进程并使用 **`claude -c`** 恢复上次的会话。

### 9\. 结语

Claude Code是一个强大的AI编程助手。建议您：

  * 从 **基础功能** 开始，逐步探索高级特性。
  * 根据项目需求 **定制配置** 。
  * 利用 **CLAUDE.md** 文件记录项目特定信息。
  * 合理使用 **权限管理** 确保安全。
  * 探索 **MCP** 和 **自定义命令** 扩展功能。

祝您使用愉快！

