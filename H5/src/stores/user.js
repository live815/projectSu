import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getToken, setToken, removeToken, getInviteCode } from '@/utils/cache'
import { toFormatNumber } from '@/utils'
import { delDailyFlag } from '@/utils/dailyFlag'
import {
  login,
  getUserInfo,
  phoneLogin,
  register,
  getLogout,
  phoneRegister,
  getBalance,
  getCollect,
} from '@/api/user'
import { ERR_OK } from '@/utils/config'
import router from '@/router'
import { useFBStore } from './fb'
export const useUserStore = defineStore('user', () => {
  const token = ref(getToken())
  const isLogin = computed(() => (token.value ? true : false))
  let userInfo = ref({})
  const balance = ref(0)
  // 用户名登录
  const loginAction = (data) => {
    return new Promise((resolve, reject) => {
      login(data)
        .then((res) => {
          if (res.code === ERR_OK) {
            token.value = setToken(res.data.accessToken)
            delDailyFlag()

            const { fullPath } = router.currentRoute.value
            const needRedirect = fullPath.includes('/login?redirect=')
            router.push(needRedirect ? fullPath.replace('/login?redirect=', '') : '/')
            resolve(res)
          } else {
            reject(res.msg)
          }
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  // 手机号登录
  const phoneLoginAction = async (data) => {
    try {
      const res = await phoneLogin(data)
      if (res.code === ERR_OK) {
        token.value = setToken(res.data.accessToken)
        router.push(router.currentRoute.value.query.redirect || '/')
      }
    } catch (e) {
      console.log(e.message)
    }
  }
  // 用户注册
  const registerAction = async (data) => {
    try {
      const res = await register(data)
      if (res.code === ERR_OK) {
        token.value = setToken(res.data.accessToken)
        router.push(router.currentRoute.value.query.redirect || '/')
      }
    } catch (e) {
      console.log(e.message)
    }
  }
  //手机号注册
  const phoneRegisterAction = async ({ phone, code, countryCode, userName }) => {
    try {
      let inviteCode = getInviteCode()
      const res = await phoneRegister({ phone, code, countryCode, userName, inviteCode })
      if (res?.['code'] === ERR_OK) {
        token.value = setToken(res.data.accessToken)
        router.push(router.currentRoute.value.query.redirect || '/')
        return true
      } else {
        return false
      }
    } catch (e) {
      console.log(e.message)
    }
  }
  // 获取用户信息
  const getUserInfoAction = async () => {
    try {
      const res = await getUserInfo()
      if (res.code === ERR_OK) {
        userInfo.value = res.data
      }
    } catch (e) {
      console.log(e.message)
    }
  }
  // 获取会员中心钱包余额
  const getBalanceAction = async (data) => {
    try {
      data = data || {}
      data.userId = userInfo.value.id
      const res = await getBalance(data)
      if (res.code === ERR_OK) {
        balance.value = toFormatNumber(res.data.memberWallet)
      }
    } catch (e) {
      console.log(e.message)
    }
  }
  // 一键回收
  const getCollectAction = async () => {
    if (userInfo.value.id && userInfo.value.role == 0) {
      await getCollect({ userId: userInfo.value.id })
    }
  }
  // 退出
  const logOutAction = async (toLogin) => {
    try {
      const res = await getLogout()
      if (res.code === ERR_OK) {
        // 清空用户token与信息
        token.value = ''
        removeToken()
        delDailyFlag()
        userInfo.value = {}
        // 清空fbtoken
        const fbStore = useFBStore()
        fbStore.setFBToken({})
        window.hasExpiredExecuteFlag = false
        // 清除直播送礼物提示信息
        localStorage.removeItem('giftConfirmation')
        if (toLogin) {
          router.push('/login')
        }
      }
    } catch (e) {
      console.log(e.message)
    }
  }
  return {
    token,
    isLogin,
    userInfo,
    balance,
    loginAction,
    phoneLoginAction,
    logOutAction,
    getUserInfoAction,
    registerAction,
    phoneRegisterAction,
    getBalanceAction,
    getCollectAction,
  }
})
