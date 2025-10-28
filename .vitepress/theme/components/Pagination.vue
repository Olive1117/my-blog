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
const emit = defineEmits(['update-page']);
const jumpPage = (index) => {
    // if (index === 1) router.go(props.basePath);
    // else router.go(`${props.basePath}?page=${index}`);
    const newPath = index === 1 ? props.basePath : `${props.basePath}?page=${index}`;
    window.history.pushState({}, '', newPath);
    emit('update-page');
    // console.log("jumpPage", index);
};
const pageList = computed(() => {
    const totalPage = Math.ceil(props.total / props.pageSize);
    const pageList = [];
    // console.log("totalPage", totalPage)
    for (let i = 1; i <= totalPage; i++) {
        pageList.push(i);
    }
    return pageList;
});
// const jumpPage = (index) => {
//     console.log(" window.location.search:::",  window.location.search);
//     if (index === 1) return props.basePath;
//     else return `${props.basePath}?page=${index}`;
// };
// const clickpage = () => {
//     console.log(" window.location.search:::",  new URLSearchParams(window.location.search).get('page'));
// };
// const jumpPage = (index) => {};
</script>

<style lang="scss" scoped>
</style>