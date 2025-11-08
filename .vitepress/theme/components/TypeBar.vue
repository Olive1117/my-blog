<template>
    <!-- <h1>标签列表</h1> -->
    <div class="type-bar">
        <div class="all-type">
            <a href="/" @click="emitter.emit('page-content-updated', { time: Date.now() })"
                :class="['type-item', { 'type-active': path === '/' }]">首页</a>
            <a v-for="(value, key, index) in theme?.categoriesData" :key="index" :href="`/pages/categories/${key}`"
                :class="['type-item', { 'type-active': path === `/pages/categories/${key}` }]">
                {{ key }}
            </a>
        </div>
        <a href="/page/categories" class="type-more">
            <Dynamicicon icon="ChevronsRight" tag="span" size="24" />
            <span>全部</span>
        </a>
    </div>
</template>

<script setup>
// import { ref } from 'vue'
// const type = ref({
//     "标签1": 1,
//     "标签2": 4,
//     "标签3": 7,
//     "标签5": 3,
//     "标签6": 3,
//     "标签7": 3,
//     "标签8": 7,
//     "标签9": 3,
// })
import { useData, useRoute } from 'vitepress';
import { inject } from 'vue';
const { theme } = useData();
const { frontmatter, route } = useRoute();
const emitter = inject('eventBus');
let path = decodeURIComponent(window.location.pathname);
console.log("测试", path);
console.log("测试", window.location.pathname);
</script>

<style lang="scss" scoped>
.type-bar {
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

        .type-more::before {
            background-color: var(--color-primary);
        }
    }

    .all-type {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 10px;
        // background-color: aqua;
        flex-grow: 1;
        overflow: auto;

        .type-active {
            color: var(--color-primary);
            background-color: var(--color-primary-light);

            &.type-item:hover {
                color: var(--color-primary-dark);
            }
        }

        mask: linear-gradient(90deg,
            #fff 0,
            #fff 80%,
            hsla(0, 0%, 100%, 0.6) 85%,
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
        position: relative;
        gap: var(--spacing-xs);
        padding: 6px 10px;
        border-radius: var(--radius-md);
        z-index: 100;

        &::before {
            content: "";
            position: absolute;
            display: inline-block;
            width: 4px;
            height: 64%;
            border-radius: 2px;
            background-color: var(--color-card-border);
            vertical-align: middle;
            left: -10px;
            transition: 0.3s ease;
        }

        &:hover {
            background-color: var(--color-primary-light);
            color: var(--color-primary);
        }
    }
}
</style>