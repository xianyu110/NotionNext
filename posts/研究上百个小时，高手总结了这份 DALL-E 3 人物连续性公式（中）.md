---
title: "研究上百个小时，高手总结了这份 DALL-E 3 人物连续性公式（中）"
date: Sat Jan 03 2026 00:00:01 GMT+0800 (China Standard Time)
category: "人工智能"
tags: ["#人工智能"]
summary: ""
author: "xianyu120"
status: "Published"
---

![研究上百个小时，高手总结了这份 DALL-E 3
人物连续性公式（中）](https://i-blog.csdnimg.cn/blog_migrate/83ce03b56f1b932f0204b84a02aa8b58.jpeg)

上篇反响不错，加快了我速更的意志，继续输出。

根据上篇讲了基础部分（增加元素细节），以及怎么去给提示，那么下篇要讲的还是脱离不了基础部分和提示，只是增加了人物连续性的复杂场景以及表情原理。

还是需要感谢这位伟大的作者：@AshutoshShrivastava，结尾附上该作者链接。

##### 人物连续性场景变化

**1\. 前期提示准备**

在我们开始制作图像之前，有一些重要的考虑因素：

注意：我们将遵循类似的提示格式，但在这种情况下，我们为基本提示设置了巨大的差异。

> Prompt:
>
> [Base Prompt] + [additional details / variationinformation]+identifer-1

提示：

[基本提示] +[额外细节/变量信息]+identifer -1

Chat GPT 叙述的场景以 室内/室外活动 命令（这很重要，所以不要忽视它。了解它为什么以这种方式构建）。

您可以向 Chat GPT 提供这个简洁的提示，指示它遵循这种格式，但使用新的基本命令。由于我们正在使用相同的聊天实例，所以无需输入整个命令。

> <—提示开始—>
>
> Now, we’re going to work on the activity scene.
>
> We will set the base prompt as: ‘Illustration portrait of a 30-year-old
> American woman named Hope with her curly wavy hair styled in a bun.’
>
> Is that okay? In this case, you will have the freedom to update clothes and
> other details under the ‘additional elements’ section.
>
> Are you ready now?

现在，我们将处理活动场景。

我们将把基本提示设置为：

> “画一位名叫 Hope 的 30 岁美国女子，她留着卷曲的发型盘在发髻上。”
>
> 这个方式可以吗？在这种情况下，您将可以在“额外元素”部分自由更新服装和其他细节。  
>  您准备好了吗？
>
> <— 提示结束 —>

ChatGPT 的回应：

> <–回应开始—>
>
> 是的，这听起来是一个很好的方法。将基本提示设置为：
>
> “画一位名叫 Hope 的 30 岁美国女子，她留着卷曲的发型盘在发髻上。”
>
> 可以让您在不改变主要角色特征的情况下根据活动或场景调整服装和其他元素。我将确保只根据您指定的活动在“额外细节/变量信息”类别内进行修改。
>
> 感谢澄清，我已经准备好按照这种方式继续。请提供下一个您希望 Hope 参与的活动或场景。
>
> <—回应结束—>

注意：这一调整是因为霍普穿着一件绿色 T 恤，我们不希望她到处都穿同样的衣服。这还演示了如何在不影响角色一致性的情况下轻微修改基本提示。

这次，我们是已经确定的基本提示，而不是图像。由于基本提示已设置并且 Chat GPT 已准备好，因此我们可以开始发布命令以构建我们的图像。

与上篇不同，我们不会使用（现在或制作）命令。相反，我们将简单地请求一个活动，然后 DALL-E 3 将创建图像。让我们看看它是如何工作的。

**2\. 例子演示**

①如果我希望 Hope 去远足 (My command: Hope doing hiking ).

颜色提示：[基本提示] [额外细节/变量信息] +identifer -1

这张图片的 DALL-E 提示将是：

> Illustration portrait of a 30-year-old American woman named Hope with her
> curly wavy hair styled in a bun, hiking in the mountains with appropriate
> attire and gear -0010
>
> “画一位名叫 Hope 的 30 岁美国女子，她留着卷曲的发型盘在发髻上，穿着合适的装备 在山上远足。” -0010

观察：您可以看到它更新了一些细节，如山脉和合适的服装，这些是由 ChatGPT 提供的。

注意：术语“合适的装备”被用作概括性描述词，以使 [DALL·E 3](https://www.uisdc.com/tag/dall%c2%b7e-3)
生成的图像符合所提到活动常见着装。这为图像生成过程提供了一些灵活性。

![研究上百个小时，高手总结了这份 DALL-E 3
人物连续性公式（中）](https://i-blog.csdnimg.cn/blog_migrate/5fa4fbf9c12298bc5d26c569d8405b62.jpeg)

②如果我们想要确定 Hope 穿着的夹克颜色怎么办？我们当然可以指定这一点，但最好不要提供太多信息，让 DALL-E 3 处理细节。

这张图片的 DALL-E 提示将是：

> Illustration portrait of a 30-year-old American woman named Hope with her
> curly wavy hair styled in a bun, wearing a white jacket and carrying a red
> backpack, hiking in the mountains -0011
>
> “画一位名叫 Hope 的 30 岁美国女子，她留着卷曲的发型盘在发髻上，穿着白色夹克，背着红色背包，在山上远足。” -0011

观察：您可以看到它更新了一些细节，加入了白色夹克和背着红色背包。

![研究上百个小时，高手总结了这份 DALL-E 3
人物连续性公式（中）](https://i-blog.csdnimg.cn/blog_migrate/d00dc13f5d9e107d43a04e51efea5a57.jpeg)

③假设现在我们希望 Hope 在冬季的环境中制作雪人：

这张图片的 DALL-E 提示将是：

> Illustration portrait of a 30-year-old American woman named Hope with her
> curly wavy hair styled in a bun, dressed in winter attire, in a snowy
> landscape making a snowman -0012
>
> “画一位名叫 Hope 的 30 岁美国女子，她留着卷曲的发型盘在发髻上，穿着冬季服装，在多雪的风景中制作雪人。” -0012

![研究上百个小时，高手总结了这份 DALL-E 3
人物连续性公式（中）](https://i-blog.csdnimg.cn/blog_migrate/83640d83f65ac486192fa503104ab92c.jpeg)

④如果要在活动中添加一些文本，我们看看它是如何工作的：

这张图片的 DALL-E 提示将是：

> Illustration portrait of a 30-year-old American woman named Hope with her
> curly wavy hair styled in a bun, seated comfortably in a library setting,
> wearing a black t-shirt with the word ‘HOPE’ written on it, engrossed in
> reading a book -0013
>
> “画一位名叫 Hope 的 30 岁美国女子，她留着卷曲的发型盘在发髻上，坐在一个舒适的图书馆环境中，穿着一件上面印有“HOPE”字样的黑色 T
> 恤，专心阅读一本书。” -0013

![研究上百个小时，高手总结了这份 DALL-E 3
人物连续性公式（中）](https://i-blog.csdnimg.cn/blog_migrate/e791d51dcbf882307b18ef78ca983a56.jpeg)

**3\. 表情原理**

在使用类似照片的真实图片时，捕捉情感是很简单的，但在使用插图类型的主题时，要保持情感和一致性要困难得多。

当主题是插图时，为什么很难保持某些情感的一致性？

①考虑像悲伤、愤怒、快乐、惊讶、怀疑、好奇和焦虑等情感。这些描述词富有表现力。当渲染成插图时，特别是如果被压缩成一个单词，DALL-E
倾向于放大这些表情。这可能导致更加卡通或风格化的外观。

> Prompt: Illustration portrait of a 30-year-old American woman named Hope
> with her curly wavy hair styled in a bun, wearing a green t-shirt, {emotion}
> -1
>
> 提示：画一位名叫 Hope 的 30 岁美国女子，她的卷曲波浪发型盘成发髻，穿着绿色 T 恤，{情感} -1

情感值可以是：愤怒，快乐，悲伤，惊讶（Angry,Happy,Sad,Surprised）等。

看看这些图片，您会注意到它们都具有卡通（夸装）的特点。

![研究上百个小时，高手总结了这份 DALL-E 3
人物连续性公式（中）](https://i-blog.csdnimg.cn/blog_migrate/c28be4717b07ed78b4d330fa75368cab.jpeg)

②对于照片风格的真实图片，这不是问题。让我们来看下面的结果。

添加一个单词的描述词，比如悲伤、愤怒、快乐或惊讶，不会破坏一致性。

> Prompt: Photoreaslitic portrait of a 30-year-old American woman named Hope
> with her curly wavy hair styled in a bun, wearing a green t-shirt, {emotion}
> -1
>
> 提示：30 岁的美国女性 Hope 的真实照片风格肖像，她的卷曲波浪发型盘成发髻，穿着绿色 T 恤，{情感} -1

![研究上百个小时，高手总结了这份 DALL-E 3
人物连续性公式（中）](https://i-blog.csdnimg.cn/blog_migrate/5f7e0a39b74c8330392460ed09e37bf9.jpeg)

③对于梦幻、若有所思、好奇、自信和宽慰等情感，添加一个单词的描述词不会带来问题。因为这些情感没有那么生动和富有表现力。因此，DALL-E
不会夸张这些表情，角色也不会显得卡通般。

> Prompt:Illustration portrait of a 30-year-old American woman named Hope with
> her curly wavy hair styled in a bun, wearing a green t-shirt, {emotion} -1
>
> 提示：30 岁的美国女性 Hope 的插画风格肖像，她的卷曲波浪发型盘成发髻，穿着绿色 T 恤，{情感} -1

情感值可以是：梦幻、若有所思、好奇、自信和宽慰（dreamy, pensive, intrigued, confident, and relieved）。

查看这些图像，您会发现一致性在整个过程中得以保持。

![研究上百个小时，高手总结了这份 DALL-E 3
人物连续性公式（中）](https://i-blog.csdnimg.cn/blog_migrate/a43dc9323aa4231e70bdd47d6a6abeb3.jpeg)

④为了解决这个问题，我们需要巧妙地强调情感。最佳平衡的方法是使用“带有微妙但明显的{情感名称}表情”这种表述，找到这个完美的措辞是具有挑战性的。尝试了大约
20 种组合，只有这一种被证明是有效的。

> Prompt: Illustration portrait of a 30-year-old American woman named Hope
> with her curly wavy hair styled in a bun, wearing a green t-shirt, with a
> nuanced yet evident {emotion} expression -1
>
> 提示：30 岁的美国女性 Hope 的插画风格肖像，她的卷曲波浪发型盘成发髻，穿着绿色 T 恤，带有微妙但明显的{情感}表情 -1

情感值可以是：生气、快乐、悲伤、惊讶（Angry,Happy,Sad,Surprised）。

检查这些图像，您会发现情感存在，但角色的一致性仍然保持完好

![研究上百个小时，高手总结了这份 DALL-E 3
人物连续性公式（中）](https://i-blog.csdnimg.cn/blog_migrate/1be7fc22b629aea4cef4d8c1ca52d782.jpeg)

参考地址：
[https://twitter.com/ai_for_success/status/1716792768352440725](https://link.uisdc.com/?redirect=https%3A%2F%2Ftwitter.com%2Fai_for_success%2Fstatus%2F1716792768352440725)

