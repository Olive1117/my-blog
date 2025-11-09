<template>
    <div class="tags">
        <!-- <h3 class="tags-title">标签</h3> -->
        <div class="tags-title">
            <Dynamicicon icon="Hash" size="24" />
            <span>标签</span>
        </div>
        <ul class="tags-list">
            <li v-for="(value, key, index) in tags" :key="index">
                <a :href="`/pages/tags/${key}`" @click="updateParams()" class="tags-item">
                    <span class="tags-name">
                        {{ key }}
                        <sup class="tags-count">{{ value.count }}</sup>
                    </span>
                </a>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { useData } from 'vitepress'
import useUrlSearchParams from '../../../utils/useUrlSearchParams.mjs';
const { params, updateParams } = useUrlSearchParams();
const { theme } = useData();
const tags = theme.value.tagsData;
// console.log("tag::::", theme.value.tagsData);
</script>

<style lang="scss" scoped>
.tags {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    background-color: var(--color-card-background);
    padding: var(--spacing-lg);
    border-radius: var(--radius-lg);
    gap: var(--spacing-sm);
    box-shadow: var(--box-shadow);

    .tags-title {
        display: flex;
        align-items: center;
        font-size: large;
        font-weight: bold;
    }

    .tags-list {
        width: 100%;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: var(--spacing-xs);

        .tags-item {
            width: 100%;
            display: flex;
            align-items: center;
            padding: var(--spacing-xs);
            border-radius: var(--radius-md);
            color: var(--color-text-base);

            .tags-name {}

            .tags-count {
                font-size: xx-small;
                color: var(--color-text-second);
            }

            &:hover {
                background-color: var(--color-primary-light);
                color: var(--color-primary);
            }
        }
    }
}
</style>