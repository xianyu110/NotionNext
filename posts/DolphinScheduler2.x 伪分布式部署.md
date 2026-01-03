---
title: "DolphinScheduler2.x 伪分布式部署"
date: "2026-01-02T16:02:37.968128"
category: "大数据项目"
tags: ["#分布式"]
summary: ""author: xianyu120
status: "Published"
---

#### 文章目录

  *     * DolphinScheduler2.x 伪分布式部署
    * QA

### DolphinScheduler2.x 伪分布式部署

DolphinScheduler 部署说明

1 软硬件环境要求

1.1 操作系统版本要求

操作系统| 版本  
---|---  
Red Hat Enterprise Linux| 7.0 及以上  
CentOS| 7.0 及以上  
Oracle Enterprise Linux| 7.0 及以上  
Ubuntu LTS| 16.04 及以上  
  
1.2 服务器硬件要求

CPU| 内存| 硬盘类型| 网络| 实例数量  
---|---|---|---|---  
4 核+| 8 GB+| SAS| 千兆网卡| 1+  
  
2 部署模式

DolphinScheduler 支持多种部署模式，包括单机模式（Standalone）、伪集群模式（Pseudo-
Cluster）、集群模式（Cluster）等。

2.1 单机模式

单机模式（standalone）模式下，所有服务均集中于一个 StandaloneServer 进程中，并且

其中内置了注册中心 Zookeeper 和数据库 H2 。只需配置 JDK 环境， 就可一键启动 DolphinScheduler，快速体验其功能。

2.2 伪集群模式

伪集群模式（Pseudo-Cluster）是在单台机器部署 DolphinScheduler 各项服务，该模式 下 master、worker、api
server 、logger server 等服务都只在同一台机器上。Zookeeper 和数据 库需单独安装并进行相应配置。

2.3 集群模式

集群模式（Cluster）与伪集群模式的区别就是在多台机器部署 DolphinScheduler 各项服 务，并且 Master、Worker
等服务可配置多个。

第 3 章 DolphinScheduler 集群模式部署

3.1 集群规划

集群模式下，可配置多个 Master 及多个 Worker 。通常可配置 2~3 个 Master ，若干个 Worker 。由于集群资源有限，此处配置一个
Master，一个 Worker ，集群规划如下。

node1| master、worker  
---|---  
|  
  
3.2 前置准备工作

（1）节点需部署 JDK（1.8+），并配置相关环境变量。

（2）需部署数据库，支持 MySQL（5.7+）或者 PostgreSQL（8.2.15+）。

（3）需部署 Zookeeper（3.4.6+）。

（4）节点需安装进程树分析工具psmisc。

    
    
    sudo yum install -y psmisc
    

