<template>
    <h1>分页栏</h1>
    <div class="page-number">
        <div 
            v-for="(value, index) in pageList"
            :key="index"
            @click="jumpPage(value)"
            :class="['page-item', {active: index + 1 === currentPage}]"
        >
            <span>{{ value }}</span>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
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
let currentPage = ref(Number(new URLSearchParams(window.location.search).get('page')) || 1);
console.log(currentPage.value);
const emit = defineEmits(['update-page']);
const jumpPage = (index) => {
    currentPage.value = index;
    const newPath = index === 1 ? props.basePath : `${props.basePath}?page=${index}`;
    window.history.pushState({}, '', newPath);
console.log(currentPage.value)
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
.active {
    background-color: crimson;
}
</style>