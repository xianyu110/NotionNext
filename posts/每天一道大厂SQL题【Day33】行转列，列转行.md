---
title: "每天一道大厂SQL题【Day33】行转列，列转行"
date: "2026-01-02T16:00:50.665682"
category: "SQL练习"
tags: ["#sql", "#数据库"]
summary: ""author: xianyu120
status: "Published"
---

#### 文章目录

  * 每天一道大厂SQL题【Day33】行转列，列转行
  *     * 每日语录
    * 第32题 需求四：行转列，列转行
    *       * 思路分析
    * 答案获取
    * 加技术群讨论
    *       * 文末SQL小技巧
    * 后记

## 每天一道大厂SQL题【Day33】行转列，列转行

大家好，我是Maynor。相信大家和我一样，`都有一个大厂梦`，作为一名资深大数据选手，深知SQL重要性，接下来我准备用100天时间，基于大数据岗面试中的`经典SQL题`，以每日1题的形式，带你过一遍热门SQL题并给出恰如其分的解答。

一路走来，随着问题加深，发现不会的也愈来愈多。但底气着实足了不少，相信不少朋友和我一样，日积月累才是最有效的学习方式！

### 每日语录

![image-20231010100015104](https://i-blog.csdnimg.cn/blog_migrate/3e1d8439c7984333bbbe4e0d8996db5e.png)

学习！还是他娘地学习！

### 第32题 需求四：行转列，列转行

假设tableA如表5, tableB如表6,

表5

qq号（字段名：qq）| 游戏（字段名：game）  
---|---  
10000| a  
10000| b  
10000| c  
20000| c  
20000| d  
\-----| \----  
|  
  
表6

qq号（字段名：qq）| 游戏（字段名：game）  
---|---  
10000| a_b_c  
20000| c_d  
      
    
    create or replace temporary view tableA(qq, game) as values (10000, 'a'),
    (10000, 'b'),
    (10000, 'c'),
    (20000, 'c'),
    (20000, 'd');
    
    create or replace temporary view tableB(qq, game) as values (10000, 'a_b_c'),
    (20000, 'c_d');
    

请写出以下sql逻辑：

a, 将tableA输出为tableB的格式；

b, 将tableB输出为tableA的格式;

#### 思路分析

a 使用`GROUP
BY`语句按照qq号进行分组，然后使用`COLLECT_SET`函数将每个qq号对应的游戏名称收集为一个集合，最后使用`CONCAT_WS`函数将集合中的游戏名称用下划线连接起来。

b 使用`LATERAL
VIEW`和`explode`函数将tableB中的游戏字段按照下划线进行拆分，生成多行数据，然后将拆分后的游戏字段作为新的game列输出。

### 答案获取

建议你先动脑思考，动手写一写再对照看下答案。

使用大厂GPT ,获取答案: https://chatgpt-plus.top/g/g-vNxYys2Bq-lun-wen-run-se-jiang-
zhong-zhu-shou

![image-20240606163429084](https://i-blog.csdnimg.cn/blog_migrate/8b83a73249014ec41216284f969736fe.png)

参考答案适用HQL，SparkSQL，FlinkSQL，即大数据组件，其他SQL需自行修改。

### 加技术群讨论

点击下方卡片关注 联系我进群

#### 文末SQL小技巧

提高SQL功底的思路。  
1、造数据。因为有数据支撑，会方便我们根据数据结果去不断调整SQL的写法。  
造数据语法既可以create table再insert into，也可以用下面的create temporary view xx as
values语句，更简单。  
其中create temporary view xx as values语句，SparkSQL语法支持，hive不支持。  
2、先将结果表画出来，包括结果字段名有哪些，数据量也画几条。这是分析他要什么。  
从源表到结果表，一路可能要走多个步骤，其实就是可能需要多个子查询，过程多就用with as来重构提高可读性。  
3、要由简单过度到复杂，不要一下子就写一个很复杂的。  
先写简单的select from table…,每个中间步骤都执行打印结果，看是否符合预期，
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

