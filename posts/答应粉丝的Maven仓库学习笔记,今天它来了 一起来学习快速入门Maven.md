---
title: "答应粉丝的Maven仓库学习笔记,今天它来了 一起来学习快速入门Maven"
date: "2026-01-02T15:45:15.362474"
category: "技术分享"
tags: ["#maven", "#java", "#c++", "#cpp", "#c语言"]
summary: 文章目录背景Maven第一部分1.1 什么是Maven1.2 仓库1.3 maven环境搭建1.3.1 下载1.3.2 安装1.3.3 配置：系统环境变量1.4 Maven使用1.4.1 私有仓库配置1.4.2 配置镜像（第三方仓库，私服）1.5 IDEA 配置1.5.1 IDEA 配置 maven1.5.2 新项目配置1.5.3 配置失败，重新配置1.6 IDEA  中 maven使用1.6.1 创建maven项目1.6.2 基本使用1.6.3 坐标2. Maven第二部分2.1 坐标2.1.1 什么是.
author: "xianyu120"
status: "Published"
---

## 我正在参加年度博客之星评选，请大家帮我投票打分，您的每一分都是对我的支持与鼓励。

2021年「博客之星」参赛博主：Maynor大数据 (感谢礼品、红包免费送！)

<https://bbs.csdn.net/topics/603955366>

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/cf5a51e7e4030c5345fbca01962ec5e1.png)

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/3161060e2fd9aa14e5a727226964ca5e.jpeg#pic_center)

#### 文章目录

  * 我正在参加年度博客之星评选，请大家帮我投票打分，您的每一分都是对我的支持与鼓励。
  * 背景
  * Maven第一部分
  *     * 1.1 什么是Maven
    * 1.2 仓库
    * 1.3 maven环境搭建
    *       * 1.3.1 下载
      * 1.3.2 安装
      * 1.3.3 配置：系统环境变量
    * 1.4 Maven使用
    *       * 1.4.1 私有仓库配置
      * 1.4.2 配置镜像（第三方仓库，私服）
    * 1.5 IDEA 配置
    *       * 1.5.1 IDEA 配置 maven
      * 1.5.2 新项目配置
      * 1.5.3 配置失败，重新配置
    * 1.6 IDEA 中 maven使用
    *       * 1.6.1 创建maven项目
      * 1.6.2 基本使用
      * 1.6.3 坐标
  * 2\. Maven第二部分
  *     * 2.1 坐标
    *       * 2.1.1 什么是坐标（依赖）
      * 2.1.2 依赖范围
      * 2.1.3 依赖传递&依赖排除
    * 2.2 继承与模块
    *       * 2.2.1 概述
      * 2.2.2 分析
      * 2.2.3 实际操作
    * 2.3 web项目启动&访问
    *       * 2.3.1 打包
      * 2.3.2 启动：配置tomcat方式
      * 2.3.3 启动：tomcat插件方式
      *         * 启动问题：Could not find artifact
    * 后记

## 背景

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/72d35458a96ddc51a146ea46811d9605.png)

> 国庆期间有粉丝问我有没有Java大数据的学习笔记,我当时推荐了给他我的博客,
> 但还有一个板块缺失:Maven,今天有时间终于整理出来这篇Maven仓库的学习笔记!

## Maven第一部分

### 1.1 什么是Maven

  * maven 是管理项目的工具。 
    * 项目各个阶段：清理、初始化、编译、测试、报告 、打包、部署、站点生成。
  * maven目前开发内容： 
    * 依赖管理：维护jar包。
    * 测试
    * 打包
  * 核心思想：项目对象模型 (Project Object Model)，每一个maven项目，都有一个pom.xml文件，进行项目管理。

### 1.2 仓库

  * 仓库分类：私有仓库、中央仓库、第三方仓库（远程） 
    * 私有仓库：每个人本地仓库，方面离线操作。
    * 中央仓库：官方仓库，存放所有依赖。在国外。https://search.maven.org/
    * 第三方仓库：由非盈利机构搭建第三方私有仓库，对外提供依赖下载。 
      * 阿里云
      * 华为云

