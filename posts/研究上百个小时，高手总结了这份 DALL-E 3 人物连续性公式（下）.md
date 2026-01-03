---
title: "研究上百个小时，高手总结了这份 DALL-E 3 人物连续性公式（下）"
date: Sat Jan 03 2026 00:00:05 GMT+0800 (China Standard Time)
category: "人工智能"
tags: ["#人工智能"]
summary: ""
author: "xianyu120"
status: "Published"
---

![研究上百个小时，高手总结了这份 DALL-E 3
人物连续性公式（下）](https://i-blog.csdnimg.cn/blog_migrate/900bc95183daf1b9acac23d123e0321e.jpeg)

根据前两篇学习，如何创建人物连续性公式，或多或少都会联想到
[Midjourney](https://www.uisdc.com/tag/midjourney) 里面的 Seed 值，是否能运用到 Dall e3
里面，那么今天这篇文章更新来了！！

继续感谢这位伟大的作者：@AshutoshShrivastava，地址链接请看前两篇内容。

[研究上百个小时，高手总结了这份 DALL-E 3 人物连续性公式（上）上篇 Dall-E 3 讲了常见的 20
个公式，今天单独来讲一下人物连续性公式，这个公式来自 @AshutoshShrivastava。阅读文章
_>_](https://www.uisdc.com/dall-e-3-2)

[研究上百个小时，高手总结了这份 DALL-E 3 人物连续性公式（中）上篇反响不错，加快了我速更的意志，继续输出。阅读文章
_>_](https://www.uisdc.com/dall-e-3-3)

##### 一、DALL-E-3 最重要的功能更新

**1\. 如何使用种子值**

如果您已经使用 DALL-E-3 工作，您应该知道以前种子号码是无法更改的，固定在 5000。

然而今天发现我们实际上可以指定种子号码。这意味着，通过相同的提示和种子，您可以在不同的实例中一致地生成完全相同的图像。

首先，设置你的自定义指令 为：

> " DMP " means: do not in any circumstance modify my prompt, please create
> image using this prompt: Also, use wide aspect ratio by default and when you
> generate an image, always provide the seed number details for that image
> after it’s rendered.

" DMP " 意味着：在任何情况下都不要修改我的提示，使用这个提示创建图像。

另外，请默认使用宽屏幕纵横比，当生成一张图片时，始终提供生成该图片的种子数细节。

注意：在 DALL-E-3 中，即使你提供了一个种子，纵横比会影响最终结果。因此，在指定种子时，请确保使用相同的纵横比。

这个自定义指令的作用是令 ChatGPT
永远不修改你的提示，并根据你提供的内容生成。默认情况下，它使用宽屏幕纵横比，并返回种子数。但有时候可能会出现错误。因此在工作时，你可以询问：“Do you
know what DMP means? – 你知道 ‘DMP’ 是什么意思吗？” 一旦它回答，你可以相应地指示它继续工作，确保它正常运行。

##### 二、让我们创建一张图片

例如：如果我请求 “DMP:dog”，它将使用完全相同的提示并为我提供一张图片以及种子号：1840089640。

![研究上百个小时，高手总结了这份 DALL-E 3
人物连续性公式（下）](https://i-blog.csdnimg.cn/blog_migrate/3f661e5800b8e69aabf0ea3b6bc6db24.jpeg)

现在，打开一个不同的 DALL-E 3 聊天实例，并输入如下命令：“DMP Prompt:dog, Seed:
1840089640”。它将提供完全相同的结果。

![研究上百个小时，高手总结了这份 DALL-E 3
人物连续性公式（下）](https://i-blog.csdnimg.cn/blog_migrate/c3a64ccec8af1aeee2c4a88a852d32c1.jpeg)

现在，更改种子值并观察结果。我的更新命令是"DMP Prompt:dog, Seed: 1844489640"，我已经更改了种子号码。你会注意到不同的结果。

![研究上百个小时，高手总结了这份 DALL-E 3
人物连续性公式（下）](https://i-blog.csdnimg.cn/blog_migrate/41f9b59d6c16c1bcc535bf0e67ed260d.jpeg)

那么，我进入了另一个不同的聊天实例，并输入了相同的命令，没有指定种子值。它生成了不同的图像并返回了一个新的种子值。您可以使用此种子和提示再次生成相同的图像。

![研究上百个小时，高手总结了这份 DALL-E 3
人物连续性公式（下）](https://i-blog.csdnimg.cn/blog_migrate/34c364e2b6b50b24f691ff68895b401b.jpeg)

##### 三、一致性测试评判

**1\. 能否实现一致性**

随着 DALL-E 3 引入种子（Seed 值），一个重要问题浮现出来：我们能实现一致性吗？如果可以，到什么程度？如果不行，为什么呢？让我们来深入探讨。

我花了将近一整天的时间来进行 DALL-E 3 的实验，现在有了一个结论。但在我们深入研究之前，让我们先设定一下背景，然后通过示例来探讨。

假设：相同的种子 + 相同的提示 = 相同的输出 / 相同的种子 + 不同的提示 = 不同的输出 / 不同的种子 + 相同的提示 = 不同的输出。（Same
seed + same prompt = identical output./Same seed + different prompt =
different output./Different seed + same prompt = different output.）

我的观点：当使用一致的种子并在提示中引入微小的变化时，生成的图像表现出一定程度的一致性。尤其是在面部特征等方面，如果对提示进行的更改涉及到其他元素（如背景或服装），面部可能会在很大程度上保留其原始形态。此外，如果在提示中加入微妙的情感元素，整体上也可能保持一致性。

然而，面部和特征一致性的保留程度取决于：

变化的性质：直接影响面部或特征描述的提示更改（例如，改变头发颜色、添加眼镜）显然会对输出产生更明显的影响。

模型的解释：有时，措辞上的微小变化可能被模型不同解释，导致意外的变化。

提示的语义：如果提示的变化引入了新的上下文或情景，可能会影响图像的其他方面，包括面部或其特征。

第一种情况

假设我们直接将种子值并入提示中，那么会出现什么结果？在这种情况下，我们能够保持一致性吗？让我们来看看。

这是我的提示：

> photorealistic portrait of a 30-year-old American woman named Hope with
> curly wavy hair, wearing a green t-shirt, ,Seed:XXXXXXXXX
>
> 30 岁的美国女子霍普的照片，头发卷曲，穿着绿色 T 恤，<情感>，种子：XXXXXXXXX  
>  所使用的情感词包括：微笑、开心、伤心和生气（smiling, happy, sad and Angry ）

当使用相同的种子时，一致性 是显而易见的。我对多个角色进行了实验，结果是一致的，尤其是当提示的变化较为微妙时，正如我前面所讨论的那样。

![研究上百个小时，高手总结了这份 DALL-E 3
人物连续性公式（下）](https://i-blog.csdnimg.cn/blog_migrate/01fedde11ddde8235a67bdd6bcb51759.jpeg)

第二种情况

如果我们不指定种子，而是允许 DALL-E 3 自行选择，会发生什么？我们是否仍然能够实现一致性？让我们探讨这种可能性。

这是我的提示：

> photorealistic portrait of a 30-year-old American woman named Hope with
> curly wavy hair, wearing a green t-shirt,
>
> 30 岁的美国女子霍普的照片，头发卷曲，穿着绿色 T 恤，<情感>

所使用的情感词包括：微笑、开心、伤心和生气（smiling, happy, sad and Angry ）

在 DALL-E 3 使用自己的随机种子的情况下，我观察到生成的图像中 绝对没有一致性。

![研究上百个小时，高手总结了这份 DALL-E 3
人物连续性公式（下）](https://i-blog.csdnimg.cn/blog_migrate/d5306347807f54fec27be53715ec68b5.jpeg)

第三种情况

假设我们在保持角色“Hope”和她的特征一致的情况下，对环境进行细微的更改。例如，“Hope 正在徒步旅行”与“Hope
正在堆雪人”。尽管活动和场景发生变化，角色的一致性是否仍然会保持？让我们来评估一下。

使用相同种子的提示：（我们有一定的一致性，面部特征是明显的）（左边）

> a. photorealistic portrait of a 30-year-old American woman named Hope with
> curly wavy hair, wearing a white jacket and carrying a red backpack, hiking
> in the mountains , Seed:XXXXXXXXX
>
> b. photorealistic portrait of a 30-year-old American woman named Hope with
> curly wavy hair, dressed in winter attire, in a snowy landscape making a
> snowman , Seed:XXXXXXXXX
>
> a. 30 岁的美国女子 Hope 的照片，头发卷曲，穿着白色夹克，背着红色背包，在山区徒步旅行，种子：XXXXXXXXX
>
> b. 30 岁的美国女子 Hope 的照片，头发卷曲，穿着冬季装备，在下雪的景色中堆雪人，种子：XXXXXXXXX

相同的上述提示，但没有相同的种子：（没有一致性，面部特征不同）（右边）

![研究上百个小时，高手总结了这份 DALL-E 3
人物连续性公式（下）](https://i-blog.csdnimg.cn/blog_migrate/84658dd78f2d207fa5f0fd648e66bba2.jpeg)

第四种情况

如果我们对主题“Hope”进行根本性的改变，例如，我们用长直发来描述“Hope”，而不是她通常的形象，这种改变会如何影响整体形象，而“Hope”的本质是否仍然能够被认出？让我们来调查一下。

使用相同种子的提示：（没有一致性）

> a. photorealistic portrait of a 30-year-old American woman named Hope with
> long straight hair playing a violin, Seed:XXXXXXXXX
>
> b. photorealistic portrait of a 30-year-old American woman named Hope with
> long straight hair , painting on a canvas, surrounded by art supplies,
> Seed:XXXXXXXXX
>
> a. 30 岁的美国女子 Hope 的照片，长直发，拉小提琴，种子：XXXXXXXXX
>
> b. 30 岁的美国女子 Hope 的照片，长直发，绘制画布，周围有美术用品，种子：XXXXXXXXX

相同的上述提示，但没有相同的种子：（没有一致性，面部特征不同）

![研究上百个小时，高手总结了这份 DALL-E 3
人物连续性公式（下）](https://i-blog.csdnimg.cn/blog_migrate/d41879fd79db13265499934285d3e948.jpeg)

原因：即使使用相同的种子，也
没有一致性。这种不一致性归因于前面提到的变化的性质。通过改变“Hope”的基本方面（她的头发），这直接影响了对她面部的描述，即使使用相同的种子，我们也失去了对“Hope”的可识别特征。

即使没有相同的种子，一致性也不存在。输出每次都不同，强调了在实现一致结果方面主题核心细节的重要性。

结论：使用相同的种子不保证一致性。如果是这样的话，那么使用相同的种子将始终生成具有相同面部特征和角色属性的图像，而不管环境或核心值的变化。然而，使用相同的种子可以通过保留主题的核心特征，并仅对周围元素或环境进行细微的更改来实现一定程度的一致性。

##### 四、如何让 Chat Gpt 懂你

**1\. 怎样写提示**

有了 DALL-E 3 的新种子功能，您需要确切的提示和种子才能复制一张图片。否则，每个提示都会产生不同的结果。

我们知道，DALL-E 3 之前将 5000 作为默认种子。为了用相同的提示获得相同的 Hope 图像，现在我必须使用种子。

让 ChatGPT 准备好生成图像。（您可以开始一个新的聊天实例；没有必要继续使用旧的实例）。

> <—提示开始—>
>
> Set Seed for all image as 5000 from now on.
>
> We are going to work on camera angle and shot type and we still need to
> maintain consistency so we will follow this :
>
> For activity-related images: (like hiking , reading book , walking etc)
>
> [Base Prompt], [additional_details], [Camera Angle], [Shot Type]
> +identifier-1
>
> For images focused solely on Hope:
>
> [Base Prompt], [Camera Angle], [Shot Type] +identifier-1
>
> Base Prompt is : llustration portrait of a 30-year-old American woman named
> Hope with her curly wavy hair styled in a bun
>
> Important point: A certain level of consistency can be achieved using same
> seed by retaining the core characteristics of the subject and making only
> subtle alterations to the surrounding elements or environment.
>
> As we want consistent character so when i ask for activity just add few
> words to describe the activity like for hiking add hiking in appropriate
> attire or playing in snow not more than 4-5 words under
> **additional_details**
>
> We will Use combination of these whatever suits best for the scene:
>
> Camera Angle: Eye-Level,Low Angle,High Angle,Bird’s eye view
>
> Shot Type: Wide Shot,Close-Up,Over-the-Shoulder Shot,Extreme Close-Up, Side-
> Profile  
>  Identifier base value is 0000 and it must be incremented each image
> generation.

中文版：

> 从现在开始，为所有图像设置种子为 5000。
>
> 我们将研究摄影机角度和拍摄类型，但我们仍然需要保持一致性，因此我们将按照以下方式进行：
>
> 对于与活动相关的图像：（比如徒步旅行、读书、散步等）
>
> [基本提示]，[额外细节]，[摄影机角度]，[拍摄类型] + 标识-1
>
> 仅关注 Hope 的图像：
>
> [基本提示]，[摄影机角度]，[拍摄类型] + 标识-1
>
> 基本提示是：插图肖像，题为 30 岁的美国女人 Hope，她有卷曲的波浪发型盘在发髻上。
>
>
> 重要提示：通过保留主体的核心特征，并仅对周围元素或环境进行微小的改动，可以实现一定程度的一致性，因此当我要求进行活动时，只需添加几个词来描述活动，比如徒步旅行适当的着装或在雪地里玩，不超过
> 4-5 个词在额外详细信息下。
>
> 我们将使用这些的组合，以最适合场景的方式：
>
> 摄影机角度：平视、低角度、高角度、鸟瞰
>
> 拍摄类型：全景、特写、肩上镜头、极特写、侧面镜头
>
> 标识符基值为 0000，必须逐个图像生成递增。
>
> <— 提示结束 —>

①让我们首先专注于 Hope。在这个情节中，我们将从不同的角度集中在 Hope 的侧脸上。

在这种情况下，我们使用这些组合实现了 90-95%的一致性。（图像中的数字表示提示编号。）

原因很简单，我们在固定的种子编号中进行了微小的更改。每张图片中的摄影机角度和拍摄类型也非常清晰。

> 1.Illustration portrait of a 30-year-old American woman named Hope with her
> curly wavy hair styled in a bun, Low Angle, Extreme Close-Up -0019
>
> 美国 30 岁的女性 Hope 以她盘在发髻上的卷曲波浪发型为特色的插图肖像，低角度，极特写 - 0019
>
> 2.Illustration portrait of a 30-year-old American woman named Hope with her
> curly wavy hair styled in a bun, High Angle, Side-Profile -0020
>
> 美国 30 岁的女性 Hope 以她盘在发髻上的卷曲波浪发型为特色的插图肖像，高角度，侧面镜头 - 0020
>
> 3.Illustration portrait of a 30-year-old American woman named Hope with her
> curly wavy hair styled in a bun, Eye-Level, Side-Profile -0023
>
> 美国 30 岁的女性 Hope 以她盘在发髻上的卷曲波浪发型为特色的插图肖像，平视，侧面镜头 - 0023
>
> 4.Illustration portrait of a 30-year-old American woman named Hope with her
> curly wavy hair styled in a bun, High Angle, Wide Shot -0026
>
> 美国 30 岁的女性 Hope 以她盘在发髻上的卷曲波浪发型为特色的插图肖像，高角度，全景 - 0026

![研究上百个小时，高手总结了这份 DALL-E 3
人物连续性公式（下）](https://i-blog.csdnimg.cn/blog_migrate/25328077b54ad1e7d5fb662e756b2d2c.jpeg)

在这个示例中，一致性大幅下降（图像中的数字表示提示编号）。

即使使用相同的种子，这种变化的原因在我关于种子和一致性的帖子中有解释。

> 1.Illustration portrait of a 30-year-old American woman named Hope with her
> curly wavy hair styled in a bun, Eye-Level, Close-Up -0017
>
> 美国 30 岁的女性 Hope 以她盘在发髻上的卷曲波浪发型为特色的插图肖像，平视，特写 - 0017
>
> 2.Illustration portrait of a 30-year-old American woman named Hope with her
> curly wavy hair styled in a bun, Eye-Level, Wide Shot -0016
>
> 美国 30 岁的女性 Hope 以她盘在发髻上的卷曲波浪发型为特色的插图肖像，平视，全景 - 0016
>
> 3.Illustration portrait of a 30-year-old American woman named Hope with her
> curly wavy hair styled in a bun, High Angle, Close-Up -0021
>
> 美国 30 岁的女性 Hope 以她盘在发髻上的卷曲波浪发型为特色的插图肖像，高角度，特写 - 0021

![研究上百个小时，高手总结了这份 DALL-E 3
人物连续性公式（下）](https://i-blog.csdnimg.cn/blog_migrate/9129a5091fef614ada712c64e8b5ed82.jpeg)

②在这个示例中，我们将注意力转向一幅活动场景的图像。在这里，我们将描绘 Hope 参与活动的场景。对于这个示例，我选择了一个她在咖啡馆喝咖啡的场景。

在这种情况下，我们使用这些组合实现了 85-95％的一致性。（图像中的数字表示提示编号。）

> 1.Illustration portrait of a 30-year-old American woman named Hope with her
> curly wavy hair styled in a bun, wearing a green t-shirt, drinking coffee in
> a cafe, Eye-Level, Close-Up -0029
>
> 插图肖像，描绘了一位名叫 Hope 的 30 岁美国女性，她盘在发髻上的卷曲波浪发型为特色，穿着绿色 T 恤，在咖啡馆喝咖啡，平视，特写 - 0029
>
> 2.Illustration portrait of a 30-year-old American woman named Hope with her
> curly wavy hair styled in a bun, wearing a green t-shirt, drinking coffee in
> a cafe, High Angle, Close-Up -0035
>
> 插图肖像，描绘了一位名叫 Hope 的 30 岁美国女性，她盘在发髻上的卷曲波浪发型为特色，穿着绿色 T 恤，在咖啡馆喝咖啡，高角度，特写 - 0035
>
> 3.Illustration portrait of a 30-year-old American woman named Hope with her
> curly wavy hair styled in a bun, wearing a green t-shirt, drinking coffee in
> a cafe, Low Angle, Close-Up -0031
>
> 插图肖像，描绘了一位名叫 Hope 的 30 岁美国女性，她盘在发髻上的卷曲波浪发型为特色，穿着绿色 T 恤，在咖啡馆喝咖啡，低角度，特写 - 0031
>
> \4. Illustration portrait of a 30-year-old American woman named Hope with
> her curly wavy hair styled in a bun, wearing a green t-shirt, drinking
> coffee in a cafe, Bird’s eye view, Close-Up -0038
>
> 插图肖像，描绘了一位名叫 Hope 的 30 岁美国女性，她盘在发髻上的卷曲波浪发型为特色，穿着绿色 T 恤，在咖啡馆喝咖啡，鸟瞰，特写 - 0038

![研究上百个小时，高手总结了这份 DALL-E 3
人物连续性公式（下）](https://i-blog.csdnimg.cn/blog_migrate/6ae27620dae34491bf686e18c0b84efd.jpeg)

在这个示例中，一致性下降很多（图像中的数字表示提示编号）。

> 1.Illustration portrait of a 30-year-old American woman named Hope with her
> curly wavy hair styled in a bun, wearing a green t-shirt, drinking coffee in
> a cafe, Low Angle, Over-the-Shoulder Shot -0034
>
> 插图肖像，描绘了一位名叫 Hope 的 30 岁美国女性，她盘在发髻上的卷曲波浪发型为特色，穿着绿色 T 恤，在咖啡馆喝咖啡，低角度，肩部特写 -
> 0034
>
> \2. Illustration portrait of a 30-year-old American woman named Hope with
> her curly wavy hair styled in a bun, wearing a green t-shirt, drinking
> coffee in a cafe, Eye-Level, Over-the-Shoulder Shot -0033
>
> 插图肖像，描绘了一位名叫 Hope 的 30 岁美国女性，她盘在发髻上的卷曲波浪发型为特色，穿着绿色 T 恤，在咖啡馆喝咖啡，平视，肩部特写 -
> 0033
>
> \3. Illustration portrait of a 30-year-old American woman named Hope with
> her curly wavy hair styled in a bun, wearing a green t-shirt, drinking
> coffee in a cafe, Bird’s eye view, Wide Shot -0037
>
> 插图肖像，描绘了一位名叫 Hope 的 30 岁美国女性，她盘在发髻上的卷曲波浪发型为特色，穿着绿色 T 恤，在咖啡馆喝咖啡，鸟瞰，全景特写 -
> 0037

![研究上百个小时，高手总结了这份 DALL-E 3
人物连续性公式（下）](https://i-blog.csdnimg.cn/blog_migrate/45df067ba67b0c89798dc96c9c388cae.jpeg)

结论：使用相同的种子不保证一致性。通过使用相同的种子，可以在保留主题的核心特征并仅对周围元素或环境进行细微更改的情况下实现一定程度的一致性。

人物连续性 · 种子就到这里。

