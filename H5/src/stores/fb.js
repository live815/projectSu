import { defineStore } from 'pinia'
import { getGuestModeFBToken, getFBToken } from '@/api/game'
import {
  getMatchList,
  getStatistical,
  getOnSaleLeagues,
  getMatchDetail,
  getSportLanguagePackage
} from '@/api/fb'
// import {  testOddNumber } from '@/hooks/useSportDict'
import {
  getFBConfig,
  setFBConfig,
  getToken,
  getFollowList,
  setFollowList,
  getSettings,
  setSettings
} from '@/utils/cache'
import { ERR_OK } from '@/utils/config'
import { getFBLanguage } from '@/i18n'
import { useAppStore } from '@/stores/app'
import { SPORT_IDS } from '@/hooks/useSportDict'

const getDefaultQueryParams = () => ({
  orderBy: 0, // 赛事列表排序方式：0 按开赛时间排序，1 按联赛排序
  isPC: false,
  type: 1, // 赛事分组
  beginTime: null, //查询开始时间戳，13位时间戳
  endTime: null, //查询结束时间戳，13位时间戳
  leagueIds: null, // 联赛id集合，可批量获取多个联赛的赛事及赔率信息
  sportId: 1 // 运动ID
})
export const useFBStore = defineStore('fb', {
  state: () => ({
    FBConfig: getFBConfig(), // token, apiBaseUrl
    matchList: [], // 赛事列表
    followList: getFollowList(), // 关注列表
    previousMatchList: [], // 用于上一个赛事列表
    statistical: {}, // 赛事统计
    leagues: [], // 联赛列表
    queryMatchListParams: getDefaultQueryParams(),
    settings: getSettings(),
    matchDetailList: {}, // 赛事详情接口全部数据,
    previousMatchDetailData: {}, // 保存上一个赛事详情数据
    isOperatedMatchListCollapse: false, // 标识用户是否手动操作了比赛列表折叠面板
    matchListIds: [], // 比赛列表id集合
    isOperatedMarketsListCollapse: false, // 标识用户是否手动操作了详情页玩法列表折叠面板
    mgListIdxs: [], // 赛事玩法列表idx集合
    languagePackage: {}, // 语言包
    tabId: 0, //意见反馈里面的常见问题tab
    serviceId: 0, //问题ID
    ifMaintain: false, //是否维护
    maintime: '' //维护时间
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
          console.log(res)
          if (res.code === ERR_OK) {
            console.log(res)
            let { apiServerAddress, token } = res.data
            console.log('res.data', res.data)
            this.setFBToken({
              FBToken: token,
              FBBaseURL: apiServerAddress
            })
          }
        })
      } else {
        // 获取游客模式token
        return getGuestModeFBToken().then((res) => {
          console.log(res)
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
      return getMatchList(data).then((res) => {
        const total = res.total || 0
        let list = res.records || []
        // 测试数值变化
        // list.forEach((match) => {
        //   testOddNumber(match.mg)
        // })
        return { list, total }
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
        console.log(res.data)
        this.leagues = res || []
      })
    },
    // 获取比赛详情数据
    getMatchDetail(data) {
      return getMatchDetail(data).then((res) => {
        // 测试数值变化
        // testOddNumber(res.mg)
        this.matchDetailList = res || {}
      })
    }
  }
})
