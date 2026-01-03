---
title: "Nginx 迁移到 Caddy：一次完整的反向代理配置迁移实践"
date: Fri Jan 02 2026 23:57:47 GMT+0800 (China Standard Time)
category: "技术分享"
tags: ["#nginx","#运维"]
summary: ""
author: "xianyu120"
status: "Published"
---

#### 文章目录

  * 从零开始：Ubuntu 系统 Nginx 迁移到 Caddy 的完整指南
  *     * 一、背景介绍
    * 二、为什么选择 Caddy？
    * 三、安装 Caddy
    *       * 1\. 使用官方包仓库安装
      * 2\. 验证安装
      * 3\. 配置系统服务
    * 四、配置文件位置
    * 五、从 Nginx 迁移配置
    *       * 1\. 原 Nginx 配置分析
      * 2\. 转换为 Caddy 配置
    * 六、Next.js 应用的特殊处理
    *       * 1\. 静态文件处理
      * 2\. API 路由处理
    * 七、常见问题及解决方案
    *       * 1\. 重定向循环问题
      * 2\. 静态文件加载失败
      * 3\. WebSocket 连接问题
    * 八、性能优化
    *       * 1\. 启用压缩
      * 2\. 缓存配置
      * 3\. 安全头设置
    * 九、维护和监控
    *       * 1\. 日志配置
      * 2\. 服务管理命令
    * 十、最佳实践建议
    * 十一、总结
    * 十二、参考资料

## 从零开始：Ubuntu 系统 Nginx 迁移到 Caddy 的完整指南

### 一、背景介绍

最近在将基于 Next.js 的 Web 应用从 Nginx 迁移到
Caddy。这是一个完整的迁移实践指南，从安装到配置，再到问题排查，希望能帮助到有类似需求的开发者。

### 二、为什么选择 Caddy？

Caddy 2.0 相比 Nginx 具有以下优势：

  1. **自动 HTTPS**

     * 自动申请和续期 SSL 证书
     * 内置 ACME 客户端
     * 默认启用 HTTP/2
  2. **配置简单**

     * 人性化的配置语法
     * 更少的配置代码
     * 自动化的 HTTP 到 HTTPS 重定向
  3. **现代化特性**

     * HTTP/3 (QUIC) 支持
     * 零停机配置重载
     * 内置反向代理功能
  4. **安全性**

     * 默认安全配置
     * 自动 HSTS
     * 现代 TLS 配置

### 三、安装 Caddy

#### 1\. 使用官方包仓库安装

    
    
    # 安装依赖
    sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https curl
    
    # 添加 Caddy 官方 GPG key
    curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
    
    # 添加 Caddy 官方仓库
    curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
    
    # 更新包索引
    sudo apt update
    
    # 安装 Caddy
    sudo apt install caddy
    

#### 2\. 验证安装

    
    
    # 检查 Caddy 版本
    caddy version
    
    # 检查服务状态
    sudo systemctl status caddy
    

#### 3\. 配置系统服务

    
    
    # 启动 Caddy 服务
    sudo systemctl start caddy
    
    # 设置开机自启
    sudo systemctl enable caddy
    
    # 查看日志
    sudo journalctl -u caddy --no-pager
    

### 四、配置文件位置

Caddy 的主要配置文件位置：

    
    
    # 主配置文件
    /etc/caddy/Caddyfile
    
    # 站点配置目录（建议创建）
    /etc/caddy/conf.d/
    
    # 日志目录
    /var/log/caddy/
    
    # SSL 证书目录
    /var/lib/caddy/.local/share/caddy/
    

### 五、从 Nginx 迁移配置

