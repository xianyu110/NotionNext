---
title: "用AI读懂架构评估:Amazon Bedrock让Amazon Resilience Hub报告秒变通俗易懂"
date: Fri Jan 02 2026 23:57:39 GMT+0800 (China Standard Time)
category: "人工智能"
tags: ["#人工智能","#架构","#aws"]
summary: ""
author: "xianyu120"
status: "Published"
---

#### 文章目录

  * 用AI读懂架构评估:Amazon Bedrock让Amazon Resilience Hub报告秒变通俗易懂
  *     *       * 亚马逊云科技 账户注册教程
    * 为什么需要这个解决方案?
    * 这个方案能带来什么?
    * 解决方案概述
    * 先决条件
    * 部署解决方案资源
    * 运行解决方案
    * 查看摘要
    * 清理
    * 结论

## 用AI读懂架构评估:Amazon Bedrock让Amazon Resilience Hub报告秒变通俗易懂

#### 亚马逊云科技 账户注册教程

**一、访问亚马逊云科技中国区账号注册页面**

1、通过[亚马逊云免费试用链接](https://aws.amazon.com/cn/free/?trk=09fbe4f3-c5e5-4bda-94f8-a5d9c9d122a8&sc_channel=sm&campaign=blog1421)，您可查看[亚马逊云科技免费套餐](https://aws.amazon.com/cn/free/?trk=09fbe4f3-c5e5-4bda-94f8-a5d9c9d122a8&sc_channel=sm&campaign=blog1421)，点击页面中的"创建账户"按钮，开始创建亚马逊云科技账户。

![](https://i-blog.csdnimg.cn/blog_migrate/d1d3186051df99b279bbf19474645591.png)

2、要注意的是，创建亚马逊云科技账户需要提供您公司企业注册证照和网络安全负责人个人有效身份证件的照片或扫描件。

首先，填写您注册账号的邮箱 , 点击"继续"。

然后，查看您的注册账号邮箱，在邮箱里您将看到亚马逊云科技中国区发送的验证码。

接下来，输入邮箱中收到的验证码 , 点击"继续"按钮进行下一步操作。

![](https://i-blog.csdnimg.cn/blog_migrate/8e2fafe94f6673869421680a3a67df19.png)

**二、设置用户名和密码**

验证通过后，您还需设置亚马逊云科技账号的用户名和密码。这里，您可以在用户名文本框中输入用户名，在密码文本框中输入密码，并再次确认密码，如下图所示：

![](https://i-blog.csdnimg.cn/blog_migrate/b668b4e56974df05c96fe4473380285b.png)

**三、填写账号联系人以及公司信息**

接下来，您还需填写亚马逊云科技账号联系人以及公司信息，包含公司联系人姓名全称、公司联系人的联系电话、公司名称、公司办公地址等，请选择是否需要发票。您可以点击查看
客户协议，勾选方框表示您已阅读并同意客户协议的条款。信息设置好后，点击"继续"。

![](https://i-blog.csdnimg.cn/blog_migrate/8a1da8213802516f47108858abe343a0.png)

**四、企业信息验证**

上传企业执照 – 填写负责人姓名 – 填写联系方式 -上传身份证件。

![](https://i-blog.csdnimg.cn/blog_migrate/7726b261b893d4549dac0ea57bd17da3.png)

**五、完成手机验证**

输入手机号码，点击"发送短信"按钮，如无意外，您将会收到带有4位验证码的短信，然后输入收到的验证码，点击"继续"，完成手机验证。

![](https://i-blog.csdnimg.cn/blog_migrate/1c7243b24ca282b9e83b0c20550b1c16.png)

**六、选择支持计划**

您可根据实际需求选择一个亚马逊云科技支持计划。

![](https://i-blog.csdnimg.cn/blog_migrate/d488f0d830bbb3a59d9cefe2c91cf266.png)

以上是亚马逊云科技中国区账号注册的主要操作步骤介绍。您提交完整准确的亚马逊云科技账户注册信息后，正常情况下，您马上就会收到账户激活的邮件通知。若账号注册页面显示"我们正在验证您的身份信息"，则您的注册邮箱将在两个工作日之内收到核验结果通知，如您的账户通过审核，点击邮件中的"完成注册"即可激活账户。如果是个人用户，则推荐使用海外区域注册[亚马逊云科技](https://aws.amazon.com/cn/free/?trk=09fbe4f3-c5e5-4bda-94f8-a5d9c9d122a8&sc_channel=sm&campaign=blog1421)。

> 还在为技术架构评估报告难懂而发愁吗？本文将为介绍如何运用Amazon Bedrock,让复杂的技术报告变得人人都能看懂。

### 为什么需要这个解决方案?

在企业中,架构评估报告经常面临这些挑战:

  * 技术术语太多,非技术人员看不懂
  * 关键信息被淹没在专业词汇中
  * 不同角色(管理层、业务人员、技术团队)需要不同视角的解读
  * 手动编写通俗版本既耗时又费力

为了解决这些问题,我们可以借助亚马逊云科技的两大利器:

  * Amazon Resilience Hub: 提供专业的架构评估
  * Amazon Bedrock: 将专业报告转换为通俗易懂的语言

### 这个方案能带来什么?

通过结合这两项服务,可以:

  1. 一键生成面向不同角色的报告解读
  2. 将技术指标转化为业务价值
  3. 让架构评估结果更容易被理解和采纳
  4. 节省手动编写报告解读的时间

### 解决方案概述

通过结合 Resilience Hub 和 Amazon Bedrock，可以生成自然语言的架构发现，以节省时间，更好地理解恢复时间目标 (RTO)
和恢复点目标 (RPO) 要求，并通过清晰简明的视图分发评估结果。Resilience Hub 是 [亚马逊云科技管理控制台](http://xn--
9kqra793mf5vxuyw9m.amazon.com/console?trk=09fbe4f3-c5e5-4bda-94f8-a5d9c9d122a8&sc_channel=sm&campaign=blog1421)
上的一个中心位置，用于管理、定义和评估弹性目标，并根据 [Amazon Well-Architected Framework](https://xn--
9kqra793mf5vxuyw9m.amazon.com/architecture/well-
architected/?trk=09fbe4f3-c5e5-4bda-94f8-a5d9c9d122a8&sc_channel=sm&campaign=blog1421)
提供建议。Amazon Bedrock 是一个完全托管的服务，通过单一 API 使用来自领先 AI 公司的基础模型 (FMs) 构建生成式 AI
应用程序，如 Anthropic、Mistral AI、Meta、Stability AI、Cohere、AI21 Labs 和 Amazon。Amazon
Bedrock 允许在的应用程序中集成生成式 AI 解决方案，并能够根据的用例测试、微调和定制顶级 FMs。

本文中介绍的解决方案通过 [Amazon Cognito](https://xn--
9kqra793mf5vxuyw9m.amazon.com/cognito/?trk=09fbe4f3-c5e5-4bda-94f8-a5d9c9d122a8&sc_channel=sm&campaign=blog1421)
进行编排，以登录到一个示例 UI，该 UI 调用 [Amazon Lambda](https://xn--
9kqra793mf5vxuyw9m.amazon.com/lambda/?trk=09fbe4f3-c5e5-4bda-94f8-a5d9c9d122a8&sc_channel=sm&campaign=blog1421)
函数和 Amazon Bedrock 提示通过大型语言模型 (LLMs)。Resilience Hub 提供的弹性和操作建议包括警报、标准操作程序
(SOPs) 和通过 [Amazon FIS](https://xn--
9kqra793mf5vxuyw9m.amazon.com/fis/?trk=09fbe4f3-c5e5-4bda-94f8-a5d9c9d122a8&sc_channel=sm&campaign=blog1421)
进行的故障注入实验。在输入来自 Resilience Hub 的评估 Amazon 资源名称 (ARN)
后，发现结果会以自然语言进行总结，以便与其他用户共享。

下图说明了解决方案架构。  
![img](https://img-
blog.csdnimg.cn/img_convert/e46f549019a79f74ad83aeb6b057aeb4.png)

解决方案工作流程包括以下步骤：

  1. 用户通过 Amazon Cognito 使用用户名和密码进行身份验证。
  2. 用户通过 [Amazon CloudFront](https://xn--9kqra793mf5vxuyw9m.amazon.com/cloudfront/?trk=09fbe4f3-c5e5-4bda-94f8-a5d9c9d122a8&sc_channel=sm&campaign=blog1421) 访问主 UI，该 UI 运行托管在 [Amazon S3](https://xn--9kqra793mf5vxuyw9m.amazon.com/s3/?trk=09fbe4f3-c5e5-4bda-94f8-a5d9c9d122a8&sc_channel=sm&campaign=blog1421) 上的单页应用程序。
  3. [Amazon API Gateway](https://xn--9kqra793mf5vxuyw9m.amazon.com/api-gateway/?trk=09fbe4f3-c5e5-4bda-94f8-a5d9c9d122a8&sc_channel=sm&campaign=blog1421) 使用 Amazon Cognito 验证访问令牌，然后使用 Lambda 函数作为集成目标。
  4. Lambda 从 Resilience Hub 中的已发布应用程序中获取最新的评估 ARN。
  5. 第二个 Lambda 函数调用 Amazon Bedrock API。
  6. Amazon Bedrock 处理评估并使用提示工程技术根据目标角色生成自然语言报告。

### 先决条件

要完成本教程，需要以下内容：

  * [一个亚马逊云科技账户](https://xn--9kqra793mf5vxuyw9m.amazon.com/cn/free/?trk=09fbe4f3-c5e5-4bda-94f8-a5d9c9d122a8&sc_channel=sm&campaign=blog1421)。
  * 亚马逊云科技管理控制台访问权限。
  * Python 3.12 环境。
  * 安装了 [Amazon CDK](https://xn--9kqra793mf5vxuyw9m.amazon.com/cdk/?trk=09fbe4f3-c5e5-4bda-94f8-a5d9c9d122a8&sc_channel=sm&campaign=blog1421) v2.160.0 或更高版本。
  * 使用 Amazon CDK 部署堆栈需要在部署期间为 [Amazon CloudFormation](http://xn--9kqra793mf5vxuyw9m.amazon.com/cloudformation?trk=09fbe4f3-c5e5-4bda-94f8-a5d9c9d122a8&sc_channel=sm&campaign=blog1421) 提供专用的 S3 存储桶和其他容器。Amazon CDK 是一个流行的开源框架，允许开发人员使用熟悉的编程语言定义云资源。有关更多信息，请参阅 [Amazon CDK 引导](https://docs.xn--9kqra793mf5vxuyw9m.amazon.com/cdk/v2/guide/bootstrapping.html?trk=09fbe4f3-c5e5-4bda-94f8-a5d9c9d122a8&sc_channel=sm&campaign=blog1421)。
  * Resilience Hub 中的现有评估和应用程序。有关说明，请参阅 [使用 Amazon Resilience Hub 测量和改进的应用程序弹性](https://xn--9kqra793mf5vxuyw9m.amazon.com/blogs/%E4%BA%9A%E9%A9%AC%E9%80%8A%E4%BA%91%E7%A7%91%E6%8A%80/monitor-and-improve-your-application-resiliency-with-resilience-hub/?trk=09fbe4f3-c5e5-4bda-94f8-a5d9c9d122a8&sc_channel=sm&campaign=blog1421)，其中还包括示例模板。
  * 访问 Amazon Bedrock 上 [AI21 Lab 的 Jamba 1.5 Mini](https://xn--9kqra793mf5vxuyw9m.amazon.com/bedrock/ai21/?trk=09fbe4f3-c5e5-4bda-94f8-a5d9c9d122a8&sc_channel=sm&campaign=blog1421) 模型。这是一次性操作。有关更多信息，请参阅 [访问 Amazon Bedrock 基础模型](https://docs.xn--9kqra793mf5vxuyw9m.amazon.com/bedrock/latest/userguide/model-access.html?trk=09fbe4f3-c5e5-4bda-94f8-a5d9c9d122a8&sc_channel=sm&campaign=blog1421)。

### 部署解决方案资源

可以使用 CloudFormation 模板部署解决方案，该模板位于 [GitHub
仓库](https://github.com/%E4%BA%9A%E9%A9%AC%E9%80%8A%E4%BA%91%E7%A7%91%E6%8A%80-samples/resilience-
hub-
genai?trk=09fbe4f3-c5e5-4bda-94f8-a5d9c9d122a8&sc_channel=sm&campaign=blog1421)
上，以自动在的亚马逊云科技账户中配置必要的资源。将使用 Amazon CDK 配置托管在 Amazon S3 上的 UI。

### 运行解决方案

完成以下步骤以运行解决方案：

  1. 在终端或首选的集成开发环境 (IDE) 中运行以下命令：
    
        git clone https://github.com/亚马逊云科技-samples/resilience-hub-genai.git 
    cd 亚马逊云科技-resilience-hub-genai/backend
    

  2. 使用选择的文本编辑器（vim、nano、notepad），在 `constants.py` 文件中将 `EMAIL` 替换为的电子邮件。  
![img](https://img-
blog.csdnimg.cn/img_convert/334f02242710676416a9dbaf35f2ffa3.png)

  3. 使用以下代码进行部署：
    
        cd ..
    ./deploy.sh
    

等待 CloudFormation 模板成功启动。此模板大约需要 10 分钟部署。

  1. 在Amazon CloudFormation 控制台的堆栈 **Outputs** 选项卡上，找到的 Web 应用程序的面向公众的 URL（标记为 `CLOUDFRONTDISTRIBUTION`）。  
![img](https://img-
blog.csdnimg.cn/img_convert/395e9d90697f7900d19688d986fe255a.jpeg)

应该已经收到一封电子邮件，其中包含在 `constants.py` 文件中提供的电子邮件作为用户名和临时密码。

  1. 使用提供的凭据登录，然后确认密码更改。
  2. 在 UI 中，选择导航窗格中的 **Report** 。
  3. 对于 **Persona** ，选择想要的角色。
  4. 对于 **Application** ，从现有已发布应用程序列表中选择想要的应用程序。
  5. 选择 **Generate Report** 以查看从最近评估中生成的简明摘要报告，该报告已准备好分发。  
![img](https://img-
blog.csdnimg.cn/img_convert/35a9f68c3180d788f6ad4aad731cbb3f.jpeg)

### 查看摘要

此解决方案包括来自执行角色的示例堆栈的摘要示例。由于生成式 AI 的性质，的结果可能会略有不同，但会类似于以下截图。  
![img](https://img-
blog.csdnimg.cn/img_convert/49307c3452db88f25ba7872d4f32c94c.jpeg)

### 清理

要清理解决方案，请完成以下步骤：

  1. 在Amazon CloudFormation 控制台上，删除之前创建的 CloudFormation 堆栈。
  2. 如果下载了示例 CloudFormation 模板以在 Resilience Hub 中进行评估，请删除该堆栈。
  3. 在 Resilience Hub 控制台上，删除新创建的应用程序。这将删除评估。

### 结论

在本文中，讨论了 Resilience Hub 和 Amazon Bedrock
如何大大改进组织中弹性架构的维护和评估。此解决方案自动将技术架构发现翻译成自然语言摘要，使关键信息可供各种利益相关者（包括高管、审计员和经理）访问。简化的沟通有助于提高理解和加快决策，从而最终有利于的业务运营。集成亚马逊云科技服务（如
Lambda 和 Amazon Cognito）进一步自动化和简化了工作流程，从评估到报告提供无缝体验。

亚马逊云科技提供众多免费云产品，可以访问：[亚马逊云科技](https://xn--
9kqra793mf5vxuyw9m.amazon.com/cn/free/?trk=09fbe4f3-c5e5-4bda-94f8-a5d9c9d122a8&sc_channel=sm&campaign=blog1421)

准备好增强组织的架构弹性了吗？按照本文中概述的步骤，立即部署解决方案，并开始将技术报告转化为简明摘要，使利益相关者能够访问重要信息，促进明智决策和弹性文化。

> 前述特定亚马逊云科技生成式人工智能相关的服务仅在亚马逊云科技海外区域可用，亚马逊云科技中国仅为帮助您了解行业前沿技术和发展海外业务选择推介该服务。

