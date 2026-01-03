---
title: "使用 LlamaIndex 和 Llama 2-Chat 构建知识驱动的对话应用程序"
date: "2026-01-02T16:02:02.180107"
category: "人工智能"
tags: ["#llama"]
summary: ""author: xianyu120
status: "Published"
---

#### 文章目录

  * 使用 LlamaIndex 和 Llama 2-Chat 构建知识驱动的对话应用程序
  *     *       * Llama 2-70B-聊天
      * LlamaIndex
    * 解决方案概述
    * 先决条件
    * 使用 SageMaker JumpStart 部署 GPT-J 嵌入模型
    * 使用 SageMaker Python SDK 进行部署
    * 在 SageMaker Studio 中使用 SageMaker JumpStart 进行部署
    * 使用 SageMaker JumpStart 部署和测试 Llama 2-Chat
    * 使用 LlamaIndex 构建 RAG
    * 使用LangChain工具和代理
    * 清理
    * 结论

## 使用 LlamaIndex 和 Llama 2-Chat 构建知识驱动的对话应用程序

从大量文本中解锁准确且富有洞察力的答案是大型语言模型 (LLM) 所实现的一项令人兴奋的功能。在构建 LLM
应用程序时，通常需要连接和查询外部数据源以为模型提供相关上下文。一种流行的方法是使用检索增强生成（RAG）来创建问答系统，该系统可以理解复杂的信息并对查询提供自然的响应。
RAG 允许模型利用庞大的知识库，并为聊天机器人和企业搜索助手等应用程序提供类似人类的对话。

