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
import "./style/main.scss";
import Dynamicicon from './components/Dynamicicon.vue'
import mitt from 'mitt';
import { enhanceAppWithTabs } from "vitepress-plugin-tabs/client";

const emitter = mitt();

const Theme = {
  Layout: () => {
    return h(App);
  },
  enhanceApp({ app, router, siteData }) {
    app.component('Dynamicicon', Dynamicicon);
    app.provide('eventBus', emitter);
    enhanceAppWithTabs(app);
  }
};

export default Theme;