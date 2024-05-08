<template>
  <div class="withdrawl-wait-list" v-loading="loading">
    <!-- C2C提款搁置列表 -->
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-form-item :label="$t('funds.userName')" prop="userName" class="full-width">
            <el-input
              v-model="queryParams.userName"
              :placeholder="$t('funds.pleaseInput')"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('funds.withdrawTimeRange')" class="full-width">
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
          <el-form-item :label="$t('funds.triggerCondition')" prop="triggerCondition" class="full-width">
            <el-select
              v-model="queryParams.triggerCondition"
              :placeholder="$t('funds.pleaseSelect')"
              clearable
              class="full-width"
            >
              <el-option
                v-for="dict in conditionList"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('funds.handleTime')" class="full-width">
            <el-date-picker
              v-model="dateRangeSolve"
              value-format="YYYY-MM-DD HH:mm:ss"
              type="datetimerange"
              range-separator="-"
              :start-placeholder="$t('funds.beginTime')"
              :end-placeholder="$t('funds.endTime')"
              @change="handleChangeSolve"
              :default-time="defaultTime"
              :shortcuts="shortcuts"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('funds.status')" prop="status" class="full-width">
            <el-select
              v-model="queryParams.status"
              :placeholder="$t('funds.pleaseSelect')"
              clearable
              class="full-width"
            >
              <el-option
                v-for="dict in isHandleList"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('funds.hanlder')" prop="operator" class="full-width">
            <el-input
              v-model="queryParams.operator"
              :placeholder="$t('funds.pleaseInput')"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item class="full-width">
            <el-button type="primary" icon="Search" @click="handleQuery"
              >{{ $t('funds.search') }}</el-button
            >
            <el-button icon="Refresh" @click="resetQuery">{{ $t('funds.reset') }}</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row class="mb-16">
      <el-button type="warning" size="large" :disabled="isEdit" @click="refuseMulti(inject)">{{ $t('funds.withdrawalRejectBatch') }}</el-button>
      <el-button type="success" size="large" :disabled="isEdit" @click="refuseMulti(success)">{{ $t('funds.withdrawalResolveBatch') }}</el-button>
    </el-row>
    <el-table :data="tableData" @selection-change="handleSelectionChange" :empty-text="$t('member.noData')">
      <el-table-column type="selection" width="55" />
      <el-table-column :label="$t('funds.serialNumber')" width="55" type="index" align="center">
        <template #default="scope">
          <span>{{
            (queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1
          }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('funds.handle')" align="center" width="180">
        <template #default="{ row }">
          <template v-if="row.status==='0'">
            <el-button @click="refuseSingle(row,success)" type="warning" size="small"
            >{{ $t('funds.withdrawalResolve') }}</el-button
            >
            <el-button @click="refuseSingle(row,inject)" type="success" size="small"
            >{{ $t('funds.withdrawalInject') }}</el-button
            >
          </template>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('funds.userNameNoQuote')" prop="userName" align="center">
        <template #default="{ row }">
          <span>{{ row.userName ? row.userName : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('funds.withdrawalAmount')"  align="center">
        <template #default="{ row }">
          <span>{{ formatNumber(row.amount) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('funds.orderNo')" prop="orderNo" align="center">
        <template #default="{ row }">
          <span>{{ row.orderNo?row.orderNo:"-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('funds.withdrawalTime')" prop="wdTime" align="center" width="180">
        <template #default="{ row }">
          <span>{{ row.wdTime ? row.wdTime : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('funds.triggerConditionNoQuote')" width="180" align="center">
        <template #default="{ row }">
          <template v-if="row.triggerCondition">
            <div v-for="item in row.triggerCondition.split(',')">
              {{ filterLabel(conditionList,item) }}
            </div>
          </template>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('funds.operator')" prop="operator" align="center">
        <template #default="{ row }">
          <span>{{ row.operator ? row.operator : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('funds.operTime')" prop="operTime" align="center" width="180">
        <template #default="{ row }">
          <span>{{ row.operTime ? row.operTime : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('funds.handleResult')" prop="status" align="center">
        <template #default="{ row }">
          <span>{{ filterLabel(isHandleList,row.status) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('funds.remark')" prop="remark" align="center">
        <template #default="{ row }">
          <span>{{ row.remark ? row.remark : "-" }}</span>
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
import { getCurrentInstance } from "vue";
import { getWithdrawHoldList,batchUpdate } from "@/api/funds/c2c/index";
import { filterLabel,formatNumber } from "@/utils/index";
import { defaultTime,shortcuts } from "@/utils/config";
import i18n from "@/i18n";
import usePermissionStore from "@/store/modules/permission";

const { proxy } = getCurrentInstance();
const queryRef = ref(null);
const queryParams = ref({
  userName: null,
  triggerCondition: null,
  status:null,
  operator:null,
  wdStartTime:null,
  wdEndTime:null,
  operStartTime:null,
  operEndTime:null,
  pageNum: 1,
  pageSize: 10,
});
const dateRange = ref([]);
const dateRangeSolve = ref([]);
const tableData = ref([]);
const total = ref(0);
const loading = ref(false);
const conditionList = ref([
  {
    label:i18n.global.t('funds.depositTime'),
    value:'1'
  },
  {
    label:i18n.global.t('funds.depositWithdrawlAveragePercent'),
    value:'2'
  },
  {
    label:i18n.global.t('funds.depositWithdrawlRatio'),
    value:'3'
  }
]);
const isHandleList = ref([
  {
    label:i18n.global.t('funds.notProcessed'),
    value:'0'
  },
  {
    label:i18n.global.t('funds.approved'),
    value:'1'
  },
  {
    label:i18n.global.t('funds.rejected'),
    value:'2'
  },
  {
    label:i18n.global.t('funds.AgreedTimeout'),
    value:'3'
  }
]);
const success = ref("1");
const inject = ref("2");
const multipleList = ref([]); //表格的多选
const isFirstLoad = ref(true);

const isEdit = computed(()=>{
  return multipleList.value && multipleList.value.length===0
})
onMounted(async()=>{
  if(isFirstLoad.value){
    await getList();
    isFirstLoad.value = false;
  }
})
function getList() {
  loading.value = true
  return getWithdrawHoldList(queryParams.value).then(res=>{
    loading.value = false
    tableData.value = res.rows || []
    total.value = res.total || 0
  }).catch(()=>{
    loading.value = false
  })
}
function handleChange() {
  if ((dateRange.value && !dateRange.value.length) || dateRange.value == null) {
    queryParams.value.wdStartTime = null;
    queryParams.value.wdEndTime = null;
  } else {
    queryParams.value.wdStartTime = dateRange.value[0];
    queryParams.value.wdEndTime = dateRange.value[1];
  }
}
function handleChangeSolve() {
  if ((dateRangeSolve.value && !dateRangeSolve.value.length) || dateRangeSolve.value == null) {
    queryParams.value.operStartTime = null;
    queryParams.value.operEndTime = null;
  } else {
    queryParams.value.operStartTime = dateRangeSolve.value[0];
    queryParams.value.operEndTime = dateRangeSolve.value[1];
  }
}
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}
function resetQuery() {
  queryRef.value.resetFields();
  dateRange.value = [];
  dateRangeSolve.value = [];
  handleChange();
  handleChangeSolve();
}
function handleSelectionChange(selection){
  multipleList.value = selection.map(item=>item.orderNo) || [];
}
function refuseSingle(row,type){
  let list  = [row.id];
  multiRefuseOrAllow(list,type)
}
function refuseMulti(type){
  let list = multipleList.value;
  multiRefuseOrAllow(list,type)
}
function multiRefuseOrAllow(list,type){
  batchUpdate({
    ids:list,
    status:type
  }).then(res=>{
    proxy.$modal.msgSuccess(i18n.global.t('funds.operateSuccessfully'));
    usePermissionStore().getRiskUnreview();
    getList();
  })
}
onActivated(async()=>{
  if(!isFirstLoad.value){
    await getList();
  }
})
</script>

<style lang="scss" scoped>
.withdrawl-wait-list {
}
</style>
