---
title: "研究上百个小时，高手总结了这份 DALL-E 3 人物连续性公式（上）"
date: Sat Jan 03 2026 00:00:10 GMT+0800 (China Standard Time)
category: "人工智能"
tags: ["#midjourney","#人工智能","#chatgpt","#gpt"]
summary: ""
author: "xianyu120"
status: "Published"
---

![研究上百个小时，高手总结了这份 DALL-E 3
人物连续性公式（上）](https://i-blog.csdnimg.cn/blog_migrate/27eb759da5db429d0e97cc734a5a0aa3.jpeg)

上篇 Dall-E 3 讲了常见的 20 个公式，今天单独来讲一下人物连续性公式，这个公式来自 @AshutoshShrivastava。

上篇回顾：

[效果超好！全新 DALL-E 3 必须掌握的 20 种公式使用方法上周末，DALL-E 3 正式加入 ChatGpt，目前 Plus
用户和企业用户已经正式使用该功能，不仅是用户设计输出方面，也为科研项目输出相关的图片。阅读文章
_>_](https://www.uisdc.com/dall-e-3)

研究了近百个小时，感谢这位伟大的作者，结尾附上该作者链接。

![研究上百个小时，高手总结了这份 DALL-E 3
人物连续性公式（上）](https://i-blog.csdnimg.cn/blog_migrate/e282d60b6f386b865fcc234b81a0f98c.jpeg)

##### 一、人物连续性公式

**1\. 公式总结**

Prompt:

[Base Prompt] + [additional details / variationinformation]+identifer-1

提示：

[基本提示] +[额外细节/变量信息]+identifer-1

注意：

[基本提示] 可以描述人物的 年龄/性别/图像风格等。

[额外细节/变量信息] 可以描述发型/服装类型等。

identifer 为 “标识符变量”。

\- 1 数字可变，作用是提供图像编号，为 Chat Gpt 理解。

**2\. 例子演示**

①这篇文章的起始图片。

> DALL-E Prompt for this image is :
>
> illustration portrait of a 30-year-old American woman named Hope with her
> curly wavy hair styled in a bun, wearing a green t-shirt, -0003

这张图片的 DALL-E 提示是：

描绘了一位名叫 Hope 的 30 岁美国女性，她的卷曲头发盘在发髻上，身穿一件绿色 T 恤 - 0003

![研究上百个小时，高手总结了这份 DALL-E 3
人物连续性公式（上）](https://i-blog.csdnimg.cn/blog_migrate/8918be31ba125e0e32f8a72a6f16b525.jpeg)

②现在，我想让 Hope 微笑，那么我会告诉 DALL-E 3 ( My command: make Hope smile )

> DALL-E Prompt for this image will be :
>
> illustration portrait of a 30-year-old American woman named Hope with her
> curly wavy hair styled in a bun, wearing a green t-shirt, smiling -0004

这张图片的 DALL-E 提示将是：

描绘了一位名叫 Hope 的 30 岁美国女性，她的卷曲头发盘在发髻上，身穿一件绿色 T 恤，微笑 - 0004

![研究上百个小时，高手总结了这份 DALL-E 3
人物连续性公式（上）](https://i-blog.csdnimg.cn/blog_migrate/60ae5cb47870be288f68fd4e3db7ba63.jpeg)

③现在，我想让 " Hope 把手指放在嘴唇上"，那么我会告诉 DALL-E 3 ( My command: “now make Hope have a
finger on her lips” )。

您会注意到她在微笑并把手指放在嘴唇上。为什么她微笑？因为默认情况下，DALL-E 3 会更新上一张图片，所以看看提示：

> DALL-E Prompt for this image will be :
>
> illustration portrait of a 30-year-old American woman named Hope with her
> curly wavy hair styled in a bun, wearing a green t-shirt, smiling, and
> placing a finger on her lips -0005

DALL-E 这张图片的提示将是：

描绘了一位名叫 Hope 的 30 岁美国女性，她的卷曲头发盘在发髻上，身穿一件绿色 T 恤，微笑，并把手指放在嘴唇上 - 0005

![研究上百个小时，高手总结了这份 DALL-E 3
人物连续性公式（上）](https://i-blog.csdnimg.cn/blog_migrate/147da1a118cef7c0f403e16a9827c76d.jpeg)

④现在，我希望 Hope 把手指放在嘴唇上但不是微笑，我会告诉 DALL-E 3 (My command: “take -0003 as base and
now make Hope have a finger on her lips”)。

我提到了 -0003，因为在那张特定的照片中，她没有笑。所以，请看提示：

> DALL-E Prompt for this image will be :
>
> illustration portrait of a 30-year-old American woman named Hope with her
> curly wavy hair styled in a bun, wearing a green t-shirt, placing a finger
> on her lips -0006

DALL-E 这张图片的提示将是：

描绘了一位名叫 Hope 的 30 岁美国女性，她的卷曲头发盘在发髻上，身穿一件绿色 T 恤，把手指放在嘴唇上 - 0006

![研究上百个小时，高手总结了这份 DALL-E 3
人物连续性公式（上）](https://i-blog.csdnimg.cn/blog_migrate/50ab7240c3b4936b4897ec9a649f9297.jpeg)

**3\. 增加变化**

①根据公式，增加复杂的变化。

[Base Prompt] + [additional details / variationinformation]+identifer-1

您可以将这个简短的提示提供给 ChatGPT，让它按照这个结构进行操作。

<—提示开始—>

I have some instructions for you :

you can reframe the [prompt](https://www.uisdc.com/tag/prompt) in the
following way:

Prompt Structure is : [Base Prompt] + [additional details / variation
information] + identifer-1

我有一些指导信息要给你：

你可以将提示重新构建为以下方式：

提示结构是：[基本提示] +[额外细节/变量信息]+identifer-1

> Base Prompt: “Illustration portrait of a 30-year-old American woman named
> Hope with her curly wavy hair styled in a bun, wearing a green t-shirt”
>
> If i say make Hope do something base prompt will be above one which i
> provided .
>
> If I say now make Hope do some thing , the base prompt will be the current
> state of Hope with the last identifier.
>
> For any additional details or variations that don’t involve hair, append
> them under the “additional details / variation information” category and
> then add an identifier at the end.

基础提示：“画一张描绘一个 30 岁的美国女性 Hope 的插画头像，她的卷曲波浪发型盘成发髻，穿着一件绿色 T 恤”

如果我说让 Hope 做某事，基础提示将是我提供的上述那个。

如果我说现在让 Hope 做某事，基础提示将是 Hope 的当前状态，也就是最后一个标识符所对应的提示。

对于不涉及发型的任何额外细节或变化，将它们附加在“额外细节/变化信息”类别下，然后在末尾添加一个标识符。

> Example 1: Changing Hair Style
>
> If I ask for make hope hair flow, you can change the prompt to:
>
> “Illustration portrait of a 30-year-old American woman named Hope with her
> curly wavy hair flowing, wearing a green t-shirt. + identifier-1”

示例 1：更改发型

如果我要求让 Hope 的头发飘逸，你可以将提示更改为：

“画一张描绘一个 30 岁的美国女性 Hope 的插画头像，她的卷曲波浪发型飘逸，穿着一件绿色 T 恤。+标识符-1”

> Example 2: Coffee
>
> If i ask to make Hope drink coffee, then you can change the prompt to:
>
> “Illustration portrait of a 30-year-old American woman named Hope with her
> curly wavy hair styled in a bun, wearing a green t-shirt and drinking
> coffee. + identifier-1”

示例 2：喝咖啡

如果我要求让 Hope 喝咖啡，那么你可以将提示更改为：

“画一张描绘一个 30 岁的美国女性 Hope 的插画头像，她的卷曲波浪发型盘成发髻，穿着一件绿色 T 恤，喝咖啡。-标识符+1”

This approach keeps the Base Prompt intact while allowing for specific
variations as needed. The identifier at the end can help keep track of
variations.

Are you clear with this ?

这个方法保持了基础提示不变，同时允许根据需要进行具体的变化。末尾的标识符有助于跟踪各种变化。

你理解了吗？

<— 提示结束 —>

ChatGPT 的回应：

<–回应开始—>

  1. 是的，我清楚地理解了这些说明。
  2. 你设置了一个基础提示，并提供了一个结构，用于进行任何修改。
  3. 如果你使用词语“现在”，我将使用 Hope 的当前状态作为基础提示，并根据你的具体要求进行修改，将变化附加在“额外细节/变化信息”类别下。我还会为每个新请求递增标识符。
  4. 请提供 Hope 的下一个指令，我将相应地生成图像。

<—回应结束—>

②这是 Hope 的第五张图片，将把它用作现在的起始图片。目前，Hope 正在微笑，手指放在嘴唇上，发型是髻子。

> DALL-E Prompt for this image is:
>
> illustration portrait of a 30-year-old American woman named Hopewith her
> curly wavy hair styled in a bun, wearing a green t-shirt, smiling, and
> placing a finger on her lips -0005

这张图片的 DALL-E 提示是：

插图肖像，30 岁的美国女子，名叫 Hope，她卷曲的波浪发型梳成髻子，穿着一件绿色 T 恤，微笑着，手指放在嘴唇上 -0005

![研究上百个小时，高手总结了这份 DALL-E 3
人物连续性公式（上）](https://i-blog.csdnimg.cn/blog_migrate/043fbc5c49a42aa4d68e36f962a1d928.jpeg)

③如果我想基于先前的图像，让 Hope 的头发飘动，然后我会告诉 DALL-E 3（My command: now make Hope hair
flow），我使用了“现在”，它将采用上一个图像并在其基础上构建。

> DALL-E Prompt for this image will be :
>
> Illustration portrait of a 30-year-old American woman named Hope with her
> curly wavy hair flowing, wearing a green t-shirt, smiling, and placing a
> finger on her lips -0006

这张图像的 DALL-E 提示将是：

插图肖像，30 岁的美国女子，名叫 Hope，她卷曲的波浪头发飘动，穿着一件绿色 T 恤，微笑着，手指放在嘴唇上 -0006

观察：您可以看到它在基本提示中更新了头发的细节，而 Hope 正在微笑，因为那是她的最后状态。

![研究上百个小时，高手总结了这份 DALL-E 3
人物连续性公式（上）](https://i-blog.csdnimg.cn/blog_migrate/7711c7cacb1ff3d658f68939e051b9ad.jpeg)

④现在，如果我想让 Hope 看书，但我想参考基本提示，然后我会告诉 DALL-E 3（My command: “Make Hope read
book”）。

您会注意到我使用了“让”，她只是在读书，没有头发飘动，没有微笑或其他什么 - 这有助于我们不再一遍又一遍地引用基础图像，也有助于 ChatGPT
记住提示，因为我们在命令中已经给出。

> DALL-E Prompt for this image will be :
>
> Illustration portrait of a 30-year-old American woman named Hope with her
> curly wavy hair styled in a bun, wearing a green t-shirt, reading a book
> -0007

这张图像的 DALL-E 提示将是：

插图肖像，30 岁的美国女子，名叫 Hope，她卷曲的波浪头发盘在发髻上，穿着一件绿色 T 恤，正在看书 -0007

![研究上百个小时，高手总结了这份 DALL-E 3
人物连续性公式（上）](https://i-blog.csdnimg.cn/blog_migrate/872d3d219b61661f8636d965f6e389e9.jpeg)

⑤现在我的当前状态是 -0007，但如果我想更新 -0006 并希望 Hope 喝咖啡，我会告诉 DALL-E（My command: take -0006
as base and now make Hope drink coffee）。

> DALL-E Prompt for this image will be :
>
> Illustration portrait of a 30-year-old American woman named Hope with her
> curly wavy hair flowing, wearing a green t-shirt, smiling, placing a finger
> on her lips, and drinking coffee -0008 (output image left side)

这张图像的 DALL-E 提示将是：

插图肖像，30 岁的美国女子，名叫 Hope，她卷曲的波浪头发飘逸，穿着一件绿色 T 恤，微笑着，把手指放在嘴唇上，喝咖啡 -0008（左侧为输出图像）

⑥如果我想要发髻发型和喝咖啡，那么我会告诉 DALL-E（My command: take -0006 as base and now make Hope
drink coffee but in bun hairstyle）。

> DALL-E Prompt for this image will be :
>
> Illustration portrait of a 30-year-old American woman named Hope with her
> curly wavy hair styled in a bun, wearing a green t-shirt, smiling, placing a
> finger on her lips, and drinking coffee -0009 (output image right side)

这张图像的 DALL-E 提示将是：

插图肖像，30 岁的美国女子，名叫 Hope，她卷曲的波浪头发盘在发髻上，穿着一件绿色 T 恤，微笑着，把手指放在嘴唇上，喝咖啡
-0009（右侧为输出图像）

![研究上百个小时，高手总结了这份 DALL-E 3
人物连续性公式（上）](https://i-blog.csdnimg.cn/blog_migrate/00cfa48e5b22b4fa86d41c05e8217296.jpeg)

请注意：左边是命令 a 的输出图像，右边是命令 b 的输出图像。

参考地址：[
https://twitter.com/ai_for_success/status/1715734170708939094](https://link.uisdc.com/?redirect=https%3A%2F%2Ftwitter.com%2Fai_for_success%2Fstatus%2F1715734170708939094)

今天上篇就到这里，关注公众号获取未来的更新信息，以及最佳的提示撰写方式。

