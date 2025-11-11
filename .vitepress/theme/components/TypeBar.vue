<template>
    <!-- <h1>标签列表</h1> -->
    <div class="type-bar">
        <div class="all-type" ref="allTypeRef">
            <a :href="basePath" @click="updateParams()" :class="['type-item', { 'type-active': !paramName }]">总文章</a>
            <a v-for="(value, index) in list" :key="index" :href="`${basePath}/${value}`" @click="updateParams()"
                :class="['type-item', { 'type-active': paramName === value }]">
                {{ value }}
            </a>
        </div>
        <a :href="basePath" @click="updateParams()" class="type-more">
            <Dynamicicon icon="ChevronsRight" tag="span" size="24" />
            <span>展开</span>
        </a>
    </div>
</template>

<script setup>
import { useData, useRoute } from 'vitepress';
import { inject, computed, ref, onMounted, onUnmounted } from 'vue';
import useUrlSearchParams from '../utils/useUrlSearchParams.mjs';
const { theme, page } = useData();
const { frontmatter, route } = useRoute();
const paramName = computed(() => page.value.params?.name);
const { params, updateParams } = useUrlSearchParams();
const props = defineProps({
    list: {
        type: Array,
        default: () => []
    },
    basePath: {
        type: String,
        default: '/'
    },
});
// console.log("测试", props.basePath);
const allTypeRef = ref(null);
const handleWheel = (e) => {
    // 检查滚轮事件是否在 .all-type 元素内部触发
    if (allTypeRef.value && allTypeRef.value.contains(e.target)) {
        console.log("触发滚轮事件！")
        // 阻止默认的垂直滚动行为
        e.preventDefault();
        // 根据滚轮方向平移水平滚动条
        allTypeRef.value.scrollLeft += e.deltaY;
    }
};
onMounted(() => {
    if (allTypeRef.value) { allTypeRef.value.addEventListener('wheel', handleWheel); }
});
onUnmounted(() => {
    if (allTypeRef.value) { allTypeRef.value.removeEventListener('wheel', handleWheel); }
});
</script>

<style lang="scss" scoped>
.type-bar {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 10px;
    white-space: nowrap;
    transition: 0.3s ease;
    background-color: var(--color-card-background);
    border: 3px solid var(--color-card-border);
    border-radius: var(--radius-md);
    color: var(--color-text-base);
    box-shadow: var(--box-shadow);

    &:hover {
        border-color: var(--color-primary);

        &::after {
            background-color: var(--color-primary);
        }
    }

    &::after {
        content: "";
        position: absolute;
        display: inline-block;
        width: 3px;
        height: 50%;
        border-radius: 2px;
        left: calc(100% - 90px);
        background-color: transparent;
        vertical-align: middle;
        transition: 0.3s ease;
    }

    .all-type {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 10px;
        // background-color: aqua;
        flex-grow: 1;
        overflow: auto;
        scroll-behavior: smooth;

        .type-active {
            color: var(--color-primary);
            background-color: var(--color-primary-light);

            &.type-item:hover {
                color: var(--color-primary-dark);
            }
        }

        mask: linear-gradient(90deg,
            #fff 0,
            #fff 85%,
            hsla(0, 0%, 100%, 0.7) 90%,
            hsla(0, 0%, 100%, 0) 95%);

        .type-item {
            border-radius: var(--radius-md);
            padding: 6px 10px;
            border: 3px solid transparent;

            &:hover {
                color: var(--color-primary);
            }
        }
    }

    .type-more {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: var(--spacing-xs);
        padding: 6px 10px;
        border-radius: var(--radius-md);
        z-index: 100;
    }
}
</style>