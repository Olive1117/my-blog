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
const currentPage = ref(0);
const emitter = inject('eventBus');
console.log(currentPage.value);

const update = () => { currentPage.value = Number(new URLSearchParams(window.location.search).get('page')) || 1 };
const jumpPage = (pageItem) => {
    currentPage.value = pageItem.pageNumber;
    window.history.pushState({}, '', pageItem.regularPath);
    emitter.emit('page-content-updated', { time: Date.now() });
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

onMounted(() => {
    update();
    emitter.on('page-content-updated', update);
});
onUnmounted(() => {
    emitter.off('page-content-updated', update);
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