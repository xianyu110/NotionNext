---
title: "关于7月1号centos官方停止维护7系列版本导致centos7+版本的机器yum等命令无法使用的解决教程"
date: Fri Jan 02 2026 23:59:39 GMT+0800 (China Standard Time)
category: "技术分享"
tags: ["#centos","#linux","#运维"]
summary: ""
author: "xianyu120"
status: "Published"
---

更换yum源两种方式

第一种  
在还能使用yum等命令的情况是执行下面的命令  
注意：阿里云和腾讯云二选一即可

一丶  
yum源

腾讯云：  
wget -O /etc/yum.repos.d/CentOS-Base.repo
http://mirrors.cloud.tencent.com/repo/centos7_base.repo  
curl -o /etc/yum.repos.d/CentOS-Base.repo
http://mirrors.cloud.tencent.com/repo/centos7_base.repo  
任选一条执行即可

阿里云：  
wget -O /etc/yum.repos.d/CentOS-Base.repo
https://mirrors.aliyun.com/repo/Centos-7.repo  
curl -o /etc/yum.repos.d/CentOS-Base.repo
https://mirrors.aliyun.com/repo/Centos-7.repo  
任选一条执行即可

二丶  
epel源  
腾讯云：  
wget -O /etc/yum.repos.d/epel.repo
http://mirrors.cloud.tencent.com/repo/epel-7.repo  
curl -o /etc/yum.repos.d/epel.repo
http://mirrors.cloud.tencent.com/repo/epel-7.repo  
任选一条执行即可

阿里云：  
wget -O /etc/yum.repos.d/epel.repo https://mirrors.aliyun.com/repo/epel-7.repo  
curl -o /etc/yum.repos.d/epel.repo https://mirrors.aliyun.com/repo/epel-7.repo  
任选一条执行即可

三丶  
清理yum缓存  
yum clean all

更新yum缓存  
yum makecache

第二种  
不能使用命令更换yum源等情况下  
注意：阿里云和腾讯云二选一即可

一丶  
将压缩包里的文件上传到服务器的/etc/yum.repos.d/目录，然后执行下面的步骤命令

二丶  
清理yum缓存  
yum clean all

更新yum缓存  
yum makecache

