<template>
    <header class="main-header">
        <div :class="['main-nav', { 'scrolled': isScrolled }]">
            <div class="nav-left">
                <a href="/" @click.prevent="updateParams" class="logo">回到首页</a>
            </div>
            <div :class="['nav-center', { 'title-show': isTitleShow }]">
                <div class="site-menu">
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
                <div class="site-title" @click="goTop">
                    <span>{{ frontmatter.title || '回到顶部' }}</span>
                </div>
            </div>
            <div class="nav-right">
                <Dynamicicon icon="Search" size="24" />
                <Dynamicicon icon="Language" size="24" />
                <Dynamicicon icon="Palette" size="24" />
                <Dynamicicon icon="Moon" size="24" />
            </div>
        </div>
    </header>
    <teleport to="body">
        <div :class="['gotop-btn', { 'show': isScrolled }]">
            <button @click="goTop">
                <Dynamicicon icon="ArrowBigTop" size="24" />
            </button>
        </div>
    </teleport>
</template>

<script setup>
import { useData, useRouter } from 'vitepress'
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { throttle } from '../utils/commonTools.mjs'
import useUrlSearchParams from '../utils/useUrlSearchParams.mjs';
const { site, theme, frontmatter } = useData();
// console.log("site", site, "theme", theme);
const router = useRouter();
// 判断距离多少显示标题背景
const isScrolled = ref(false);
const scrollThreshold = 10;
// 记录用户是否向下滚动
const isTitleShow = ref(false);
const lastScrollY = ref(0);
const { params, updateParams } = useUrlSearchParams();
const goTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    isTitleShow.value = false;
};
console.log("frontmatter", frontmatter.value, "site", site.value);
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
    isScrolled.value = window.scrollY > scrollThreshold;
};
const handleTitleShow = () => {
    isTitleShow.value = lastScrollY.value < window.scrollY;
    lastScrollY.value = window.scrollY;
};
const newhandleScroll = throttle(handleScroll, 100);
const newhandleTitleShow = throttle(handleTitleShow, 100);
onMounted(() => {
    window.addEventListener('scroll', () => { newhandleScroll(); newhandleTitleShow(); });
    newhandleScroll();
});
onUnmounted(() => {
    window.removeEventListener('scroll', () => { newhandleScroll(); newhandleTitleShow(); });
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
        border-radius: 0 0 var(--radius-md) var(--radius-md);
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
            position: relative;
            flex-grow: 1;
            height: 100%;
            // mask: linear-gradient(0,
            //         hsla(0, 0%, 100%, 0) 5%,
            //         hsla(0, 0%, 100%, 0.7) 20%,
            //         #fff 30%,
            //         #fff 70%,
            //         hsla(0, 0%, 100%, 0.7) 80%,
            //         hsla(0, 0%, 100%, 0) 95%,);

            .site-menu {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                display: flex;
                align-items: center;
                justify-content: space-around;
                gap: var(--spacing-sm);
                transition: all 0.3s ease-out;

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

                        .link-child {
                            display: flex;
                        }

                        .ChevronDown {
                            transform: rotate(180deg);
                        }

                        .link-child {
                            animation: fade-down 0.3s ease forwards;
                        }
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

            .site-title {
                // display: none;
                position: absolute;
                display: flex;
                align-items: center;
                height: 100%;
                top: 80%;
                left: 50%;
                transform: translate(-50%, -50%);
                opacity: 0;
                font-size: larger;
                font-weight: bold;
                visibility: hidden;
                transition: all 0.3s ease-out;
            }

            &.title-show {
                .site-title {
                    top: 50%;
                    opacity: 1;
                    visibility: visible;

                    &:hover {
                        cursor: pointer;
                    }
                }

                .site-menu {
                    top: 0;
                    opacity: 0;
                    visibility: hidden;
                }
            }
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
                .site-menu {
                    display: none;
                }

                .site-title {
                    top: 50%;
                    opacity: 1;
                    visibility: visible;
                }
            }
        }

        @media (max-width: 576px) {
            border-radius: 0;
        }
    }
}

.gotop-btn {
    position: fixed;
    right: 0;
    transform: translateX(100%);
    top: 80%;
    transition: all 0.3s ease-out;
    button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 45px;
        height: 40px;
        border: 0;
        border-radius: 10px 0 0 10px;
        background-color: var(--color-primary-light);
        color: var(--color-primary);
        transition: all 0.3s ease-out;

        &:hover {
            background-color: var(--color-primary);
            color: var(--color-primary-light);
        }
    }

    &.show {
        transform: translateX(0);
    }
}
</style>