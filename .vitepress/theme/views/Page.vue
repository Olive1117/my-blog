<template>
    <h1>{{ theme.postData }}</h1>
    <h2>this`s PAGE!!!</h2>
    <Content />
    
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useData } from 'vitepress';

const { theme } = useData();
const posts = ref([]);
console.log(theme.postData);
</script>