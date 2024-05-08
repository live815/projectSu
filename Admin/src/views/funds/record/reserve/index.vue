<template>
  <div class="funds-record-reserve-index" v-loading="loading">
    <!-- 预约提现列表   -->
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
          <el-form-item :label="$t('funds.reviewer')" prop="riskApprover" class="full-width">
            <el-input
              v-model="queryParams.riskApprover"
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
        <el-col :span="10">
          <el-form-item class="full-width">
            <el-button type="primary" icon="Search" @click="handleQuery"
              >搜索</el-button
            >
            <el-button icon="Refresh" @click="resetQuery">重置</el-button>
            <el-button
              icon="download"
              @click="handleExport"
              class="download-btn"
              >导出</el-button
            >
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
      <el-table-column :label="$t('funds.handle')" align="center" width="100">
        <template #default="{ row }">
          <el-button
            type="primary"
            size="small"
            @click="withdrawImmediately(row)"
            >{{ $t('funds.paymentRightNow') }}</el-button
          >
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.leftTime')"
        prop="leftTime"
        align="center"
        width="110"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        :label="$t('funds.reserveDetail')"
        align="center"
        width="160"
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
              <span>{{ formatDataPercent(row.addPercent) }}</span>
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
              <span>{{ row.vipLevel||row.vipLevel===0 ? row.vipLevel : "-" }}</span>
            </div>
          </template>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.userLevel')"
        align="center"
        :show-overflow-tooltip="false"
        width="190"
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
              <span>{{$t('funds.withdrawlWay')}}</span>
              <span>{{ filterLabel(wdWayTypeList, row.wdWayType) }}</span>
            </div>
            <div>
              <span>{{$t('funds.paymentMethod')}}</span>
              <span>{{ filterLabel(paymentMethodList,row.paymentMethod) }}</span>
            </div>
            <div>
              <span>{{$t('funds.withdrawalStoreNameQuote')}}</span>
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
              <span>{{ filterLabel(wdTypeList, row.wdType)}}</span>
            </div>
            <div>
              <span>{{ $t('funds.wdFee') }}</span>
              <span>{{ formatNumber(row.wdFee) }}</span>
            </div>
          </template>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.orderStatusNoQuote')"
        prop="status"
        align="center"
        width="160"
        :show-overflow-tooltip="false"
      >
        <template #default="{ row }">
          <span style="color: #f59a23">{{ $t('funds.riskConttrolReviewPass') }}</span>
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
            v-if="row.payeeBankName || row.payeeCardNo || row.payeeName|| row.tradeAddr|| row.tradeProtocol"
          >
            <div v-if="row.orderType==='0'">
              <span>{{ $t('funds.bankName') }}</span>
              <span>{{ row.payeeBankName ? row.payeeBankName : "-" }}</span>
            </div>
            <div v-if="row.orderType==='0'">
              <span>{{ $t('funds.bankCardNo') }}</span>
              <span>{{ row.payeeCardNo ? row.payeeCardNo : "-" }}</span>
            </div>
            <div v-if="row.orderType==='0'">
              <span>{{ $t('funds.recieveMoneyPerson') }}</span>
              <span>{{ row.payeeName ? row.payeeName : "-" }}</span>
            </div>
            <div v-if="row.orderType==='1'">
              <span>{{ $t('funds.tradeProtocol') }}</span>
              <span>{{ row.tradeProtocol ? row.tradeProtocol : "-" }}</span>
            </div>
            <div v-if="row.orderType==='1'">
              <span>{{ $t('funds.tradeAddr') }}</span>
              <span>{{ row.tradeAddr ? row.tradeAddr : "-" }}</span>
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
              <span>{{$t('funds.reviewer')}}</span>
              <span>{{ row.riskApprover ? row.riskApprover : "-" }}</span>
            </div>
            <div>
              <span>{{$t('funds.reviewTime')}}</span>
              <span>{{
                row.riskApprovalTime ? row.riskApprovalTime : "-"
              }}</span>
            </div>
            <div>
              <span>{{$t('funds.reviewRemark')}}</span>
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
  </div>
</template>

<script setup name="Reserve-withdraw">
import i18n from "@/i18n";
import {
  getCurrentInstance,
  onActivated,
  onMounted,
} from "vue";
import { getVIPList,getMchchannelList } from "@/api/funds/common";
import { getWithdrawlOrderList,immedPayout } from "@/api/funds/record/index";
import { gethHoursLeftPayout } from "@/api/funds/config/index";
import { getRiskFinancalList } from "@/api/risk/level/index";
import { formatNumber,filterLabel,formatDataPercent } from "@/utils/index";
import { defaultTime, shortcuts } from "@/utils/config";

const { proxy } = getCurrentInstance();
// const { sys_sports_type } = proxy.useDict("sys_sports_type");
const queryRef = ref(null);
const queryParams = ref({
  userName:null, //会员账号
  orderNo: null, // 订单号
  riskApprover:null, // 风控审核人
  vipLevels: [], //VIP等级数组
  financeIds:[], // 财务层级数组
  riskIds:[], // 风控层级数组
  wdWayType: null, //提现方式
  paymentMethod: null, //出款方式
  mchId: null, //出款商户
  statusArr: ["16"],
  withdrawStartTime: null, //提款开始时间
  withdrawEndTime: null, // 提款结束时间
  payoutStartTime: null, //出款开始时间
  payoutEndTime: null, // 出款结束时间
  riskApprovalStartTime: null, //风控审核开始时间
  riskApprovalEndTime: null, // 风控审核结束时间
  pageNum: 1,
  pageSize: 10,
});
const vipLevelList = ref([]); // VIP等级数组
const riskList = ref([]); // 风控层级数组
const financalList = ref([]); //财务层级数组
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
const channelNameList = ref([]);
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