### 1.3 maven环境搭建

#### 1.3.1 下载

  * 版本：3.5.3 （3.3.9）

![image-20211015165207081](https://i-blog.csdnimg.cn/blog_migrate/011bf2271a2687bb7eec585c6cc6511a.png)

#### 1.3.2 安装

  * 将下载资源解压即可

![image-20211015165241742](https://i-blog.csdnimg.cn/blog_migrate/8e07dbd876141242a9abe3b4c8697a28.png)

#### 1.3.3 配置：系统环境变量

  * 配置window 系统环境变量 
    * MAVEN_HOME： 
      * 内容：maven安装目录
      * 原因：方法其他环境变量使用、方便其他软件使用(idea)
    * path： 
      * 内容：maven的bin目录（使用MAVEN_HOMN 确定安装目录）
      * 原因：在cmd可以使用maven命令。

![image-20211015165401663](https://i-blog.csdnimg.cn/blog_migrate/2b24b24126ee2f34c29468e777486e2e.png)

### 1.4 Maven使用

#### 1.4.1 私有仓库配置

  * 私有仓库的根目录：`D:\Java\maven\yycg_repository`

![image-20211015170218497](https://i-blog.csdnimg.cn/blog_migrate/4d0e80f894c062089cfa0ae0c013600e.png)

  * maven配置私有仓库 `%MAVEN_HOME%/conf/settings.xml`

![image-20211015170413277](https://i-blog.csdnimg.cn/blog_migrate/4296dace1e5b383839dfc3ff82b8de09.png)

#### 1.4.2 配置镜像（第三方仓库，私服）

  * 配置 aliyun的镜像
    
            <mirror>
          <id>alimaven</id>
          <name>aliyun maven</name>
          <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
          <mirrorOf>central</mirrorOf>        
        </mirror>
    

![image-20211015170603382](https://i-blog.csdnimg.cn/blog_migrate/90d69c7673f9e2533990da09c7b595e6.png)

### 1.5 IDEA 配置

#### 1.5.1 IDEA 配置 maven

  * idea在安装时，自动使用 MAVEN_HOME 配置的 本地maven。

  * 如果没有识别，手动配置，采用通用配置 `File/Settings/Maven...`

    * 配置1：确定maven安装目录

![image-20211015171903134](https://i-blog.csdnimg.cn/blog_migrate/f890598467a638a5f0cf20acca9767a5.png)

    * 配置2：更新本地仓库

![image-20211015172144102](https://i-blog.csdnimg.cn/blog_migrate/68c3d4b4a036f751ae4d2c1d1ab75289.png)

#### 1.5.2 新项目配置

  * 如果通用配置可以，建议使用通用。

  * 如果通用不可用，使用新项目配置。

![image-20211015172446366](https://i-blog.csdnimg.cn/blog_migrate/9c3240461f57d8a6d840ba47ab209c23.png)

#### 1.5.3 配置失败，重新配置

  * 将idea配置信息删除（如果删除，相当于新安装的idea，包括激活码没有了。）

![image-20211015172730272](https://i-blog.csdnimg.cn/blog_migrate/38d9661fd115bca4e36d44a49024c65d.png)

### 1.6 IDEA 中 maven使用

#### 1.6.1 创建maven项目

  * 步骤1：选择maven，进行项目创建

![image-20211015174748101](https://i-blog.csdnimg.cn/blog_migrate/df9d36c94500ab58b62b7c98848037cc.png)

  * 步骤2：填写项目详情

![image-20211015175027597](https://i-blog.csdnimg.cn/blog_migrate/b0f4c12b3d6cce6d3b465dec7fae017a.png)

  * 步骤3：开启自动导入

    * idea 2019 能够选择开启自动导入
    * idea 2020及其之后版本，必须手动操作

![image-20211015175108410](https://i-blog.csdnimg.cn/blog_migrate/3e101f519e5f94570d729966d211c8e4.png)

#### 1.6.2 基本使用

  * maven项目的生命周期命令的使用。

![image-20211015180237091](https://i-blog.csdnimg.cn/blog_migrate/e260f0a26e2f9b7bf776ca577d1af147.png)

#### 1.6.3 坐标

  * 坐标：在maven中每一个项目都一个唯一标识，这个标识称为坐标，也称为依赖 dependency 。

  * 坐标组成：组、标识、版本

![image-20211015180522298](https://i-blog.csdnimg.cn/blog_migrate/639c6274e25e95b217643a3d16ec90d6.png)

  * 通过坐标完成的使用

    * 在maven项目中，通过坐标可以导入对应的jar包。
    * 可以在本地仓库中，通过坐标获得jar包具体的位置。
  * 使用坐标

    * 情况1：直接使用
        
                    <dependencies>
                <dependency>
                    <groupId>junit</groupId>
                    <artifactId>junit</artifactId>
                    <version>4.9</version>
                </dependency>
            </dependencies>
        

    * 情况2：先锁定版本，再使用
        
                    <!-- 锁定版本   -->
            <dependencyManagement>
                <dependencies>
                    <dependency>
                        <groupId>junit</groupId>
                        <artifactId>junit</artifactId>
                        <version>4.9</version>
                    </dependency>
                </dependencies>
            </dependencyManagement>
        
            <!--使用-->
            <dependencies>
                <dependency>
                    <groupId>junit</groupId>
                    <artifactId>junit</artifactId>
                </dependency>
            </dependencies>
        
        

    * 情况3：先定义版本，再锁定版本，最后使用
        
                	<!-- 版本号   -->
            <properties>
                <junit.version>4.9</junit.version>
            </properties>
        
            <!-- 锁定版本   -->
            <dependencyManagement>
                <dependencies>
                    <dependency>
                        <groupId>junit</groupId>
                        <artifactId>junit</artifactId>
                        <version>${junit.version}</version>
                    </dependency>
                </dependencies>
            </dependencyManagement>
        
            <!--使用-->
            <dependencies>
                <dependency>
                    <groupId>junit</groupId>
                    <artifactId>junit</artifactId>
                </dependency>
            </dependencies>
        

## 2\. Maven第二部分

### 2.1 坐标

#### 2.1.1 什么是坐标（依赖）

  * 坐标：用于唯一标识一个项目xml配置，有称为依赖。

  * 组成部分：组、标识、版本
    
                <dependency>
                <groupId>junit</groupId>
                <artifactId>junit</artifactId>
            </dependency>
    

#### 2.1.2 依赖范围

![image-20211018081134027](https://i-blog.csdnimg.cn/blog_migrate/45882bf5a62c32ee39e8d23e1f3bbc0b.png)

  * 依赖范围：坐标/依赖/jar包，在maven项目中，使用的范围。

    * 此范围包括3种时态：编译时、测试时、运行时。
  * 依赖范围种类：

    * compile ，默认值，在3个时态（编译时、测试时、运行时）中都可以使用。

    * test ，测试，仅在`测试时`有用，其他时没有此jar。例如：Junit

    * provided，仅在`编译时`、`测试时`有用。例如：servlet、jsp相关（必须操作的。）

    * runtime，仅在`测试时`、`运行时`有用。例如：jdbc驱动

    * system，maven仓库之外的jar包。（不建议）

      * 如果有仓库之外的jar包，建议先安装到本地仓库中。
        
                mvn install:install-file -DgroupId=com.czxy -DartifactId=itcasttools -Dversion=1.5.8 -Dpackaging=jar -Dfile=E:\develop\jars\itcast-tools-1.5.8.jar
        
    
        <!--默认值，3个时态都有效-->
            <dependency>
                <groupId>com.alibaba</groupId>
                <artifactId>druid-spring-boot-starter</artifactId>
                <version>1.1.10</version>
                <scope>compile</scope>
            </dependency>
    
            <!--测试时，有效-->
            <dependency>
                <groupId>junit</groupId>
                <artifactId>junit</artifactId>
                <version>4.9</version>
                <scope>test</scope>
            </dependency>
    
            <!-- 编译时、测试时，2个时态有效   -->
            <dependency>
                <groupId>javax.servlet</groupId>
                <artifactId>servlet-api</artifactId>
                <version>2.5</version>
                <scope>provided</scope>
            </dependency>
    
            <!-- 测试时、运行时，2个时态有效   -->
            <dependency>
                <groupId>mysql</groupId>
                <artifactId>mysql-connector-java</artifactId>
                <version>5.1.32</version>
                <scope>runtime</scope>
            </dependency>
    

#### 2.1.3 依赖传递&依赖排除

  * 依赖传递：依赖与依赖之间关系，称为依赖传递。

    * 当A依赖B、B依赖C,在A中导入B后会自动导入C,C是A的传递依赖。
  * 依赖传递原则：

    * 原则1：配置优先原则 ？（测试结果：覆盖原则）

    * 原则2：路径最短原则
        
                A  --> B  -->  C 1.1
        A  --> C 1.0
        采纳：C 1.0
        

    * 结论：如果`依赖传递`后的版本不是实际需要的版本，需要单独引入，通常将传递的依赖进行`依赖排除`

    
    
            <!-- druid-spring-boot-starter 依赖传递 druid-->
    		<dependency>
                <groupId>com.alibaba</groupId>
                <artifactId>druid-spring-boot-starter</artifactId>
                <version>1.1.10</version>
                <scope>compile</scope>
                <!--  依赖排除 -->
                <exclusions>
                    <exclusion>
                        <groupId>com.alibaba</groupId>
                        <artifactId>druid</artifactId>
                    </exclusion>
                </exclusions>
            </dependency>
    		
    		<!-- 手动移入druid，采用【最短路径原则】-->
            <dependency>
                <groupId>com.alibaba</groupId>
                <artifactId>druid</artifactId>
                <version>1.2.8</version>
            </dependency>
    

### 2.2 继承与模块

#### 2.2.1 概述

  * 在项目开发中，一个项目比较大，通常将项目进行拆分，方便项目维护、升级等操作。

  * 拆分方式：

    * 方式1：按照软件`分层`进行拆分。 
      * 例如：common、domain、dao、service、web
    * 方式2：按照`模块`进行拆分。 
      * 例如：common、domain、user、order、… 等
  * maven通过`继承与模块`对拆分进行支持

    * 创建父项目
    * 为父项目，创建多个子项目。
    * 每一个子项目，就是一个`模块`。
    * 父项目和子项目，通过`继承`体现父子关系。

#### 2.2.2 分析

  * 创建父项目：day17_maven_parent
  * 创建子项目： 
    * day17_common
    * day17_domain
    * day17_dao
    * day17_service
    * day17_web
  * 总结： 
    * 父项目的配置：
    * 子项目的配置：

#### 2.2.3 实际操作

  * 创建父项目：day17_maven_parent

![image-20211018093633533](https://i-blog.csdnimg.cn/blog_migrate/17d60f3b5eeb69ab6e2a719504f86505.png)

  * 创建子项目：

    * day17_common
    * day17_domain
    * day17_dao
    * day17_service
    * day17_web

总结：

  * 项目结构：

![image-20211018093945731](https://i-blog.csdnimg.cn/blog_migrate/d3c13dc8ad8be0ce58ad25722e620621.png)

  * 父项目的配置：

![image-20211018094153845](https://i-blog.csdnimg.cn/blog_migrate/03de484a1476de88324221a33708a0bd.png)

  * 子项目的配置：

    * 通用配置，引用其他依赖（web --> service --> dao --> domain --> common）
        
                    <dependencies>
                <dependency>
                    <groupId>com.czxy</groupId>
                    <artifactId>day17_service</artifactId>
                    <version>1.0-SNAPSHOT</version>
                </dependency>
            </dependencies>
        

    * 除web项目外，其他项目：

![image-20211018094431133](https://i-blog.csdnimg.cn/blog_migrate/ff73e288b1deba8be9fa4e83ab47b6ce.png)

    * web项目：

      * 方式1：标准web开发，需要使用 jsp 等资源。需要将项目打包成war包。

![image-20211018094709215](https://i-blog.csdnimg.cn/blog_migrate/57d3d15e653b2a3f1e5613043b310085.png)

      * 方式2：spring boot + RestFul风格，打包方式仍是jar包。

### 2.3 web项目启动&访问

#### 2.3.1 打包

![image-20211018095614898](https://i-blog.csdnimg.cn/blog_migrate/d596d3e35a5addc4d4961cfe37feb209.png)

  * 打包之后

![image-20211018095633504](https://i-blog.csdnimg.cn/blog_migrate/fd40f659d6e75d688096829322bbc3d8.png)

#### 2.3.2 启动：配置tomcat方式

  * 创建web项目工作目录 `webapp`，并创建首页 `index.html`

![image-20211018102052591](https://i-blog.csdnimg.cn/blog_migrate/14ebcf7270c746897385042673363cb0.png)

  * 配置tomcat

![image-20211018102316571](https://i-blog.csdnimg.cn/blog_migrate/158fe82ea53e36924c1a5beff06987b0.png)

  * 部署web项目

![image-20211018102510428](https://i-blog.csdnimg.cn/blog_migrate/7d0be0c42ef5e3c70285604a3685d42f.png)

  * 启动

![image-20211018102530274](https://i-blog.csdnimg.cn/blog_migrate/53adf3a0bb9dffa028c7cce471324afb.png)

  * 访问
    
        http://localhost:8080/day17_web_war/
    

![image-20211018102623529](https://i-blog.csdnimg.cn/blog_migrate/fb9493bbb58d6f7b8cec11b41717e3ba.png)

#### 2.3.3 启动：tomcat插件方式

  * 创建web项目工作目录 `webapp`，并创建首页 `index.html` (已有)

  * 如果没有配置 WEB-INF/web.xml 文件，启动有异常，可以禁用
    
            <properties>
            <!--声明不需要web.xml文件-->
            <failOnMissingWebXml>false</failOnMissingWebXml>
        </properties>
    

![image-20211018103405090](https://i-blog.csdnimg.cn/blog_migrate/9d46a80a78dbb65a2b01eddf4807e09f.png)

  * 给web项目 pom.xml文件配置tomcat插件

![image-20211018102919489](https://i-blog.csdnimg.cn/blog_migrate/1e7ea2a8629b5f0518f3cbdfd71b5540.png)

    
            <build>
            <plugins>
                <!-- tomcat7插件 -->
                <plugin>
                    <groupId>org.apache.tomcat.maven</groupId>
                    <artifactId>tomcat7-maven-plugin</artifactId>
                    <version>2.1</version>
                    <configuration>
                        <port>8080</port>
                        <server>tomcat7</server>
                    </configuration>
                </plugin>
            </plugins>
        </build>
    

  * 运行对应命令 `tomcat7:run`

![image-20211018103705868](https://i-blog.csdnimg.cn/blog_migrate/a0d7ab035e3b4b8678c003ef08172668.png)

##### 启动问题：Could not find artifact

  * 错误的提示信息

![image-20211018104215606](https://i-blog.csdnimg.cn/blog_migrate/c3decf9d82d94afc3576ccab858e3e5c.png)

  * 解决方案：将`父项目`安装到maven私有仓库中

![image-20211018104307036](https://i-blog.csdnimg.cn/blog_migrate/0a229f3f1ab82992461b896ad04ff3a9.png)

  * 存在问题：代码更新不及时，需要手动频繁的安装

### 后记

📢博客主页：<https://manor.blog.csdn.net>  
📢欢迎点赞 👍 收藏 ⭐留言 📝 如有错误敬请指正！  
📢本文由 manor 原创，首发于 CSDN博客🙉

