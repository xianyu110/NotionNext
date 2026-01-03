---
title: "如何用 Electron 打包chatgpt-plus.top并生成mac客户端"
date: "2026-01-02T16:01:00.482487"
category: "人工智能"
tags: ["#人工智能"]
summary: ""author: xianyu120
status: "Published"
---

#### 文章目录

  *     *       * 如何用 Electron 打包chatgpt-plus.top并生成 DMG：一步步搞定！
      *         * 准备工作：Node.js 和 npm
        * 国内镜像加速下载
        * 初始化你的 Electron 项目
        * 创建你的 Electron 应用
        * 运行你的 Electron 应用
        * 打包你的 Electron 应用
        * 处理网络超时问题
        * 将 `.app` 文件打包成 DMG
        * 最后

#### 如何用 Electron 打包chatgpt-plus.top并生成 DMG：一步步搞定！

嘿，各位开发者朋友们！你有没有遇到过这样的问题？你辛辛苦苦开发了一个超酷的 Electron 应用，想要打包成 macOS 的 DMG
文件，结果遇到各种神秘的错误提示？不用担心，我也是从这个坑里爬出来的！今天我就带你用幽默的方式，一步步搞定这个难题。

##### 准备工作：Node.js 和 npm

首先，我们需要安装 Node.js 和 npm（Node 的包管理工具）。你可以从 [Node.js
官方网站](https://nodejs.org/)下载并安装它们。安装完毕后，打开命令行，输入以下命令来检查安装是否成功：

    
    
    node -v
    npm -v
    

看到版本号了吗？太棒了，你已经迈出了第一步！

##### 国内镜像加速下载

我们知道，国内的网络环境有时会让人抓狂。因此，我们推荐使用淘宝的 npm 镜像来加速下载。输入以下命令切换 npm 源：

    
    
    npm config set registry https://registry.npmmirror.com/
    

如果你是个工具控，还可以安装 nrm（npm registry manager）来轻松管理多个镜像源：

    
    
    npm install -g nrm
    nrm use taobao
    

##### 初始化你的 Electron 项目

创建一个新的项目文件夹并初始化 npm 项目：

    
    
    mkdir my-electron-app
    cd my-electron-app
    npm init -y
    

安装 Electron：

    
    
    npm install electron --save-dev
    

##### 创建你的 Electron 应用

现在，我们要创建一个简单的 Electron 应用。创建一个名为 `main.js` 的文件，并填入以下内容：

    
    
    const { app, BrowserWindow } = require('electron');
    const path = require('path');
    
    function createWindow() {
      const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        icon: path.join(__dirname, 'icon.ico'), // 指定图标文件路径
        webPreferences: {
          preload: path.join(__dirname, 'preload.js')
        }
      });
    
      mainWindow.loadURL('https://chatgpt-plus.top'); // 加载 ChatGPT Plus 网站
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
    

接着，打开 `package.json` 文件，确保里面包含以下内容：

    
    
    "main": "main.js",
    "scripts": {
      "start": "electron ."
    }
    

##### 运行你的 Electron 应用

我们来试试运行你的应用，看看它的神奇之处：

    
    
    npm start
    

![image-20240603105120712](https://i-blog.csdnimg.cn/blog_migrate/e71e1d6c9931d1cbdc342b20c91e9f00.png)

##### 打包你的 Electron 应用

首先，用下面这条神奇的命令打包你的应用：

    
    
    npx electron-packager . my-electron-app --platform=darwin --arch=x64 --icon=icon.icns --out=dist --overwrite
    

如果一切顺利，你会在 `dist` 目录下看到一个名为 `my-electron-app-darwin-x64` 的文件夹，里面有一个 `.app`
文件。没错，这就是你闪亮登场的应用启动程序！

![image-20240603105100872](https://i-blog.csdnimg.cn/blog_migrate/2617a71fec360ba5ba6ed78a81b8e945.png)

##### 处理网络超时问题

当然了，事情总不会那么顺利。如果你看到一个类似这样的错误信息：

    
    
    connect ETIMEDOUT 185.199.109.133:443
    

别急，别急！这是网络超时问题，可以用以下几招来解决：

  1. **检查你的网络连接** ：确保你能愉快地刷网页。

  2. **重试命令** ：有时候，命运只是在考验你的耐心。

  3. **换个网络** ：如果可以，试试隔壁邻居家的 Wi-Fi（开玩笑啦，用自己的网络哈）。

  4. **配置代理** ：如果你在公司防火墙后面，记得设置代理：
    
        export HTTP_PROXY=http://你的代理服务器:端口
    export HTTPS_PROXY=http://你的代理服务器:端口
    

  5. **增加超时时间** ：给你的命令多一点时间思考人生：
    
        export ELECTRON_GET_TIMEOUT=100000
    

  6. **检查防火墙设置** ：确保防火墙没有在背后搞小动作。

  7. **更新工具** ：有时候老版本的软件就是不听话，更新一下 `npm` 和 `electron-packager` 吧：
    
        npm install -g npm
    npm install -g electron-packager
    

  8. **手动下载** ：如果所有方法都不行，手动下载 Electron 的二进制文件并放到正确的目录中。

##### 将 `.app` 文件打包成 DMG

恭喜你！如果你已经看到那个熟悉的 `.app` 文件，现在只需要再来点小魔法，就能生成一个漂亮的 DMG 文件了。首先，安装 `electron-
installer-dmg`：

    
    
    npm install -g electron-installer-dmg
    

然后，用下面这条命令进行打包：

    
    
    electron-installer-dmg dist/my-electron-app-darwin-x64/my-electron-app.app my-electron-app
    

几秒钟之后，你会看到一个 `my-electron-app.dmg` 文件，拿去分发给你的 macOS 用户吧！

##### 最后

搞定！现在你不仅成功地打包了你的 Electron
应用，还可以自豪地跟朋友们吹嘘你在技术上的突破。希望这篇幽默的小教程能帮你顺利度过这个坑。祝你开发愉快，bug 少少！

如果遇到任何问题，欢迎留言，我们一起哈哈大笑，共同解决！

