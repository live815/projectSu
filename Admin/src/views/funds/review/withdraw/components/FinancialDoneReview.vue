<template>
  <div class="financial-done-review" v-loading="loading">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item :label="$t('funds.recieveMoneyTime')" class="full-width">
            <el-date-picker
              v-model="dateRangeWithdrawl"
              value-format="YYYY-MM-DD HH:mm:ss"
              type="datetimerange"
              range-separator="-"
              :start-placeholder="$t('funds.beginTime')"
              :end-placeholder="$t('funds.endTime')"
              @change="handleChangeWithdrawl"
              class="full-width"
              :default-time="defaultTime"
              :shortcuts="shortcuts"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('funds.applicationTimeQuote')" class="full-width">
            <el-date-picker
              v-model="dateRangeApply"
              value-format="YYYY-MM-DD HH:mm:ss"
              type="datetimerange"
              range-separator="-"
              :start-placeholder="$t('funds.beginTime')"
              :end-placeholder="$t('funds.endTime')"
              @change="handleChangeApply"
              class="full-width"
              :default-time="defaultTime"
              :shortcuts="shortcuts"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('funds.paymentTime')" class="full-width">
            <el-date-picker
              v-model="dateRangeOutpay"
              value-format="YYYY-MM-DD HH:mm:ss"
              type="datetimerange"
              range-separator="-"
              :start-placeholder="$t('funds.beginTime')"
              :end-placeholder="$t('funds.endTime')"
              @change="handleChangeOutpay"
              class="full-width"
              :default-time="defaultTime"
              :shortcuts="shortcuts"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('funds.reviewTime')" class="full-width">
            <el-date-picker
              v-model="dateRangeReview"
              value-format="YYYY-MM-DD HH:mm:ss"
              type="datetimerange"
              range-separator="-"
              :start-placeholder="$t('funds.beginTime')"
              :end-placeholder="$t('funds.endTime')"
              @change="handleChangeReview"
              class="full-width"
              :default-time="defaultTime"
              :shortcuts="shortcuts"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('funds.userName')" prop="userName" class="full-width">
            <el-input
              v-model="queryParams.userName"
              :placeholder="$t('funds.pleaseInput')"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('funds.orderNoQuote')" prop="orderNo" class="full-width">
            <el-input
              v-model="queryParams.orderNo"
              :placeholder="$t('funds.pleaseInput')"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('funds.operApplicantQuote')" prop="operApplicant" class="full-width">
            <el-input
              v-model="queryParams.operApplicant"
              :placeholder="$t('funds.pleaseInput')"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('funds.reviewer')" prop="operApprover" class="full-width">
            <el-input
              v-model="queryParams.operApprover"
              :placeholder="$t('funds.pleaseInput')"
              clearable
            />
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
          <el-form-item
            :label="$t('funds.withdrawlWay')"
            prop="wdWayType"
            class="full-width"
            clearable
          >
            <el-select
              v-model="queryParams.wdWayType"
              :placeholder="$t('funds.pleaseSelect')"
              clearable
              class="full-width"
            >
              <el-option
                v-for="dict in wdWayTypeList"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item
            :label="$t('funds.paymentMethod')"
            prop="paymentMethod"
            class="full-width"
          >
            <el-select
              v-model="queryParams.paymentMethod"
              :placeholder="$t('funds.pleaseSelect')"
              clearable
              class="full-width"
            >
              <el-option
                v-for="dict in paymentMethodList"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('funds.withdrawalStoreNameQuote')" prop="mchId" class="full-width">
            <el-select
              v-model="queryParams.mchId"
              :placeholder="$t('funds.pleaseSelect')"
              clearable
              class="full-width"
            >
              <el-option
                v-for="dict in channelNameList"
                :key="dict.mchId"
                :label="dict.mchName"
                :value="dict.mchId"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item :label="$t('funds.orderStatus')" prop="statusArr" class="full-width">
            <el-select
              v-model="queryParams.statusArr"
              :placeholder="$t('funds.pleaseSelect')"
              clearable
              multiple
              collapse-tags
              collapse-tags-tooltip
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
        <el-col :span="10">
          <el-form-item class="full-width">
            <el-button type="primary" icon="Search" @click="handleQuery"
              >{{ $t('funds.search') }}</el-button
            >
            <el-button icon="Refresh" @click="resetQuery">{{ $t('funds.reset') }}</el-button>
            <!-- <el-button
              icon="download"
              @click="handleExport"
              class="download-btn"
              >导出</el-button
            > -->
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 表格数据 -->
    <el-table :data="tableData" class="withdraw-table" :empty-text="$t('funds.noData')">
      <el-table-column :label="$t('funds.serialNumber')" width="55" type="index" align="center">
        <template #default="scope">
          <span>{{
            (queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1
          }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('funds.handle')" align="center" width="90">
        <template #default="{ row }">
          <el-button
            type="primary"
            size="small"
            @click="openDetailDia(row)"
            >{{ $t('funds.check') }}</el-button
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
        prop="information"
        align="center"
        width="190"
        :show-overflow-tooltip="false"
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
        :show-overflow-tooltip="false"
        width="140"
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
        :label="$t('funds.withdrawAmount')"
        prop="amount"
        align="center"
        width="110"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ formatNumber(row.amount) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.withdrawInformation')"
        align="center"
        width="170"
        :show-overflow-tooltip="false"
      >
        <template #default="{ row }">
          <template v-if="row.wdWayType || row.paymentMethod || row.mchName">
            <div>
              <span>{{ $t('funds.withdrawlWay') }}</span>
              <span>{{
                row.wdWayType
                  ? switchWdWayTypeStatus(wdWayTypeList, row.wdWayType)
                  : "-"
              }}</span>
            </div>
            <div>
              <span>{{ $t('funds.paymentMethod') }}</span>
              <span>{{
                row.paymentMethod
                  ? switchpaymentMethodStatus(
                      paymentMethodList,
                      row.paymentMethod
                    )
                  : "-"
              }}</span>
            </div>
            <div>
              <span>{{ $t('funds.withdrawalStoreNameQuote') }}</span>
              <span>{{ row.mchName ? row.mchName : "-" }}</span>
            </div>
          </template>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.withdrawTypeNoQuote')"
        align="center"
        width="145"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <template v-if="row.wdType || row.wdFee">
            <div>
              <span>{{ $t('funds.withdrawType') }}</span>
              <span>{{
                row.wdType ? switchWdTypeStatus(wdTypeList, row.wdType) : "-"
              }}</span>
            </div>
            <div>
              <span>{{ $t('funds.wdFee') }}</span>
              <span>{{ row.wdFee ? row.wdFee : "-" }}</span>
            </div>
          </template>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.orderStatusNoQuote')"
        prop="status"
        align="center"
        width="150"
        :show-overflow-tooltip="false"
      >
        <template #default="{ row }">
          <span v-if="row.status === '8'" class="status-two"
            >{{ $t('funds.forceSuccessWaitReview') }}</span
          >
          <span v-if="row.status === '9'">{{ $t('funds.forceSuccessPass') }}</span>
          <span v-if="row.status === '10'">{{ $t('funds.forceSuccessInject') }}</span>
          <span v-if="row.status === '11'" class="status-two"
            >{{ $t('funds.paymentReturnWaiReview') }}</span
          >
          <span v-if="row.status === '12'">{{ $t('funds.paymentReturnPass') }}</span>
          <span v-if="row.status === '13'">{{ $t('funds.paymentReturnRefuse') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.recieveMoneyInformation')"
        align="center"
        width="210"
        :show-overflow-tooltip="true"
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
              <span>{{ $t('funds.bankName') }}</span>
              <span>{{ row.payeeBankName ? row.payeeBankName : "-" }}</span>
            </div>
            <div v-if="row.orderType === '0'">
              <span>{{ $t('funds.bankCardNo') }}</span>
              <span>{{ row.payeeCardNo ? row.payeeCardNo : "-" }}</span>
            </div>
            <div v-if="row.orderType === '0'">
              <span>{{ $t('funds.recieveMoneyPerson') }}</span>
              <span>{{ row.payeeName ? row.payeeName : "-" }}</span>
            </div>
            <div v-if="row.orderType === '1'">
              <span>{{ $t('funds.tradeProtocol') }}</span>
              <span>{{ row.tradeProtocol ? row.tradeProtocol : "-" }}</span>
            </div>
            <div v-if="row.orderType === '1'">
              <span>{{ $t('funds.tradeAddr') }}</span>
              <span>{{ row.tradeAddr ? row.tradeAddr : "-" }}</span>
            </div>
          </template>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.reserveDetail')"
        align="center"
        width="110"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <template v-if="row.appmentHours || row.addPercent || row.addBouns">
            <div>
              <span>{{ $t('funds.reserveLimitHour') }}</span>
              <span>{{ row.appmentHours ? row.appmentHours : "-" }}</span>
            </div>
            <div>
              <span>{{ $t('funds.addPercent') }}</span>
              <span>{{ row.addPercent ? row.addPercent + "%" : "-" }}</span>
            </div>
            <div>
              <span>{{ $t('funds.addBonus') }}</span>
              <span>{{ formatNumber(row.addBouns) }}</span>
            </div>
          </template>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.time')"
        align="center"
        width="220"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <template v-if="row.createTime || row.paymentTime">
            <div>
              <span>{{ $t('funds.recieveMoneyTime') }}</span>
              <span>{{ row.createTime ? row.createTime : "-" }}</span>
            </div>
            <div>
              <span>{{ $t('funds.paymentTime') }}</span>
              <span>{{ row.paymentTime ? row.paymentTime : "-" }}</span>
            </div>
          </template>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.riskConttrolReview')"
        align="center"
        width="220"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <template
            v-if="
              row.riskApprover || row.riskApprovalTime || row.riskApprovalMark
            "
          >
            <div>
              <span>{{ $t('funds.reviewer') }}</span>
              <span>{{ row.riskApprover ? row.riskApprover : "-" }}</span>
            </div>
            <div>
              <span>{{ $t('funds.reviewTime') }}</span>
              <span>{{
                row.riskApprovalTime ? row.riskApprovalTime : "-"
              }}</span>
            </div>
            <div>
              <span>{{ $t('funds.reviewRemark') }}</span>
              <span>{{
                row.riskApprovalMark ? row.riskApprovalMark : "-"
              }}</span>
            </div>
          </template>
          <span v-else>-</span>
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
    <SuccessReviewDialog
      v-model:open="open"
      v-model:cloneRow="cloneRow"
      v-if="open"
      :type="type"
      :wdTypeList="wdTypeList"
      :wdWayTypeList="wdWayTypeList"
      :paymentMethodList="paymentMethodList"
      @approveRefresh="getList"
    />
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import SuccessReviewDialog from "./SuccessReviewDialog.vue";
import {
  dataStatus,
  dataStatusAll,
  switchWdTypeStatus,
  switchWdWayTypeStatus,
  switchpaymentMethodStatus,
  unAuditedData,
  auditedData,
  unAuditedTypeData,
  auditedTypeData,
} from "../common";
import { deepCopy } from "@/utils/index";
import { getVIPList, getMchchannelWithdrawlList } from "@/api/funds/common";
import { getWithdrawlOrderList } from "@/api/funds/record/index";
import { formatNumber } from "@/utils/index";
import { defaultTime, shortcuts } from "@/utils/config";

const props = defineProps(["riskList","financalList","vipLevelList","channelNameList"]);
const queryRef = ref(null);
const queryParams = ref({
  userName:null, //会员账号
  orderNo: null, // 订单号
  operApplicant:null, // 申请人
  operApprover:null, // 审核人
  vipLevels: [], //VIP等级数组
  financeIds:[], // 财务层级数组
  riskIds:[], // 风控层级数组
  wdWayType: null, //提现方式
  paymentMethod: null, //出款方式
  mchId: null, //出款商户
  statusArr: [], //订单状态
  withdrawStartTime: null, //提款开始时间
  withdrawEndTime: null, // 提款结束时间
  operApplicantStartTime: null, //申请开始时间,
  operApplicantEndTime: null, //申请结束时间
  payoutStartTime: null, //出款开始时间
  payoutEndTime: null, // 出款结束时间
  operApprovalStartTime: null, //审核开始时间,
  operApprovalEndTime: null, //审核结束时间
  pageNum: 1,
  pageSize: 10,
});
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
const statusArrList = ref([
  {
    label: i18n.global.t("funds.forceSuccessPass"),
    value: "9",
  },
  {
    label: i18n.global.t("funds.forceSuccessInject"),
    value: "10",
  },
  {
    label: i18n.global.t("funds.paymentReturnPass"),
    value: "12",
  },
  {
    label: i18n.global.t("funds.paymentReturnRefuse"),
    value: "13",
  }
]);
const wdTypeList = ref([
  {
    label: i18n.global.t("funds.commonWithdrawal"),
    value: "0",
  },
  {
    label: i18n.global.t("funds.largeWithdrawal"),
    value: "1",
  },
]);

const dateRangeWithdrawl = ref([]); //提现时间
const dateRangeApply = ref([]); //申请时间
const dateRangeOutpay = ref([]); //出款时间
const dateRangeReview = ref([]); //审核时间
const tableData = ref([]);
const total = ref(0);
const loading = ref(false);
const open = ref(false);
const cloneRow = ref(null);
const type = ref(null);
const isFirstLoad = ref(true);

onMounted(async () => {
  if(isFirstLoad.value){
    await getList()
    isFirstLoad.value = false
  }
});
// 选择提款时间
function handleChangeWithdrawl() {
  if ((dateRangeWithdrawl.value && !dateRangeWithdrawl.value.length) || dateRangeWithdrawl.value == null) {
    queryParams.value.withdrawStartTime = "";
    queryParams.value.withdrawEndTime = "";
  } else {
    queryParams.value.withdrawStartTime = dateRangeWithdrawl.value[0];
    queryParams.value.withdrawEndTime = dateRangeWithdrawl.value[1];
  }
}
// 选择申请时间
function handleChangeApply() {
  if ((dateRangeApply.value && !dateRangeApply.value.length) || dateRangeApply.value == null) {
    queryParams.value.withdrawStartTime = "";
    queryParams.value.withdrawEndTime = "";
  } else {
    queryParams.value.withdrawStartTime = dateRangeApply.value[0];
    queryParams.value.withdrawEndTime = dateRangeApply.value[1];
  }
}
// 选择出款时间
function handleChangeOutpay() {
  if ((dateRangeOutpay.value && !dateRangeOutpay.value.length) || dateRangeOutpay.value == null) {
    queryParams.value.withdrawStartTime = "";
    queryParams.value.withdrawEndTime = "";
  } else {
    queryParams.value.withdrawStartTime = dateRangeOutpay.value[0];
    queryParams.value.withdrawEndTime = dateRangeOutpay.value[1];
  }
}
// 选择审核时间
function handleChangeReview() {
  if ((dateRangeReview.value && !dateRangeReview.value.length) || dateRangeReview.value == null) {
    queryParams.value.withdrawStartTime = "";
    queryParams.value.withdrawEndTime = "";
  } else {
    queryParams.value.withdrawStartTime = dateRangeReview.value[0];
    queryParams.value.withdrawEndTime = dateRangeReview.value[1];
  }
}
function getList() {
  loading.value = true;
  let cloneData = deepCopy(queryParams.value);
  if (
    queryParams.value.statusArr &&
    queryParams.value.statusArr.length === 0
  ) {
    cloneData.statusArr = ["9", "10", "12", "13"];
  } 
  return getWithdrawlOrderList(cloneData)
    .then((res) => {
      loading.value = false;
      tableData.value = res.rows || [];
      total.value = res.total;
    })
    .catch(() => {
      loading.value = false;
    });
}
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}
function resetQuery() {
  queryRef.value.resetFields();
  dateRangeWithdrawl.value = [];
  dateRangeApply.value = [];
  dateRangeOutpay.value = [];
  dateRangeReview.value = [];

  handleChangeWithdrawl();
  handleChangeApply();
  handleChangeOutpay()
  handleChangeReview();
}
function handleExport() {
  // proxy.download(
  //   "/system/fund/withdrawl/order/export",
  //   {
  //     ...queryParams.value,
  //   },
  //   `提现记录_${new Date().toLocaleDateString()}.xlsx`
  // );
}

function openDetailDia(row) {
  type.value = "info";
  cloneRow.value = JSON.parse(JSON.stringify(row));
  open.value = true;
}
onActivated(async()=>{
  if(!isFirstLoad.value){
    await getList();
  }
})

</script>

<style lang="scss" scoped>
.financial-done-review {
  padding: 0 20px;
  .time-select {
    :deep() .el-form-item__label {
      padding-right: 0;
    }
    :deep().el-input {
      width: 50%;
    }
  }
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
}
</style>
