<template>
    <button >
        <slot></slot>
    </button>
</template>

<script setup>
const attrs = useAttrs()

async function handleClick() {
    
    try {
        console.log('clicked')
        await attrs.onClick()?.()        
    }finally {
        console.log('finally')
    }
}
</script>