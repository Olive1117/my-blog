<script setup>
import Home from '../../.vitepress/theme/views/Home.vue'
import { useData } from 'vitepress'
const { params } = useData()
console.log(params.value)
console.log("正在重定向")
</script>

<!-- <Home :showCategory="params.name" />  -->