---
title: "阿里云OSS, 跨域请求, No ‘Access-Control-Allow-Origin‘"
date: "2026-01-02T16:02:52.272629"
category: "技术分享"
tags: ["#阿里云", "#云计算"]
summary: ""author: xianyu120
status: "Published"
---

## 问题 阿里云OSS, 跨域请求, No ‘Access-Control-Allow-Origin’

错误标签：阿里云OSS, 跨域请求, No ‘Access-Control-Allow-Origin’

![image-20240401162620821](https://i-blog.csdnimg.cn/blog_migrate/49b2c5a44c2e6656d168714140009b06.png)

浏览器具体报错内容：  
Access to XMLHttpRequest at ‘https://xxx.oss-cn-
guangzhou.aliyuncs.com/xxx.jpg’ from origin ‘http://localhost:8080’ has been
blocked by CORS policy: No ‘Access-Control-Allow-Origin’ header is present on
the requested resource.

### 思路

解决方法：在OSS控制台创建跨域规则

  1. 登录[OSS管理控制台](https://oss.console.aliyun.com/)。
  2. 单击**Bucket列表** ，然后单击目标Bucket名称。
  3. 在左侧导航栏，选择**数据安全** >**跨域设置** 。
  4. 在跨域设置页面，单击**创建规则** 。
  5. 在**创建跨域规则** 面板，将**来源** 设置为`*`，**允许Methods** 全部勾选，**允许Headers** 设置为`*`，**暴露Headers** 设置为**ETag** 和**x-oss-request-id** ，**缓存时间** 设置为**0** ，选中**返回Vary: Origin** ，然后单击**确定** 。关于如何设置跨域规则，请参见[设置跨域访问](https://help.aliyun.com/zh/oss/configure-cors-rules)。

在创建跨域规则弹窗中，

将来源设置为*  
允许Methods全部勾选  
允许Headers设置为*  
暴露Headers设置为ETag和x-oss-request-id  
缓存时间设置为0  
选中返回Vary: Origin。

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/74fe92792f2ad2ee37b6fb0aaa50cfb5.png)

### 解决

成功上传资源!

