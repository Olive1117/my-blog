<template>
    <!-- <h1>文章列表</h1> -->
    <TransitionGroup name="list-slide" tag="div" appear class="post-list">
        <div v-for="(item, key, index) in listData" :key="item.regularPath" @click="router.go(item.regularPath)"
            class="post-item">
            <div v-if="item.img" class="post-cover">
                <img v-if="item.img" :src="item?.img" :alt="item.title" class="post-img">
            </div>
            <div :class="['post-content', { 'has-img': item.img }]">
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
                                <a :href="`/pages/categories/${cat}`" @click.stop="updateParams()" class="post-category">
                                    {{ cat }}</a>
                            </span>
                        </div>
                    </div>
                    <div class="info">
                        <Dynamicicon icon="Hash" class="icon" />
                        <div class="list">
                            <span v-for="(value, index) in item?.tags" class="list">
                                <a :href="`/pages/tags/${value}`" @click.stop="updateParams()" class="post-tag">{{ value }}</a>
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
    </TransitionGroup>
</template>

<script setup>
import { useData, useRouter } from 'vitepress';
import { formatDate } from '../utils/timeTools.mjs';
import useUrlSearchParams from '../utils/useUrlSearchParams.mjs';
const { theme } = useData();
const router = useRouter();
const { params, updateParams } = useUrlSearchParams();
const props = defineProps({
    listData: {
        type: [Array, String],
        default: () => [],
        required: false,
    },
});
</script>

<style lang="scss" scoped>
.post-list {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: var(--spacing-xl);
    // padding: 30px 0;

    .post-item {
        position: relative;
        display: flex;
        flex-direction: row;
        flex-direction: row-reverse;
        align-items: stretch;
        gap: var(--spacing-lg);
        // min-height: 100px;
        // height: 256px;
        padding: var(--spacing-md);
        transition: 0.3s ease;
        background-color: var(--color-card-background);
        border: 3px solid var(--color-card-border);
        border-radius: var(--radius-lg);
        box-shadow: var(--box-shadow);
        // animation: fade-up 0.6s 0s backwards;

        &:hover {
            border-color: var(--color-primary);
        }

        .post-cover {
            position: absolute;
            top: 0;
            right: 0;
            transform: translateZ(0);
            padding: var(--spacing-xs);
            width: 300px;
            height: 100%;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transform-origin: center center;
                will-change: transform, filter;
                transition: transform 0.5s ease-out, filter 0.5s ease-out;
                backface-visibility: hidden;
                border-radius: var(--radius-lg);
            }
        }

        .post-content {
            // flex: 1 1 75%;
            min-width: 0;
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: var(--spacing-sm);
            padding: var(--spacing-md);


            .post-title {
                // flex: 1;
                // display: -webkit-box;
                // overflow: hidden;
                // word-break: break-all;
                // -webkit-box-orient: vertical;
                // -webkit-line-clamp: 2;
                font: var(--title);
            }

            .post-type {
                // height: 30px;
                flex-wrap: wrap;
                height: auto;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: flex-start;
                gap: var(--spacing-sm);
                font: var(--type);
                white-space: nowrap;
                // overflow: hidden;
                // text-overflow: ellipsis;
                // mask: linear-gradient(90deg,
                //         #fff 0,
                //         #fff 90%,
                //         hsla(0, 0%, 100%, 0.6) 95%,
                //         hsla(0, 0%, 100%, 0) 100%);

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

                    // .post-date {
                    //     white-space: nowrap;
                    // }

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
                // flex: 1;
                // background-color: rgb(229, 255, 196);
                // display: -webkit-box;
                // overflow: hidden;
                // word-break: break-all;
                // -webkit-box-orient: vertical;
                // -webkit-line-clamp: 2;
                font: var(--desc);
            }

            &.has-img {
                padding-right: 300px;
            }
        }

        @media (max-width: 1080px) {
            .post-cover {
                width: 150px;
            }

            .post-content.has-img {
                padding-right: 150px;
            }
        }

        // @media (max-width: 960 768px)
        @media (max-width: 960px) {
            flex-direction: column-reverse;
            align-items: flex-start;
            justify-content: flex-start;
            gap: var(--spacing-xs);
            // max-height: none;
            max-height: 500px;

            // .post-content {
            //     margin-right: 0;
            // }
            .post-content.has-img {
                padding-right: 0;
                padding-bottom: 200px;
            }

            .post-cover {
                position: absolute;
                top: auto;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 200px;

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
        }

        &.list-slide-enter-active {
            transition: all 0.5s cubic-bezier(0.5, 0, 0.5, 1);
            /* 自定义缓动函数，让动画更自然 */
        }

        &.list-slide-leave-active {
            transition: all 0s cubic-bezier(0.5, 0, 0.5, 1);
        }

        /* 元素进入的起始状态：从右侧（例如 100px）滑入，并透明 */
        &.list-slide-enter-from {
            opacity: 0;
            transform: translateY(20px);
        }

        // &.list-slide-move {
        //     transition: all 0.5s cubic-bezier(0.5, 0, 0.5, 1);
        // }
    }
}
</style>