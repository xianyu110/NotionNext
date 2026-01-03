---
title: "Claude Code 一些使用经验分享"
date: Fri Jan 02 2026 23:56:03 GMT+0800 (China Standard Time)
category: "人工智能"
tags: ["#java","#运维","#linux"]
summary: ""
author: "xianyu120"
status: "Published"
---

上次介绍了如何安装部署Claude Code，这次介绍一些关于平时用 Claude Code 时会涉及到的功能和经验。

实际使用场景是可以直接在IDE下结合 Claude Code 一起使用，如 Cursor + Claude Code。

### **实际如何使用 Claude Code呢？**

如果你是使用官方的Claude Code，可以直接在对应的插件市场，安装对应的 Claude Code。如：VS Code、Cursor 这类IDE都支持。

![image-20250707143703677](https://i-blog.csdnimg.cn/img_convert/6f9f5c6d7d5cb52fe89edb0307b051e9.png)

如果你是跟我一样用的是 Claude Code 直连镜像的，就可以直接在IDE上的终端执行：Claude 即可。

![image-20250707143711184](https://i-blog.csdnimg.cn/img_convert/90f919d7bc930693343a85d695515254.png)

#### **1\. 建议常用 /clear 命令**

因为你在跟Claude对话持续时间太长时，产生的了太多的上下文信息，可能会得到一些意想不到的结果。 这个时候可以尝试执行 /clear
指令，可以清空历史的对话内容。

    
    
    /clear
    

#### **2\. 使用 /init 命令**

这个指令是可以在当前项目下生成一个 CLAUDE.md 文件，用来存储项目的重要信息，约定以及一些记忆。

  * 包括常用命令（构建、测试、lint）以避免重复搜索
  * 记录代码风格偏好和命名约定
  * 添加特定于您项目的重要架构模式
  * CLAUDE.md记忆可用于与团队共享的指令和您的个人偏好。

**Claude Code 目前提供两种内存位置，每种都有不同的用途：**

内存类型| 位置| 用途| 使用案例示例  
---|---|---|---  
**项目内存**| `./CLAUDE.md`| 项目的团队共享指令| 项目架构、编码标准、常见工作流程  
**用户内存**| `~/.claude/CLAUDE.md`| 所有项目的个人偏好设置| 代码样式偏好、个人工具快捷方式  
  
所有内存文件在 Claude Code 启动时都会自动加载到上下文中。

    
    
    /init
    

#### **3\. 激活 Bypass Permissions 模式**

平时 Claude Code 干活到一半时，会突然提示需要你授权后才能执行下一步。

因为 Claude Code 默认使用严格的只读权限。当需要额外操作（编辑文件、运行测试、执行命令）时，Claude Code 会请求明确的权限。

你只需要激活 Bypass Permissions
模式之后，就无需授权，他会一直自动执行下去。激活的方式，可以通过命令行的方式，也可以直接修改settings文件。

  1. 命令行参数，可以使用 `--dangerously-skip-permissions` 命令行参数来绕过所有权限检查。

    
    
    claude --dangerously-skip-permissions
    

  1. 通过设置`settings.json`文件配置的方式

    
    
    {
      "permissions": {
        "defaultMode": "bypassPermissions"
      }
    }
    

  1. 直接让 Claude Code 帮你激活打开，添加一个别名指令

    
    
    每次我在终端输入claude时，等同于 claude --dangerously-skip-permissions ，帮我设置一下这个alias
    

之后，会在你当前终端的，比如~/.zshrc下的配置增加一条别名alias

    
    
    # Claude alias
    alias claude='claude --dangerously-skip-permissions'
    

#### **4\. 深入思考模式如何开启**

Claude Code支持深度思考模式的，如果想让它进行深入思考的模式，只需要通过自然语言的方式要求它就可以进入。

比如下面这几条提问，涉及到相关的关键词时，它就会进入深度思考：

    
    
    > 我需要使用OAuth2为我们的API实现一个新的身份验证系统。深入思考在我们的代码库中实现这一点的最佳方法。
    > 思考这种方法中潜在的安全漏洞 
    > 更深入地思考我们应该处理的边缘情况
    

遇到复杂的问题时，建议使用这种深入思考模式，但是消耗的积分和Tokens也是相对比较大。

#### **5\. 如何读取文件和处理图片？**

Claude Code 是支持多模态的形式的，而且它也能调用MCP等。如果你想处理图片信息时，可以用这几种方式。

a. 将图像拖放到Claude Code窗口中（在MacOS上） b. 复制图像并使用`Ctrl+v`粘贴到CLI中（在MacOS上） c.
通过对话，提供图像路径

    
    
    帮我分析这个图像：/path/to/your/image.png
    

当然了，你完全可以使用自然语言要求它进行工作，如：

    
    
    > 这是错误的截图。是什么导致了它？ 
    > 这个图像显示了什么？ 
    > 描述这个截图中的UI元素 
    > 生成CSS以匹配这个设计模型 
    > 什么HTML结构可以重新创建这个组件？ 
    

#### **6\. 如何查看历史聊天记录？**

可以直接使用 Claude Code 自带的指令:

    
    
    /resume
    

会显示一个交互式对话选择器，显示:

  * 对话开始时间
  * 初始提示或对话摘要
  * 消息数量

![image-20250707143720499](https://i-blog.csdnimg.cn/img_convert/3980c48b5a788aae81423b86bf8a5974.png)

### **国内使用 Claude Code 教程**

**我是通过使用 Claude Code 直连镜像的，无需魔法，也不用担心封号问题，费用也比较低。**

怎么使用和安装对应的直连镜像，可以参考这篇文章：[用了 Claude Code 之后，我不再续费 Cursor 了！国内使用 Claude Code 教程-
CSDN博客](https://blog.csdn.net/xianyu120/article/details/149026668?spm=1001.2014.3001.5501)

### **Claude Code 和 Cursor 的区别**

最后，讲一下 Claude Code 和 Cursor 两者的区别吧。 简单理解的话，就一句话：**“Claude Code是你的AI编程助手， 而
Cursor 是一个代码编辑器 IDE。 ”**

即使你没有编程过，Claude Code 可以独立的自己卷自己几个小时后，一次性完成项目，目前还没有其他AI编程工具可以做到这一点的。

Claude Code 可以让你体验 Vibe Coding 的快乐，可以边健身边编程。

