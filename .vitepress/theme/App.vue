<template>
  <Background />
  <Nav />
  <!-- <Mybutton>按钮</Mybutton> -->
  <NotFound v-if="page.isNotFound" />
  <Home v-else-if="frontmatter.layout === 'home'"/>
  <template v-else>
    <Post v-if="isPostPage" />
    <Page v-else-if="!page.isNotFound" />
  </template>
  
  
</template>

<script setup>
import { ref, computed } from 'vue';
import { useData, useRoute } from 'vitepress'
import Nav from './components/Nav.vue'
import Post from './views/Post.vue'
import Home from './views/Home.vue'
import Mybutton from './components/Mybutton.vue';
import Background from './components/Background.vue';
import NotFound from './views/NotFound.vue';
import Page from './views/Page.vue';
// https://vitepress.dev/reference/runtime-api#usedata
const { page, frontmatter } = useData();
const route = useRoute();
const { theme } = useData();

const isPostPage = computed(() => {
  const routePath = decodeURIComponent(route.path);
  console.log(routePath)
  return routePath.includes('/posts/');
});
</script>

<style scoped lang="scss">

</style>