---
title: "docker 常用管理命令及数据备份"
date: Fri Jan 02 2026 23:59:17 GMT+0800 (China Standard Time)
category: "技术分享"
tags: ["#docker","#容器","#运维"]
summary: ""
author: "xianyu120"
status: "Published"
---

#### docker 常用管理命令及数据备份

### 常用管理命令

#### 重启

cd share  
docker compose restart

#### 停止

cd share  
docker compose stop

#### 启动

cd share  
./deploy.sh

#### 升级

cd share  
./deploy.sh

#### 查看日志

cd share  
docker compose logs -f

## 数据备份

以下备份相关命令均要求在`docker-compose.yml`文件所在目录执行

### 备份完整数据库

    
    
    docker compose exec mysql sh -c 'exec mysqldump --all-databases -uroot -p"$MYSQL_ROOT_PASSWORD"' >./all-$(date +%Y%m%d-%H%M%S).sql
    

备份文件将存储到当前目录下名为 all-日期.sql 的文件中

### 恢复完整数据库

注意修改`all-日期.sql`为实际备份文件名

    
    
    docker compose exec -T mysql sh -c 'exec mysql -uroot -p"$MYSQL_ROOT_PASSWORD"' <./all-日期.sql
    

### 备份指定数据库

share 使用的数据库默认名称为 `cool`，以下命令将备份数据库`cool`

    
    
    docker compose exec mysql sh -c 'exec mysqldump -uroot -p"$MYSQL_ROOT_PASSWORD" cool' >./cool-$(date +%Y%m%d-%H%M%S).sql
    

### 恢复指定数据库

注意修改`cool-日期.sql`为实际备份文件名

    
    
    docker compose exec -T mysql sh -c 'exec mysql -uroot -p"$MYSQL_ROOT_PASSWORD" cool' <./cool-日期.sql
    

### 备份完整项目

share 使用`docker-
compose.yml`文件进行项目配置，以下命令将备份整个项目,注意修改`/path/to/backup`为实际要存储备份文件的目录

    
    
    DATE=$(date +%Y%m%d-%H%M%S)
    docker-compose down
    tar -zcvf share-$DATE.tar.gz .
    mv share-$DATE.tar.gz /path/to/backup
    docker-compose up -d
    

### 在新环境恢复项目

注意修改`share-日期.tar.gz`为实际备份文件名

    
    
    mkdir share
    mv share-日期.tar.gz share
    cd share
    tar -zxvf share-日期.tar.gz
    rm share-日期.tar.gz
    docker-compose up -d
    

### 常用系统优化

#### 系统时间同步

    
    
    apt install ntpdate -y
    ntpdate time.windows.com
    

#### 系统时区设置

    
    
    timedatectl set-timezone Asia/Shanghai
    

#### 设置最大文件打开数

    
    
    echo "fs.inotify.max_user_instances=5120" >> /etc/sysctl.conf
    echo "fs.inotify.max_user_watches=2621440" >> /etc/sysctl.conf
    echo "fs.file-max=65535" >> /etc/sysctl.conf
    
    sysctl -p
    

#### 限制 docker 日志大小

    
    
    mkdir -p /etc/docker
    
    cat > /etc/docker/daemon.json <<EOF
    {
      "log-driver": "json-file",
      "log-opts": {
        "max-size": "10m",
        "max-file": "3"
      }
    }
    EOF
    
    systemctl restart docker
    

#### 设置防火墙

    
    
    ufw allow 80/tcp
    ufw allow 443/tcp
    ufw allow 22/tcp
    
    ufw enable
    

