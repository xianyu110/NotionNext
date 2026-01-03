---
title: "Meta Llama 3 模型与亚马逊 Bedrock 完美融合，释放无限潜能。如何通过SageMaker来部署和运行推理"
date: "2026-01-02T16:01:41.535164"
category: "人工智能"
tags: ["#llama", "#人工智能", "#大数据"]
summary: ""author: xianyu120
status: "Published"
---

#### 文章目录

  *     * Meta Llama 3模型现在在亚马逊Bedrock上可用
    *       * Llama 3 模型
      * Llama 3 模型的实际应用
    * 什么是 Meta Llama 3
    * 什么是 SageMaker JumpStart
    * 探索型号
    * 部署模型
    * 运行推理
    * 70B 型号的提示示例
    * 70B-Instruct 型号的示例提示
    * 清理
    * 结论

### Meta Llama 3模型现在在亚马逊Bedrock上可用

今天，宣布Meta 的 Llama 3 模型在 Amazon Bedrock 全面上市。 Meta Llama 3
专为构建、实验和负责任地扩展生成式人工智能(AI) 应用程序而设计。新的 Llama 3
模型最有能力支持广泛的用例，并在推理、代码生成和指令方面进行了改进。[更多免费试用产品链接](https://aws.amazon.com/cn/free/?trk=bfa73897-f4c3-46ee-
ac42-8a1ca7318b15&sc_channel=sm&campaign=blog1338)

#### Llama 3 模型

