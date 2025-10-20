// // https://vitepress.dev/guide/custom-theme
// import Layout from './Layout.vue'
// import './style.css'

// /** @type {import('vitepress').Theme} */
// export default {
//   Layout,
//   enhanceApp({ app, router, siteData }) {
//     // ...
//   }
// }

import { h } from "vue";
import App from "./App.vue";
// import "./style.css";
import "./style/main.css";

const Theme = {
  Layout: () => h(App),
  enhanceApp({ app, router, siteData }) {
  }
};

export default Theme;