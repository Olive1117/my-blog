<template>
    <div class="toc">
        <h2>目录</h2>
        <toc-item :headers="page.headers" />
        <button @click="gototop">回到最顶上</button>
    </div>
</template>

<script setup>
import { useData } from 'vitepress'
import TocItem from './TocItem.vue';

const { page } = useData();
const gototop = () => {
    window.scrollTo(0, 0);
}
console.log("page", page.value.headers);
console.log("headers", page.value.headers[0].children[0]);
</script>

<style lang="scss" scoped>
.toc {
    position: sticky;
    top: 20px;
}
</style>