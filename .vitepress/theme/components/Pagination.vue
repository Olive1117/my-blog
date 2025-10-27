<template>
    <h1>分页栏</h1>
    <div class="page-number">
        <div 
            v-for="(value, index) in pageList"
            :key="index"
            :class="['page-item', {active: index === currentPage}]"
            @click="jumpPage(index)"
            class="page-item"
        >
            <span>{{ value }}</span>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, defineProps } from 'vue'
import { useRouter } from 'vitepress';
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
const router = useRouter();
const jumpPage = (index) => {
    if (index === 1) router.push(props.basePath);
    else router.push(`${props.basePath}?page=${index}`);
};
const pageList = computed(() => {
    const totalPage = Math.ceil(props.total / props.pageSize);
    const pageList = [];
    for (let i = 1; i <= totalPage; i++) {
        pageList.push(i);
    }
    return pageList;
});
console.log("分页总数", props.total);
</script>

<style lang="scss" scoped>
</style>