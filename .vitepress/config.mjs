import { defineConfig } from 'vitepress'
import {
  getAllPosts,
  getAllCategories,
  getAllTags
} from './theme/utils/getPostData.mjs'
import { getThemeConfig } from "./init.mjs";
const posts = await getAllPosts()
const themeConfig = await getThemeConfig()

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: themeConfig.siteMeta.title,
  description: themeConfig.siteMeta.description,
  lang: themeConfig.siteMeta.lang,
  // 简洁的 URL
  cleanUrls: true,
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
    publicDir: 'public',
  },
  markdown: {
    config: ((md) => {

    }),
    lineNumbers: false,
  },
})
