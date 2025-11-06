<template>
    <Icon v-if="iconComponent" :size="props.size" :color="props.color" :tag="props.tag">
        <component :is="iconComponent" />
    </Icon>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Icon } from '@vicons/utils'
import { Books, BrandGithub, BrandTwitter, Calendar, ChevronDown, ChevronsRight, Dots, ExternalLink, Folders, Hash, Home, InfoCircle, Language, Link, Movie, Notebook, Photo, Point, ToggleLeft, ToggleRight, User } from '@vicons/tabler';

const ICON_MAP = {
    'Home': Home,
    'User': User,
    'InfoCircle': InfoCircle,
    'BrandTwitter': BrandTwitter,
    'ChevronDown': ChevronDown,
    'Folders': Folders,
    'Link': Link,
    'ExternalLink': ExternalLink,
    'Dots': Dots,
    'BrandGithub': BrandGithub,
    'ChevronsRight': ChevronsRight,
    'Calendar': Calendar,
    'Books': Books,
    'Hash': Hash,
    'Notebook': Notebook,
    'Movie': Movie,
    'Photo': Photo,
    'Language': Language,
    'Point': Point,
    'ToggleLeft': ToggleLeft,
    'ToggleRight': ToggleRight,
}
type IconName = keyof typeof ICON_MAP;
const props = defineProps<{
    icon: IconName;
    size?: string | number | undefined;
    color?: string;
    tag?: string;
}>()

const iconComponent = ref<any>(null)
watch(
    () => props.icon,
    async (newIcon) => {
        if (newIcon) {
            try {
                iconComponent.value = ICON_MAP[newIcon] || null
                if (!iconComponent.value) {
                    console.error(`Tabler icon "${newIcon}" not found in ICON_MAP. Please add it to Dynamicicon.vue's static import list.`)
                }
            } catch (error) {
                // 這裡現在只會捕獲查找錯誤，不會有導入錯誤
                console.error(`Error processing icon ${newIcon}:`, error)
                iconComponent.value = null
            }
        } else {
            iconComponent.value = null;
        }
    },
    { immediate: true }
)
</script>