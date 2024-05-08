const AboutUsView = () => import('@/views/SettingsView/AboutUsView.vue')
const DeviceInfo = () => import('@/views/SettingsView/DeviceInfoView.vue')
const SettingFeedBack = () => import('@/views/SettingsView/SettingFeedBackView.vue')
const LanguageSetting = () => import('@/views/SettingsView/LanguageSettingView.vue')
const UserAgreement = () => import('@/views/SettingsView/UserAgreementView.vue')

const list = [
  {
    path: '/aboutus',
    name: 'aboutus',
    component: AboutUsView
  },
  {
    path: '/deviceinfo',
    name: 'deviceinfo',
    component: DeviceInfo
  },
  {
    path: '/settingfeedback',
    name: 'settingfeedback',
    component: SettingFeedBack,
    meta: {
      isAuth: true
    }
  },
  {
    path: '/languagesetting',
    name: 'languagesetting',
    component: LanguageSetting
  },
  {
    path: '/useragreement',
    name: 'useragreement',
    component: UserAgreement
  }
]
export default list
