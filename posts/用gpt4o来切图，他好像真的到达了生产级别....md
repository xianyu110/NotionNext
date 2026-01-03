---
title: "用gpt4o来切图，他好像真的到达了生产级别..."
date: Fri Jan 02 2026 23:59:30 GMT+0800 (China Standard Time)
category: "人工智能"
tags: ["#gpt","#centos","#linux","#音视频","#运维"]
summary: ""
author: "xianyu120"
status: "Published"
---

原文：

https://juejin.cn/post/7390957334418948148

## 前言

今天来对比一下国内的`通义千问`大模型的代码生成水平和`gpt4o`的`代码生成`水平，当然这里是对`图片的分析能力`的考验，我们截取一张掘金的文章榜图片，同时给这两个大模型喂一样的prompt，让他为我们切图，我们不再自己写代码，一起期待一下，他们的表现如何？

prompt中，我们要求它语义化，比如section、header标签…

![image.png](https://i-blog.csdnimg.cn/blog_migrate/4f37b0418a1542e9ca44dc41d87b2288.png)
prompt：你是一位资深的前端工程师，请根据上图写出html，css，请注意html的语义化，使用BEM命名规范

## 通义千问表现如何？

![image.png](https://i-blog.csdnimg.cn/blog_migrate/6a9ccc1d5b67d35f3c3cc122aacbff4c.png)

通义千问具备代码生成能力，前端的一部分工作，已经可以交给他了。

![image.png](https://i-blog.csdnimg.cn/blog_migrate/ffce0c2bffba6850060561dedf8b0d2c.png)

接下来，我们把它生成的代码拿到vs中运行，看看他的表现如何？

![image.png](https://i-blog.csdnimg.cn/blog_migrate/279648cecebe88322f038b84b6f1d745.png)

虽然…但是…

还不错！上回尝试的时候它还不如这次呢，看来没几天的功夫，他又进化了！

**这是它上一次的表现。**
![image.png](https://i-blog.csdnimg.cn/blog_migrate/dd9d7ea3464958a3444a627364d5b163.png)

**html**

    
    
    <!DOCTYPE html>
    <html lang="zh">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>文章榜</title>
        <link rel="stylesheet" href="styles.css">
    </head>
    
    <body>
        <section class="article-list">
            <h2 class="article-list__header">文章榜</h2>
            <ul class="article-list__items">
                <li class="article-list__item">
                    <span class="article-list__item-number">1</span>
                    <a href="#" class="article-list__item-link">vueConf 2024：揭秘vue3.5...</a>
                </li>
                <li class="article-list__item">
                    <span class="article-list__item-number">2</span>
                    <a href="#" class="article-list__item-link">Rust 在 Android 中的应用</a>
                </li>
                <li class="article-list__item">
                    <span class="article-list__item-number">3</span>
                    <a href="#" class="article-list__item-link">不写一行代码，利用 ChatGPT...</a>
                </li>
                <li class="article-list__item">
                    <span class="article-list__item-number">4</span>
                    <a href="#" class="article-list__item-link">AI全栈demo，根据需求生成B...</a>
                </li>
                <li class="article-list__item">
                    <span class="article-list__item-number">5</span>
                    <a href="#" class="article-list__item-link">豆包Marscode体验官：拿客...</a>
                </li>
            </ul>
            <button class="article-list__more-btn">查看更多&gt;</button>
        </section>
    </body>
    
    </html>
    

从代码中看出，他确实没有给我们提供我们太多想要的结果，语义化标签，仅仅出现了section

**css**

    
    
    /* Reset some browser default styles */
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    body {
        font-family: Arial, sans-serif;
    }
    
    .article-list {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
    }
    
    .article-list__header {
        text-align: center;
        font-size: 24px;
        margin-bottom: 20px;
    }
    
    .article-list__items {
        list-style-type: none;
    }
    
    .article-list__item {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }
    
    .article-list__item-number {
        width: 30px;
        height: 30px;
        background-color: #f9c851;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
        border-radius: 50%;
    }
    
    .article-list__item-link {
        text-decoration: none;
        color: inherit;
    }
    
    .article-list__item-link:hover {
        color: #f9c851;
    }
    
    .article-list__more-btn {
        display: block;
        width: 100%;
        padding: 10px;
        background-color: #f9c851;
        color: white;
        text-align: center;
        text-decoration: none;
        border: none;
        cursor: pointer;
        transition: background-color 0.3s ease;
    
        /* Center the button vertically in the container using Flexbox */
        display: flex;
        align-items: center;
    }
    
    .article-list__more-btn:hover {
        background-color: #e7b33d;
    }
    

## gpt4o会有怎样的表现？

那么接下来我们就一起来看看gpt4o给我们带来的表现吧。

![image.png](https://i-blog.csdnimg.cn/blog_migrate/40f6c533a4b39a05e6a318e0b513fa16.png)

![image.png](https://i-blog.csdnimg.cn/blog_migrate/b21a0245bdbb3b7cc17d89464d0959d9.png)
接下来，我们依然把代码拿到vs中使用，看看效果如何？

**html**

    
    
    <!DOCTYPE html>
    <html lang="zh">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>文章榜</title>
        <link rel="stylesheet" href="styles.css">
    </head>
    
    <body>
        <section class="article-list">
            <header class="article-list__header">
                <h1 class="article-list__title">文章榜</h1>
                <button class="article-list__refresh-button">换一换</button>
            </header>
            <ol class="article-list__items">
                <li class="article-list__item article-list__item--top">
                    <span class="article-list__item-number">1</span>
                    <span class="article-list__item-title">后端同事下班早，前端排序我来搞定！</span>
                </li>
                <li class="article-list__item">
                    <span class="article-list__item-number">2</span>
                    <span class="article-list__item-title">「差生文具多系列之」最好看的办公用品推荐</span>
                </li>
                <li class="article-list__item">
                    <span class="article-list__item-number">3</span>
                    <span class="article-list__item-title">一种适合H5屏幕适配方案</span>
                </li>
                <li class="article-list__item">
                    <span class="article-list__item-number">4</span>
                    <span class="article-list__item-title">软考架构师上岸，我用了这些资料</span>
                </li>
                <li class="article-list__item">
                    <span class="article-list__item-number">5</span>
                    <span class="article-list__item-title">前端 Vue3 数据可视化图表技术</span>
                </li>
            </ol>
            <footer class="article-list__footer">
                <a class="article-list__more-link" href="#">查看更多</a>
            </footer>
        </section>
    </body>
    
    </html>
    

**css**

    
    
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        padding: 20px;
        background-color: #f5f5f5;
    }
    
    .article-list {
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        width: 300px;
        margin: 0 auto;
    }
    
    .article-list__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px;
        background-color: #f9f9f9;
        border-bottom: 1px solid #eee;
    }
    
    .article-list__title {
        font-size: 16px;
        color: #333;
    }
    
    .article-list__refresh-button {
        background: none;
        border: none;
        color: #007bff;
        cursor: pointer;
        font-size: 14px;
    }
    
    .article-list__items {
        list-style: none;
    }
    
    .article-list__item {
        display: flex;
        align-items: center;
        padding: 10px 15px;
        border-bottom: 1px solid #eee;
    }
    
    .article-list__item--top .article-list__item-number {
        color: #e74c3c;
    }
    
    .article-list__item-number {
        font-size: 18px;
        font-weight: bold;
        margin-right: 10px;
        color: #999;
    }
    
    .article-list__item-title {
        font-size: 14px;
        color: #333;
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    
    .article-list__footer {
        padding: 15px;
        text-align: center;
        background-color: #f9f9f9;
    }
    
    .article-list__more-link {
        color: #007bff;
        text-decoration: none;
        font-size: 14px;
    }
    
    .article-list__more-link:hover {
        text-decoration: underline;
    }
    

没有对比就没有伤害了属于是，还没看效果，仅仅看代码就能看出区别，header、section、footer…符合我们的预期。

**效果**

![image.png](https://i-blog.csdnimg.cn/blog_migrate/996a6bd4e2d584d4f9571115636d6949.png)

wc？啊？这有什么很大的区别吗？？只是少了icon，只需要加入icon就能实现一模一样的效果…

这…我… 开始语无伦次…

**再来对比一下和掘金原版本的区别**

  * 原版

![image.png](https://i-blog.csdnimg.cn/blog_migrate/8c6ad16f36bcd19fceb6fed7da346b21.png)

  * gpt4o

![image.png](https://i-blog.csdnimg.cn/blog_migrate/4fb8950cc873ed4a03661d20bdcb3a2b.png)

不得不说，这个图片分析能力和代码生成能力实在是厉害，人工智能发展的速度越来越快了…

## Gpt4o的全能

o是omni（全能），他有gpt-3.5-turbo的文本生成能力，还有着多模态模型之称，能够处理文本、图片、语音、视频、情感等等等等。更适合成为我们开发者的copilot助手

模型和模型之间是存在差距的，不同的模型适合着不同的工作，我们这篇文章中提到了通义千问和gpt4o的对比，但是绝不是在贬低通义千问，或许通义千问只是没有在代码生成或者是图片处理这一块做太多的努力，正如红衣大叔所说，中国的人工智能大模型发展，一定要找准方向，找到适合发展的道路，可以将模型细化到场景，而不是一味的要死磕。

仔细对比上面俩个模型给出的代码，在语义化方面是能够看出明显差距的，为什么要语义化标签呢？

  * 对搜索引擎友好

  * section表示网页的不同功能区块，如商品详情、商品尺寸、商品评价、商品推荐、购物车…

  * header

  * nav

    * 导航栏中的容器
    * 不是一般的链接，是菜单
  * article

    * 文章、文章详情、提升页面的重要性
  * …

**接下来我们来玩点别的，用GPT4o来做数据分析**

### gpt4o数据分析

#### .mjs

`.mjs` 结尾的文件是用于表示采用 ECMAScript 模块（ES Modules，简称 ESM）语法的 JavaScript 文件。在
Node.js 环境中，`.mjs` 文件默认会被加载器识别为 ES 模块，这意味着你可以直接在这些文件中使用 `import` 和 `export`
语句。

ES 模块与传统的 CommonJS 模块（通常在 `.js` 文件中找到）有几个关键的不同点：

  1. **静态解析** ：ES 模块中的 `import` 和 `export` 是在编译时解析的，这意味着它们必须在文件的顶层，并且不能在运行时动态改变。
  2. **命名空间友好** ：ES 模块提供了更好的命名空间支持，使得从单个文件导入多个命名导出成为可能。
  3. **类型安全** ：由于 ES 模块的静态性质，它们更适合与现代类型检查工具一起使用。
  4. **循环依赖** ：ES 模块不支持循环依赖，这有助于避免复杂的依赖关系问题。
  5. **顶级 await** ：ES 模块允许使用顶级 `await`，即可以在模块的顶层使用 `await` 关键字。

在 Node.js 中，如果你希望 `.js` 文件也被解析为 ES 模块，可以在项目的 `package.json` 文件中添加 `"type":
"module"` 字段。不过，`.mjs` 扩展名仍然是推荐的方式，特别是在跨平台和跨环境的情况下，以确保文件被正确地识别为 ES 模块。

#### 实战

    
    
    import OpenAI from "openai";
    import dotenv from "dotenv";
    
    dotenv.config({
        path: "./.env"
    });
    
    // console.log(process.env.OPENAI_API_KEY, process.env.BASE_URL);
    const client = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        baseURL: process.env.BASE_URL
    });
    
    const saleData = `
    销售数据：
    日期，产品，销量，单价，总收入
    2023-01-01,iPhone 13,100,6000,600000
    2023-01-01,iPhone 14,50,8000,400000
    2023-01-02,iPhone 13,80,6000,480000
    2023-01-02,iPhone 14,60,8000,480000
    2023-01-03,iPhone 13,120,5800,696000
    2023-01-03,iPhone 14,80,7800,624000
    `
    
    const genSalseReport = async (data, query) => {
        const prompt = `
        you are an AI assistant that generate sales report
            base on the given data.
            Here is this sale data:\n
            ${data}\n\n
    
            Please generate a sales report to answer following question:\n
            ${query}
    `
    
        let response = await client.chat.completions.create({
            model: 'gpt-3.5-turbo-instruct',
            temperature: 0.0,// 大模型生成内容的随意度
            messages: [{
                role: 'user',
                content: prompt
            }]
        })
        return response.choices
    }
    
    
    
    console.log(await genSalseReport(saleData,
        '根据上述销售数据，计算iphone 13 和 iphone 14pro的总销量各是多少'));
    

  * 调用openai接口，使用的模型由于资金不足，所以我使用了gpt3.5，不过问题不大，3.5足够用作这类数据分析
  * 实例化client需要给baseurl和你的key，然后我们将数据和prompt喂给大模型令其返回response即可

### 国内使用GPT4o:

#### 站点网址

https://ai.maynor1024.live/list

### 为什么选择我们？

  1. 使用官网需要翻q，大部分学校/企业发现此类行为会被处以重罚，甚至开除。
  2. 官网费用高达20美元/月，约160人民币，对学生群体来说价格偏贵。
  3. 官网需要Visa卡支付，许多人没有美国Visa卡。淘宝上购买虚拟卡存在不正规风险，导致频繁封号，损失金钱和账号。淘宝店主往往推脱责任，令人难以维权。