const dateRangeWithdrawl = ref([]); //提款时间数组
const dateRangeOutpay = ref([]); //出款时间数组
const dateRangeReview = ref([]); //审核时间数组
const tableData = ref([]);
const total = ref(0);
const loading = ref(false);
const hoursLeft = ref(0);
const isFirstLoad = ref(true);

onMounted(async () => {
  await queryhHoursLeftPayout();
  if(isFirstLoad.value){
    await getList();
    isFirstLoad.value = false
  }
  await queryVIPList();
  await queryRiskList();
  await queryFinancalList();
  await queryChannelList();
});
function queryVIPList() {
  return getVIPList().then((res) => {
    vipLevelList.value = res || [];
  });
}
//查询风控层级
function queryRiskList(){
  return getRiskFinancalList(2).then(res=>{
    riskList.value = res || [];
  })
}
//查询财务层级
function queryFinancalList(){
  return getRiskFinancalList(1).then(res=>{
    financalList.value = res || [];
  })
}
function queryChannelList() {
  return getMchchannelList().then((res) => {
    channelNameList.value = res || [];
  });
}
function queryhHoursLeftPayout() {
  return gethHoursLeftPayout().then((res) => {
    hoursLeft.value = res || 0;
  });
}
// 选择提现时间
function handleChangeWithdrawl() {
  if ((dateRangeWithdrawl.value && !dateRangeWithdrawl.value.length) || dateRangeWithdrawl.value == null) {
    queryParams.value.withdrawStartTime = null;
    queryParams.value.withdrawEndTime = null;
  } else {
    queryParams.value.withdrawStartTime = dateRangeWithdrawl.value[0];
    queryParams.value.withdrawEndTime = dateRangeWithdrawl.value[1];
  }
}
// 选择出款时间
function handleChangeOutpay() {
  if ((dateRangeOutpay.value && !dateRangeOutpay.value.length) || dateRangeOutpay.value == null) {
    queryParams.value.payoutStartTime = null;
    queryParams.value.payoutEndTime = null;
  } else {
    queryParams.value.payoutStartTime = dateRangeOutpay.value[0];
    queryParams.value.payoutEndTime = dateRangeOutpay.value[1];
  }
}
// 选择审核时间
function handleChangeReview() {
  if ((dateRangeReview.value && !dateRangeReview.value.length) || dateRangeReview.value == null) {
    queryParams.value.riskApprovalStartTime = null;
    queryParams.value.riskApprovalEndTime = null;
  } else {
    queryParams.value.riskApprovalStartTime = dateRangeReview.value[0];
    queryParams.value.riskApprovalEndTime = dateRangeReview.value[1];
  }
}
function getList() {
  loading.value = true;
  return getWithdrawlOrderList(queryParams.value)
    .then((res) => {
      loading.value = false;
      tableData.value = res.rows || [];
      total.value = res.total;
      tableData.value.length && tableData.value.forEach(item=>{
        const createTime = new Date(item.createTime).getTime()
        const reservationTime = hoursLeft.value*60*60*1000
        const currentTime = new Date().getTime()
        const remainingTime = createTime + reservationTime - currentTime
        item.leftTime = formatTime(remainingTime)
      })
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
  dateRangeOutpay.value = [];
  dateRangeReview.value = [];
  
  handleChangeWithdrawl();
  handleChangeOutpay();
  handleChangeReview();
}
function handleExport() {
  proxy.download(
    "/system/fund/withdrawl/order/export",
    {
      ...queryParams.value,
    },
    `${i18n.global.t("funds.reserveWithdrawList")}${new Date().toLocaleDateString()}.xlsx`
  );
}
function withdrawImmediately(row){
  loading.value = true
  return immedPayout({
    orderNo:row.orderNo
  }).then(res=>{
    loading.value = false
    proxy.$modal.msgSuccess(i18n.global.t("funds.paymentSuccessRightNow"))
    getList()
  }).catch(()=>{
      loading.value = false
  })
}
function formatTime(time) {
      if (time <= 0) {
        return '0';
      }

      const hours = Math.floor(time / 3600000);
      const minutes = Math.floor((time % 3600000) / 60000);
      const seconds = Math.floor((time % 60000) / 1000);

      return `${hours}: ${minutes}: ${seconds}`;
}
onActivated(async()=>{
  if(isFirstLoad.value){
    await queryhHoursLeftPayout();
    await getList();
  }
})
</script>

<style lang="scss" scoped>
.funds-record-reserve-index {
  padding: 20px;
  padding-bottom: 10px;
  .download-btn {
    background: #f59a23;
    color: #fff;
  }
  .status-one {
    color: #04f21c;
  }
  .status-two {
    color: #1890ff;
  }
  .status-three {
    color: rgba(217, 0, 27, 0.8117647058823529);
  }
  .status-four {
    color: #f59a23;
  }
  .status-five {
    color: #1890ff;
  }
  .status-six {
    color: rgba(217, 0, 27, 0.8117647058823529);
  }
  .btn-group {
    display: flex;
    flex-wrap: wrap;
    :deep() {
      .el-button:nth-child(4) {
        margin-left: 0;
        margin-top: 12px;
      }
      .el-button:nth-child(5) {
        margin-top: 12px;
      }
    }
  }
}
</style>
