import i18n from '@/i18n/index'
import { formatNumber, formatTimestamp } from '@/utils'
import { groupBy } from 'lodash'
export const CHAMPION_TYPE = 7 // 冠军type
import { useFBStore } from '@/stores/fb'

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
  AmericanFootball: 6, // 美式足球
  Rugby: 4, // 橄榄球
  IceHockey: 2, // 冰球
  BeachVolleyball: 51, // 沙滩排球
  Handball: 8, //手球
  Cricket: 14, //玩板球
}

// 球类文本
export function getBallTypeTextById(sid) {
  if (Number(sid) !== 0) {
    const fbStore = useFBStore()
    const Sports = fbStore.languagePackage['Sports']
    return Sports && Sports[sid][fbStore.languageType]
  }
}

// 盘口玩法
export function getSportMarketType(i18n) {
  return {
    // 足球
    [SPORT_IDS.Soccer]: [
      {
        mty: 1005,
        pe: 1001,
        title: i18n.global.t('useSportDict.Winalone')
      },
      {
        mty: 1000,
        pe: 1001,
        title: i18n.global.t('useSportDict.handicap')
      },
      {
        mty: 1007,
        pe: 1001,
        title: i18n.global.t('useSportDict.size')
      },
      {
        mty: 1005,
        pe: 1002,
        title: i18n.global.t('useSportDict.Solewinathalftime')
      },
      {
        mty: 1000,
        pe: 1002,
        title: i18n.global.t('useSportDict.halfcourthandicap')
      },

      {
        mty: 1007,
        pe: 1002,
        title: i18n.global.t('useSportDict.halfcourtsize')
      }
    ],
    // 篮球
    [SPORT_IDS.Basketball]: [
      {
        mty: 3004,
        pe: 3001,
        title: i18n.global.t('useSportDict.Victoryordefeat')
      },
      {
        mty: 3002,
        pe: 3001,
        title: i18n.global.t('useSportDict.Handicap')
      },
      {
        mty: 3003,
        pe: 3001,
        title: i18n.global.t('useSportDict.size')
      },
      {
        mty: 3020,
        pe: 3003,
        title: i18n.global.t('useSportDict.Halftimewintwoitems')
      },
      {
        mty: 3002,
        pe: 3003,
        title: i18n.global.t('useSportDict.halftimehandicap')
      },
      {
        mty: 3003,
        pe: 3003,
        title: i18n.global.t('useSportDict.halfcourtsize')
      }
    ],
    // 电竞足球
    [SPORT_IDS.EFootball]: [
      {
        mty: 177003,
        pe: 177001,
        title: i18n.global.t('useSportDict.Winalone')
      },
      {
        mty: 177001,
        pe: 177001,
        title: i18n.global.t('useSportDict.handicap')
      },
      {
        mty: 177002,
        pe: 177001,
        title: i18n.global.t('useSportDict.size')
      },
      {
        mty: 177003,
        pe: 177002,
        title: i18n.global.t('useSportDict.Solewinathalftime')
      },
      {
        mty: 177001,
        pe: 177002,
        title: i18n.global.t('useSportDict.halfcourthandicap')
      },
      {
        mty: 177002,
        pe: 177002,
        title: i18n.global.t('useSportDict.halfcourtsize')
      }
    ],
    // 电竞篮球
    [SPORT_IDS.EBasketball]: [
      {
        mty: 178003,
        pe: 178001,
        title: i18n.global.t('useSportDict.Victoryordefeat')
      },
      {
        mty: 178001,
        pe: 178001,
        title: i18n.global.t('useSportDict.Handicap')
      },
      {
        mty: 178002,
        pe: 178001,
        title: i18n.global.t('useSportDict.size')
      },
      {
        mty: 178008,
        pe: 178003,
        title: i18n.global.t('useSportDict.Halftimewintwoitems')
      },
      {
        mty: 178001,
        pe: 178003,
        title: i18n.global.t('useSportDict.halftimehandicap')
      },
      {
        mty: 178002,
        pe: 178003,
        title: i18n.global.t('useSportDict.halfcourtsize')
      }
    ],
    // 网球
    [SPORT_IDS.Tennis]: [
      {
        mty: 5001,
        pe: 5001,
        title: i18n.global.t('useSportDict.Winalone')
      },
      {
        mty: 5004,
        pe: 5001,
        title: i18n.global.t('useSportDict.Handicaps')
      },
      {
        mty: 5002,
        pe: 5001,
        title: i18n.global.t('useSportDict.Giveway')
      },
      {
        mty: 5003,
        pe: 5001,
        title: i18n.global.t('useSportDict.Totalgames')
      }
    ],
    // 棒球
    [SPORT_IDS.Baseball]: [
      {
        mty: 7003,
        pe: 7001,
        title: i18n.global.t('useSportDict.Winalone')
      },
      {
        mty: 7001,
        pe: 7001,
        title: i18n.global.t('useSportDict.handicap')
      },
      {
        mty: 7002,
        pe: 7001,
        title: i18n.global.t('useSportDict.size')
      },
      {
        mty: 7004,
        pe: 7001,
        title: i18n.global.t('useSportDict.Teamsize')
      }
    ],
    // 排球
    [SPORT_IDS.Volleyball]: [
      {
        mty: 13001,
        pe: 13001,
        title: i18n.global.t('useSportDict.Winalone')
      },
      {
        mty: 13002,
        pe: 13001,
        title: i18n.global.t('useSportDict.Handicap')
      },
      {
        mty: 13003,
        pe: 13001,
        title: i18n.global.t('useSportDict.totalscore')
      }
    ],
    // 羽毛球
    [SPORT_IDS.Badminton]: [
      {
        mty: 47001,
        pe: 47001,
        title: i18n.global.t('useSportDict.Winalone')
      },
      {
        mty: 47003,
        pe: 47001,
        title: i18n.global.t('useSportDict.size')
      },
      {
        mty: 47002,
        pe: 47002,
        title: i18n.global.t('useSportDict.Giveway')
      }
    ],
    // 乒乓球
    [SPORT_IDS.TableTennis]: [
      {
        mty: 15001,
        pe: 15001,
        title: i18n.global.t('useSportDict.Winalone')
      },
      {
        mty: 15002,
        pe: 15001,
        title: i18n.global.t('useSportDict.Handicap')
      },
      {
        mty: 15003,
        pe: 15001,
        title: i18n.global.t('useSportDict.totalscore')
      }
    ],
    // 拳击
    [SPORT_IDS.Boxing]: [
      {
        mty: 19001,
        pe: 19001,
        title: i18n.global.t('useSportDict.size')
      },
      {
        mty: 19002,
        pe: 19001,
        title: i18n.global.t('useSportDict.Winalone')
      }
    ],
    // 斯诺克
    [SPORT_IDS.Snooker]: [
      {
        mty: 16003,
        pe: 16001,
        title: i18n.global.t('useSportDict.Winalone')
      },
      {
        mty: 16001,
        pe: 16001,
        title: i18n.global.t('useSportDict.Giveway')
      },
      {
        mty: 16002,
        pe: 16001,
        title: i18n.global.t('useSportDict.Totalgames')
      }
    ],
    // 美式足球
    [SPORT_IDS.AmericanFootball]: [
      {
        mty: 6003,
        pe: 6001,
        title: i18n.global.t('useSportDict.Victoryordefeat')
      },
      {
        mty: 6001,
        pe: 6001,
        title: i18n.global.t('useSportDict.handicap')
      },
      {
        mty: 6002,
        pe: 6001,
        title: i18n.global.t('useSportDict.size')
      },
      {
        mty: 6003,
        pe: 6002,
        title: i18n.global.t('useSportDict.Solewinathalftime')
      },
      {
        mty: 6001,
        pe: 6002,
        title: i18n.global.t('useSportDict.halfcourthandicap')
      },
      {
        mty: 6002,
        pe: 6002,
        title: i18n.global.t('useSportDict.halfcourtsize')
      }
    ],
    // 橄榄球
    [SPORT_IDS.Rugby]: [
      {
        mty: 4003,
        pe: 4001,
        title: i18n.global.t('useSportDict.Winalonethreeitems')
      },
      {
        mty: 4002,
        pe: 4001,
        title: i18n.global.t('useSportDict.size')
      },
      {
        mty: 4001,
        pe: 4001,
        title: i18n.global.t('useSportDict.handicap')
      },
      {
        mty: 4002,
        pe: 4003,
        title: i18n.global.t('useSportDict.halfcourtsize')
      },
      {
        mty: 4001,
        pe: 4003,
        title: i18n.global.t('useSportDict.halfcourthandicap')
      }
    ],
    // 冰球
    [SPORT_IDS.IceHockey]: [
      {
        mty: 2001,
        pe: 2001,
        title: i18n.global.t('useSportDict.handicap')
      },
      {
        mty: 2002,
        pe: 2001,
        title: i18n.global.t('useSportDict.size')
      }
    ],
    // 沙滩排球
    [SPORT_IDS.BeachVolleyball]: [
      {
        mty: 51001,
        pe: 51001,
        title: i18n.global.t('useSportDict.Winalone')
      },
      {
        mty: 51003,
        pe: 51001,
        title: i18n.global.t('useSportDict.size')
      },
      {
        mty: 51002,
        pe: 51001,
        title: i18n.global.t('useSportDict.Handicap')
      }
    ],
    // 手球
    [SPORT_IDS.Handball]: [
      {
        mty: 8001,
        pe: 8001,
        title: i18n.global.t('useSportDict.handicap')
      },
      {
        mty: 8002,
        pe: 8001,
        title: i18n.global.t('useSportDict.size')
      }
      // {
      //   mty: 8006,
      //   pe: 8001,
      //   title: i18n.global.t('useSportDict.size')
      // }
    ],
    // 板球
    [SPORT_IDS.Cricket]: [
      {
        mty: 14001,
        pe: 14001,
        title: i18n.global.t('useSportDict.Winalonethreeitems')
      },
      {
        mty: 14006,
        pe: 14001,
        title: i18n.global.t('useSportDict.oddEven')
      },
      {
        mty: 14003,
        pe: 14001,
        title: i18n.global.t('useSportDict.totalscore')
      }
    ]
  }
}
//阶段赛果比分显示
export function getResultType(i18n) {
  return {
    [SPORT_IDS.Soccer]: [
      { pe: 1002, title: i18n.global.t('useSportDict.tophalf') },
      { pe: 1003, title: i18n.global.t('useSportDict.Lowerhalf') },
      { pe: 1001, title: i18n.global.t('useSportDict.whole') }
    ],
    [SPORT_IDS.Basketball]: [
      { pe: 3003, title: i18n.global.t('useSportDict.tophalf') },
      { pe: 3004, title: i18n.global.t('useSportDict.Lowerhalf') },
      { pe: 3001, title: i18n.global.t('useSportDict.whole') }
    ],
    [SPORT_IDS.EFootball]: [
      { pe: 177001, title: i18n.global.t('useSportDict.tophalf') },
      { pe: 177001, title: i18n.global.t('useSportDict.Lowerhalf') },
      { pe: 177001, title: i18n.global.t('useSportDict.whole') }
    ],
    [SPORT_IDS.EBasketball]: [
      { pe: 178003, title: i18n.global.t('useSportDict.tophalf') },
      { pe: 178004, title: i18n.global.t('useSportDict.Lowerhalf') },
      { pe: 178001, title: i18n.global.t('useSportDict.whole') }
    ],
    [SPORT_IDS.Tennis]: [
      { pe: 178003, title: i18n.global.t('useSportDict.whole') },
      { pe: 5001, title: i18n.global.t('useSportDict.Totalgames') }
    ],
    [SPORT_IDS.Baseball]: [{ pe: 7002, title: i18n.global.t('useSportDict.whole') }],
    [SPORT_IDS.Volleyball]: [
      { pe: 178003, title: i18n.global.t('useSportDict.Totalgames') },
      { pe: 13001, title: i18n.global.t('useSportDict.whole') }
    ],
    [SPORT_IDS.Badminton]: [
      { pe: 178004, title: i18n.global.t('useSportDict.Totalgames') },
      { pe: 47001, title: i18n.global.t('useSportDict.whole') }
    ],
    [SPORT_IDS.TableTennis]: [
      { pe: 178004, title: i18n.global.t('useSportDict.Totalgames') },
      { pe: 15001, title: i18n.global.t('useSportDict.whole') }
    ],
    [SPORT_IDS.Boxing]: [
      { pe: 178003, title: i18n.global.t('useSportDict.tophalf') },
      { pe: 178004, title: i18n.global.t('useSportDict.Lowerhalf') },
      { pe: 178001, title: i18n.global.t('useSportDict.whole') }
    ],
    [SPORT_IDS.Snooker]: [
      { pe: 178003, title: i18n.global.t('useSportDict.tophalf') },
      { pe: 178004, title: i18n.global.t('useSportDict.Lowerhalf') },
      { pe: 16001, title: i18n.global.t('useSportDict.whole') }
    ],
    [SPORT_IDS.AmericanFootball]: [
      { pe: 6003, title: i18n.global.t('useSportDict.tophalf') },
      { pe: 6004, title: i18n.global.t('useSportDict.Lowerhalf') },
      { pe: 6001, title: i18n.global.t('useSportDict.whole') }
    ],
    [SPORT_IDS.Rugby]: [{ pe: 4001, title: i18n.global.t('useSportDict.whole') }],
    [SPORT_IDS.IceHockey]: [{ pe: 2001, title: i18n.global.t('useSportDict.whole') }],
    [SPORT_IDS.BeachVolleyball]: [{ pe: 51001, title: i18n.global.t('useSportDict.whole') }],
    [SPORT_IDS.Handball]: [
      { pe: 8003, title: i18n.global.t('useSportDict.tophalf') },
      { pe: 8004, title: i18n.global.t('useSportDict.Lowerhalf') },
      { pe: 8001, title: i18n.global.t('useSportDict.whole') }
    ],
    [SPORT_IDS.Cricket]: [
      { pe: 14001, title: i18n.global.t('useSportDict.Winalonethreeitems') },
      { pe: 14003, title: i18n.global.t('useSportDict.totalscore') },
      { pe: 14006, title: i18n.global.t('useSportDict.oddEven') }
    ]
  }
}

