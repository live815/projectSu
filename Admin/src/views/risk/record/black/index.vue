<template>
  <div class="risk-record-black-index" v-loading="loading">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item
            :label="$t('risk.blackType')"
            prop="blacklistType"
            class="full-width"
          >
            <el-select
              v-model="queryParams.blacklistType"
              :placeholder="$t('risk.pleaseSelect')"
              class="full-width"
              clearable
            >
              <el-option
                v-for="dict in sys_risk_blacklist_type"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            :label="$t('risk.value')"
            prop="blacklistValue"
            class="full-width"
          >
            <el-input
              v-model="queryParams.blacklistValue"
              :placeholder="$t('risk.pleaseInput')"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('risk.blackGroupAdjustBefore')" prop="adjustBeforeName" class="full-width">
            <el-select
              v-model="queryParams.adjustBeforeName"
              :placeholder="$t('risk.pleaseSelect')"
              class="full-width"
              clearable
            >
              <el-option
                v-for="dict in blackGroupList"
                :key="dict.id"
                :label="dict.groupName"
                :value="dict.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('risk.blackGroupAdjustAfter')" prop="adjustAfterName" class="full-width">
            <el-select
              v-model="queryParams.adjustAfterName"
              :placeholder="$t('risk.pleaseSelect')"
              class="full-width"
              clearable
            >
              <el-option
                v-for="dict in blackGroupList"
                :key="dict.id"
                :label="dict.groupName"
                :value="dict.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            :label="$t('risk.operateType')"
            prop="adjustType"
            class="full-width"
          >
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
        :label="$t('risk.operateTypeNoQuote')"
        align="center"
        width="260"
      >
        <template #default="{ row }">
          <span>{{ filterLabel(adjustTypeList,row.adjustType) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('risk.type')"
        align="center"
      >
        <template #default="{ row }">
          <span>{{ filterLabel(sys_risk_blacklist_type,row.blacklistType) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('risk.valueNoQuote')"
        align="center"
      >
        <template #default="{ row }">
          <span>{{ row.blacklistValue ? row.blacklistValue : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('risk.blackGroupAdjustBeforeNoQuote')"
        align="center"
      >
        <template #default="{ row }">
          <span>{{ row.adjustBeforeName ? row.adjustBeforeName : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('risk.blackGroupAdjustAfterNoQuote')"
        align="center"
      >
        <template #default="{ row }">
          <span>{{ row.adjustAfterName ? row.adjustAfterName : "-" }}</span>
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
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import {
  getCurrentInstance,
  onMounted,
} from "vue";
import { filterLabel } from "@/utils/index";
import { defaultTime, shortcuts } from "@/utils/config";
import { getBlackGroupList } from "@/api/risk/config/index";
import { adjustBlackRecordList } from "@/api/risk/record/index";

const { proxy } = getCurrentInstance();
const { sys_risk_blacklist_type } = proxy.useDict("sys_risk_blacklist_type");
const queryRef = ref(null);
const queryParams = ref({
  blacklistType:null, //黑名单类型
  blacklistValue:null, //值
  adjustBeforeName:null, //调整前
  adjustAfterName:null, //调整后
  beginTime: null,
  endTime: null,
  pageNum: 1,
  pageSize: 10,
});
const blackGroupList = ref([]); //黑名单群组列表
const dateRange = ref([]);
const tableData = ref([
]);
const adjustTypeList = ref([
  {
    label:i18n.global.t("risk.increaseBlackList"),
    value:1
  },
  {
    label:i18n.global.t("risk.groupAdjust"),
    value:2
  }
])
const total = ref(0);
const loading = ref(false);
const open = ref(false);
const id = ref(null);

onMounted(async ()=>{
  await queryBlackGroupList();
  await getList();
})
//查询黑名单群组
function queryBlackGroupList(){
  return getBlackGroupList({}).then(res=>{
    blackGroupList.value = res || [];
  })
}
function getList() {
  loading.value = true;
  return adjustBlackRecordList(queryParams.value)
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
  id.value = row.id
  open.value = true
}
</script>

<style lang="scss" scoped>
.risk-record-black-index {
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
