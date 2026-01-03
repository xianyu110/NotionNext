---
title: "每天一道大厂SQL题【Day32】按消息量给广东省qq打标记"
date: "2026-01-02T16:00:53.941492"
category: "SQL练习"
tags: ["#sql", "#数据库"]
summary: ""author: xianyu120
status: "Published"
---

#### 文章目录

  * 每天一道大厂SQL题【Day32】按消息量给广东省qq打标记
  *     * 每日语录
    * 第32题 需求三：按消息量给广东省qq打标记
    *       * 思路分析
      * 附表
    * 答案获取
    * 加技术群讨论
    *       * 文末SQL小技巧
    * 后记

## 每天一道大厂SQL题【Day32】按消息量给广东省qq打标记

大家好，我是Maynor。相信大家和我一样，`都有一个大厂梦`，作为一名资深大数据选手，深知SQL重要性，接下来我准备用100天时间，基于大数据岗面试中的`经典SQL题`，以每日1题的形式，带你过一遍热门SQL题并给出恰如其分的解答。

一路走来，随着问题加深，发现不会的也愈来愈多。但底气着实足了不少，相信不少朋友和我一样，日积月累才是最有效的学习方式！

### 每日语录

![image-20231010100015104](https://i-blog.csdnimg.cn/blog_migrate/e06fffb23dafe686adb50fc3a1cb9a6f.png)

学习！还是他娘地学习！

### 第32题 需求三：按消息量给广东省qq打标记

从table.user
table_act取出每天广东省（注意table_user中地域字段部分是广东部分是广东省，都属于广东省）的qq号，且区分高活跃和低活跃，高活跃是指消息量大于200,低活跃是指消息量小于
200

输出格式：日期 地域 活跃度 qq号个数，例如20170420 广东省 高活跃 500

#### 思路分析

解题思路如下：

  1. 首先，我们需要创建两个表：`table_use`和`table_act`，并插入相应的数据。

  2. 接下来，我们需要过滤出广东省的qq号。为此，我们可以使用Hive的JOIN操作，将`table_act`和`table_use`表连接起来，并根据地域字段筛选出广东省的数据。将结果存储在一个临时表`temp_table`中。

  3. 然后，我们需要根据消息量将广东省的qq号进行标记。根据题目要求，消息量大于200的为高活跃，小于200的为低活跃。我们可以使用CASE语句来实现这个逻辑。

  4. 接下来，我们需要对临时表`temp_table`进行分组统计，按日期、地域和活跃度进行分组，并计算每个分组中的qq号个数。将结果存储在一个结果表`result_table`中。

  5. 最后，我们可以查询`result_table`，将日期、地域、活跃度和qq号个数拼接成指定的输出格式。

请注意，以上是一个大致的解题思路，具体的Hive SQL语句可能需要根据实际情况进行调整。另外，为了提高查询性能，您可能还需要对表进行适当的分区和索引设置。

#### 附表

qq用户档案表table.user,表结构如下:

列名| 类型| 长度| 允许空| 备注  
---|---|---|---|---  
lm_date| bigint| 8| 否| 日期（主键，分区字段）  
qq| bigint| 16| 否| qq号  
age| char| 10| 是| 年龄  
sex| char| 10| 是| 性别  
area| char| 50| 是| 地域  
  
table_user中数据如下：

日期| qq号| 年龄| 性别| 地域  
---|---|---|---|---  
20170101| 10000| 20| 女| 广东省  
20170101| 20000| 30| 男| 北京市  
20170101| 30000| 25| 男| 陕西省  
20170101| 50000| 18| 女| 广东省  
  
table_act表结构如表格3

列名| 类型| 长度| 允许空| 备注  
---|---|---|---|---  
ftime| bigint| | | 日期  
qq| char| | | qq号  
msg| bigint| 10| | 消息量  
onlinetime| double| 10| | 在线时长（h）  
  
table_act表数据包含数据如表格4

日期| qq号| 消息量| 在线时长（h）  
---|---|---|---  
20170220| 10000| 100| 1  
20170220| 20000| 102| 0.5  
…| …| …| …  
20170420| 30000| 200| 2  
20170420| 40000| 300| 0.8  
20170420| 50000| 201| 3  
      
    
    create table if not exists table_use (
        lm_date int comment '日期',
        qq int comment 'QQ号',
        age string comment '年龄',
        sex string comment '性别',
        area string comment '地域'
    );
    
    insert into table_use
    values (20170101, 20000, '30', '男', '北京市'),
    (20170101, 30000, '25', '男', '陕西省'),
    (20170101, 40000, '18', '女', '广东省'),
    (20170101, 50000, '20', '女', '四川省');
    select *
    from table_use;
    
    -- 2、表结构如下：
    create table if not exists table_act (
    ftime		int comment ' 日 期 ', qq	string comment 'QQ号',
    msg	int comment ' 消 息 量 ', onlinetime int comment '在线时长（h）'
    );
    
    insert into table_act
    VALUES (20170220, '10000', 100, 1),
    (20170220, '20000', 102, 0.5),
    (20170420, '30000', 200, 2),
    (20170420, '40000', 300, 0.8),
    (20170420, '50000', 201, 3);
    select *
    FROM table_act;
    

### 答案获取

建议你先动脑思考，动手写一写再对照看下答案。点击下方小卡片回复 ：大厂sql

![image-20240606163429084](https://i-blog.csdnimg.cn/blog_migrate/b492c57edfb42aa4c046ea8a03ceb1db.png)

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

