<template>
    <el-button :loading="loading" @click="handleClick">I am ElButton
        <slot></slot>
    </el-button>
</template>

<script setup>
import { ElButton } from 'element-plus'
import { useAttrs } from 'vue'
const attrs = useAttrs()

async function handleClick() {
    loading.value = true
    try {
        console.log('clicked')
        await attrs.onClick?.()        
    }finally {
        loading.value = false
    }
}
</script>