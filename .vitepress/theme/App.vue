<template>
  <Background />
  <div class="main">
    <Nav />
    <NotFound v-if="page.isNotFound" />
    <Home v-else-if="frontmatter.layout === 'home'" show-header />
    <template v-else>
      <Post v-if="isPostPage" />
      <Page v-else-if="!page.isNotFound" />
    </template>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useData, useRoute } from 'vitepress'
import Nav from './components/Nav.vue'
import Post from './views/Post.vue'
import Home from './views/Home.vue'
import Background from './components/Background.vue';
import NotFound from './views/NotFound.vue';
import Page from './views/Page.vue';
import Dynamicicon from './components/Dynamicicon.vue';
// https://vitepress.dev/reference/runtime-api#usedata
const { page, frontmatter } = useData();
const route = useRoute();
const { theme } = useData();

const isPostPage = computed(() => {
  const routePath = decodeURIComponent(route.path);
  // console.log(routePath)
  return routePath.includes('/posts/');
});
</script>

<style scoped lang="scss">
.main {
  padding: 0 100px;
  max-width: 1440px;
  margin: 0 auto;

  @media (max-width: 576px) {
    padding: 0;
  }
}
</style>