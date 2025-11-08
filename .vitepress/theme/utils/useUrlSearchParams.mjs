import { ref, onMounted, onUnmounted, readonly } from 'vue';

const urlSearchParams = ref(typeof window !== 'undefined'
    ? Number(new URLSearchParams(window.location.search).get('page')) || 1
    : null);
const updateParams = () => {
    // 只有在客户端才执行更新
    if (typeof window !== 'undefined') {
        // 关键步骤：创建一个新的 URLSearchParams 实例来触发 ref 更新
        urlSearchParams.value = Number(new URLSearchParams(window.location.search).get('page')) || 1;
        // console.log('URL 参数已更新 (软刷新效果)', urlSearchParams.value);
    }
};

export default function useUrlSearchParams() {
    onMounted(() => {
        // 监听浏览器的 '后退/前进' 操作
        window.addEventListener('popstate', updateParams);

        // 监听 VitePress/Vue Router 内部导航完成后的事件（可选，但推荐）
        // 注意：VitePress 并没有统一暴露这个事件。
        // 在 VitePress 中，最可靠的触发时机是结合生命周期，或者直接在 Page.vue 监听。

        // 由于没有 route 对象，我们只能依赖 popstate，但对于内部 SPA 导航，你需要手动在导航钩子中调用 updateParams()。
        // 如果你不能访问路由，那么这段代码只在页面硬加载或用户点击浏览器后退/前进时有效。
    });
    onUnmounted(() => {
        if (typeof window !== 'undefined') {
            window.removeEventListener('popstate', updateParams);
        }
    });
    // 暴露只读的 ref 和手动更新函数
    return {
        params: readonly(urlSearchParams),
        updateParams // 暴露给外部，以便在内部导航时手动调用
    };
}