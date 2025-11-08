import { defineConfig } from 'vitepress'
import {
  getAllPosts,
  getAllCategories,
  getAllTags
} from './theme/utils/getPostData.mjs'
import { getThemeConfig } from "./init.mjs";
import markdownConfig from "./theme/utils/markdownConfig.mjs";
const posts = await getAllPosts()
const themeConfig = await getThemeConfig()

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: themeConfig.siteMeta.title,
  description: themeConfig.siteMeta.description,
  lang: themeConfig.siteMeta.lang,
  // 简洁的 URL
  cleanUrls: true,
  // rewrites: {
  //   'pages/:path(.*)': '/:path',
  // },
  // 最后更新时间戳
  lastUpdated: true,
  // 主题
  appearance: "dark",
  // Head
  head: themeConfig.inject.header,
  themeConfig: {
    ...themeConfig,
    // logo: themeConfig.siteMeta.logo,
    postData: posts,
    tagsData: getAllTags(posts),
    categoriesData: getAllCategories(posts),
  },
  vite: {
    // publicDir: 'public',
    css: {
      preprocessorOptions: {
        sass: {
          // 解決 'legacy-js-api' 警告的核心配置
          // 告诉 Dart Sass 使用现代的（新的）JavaScript API
          api: 'modern-compiler',
        },
        scss: {
          // 如果您使用 SCSS 格式 (更常見)，也要添加相同的配置
          api: 'modern-compiler',
        },
      }
    },
  },
  markdown: {
    lineNumbers: true,
    math: true,
    image: {
      lazyLoading: true,
    },
    headers: {
      level: [1, 2, 3],
    },
    config: (md) => markdownConfig(md, themeConfig),
  },
})
