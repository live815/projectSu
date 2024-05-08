import i18n from '@/i18n'
import config from '../../package.json'
export const version = config.version
export const IS_DEV = process.env.NODE_ENV === 'development'
export const defaultTime = [new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 1, 1, 23, 59, 59)]

export const shortcuts = [
  {
    text: i18n.global.t('common.today'),
    value: () => {
      const end = new Date()
      const now = new Date()
      const start = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      return [start, end]
    }
  },
  {
    text: i18n.global.t('common.yesterday'),
    value: () => {
      const now = new Date()
      const startOfYesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1) // 昨天的 00:00:00

      const endOfYesterday = new Date(startOfYesterday)
      endOfYesterday.setHours(23, 59, 59, 999)
      return [startOfYesterday, endOfYesterday]
    }
  },
  {
    text: i18n.global.t('common.Lastthreedays'),
    value: getDateTimeRange(3)
  },
  {
    text: i18n.global.t('common.Lastsevendays'),
    value: getDateTimeRange(7)
  },
  {
    text: i18n.global.t('common.lastMonth'),
    value: getDateTimeRange(30)
  },
  {
    text: i18n.global.t('common.LastThreemonths'),
    value: getDateTimeRange(90)
  }
]
export function getDateTimeRange(days) {
  return () => {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * days)
    return [start, end]
  }
}
// 当前时间戳 转换成当前日期 格式(例)2023-12-07 15:13:06
export function formatCurrentTime() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0') // 月份是从0开始的，需要加1
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

export const C_SPORT_GAME_ID = 1001101101

export const VipList = [
  {
    id: 0,
    label: 'VIP0'
  },
  {
    id: 1,
    label: 'VIP1'
  },
  {
    id: 2,
    label: 'VIP2'
  },
  {
    id: 3,
    label: 'VIP3'
  },
  {
    id: 4,
    label: 'VIP4'
  },
  {
    id: 5,
    label: 'VIP5'
  },
  {
    id: 6,
    label: 'VIP6'
  },
  {
    id: 7,
    label: 'VIP7'
  },
  {
    id: 8,
    label: 'VIP8'
  },
  {
    id: 9,
    label: 'VIP9'
  },
  {
    id: 10,
    label: 'VIP10'
  },
  {
    id: 11,
    label: 'VIP11'
  }
]

export const clientList = [
  {
    value: 1,
    label: 'PC'
  },
  {
    value: 2,
    label: i18n.global.t('member.nativeIOS')
  },
  {
    value: 3,
    label: i18n.global.t('member.webPageIOS')
  },
  {
    value: 4,
    label: 'IOSH5'
  },
  {
    value: 5,
    label: i18n.global.t('member.nativeAndroid')
  },
  {
    value: 6,
    label: i18n.global.t('member.webPageAndroid')
  },
  {
    value: 7,
    label: 'Android H5'
  },
  {
    value: 9,
    label: i18n.global.t('member.unknow')
  }
]
export function accountTypes(i18n) {
  return [
    {
      value: '',
      label: i18n.global.t('operation.all')
    },
    {
      value: 0,
      label: i18n.global.t('operation.ordinary')
    },
    {
      value: 1,
      label: i18n.global.t('operation.highquality')
    },
    {
      value: 2,
      label: i18n.global.t('operation.focuson')
    }
  ]
}

export function receiveStatus(i18n) {
  return [
    {
      value: '',
      label: i18n.global.t('operation.all')
    },
    {
      value: 0,
      label: i18n.global.t('operation.tobecollect')
    },
    {
      value: 1,
      label: i18n.global.t('operation.Received')
    },
    {
      value: 2,
      label: i18n.global.t('operation.expired')
    }
  ]
}

export function prizeType(i18n) {
  return [
    {
      value: '',
      label: i18n.global.t('operation.all')
    },
    {
      value: 1,
      label: i18n.global.t('operation.cash')
    },
    {
      value: 2,
      label: i18n.global.t('operation.cashcoupons')
    },
    {
      value: 3,
      label: i18n.global.t('operation.depositcoupon')
    },
    {
      value: 4,
      label: i18n.global.t('operation.TurnoverCoupons')
    },
    {
      value: 5,
      label: i18n.global.t('operation.physicalObject')
    }
  ]
}

export const h5ActivityPath = [
  {
    type: 1,
    path: 'first-charge'
  },
  {
    type: 3,
    path: 'newbie-activity'
  },
  {
    type: 4,
    path: 'luckyWheel'
  },
  {
    type: 2,
    path: 'game-activity'
  },
  {
    type: 8,
    path: 'rebate-activity'
  }
]
