<template>
    <header class="main-header">
        <div :class="['main-nav', { scrolled: isScrolled }]">
            <div class="nav-left">
                <a href="/" class="logo">{{ site.title }}</a>
            </div>
            <div class="nav-center">
                <div v-for="(value, index) in theme.nav" :key="index"
                    @click="isSingleLink(value.items) ? goto(value.items[0].link) : null" class="menu-item">
                    <dynamicicon v-if="value.icon" :icon="value.icon" :tag="'span'" />
                    <span class="link-btn">
                        {{ value.text }}
                    </span>
                    <dynamicicon v-if="!isSingleLink(value.items)" :icon="'ChevronDown'" :tag="'span'"
                        class="ChevronDown" />
                    <div v-if="!isSingleLink(value.items)" class="link-child">
                        <div v-for="(child, childIndex) in value.items" :key="childIndex"
                            @click="goto(value.items[childIndex].link)" class="link-child-item">
                            <span class="link-child-btn">
                                <dynamicicon v-if="child.icon" :icon="child.icon" :tag="'span'" />
                                {{ child.text }}
                            </span>
                            <dynamicicon v-if="isExternalLink(child.link)" :icon="'ExternalLink'" />
                        </div>

                    </div>
                </div>
            </div>
            <div class="nav-right">
                <span>搜索</span>
                <span>翻译</span>
                <span>自定义</span>
                <span>明暗</span>
            </div>
        </div>
    </header>
</template>

<script setup>
import { useData, useRouter } from 'vitepress'
import { ref, onMounted, onUnmounted } from 'vue';
import Dynamicicon from './Dynamicicon.vue';
const { site, theme } = useData();
console.log("site", site, "theme", theme);
const router = useRouter();

const isScrolled = ref(false);
const scrollThreshold = 10;

const isExternalLink = (link) => {
    return link.startsWith('http://') || link.startsWith('https://');
};
const isSingleLink = (value) => {
    return value.length === 1;
};

const goto = (link) => {
    // router.go(link);
    console.log("goto", link);
    if (isExternalLink(link)) {
        window.open(link);
    } else {
        router.go(link);
    }
};

const handleScroll = () => {
    // 检查滚动距离，并更新 isScrolled 的值
    if (window.scrollY > scrollThreshold) {
        isScrolled.value = true;
    } else {
        isScrolled.value = false;
    }
};
onMounted(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
});
onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});
</script>

<style lang="scss" scoped>
.main-header {
    position: sticky;
    top: 0;
    height: 60px;
    z-index: 999;
    white-space: nowrap;
    color: var(--color-text-base);
    background-color: transparent;

    .main-nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 10px;
        height: 100%;
        border-radius: var(--radius-md);
        border: 3px solid rgba(255, 255, 255, 0);
        transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;

        &.scrolled {
            background-color: var(--color-card-background);
            border-color: var(--color-card-border);
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        }

        .nav-left {
            background-color: azure;
        }

        .nav-center {
            display: flex;
            align-items: center;
            justify-content: space-around;
            // background-color: aqua;
            gap: var(--spacing-sm);

            .menu-item {
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: var(--spacing-xs);
                padding: 6px 10px;
                border-radius: var(--radius-md);
                transition: 0.3s ease;

                &:hover {
                    background-color: var(--color-primary-light);
                    color: var(--color-primary);
                }

                &:hover .link-child {
                    display: flex;
                }

                &:hover .ChevronDown {
                    transform: rotate(180deg);
                }

                &:hover .link-child {
                    animation: fade-down 0.3s ease forwards;
                }

                .link-child {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    width: 180%;
                    flex-direction: column;
                    display: none;
                    border-radius: var(--radius-md);
                    padding: 8px 10px;
                    color: var(--color-text-base);
                    border: 3px solid rgba(255, 255, 255, 0);
                    background-color: var(--color-card-background);
                    border-color: var(--color-card-border);

                    .link-child-item {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        width: 100%;
                        border-radius: var(--radius-md);
                        padding: 5px 8px;
                        transition: 0.3s ease;

                        &:hover {
                            background-color: var(--color-primary-light);
                            color: var(--color-primary);
                        }

                        .link-child-btn {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            gap: var(--spacing-xs);
                            padding: 3px 0;
                        }
                    }
                }

                .ChevronDown {
                    transition: transform 0.3s ease;
                }
            }
        }

        .nav-right {
            display: flex;
            align-items: center;
            justify-content: space-around;
            gap: var(--spacing-sm);

            span {
                background-color: chartreuse;
            }
        }
    }
}
</style>