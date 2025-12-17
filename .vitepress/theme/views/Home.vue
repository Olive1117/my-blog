<template>
    <Banner v-if="showHeader" />
    <!-- <h2>{{ theme.postData }}</h2> -->
    <!-- <h1>HALLO!!! this home!</h1> -->
    <div class="home-content">
        <Aside class="aside" />
        <div class="post-content">
            <PostList :list-data="theme.postData" />
        </div>
    </div>
</template>

<script setup>
import { useData, useRoute } from 'vitepress';
import Banner from '../components/Banner.vue'
import PostList from '../components/PostList.vue';
import Aside from '../components/Aside/Aside.vue';
const props = defineProps({
    showHeader: {
        type: Boolean,
        default: false,
    },
});
const { theme } = useData();

// function add(m) {
//     let s = m;
//     function innerFunc(n) {
//         s += n;
//         return innerFunc;
//     }
//     innerFunc.print = function () {
//         console.log(s);
//         return innerFunc;
//     };
//     return innerFunc;
// };

// let a = add(1)(2)(3).print()(4).print()(5).print();
// console.log(a);
// a(4).print();
</script>

<style lang="scss" scoped>
.home-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    gap: var(--spacing-xl);
    margin-top: 50px;
    margin-bottom: 50px;
    width: 100%;

    .aside {
        // flex: 0.25;
        width: 210px;
    }

    .post-content {
        // width: 100%;
        flex: 1;
        min-width: 0;
        // margin-right: 50px;
    }

    @media (max-width: 960px) {
        flex-direction: column;
        align-items: center;

        .aside {
            display: none;
        }

        // justify-content: center;
        .post-content {
            width: 100%;
        }
    }
}
</style>