// vip详情
const VipDetailsView = () => import('@/views/VipDetailsView/VipDetailsView.vue')
// 专属经理
const VipDedicatedManager = () => import('@/views/VipDedicatedManager/VipDedicatedManager.vue')
// 商务嫩模
const VipBusinessGirl = () => import('@/views/VipBusinessGirl/VipBusinessGirl.vue')
// 游艇
const VipYacht = () => import('@/views/VipYacht/VipYacht.vue')


const list = [
  {
    path: '/vipDetailsView',
    name: 'VipDetailsView',
    component: VipDetailsView
  },  {
    path: '/vipDedicatedManager',
    name: 'VipDedicatedManager',
    component: VipDedicatedManager
  },  {
    path: '/vipBusinessGirl',
    name: 'VipBusinessGirl',
    component: VipBusinessGirl
  },  {
    path: '/vipYacht',
    name: 'VipYacht',
    component: VipYacht
  }
]

export default list