---
title: "五分钟上手Spring AI Alibaba，轻松打造智能聊天应用"
date: Fri Jan 02 2026 23:58:26 GMT+0800 (China Standard Time)
category: "人工智能"
tags: ["#spring","#人工智能","#java"]
summary: ""
author: "xianyu120"
status: "Published"
---

#### 文章目录

  * 快速上手
  *     * 快速体验示例
    * 示例开发指南
    * 总结

## 快速上手

* * *

Spring AI Alibaba 已经完全适配了阿里云通用模型，接下来，我们将学习如何使用 spring ai alibaba
开发一个基于通用模型服务的智能聊天应用。

### 快速体验示例

  1. 下载项目 运行以下命令下载源码，进入 helloworld 示例目录：

终端窗口

    
        git clone --depth=1 https://github.com/alibaba/spring-ai-alibaba.git
    
    cd spring-ai-alibaba/spring-ai-alibaba-examples/helloworld-example
    

  2. 运行项目 首先，需要获取一个合法的 API-KEY 并设置 `AI_DASHSCOPE_API_KEY` 环境变量，可跳转 [阿里云百炼平台](https://help.aliyun.com/zh/model-studio/developer-reference/get-api-key) 了解如何获取 API-KEY。

![image-20240923092250270](https://img-
blog.csdnimg.cn/img_convert/19181db87e328211b2d5e6f4abc19cc5.png)

设置永久性环境变量：

![image-20240923092546504](https://img-
blog.csdnimg.cn/img_convert/147d01e4cd344ca6905a34fea59f0c58.png)

验证是否成功：

    
        echo %DASHSCOPE_API_KEY%
    

![image-20240923092618565](https://img-
blog.csdnimg.cn/img_convert/b26ae4f1c8a460ddbb3011b72d81c64a.png)

终端窗口

    
        $env:AI_DASHSCOPE_API_KEY = "DASHSCOPE_API_KEY"
    

启动示例应用：

![image-20240923102154812](https://img-
blog.csdnimg.cn/img_convert/a85bf684587bff31ac3349a9f7f443f1.png)

访问 `http://localhost:8080/ai/chat?input=你好`，向通用模型提问并得到回答。

![image-20240923110329694](https://img-
blog.csdnimg.cn/img_convert/9b2fc75c4e33fc5f81af6bdffb14337c.png)

### 示例开发指南

以上示例本质上就是一个普通的 Spring Boot 应用，我们来通过源码解析看一下具体的开发流程。

  1. 添加依赖

首先，需要在项目中添加 `spring-ai-alibaba-starter` 依赖，它将通过 Spring Boot
自动装配机制初始化与阿里云通用大模型通信的 `ChatClient`、`ChatModel` 相关实例。

    
        <dependency>
    
      <groupId>com.alibaba.cloud.ai</groupId>
    
      <artifactId>spring-ai-alibaba-starter</artifactId>
    
      <version>1.0.0-m2</version>
    
    </dependency>
    

  2. 注入 ChatClient

接下来，在普通 Controller Bean 中注入 `ChatClient` 实例，这样你的 Bean 就具备与 AI 大模型智能对话的能力了。

    
        @RestController
    public class ChatController {
        private final ChatClient chatClient;
    
        public ChatController(ChatClient.Builder builder) {
            this.chatClient = builder.build();
        }
    
        @GetMapping("/chat")
        public String chat(String input) {
            return this.chatClient.prompt()
                .user(input)
                .call()
                .content();
        }
    }
    

以上示例中，ChatClient 调用大模型使用的是默认参数，Spring AI Alibaba 还支持通过 `DashScopeChatOptions`
调整与模型对话时的参数，`DashScopeChatOptions` 支持两种不同维度的配置方式：

    1. 全局默认值，即 `ChatClient` 实例初始化参数

可以在 `application.yaml` 文件中指定 `spring.ai.dashscope.chat.options.*` 或调用构造函数
`ChatClient.Builder.defaultOptions(options)`、`DashScopeChatModel(api,
options)` 完成配置初始化。

    2. 每次 Prompt 调用前动态指定
        
                ChatResponse response = chatModel.call(
        
          new Prompt(
        
            "Generate the names of 5 famous pirates.",
        
            DashScopeChatOptions.builder()
        
              .withModel("qwen-plus")
        
              .withTemperature(0.4)
        
            .build()
        
          ));
        

关于 `DashScopeChatOptions` 配置项的详细说明，请查看参考手册。

### 总结

spring-ai-alibaba 为 Java 开发者提供了一套开箱即用的开发 AI 应用的工具，帮助开发者快速构建智能应用。

