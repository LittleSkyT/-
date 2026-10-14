import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 相对路径：构建产物可放在任意子目录，也能直接双击 dist/index.html 打开
  base: './',
  server: {
    host: true,
    port: 5173,
    open: false,
    // 允许通过隧道 / 外部域名访问（否则 Vite 会拦截非本机的 Host 头）
    allowedHosts: true,
    watch: {
      // Windows 下避免原子写入（临时文件 + 重命名）触发 EBUSY 崩溃
      usePolling: true,
      interval: 300,
    },
  },
  preview: {
    host: true,
    port: 4173,
    // 允许通过隧道 / 外部域名访问
    allowedHosts: true,
  },
})
