const ActivityDetailView = () => import('@/views/ActivityDetailView')
const GameView = () => import('@/views/GameView/GameView.vue')
const SponsorView = () => import('@/views/SponsorView/SponsorView.vue')
const WebView = () => import('@/views/WebView/WebView.vue')
const DepositView = () => import('@/views/DepositView/DepositView.vue')
const WithdrawView = () => import('@/views/WithdrawView/WithdrawView.vue')
const TransferView = () => import('@/views/TransferView/TransferView.vue')
const VIPView = () => import('@/views/VIPView/VIPView.vue')
const PersonalCenterView = () => import('@/views/PersonalCenterView/PersonalCenterView.vue')
const MessageView = () => import('@/views/MessageView/MessageView.vue')
const MessageDetailView = () => import('@/views/MessageView/MessageDetailView.vue')
const TransactionRecordView = () =>
  import('@/views/TransactionRecordView/TransactionRecordView.vue')
const WelfareView = () => import('@/views/WelfareView/WelfareView.vue')
const HelpView = () => import('@/views/HelpView/HelpView.vue')
const HelpSubView = () => import('@/views/HelpView/HelpSubView.vue')
const FeedbackView = () => import('@/views/FeedbackView/FeedbackView.vue')
const InviteView = () => import('@/views/InviteView/InviteView.vue')
const AboutUsView = () => import('@/views/SettingsView/AboutUsView.vue')
const ForgetView = () => import('@/views/ForgetView/ForgetView.vue')
const SponsorDetailView = () => import('@/views/SponsorDetailView/SponsorDetailView.vue')
const AnchorInforView = () => import('@/views/AnchorInforView/AnchorInforView.vue')
const SettingsView = () => import('@/views/SettingsView/SettingsView.vue')
const SubGameView = () => import('@/views/SubGameView/SubGameView.vue')
const UserCenterBetRecordView = () => import('@/views/BetRecordView/UserCenterBetRecordView.vue')
const BetRuleView = () => import('@/views/HelpView/BetRuleView/BetRuleView.vue')
const BetMockView = () => import('@/views/HelpView/BetRuleView/BetMockView.vue')
const PersonalDetailsView = () => import('@/views/PersonalDetailsView/PersonalDetailsView.vue')
const InviteActivity = () => import('@/views/InviteActivity/index.vue')
const RoyalActivity = () => import('@/views/RoyalActivity/index.vue')

const list = [
  {
    path: '/user-center-bet-record',
    name: 'userCenterBetRecord',
    component: UserCenterBetRecordView,
    meta: {
      isAuth: true,
    },
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsView,
    meta: {
      isAuth: true,
    },
  },
  {
    path: '/sponsor',
    name: 'sponsor',
    component: SponsorView,
  },
  {
    path: '/sponsorDetail',
    name: 'sponsorDetail',
    component: SponsorDetailView,
  },
  {
    path: '/webview',
    name: 'webview',
    component: WebView,
  },
  {
    path: '/activity-detail',
    name: 'activityDetail',
    alias: [
      '/first-charge',
      '/luckyWheel',
      '/newbie-activity',
      '/game-activity',
      '/rebate-activity',
    ],
    component: ActivityDetailView,
  },
  {
    path: '/game',
    name: 'game',
    component: GameView,
  },

  {
    path: '/deposit',
    name: 'deposit',
    component: DepositView,
    meta: {
      isAuth: true,
    },
  },
  {
    path: '/withdraw',
    name: 'withdraw',
    component: WithdrawView,
    meta: {
      isAuth: true,
    },
  },
  {
    path: '/transfer',
    name: 'transfer',
    component: TransferView,
    meta: {
      isAuth: true,
    },
  },
  {
    path: '/vip',
    name: 'vip',
    component: VIPView,
    meta: {
      isAuth: true,
    },
  },
  {
    path: '/personal-center',
    name: 'personal-center',
    component: PersonalCenterView,
    meta: {
      isAuth: true,
    },
  },
  {
    path: '/personalDetails',
    name: 'personalDetails',
    component: PersonalDetailsView,
    meta: {
      isAuth: true,
    },
  },
  {
    path: '/message',
    name: 'message',
    component: MessageView,
    props: {
      type: 0,
    },
    meta: {
      isAuth: true,
    },
  },
  {
    path: '/message/detail',
    name: 'messageDetail',
    component: MessageDetailView,
    meta: {
      isAuth: true,
    },
  },

  {
    path: '/transaction-record',
    name: 'transaction-record',
    component: TransactionRecordView,
    meta: {
      isAuth: true,
    },
  },
  {
    path: '/welfare',
    name: 'welfare',
    component: WelfareView,
    meta: {
      isAuth: true,
    },
  },
  {
    path: '/help',
    name: 'help',
    component: HelpView,
  },
  {
    path: '/helpsub',
    name: 'helpsub',
    component: HelpSubView,
  },
  {
    path: '/betrule',
    name: 'BetRule',
    component: BetRuleView,
  },
  {
    path: '/betmock',
    name: 'BetMock',
    component: BetMockView,
  },

  {
    path: '/feedback',
    name: 'feedback',
    component: FeedbackView,
  },
  {
    path: '/invite',
    name: 'invite',
    component: InviteView,
    meta: {
      isAuth: true,
    },
  },

  {
    path: '/about-us',
    name: 'about-us',
    component: AboutUsView,
  },
  {
    path: '/forget',
    name: 'forget',
    component: ForgetView,
  },
  {
    path: '/anchor-infor/:id',
    name: 'anchor-infor',
    component: AnchorInforView,
  },
  {
    path: '/sub-game/:id',
    name: 'sub-game',
    component: SubGameView,
  },
  // {
  //   path: '/rebate-activity',
  //   name: 'rebateActivity',
  //   component: RebateActivity
  // },
  {
    path: '/invite-activity',
    name: 'inviteActivity',
    component: InviteActivity,
  },
  {
    path: '/royal-activity',
    name: 'RoyalActivity',
    component: RoyalActivity,
  },
  {
    path: '/suggestion-activity',
    name: 'SuggestionActivity',
    component: () => import('@/views/SuggestionActivity'),
  },
  {
    path: '/transaction-activity',
    name: 'TransactionActivity',
    component: () => import('@/views/TransactionActivity'),
  },
]

export default list
