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
            name: "Olive",
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
            [
                "script",
                {
                    src: "https://kit.fontawesome.com/23436449fa.js",
                    crossorigin: "anonymous",
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
        ],
    },
    // 导航栏菜单
    nav: [
        // {
        //     text: "主页",
        //     icon: "Home",
        //     items: [
        //         { text: "首页", link: "/", icon: "" },
        //     ],
        // },
        {
            text: "归档",
            icon: "Folders",
            items: [
                { text: "年份", link: "/pages/archives", icon: "" },
            ],
        },
        {
            text: "链接",
            icon: "Link",
            items: [
                { text: "github", link: "https://github.com/Olive1117", icon: "BrandGithub" },
                { text: "gitee", link: "https://gitee.com/Olive1117", icon: "" },
                { text: "bilibili", link: "https://space.bilibili.com/507776036?spm_id_from=333.1007.0.0", icon: "" },
                { text: "twitter", link: "https://x.com/Olive718390", icon: "BrandTwitter" },
            ],
        },
        {
            text: "我的",
            icon: "User",
            items: [
                { text: "动漫&文章", link: "/", icon: "Movie" },
                { text: "日记", link: "/pages/archives", icon: "Notebook" },
                { text: "图库", link: "/pages/about", icon: "Photo" },
            ],
        },
        {
            text: "关于",
            icon: "InfoCircle",
            items: [
                { text: "我自己", link: "/", icon: "" },
                { text: "友链", link: "/pages/archives", icon: "" },
            ],
        },
        {
            text: "其他",
            icon: "Dots",
            items: [
                { text: "项目", link: "/", icon: "" },
                { text: "技能", link: "/pages/archives", icon: "" },
                { text: "时间线", link: "/pages/about", icon: "" },
            ],
        }],
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
    // 图片灯箱
    fancybox: {
        enable: true,
        js: "https://mirrors.sustech.edu.cn/cdnjs/ajax/libs/fancyapps-ui/5.0.36/fancybox/fancybox.umd.min.js",
        css: "https://mirrors.sustech.edu.cn/cdnjs/ajax/libs/fancyapps-ui/5.0.36/fancybox/fancybox.min.css",
    },
}