根据[Meta 的 Llama 3 公告](https://ai.meta.com/blog/meta-llama-3)，Llama 3
模型系列是一组经过预训练和指令调整的大型语言模型 (LLM)，参数大小为 8B 和 70B。这些模型已经过超过 15
万亿个令牌的数据训练，训练数据集比[Llama 2 模型](https://aws.amazon.com/blogs/aws/amazon-bedrock-
now-provides-access-to-llama-2-chat-13b-model/)使用的训练数据集大七倍，包括四倍多的代码，支持 8K
上下文长度，使 Llama 2 的容量增加了一倍。

现在可以在[Amazon Bedrock](https://aws.amazon.com/bedrock)中使用两种新的 Llama 3 模型，进一步增加
Amazon Bedrock 中的模型选择。这些模型使能够轻松试验和评估适合的用例的更多顶级基础模型 (FM)：

  * **Llama 3 8B** 非常适合有限的计算能力和资源以及边缘设备。该模型擅长文本摘要、文本分类、情感分析和语言翻译。
  * **Llama 3 70B** 非常适合内容创建、对话式 AI、语言理解、研究开发和企业应用程序。该模型擅长文本摘要和准确性、文本分类和细微差别、情感分析和细微差别推理、语言建模、对话系统、代码生成和遵循指令。

Meta 目前还在训练额外的 Llama 3 模型，参数大小超过 400B。这些 400B
模型将具有新功能，包括多模态、多语言支持和更长的上下文窗口。发布后，这些模型将非常适合内容创建、对话式 AI、语言理解、研发 (R&D) 和企业应用程序。

#### Llama 3 模型的实际应用

如果不熟悉使用元模型，请转到[Amazon Bedrock
控制台](https://console.aws.amazon.com/bedrock/)并选择左下窗格中的**模型访问** 。要从 Meta 访问最新的
Llama 3 模型，请单独请求访问**Llama 3 8B Instruct** 或**Llama 3 70B Instruct** 。

![img](https://i-blog.csdnimg.cn/blog_migrate/9553ae596f6d19dd7c26480ebe35bc67.jpeg)

要在 Amazon Bedrock 控制台中测试 Meta Llama 3 模型，请选择左侧菜单窗格中**Playground** 下的**文本**
或**聊天** 。然后选择**选择模型** 并选择**Meta** 作为类别，选择**Llama 8B Instruct** 或**Llama 3 70B
Instruct** 作为模型。

![img](https://i-blog.csdnimg.cn/blog_migrate/fe010f93833c8b4014596a11a4aa1d14.jpeg)

通过选择**View API request ，还可以使用**[命令行界面 (亚马逊云科技
CLI)](https://aws.amazon.com/cli/)和
[亚马逊云科技](https://aws.amazon.com/cn/free/?trk=bfa73897-f4c3-46ee-
ac42-8a1ca7318b15&sc_channel=sm&campaign=blog1338)开发工具包中的代码示例访问模型。可以使用模型
ID，例如`meta.llama3-8b-instruct-v1`或`meta.llama3-70b-instruct-v1`。

以下是 亚马逊云科技 CLI 命令的示例：

    
    
    $ aws bedrock-runtime invoke-model \
      --model-id meta.llama3-8b-instruct-v1:0 \
      --body "{\"prompt\":\"Simply put, the theory of relativity states that\\n the laws of physics are the same everywhere in the universe, and that the passage of time and the length of objects can vary depending on their speed and position in a gravitational field \",\"max_gen_len\":512,\"temperature\":0.5,\"top_p\":0.9}" \
      --cli-binary-format raw-in-base64-out \
      --region us-east-1 \
      invoke-model-output.txt
    

可以使用[亚马逊云科技](https://aws.amazon.com/cn/free/?trk=bfa73897-f4c3-46ee-
ac42-8a1ca7318b15&sc_channel=sm&campaign=blog1338) 开发工具包使用[Amazon Bedrock
的代码示例](https://docs.aws.amazon.com/bedrock/latest/userguide/service_code_examples.html)来使用各种编程语言构建应用程序。以下
Python 代码示例展示了如何调用 Amazon Bedrock 中的 Llama 3 Chat 模型来生成文本。

    
    
    def invoke_llama3(self, prompt):
            try:
                body = {
                    "prompt": prompt,
                    "temperature": 0.5,
                    "top_p": 0.9,
                    "max_gen_len": 512,
                }
    
                response = self.bedrock_runtime_client.invoke_model(
                    modelId="meta.llama3-8b-instruct-v1:0", body=json.dumps(body)
                )
    
                response_body = json.loads(response["body"].read())
                completion = response_body["generation"]
    
                return completion
    
            except ClientError:
                logger.error("Couldn't invoke Llama 3")
                raise
    

可以使用这些 Llama 3 模型执行各种任务，例如问答、语言翻译、情感分析等。以下是 Llama 3
模型的示例，其中提供了模型可用的训练样本，其中包含少量上下文学习。

    
    
    Input: Translate English to French:
    sea otter => loutre de mer
    peppermint => menthe poivrée
    plush girafe => girafe peluche
    cheese =>
    Output:  fromage
    panda => panda
    penguin => pingouin
    polar bear => ours polaire
    puffin => macareux
    sloth => paresseux
    walrus => morse
    whale => baleine
    zebra => z\u00e8bre
    
    Translate English to German:
    sea otter => Seeotter
    

还可以使用针对对话用例优化的 Llama 3
指令模型。指令模型端点的输入是聊天助手和用户之间的先前历史记录。因此，可以提出与目前已发生的对话相关的问题，并提供系统配置，例如角色，它按以下格式定义聊天助理的行为：

    
    
    <|begin_of_text|><|start_header_id|>system<|end_header_id|>
    [SYSTEM_TEXT]<|eot_id|><|start_header_id|>user<|end_header_id|>
    [USER_TEXT]<|eot_id|><|start_header_id|>assistant<|end_header_id|>
    

在以下示例中，用户与助理就巴黎的旅游景点进行对话。然后，用户查询聊天助手推荐的第一个选项。

![img](https://i-blog.csdnimg.cn/blog_migrate/8af031f5b488a7752b8532be0d3606e9.jpeg)

    
    
    Input: <|begin_of_text|><|start_header_id|>user<|end_header_id|>\n\n
    I am going to Paris, what should I see?<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n
    Paris, the capital of France, is known for its stunning architecture, art museums, historical landmarks, and romantic atmosphere. Here are some of the top attractions to see in Paris:\n\n
    1. The Eiffel Tower: The iconic Eiffel Tower is one of the most recognizable landmarks in the world and offers breathtaking views of the city.\n
    2. The Louvre Museum: The Louvre is one of the world's largest and most famous museums, housing an impressive collection of art and artifacts, including the Mona Lisa.\n
    3. Notre-Dame Cathedral: This beautiful cathedral is one of the most famous landmarks in Paris and is known for its Gothic architecture and stunning stained glass windows.\n\n
    These are just a few of the many attractions that Paris has to offer. With so much to see and do, it's no wonder that Paris is one of the most popular tourist destinations in the world.<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n
    What is so great about #1?<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n
    Output: The Eiffel Tower! It's an iconic symbol of Paris and one of the most recognizable landmarks in the world. Here are some reasons why it's so great:\n\n
    1. **Engineering marvel**: When it was built for the 1889 World's Fair, the Eiffel Tower was a groundbreaking feat of engineering. It was the tallest structure in the world at the time, standing at 324 meters (1,063 feet).\n
    2. **Panoramic views**: The Eiffel Tower offers breathtaking 360-degree views of the city from its observation decks. You can see many of Paris' famous landmarks, such as the Seine River, the Louvre, and Montmartre.\n
    3. **Romantic atmosphere**: The Eiffel Tower is often associated with romance and is a popular spot for proposals, weddings, and romantic dinners. The tower's iron latticework and twinkling lights at night add to its romantic ambiance.\n
    4. **Historical significance**: The Eiffel Tower has played a significant role in French history, serving as a communication tower during World War I and a symbol of French culture and engineering.\n
    5. **Accessibility**: The Eiffel Tower is easily accessible by public transportation or on foot, and there are various ways to experience it, including taking the stairs, elevator, or a guided tour.\n
    6. **Nighttime spectacle**: The Eiffel Tower is even more magical at night, when it's illuminated with thousands of twinkling lights. The light show, known as the \"Eiffel Tower Sparkle,\" takes place every hour on the hour from dusk to midnight.\n
    7. **Iconic status**: The Eiffel Tower has been featured in countless films, literature, and art, making it an instantly recognizable symbol of Paris and France.\n\n
    Overall, the Eiffel Tower is a must-visit attraction in Paris, offering a unique combination of history, engineering, romance, and stunning views.
    

Meta Llama 3 基础模型可通过 [Amazon SageMaker
JumpStart](https://aws.amazon.com/sagemaker/jumpstart/)来部署和运行推理。 Llama 3
模型是预先训练和微调的生成文本模型的集合。

在这篇文章中，将介绍如何通过 SageMaker JumpStart 发现和部署 Llama 3 模型。

### 什么是 Meta Llama 3

Llama 3 有两种参数大小 - 8B 和 70B，上下文长度为 8k - 可以支持广泛的用例，并在推理、代码生成和指令跟踪方面进行改进。 Llama 3
使用仅解码器的转换器架构和新的分词器，以 128k 大小提供改进的模型性能。此外，Meta
改进了训练后程序，大大降低了错误拒绝率，改善了对齐，并增加了模型响应的多样性。现在，可以通过 Amazon SageMaker 功能（例如
SageMaker Pipelines、SageMaker Debugger 或容器日志）获得 Llama 3 性能和 MLOps
控制的综合优势。此外，该模型将部署在的 VPC 控制下的
[亚马逊云科技](https://aws.amazon.com/cn/free/?trk=bfa73897-f4c3-46ee-
ac42-8a1ca7318b15&sc_channel=sm&campaign=blog1338) 安全环境中，帮助提供数据安全。

### 什么是 SageMaker JumpStart

借助 SageMaker JumpStart，可以从多种公开可用的基础模型中进行选择。 ML 从业者可以将基础模型从网络隔离环境部署到专用
SageMaker 实例，并使用 SageMaker 自定义模型以进行模型训练和部署。现在，只需在[Amazon SageMaker
Studio](https://docs.aws.amazon.com/sagemaker/latest/dg/studio.html)中单击几下或通过
SageMaker Python SDK 以编程方式发现和部署 Llama 3 模型 ，即可使用[SageMaker
Pipelines](https://aws.amazon.com/sagemaker/pipelines/)、[SageMaker
Debugger](https://docs.aws.amazon.com/sagemaker/latest/dg/train-
debugger.html)或容器日志等 SageMaker 功能获得模型性能和 MLOps 控制。该模型部署在 亚马逊云科技 安全环境中并受的 VPC
控制，有助于提供数据安全。 Llama 3 模型现已推出，可在`us-east-1`（弗吉尼亚北部）、`us-east-2`（俄亥俄）、`us-
west-2`（俄勒冈）、`eu-west-1`（爱尔兰）和`ap-northeast-1`（东京）亚马逊云科技 区域的 Amazon SageMaker
Studio 中进行部署和推理。

### 探索型号

可以通过 SageMaker Studio UI 和 SageMaker Python SDK 中的 SageMaker JumpStart
访问基础模型。在本节中，将介绍如何在 SageMaker Studio 中发现模型。

SageMaker Studio 是一个集成开发环境 (IDE)，提供基于 Web 的单一可视化界面，可以在其中访问专用工具来执行所有 ML
开发步骤，从准备数据到构建、训练和部署 ML 模型。有关如何开始和设置 SageMaker Studio 的更多详细信息，请参阅[Amazon
SageMaker Studio](https://docs.aws.amazon.com/sagemaker/latest/dg/studio-
updated.html)。

在 SageMaker Studio 中，可以访问 SageMaker
JumpStart，其中包含预训练模型、笔记本和预构建解决方案，位于**预构建和自动化解决方案** 下。

![img](https://i-blog.csdnimg.cn/blog_migrate/13b570e9a5b7ad4aa949fe43daf13257.jpeg)

在 SageMaker JumpStart 登录页面中，可以通过浏览以模型提供商命名的不同中心轻松发现各种模型。可以在 Meta hub 中找到 Llama
3 模型。如果没有看到 Llama 3 模型，请通过关闭并重新启动来更新的 SageMaker Studio 版本。有关更多信息，请参阅[关闭和更新
Studio 经典应用程序](https://docs.aws.amazon.com/sagemaker/latest/dg/studio-tasks-
update-apps.html)。

![img](https://i-blog.csdnimg.cn/blog_migrate/8dfed4905084f5473e7975c9d9719dd2.jpeg)

可以通过在左上角的搜索框中搜索“Meta-llama-3”来找到 Llama 3 型号。

![img](https://i-blog.csdnimg.cn/blog_migrate/f03715753b5cd951b24c0a49d7f52f1b.jpeg)

可以通过单击 Meta 中心发现 SageMaker JumpStart 中可用的所有 Meta 模型。

![img](https://i-blog.csdnimg.cn/blog_migrate/4eb957e9109c279f002f298da28a9c88.jpeg)

单击模型卡片将打开相应的模型详细信息页面，可以从中轻松部署模型。

![img](https://i-blog.csdnimg.cn/blog_migrate/08e46b9be57cf2d936dd0e093538a508.jpeg)

### 部署模型

当选择**部署** 并确认 EULA 条款时，部署将开始。

![img](https://i-blog.csdnimg.cn/blog_migrate/c9d57afc4d10034274339758516bc373.jpeg)

可以在单击“部署”按钮后显示的页面上监控部署进度。

![img](https://i-blog.csdnimg.cn/blog_migrate/410e11917c1582bb905b4dd8aac0ed55.jpeg)

或者，可以选择**“打开笔记本”**以通过示例笔记本进行部署。该示例笔记本提供了有关如何部署模型进行推理和清理资源的端到端指导。

要使用笔记本进行部署，首先要选择适当的模型，由 `model_id`.可以使用以下代码在 SageMaker 上部署任何选定的模型。

    
    
    from sagemaker.jumpstart.model import JumpStartModel
    
    model = JumpStartModel(model_id = "meta-textgeneration-llama-3-70b-instruct")
    predictor = model.deploy(accept_eula=False)
    

默认 `accept_eula`设置为`False`。需要手动接受 EULA 才能成功部署端点。这样做即表示接受用户许可协议和可接受的使用策略。还可以[在
Llama 网站上](https://ai.meta.com/resources/models-and-libraries/llama-
downloads/)找到许可协议 。这会使用默认配置（包括默认实例类型和默认 VPC 配置）在 SageMaker 上部署模型。可以通过在
中指定非默认值来更改这些配置`JumpStartModel`。要了解更多信息，请参阅以下
[文档](https://sagemaker.readthedocs.io/en/stable/api/inference/model.html#sagemaker.jumpstart.model.JumpStartModel)。

下表列出了 SageMaker JumpStart 中可用的所有 Llama 3 模型，以及
`model_ids`每个模型支持的默认实例类型和最大总令牌数（输入令牌数和生成令牌数的总和）。

型号名称| 型号编号| 最大总代币数| 默认实例类型  
---|---|---|---  
元骆驼-3-8B| 元文本生成-llama-3-8b| 8192| ml.g5.12xlarge  
Meta-Llama-3-8B-指令| 元文本生成-llama-3-8b-指令| 8192| ml.g5.12xlarge  
元羊驼-3-70B| 元文本生成-llama-3-70b| 8192| ml.p4d.24xlarge  
Meta-Llama-3-70B-指令| 元文本生成-llama-3-70b-指令| 8192| ml.p4d.24xlarge  
  
### 运行推理

部署模型后，可以通过 SageMaker 预测器对部署的终端节点运行推理。经过微调的指令模型（Llama 3：8B Instruct 和 70B
Instruct）接受用户和聊天助理之间的聊天历史记录，并生成后续聊天。预训练模型（Llama 3：8B 和
70B）需要字符串提示并根据提供的提示执行文本完成。

    
    
    predictor.predict(payload)
    

推理参数控制端点处的文本生成过程。 Max
新标记控制模型生成的输出的大小。这与单词数不同，因为模型的词汇与英语词汇不同，并且每个标记可能不是英语单词。温度参数控制输出的随机性。较高的温度会产生更多的创造性和幻觉输出。所有推理参数都是可选的。

### 70B 型号的提示示例

可以使用 Llama 3 模型完成任何文本片段的文本补全。通过文本生成，可以执行各种任务，例如问答、语言翻译和情感分析等。端点的输入有效负载类似于以下代码：

    
    
    payload = {
        “inputs”: str,
       (optional)"parameters":{"max_new_tokens":int, "top_p":float, "temperature":float}
    }
    

以下是一些示例提示和模型生成的文本。所有输出都是使用推理参数生成的 `{"max_new_tokens":64, "top_p":0.9,
"temperature":0.6}`。

    
    
    Input: Simply put, the theory of relativity states that
    Output: 1) the laws of physics are the same for all observers, and 2) the speed of light is constant for all observers. The first part of the theory is known as the special theory of relativity, and the second part is known as the general theory of relativity.\nThe special theory of relativity states
    
    Input: I believe the meaning of life is
    Output:  to live a life of purpose, on purpose. I believe that we are all here to make a difference in the world, and that we are all here to make a difference in the lives of others. I believe that we are all here to make a difference in the world, and that we are all here to mak
    
    Input: A brief message congratulating the team on the launch:\n\nHi everyone,\n\nI just 
    Output: wanted to say congratulations on the launch of the new website! It looks great and I'm sure it will be a valuable resource for our customers. I know that a lot of hard work went into making this happen, so thank you all for your efforts.\n\nBest regards,\nJohn Doe\n
    

在下一个示例中，将展示如何使用 Llama 3
模型进行少量镜头上下文学习，其中为模型提供可用的训练样本。仅对已部署的模型进行推理，在此过程中，模型权重不会改变。

    
    
    Input:
    Translate English to French:\nsea otter => loutre de mer\npeppermint => menthe poivrée\nplush girafe => girafe peluche\ncheese =>
    Output:  fromage\npanda => panda\npenguin => pingouin\npolar bear => ours polaire\npuffin => macareux\nsloth => paresseux\nwalrus => morse\nwhale => baleine\nzebra => z\u00e8bre\nTranslate English to German:\n
    

### 70B-Instruct 型号的示例提示

通过针对对话用例进行优化的 Llama 3
指令模型，指令模型端点的输入是聊天助手和用户之间的先前历史记录。可以提出与目前所发生的对话相关的问题。还可以提供系统配置，例如定义聊天助理行为的角色。虽然输入有效负载格式与基本预训练模型相同，但输入文本应按以下方式格式化：

    
    
    <|begin_of_text|><|start_header_id|>system<|end_header_id|>
    
    [SYSTEM_TEXT]<|eot_id|><|start_header_id|>user<|end_header_id|>
    
    [USER_TEXT]<|eot_id|><|start_header_id|>assistant<|end_header_id|>
    

在此说明模板中，可以选择从一个`system`
角色开始，并在回合历史记录中包含所需数量的交替角色。最后的角色应该始终`assistant`以两个新的换行符结束。

接下来，考虑模型的一些示例提示和响应。在以下示例中，用户向助理询问一个简单的问题。

    
    
    Input: <|begin_of_text|><|start_header_id|>user<|end_header_id|>\n\nwhat is the recipe of mayonnaise?<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n
    Output: The classic condiment! Mayonnaise is a thick, creamy emulsion sauce made from a combination of oil, egg yolks, acid (such as vinegar or lemon juice), and seasonings. Here's a simple recipe to make mayonnaise at home:\n\n**Ingredients:**\n\n* 2 egg yolks\n* 1 tablespoon lemon juice or vinegar (such as apple cider vinegar or white wine vinegar)\n* 1/2 teaspoon Dijon mustard (optional, but recommended for flavor)\n* 1/2 cup (120 ml) neutral-tasting oil, such as canola, grapeseed, or sunflower oil\n* Salt, to taste\n\n**Instructions:**\n\n1. **Start with room temperature ingredients**: This is crucial for emulsification to occur.\n2. **In a medium-sized bowl**, whisk together the egg yolks, lemon juice or vinegar, and Dijon mustard (if using) until well combined.\n3. **Slowly add the oil**: While continuously whisking the egg yolk mixture, slowly pour in the oil in a thin, steady stream. Start with a very slow drizzle and gradually increase the flow as the mixture thickens.\n4. **Whisk constantly**: Keep whisking until the mixture has doubled in volume and has a thick, creamy consistency. This should take about 5-7 minutes.\n5. **Check the consistency**: Stop whisking when the mayonnaise has reached the desired consistency. It should be smooth, thick, and hold its shape when the whisk is lifted.\n6. **Season with salt**: Add salt to taste, and whisk until well combined.\n7. **Taste and adjust**: If the mayonnaise is too thick, add a little water. If it's not thick enough, add a little more oil.\n\n**Tips and Variations:**\n\n* Use a neutral-tasting oil to avoid flavoring the mayonnaise.\n* If you're using a stand mixer, use the whisk attachment and start with a slow speed, increasing as needed.\n* Add flavorings like minced garlic, chopped fresh herbs (e.g., parsley, dill, or tarragon), or grated ginger to create different flavor profiles.\n* For a lighter mayonnaise, use only 1 egg yolk or add a little water to thin it out.\n* If the mayonnaise breaks or separates, don't worry! Simply start again with a new egg yolk and slowly whisk in the broken mayonnaise.\n\n**Homemade Mayonnaise vs. Store-Bought:**\n\nWhile store-bought mayonnaise is convenient, homemade mayonnaise offers several advantages:\n\n* Freshness: Homemade mayonnaise is made to order, ensuring optimal flavor and texture.\n* Customization: You can tailor the flavor to your liking with various seasonings and ingredients.\n* No preservatives: Homemade mayonnaise doesn't contain added preservatives, making it a healthier option.\n\nEnjoy your freshly made mayonnaise!
    

在以下示例中，用户与助理就巴黎的旅游景点进行对话。然后用户询问聊天助手推荐的第一个选项。

    
    
    Input: <|begin_of_text|><|start_header_id|>user<|end_header_id|>\n\nI am going to Paris, what should I see?<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\nParis, the capital of France, is known for its stunning architecture, art museums, historical landmarks, and romantic atmosphere. Here are some of the top attractions to see in Paris:\n\n1. The Eiffel Tower: The iconic Eiffel Tower is one of the most recognizable landmarks in the world and offers breathtaking views of the city.\n2. The Louvre Museum: The Louvre is one of the world's largest and most famous museums, housing an impressive collection of art and artifacts, including the Mona Lisa.\n3. Notre-Dame Cathedral: This beautiful cathedral is one of the most famous landmarks in Paris and is known for its Gothic architecture and stunning stained glass windows.\n\nThese are just a few of the many attractions that Paris has to offer. With so much to see and do, it's no wonder that Paris is one of the most popular tourist destinations in the world.<|eot_id|><|start_header_id|>user<|end_header_id|>\n\nWhat is so great about #1?<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n
    Output: The Eiffel Tower! It's an iconic symbol of Paris and one of the most recognizable landmarks in the world. Here are some reasons why it's so great:\n\n1. **Engineering marvel**: When it was built for the 1889 World's Fair, the Eiffel Tower was a groundbreaking feat of engineering. It was the tallest structure in the world at the time, standing at 324 meters (1,063 feet).\n2. **Panoramic views**: The Eiffel Tower offers breathtaking 360-degree views of the city from its observation decks. You can see many of Paris' famous landmarks, such as the Seine River, the Louvre, and Montmartre.\n3. **Romantic atmosphere**: The Eiffel Tower is often associated with romance and is a popular spot for proposals, weddings, and romantic dinners. The tower's iron latticework and twinkling lights at night add to its romantic ambiance.\n4. **Historical significance**: The Eiffel Tower has played a significant role in French history, serving as a communication tower during World War I and a symbol of French culture and engineering.\n5. **Accessibility**: The Eiffel Tower is easily accessible by public transportation or on foot, and there are various ways to experience it, including taking the stairs, elevator, or a guided tour.\n6. **Nighttime spectacle**: The Eiffel Tower is even more magical at night, when it's illuminated with thousands of twinkling lights. The light show, known as the \"Eiffel Tower Sparkle,\" takes place every hour on the hour from dusk to midnight.\n7. **Iconic status**: The Eiffel Tower has been featured in countless films, literature, and art, making it an instantly recognizable symbol of Paris and France.\n\nOverall, the Eiffel Tower is a must-visit attraction in Paris, offering a unique combination of history, engineering, romance, and stunning views.
    

在以下示例中，设置系统的配置。

    
    
    Input: <|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\nAlways answer with Haiku<|eot_id|><|start_header_id|>user<|end_header_id|>\n\nI am going to Paris, what should I see?<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n
    Output: Eiffel's iron lace\nRiver Seine's gentle flow by\nMontmartre's charm calls
    Input: <|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\nAlways answer with emojis<|eot_id|><|start_header_id|>user<|end_header_id|>\n\nHow to go from Beijing to NY?<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n
    Output:  join 🇺🇸
    

### 清理

运行完笔记本后，请确保删除在此过程中创建的所有资源，以便停止计费。使用以下代码：

    
    
    predictor.delete_model()
    predictor.delete_endpoint()
    

### 结论

在这篇文章中，向展示了如何在 SageMaker Studio 中开始使用 Llama 3 模型。现在可以访问四个包含数十亿个参数的 Llama 3
基础模型。由于基础模型是经过预训练的，因此它们还可以帮助降低培训和基础设施成本，并支持针对的用例进行定制。立即查看SageMaker Studio
中的[SageMaker JumpStart](https://aws.amazon.com/sagemaker/jumpstart/)以开始使用。

