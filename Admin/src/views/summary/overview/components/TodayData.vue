<template>
  <div class="today-data">
    <div class="header-title">
      <div class="title">{{ $t("summary.todayData") }}</div>
      <img src="../img/check.png" alt="" class="check-img" />
    </div>
    <div class="today-data-content">
      <div class="left">
        <div class="online-user">
          <div class="user-top title-font-400">
            <div class="num">{{ formatDataPercent(onlineNumberRate) }}</div>
            <div>{{ $t("summary.thanYesterday") }}</div>
          </div>
          <div class="user-img">
            <img src="../img/online-users.png" alt="" style="width: 60px" />
          </div>
          <div class="user-bottom">
            <div class="actual-num">{{ onlineNumber || 0 }}</div>
            <div class="actual-text">{{ $t("summary.onlineNumber") }}</div>
          </div>
        </div>
        <div class="register">
          <div class="top">
            <div class="upload-img">
              <img src="../img/upload-user.png" alt="" style="width: 60px" />
            </div>
            <div class="user-top title-font-400">
              <div class="num">{{ formatDataPercent(registerNumberPer) }}</div>
              <div>{{ $t("summary.thanYesterday") }}</div>
            </div>
          </div>
          <div class="bottom">
            <div class="common-font num">{{ registerNumber || 0 }}</div>
            <div class="common-font text">{{ $t("summary.register") }}</div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="right-content" v-for="item in todayData">
          <div class="user-top title-font-400">
            <div class="num">{{ formatDataPercent(item.compare) }}</div>
            <div>{{ $t("summary.thanYesterday") }}</div>
          </div>
          <div class="middle">
            <div>
              <img :src="getImg(item.title)" alt="" />
            </div>
            <div class="mt-16 mb-16 common-font">
              {{ item.value || 0 }}
              <span v-if="item.title === $t('summary.companyWinOrLose')">
                <span class="ml-8 mr-8">/</span>
                <span>{{ formatDataPercent(item.platformWin) }}</span>
              </span>
            </div>
            <div class="title-font">
              {{ item.title }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-data">
      <div class="content" v-for="item in todayDataBottom">
        <div class="img">
          <img :src="getImg(item.title)" alt="" />
        </div>
        <div class="content-right">
          <div class="value common-font">{{ item.value || 0 }}</div>
          <div class="title-font">{{ item.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import Recharge from "../img/recharge.png";
import Withdraw from "../img/withdraw.png";
import ValidBet from "../img/valid-bet.png";
import Company from "../img/company.png";
import DepositNum from "../img/deposit-num.png";
import DepositAmount from "../img/deposit-amount.png";
import Payout from "../img/payout.png";
import Difference from "../img/differenc.png";
import AddVisit from "../img/add.png";
import RechargeNum from "../img/recharge-num.png";
import ActiveUser from "../img/active-user.png";
import { formatDataPercent } from "@/utils/index";
import { getTodayData } from "@/api/summary/index";
import { onMounted } from "vue";

const onlineNumberRate = ref(15); //在线人数较昨日
const onlineNumber = ref(10); // 在线人数
const registerNumber = ref(0); //注册人数 
const registerNumberPer = ref(1); //注册人数较昨日
const todayData = ref([
  {
    compare: 0,
    title: i18n.global.t("summary.rechargeAmount"),
    value: 0,
  },
  {
    compare: 0,
    title: i18n.global.t("summary.withdrawAmount"),
    value: 0,
  },
  {
    compare: 0,
    title: i18n.global.t("summary.validBet"),
    value: 0,
  },
  {
    compare: 0,
    title: i18n.global.t("summary.companyWinOrLose"),
    value: 0,
  },
  {
    compare: 0,
    title: i18n.global.t("summary.firstDepositNumber"),
    value: 0,
  },
  {
    compare: 0,
    title: i18n.global.t("summary.firstDepositAmount"),
    value: 0,
  },
  {
    compare: 0,
    title: i18n.global.t("summary.payoutAmount"),
    value: 0,
  },
  {
    compare: 0,
    title: i18n.global.t("summary.rechargeWithdrawDifference"),
    value: 0,
  },
]);

const todayDataBottom = ref([
  {
    title: i18n.global.t("summary.addVisit"),
    value: 100,
  },
  {
    title: i18n.global.t("summary.rechargeNumber"),
    value: 100,
  },
  {
    title: i18n.global.t("summary.activeUser"),
    value: 100,
  },
]);

onMounted(() => {
  getList();
});
function getList() {
  getTodayData().then((res) => {
    todayData.value = assembleData(todayData.value, res);
    todayDataBottom.value = assembleData(todayDataBottom.value, res);
    registerNumber.value = res.regCount;
    registerNumberPer.value = res.regCountPer;
    onlineNumber.value = res.onLineCount;
    onlineNumberRate.value = res.onLineCountPer;
  });
}
function assembleData(list, res) {
  list.forEach((item) => {
    if (item.title === i18n.global.t("summary.rechargeAmount")) {
      item.value = res.rechargeAmount;
      item.compare = res.rechargeAmountPer;
    } else if (item.title === i18n.global.t("summary.withdrawAmount")) {
      item.value = res.withdrawAmount;
      item.compare = res.withdrawAmountPer;
    } else if (item.title === i18n.global.t("summary.validBet")) {
      item.value = res.validBet;
      item.compare = res.validBetPer;
    } else if (item.title === i18n.global.t("summary.companyWinOrLose")) {
      item.platformWin = res.platformWinDevPer;
      item.value = res.platformWin;
      item.compare = res.platformWinPer;
    } else if (item.title === i18n.global.t("summary.firstDepositNumber")) {
      item.value = res.firstDepCount;
      item.compare = res.firstDepCountPer;
    } else if (item.title === i18n.global.t("summary.firstDepositAmount")) {
      item.value = res.firstDpAmount;
      item.compare = res.firstDpAmountPer;
    } else if (item.title === i18n.global.t("summary.payoutAmount")) {
      item.value = res.settleAmount;
      item.compare = res.settleAmountPer;
    } else if (item.title === i18n.global.t("summary.rechargeWithdrawDifference")) {
      item.value = res.rechargeWithdrawAmount;
      item.compare = res.rechargeWithdrawAmountPer;
    }else if (item.title === i18n.global.t("summary.addVisit")) {
      item.value = res.accessCount;
    }else if (item.title === i18n.global.t("summary.rechargeNumber")) {
      item.value = res.rechargeCount;
    }else if (item.title === i18n.global.t("summary.activeUser")) {
      item.value = res.briskCount;
    }
  });
  return list;
}
function getImg(title) {
  switch (title) {
    case i18n.global.t("summary.rechargeAmount"):
      return Recharge;
    case i18n.global.t("summary.withdrawAmount"):
      return Withdraw;
    case i18n.global.t("summary.validBet"):
      return ValidBet;
    case i18n.global.t("summary.companyWinOrLose"):
      return Company;
    case i18n.global.t("summary.firstDepositNumber"):
      return DepositNum;
    case i18n.global.t("summary.firstDepositAmount"):
      return DepositAmount;
    case i18n.global.t("summary.payoutAmount"):
      return Payout;
    case i18n.global.t("summary.rechargeWithdrawDifference"):
      return Difference;
    case i18n.global.t("summary.addVisit"):
      return AddVisit;
    case i18n.global.t("summary.rechargeNumber"):
      return RechargeNum;
    case i18n.global.t("summary.activeUser"):
      return ActiveUser;
  }
}
</script>

<style lang="scss" scoped>
.today-data {
  .header-title {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    .title {
      font-size: 18px;
      color: #333333;
      font-weight: 600;
      margin-right: 24px;
    }
    .check-img {
      width: 35px;
    }
  }
  .today-data-content {
    display: flex;
    .left {
      margin-right: 20px;
      .online-user {
        width: 268px;
        height: 311px;
        background: rgba(193, 236, 227, 1);
        padding: 20px 32px 20px 20px;
        border: 1px solid rgba(121, 121, 121, 1);
        .user-top {
          text-align: right;
          .num {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        .user-img {
          margin-top: 60px;
          margin-left: 70px;
        }
        .user-bottom {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding-right: 20px;
          .actual-num {
            margin: 16px 0;
            color: #333333;
            font-weight: 600;
          }
          .actual-text {
            font-size: 18px;
            color: #333333;
            font-weight: 600;
          }
        }
      }
      .register {
        width: 268px;
        height: 140px;
        background: #ffffff;
        padding-right: 32px;
        padding-top: 20px;
        margin-top: 20px;
        border: 1px solid rgba(121, 121, 121, 1);
        .top {
          display: flex;
          margin-left: 70px;
          justify-content: space-between;
          .user-top {
            text-align: right;
            .num {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
        .bottom {
          margin-left: 70px;
          width: 60px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .num {
            margin: 4px 0;
          }
          .text {
            font-size: 18px;
          }
        }
      }
    }
    .right {
      flex: 1;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 10px 20px;
      .right-content {
        border: 1px solid rgba(121, 121, 121, 1);
        padding: 20px 32px 20px 20px;
        .user-top {
          text-align: right;
          .num {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        .middle {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        img {
          width: 60px;
        }
      }
    }
  }
  .bottom-data {
    display: flex;
    justify-content: space-between;
    margin-top: 12px;
    padding: 20px;
    border: 1px solid rgba(121, 121, 121, 1);
    .content {
      display: flex;
      justify-content: center;
      .img img {
        width: 60px;
        height: 60px;
      }
      .content-right {
        margin-left: 12px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .value {
          margin-bottom: 12px;
        }
      }
    }
  }
  .common-font {
    color: #333333;
    font-weight: 600;
  }
  .title-font {
    font-size: 18px;
    color: #333333;
    font-weight: 600;
  }
  .title-font-400 {
    font-size: 18px;
    color: #333333;
  }
}
</style>
