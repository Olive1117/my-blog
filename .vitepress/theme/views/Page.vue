<template>
    <h1>{{ theme.postData }}</h1>
    <h2>{{ theme.categoriesData }}</h2>
    <h2>this`s PAGE!!!</h2>
    <Content />
    <h1>{{ date }}</h1>
    
</template>

<script setup>
import { ref, onMounted, onBeforeMount } from 'vue';
import { useData } from 'vitepress';
import { formatDate } from '../utils/timeTools.mjs';
const { theme } = useData();
const date = theme.value.postData.map((item) => {
    return formatDate(item.date, 'YYYY年M月D日')
})
// const posts = ref([]);
console.log(theme.value.postData);
console.log(date)

</script>