import { defineStore } from "pinia";
import eventBus from "@/utils/eventBus";
import {
  bookBet,
  updateOddBeforeBet,
  SingleBet,
  betMultiple,
  getStakeOrderStatus,
} from "@/api/fb";
import { unionBy, groupBy, filter, mergeWith, isArray } from "lodash";
export const useBetCartStore = defineStore("betCart", {
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
    canSubmitMultiBetMarkets: [],
    anchorBetObj: {}, //直播间投注的对象
    anchorBetOdss: [], //直播间投注赔率刷新
    anchorBetType: 1, //直接间 投注类型 1跟单 3投注 2晒单跟单
    isClickBetLayer: false, //是否点击了遮罩层
    ifShowLayer: true, //是否显示购物车遮罩层
  }),
  getters: {
    betNums() {
      return this.betList.length;
    },
    isShowBetCartHead() {
      return this.betNums;
    },
    orderFailStatus() {
      return this.orderStatusList.every((item) => [2, 3].includes(item.st));
    },
    orderConfirmStatus() {
      return this.orderStatusList.some((item) => [0, 1].includes(item.st));
    },
    orderSuccessStatus() {
      return this.orderStatusList.some((item) => [4, 5].includes(item.st));
    },
    // 可串关注单选项
    canMultiBetsList() {
      // 过滤相同赛事
      let groupByMatchId = groupBy(this.betList, "matchId");
      let list = filter(
        this.betList,
        (obj) => groupByMatchId[obj.matchId].length < 2
      );
      // 过滤不支持串或闭盘
      list = list.filter(
        (bet) => bet.au === 1 && bet.ss === 1 && bet.betMatchMarket.odds > 0
      );
      return list;
    },
  },
  actions: {
    openBetCart() {
      this.isOpenBetCart = true;
    },
    closeBetCart() {
      this.isOpenBetCart = false;
    },
    openConfirmDialog() {
      this.isOpenConfirmDialog = true;
    },
    closeConfirmDialog() {
      this.isOpenConfirmDialog = false;
    },
    setBetList(list) {
      this.betList = list;
    },
    toggleBet(bet, { x, y }) {
      // 先判断该注单是否已存在购物车 marketId 、nm 、ty 为固定字段可用于匹配标识
      let added = this.betList.find(
        (item) =>
          `${item.id}-${item.betMatchMarket.optionType}-${item.visible.betOpTitle}` ===
          `${bet.id}-${bet.betMatchMarket.optionType}-${bet.visible.betOpTitle}`
      );
      if (added) {
        this.removeBet(bet);
      } else {
        this.addBet(bet, { x, y });
      }
    },
    addBet(bet) {
      // if (this.betList.length >= this.betsLimit) {
      //   // showToast(`最多选择${10}场比赛`)
      //   console.log(`最多选择${10}场比赛`);
      //   return;
      // }
      // let idx = this.betList.findIndex((betItem) => betItem.id === bet.id);
      // 先删除
      // if (idx > -1) {
      //   this.betList.splice(idx, 1);
      // }
      this.betList = [];
      // 再添加
      this.betList.push(bet);
    },
    removeBet({ id }) {
      let idx = this.betList.findIndex((item) => item.id === id);
      if (idx > -1) {
        this.betList.splice(idx, 1);
      }
    },
    removeAllBets() {
      this.betList = [];
      this.submitBetList = [];
    },
    // 更新玩法赔率
    updateOddBeforeBet(data) {
      return updateOddBeforeBet(data).then((res) => {
        this.anchorBetOdss = res;
        const bms = res.bms || [];
        const sos = res.sos || []; // 串关玩法集合
        if (this.sos.length !== sos.length) {
          sos.forEach((item, idx) => {
            item.uniStake = "";
            item.id = idx;
          });
          this.sos = sos;
        } else {
          this.sos = unionBy(
            mergeWith(this.sos, sos, (objValue, srcValue) => {
              if (isArray(objValue)) {
                return objValue.concat(srcValue);
              }
            })
          );
        }

        this.betList.forEach((bet) => {
          const newBet = bms.find((item) => item.mid === bet.id);
          if (newBet) {
            bet.smin = newBet.smin; // 最小下注
            bet.smax = newBet.smax; // 最大下注
            bet.ss = newBet.ss; // 更新玩法状态
            bet.au = newBet.au; // 是否支持串关 1支持 0不支持
            if (newBet.op) {
              bet.changeStateClass = getChangeStateClass(
                newBet.op.od,
                bet.betMatchMarket.odds
              );
              bet.betMatchMarket.odds = newBet.op.od;
            }
          }
        });
        // 复原状态
        let t = setTimeout(() => {
          this.betList.forEach((bet) => {
            bet.changeStateClass = "";
          });
          clearTimeout(t);
          t = null;
        }, 2000);
      });
    },

    // 批量投单关
    submitSingleBet(data) {
      return SingleBet(data);
    },

    // 批量投串关
    submitMultiple(data) {
      return betMultiple(data);
    },
    // 刷新订单状态
    getStakeOrderStatus(data) {
      return getStakeOrderStatus(data).then((res) => {
        this.orderStatusList = res || [];
      });
    },
    // 预约投注
    bookBet(data) {
      return bookBet(data);
    },
  },
});
