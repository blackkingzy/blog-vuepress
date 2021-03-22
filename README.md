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

在哪个云服务商购买的域名最好就在那购买服务器，基本新用户第一年都 10 块钱。

## 5、配置云服务器

方法一：使用 nginx 反向代理服务器（推荐）  
参考文章：https://www.runoob.com/linux/nginx-install-setup.html  
方法二：启动一个静态文件服务器  
配置 node 运行环境，写一个脚本启动一个静态文件服务器

## 5、快速部署

为了能够更加方便的发表文章和更新文章，我选择采用 github action 这个 CD 工具，每次只需 commit 就能完成上述操作 🔥，根据自己的配置修改对应项

以下是我的配置文件 <span style="color:#17b978;font-weight:700">main.yml</span>

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
            # action命令，切换分支获取源码
            - name: Checkout
                # 使用action库  actions/checkout@v2获取源码
              - uses: actions/checkout@v2
                with:
                    ref: master
            # action命令，安装Node 14
            - name: install Node.js 14
                # 使用action库  actions/setup-node安装node
              - uses: actions/setup-node@v2
                with:
                    node-version: '14'
                    check-latest: true  # 检查14最新的版本
            # action命令，install && test
            - name: npm install and build
                # 运行的命令或者 action
              - run: npm install
              - run: npm build
            - name: Deploy to Server    #通过ssh将文件传到阿里云服务器上 https://github.com/marketplace/actions/ssh-deploy
              - uses: easingthemes/ssh-deploy@v2.1.5
                env:
                    SSH_PRIVATE_KEY: ${{ secrets.PRIVATE_KEY }}  # 私钥部分,公钥到阿里云的authorized_keys去找
                    # ARGS: "-rltgoDzvO --delete"
                    SOURCE: "docs/.vuepress/dist"  # The source directory, path relative to $GITHUB_WORKSPACE root, eg: dist/
                    REMOTE_PORT: "22"  # ssh port
                    REMOTE_HOST: "fishchat.online"  # 主机名
                    REMOTE_USER: "root" # 连接用户
                    TARGET: "/root/blog"
                    # EXCLUDE: ""
                    # 去阿里云创建并绑定秘钥,私钥就能下载一次,回去删掉之前的重新创建
```

## 6、恭喜你，成功拥有了属于自己的博客

在这里你可以记录一些生活或者学习笔记，可以通过持续写博客锻炼文笔，优点多多

其实我就是做了资源的整合，如此简单和详细的流程说明不应该点个赞吗？

有问题可以发邮件到 1003975792@qq.com
