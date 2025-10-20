<template>
    <h2>this`s PAGE!!!</h2>
    <Content />
    <h1>{{ theme }}</h1>
</template>

<script setup>
import { useData } from 'vitepress';
const { theme } = useData();
</script>