import InviteComp from './components/InviteComp.vue'
import PersonalCenter from './components/PersonalCenter.vue'
import SafeCenter from './components/SafeCenter.vue'
import BetRecord from './components/BetRecord'
import Balance from './components/Balance'
import FeedBack from './components/FeedBack'
import Information from './components/Information'
import WelfareCenter from './components/WelfareCenter'
import Vip from './components/Vip/Vip'
import i18n from '@/i18n'

const req = import.meta.glob('./img/*.*', { eager: true })
export const imagesMap = {}
for (const key in req) {
  let name = key.split('/').slice(-1)[0].split('.')[0]
  imagesMap[name] = req[key].default
}

export const tabListData = [
  {
    id: 0,
    title: i18n.global.t('GeneralUserCenter.BettingRecord'),
    component: BetRecord,
    iconSrc: imagesMap.bet_record,
    iconSelectSrc: imagesMap.bet_record_select
  },
  {
    id: 1,
    title: i18n.global.t('GeneralUserCenter.FundDetails'),
    component: Balance,
    iconSrc: imagesMap.balance,
    iconSelectSrc: imagesMap.balance_select
  },
  {
    id: 2,
    title: i18n.global.t('GeneralUserCenter.InviteFriends'),
    component: InviteComp,
    iconSrc: imagesMap.invite,
    iconSelectSrc: imagesMap.invite_select
  },
  {
    id: 3,
    title: i18n.global.t('GeneralUserCenter.PersonalCenter'),
    iconSrc: imagesMap.personal_center,
    component: PersonalCenter,
    iconSelectSrc: imagesMap.personal_center_select
  },
  {
    id: 4,
    title: i18n.global.t('GeneralUserCenter.VIPCenter'),
    component: Vip,
    iconSrc: imagesMap.vip_center,
    iconSelectSrc: imagesMap.vip_center_select
  },
  {
    id: 5,
    title: i18n.global.t('GeneralUserCenter.WelfareCenter'),
    component: WelfareCenter,
    iconSrc: imagesMap.welfare_center,
    iconSelectSrc: imagesMap.welfare_center_select
  },
  {
    id: 6,
    title: i18n.global.t('GeneralUserCenter.SecurityCenter'),
    component: SafeCenter,
    iconSrc: imagesMap.safe_center,
    iconSelectSrc: imagesMap.safe_center_selecet
  },
  {
    id: 7,
    title: i18n.global.t('GeneralUserCenter.MessageCenter'),
    component: Information,
    iconSrc: imagesMap.information,
    iconSelectSrc: imagesMap.information_select
  },
  {
    id: 8,
    title: i18n.global.t('GeneralUserCenter.Feedback'),
    component: FeedBack,
    iconSrc: imagesMap.feedback,
    iconSelectSrc: imagesMap.feedback_select
  }
]

export const inviteTableData = {
  tableDataDemo1: [
    {
      registrationTime: '2023-05-25',
      firstDepositTime: '2023-05-30',
      firstDepositAmount: '100',
      rewardAmount: '1'
    }
  ]
}
