---
title: "亚马逊云科技全面托管DeepSeek-R1模型现已上线"
date: Fri Jan 02 2026 23:56:25 GMT+0800 (China Standard Time)
category: "人工智能"
tags: ["#科技","#人工智能","#大数据"]
summary: ""
author: "xianyu120"
status: "Published"
---

#### 文章目录

  *     *       * 亚马逊云科技全面托管DeepSeek-R1模型现已上线
      * 在Amazon Bedrock中开始使用DeepSeek-R1模型
      * DeepSeek-R1现已可用

#### 亚马逊云科技全面托管DeepSeek-R1模型现已上线

>
> 亚马逊云科技提供众多免费云产品，可以访问：[亚马逊云科技](https://aws.amazon.com/cn/bedrock/deepseek/?trk=0811e1f1-bc5e-4a37-abd2-c76342654c4a&sc_channel=sm)

截至1月30日，DeepSeek-R1模型通过Amazon Bedrock Marketplace和Amazon Bedrock Custom Model
Import在Amazon Bedrock中正式可用。此后，数千名客户已在Amazon
Bedrock中部署了这些模型。客户们非常看重其强大的防护措施和全面的工具支持，以确保AI的安全部署。今天，我们通过扩展选项范围，包括全新的无服务器解决方案，进一步简化了在Amazon
Bedrock中使用DeepSeek的流程。

完全托管的DeepSeek-R1模型现已在Amazon
Bedrock中全面可用。亚马逊网络服务（亚马逊云科技）是首家以完全托管形式提供DeepSeek-R1模型的云服务提供商（CSP）。可以在亚马逊云科技上使用DeepSeek加速创新并交付切实的商业价值，而无需管理基础设施的复杂性。通过Amazon
Bedrock的完全托管服务，只需使用单个API即可为生成式AI应用程序提供DeepSeek-R1的功能支持，并享受其丰富的功能和工具带来的优势。

根据DeepSeek的说法，他们的模型在MIT许可下公开可用，具备强大的推理、编码和自然语言理解能力。这些能力支持智能决策、软件开发、数学问题解决、科学分析、数据洞察以及全面的知识管理系统。

与所有AI解决方案一样，在生产环境中实施时需谨慎考虑数据隐私要求，检查输出中的偏差，并监控结果。在实施像DeepSeek-R1这样的公开模型时，请考虑以下几点：

**数据安全** – 可以利用Amazon
Bedrock的企业级安全、监控和成本控制功能，这些功能对于负责任地大规模部署AI至关重要，同时可以完全掌控数据。用户的输入和模型输出不会与任何模型提供商共享。可以默认使用这些关键安全功能，包括静态和传输中的数据加密、细粒度访问控制、安全连接选项，并在与Amazon
Bedrock中的DeepSeek-R1模型通信时下载各种合规性认证。

**负责任的AI** – 可以通过[Amazon Bedrock
Guardrails](https://aws.amazon.com/bedrock/guardrails/)根据应用需求和负责任的AI政策实施定制的防护措施。这包括内容过滤、敏感信息过滤以及可定制的安全控制等关键功能，通过上下文
grounding
和自动化推理检查防止幻觉（hallucination）。这意味着可以通过定义的政策集控制用户与Bedrock中DeepSeek-R1模型的交互，过滤掉不受欢迎和有害的内容。

**模型评估** – 可以通过[Amazon Bedrock model evaluation
tools](https://aws.amazon.com/bedrock/model-
evaluation/)在几步之内评估和比较模型，以确定适合用例的最佳模型（包括DeepSeek-R1）。可以选择使用预定义指标（如准确性、鲁棒性和毒性）进行自动评估，或者选择基于主观或自定义指标（如相关性、风格和品牌声音一致性）的人工评估流程。模型评估提供内置的精选数据集，也可以引入自己的数据集。

我们强烈推荐将[Amazon Bedrock
Guardrails](https://aws.amazon.com/bedrock/guardrails/)和[Amazon Bedrock model
evaluation features](https://aws.amazon.com/bedrock/model-
evaluation/)与DeepSeek-R1模型集成，以为生成式AI应用程序提供强大的保护。欲了解更多信息，请访问[Protect your
DeepSeek model deployments with Amazon Bedrock
Guardrails](https://aws.amazon.com/blogs/aws/protect-your-deepseek-model-
deployments-with-amazon-bedrock-guardrails/)和[Evaluate the performance of
Amazon Bedrock resources](https://aws.amazon.com/blogs/aws/evaluate-the-
performance-of-amazon-bedrock-resources/)。

>
> 亚马逊云科技的[免费云产品](https://aws.amazon.com/cn/bedrock/deepseek/?trk=0811e1f1-bc5e-4a37-abd2-c76342654c4a&sc_channel=sm)，助您零成本开启云计算之旅，探索无限可能！

#### 在Amazon Bedrock中开始使用DeepSeek-R1模型

如果是DeepSeek-R1模型的新用户，请前往[Amazon Bedrock
console](https://console.aws.amazon.com/bedrock/)，在左侧导航栏中选择“Bedrock
configurations”下的“Model
access”。要访问完全托管的DeepSeek-R1模型，请在DeepSeek中为DeepSeek-R1请求访问权限。随后，将在Amazon
Bedrock中获得对该模型的访问权限。

  1. **访问DeepSeek-R1模型**

接下来，要在Amazon
Bedrock中测试DeepSeek-R1模型，请在左侧菜单栏中选择“Playgrounds”下的“Chat/Text”。然后在左上角选择“Select
model”，选择“DeepSeek”作为类别，“DeepSeek-R1”作为模型，然后点击“Apply”。

  2. **选择DeepSeek-R1模型**

使用选定的DeepSeek-R1模型，我运行了以下提示示例：

>
> 一个家庭有5000美元用于明年度假的储蓄。他们可以将钱存入年利率2%的储蓄账户，或者存入年利率4%的定期存款，但在这之前无法动用资金。如果他们在一年中需要1000美元的紧急支出，他们应如何在两种选择之间分配资金，以最大化他们的度假基金？

这个提示需要复杂的思维链，并产生非常精确的推理结果。

  3. **在Chat Playground中测试DeepSeek-R1**

要了解更多关于提示使用建议的信息，请参阅[DeepSeek-R1 model prompt
guide](https://docs.aws.amazon.com/bedrock/latest/userguide/deepseek-r1-prompt-
guide.html)。

通过选择“View API request”，还可以使用[Amazon Command Line Interface (Amazon
CLI)](https://aws.amazon.com/cli/)和[Amazon
SDK](https://aws.amazon.com/developer/tools/)中的代码示例访问模型。可以使用“us.deepseek.r1-v1:0”作为模型ID。

以下是Amazon CLI命令示例：

    
    
    aws bedrock-runtime invoke-model \
           --model-id us.deepseek.r1-v1:0 \
           --body "{\"prompt\": \"<｜begin_of_sentence｜><｜User｜>Type_Your_Prompt_Here<｜Assistant｜><think>\n\", \"max_tokens\": 512, \"temperature\": 0.5, \"top_p\": 0.9}" \
           --cli-binary-format raw-in-base64-out \
           --region us-west-2 \
           invoke-model-output.txt
    

该模型同时支持[InvokeModel](https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_InvokeModel.html)和[Converse](https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_Converse.html)
API。以下Python代码示例展示了如何使用Amazon Bedrock Converse
API向DeepSeek-R1模型发送文本消息以进行文本生成。欲了解更多信息，请访问[DeepSeek model inference parameters
and responses](https://docs.aws.amazon.com/bedrock/latest/userguide/deepseek-
inference-parameters.html)。

    
    
    import boto3
    from botocore.exceptions import ClientError
    
    # 在想使用的亚马逊云科技区域创建一个Bedrock Runtime客户端。
    client = boto3.client("bedrock-runtime", region_name="us-west-2")
    
    # 设置模型ID，例如DeepSeek-R1模型。
    model_id = "us.deepseek.r1-v1:0"
    
    # 开始与用户消息的对话。
    user_message = "Type_Your_Prompt_Here"
    conversation = [
        {
            "role": "user",
            "content": [{"text": user_message}],
        }
    ]
    
    try:
        # 使用基本推理配置将消息发送到模型。
        response = client.converse(
            modelId=model_id,
            messages=conversation,
            inferenceConfig={"maxTokens": 512, "temperature": 0.5, "topP": 0.9},
        )
    
        # 提取并打印响应文本。
        response_text = response["output"]["message"]["content"][0]["text"]
        print(response_text)
    
    except (ClientError, Exception) as e:
        print(f"ERROR: Can't invoke '{model_id}'. Reason: {e}")
        exit(1)
    

要为DeepSeek-R1模型启用[Amazon Bedrock
Guardrails](https://aws.amazon.com/bedrock/guardrails/)，在左侧导航栏中选择“Safeguards”下的“Guardrails”，通过配置所需数量的过滤器创建防护栏。例如，如果过滤“politics”这个词，防护栏将识别提示中的这个词并显示被阻止的消息。

可以使用不同的输入测试防护栏，以评估其性能。可以通过设置禁止主题、词语过滤器、敏感信息过滤器和阻止消息来调整防护栏，直到满足需求。

要了解更多关于[Amazon Bedrock
Guardrails](https://aws.amazon.com/bedrock/guardrails/)的信息，请访问[Stop harmful
content in models using Amazon Bedrock
Guardrails](https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html)或亚马逊云科技机器学习博客频道上关于Amazon
Bedrock Guardrails的其他深入博客文章。

以下是展示如何利用Amazon Bedrock中完全托管的DeepSeek-R1模型的演示演练：

#### DeepSeek-R1现已可用

DeepSeek-R1现已在Amazon
Bedrock中以完全托管形式提供，支持美国东部（弗吉尼亚北部）、美国东部（俄亥俄州）和美国西部（俄勒冈州）亚马逊云科技区域，通过跨区域推理提供服务。请查看完整的区域列表以获取未来更新。欲了解更多信息，请查看[DeepSeek
in Amazon Bedrock product
page](https://aws.amazon.com/bedrock/deepseek/)和[Amazon Bedrock pricing
page](https://aws.amazon.com/bedrock/pricing/)。

立即在[Amazon Bedrock
console](https://console.aws.amazon.com/bedrock/)中试用DeepSeek-R1模型，并通过[Amazon
re:Post for Amazon
Bedrock](https://repost.aws/tags/TAgvD8hH0xS5-OKpauTZOcEw/amazon-
bedrock)或常用的亚马逊云科技支持联系方式发送反馈。

— Channy

**2025年3月10日更新** — 修复了模型选择和模型ID的截图。

**2025年3月13日更新** — 添加了[DeepSeek-R1 model prompt
guide](https://docs.aws.amazon.com/bedrock/latest/userguide/deepseek-r1-prompt-
guide.html)和[DeepSeek model inference parameters and
responses](https://docs.aws.amazon.com/bedrock/latest/userguide/deepseek-
inference-parameters.html)的指南链接。

