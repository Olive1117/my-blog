<template>
    <div v-for="(value, index) in headers" :key="index" class="toc-item">
        <a :href="value.link" :class="[`level-${value.level}`]">{{ value.title }}</a>
        <TocItem v-if="headers[0].children && headers[0].children.length > 0" :headers="headers[0].children" />
    </div>
</template>

<script setup>
const props = defineProps({
    headers: {
        type: Array,
        required: [],
    },
});
</script>

<style lang="scss" scoped>


</style>