const CellIphoneView = () => import('@/views/CellIphoneView/CellIphoneView.vue')
const MailView = () => import('@/views/MailView/MailView.vue')
const BankCardView = () => import('@/views/BankCardView/BankCardView.vue')
const AddressView = () => import('@/views/AddressView/AddressView.vue')
const PasswordInfoView = () => import('@/views/PasswordInfoView/PasswordInfoView.vue')
const AddBankcardView = () => import('@/views/AddBankcardView/AddBankcardView.vue')
const AddVirtualView = () => import('@/views/AddVirtualView/AddVirtualView.vue')
const AddEbPayView = () => import('@/views/AddEbPayView/AddEbPayView.vue')


const list = [
  {
    path: '/bankcard',
    name: 'BankCard',
    component: BankCardView,
  },
  {
    path:'/address',
    name:'Address',
    component:AddressView,
  },
  {
    path:'/passwordInfo',
    name:'PasswordInfo',
    component:PasswordInfoView,
  },  
  {
    path:'/mail',
    name:'Mail',
    component:MailView,
  },
  {
    path:'/cellIphone',
    name:'CellIphone',
    component:CellIphoneView,
  },
  {
    path:'/addBankcard',
    name:'AddBankcard',
    component:AddBankcardView,
  },
  {
    path:'/addVirtual',
    name:'AddVirtual',
    component:AddVirtualView,
  },
  {
    path:'/addEbPay',
    name:'AddEbPay',
    component:AddEbPayView,
  }

]

export default list