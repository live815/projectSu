// 导入全局样式
import './assets/styles/index.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './app/App.vue'
import router from './router'
import registerDirectives from '@/directives/registerDirectives'
import '@/utils/plugin' // 载入插件
import i18n from './i18n'
import { setLanguageAsync, getDefaultLanguage } from '@/i18n'
import VueLazyload from 'vue-lazyload'
const pinia = createPinia()
const app = createApp(App)
// 注册全局指令
registerDirectives(app)
// 注册状态管理器pinia
app.use(pinia)
// 注册路由
app.use(router)
// 国际化
app.use(i18n)
// 先载入语言，再挂载dom
const lang = getDefaultLanguage()
app.use(VueLazyload)
setLanguageAsync(lang).then(() => {
  app.mount('#app')
})
export default app
