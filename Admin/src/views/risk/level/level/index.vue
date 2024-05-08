<template>
  <div class="risk-control-management-level-level">
    <!-- 层级配置 -->
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-row :gutter="10">
        <el-col :span="5">
          <el-form-item :label="$t('risk.levelNameQuote')" prop="layerName" class="full-width">
            <el-input
              v-model="queryParams.layerName"
              :placeholder="$t('risk.pleaseInput')"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item :label="$t('risk.levelTypeQuote')" prop="layerType" class="full-width">
            <el-select
              v-model="queryParams.layerType"
              :placeholder="$t('risk.pleaseSelect')"
              clearable
              class="full-width"
            >
              <el-option
                v-for="dict in hierarchyTypeList"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
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
          <!-- <el-button @click="delLevel(row)" type="danger" size="small"
            >{{ $t('risk.delete') }}</el-button
          > -->
        </template>
      </el-table-column>
      <el-table-column :label="$t('risk.levelName')" prop="layerName" align="center">
        <template #default="{ row }">
          <span>{{ row.layerName ? row.layerName : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('risk.levelType')"  align="center">
        <template #default="{ row }">
          <span v-if="row.layerType===1">{{ $t('risk.financial') }}</span>
          <span v-else-if="row.layerType===2">{{ $t('risk.riskControl') }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('risk.userNumber')" prop="memberNum" align="center">
        <template #default="{ row }">
          <a @click="openUserDia(row)" class="pointer">{{ row.memberNum||row.memberNum==0?row.memberNum:"-" }}</a>
        </template>
      </el-table-column>
      <el-table-column :label="$t('risk.remarkNoQuote')" align="center">
        <template #default="{ row }">
          <span>{{ row.remark || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('risk.createBy')" prop="createBy" align="center">
        <template #default="{ row }">
          <span>{{ row.createBy ? row.createBy : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('risk.creativeTime')" prop="createTime" align="center">
        <template #default="{ row }">
          <span>{{ row.createTime ? row.createTime : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('risk.lastUpdateBy')" prop="updateBy" align="center">
        <template #default="{ row }">
          <span>{{ row.updateBy ? row.updateBy : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('risk.lastUpdateTime')" prop="updateTime" align="center">
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
    <AddOrEditLevelDialog 
      v-model:open="open" 
      :type="type" 
      :id="id"
      @onrefresh="getList" 
      v-if="open" />
      <UserNumPopover
      v-model:openUser="openUser" 
      :id="cloneId"
      :title="title"
      v-if="openUser" />
  </div>
</template>

<script setup name="Level-config">
import i18n from "@/i18n";
import { getCurrentInstance, onMounted } from "vue";
import { getRiskHierarchyList,delRiskHierarchy } from "@/api/risk/level/index";
import UserNumPopover from "./components/UserNumPopover.vue";
import AddOrEditLevelDialog from "./components/AddOrEditLevelDialog.vue";

const { proxy } = getCurrentInstance();
const queryRef = ref(null);
const queryParams = ref({
  layerName: null,
  layerType: null,
  pageNum: 1,
  pageSize: 10,
});
const tableData = ref([]);
const total = ref(0);
const hierarchyTypeList = ref([
  {
    label:i18n.global.t("risk.financial"),
    value:1
  },
  {
    label:i18n.global.t("risk.riskControl"),
    value:2
  }
]);
const id = ref(null);
const title = ref(null);
const cloneId = ref(null);
const type = ref(null);
const open = ref(false);
const openUser = ref(false);
const isFirstLoad = ref(true);

onMounted(async()=>{
  if(isFirstLoad.value){
    await getList();
    isFirstLoad.value = false
  }
})
function getList() {
  return getRiskHierarchyList(queryParams.value).then(res=>{
    tableData.value = res.records || []
    total.value = res.total || 0
  })
}
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}
function resetQuery() {
  queryRef.value.resetFields();
}
function addLevel() {
  type.value = "add";
  open.value = true;
}
function editLevel(row) {
  id.value = row.id
  type.value = "edit";
  open.value = true;
}
function openUserDia(row){
  cloneId.value = row.id
  title.value = row.layerName
  openUser.value = true
}
function delLevel(row) {
  proxy.$modal
    .confirms(i18n.global.t("risk.sureToDelete"), i18n.global.t("risk.tips"))
    .then(() => {
        delRiskHierarchy(row.id).then(res=>{
        getList()
        proxy.$modal.msgSuccess(i18n.global.t("risk.deleteSuccessfully"))
      })
    })
    .catch(() => {});
}
onActivated(()=>{
  !isFirstLoad.value && getList()
})
</script>

<style lang="scss" scoped>
.risk-control-management-level-level {
  padding: 20px;
  .add-btn{
    background: #F59A23;
    color:#FFF;
  }
  .pointer{
    cursor: pointer;
    color:#1890ff;
  }
}
</style>
