<template>
    <div class="cat">
        <!-- <h2 class="cat-title">Categories</h2> -->
        <div class="cat-title">
            <Dynamicicon icon="Books" size="24" />
            <span>分类</span>
        </div>
        <ul class="cat-list">
            <li v-for="(value, key, index) in categories" :key="index">
                <a :href="`/pages/categories/${key}`" @click="updateParams()" class="cat-item">
                    <span class="cat-name">{{ key }}</span>
                    <span class="cat-count">{{ value.count }}</span>
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
const categories = theme.value.categoriesData;
// console.log("categories::::", theme.value.categoriesData);
</script>

<style lang="scss" scoped>
.cat {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    background-color: var(--color-card-background);
    padding: var(--spacing-lg);
    border-radius: var(--radius-lg);
    gap: var(--spacing-sm);
    box-shadow: var(--box-shadow);

    .cat-title {
        display: flex;
        align-items: center;
        font-size: large;
        font-weight: bold;
    }

    .cat-list {
        width: 100%;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: var(--spacing-xs);

        .cat-item {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-radius: var(--radius-md);

            span {
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .cat-name {
                padding-left: var(--spacing-xs);
                transition: all 0.3s ease;
                height: 30px;
            }

            .cat-count {
                font-size: small;
                background-color: var(--color-primary-light);
                padding: var(--spacing-xs);
                border-radius: var(--radius-md);
                color: var(--color-primary);
                width: 25px;
                height: 25px;
            }

            &:hover {
                background-color: var(--color-primary-light);

                .cat-name {
                    transform: translateX(10px);
                }
            }
        }
    }
}
</style>