#### 1\. 原 Nginx 配置分析

    
    
    server {
        listen 80;
        listen 443 ssl http2;
        server_name example.com;
        
        # SSL配置
        ssl_certificate /path/to/cert.pem;
        ssl_certificate_key /path/to/key.pem;
        
        # 反向代理设置
        location / {
            proxy_pass http://127.0.0.1:8305;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }
        
        location /admin/ {
            proxy_pass http://127.0.0.1:8306/admin/;
        }
    }
    

#### 2\. 转换为 Caddy 配置

    
    
    example.com {
        # TLS 配置（如果使用已有证书）
        tls /path/to/cert.pem /path/to/key.pem
    
        # 全局代理头设置
        header {
            Strict-Transport-Security "max-age=31536000"
        }
    
        # 日志配置
        log {
            output file /var/log/caddy/access.log
            level INFO
            format console
        }
    
        # 主路由 - Next.js 应用
        handle {
            reverse_proxy http://127.0.0.1:8305 {
                header_up Host {host}
                header_up X-Real-IP {remote}
                header_up X-Forwarded-For {remote}
                header_up X-Forwarded-Proto {scheme}
                
                # 超时设置
                transport http {
                    read_timeout 30s
                    write_timeout 30s
                    response_header_timeout 30s
                }
            }
        }
    
        # 管理后台路由
        handle_path /admin/* {
            reverse_proxy http://127.0.0.1:8306
        }
    }
    

### 六、Next.js 应用的特殊处理

#### 1\. 静态文件处理

    
    
    # 静态资源路由
    @static {
        path /_next/* /static/* /images/* /favicon.ico /sw.js
    }
    handle @static {
        reverse_proxy http://127.0.0.1:8305 {
            header_up Host {host}
            header_up X-Real-IP {remote}
            header_up X-Forwarded-For {remote}
            header_up X-Forwarded-Proto {scheme}
            
            transport http {
                read_timeout 30s
                write_timeout 30s
                response_header_timeout 30s
            }
        }
    }
    

#### 2\. API 路由处理

    
    
    # API 路由
    handle_path /api/* {
        reverse_proxy http://127.0.0.1:8305 {
            header_up Host {host}
            header_up X-Real-IP {remote}
            header_up X-Forwarded-For {remote}
            header_up X-Forwarded-Proto {scheme}
        }
    }
    

### 七、常见问题及解决方案

#### 1\. 重定向循环问题

**症状** ：访问某些路径时出现无限重定向。

**解决方案** ：

    
    
    handle @list {
        reverse_proxy http://127.0.0.1:8306 {
            header_down -Location  # 禁用自动重定向
        }
    }
    

#### 2\. 静态文件加载失败

**症状** ：Next.js 的静态文件加载出现 stream closed 错误。

**解决方案** ：

  1. 添加专门的静态文件处理规则
  2. 增加超时时间
  3. 确保路径匹配正确

#### 3\. WebSocket 连接问题

**症状** ：WebSocket 连接无法建立。

**解决方案** ：

    
    
    handle {
        reverse_proxy http://127.0.0.1:8305 {
            transport http {
                keepalive 30s
                keepalive_idle_conns 10
            }
        }
    }
    

### 八、性能优化

#### 1\. 启用压缩

    
    
    encode {
        gzip
        zstd
    }
    

#### 2\. 缓存配置

    
    
    @static {
        path /_next/* /static/*
    }
    handle @static {
        header Cache-Control "public, max-age=31536000"
        reverse_proxy http://127.0.0.1:8305
    }
    

#### 3\. 安全头设置

    
    
    header {
        Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
        X-Content-Type-Options "nosniff"
        X-Frame-Options "DENY"
        Referrer-Policy "strict-origin-when-cross-origin"
    }
    

### 九、维护和监控

#### 1\. 日志配置

    
    
    log {
        output file /var/log/caddy/access.log {
            roll_size 10MB
            roll_keep 10
            roll_keep_for 168h
        }
        format json
        level INFO
    }
    

#### 2\. 服务管理命令

    
    
    # 重载配置
    sudo systemctl reload caddy
    
    # 重启服务
    sudo systemctl restart caddy
    
    # 查看状态
    sudo systemctl status caddy
    
    # 查看日志
    sudo journalctl -u caddy -f
    

### 十、最佳实践建议

  1. **配置文件组织**

     * 使用多个配置文件，按功能分类
     * 将敏感信息存储在环境变量中
  2. **安全性考虑**

     * 定期更新 Caddy
     * 使用最新的 TLS 配置
     * 启用安全响应头
  3. **性能优化**

     * 合理配置缓存
     * 启用压缩
     * 监控资源使用

### 十一、总结

从 Nginx 迁移到 Caddy 的过程虽然需要一些工作，但带来的好处是显著的：

  * 配置更简单直观
  * 自动 HTTPS 管理
  * 更好的性能和安全性

通过本文的详细指南，您应该能够顺利完成迁移工作。如果遇到问题，可以查看 Caddy 的官方文档或社区支持。

### 十二、参考资料

  1. [Caddy 官方文档](https://caddyserver.com/docs/)
  2. [Caddy GitHub 仓库](https://github.com/caddyserver/caddy)
  3. [Next.js 部署文档](https://nextjs.org/docs/deployment)
  4. [Nginx 到 Caddy 迁移指南](https://caddyserver.com/docs/nginx-to-caddy)

