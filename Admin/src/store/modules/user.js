import { login, logout, getInfo, validQrApi } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
const defAva = new URL('@/assets/images/profile.jpg', import.meta.url).href
const useUserStore = defineStore('user', {
  state: () => ({
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    permissions: [],
    userInfo: {}
  }),
  actions: {
    // 登录
    // login(userInfo) {
    //   const username = userInfo.username.trim()
    //   const password = userInfo.password
    //   const code = userInfo.code
    //   const uuid = userInfo.uuid
    //   const loginUrl = location.host
    //   const userAgent = navigator.userAgent
    //   return new Promise((resolve, reject) => {
    //     login({ username, password, code, uuid, loginUrl, userAgent })
    //       .then((res) => {
    //         let token = res.access_token
    //         setToken(token)
    //         this.token = token
    //         resolve()
    //       })
    //       .catch((error) => {
    //         reject(error)
    //       })
    //   })
    // },

    // 新登录接口
    login(userInfo) {
      const username = userInfo.username.trim()
      const password = userInfo.password
      const code = userInfo.code
      const uuid = userInfo.uuid
      const loginUrl = location.host
      const userAgent = navigator.userAgent
      return new Promise((resolve, reject) => {
        login({ username, password, code, uuid, loginUrl, userAgent })
          .then((res) => {
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    validQr(username, googleVerifyCode) {
      return new Promise((resolve, reject) => {
        validQrApi({ username, googleVerifyCode })
          .then((res) => {
            let token = res.access_token
            setToken(token)
            this.token = token
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    // 获取用户信息
    getInfo() {
      return new Promise((resolve, reject) => {
        getInfo()
          .then((res) => {
            const user = res.user
            const avatar = user.avatar == '' || user.avatar == null ? defAva : user.avatar

            if (res.roles && res.roles.length > 0) {
              // 验证返回的roles是否是一个非空数组
              this.roles = res.roles
              this.permissions = res.permissions
            } else {
              this.roles = ['ROLE_DEFAULT']
            }
            this.userInfo = user
            this.name = user.userName
            this.avatar = avatar
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 退出系统
    logOut() {
      return new Promise((resolve, reject) => {
        logout(this.token)
          .then(() => {
            this.token = ''
            this.roles = []
            this.permissions = []
            removeToken()
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    }
  }
})

export default useUserStore
