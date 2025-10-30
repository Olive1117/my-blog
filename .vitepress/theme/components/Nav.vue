<template>
    <header class="main-header">
        <div class="main-nav">
            <div class="nav-left">
                <a href="/" class="logo">{{ site.title }}</a>
            </div>
            <div class="nav-center">
                <div
                    v-for="(value, index) in theme.nav"
                    :key="index"
                    class="menu-item"
                >
                    <span @click="!value.items ? '' : ''" class="link-btn">{{ value.text }}</span>
                    <div v-if="value.items" class="link-child">
                        <span
                            v-for="(child, childIndex) in value.items" 
                            :key="childIndex"
                            class="link-child-btn"
                        >
                            {{ child.text }}
                        </span>
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
import { useData } from 'vitepress'
const { site, theme } = useData();
console.log("site",site,"theme", theme)
</script>

<style lang="scss" scoped>
.main-header {
    position: sticky;
    top: 0;
    background-color: aliceblue;
    height: 60px;
    z-index: 999;
    white-space: nowrap;
    .main-nav {
        background-color: rgba(137, 43, 226, 0.61);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 10px;
        height: 100%;
        margin: 0 auto;
        .nav-left {
            // flex: 0.2;
            background-color: azure;
        }
        .nav-center {
            // flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-around;
            background-color: aqua;
            gap: 10px;
            .menu-item {
                position: relative;
                background-color: chartreuse;
                .link-child {
                    position: absolute;
                    top: 100%;
                    background-color: rgba(210, 105, 30, 0.616);
                    flex-direction: column;
                    gap: 5px;
                    display: none;
                }
                &:hover .link-child {
                    display: flex;
                }
            }
        }
        .nav-right {
            // flex: 0.3;
            display: flex;
            align-items: center;
            justify-content: space-around;
            gap: 10px;
            background-color: rgb(75, 93, 255);
        }
    }
}
</style>