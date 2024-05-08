import { useUserStore } from '@/stores/user'
import { useAppStore } from '@/stores/app'
import handleRouterAnimation from './handleRouterAnimation'
import { useDepositOrderCheck, useWithdrawOrderCheck } from '@/hooks/usePayment'
import { setLanguageAsync, getDefaultLanguage } from '@/i18n'
import { showToast } from 'vant'
import i18n from '@/i18n/index'
import NProgress from 'nprogress'
NProgress.configure({ showSpinner: false })
export default async (to, from) => {
  NProgress.start()
  // 处理路由切换动效
  handleRouterAnimation(to)
  // 动态加载语言包
  await setLanguageAsync(getDefaultLanguage())
  // 权限控制
  const userStore = useUserStore()

  const isLogin = userStore.isLogin
  if (isLogin) {
    // 已登录状态 访问登录注册页 则跳转首页
    if (to.meta.isLoginedBlackList) {
      return '/'
    }
    // 判断是否拉取了用户信息，没有需要先拉取，再放行进入页面
    const hasUserInfo = userStore.userInfo.userName
    if (!hasUserInfo) {
      await userStore.getUserInfoAction()
    }
    // 处理跳转存款逻辑
    if (to.path === '/deposit') {
      // 单独点击充提的时候去获取用户状态是否解除锁定
      await userStore.getUserInfoAction()
      if (userStore.userInfo.status.includes('2')) {
        return showToast(i18n.global.t('common.depositLocked'))
      }
      const orderNo = to.query.orderNo || ''
      const { hasOrder, data } = await useDepositOrderCheck(orderNo)
      // 已存在订单
      if (hasOrder) {
        // nextTick(() => {
        //   if (data.action == 'jump' || data.action == null) {
        //     webviewBridgeRedirect({ url: data.url })
        //   }
        // })
        return { path: '/rechargeInformation', query: data }
      }
    }
    // 处理跳转提款逻辑
    if (to.path === '/withdraw') {
      // 单独点击充提的时候去获取用户状态是否解除锁定
      await userStore.getUserInfoAction()
      if (userStore.userInfo.status.includes('3')) {
        return showToast(i18n.global.t('common.withdrawlLocked'))
      }
      const orderNo = to.query.orderNo || ''
      const { hasOrder, data } = await useWithdrawOrderCheck(orderNo)
      const encodedOrderData = encodeURIComponent(JSON.stringify(toRaw(data)))
      // 已存在订单
      if (hasOrder) {
        return { path: '/withdrawalInformation', query: { orderData: encodedOrderData } }
      }
    }
  } else {
    // 未登录 访问需要登录权限的页面 则跳转登录页
    if (to.meta.isAuth) {
      const token = new URLSearchParams(window.location.search).get('token')
      if (!token) return `/login?redirect=${to.fullPath}&from=${from.fullPath}`
    }
  }
}

async function getMaintainInfo() {
  const appStore = useAppStore()
  await appStore.getMaintainInfo()
  return appStore.getMaintainStatus
}
