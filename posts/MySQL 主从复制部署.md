---
title: "MySQL 主从复制部署"
date: Fri Jan 02 2026 23:58:45 GMT+0800 (China Standard Time)
category: "SQL练习"
tags: ["#mysql","#adb","#数据库"]
summary: ""
author: "xianyu120"
status: "Published"
---

![在这里插入图片描述](https://img-
blog.csdnimg.cn/img_convert/b1bfc703e6c857a500d8c8fa2853dde0.gif)

* * *

### 前言

在现代[数据库管理](https://so.csdn.net/so/search?q=%E6%95%B0%E6%8D%AE%E5%BA%93%E7%AE%A1%E7%90%86&spm=1001.2101.3001.7020)中，MySQL
主从复制是一种关键技术，用于提高数据的可用性和性能。随着 Docker 容器技术的普及，利用 Docker 搭建 MySQL
主从复制环境已成为一种趋势，它提供了一种简便、高效且可扩展的解决方案。本文将介绍 Docker 在 MySQL
主从复制中的应用，包括搭建步骤、配置技巧以及如何避免常见的复制延迟问题。

我们将从为什么选择 Docker 进行
[MySQL](https://so.csdn.net/so/search?q=MySQL&spm=1001.2101.3001.7020)
主从复制开始，探讨其带来的灵活性和便利性。接着，通过详细的步骤指导，展示如何配置主从服务器并进行链接。文章还将讨论读写分离的使用场景、复制原理，以及减少同步延迟的策略。

* * *

### 一、为什么基于Docker搭建？

> **为什么基于Docker搭建？**
>
>   * 资源有限
>   * 虚拟机搭建对机器配置有要求，并且安装mysql步骤繁琐
>   * 一台机器上可以运行多个Docker容器
>   * Docker容器之间相互独立，有独立ip，互不冲突
>   * Docker使用步骤简便，启动容器在秒级别
>

> **应用场景：**
>
>   * 一种是读写分离，新增、修改、删除操作主服务器，查询操作从服务器
>   * 另外一种高可用，当主服务器出现问题，快速切换到从服务器
>

### 二、利用Docker搭建主从服务器

> **首先拉取docker镜像,我们这里使用5.7版本的mysql：**
>  
>  
>     docker pull mysql:5.7
>  
>
> 然后使用此镜像启动容器，这里需要分别启动主从两个容器

> **Master(主)：**
>  
>  
>     docker run -p 3339:3306 --name master -e MYSQL_ROOT_PASSWORD=123456 -d
> mysql:5.7
>  
>
> **Slave(从)：**
>  
>  
>     docker run -p 3340:3306 --name slave -e MYSQL_ROOT_PASSWORD=123456 -d
> mysql:5.7
>  
>
>
> Master对外映射的端口是3339，Slave对外映射的端口是3340。因为docker容器是相互独立的，每个容器有其独立的ip，所以不同容器使用相同的端口并不会冲突。这里我们应该尽量使用mysql默认的3306端口，否则可能会出现无法通过ip连接docker容器内mysql的问题。

> **一些命令：**
>  
>  
>     #停止容器
>     docker stop 容器名或者id
>     docker rm 容器名或者id
>     # 查看正在运行的容器
>     docker ps
>  

#### 2.1 配置Master（主）

> 通过`docker exec -it master /bin/bash`命令进入到Master容器内部，也可以通过`docker exec -it
> 359c6039d52d /bin/bash`命令进入。`359c6039d52d`是容器的id,而 `master` 是容器的名称。
>
> 然后，`cd /etc/mysql`切换到/etc/mysql目录下，
>
> ​ 然后`vi my.cnf`对my.cnf进行编辑。此时会报出`bash: vi: command not
> found`，需要我们在docker容器内部自行安装vim。
>
> ​ 使用`yum install vim`，`apt-get install vim`命令安装vim即可。  
>  会出现如下问题：
>
> `shell Reading package lists... Done Building dependency tree Reading state
> information... Done E: Unable to locate package vim `
>
> 执行`yum install vim` 即可成功安装vim。然后我们就可以使用vim编辑my.cnf，在my.cnf中添加如下配置：
>
> `shell [mysqld] server-id=100 # 开启binlog日志 log-bin=mysql-bin `
>
> 配置完成之后，需要重启mysql服务使配置生效。使用`service mysql
> restart`完成重启。重启mysql服务时会使得docker容器停止，我们还需要`docker start mymysql`启动容器。

> PS：若安装vim 仍然报错，参考下面文章：  
>  [Docker下安装vim 报错 E: Unable to locate package
> vim](https://www.cnblogs.com/datangguott/p/15331813.html)

> 下一步在Master数据库创建数据同步用户，授予用户 slave REPLICATION SLAVE权限和REPLICATION
> CLIENT权限，用于在主从库之间同步数据。
>  
>  
>     mysql -uroot -p123456
>     CREATE USER 'slave'@'%' IDENTIFIED BY '123456';
>     GRANT REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO 'slave'@'%';
>  

#### 2.2 配置Slave（从）

> **和配置Master(主)一样，在Slave配置文件my.cnf中添加如下配置：**
>  
>  
>     [mysqld]
>     ## 设置server_id,注意要唯一
>     server-id=101  
>     ## 开启二进制日志功能，以备Slave作为其它Slave的Master时使用
>     log-bin=mysql-slave-bin  
>     ## relay_log配置中继日志
>     relay_log=edu-mysql-relay-bin  
>  
>
> 配置完成后也需要重启mysql服务和docker容器，操作和配置Master(主)一致。

#### 2.3 链接Master（主）和Slave（从）

> **在Master进入mysql，执行`show master status;`**  
>
> ![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/88d0b397418d4215b637141476d51e40.png)  
>
> `File`和`Position`字段的值后面将会用到，在后面的操作完成之前，需要保证Master库不能做任何操作，否则将会引起状态变化，File和Position字段的值变化。

> 在Slave 中进入 mysql，执行如下命令：`change master to master_host='172.17.0.3',
> master_user='slave', master_password='123456', master_port=3306,
> master_log_file='mysql-bin.000005', master_log_pos= 418,
> master_connect_retry=30;`
>  
>  
>     change master to master_host='172.17.0.3', master_user='slave',
> master_password='123456', master_port=3306, master_log_file='mysql-
> bin.000005', master_log_pos= 418, master_connect_retry=30;
>     1
>  
>
> **命令说明：**
>
>   * **`master_host`** ：Master的地址，指的是容器的独立ip,可以通过`docker inspect
> --format='{{.NetworkSettings.IPAddress}}' 容器名称|容器id`查询容器的ip
>   * **`master_port`** ：Master的端口号，指的是容器的端口号
>   * **`master_user`** ：用于数据同步的用户
>   * **`master_password`** ：用于同步的用户的密码
>   * **`master_log_file`** ：指定 Slave 从哪个日志文件开始复制数据，即上文中提到的 File 字段的值
>   * **`master_log_pos`** ：从哪个 Position 开始读，即上文中提到的 Position 字段的值
>   * **`master_connect_retry`** ：如果连接失败，重试的时间间隔，单位是秒，默认是60秒
>

>
> 在Slave 中的mysql终端执行`show slave status \G;`用于查看主从同步状态。  
>
> ![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/087bb46577db46578b0909bf150f5a59.png)
>
> 正常情况下，`SlaveIORunning` 和 `SlaveSQLRunning` 都是 **No** ，因为我们还没有开启 **主从复制过程**
> 。使用`start
> slave`开启[主从复制](https://so.csdn.net/so/search?q=%E4%B8%BB%E4%BB%8E%E5%A4%8D%E5%88%B6&spm=1001.2101.3001.7020)过程，然后再次查询主从同步状态`show
> slave status \G;`。  
>
> ![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/16d11f2b37cf4d839ef8bc6bf110c377.png)  
>  `SlaveIORunning` 和 `SlaveSQLRunning` 都是 **Yes** ，说明主从复制已经开启。此时可以测试数据同步是否成功。

**主从复制排错：**

使用`start slave`开启主从复制过程后，如果**SlaveIORunning** 一直是**Connecting**
，则说明主从复制一直处于连接状态，这种情况一般是下面几种原因造成的，我们可以根据 Last_IO_Error提示予以排除。

> Last_IO_Error: Got fatal error 1236 from master when reading data from
> binary log: ‘Client requested master to start replication from position >
> file size’

> `reset slave`会将主从同步的文件以及位置恢复到初始状态，一开始没有数据还好，有数据的话，相当于重新开始同步，可能会出现一些问题；
>
> 一般做主从同步，都是要求以后的数据实现主从同步，而对于旧的数据完全可以使用数据库同步工具先将数据库同步，完了再进行主从同步；

> **遇到上面的问题，正确做法是：**  
>  1.打开主服务器，进入mysql  
>  2.执行`flush logs`；//这时主服务器会重新创建一个binlog文件；  
>  3.在主服务器上执行`show master status
> \G`;显示如下：![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/30a841025f7e4e57b8d179e6ed23705b.png)  
>  4.来到从服务器的mysql；  
>  5.`stop slave;`  
>  6.`change master to master_log_file='mysql-
> bin.000005',master_log_pos=418;`//这里的file和pos都是上面主服务器master显示的。  
>  7.`start slave;`//这时候就应可以了  
>  8.`show slave status \G;`//结果如下：  
>
> ![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/14a327b8b5bc4d26b12b0ab7af0c905c.png)
>
> **总结原因：**
>
>   1. **网络不通** ：检查ip,端口
>   2. **密码不对** ：检查是否创建用于同步的用户和用户密码是否正确
>   3. **pos不对** ：检查Master的 Position
>

#### 2.4 测试主从复制

测试主从复制方式就十分多了，最简单的是在Master创建一个数据库，然后检查Slave是否存在此数据库。（此时可以使用Navicat等工具测试连接mysql）

**Master：**  
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/088baba30f3d48e88e57f2630860983c.png)

**Slave:**  
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/9d53469a6303425f9a71517ff03a0afc.png)

### 三、常见问题

#### 3.1 什么时候用读写分离?

> 1、你的**系统写入数据不多** 但是存在**大量的读取数据功能** 。  
>  2、读写分离其实是个比较低端的处理读取并发量的操作，因为还是有对数据库的访问
> 操作的，但是读写分离相对于其它处理方式而言的**好处在于时效性比较高和对系统要求 比较低** 。  
>  3、读写分离在效率上是低于页面静态化和缓存服务的，但是**好处是不用改动系统代码** ， 因为都是连接数据库。  
>  4、数据量大的情况下使用的技术不是读写分离，是**分表** 和**分库** ，或者使用**分布式存储引擎** ，读写分离不能解决数据量大的问题。  
>
> 5、系统写入操作并发量大不适合使用读写分离，至于需要什么技术看你的具体业务需求，而且大量写入操作本身就是个难以处理的大数据问题，但是读写分离从一定程度上减轻写入操作的负担。

#### 3.2 MySQL主从复制原理

>   1. **master** 将操作语句记录到 `binlog` 日志中
>   2. **salve** 服务器会在一定时间间隔内对 **master** 二进制日志进行探测其是否发生改变，如 果发生改变
>   3. **salve** 开启两个线程:**IO 线程和 SQL 线程**  
>  1)**IO 线程:** 负责读取 **master** 的 `binlog` 内容到中继日志 `relay log` 里;  
>  2)**SQL 线程:** 负责从 `relay log` 日志里读出 `binlog` 内容，并更新到 **slave**
> 的数据库里(保证数据一致)
>

