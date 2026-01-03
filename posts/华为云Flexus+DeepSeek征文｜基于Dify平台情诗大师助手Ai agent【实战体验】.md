---
title: "华为云Flexus+DeepSeek征文｜基于Dify平台情诗大师助手Ai agent【实战体验】"
date: Fri Jan 02 2026 23:56:15 GMT+0800 (China Standard Time)
category: "人工智能"
tags: ["#华为云","#人工智能"]
summary: ""
author: "xianyu120"
status: "Published"
---

#### 文章目录

  * 华为云Flexus+DeepSeek征文｜基于Dify平台情诗大师助手Ai agent【实战体验】
  *     * 一、技术架构简介
    *       * 1.1 Dify平台：低代码AI应用开发引擎
      * 1.2 华为云Flexus：弹性云基础设施
      * 1.3 DeepSeek：深度推理与多模态理解引擎
    * 二、Dify-LLM应用开发平台快速搭建
    *       * 2.1 模型部署流程
      * 2.2 Dify企业级AI Agent平台设置
    * 三、情诗大师助手AI Agent搭建全流程
    * 四、体验与优化
    * 五、总结

## 华为云Flexus+DeepSeek征文｜基于Dify平台情诗大师助手Ai agent【实战体验】

在人工智能技术高速发展的当下，如何利用AI智能体赋能传统文化表达，帮助用户突破情感表达障碍，成为一项创新性的探索。本文将详细介绍如何**基于Dify平台**
，快速搭建和使用“情诗大师助手AI Agent”——助力用户创作浪漫诗歌，实现高品质情感传达的智能AI助手项目实践。

### 一、技术架构简介

#### 1.1 Dify平台：低代码AI应用开发引擎

该解决方案基于Dify开源生成式AI应用开发平台，配合云容器引擎CCE，可实现快速部署高可用的LLM智能体。Dify
平台以模块化架构、可视化编排流程，为情诗大师助手的开发与扩展提供全流程支持。  
主要特性包括：

  * **AI工作流构建** ：拖拽式设计对话逻辑，灵活组合不同交互节点（如诗歌生成、模板切换、个性化定制等）。
  * **多模态交互** ：除文本外，平台更支持图片、语音等多模态信息处理，提升交互体验。
  * **RAG增强** ：对接相关诗词知识库，实现高质量文本检索与理解。

