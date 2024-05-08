<template>
  <div class="member-info-deposit-record">
    <!-- 存款记录 -->
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-row :gutter="10">
        <el-col :span="7">
          <el-form-item :label="$t('member.rechargeTime')" class="full-width">
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
          <el-form-item :label="$t('member.amountArrivalTime')" class="full-width">
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
        <el-col :span="3">
          <el-form-item :label="$t('member.rechargeNo')" prop="orderNo" class="full-width">
            <el-input
              v-model="queryParams.orderNo"
              :placeholder="$t('member.pleaseInput')"
              class="full-width"
              clearable
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="$t('member.orderStatus')" prop="status" class="full-width">
            <el-select
              v-model="queryParams.status"
              :placeholder="$t('member.pleaseSelect')"
              clearable
              class="full-width"
              collapse-tags
              collapse-tags-tooltip
            >
              <el-option
                v-for="dict in fund_deposit_order_status"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item class="full-width">
            <el-button type="primary" icon="Search" @click="handleQuery"
              >{{ $t('member.search') }}</el-button
            >
            <el-button icon="Refresh" @click="resetQuery">{{ $t('member.reset') }}</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="total-recharge">
      <span class="color-111" style="font-weight: 600;">{{ $t('member.totalRecharge') }}</span>
      <span>{{ totalWitharawal }}</span>
    </div>
    <el-table :data="tableData" style="width: 100%" :empty-text="$t('member.noData')">
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
        width="110"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span :class="colorChange(row.status)">{{
            switchStatus(fund_deposit_order_status, row.status)
          }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="260" :show-overflow-tooltip="true">
        <template #header>
          <div class="header-wrapper">
            <span>{{ $t('member.rechargeNoNoQuote') }}</span>
            <br />
            <span>{{ $t('member.relationOrderNo') }}</span>
          </div>
        </template>
        <template #default="{ row }">
          <template v-if="row.orderNo || row.orderRelno">
            <div>
              <span>{{ $t('member.rechargeNoNoQuote') }}:</span>
              <span>{{ row.orderNo ? row.orderNo : "-" }}</span>
            </div>
            <div>
              <span>{{ $t('member.relationOrderNo') }}:</span>
              <span>{{ row.orderRelno ? row.orderRelno : "-" }}</span>
            </div>
          </template>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.rechargeType')"
        align="center"
        width="110"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span v-if="row.depositType === '0'">{{ $t('member.normalRechage') }}</span>
          <span v-else-if="row.depositType === '1'">{{ $t('member.reorderRecharge') }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="240" :show-overflow-tooltip="true">
        <template #header>
          <div class="header-wrapper">
            <span>{{ $t('member.rechargeTimeNoQuote') }}</span>
            <br />
            <span>{{ $t('member.amountArrivalTimeNoQuote') }}</span>
          </div>
        </template>
        <template #default="{ row }">
          <template v-if="row.createTime || row.arrivalTime">
            <div>
              <span>{{ $t('member.rechargeTimeNoQuote') }}:</span>
              <span>{{ row.createTime ? row.createTime : "-" }}</span>
            </div>
            <div>
              <span>{{ $t('member.amountArrivalTimeNoQuote') }}:</span>
              <span>{{ row.arrivalTime ? row.arrivalTime : "-" }}</span>
            </div>
          </template>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.rechargeAmount')"
        prop="amount"
        align="center"
        width="180"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span v-if="row.orderType === '0'">{{
            formatNumber(row.amount)
          }}</span>
          <div v-else>
            <div>
              <span>{{$t('member.rechargeAmount')}}:</span>
              <span>{{
                formatNumber(row.amount)
              }}</span>
            </div>
            <div>
              <span>{{$t('member.rate')}}:</span>
              <span>{{ row.rate ? row.rate : "-" }}</span>
            </div>
            <div>
              <span>{{$t('member.usdtNumber')}}:</span>
              <span>{{ row.usdtNum ? row.usdtNum : "-" }}</span>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.arrivalAmount')"
        prop="actualAmt"
        align="center"
        width="180"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span v-if="row.orderType === '0'">{{
            formatNumber(row.actualAmt)
          }}</span>
          <div v-else>
            <div>
              <span>{{$t('member.arrivalAmount')}}:</span>
              <span>{{
                formatNumber(row.actualAmt)
              }}</span>
            </div>
            <div>
              <span>{{$t('member.usdtNumber')}}:</span>
              <span>{{ row.actualUsdtNum ? row.actualUsdtNum : "-" }}</span>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.channelType')"
        prop="channelTypeName"
        align="center"
        width="110"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ row.channelTypeName || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.storeName')"
        prop="mchName"
        align="center"
        width="110"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ row.mchName || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.walletAddress')"
        prop="tradeAddr"
        align="center"
        width="110"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ row.tradeAddr || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.recieveMoneyCardInformation')"
        align="center"
        width="110"
        :show-overflow-tooltip="true"
      >
      <template #default="{ row }">
          <template v-if="row.payeeName || row.payeeBankName||row.payeeCardNo">
            <div>
              <span>{{ $t('member.payeeName') }}</span>
              <span>{{ row.payeeName ? row.payeeName : "-" }}</span>
            </div>
            <div>
              <span>{{ $t('member.bankname') }}</span>
              <span>{{ row.payeeBankName ? row.payeeBankName : "-" }}</span>
            </div>
            <div>
              <span>{{ $t('member.bankcardNo') }}</span>
              <span>{{ row.payeeCardNo ? row.payeeCardNo : "-" }}</span>
            </div>
          </template>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.payer')"
        prop="realName"
        align="center"
        width="110"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ row.realName || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.postscript')"
        prop="memo"
        align="center"
        width="110"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ row.memo || "-" }}</span>
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
import { formatNumber } from "@/utils/index";
import {
  getListForMember,
  getMemberTotalMember,
} from "@/api/member/list/index";
import { defaultTime, shortcuts } from "@/utils/config";