>
> 这里有一个非常重要的一点，就是从库同步主库数据的过程是串行化的，
> 也就是说主库上并行的操作，在从库上会串行执行。所以这就是一个非常重要的点了，由于从库从主库拷贝日志以及串行执行 SQL
> 的特点，在高并发场景下，从库的数据一定会比主库慢一些，**是有延时的** 。所以经常出现，刚写入主
> 库的数据可能是读不到的，要过几十毫秒，甚至几百毫秒才能读取到。
>
> 如果主库突然宕机，然后恰好数据还没同步到从库，那么有些数据可能在从库上是没有的，有些数据可能就丢失了。所以 MySQL
> 实际上在这一块有两个机制，**一个是半同步复制** ，用来解决主库数据丢失问题;**一个是并行复制**
> ，用来解决主从同步延时问题。这个**所谓半同步复制** ，也叫 `semi-sync` 复制，指的就是主库写入 `binlog`
> 日志之后，就会强制立即将数据同步到从库，从库将日志写入自己本地 的 `relay log` 之后，接着会返回一个 ack 给主库，主库接收到至少一个从库
> 的 ack 之后才会认为写操作完成了。**所谓并行复制** ，指的是从库开启多个线程，并行读取 `relay log`
> 中不同库的日志，然后并行重放不同库的日志，这是库级别的并行。

