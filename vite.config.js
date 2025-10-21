import { defineConfig } from 'vite';

export default defineConfig({
  // VitePress 項目需要配置 @vitejs/plugin-vue
  // 但由於 VitePress 已經內置了這個插件，通常只需要添加以下 Sass 配置
  css: {
    preprocessorOptions: {
      sass: {
        // 解決 'legacy-js-api' 警告的核心配置
        // 告诉 Dart Sass 使用现代的（新的）JavaScript API
        api: 'modern-compiler', 
      },
      scss: {
        // 如果您使用 SCSS 格式 (更常見)，也要添加相同的配置
        api: 'modern-compiler',
      },
    },
  },
});