![img](https://i-blog.csdnimg.cn/blog_migrate/2580012ee65651d723b0d90685f5e0a1.png)

3.3 解压 DolphinScheduler 安装包

（1）上传 DolphinScheduler 安装包到 node1 节点的/opt/software 目录

（2）解压安装包到当前目录

注：解压目录并非最终的安装目录

    
    
    tar -zxvf apache-dolphinscheduler-2.0.5-bin.tar.gz 
    

3.4 创建元数据库及用户

DolphinScheduler 元数据存储在关系型数据库中，故需创建相应的数据库和用户。

（1）创建数据库

![img](https://i-blog.csdnimg.cn/blog_migrate/0b6e94c386def189884ab5a58a9f11b2.png)

（2）创建用户

![img](https://i-blog.csdnimg.cn/blog_migrate/3edc29f17614b037b14786f08207bd92.png)

_***注：***_

若出现以下错误信息，表明新建用户的密码过于简单。

ERROR 1819 (HY000): Your password does not satisfy the current policy
requirements

可提高密码复杂度或者执行以下命令降低 MySQL 密码强度级别。

![img](https://i-blog.csdnimg.cn/blog_migrate/b4a39f08d5e9473fb10bae063d4e90e5.png)

（3）赋予用户相应权限

    
    
    mysql>    GRANT    ALL    PRIVILEGES    ON    dolphinscheduler.*    TO
    'dolphinscheduler'@'%';  mysql> flush privileges;
    

具体命令如下:

    
    
    CREATE DATABASE dolphinscheduler DEFAULT CHARACTER SET utf8 
    DEFAULT COLLATE utf8_general_ci;
    
    CREATE USER 'dolphinscheduler'@'%' IDENTIFIED BY 
    'Mr^HYe]9cR]D';
    
    GRANT ALL PRIVILEGES ON dolphinscheduler.* TO 
    'dolphinscheduler'@'%';
    
    
    FLUSH PRIVILEGES;
    

3.5 配置一键部署脚本

修改解压目录下的 conf/config 目录下的 install_config.conf 文件。

vim conf/config/install_config.conf

![img](https://i-blog.csdnimg.cn/blog_migrate/231eacaf158cee3c5c66d10932e63bc7.png)

    
    
    #
    # Licensed to the Apache Software Foundation (ASF) under one or more
    # contributor license agreements.  See the NOTICE file distributed with
    # this work for additional information regarding copyright ownership.
    # The ASF licenses this file to You under the Apache License, Version 2.0
    # (the "License"); you may not use this file except in compliance with
    # the License.  You may obtain a copy of the License at
    #
    #     http://www.apache.org/licenses/LICENSE-2.0
    #
    # Unless required by applicable law or agreed to in writing, software
    # distributed under the License is distributed on an "AS IS" BASIS,
    # WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    # See the License for the specific language governing permissions and
    # limitations under the License.
    #
    
    # ---------------------------------------------------------
    # INSTALL MACHINE
    # ---------------------------------------------------------
    # A comma separated list of machine hostname or IP would be installed DolphinScheduler,
    # including master, worker, api, alert. If you want to deploy in pseudo-distributed
    # mode, just write a pseudo-distributed hostname
    # Example for hostnames: ips="ds1,ds2,ds3,ds4,ds5", Example for IPs: ips="192.168.8.1,192.168.8.2,192.168.8.3,192.168.8.4,192.168.8.5"
    ips="node1"
    
    # Port of SSH protocol, default value is 22. For now we only support same port in all `ips` machine
    # modify it if you use different ssh port
    sshPort="22"
    
    # A comma separated list of machine hostname or IP would be installed Master server, it
    # must be a subset of configuration `ips`.
    # Example for hostnames: masters="ds1,ds2", Example for IPs: masters="192.168.8.1,192.168.8.2"
    masters="node1"
    
    # A comma separated list of machine <hostname>:<workerGroup> or <IP>:<workerGroup>.All hostname or IP must be a
    # subset of configuration `ips`, And workerGroup have default value as `default`, but we recommend you declare behind the hosts
    # Example for hostnames: workers="ds1:default,ds2:default,ds3:default", Example for IPs: workers="192.168.8.1:default,192.168.8.2:default,192.168.8.3:default"
    workers="node1:default"
    
    # A comma separated list of machine hostname or IP would be installed Alert server, it
    # must be a subset of configuration `ips`.
    # Example for hostname: alertServer="ds3", Example for IP: alertServer="192.168.8.3"
    alertServer="node1"
    
    # A comma separated list of machine hostname or IP would be installed API server, it
    # must be a subset of configuration `ips`.
    # Example for hostname: apiServers="ds1", Example for IP: apiServers="192.168.8.1"
    apiServers="node1"
    
    # A comma separated list of machine hostname or IP would be installed Python gateway server, it
    # must be a subset of configuration `ips`.
    # Example for hostname: pythonGatewayServers="ds1", Example for IP: pythonGatewayServers="192.168.8.1"
    #pythonGatewayServers="ds1"
    
    # The directory to install DolphinScheduler for all machine we config above. It will automatically be created by `install.sh` script if not exists.
    # Do not set this configuration same as the current path (pwd)
    installPath="/opt/module/dolphinscheduler"
    
    # The user to deploy DolphinScheduler for all machine we config above. For now user must create by yourself before running `install.sh`
    # script. The user needs to have sudo privileges and permissions to operate hdfs. If hdfs is enabled than the root directory needs
    # to be created by this user
    deployUser="root"
    
    # The directory to store local data for all machine we config above. Make sure user `deployUser` have permissions to read and write this directory.
    dataBasedirPath="/tmp/dolphinscheduler"
    
    # ---------------------------------------------------------
    # DolphinScheduler ENV
    # ---------------------------------------------------------
    # JAVA_HOME, we recommend use same JAVA_HOME in all machine you going to install DolphinScheduler
    # and this configuration only support one parameter so far.
    javaHome="/export/server/jdk1.8.0_241/"
    
    # DolphinScheduler API service port, also this is your DolphinScheduler UI component's URL port, default value is 12345
    apiServerPort="12345"
    
    # ---------------------------------------------------------
    # Database
    # NOTICE: If database value has special characters, such as `.*[]^${}\+?|()@#&`, Please add prefix `\` for escaping.
    # ---------------------------------------------------------
    # The type for the metadata database
    # Supported values: ``postgresql``, ``mysql`, `h2``.
    DATABASE_TYPE="mysql"
    # 数据库类型
    # Spring datasource url, following <HOST>:<PORT>/<database>?<parameter> format, If you using mysql, you could use jdbc
    # string jdbc:mysql://127.0.0.1:3306/dolphinscheduler?useUnicode=true&characterEncoding=UTF-8 as example
    SPRING_DATASOURCE_URL="jdbc:mysql://node1:3306/dolphinscheduler?useUnicode=true&characterEncoding=UTF-8"
    
    # Spring datasource username
    SPRING_DATASOURCE_USERNAME="dolphinscheduler"
    # 数据库用户名
    # Spring datasource password
    #SPRING_DATASOURCE_PASSWORD=${SPRING_DATASOURCE_PASSWORD:-""}
    SPRING_DATASOURCE_PASSWORD="Mr^HYe]9cR]D"
    # 数据库密码
    # ---------------------------------------------------------
    # Registry Server
    # ---------------------------------------------------------
    # Registry Server plugin name, should be a substring of `registryPluginDir`, DolphinScheduler use this for verifying configuration consistency
    registryPluginName="zookeeper"
    # 注册中心地址，即 Zookeeper 集群的地址
    # Registry Server address.
    registryServers="192.168.88.100:2181"
    
    # Registry Namespace
    registryNamespace="dolphinscheduler"
    # DS 在 Zookeeper 的结点名称
    # ---------------------------------------------------------
    # Worker Task Server
    # ---------------------------------------------------------
    # Worker Task Server plugin dir. DolphinScheduler will find and load the worker task plugin jar package from this dir.
    taskPluginDir="lib/plugin/task"
    
    # resource storage type: HDFS, S3, NONE
    resourceStorageType="HDFS"
    # 资源存储类型
    # resource store on HDFS/S3 path, resource file will store to this hdfs path, self configuration, please make sure the directory exists on hdfs and has read write permissions. "/dolphinscheduler" is recommended
    resourceUploadPath="/dolphinscheduler"
    
    # if resourceStorageType is HDFS，defaultFS write namenode address，HA, you need to put core-site.xml and hdfs-site.xml in the conf directory.
    # if S3，write S3 address，HA，for example ：s3a://dolphinscheduler，
    # Note，S3 be sure to create the root directory /dolphinscheduler
    defaultFS="hdfs://node1:8020"
    # 默认文件系统
    # if resourceStorageType is S3, the following three configuration is required, otherwise please ignore
    s3Endpoint="http://192.168.xx.xx:9010"
    s3AccessKey="xxxxxxxxxx"
    s3SecretKey="xxxxxxxxxx"
    
    # resourcemanager port, the default value is 8088 if not specified
    resourceManagerHttpAddressPort="8088"
    # yarn RM http 访问端口
    # if resourcemanager HA is enabled, please set the HA IPs; if resourcemanager is single node, keep this value empty
    yarnHaIps=
    # Yarn RM 高可用 ip，若未启用 RM 高可用，则将该值置空
    # if resourcemanager HA is enabled or not use resourcemanager, please keep the default value; If resourcemanager is single node, you only need to replace 'yarnIp1' to actual resourcemanager hostname
    singleYarnIp="node1"
    
    # who has permission to create directory under HDFS/S3 root path
    # Note: if kerberos is enabled, please config hdfsRootUser=
    hdfsRootUser="ds"
    
    # kerberos config
    # whether kerberos starts, if kerberos starts, following four items need to config, otherwise please ignore
    kerberosStartUp="false"
    # kdc krb5 config file path
    krb5ConfPath="$installPath/conf/krb5.conf"
    # keytab username,watch out the @ sign should followd by \\
    keytabUserName="hdfs-mycluster\\@ESZ.COM"
    # username keytab path
    keytabPath="$installPath/conf/hdfs.headless.keytab"
    # kerberos expire time, the unit is hour
    kerberosExpireTime="2"
    
    # use sudo or not
    sudoEnable="true"
    
    # worker tenant auto create
    workerTenantAutoCreate="false"
    
    

3.6 初始化数据库

（1）拷贝 MySQL 驱动到 DolphinScheduler 的解压目录下的 lib 中，要求使用 MySQL JDBC Driver 8.0.16。

cp /opt/software/mysql-connector-java-8.0.16.jar lib/

![img](https://i-blog.csdnimg.cn/blog_migrate/91b20856620ef88d48e5cd4324708b98.png)

（2）执行数据库初始化脚本

数据库初始化脚本位 于 DolphinScheduler 解 压 目 录 下 的 script 目 录 中 ， 即
/opt/software/ds/apache-dolphinscheduler-2.0.5-bin/script/。

[atguigu@node1 apache-dolphinscheduler-2.0.5-bin]$ script/create-
dolphinscheduler.sh

3.7 一键部署 DolphinScheduler

（1）启动 Zookeeper 集群

​ [atguigu@node1 apache-dolphinscheduler-2.0.5-bin]$ zk.sh start

（2）一键部署并启动 DolphinScheduler

​ [atguigu@node1 apache-dolphinscheduler-2.0.5-bin]$ ./install.sh

（3）查看 DolphinScheduler 进程

![image-20240412120329451](https://i-blog.csdnimg.cn/blog_migrate/bfbdc38d8454f6b4b6d1e10efb10f036.png)

（4）访问 DolphinScheduler UI

DolphinScheduler UI 地址为http://node1:12345/dolphinscheduler

初始用户的用户名为：admin，密码为 dolphinscheduler123

![image-20240412120542868](https://i-blog.csdnimg.cn/blog_migrate/b114e73c9b3e1bfed7d78f07ed820dc7.png)

3.8 DolphinScheduler 启停命令

DolphinScheduler 的启停脚本均位于其安装目录的bin 目录下。

1）一键启停所有服务

![img](https://i-blog.csdnimg.cn/blog_migrate/f2f2b99e403a361e7ca47c27b1c3e579.png)

注意同Hadoop 的启停脚本进行区分。

2）启停 Master

![img](https://i-blog.csdnimg.cn/blog_migrate/f6ce27656201e6b59699c017d767b3ab.png)

3）启停 Worker

![img](https://i-blog.csdnimg.cn/blog_migrate/d5317a823e18b487a7b02bf68067028f.png)

4）启停 Api

![img](https://i-blog.csdnimg.cn/blog_migrate/6c734925f2a3897d7f1a0ced8985495e.png)

5）启停 Logger

![img](https://i-blog.csdnimg.cn/blog_migrate/cba4077cc97b684fef1fb143b4f61583.png)

6）启停 Alert

![img](https://i-blog.csdnimg.cn/blog_migrate/e308966f5bfb2beace96045791432466.png)

### QA

mater worker 进程未启动

tail -100f logs/dolphinscheduler-worker-server-node1.itcast.cn.out

![image-20240412120419860](https://i-blog.csdnimg.cn/blog_migrate/65a646ca0d1c5f81812e40dc6b343571.png)

zookeeper未启动

调整 zoo.cfg 配置后重新启动，成功。

