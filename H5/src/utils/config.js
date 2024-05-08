import config from '../../package.json'
export const IS_DEV = process.env.NODE_ENV === 'development'
export const appPlayerUrl =  import.meta.env.VITE_APP_PLAYER_URL
export const version = config.version
export const ERR_OK = 200
export const FB_ERR_OK = 0
export const ERR_EXPIRED = 10009
export const C_SPORT_GAME_ID = 1001101101 // V体育游戏id
export const VR_LOTTERY = 1001105105 // vr彩票
export const SPORT_TYPE_ID = 1001101 // 体育游戏分类
export const SLOT_TYPE_ID = 1001104 // 电子游戏分类
export const captchaId = '703555117717311ddc2a2c052930eaa4' //'4e91ed65a8ff92414edec055461845d4'
import vip0 from '@/assets/img/vip/vip0.png'
import vip1 from '@/assets/img/vip/vip1.png'
import vip2 from '@/assets/img/vip/vip2.png'
import vip3 from '@/assets/img/vip/vip3.png'
import vip4 from '@/assets/img/vip/vip4.png'
import vip5 from '@/assets/img/vip/vip5.png'
import vip6 from '@/assets/img/vip/vip6.png'
import vip7 from '@/assets/img/vip/vip7.png'
import vip8 from '@/assets/img/vip/vip8.png'
import vip9 from '@/assets/img/vip/vip9.png'
import vip10 from '@/assets/img/vip/vip10.png'
import vip11 from '@/assets/img/vip/vip11.png'
import Soccer from '@/assets/img/sport/football-inactive.png'
import Basketball from '@/assets/img/sport/basketball-inactive.png'
import EFootball from '@/assets/img/sport/electronic-football-inactive.png'
import EBasketball from '@/assets/img/sport/electronic-basketball-inactive.png'
import Tennis from '@/assets/img/sport/tennis-inactive.png'
import Baseball from '@/assets/img/sport/baseball-inactive.png'
import Volleyball from '@/assets/img/sport/volleyball-inactive.png'
import Badminton from '@/assets/img/sport/badminton-inactive.png'
import TableTennis from '@/assets/img/sport/pingpong-inactive.png'
import Boxing from '@/assets/img/sport/boxer-inactive.png'
import Snooker from '@/assets/img/sport/snock-inactive.png'
import AmericanFootball from '@/assets/img/sport/AmericanFootball-inactive.png'
import Rugby from '@/assets/img/sport/soccer-inactive.png'
import IceHockey from '@/assets/img/sport/iceball-inactive.png'
import BeachVolleyball from '@/assets/img/sport/sand-volleyball-inactive.png'
import Handball from '@/assets/img/sport/hand-ball-inactive.png'
import SoccerActive from '@/assets/img/sport/football-active.png'
import BasketballActive from '@/assets/img/sport/basketball-active.png'
import EFootballActive from '@/assets/img/sport/electronic-football-active.png'
import EBasketballActive from '@/assets/img/sport/electronic-basketball-active.png'
import TennisActive from '@/assets/img/sport/tennis-active.png'
import BaseballActive from '@/assets/img/sport/baseball-active.png'
import VolleyballActive from '@/assets/img/sport/volleyball-active.png'
import BadmintonActive from '@/assets/img/sport/badminton-active.png'
import TableTennisActive from '@/assets/img/sport/pingpong-active.png'
import BoxingActive from '@/assets/img/sport/boxer-active.png'
import SnookerActive from '@/assets/img/sport/snock-active.png'
import AmericanFootballActive from '@/assets/img/sport/AmericanFootball-active.png'
import RugbyActive from '@/assets/img/sport/soccer-active.png'
import IceHockeyActive from '@/assets/img/sport/iceball-active.png'
import BeachVolleyballActive from '@/assets/img/sport/sand-volleyball-active.png'
import HandballActive from '@/assets/img/sport/hand-ball-active.png'

export function frontCoverTag(i18n) {
  return {
    1: i18n.global.t('common.Soccer'),
    2: i18n.global.t('common.Basketball'),
    3: i18n.global.t('common.payment'),
    4: i18n.global.t('common.sports')
  }
}

export function emotionMap(i18n) {
  return {
    0: i18n.global.t('common.private'),
    1: i18n.global.t('common.single'),
    2: i18n.global.t('common.married')
  }
}

// vip等级icon
export const vipIcon = {
  0: vip0,
  1: vip1,
  2: vip2,
  3: vip3,
  4: vip4,
  5: vip5,
  6: vip6,
  7: vip7,
  8: vip8,
  9: vip9,
  10: vip10,
  11: vip11
}

/**
 * @description 体育图标-对应字典 SPORT_IDS
 */
export const sportIcon = {
  1: Soccer,
  3: Basketball,
  177: EFootball,
  178: EBasketball,
  5: Tennis,
  7: Baseball,
  13: Volleyball,
  47: Badminton,
  15: TableTennis,
  19: Boxing,
  16: Snooker,
  6: AmericanFootball,
  4: Rugby,
  2: IceHockey,
  51: BeachVolleyball,
  8: Handball
}

/**
 * @description 体育图标-对应字典 SPORT_IDS
 */
export const sportIconActive = {
  1: SoccerActive,
  3: BasketballActive,
  177: EFootballActive,
  178: EBasketballActive,
  5: TennisActive,
  7: BaseballActive,
  13: VolleyballActive,
  47: BadmintonActive,
  15: TableTennisActive,
  19: BoxingActive,
  16: SnookerActive,
  6: AmericanFootballActive,
  4: RugbyActive,
  2: IceHockeyActive,
  51: BeachVolleyballActive,
  8: HandballActive
}

// 头像地址
export const avatarList = reactive([
  {
    id: 1,
    img: new URL('@/assets/img/headImg/avatar0.png', import.meta.url).href
  },
  {
    id: 2,
    img: new URL('@/assets/img/headImg/avatar1.png', import.meta.url).href
  },
  {
    id: 3,
    img: new URL('@/assets/img/headImg/avatar2.png', import.meta.url).href
  },
  {
    id: 4,
    img: new URL('@/assets/img/headImg/avatar3.png', import.meta.url).href
  },
  {
    id: 5,
    img: new URL('@/assets/img/headImg/avatar4.png', import.meta.url).href
  },
  {
    id: 6,
    img: new URL('@/assets/img/headImg/avatar5.png', import.meta.url).href
  },
  {
    id: 7,
    img: new URL('@/assets/img/headImg/avatar6.png', import.meta.url).href
  },
  {
    id: 8,
    img: new URL('@/assets/img/headImg/avatar7.png', import.meta.url).href
  },
  {
    id: 9,
    img: new URL('@/assets/img/headImg/avatar8.png', import.meta.url).href
  },
  {
    id: 10,
    img: new URL('@/assets/img/headImg/avatar9.png', import.meta.url).href
  }
])
