import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getToken, setToken, removeToken, setUserRole, removeUserRole } from '@/utils/cache'

import { delDailyFlag } from '@/utils/dailyFlag'
import { toFormatNumber } from '@/utils'

import {
  login,
  getUserInfo,
  phoneLogin,
  register,
  getLogout,
  phoneRegister,
  getBalance,
  getCollect
} from '@/api/user'
import { ERR_OK } from '@/utils/config'
import router from '@/router'
import { useFBStore } from './fb'
export const useUserStore = defineStore('user', () => {
  const LoginDialog = reactive({
    isShowLoginDialog: false,
    currentPage: ''
  })
  function setLoginDialogAction(obj) {
    const { isShowLoginDialog, currentPage } = obj
    LoginDialog.isShowLoginDialog = isShowLoginDialog
    LoginDialog.currentPage = currentPage
  }

  const token = ref(getToken())
  const isLogin = computed(() => !!token.value)
  let userInfo = ref({})
  const balance = ref(0)
  // 用户名登录
  const loginAction = (data) => {
    return new Promise((resolve, reject) => {
      login(data)
        .then((res) => {
          if (res.code === ERR_OK) {
            token.value = setToken(res.data.accessToken)
            resolve(res)
            const fbStore = useFBStore()
            fbStore.getFBToken({})
            // 清空记录每日一次的本地数据
            delDailyFlag()
            router.push('/')
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
        const fbStore = useFBStore()
        fbStore.getFBToken({})
        // 清空记录每日一次的本地数据
        delDailyFlag()
        router.push(router.currentRoute.value.query.redirect || '/')
      }
    } catch (e) {
      // console.log(e.message)
    }
  }

  // 用户注册
  const registerAction = (data) => {
    return new Promise((resolve, reject) => {
      register(data)
        .then((res) => {
          if (res.code === ERR_OK) {
            token.value = setToken(res.data.accessToken)
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

  //手机号注册
  const phoneRegisterAction = async (data) => {
    try {
      const res = await phoneRegister(data)
      if (res?.['code'] === ERR_OK) {
        token.value = setToken(res.data.accessToken)
        router.push(router.currentRoute.value.query.redirect || '/')
        return res || true
      } else {
        return false
      }
    } catch (e) {
      // console.log(e.message)
    }
  }

  // 读取钱包
  const getBalanceAction = async (data) => {
    try {
      const res = await getBalance(data)
      if (res.code === ERR_OK) {
        balance.value = toFormatNumber(res.data?.memberWallet)
      }
    } catch (e) {
      console.log(e)
    }
  }
  // 一键回收
  const getCollectAction = async () => {
    await getCollect()
  }
  // 获取用户信息
  const getUserInfoAction = async () => {
    try {
      const res = await getUserInfo()
      if (res.code === ERR_OK) {
        userInfo.value = res.data
        setUserRole(res.data.role)
        window.CTY_USERNAME = res.data.userName
        console.log('CTY_USERNAME', CTY_USERNAME)
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  // 退出
  const logOutAction = async () => {
    try {
      const res = await getLogout()
      if (res.code === ERR_OK) {
        // 清空用户token与信息
        token.value = ''
        removeToken()
        removeUserRole()
        userInfo.value = {}
        // 清空fbtoken
        const fbStore = useFBStore()
        // 清空记录每日一次的本地数据
        delDailyFlag()
        fbStore.setFBToken({})
        window.hasExpiredExecuteFlag = false
        router.push('/')
        location.reload()
      }
    } catch (e) {
      console.log(e.message)
    }
  }
  return {
    LoginDialog,
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
    setLoginDialogAction
  }
})
