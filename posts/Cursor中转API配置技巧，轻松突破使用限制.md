---
title: "Cursor中转API配置技巧，轻松突破使用限制"
date: Fri Jan 02 2026 23:57:06 GMT+0800 (China Standard Time)
category: "技术分享"
tags: ["#程序人生"]
summary: ""
author: "xianyu120"
status: "Published"
---

### 前言

从年中cursor开源以来，逐渐火遍全网，成为编程的又一更强力助手，在亲身使用了三个月后写下该教程，供广大开发者参考，cursor的使用十分简单，看完你会了解到集成了先进LLM的cursor在编程方面的强大以及如何使用中转API实现Cursor编程自由。

* * *

### **一、cursor是什么？**

cursor是一个集成了GPT4、Claude
3.5等先进LLM的类vscode的编译器，可以理解为在vscode中集成了AI辅助编程助手，从下图中的页面可以看出cursor的布局和vscode基本一致，并且cursor的使用操作也和vscode一致，包括extension下载、[python编译器](https://so.csdn.net/so/search?q=python%E7%BC%96%E8%AF%91%E5%99%A8&spm=1001.2101.3001.7020)配置、远程服务器连接和settings等，如果你是资深vscode用户，那么恭喜你可以直接无缝衔接cursor。当然，如果你是和我一样的pycharm选手，你也可以很快上手cursor。

![Cursor界面与VSCode对比](https://img-
blog.csdnimg.cn/img_convert/f17635287a9b545df6a14aafd6f715c8.png)
Cursor界面与VSCode对比

### 二、使用步骤

#### 1.cursor的下载

cursor直接在官网下载安装即可，并且注册账号，在第一次打开cursor时输入账号信息即可。

> cursor官网：https://www.cursor.com/

下载页面：

![Cursor官网下载页面](https://img-
blog.csdnimg.cn/img_convert/0a1d008a829cea3c597ecbf2503cb31e.png) Cursor官网下载页面

`在注册完成后，你会有一个专属账号，每个账号的模型调用次数是有限的，其中GPT4和Claude3.5的免费调用次数为500次，其它比较弱的模型的调用次数无上限（包括新推出的o1-mini，很良心有木有）。`

![Cursor账号模型调用次数限制](https://img-
blog.csdnimg.cn/img_convert/eddf44ea42d3b3637b36bf97bf36808a.png)
Cursor账号模型调用次数限制

点击最上面的框，输入>language，可以配置简体中文。

![Cursor语言设置](https://img-
blog.csdnimg.cn/img_convert/57769abaa4a226744e8ac3dc5ed0468d.png) Cursor语言设置

#### 2.内置模型

cursor内置了很多LLMs，包括最先进的GPT4s、Claude3.5s和openai最新发布的推理模型o1-preview和o1-mini，在右上角的设置中即可打开相应的模型进行辅助编程。平时用的最多的还是Claude3.5和GPT4，因为代码能力真的很强悍，后面会展示。

![Cursor内置模型列表](https://img-
blog.csdnimg.cn/img_convert/b05f99878bdccc4701a233c7ce84b76f.png) Cursor内置模型列表
![Cursor模型选择界面](https://img-
blog.csdnimg.cn/img_convert/8ecf769090cf8910fd135948a58b0b4a.png) Cursor模型选择界面

#### 3.常用快捷键

cursor最常用的快捷键就四个，非常好记：

> Tab：自动填充
>
> Ctrl+K：编辑代码
>
> Ctrl+L：回答用户关于代码和整个项目的问题，也可以编辑代码（功能最全面）
>
> Ctrl+i：编辑整个项目代码（跨文件编辑代码）

### 如何使用中转API实现Cursor编程自由？

今天介绍了Cursor的下载和使用，集成了LLM的编译器更加强大，并且极易上手，在使用了三个月后也是慢慢和Cursor在编程上形成了默契，相比较之前的GitHub
copilot，Cursor能力更强更全面。

但唯一的困扰是模型的使用次数有限制，**超过次数就要收费**
，下面介绍如何快速解决这个问题，希望Cursor的出现能给广大码友释放双手，留有更多的时间学习技术，关注技术本身。

### 中转API地址

https://apipro.maynor1024.live/

由于Cursor [IDE](https://so.csdn.net/so/search?q=IDE&spm=1001.2101.3001.7020)
原生只支持配置 ChatGPT 的 API Base URL,无法直接使用 Anthropic Claude 的 API。

我们需要配置在cursor openAI API key配置，需要用到base URL和API key

![Cursor OpenAI API配置界面](https://img-
blog.csdnimg.cn/img_convert/387eb8c8b23be8f1ea207a0fdbd40c4c.png) Cursor
OpenAI API配置界面

base URL填写：https://apipro.maynor1024.live/v1

API key 示例：sk-xxxxxxxx ,在中转平台充值后创建令牌并复制

![中转平台API令牌创建](https://img-
blog.csdnimg.cn/img_convert/88cb4afe5983053c427bb026f36ced2c.png) 中转平台API令牌创建

填写完成后点击verify验证成功后打开开关

![Cursor API配置验证](https://img-
blog.csdnimg.cn/img_convert/da252794d91a9ec534780ddb8d4c3b42.png)
_图：Cursor设置界面 - 配置API密钥和基础URL_

然后添加cursor专属模型：**cursor-3-5-sonnet-20240620** ，即可开始使用

![Cursor专属模型添加](https://img-
blog.csdnimg.cn/img_convert/a5127aeba644c49fbdfe8696a2538a72.png) Cursor专属模型添加
![Cursor模型选择界面](https://img-
blog.csdnimg.cn/img_convert/566dbfa2aa884aaf153a03997c44b839.png) Cursor模型选择界面

验证是否是Claude-sonnet-3.5：

![Claude-sonnet-3.5验证结果](https://img-
blog.csdnimg.cn/img_convert/3cd60061a789a8f577510b569a06b2d2.png) Claude-
sonnet-3.5验证结果

验证成功！

本文由[ mdnice ](https://mdnice.com/?platform=4)多平台发布

