<template>
  <div class="member-detail-financial-info" v-loading="loadingFinancial">
    <div class="center-refresh">
      <h3>{{ $t('member.centerWallet') }}</h3>
      <el-button type="primary" size="small" icon="Refresh" @click="queryFundWallet">{{ $t('member.refresh') }}</el-button>
    </div>
    <div class="center-content">
      <div>
        <p>
          <span class="wallet-name">{{ $t('member.centerWalletBalance') }}</span>
          <span class="wallet-title">{{ formatNumber(totalWallet) }}</span>
        </p>
        <p>
          <span class="wallet-name">{{ $t('member.withdrawFreezeAmount') }}</span>
          <span class="wallet-title">{{ formatNumber(wdHoldWallet) }}</span>
          <span class="wallet-name ml-20">{{ $t('member.fundsAdjustFreezenAmount') }}:</span>
          <span class="wallet-title">{{ formatNumber(adjustHoldWallet) }}</span>
        </p>
      </div>
    </div>
    <el-collapse v-model="activeNameLobby" accordion>
      <el-collapse-item name="1">
        <template #title>
          <span class="collaspe">{{ $t('member.clickCheckAllLobbyAmount') }}</span>
        </template>
        <!-- <span class="recycle-btn" @click="confirmRecycle">一键回收</span> -->
        <div class="collaspe-content">
          <div class="collaspe-content-child">
            <div class="child-left">
              <span class="stadium-name">{{ $t('member.totalAssetWallet') }}</span>
              <span>{{  formatNumber(totalWallet)  }}</span>
            </div>
            <span class="transfer-btn" @click="confirmRecycle">{{ $t('member.confirmRecycle') }}</span>
          </div>
          <div class="collaspe-content-child">
            <div class="child-left">
              <span class="stadium-name">{{ $t('member.withdrawFreezeAmountNoQuote') }}</span>
              <span>{{  formatNumber(wdHoldWallet)  }}</span>
            </div>
          </div>
          <div
            class="collaspe-content-child"
            v-for="item in bonusList"
            :key="item.lobbyName"
          >
            <div class="child-left">
              <span class="stadium-name">{{ item.lobbyName }}:</span>
              <span class="stadium-name">{{ item.memberName }}</span>
              <span>{{ item.lobbyWallet }}</span>
            </div>
            <span class="transfer-btn" @click="openTransferDia(item)"
              >{{ $t('member.transferIn') }}</span
            >
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
    <div class="recharge-withdrawl-info">
      <h3>{{ $t('member.rechargeWithdrawInformation') }}</h3>
      <el-form :model="withdrawInfo" :inline="true">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item :label="$t('member.totalDepositAmount')" prop="totalDepositAmount" class="full-width">
              <span>{{ formatNumber(withdrawInfo.totalDepositAmount) }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('member.totalDepositTimes')" prop="totalDepositTimes" class="full-width">
              <span>{{ withdrawInfo.totalDepositTimes||withdrawInfo.totalDepositTimes===0?withdrawInfo.totalDepositTimes : "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              :label="$t('member.lastDepositAmount')"
              prop="lastDepositAmount"
              class="full-width"
            >
              <span>{{ formatNumber(withdrawInfo.lastDepositAmount) }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              :label="$t('member.totalWithdrawAmount')"
              prop="totalWithdrawAmount"
              class="full-width"
            >
              <span>{{ formatNumber(withdrawInfo.totalWithdrawAmount) }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('member.totalWithdrawTimesOfLarge')" prop="totalWithdrawTimesOfLarge" class="full-width">
              <span class="mr-4">{{ withdrawInfo.totalWithdrawTimesOfCommon+withdrawInfo.totalWithdrawTimesOfLarge }}{{ $t('member.frequency') }}</span>
              <!-- (普通{{withdrawInfo.totalWithdrawTimesOfCommon}}次,大额{{ withdrawInfo.totalWithdrawTimesOfLarge }}次) -->
              {{ $t('member.totalWithdrawTimesOfLargeDetail',{num1:withdrawInfo.totalWithdrawTimesOfCommon,num2:withdrawInfo.totalWithdrawTimesOfLarge}) }}
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              :label="$t('member.totalDepositAmountOnBehalf')"
              prop="totalDepositAmountOnBehalf"
              class="full-width"
            >
              <span>{{ formatNumber(withdrawInfo.totalDepositAmountOnBehalf) }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('member.totalDepositTimesOnBehalf')" prop="totalDepositTimesOnBehalf" class="full-width">
              <span>{{ withdrawInfo.totalDepositTimesOnBehalf||withdrawInfo.totalDepositTimesOnBehalf===0?withdrawInfo.totalDepositTimesOnBehalf : "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('member.totalAddAmount')" prop="totalAddAmount" class="full-width">
              <div>{{ formatNumber(withdrawInfo.totalAddAmount) }}</div>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('member.totalReduceAmount')" prop="totalReduceAmount" class="full-width">
              <div>{{ formatNumber(withdrawInfo.totalReduceAmount) }}</div>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('member.totalAddTimes')" prop="totalAddTimes" class="full-width">
              <div>{{ withdrawInfo.totalAddTimes||withdrawInfo.totalAddTimes===0?withdrawInfo.totalAddTimes : "-" }}</div>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('member.totalReduceTimes')" prop="totalReduceTimes" class="full-width">
              <div>{{ withdrawInfo.totalReduceTimes||withdrawInfo.totalReduceTimes===0?withdrawInfo.totalReduceTimes : "-" }}</div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="withdrawl-info">
      <h3>{{ $t('member.withdrawTurnoverInformation') }}</h3>
      <el-form :model="depositInfo" :inline="true">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item :label="$t('member.userBalance')"  class="full-width">
              <span>{{ formatNumber(totalWallet) }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('member.totalBetRequest')" prop="totalBetRequest" class="full-width">
              <span>{{ formatNumber(depositInfo.totalBetRequest) }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              :label="$t('member.totalBetFinish')"
              prop="totalBetFinish"
              class="full-width"
            >
              <span>{{ formatNumber(depositInfo.totalBetFinish) }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              :label="$t('member.totalBetUnfinished')"
              prop="totalBetUnfinished"
              class="full-width"
            >
              <span>{{ formatNumber(depositInfo.totalBetUnfinished) }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              :label="$t('member.turnoverStartTime')"
              prop="startTime"
              class="full-width"
            >
              <span>{{ depositInfo.startTime || "-" }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="bet-info">
      <h3>{{$t('member.betInformation')}}</h3>
      <el-form :model="memberBetInfo" :inline="true">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item :label="$t('member.totalBet')" prop="betTotal" class="full-width">
              <span>{{ formatNumber(memberBetInfo.betTotal) }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('member.validBetQuote')" prop="validBetTotal" class="full-width">
              <span>{{ formatNumber(memberBetInfo.validBetTotal) }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              :label="$t('member.playerWinLose')"
              prop="profitAndLoss"
              class="full-width"
            >
              <span>{{ formatNumber(memberBetInfo.profitAndLoss) }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('member.rebateAmount')" prop="rebateAmount" class="full-width">
              <span>{{ formatNumber(memberBetInfo.rebateAmount) }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('member.welfareAmount')" prop="welfareAmount" class="full-width">
              <span>{{ formatNumber(memberBetInfo.welfareAmount) }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('member.payoutTotal')" prop="payoutTotal" class="full-width">
              <span>{{ formatNumber(memberBetInfo.payoutTotal) }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="top-3-info">
      <h3>{{ $t('member.platformTop3') }}</h3>
      <!-- <el-form :model="queryParams" :inline="true">
      <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="返水:" prop="userName" class="full-width">
              <span>{{ queryParams.userName || '-'  }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="红利:" prop="vipLevel" class="full-width">
              <span>{{ queryParams.vipLevel || '-'  }}</span>
            </el-form-item>
          </el-col>
      </el-row>
    </el-form> -->
      <h5>{{ $t('member.winlose') }}</h5>
      <el-table :data="winList" :empty-text="$t('member.noData')">
        <el-table-column :label="$t('member.platform')">
          <template #default="{ row }">
            <span class="pointer" @click="goBetOrderDetail">{{ row.lobbyName || "-" }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('member.memberWinLose')">
          <template #default="{ row }">
            <span>{{ formatNumber(row.profitAmount) }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('member.bet')">
          <template #default="{ row }">
            <span>{{ formatNumber(row.betAmount) }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('member.validBet')">
          <template #default="{ row }">
            <span>{{ formatNumber(row.validBetAmount) }}</span>
          </template>
        </el-table-column>
      </el-table>
      <h5>{{ $t('member.bet') }}</h5>
      <el-table :data="betList" :empty-text="$t('member.noData')">
        <el-table-column :label="$t('member.platform')">
          <template #default="{ row }">
            <span class="pointer" @click="goBetOrderDetail">{{ row.lobbyName || "-" }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('member.betAmount')">
          <template #default="{ row }">
            <span>{{ formatNumber(row.betAmount) }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('member.validBet')">
          <template #default="{ row }">
            <span>{{ formatNumber(row.validBetAmount) }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('member.memberWinLose')">
          <template #default="{ row }">
            <span>{{ formatNumber(row.profitAmount) }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <TransferDialog
      :cloneRow="cloneRow"
      :totalWallet="totalWallet"
      v-model:openTransfer="openTransfer"
      @onrefresh="queryFundWallet"
      v-if="openTransfer"
    />
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import {  watch } from "vue";
import TransferDialog from "./TransferDialog.vue";
import { formatNumber } from "@/utils/index"
import { getFundWallet,getMemberLobbyDataSumTop3,collectWallet,getMemberBetInfo,getdepositAndWithdraw,getMemberReport } from "@/api/member/list/index";
const props = defineProps(["queryParams","activeName"]);
const { proxy } = getCurrentInstance();
const router = useRouter();
const activeNameLobby = ref(""); //折叠面板控制项
const winList = ref([]); //top前三输赢的列表
const betList = ref([]); //top前三投注的列表
const bonusList = ref([]); // 全部场馆金额分布列表
const openTransfer = ref(false); //单个场馆钱包转入的开关
const cloneRow = ref(null); //单个场馆钱对象
const totalWallet = ref(0); //总资产余额
const wdHoldWallet = ref(0); //提现冻结钱包余额
const loadingFinancial = ref(false)
const memberBetInfo = ref({})
const depositInfo = ref({})
const withdrawInfo = ref({}); // 充提信息
const adjustHoldWallet = ref(0);

function queryFundWallet() {
   loadingFinancial.value = true
   return getFundWallet(props.queryParams.userName).then((res) => {
    loadingFinancial.value = false
    totalWallet.value = res.totalWallet || 0
    wdHoldWallet.value = res.wdHoldWallet || 0
    bonusList.value = res.lobbyWallets || []
    adjustHoldWallet.value = res.adjustHoldWallet || 0
  }).catch(()=>{
    loadingFinancial.value = false
  });
}
//查询会员投注信息
function queryMmeberBetInfo(){
   getMemberBetInfo({
    memberId:props.queryParams.id
  }).then(res=>{
    memberBetInfo.value = res || {}
  })
}
//查询会员充提信息
function querydepositAndWithdraw(){
  return getdepositAndWithdraw(props.queryParams.id).then(res=>{
    withdrawInfo.value = res || {}
  })
}
function queryMemberReport(){
  return getMemberReport(props.queryParams.id).then(res=>{
    depositInfo.value = res || {}
  })
}
//查询会员游戏平台top3的统计数据
function queryMemberLobbyDataSumTop3(){
  return getMemberLobbyDataSumTop3({
    memberName:props.queryParams.userName
  }).then(res=>{
    winList.value = res?.winLossList || []
    betList.value = res?.betList || []
  })
}
function confirmRecycle() {
  proxy.$modal
    .confirms(i18n.global.t("member.recycleAllMoneyToCenterWallet"), i18n.global.t("common.tips"))
    .then(() => {
      collectWallet(props.queryParams.userName).then(res=>{
        proxy.$modal.msgSuccess(i18n.global.t("member.operateSuccessfully"))
        queryFundWallet()
      })
    })
    .catch(() => {});
}
function openTransferDia(item) {
  openTransfer.value = true;
  cloneRow.value = JSON.parse(JSON.stringify(item));
}
function goBetOrderDetail(){
  router.push('/game/gamebet/betrecord')
}

watch([()=>props.queryParams.userName,()=>props.activeName],async ()=>{
  if(props.queryParams.userName && props.activeName === "2"){
    await queryFundWallet()
    await querydepositAndWithdraw()
    await queryMemberReport()
    await queryMemberLobbyDataSumTop3()
    queryMmeberBetInfo()
  }
})
</script>

<style lang="scss" scoped>
.member-detail-financial-info {
  .center-refresh {
    display: flex;
    align-items: center;
    h3 {
      margin: 0 25px 0 0;
      font-size: 16px;
      font-weight: 600;
    }
  }
  .center-content {
    display: flex;
    .wallet-title {
      margin-left: 8px;
      color:#F59A23;
    }
    .wallet-name {
      font-size: 14px;
    }
    align-items: center;
  }
  .collaspe {
    color: #1373cc;
  }
  .recycle-btn {
    color: #1373cc;
    cursor: pointer;
  }
  .collaspe-content {
    display: flex;
    flex-wrap: wrap;
    .collaspe-content-child {
      width: 25%;
      display: flex;
      justify-content: space-between;
      // margin-right:10px
      .transfer-btn {
        margin-right: 15%;
        color: #1373cc;
        cursor: pointer;
      }
      .child-left {
        display: flex;
        .stadium-name {
          margin-right: 12px;
        }
      }
    }
  }
  .recharge-withdrawl-info {
    border-bottom: 1px solid #eee;
    h3 {
      font-size: 16px;
      font-weight: 600;
    }
  }
  .withdrawl-info {
    border-bottom: 1px solid #eee;
    h3 {
      font-size: 16px;
      font-weight: 600;
    }
  }
  .bet-info {
    border-bottom: 1px solid #eee;
    h3 {
      font-size: 16px;
      font-weight: 600;
    }
  }
  .top-3-info {
    border-bottom: 1px solid #eee;
    h3 {
      font-size: 16px;
      font-weight: 600;
    }
    h5 {
      font-size: 14px;
      font-weight: 600;
    }
  }
}
</style>
