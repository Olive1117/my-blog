<template>
    <Banner v-if="showHeader" />
    <!-- <h2>{{ theme.postData }}</h2> -->
    <!-- <h1>HALLO!!! this home!</h1> -->
    <!-- <h1 v-if="showCategory">this is category {{ showCategory }}</h1> -->
    <div class="home-content">
        <Aside class="aside" />
        <div class="post-content">
            <!-- <TypeBar /> -->
            <PostList :list-data="listData" />
            <Pagination :total="total" :page-size="pageSize" :base-path="basePath" />
        </div>
    </div>
</template>

<script setup>
import { useData, useRoute } from 'vitepress';
import { computed, ref, watch, inject, onMounted, onUnmounted } from 'vue';
import Banner from '../components/Banner.vue'
import Pagination from '../components/Pagination.vue';
import PostList from '../components/PostList.vue';
import TypeBar from '../components/TypeBar.vue';
import Aside from '../components/Aside/Aside.vue';
import useUrlSearchParams from '../utils/useUrlSearchParams.mjs';
const props = defineProps({
    showHeader: {
        type: Boolean,
        default: false,
    },
    page: {
        type: Number,
        default: 1,
    },
});
const { theme } = useData();
const route = useRoute();
const basePath = route.path;
const pageSize = 3; // 每页显示的文章数量
const { params } = useUrlSearchParams();
// refreshKey 是一个手动触发刷新的响应式引用
// 用于强制依赖非响应式的 window.location.search 的 computed 属性重新计算
// const emitter = inject('eventBus');
// const refreshKey = ref(0);
// const handleUpdatePage = () => {
//     // 自动滚动到页面顶部
//     window.scrollTo({
//         top: 0,
//     });
//     refreshKey.value++;
//     console.log("params", params.value)
// };

/**
 * 获取当前页码  
 * computed 属性：从浏览器 URL 的 Query 中解析 page 参数
 */
// const getCurrentPage = computed(() => {
//     // 关键行：读取 refreshKey 的值，建立响应式依赖
//     // 当 refreshKey 变化时，这个 computed 就会重新执行
//     // refreshKey.value;
//     // 从非响应式的 window.location.search 中获取页码
//     // updateParams();
//     // const page = params.value.get('page') ? Number(params.value.get('page')) : 1;
//     params.value;
//     console.log("getCurrentPage", params.value);
//     const page = Number(params.value) || 1;
//     return page;
// });

/**
 * 获取当前页的文章列表数据  
 * computed 属性：依赖于当前页码 (getCurrentPage) 和过滤后的文章数据 (postData)
 */
const listData = computed(() => {
    const page = params.value;
    const data = theme.value.postData;
    // 根据页码和页大小进行切片 (分页逻辑)
    console.log("listData", data);
    return data ? data.slice((page - 1) * pageSize, page * pageSize) : [];
});

/**
 * 获取总文章数  
 * computed 属性：依赖于过滤后的文章数据 (postData)
 */
const total = computed(() => {
    return theme.value.postData.length;
});

// onMounted(() => {
//     emitter.on('page-content-updated', handleUpdatePage);
// });
// onUnmounted(() => {
//     emitter.off('page-content-updated', handleUpdatePage);
// });
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