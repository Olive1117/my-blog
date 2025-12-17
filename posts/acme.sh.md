---
categories: [工具]
tags: [ssl, shell]
title: acme.sh的快捷笔记
---
# acme.sh的快捷笔记

### [第一次？->*跳转*](#初次部署)
---
## 添加ssl

### 申请证书

如果使用nginx容器记得设置volume映射
```
server {
    listen 80;
    server_name example.com;

    location /.well-known/acme-challenge/ {
        root /var/www/html; # acme.sh 验证时使用的目录，容器内路径
        try_files $uri =404;
    }
}
```

```
# /var/www/html验证目录，宿主机路径
acme.sh --issue -d example.com --webroot /var/www/html
```

### 复制证书

```
# /root/certs/example.com 宿主机ssl证书保存路径
acme.sh --install-cert -d example.com \
--key-file /root/certs/example.com/example.com.key \
--fullchain-file /root/certs/example.com/example.com.pem \
--reloadcmd "docker exec <NameOrID> nginx -s reload" # or "systemctl reload nginx"
```

---
## 初次部署

```
# 自动添加到 ~/.acme.sh/ 目录中，并自动配置好环境变量
curl https://get.acme.sh | sh
acme.sh -v
```
打印版本号则成功

```
# 设置邮箱，用于接收到期提醒和重要通知
acme.sh --register-account -m youremail@gmail.com
```

