---
title: "如何配置 OpenAI 环境变量"
date: "2026-01-02T16:01:56.203362"
category: "人工智能"
tags: ["#react.js", "#大数据", "#运维"]
summary: ""author: xianyu120
status: "Published"
---

  1. ## 配置 OpenAI 环境变量

  2. 操作步骤

    1. 本地创建一个新文件夹（文件夹命名最好是英文、文件夹内无其他文件）
    2. 打开编辑器（VScode）→打开刚才创建的「文件夹」
    3. 在项目文件夹里，创建一个名为 `.env` 的文件 
      1. 不是 .env.py
      2. 不是 xxx.env
      3. `.env`文件确认要保存（MacOS系统： command+s）
      4. VSCode 编辑器，看一下当前文件上面是否有小圆点，如果有代表没有保存
  3. 输入如下代码

    1. `sk-xxx` 使用自己的 key 替换
    2. `OPENAI_BASE_URL`
      1. 不是 OPENAI_API_BASE
      2. 不是 OPENAI_API_URL
      3. `OPENAI_BASE_URL`的值是 `https://api.fe8.cn/v1`（`/v1`不要漏掉）
      4. `OPENAI_BASE_URL`是访问 OpenAI 的代理跳板，已解决网络通道问题
      5.             OPENAI_API_KEY="sk-xxx"
            OPENAI_BASE_URL="https://api.fe8.cn/v1"
            

  4. 注意事项

    1. 关闭：梯子、魔法、科学上网
    2. 无需在命令行或 Windows 的全局环境配置变量
  5. ## 安装包 pip

  6. 安装项目依赖的包

    1. MacOS 系统

    2.         pip3 install python-dotenv openai    
        

    3. Windows 系统

    4.         pip install python-dotenv openai    
        

  7. ## 创建源代码文件

  8. 在编辑器（VSCode）里，新建名为 `index.py` 的文件

  9. 复制如下代码在 index.py 文件中

    
    
    import os
    from openai import OpenAI
    
    # 加载 .env 到环境变量
    from dotenv import load_dotenv, find_dotenv
    _ = load_dotenv(find_dotenv())
    
    # 配置 OpenAI 服务  
    
    client = OpenAI()
    
    response = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": "讲个笑话",
            }
        ],
        model="gpt-3.5-turbo",
    )
    
    print(response)
    
    # print(print(response.choices[0].message.content))  # 更具体的的打印
    

  1. 运行代码，在`index.py` 的文件，运行 Python 代码 
    1. 保存 .env文件

    2. 确保为最新的 Python 版本

    3. 查看运行代码结果

    4. 暂时无法在飞书文档外展示此内容

    5.     6.   2. 官方 OpenAI key （自己去OpenAI官方注册的key）

注意：这是在 OpenAI 官方注册的key才能使用，如果你用DevAGI的key，请不要使用。

  1. 如果你有 OpenAI 的官方 key，并可以畅通访问 OpenAI 的网络
  2. 需修改 `.env` 文件里的 `OPENAI_API_KEY` 为你自己的 key，并删除 `OPENAI_BASE_URL`
  3. 如果你需要通过代理访问 OpenAI，那么需要配置 `OPENAI_BASE_URL` 为你的代理地址
  4. 再次提醒：如果你使用 DevAGI 的 key ，不要 用如下代理地址

    
    
    OPENAI_API_KEY="sk-xxx" # OpenAI 官方的 key
    OPENAI_BASE_URL="https://a.xairun.com/v1" # 国内的代理地址,再次提醒：如果你使用 DevCTO的key，不要用这个地址。
    

