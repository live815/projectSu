<template>
  <div class="funds-review-adjust-first-review" v-loading="loading">
    <!-- 资金调整审核待一审 -->
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item :label="$t('funds.applicationTimeQuote')" class="full-width">
                <el-date-picker
                  v-model="dateRange"
                  value-format="YYYY-MM-DD HH:mm:ss"
                  type="datetimerange"
                  range-separator="-"
                  :start-placeholder="$t('funds.beginTime')"
                  :end-placeholder="$t('funds.endTime')"
                  @change="handleChange"
                  :default-time="defaultTime"
                  :shortcuts="shortcuts"
                >
                </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('funds.userName')" prop="userName" class="full-width">
                <el-input
                  v-model="queryParams.userName"
                  :placeholder="$t('funds.pleaseInput')"
                  style="width: 100%"
                  clearable
                >
                </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('funds.orderNoQuote')" prop="orderNo" class="full-width">
                <el-input
                  v-model="queryParams.orderNo"
                  :placeholder="$t('funds.pleaseInput')"
                  style="width: 100%"
                  clearable
                >
                </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('funds.operApplicantQuote')" prop="adjustApplicant" class="full-width">
                <el-input
                  v-model="queryParams.adjustApplicant"
                  :placeholder="$t('funds.pleaseInput')"
                  style="width: 100%"
                  clearable
                >
                </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('funds.vipLevel')" prop="vipLevels" class="full-width">
            <el-select
              v-model="queryParams.vipLevels"
              :placeholder="$t('funds.pleaseSelect')"
              class="full-width"
              multiple
              clearable
              collapse-tags
              collapse-tags-tooltip
            >
              <el-option
                v-for="dict in vipLevelList"
                :key="dict.vipLevel"
                :label="dict.vipName"
                :value="dict.vipLevel"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('funds.financialTierQuote')" prop="financeIds" class="full-width">
            <el-select
              v-model="queryParams.financeIds"
              multiple
              :placeholder="$t('funds.pleaseSelect')"
              clearable
              class="full-width"
              collapse-tags
              collapse-tags-tooltip
            >
              <el-option
                v-for="dict in financalList"
                :key="dict.id"
                :label="dict.layerName"
                :value="dict.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('funds.riskTierQuote')" prop="riskIds" class="full-width">
            <el-select
              v-model="queryParams.riskIds"
              multiple
              :placeholder="$t('funds.pleaseSelect')"
              clearable
              class="full-width"
              collapse-tags
              collapse-tags-tooltip
            >
              <el-option
                v-for="dict in riskList"
                :key="dict.id"
                :label="dict.layerName"
                :value="dict.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('funds.adjustType')" prop="adjustType" class="full-width">
            <el-select
              v-model="queryParams.adjustType"
              @change="adjustTypeChange"
              :placeholder="$t('funds.pleaseSelect')"
              clearable
              class="full-width"
            >
              <el-option
                v-for="dict in fund_adjust_type"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item
            :label="$t('funds.adjustReason')"
            prop="adjustReason"
            class="full-width"
          >
            <el-select
              v-model="queryParams.adjustReason"
              :placeholder="$t('funds.pleaseSelect')"
              clearable
              class="full-width"
            >
              <el-option
                v-for="dict in adjustReasonList"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item class="full-width">
            <el-button type="primary" icon="Search" @click="handleQuery"
              >{{ $t('funds.search') }}</el-button
            >
            <el-button icon="Refresh" @click="resetQuery">{{ $t('funds.reset') }}</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-row :gutter="10" style="margin-bottom: 12px">
      <el-col :span="4" class="flex-refresh">
        <span class="refresh-title">{{ $t('funds.autoRefresh') }}</span>
        <el-select v-model="refreshTime" :placeholder="$t('funds.pleaseSelect')" clearable>
          <el-option
            v-for="dict in refreshTimeList"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-col>
      <el-col :span="10" class="flex-refresh">
        <div>
          <span class="refresh-title">{{ $t('funds.dataUpdateTime') }}</span>
          <span class="refresh-title">{{ updateTime?updateTime:"-" }}</span>
        </div>
      </el-col>
      <el-col :span="10" style="text-align: right">
        <span class="refresh-title">{{ $t('funds.multipleOperation') }}</span>
        <el-select 
          v-model="multiOperate" 
          :placeholder="$t('funds.pleaseSelect')"
          clearable>
          <el-option
            v-for="dict in multiOperateList"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
        <el-button type="primary" @click="multipleOperate" :disabled="(orderNos&&!orderNos.length)||(multiOperate!=='0'&&multiOperate!=='1')">{{ $t('funds.implement') }}</el-button>
      </el-col>
    </el-row>
    <!-- 表格数据 -->
    <el-table :data="tableData" @selection-change="handleSelectionChange" :empty-text="$t('funds.noData')">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column :label="$t('funds.serialNumber')" width="55" type="index" align="center">
        <template #default="scope">
          <span>{{
            (queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.handle')"
        align="center"
        width="140"
      >
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="openSuccess(row)"
            >{{ $t('funds.pass') }}</el-button
          >
          <el-button type="danger" size="small" @click="openFail(row)"
            >{{ $t('funds.reject') }}</el-button
          >
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.orderNo')"
        prop="orderNo"
        align="center"
        width="190"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        :label="$t('funds.memberInformation')"
        align="center"
        width="190"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <template v-if="row.userName || row.vipLevel">
            <div>
              <span>{{ $t('funds.userName') }}</span>
              <span>{{ row.userName ? row.userName : "-" }}</span>
            </div>
            <div>
              <span>{{ $t('funds.vipLevel') }}</span>
              <span>{{ !isNaN(row.vipLevel) ? row.vipLevel : "-" }}</span>
            </div>
          </template>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.userLevel')"
        align="center"
        :show-overflow-tooltip="true"
        width="130"
      >
        <template #default="{ row }">
          <template v-if="row.financeTierName || row.riskTierName">
            <div>
              <span>{{ $t('funds.financialTierQuote') }}</span>
              <span>{{ row.financeTierName ? row.financeTierName : "-" }}</span>
            </div>
            <div>
              <span>{{ $t('funds.riskTierQuote') }}</span>
              <span>{{ row.riskTierName ? row.riskTierName : "-" }}</span>
            </div>
          </template>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.adjustAmountNoQuote')"
        prop="amount"
        align="left"
        width="110"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ formatNumber(row.amount)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.multipleNoQuote')"
        prop="multiple"
        align="center"
        width="110"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        :label="$t('funds.adjustTypeNoQuote')"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ row.adjustType === "0" ? $t('funds.addAmount') : $t('funds.reduceAmount') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.adjustReasonNoQuote')"
        align="center"
        width="110"
        :show-overflow-tooltip="true"
        >
        <template #default="{ row }">
          <!-- <span v-if="row.adjustType === '0' && row.adjustReason === '0'">{{ $t("funds.manualRecharge") }}</span>
          <span v-if="row.adjustType === '1' && row.adjustReason === '0'">{{ $t("funds.manualRecieveMoney") }}</span>
          <span v-if="row.adjustReason === '1'">{{ $t("funds.otherAdjust") }}</span> -->
          <span v-if="row.adjustType === '0'">{{ filterLabel(fund_adjust_add_reason,row.adjustReason) }}</span>
          <span v-else-if="row.adjustType === '1'">{{ filterLabel(fund_adjust_reduce_reason,row.adjustReason) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.reviewStatus')"
        prop="status"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span style="color:#04F21C;">{{ row.status==="0"?$t('funds.waitFirstReview'):"-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.applyInformation')"
        prop="rechargeInformation"
        align="center"
        width="210"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <template
            v-if="row.adjustApplicant || row.adjustApplicantTime || row.adjustApplicantMark"
          >
            <div>
              <span>{{ $t('funds.operApplicant') }}:</span>
              <span>{{ row.adjustApplicant ? row.adjustApplicant : "-" }}</span>
            </div>
            <div>
              <span>{{ $t('funds.applicationTime') }}:</span>
              <span>{{ row.adjustApplicantTime ? row.adjustApplicantTime : "-" }}</span>
            </div>
            <div>
              <span>{{ $t('funds.reorderApplicantMark') }}</span>
              <span>{{ row.adjustApplicantMark ? row.adjustApplicantMark : "-" }}</span>
            </div>
          </template>
          <span v-else>-</span>
        </template>
      </el-table-column>
    </el-table>
    <el-row class="total-table-row">
      <el-col :span="12" class="total-table">
        <span>{{ $t('funds.subTotal') }}</span><span class="num">{{ formatNumber(subTotalOrderAmount) }}</span>
      </el-col>
    </el-row>
    <el-row class="total-table-row">
      <el-col :span="12" class="total-table">
        <span>{{ $t('funds.total') }}</span><span class="num">{{ formatNumber(totalOrderAmount) }}</span>
      </el-col>
    </el-row>
    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />
    <SuccessOrFailDia 
      v-model:open="open"
      :cloneOrderNo="cloneOrderNo"
      :orderNos="orderNos" 
      :type="type"
      @onrefresh="getList"
      v-if="open"  />
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { onMounted, watch,onUnmounted } from "vue";
import { getFirstReviewList } from "@/api/funds/review/index";
import SuccessOrFailDia from "./SuccessOrFailDia.vue";
import { formatNumber,filterLabel } from "@/utils/index";
import { defaultTime, shortcuts } from "@/utils/config";

const props = defineProps(["riskList","financalList","activeName","vipLevelList","fund_adjust_type","fund_adjust_add_reason","fund_adjust_reduce_reason"])
const queryParams = ref({
  userName:null, //会员账号
  orderNo:null, //订单号
  adjustApplicant: null, //申请人
  vipLevels: [], //vip等级
  financeIds:[], //财务层级
  riskIds:[], //风控层级
  adjustApplicantBeginTime: null, //申请开始时间
  adjustApplicantEndTime: null, //申请结束时间
  adjustType: null, //调整类型
  adjustReason: null, //调整原因
  pageNum: 1,
  pageSize: 10,
});
const queryRef = ref(null);
const refreshTime = ref(null);
const updateTime = ref(null);
const multiOperate = ref(null);
const open = ref(false);
const type = ref(null);
const cloneOrderNo = ref(null);
const adjustReasonList = ref([]);//调整原因下拉
const refreshTimeList = ref([
  {
    label: i18n.global.t("risk.oneMinitus"),
    value: 4,
  },
  {
    label: i18n.global.t("funds.fiveMin"),
    value: 0,
  },
  {
    label: i18n.global.t("funds.fivteenMin"),
    value: 1,
  },
  {
    label: i18n.global.t("funds.thirtyMin"),
    value: 2,
  },
  {
    label: i18n.global.t("funds.abandon"),
    value: 3,
  },
]);
const multiOperateList = ref([
  {
    label: i18n.global.t("funds.firstReviewPass"),
    value: "0",
  },
  {
    label: i18n.global.t("funds.firstReviewReject"),
    value: "1",
  },
]);
const dateRange = ref([]);
const tableData = ref([]);
const total = ref(0);
const subTotalOrderAmount = ref(0) //小计
const totalOrderAmount = ref(0) //总计
const loading = ref(false);
const isFirstLoad = ref(true);

onMounted(async () => {
  if(isFirstLoad.value){
    await getList();
    isFirstLoad.value = false;
  }
});
function handleChange() {
  if ((dateRange.value && !dateRange.value.length) || dateRange.value == null) {
    queryParams.value.adjustApplicantBeginTime = null;
    queryParams.value.adjustApplicantEndTime = null;
  } else {
    queryParams.value.adjustApplicantBeginTime = dateRange.value[0];
    queryParams.value.adjustApplicantEndTime = dateRange.value[1];
  }
}
function getList() {
  loading.value = true
  return getFirstReviewList(queryParams.value).then(res=>{
    loading.value = false
    tableData.value = res.rows || []
    total.value = res.total
    subTotalOrderAmount.value = res.subTotalOrderAmount || 0
    totalOrderAmount.value = res.totalOrderAmount || 0
    updateTime.value = new Date().toLocaleString()
  }).catch(()=>{
      loading.value = false
  })
}
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}
function resetQuery() {
  queryRef.value.resetFields();
  dateRange.value = [];
  adjustReasonList.value = [];
  handleChange();
}
const orderNos = ref([]);
function handleSelectionChange(selection) {
   orderNos.value = selection.map((item) => item.orderNo);
}
//调整类型联动选择，生成不通的调整原因下拉
function adjustTypeChange(val){
if(val==="0"){
  adjustReasonList.value = props.fund_adjust_add_reason
}else if(val==="1"){
  adjustReasonList.value = props.fund_adjust_reduce_reason
}else{
  adjustReasonList.value = []
}
queryParams.value.adjustReason = null
}
function openSuccess(row) {
  cloneOrderNo.value = JSON.parse(JSON.stringify(row.orderNo));
  type.value = "success";
  open.value = true;
}
function openFail(row) {
  cloneOrderNo.value = JSON.parse(JSON.stringify(row.orderNo));
  type.value = "fail";
  open.value = true;
}
function multipleOperate(){
  if(multiOperate.value==='0'){
    type.value = 'multi-success'
    open.value = true
  }else if(multiOperate.value==='1'){
    type.value = 'multi-fail'
    open.value = true
  }
}
const timer = ref(null);
function startInterval(time) {
  timer.value = setInterval(() => {
    getList();
  }, time);
}
function stopInterval() {
  timer.value && clearInterval(timer.value);
  timer.value = null;
}
onUnmounted(() => {
  stopInterval();
});
function isCloseInterval(){
  if (refreshTime.value === 0) {
    stopInterval();
    startInterval(1000*60*5);
  } else if (refreshTime.value === 1) {
    stopInterval();
    startInterval(1000*60*15);
  } else if (refreshTime.value === 2) {
    stopInterval();
    startInterval(1000*60*30);
  }else if(refreshTime.value === 4){
    stopInterval();
    startInterval(1000*60*1);
  } else {
    stopInterval();
  }
}
onActivated(async()=>{
  if(!isFirstLoad.value){
    await getList();
    isCloseInterval();
  }
})
onDeactivated(()=>{
  stopInterval();
})

watch(refreshTime, () => {
  isCloseInterval()
});
watch(()=>props.activeName,(newVal)=>{
  if(newVal !== "1"){
    stopInterval();
  }else{
    isCloseInterval()
  }
})
</script>

<style lang="scss" scoped>
.funds-review-adjust-first-review {
  .flex-refresh {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .refresh-title {
    padding-right: 10px;
    min-width: 70px;
    font-size: 14px;
  }
  .total-table-row{
    border-bottom:1px solid #eee;
    padding:16px 0;
    .total-table{
      display: flex;
      justify-content: space-between;
      font-size:14px;
      padding-left:16px;
      .num{
        position:absolute;
        left:740px
      }
    }
  }
}
</style>
