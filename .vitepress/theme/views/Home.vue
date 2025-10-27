<template>
    <Banner />
    <!-- <h1>HALLO!!! this home!</h1> -->
    <h1 v-if="showCategory">this is category {{ showCategory }}</h1>
    <div class="home-content">
        <TypeBar />
        <PostList :list-data="listData" />
        <Pagination />
    </div>
</template>

<script setup>
import { useData } from 'vitepress';
import { computed } from 'vue';
import Banner from '../components/Banner.vue'
import Pagination from '../components/Pagination.vue';
import PostList from '../components/PostList.vue';
import TypeBar from '../components/TypeBar.vue'; 
const props = defineProps({
    showCategory: {
        type: [null, String],
        default: null,
    },
    showTag: {
        type: [null, String],
        default: null,
    },
    page: {
        type: Number,
        default: 1,
    },
});
const { theme } = useData();
console.log("shouCategory:", props.showCategory);
const postSize = 3;
const postData = computed(() => {
    if (props.showCategory || props.showTag) {
         // 分类或标签页面
        return props.showCategory ? theme.value.categoriesData[props.showCategory].articles : theme.value.tagsData[props.showTag].articles;
    } else {
        return theme.value.postData;
    }
});

const getCurrentPage = () => {
    const params = new URLSearchParams(window.location.search);
    const page = parseInt(params.get('page') || 1);
    return page ? Number(page) : 1;
    console.log("当前页数：", page);
};

const listData = computed(() => {
    const page = getCurrentPage();
    console.log("当前页数：", page);
    let data = postData.value;
    console.log("文章数据：", data);
    return data ? data.slice((page - 1) * postSize, page * postSize) : [];
});

// const { params } = useData();
// console.log("params:", params.value);
</script>

<style lang="scss" scoped>
.home-content {
    background-color: rgb(255, 184, 158);
    // padding: 40px;
}
</style>