#### 3.3 解决主从复制延迟有几种常见的方法?

>   1. **写操作后的读操作指定发给数据库主服务器**  
>  例如，注册账号完成后，登录时读取账号的读操作也发给数据库主服务器。这种方式和业务 **强绑定**
> ，对业务的侵入和影响较大，如果哪个新来的程序员不知道这样写代码，就会导致一 个 bug。
>   2. **读从机失败后再读一次主机**  
>  这就是通常所说的“二次读取”，二次读取和业务无绑定，只需要对底层数据库访问的 API 进
> 行封装即可，实现代价较小，不足之处在于如果有很多二次读取，将大大增加主机的读操作
> 压力。例如，黑客暴力破解账号，会导致大量的二次读取操作，主机可能顶不住读操作的压 力从而崩溃。
>   3. **关键业务读写操作全部指向主机，非关键业务采用读写分离**  
>  例如，对于一个用户管理系统来说，注册 + 登录的业务读写操作全部访问主机，用户的介
> 绍、爱好、等级等业务，可以采用读写分离，因为即使用户改了自己的自我介绍，在查询时 却看到了自我介绍还是旧的，业务影响与不能登录相比就小很多，还可以忍受。
>

#### 3.4 造成 mysql 同步延迟常见原因

> **1、网络:**  
>  如主机或者从机的带宽打满、主从之间网络延迟很大，导致主上的 binlog 没有 全量传输到从机，造成延迟。  
>  **2)机器性能:**  
>  从机使用了烂机器?比如主机使用 SSD 而从机还是使用的 SATA。  
>  **3)从机高负载:**  
>  有很多业务会在从机上做统计，把从机服务器搞成高负载，从而造成从机延迟很大的情况  
>  **4)大事务:**  
>  比如在 RBR 模式下，执行带有大量的 delete 操作，这种通过查看 processlist 相关信息以及使用 mysqlbinlog 查看
> binlog 中的 SQL 就能快速进行确认  
>  **5)锁:**  
>  锁冲突问题也可能导致从机的 SQL 线程执行慢，比如从机上有一些 select … for update 的 SQL，或者使用了 MyISAM
> 引擎等。

> 项目中使用示例：
>  
>  
>     def __init():
>       self.conn = ....   主
>       self.con1 = pymsql.connect....  重
>  
>     def findAll():
>        self.con1
>  
>     def innser_to():
>                       self.conn
>
>
>                       insert
>                       update
>                       delete
>                       select
>  
>     12345678910111213141516
>  

* * *

![在这里插入图片描述](https://img-
blog.csdnimg.cn/direct/856076db2d46428dbaa94b453557fad2.gif#pic_center)

