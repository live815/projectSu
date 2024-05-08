// 导入vant弹框样式
import 'vant/es/toast/style'
import 'vant/es/dialog/style'
import 'vant/es/notify/style';
// 导入全局样式
import './assets/styles/index.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './app/App.vue'
import router from './router'
import registerComponents from '@/utils/registerComponents'
import registerDirectives from '@/directives/registerDirectives'
import '@/utils/plugin' // 载入插件
import i18n from './i18n'

const pinia = createPinia()
const app = createApp(App)
// 注册全局组件
registerComponents(app)
// 注册全局指令
registerDirectives(app)
// 注册状态管理器pinia
app.use(pinia)
// 注册路由
app.use(router)
// 国际化
app.use(i18n)
app.mount('#app')
const ua = navigator.userAgent.toLowerCase()
console.log('ua',ua)
