import i18n from '@/i18n'
import {  SPORT_IDS } from '@/hooks/useSportDict'
import { useFBStore } from '@/stores/fb'
const fbStore = useFBStore()

// 半场比分
export function getTeamHalfTime(item, idx) {
  // console.log(item,item.nsg)
  if (item?.nsg && item?.nsg?.length) {
    if(item.sid == 1){//足球
      return item.nsg.find((o) => o.tyg === 5 && o.pe === 1002)?.sc[idx]
    }
    if(item.sid == 177){//电竞足球
      return item.nsg.find((o) => o.tyg === 5 && o.pe === 177002)?.sc[idx]
    }
    if(item.sid == 3 ){//篮球
      return item.nsg.find((o) => o.tyg === 5 && o.pe === 3003)?.sc[idx]
    }
    if(item.sid == 178 ){//电竞篮球
      return item.nsg.find((o) => o.tyg === 5 && o.pe === 178003)?.sc[idx]
    }
  }
}
// 足球角球比分
export function getcornerkick(item, idx, tyg){
  return item.nsg?.find((o) => o.tyg === tyg && o.pe === 1000)?.sc[idx]
}
// 计算球队数据function
export function getTeamDetailByTyg(item, idx, tyg) {
  if (item.nsg && item.nsg.length) {
    return item.nsg.find((o) => o.tyg === tyg)?.sc[idx]
  }
}
//计算得分
export const getScore = (arr, index) => {
  return arr?.find((item) => item?.tyg === 5)?.sc[index]
}
export const getScorepingpong = (arr, index) => {
  return arr?.find((item) => item?.tyg === 5559 && item?.pe === 15001)?.sc[index]
}
// 篮球半场得分
export function getTeamHalfTimeBasketball(item, idx) {
  if (item.nsg && item.nsg.length) {
    return item.nsg.find((o) => o.tyg === 5 && o.pe === 3003)?.sc[idx]
  }
}
//获取排球全场比分
export function getVolleyballscore(item,idx,tyg){
  return item.nsg.find((o) => o.tyg === tyg && o.pe === 13001)?.sc[idx]
}
//获取沙滩排球全场比分
export function getBeachVolleyball(item,idx,tyg){
  return item.nsg.find((o) => o.tyg === tyg && o.pe === 51001)?.sc[idx]
}
// 获取篮球和其他球类赛事阶段
export function getStageType(val){
  const languageType = fbStore.languageType
  if(val?.pe){
    const matchListStatusList = fbStore.languagePackage['Period']
    return matchListStatusList && matchListStatusList[val?.pe] && matchListStatusList[val?.pe][languageType]
  }
}
//获取羽毛球全场比分
export function getBeachBadminton(item,idx,tyg){
  return item.nsg.find((o) => o.tyg === tyg && o.pe === 51001)?.sc[idx]
}
// 网球盘
export function gettennispan(item,idx,tyg){
  return item.nsg.find((o) => o.tyg === tyg && o.pe === 5001)?.sc[idx]
}
// 网球总分
export function gettenniswhole(item,idx,tyg){
  return item.nsg.find((o) => o.tyg === tyg && o.pe === 5000)?.sc[idx]
}
// 获取网球赛事阶段
export function getStageTypeOne(val){
  switch(val){
    case 5002:
      return 1
    case 5003:
      return 2
    case 5004:
      return 3 
  }
}
//获取电竞篮球赛事阶段
export function getStageTypeEBasketball(val){
  switch(val){
    case 178001:
      return i18n.global.t('SportsView.Wholegame')
    case 178003:
      return i18n.global.t('SportsView.Firsthalf')
    case 178005:
      return i18n.global.t('SportsView.Firstquarter')
    case 178006:
      return i18n.global.t('SportsView.Secondquarter')
    case 178007:
      return i18n.global.t('SportsView.Thirdquarter')
    case 178008:
      return i18n.global.t('SportsView.Fourthquarter')
  }
}
// 获取乒乓球赛事阶段
export function getStageTypepingpong(val){
  switch(val){
    case 15002:
      return 1
    case 15003:
      return 2
    case 15004:
      return 3 
    case 15005:
      return 4
    case 15006:
      return 5
    case 15001:
      return i18n.global.t('SportsView.Wholegame')
  }
}

