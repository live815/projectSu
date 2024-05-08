<template>
  <!-- 充值异常记录 -->
  <div class="funds-record-exception-record" v-loading="loading">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item :label="$t('funds.rechargeTime')" class="full-width">
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
              :placeholder="$t('funds.pleaseSelect')"
              class="full-width"
              multiple
              clearable
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
              :placeholder="$t('funds.pleaseSelect')"
              class="full-width"
              multiple
              clearable
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
            :label="$t('funds.channelType')"
            prop="channelTypeId"
            class="full-width"
          >
            <el-select
              v-model="queryParams.channelTypeId"
              :placeholder="$t('funds.pleaseSelect')"
              clearable
              class="full-width"
            >
              <el-option
                v-for="dict in channelTypeIdList"
                :key="dict.id"
                :label="dict.channelName"
                :value="dict.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('funds.storeName')" prop="mchId" class="full-width">
            <el-select
              v-model="queryParams.mchId"
              :placeholder="$t('funds.pleaseSelect')"
              clearable
              class="full-width"
            >
              <el-option
                v-for="dict in rechargeTypeList"
                :key="dict.mchId"
                :label="dict.mchName"
                :value="dict.mchId"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('funds.exceptionType')" prop="anomalType" class="full-width">
            <el-select
              v-model="queryParams.anomalType"
              :placeholder="$t('funds.pleaseSelect')"
              clearable
              class="full-width"
            >
              <el-option
                v-for="dict in exceptionList"
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
              >{{ $t("funds.search") }}</el-button
            >
            <el-button icon="Refresh" @click="resetQuery">{{ $t("funds.reset") }}</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 表格数据 -->
    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%" :empty-text="$t('funds.noData')">
          <el-table-column :label="$t('funds.serialNumber')" width="55" type="index" align="center">
            <template #default="scope">
              <span>{{
                (queryParams.pageNum - 1) * queryParams.pageSize +
                scope.$index +
                1
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('funds.orderNo')"
            align="center"
            width="240"
            :show-overflow-tooltip="true"
          >
            <template #default="{ row }">
              <span>{{ row.orderNo || "-" }}</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('funds.rechargeTimeNoquote')"
            align="center"
            width="200"
            :show-overflow-tooltip="true"
          >
            <template #default="{ row }">
              <span>{{ row.createTime ? row.createTime : "-" }}</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('funds.memberInformation')"
            align="center"
            width="210"
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
            width="190"
            :show-overflow-tooltip="true"
          >
            <template #default="{ row }">
              <template v-if="row.financeTierName || row.riskTierName">
                <div>
                  <span>{{ $t('funds.financialTierQuote') }}</span>
                  <span>{{
                    row.financeTierName ? row.financeTierName : "-"
                  }}</span>
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
            :label="$t('funds.rechargeAmount')"
            prop="amount"
            align="center"
            :show-overflow-tooltip="true"
          >
            <template #default="{ row }">
              <span v-if="row.orderType === '0'">{{formatNumber(row.amount)}}</span>
              <div v-else>
                <div>
                  <span>{{ $t('funds.rechargeAmount') }}:</span>
                  <span>{{formatNumber(row.amount)}}</span>
                </div>
                <div>
                  <span>{{ $t('funds.rate') }}</span>
                  <span>{{ row.rate ? row.rate : "-" }}</span>
                </div>
                <div>
                  <span>{{ $t('funds.usdtNumber') }}</span>
                  <span>{{ row.usdtNum ? row.usdtNum : "-" }}</span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('funds.channelTypeNoquote')"
            align="center"
            :show-overflow-tooltip="true"
          >
            <template #default="{ row }">
              <span>{{ row.channelTypeName ? row.channelTypeName : "-" }}</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('funds.storeNameNoquote')"
            align="center"
            :show-overflow-tooltip="true"
          >
            <template #default="{ row }">
              <span>{{ row.mchName ? row.mchName : "-" }}</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('funds.exceptionTypeNoQuote')"
            align="center"
            :show-overflow-tooltip="true"
          >
            <template #default="{ row }">
              <span>{{ filterLabel(exceptionList,row.anomalType) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('funds.exceptionReason')"
            align="center"
            width="130"
            :show-overflow-tooltip="true"
          >
            <template #default="{ row }">
              <span>{{ row.anomalInfo ? row.anomalInfo : "-" }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <div class="pagination">
      <pagination
        v-show="total > 0"
        :total="total"
        v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize"
        @pagination="getList"
      />
    </div>
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { getCurrentInstance, onMounted } from "vue";
import { getVIPList } from "@/api/funds/common";
import { getRiskFinancalList } from "@/api/risk/level/index";
import { getAnomalLogList } from "@/api/funds/record/index";
import { filterLabel,formatNumber } from "@/utils/index";
import { defaultTime, shortcuts } from "@/utils/config";

const props = defineProps(["channelTypeIdList", "rechargeTypeList"]);
const { proxy } = getCurrentInstance();
const queryRef = ref(null);
const queryParams = ref({
  userName: null, //会员账号
  orderNo: null, //订单号
  vipLevels: [], //VIP等级展示字段
  vipScope: null, //VIP等级
  financeScope: null, //财务层级
  financeIds: [], //财务层级展示字段
  riskScope: null, //风控层级
  riskIds: [], //风控层级展示字段
  channelTypeId: null, //通道类型
  mchId: null, //商户名称
  anomalType: null, //异常类型
  depositStartTime: null,
  depositEndTime: null,
  pageNum: 1,
  pageSize: 10,
});
const exceptionList = ref([
  {
    label: i18n.global.t("funds.systemException"),
    value: "0",
  },
  {
    label: i18n.global.t("funds.fourSquareException"),
    value: "1",
  },
]);
const vipLevelList = ref([]);
const financalList = ref([]);
const riskList = ref([]);

const dateRange = ref([]);
const tableData = ref([]);
const total = ref(0);
const loading = ref(false);
const isFirstLoad = ref(true);

onMounted(async () => {
  await queryVIPList();
  await queryRiskList();
  await queryFinancalList();
  if(isFirstLoad.value){
    await getList();
    isFirstLoad.value = false
  }
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
function getList() {
  loading.value = true;
  return getAnomalLogList(queryParams.value)
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
  dateRange.value = [];
  handleChange();
}
// 选择时间
function handleChange() {
  if ((dateRange.value && !dateRange.value.length) || dateRange.value == null) {
    queryParams.value.depositStartTime = null;
    queryParams.value.depositEndTime = null;
  } else {
    queryParams.value.depositStartTime = dateRange.value[0];
    queryParams.value.depositEndTime = dateRange.value[1];
  }
}
onActivated(async()=>{
  if(!isFirstLoad.value){
    await getList();
  }
})
</script>

<style lang="scss" scoped>
.funds-record-exception-record {
  .pagination {
    padding-bottom: 10px;
  }
}
</style>
