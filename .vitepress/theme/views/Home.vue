<template>
    <Banner />
    <!-- <h1>HALLO!!! this home!</h1> -->
    <div class="home-content">
        <TypeBar />
        <PostList />
        <Pagination />
    </div>
</template>

<script setup>
import Banner from '../components/Banner.vue'
import Pagination from '../components/Pagination.vue';
import PostList from '../components/PostList.vue';
import TypeBar from '../components/TypeBar.vue';
</script>

<style lang="scss" scoped>
.home-content {
    background-color: rgb(255, 184, 158);
    // padding: 40px;
}
</style>