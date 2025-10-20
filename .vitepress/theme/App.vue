<template>
  <Background />
  <a href="/">Home</a>
  <Nav />
  <Banner />
  <Mybutton>按钮</Mybutton>
  <NotFound v-if="page.isNotFound" />
  <Home v-if="frontmatter.layout === 'home'"/>
  <Page v-else />
  
</template>

<script setup>
import { useData } from 'vitepress'
import Nav from './components/Nav.vue'
import Page from './views/Page.vue'
import Home from './views/Home.vue'
import Banner from './components/Banner.vue';
import Mybutton from './components/Mybutton.vue';
import Background from './components/Background.vue';
import NotFound from './views/NotFound.vue';
// https://vitepress.dev/reference/runtime-api#usedata
const { page, frontmatter } = useData();

const { theme } = useData();
</script>
