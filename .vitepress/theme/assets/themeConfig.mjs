export const themeConfig = {
    // 站点信息
    siteMeta: {
        // 站点标题
        title: "Olive Blog",
        // 站点描述
        description: "Hello World",
        // 站点logo
        logo: "/logo/favicon.png",
        // 站点地址
        site: "",
        // 语言
        lang: "zh-CN",
        // 作者
        author: {
            name: "Admin",
            cover: "/images/20250513224114.jpg",
            email: "114514@gmail.com",
            link: "",
        },
    },
    // 备案信息
    icp: "萌ICP备114514号",
    // 建站日期
    since: "2025-10-28",
    // 每页文章数据
    postSize: 8,
    // inject
    inject: {
        // 头部
        // https://vitepress.dev/zh/reference/site-config#head
        header: [
            // favicon
            ["link", { rel: "icon", href: "/favicon.ico" }],
            // RSS
            [
                "link",
                {
                    rel: "alternate",
                    type: "application/rss+xml",
                    title: "RSS",
                    href: "https://blog.imsyy.top/rss.xml",
                },
            ],
            // 预载 CDN
            [
                "link",
                {
                    crossorigin: "",
                    rel: "preconnect",
                    href: "https://s1.hdslb.com",
                },
            ],
            [
                "link",
                {
                    crossorigin: "",
                    rel: "preconnect",
                    href: "https://mirrors.sustech.edu.cn",
                },
            ],
            // HarmonyOS font
            [
                "link",
                {
                    crossorigin: "anonymous",
                    rel: "stylesheet",
                    href: "https://s1.hdslb.com/bfs/static/jinkela/long/font/regular.css",
                },
            ],
            [
                "link",
                {
                    crossorigin: "anonymous",
                    rel: "stylesheet",
                    href: "https://mirrors.sustech.edu.cn/cdnjs/ajax/libs/lxgw-wenkai-screen-webfont/1.7.0/style.css",
                },
            ],
            // iconfont
            [
                "link",
                {
                    crossorigin: "anonymous",
                    rel: "stylesheet",
                    href: "https://cdn2.codesign.qq.com/icons/g5ZpEgx3z4VO6j2/latest/iconfont.css",
                },
            ],
            // Embed code
            ["link", { rel: "preconnect", href: "https://use.sevencdn.com" }],
            ["link", { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" }],
            [
                "link",
                {
                    crossorigin: "anonymous",
                    href: "https://use.sevencdn.com/css2?family=Fira+Code:wght@300..700&display=swap",
                    rel: "stylesheet",
                },
            ],
            // 预载 DocSearch
            [
                "link",
                {
                    href: "https://X5EBEZB53I-dsn.algolia.net",
                    rel: "preconnect",
                    crossorigin: "",
                },
            ],
        ],
    },
    // 导航栏菜单
    nav: [{
        text: "主页",
        items: [],
    },
    {
        text: "归档",
        items: [
            { text: "首页", link: "/", icon: "home" },
            { text: "归档", link: "/pages/archives", icon: "archive" },
            { text: "关于", link: "/pages/about", icon: "info" },
        ],
    },
    {
        text: "链接",
        items: [
            { text: "github", link: "/", icon: "home" },
            { text: "gitee", link: "/pages/archives", icon: "archive" },
            { text: "bilibili", link: "/pages/about", icon: "info" },
            { text: "twitter", link: "/pages/about", icon: "info" },
        ],
    },
    {
        text: "我的",
        items: [
            { text: "动漫&文章", link: "/", icon: "home" },
            { text: "日记", link: "/pages/archives", icon: "archive" },
            { text: "图库", link: "/pages/about", icon: "info" },
        ],
    },
    {
        text: "关于",
        items: [
            { text: "我自己", link: "/", icon: "home" },
            { text: "友链", link: "/pages/archives", icon: "archive" },
        ],
    },
    {
        text: "其他",
        items: [
            { text: "项目", link: "/", icon: "home" },
            { text: "技能", link: "/pages/archives", icon: "archive" },
            { text: "时间线", link: "/pages/about", icon: "info" },
        ],
    }],
    // 导航栏菜单 - 左侧
    navMore: [
        {
            name: "博客",
            list: [
                {
                    icon: "/images/logo/logo.webp",
                    name: "主站",
                    url: "/",
                },
                {
                    icon: "/images/logo/logo.webp",
                    name: "博客镜像站",
                    url: "https://blog-backup.imsyy.top/",
                },
            ],
        },
        {
            name: "服务",
            list: [
                {
                    icon: "https://pic.efefee.cn/uploads/2024/04/08/6613465358077.png",
                    name: "起始页",
                    url: "https://nav.imsyy.top/",
                },
                {
                    icon: "https://pic.efefee.cn/uploads/2024/04/08/661346d418ad7.png",
                    name: "今日热榜",
                    url: "https://hot.imsyy.top/",
                },
                {
                    icon: "https://pic.efefee.cn/uploads/2024/04/08/66134722586fa.png",
                    name: "站点监测",
                    url: "https://status.imsyy.top/",
                },
            ],
        },
        {
            name: "项目",
            list: [
                {
                    icon: "/images/logo/logo.webp",
                    name: "Curve",
                    url: "https://github.com/imsyy/vitepress-theme-curve",
                },
                {
                    icon: "https://pic.efefee.cn/uploads/2024/04/07/66124f5fc63c8.png",
                    name: "SPlayer",
                    url: "https://github.com/imsyy/SPlayer",
                },
                {
                    icon: "https://pic.efefee.cn/uploads/2024/04/08/6613465358077.png",
                    name: "Snavigation",
                    url: "https://github.com/imsyy/SPlayer",
                },
                {
                    icon: "/images/logo/logo.webp",
                    name: "Home",
                    url: "https://github.com/imsyy/home",
                },
                {
                    icon: "https://pic.efefee.cn/uploads/2024/04/08/661346d418ad7.png",
                    name: "DailyHotApi",
                    url: "https://github.com/imsyy/DailyHotApi",
                },
                {
                    icon: "https://pic.efefee.cn/uploads/2024/04/08/66134722586fa.png",
                    name: "site-status",
                    url: "https://github.com/imsyy/site-status",
                },
            ],
        },
    ],
    // 封面配置
    cover: {
        // 是否开启双栏布局
        twoColumns: false,
        // 是否开启封面显示
        showCover: {
            // 是否开启封面显示 文章不设置cover封面会显示异常，可以设置下方默认封面
            enable: true,
            // 封面布局方式: left | right | both
            coverLayout: 'right',
            // 默认封面(随机展示)
            defaultCover: [
                'https://example.com/1.avif',
                'https://example.com/2.avif',
                'https://example.com/3.avif'
            ]
        }
    },
    // 页脚信息
    footer: {
        // 社交链接（请确保为偶数个）
        social: [
            {
                icon: "email",
                link: "mailto:one@imsyy.top",
            },
            {
                icon: "github",
                link: "https://www.github.com/imsyy/",
            },
            {
                icon: "telegram",
                link: "https://t.me/bottom_user",
            },
            {
                icon: "bilibili",
                link: "https://space.bilibili.com/98544142",
            },
            {
                icon: "qq",
                link: "https://res.abeim.cn/api/qq/?qq=1539250352",
            },
            {
                icon: "twitter-x",
                link: "https://twitter.com/iimmsyy",
            },
        ],
        // sitemap
        sitemap: [
            {
                text: "博客",
                items: [
                    { text: "近期文章", link: "/" },
                    { text: "全部分类", link: "/pages/categories" },
                    { text: "全部标签", link: "/pages/tags" },
                    { text: "文章归档", link: "/pages/archives", newTab: true },
                ],
            },
            {
                text: "项目",
                items: [
                    { text: "Home", link: "https://github.com/imsyy/home/", newTab: true },
                    { text: "SPlayer", link: "https://github.com/imsyy/SPlayer/", newTab: true },
                    { text: "DailyHotApi", link: "https://github.com/imsyy/DailyHotApi/", newTab: true },
                    { text: "Snavigation", link: "https://github.com/imsyy/Snavigation/", newTab: true },
                ],
            },
            {
                text: "专栏",
                items: [
                    { text: "技术分享", link: "/pages/categories/技术分享" },
                    { text: "我的项目", link: "/pages/project" },
                    { text: "效率工具", link: "/pages/tools" },
                ],
            },
            {
                text: "页面",
                items: [
                    { text: "畅所欲言", link: "/pages/message" },
                    { text: "关于本站", link: "/pages/about" },
                    { text: "隐私政策", link: "/pages/privacy" },
                    { text: "版权协议", link: "/pages/cc" },
                ],
            },
            {
                text: "服务",
                items: [
                    { text: "站点状态", link: "https://status.imsyy.top/", newTab: true },
                    { text: "一个导航", link: "https://nav.imsyy.top/", newTab: true },
                    { text: "站点订阅", link: "https://blog.imsyy.top/rss.xml", newTab: true },
                    {
                        text: "反馈投诉",
                        link: "https://eqnxweimkr5.feishu.cn/share/base/form/shrcnCXCPmxCKKJYI3RKUfefJre",
                        newTab: true,
                    },
                ],
            },
        ],
    },
}