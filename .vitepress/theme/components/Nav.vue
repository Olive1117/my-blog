<template>
    <header class="main-header">
        <a href="/" class="logo">Olive</a>

        <nav class="menu">
            <a href="/">首页</a>
            <a href="/markdown-examples.html">Markdown Examples</a>
            <a href="/api-examples.html">API Examples</a>
        </nav>
    </header>
</template>

<style scoped>
.main-header {
    position: sticky;
    top: 0;
    background-color: aliceblue;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 10vh;
    z-index: 10000;
}

.logo,
.menu {
    padding: 0 20px;
    background-color: aquamarine;
}
.menu {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
}
a {
    background-color: bisque;
}
</style>