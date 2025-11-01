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
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "./style/main.scss";
import Dynamicicon from './components/Dynamicicon.vue'

const Theme = {
  Layout: () => h(App),
  enhanceApp({ app, router, siteData }) {
    app.use(ElementPlus);
    app.component('dynamicicon', Dynamicicon);
    // router.onAfterRouteChange((to) => {
    // });
  }
};

export default Theme;