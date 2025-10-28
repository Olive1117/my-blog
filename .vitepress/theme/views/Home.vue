<template>
    <Banner />
    <!-- <h1>HALLO!!! this home!</h1> -->
    <h1 v-if="showCategory">this is category {{ showCategory }}</h1>
    <div class="home-content">
        <TypeBar />
        <PostList :list-data="listData" />
        <Pagination 
            :total="total" 
            :page-size="pageSize" 
            :base-path="basePath"
            @update-page="handleUpdatePage"
        />
    </div>
</template>

<script setup>
import { useData, useRoute } from 'vitepress';
import { computed, ref, watch } from 'vue';
import { useUrlSearchParams } from '@vueuse/core';
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
const route = useRoute();
const refreshKey = ref(0);
const basePath = route.path;
// const query = useUrlSearchParams('history')
const handleUpdatePage = () => {
    refreshKey.value++;
    console.log("当前页数：", getCurrentPage.value);
    // console.log("query参数", query['page'] ? Number(query['page']) : 1);
    console.log("子组件事件传递");
};
console.log("页面刷新")
// const params = useUrlSearchParams('history');
// console.log("shouCategory:", props.showCategory);
// console.log("route！！！！！！！", route);
// console.log("params！！！！！！！", site.value)
const pageSize = 3;
const postData = computed(() => {
    if (props.showCategory || props.showTag) {
         // 分类或标签页面
        return props.showCategory ? theme.value.categoriesData[props.showCategory].articles : theme.value.tagsData[props.showTag].articles;
    } else {
        return theme.value.postData;
    }
});

const getCurrentPage = computed(() => {
    let params = refreshKey.value;
    params = new URLSearchParams(window.location.search);
    const page = params.get('page') ? Number(params.get('page')) : 1;
    return page;
});

const listData = computed(() => {
    const page = getCurrentPage.value;
    // console.log("当前页数：", page);
    // console.log("route.query:", route)
    let data = postData.value;
    // console.log("文章数据：", data);
    return data ? data.slice((page - 1) * pageSize, page * pageSize) : [];
});

const total = computed(() => {
    return postData.value.length;
});
// const { params } = useData();
// console.log("params:", params.value);
// watch(
//   params,
//   (newPage) => {
//     console.log("读取到刷新！！");
//   },
// );
watch(refreshKey, () => {
    console.log("watch刷新！！")
    getCurrentPage.value;
    // console.log(new URLSearchParams(window.location.search).get('page'));
    // console.log("当前页数：", getCurrentPage.value);
    })
</script>

<style lang="scss" scoped>
.home-content {
    background-color: rgb(255, 184, 158);
    // padding: 40px;
}
</style>