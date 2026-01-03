---
title: "Docker篇之如何部署MySQL"
date: Fri Jan 02 2026 23:45:05 GMT+0800 (China Standard Time)
category: "大数据项目"
tags: ["#big data","#spark","#mapreduce"]
summary: "MySQL部署5.1.1拉取MySQL镜像docker pull mysql查看镜像5.1.2创建MySQL容器docker run -di --name demo_mysql -p 33306:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql-p 代表端口映射，格式为  宿主机映射端口:容器运行端口-e 代表添加环境变量  MYSQL_ROOT_PASSWORD是root用户的登陆密码5.1.3进入MySQL容器,登陆MySQL进入mysql容器"
author: "xianyu120"
status: "Published"
---

### MySQL部署

#### 1.1拉取MySQL镜像

    
    
    docker pull mysql
    

![img](https://i-blog.csdnimg.cn/blog_migrate/3f474251d1b5103c4cc9f28599b6821d.png)

查看镜像

![img](https://i-blog.csdnimg.cn/blog_migrate/49feda7b385d7250933641a8aba91d78.png)

#### 1.2创建MySQL容器

    
    
    docker run -di --name demo_mysql -p 33306:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql
    

-p 代表端口映射，格式为 宿主机映射端口:容器运行端口

-e 代表添加环境变量 MYSQL_ROOT_PASSWORD是root用户的登陆密码

#### 1.3进入MySQL容器,登陆MySQL

进入mysql容器

    
    
    docker exec -it demo_mysql  /bin/bash
    

登陆mysql

    
    
    mysql -u root -p
    
    

#### 1.4远程登陆MySQL

（1）我们在我们本机的电脑上去连接虚拟机Centos中的Docker容器，这里192.168.247.130是虚拟机操作系统的IP

![img](https://i-blog.csdnimg.cn/blog_migrate/42338c66e353b0c105f6f7b1a3921156.png)

（2）在本地客户端执行建库脚本

执行“资源/建库语句/pinyougoudb.sql”

![img](https://i-blog.csdnimg.cn/blog_migrate/9e0c525e2b9dd5b71e3566f70f4aa18f.png)

### 最后

可以看到docker的mysql中有数据了~

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/12b761559917afcfe708459fa0d53c6f.png)

