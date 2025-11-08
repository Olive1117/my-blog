<template>
    <div class="archives">
        <h2>Archives</h2>
    </div>
</template>

<script setup>
import { useData } from 'vitepress';
const { theme } = useData();
console.log(theme.value.postData);
</script>