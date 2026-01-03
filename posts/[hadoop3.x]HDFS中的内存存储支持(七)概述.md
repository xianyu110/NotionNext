---
title: "[hadoop3.x]HDFS中的内存存储支持(七)概述"
date: Fri Jan 02 2026 23:45:18 GMT+0800 (China Standard Time)
category: "大数据项目"
tags: ["#hadoop","#big data"]
summary: 目前博客Hadoop文章大都停留在Hadoop2.x阶段，本系列将依据黑马程序员大数据Hadoop3.x全套教程，对2.x没有的新特性进行补充更新，一键三连加关注，下次不迷路！
author: "xianyu120"
status: "Published"
---

#### 文章目录

  *     * 前言
    * 历史文章
    * 🍑 1.1 💃HDFS中的内存存储支持💃
    *       *         * 1.1.1 💃介绍💃
        * 1.1.2 💃配置内存存储支持💃
        *           * 1.1.2.1 💃设置能够使用的内存空间💃
          * 1.1.2.2 💃DataNode设置基于内存的存储💃
        * 1.1.3 💃选择tmpfs（VS ramfs）💃
        * 1.1.4 💃挂载RAM磁盘💃
        * 1.1.5 设置RAM_DISK存储类型tmpfs标签
        * 1.1.6 💃确保启用存储策略💃
        * 1.1.7 💃使用内存存储💃
        * 1.1.8 💃使用懒持久化存储策略💃
        * 1.1.9 💃在目录上执行hdfs storagepolicies命令💃
        * 1.1.10 💃在目录上执行setStoragePolicy方法💃
        * 1.1.11 💃创建文件的时候指定CreateFlag💃
    * 后记

### 前言

>
> 目前博客Hadoop文章大都停留在Hadoop2.x阶段，本系列将依据黑马程序员大数据Hadoop3.x全套教程，对2.x没有的新特性进行补充更新，一键三连加关注，下次不迷路！

### 历史文章

