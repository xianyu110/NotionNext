---
title: "使用Coze工作流(二)"
date: "2026-01-02T16:02:44.447515"
category: "人工智能"
tags: ["#数据库"]
summary: ""author: xianyu120
status: "Published"
---

#### 文章目录

  *     * 使用Coze工作流

### 使用Coze工作流

通过本文你可以了解如何创建、发布、复制工作流，以及如何在 Bot 中添加工作流。

使用工作流的顺序如下：

  1. 创建工作流。

  2. 配置工作流。添加工作流节点并按照要处理的用户任务顺序连接工作流。

  3. 测试并发布工作流。

  4. 将工作流添加到你的 Bot 内。

步骤一：创建工作流

  1. 登录[扣子](https://www.coze.cn/home)。

  2. 在左侧导航栏的**工作区** 区域，选择进入指定团队。

  3. 在页面顶部进入**工作流** 页面，并单击**创建工作流** 。

  4. 设置工作流的名称与描述，并单击**确认** 。

  * 说明

清晰明确的工作流名称和描述，有助于大语言模型更好的理解工作流的功能。

  * 创建后页面会自动跳转至工作流的编辑页面，初始状态下工作流包含 **Start** 节点和 **End** 节点。

  * **Start** 节点用于启动工作流。

  * **End** 节点用于返回工作流的运行结果。

  * 

![img](https://i-blog.csdnimg.cn/blog_migrate/46964402b76ec3d2864197dabe1f9d94.png)

步骤二：配置工作流

创建工作流后，你可以通过拖拽的方式将节点添加到画布内，并按照任务执行顺序连接节点。

工作流提供了基础节点供你使用，除此之外，你还可以添加插件节点来执行特定任务。

  1. 在左侧面板中选择要使用的节点。

  2. 将节点拖拽到画布中，并与其他节点相连接。

  3. 配置节点的输入输出参数。

配置 LLM 节点

LLM 节点是扣子提供的基础节点之一，你可以使用该节点的大语言模型处理文本生成任务。节点配置说明：

  * **模型** ：所用的大语言模型。

  * **Temperature** ：模型生成内容的随机度。取值范围[0-1]，数值越大表示生成不确定性越高、内容越多元。

  * **提示词** ：该节点的提示词。在提示词中支持使用 {{variable}} 引用输入参数（**Input** ）。

  * **批处理** ：支持配置批量处理模式，后续该节点会按照配置多次运行。每次运行都会分配参数值，直到达到次数限制或者列表的最大长度。

配置 Code 节点

你可以在 Code 节点内使用 IDE 工具，通过 AI 自动生成代码或编写自定义代码逻辑，来处理输入参数并返回响应结果。

该节点支持 JavaScript、Python 运行时。在编码时你需要注意：

**运行时**| **注意事项**  
---|---  
JavaScript| JavaScript 支持 TypeScript，提供静态语言编码体验。JavaScript 中，仅内置了dayjs（版本
1.8.36） 和 lodash（版本 4.17.20） 两个三方依赖库。  
JavaScript 运行时遵循 [WinterCG](https://wintercg.org/) 规范，支持 [Minimum Common Web
Platform API](https://common-min-api.proposal.wintercg.org/) 列举的大多数 API，具体可用的
API 你可以在 IDE 内编码时参考代码提示。  
Python| Python 中，仅内置了 requests_async 和 numpy 两个三方依赖库，requests_async 依赖库与
requests 类似，但需要 await。  
      
    
    //only dayjs and lodash are allowed
    import dayjs from 'dayjs';
    import _ from 'lodash';
    
    async function main({ params }: Args): Promise<Output> {
        // get input params by this way
        return {
          content: params.name
        };
    }
    
    
    
    
    import requests_async as requests
    
    async def main(args: Args) -> Output:
        # you can get url by this way
        url = args.params['url']
        response = await requests.get(url)
        ret = {
          'code': response.status_code,
          'res': response.text,
        }
        return ret
    
    

在节点内的 **Code** 区域单击 **Edit in IDE** 可通过 IDE 编辑和调试代码。

![img](https://i-blog.csdnimg.cn/blog_migrate/48294c09ebcd0850d5f80e42edeb3c3c.png)

具体使用说明如下：

  * 使用 AI 生成代码

  * 你可以在 IDE 底部单击 **尝试** **AI** ，并输入自然语言设定代码逻辑，AI 将自动生成代码。你也可以选中代码片段，通过快捷键（macOS 为 Command + I、Windows 为 Ctrl + I）唤起 AI，并输入自然语言让 AI 帮助你修改代码。

  * 补全代码

  * 如果你已经为 Code 节点配置好了输入参数，则编辑时支持自动补全参数。

  * 调试代码

  * 单击**测试代码** ，在测试面板以 JSON 格式输入参数进行测试。支持使用 AI 自动生成模拟数据进行测试。

  * 设置输入参数后，单击**运行** ，你可以在**输出** 区域查看运行结果。在页面底部单击**更新 Schema** ，可将结果同步到 Code 节点的**输出值** 。

  * 

![img](https://i-blog.csdnimg.cn/blog_migrate/2fa49c5311a0b0db0cac9127d891b4b4.png)

配置 Knowledge 节点

知识库节点可以根据输入参数从指定知识库内召回匹配的信息。节点配置说明：

  * 设置**输入参数** ，节点会根据参数值召回关键内容。

  * 设置**知识库** ，你需要使用的知识库。

  * **最大召回数量** ：从知识库召回的最大段落数，数值越大返回的内容越多。

  * **最小匹配度** ：知识库会根据设置的匹配度召回段落，低于匹配度的内容将不会被召回。

配置 Condition 节点

该节点是一个 if-else 节点，用于设计工作流内的分支流程。

当向该节点输入参数时，节点会判断是否符合**如果** 区域的条件，符合则执行**如果** 对应的工作流分支，否则执行**否则** 对应的工作流分支。

步骤三：测试并发布工作流

要想在 Bot 内使用该工作流，则需要发布工作流。

  1. 单击**试运行** 。

  * 运行成功的节点边框会显示绿色，在各节点的右上角单击**展开运行结果** 可查看节点的输出。

  * 

![img](https://i-blog.csdnimg.cn/blog_migrate/aad6855b7d5984be2620ee5c5bd7ef66.png)

  1. 单击**发布** 。

  * 说明

只有试运行成功时，才能发布工作流。

步骤四：在 Bot 内使用工作流

  1. 前往当前团队的 **Bots** 页面，选择进入指定 Bot。

  2. 在 **Bots** 编排页面的**工作流** 区域，单击右侧的加号图标。

  3. 在**添加工作流** 对话框，在**我创建的** 页面选择自建的工作流。

  * 

![img](https://i-blog.csdnimg.cn/blog_migrate/59dfe6d72e3fcb2671485862c59f0c57.png)

  1. 在 Bot 的**人设与回复逻辑** 区域，引用工作流的名称来调用工作流。

  * 

![img](https://i-blog.csdnimg.cn/blog_migrate/892e85e91323b60bd9fb340c3af6037f.png)

其他操作

复制工作流

在某一工作流的编辑页面，单击右上角的**创建副本** 图标，可以将该工作流复制到你的**工作流** 列表中。

删除工作流

对于不再需要使用的工作流，你可以在**工作流** 列表内找到该工作流，并在**操作** 列单击删除图标。

注意

如果工作流已添加至 Bot，在删除时会同步删除 Bot 中的工作流。

![外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传](https://i-blog.csdnimg.cn/blog_migrate/dfcad8bc626587c5432d74e174292f38.png)![img](https://i-blog.csdnimg.cn/blog_migrate/eb21b505e02a1aefbb6f8a55d5129520.png)

