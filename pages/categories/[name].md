<script setup>
import { useData } from 'vitepress'
import Home from '../../.vitepress/theme/views/Home.vue'
const { params } = useData()
// console.log(params.value.name)
console.log("正在重定向")
</script>

<Home :showCategory="params.name" /> 