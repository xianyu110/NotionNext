---
title: "[已解决]问题：root.users.hdfs is not a leaf queue"
date: "2026-01-02T16:02:28.371059"
category: "大数据项目"
tags: ["#hdfs", "#hadoop", "#大数据"]
summary: ""author: xianyu120
status: "Published"
---

### 问题：root.users.hdfs is not a leaf queue

CDH集群报错：

Exception in thread “main” org.apache.hadoop.yarn.exceptions.YarnException:
Failed to submit application_1713149630679_0005 to YARN : root.users.hdfs is
not a leaf queue

![image-20240415110704355](https://i-blog.csdnimg.cn/blog_migrate/e6f13744749f0ea8f98cce2efecc2328.png)

### 思路

如果你遇到了“root.users.hdfs is not aleaf
queue"的报错，这意味着你尝试将你的作业提交到一个非叶子队列。在YARN中，队列有层级结构，叶子队列是这个层级结构中最底层的队列，它们没有子队列，因此作业必须提交到叶子队列。

![image-20240415110951088](https://i-blog.csdnimg.cn/blog_migrate/0fc06770b4dc7222c7cc9d7332f6c225.png)

![image-20240415110938965](https://i-blog.csdnimg.cn/blog_migrate/6830f1d852be351e02e576166aa9f27f.png)

调整调度器为容量调度器：

![image-20240415110902031](https://i-blog.csdnimg.cn/blog_migrate/43de41365f54bfd620f18d5176abe0de.png)

### 解决

yarn成功运行

![image-20240415111403444](https://i-blog.csdnimg.cn/blog_migrate/1d0f60ade27699667171f394f0370808.png)

