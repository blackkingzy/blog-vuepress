const path = require('path')


module.exports = {
    title: 'Hello VuePress',
    description: 'Just playing around',
    themeConfig: {
        nav: [
            {
                text: '前端',
                link: '/tag/front_end/',
            },
            {
                text: '算法',
                link: '/tag/algorithm/',
            },
            {
                text: 'Tags',
                link: '/tag/',
            },
            {
                text: '其它',
                link: '/tag/other',
            },
        ],
    },
    plugins: [
        ['@vuepress/back-to-top', true],
        ['@vuepress/last-updated', true], //这个是基于git的,在第一次提交后会显示
        ['@vuepress/plugin-nprogress', true],
        //@vuepress/medium-zoom插件注意事项
        //因为在首页的时候加载该js，selector并没有找到对应的dom，所以跳转到文章详情页就会失效
        //所以想要其生效，就必须让文章详情页在新页面打开，让其加载该插件的js
        //修改方案：可以将list的navlink的target设置为_blank
        ['@vuepress/medium-zoom', {
            selector: '.vuepress-blog-theme-content img', //这里有问题,功能失效 https://github.com/francoischalifour/medium-zoom#options
            // delay: 1000, // 延迟1秒
            // options: {
            //     margin: 24,
            //     scrollOffset: 0
            // }

        }],
        ['@vuepress/search', {
            search: true, //默认false
            searchMaxSuggestions: 10 // 默认是5
        }],
        ['smooth-scroll', true],
        [
            '@vuepress/blog',
            {
                directories: [
                    {
                        // Unique ID of current classification
                        id: 'post',
                        // Target directory
                        dirname: '_posts',
                        layout: 'Layout', //主页content的layout
                        post: 'Post', //文章详情页面content的layout
                        // Path of the `entry page` (or `list page`)
                        path: '/',
                        pagination: {
                            lengthPerPage: 7,
                        },
                    },
                ],
                frontmatters: [
                    {
                        id: "tag",
                        keys: ['tag', 'tags'],
                        path: '/tag/',
                    },
                    {
                        id: "location",
                        keys: ['location'],
                        path: '/location/',
                    },
                ],
                comment: {  // 这里需要配置
                    // Which service you'd like to use
                    service: 'vssue',
                    // The owner's name of repository to store the issues and comments.
                    owner: 'You', //github账户名
                    // The name of repository to store the issues and comments.
                    repo: 'Your repo', //github一个项目的名称
                    // The clientId & clientSecret introduced in OAuth2 spec.
                    clientId: 'Your clientId', //注册的Client ID
                    clientSecret: 'Your clientSecret', //注册的Client Secret
                    autoCreateIssue: true // 自动创建评论，默认是false，最好开启，这样首次进入页面的时候就不用去点击创建评论的按钮了。
                },
                newsletter: {  //https://vuepress-plugin-mailchimp.billyyyyy3320.com/#install
                    // endpoint订阅的api.
                    endpoint: "https://qq.us7.list-manage.com/subscribe/post?u=195b2f098fa719509e76d4498&amp;id=d6b27c78b7"
                },
                sitemap: {
                    hostname: 'https://www.blackyue.com'
                },
                feed: {
                    canonical_base: 'http://www.blackyue.com',
                },
            },
        ],
    ],
    configureWebpack: {
        resolve: {
            alias: {
                fonts: path.resolve(`${__dirname}/theme`, 'fonts')
            }
        }
    }
}