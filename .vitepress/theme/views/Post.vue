<template>
    <h2>this`s PAGE!!!</h2>
    <div class="markdown-main">
        <Content class="markdown-main-style" />
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeMount } from 'vue';
import { useData, useRoute } from 'vitepress';
import { formatDate } from '../utils/timeTools.mjs';
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
@use "../style/post.scss"

</style>