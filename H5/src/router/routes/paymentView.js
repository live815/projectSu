// 虚拟币充值优势
const VirtualBannerView = () => import('@/views/VirtualBannerView/VirtualBannerView.vue')
// 充值信息
const RechargeInformationView = () => import('@/views/RechargeInformationView/RechargeInformationView.vue')

const list = [
  {
    path: '/virtualBanner',
    name: 'VirtualBanner',
    component: VirtualBannerView
  },
  {
    path: '/rechargeInformation',
    name: 'RechargeInformation',
    component: RechargeInformationView
  },

]

export default list