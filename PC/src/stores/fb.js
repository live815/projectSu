import { defineStore } from 'pinia'
import { getFBToken, getGuestModeFBToken } from '@/api/game'
import {
  getMatchList,
  getStatistical,
  getOnSaleLeagues,
  getMatchDetail,
  getMatchResultPage,
  getqueryMatchByRecommend,
  getSportLanguagePackage,
  getMatchCountList,
  getMatchResultList
} from '@/api/fb'
import { factoryArr, SPORT_IDS } from '@/hooks/useSportDict'
import {
  getFBConfig,
  setFBConfig,
  getToken,
  getFollowList,
  setFollowList,
  getSettings,
  setSettings
} from '@/utils/cache'
import { getSatelliteList } from '@/api/liveBroadcast'
import { useLiveStore } from '@/stores/liveBroadcast'
import { getFBLanguage } from '@/i18n'
import { ERR_OK } from '@/utils/config'
import { useAppStore } from '@/stores/app'
const getDefaultQueryParams = () => ({
  current: 1, // 当前页码
  orderBy: 0, // 赛事列表排序方式：0 按开赛时间排序，1 按联赛排序
  size: 50, // 每页大小, 默认50，一页最多50
  isPC: true,
  type: 1, // 赛事分组
  beginTime: null, //查询开始时间戳，13位时间戳
  endTime: null, //查询结束时间戳，13位时间戳
  leagueIds: [], // 联赛id集合，可批量获取多个联赛的赛事及赔率信息
  sportId: 1, // 运动ID
  oddsType: 1
})
export const useFBStore = defineStore('fb', {
  state: () => ({
    FBConfig: getFBConfig(), // token, apiBaseUrl
    matchList: [], // 赛事列表
    matchAnchorList: [], //直播间 赛事列表
    followList: getFollowList(), // 关注列表缓存里面的赛事id
    followLists: [], // 关注列表根据缓存里面matchIds返回的赛事详情
    previousMatchList: [], // 用于上一个赛事列表
    statistical: {}, // 赛事统计
    leagues: [], // 联赛列表
    queryMatchListParams: getDefaultQueryParams(),
    settings: getSettings(),
    languagePackage: {}, // 语言包
    matchDetailList: {}, // 赛事详情接口全部数据,
    previousMatchDetailData: {}, // 保存上一个赛事详情数据
    isLoading: false, // 请求接口数据页面获取异步问题
    matchDetaiTabList: [], //赛事详情页玩法分类Tab
    isOperatedMatchListCollapse: false, // 标识用户是否手动操作了比赛列表折叠面板
    matchListIds: [], // 比赛列表id集合
    isOperatedMarketsListCollapse: false, // 标识用户是否手动操作了详情页玩法列表折叠面板
    mgListIdxs: [], // 赛事玩法列表idx集合
    ballTypeName: '', //投注区中间区域的标题
    eventChooseStatus: false, //赛事筛选是否显示的状态
    eventFilterStatu: false, //赛事筛选状态
    followListNum: 0, //关注赛事数量
    rollingBallNum: 0, //滚球数量
    previoustotalLive: null, //上一次滚球总数
    chanmpionNum: 0, //冠军赛事数量
    EventChooseList: [], //赛事筛选列表
    previousEventChooseList: [], //上次选择的赛事筛选列表
    sportMenuStatus: true, //体育菜单状态默认展开
    hotMenuStatus: true, //热门赛事菜单状态默认展开
    matchReaultlist: [], //赛事赛果列表
    isMatchResult: false, //比分状态
    isClickRightTitle: false, //是否点击了右侧赛事标题
    queryMatchList: [], //搜索赛事列表
    closeSearch: false, //关闭赛事搜索页面
    defaultActiveEvent: 0, //默认选中赛事
    rightList: [], //投注区右侧赛事
    rightDropDownList: [], //投注区右侧下拉框赛事列表
    rightSideDropBox: false, //下拉框状态
    skeletonLoading: false, //赛事详情骨架屏loading
    listIds: [], //赛事折叠列表
    isOperatedListCollapse: false, //赛事折叠状态
    curEvent: [], //当前赛事
    curPage: 'allList', //投注区当前页面
    curEventId: 0, //当前赛事id
    isShowBallType: true, //是否显示顶部滚球类型
    isClickHotList: false, //点击热门赛事
    isClickmyfollow: false, //点击我的关注
    isChampionsList: false, //点击冠军赛事
    isRollingBall: true, //点击滚球
    reqestStatus: false, //赛事请求状态
    searchHistory: [], //赛事搜索记录
    totalLive: 0, //滚球总数
    pageSize: 50, //一页显示的条数
    current: 1, //页数
    isCartoon: false, //播放动画
    isData: false, //得分数据
    isVedio: false, //播放视频
    todayEvent: [], //即将开始的今日赛事
    isShowAll: true, //显示“全部”的图标
    isMyFollow: false, //
    ClickComingSoon: false, //点击即将开始
    clickProcess: false, //点击进行中
    isClickColmn: false, //点击盘口投注
    isClickBallType: false, //点击顶部其他球类型
    handicaplength: 0, //盘口数量
    isClickAll: true, //点击全部
    MyFollowList: [], //我收藏的全部赛事
    matchIds: [], //我收藏的全部赛事的id
    totalNum: 0, //当前页面赛事总数
    eventChooseNum: 0, //赛事筛选数量
    eventChoose: 1, //赛事筛选
    allmatchlist: [], //未组装的数组
    todayBall: 0, //今日球类型
    morningBall: 0, //早盘球类型
    objLists: [], //组合数据
    Median: 1, //中间值用于直播和活动跳转到投注页面
    ifMaintain: false, //是否维护
    maintime: '', //维护时间
    videoSource: 'video1' // video1破晓，video2 pm视频源
  }),
  getters: {
    languageType() {
      const appStore = useAppStore()
      return getFBLanguage(appStore.language)
    }
  },
  actions: {
    setSettings(settings) {
      this.settings = setSettings(settings)
    },
    collect({ sid, id }) {
      if (!this.followList[sid]) {
        this.followList[sid] = []
      }
      let idx = this.followList[sid].findIndex((matchId) => id === matchId)
      // 如果当前已关注
      if (idx > -1) {
        this.followList[sid].splice(idx, 1)
      } else {
        this.followList[sid].push(id)
      }
      setFollowList(this.followList)
    },
    // 重置查询参数
    resetQueryParams() {
      this.queryMatchListParams = getDefaultQueryParams()
    },
    // 获取FBToken
    getFBToken() {
      const isLogin = getToken()
      if (isLogin) {
        return getFBToken().then((res) => {
          if (res.code === ERR_OK) {
            let { apiServerAddress, token } = res.data
            this.setFBToken({
              FBToken: token,
              FBBaseURL: apiServerAddress
            })
          }
        })
      } else {
        // 获取游客模式token
        return getGuestModeFBToken().then((res) => {
          const FBToken = res.data.token
          const FBBaseURL = res.data.apiServerAddress
          this.setFBToken({
            FBToken,
            FBBaseURL
          })
        })
      }
    },
    // 设置FBToken
    setFBToken(FBConfig) {
      this.FBConfig = setFBConfig(FBConfig)
    },
    // 获取比赛列表
    getMatchList(data) {
      const liveStore = useLiveStore()
      if (data.leagueId && !data.type) {
        this.isClickRightTitle = true
      }
      return getMatchList(data).then((res) => {
        this.isLoading = false
        this.skeletonLoading = false
        if (data.matchIds?.length > 0) {
          //我的关注
          this.MyFollowList = res.records || []
        }
        if (data.matchIds?.length == this.MyFollowList.length) {
          this.followListNum = this.MyFollowList.length
        }
        if (this.isClickRightTitle) {
          this.rightDropDownList = res.records || [] //右侧下拉框赛事
        } else {
          let list = res.records || []
          this.totalNum = res.total
          // list.sort((a, b) => a.lg.or - b.lg.or)
          // 冠军类型
          if (data.type == 7) {
            this.matchList = list
            this.reqestStatus = true
            this.matchListIds = list.map((item) => item.id)
          } else if (data.type == 3) {
            this.todayEvent = factoryArr(list)
            this.matchList = factoryArr(list)
          } else {
            if (!data.matchIds && !this.isClickmyfollow) {
              this.matchList = factoryArr(list)
            }

            if (this.isRollingBall && this.eventChoose == 0) {
              this.eventChooseNum = res.total
            }

            this.eventChooseNum = res.total

            this.matchList = factoryArr(list)
          }
          let arr = []
          //根据视频id去匹配赛事 有视频的就返回
          getSatelliteList().then((res) => {
            let resultArr = []
            arr = res.data[this.videoSource]
            if (res.data[this.videoSource] && res.data[this.videoSource]?.length > 0) {
              resultArr = list
                .map((item) => {
                  // 判断条件：ms 不等于 5 或者 (ms 等于 5 且在 arr2 中找到相同 id)
                  if (
                    item.ms !== 0 &&
                    (item.ms !== 5 ||
                      ([5, 8].includes(item.ms) &&
                        res.data[this.videoSource].find((obj) => obj.fbId === item.id)))
                  ) {
                    // 合并两个对象
                    return {
                      ...item,
                      ...res.data[this.videoSource].find((obj) => obj.fbId === item.id)
                    }
                  } else {
                    return null // 不符合条件返回 null
                  }
                })
                .filter((item) => item !== null)
            } else {
              resultArr = list.filter((item) => ![0, 5].includes(item.ms))
            }
            if (resultArr && resultArr.length > 0) {
              const foundItem = resultArr.find((item) => item.id === liveStore.liveRoom?.id)
              if (!foundItem) {
                liveStore.liveRoom = resultArr[0]
              } else {
                // liveStore.liveRoom={}
              }
            }
            this.matchAnchorList = resultArr
            // 点击滚球的时候，匹配直播赛事
            if (data.type == 1 && this.isRollingBall && arr?.length > 0) {
              //根据视频id去匹配赛事 有视频的就返回
              let resultArr = []
              resultArr = list.map((item) => {
                // 判断条件：ms 不等于 5 或者 (ms 等于 5 且在 arr2 中找到相同 id)
                if (
                  item.ms !== 5 ||
                  ([5, 8].includes(item.ms) &&
                    res.data[videoSource].find((obj) => obj.fbId === item.id))
                ) {
                  // 合并两个对象
                  return { ...item, ...res.data[videoSource].find((obj) => obj.fbId === item.id) }
                } else {
                  return item
                }
              })
              if (resultArr.find((item) => item.liveUrl)) {
                this.allmatchlist = resultArr
                this.matchList = factoryArr(resultArr)
              }
              this.allmatchlist = resultArr
              //  console.log( this.matchList ,' this.matchList ')
            }
          })
        }
      })
    },
    // 获取赛事统计
    getStatistical() {
      return getStatistical().then((res) => {
        // console.log(res,'res7777777')
        if (res.code == 8) {
          //三方维护
          this.ifMaintain = true
          // const str = '系统维护中，维护时间[1708927200000-1708930800000]';
          // 使用正则表达式提取时间数字
          const regex = /\[(\d+)-(\d+)\]/
          const matches = res.message.match(regex)
          if (matches) {
            const startTime = parseInt(matches[1])
            const endTime = parseInt(matches[2])

            // 将时间戳转换为 Date 对象，并格式化为年月日时分
            const startDate = new Date(startTime)
            const endDate = new Date(endTime)
            const startFormatted = startDate.toLocaleString()
            const endFormatted = endDate.toLocaleString()

            this.maintime = startFormatted + '-' + endFormatted
          }
        } else {
          this.ifMaintain = false
          this.statistical = res || {}
          let total1 = this.statistical.sl?.find((item) => item.ty === 7)
          let total2 = this.statistical.sl?.find((item) => item.ty === 1)
          let res2 = this.statistical.sl.find((item) => item.ty == 3)
          let res3 = this.statistical.sl.find((item) => item.ty == 4)
          this.todayBall = res2.ssl //今日球类型
          this.morningBall = res3.ssl //早盘球类型
          this.totalLive = total2.tc //滚球总数

          const sportIdsValues = Object.values(SPORT_IDS)
          // console.log(sportIdsValues,'sportIdsValues')
          // 遍历循环，筛选出sid不存在于SPORT_IDS中的数据
          const filteredArr = total1.ssl?.filter((item) => {
            // console.log(item,'item',sportIdsValues.includes(item.sid)  && item.c>0)
            return !sportIdsValues.includes(item.sid) && item.c > 0
          })
          // console.log(filteredArr,filteredArr[0].c)
          // 把不存在的赛事条数相加
          const sum = filteredArr.reduce((acc, element) => {
            if (element.c > 0) {
              return acc + element.c
            }
            return acc
          }, 0)

          // console.log(sum);

          // 返回的总数减去不存在的赛事条数
          this.chanmpionNum = total1.tc - sum //冠军总数
        }
      })
    },
    // 获取体育语言包
    getSportLanguagePackage() {
      return getSportLanguagePackage().then((res) => {
        this.languagePackage = res || {}
      })
    },
    // 查询联赛列表
    getOnSaleLeagues(data) {
      return getOnSaleLeagues(data).then((res) => {
        this.leagues = res || []
      })
    },
    // 获取单个赛事详情及玩法
    getMatchDetail(data) {
      return getMatchDetail(data).then((res) => {
        // 测试数值变化
        // testOddNumber(res.mg)
        // console.log(res)
        this.matchDetailList = res || {}
      })
    },
    //分页获取赛事赛果列表
    getMatchResultPage(data) {
      return getMatchResultPage(data).then((res) => {
        // this.matchReaultlist = res.records || []
      })
    },
    // 根据球队或者赛事名搜索赛事
    getqueryMatchByRecommend(data) {
      return getqueryMatchByRecommend(data).then((res) => {
        this.queryMatchList = res || []
      })
    },
    // 获取赛事未来天数的赛事数量
    getMatchCountList(data){
      return getMatchCountList(data).then((res) => {
        this.matchCountlist = res || []
      })
    },
    // 获取赛事赛果列表 
    getMatchResultList(data){
      return getMatchResultList(data).then((res) => {
        // console.log(res)
        this.matchReaultlist = res || []
      })
    }
  }
})
