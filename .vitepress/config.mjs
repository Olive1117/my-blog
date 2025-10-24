import { defineConfig } from 'vitepress'
import { getAllPosts } from './theme/utils/getPostData'
const posts = await getAllPosts()
// console.log("正在执行注入~~~~~~~~~~~~~~~~~~~~~", posts)
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My Awesome Project",
  description: "A VitePress Site",
  themeConfig: {
    postData: posts,
    nav: [
      { text: "Home", link: "/" },
      { text: "Guide", link: "/guide/" },
      { text: "About", link: "/about/" }
    ]
  },
  cleanUrls: true,
})
