<template>
  <a href="/">Home</a>
  <Nav />
  <Banner />
  <Home v-if="frontmatter.layout === 'home'"/>
  <Page v-else />
</template>

<script setup>
import { useData } from 'vitepress'
import Nav from './components/Nav.vue'
import Page from './views/Page.vue'
import Home from './views/Home.vue'
import Calculator from './components/Calculator.vue';
import Banner from './components/Banner.vue';
// https://vitepress.dev/reference/runtime-api#usedata
const { site, frontmatter } = useData();

const { theme } = useData();
</script>
