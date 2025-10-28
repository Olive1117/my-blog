<template>
    <h1>分页栏</h1>
    <div class="page-number">
        <div 
            v-for="(value, index) in pageList"
            :key="index"
            @click="jumpPage(value)"
            :class="['page-item', {active: index === currentPage}]"
            class="page-item"
        >
            <span>{{ value }}</span>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, defineProps } from 'vue'
const props = defineProps({
    currentPage: {
        type: Number,
        default: 1
    },
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
    }
})
const emit = defineEmits(['update-page']);
const jumpPage = (index) => {
    const newPath = index === 1 ? props.basePath : `${props.basePath}?page=${index}`;
    window.history.pushState({}, '', newPath);
    emit('update-page');
};
const pageList = computed(() => {
    const totalPage = Math.ceil(props.total / props.pageSize);
    const pageList = [];
    for (let i = 1; i <= totalPage; i++) {
        pageList.push(i);
    }
    return pageList;
});

</script>

<style lang="scss" scoped>
</style>