<template>
  <div class="member-info-withdraw-record">
    <!-- 提款记录 -->

    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-row :gutter="10">
        <el-col :span="7">
          <el-form-item :label="$t('member.withdrawalTime')" class="full-width">
            <el-date-picker
              v-model="dateRange"
              value-format="YYYY-MM-DD HH:mm:ss"
              type="datetimerange"
              range-separator="-"
              :start-placeholder="$t('member.beginTime')"
              :end-placeholder="$t('member.endTime')"
              @change="handleChange"
              :default-time="defaultTime"
              :shortcuts="shortcuts"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item :label="$t('member.payoutTime')" class="full-width">
            <el-date-picker
              v-model="dateRangeArrival"
              value-format="YYYY-MM-DD HH:mm:ss"
              type="datetimerange"
              range-separator="-"
              :start-placeholder="$t('member.beginTime')"
              :end-placeholder="$t('member.endTime')"
              @change="handleChangeArrival"
              :default-time="defaultTime"
              :shortcuts="shortcuts"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('member.withdrawNo')" prop="orderNo" class="full-width">
                <el-input
                  v-model="queryParams.orderNo"
                  :placeholder="$t('member.pleaseInput')"
                  clearable
                >
                </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item :label="$t('member.orderStatus')" prop="status" class="full-width">
            <el-select
              v-model="queryParams.status"
              :placeholder="$t('member.pleaseSelect')"
              clearable
              class="full-width"
            >
              <el-option
                v-for="dict in statusArrList"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item class="full-width">
            <el-button type="primary" icon="Search" @click="handleQuery"
              >{{ $t('member.search') }}</el-button
            >
            <el-button icon="Refresh" @click="resetQuery">{{ $t('member.reset') }}</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <div class="total-withdraw">
      <span style="font-weight:600">{{ $t('member.totalWithdraw') }}</span>
      <span>{{ totalDeposit }}</span>
    </div>
    <el-table :data="tableData" class="withdraw-table" :empty-text="$t('member.noData')">
      <el-table-column :label="$t('member.serialNumber')" width="55" type="index" align="center">
        <template #default="scope">
          <span>{{
            (queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.orderStatusNoQuote')"
        prop="status"
        align="center"
        width="160"
        :show-overflow-tooltip="false"
      >
        <template #default="{ row }">
          <span :class="colorChange(row.status)">{{
            switchStatus(statusArrList, row.status)
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.orderNoNoQuote')"
        prop="orderNo"
        align="center"
        width="190"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        align="center"
        width="220"
        :show-overflow-tooltip="true"
      >
      <template #header>
        <div class="header-wrapper">
            <span>{{ $t('member.withdrawTime') }}</span>
            <br />
            <span>{{ $t('member.payoutTimeNoQuote') }}</span>
          </div>
      </template>
        <template #default="{ row }">
          <template v-if="row.createTime || row.paymentTime">
            <div>
              <span>{{ $t('member.withdrawTime') }}:</span>
              <span>{{ row.createTime ? row.createTime : "-" }}</span>
            </div>
            <div>
              <span>{{ $t('member.payoutTime') }}</span>
              <span>{{ row.paymentTime ? row.paymentTime : "-" }}</span>
            </div>
          </template>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.withdrawOrderAmount')"
        align="center"
        width="190"
        :show-overflow-tooltip="false"
      >
        <template #default="{ row }">
          <span v-if="row.orderType === '0'">{{
            formatNumber(row.amount)
          }}</span>
          <div v-else>
            <div>
              <span>{{ $t('member.withdrawAmount') }}</span>
              <span>{{
                formatNumber(row.amount) 
              }}</span>
            </div>
            <div>
              <span>{{ $t('member.rate') }}:</span>
              <span>{{ row.rate ? row.rate : "-" }}</span>
            </div>
            <div>
              <span>{{ $t('member.usdtNumber') }}:</span>
              <span>{{ row.usdtNum||row.usdtNum===0  ? row.usdtNum : "-" }}</span>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.wdfee')"
        align="center"
        :show-overflow-tooltip="false"
        width="140"
      >
        <template #default="{ row }">
          <span>{{ !isNaN(row.wdFee)?row.wdFee:"-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.arrivalAmount')"
        prop="actualAmt"
        align="center"
        width="110"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span v-if="row.orderType === '0'">{{
            formatNumber(row.actualAmt)
          }}</span>
          <div v-else>
            <div>
              <span>{{ $t('member.arrivalAmount') }}:</span>
              <span>{{
                formatNumber(row.actualAmt)
              }}</span>
            </div>
            <div>
              <span>{{ $t('member.usdtNumber') }}:</span>
              <span>{{ formatNumber(row.actualUsdtNum) }}</span>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.payoutWay')"
        align="center"
        width="170"
        :show-overflow-tooltip="false"
      >
        <template #default="{ row }">
          <span>{{ switchStatus(paymentMethodList,row.paymentMethod) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.withdrawWay')"
        align="center"
        width="170"
        :show-overflow-tooltip="false"
      >
        <template #default="{ row }">
          <span>{{switchStatus(wdWayTypeList, row.wdWayType)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.withdrawType')"
        align="center"
        width="145"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span v-if="row.wdType==='0'">{{$t('member.normalWithdraw')}}</span>
          <span v-else-if="row.wdType==='1'">{{$t('member.largeWithdraw')}}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.payoutStore')"
        align="center"
        width="170"
        :show-overflow-tooltip="false"
      >
        <template #default="{ row }">
              <span>{{ row.mchName ? row.mchName : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.recieveInformation')"
        align="center"
        width="210"
      >
        <template #default="{ row }">
          <template
            v-if="
              row.payeeBankName ||
              row.payeeCardNo ||
              row.payeeName ||
              row.tradeAddr ||
              row.tradeProtocol
            "
          >
            <div v-if="row.orderType === '0'">
              <span>{{ $t('member.bankname') }}</span>
              <span>{{ row.payeeBankName ? row.payeeBankName : "-" }}</span>
            </div>
            <div v-if="row.orderType === '0'">
              <span>{{ $t('member.bankcardNo') }}</span>
              <span>{{ row.payeeCardNo ? row.payeeCardNo : "-" }}</span>
            </div>
            <div v-if="row.orderType === '0'">
              <span>{{ $t('member.reciever') }}</span>
              <span>{{ row.payeeName ? row.payeeName : "-" }}</span>
            </div>
            <div v-if="row.orderType === '1'">
              <span>{{ $t('member.protocolOfDeal') }}</span>
              <span>{{ row.tradeProtocol ? row.tradeProtocol : "-" }}</span>
            </div>
            <div v-if="row.orderType === '1'">
              <span>{{ $t('member.recieveMoneyAddress') }}</span>
              <span>{{ row.tradeAddr ? row.tradeAddr : "-" }}</span>
            </div>
          </template>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.remarkNoQuote')"
        align="center"
        width="110"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ row.paymentMark||"-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.riskControlTime')"
        align="center"
        width="220"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{
                row.riskApprovalTime ? row.riskApprovalTime : "-"
              }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { formatNumber } from "@/utils/index";
import {getListForMemberDeposit,getMemberTotalDeposit,} from "@/api/member/list/index";
import { defaultTime, shortcuts } from "@/utils/config";

const props = defineProps(["activeName","activeWithdrawDeposit","userName"]);

const queryRef = ref(null);
const queryParams = ref({
  userName:null, //会员账号
  withdrawStartTime:null, //提现开始时间
  withdrawEndTime:null, //提现结束时间
  payoutStartTime:null, //出款开始时间
  payoutEndTime:null, //出款结束时间
  orderNo: null, //提款单号
  status: null, //订单状态
  pageNum: 1,
  pageSize: 10,
});
const totalDeposit = ref(0);
const dateRange = ref([]); //提现时间
const dateRangeArrival = ref([]); //出款时间
const tableData = ref([]);
const total = ref(0)
const statusArrList = ref([
  {
    label: i18n.global.t("funds.C2CWithdrawalOnHold"),
    value: "18",
  },
  {
    label: i18n.global.t("funds.waitRiskControlHandle"),
    value: "17",
  },
  {
    label: i18n.global.t("risk.riskControlWaitReview"),
    value: "0",
  },
  {
    label: i18n.global.t("risk.riskControlHoldOn"),
    value: "1",
  },
  {
    label: i18n.global.t("risk.riskControlReviewReject"),
    value: "2",
  },
  {
    label: i18n.global.t("risk.riskControlPassWaitPayout"),
    value: "3",
  },
  {
    label: i18n.global.t("funds.riskConttrolReviewPass"),
    value: "16",
  },
  {
    label: i18n.global.t("risk.payoutPass"),
    value: "4",
  },
  {
    label: i18n.global.t("funds.threePartyPaymenting"),
    value: "5",
  },
  {
    label: i18n.global.t("funds.threePartyPaymenFailure"),
    value: "6",
  },
  {
    label: i18n.global.t("funds.refuseOutMoney"),
    value: "7",
  },
  {
    label: i18n.global.t("funds.forceSuccessWaitReview"),
    value: "8",
  },
  {
    label: i18n.global.t("funds.forceSuccessPass"),
    value: "9",
  },
  {
    label: i18n.global.t("funds.forceSuccessPass"),
    value: "10",
  },
  {
    label: i18n.global.t("funds.paymentReturnWaiReview"),
    value: "11",
  },
  {
    label: i18n.global.t("funds.paymentReturnPass"),
    value: "12",
  },
  {
    label: i18n.global.t("funds.paymentReturnRefuse"),
    value: "13",
  },
  {
    label: i18n.global.t("funds.waitEnsureArrival"),
    value: "14",
  },
  {
    label: i18n.global.t("funds.overTimeWaitEnsureArrival"),
    value: "15",
  },
]);
const paymentMethodList = ref([
  {
    label: i18n.global.t("funds.threePartyAutoPayment"),
    value: "0",
  },
  {
    label: i18n.global.t("funds.threePartyHandPayment"),
    value: "1",
  },
  {
    label: i18n.global.t("funds.manualWithdrawal"),
    value: "2",
  },
]);
const wdWayTypeList = ref([
  {
    label: i18n.global.t("funds.bankCardWithdrawal"),
    value: "0",
  },
  {
    label: i18n.global.t("funds.personalWithdrawal"),
    value: "1",
  },
  {
    label: i18n.global.t("funds.USDTwithdrawal"),
    value: "2",
  },
  {
    label: i18n.global.t("funds.EBpayWithdrawal"),
    value: "3",
  },
]);

function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}
function resetQuery() {
  queryRef.value.resetFields();
  dateRange.value = [];
  dateRangeArrival.value = [];
  handleChange();
}
function handleChange() {
  if ((dateRange.value && !dateRange.value.length) || dateRange.value == null) {
    queryParams.value.withdrawStartTime = null;
    queryParams.value.withdrawEndTime = null;
  } else {
    queryParams.value.withdrawStartTime = dateRange.value[0];
    queryParams.value.withdrawEndTime = dateRange.value[1];
  }
}
// 选择出款时间
function handleChangeArrival() {
  if ((dateRangeArrival.value && !dateRangeArrival.value.length) || dateRangeArrival.value == null) {
    queryParams.value.payoutStartTime = null;
    queryParams.value.payoutEndTime = null;
  } else {
    queryParams.value.payoutStartTime = dateRangeArrival.value[0];
    queryParams.value.payoutEndTime = dateRangeArrival.value[1];
  }
}
function getList(){
  console.log("提款记录",props.userName)
  getListForMemberDeposit(queryParams.value)
    .then((res) => {
      tableData.value = res.rows || [];
      total.value = res.total;
    })
 }
function queryTotalDeposit(userName){
  getMemberTotalDeposit({
    userName
  }).then(res=>{
    totalDeposit.value = res || 0
  })
}
function switchStatus(filterList,status){
  const item = filterList.find(item=>item.value === status)
   return item ? item.label : "-";
}
function  colorChange(status){
  switch (status) {
        case '3':
          return 'status-withdraw-3'; // 如果状态为0，应用红色字体的class
        case '4':
          return 'status-withdraw-4'; // 如果状态为1，应用红色字体的class
        case '5':
          return 'status-withdraw-5'; // 如果状态为2，应用蓝色字体的class
        case '6':
          return 'status-withdraw-6'; // 如果状态为3，应用绿色字体的class
        case '7':
          return 'status-withdraw-7'; // 如果状态为4，应用橙色字体的class
        case '8':
          return 'status-withdraw-8'; // 如果状态为5，应用橙色字体的class
        case '9':
          return 'status-withdraw-8'; // 如果状态为6，应用橙色字体的class
        case '10':
          return 'status-withdraw-8'; // 如果状态为7，应用红色字体的class
        case '11':
          return 'status-withdraw-8'; // 如果状态为8，应用红色字体的class
        case '12':
          return 'status-withdraw-8'; // 如果状态为8，应用红色字体的class
        case '13':
          return 'status-withdraw-8'; // 如果状态为8，应用红色字体的class
        case '14':
          return 'status-withdraw-8'; // 如果状态为8，应用红色字体的class
        case '15':
          return 'status-withdraw-8'; // 如果状态为8，应用红色字体的class
        default:
          return 'status-withdraw-8'; // 默认情况下，应用黑色字体的class
      }
}
watch([()=>props.activeName,()=>props.activeWithdrawDeposit,()=>props.userName],()=>{
  queryParams.value.userName  = props.userName
  if(props.activeName==='8'&&props.activeWithdrawDeposit==='2'&&props.userName){
    queryTotalDeposit(props.userName)
    getList()
  }
})
</script>

<style lang="scss" scoped>
.member-info-withdraw-record{
.total-withdraw{
  margin:20px 0;
}
}
</style>