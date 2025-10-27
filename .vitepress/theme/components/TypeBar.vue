<template>
    <!-- <h1>标签列表</h1> -->
    <div class="type-bar">
        <div class="all-type">
            <a href="/" class="type-home">首页</a>
            <a 
                v-for="(value, key, index) in theme?.categoriesData"
                :key="index"
                :href="`/pages/categories/${key}`" 
                class="type-item"
            >
                {{ key }}
            </a>
        </div>
        <a href="/page/categories" class="type-more">全部</a>
    </div>
</template>

<script setup>
// import { ref } from 'vue'
// const type = ref({
//     "标签1": 1,
//     "标签2": 4,
//     "标签3": 7,
//     "标签5": 3,
//     "标签6": 3,
//     "标签7": 3,
//     "标签8": 7,
//     "标签9": 3,
// })
import { useData } from 'vitepress';
const { theme } = useData();
// console.log(theme.value.categoriesData);
</script>

<style lang="scss" scoped>
.type-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    background-color: bisque;
    white-space: nowrap;
    .all-type {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 10px;
        background-color: aqua;
        flex-grow: 1;
        overflow: hidden;
        mask: linear-gradient(
            90deg,
            #fff 0,
            #fff 90%,
            hsla(0, 0%, 100%, 0.6) 95%,
            hsla(0, 0%, 100%, 0) 100%
        );
        a {
            background-color: chartreuse;
        }
    }
    .type-more {
        // margin-left: auto;
        background-color: aquamarine;
        z-index: 100;
    }
}
</style>