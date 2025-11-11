<template>
    <IconComponent v-if="IconComponent" :size="props.size" :color="props.color" :tag="props.tag">
        <component :is="iconComponent" />
    </IconComponent>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, markRaw } from 'vue'
// import { Icon } from '@vicons/utils'
import { ArrowBigTop, Books, BrandGithub, BrandTwitter, Calendar, ChevronDown, ChevronsRight, ColorSwatch, Dots, ExternalLink, Folders, Hash, Home, InfoCircle, Language, Link, Moon, Movie, Notebook, Palette, Photo, Point, Search, Sun, ToggleLeft, ToggleRight, User } from '@vicons/tabler';

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
    'Moon': Moon,
    'sun': Sun,
    'Search': Search,
    'ColorSwatch': ColorSwatch,
    'Palette': Palette,
    'ArrowBigTop': ArrowBigTop,
}
type IconName = keyof typeof ICON_MAP;
const props = defineProps<{
    icon: IconName;
    size?: string | number | undefined;
    color?: string;
    tag?: string;
}>()

let iconComponent = null;
watch(
    () => props.icon,
    async (newIcon) => {
        if (newIcon) {
            try {
                iconComponent = ICON_MAP[newIcon] || null
                if (!iconComponent) {
                    console.error(`Tabler icon "${newIcon}" not found in ICON_MAP. Please add it to Dynamicicon.vue's static import list.`)
                }
            } catch (error) {
                // 這裡現在只會捕獲查找錯誤，不會有導入錯誤
                console.error(`Error processing icon ${newIcon}:`, error)
                iconComponent = null
            }
        } else {
            iconComponent = null;
        }
    },
    { immediate: true }
)

const IconComponent = ref(null);
onMounted(async () => {
    // 确保只在浏览器环境执行导入
    if (typeof window !== 'undefined') {
        const { Icon } = await import('@vicons/utils');
        IconComponent.value = markRaw(Icon);
    }
})
</script>