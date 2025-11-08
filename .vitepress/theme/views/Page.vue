<template>
    <div class="page">
        <!-- <Content /> -->
        <Aside />
        <div class="content">
            <TypeBar v-if="isList()" :base-path="`/pages/${relativePath}`" :list="dataKeys"/>
            <component :is="pageComponentMap[relativePath]" :list-data="listData"></component>
            <Pagination v-if="isList()" :total="total" :page-size="pageSize" :base-path="basePath" />
        </div>
    </div>

</template>

<script setup>
// import { Content } from 'vitepress';
// console.log("Page.vue");
import { computed, inject, ref, onMounted, onUnmounted } from 'vue';
import { useData, useRoute } from 'vitepress';
import Aside from '../components/Aside/Aside.vue';
import PostList from '../components/PostList.vue';
import TypeBar from '../components/TypeBar.vue';
import useUrlSearchParams from '../utils/useUrlSearchParams.mjs';
import Pagination from '../components/Pagination.vue';
import Archives from '../components/Archives.vue';
const { page, theme } = useData();
const route = useRoute();
const cleanPath = computed(() => page.value.relativePath.replace(/\.md$/, ''));
const relativePath = computed(() => cleanPath.value.split('/')[1]);
const paramName = computed(() => cleanPath.value.split('/')[2]);
const basePath = route.path;
// console.log(basePath)
const { params, updateParams } = useUrlSearchParams();
const pageComponentMap = {
    'categories': PostList,
    'tags': PostList,
    'archives': Archives,
};
// console.log(page.value.params?.name);
// console.log(paramName.value);
const pageSize = 3; // 每页显示的文章数量
const isList = () => {
    return relativePath.value === 'categories' || relativePath.value === 'tags';
};
const data = computed(() => {
    if (paramName.value) {
        if (relativePath.value === 'categories') {
            return theme.value.categoriesData[paramName.value]['articles'];
        } else {
            return theme.value.tagsData[paramName.value]['articles'];
        }
    } else if (relativePath.value === 'categories' || relativePath.value === 'tags') {
        return theme.value.postData;
    } else {
        return [];
    }
});
const dataKeys = computed(() => {
    if (relativePath.value === 'categories') {
        return Object.keys(theme.value.categoriesData);
    } else if (relativePath.value === 'tags') {
        return Object.keys(theme.value.tagsData);
    } else {
        return [];
    }
});
// console.log(dataKeys.value);
const listData = computed(() => {
    const page = params.value;
    // console.log(data);
    return data.value ? data.value.slice((page - 1) * pageSize, page * pageSize) : [];
});
const total = computed(() => {
    return data.value.length;
});
// console.log("total.value", total.value, "pageSize", pageSize, "listData.value", listData.value, "basePath.value", basePath.value);
</script>

<style lang="scss" scoped>
.page {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    gap: var(--spacing-xl);
    margin-top: 50px;
    margin-bottom: 50px;
    width: 100%;

    .aside {
        width: 210px;
    }

    .content {
        // width: 100%;
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: var(--spacing-xl);
        // margin-right: 50px;
    }
}
</style>