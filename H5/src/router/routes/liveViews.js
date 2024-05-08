const LiveViewZh = () => import('@/views/LiveView/LiveView.vue')
const AllMastersListView = () => import('@/views/AllMastersListView/AllMastersListView.vue')
const MasterDetails = () => import('@/views/AllMastersListView/components/MasterDetails.vue')
const PlanDetails = () =>
  import('@/views/LiveView/components/Information/components/PlanDetails.vue')
const PlanList = () => import('@/views/LiveView/components/Information/components/PlanList.vue')
const LiveList = () => import('@/views/LiveView/components/LiveList/LiveList.vue')
const Information = () => import('@/views/LiveView/components/Information/Information.vue')
const MatchList = () => import('@/views/LiveView/components/MatchList/MatchList.vue')
const LiveViewVi = () => import('@/views/LiveViewVi/LiveViewVi.vue')

const site = import.meta.env.VITE_SITE
const getUserCenterView = () => {
  switch (site) {
    case 'cn':
      return LiveViewZh
    case 'vietnam':
      return LiveViewVi
    default:
      return LiveViewZh
  }
}

const list = [
  {
    path: '/live',
    name: 'live',
    redirect: '/live/LiveList',
    component: getUserCenterView(),
    meta: {
      isShowTabbar: site === 'cn' ? true : false,
      transition: 'fade'
    },
    children: [
      {
        path: 'LiveList',
        name: 'LiveList',
        component: LiveList
      },
      {
        path: 'Information',
        name: 'Information',
        component: Information
      },
      {
        path: 'MatchList',
        name: 'MatchList',
        component: MatchList
      }
    ]
  },
  {
    path: '/allmasterslist',
    name: AllMastersListView,
    component: AllMastersListView
  },
  {
    path: '/live-page',
    name: 'live-page',
    component: () => import('@/views/LiveView/LivePage.vue'),
    meta: {
      isShowTabbar: false,
      transition: 'fade'
    }
  },
  {
    path: '/anchor',
    name: 'anchor',
    component: () => import('@/views/LiveView/Anchor.vue'),
    meta: {
      isShowTabbar: false,
      transition: 'fade'
    }
  },
  {
    path: '/entertainmentLive',
    name: 'entertainmentLive',
    component: () => import('@/views/LiveView/EntertainmentLive.vue'),
    meta: {
      isShowTabbar: false,
      transition: 'fade'
    }
  },
  {
    path: '/masterdetail/:id',
    name: 'MasterDetails',
    component: MasterDetails
  },
  {
    path: '/plandetail/:id',
    name: 'PlanDetails',
    component: PlanDetails
  },
  {
    path: '/planList/:id',
    name: 'PlanList',
    component: PlanList
  }
]

export default list
