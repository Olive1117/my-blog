<template>
    <header class="main-header">
        <div :class="['main-nav', { scrolled: isScrolled }]">
            <div class="nav-left">
                <a href="/" @click.prevent="emitter.emit('page-content-updated', { time: Date.now() })"
                    class="logo">回到首页</a>
            </div>
            <div class="nav-center">
                <a v-for="(value, index) in theme.nav" :key="index"
                    :href="isSingleLink(value.items) ? value.items[0].link : null"
                    @click.prevent="isSingleLink(value.items) ? goto(value.items[0].link) : null" class="menu-item">
                    <Dynamicicon v-if="value.icon" :icon="value.icon" :tag="'span'" />
                    <span class="link-btn">
                        {{ value.text }}
                    </span>
                    <Dynamicicon v-if="!isSingleLink(value.items)" :icon="'ChevronDown'" :tag="'span'"
                        class="ChevronDown" />
                    <div v-if="!isSingleLink(value.items)" class="link-child">
                        <a v-for="(child, childIndex) in value.items" :key="childIndex" :href="child.link"
                            @click.prevent="goto(value.items[childIndex].link)" class="link-child-item">
                            <span class="link-child-btn">
                                <Dynamicicon v-if="child.icon" :icon="child.icon" :tag="'span'" />
                                {{ child.text }}
                            </span>
                            <Dynamicicon v-if="isExternalLink(child.link)" :icon="'ExternalLink'" />
                        </a>
                    </div>
                </a>
            </div>
            <div class="nav-right">
                <Dynamicicon icon="Search" size="24" />
                <Dynamicicon icon="Language" size="24" />
                <Dynamicicon icon="Palette" size="24" />
                <Dynamicicon icon="Moon" size="24" />
            </div>
        </div>
    </header>
</template>

<script setup>
import { useData, useRouter } from 'vitepress'
import { ref, onMounted, onUnmounted, inject } from 'vue';
const { site, theme } = useData();
// console.log("site", site, "theme", theme);
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
    if (typeof window !== 'undefined') {
        console.log("goto", link);
        if (isExternalLink(link)) {
            window.open(link);
        } else {
            router.go(link);
        }
    }
};

const handleScroll = () => {
    // 检查滚动距离，并更新 isScrolled 的值
    if (typeof window !== 'undefined') {
        if (window.scrollY > scrollThreshold) {
            isScrolled.value = true;
        } else {
            isScrolled.value = false;
        }
    }
};
onMounted(() => {
    if (typeof window !== 'undefined') {
        window.addEventListener('scroll', handleScroll);
    }
    handleScroll();
});
onUnmounted(() => {
    if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handleScroll);
    }
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
            // background-color: azure;
            padding: var(--spacing-md);
            border-radius: 50px;
            background-color: var(--color-primary-light);
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

            @media (max-width: 768px) {}
        }

        .nav-right {
            display: flex;
            align-items: center;
            justify-content: space-around;
            gap: var(--spacing-sm);

            span {
                // background-color: chartreuse;
            }
        }

        @media (max-width: 960px) {
            // justify-content: space-around;

            .nav-center {
                display: none;
            }
        }
    }
}
</style>