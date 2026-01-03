---
title: "如何在 Ubuntu 20.04 上安装 Docker和DockerCompose"
date: "2026-01-02T16:01:16.294911"
category: "技术分享"
tags: ["#ubuntu", "#docker", "#eureka"]
summary: ""author: xianyu120
status: "Published"
---

Docker
是一个开源的容器化平台，它允许你构建，测试，并且作为可移动的容器去部署应用，这些容器可以在任何地方运行。一个容器表示一个应用的运行环境，并且包含软件运行所需要的所有依赖软件。

Docker 是现代软件开发，持续集成，持续交付的一部分。

这篇教程将会涉及如何在 Ubuntu 上安装 Docker。

Docker 在标准的 Ubuntu 20.04 软件源中可用，但是可能不是最新的版本。我们将会从 Docker 的官方软件源中安装最新的 Docker
软件包。

### 一、在 Ubuntu 20.04 上安装 Docker

在 Ubuntu 上安装 Docker 非常直接。我们将会启用 Docker 软件源，导入 GPG key，并且安装软件包。

首先，更新软件包索引，并且安装必要的依赖软件，来添加一个新的 HTTPS 软件源：

    
    
    sudo apt update
    sudo apt install apt-transport-https ca-certificates curl gnupg-agent software-properties-common
    

使用下面的 `curl` 导入源仓库的 GPG key：

    
    
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
    

将 Docker APT 软件源添加到你的系统：

    
    
    sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
    

现在，Docker 软件源被启用了，你可以安装软件源中任何可用的 Docker 版本。

01.想要安装 Docker 最新版本，运行下面的命令。如果你想安装指定版本，跳过这个步骤，并且跳到下一步。

    
    
    sudo apt update
    sudo apt install docker-ce docker-ce-cli containerd.io
    

02.想要安装指定版本，首先列出 Docker 软件源中所有可用的版本：

    
    
    sudo apt update
    apt list -a docker-ce
    

可用的 Docker 版本将会在第二列显示。在写作这篇文章的时候，在官方 Docker 软件源中只有一个 Docker
版本（`5:19.03.9~3-0~ubuntu-focal`）可用：

    
    
    docker-ce/focal 5:19.03.9~3-0~ubuntu-focal amd64
    

通过在软件包名后面添加版本`=<VERSION>`来安装指定版本：

    
    
    sudo apt install docker-ce=<VERSION> docker-ce-cli=<VERSION> containerd.io
    

一旦安装完成，Docker 服务将会自动启动。你可以输入下面的命令，验证它：

    
    
    sudo systemctl status docker
    

输出将会类似下面这样：

    
    
    ● docker.service - Docker Application Container Engine
         Loaded: loaded (/lib/systemd/system/docker.service; enabled; vendor preset: enabled)
         Active: active (running) since Thu 2020-05-21 14:47:34 UTC; 42s ago
    ...
    

当一个新的 Docker 发布时，你可以使用标准的`sudo apt update && sudo apt upgrade`流程来升级 Docker
软件包。

如果你想阻止 Docker 自动更新，锁住它的版本：

    
    
    sudo apt-mark hold docker-ce
    

### 二、以非 Root 用户身份执行 Docker

默认情况下，只有 root 或者 有 sudo 权限的用户可以执行 Docker 命令。

想要以非 root 用户执行 Docker 命令，你需要将你的用户添加到 Docker 用户组，该用户组在 Docker CE
软件包安装过程中被创建。想要这么做，输入：

    
    
    sudo usermod -aG docker $USER
    

`$USER`是一个环境变量，代表当前用户名。

登出，并且重新登录，以便用户组会员信息刷新。

### 三、验证安装过程

