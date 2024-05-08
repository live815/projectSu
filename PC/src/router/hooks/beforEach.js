import { useUserStore } from '@/stores/user'
import NProgress from "nprogress";


NProgress.configure({ showSpinner: false });
export default async (to) => {
  NProgress.start();
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
  } else {
    // 未登录 访问需要登录权限的页面 则跳转登录页
    if (to.meta.requiresAuth) {
      userStore.setLoginDialogAction({
        isShowLoginDialog: true,
        currentPage: 'login'
      })
      return '/'
    }
  }
}
