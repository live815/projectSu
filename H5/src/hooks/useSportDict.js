import { formatNumber, formatTimestamp } from '@/utils'
import { groupBy } from 'lodash'
export const CHAMPION_TYPE = 7 // 冠军type
import { useFBStore } from '@/stores/fb'
import i18n from '@/i18n/index'
export const SPORT_IDS = {
  Soccer: 1, // 足球
  Basketball: 3, // 篮球
  EFootball: 177, // 电竞足球
  EBasketball: 178, // 电竞篮球
  Tennis: 5, // 网球
  Baseball: 7, // 棒球
  Volleyball: 13, // 排球
  Badminton: 47, // 羽毛球
  TableTennis: 15, // 乒乓球
  Boxing: 19, // 拳击
  Snooker: 16, // 斯诺克
  AmericanFootball: 6, // 美式足球|美式橄榄球
  Rugby: 4, // 橄榄球
  IceHockey: 2, // 冰球
  BeachVolleyball: 51, // 沙滩排球
  Handball: 8 //手球
}
// 球类文本
export function getBallTypeTextById(sid) {
  const fbStore = useFBStore()
  const Sports = fbStore.languagePackage['Sports']
  return Sports && Sports[sid][fbStore.languageType]
}

// 市场玩法文本
export function getMarketTypeText(column) {
  const fbStore = useFBStore()
  const languageType = fbStore.languageType
  if (languageType === 'CMN') {
    return column.title
  }
  const MarketType = fbStore.languagePackage['MarketType']
  return MarketType && MarketType[column.mty][languageType]
}

// 比赛状态文本
export function getMatchStageText(ms) {
  const fbStore = useFBStore()
  const Sports = fbStore.languagePackage['Match Status']
  return Sports && Sports[ms][fbStore.languageType]
}

// 赛事进行中的状态阶段
export function getMatchStatus(match, fbStore) {
  const matchListStatusList = fbStore.languagePackage['Match Period']
  if (NotStarted(match)) {
    return formatTimestamp(match.bt)
  }
  return matchListStatusList && matchListStatusList[match?.mc?.pe]?.[fbStore.languageType]
}

// 盘口玩法 （这里不需要翻译，中文为自定义文本）
export const SPORT_MARKET_TYPE = {
  // 足球
  [SPORT_IDS.Soccer]: [
    {
      mty: 1000,
      title: '让球'
    },
    {
      mty: 1007,
      title: '大小'
    },
    {
      mty: 1005,
      title: '独赢'
    },
    {
      mty: 1010,
      title: '角球'
    }
  ],
  // 篮球
  [SPORT_IDS.Basketball]: [
    {
      mty: 3002,
      title: '让球'
    },
    {
      mty: 3003,
      title: '大小'
    },
    {
      mty: 3004,
      title: '独赢'
    }
  ],
  // 电竞足球
  [SPORT_IDS.EFootball]: [
    {
      mty: 177001,
      title: '让球'
    },
    {
      mty: 177002,
      title: '大小'
    },
    {
      mty: 177003,
      title: '独赢'
    }
  ],
  // 电竞篮球
  [SPORT_IDS.EBasketball]: [
    {
      mty: 178001,
      title: '让球'
    },
    {
      mty: 178002,
      title: '大小'
    },
    {
      mty: 178003,
      title: '独赢'
    }
  ],
  // 网球
  [SPORT_IDS.Tennis]: [
    {
      mty: 5004,
      title: '让盘'
    },
    {
      mty: 5001,
      title: '独赢'
    }
  ],
  // 棒球
  [SPORT_IDS.Baseball]: [
    {
      mty: 7002,
      title: '大小'
    },
    {
      mty: 7003,
      title: '独赢'
    }
  ],
  // 排球
  [SPORT_IDS.Volleyball]: [
    {
      mty: 13002,
      title: '让分'
    },
    {
      mty: 13001,
      title: '独赢'
    }
  ],
  // 羽毛球
  [SPORT_IDS.Badminton]: [
    {
      mty: 47002,
      title: '让局'
    },
    {
      mty: 47001,
      title: '独赢'
    }
  ],
  // 乒乓球
  [SPORT_IDS.TableTennis]: [
    {
      mty: 15003,
      title: '大小'
    },
    {
      mty: 15002,
      title: '让球'
    },
    {
      mty: 15001,
      title: '独赢'
    }
  ],
  // 拳击
  [SPORT_IDS.Boxing]: [
    {
      mty: 19001,
      title: '大小'
    },
    {
      mty: 19002,
      title: '独赢'
    }
  ],
  // 斯诺克
  [SPORT_IDS.Snooker]: [
    {
      mty: 16001,
      title: '让局'
    },
    {
      mty: 16003,
      title: '独赢'
    }
  ],
  // 美式足球
  [SPORT_IDS.AmericanFootball]: [
    {
      mty: 6001,
      title: '让球'
    },
    {
      mty: 6002,
      title: '大小'
    }
  ],
  // 橄榄球
  [SPORT_IDS.Rugby]: [
    {
      mty: 4001,
      title: '让球'
    },
    {
      mty: 4002,
      title: '大小'
    }
  ],
  // 冰球
  [SPORT_IDS.IceHockey]: [
    {
      mty: 2001,
      title: '让球'
    },
    {
      mty: 2002,
      title: '大小'
    }
  ],
  // 沙滩排球
  [SPORT_IDS.BeachVolleyball]: [
    {
      mty: 51002,
      title: '让分'
    },
    {
      mty: 51006,
      title: '独赢'
    }
  ],
  // 手球
  [SPORT_IDS.Handball]: [
    {
      mty: 8001,
      title: '让球'
    },
    {
      mty: 8002,
      title: '大小'
    }
  ]
}