想要验证 Docker 是否已经成功被安装，你可以执行`docker`命令，前面不需要加`sudo, 我们将会运行一个测试容器:

    
    
    docker container run hello-world
    

如果本地没有该镜像，这个命令将会下载测试镜像，在容器中运行它，打印出 “Hello from Docker”，并且退出。

输出看起来应该像这样：

![image-20240521195416938](https://i-blog.csdnimg.cn/blog_migrate/a415a59348ffcbde21caa5190d1435c3.png)

这个容器将会在打印消息后停止运行，因为它没有任何长期运行的进程。

默认情况下，Docker 从 Docker Hub 拉取镜像。它是一个云端服务，主要用来储存 公有和私有源中的 Docker 镜像。

### 四、卸载 Docker

在卸载 Docker 之前，你最好 移除所有的容器，镜像，卷和网络。

运行下面的命令停止所有正在运行的容器，并且移除所有的 docker 对象：

    
    
    docker container stop $(docker container ls -aq)
    docker system prune -a --volumes
    

现在你可以使用`apt`像卸载其他软件包一样来卸载 Docker：

    
    
    sudo apt purge docker-ce
    sudo apt autoremove
    

### 五、总结

我们已经向你展示如何在 Ubuntu 20.04 机器上安装 Docker。

想要学习更多关于 Docker 的信息，查阅[官方 Docker
文档](https://link.zhihu.com/?target=https%3A//docs.docker.com/)。

Docker Compose 是一个命令行工具，它允许你定义和编排多容器 Docker 应用。它使用 YAML 文件来配置应用服务，网络和卷。

使用 Compose， 你可以定义一个可以运行在任何系统上的可移植应用环境。

Compose 通常被用来本地开发，单机应用部署，和自动测试。

本文讲解如何在 Ubuntu 20.04 上安装最新版的 Docker Compose。我们还将探讨 Docker Compose 的几个概念和命令。

### 一、前提条件

我们假设你已经在你的机器上[安装了
Docker](https://link.zhihu.com/?target=https%3A//www.itcoder.tech/posts/how-
to-install-and-use-docker-on-ubuntu-20-04/)。

### 二、在 Ubuntu 上安装 Docker Compose

Docker Compose 是一个二进制文件。安装非常简单直接。我们将会将该文件下载到一个目录，并添加到系统的 PATH
环境变量，同时将该文件设置为可执行。

    
    
    Docker Compose  软件包在官方的 Ubuntu 20.04 源仓库中可用，但是可能不是最新版本。
    

在写作这篇文章的时候，Docker Compose 最新的版本是`1.25.5` 。

在下载 Compose 之前，浏览 [Compose
发布页面](https://link.zhihu.com/?target=https%3A//github.com/docker/compose/releases)
并且检查是否有新版本可以下载。

使用`curl`将 Compose 文件下载到`/usr/local/bin`目录：

    
    
    sudo curl -L "https://github.com/docker/compose/releases/download/1.25.5/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    

一旦下载完成，将该文件设置为可执行：

    
    
    sudo chmod +x /usr/local/bin/docker-compose
    

想要验证安装成功，运行下面的命令，打印 Compose 的版本：

    
    
    docker-compose --version
    

输出应该像下面这样：

    
    
    docker-compose version 1.25.5, build b02f1306
    

就这些。Docker Compose 已经在你的 Ubuntu 机器上安装好了，并且你可以开始使用它了。

### 三、Docker Compose 入门

在这一节，我们将会是使用 Docker Compose 来构建一个多容器 WordPress 应用。

第一步就是创建一个项目目录：

    
    
    mkdir my_app
    cd my_app
    

打开你的文本编辑器，并且创建一个文件，名为`docker-compose.yml`，放在项目目录下：

    
    
    nano docker-compose.yml
    

粘贴下面的内容：

    
    
    version: '3'
    
    services:
      db:
        image: mysql:5.7
        restart: always
        volumes:
          - db_data:/var/lib/mysql
        environment:
          MYSQL_ROOT_PASSWORD: password
          MYSQL_DATABASE: wordpress
    
      wordpress:
        image: wordpress
        restart: always
        volumes:
          - ./wp_data:/var/www/html
        ports:
          - "8080:80"
        environment:
          WORDPRESS_DB_HOST: db:3306
          WORDPRESS_DB_NAME: wordpress
          WORDPRESS_DB_USER: root
          WORDPRESS_DB_PASSWORD: password
        depends_on:
           - db
    
    volumes:
        db_data:
        wp_data:
    

让我们来分析`docker-compose.yml`文件的结构。

文件第一行指定了[ Compose
file](https://link.zhihu.com/?target=https%3A//docs.docker.com/compose/compose-
file/compose-versioning/)的版本。这里有一些不同的 Compose 版本，每个版本支持指定的 Docker 发行版。

下一步，你定义服务，卷，和网络。

在这个例子中，我们有服务器，`db` 和 `wordpress`。当 docker-compose 运行，每一个服务运行一个镜像，创建一个独立的容器。

服务可以使用 DockerHub 上可用的镜像，或者从 Dockerfile
文件本地构建的镜像。服务一段同时还可以指定一些设置，用来指定暴露端口，卷，环境变量，依赖，和其他的 Docker 命令。

在项目目录，通过运行下面的命令来启动 WordPress 应用：

    
    
    docker-compose up
    

Compose 将会拉取镜像，启动容器，并且创建`wp_data`目录。

在你的浏览器中输入`http://0.0.0.0:8080/`，你将会看到 Wordpress 安装屏幕。此时，WordPress
应用已经启动并且运行了，你可以开始安装主题或者插件了。

想要停止 Compose，按`CTRL+C`。

你还可以通过在 Compose 后面加上`-d`选项，以后台模式启动 Compose：

    
    
    docker-compose up -d
    

想要检查运行的服务，使用`ps`选项：

    
    
    docker-compose ps
    

输出如下：

    
    
    Name                     Command               State          Ports        
    ----------------------------------------------------------------------------------
    my_app_db_1          docker-entrypoint.sh mysqld      Up      3306/tcp, 33060/tcp 
    my_app_wordpress_1   docker-entrypoint.sh apach ...   Up      0.0.0.0:8080->80/tcp
    

当 Compose 运行在后台模式，想要停止服务，运行：

    
    
    docker-compose stop
    

想要停止，并且移除应用容器，和网络，使用`down`选项：

    
    
    docker-compose down
    

### 四、卸载 Docker Compose

想要卸载 Docker Compose，只需要简单删除二进制文件即可，输入：

    
    
    sudo rm /usr/local/bin/docker-compose
    

### 五、总结

我们已经向你展示如何在 Ubuntu 20.04 上安装 Docker Compose 。使用 Docker Compose
可以明显改善你的工作流程，提高你的工作效率。你可以使用 Docker Compose 定义一个开发环境，并且分享给项目合作者。

