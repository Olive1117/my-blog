<template>
    <!-- <h1>文章列表</h1> -->
    <div class="post-list">

        <div 
            v-for="(item, key, index) in theme.postData"
            :key="index"
            class="post-item"
        >
            <div v-if="item?.img" class="post-img">图片</div>
            <div class="post-content">
                <div class="post-category">
                    <span v-for="cat in item?.categories" class="post-type">
                        <i>图标</i>
                        {{ cat }}
                    </span>
                </div>
                <span class="post-title">{{ item.title }}</span>
                <span class="post-desc">{{ item.description }}</span>
                <div class="post-meta">
                    <span v-for="(value, key, index) in item?.tags" class="post-tag">
                        <i>#</i>
                        {{ value }}
                    </span>
                    <span class="post-date">{{ formatDate(item.date, YYYY-MM-DD) }}</span>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue';
const source = ref({
    "0001": {
        title: "Hello VitePress",
        date: "2022-01-01",
        author: "admin",
        excerpt: "这是我的第一篇文章",
        type: "article",
        tags: ["VitePress", "Vue"]
    },
    "0002": {
        title: "VitePress,为了足够长,测试一下能否换行喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵",
        date: "2022-01-01",
        author: "admin",
        excerpt: "这是我的第二篇文章,为了足够长,测试一下能否换行喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵",
        type: "article",
        tags: ["VitePress", "Vue", "Vue", "Vue", "Vue", "Vue", "Vue", "Vue", "Vue", "Vue", "Vue", "Vue"]
    }
});
import { useData } from 'vitepress';
import { formatDate } from '../utils/timeTools.mjs';
const { theme } = useData();
</script>

<style lang="scss" scoped>
.post-list {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 20px;
    padding: 20px 0;
    background-color: aliceblue;
    .post-item {
        display: flex;
        // justify-content: space-between;
        flex-direction: row;
        flex-direction: row-reverse;
        align-items: stretch;
        gap: 10px;
        height: 200px;
        padding: 20px;
        background-color: cadetblue;
        .post-img {
            flex: 0 0 25%;
            // position: relative;
            // height: 100%;
            // width: 0;
            // padding-bottom: 56.25%;
            // aspect-ratio: 1 / 1;
            background-color: yellow;
            // flex-shrink: 0;
        }
        .post-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            // align-items: stretch;
            // height: 100%;
            .post-category {
                background-color: bisque;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: flex-start;
                gap: 5px;
            }
            .post-title {
                background-color: rgb(255, 254, 196);
                // line-height: 30px;
                display: -webkit-box;
                overflow: hidden;
                word-break: break-all;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
            }
            .post-desc {
                background-color: rgb(229, 255, 196);
                // line-height: 30px;
                display: -webkit-box;
                overflow: hidden;
                word-break: break-all;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
            }
            .post-meta {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: flex-start;
                gap: 10px;
                flex-wrap: wrap;
                background-color: rgb(196, 255, 226);
                .post-tag {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 5px;
                    background-color: rgb(166, 255, 255);
                }
                .post-date {
                    white-space: nowrap;
                    margin-left: auto;
                }
            }
        }
    }
}
</style>