[[hadoop3.x系列]HDFS REST HTTP API的使用(一)WebHDFS  
](https://manor.blog.csdn.net/article/details/120521427)

[[hadoop3.x系列]HDFS REST HTTP API的使用(二)HttpFS  
](https://manor.blog.csdn.net/article/details/120541104)

[[hadoop3.x系列]Hadoop常用文件存储格式及BigData File
Viewer工具的使用(三)](https://manor.blog.csdn.net/article/details/120559671)

[✨[hadoop3.x]新一代的存储格式Apache Arrow(四)  
](https://manor.blog.csdn.net/article/details/120566839)

[[hadoop3.x]HDFS存储类型和存储策略(五)概述  
](https://manor.blog.csdn.net/article/details/120629086)

[[hadoop3.x]HDFS存储策略和冷热温三阶段数据存储(六)概述  
](https://manor.blog.csdn.net/article/details/120640406)

[[hadoop3.x]HDFS中的内存存储支持(七)概述  
](https://manor.blog.csdn.net/article/details/120654013)

### 🍑 1.1 💃HDFS中的内存存储支持💃

##### 1.1.1 💃介绍💃

l HDFS支持写入由DataNode管理的堆外内存

l DataNode异步地将内存中数据刷新到磁盘，从而减少代价较高的磁盘IO操作，这种写入称之为懒持久写入

l
HDFS为懒持久化写做了较大的持久性保证。在将副本保存到磁盘之前，如果节点重新启动，有非常小的几率会出现数据丢失。应用程序可以选择使用懒持久化写，以减少写入延迟

该特性从ApacheHadoop 2.6.0开始支持。

![img](https://i-blog.csdnimg.cn/blog_migrate/42433af15f8b8e3ac819be30dc5a2237.jpeg)

l 比较适用于，当应用程序需要往HDFS中以低延迟的方式写入相对较低数据量(从几GB到十几GB(取决于可用内存)的数据量时

l 内存存储适用于在集群内运行，且运行的客户端与HDFS DataNode处于同一节点的应用程序。使用内存存储可以减少网络传输的开销

l 如果内存不足或未配置，使用懒持久化写入的应用程序将继续工作，会继续使用磁盘存储。

##### 1.1.2 💃配置内存存储支持💃

接下来，我们来了解下在HDFS中使用该功能，需要有哪些操作。

###### 1.1.2.1 💃设置能够使用的内存空间💃

确定用于存储在内存中的副本内存量

l 在指定DataNode的hdfs-site.xml设置dfs.datanode.max.locked.memory

l DataNode将确保懒持久化的内存不超过dfs.datanode.max.locked.memory

l 例如，为内存中的副本预留32 GB

    
    
        <property>
          <name>dfs.datanode.max.locked.memory</name>
          <value>34359738368</value>
        </property>
    

在设置此值时，请记住，还需要内存中的空间来处理其他事情，例如数据节点和应用程序JVM堆以及操作系统页缓存。如果在与数据节点相同的节点上运行YARN节点管理器进程，则还需要YARN容器的内存

###### 1.1.2.2 💃DataNode设置基于内存的存储💃

l 在每个DataNode节点上初始化一个RAM磁盘

l 通过选择RAM磁盘，可以在DataNode进程重新启动时保持更好的数据持久性

下面的设置可以在大多数Linux发行版上运行，目前不支持在其他平台上使用RAM磁盘。

##### 1.1.3 💃选择tmpfs（VS ramfs）💃

l Linux支持使用两种类型的RAM磁盘-tmpfs和ramfs

l tmpfs的大小受linux内核的限制，而ramfs可以使用所有系统可用的内存

l tmpfs可以在内存不足情况下交换到磁盘上。但是，许多对性能要求很高的应用运行时都禁用内存磁盘交换

l HDFS当前支持tmpfs分区，而对ramfs的支持正在开发中

##### 1.1.4 💃挂载RAM磁盘💃

l 使用Linux中的mount命令来挂载内存磁盘。例如：挂载32GB的tmpfs分区在/mnt/dn-tmpfs

sudo mount -t tmpfs -o size=32g tmpfs /mnt/dn-tmpfs/

l 建议在/etc/fstab创建一个入口，在DataNode节点重新启动时，将自动重新创建RAM磁盘

l 另一个可选项是使用/dev/shm下面的子目录。这是tmpfs默认在大多数Linux发行版上都可以安装

l 确保挂载的大小大于或等于dfs.datanode.max.locked.memory，或者写入到/etc /fstab

l 不建议使用多个tmpfs对懒持久化写入的每个DataNode节点进行分区

##### 1.1.5 设置RAM_DISK存储类型tmpfs标签

l 标记tmpfs目录中具有RAM_磁盘存储类型的目录

l 在hdfs-site.xml中配置dfs.datanode.data.dir。例如，在具有三个硬盘卷的DataNode上，/grid /0, /grid
/1以及 /grid /2和一个tmpfs挂载在 /mnt/dn-tmpfs, dfs.datanode.data.dir必须设置如下：

    
    
        <property>
          <name>dfs.datanode.data.dir</name>
          <value>/grid/0,/grid/1,/grid/2,[RAM_DISK]/mnt/dn-tmpfs</value>
        </property>
    

l 这一步至关重要。如果没有RAM_DISK标记，HDFS将把tmpfs卷作为非易失性存储，数据将不会保存到持久存储，重新启动节点时将丢失数据

##### 1.1.6 💃确保启用存储策略💃

确保全局设置中的存储策略是已启用的。默认情况下，此设置是打开的。

##### 1.1.7 💃使用内存存储💃

##### 1.1.8 💃使用懒持久化存储策略💃

l 指定HDFS使用LAZY_PERSIST策略，可以对文件使用懒持久化写入

可以通过以下三种方式之一进行设置：

##### 1.1.9 💃在目录上执行hdfs storagepolicies命令💃

l 在目录上设置㽾策略，将使其对目录中的所有新文件生效

l 这个HDFS存储策略命令可以用于设置策略.

    
    
    hdfs storagepolicies -setStoragePolicy -path <path> -policy LAZY_PERSIST
    

##### 1.1.10 💃在目录上执行setStoragePolicy方法💃

Apache Hadoop 2.8.0后，应用程序可以通过编程方式将存储策略设置FileSystem.setStoragePolicy。

    
    
     fs.setStoragePolicy(path, "LAZY_PERSIST");
    

##### 1.1.11 💃创建文件的时候指定CreateFlag💃

当创建文件时，应用程序调用FileSystem.create方法，传递CreateFlag#LAZY_PERSIST实现。

    
    
        FSDataOutputStream fos =
            fs.create(
                path,
                FsPermission.getFileDefault(),
                EnumSet.of(CreateFlag.CREATE, CreateFlag.LAZY_PERSIST),
                bufferLength,
                replicationFactor,
                blockSize,
                null);
    

### 后记

📢博客主页：<https://manor.blog.csdn.net>  
📢欢迎点赞 👍 收藏 ⭐留言 📝 如有错误敬请指正！  
📢本文由 manor 原创，首发于 CSDN博客🙉