const props = defineProps(["activeName", "activeWithdrawDeposit", "userName"]);

const { proxy } = getCurrentInstance();
const { fund_deposit_order_status } = proxy.useDict(
  "fund_deposit_order_status"
);
const queryRef = ref(null);
const queryParams = ref({
  userName: null, //会员账号
  orderNo: null, //充值单号
  depositStartTime: null, //充值开始时间
  depositEndTime: null, //充值结束时间
  arrivalStartTime: null, //到账开始时间
  arrivalEndTime: null, //到账结束时间
  status: null, //订单状态
  pageNum: 1,
  pageSize: 10,
});
const tableData = ref([]);
const total = ref(0);
const totalWitharawal = ref(0);
const dateRange = ref([]);
const dateRangeArrival = ref([]);

function getList() {
  return getListForMember(queryParams.value)
    .then((res) => {
      tableData.value = res.rows || [];
      total.value = res.total;
    })
    .catch(() => {});
}
function queryTotalWithdrawal(userName){
  getMemberTotalMember({
    userName
  }).then(res=>{
    totalWitharawal.value = res || 0
  })
}

function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}
function resetQuery() {
  queryRef.value.resetFields();
  dateRange.value = [];
  dateRangeArrival.value = [];
  handleChange();
  handleChangeArrival();
}
// 选择充值时间
function handleChange() {
  if ((dateRange.value && !dateRange.value.length) || dateRange.value == null) {
    queryParams.value.depositStartTime = null;
    queryParams.value.depositEndTime = null;
  } else {
    queryParams.value.depositStartTime = dateRange.value[0];
    queryParams.value.depositEndTime = dateRange.value[1];
  }
}
// 选择到账时间
function handleChangeArrival() {
  if ((dateRangeArrival.value && !dateRangeArrival.value.length) || dateRangeArrival.value == null) {
    queryParams.value.arrivalStartTime = null;
    queryParams.value.arrivalEndTime = null;
  } else {
    queryParams.value.arrivalStartTime = dateRangeArrival.value[0];
    queryParams.value.arrivalEndTime = dateRangeArrival.value[1];
  }
}
function switchStatus(filterList, status) {
  const item = filterList.find((item) => item.value === status);
  if (item) return item.label;
  return "-";
}
function colorChange(status) {
  switch (status) {
    case "3":
      return "status-withdraw-3"; // 如果状态为0，应用红色字体的class
    case "4":
      return "status-withdraw-4"; // 如果状态为1，应用红色字体的class
    case "5":
      return "status-withdraw-5"; // 如果状态为2，应用蓝色字体的class
    case "6":
      return "status-withdraw-6"; // 如果状态为3，应用绿色字体的class
    case "7":
      return "status-withdraw-7"; // 如果状态为4，应用橙色字体的class
    case "8":
      return "status-withdraw-8"; // 如果状态为5，应用橙色字体的class
    case "9":
      return "status-withdraw-8"; // 如果状态为6，应用橙色字体的class
    case "10":
      return "status-withdraw-8"; // 如果状态为7，应用红色字体的class
    case "11":
      return "status-withdraw-8"; // 如果状态为8，应用红色字体的class
    case "12":
      return "status-withdraw-8"; // 如果状态为8，应用红色字体的class
    case "13":
      return "status-withdraw-8"; // 如果状态为8，应用红色字体的class
    case "14":
      return "status-withdraw-8"; // 如果状态为8，应用红色字体的class
    case "15":
      return "status-withdraw-8"; // 如果状态为8，应用红色字体的class
    default:
      return "status-withdraw-8"; // 默认情况下，应用黑色字体的class
  }
}
watch(
  [
    () => props.activeName,
    () => props.activeWithdrawDeposit,
    () => props.userName,
  ],
  () => {
    //放在此处赋值，重置表单时候，保持默认的props.userName
    queryParams.value.userName = props.userName;
    if (
      props.activeName === "8" &&
      props.activeWithdrawDeposit === "1" &&
      props.userName
    ) {
      getList();
      queryTotalWithdrawal(props.userName);
    }
  },{immediate:true}
);
</script>

<style lang="scss" scoped>
.member-info-deposit-record {
  .total-recharge {
    margin: 20px 0;
  }
  .header-wrapper {
    white-space: pre-wrap;
  }
}
</style>
