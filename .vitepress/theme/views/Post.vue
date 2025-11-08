<template>
    <div class="post">
        <!-- <h2>this`s PAGE!!!</h2> -->
        <div class="markdown-main">
            <Content class="markdown-main-style" />
        </div>
        <!-- <Aside /> -->
        <Toc class="toc"/>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeMount } from 'vue';
import { useData, useRoute } from 'vitepress';
import { formatDate } from '../utils/timeTools.mjs';
import Toc from '../components/Toc/Toc.vue';
const { theme } = useData();
const route = useRoute();
const date = theme.value.postData.map((item) => {
    return formatDate(item.date, 'YYYY年M月D日')
})
// const posts = ref([]);
// console.log(theme.value.postData);
// console.log(date)
console.log(route)

</script>

<style lang="scss" scoped>
// @use "../style/markdown.scss";
@use "../style/post.scss";

.post {
    position: relative;
    width: 100%;
    max-height: 100%;
    display: flex;
    flex-direction: row;
    align-items: start;
    .markdown-main {
        flex: 1;
        min-width: 0;
        padding: 30px;
        background-color: var(--color-card-background);
        border: 3px solid var(--color-card-border);
        border-radius: var(--radius-lg);
        box-shadow: var(--box-shadow);
    }
    @media (max-width: 960px) {
        .toc {
            display: none;
        }
    }
}
</style>