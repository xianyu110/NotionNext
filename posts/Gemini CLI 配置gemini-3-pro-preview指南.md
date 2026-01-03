---
title: "Gemini CLI 配置gemini-3-pro-preview指南"
date: Fri Jan 02 2026 23:53:59 GMT+0800 (China Standard Time)
category: "人工智能"
tags: ["#人工智能"]
summary: ""
author: "xianyu120"
status: "Published"
---

## Gemini CLI 配置指南

本文档详细说明如何配置 Gemini CLI 的环境变量，以便在终端中全局使用。

### 核心环境变量

要使用 Gemini CLI，需要配置以下三个核心环境变量：

变量名| 描述| 示例值  
---|---|---  
`GOOGLE_GEMINI_BASE_URL`| API 服务的请求地址| `https://code.claude-opus.top/gemini`  
`GEMINI_API_KEY`| 您的个人 API 密钥| `sk-xxxxxxxx`  
`GEMINI_MODEL`| 默认使用的模型名称| `gemini-3-pro-preview`  
  
购买链接： https://maynorai.tqfk.xyz/item/7

### 快速配置 (推荐)

在终端中复制并运行以下命令，即可自动将配置添加到您的 Shell 配置文件中（支持 Zsh 和 Bash）：

    
    
    # 设置变量值 (请替换为您自己的 API Key)
    export MY_BASE_URL="https://code.claude-opus.top/gemini"
    export MY_API_KEY="您的实际API_KEY"
    export MY_MODEL="gemini-3-pro-preview"
    
    # 自动写入配置文件
    (
      echo ""
      echo "# Gemini Configuration"
      echo "export GOOGLE_GEMINI_BASE_URL=\"$MY_BASE_URL\""
      echo "export GEMINI_API_KEY=\"$MY_API_KEY\""
      echo "export GEMINI_MODEL=\"$MY_MODEL\""
    ) | tee -a ~/.zshrc ~/.bash_profile > /dev/null
    
    # 立即生效
    source ~/.zshrc  # 如果您使用的是 Zsh
    # 或者
    source ~/.bash_profile # 如果您使用的是 Bash
    

### 手动配置

如果您更喜欢手动编辑配置文件：

#### 1\. 确定您的 Shell 类型

运行 `echo $SHELL`。

  * 如果输出 `/bin/zsh` (macOS 默认)，请编辑 `~/.zshrc`。
  * 如果输出 `/bin/bash`，请编辑 `~/.bash_profile` 或 `~/.bashrc`。

#### 2\. 编辑文件

使用编辑器打开相应文件，例如：

    
    
    nano ~/.zshrc
    

#### 3\. 添加配置

在文件末尾添加以下内容：

    
    
    # Gemini Configuration
    export GOOGLE_GEMINI_BASE_URL="https://code.claude-opus.top/gemini"
    export GEMINI_API_KEY="your_actual_api_key_here"
    export GEMINI_MODEL="gemini-3-pro-preview"
    

#### 4\. 保存并生效

保存文件 (在 nano 中按 `Ctrl+O`, `Enter`, 然后 `Ctrl+X`)，然后运行：

    
    
    source ~/.zshrc
    

### 验证配置

配置完成后，可以通过以下命令检查是否生效：

    
    
    echo $GEMINI_MODEL
    # 输出应为: gemini-3-pro-preview (或您设置的模型)
    

### 常见模型列表

  * `gemini-3-pro-preview`: 适用于复杂任务的强大模型
  * `gemini-2.5-flash`: 快速且经济高效的模型
  * `gemini-2.5-flash-image-preview`: 专注于图像处理的模型

* * *

_注意：请妥善保管您的 API Key，不要将其提交到公共代码仓库中。_

