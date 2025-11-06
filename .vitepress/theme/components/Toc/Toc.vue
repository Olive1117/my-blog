<template>
    <div class="toc">
        <!-- <h2>目录</h2> -->
        <div class="toc-container">
            <div class="toc-indicator-top" :style="indicatorStyleTop"></div>
            <div class="toc-indicator-bottom" :style="indicatorStyleBottom"></div>
            <toc-item :headers="page.headers" :active-hash="activeHash" />
        </div>

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

// **新增：滑块指示器的状态**
const indicatorStyleTop = ref({
    transform: 'translateY(0px)',
    height: '0px',
    // opacity: 1, // 初始隐藏
});
const indicatorStyleBottom = ref({
    transform: 'translateY(0px)',
    height: '0px',
    // opacity: 1, // 初始隐藏
});

const updateIndicator = () => {
    // 高亮dom
    const activeDom = document.querySelectorAll('.active.header-link');
    // toc目录头部top距离
    const tocDom = document.querySelector('.toc').getBoundingClientRect().top;
    // 高亮dom顶部top距离
    const topActive = activeDom[0].getBoundingClientRect().top;
    // 高亮dom底部bottom距离
    const bottomActive = activeDom[activeDom.length - 1].getBoundingClientRect().bottom;
    console.log("activeDom", activeDom, "topActive",activeDom[0], "bottomActive",activeDom[activeDom.length - 1], "tocDom",document.querySelector('.toc'));
    indicatorStyleTop.value = {
        transform: `translateY(${topActive - tocDom}px)`, // 使用 transform 实现丝滑平移
        height: `${(bottomActive - topActive) * 0.6}px`,
        // opacity: 1, // 显示滑块
    }
    indicatorStyleBottom.value = {
        transform: `translateY(${bottomActive - tocDom - (bottomActive - topActive) * 0.6}px)`, // 使用 transform 实现丝滑平移
        height: `${(bottomActive - topActive) * 0.6}px`,
        // opacity: 1, // 显示滑块
    }
};
// **修改：监听 activeHash 变化时调用更新函数**
watch(activeHash, () => {
    // 确保在 DOM 更新后执行
    nextTick(updateIndicator);
}, { deep: true, immediate: true });

watch(visibleHeaders, (newVH, oldVH) => {
    activeHash.value = [];
    if (newVH.length === 0) {
        // 没有可见标题，则查找上一次留下来的最末尾的标题
        // 如果距离顶部小于 100px，则认为标题往上走了，用户在往下滑动，这添加oldVH末尾标题
        if (oldVH[oldVH.length - 1].getBoundingClientRect().top < 100) {
            activeHash.value.push(oldVH[oldVH.length - 1].id);
        } else {
            // 否则认为用户往上滑，添加按headers顺序往上数一个的标题
            const closestHeaderIndex = headers.value.findIndex(
                header => header.id === oldVH[oldVH.length - 1].id
            );
            activeHash.value.push(headers.value[closestHeaderIndex - 1].id);
        }
    } else {
        // 对新的可见标题进行排序，找到距离顶部最近的标题
        const closestHeader = [...newVH].map(header => ({
            hash: header,
            // 实时获取 top 距离
            top: header.getBoundingClientRect().top
        })).sort((a, b) => a.top - b.top)[0];
        // 从 headers 中找到这个标题的索引
        const closestHeaderIndex = headers.value.findIndex(
            header => header.id === closestHeader.hash.id
        );
        // 判断是否是第一个标题，如果是，则不添加
        if (closestHeaderIndex > 0) {
            activeHash.value.push(headers.value[closestHeaderIndex - 1].id);
        }
        // 添加完头标题后，再添加可见标题，保持dom.id有序
        newVH.forEach((header) => {
            activeHash.value.push(header.id);
            // console.log("visibleHeaders changed", header.hash);
        });
    }
}, { deep: true });
onMounted(() => {
    initObserver();
    getHeaders(page.value.headers);
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
    top: 80px; /* <--- 重点修改：定位于视口 50% 的位置 */
    // transform: translateY(-50%);
    padding: 16px;
    width: 200px;
    margin: 0 0 0 20px;
    // **新增：卡片样式**
    background-color: rgba(253, 227, 227, 0.192); // 使用卡片背景色
    border-radius: 12px; // 圆角
    border: 1px solid var(--color-border); // 边框
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); // 轻微阴影

    // display: flex;
    // flex-direction: column;
    .toc-container {
        
        // padding: 8px 0; // 为 TocItem 列表增加垂直内边距，避免紧贴容器边缘
        .toc-indicator-top,
        .toc-indicator-bottom {
            position: absolute;
            width: 100%;
            top: 0;
            left: 0;
            z-index: -1;
            opacity: 1;
            border-left: 2px solid var(--color-primary);
            border-right: 2px solid var(--color-primary);
            background-color: var(--color-primary-light);
            transition: all 0.3s ease, background-color 0.3s;
        }

        .toc-indicator-top {
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
        }

        .toc-indicator-bottom {
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
        }

        &:hover {

            .toc-indicator-top,
            .toc-indicator-bottom {
                background-color: rgba(255, 255, 255, 0);
                // border: 2px solid var(--color-primary);
            }
        }
    }

    button {
        display: block;
        width: 100%;
        margin-top: 20px;
        padding: 8px 16px;
        background-color: var(--color-primary);
        color: var(--color-primary-light);
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 500;
        transition: background-color 0.3s;

        &:hover {
            background-color: var(--color-primary-dark);
        }
    }
}
</style>