<template>
    <div class="aside">
        <!-- <h1>侧边栏</h1> -->
        <Hello />
        <Categories />
        <Tags />
    </div>
</template>

<script setup>
import Categories from './Widgets/Categories.vue';
import Hello from './Widgets/Hello.vue';
import Tags from './Widgets/Tags.vue';


</script>

<style lang="scss" scoped>
.aside {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xl);
}
</style>