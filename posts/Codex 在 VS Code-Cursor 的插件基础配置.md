---
title: "Codex 在 VS Code/Cursor 的插件基础配置"
date: Fri Jan 02 2026 23:55:09 GMT+0800 (China Standard Time)
category: "人工智能"
tags: ["#mysql","#人工智能","#数据库","#sql"]
summary: ""
author: "xianyu120"
status: "Published"
---

#### 文章目录

  *     * Codex 在 VS Code/Cursor 的插件基础配置
    *       * 插件的 apiKey 配置

### Codex 在 VS Code/Cursor 的插件基础配置

  1. 在插件市场搜索 Codex 安装

> 插件的版本问题我还是多说一下，2025.09.16 更新了 `0.5.9` & `0.5.10` 版本，这两个插件有巨大调整，我列举一下(在
> cursor & vs code 中已经验证)，能接受的再更新，否则还是用 `0.5.8` 及以前的版本

  1. 如图打开插件配置

![eaee52127b40d6f2bea7d9fc3825f868b1552cb5_2_517x351](https://i-blog.csdnimg.cn/img_convert/934d669a0b0c5d7d644a4148f9f50068.webp?x-oss-
process=image/format,png)

  2. 打开的设置页面可以点击在 setting.json 中编辑

![6269d854f1674b734215783dd5c68a1daa213bbe_2_406x375](https://i-blog.csdnimg.cn/img_convert/8860ac6364c93239efbb31715c38de67.webp?x-oss-
process=image/format,png)

  3. setting.json 配置添加以下项：

    
    
        ## 配置自己的使用的中转站 url
        "chatgpt.apiBase": "https://code.claude-opus.top/openai",
        "chatgpt.config": {
            "preferred_auth_method": "apikey",
            "model": "gpt-5-codex",
            "model_reasoning_effort": "high",
            "disable_response_storage": true,
            "wire_api":"responses"
        }
    }
    

#### 插件的 apiKey 配置

  1. 在点击插件图标打开插件页面的时候会提示使用授权使用

  * sign in With OpenAI
  * use API Key

![image-20250917234313464](https://i-blog.csdnimg.cn/img_convert/f19ae8c97fbfa9cd6b58c45141476b5d.png)

我们使用中转站都是使用第二项，那就需要在这个目录下配置: `~/.codex/auth.json`，没有就新建一个，内容如下：

    
    
    {
      "OPENAI_API_KEY": "cr-xxx"
    }
    

key 的内容也是同在中转站获取的 key

