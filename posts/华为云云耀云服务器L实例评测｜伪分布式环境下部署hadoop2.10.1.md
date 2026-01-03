---
title: "华为云云耀云服务器L实例评测｜伪分布式环境下部署hadoop2.10.1"
date: "2026-01-02T15:44:43.718311"
category: "大数据项目"
tags: ["#服务器", "#分布式", "#运维"]
summary: ​云耀云服务器L实例是新一代的轻量应用云服务器，专门为中小企业和开发者打造，提供开箱即用的便利性。云耀云服务器L实例提供丰富且经过严格挑选的应用镜像，可以一键部署应用，极大地简化了客户在云端构建电商网站、Web应用、小程序、学习环境以及各类开发测试等任务的过程。​Hadoop是一个开源的分布式计算框架，能够处理大规模数据的存储和处理。它基于Google的MapReduce算法和Google File System（GFS）的思想，可以在廉价的硬件上进行高效的分布式计算。
author: "xianyu120"
status: "Published"
---

[#【中秋征文】程序人生，中秋共享#](https://activity.csdn.net/creatActivity?id=10557&spm=1001.2101.3001.8632)  

#### 文章目录

  *     * 前言
    *       * 云耀云服务器L实例简介
      * Hadoop简介
    * 一、配置环境
    *       * 购买云耀云服务器L实例
      * 查看云耀云服务器L实例状态
      * 重置密码
      * 查看弹性公网IP地址
    * FinalShell连接服务器
    * 二、搭建Hadoop单机版本
    *       * 详细安装步骤如下：
      *         * 我们先开始配置java环境
        * hadoop2.x
        * 接下来需要利用vim来操作core-site 和 hdfs-site
        * 踩坑：
    * 三、验证成果
    * 总结

### 前言

这是Maynor创作的华为云云耀云服务器L实例测评的第二篇，上篇传送门：

[华为云云耀云服务器L实例评测｜单节点环境下部署ClickHouse21.1.9.41数据库  
](https://blog.csdn.net/xianyu120/article/details/132908265)

#### 云耀云服务器L实例简介

​
`云耀云服务器L实例`是新一代的轻量应用云服务器，专门为中小企业和开发者打造，提供开箱即用的便利性。`云耀云服务器L实例`提供丰富且经过严格挑选的应用镜像，可以一键部署应用，极大地简化了客户在云端构建电商网站、`Web应用、小程序、学习环境以及各类开发测试`等任务的过程。

#### Hadoop简介

​ `Hadoop`是一个开源的分布式计算框架，能够处理大规模数据的存储和处理。它基于Google的`MapReduce`算法和Google File
System（`GFS`）的思想，可以在廉价的硬件上进行高效的分布式计算。Hadoop有两个核心组件，一个是分布式文件系统Hadoop
Distributed File
System（`HDFS`），另一个是分布式计算框架MapReduce。HDFS将大规模数据分散存储在多个节点上，而MapReduce则将计算分散到多个节点上进行并行计算，最终将结果汇总输出。Hadoop的优点是具有高可靠性、可扩展性和高效性，适合处理大规模数据。Hadoop被广泛应用于`数据挖掘、机器学习、人工智能、搜索引擎`等领域。

### 一、配置环境

#### 购买云耀云服务器L实例

> 在云耀云服务器L实例详情页，点击购买。

![image-20230915164709448](https://i-blog.csdnimg.cn/blog_migrate/a7e058d907a29eb50cfdfd860ff045ea.png)

  * 检查配置，确认购买。

![image-20230915164730739](https://i-blog.csdnimg.cn/blog_migrate/4f1c587d3fb0efff09a571c38e5bb781.png)

#### 查看云耀云服务器L实例状态

> 查看购买的云耀云服务器L实例状态，处在正常运行中。

![image-20230915165006300](https://i-blog.csdnimg.cn/blog_migrate/cda40b8572ef2f67893d2693e4ad8101.png)

#### 重置密码

> 重置密码，点击重置密码选项，需要进行身份验证，选择手机验证后，即可重置密码成功。

![image-20230915165053276](https://i-blog.csdnimg.cn/blog_migrate/bf9e5c979586adacb7bca48da3e02a12.png)

#### 查看弹性公网IP地址

  * 复制弹性公网IP地址，远程连接服务器时使用。

![image-20230915165639764](https://i-blog.csdnimg.cn/blog_migrate/969d10d2785448e2832a43c4e71df8f1.png)

### FinalShell连接服务器

> 在FinalShell工具中，填写服务器弹性公网IP地址、账号密码信息，ssh连接远程服务器。

![image-20230915165703665](https://i-blog.csdnimg.cn/blog_migrate/e30b594ceca313ebd3b11cc87efdea2c.png)

### 二、搭建Hadoop单机版本

#### 详细安装步骤如下：

##### 我们先开始配置java环境

首先下载java的jdk

    
    
    wget https://download.java.net/openjdk/jdk8u41/ri/openjdk-8u41-b04-linux-x64-14_jan_2020.tar.gz
    

![image-20230915174619486](https://i-blog.csdnimg.cn/blog_migrate/12cce29e58b31b04dd7dc016e04b3820.png)

然后解压

    
    
    tar -zxvf openjdk-8u41-b04-linux-x64-14_jan_2020.tar.gz
    

![image-20230915174638595](https://i-blog.csdnimg.cn/blog_migrate/610f3dffb321345ff7560736eb76735e.png)

移动位置并且配置java路径

    
    
    mv java-se-8u41-ri/ /usr/java8
    echo 'export JAVA_HOME=/usr/java8' >> /etc/profile
    echo 'export PATH=$PATH:$JAVA_HOME/bin' >> /etc/profile
    source /etc/profile
    

![image-20230915174659177](https://i-blog.csdnimg.cn/blog_migrate/7519024d603ac2cb9b40523bd769ee31.png)

检查是否安装成功

    
    
    java -version
    

这是理想情况，若安装成功会出现如下结果

![image-20230915174715332](https://i-blog.csdnimg.cn/blog_migrate/3688a0eade00bbb82efe84c0f91fb4bc.png)

##### hadoop2.x

    
    
    wget --no-check-certificate https://mirrors.tuna.tsinghua.edu.cn/apache/hadoop/common/hadoop-2.10.1/hadoop-2.10.1.tar.gz
    

![image-20230918141745257](https://i-blog.csdnimg.cn/blog_migrate/016a9a88fa863b5a0f230fd795b64cd6.png)

    
    
    tar -zxvf hadoop-2.10.1.tar.gz -C /opt/
    mv /opt/hadoop-2.10.1 /opt/hadoop
    

![image-20230918141834987](https://i-blog.csdnimg.cn/blog_migrate/b48363856867e57a71f5aa02dd4c21cf.png)

配置地址

    
    
    echo 'export HADOOP_HOME=/opt/hadoop/' >> /etc/profile
    echo 'export PATH=$PATH:$HADOOP_HOME/bin' >> /etc/profile
    echo 'export PATH=$PATH:$HADOOP_HOME/sbin' >> /etc/profile
    source /etc/profile
    

![image-20230918141853752](https://i-blog.csdnimg.cn/blog_migrate/bf08abadc590b914f4865dac3a5dd000.png)

配置yarn和hadoop

    
    
    echo "export JAVA_HOME=/usr/java8" >> /opt/hadoop/etc/hadoop/yarn-env.sh
    echo "export JAVA_HOME=/usr/java8" >> /opt/hadoop/etc/hadoop/hadoop-env.sh
    

查看Hadoop 安装情况

    
    
    hadoop version
    

![image-20230918141945839](https://i-blog.csdnimg.cn/blog_migrate/3390f2cd646e56873dc8e1c76cafad7a.png)

若出现上图情况，则说明安装成功

##### 接下来需要利用vim来操作core-site 和 hdfs-site

    
    
    vim /opt/hadoop/etc/hadoop/core-site.xml
    

进入vim环境

按下i（insert）修改

光标移动至configuration之间，复制如下的信息

    
    
    <property>
            <name>hadoop.tmp.dir</name>
            <value>file:/opt/hadoop/tmp</value>
            <description>location to store temporary files</description>
        </property>
        <property>
            <name>fs.defaultFS</name>
            <value>hdfs://localhost:9000</value>
        </property>
    

![image-20230918142036003](https://i-blog.csdnimg.cn/blog_migrate/bec4c8cdd99f5c8941d8b657ba6fe34b.png)

然后按下esc，停止修改，然后打":wq"（实际无“”）退出vim修改

同理操作hdfs-site

    
    
    vim /opt/hadoop/etc/hadoop/hdfs-site.xml
    
    
    
    <property>
            <name>dfs.replication</name>
            <value>1</value>
        </property>
        <property>
            <name>dfs.namenode.name.dir</name>
            <value>file:/opt/hadoop/tmp/dfs/name</value>
        </property>
        <property>
            <name>dfs.datanode.data.dir</name>
            <value>file:/opt/hadoop/tmp/dfs/data</value>
        </property>
    

![image-20230918142149096](https://i-blog.csdnimg.cn/blog_migrate/5baed5f86b9393c88d158a693c44d112.png)

配置master和slave连接，运行如下指令，并且一直回车，直至出现如下图

    
    
    ssh-keygen -t rsa 
    

![image-20230918142207297](https://i-blog.csdnimg.cn/blog_migrate/d36d06cadc7ac19ab4e818e126035435.png)

启动Hadoop

    
    
    hadoop namenode -format
    start-dfs.sh
    start-yarn.sh
    

输入密码

![image-20230918142453569](https://i-blog.csdnimg.cn/blog_migrate/b4e9dfe267a2123f7563e51160cdef6a.png)

##### 踩坑：

    
    
    ERROR: but there is no YARN_NODEMANAGER_USER defined. Aborting operation
    

这里踩了一个小坑，

解决方案：

<https://blog.csdn.net/ystyaoshengting/article/details/103026872>

查看是否配置成功

    
    
    jps
    

成功图

![image-20230918142604975](https://i-blog.csdnimg.cn/blog_migrate/2ec315abae97deb7fd03f7a56ba2fecd.png)

### 三、验证成果

起初HDFS没有文件所以无任何显示

![image-20230918142638608](https://i-blog.csdnimg.cn/blog_migrate/71633daa6d0424a151a55762880223b0.png)

随意上传个文件到HDFS系统中，可以看到系统上有文件  
![image-20230918143236050](https://i-blog.csdnimg.cn/blog_migrate/ea1866dff2537c527b06299b11ff45cf.png)  
打开hdfs的web 管理页面 网页ip+50070  
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/18bd500c5c906134cea74b9f75fd6ae0.png)

正常显示！

### 总结

​
重点介绍了在`云耀云服务器L实例`上搭建Hadoop单机版本的步骤。首先购买服务器实例并配置环境，然后安装Hadoop2.x版本并编辑配置文件。在配置过程中可能会遇到问题，需要注意解决。最后验证搭建的Hadoop单机版本是否成功。

