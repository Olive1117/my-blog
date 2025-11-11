<template>
    <div v-for="(value, index) in headers" :key="index" class="toc-item">
        <a :href="value.link" :class="['header-link', `level-${value.level}`, { 'active': isActive(value) }]">{{
            value.title }}</a>
        <TocItem v-if="headers[index].children && headers[index].children.length > 0" :headers="headers[index].children"
            :active-hash="activeHash" />
    </div>
</template>

<script setup>
import { onMounted } from 'vue';

const props = defineProps({
    headers: {
        type: Array,
        required: true,
    },
    activeHash: {
        type: Array,
        default: () => [],
        required: false,
    }
});
const isActive = (header) => {
    return props.activeHash.includes(header.slug);
}
</script>

<style lang="scss" scoped>
.toc-item {
    display: flex;
    flex-direction: column;
    width: 100%;

    .header-link {
        overflow-wrap: break-word;
        display: flex; // 使链接占据整行，便于设置 padding 和 margin
        width: 100%; // 宽度撑满
        // 统一设置链接的垂直间距
        padding: 5px 0;
        // margin: 2px 0;
        transition: color 0.2s, background-color 0.2s, border-left-color 0.2s; // 增加过渡动画
        border-radius: var(--radius-lg);
        // 统一的左侧指示条样式
        border-left: 3px solid transparent; // 默认透明
        line-height: 1.5; // 提高行高，改善阅读体验

        /* --- Level 1 样式 --- */
        &.level-1 {
            position: relative;
            font-size: 1rem;
            font-weight: 600;
            color: var(--color-text-base);
            // 增加左侧内边距，配合 border-left 保持对齐
            padding-left: 10px;
            // transition: all 0.3s ease;
            &::before {
                content: "";
                position: absolute;
                left: 0;
                top: 0.5rem;
                width: 3px;
                height: 1rem;
                border-radius: 3px;
                background-color: var(--color-primary);
            }
        }

        /* --- Level 2 样式 --- */
        &.level-2 {
            position: relative;
            font-size: 0.9em;
            font-weight: 500;
            color: var(--color-text-base);
            // 缩进，体现层级
            padding-left: 25px;

            &::before {
                content: "";
                position: absolute;
                left: 0.5rem;
                top: 0.7rem;
                width: 0.6rem;
                height: 0.6rem;
                background-color: var(--color-primary);
                border-radius: 50%;
                opacity: 0.8;
            }
        }

        /* --- Level 3 样式 --- */
        &.level-3 {
            position: relative;
            font-size: 0.8rem;
            font-weight: 400;
            color: var(--color-text-second); // 颜色稍淡
            // 更深的缩进
            padding-left: 40px;
            &::before {
                content: "";
                position: absolute;
                left: 1rem;
                top: 0.9rem;
                width: 0.4rem;
                height: 0.4rem;
                background-color: var(--color-primary);
                // border-radius: 50%;
                opacity: 0.4;
            }
        }

        /* --- 激活状态样式 --- */
        &.active {
            color: var(--color-primary);
            // font-weight: 600 !important; // 激活项加粗
            // background-color: var(--color-primary-light);
            // border-left-color: var(--color-primary); // 左侧指示条高亮
            // border-radius: 4px; // 轻微圆角
        }
    }

    .header-link:hover {
        color: var(--color-primary-dark);
        background-color: var(--color-primary-light);
        // z-index: ;
        // 悬浮时也高亮左侧边框，提供更好的反馈
        // border-color: var(--color-primary);
    }
}
</style>