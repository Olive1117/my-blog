<template>
    <div class="page">
        <!-- <Content /> -->
        <Aside />
        <div class="content">
            <TypeBar v-if="isList" :base-path="`/pages/${relativePath}`" :list="dataKeys" />
            <component :is="pageComponentMap[relativePath]" :list-data="data"></component>
        </div>
    </div>

</template>

<script setup>
import { computed, inject, ref, onMounted, onUnmounted } from 'vue';
import { useData, useRoute } from 'vitepress';
import Aside from '../components/Aside/Aside.vue';
import PostList from '../components/PostList.vue';
import TypeBar from '../components/TypeBar.vue';
import useUrlSearchParams from '../utils/useUrlSearchParams.mjs';
import Archives from '../components/Archives.vue';
const { page, theme } = useData();
const cleanPath = computed(() => page.value.relativePath.replace(/\.md$/, ''));
const relativePath = computed(() => cleanPath.value.split('/')[1]);
const paramName = computed(() => cleanPath.value.split('/')[2]);
// console.log(basePath)
const { params, updateParams } = useUrlSearchParams();
const pageComponentMap = {
    'categories': PostList,
    'tags': PostList,
    'archives': Archives,
};
// console.log(page.value.params?.name);
// console.log(paramName.value);
const isList = computed(() => {
    return ['categories', 'tags'].includes(relativePath.value);
});
const data = computed(() => {
    if (isList.value && paramName.value) {
        const dataMap = {
            'categories': theme.value.categoriesData,
            'tags': theme.value.tagsData,
        };
        const targetData = dataMap[relativePath.value];
        return targetData?.[paramName.value]?.['articles'] ?? [];
    } else if (isList.value) {
        return theme.value.postData ?? [];
    } else {
        return [];
    }
});
const dataKeys = computed(() => {
    const dataMapKeys = {
        'categories': theme.value.categoriesData,
        'tags': theme.value.tagsData,
    };
    return dataMapKeys[relativePath.value] ? Object.keys(dataMapKeys[relativePath.value]) : [];
});
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