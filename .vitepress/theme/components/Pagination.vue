<template>
    <div class="pagination">
        <div v-for="(value, index) in pageList" :key="index" @click="jumpPage(value)"
            :class="['page-item', { active: index + 1 === currentPage }]">
            <span>{{ value.pageNumber }}</span>
        </div>
    </div>
</template>
<script setup>
import { ref, computed, inject, onMounted, onUnmounted } from 'vue'
import useUrlSearchParams from '../utils/useUrlSearchParams.mjs';
const { params, updateParams } = useUrlSearchParams();
const props = defineProps({
    total: {
        type: Number,
        default: 1
    },
    pageSize: {
        type: Number,
        default: 10
    },
    basePath: {
        type: String,
        default: '/'
    },
})
const currentPage = computed(() => params.value || 1);
console.log(currentPage.value);
const jumpPage = (pageItem) => {
    // currentPage.value = pageItem.pageNumber;
    if (typeof window !== 'undefined') {
        window.history.pushState({}, '', pageItem.regularPath);
        updateParams();
        window.scrollTo({ top: 0 });
        // console.log(currentPage.value);
    }
};
const pageList = computed(() => {
    const totalPage = Math.ceil(props.total / props.pageSize);
    const list = [];
    for (let i = 1; i <= totalPage; i++) {
        const path = i === 1 ? props.basePath : `${props.basePath}?page=${i}`;
        list.push({
            pageNumber: i,
            regularPath: path,
        });
    }
    return list;
});

</script>
<style lang="scss" scoped>
.pagination {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    justify-content: center;
    padding: var(--spacing-xl) 0;

    .page-item {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 50px;
        line-height: 30px;
        text-align: center;
        cursor: pointer;
        border-radius: var(--radius-lg);
        background-color: var(--color-card-background);
        border: 3px solid var(--color-card-border);
        color: var(--color-text-base);
        transition: all 0.3s ease;

        &.active {
            color: var(--color-primary);
            background-color: var(--color-primary-light);
            border-color: rgba(255, 255, 255, 0);
        }

        &:hover {
            border-color: var(--color-primary);
        }
    }
}
</style>