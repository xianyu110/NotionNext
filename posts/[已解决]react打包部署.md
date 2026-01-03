---
title: "[已解决]react打包部署"
date: "2026-01-02T16:02:14.773256"
category: "技术分享"
tags: ["#react.js", "#前端", "#前端框架"]
summary: ""
author: "xianyu120"
status: "Published"
---

### react打包部署

### 问题

npm install 命令无反应

### 思路

换成 yarn install

安装完hadoop的环境后，使用node的yarn会报错：

![img](https://i-blog.csdnimg.cn/blog_migrate/78f75143b507716facd4005c36d72bfb.png)

我们在cmd使用`where yarn`，如下：

![img](https://i-blog.csdnimg.cn/blog_migrate/6761994d84667c77212f13e3d8e704f6.png)

看你想保留哪一个，我平时node用的多，就把hadoop的yarn改个名字（需要用hadoop时可以用改完名字后的命令或再改回yarn）

接下来执行`yarn -v`就是node的yarn了

### 解决

npm run build 成功打包!

