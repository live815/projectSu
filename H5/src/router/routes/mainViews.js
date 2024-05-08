const HomeViewZh = () => import('@/views/HomeView/HomeView.vue')
const HomeViewVi = () => import('@/views/HomeViewVi/HomeViewVi.vue')
const ActivityView = () => import('@/views/ActivityView/ActivityView.vue')
// const DiscoverView = () => import('@/views/DiscoverView/DiscoverView.vue')
const UserCenterViewZh = () => import('@/views/UserCenterView/UserCenterView.vue')
const UserCenterViewVi = () => import('@/views/UserCenterViewVi/UserCenterViewVi.vue')
const SportsView = () => import('@/views/SportsView/SportsView.vue')
// const BetRecordView = () => import('@/views/BetRecordView/BetRecordView.vue')

const site = import.meta.env.VITE_SITE
const getUserCenterView = () => {
  switch (site) {
    case 'cn':
      return UserCenterViewZh
    case 'vietnam':
      return UserCenterViewVi
    default:
      return UserCenterViewZh
  }
}
const getHomeView = () => {
  switch (site) {
    case 'cn':
      return HomeViewZh
    case 'vietnam':
      return HomeViewVi
    default:
      return HomeViewZh
  }
}

const list = [
  {
    path: '/',
    name: 'home',
    component: getHomeView(),
    meta: {
      isShowTabbar: true
    }
  },
  {
    path: '/activity',
    name: 'activity',
    component: ActivityView,
    meta: {
      isShowTabbar: true
    }
  },
  // {
  //   path: '/bet-record',
  //   name: 'bet-record',
  //   component: BetRecordView,
  //   meta: {
  //     isShowTabbar: true,
  //     isAuth: true
  //   }
  // },
  {
    path: '/user-center',
    name: 'user-center',
    component: getUserCenterView(),
    meta: {
      isShowTabbar: true
    }
  },
  {
    path: '/sports',
    name: 'sports',
    component: SportsView,
    meta: {
      isShowTabbar: true,
      isShowBetCart: true
    }
  }
]

list.forEach((item) => {
  item.meta.transition = 'fade'
})

export default list
