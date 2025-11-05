<template>
    <div v-for="(value, index) in headers" :key="index" class="toc-item">
        <a :href="value.link" :class="[`level-${value.level}`, { 'active': isActive(value) }]">{{ value.title }}</a>
        <TocItem v-if="headers[index].children && headers[index].children.length > 0" :headers="headers[index].children"
            :active-hash="activeHash" />
    </div>
</template>

<script setup>
import { onMounted } from 'vue';

const props = defineProps({
    headers: {
        type: Array,
        required: true,
    },
    activeHash: {
        type: Array,
        default: () => [],
        required: false,
    }
});
console.log("子组件的props", props.activeHash);
const isActive = (header) => {
    return props.activeHash.includes(header.slug);
}
onMounted(() => {
})
</script>

<style lang="scss" scoped>
.toc-item {
    display: flex;
    flex-direction: column;
    width: 100%;

    .level-1 {
        width: 100%;
        font-size: 1.05rem;
        font-weight: 600;
        color: var(--color-text-base);
        padding-left: 0px;
        border-left: 5px solid transparent;
    }

    .level-2 {
        width: 100%;
        font-size: 1rem;
        font-weight: 500;
        color: var(--color-text-base);
        padding-left: 15px;
    }

    .level-3 {
        width: 100%;
        font-size: 0.95rem;
        font-weight: 400;
        color: var(--color-text-second);
        padding-left: 30px;
    }

    .active {
        color: var(--color-primary);
        background-color: var(--color-primary-light);
    }
}
</style>