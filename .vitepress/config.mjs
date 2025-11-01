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
    build: {
      rollupOptions: {
        // 這是配置 Rollup 打包邏輯的關鍵部分
        output: {
          // 強制讓 Rollup 將 @vicons/fluent 下的依賴視為動態導入的切分點
          // 這樣可以確保所有圖標文件都會被拆分成獨立的 chunk
          // 並且可以在運行時被動態加載。
          manualChunks(id) {
            // 檢查依賴 ID 是否來自 @vicons/fluent 庫
            if (id.includes('@vicons/fluent')) {
              // 將所有圖標都分到一個名為 'vicons_fluent' 的 chunk 中
              // 這樣這些圖標就會被打包，但不會污染主 bundle
              return 'vicons_fluent'
            }
          }
        }
      }
    }
  },
  markdown: {
    config: ((md) => {

    }),
    lineNumbers: false,
  },
})
