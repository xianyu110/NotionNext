---
title: "Cursor 使用 One API 配置 Anthropic Claude BaseURL 指南"
date: Fri Jan 02 2026 23:57:54 GMT+0800 (China Standard Time)
category: "人工智能"
tags: ["#人工智能"]
summary: ""
author: "xianyu120"
status: "Published"
---

### 背景

Cursor [IDE](https://so.csdn.net/so/search?q=IDE&spm=1001.2101.3001.7020)
原生只支持配置 ChatGPT 的 API Base URL,无法直接使用 Anthropic Claude 的 API。

本指南将介绍如何通过[One
API](https://so.csdn.net/so/search?q=One%20API&spm=1001.2101.3001.7020)来解决这个问题,实现在Cursor中使用Claude
API。

### 前置条件

#### 部署One API

https://github.com/songquanpeng/one-api

#### 获取Anthropic Claude API密钥

  * 可使用Anthropic官方密钥或中转平台密钥

  * 中转平台示例: https://api.maynor1024.live/

### 配置步骤

#### 在One API中创建频道

![](https://i-blog.csdnimg.cn/direct/1c8d6941272f41aa999b2d5389dd3cbe.png)

  * 类型: 选择"代理类型",如OpenRouter

  * 模型[重定向](https://so.csdn.net/so/search?q=%E9%87%8D%E5%AE%9A%E5%90%91&spm=1001.2101.3001.7020): 自定义模型名称(避免使用含"Claude"的关键词)。这里自定义好自己的模型名称，需要跟平台的名称对应，注意自定义的名称不要带 Claude 那些模型的关键字，否则会被 cursor 拦截。

  * 模型: 填入自定义的模型名称

  * 代理: 填写中转平台域名(使用Anthropic原生API则可不填)

![202410251536358](https://img-
blog.csdnimg.cn/img_convert/abda4a9757533da3e59ef8d0d3fb7e99.png)

#### 创建令牌

  1. 名称：自定义，随便一个

  2. 模型范围：选择刚创建的自定义模型名称，授权给这个令牌。

  3. 其他选项按需设置。

![](https://i-blog.csdnimg.cn/direct/1f2787a7a3104865ac2dbb9f54d7657c.png)

#### Cursor 配置

在Settings - Models中:

  * OpenAI API Key: 填入刚创建的API令牌

  * OpenAI Base URL: 填入One API部署地址(如http://myip:port/v1)

  * Add model: 添加自定义模型名称，这里要填自定义的模型名称，不能是真实的名称。

#### 使用方法

在Cursor中选择配置的自定义模型名称即可使用。

#### 注意事项

配置时请使用自定义模型名称,避免使用 Anthropic 原始模型名称,否则可能被 Cursor 拦截。

通过以上步骤,您可以在 Cursor IDE 中成功使用 Anthropic Claude API。如有疑问,欢迎随时询问。

![](https://i-blog.csdnimg.cn/direct/207cc85856b641ca9781b7d35583f6b0.png)