![img](https://i-blog.csdnimg.cn/img_convert/7ab0c003a72b5a0aa05d57961b5931c2.png)

![image-20250520204123342](https://i-blog.csdnimg.cn/img_convert/42b74fed56eb711702c94a7e99905f79.png)

#### 1.2 华为云Flexus：弹性云基础设施

华为云Flexus系列服务为AI助手提供高性价比算力保障：

  * **Flexus X实例** ：动态弹性资源调度，应对情人节、七夕等表白高峰并发需求。
  * **智能数据洞察** ：盘古大模型对用户对话日志实时分析，优化内容和推荐方向。
  * **企业搜索服务** ：构建诗歌知识图谱，辅助用户检索诗歌意象、风格、修辞等。

![image-20250520204148067](https://i-blog.csdnimg.cn/img_convert/897c26c65f2d1bfa3c00479a9de670b2.png)

#### 1.3 DeepSeek：深度推理与多模态理解引擎

DeepSeek作为智能体核心模块，具备强大的自然语言理解和逻辑推理能力：

  * **复杂逻辑推理** ：多轮对话递进引导、个性化情诗生成建议。
  * **风格迁移与模板扩展** ：可根据用户偏好自动推荐和切换不同诗歌风格。
  * **跨模态学习** ：如分析用户上传的情侣照片或表白场景，为诗歌提供灵感和定制化表达。

![image-20250520204209629](https://i-blog.csdnimg.cn/img_convert/4a2ccb2356516834541929b6425ba5f9.png)

* * *

### 二、Dify-LLM应用开发平台快速搭建

#### 2.1 模型部署流程

  1. 访问 **华为云ModelArts Studio** 平台首页。

![image-20250520204551049](https://i-blog.csdnimg.cn/img_convert/f69d006c5e36f3d1ad9e94cd9b9b9e0b.png)

  2. 进入 ModelArts Studio 控制台，选择“模型推理 - 在线推理”模块。

![image-20250520204659094](https://i-blog.csdnimg.cn/img_convert/1871d859e908a48c3d75eabd5544e200.png)  
![image-20250520204751448](https://i-blog.csdnimg.cn/img_convert/1b9fd73b5f191bd71957f6cda9f52ed4.png)

  3. 跳转至  
https://www.huaweicloud.com/solution/implementations/building-a-dify-llm-
application-development-platform.html  
，依照页面提示使用“一键部署”功能进行快速环境搭建。

![image-20250520191804817](https://i-blog.csdnimg.cn/img_convert/4de4a236f692b022981668091a46c432.png)

  4. 后续按指引步骤选择云服务器，设置密码，确认预估消费金额并完成部署。

![image-20250521095434509](https://i-blog.csdnimg.cn/img_convert/b3efb7768ee2df6896d0eddfc27742ba.png)  
![image-20250520191902486](https://i-blog.csdnimg.cn/img_convert/15a8c9babadf4089a6c38e45a83aad3e.png)  
![image-20250521095510783](https://i-blog.csdnimg.cn/img_convert/81ba049cd8b899c43788f1cec20a09b0.png)  
![image-20250520191922127](https://i-blog.csdnimg.cn/img_convert/d28324c0fb2878ed69e781620f006988.png)  
![image-20250520191945377](https://i-blog.csdnimg.cn/img_convert/b43e59f18ccc4d6a8b07f0faf1795acd.png)  
![image-20250521095617819](https://i-blog.csdnimg.cn/img_convert/19848164920c8260eb74110bfa7e7b58.png)  
![image-20250521100338853](https://i-blog.csdnimg.cn/img_convert/e5704cd7ed21039d184ebc24434909ba.png)  
![image-20250521100514050](https://i-blog.csdnimg.cn/img_convert/b14b587621597675abba71dcc348f8c4.png)

> 注：该方案按需计费，停用/删除方可终止计费。

#### 2.2 Dify企业级AI Agent平台设置

Dify平台面向企业级AI Agent开发，主打可视化、低门槛和强扩展性。流程简明：

  * 登录Dify后台，创建管理员账号：  
![image-20250520194958635](https://i-blog.csdnimg.cn/img_convert/1f1be0afabb2f3e3a68489c78895015a.png)

  * 新建“空白应用”，自定义智能体：  
![image-20250520195043985](https://i-blog.csdnimg.cn/img_convert/887484d604a1d817cf0ee254b0277d1c.png)

* * *

### 三、情诗大师助手AI Agent搭建全流程

应用名称：**情诗大师助手**

产品定位：帮助用户根据表达需求、对象信息、场景内容等，生成个性化、情感真挚且结构优美的浪漫情诗。

开发与配置流程包含：

  1. **内容创作**  
![image-20250520195722594](https://i-blog.csdnimg.cn/img_convert/70753cfda775888fa909ef2638725272.png)

  2. **智能体提示词设定** （可借助DeepSeek生成）  
![image-20250521101307530](https://i-blog.csdnimg.cn/img_convert/4635bccc8993f920d866c48404aa47da.png)  
![image-20250521101416941](https://i-blog.csdnimg.cn/img_convert/4cdc633822c1cc324c58d30c82c8e42f.png)

  3. **模型接入流程**  
![image-20250520205904253](https://i-blog.csdnimg.cn/img_convert/6722f9c3e53c644086945ac53e2392c6.png)

  4. **API Key配置**  
![image-20250521101505590](https://i-blog.csdnimg.cn/img_convert/3400f71ae58cd1860f4feea186df3045.png)

  5. **模型供应商选择与DeepSeek引擎集成（OpenAI-API-Compatible）**  
![image-20250521101825794](https://i-blog.csdnimg.cn/img_convert/6eebabc33373931508a02755c547d8b8.png)  
![image-20250521101837717](https://i-blog.csdnimg.cn/img_convert/01342c2a1a8a63afd12b2fd332cf5683.png)  
![image-20250521102347156](https://i-blog.csdnimg.cn/img_convert/a3d8bc5d49cea3405c73a1094e0d4c32.png)  
![在这里插入图片描述](https://i-blog.csdnimg.cn/img_convert/e1b9d3330dcde6a8d06e188534f2f4f9.png)  
![image-20250521102527474](https://i-blog.csdnimg.cn/img_convert/47f23899f119608138f929a5e097ca2f.png)  
![在这里插入图片描述](https://i-blog.csdnimg.cn/img_convert/1a3e8f211376ccd39000c3c80d2b3103.png)  
![image-20250521102543538](https://i-blog.csdnimg.cn/img_convert/4e166db1e9d227c1eb9c153f4cb3a242.png)  
![image-20250521102855407](https://i-blog.csdnimg.cn/img_convert/a4f7457ba29363c10715bbbab103f715.png)  
![image-20250521102647537](https://i-blog.csdnimg.cn/img_convert/af79a58669ec96c7698da04732b2050a.png)  
![image-20250521102659403](https://i-blog.csdnimg.cn/img_convert/2d1b67c9b6f67af89a0bdfe1312f07cb.png)

  6. **提示词配置示例** （极致个性化与场景适配）

    
    
    # Role: 情诗大师助手
    
    ## Profile
    - author: LangGPT
    - version: 1.0
    - language: 中文
    - description: 该助手旨在帮助用户创作浪漫、优美的情诗，用以表白或表达对心仪之人的爱意，言辞真挚而深情，力求触动人心。
    
    ## Skills
    - 生成富有情感的诗歌，能够表达爱情、倾诉心声。
    - 使用浪漫、深情的词句和优美的修辞，确保诗歌具有诗意和韵律感。
    - 根据用户的要求调整情诗的风格、语气及情感浓度。
    ……
    

* * *

### 四、体验与优化

  1. **示例交互与生成**  
![image-20250521103112301](https://i-blog.csdnimg.cn/img_convert/89c6191d4863dbd1e9d3cf1f0562c5bc.png)

  2. **优化参数调整**  
![image-20250521103622594](https://i-blog.csdnimg.cn/img_convert/7b5bf2c2e0bbff07b0606ec6cf4237de.png)

  3. **应用发布测试**  
![image-20250521103227738](https://i-blog.csdnimg.cn/img_convert/2189d76a82d75ebba1b42234ea15dd89.png)  
![image-20250521103326792](https://i-blog.csdnimg.cn/img_convert/c752b2165be9a9682d88768a682aca99.png)

* * *

### 五、总结

通过Dify平台，配合华为云Flexus与DeepSeek引擎，情诗大师助手AI
Agent的构建流程简洁高效，创新性地将AI与传统诗歌和现代情感需求融合，实现了实用美学兼备的智能创作体验。  
**这一实践案例展示了AI大模型、低代码平台与智能体架构在内容创作、情感表达等场景下的巨大潜力与应用价值。**

* * *

