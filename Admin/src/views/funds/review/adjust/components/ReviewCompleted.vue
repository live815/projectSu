<template>
  <div class="funds-review-adjust-review-completed" v-loading="loading">
    <!-- 资金审核-已审核 -->
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
        <el-col :span="8">
          <el-form-item :label="$t('funds.firstReviewTime')" class="full-width">
                <el-date-picker
                  v-model="dateRangeFirstreview"
                  value-format="YYYY-MM-DD HH:mm:ss"
                  type="datetimerange"
                  range-separator="-"
                  :start-placeholder="$t('funds.beginTime')"
                  :end-placeholder="$t('funds.endTime')"
                  @change="handleChangeFirstreview"
                  :default-time="defaultTime"
                  :shortcuts="shortcuts"
                >
              </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('funds.secondReviewTime')" class="full-width">
                <el-date-picker
                  v-model="dateRangeSecondreview"
                  value-format="YYYY-MM-DD HH:mm:ss"
                  type="datetimerange"
                  range-separator="-"
                  :start-placeholder="$t('funds.beginTime')"
                  :end-placeholder="$t('funds.endTime')"
                  @change="handleChangeSecondreview"
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
                  clearable
                >
                </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('funds.firstReviewPerson')" prop="firstReview" class="full-width">
                <el-input
                  v-model="queryParams.firstReview"
                  :placeholder="$t('funds.pleaseInput')"
                  clearable
                >
                </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('funds.secondReviewPerson')" prop="finalReview" class="full-width">
                <el-input
                  v-model="queryParams.finalReview"
                  :placeholder="$t('funds.pleaseInput')"
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
        <el-col :span="4">
          <el-form-item
            :label="$t('funds.orderStatus')"
            prop="statusArr"
            class="full-width"
          >
            <el-select
              v-model="queryParams.statusArr"
              class="full-width"
              :placeholder="$t('funds.pleaseSelect')"
              clearable
              multiple
              collapse-tags
              collapse-tags-tooltip
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
        <el-col :span="4">
          <el-form-item class="full-width">
            <el-button type="primary" icon="Search" @click="handleQuery"
              >{{ $t('funds.search') }}</el-button
            >
            <el-button icon="Refresh" @click="resetQuery">{{ $t('funds.reset') }}</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 表格数据 -->
    <el-table :data="tableData" :empty-text="$t('funds.noData')">
      <el-table-column :label="$t('funds.serialNumber')" width="55" type="index" align="center">
        <template #default="scope">
          <span>{{
            (queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1
          }}</span>
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
          <span>{{
            formatNumber(row.amount)
          }}</span>
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
        width="110"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span class="first-review-inject" v-if="row.status==='1'">{{ $t('funds.firstReviewReject') }}</span>
          <span class="second-review-inject" v-if="row.status==='3'">{{ $t('funds.secondReviewReject') }}</span>
          <span class="second-review-success" v-if="row.status==='4'">{{ $t('funds.secondReviewPass') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.applyInformation')"
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
      <el-table-column
        :label="$t('funds.firstReviewInformation')"
        align="center"
        width="210"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <template
            v-if="
              row.firstReview ||
              row.firstReviewTime ||
              row.firstReviewMark
            "
          >
            <div>
              <span>{{ $t('funds.firstReviewPerson') }}</span>
              <span>{{ row.firstReview ? row.firstReview : "-" }}</span>
            </div>
            <div>
              <span>{{ $t('funds.firstReviewTime') }}</span>
              <span>{{
                row.firstReviewTime ? row.firstReviewTime : "-"
              }}</span>
            </div>
            <div>
              <span>{{ $t('funds.firstReviewRemark') }}</span>
              <span>{{
                row.firstReviewMark ? row.firstReviewMark : "-"
              }}</span>
            </div>
          </template>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.secondReviewInformation')"
        align="center"
        width="210"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <template
            v-if="
              row.finalReview ||
              row.finalReviewTime ||
              row.finalReviewMark
            "
          >
            <div>
              <span>{{ $t('funds.secondReviewPerson') }}</span>
              <span>{{ row.finalReview ? row.finalReview : "-" }}</span>
            </div>
            <div>
              <span>{{ $t('funds.secondReviewTime') }}</span>
              <span>{{
                row.finalReviewTime ? row.finalReviewTime : "-"
              }}</span>
            </div>
            <div>
              <span>{{ $t('funds.secondReviewRemark') }}</span>
              <span>{{
                row.finalReviewMark ? row.finalReviewMark : "-"
              }}</span>
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
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { onMounted, watch,onUnmounted } from "vue";
import { getFinishReviewList } from "@/api/funds/review/index";
import { formatNumber,filterLabel } from "@/utils/index";
import { defaultTime, shortcuts } from "@/utils/config";

const props = defineProps(["riskList","financalList","activeName","vipLevelList","fund_adjust_type","fund_adjust_add_reason","fund_adjust_reduce_reason"])
const queryParams = ref({
  userName:null, //会员账号
  orderNo:null, //订单号
  adjustApplicant: null, //申请人
  firstReview: null, //一审人
  finalReview:null, //二审人
  vipLevels: [], //vip等级
  financeIds:[], //财务层级
  riskIds:[], //风控层级
  adjustApplicantBeginTime: null, //申请开始时间
  adjustApplicantEndTime: null, //申请结束时间
  firstReviewBeginTime: null, //一审开始时间
  firstReviewEndTime: null, //一审结束时间
  finalReviewBeginTime: null, //二审开始时间
  finalReviewEndTime: null, //二审结束时间
  adjustType: null,
  adjustReason: null,
  statusArr:[],
  pageNum: 1,
  pageSize: 10,
});
const queryRef = ref(null);
const adjustReasonList = ref([]);
const statusArrList = ref([
  {
    label: i18n.global.t("funds.firstReviewReject"),
    value: 1,
  },
  {
    label: i18n.global.t("funds.secondReviewReject"),
    value: 3,
  },
  {
    label: i18n.global.t("funds.secondReviewPass"),
    value: 4,
  },
]);
const dateRange = ref([]);
const dateRangeFirstreview = ref([]); //一审时间
const dateRangeSecondreview = ref([]); //二审时间
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
    queryParams.value.beginTime = null;
    queryParams.value.endTime = null;
  } else {
    queryParams.value.beginTime = dateRange.value[0];
    queryParams.value.endTime = dateRange.value[1];
  }
}
function handleChangeFirstreview(){
  if ((dateRangeFirstreview.value && !dateRangeFirstreview.value.length) || dateRangeFirstreview.value == null) {
    queryParams.value.firstReviewBeginTime = null;
    queryParams.value.firstReviewEndTime = null;
  } else {
    queryParams.value.firstReviewBeginTime = dateRangeFirstreview.value[0];
    queryParams.value.firstReviewEndTime = dateRangeFirstreview.value[1];
  }
}
function handleChangeSecondreview(){
  if ((dateRangeSecondreview.value && !dateRangeSecondreview.value.length) || dateRangeSecondreview.value == null) {
    queryParams.value.finalReviewBeginTime = null;
    queryParams.value.finalReviewEndTime = null;
  } else {
    queryParams.value.finalReviewBeginTime = dateRangeSecondreview.value[0];
    queryParams.value.finalReviewEndTime = dateRangeSecondreview.value[1];
  }
} 
function getList() {
  loading.value = true
  return getFinishReviewList(queryParams.value).then(res=>{
    loading.value = false
    tableData.value = res.rows || []
    total.value = res.total
    subTotalOrderAmount.value = res.subTotalOrderAmount || 0
    totalOrderAmount.value = res.totalOrderAmount || 0
  }).catch(()=>{
      loading.value = false
  })
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
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}
function resetQuery() {
  queryRef.value.resetFields();
  dateRange.value = [];
  dateRangeFirstreview.value = [];
  dateRangeSecondreview.value = [];
  adjustReasonList.value = [];
  handleChange();
  handleChangeFirstreview();
  handleChangeSecondreview();
}
onActivated(async()=>{
  if(!isFirstLoad.value){
    await getList();
  }
})
</script>

<style lang="scss" scoped>
.funds-review-adjust-review-completed {
  .first-review-inject{
    color:rgba(217, 0, 27, 0.8);
  }
  .second-review-inject{
    color:rgba(217, 0, 27, 0.8);
  }
  .second-review-success{
    color:#1890FF;
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
        left:630px
      }
    }
  }
}
</style>
