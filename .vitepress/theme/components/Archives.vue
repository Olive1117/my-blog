<template>
    <div class="archives">
        <!-- <h1 class="page-title">📅 文章归档</h1> -->
        <div class="line">
            <div class="lineline"></div>
        </div>
        <div v-for="year in sortedYears" :key="year" class="year-group">
            <div class="year">
                <h2 class="year-title">{{ year }}</h2>
                <div class="year-dot"></div>
            </div>
            <div v-for="monthGroup in groupedPosts[year]" :key="monthGroup.month" class="month-group">
                <div class="month">
                    <h3 class="month-title">
                        {{ monthMap[monthGroup.month] }}
                    </h3>
                    <div class="month-dot"></div>
                </div>
                <ul class="post-list">
                    <li v-for="post in monthGroup.posts" :key="post.id" class="post-item">
                        <span class="post-date">
                            {{ formatDate(post.date, 'MM-DD') }}
                        </span>
                        <div class="post-dot"></div>
                        <a :href="post.regularPath" class="post-link">
                            <span class="post-title">
                                {{ post.title }}
                            </span>
                            <span class="post-tags">
                                <span v-for="value in post.tags" class="tag">
                                    #{{ value }}
                                </span>
                            </span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useData } from 'vitepress';
import { formatDate } from '../utils/timeTools.mjs';

const { theme } = useData();
const monthMap = {
    '01': '一月', '02': '二月', '03': '三月', '04': '四月',
    '05': '五月', '06': '六月', '07': '七月', '08': '八月',
    '09': '九月', '10': '十月', '11': '十一月', '12': '十二月',
};

// 核心计算属性：将扁平文章列表转换为按年/月分组的结构
const groupedPosts = computed(() => {
    // 假设 theme.value.postData 已经存在且是包含所有文章的数组
    const allPosts = theme.value.postData || [];

    // 1. **排序**: 确保按日期降序 (最新在前)
    // const sortedPosts = [...allPosts].sort((a, b) => {
    //     // 您的 date 字段是时间戳，可以直接比较
    //     return b.date - a.date;
    // });

    // 2. **分组**: 转换为按年/月分组的对象
    const groups = {};

    allPosts.forEach(post => {
        // 提取年份 (YYYY) 和月份 (MM)
        const year = formatDate(post.date, 'YYYY');
        const month = formatDate(post.date, 'MM');

        if (!groups[year]) {
            groups[year] = [];
        }

        let monthGroup = groups[year].find(g => g.month === month);

        if (!monthGroup) {
            monthGroup = { month, posts: [] };
            groups[year].push(monthGroup);
        }

        monthGroup.posts.push(post);
    });

    // 3. **二次排序 (月份)**: 确保同一年的月份也是倒序 (最新在前)
    // 注意：groups[year] 是一个数组，需要对其进行排序
    for (const year in groups) {
        groups[year].sort((a, b) => b.month.localeCompare(a.month));
    }
    console.log(groups);
    return groups;
});

// 获取年份列表并降序排列 (用于外层循环)
const sortedYears = computed(() => {
    return Object.keys(groupedPosts.value).sort((a, b) => b.localeCompare(a));
});
</script>

<style lang="scss" scoped>
.archives {
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: var(--color-card-background);
    padding: var(--spacing-md);
    border-radius: var(--radius-lg);
    box-shadow: var(--box-shadow);
    text-align: right;
    gap: var(--spacing-md);

    .line {
        position: absolute;
        top: var(--spacing-md);
        left: var(--spacing-md);
        width: calc(100% - var(--spacing-md)*2);
        height: calc(100% - var(--spacing-md)*2);
        pointer-events: none;
        // margin: var(--spacing-md);

        // background-color: aqua;
        .lineline {
            position: absolute;
            // 15% 是 .year-title/.month-title/.post-date 的寬度
            // 15% + (5% / 2) = 17.5% 讓線穿過圓點中心
            left: calc(15% + 2.5%);
            top: calc(1.1em);
            height: calc(100% - 2rem);
            transform: translateX(-50%);
            border-left: 2px dashed var(--color-text-second);
            /* 線的顏色 */
            z-index: 0;
        }
    }

    .year-group {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sm);
        width: 100%;

        .year {
            display: flex;
            justify-content: start;

            .year-title {
                display: inline-block;
                width: 15%;
            }

            .year-dot {
                position: relative;
                display: inline;
                width: 5%;

                &::after {
                    content: "";
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 5px;
                    height: 5px;
                    border-radius: 50%;
                    background-color: var(--color-card-background);
                    /* 改為中空 */
                    border: 4px solid var(--color-primary);
                }
            }
        }

        .month-group {
            display: flex;
            flex-direction: column;
            gap: var(--spacing-xs);
            width: 100%;

            .month {
                display: flex;
                justify-content: start;

                .month-title {
                    width: 15%;
                    // text-align: center;
                    font-size: var(--font-size-lg);
                    font-weight: var(--font-weight-bold);
                }

                .month-dot {
                    position: relative;
                    display: inline;
                    width: 5%;

                    &::after {
                        content: "";
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        width: 5px;
                        height: 5px;
                        border-radius: 50%;
                        background-color: var(--color-primary);
                        border: 2px solid var(--color-primary);
                    }
                }
            }

            .post-list {
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;

                .post-item {
                    display: flex;
                    width: 100%;
                    border-radius: var(--radius-md);
                    transition: all 0.3s ease;
                    padding: var(--spacing-xs) 0;

                    .post-date {
                        display: flex;
                        align-items: center;
                        justify-content: end;
                        width: 15%;
                        font-size: 0.8rem;
                        color: var(--color-text-second);
                    }

                    .post-dot {
                        position: relative;
                        width: 5%;

                        &::after {
                            content: "";
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            width: 5px;
                            height: 5px;
                            border-radius: 2.5px;
                            background-color: var(--color-primary);
                            transition: all 0.5s ease;
                        }
                    }

                    .post-link {
                        // padding-left: 5%;
                        display: flex;
                        width: 80%;
                        font-size: var(--font-size-md);
                        font-weight: var(--font-weight-bold);
                        color: var(--color-text-base);
                        text-decoration: none;
                        text-align: left;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;

                        .post-title {
                            display: flex;
                            align-items: center;
                            width: 70%;
                            font-size: 1.1rem;
                            color: var(--color-text-base);
                            transition: all 0.3s ease;
                        }

                        .post-tags {
                            width: 30%;
                            flex-wrap: wrap;
                            display: flex;
                            flex-direction: row;
                            flex-wrap: nowrap;
                            gap: var(--spacing-xs);

                            .tag {
                                font-size: 0.9rem;
                                display: flex;
                                align-items: center;
                                color: var(--color-text-second);
                            }

                        }
                    }

                    &:hover {
                        background-color: var(--color-primary-light);

                        .post-dot::after {
                            height: 20px;
                        }

                        .post-link {
                            .post-title {
                                transform: translateX(10px);
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>