在这篇文章中，将探讨如何利用[LlamaIndex](https://www.llamaindex.ai/)、[Llama
2-70B-Chat](https://llama.meta.com/)和[LangChain](https://www.langchain.com/)的强大功能来构建强大的问答应用程序。借助这些最先进的技术，LLM可以提取文本语料库、索引关键知识并生成准确、清晰地回答用户问题的文本。以下产品均可在[亚马逊云科技](https://mic.anruicloud.com/url/1327)海外区免费试用，链接:<https://aws.amazon.com/cn/free/>

#### Llama 2-70B-聊天

Llama 2-70B-Chat 是一个强大的大语言模型，可与领先模型竞争。它经过了 2 万亿个文本标记的预训练，Meta
打算将其用于为用户提供聊天帮助。预训练数据来源于公开数据，截止日期为 2022 年 9 月，微调数据截止日期为 2023 年 7
月。有关模型训练过程、安全注意事项、学习内容和预期用途的更多详细信息，请参阅论文[Llama 2
：开放基础和微调聊天模型](https://arxiv.org/pdf/2307.09288.pdf)。 Llama 2 模型可在[Amazon
SageMaker
JumpStart](https://aws.amazon.com/sagemaker/jumpstart/)上使用，以实现快速、简单的部署。

#### LlamaIndex

[LlamaIndex](https://www.llamaindex.ai/)是一个可以构建 LLM
应用程序的数据框架。它提供的工具提供数据连接器，以各种来源和格式（PDF、文档、API、SQL 等）摄取现有数据。无论LLM的数据存储在数据库还是 PDF
中，LlamaIndex 都可以让LLM轻松地将这些数据用于LLM。正如在这篇文章中所演示的，LlamaIndex API
使数据访问变得毫不费力，并使LLM能够创建强大的自定义 LLM 应用程序和工作流程。

如果LLM正在尝试和构建 LLM，LLM可能会熟悉 LangChain，它提供了一个强大的框架，简化了 LLM
支持的应用程序的开发和部署。与LangChain类似，LlamaIndex提供了许多工具，包括数据连接器、数据索引、引擎和数据代理，以及工具和可观察性、追踪性和评估性等应用集成。
LlamaIndex 致力于弥合数据和强大的LLM之间的差距，通过用户友好的功能简化数据任务。 LlamaIndex 专为构建搜索和检索应用程序（例如
RAG）而设计和优化，因为它提供了一个用于查询 LLM 和检索相关文档的简单界面。

### 解决方案概述

在这篇文章中，演示如何使用 LlamaIndex 和 LLM 创建基于 RAG 的应用程序。下图显示了以下各节中概述的该解决方案的分步架构。

![img](https://i-blog.csdnimg.cn/blog_migrate/4f5e8491ea0a42e4694c5186aa64f7bc.jpeg)

RAG 将信息检索与自然语言生成相结合，以产生更有洞察力的响应。出现提示时，RAG
首先搜索文本语料库以检索与输入最相关的示例。在响应生成过程中，模型会考虑这些示例来增强其功能。通过合并相关检索到的段落，与基本生成模型相比，RAG
响应往往更加真实、连贯且与上下文一致。这种检索-生成框架利用了检索和生成的优势，有助于解决纯自回归会话模型可能出现的重复和缺乏上下文等问题。 RAG
引入了一种有效的方法来构建对话代理和人工智能助手，并提供情境化的高质量响应。

构建解决方案包括以下步骤：

  1. [将Amazon SageMaker Studio](https://aws.amazon.com/sagemaker/studio/)设置为开发环境并安装所需的依赖项。
  2. 从 Amazon SageMaker JumpStart 中心部署嵌入模型。
  3. 下载新闻稿作为的外部知识库。
  4. 根据新闻稿构建索引，以便能够查询并将其作为附加上下文添加到提示中。
  5. 查询知识库。
  6. 使用 LlamaIndex 和 LangChain 代理构建问答应用程序。

### 先决条件

在此示例中，LLM需要一个具有 SageMaker 域和适当的[亚马逊云科技](https://mic.anruicloud.com/url/1327)
Identity and Access Management (IAM)
权限的[亚马逊云科技](https://mic.anruicloud.com/url/1327) 账户。有关账户设置说明，请参阅[创建 亚马逊云科技
账户](https://docs.aws.amazon.com/sagemaker/latest/dg/gs-set-up.html#gs-
account)。如果LLM还没有 SageMaker 域，请参阅[Amazon SageMaker
域](https://docs.aws.amazon.com/sagemaker/latest/dg/gs-studio-
onboard.html)概述来创建一个。在本文中，使用[AmazonSageMakerFullAccess](https://docs.aws.amazon.com/aws-
managed-
policy/latest/reference/AmazonSageMakerFullAccess.html)角色。不建议LLM在生产环境中使用此凭据。相反，LLM应该创建并使用具有最低权限的角色。LLM还可以探索如何使用[Amazon
SageMaker Role Manager](https://docs.aws.amazon.com/sagemaker/latest/dg/role-
manager.html)直接通过 SageMaker 控制台构建和管理基于角色的 IAM 角色，以满足常见的机器学习需求。

此外，LLM至少需要访问以下实例大小：

  * **ml.g5.2xlarge用于部署**[Hugging Face GPT-J](https://huggingface.co/docs/transformers/model_doc/gptj)文本嵌入模型时的端点使用
  * **ml.g5.48xlarge** 用于部署 Llama 2-Chat 模型端点时的端点使用

要增加配额，请参阅[请求增加配额](https://docs.aws.amazon.com/servicequotas/latest/userguide/request-
quota-increase.html)。

### 使用 SageMaker JumpStart 部署 GPT-J 嵌入模型

本部分为LLM提供部署 SageMaker JumpStart 模型时的两个选项。LLM可以使用提供的代码进行基于代码的部署，或使用 SageMaker
JumpStart 用户界面 (UI)。

### 使用 SageMaker Python SDK 进行部署

LLM可以使用 SageMaker Python SDK 来部署 LLM，如存储库中提供的[代码](https://github.com/aws-
samples/llms-amazon-bedrock-
sagemaker/blob/main/rag_llamaindex_sagemaker/3-llm-llamaindex-
langchain.ipynb)所示。完成以下步骤：

  1. 使用以下命令设置用于部署嵌入模型的实例大小`instance_type = "ml.g5.2xlarge"`
  2. 找到用于嵌入的模型的 ID。在 SageMaker JumpStart 中，它被标识为`model_id = "huggingface-textembedding-gpt-j-6b-fp16"`
  3. 检索预先训练的模型容器并将其部署以进行推理。

成功部署嵌入模型后，SageMaker 将返回模型端点的名称和以下消息：

### 在 SageMaker Studio 中使用 SageMaker JumpStart 进行部署

要在 Studio 中使用 SageMaker JumpStart 部署模型，请完成以下步骤：

  1. 在 SageMaker Studio 控制台上，在导航窗格中选择 JumpStart。  
![img](https://i-blog.csdnimg.cn/blog_migrate/6186b61ec4f67180adce81ed65e37cf8.png)

  2. 搜索并选择 GPT-J 6B Embedding FP16 型号。
  3. 选择部署并自定义部署配置。  
![img](https://i-blog.csdnimg.cn/blog_migrate/0ea02f316ad109af617bc39c131faf51.png)

  4. 对于此示例，需要一个 ml.g5.2xlarge 实例，这是 SageMaker JumpStart 建议的默认实例。
  5. 再次选择部署以创建端点。

端点大约需要 5-10 分钟才能投入使用。

![img](https://i-blog.csdnimg.cn/blog_migrate/8b738723826fd51706e94a0868af2378.png)

部署嵌入模型后，为了使用 LangChain 与 SageMaker API
的集成，LLM需要创建一个函数来处理输入（原始文本）并使用模型将其转换为嵌入。LLM可以通过创建一个名为
的类来完成此操作`ContentHandler`，该类接受输入数据的 JSON，并返回文本嵌入的 JSON：`class
ContentHandler(EmbeddingsContentHandler).`

将模型端点名称传递给`ContentHandler`函数以转换文本并返回嵌入：

    
    
    embeddings = SagemakerEndpointEmbeddings(endpoint_name='huggingface-textembedding-gpt-j-6b-fp16', region_name= aws_region, content_handler=emb_content_handler).
    

LLM可以在 SDK 的输出或 SageMaker JumpStart UI 的部署详细信息中找到端点名称。

LLM可以通过输入一些原始文本并运行函数来测试`ContentHandler`函数和端点是否按预期工作`embeddings.embed_query(text)`。LLM可以使用提供的示例`text
= "Hi! It's time for the beach"`或尝试LLM自己的文本。

### 使用 SageMaker JumpStart 部署和测试 Llama 2-Chat

现在LLM可以部署能够与用户进行交互式对话的模型。在本例中，选择 Llama 2-chat 模型之一，该模型通过以下方式识别

    
    
    my_model = JumpStartModel(model_id = "meta-textgeneration-llama-2-70b-f")
    

该模型需要使用 部署到实时端点`predictor = my_model.deploy()`。 SageMaker
将返回模型的端点名称，LLM可以将其用作`endpoint_name`稍后引用的变量。

LLM定义一个`print_dialogue`函数来将输入发送到聊天模型并接收其输出响应。有效负载包含模型的超参数，其中包括：

  * **max_new_tokens** – 指模型可以在其输出中生成的最大令牌数。
  * **top_p** – 指模型在生成输出时可以保留的令牌的累积概率
  * **温度** – 指模型生成的输出的随机性。温度大于 0 或等于 1 会增加随机性级别，而温度为 0 将生成最有可能的标记。

LLM应该根据LLM的用例选择超参数并对其进行适当的测试。 Llama 系列等型号要求LLM包含一个附加参数，表明LLM已阅读并接受最终用户许可协议
(EULA)：

    
    
    response = predictor.predict(payload, custom_attributes='accept_eula=true')
    

要测试模型，请替换输入有效负载的内容部分：`"content": "what is the recipe of
mayonnaise?"`。LLM可以使用自己的文本值并更新超参数以更好地理解它们。

与嵌入模型的部署类似，LLM可以使用 SageMaker JumpStart UI 部署 Llama-70B-Chat：

  1. 在 SageMaker Studio 控制台上，在导航窗格中选择**JumpStart**
  2. 搜索并选择`Llama-2-70b-Chat model`
  3. 接受 EULA 并选择**Deploy** ，再次使用默认实例

与嵌入模型类似，LLM可以通过为聊天模型的输入和输出创建内容处理程序模板来使用 LangChain
集成。在这种情况下，LLM将输入定义为来自用户的输入，并指示它们受`system prompt`.它`system
prompt`告知模型其在帮助用户处理特定用例方面的作用。

除了上述超参数和自定义属性（EULA 接受）之外，调用模型时还会传递此内容处理程序。LLM可以使用以下代码解析所有这些属性：

    
    
    llm = SagemakerEndpoint(
            endpoint_name=endpoint_name,
            region_name="us-east-1",
            model_kwargs={"max_new_tokens":500, "top_p": 0.1, "temperature": 0.4, "return_full_text": False},
            content_handler=content_handler,
            endpoint_kwargs = {"CustomAttributes": "accept_eula=true"}
        )
    

当端点可用时，LLM可以测试它是否按预期工作。LLM可以`llm("what is amazon
sagemaker?")`使用自己的文本进行更新。LLM还需要定义`ContentHandler`使用 LangChain 调用 LLM
的具体内容，如代码[和](https://github.com/aws-samples/llms-amazon-bedrock-
sagemaker/blob/main/rag_llamaindex_sagemaker/3-llm-llamaindex-
langchain.ipynb)以下代码片段所示：

    
    
    class ContentHandler(LLMContentHandler):
        content_type = "application/json"
        accepts = "application/json"
        def transform_input(self, prompt: str, model_kwargs: dict) -> bytes:
                payload = {
                    "inputs": [
                        [
                            {
                                "role": "system",
                                "content": system_prompt,
                            },
                            {"role": "user", "content": prompt},
                        ],
                    ],
                    "parameters": model_kwargs,
                }
                input_str = json.dumps(
                    payload,
                )
                return input_str.encode("utf-8")
       
        def transform_output(self, output: bytes) -> str:
                response_json = json.loads(output.read().decode("utf-8"))
                content = response_json[0]["generation"]["content"]
                return content
            
    content_handler = ContentHandler()
    

### 使用 LlamaIndex 构建 RAG

要继续，请安装 LlamaIndex 以创建 RAG 应用程序。LLM可以使用 pip 安装 LlamaIndex：`pip install
llama_index`

LLM首先需要将数据（知识库）加载到 LlamaIndex 上以进行索引。这涉及几个步骤：

  1. 选择数据加载器：

[LlamaIndex
在LlamaHub](https://docs.llamaindex.ai/en/stable/understanding/loading/llamahub.html)上提供了许多可用的数据连接器，适用于
JSON、CSV
和文本文件等常见数据类型以及其他数据源，允许LLM提取各种数据集。在这篇文章中，使用`SimpleDirectoryReader`代码中所示的方式提取一些
PDF 文件。的数据样本是代码存储库中[新闻稿文件](https://github.com/aws-samples/llms-amazon-bedrock-
sagemaker/tree/main/rag_llamaindex_sagemaker/pressrelease)夹中的两份 PDF 版本的 Amazon
新闻稿。加载 PDF 后，LLM可以看到它们已转换为包含 11 个元素的列表。

`Document`LLM还可以将对象转换为`Node`对象，然后再将其发送到索引，而不是直接加载文档。选择将整个`Document`对象发送到索引还是`Node`在索引之前将
Document
转换为对象取决于LLM的具体用例和数据结构。对于长文档，节点方法通常是一个不错的选择，在这种情况下，LLM想要分解和检索文档的特定部分而不是整个文档。有关更多信息，请参阅[文档/节点](https://docs.llamaindex.ai/en/stable/module_guides/loading/documents_and_nodes/root.html)。

  1. 实例化加载器并加载文档：

此步骤初始化加载器类和任何所需的配置，例如是否忽略隐藏文件。有关更多详细信息，请参阅[SimpleDirectoryReader](https://docs.llamaindex.ai/en/stable/module_guides/loading/simpledirectoryreader.html)。

  1. 调用加载器的`load_data`方法来解析源文件和数据，并将它们转换为 LlamaIndex Document 对象，准备索引和查询。LLM可以使用以下代码，利用 LlamaIndex 的索引和检索功能完成全文搜索的数据摄取和准备：

    
    
    docs = SimpleDirectoryReader(input_dir="pressrelease").load_data()
    

  1. 建立索引：

LlamaIndex
的关键特性是它能够在数据上构建有组织的索引，这些数据表示为文档或节点。索引有助于有效地查询数据。使用默认的内存向量存储和定义的设置配置来创建索引。
LlamaIndex
[Settings](https://docs.llamaindex.ai/en/stable/module_guides/supporting_modules/settings.html)是一个配置对象，为
LlamaIndex
应用程序中的索引和查询操作提供常用资源和设置。它充当单例对象，因此它允许LLM设置全局配置，同时还允许LLM通过将特定组件直接传递到使用它们的接口（例如
LLM、嵌入模型）来本地覆盖特定组件。当未显式提供特定组件时，LlamaIndex
框架会回退到对象中定义的设置`Settings`作为全局默认值。要将的嵌入和 LLM 模型与 LangChain
一起使用并配置，`Settings`需要安装`llama_index.embeddings.langchain`和`llama_index.llms.langchain`。可以`Settings`像下面的代码一样配置该对象：

    
    
    Settings.embed_model = LangchainEmbedding(embeddings)
    Settings.llm = LangChainLLM(llm)
    

默认情况下，使用作为默认存储上下文的一部分初始化的`VectorStoreIndex`内存中。`SimpleVectorStore`在现实生活中的使用案例中，LLM经常需要连接到外部矢量存储，例如[Amazon
OpenSearch Service](https://aws.amazon.com/opensearch-
service/features/serverless/)。有关更多详细信息，请参阅[Amazon OpenSearch Serverless
的矢量引擎](https://aws.amazon.com/opensearch-service/serverless-vector-engine/)。

    
    
    index = VectorStoreIndex.from_documents(docs, service_context=service_context)
    

[现在，LLM可以使用 LlamaIndex
中的query_engine](https://docs.llamaindex.ai/en/stable/module_guides/deploying/query_engine/root.html)对文档运行问答。为此，请传递LLM之前为查询创建的索引并提出LLM的问题。查询引擎是查询数据的通用接口。它采用自然语言查询作为输入并返回丰富的响应。查询引擎通常使用[检索器构建在一个或多个](https://docs.llamaindex.ai/en/stable/module_guides/querying/retriever/root.html)[索引](https://docs.llamaindex.ai/en/stable/module_guides/indexing/indexing.html)之上。

    
    
    query_engine = index.as_query_engine() print(query_engine.query("Since migrating to AWS in May, how much in operational cost Yellow.ai has reduced?"))
    

LLM可以看到 RAG 解决方案能够从提供的文档中检索正确的答案：

    
    
    According to the provided information, Yellow.ai has reduced its operational costs by 20% since migrating to AWS in May
    

### 使用LangChain工具和代理

`Loader`班级。该加载器旨在将数据加载到 LlamaIndex 中或随后作为[LangChain
代理](https://python.langchain.com/docs/modules/agents/)中的工具。这为LLM提供了更多功能和灵活性，可以将其用作应用程序的一部分。首先从
LangChain
代理类定义LLM的[工具](https://python.langchain.com/docs/modules/agents/tools/)。LLM传递给工具的函数会查询LLM使用
LlamaIndex 在文档上构建的索引。

    
    
    tools = [
        Tool(
            name="Pressrelease",
            func=lambda q: str(index.as_query_engine().query(q)),
            description="useful pressreleases for answering relevnat questions",
            return_direct=True,
        ),
    ]
    

然后，LLM选择要用于 RAG 实施的正确代理类型。在这种情况下，LLM可以使用`chat-zero-shot-react-
description`代理。通过此代理，LLM 将使用可用的工具（在本例中为知识库上的 RAG）来提供响应。然后，LLM可以通过传递工具、LLM
和代理类型来初始化代理：

    
    
    agent= initialize_agent(tools, llm, agent="chat-zero-shot-react-description", verbose=True)
    

LLM可以看到代理正在通过`thoughts`、`actions`、
和`observation`，使用该工具（在本场景中，查询LLM的索引文档）；并返回结果：

    
    
    'According to the provided press release, Yellow.ai has reduced its operational costs by 20%, driven performance improvements by 15%, and cut infrastructure costs by 10% since migrating to AWS. However, the specific cost savings from the migration are not mentioned in the provided information. It only states that the company has been able to reinvest the savings into innovation and AI research and development.'
    

### 清理

为了避免不必要的成本，LLM可以通过以下代码片段或 Amazon JumpStart UI 清理资源。

要使用Boto3 SDK，请使用以下代码删除文本嵌入模型端点和文本生成模型端点以及端点配置：

    
    
    client = boto3.client('sagemaker', region_name=aws_region)
    client.delete_endpoint(EndpointName=endpoint_name)
    client.delete_endpoint_config(EndpointConfigName=endpoint_configuration)
    

要使用 SageMaker 控制台，请完成以下步骤：

  1. 在 SageMaker 控制台的导航窗格中的推理下，选择端点
  2. 搜索嵌入和文本生成端点。
  3. 在端点详细信息页面上，选择删除。
  4. 再次选择删除进行确认。

### 结论

对于专注于搜索和检索的用例，LlamaIndex 提供了灵活的功能。它擅长为LLM建立索引和检索，使其成为深度探索数据的强大工具。 LlamaIndex
使LLM能够创建有组织的数据索引、使用不同的 LLM、增强数据以获得更好的 LLM 性能以及使用自然语言查询数据。

这篇文章演示了一些关键的 LlamaIndex 概念和功能。使用 GPT-J 进行嵌入，并使用 Llama 2-Chat 作为 LLM 来构建 RAG
应用程序，但LLM可以使用任何合适的模型。LLM可以探索 SageMaker JumpStart 上提供的全面的模型。

还展示了 LlamaIndex 如何提供强大、灵活的工具来连接、索引、检索数据以及与 LangChain 等其他框架集成数据。通过 LlamaIndex
集成和 LangChain，LLM可以构建更强大、更通用、更有洞察力的 LLM 应用程序。

