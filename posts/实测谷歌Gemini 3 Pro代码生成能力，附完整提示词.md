---
title: "实测谷歌Gemini 3 Pro代码生成能力，附完整提示词"
date: Fri Jan 02 2026 23:54:08 GMT+0800 (China Standard Time)
category: "人工智能"
tags: ["#人工智能"]
summary: ""
author: "xianyu120"
status: "Published"
---

## **实测谷歌Gemini 3 Pro代码生成能力，附国内可用渠道与完整提示词**

谷歌近期更新了 **Gemini 3 Pro** ，在 AI 社区引起了不少讨论。相比于之前的版本，这次更新主要体现在对复杂逻辑的理解和代码生成的完整性上。

为了验证它是否真的如传闻中那样具备“交付级”的编程能力，我准备了几组不同维度的提示词（Prompt）进行了一轮实测。

![640](https://i-blog.csdnimg.cn/img_convert/ac575ad8f38fbdb9599709136d31a2dd.jpeg)

![640
\(1\)](https://i-blog.csdnimg.cn/img_convert/36c9c4194882cd028e722cacb354c2ca.png)

**测试重点：**  
不使用任何辅助工具，仅通过自然语言描述，看 Gemini 3 Pro 能否生成直接运行的 HTML 应用。

**测试结果预览：** 确实令人意外，从游戏模拟器到系统仿真，它基本都能在单文件中实现闭环。

![640](https://i-blog.csdnimg.cn/img_convert/41cb4df83d176b6e003f2e3bf275089b.png)

* * *

### **第一部分：Gemini 3 Pro 实测案例（含提示词）**

以下案例均为 **单次生成** 结果。如果你也想体验，可以直接复制下方的 Prompt 进行测试。

#### **1\. 怀旧复刻：Game Boy Switch 风格模拟器**

测试目标：考察 AI 对 UI 布局、CSS 样式以及按键映射逻辑的理解。

> **🎯 测试提示词（可复制）：**  
>  “设计并制作一款类似任天堂Game Boy
> Switch的模拟器，并保留以下游戏的全部功能：俄罗斯方块（GB，1989）——风靡一时的捆绑游戏；永恒的益智循环。精灵宝可梦
> 红/蓝/黄（GB，1996-98）——定义了掌上角色扮演游戏的狂热之作。塞尔达传说：织梦岛/DX（GB ’93 / GBC
> ’98）——掌上塞尔达杰作。超级马里奥大陆2：6枚金币（GB，1992）——马里奥系列的巅峰之作；瓦里奥首次登场。宝可梦
> 金/银/水晶（GBC，1999-2000）—
> 城都+关都地区，昼夜交替，大幅改进。所有按钮均可通过触摸操作，也可以通过键盘上的相同按键进行操作。可以使用任何库来实现此功能，但请确保我可以将所有代码粘贴到一个
> HTML 文件中并在 Chrome 浏览器中打开。使其有趣且细节丰富，展现出意想不到的细节，在一个代码块中充分发挥创意和美感。”

![image-20251119085153745](https://i-blog.csdnimg.cn/img_convert/74afbbc6b8278df074a82ec60716e9cf.png)

**✨ 运行效果：**  
生成的界面带有复古掌机的质感，按键布局合理，且可以直接交互。

![image-20251119111408458](https://i-blog.csdnimg.cn/img_convert/c23555dea682eab51ec397cec56a6e11.png)

* * *

#### **2\. 逻辑挑战：Web 版《饥荒》Demo**

测试目标：生存游戏涉及资源循环、数值计算（饥饿值/血量），考察 AI 的逻辑代码能力。

> **🎯 测试提示词：**  
>  “做一个饥荒游戏 html，尽量还原”

**✨ 运行效果：**  
虽然只是 Demo，但画风抓住了精髓，采集、移动等核心机制均在单一 HTML 文件中实现。

![image-20251119084525528](https://i-blog.csdnimg.cn/img_convert/316fba857ca63508c9dab4a7c0e020d7.png)

![PixPin_2025-11-19_08-43-58](https://i-blog.csdnimg.cn/img_convert/0b5323c1b7adb283614d1d7e38dad4a1.gif)

* * *

#### **3\. 物理交互：拟物化电风扇**

测试目标：DOM 元素控制能力与 CSS 动画的结合。

> **🎯 测试提示词：**  
>  “一次性生成一个 有实体按键 的电风扇 html”

**✨ 运行效果：**  
风扇支持档位切换，且按键带有下压回弹的物理反馈动画。

![image-20251119084811554](https://i-blog.csdnimg.cn/img_convert/4c6835a91ad37f4d40f280d1aab5aeaf.png)

![PixPin_2025-11-19_08-50-41](https://i-blog.csdnimg.cn/img_convert/ddc945661ee43bcfa5beecc81b6f874b.gif)

* * *

#### **4\. 视觉特效：动态纽约天际线**

> **🎯 测试提示词：**  
>  “能星星发光的纽约天际线”

**✨ 运行效果：**  
CSS 绘制的剪影风格，配合关键帧动画实现了星光闪烁效果。

![image-20251119085125077](https://i-blog.csdnimg.cn/img_convert/9fd050a4ffbde95176d6938f476d7067.png)

![image-20251119084313342](https://i-blog.csdnimg.cn/img_convert/0aa5e496d65e17a78ddcd9cf3ec767e9.png)

* * *

#### **5\. 综合模拟：Web OS (Windows 风格)**

> **🎯 测试提示词：**  
>  **设计并创建一个类似 Windows 操作系统的 Web OS，具备完整功能：从文本编辑器、带 Python
> 的终端、代码编辑器、可玩的游戏，到文件管理器、画图工具、视频编辑器，以及所有重要的 Windows
> 系统预装软件。可以使用任意库来实现，但务必确保我能把所有代码粘贴进单个 HTML 文件里，并直接在 Chrome
> 中打开运行。让整体效果有趣、细节丰富，呈现出超出常人预期的细节，在一个代码块中尽情发挥创意与美感。**

**✨ 运行效果：**  
这是一个非常复杂的指令，Gemini 3 生成了一个包含任务栏、窗口拖拽、基础应用的简易操作系统。

![image-20251119103144141](https://i-blog.csdnimg.cn/img_convert/17757d934f5de576b1d7123d93e99dc8.png)

* * *

#### **6\. 多模态测试：看图写代码 (Pixel-to-Code)**

测试目标：上传截图，让 AI 直接还原网页。

**操作演示：**

![image-20251119105556180](https://i-blog.csdnimg.cn/img_convert/daf4e2c587af181536044b180cf39b17.png)

**还原度对比：**

**原图（Original）**| **代码生成图（Gemini 3 Generated）**  
---|---  
![image-20251119110217523](https://i-blog.csdnimg.cn/img_convert/e9c253165c915dc56e94f4fbe177a0a7.png)|
![image-20251119110212643](https://i-blog.csdnimg.cn/img_convert/656f257cdd03c7a19322082b5de96240.png)  
  
* * *

### **第二部分：关于国内体验的几种方案**

由于网络环境限制，国内用户想要使用 Gemini 3 Pro 通常需要一些技巧。整理了目前主流的 3 种访问方式，大家可以根据自己的技术背景选择：

方案类型| 适用人群| 特点说明  
---|---|---  
**方案一：第三方聚合站**| **普通用户**| **门槛最低，支持直连，多模型集成**  
**方案二：API 开发调用**| **开发者**|  适合接入自己的应用，兼容性好  
**方案三：谷歌官方云**|  企业/极客| 原生环境，需要海外信用卡及网络配置  
  
项目地址：<https://github.com/bc3bu1vai87o-hue/gemini3>

### **写在最后**

Gemini 3 Pro 在代码生成领域的表现确实展现了“大模型”向“生产力工具”转变的趋势。无论是通过上述的镜像站快速体验，还是通过 API
进行深度开发，都建议大家动手试一试。

**Prompt 已经在文中给出，复制即可复现上述效果。**

