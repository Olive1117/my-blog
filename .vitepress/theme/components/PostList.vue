<template>
    <!-- <h1>文章列表</h1> -->
    <div class="post-list">

        <div v-for="(item, key, index) in listData" :key="index" @click="router.go(item.regularPath)" class="post-item">

            <div v-if="item.img" class="post-cover">
                <img v-if="item.img" :src="item?.img" :alt="item.title" class="post-img">
            </div>

            <div class="post-content">
                <span class="post-title">{{ item.title }}</span>
                <div class="post-type">
                    <div class="info">
                        <Dynamicicon icon="Calendar" class="icon" />
                        <span class="post-date">{{ formatDate(item.date, "YYYY-MM-DD") }}</span>
                    </div>

                    <div class="info">
                        <Dynamicicon icon="Books" class="icon" />
                        <div class="list">
                            <span v-for="cat in item?.categories" class="list">
                                <a :href="`pages/categories/${cat}`" @click.stop.prevent="router.go(`pages/categories/${cat}`)" class="post-category">{{ cat }}</a>
                            </span>
                        </div>
                    </div>
                    <div class="info">
                        <Dynamicicon icon="Hash" class="icon" />
                        <div class="list">
                            <span v-for="(value, index) in item?.tags" class="list">
                                <a href="#" @click.stop="" class="post-tag">{{ value }}</a>
                                <span v-if="index < item?.tags.length - 1">/</span>
                            </span>
                        </div>

                    </div>

                </div>
                <span class="post-desc">{{ item.description }}</span>
                <!-- <div class="post-meta">
                    <span v-for="(value, key, index) in item?.tags" class="post-tag">
                        <i>#</i>
                        {{ value }}
                    </span>
                    <span class="post-date">{{ formatDate(item.date, "YYYY-MM-DD") }}</span>
                </div> -->
            </div>
        </div>

    </div>
</template>

<script setup>
// import { ref } from 'vue';
// const source = ref({
//     "0001": {
//         title: "Hello VitePress",
//         date: "2022-01-01",
//         author: "admin",
//         excerpt: "这是我的第一篇文章",
//         type: "article",
//         tags: ["VitePress", "Vue"]
//     },
//     "0002": {
//         title: "VitePress,为了足够长,测试一下能否换行喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵",
//         date: "2022-01-01",
//         author: "admin",
//         excerpt: "这是我的第二篇文章,为了足够长,测试一下能否换行喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵",
//         type: "article",
//         tags: ["VitePress", "Vue", "Vue", "Vue", "Vue", "Vue", "Vue", "Vue", "Vue", "Vue", "Vue", "Vue"]
//     }
// });
import { useData, useRouter } from 'vitepress';
import { formatDate } from '../utils/timeTools.mjs';
const { theme } = useData();
const router = useRouter();
const props = defineProps({
    listData: {
        type: [Array, String],
        default: () => [],
    },
});
// console.log("props.listData:::", props.listData);
</script>

<style lang="scss" scoped>
.post-list {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: var(--spacing-xl);
    padding: 30px 0;

    .post-item {
        display: flex;
        flex-direction: row;
        flex-direction: row-reverse;
        gap: var(--spacing-lg);
        height: 200px;
        padding: var(--spacing-md);
        transition: 0.3s ease;
        background-color: var(--color-card-background);
        border: 3px solid var(--color-card-border);
        border-radius: var(--radius-lg);

        &:hover {
            border-color: var(--color-primary);
        }

        .post-cover {
            flex: 0 0 25%;
            overflow: hidden;
            transform: translateZ(0);
            border-radius: var(--radius-lg);

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transform-origin: center center;
                will-change: transform, filter;
                transition: transform 0.5s ease-out, filter 0.5s ease-out;
                backface-visibility: hidden;
            }
        }

        .post-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: var(--spacing-sm);
            padding: var(--spacing-md);

            .post-title {
                flex: 1;
                display: -webkit-box;
                overflow: hidden;
                word-break: break-all;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                font: var(--title);
            }

            .post-type {
                height: 30px;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: flex-start;
                gap: var(--spacing-sm);
                font: var(--type);
                white-space: nowrap;

                .list {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .info {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: var(--spacing-xs);

                    .icon {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: var(--radius-md);
                        width: 30px;
                        height: 30px;
                        background-color: var(--color-primary-light);
                        color: var(--color-primary);
                    }

                    .post-date {
                        white-space: nowrap;
                    }

                    .post-category {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 30px;
                        padding: 0 var(--spacing-sm);
                        gap: var(--radius-sm);
                        border-radius: var(--radius-md);

                        &:hover {
                            background-color: var(--color-primary-light);
                            color: var(--color-primary);
                        }
                    }

                    .post-tag {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        // background-color: bisque;
                        height: 30px;
                        padding: 0 var(--spacing-sm);
                        border-radius: var(--radius-md);

                        &:hover {
                            background-color: var(--color-primary-light);
                            color: var(--color-primary);
                        }

                        // &::after {
                        //     content: '/';
                        // }

                        // &:last-child::after {
                        //     content: '';
                        // }
                    }
                }
            }

            .post-desc {
                flex: 1;
                // background-color: rgb(229, 255, 196);
                display: -webkit-box;
                overflow: hidden;
                word-break: break-all;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                font: var(--desc);
            }

            // .post-meta {
            //     display: flex;
            //     flex-direction: row;
            //     align-items: center;
            //     justify-content: flex-start;
            //     gap: 10px;
            //     flex-wrap: wrap;
            //     background-color: rgb(196, 255, 226);
            // }
        }
    }
}
</style>