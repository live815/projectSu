<template>
  <div class="yestoday-risk-warn" v-loading="loading">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-form-item :label="$t('risk.userName')" prop="userName" class="full-width">
            <el-input v-model="queryParams.userName" :placeholder="$t('risk.pleaseInput')" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('risk.parentName')" prop="parentName" class="full-width">
            <el-input v-model="queryParams.parentName" :placeholder="$t('risk.pleaseInput')" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('risk.riskLevel')" prop="riskLevel" class="full-width">
            <el-select
              v-model="queryParams.riskLevel"
              :placeholder="$t('risk.pleaseSelect')"
              class="full-width"
              clearable
            >
              <el-option
                v-for="dict in riskLevelList"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('risk.financialTier')" prop="financeTier" class="full-width">
            <el-select
              v-model="queryParams.financeTier"
              multiple
              :placeholder="$t('risk.pleaseSelect')"
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
          <el-form-item :label="$t('risk.riskControlTier')" prop="riskControlTier" class="full-width">
            <el-select
              v-model="queryParams.riskControlTier"
              multiple
              :placeholder="$t('risk.pleaseSelect')"
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
          <el-form-item class="full-width">
            <el-button type="primary" icon="Search" @click="handleQuery"
              >{{ $t('risk.search') }}</el-button
            >
            <el-button icon="Refresh" @click="resetQuery">{{ $t('risk.reset') }}</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 表格数据 -->
    <el-table :data="tableData" style="margin-top: 20px" :empty-text="$t('risk.noData')">
      <el-table-column :label="$t('risk.serialNumber')" width="55" type="index" align="center">
        <template #default="scope">
          <span>{{
            (queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1
          }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('risk.handle')" align="center">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="clearData(row)">{{ $t('risk.clear') }}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('risk.userNameNoQuote')"
        align="center"
        width="260"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ row.userName ? row.userName : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('risk.riskScore')"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span class="pointer" @click="openDia(row)">{{ row.riskScore||row.riskScore===0 ? row.riskScore : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('risk.riskLevelNoQuote')"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span :class="colorSwitch(row.riskLevel)">{{ filterLabel(riskLevelList,row.riskLevel) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('risk.userLevel')"
        align="center"
        :show-overflow-tooltip="true"
      >
      <template #default="{ row }">
          <template v-if="row.financeTierName || row.riskTierName">
            <div>
              <span>{{ $t('risk.financialTier') }}</span>
              <span>{{ row.financeTierName ? row.financeTierName : "-" }}</span>
            </div>
            <div>
              <span>{{ $t('risk.riskControlTier') }}</span>
              <span>{{ row.riskTierName ? row.riskTierName : "-" }}</span>
            </div>
          </template>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('risk.parentNameNoQuote')"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ row.parentName ? row.parentName : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('risk.policyNameNoQuote')"
        align="center"
        width="240"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ row.strategyName ? row.strategyName : "-" }}</span>
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
    <RiskScoreDetail 
      v-model:open="open"
      :cloneRow="cloneRow"
      v-if="open"
      />
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import {
  getCurrentInstance,
  onMounted,
} from "vue";
import RiskScoreDetail from "./RiskScoreDetail.vue";
import { getRiskFinancalList } from "@/api/risk/level/index";
import { getWarningRecordList, clearWarningRecord} from "@/api/risk/record/index";
import { filterLabel } from "@/utils/index";

const { proxy } = getCurrentInstance();
const queryRef = ref(null);
const queryParams = ref({
  userName:null, //会员账号
  parentName:null, //上级代理
  riskLevel:null, //风险等级
  financeTier:null, //财务等级
  riskControlTier:null, //财务等级
  pageNum: 1,
  pageSize: 10,
});
const riskLevelList = ref([
  {
    label:i18n.global.t("risk.noRisk"),
    value:1
  },
  {
    label:i18n.global.t("risk.lowRisk"),
    value:2
  },
  {
    label:i18n.global.t("risk.middleRisk"),
    value:3
  },
  {
    label:i18n.global.t("risk.highRisk"),
    value:4
  }
]);
const riskList = ref([]); //风控层级
const financalList = ref([]); //财务层级
const tableData = ref([]);
const total = ref(0);
const loading = ref(false);
const open = ref(false);
const cloneRow = ref(null);
const isFirstLoad = ref(true);

onMounted(async ()=>{
  await queryRiskList();
  await queryFinancalList();
  if(isFirstLoad.value){
    await getList();
    isFirstLoad.value = false
  }
})
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
  return getWarningRecordList(queryParams.value)
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
}
function openDia(row){
  cloneRow.value = row
  open.value = true
}
function clearData(row){
  clearWarningRecord(row.userId).then(res=>{
    proxy.$modal.msgSuccess(i18n.global.t("risk.operateSuccessfully"));

    getList()
  })
}
function colorSwitch(value){
  switch (value) {
    case 1:
      return "color-1890ff";
    case 2:
      return "color-04d919";
    case 3:
      return "color-f59a23";
    case 4:
      return "color-d9001b";      
  }
}
onActivated(async()=>{
  if(!isFirstLoad.value){
    await queryRiskList();
    await queryFinancalList();
    await getList();
  }
})
</script>

<style lang="scss" scoped>
.yestoday-risk-warn {
  .no-risk{
    color:#1890FF;
  }
  .low-risk{
    color:#04D919;
  }

  .middle-risk{
    color:#F59A23;
  }
  .high-risk{
    color:#D9001B;
  }
}
</style>
