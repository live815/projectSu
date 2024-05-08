<template>
  <div class="dialog-basic-config">
    <div class="withdraw-deposit">
      <CommonTitle :title="$t('risk.depositAndWithdrawOverview')" isBold="true" />
      <CommonTime @query="getWithdrawList" />
      <el-table :data="tableDataWithdraw" :empty-text="$t('risk.noData')">
        <el-table-column :label="$t('risk.deposit')" align="center">
          <el-table-column :label="$t('risk.totalDepositTimes')" prop="totalDepositTimes" align="center"></el-table-column>
          <el-table-column :label="$t('risk.totalDepositAmount')" align="center">
            <template #default="{row}">
              {{ formatNumber(row.totalDepositAmount) }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('risk.totalDepositTimesOnBehalf')" prop="totalDepositTimesOnBehalf" align="center"></el-table-column>
          <el-table-column :label="$t('risk.totalDepositAmountOnBehalf')" prop="totalDepositAmountOnBehalf" align="center"></el-table-column>
        </el-table-column>
        <el-table-column :label="$t('risk.withdraw')" align="center">
          <el-table-column :label="$t('risk.totalWithdrawTimes')" prop="totalWithdrawTimes" align="center"></el-table-column>
          <el-table-column :label="$t('risk.totalWithdrawAmount')" prop="totalWithdrawAmount" align="center">
            <template #default="{row}">
              <span>{{ formatNumber(row.totalWithdrawAmount) }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('risk.returnAmount')" prop="returnAmount" align="center">
            <template #default="{row}">
              <span>{{ formatNumber(row.returnAmount) }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('risk.totalWithdrawNetAmount')" prop="totalWithdrawNetAmount" align="center">
            <template #default="{row}">
              <span>{{ formatNumber(row.totalWithdrawNetAmount) }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('risk.rebateAmount')" prop="rebateAmount" align="center">
          <template #default="{row}">
            <span>{{ formatNumber(row.rebateAmount) }}</span>
            </template>
        </el-table-column>
        <el-table-column :label="$t('risk.welfareAmount')" prop="welfareAmount" align="center">
          <template #default="{row}">
            <span>{{ formatNumber(row.welfareAmount) }}</span>
            </template>
        </el-table-column>
        <el-table-column :label="$t('risk.validBetTotal')" prop="validBetTotal" align="center">
          <template #default="{row}">
            <span>{{ formatNumber(row.validBetTotal) }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('risk.payoutTotal')" prop="payoutTotal" align="center">
          <template #default="{row}">
            <span>{{ formatNumber(row.payoutTotal) }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('risk.companyWinLose')" prop="companyWinLose" align="center">
          <template #default="{row}">
            <span>{{ formatNumber(row.companyWinLose) }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('risk.adjustAmount')" prop="adjustAmount" align="center">
          <template #default="{row}">
            <span>{{ formatNumber(row.adjustAmount) }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('risk.inviteAmount')" prop="inviteAmount" align="center">
          <template #default="{row}">
            <span>{{ formatNumber(row.inviteAmount) }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('risk.liveAmount')" prop="liveAmount" align="center">
          <template #default="{row}">
            <span>{{ formatNumber(row.liveAmount) }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="wallet" :class="{'show':isCollapse}">
      <CommonTitle :title="$t('risk.walletAbout')" isBold="true">
        <template #add>
          <span class="mr-4 center-amount">{{ $t('risk.centerWalletBalance') }}</span>
          <span class="center-amount">{{ formatNumber(memberWallet) }}</span>
          <span class="recycle" @click="confirmRecycle">{{ $t('risk.confirmRecycle') }}</span>
          <span class="center-amount mr-4">{{ $t('risk.withdrawFreezeAmount') }}</span>
          <span class="center-amount">{{ formatNumber(wdHoldWallet) }}</span>
        </template>
      </CommonTitle>
      <CommonTime @query="getWalletList" />
      <el-table :data="tableDataWallet" :empty-text="$t('risk.noData')">
        <el-table-column :label="$t('risk.lobbyName')" align="center" prop="lobbyName">
          <template #default="{row}">
              <span>{{ row.lobbyName || "-" }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('risk.lobbyBalance')" align="center" prop="lobbyBalance">
          <template #default="{row}">
            <span>{{ formatNumber(row.lobbyBalance) }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('risk.validBetTotal')" align="center" prop="validAmount">
          <template #default="{row}">
            <span>{{ formatNumber(row.validAmount) }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('risk.companyWinLose')" align="center" prop="cpWinLost">
          <template #default="{row}">
            <span>{{ formatNumber(row.cpWinLost) }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('risk.orderCount')" align="center" prop="orderCount">
          <template #default="{row}">
              <span>{{ row.orderCount||row.orderCount===0 ? row.orderCount:'-' }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('risk.winRate')" align="center" prop="winRate">
          <template #default="{row}">
              <span>{{ row.winRate||row.winRate===0 ? row.winRate+'%':'-' }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('risk.lowPayRate')" align="center" prop="lowPayRate">
          <template #default="{row}">
              <span>{{ row.lowPayRate||row.lowPayRate===0 ? row.lowPayRate+'%':'-' }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('risk.userWinRate')" align="center" prop="userWinRate">
          <template #default="{row}">
              <span>{{ row.userWinRate||row.userWinRate===0 ? row.userWinRate+'%':'-' }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="collapse" @click="showCollapse" v-show="tableDataWallet&&tableDataWallet.length!==0">
      {{ isCollapse ? $t('risk.clickClose') : $t('risk.clickOpen') }}
    </div>
    <div class="bank-info">
      <CommonTitle :title="$t('risk.bankcardInformation')" isBold="true" />
      <el-table :data="tableDataBank" :empty-text="$t('risk.noData')">
        <el-table-column :label="$t('risk.bindingTime')" align="center">
          <template #default="{row}">
              {{ row.createTime || "-" }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('risk.bankname')" align="center" prop="bankname">
          <template #default="{row}">
              {{ row.bankname || "-" }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('risk.cardholder')" align="center" prop="cardholder">
          <template #default="{row}">
              {{ row.cardholder || "-" }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('risk.cardNo')" align="center" prop="cardNo">
          <template #default="{row}">
              {{ row.cardNo || "-" }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('risk.accountAddr')" align="center" prop="accountAddr">
          <template #default="{row}">
              {{ row.accountAddr || "-" }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('risk.status')" align="center" prop="status">
          <template #default="{row}">
              <span v-if="row.status===0">{{ $t('risk.start') }}</span>
              <span v-else-if="row.status===1">{{ $t('risk.disable') }}</span>
              <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('risk.deleteTime')" align="center">
          <template #default="{row}">
            <span v-if="row.status===1">{{ row.updateTime||"-" }}</span>
            <span v-else>-</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="virtual-info">
      <CommonTitle :title="$t('risk.digtalCurrencyInformation')" isBold="true" />
      <el-table :data="tableDataVirtual" :empty-text="$t('risk.noData')">
        <el-table-column :label="$t('risk.bindingTime')" align="center" prop="createTime">
          <template #default="{row}">
              {{ row.createTime || "-" }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('risk.currencyType')" align="center" prop="currency">
          <template #default="{row}">
              {{ row.currency || "-" }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('risk.addr')" align="center" prop="addr">
          <template #default="{row}">
              {{ row.addr || "-" }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('risk.alias')" align="center" prop="alias">
          <template #default="{row}">
              {{ row.alias || "-" }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('risk.protocol')" align="center" prop="protocol">
          <template #default="{row}">
              {{ row.protocol || "-" }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('risk.status')" align="center" prop="status">
          <template #default="{row}">
              <span v-if="row.status===0">{{ $t('risk.start') }}</span>
              <span v-else-if="row.status===1">{{ $t('risk.disable') }}</span>
              <span v-else>-</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { getDateTime } from "../common/common.js";
import CommonTitle from "@/components/CommonTitle/index.vue";
import CommonTime from "./CommonTime.vue";
import { formatNumber } from "@/utils/index";
import { getOrderDepWidDetail,getOrderWalletDetail } from "@/api/risk/review/index";
import { getBankcardList,getCryptocyList } from "@/api/member/bankcard/index";
import { nextTick, onMounted } from "vue";
import { collectWallet } from "@/api/member/list/index";

const props = defineProps(['userId',"userName"]);
const { proxy } = getCurrentInstance();
const tableDataWithdraw = ref([]); // 充提概况表格数据
const tableDataWallet = ref([
  {
    id:111,
    name:'pm体育',
    money:'100'
  },
  {
    id:222,
    name:'ag真人',
    money:'100'
  },
  {
    id:333,
    name:'开源棋牌',
    money:'100'
  },
  {
    id:444,
    name:'性感荷官',
    money:'100'
  },
]); // 钱包概况表格数据
const tableDataBank = ref([]); // 银行卡信息表格数据
const tableDataVirtual = ref([]); // 数字货币表格数据
const memberWallet = ref(null); //中心钱包余额
const wdHoldWallet = ref(null); // 冻结金额
const isCollapse = ref(false); //钱包概况的折叠按钮
const queryParamsWallet = ref({});

onMounted(()=>{
    queryBankCardList();
    queryCryptocyList();
})
function getWithdrawList(val) {
  console.log("充提概况", val,props.userId);
  getOrderDepWidDetail({
    ...val,
    userId:props.userId
  }).then(res=>{
    tableDataWithdraw.value = []
    tableDataWithdraw.value.push({
      adjustAmount:res.adjustAmount,
      companyWinLose:res.companyWinLose,
      inviteAmount:res.inviteAmount,
      liveAmount:res.liveAmount,
      payoutTotal:res.payoutTotal,
      rebateAmount:res.rebateAmount,
      returnAmount:res.returnAmount,
      totalDepositAmount:res.totalDepositAmount,
      totalDepositAmountOnBehalf:res.totalDepositAmountOnBehalf,
      totalDepositTimes:res.totalDepositTimes,
      totalDepositTimesOnBehalf:res.totalDepositTimesOnBehalf,
      totalWithdrawAmount:res.totalWithdrawAmount,
      totalWithdrawNetAmount:res.totalWithdrawNetAmount,
      totalWithdrawTimes:res.totalWithdrawTimes,
      validBetTotal:res.validBetTotal,
      welfareAmount:res.welfareAmount,
    })
  })
}
function getWalletList(val){
  queryParamsWallet.value = val;
  console.log("钱包概况", queryParamsWallet.value,props.userId);
  getOrderWalletDetail({
    ...queryParamsWallet.value,
    userId:props.userId
  }).then(res=>{
    memberWallet.value = res.memberWallet;
    wdHoldWallet.value = res.wdHoldWallet;
    tableDataWallet.value = res.riskWithdrawlOrderWalletDetailRespVOList || [];
  })
}
function confirmRecycle(){
  proxy.$modal
    .confirms("是否一键将所有钱汇总至中心钱包", "确认提示")
    .then(() => {
      collectWallet(props.userName).then(res=>{
        proxy.$modal.msgSuccess("汇总成功")
        getWalletList(queryParamsWallet.value);
      })
    })
    .catch(() => {});
}
function queryBankCardList(){
  getBankcardList({
    userName:props.userName
  }).then(res=>{
    tableDataBank.value = res.rows || [];
  })
}
function queryCryptocyList(){
  getCryptocyList({
    userName:props.userName
  }).then(res=>{
    tableDataVirtual.value = res.rows || [];
  })
}

function showCollapse(){
  isCollapse.value = !isCollapse.value
}
</script>

<style lang="scss" scoped>
.dialog-basic-config {
  .wallet{
    margin-top:20px;
    max-height:200px;
    overflow:hidden;
    // transition: max-height 1s ease-out;
    .center-amount{
      font-size:13px;
      color:#555555;
    }
    .recycle{
      font-size:13px;
      margin:0 12px;
    }
  }
  .collapse{
    text-align:center;
    margin:12px 0;
    color:#1890FF;
    cursor:pointer;
  }
  .show{
    max-height:none;
  }
  .virtual-info{
    margin-top:12px;
  }
}
</style>
