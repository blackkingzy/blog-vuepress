---
title: 快速拥有属于自己的博客流程
date: 2021-3-19
author: 张越
location: DaLian
---

## 1、fork 此项目

将此项目 fork 到自己的 github 仓库，从此它就属于你了。

## 2、修改配置项

第一步：找到 docs/.vuepress/config.js 文件  
第二步：研究它的所有字段，注释都有，带有\*是必改项，实在看不明白的就查对应插件的文档，这里用到或者没有用到的插件下面网址都有，可以根据自己需求进行扩展

[https://github.com/vuepress/awesome-vuepress](https://github.com/vuepress/awesome-vuepress)

## 3、拥有属于自己的域名(非必要)

在阿里云或者腾讯云购买自己想要的域名，让其成为自己的 ip！  
备注：域名购买完成直接工信部备案，因为备案的时间较久，所以越早备案越好

## 4、购买云服务器

在哪个云服务商购买的域名最好就在那购买服务器，基本新用户第一年都 ¥ 10 /月。

## 5、配置云服务器

方法一：使用 nginx 反向代理服务器（推荐）  
参考文章：[nginx 的简单运用 🌼](./2021-3-25-nginx.md)  
方法二：启动一个静态文件服务器  
配置 node 运行环境，写一个脚本启动一个静态文件服务器

## 6、快速部署

为了能够更加方便的发表文章和更新文章，我选择采用 github action 这个 CD 工具，每次只需 push 就能完成上述操作 🔥

### 准备工作

1、克隆项目到服务器  
如果遇到 git clone 特别慢的情况，请使用镜像  
参考文章 [https://cloud.tencent.com/developer/article/1761668](https://cloud.tencent.com/developer/article/1761668)

2、npm install && npm run build  
安装依赖文件并在服务器进行第一次 build，生成 dist 文件夹

3、配置 nginx
将 root 路径直接指向 dist 文件夹，如遇到问题请参考文章[nginx 的简单运用 🌼](./2021-3-25-nginx.md)

```
    location / {
            root   /root/xxx/; # 静态资源根目录
            index  index.html;  # 初始页
    }
```

启动 nginx，在浏览器中访问 IP 地址，可以看到已经部署成功！！！

4、了解 github action  
了解 github action 还是得阮一峰大大，简单明了  
参考文章[GitHub Actions 入门教程](http://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)

### CD 流程图

首先通过下面流程图了解一下整个 CD 的流程...
![CD Process](https://www.blackyue.com/CD.jpeg)

### 创建配置文件 main.yml

在.github/workflows 文件夹下创建 main.yml

以下是我的配置文件 <span style="color:#17b978;font-weight:700">main.yml</span>，仅作参考！  
可以根据自己的配置做出相应的修改

```yml
# 一个 workflow，名字为Blog Deploy
name: Blog Deploy

# 触发 workflow 的事件
on: push

# 一个workflow由执行的一项或多项job
jobs:
    # 一个job任务，任务名为build
    build:
        # runs-on 指定job任务运行所需要的虚拟机环境(必填字段)
        runs-on: ubuntu-latest
        # steps是每个Job的运行步骤，可以包含一个或多个步骤
        steps:
            - name: deploy
              uses: appleboy/ssh-action@master
              with:
                  host: ${{ secrets.REMOTE_HOST }}
                  port: ${{ secrets.REMOTE_PORT }}
                  username: ${{ secrets.REMOTE_USER }}
                  key: ${{ secrets.PRIVATE_KEY }}
                  script: |
                      cd ./xxxxx
                      git pull
                      npm run build
```

将文件 push 到 github 就开始了自动部署，在 github action 中可以看到 deploy 的过程，部署成功后刷新页面，可以看到文章已经成功发布！！！

## 7、恭喜你，成功拥有了属于自己的博客

在这里你可以记录一些生活或者学习笔记，可以通过持续写博客锻炼文笔，优点多多

其实我就是做了资源的整合，如此简单和详细的流程说明不应该点个赞吗？

有问题可以发邮件到 1003975792@qq.com 或者加我[微信](./2021-3-20-why.md#微信二维码)
