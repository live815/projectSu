<template>
  <div class="risk-control-plan-config">
    <!-- 风控方案设置 -->
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-form-item :label="$t('risk.riskControlPlan')" prop="planName" class="full-width">
            <el-input
              v-model="queryParams.planName"
              :placeholder="$t('risk.pleaseInput')"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('risk.creativeTimeQuote')" class="full-width">
            <el-date-picker
              v-model="dateRangeCreate"
              value-format="YYYY-MM-DD HH:mm:ss"
              type="datetimerange"
              range-separator="-"
              :start-placeholder="$t('risk.beginTime')"
              :end-placeholder="$t('risk.endTime')"
              @change="handleChangeCreate"
              :default-time="defaultTime"
              :shortcuts="shortcuts"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('risk.lastUpdateTimeQuote')" class="full-width">
            <el-date-picker
              v-model="dateRangeLastOperate"
              value-format="YYYY-MM-DD HH:mm:ss"
              type="datetimerange"
              range-separator="-"
              :start-placeholder="$t('risk.beginTime')"
              :end-placeholder="$t('risk.endTime')"
              @change="handleChangeOperate"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item class="full-width">
            <el-button type="primary" icon="Search" @click="handleQuery"
              >{{ $t('risk.search') }}</el-button
            >
            <el-button icon="Refresh" @click="resetQuery">{{ $t('risk.reset') }}</el-button>
            <el-button icon="Plus" @click="addLevel" class="add-btn">{{ $t('risk.add') }}</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="tableData" :empty-text="$t('risk.noData')">
      <el-table-column :label="$t('risk.handle')" align="center">
        <template #default="{ row }">
          <el-button @click="editLevel(row)" type="primary" size="small"
            >{{ $t('risk.edit') }}</el-button
          >
          <el-button @click="delLevel(row)" type="danger" size="small"
            v-if="row.planType===2">{{ $t('risk.delete') }}</el-button
          >
        </template>
      </el-table-column>
      <el-table-column :label="$t('risk.riskControlPlanNoQuote')" prop="planName" align="center">
        <template #default="{ row }">
          <span>{{ row.planName ? row.planName : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('risk.planType')" prop="planType" align="center">
        <template #default="{ row }">
          <span v-if="row.planType===1">{{ $t('risk.basic') }}</span>
          <span v-else-if="row.planType===2">{{ $t('risk.level') }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('risk.levelName')" prop="riskLayerNames" align="center">
        <template #default="{ row }">
          <span>{{ row.riskLayerNames ? row.riskLayerNames : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('risk.status')" prop="status" align="center">
        <template #default="{ row }">
          <el-switch v-model="row.status"  :active-value="0"
          :inactive-value="1" @change="changeStatus(row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column :label="$t('risk.remarkNoQuote')" prop="remark" align="center">
        <template #default="{ row }">
          <span>{{ row.remark ? row.remark : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('risk.createBy')" prop="createBy" align="center">
        <template #default="{ row }">
          <span>{{ row.createBy ? row.createBy : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('risk.creativeTime')" prop="createTime" align="center" width="180">
        <template #default="{ row }">
          <span>{{ row.createTime ? row.createTime : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('risk.lastUpdateBy')" prop="updateBy" align="center">
        <template #default="{ row }">
          <span>{{ row.updateBy ? row.updateBy : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('risk.lastUpdateTime')" prop="updateTime" align="center" width="180">
        <template #default="{ row }">
          <span>{{ row.updateTime ? row.updateTime : "-" }}</span>
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
    <AddOrEditPlanDia
      v-model:open="open" 
      :type="type" 
      :id="id"
      @onrefreshlist="getList"
      v-if="open"
    />
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { getCurrentInstance, onMounted } from "vue";
import { getRiskPlanList,deleteRiskPlan,editStatus } from "@/api/risk/config/index";
import AddOrEditPlanDia from "./AddOrEditPlanDia.vue";
import { defaultTime, shortcuts } from "@/utils/config";

const { proxy } = getCurrentInstance();
const queryRef = ref(null);
const queryParams = ref({
  planName: null,
  beginTime:null, //创建时间
  endTime:null,
  operateBeginTime:null, //最后操作时间
  operateEndTime:null,
  pageNum: 1,
  pageSize: 10,
});
const dateRangeCreate = ref([]);
const dateRangeLastOperate = ref([]);
const tableData = ref([]);
const total = ref(0);
const type = ref(null);
const open = ref(false);
const id = ref(null);
const isFirstLoad = ref(true);

onMounted(async ()=>{
  if(isFirstLoad.value){
    await getList();
    isFirstLoad.value = false;
  }
})
function getList() {
  return getRiskPlanList(queryParams.value).then(res=>{
    tableData.value = res.rows || [];
    total.value = res.total||0;
  })
}

function handleChangeCreate() {
  if ((dateRangeCreate.value && !dateRangeCreate.value.length) || dateRangeCreate.value == null) {
    queryParams.value.beginTime = null;
    queryParams.value.endTime = null;
  } else {
    queryParams.value.beginTime = dateRangeCreate.value[0];
    queryParams.value.endTime = dateRangeCreate.value[1];
  }
}
function handleChangeOperate() {
  if ((dateRangeLastOperate.value && !dateRangeLastOperate.value.length) || dateRangeLastOperate.value == null) {
    queryParams.value.operateBeginTime = null;
    queryParams.value.operateEndTime = null;
  } else {
    queryParams.value.operateBeginTime = dateRangeLastOperate.value[0];
    queryParams.value.operateEndTime = dateRangeLastOperate.value[1];
  }
}
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}
function resetQuery() {
  dateRangeCreate.value = [];
  dateRangeLastOperate.value = [];
  handleChangeCreate();
  handleChangeOperate();
  queryRef.value.resetFields();
}
function addLevel() {
  type.value = "add";
  open.value = true;
}
function editLevel(row) {
  type.value = "edit";
  open.value = true;
  id.value = row.id;
}
function delLevel(row) {
  proxy.$modal
    .confirms(i18n.global.t("risk.sureToDelete"), i18n.global.t("risk.tip"))
    .then(() => {
      deleteRiskPlan([row.id]).then(res=>{
        getList()
        proxy.$modal.msgSuccess(i18n.global.t("risk.deleteSuccessfully"))
      })
    })
    .catch(() => {});
}
function changeStatus(row){
  proxy.$modal
    .confirms(i18n.global.t("risk.sureToChangeStatus"), i18n.global.t("risk.tip"))
    .then(() => {
      editStatus({
        id: row.id,
        status: row.status,
      }).then((res) => {
        proxy.$modal.msgSuccess(i18n.global.t("risk.operateSuccessfully"));
        getList();
      });
    })
    .catch(() => {
      row.status = row.status === 0 ? 1 : 0;
    });
}
onActivated(async()=>{
  if(!isFirstLoad.value){
    await getList();
  }
})
</script>

<style lang="scss" scoped>
.risk-control-plan-config {
  padding: 20px;
  .add-btn{
    background: #F59A23;
    color:#FFF;
  }
}
</style>
