<template>
  <div class="risk-record-adjust-level" v-loading="loading">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-form-item :label="$t('risk.userName')" prop="memberName" class="full-width">
            <el-input v-model="queryParams.memberName" :placeholder="$t('risk.pleaseInput')" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('risk.adjustPerson')" prop="createBy" class="full-width">
            <el-input v-model="queryParams.createBy" :placeholder="$t('risk.pleaseInput')" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('risk.adjustBefore')" prop="adjustBeforeName" class="full-width">
            <el-select
              v-model="queryParams.adjustBeforeName"
              :placeholder="$t('risk.pleaseSelect')"
              class="full-width"
              clearable
            >
              <el-option
                v-for="dict in levelList"
                :key="dict.id"
                :label="dict.layerName"
                :value="dict.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('risk.adjustAfter')" prop="adjustAfterName" class="full-width">
            <el-select
              v-model="queryParams.adjustAfterName"
              :placeholder="$t('risk.pleaseSelect')"
              class="full-width"
              clearable
            >
              <el-option
                v-for="dict in levelList"
                :key="dict.id"
                :label="dict.layerName"
                :value="dict.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('risk.adjustType')" prop="adjustType" class="full-width">
            <el-select
              v-model="queryParams.adjustType"
              :placeholder="$t('risk.pleaseSelect')"
              class="full-width"
              clearable
            >
              <el-option
                v-for="dict in adjustTypeList"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('risk.policyName')" prop="ployName" class="full-width">
            <el-select
              v-model="queryParams.ployName"
              :placeholder="$t('risk.pleaseSelect')"
              class="full-width"
              clearable
            >
              <el-option
                v-for="dict in ployNameList"
                :key="dict.id"
                :label="dict.ployName"
                :value="dict.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('risk.adjustTime')" class="full-width">
            <el-date-picker
              v-model="dateRange"
              value-format="YYYY-MM-DD HH:mm:ss"
              type="datetimerange"
              range-separator="-"
              :start-placeholder="$t('risk.beginTime')"
              :end-placeholder="$t('risk.endTime')"
              @change="handleChange"
              :default-time="defaultTime"
              :shortcuts="shortcuts"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
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
      <el-table-column
        :label="$t('risk.userNameNoQuote')"
        align="center"
        width="260"
      >
        <template #default="{ row }">
          <span>{{ row.memberName ? row.memberName : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('risk.adjustBeforeNoQuote')"
        align="center"
      >
        <template #default="{ row }">
          <span>{{ row.adjustBeforeName ? row.adjustBeforeName : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('risk.adjustAfterNoQuote')"
        align="center"
      >
        <template #default="{ row }">
          <span>{{ row.adjustAfterName ? row.adjustAfterName : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('risk.adjustTypeNoQuote')"
        align="center"
      >
        <template #default="{ row }">
          <span>{{ filterLabel(adjustTypeList,row.adjustType) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('risk.policyNameNoQuote')"
        align="center"
      >
        <template #default="{ row }">
          <span class="pointer" @click="openDia(row)">{{ row.ployName ? row.ployName : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('risk.adjustPersonNoQuote')"
        align="center"
      >
        <template #default="{ row }">
          <span>{{ row.createBy ? row.createBy : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('risk.adjustTimeNoQuote')"
        align="center"
        width="240"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ row.createTime ? row.createTime : "-" }}</span>
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
    <StrategyScoreDialog 
      v-model:open="open"
      :ployId="ployId"
      :memberId="memberId"
      :adjustId="adjustId"
      v-if="open"
      />
  </div>
</template>

<script setup name="Level-adjust-record">
import i18n from "@/i18n";
import {
  getCurrentInstance,
  onMounted,
} from "vue";
import StrategyScoreDialog from "./components/StrategyScoreDialog.vue";
import { filterLabel } from "@/utils";
import { defaultTime, shortcuts } from "@/utils/config";
import { getRiskFinancalList } from "@/api/risk/level/index";
import { adjustRecordList,memberRelationList,getPloyList } from "@/api/risk/record/index";

const { proxy } = getCurrentInstance();
const queryRef = ref(null);
const queryParams = ref({
  memberName:null, //会员账号
  createBy:null, //调整人
  adjustBeforeName:null, //调整前
  adjustAfterName:null, //调整后
  adjustType:null, //调整类型
  ployName:null, //策略名称
  beginTime: null,
  endTime: null,
  pageNum: 1,
  pageSize: 10,
});
const levelList = ref([]);
const adjustTypeList = ref([
  {
    label:i18n.global.t("risk.systemAdjust"),
    value:1
  },
  {
    label:i18n.global.t("risk.manualAdjust"),
    value:2
  }
]);
const ployNameList  = ref([]);
const dateRange = ref([]);
const tableData = ref([]);
const total = ref(0);
const loading = ref(false);
const open = ref(false);
const ployId = ref(null);
const memberId = ref(null);
const adjustId = ref(null);
const isFirstLoad = ref(true);

onMounted(async ()=>{
  await queryFinancalList();
  await queryPloy();
  if(isFirstLoad.value){
    await getList();
    isFirstLoad.value = false
  }
})
//查询策略名称
async function queryPloy() {
  return getPloyList().then((res) => {
    ployNameList.value = res || [];
  });
}
//查询风控和财务层级
function queryFinancalList(){
  return getRiskFinancalList(0).then(res=>{
    levelList.value = res || [];
  })
}
function getList() {
  loading.value = true;
  return adjustRecordList(queryParams.value)
    .then((res) => {
      loading.value = false;
      tableData.value = res.records || [];
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
function handleChange() {
  if ((dateRange.value && !dateRange.value.length) || dateRange.value == null) {
    queryParams.value.beginTime = null;
    queryParams.value.endTime = null;
  } else {
    queryParams.value.beginTime = dateRange.value[0];
    queryParams.value.endTime = dateRange.value[1];
  }
}
function openDia(row){
  ployId.value = row.ployId
  memberId.value = row.memberId
  adjustId.value = row.id
  open.value = true
}
onActivated(async()=>{
  if(!isFirstLoad.value){
    await queryFinancalList();
    await queryPloy();
    await getList();
  }
})
</script>

<style lang="scss" scoped>
.risk-record-adjust-level {
  padding: 20px;
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
