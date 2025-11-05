<template>
    <div class="toc">
        <!-- <h2>目录</h2> -->
        <toc-item :headers="page.headers" :active-hash="activeHash" />
        <button @click="gototop">回到最顶上</button>
    </div>
</template>

<script setup>
import { useData } from 'vitepress'
import TocItem from './TocItem.vue';
import { onMounted, onUnmounted, ref, nextTick, watch } from 'vue';

const { page } = useData();
const gototop = () => {
    window.scrollTo(0, 0);
}
// console.log("page", page.value.headers);
// console.log("headers", page.value.headers[0].children[0]);
let observer;
const headers = ref([]);
const visibleHeaders = ref([]);
const activeHash = ref([]);

const handleIntersection = (entries) => {
    for (const entry of entries) {
        if (entry.isIntersecting) {
            visibleHeaders.value.push(entry.target);
            // console.log("add!", entry.target);
        } else {
            visibleHeaders.value = visibleHeaders.value.filter(
                target => target !== entry.target
            );
            // console.log("not visibleHeaders", entry.target.id);
        }
    }
};
const getHeaders = (array) => {
    if (array && array.length > 0) {
        array.forEach((item) => {
            const dom = document.getElementById(item.slug);
            headers.value.push(dom);
            if (item.children && item.children.length > 0) {
                getHeaders(item.children);
            }
        });
    }
};
const initObserver = () => {
    nextTick(() => {
        observer = new IntersectionObserver(handleIntersection, {
            rootMargin: "-100px 0px 0px 0px",
            threshold: 0,
        });
        headers.value.forEach((dom) => {
            observer.observe(dom);
        });
    });
};
watch(visibleHeaders, (newVH, oldVH) => {
    activeHash.value = [];
    // console.log("-----------");
    console.log("当前顺序", newVH);
    console.log("旧顺序", oldVH);
    if (newVH.length === 0) {
        // console.log("没有可见的元素");
        console.log("旧元素的top距离", oldVH[oldVH.length - 1].getBoundingClientRect().top);
        if (oldVH[oldVH.length - 1].getBoundingClientRect().top < 100) {
            activeHash.value.push(oldVH[oldVH.length - 1].id);
        } else {
            const closestHeaderIndex = headers.value.findIndex(
                header => header.id === oldVH[oldVH.length - 1].id
            );
            console.log("closestHeaderIndex", closestHeaderIndex);
            activeHash.value.push(headers.value[closestHeaderIndex - 1].id);
        }
    } else {
        const closestHeader = [...newVH].map(header => ({
            hash: header,
            // 实时获取 top 距离
            top: header.getBoundingClientRect().top
        })).sort((a, b) => a.top - b.top)[0];
        // console.log("最顶上的元素", closestHeader.hash);
        const closestHeaderIndex = headers.value.findIndex(
            header => header.id === closestHeader.hash.id
        );
        if (closestHeaderIndex > 0) {
            activeHash.value.push(headers.value[closestHeaderIndex - 1].id);
        }
        newVH.forEach((header) => {
            activeHash.value.push(header.id);
            // console.log("visibleHeaders changed", header.hash);
        });
    }

    if (newVH.length > 0) {
        // const closestHeader = [...newVH].sort((a, b) => a.top - b.top)[0];
        const closestHeader = [...newVH].map(header => ({
            hash: header,
            // 实时获取 top 距离
            top: header.getBoundingClientRect().top
        })).sort((a, b) => a.top - b.top)[0];
        // console.log("最顶上的元素", closestHeader.hash);
        const closestHeaderIndex = headers.value.findIndex(
            header => header.id === closestHeader.hash.id
        );
        if (closestHeaderIndex > 0) {
            activeHash.value.push(headers.value[closestHeaderIndex - 1].id);
        }
    }
    // else {
    //     // console.log("没有可见的元素");
    //     activeHash.value.push(headers.value[headers.value.length - 1].id);
    // };
    // newVH.forEach((header) => {
    // activeHash.value.push(header.id);
    // console.log("visibleHeaders changed", header.hash);
    // });
    console.log("activeHash", activeHash.value);
}, { deep: true });
onMounted(() => {
    initObserver();
    getHeaders(page.value.headers);
    console.log("headersdom", headers.value);
});
onUnmounted(() => {
    if (observer) {
        observer.disconnect();
    }
});
</script>

<style lang="scss" scoped>
.toc {
    position: sticky;
    top: 60px;
    padding: 24px 0;
    max-width: 200px;
    // display: flex;
    // flex-direction: column;
}
</style>