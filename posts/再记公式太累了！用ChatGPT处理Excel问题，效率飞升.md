---
title: "再记公式太累了！用ChatGPT处理Excel问题，效率飞升"
date: "2026-01-02T16:00:37.857197"
category: "人工智能"
tags: ["#chatgpt", "#excel"]
summary: ""author: xianyu120
status: "Published"
---

选自artificialcorner

> 精通 Excel 或许不再是简历亮点了。

ChatGPT 自去年 11 月 30 日 OpenAI 重磅推出以来，这款 AI 聊天机器人迅速成为 AI
界的「当红炸子鸡」。一经发布，不少网友更是痴迷到通宵熬夜和它对话聊天，就为了探究 ChatGPT 的应用天花板在哪里，经过试探不少人发现，ChatGPT
似乎像个全能战士，可以聊天、写代码、修改 bug、做智能音箱、写神经网络……

但是！作为一名资深打工者，平时工作中 Word、PPT、Excel 等必不可少，要是能将 ChatGPT
整合进这些应用软件简直不要太开心。这方面微软已经在紧锣密鼓的进行了。

微软的动作到底有多迅速，我们一时半会还猜不出来，但是已经有人坐不住了，**这位名叫 PyCoach 的 AI 爱好者开始用 ChatGPT 写 Excel
公式，工作效率妥妥提高 10 倍** 。

![图片](https://i-blog.csdnimg.cn/blog_migrate/c370486d1e3783649b25b4fec3251dc4.png)

PyCoach 表示，我们需要做的是创建有效提示，从而使得 ChatGPT 可以生成 Excel 公式和宏。

使用过 ChatGPT 的人都知道，提示占据非常重要的位置。而 Word，Excel、PPT 这办公三大件中，当属 Excel
最难搞，想要熟练掌握它，需要记住很多公式。但是使用提示就简单多了，和 ChatGPT 聊聊天就能解决问题。

![图片](https://i-blog.csdnimg.cn/blog_migrate/8ae409a064254f164c7aaf605f175e96.png)

下面我们看看 PyCoach 是如何实现的。

**使用 ChatGPT 完成 Excel 公式**

首先你需要创建一个账户，注册成功后得到如下界面：

![图片](https://i-blog.csdnimg.cn/blog_migrate/48e626bba7a7a6cdc51ed0979f318887.png)

创建账户地址：<https://chatgpt-plus.top/>

接下来是使用 ChatGPT 完成 Excel 公式。在使用 Excel
时，我们常常会利用其自带的计算函数，包括数据库函数、日期与时间函数、统计函数等。这些函数分别有自己的名称和格式，调用时需要按照规定格式准确输入参数，这给
Excel 用户带来了一些使用负担。

但是现在，我们用自然语言「告诉」ChatGPT 要计算的内容就可以了。我们以下面这张全年收入支出数据表为例，假设我们是 Excel 新手，不知道如何将
Expenses 列的值相加。

![图片](https://i-blog.csdnimg.cn/blog_migrate/be018ef502703dd3cd3ce0b0a5a293f8.png)

**SUM**

在这种情况下（当我们想要对一些数据进行求和），我们只需要告诉 ChatGPT 要对哪些数据求和，它就会输出一个已经代入实际参数的公式。例如：

![图片](https://i-blog.csdnimg.cn/blog_migrate/524e78e0b7fbf1a6072eeceba0b6828a.png)

ChatGPT 就像是一个精通 Excel 的小助手，我们把它写好的公式放到 B14 单元格里就能得到 B2 到 B13 单元格里数据的和。

有时，我们对一个 Excel 表格有多个问题，这时我们也可以对 ChatGPT 连续提问。例如对于上面的收入支出数据表，想知道 1. 月支出超过
100000 美元的次数；2. 未支付的费用总计多少，我们就可以询问 ChatGPT 获得计算公式：

**COUNTIF**

这一步是计算月支出超过 100000 美元的次数：

![图片](https://i-blog.csdnimg.cn/blog_migrate/60884db837eee0bc087aa766da004ae6.png)

**SUMIF**

这一步是对「已支付」状态栏中标记为「否（No）」的费用求和：

![图片](https://i-blog.csdnimg.cn/blog_migrate/432b07bfcdd632a31333a33a6790435f.png)

特别是对于一些复杂的函数，如果我们记不清其参数格式，就可以让 ChatGPT 帮忙写出正确格式，例如 VLOOKUP：

![图片](https://i-blog.csdnimg.cn/blog_migrate/0424fd1f209d5273d59fe38552102bd1.png)

**提取数据**

接下来挑战任务升级。假设我们有下面的电话号码列表，我们想要额外的区号（area code），即前面括号内容。

![图片](https://i-blog.csdnimg.cn/blog_migrate/88bf33a18c1489f4dca1172eb2e33897.png)

向 ChatGPT 描述此任务：

![图片](https://i-blog.csdnimg.cn/blog_migrate/e46db20d34959bd39a96a7de2435c4c9.png)

下面是 ChatGPT 生成的公式：

    
    
    =MID (A1,FIND ("(",A1)+1,FIND (")",A1)-FIND ("(",A1)-1)
    

我们唯一要做的修改就是用 A2 替换 A1，然后就可以得出结果！

![图片](https://i-blog.csdnimg.cn/blog_migrate/f13680bedc0b4635ef5ca2e582c5810c.png)

**计算唯一值**

接下来我们数一下列 B 中有多少唯一的区号（area codes）。如下图所示，ChatGPT 生成了非常复杂的公式，但这些公式不起作用。究其原因，可能是
ChatGPT 记住了对话中的每一个细节。我们可以试着提问一个一般性的问题来解决：

![图片](https://i-blog.csdnimg.cn/blog_migrate/2d6fc6ea8854b1fb9b31617fde66d8dd.png)

ChatGPT 生成的公式如下

    
    
    =SUMPRODUCT (1/COUNTIF (range, range))
    

如果加上区号所在的范围，公式又变成如下方式：

    
    
    =SUMPRODUCT (1/COUNTIF (B2:B9, B2:B9))
    

**使用 ChatGPT 创建宏**

接下来让我们尝试使用 VBA 创建一个简单的宏，按 tab 名对 sheet 进行排序。

![图片](https://i-blog.csdnimg.cn/blog_migrate/6392c63c7a6caee61d0a9df322973637.png)

由上图可得，ChatGPT 出现了错误，这时我们需要向 ChatGPT 描述错误，并进行 debug。

![图片](https://i-blog.csdnimg.cn/blog_migrate/387a93c8e2a4e6e0913e5e0c26410162.png)

一番调试后，ChatGPT 完成了工作，但没有达到预期。除此以外，ChatGPT 通过 tab 名对 sheets 进行排序，它将其中一个 tab 名更改为
temp。

以上就是 PyCoach 对 ChatGPT 的探索，可以看出 ChatGPT 还是很有帮助的，还在为写 Excel 公式头疼的小伙伴，可以试一试了。

_原文链接：_

_https://artificialcorner.com/10x-your-productivity-in-excel-with-
chatgpt-6f9536e46d7e_

