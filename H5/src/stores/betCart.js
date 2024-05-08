import { defineStore } from 'pinia'
import { bookBet, updateOddBeforeBet, SingleBet, betMultiple, getStakeOrderStatus } from '@/api/fb'
import { unionBy, groupBy, filter, mergeWith, isArray } from 'lodash'
import { showToast } from 'vant'
import { nextTick } from 'vue'
import i18n from '@/i18n/index'
export const useBetCartStore = defineStore('betCart', {
  state: () => ({
    isOpenBetCart: false, // 购物车开关
    betsLimit: 10, // 最多处理10个注单
    betList: [], // 选中的注单列表
    submitBetList: [], // 提交的注单列表
    isSelectSeries: false, // 默认查询单关
    isOpenConfirmDialog: false, // 注单确认框
    orderList: [], // 投注后返回的注单ids
    orderStatusList: [], //订单状态集合
    sos: [],
    // 可提交的串关时长玩法集合
    canSubmitMultiBetMarkets: []
  }),
  getters: {
    betNums() {
      return this.betList.length
    },
    isShowBetCartHead() {
      return this.betNums
    },
    orderFailStatus() {
      return this.orderStatusList.every((item) => [2, 3].includes(item.st))
    },
    orderConfirmStatus() {
      return this.orderStatusList.some((item) => [0, 1].includes(item.st))
    },
    orderSuccessStatus() {
      return this.orderStatusList.some((item) => [4, 5].includes(item.st))
    },
    // 可串关注单选项
    canMultiBetsList() {
      // 过滤相同赛事
      let groupByMatchId = groupBy(this.betList, 'matchId')
      let list = filter(this.betList, (obj) => groupByMatchId[obj.matchId].length < 2)
      // 过滤不支持串或闭盘
      list = list.filter((bet) => bet.au === 1 && bet.ss === 1 && bet.betMatchMarket.odds > 0)
      return list
    }
  },
  actions: {
    openBetCart() {
      this.isOpenBetCart = true
    },
    closeBetCart() {
      this.isOpenBetCart = false
    },
    openConfirmDialog() {
      this.isOpenConfirmDialog = true
    },
    closeConfirmDialog() {
      this.isOpenConfirmDialog = false
    },
    setBetList(list) {
      this.betList = list
    },
    toggleBet(bet, { x, y }) {
      // 先判断该注单是否已存在购物车 marketId 、nm 、ty 为固定字段可用于匹配标识
      let added = this.betList.find(
        (item) =>
          `${item.id}-${item.betMatchMarket.optionType}-${item.visible.betOpTitle}` ===
          `${bet.id}-${bet.betMatchMarket.optionType}-${bet.visible.betOpTitle}`
      )
      if (added) {
        this.removeBet(bet)
      } else {
        this.addBet(bet, { x, y })
      }
    },
    addBet(bet, { x, y }) {
      if (this.betList.length >= this.betsLimit) {
        showToast(i18n.global.t('common.selectMatchLimit', { num: this.betsLimit }))
        return
      }
      // 判断是否同个玩法注单
      let idx = this.betList.findIndex((betItem) => betItem.id === bet.id)
      // 先删除
      if (idx > -1) {
        this.betList.splice(idx, 1)
      }
      // 再添加
      this.betList.push(bet)
      // 第一次选中注单打开购物车
      if (this.betList.length === 1 && !window.notFirstTimeOpenBetCart) {
        window.notFirstTimeOpenBetCart = true
        this.openBetCart()
      } else {
        // 执行动效
        nextTick(() => {
          createBall(x, y)
        })
      }
    },
    removeBet({ id }) {
      let idx = this.betList.findIndex((item) => item.id === id)
      if (idx > -1) {
        this.betList.splice(idx, 1)
      }
    },
    removeAllBets() {
      this.betList = []
      this.submitBetList = []
    },
    // 更新玩法赔率
    updateOddBeforeBet(data) {
      return updateOddBeforeBet(data).then((res) => {
        const bms = res.bms || []
        const sos = res.sos || [] // 串关玩法集合
        if (this.sos.length !== sos.length) {
          sos.forEach((item, idx) => {
            item.uniStake = ''
            item.id = idx
          })
          this.sos = sos
        } else {
          this.sos = unionBy(
            mergeWith(this.sos, sos, (objValue, srcValue) => {
              if (isArray(objValue)) {
                return objValue.concat(srcValue)
              }
            })
          )
        }

        this.betList.forEach((bet) => {
          const newBet = bms.find((item) => item.mid === bet.id)
          if (newBet) {
            bet.smin = newBet.smin // 最小下注
            bet.smax = newBet.smax // 最大下注
            bet.ss = newBet.ss // 更新玩法状态
            bet.au = newBet.au // 是否支持串关 1支持 0不支持
            bet.re = newBet.re //下注时的比分
            bet.ip = newBet.ip//是否是滚球
            
            if (newBet.op) {
              bet.changeStateClass = getChangeStateClass(newBet.op.od, bet.betMatchMarket.odds)
              bet.betMatchMarket.odds = newBet.op.od
              bet.nm = newBet.op['nm']//投注项目
            }
          }
        })
        // 复原状态
        let t = setTimeout(() => {
          this.betList.forEach((bet) => {
            bet.changeStateClass = ''
          })
          clearTimeout(t)
          t = null
        }, 2000)
      })
    },

    // 批量投单关
    submitSingleBet(data) {
      return SingleBet(data)
    },

    // 批量投串关
    submitMultiple(data) {
      return betMultiple(data)
    },
    // 刷新订单状态
    getStakeOrderStatus(data) {
      return getStakeOrderStatus(data).then((res) => {
        this.orderStatusList = res || []
      })
    },
    // 预约投注
    bookBet(data) {
      return bookBet(data)
    }
  }
})

function getChangeStateClass(newValue, oldValue) {
  if (newValue > oldValue) {
    return 'up'
  }
  if (newValue < oldValue) {
    return 'down'
  }
  return ''
}

function createBall(left, top) {
  console.log(left, top)
  let bar = document.createElement('div')
  bar.className = 'bet-cart-bar'
  bar.style.left = left + 'px'
  bar.style.top = top + 'px'
  document.body.appendChild(bar)
  // 添加动画属性
  setTimeout(() => {
    let target = document.querySelector('.cart-head-wrapper .bet-num')
    const { x, y } = target.getBoundingClientRect()
    const scrollTop =
      window.scrollY || document.documentElement.scrollTop || document.body.scrollTop
    bar.style.left = x + target.offsetWidth / 2 + 'px'
    bar.style.top = y + scrollTop + 'px'
  }, 0)

  /**
   * 动画结束后，删除自己
   */
  bar.ontransitionend = function () {
    this.remove()
  }
}
