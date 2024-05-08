const HomeView = () => import('@/views/HomeView/HomeView.vue')
const Personal = () => import('@/views/Personal/Personal.vue')
const PersonalAnchor = () => import('@/views/PersonalAnchor/PersonalAnchor.vue')
const SuperAdminCenter = () => import('@/views/SuperAdminCenter/SuperAdminCenter.vue')
const Discount = () => import('@/views/Discount/Discount.vue')
const AnchorPlay = () => import('@/views/AnchorPlay/AnchorPlay.vue')
const Electronic = () => import('@/views/Electronic/Electronic.vue')
const SportsView = () => import('@/views/SportsView/SportsView.vue')
const Sportsdetail = () => import('@/views/SportsView/components/MiddleSide/EventDetail.vue')
const VentureInvest = () => import('@/views/VentureInvest/VentureInvest.vue')
const AppDownload = () => import('@/views/AppDownload/AppDownload.vue')
const HelpCenter = () => import('@/views/HelpCenter/HelpCenter.vue')
const FirstChargeView = () => import('@/views/FirstChargeView/FirstChargeView.vue')
const Sponsor = () => import('@/views/Sponsor/Sponsor.vue')
const NewbieActivityView = () => import('@/views/NewbieActivity/NewbieActivity.vue')
const LuckyWheel = () => import('@/views/LuckyWheel/LuckyWheel.vue')
const VipDedicatedManager = () => import('@/views/VipDedicatedManager/VipDedicatedManager.vue')
const VipBusinessGirl = () => import('@/views/VipBusinessGirl/VipBusinessGirl.vue')
const VipYacht = () => import('@/views/VipYacht/VipYacht.vue')
const GameActivityView = () => import('@/views/GameActivity/index.vue')
const RebateActivity = () => import('@/views/RebateActivity/index.vue')
const RoyalActivity = () => import('@/views/RoyalActivity/index.vue')

const list = [
  {
    path: '/',
    component: () => import('@/app/Layout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: HomeView,
        meta: {
          isShowTabbar: true,
          showFooter: true, // 显示Footer
        },
      },
      {
        path: '/sports',
        name: 'SportsView',
        component: SportsView,
        meta: {
          isShowTabbar: true,
          requiresAuth: true,
          showFooter: false, // 不显示Footer
        },
        children: [
          {
            path: 'sportsdetail',
            name: 'sportsdetail',
            component: Sportsdetail,
          },
        ],
      },
      {
        path: 'VentureInvest',
        name: 'VentureInvest',
        component: VentureInvest,
        meta: {
          isShowTabbar: true,
          requiresAuth: false,
        },
      },
      // app下载
      {
        path: 'AppDownload',
        name: 'AppDownload',
        component: AppDownload,
        meta: {
          isShowTabbar: true,
          requiresAuth: false,
        },
      },
      {
        path: 'HelpCenter',
        name: 'HelpCenter',
        component: HelpCenter,
        meta: {
          isShowTabbar: true,
          requiresAuth: false, //跳转路由不需要登录
        },
      },
      {
        path: 'personal/:id',
        name: 'Personal',
        component: Personal,
        meta: {
          isShowTabbar: true,
          requiresAuth: true,
        },
      },
      {
        path: 'personalAnchor',
        name: 'personalAnchor',
        component: PersonalAnchor,
        meta: {
          isShowTabbar: true,
          requiresAuth: true,
          requiresAnchor: true,
        },
      },
      {
        path: 'superadmincenter',
        name: 'SuperAdminCenter',
        component: SuperAdminCenter,
        meta: {
          isShowTabbar: true,
          requiresAuth: true,
          requiresSuperAdmin: true,
        },
      },
      {
        path: 'sponsor',
        name: 'Sponsor',
        component: Sponsor,
        meta: {
          isShowTabbar: true,
          // requiresAuth:true
        },
      },
      {
        path: 'activity',
        name: 'Discount',
        component: Discount,
        meta: {
          isShowTabbar: true,
          // requiresAuth:true
        },
      },
      {
        path: 'anchorPlay',
        name: 'anchorPlay',
        component: AnchorPlay,
        meta: {
          isShowTabbar: true,
          requiresAuth: true,
        },
      },
      {
        path: 'electronic/:id',
        name: 'electronic',
        component: Electronic,
        meta: {
          isShowTabbar: true,
          requiresAuth: true,
        },
      },
      {
        path: 'firstcharge',
        name: 'firstCharge',
        component: FirstChargeView,
        meta: {
          showFooter: true,
          isShowTabbar: true,
        },
      },
      {
        path: 'newbieactivity',
        name: 'newbieActivity',
        component: NewbieActivityView,
        meta: {
          showFooter: true,
          isShowTabbar: true,
        },
      },
      {
        path: 'luckyWheel',
        name: 'luckyWheel',
        component: LuckyWheel,
        meta: {
          showFooter: true,
          isShowTabbar: true,
        },
      },
      {
        path: '/rebate-activity',
        name: 'rebateActivity',
        component: RebateActivity,
        meta: {
          showFooter: true,
          isShowTabbar: true,
        },
      },
      {
        path: 'vipDedicatedManager',
        name: 'VipDedicatedManager',
        component: VipDedicatedManager,
        meta: {
          showFooter: true,
          isShowTabbar: true,
        },
      },
      {
        path: 'vipBusinessGirl',
        name: 'VipBusinessGirl',
        component: VipBusinessGirl,
        meta: {
          showFooter: true,
          isShowTabbar: true,
        },
      },
      {
        path: 'vipYacht',
        name: 'VipYacht',
        component: VipYacht,
        meta: {
          showFooter: true,
          isShowTabbar: true,
        },
      },
      {
        path: '/game-activity',
        name: 'gameActivity',
        component: GameActivityView,
        meta: {
          showFooter: true,
          isShowTabbar: true,
        },
      },
      {
        path: '/invite-activity',
        name: 'InviteActivity',
        component: () => import('@/views/InviteActivity/index.vue'),
        meta: {
          showFooter: true,
          isShowTabbar: true,
        },
      },
      {
        path: '/royal-activity',
        name: 'royalActivity',
        component: RoyalActivity,
        meta: {
          showFooter: true,
          isShowTabbar: true,
        },
      },
      {
        path: '/transaction-activity',
        name: 'TransactionActivity',
        component: () => import('@/views/TransactionActivity'),
        meta: {
          showFooter: true,
          isShowTabbar: true,
        },
      },
      {
        path: '/suggestion-activity',
        name: 'SuggestionActivity',
        component: () => import('@/views/SuggestionActivity'),
        meta: {
          showFooter: true,
          isShowTabbar: true,
        },
      },

      // {
      //   path: '/lottery',
      //   name: 'lottery',
      //   component: PhysicalCulture,
      //   meta: {
      //     isShowTabbar: true
      //   }
      // },
      // {
      //   path: '/gaming',
      //   name: 'gaming',
      //   component: PhysicalCulture,
      //   meta: {
      //     isShowTabbar: true
      //   }
      // }
    ],
  },
]

list[0].children.forEach((item) => {
  item.meta.transition = 'fade'
})

export default list
