const ServiceView = () => import('@/views/ServiceView/ServiceView.vue')
const CommonProblem = () => import('@/views/ServiceView/CommonProblem.vue')
const ServiceDetail = () => import('@/views/ServiceView/ServiceDetail.vue')
const ExclusiveCustomer = () =>
  import('@/views/ServiceView/ExclusiveCustomer/ExclusiveCustomer.vue')

const list = [
  {
    path: '/service',
    name: 'service',
    component: ServiceView
  },
  {
    path: '/service-question/:idx',
    name: 'service-question',
    component: CommonProblem
  },
  {
    path: '/service-detail',
    name: 'service-detail',
    component: ServiceDetail
  },
  {
    path: '/service-customer',
    name: 'serviceCustomer',
    component: ExclusiveCustomer
  }
]
export default list