// 玩法展示分类
export function SPORT_GAMEPLAY(i18n) {
  return [
    { key: 'p', value: i18n.global.t('common.popular') },
    { key: 'h', value: i18n.global.t('common.hdp') },
    { key: 'c', value: i18n.global.t('common.corner') },
    { key: 'cs', value: i18n.global.t('common.correctScore') },
    { key: 's', value: i18n.global.t('common.Score') },
    { key: 'f', value: i18n.global.t('common.half') },
    { key: 'i', value: i18n.global.t('common.special') },
    { key: 'b', value: i18n.global.t('common.Booking') },
    { key: 'q', value: i18n.global.t('common.Quarter') },
    { key: 't', value: i18n.global.t('common.intervals') },
    { key: 'j', value: i18n.global.t('common.frame') },
    { key: 'set', value: i18n.global.t('common.sets') },
    { key: 'qu', value: i18n.global.t('common.quinella') },
    { key: 'z', value: i18n.global.t('common.exacta') },
    { key: 'ps', value: i18n.global.t('common.PenaltyShootout') },
    { key: 'pro', value: i18n.global.t('common.promotionTeam') },
    { key: '1st', value: i18n.global.t('common.ChampionTeam') },
    { key: '3rd', value: i18n.global.t('common.ThirdPlaceTeam') },
    { key: 'o', value: i18n.global.t('common.other') }
  ]
}

// 比赛未开始
export function NotStarted(match) {
  return [4].includes(match.ms)
}

// 比赛进行中
export function matchLiving(match) {
  return [5].includes(match.ms)
}

// 是否展示走表
export function isShowMatchCounter(match) {
  return match?.mc?.hasOwnProperty('s') && match.mc.s >= 0 && matchLiving(match)
}

// 获取赔率展示
export function getOddFormat(odd, oddsFormat) {
  switch (oddsFormat) {
    case 1:
      return odd
    case 2:
      return formatNumber(Number(odd) - 1)
    default:
      return odd
  }
}

// 赔率文本
export function getOddFormatText(oddsFormat) {
  switch (oddsFormat) {
    case 1:
      return i18n.global.t('common.Decimal')
    case 2:
      return i18n.global.t('common.HongKong')
    default:
      return i18n.global.t('common.Decimal')
  }
}

// 正常开售状态
export function isSolding(ss, od) {
  return ss === 1 && od > 0
}

// 组装二维数组
export function factoryArr(list) {
  let resultArr = []
  const groupData = groupBy(list, (item) => item.lg.na)
  console.log('groupData', groupData)
  Object.keys(groupData).forEach((na) => {
    let list = groupData[na] //比赛列表
    let league = {
      id: list[0]?.lg.id,
      lg: list[0]?.lg,
      list
    }
    resultArr.push(league)
  })
  //排序
  // resultArr.sort((a, b) => a.lg.or - b.lg.or)
  console.log(resultArr)
  return resultArr
}

// 测试赔率数值变化
export function testOddNumber(mgList) {
  mgList.forEach((market) => {
    if (market.mks.length) {
      market.mks.forEach((option) => {
        option.op.forEach((team) => {
          team.od = Math.floor(Math.random() * 11)
        })
      })
    }
  })
}

// 获取球队相关数据得分
export function getTeamDetailByTyg(match, idx, tyg, pe) {
  if (match.nsg && match.nsg.length) {
    return match.nsg.find((o) => o.tyg === tyg && o.pe === pe)?.sc[idx]
  }
}

// 获取球队全场实时比分
export function getTeamScore(match, idx) {
  let tyg = null
  let pe = null
  switch (match.sid) {
    case SPORT_IDS.Soccer:
      tyg = 5
      pe = 1000
      break
    case SPORT_IDS.Basketball:
      tyg = 5
      pe = 3001
      break
    case SPORT_IDS.EFootball:
      tyg = 5
      pe = 177001
      break
    case SPORT_IDS.EBasketball:
      tyg = 5
      pe = 178001
      break
    case SPORT_IDS.Tennis:
      tyg = 5 //5559
      pe = 5000
      break
    case SPORT_IDS.Baseball:
      tyg = 5
      pe = 7001
      break
    case SPORT_IDS.Volleyball:
      tyg = 5
      pe = 13001
      break
    case SPORT_IDS.Badminton:
      tyg = 5
      pe = 47001
      break
    case SPORT_IDS.TableTennis:
      tyg = 5
      pe = 15001
      break
    case SPORT_IDS.Boxing: // un test
      tyg = 5
      pe = 19001
      break
    case SPORT_IDS.Snooker:
      tyg = 5
      pe = 16001
      break
    case SPORT_IDS.AmericanFootball:
      tyg = 5
      pe = 6001
      break
    case SPORT_IDS.Rugby:
      tyg = 5
      pe = 4000
      break
    case SPORT_IDS.IceHockey:
      tyg = 5
      pe = 2000
      break
    case SPORT_IDS.BeachVolleyball: // un test
      tyg = 5
      pe = 51001
      break
    case SPORT_IDS.Handball:
      tyg = 5
      pe = 8000
      break
  }
  return getTeamDetailByTyg(match, idx, tyg, pe)
}
