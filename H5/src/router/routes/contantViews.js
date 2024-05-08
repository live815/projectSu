const LoginView = () => import('@/views/LoginView/LoginView.vue')
const RegisterView = () => import('@/views/RegisterView/RegisterView.vue')
const RegisterName = () => import('@/views/RegisterName/Name.vue')

const list = [
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      isLoginedBlackList: true // 已登录黑名单
    }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: {
      isLoginedBlackList: true // 已登录黑名单
    }
    // children: [
    //   {
    //     path: 'registerName',
    //     name: 'registerName',
    //     component: RegisterName
    //   }]
  },
  {
    path: '/registerName',
    name: 'registerName',
    component: RegisterName,
    meta: {
      isLoginedBlackList: true // 已登录黑名单
    }
  },
]
list.forEach((item) => {
  item.meta.transition = 'fade'
})
export default list