// 玩法展示分类
export function getSportGamePlay(i18n) {
  return [
    { key: 'p', value: i18n.global.t('useSportDict.Popular') },
    { key: 'h', value: i18n.global.t('useSportDict.others') },
    { key: 'c', value: i18n.global.t('useSportDict.cornerkick') },
    { key: 'cs', value: i18n.global.t('useSportDict.Wavebile') },
    { key: 's', value: i18n.global.t('useSportDict.goal') },
    { key: 'f', value: i18n.global.t('useSportDict.halftime') },
    { key: 'i', value: i18n.global.t('useSportDict.specialbet') },
    { key: 'b', value: i18n.global.t('useSportDict.penaltycard') },
    { key: 'q', value: i18n.global.t('useSportDict.joint') },
    { key: 't', value: i18n.global.t('useSportDict.fifteenminutes') },
    { key: 'j', value: i18n.global.t('useSportDict.Game') },
    { key: 'set', value: i18n.global.t('useSportDict.Set') },
    { key: 'qu', value: i18n.global.t('useSportDict.Toptwocombinations') },
    { key: 'z', value: i18n.global.t('useSportDict.Accuratetoptwo') },
    { key: 'ps', value: i18n.global.t('useSportDict.Penaltyshootout') },
    { key: 'pro', value: i18n.global.t('useSportDict.promotedteam') },
    { key: '1st', value: i18n.global.t('useSportDict.winthechampionship') },
    { key: '3rd', value: i18n.global.t('useSportDict.Winthirdplace') },
    { key: 'o', value: i18n.global.t('useSportDict.other') }
  ]
}

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