// 获取排球赛事阶段
export function getStageTypeVolleyball(val){
  switch(val){
    case 13002:
      return 1
    case 13003:
      return 2
    case 13004:
      return 3 
    case 13005:
      return 4
    case 13006:
      return 5
  }
}
// 获取羽毛球赛事阶段
export function getStageTypeBadminton(val){
  switch(val){
    case 47002:
      return 1
    case 47003:
      return 2
    case 47004:
      return 3 
  }
}
// 获取棒球赛事阶段
export function getStageTypeBaseball(val){
  switch(val){
    case 7004:
      return 1
    case 7005:
      return 2
    case 7006:
      return 3 
    case 7007:
      return 4
    case 7008:
      return 5
    case 7009:
      return 6
    case 7010:
      return 7
    case 7011:
      return 8
    case 7012:
      return 9
    case 7013:
      return 10
    case 7001:
      return i18n.global.t('SportsView.TotalScore')
  }
}
// 获取斯洛克赛事阶段
export function getStageTypeSnooker(val){
  switch(val){
    case 16002:
      return 1
    case 16003:
      return 2
    case 16004:
      return 3 
    case 16005:
      return 4
    case 16006:
      return 5
    case 16007:
      return 6
    case 16008:
      return 7
    case 16009:
      return 8
    case 16010:
      return 9
    case 16011:
      return 10
    case 16012:
      return 11
    case 16013:
      return 12
    case 16014:
      return 13
    case 16015:
      return 14
    case 16016:
      return 15
    case 16017:
      return 16
    case 16018:
      return 17
    case 16019:
      return 18
    case 16020:
      return 19
    case 16021:
      return 20
    case 16022:
      return 21
    case 16023:
      return 22
    case 16024:
      return 23
    case 16025:
      return 24
    case 16026:
      return 25
    case 16027:
      return 26
    case 16028:
      return 27
    case 16029:
      return 28
    case 16030:
      return 29
    case 16031:
      return 30
    case 16032:
      return 31
    case 16033:
      return 32
    case 16034:
      return 33
    case 16035:
      return 34
    case 16036:
      return 35
    case 16001:
      return i18n.global.t('SportsView.TotalScore')
  }
}
// 获取手球赛事阶段
export function getStageTypeHandball(val){
  switch(val){
    case 8003:
      return i18n.global.t('SportsView.Firsthalf')
    case 8004:
      return i18n.global.t('SportsView.SecondHalf')
    case 8005:
      return i18n.global.t('SportsView.Overtime')
    case 8006:
      return i18n.global.t('SportsView.Penaltykick')
    case 8000:
      return i18n.global.t('SportsView.Wholegame')
  }
}
// 获取美式足球赛事阶段
export function getStageTypeAmericanFootball(val){
  switch(val){
    case 6005:
      return i18n.global.t('SportsView.Firstquarter')
    case 6006:
      return i18n.global.t('SportsView.Secondquarter')
    case 6003:
      return i18n.global.t('SportsView.Firsthalf')
    case 6007:
      return i18n.global.t('SportsView.Thirdquarter')
    case 6008:
      return i18n.global.t('SportsView.Fourthquarter')
    case 6001:
      return i18n.global.t('SportsView.Wholegame')
    case 6009:
      return i18n.global.t('SportsView.Overtime')
  }
}
// 获取沙滩排球赛事阶段
export function getStageTypeBeachVolleyball(val){
  switch(val){
    case 51002:
      return i18n.global.t('SportsView.firstround')
    case 51003:
      return i18n.global.t('SportsView.secondround')
    case 51004:
      return i18n.global.t('SportsView.thirdround')
    case 51005:
      return i18n.global.t('SportsView.fourthround')
    case 51006:
      return i18n.global.t('SportsView.fifthround')
  }
}
// 获取冰球赛事阶段
export function getStageTypeIceHockey(val){
  switch(val){
    case 2003:
      return 1
    case 2004:
      return 2
    case 2005:
      return 3 
    case 2006:
      return i18n.global.t('SportsView.Overtime')
    case 2000:
      return i18n.global.t('SportsView.TotalScore')
    case 2007:
      return i18n.global.t('SportsView.Penaltykick')
  }
}
// 篮球 pe 赛事阶段比分数据
export const getBasketBallStagesScore = computed(() => {
  if (fbStore.rightList?.sid === SPORT_IDS.Basketball) {
    if (fbStore.rightList.nsg && fbStore.rightList.nsg?.length>0) {
      return [3005, 3006, 3003,3007, 3008, 3009,3001].map((pe) => {
          const score = fbStore.rightList.nsg?.find((o) => o.tyg === 5 && o.pe === pe)?.sc;
          return { pe, score }; // 返回一个包含 pe 和 score 的对象
        })
        .filter((obj) => obj.score !== undefined && obj.score !== null);
    }
  }
});
// 电竞篮球 pe 赛事阶段比分数据
export const getEBasketballScore = computed(() => {
  if (fbStore.rightList?.sid === SPORT_IDS.EBasketball) {
    if (fbStore.rightList.nsg && fbStore.rightList.nsg?.length>0) {
      return [178005, 178006, 178003,178007, 178008, 178009,178001].map((pe) => {
          const score = fbStore.rightList.nsg?.find((o) => o.tyg === 5 && o.pe === pe)?.sc;
          return { pe, score }; // 返回一个包含 pe 和 score 的对象
        })
        .filter((obj) => obj.score !== undefined && obj.score !== null);
    }
  }
}); 
// 网球 pe 赛事阶段比分数据
export const getTennisScore = computed(() => {
  if (fbStore.rightList.sid === SPORT_IDS.Tennis) {
    if (fbStore.rightList.nsg && fbStore.rightList.nsg?.length) {
      return [5002, 5003, 5004, 5005, 5006]
        .map((pe) => {
          const score = fbStore.rightList.nsg?.find((o) => o.tyg === 5556 && o.pe === pe)?.sc;
          return { pe, score }; 
        })
        .filter((obj) => obj.score !== undefined && obj.score !== null);
    }
  }
})
// 乒乓球 pe 赛事阶段比分数据
export const gettabletennies = computed(() => {
  if (fbStore.rightList.sid === SPORT_IDS.TableTennis) {
    if (fbStore.rightList.nsg && fbStore.rightList.nsg.length) {
      return [15002, 15003, 15004, 15005, 15006,15001]
        .map((pe) => {
          const score = fbStore.rightList.nsg.find((o) => o.tyg === 5559 && o.pe === pe)?.sc;
          return { pe, score }; 
        })
        .filter((obj) => obj.score !== undefined && obj.score !== null);
    }
  }
})
// 棒球 pe 赛事阶段比分数据
export const getBaseball = computed(() => {
  if (fbStore.rightList.sid === SPORT_IDS.Baseball) {
    if (fbStore.rightList.nsg && fbStore.rightList.nsg.length) {
      return [7004, 7005, 7006, 7007, 7008,7009,7010,7011,7012,7013,7001]
        .map((pe) => {
          const score = fbStore.rightList.nsg.find((o) => o.tyg === 5 && o.pe === pe)?.sc;
          return { pe, score }; 
        })
        .filter((obj) => obj.score !== undefined && obj.score !== null);
    }
  }
})
// 排球 pe 赛事阶段比分数据
export const getVolleyball = computed(() => {
  if (fbStore.rightList.sid === SPORT_IDS.Volleyball) {
    if (fbStore.rightList.nsg && fbStore.rightList.nsg.length) {
      return [13002, 13003, 13004, 13005, 13006]
        .map((pe) => {
          const score = fbStore.rightList.nsg.find((o) => o.tyg === 5556 && o.pe === pe)?.sc;
          return { pe, score }; 
        })
        .filter((obj) => obj.score !== undefined && obj.score !== null);
    }
  }
})
// 斯诺克 赛事阶段比分数据
export const getSnooker = computed(() => {
  if (fbStore.rightList.sid === SPORT_IDS.Snooker) {
    if (fbStore.rightList.nsg && fbStore.rightList.nsg.length) {
      return [16002, 16003, 16004, 16005, 16006,16007,16008,16009,16010,16011,16012,16013,16014,16015,16016,16017,16018,16019,16020,16021,16022,16023,16024,16025,16026,16027,16028,16029,16030,16031,16032,16033,16034,16035,16036,16001,]
        .map((pe) => {
          const score = fbStore.rightList.nsg.find((o) => o.tyg === 12 && o.pe === pe)?.sc;
          return { pe, score }; 
        })
        .filter((obj) => obj.score !== undefined && obj.score !== null);
    }
  }
})
// 手球 pe 赛事阶段比分数据
export const getHandball = computed(() => {
  if (fbStore.rightList.sid === SPORT_IDS.Handball) {
    if (fbStore.rightList.nsg && fbStore.rightList.nsg.length) {
      return [8003,8004, 8005, 8006,8000]
        .map((pe) => {
          const score = fbStore.rightList.nsg.find((o) => o.tyg === 5 && o.pe === pe)?.sc;
          return { pe, score }; 
        })
        .filter((obj) => obj.score !== undefined && obj.score !== null);
    }
  }
})
// 橄榄球tyg：5比分 pe 赛事阶段比分数据
export const getRugby = computed(() => {
  if (fbStore.rightList?.sid === SPORT_IDS.Rugby) {
    if (fbStore.rightList.nsg && fbStore.rightList.nsg?.length>0) {
      return [4003, 4004, 4005,4006, 4000].map((pe) => {
          const score = fbStore.rightList.nsg?.find((o) => o.tyg === 5 && o.pe === pe)?.sc;
          return { pe, score }; // 返回一个包含 pe 和 score 的对象
        })
        .filter((obj) => obj.score !== undefined && obj.score !== null);
    }
  }
});
// 美式足球tyg：5比分 pe 赛事阶段比分数据
export const getAmericanFootball = computed(() => {
  if (fbStore.rightList?.sid === SPORT_IDS.AmericanFootball) {
    if (fbStore.rightList.nsg && fbStore.rightList.nsg?.length>0) {
      return [6005, 6006, 6003,6007, 6008,6001,6009].map((pe) => {
          const score = fbStore.rightList.nsg?.find((o) => o.tyg === 5 && o.pe === pe)?.sc;
          return { pe, score }; // 返回一个包含 pe 和 score 的对象
        })
        .filter((obj) => obj.score !== undefined && obj.score !== null);
    }
  }
});
// 沙滩排球 pe 赛事阶段比分数据
export const getScoreBeachVolleyball = computed(() => {
  if (fbStore.rightList.sid === SPORT_IDS.BeachVolleyball) {
    if (fbStore.rightList.nsg && fbStore.rightList.nsg.length) {
      return [51002, 51003, 51004,51005,51006]
        .map((pe) => {
          const score = fbStore.rightList.nsg.find((o) => o.tyg === 5556 && o.pe === pe)?.sc;
          return { pe, score }; 
        })
        .filter((obj) => obj.score !== undefined && obj.score !== null);
    }
  }
});
// 羽毛球
export const getBadminton = computed(() => {
  if (fbStore.rightList.sid === SPORT_IDS.Badminton) {
    if (fbStore.rightList.nsg && fbStore.rightList.nsg.length) {
      return [47002, 47003, 47004]
        .map((pe) => {
          const score = fbStore.rightList.nsg.find((o) => o.tyg === 5559 && o.pe === pe)?.sc;
          return { pe, score }; 
        })
        .filter((obj) => obj.score !== undefined && obj.score !== null);
    }
  }
});
// 冰球 pe 赛事阶段比分数据
export const getIceHockey = computed(() => {
  if (fbStore.rightList.sid === SPORT_IDS.IceHockey) {
    if (fbStore.rightList.nsg && fbStore.rightList.nsg.length) {
      return [2003,2004, 2005, 2006,2000,2007]
        .map((pe) => {
          const score = fbStore.rightList.nsg.find((o) => o.tyg === 5 && o.pe === pe)?.sc;
          return { pe, score }; 
        })
        .filter((obj) => obj.score !== undefined && obj.score !== null);
    }
  }
})
// 其他球类比分数据
export const getOtherBallStagesScore = computed(() => {
  const peArray = fbStore.rightList.nsg?.map(item => item.pe);
  if(fbStore.rightList.sid == 14){//板球
    if (fbStore.rightList.nsg && fbStore.rightList.nsg?.length>0) {
      return peArray.map((pe) => {
          const score = fbStore.rightList.nsg?.find((o) => o.tyg === 5 && o.pe === pe)?.sc;
          return { pe, score }; // 返回一个包含 pe 和 score 的对象
        })
        .filter((obj) => obj.score !== undefined && obj.score !== null);
        
    }
  }
  else{
    if (fbStore.rightList.nsg && fbStore.rightList.nsg?.length>0) {
      return peArray.map((pe) => {
          const score = fbStore.rightList.nsg?.find((o) => o.tyg === 5 && o.pe === pe)?.sc;
          return { pe, score }; // 返回一个包含 pe 和 score 的对象
        })
        .filter((obj) => obj.score !== undefined && obj.score !== null)
        // .reverse(); // 添加 .reverse() 进行倒序处理
    }
  }
});
// 比分数据过滤
export function filterScore(str){
  const regex = /(\d+-\d+)/;
  const matches = str.match(regex);
  if (matches) {
    return matches[0];
  } else {
    return null;
  }
};
// 订单状态
export function orderStatus(val){
  switch(Number(val)){
    case 1004001:
      return i18n.global.t('GeneralUserCenter.EarlySettlement')
    case 1004002:
      return i18n.global.t('GeneralUserCenter.Win')
    case 1004003:
      return i18n.global.t('GeneralUserCenter.WinHalf')
    case 1004004:
      return i18n.global.t('GeneralUserCenter.LoseHalf')
    case 1004005:
      return i18n.global.t('GeneralUserCenter.Lose')
    case 1004006:
      return i18n.global.t('GeneralUserCenter.Tie')
    case 1004007:
      return i18n.global.t('GeneralUserCenter.ReturnPrincipal')
    case 1004008:
      return i18n.global.t('GeneralUserCenter.InvalidOrder')
    case 1004009:
      return i18n.global.t('GeneralUserCenter.Confirming')
    case 1004010:
      return i18n.global.t('GeneralUserCenter.BetSuccess') 
  }
};
// 订单状态
export function orderStatu(val){
  switch(val){
    case 0:
      return i18n.global.t('GeneralUserCenter.unconfirmed')
    case 1:
      return i18n.global.t('GeneralUserCenter.Confirming')
    case 2:
      return i18n.global.t('GeneralUserCenter.OrderRejected')
    case 3:
      return i18n.global.t('GeneralUserCenter.Cancelled')
    case 4:
      return i18n.global.t('GeneralUserCenter.OrderReceived')
    case 5:
      return i18n.global.t('GeneralUserCenter.Settled')
  }
}
// 不同状态文字颜色
export function changeTextColor(val){
  if(Number(val) == 1004002 || Number(val) == 1004003 || Number(val) == 1004009 || Number(val) == 1004010){
    return 'color:green'   
  }
  if(Number(val) == 1004004 || Number(val) == 1004005 || Number(val) == 1004008){
    return 'color:red' 
  }
  if(Number(val) == 1004001 || Number(val) == 1004007){
    return 'color:yellow' 
  }
};
// 不同状态文字颜色
export function changeTextColors(val){
  switch(val){
    case 1004001:
      return 'color:yellow'
    case 1004002:
      return 'color:yellow'  
    case 2:
      return 'color:red' 
    case 3:
      return 'color:red' 
    case 1004010:
      return 'color:green'   
  }
};