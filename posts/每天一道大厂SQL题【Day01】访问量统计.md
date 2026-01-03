---
title: "每天一道大厂SQL题【Day01】访问量统计"
date: "2026-01-02T15:44:49.849331"
category: "SQL练习"
tags: ["#sql", "#数据库", "#java"]
summary: 大家好，我是Maynor。相信大家和我一样，都有一个大厂梦，作为一名资深大数据选手，深知SQL重要性，接下来我准备用100天时间，基于大数据岗面试中的经典题，以每日1题的形式，带你过一遍热门SQL题及恰如其分的解答。一路走来，随着问题加深，发现不会的也愈来愈多。但底气着实足了不少，相信不少朋友和我一样，日积月累才是最有效的学习方式！
author: "xianyu120"
status: "Published"
---

## 每天一道大厂SQL题【Day01】访问量统计

###

大家好，我是`Maynor`。相信大家和我一样，`都有一个大厂梦`，作为一名资深大数据选手，深知SQL重要性，接下来我准备用100天时间，基于`大数据岗面试`中的经典题，以每日1题的形式，带你过一遍热门SQL题及恰如其分的解答。

一路走来，随着问题加深，发现不会的也愈来愈多。但底气着实足了不少，相信不少朋友和我一样，日积月累才是最有效的学习方式！

### 先来10道`HiveSQL`题：

### 第1题：访问量统计

#### 需求

我们有如下的用户访问数据

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/8774d590df71b77b5b2e5b0e7656c6fc.png)

要求使用SQL统计出每个用户的累积访问次数，如下表所示：

用户id 月份 小计 累积  
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/5dea4de07ad99fbdc6079897872d6e63.png)

如何实现？

##### 数据准备

    
    
    CREATE TABLE test_sql.test1 (
    userId string, visitDate string, visitCount INT )
    ROW format delimited FIELDS TERMINATED BY "\t"; 
    INSERT INTO TABLE test_sql.test1
    VALUES
    ( 'u01', '2017/1/21', 5 ),
    ( 'u02', '2017/1/23', 6 ),
    ( 'u03', '2017/1/22', 8 ),
    ( 'u04', '2017/1/20', 3 ),
    ( 'u01', '2017/1/23', 6 ),
    ( 'u01', '2017/2/21', 8 ),
    ( 'u02', '2017/1/23', 6 ),
    ( 'u01', '2017/2/22', 4 );
    

#### 思路分析tips

首先可以使用SQL的GROUP BY语句对用户ID和月份进行分组，然后使用SUM函数统计每组的访问次数。之后再使用SQL的Window函数，如sum()
over()进行累积计算，并输出累积访问次数。最后按照用户ID和月份进行排序输出结果。

### 答案获取

建议你先动脑思考，动手写一写再对照看下答案。

使用大厂GPT ,获取答案: <https://chatgpt-plus.top/g/g-fAnf3mu88-da-han-sqlzhu-shou>  
![image-20240606163429084](https://i-blog.csdnimg.cn/blog_migrate/bd2f3b16393c3c25664f730f504255fb.png)

参考答案适用HQL，SparkSQL，FlinkSQL，即大数据组件，其他SQL需自行修改。

### 加技术群讨论

点击下方卡片关注 联系我进群

或者直接`私信我进群`

#### 文末SQL小技巧

提高SQL功底的思路。  
1、造数据。因为有数据支撑，会方便我们根据数据结果去不断调整SQL的写法。  
造数据语法既可以create table再insert into，也可以用下面的create temporary view xx as
values语句，更简单。  
其中create temporary view xx as values语句，SparkSQL语法支持，hive不支持。  
2、先将结果表画出来，包括结果字段名有哪些，数据量也画几条。这是分析他要什么。  
从源表到结果表，一路可能要走多个步骤，其实就是可能需要多个子查询，过程多就用with as来重构提高可读性。  
3、要由简单过度到复杂，不要一下子就写一个很复杂的。  
先写简单的select * from table…,每个中间步骤都执行打印结果，看是否符合预期，
根据中间结果，进一步调整修饰SQL语句，再执行，直到接近结果表。  
4、数据量要小，工具要快，如果用hive，就设置set
hive.exec.mode.local.auto=true;如果是SparkSQL，就设置合适的shuffle并行度，set
spark.sql.shuffle.partitions=4;

### 后记

📢博客主页：<https://manor.blog.csdn.net>

📢欢迎点赞 👍 收藏 ⭐留言 📝 如有错误敬请指正！  
📢本文由 Maynor 原创，首发于 CSDN博客🙉  
📢不能老盯着手机屏幕，要不时地抬起头，看看老板的位置⭐  
📢专栏持续更新,欢迎订阅：<https://blog.csdn.net/xianyu120/category_12182595.html>