export function getOddFormatText(oddsFormat) {
  switch (oddsFormat) {
    case 1:
      return i18n.global.t('useSportDict.EuropeanHandicap')
    case 2:
      return i18n.global.t('useSportDict.HongKongdisk')
    default:
      return i18n.global.t('useSportDict.EuropeanHandicap')
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
  Object.keys(groupData).forEach((na) => {
    let list = groupData[na] //比赛列表
    let league = {
      sid: list[0].sid,
      id: list[0]?.lg.id,
      listid: list[0].id,
      lg: list[0]?.lg,
      list
    }
    resultArr.push(league)
  })
  //排序
  // resultArr.sort((a, b) => a.lg.or - b.lg.or)
  return resultArr
}
// 市场玩法文本
export function getMarketTypeText(column) {
  const fbStore = useFBStore()
  const languageType = fbStore.languageType
  if (languageType === 'CMN') {
    return column.title
  }
  if (languageType === 'VIE') {
    return column.title
  }
  const MarketType = fbStore.languagePackage['MarketType']
  return MarketType && MarketType[column.mty][languageType]
}

// 比赛阶段文本
export function getMatchStageText(ms) {
  const fbStore = useFBStore()
  const Sports = fbStore.languagePackage['Match Status']
  return Sports && Sports[ms][fbStore.languageType]
}
// 比赛状态
export function getMatchStatus(match, fbStore) {
  const languageType = fbStore.languageType
  if (match?.mc) {
    const matchListStatusList = fbStore.languagePackage['Match Period']
    if (NotStarted(match)) {
      return formatTimestamp(match?.bt)
    }
    if (matchListStatusList && matchListStatusList[match?.mc?.pe]) {
      return matchListStatusList && matchListStatusList[match?.mc?.pe][languageType]
    } else {
      return ''
    }
  }
}

// 比赛未开始
export function NotStarted(match) {
  return [4].includes(match.ms)
}
// 球类型
export function getballType(val){
  switch(val){
    case 1:
      return i18n.global.t('SportsView.Football')
    case 3:
      return i18n.global.t('SportsView.Basketball') 
    case 177:
      return i18n.global.t('SportsView.eFootball') 
    case 178:
      return i18n.global.t('SportsView.eBasketball')  
    case 5:
      return i18n.global.t('SportsView.tennis')  
    case 7:
      return i18n.global.t('SportsView.baseball')   
    case 13:
      return i18n.global.t('SportsView.volleyball')
    case 47:
      return i18n.global.t('SportsView.badminton') 
    case 15:
      return i18n.global.t('SportsView.pingpong')
    case 19:
      return i18n.global.t('SportsView.boxing') 
    case 16:
      return i18n.global.t('SportsView.snooker') 
    case 6:
      return i18n.global.t('SportsView.AmercivanFootball')  
    case 4:
      return i18n.global.t('SportsView.Afootball') 
    case 2:
      return i18n.global.t('SportsView.puck')  
    case 51:
      return i18n.global.t('SportsView.BeachVolleyball') 
    case 8:
      return i18n.global.t('SportsView.handball')
    case 14:
      return i18n.global.t('SportsView.Cricket')       
  } 
}