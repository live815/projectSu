import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
// import tinifyConfig from './build/plugins/tinify'
import AutoImport from 'unplugin-auto-import/vite'
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const { VITE_APP_BASE_API } = env
  console.log('VITE_APP_BASE_API', VITE_APP_BASE_API)
  const paths = ['/api', '/sports-game', '/sports-live', '/sports-fund', '/oms-system']
  const proxyConfig = {}
  paths.forEach((path) => {
    proxyConfig[path] = {
      target: VITE_APP_BASE_API,
      changeOrigin: true
    }
  })
  return {
    esbuild: {
      // drop: ['console', 'debugger'] // 删除 所有的console 和 debugger
    },
    plugins: [
      vue(),
      Components({
        resolvers: [VantResolver()]
      }),
      // tinifyConfig, //批量压缩图片
      AutoImport({
        imports: ['vue'],
        dts: false,
        eslintrc: {
          enabled: false
        }
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    server: {
      port: 8000,
      host: true,
      open: false,
      secure: false,
      proxy: {
        ...proxyConfig
      }
    },

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./src/assets/styles/mixin.scss";`
        }
      }
    },
    optimizeDeps: {
      include: ['**/*.vue']
    }
  }
})
