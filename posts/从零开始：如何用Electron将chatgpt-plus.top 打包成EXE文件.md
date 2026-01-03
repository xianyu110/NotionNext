---
title: "从零开始：如何用Electron将chatgpt-plus.top 打包成EXE文件"
date: "2026-01-02T16:01:09.796285"
category: "人工智能"
tags: ["#electron", "#chatgpt", "#javascript"]
summary: ""author: xianyu120
status: "Published"
---

#### 文章目录

  * 从零开始：如何用Electron将chatgpt-plus.top 打包成EXE文件
  *     * 准备工作：Node.js和npm
    * 国内镜像加速下载
    * 初始化你的Electron项目
    * 创建你的Electron应用
    * 运行你的Electron应用
    * 为你的应用设置图标
    * 打包成EXE文件
    * 结语

## 从零开始：如何用Electron将chatgpt-plus.top 打包成EXE文件

你是否曾想过让你的网站脱颖而出，成为一个光鲜亮丽的桌面应用程序？在这个教程中，我们将一步一步地带你实现这个梦想。今天的主角是我们心爱的
https://chatgpt-plus.top/。准备好了吗？让我们开始吧！

### 准备工作：Node.js和npm

首先，我们需要安装Node.js和npm（Node的包管理工具）。你可以从[Node.js官方网站](https://nodejs.org/)下载并安装它们。安装完毕后，打开命令行，输入以下命令来检查安装是否成功：

    
    
    node -v
    npm -v
    

看到版本号了吗？太棒了，你已经迈出了第一步！

### 国内镜像加速下载

我们知道，国内的网络环境有时会让人抓狂。因此，我们推荐使用淘宝的npm镜像来加速下载。输入以下命令切换npm源：

    
    
    npm config set registry https://registry.npmmirror.com/
    

如果你是个工具控，还可以安装`nrm`（npm registry manager）来轻松管理多个镜像源：

    
    
    npm install -g nrm
    nrm use taobao
    

### 初始化你的Electron项目

创建一个新的项目文件夹并初始化npm项目：

    
    
    mkdir my-electron-app
    cd my-electron-app
    npm init -y
    

安装Electron：

    
    
    npm install electron --save-dev
    

### 创建你的Electron应用

现在，我们要创建一个简单的Electron应用。创建一个名为`main.js`的文件，并填入以下内容：

    
    
    const { app, BrowserWindow } = require('electron');
    const path = require('path');
    
    function createWindow () {
      const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        icon: path.join(__dirname, 'icon.ico'), // 指定图标文件路径
        webPreferences: {
          preload: path.join(__dirname, 'preload.js')
        }
      });
    
      mainWindow.loadURL('https://chatgpt-plus.top'); // 加载ChatGPT Plus网站
    }
    
    app.whenReady().then(() => {
      createWindow();
    
      app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
      });
    });
    
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') app.quit();
    });
    

接着，打开`package.json`文件，确保里面包含以下内容：

    
    
    "main": "main.js",
    "scripts": {
      "start": "electron ."
    }
    

### 运行你的Electron应用

我们来试试运行你的应用，看看它的神奇之处：

    
    
    npm start
    

一个漂亮的窗口应该会弹出来，展示你的https://chatgpt-plus.top/网站。如果一切顺利，恭喜你，你离目标又近了一步！

![image-20240530111411259](https://i-blog.csdnimg.cn/blog_migrate/2fed58f168179ede2250bbce7ad6eb33.png)

### 为你的应用设置图标

没有图标的应用是没有灵魂的。准备一个ICO格式的图标文件，命名为`icon.ico`，并放在项目的根目录。

### 打包成EXE文件

现在是见证奇迹的时刻了！使用`electron-packager`来打包你的应用：

    
    
    npx electron-packager . my-electron-app --platform=win32 --arch=x64 --icon=icon.ico --out=dist --overwrite
    

几秒钟之后，你会在`dist`文件夹中找到打包好的EXE文件。双击它，你的桌面应用就会运行起来。是不是很酷？

![image-20240530111438261](https://i-blog.csdnimg.cn/blog_migrate/6b1ad0a300868510f742950d2188e137.png)

### 结语

通过以上步骤，我们成功地将https://chatgpt-
plus.top/打包成了一个带有自定义图标的桌面应用程序。这个过程既有趣又令人兴奋。快去炫耀你的新技能吧！

祝你玩得开心，项目顺利！

* * *

希望你喜欢这篇有趣的教程。如果你有任何问题或建议，欢迎在评论区留言。Happy coding! 🎉

