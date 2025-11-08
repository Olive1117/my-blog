<template>
    <div class="hello">
        <img :src="theme.siteMeta.author.cover" alt="">
        <span class="name">{{ theme.siteMeta.author.name }}</span>
        <span class="desc">{{ theme.siteMeta.description }}</span>
    </div>
</template>

<script setup>
import { useData } from 'vitepress';
const { theme } = useData();
console.log("站点信息", theme.value.siteMeta);
</script>

<style lang="scss" scoped>
.hello {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    flex-direction: column;
    border-radius: var(--radius-lg);
    padding: var(--spacing-lg);
    background-color: var(--color-card-background);
    gap: var(--spacing-sm);
    box-shadow: var(--box-shadow);

    img {
        width: 100%;
        object-fit: cover;
        transform-origin: center center;
        will-change: transform, filter;
        transition: transform 0.5s ease-out, filter 0.5s ease-out;
        backface-visibility: hidden;
        border-radius: var(--radius-lg);
        border-radius: 50%;
        box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
        &:hover {
        border-radius: 25%;

        }
    }

    .name {
        font-size: 1.5rem;
        font-weight: 500;
        color: var(--color-text-base);
    }

    .desc {
        font-size: 1.2rem;
        color: var(--color-text-secondary);
    }
}
</style>