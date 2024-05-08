<template>
  <div class="black-list-config">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item
            :label="$t('risk.blackType')"
            prop="type"
            class="full-width"
          >
            <el-select
              v-model="queryParams.type"
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
            :label="$t('risk.blackGroup')"
            prop="groupId"
            class="full-width"
          >
            <el-select
              v-model="queryParams.groupId"
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
            :label="$t('risk.value')"
            prop="value"
            class="full-width"
          >
            <el-input
              v-model="queryParams.value"
              :placeholder="$t('risk.pleaseInput')"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row>
      <el-col :span="12">
        <el-button type="primary" icon="Search" @click="handleQuery"
          >{{ $t('risk.search') }}</el-button
        >
        <el-button icon="Refresh" @click="resetQuery">{{ $t('risk.reset') }}</el-button>
        <el-button icon="Plus" @click="addLevel" class="add-btn"
          >{{ $t('risk.add') }}</el-button
        >
      </el-col>
      <el-col :span="12" style="text-align: right; margin-bottom: 20px">
        <span class="refresh-title">{{ $t('risk.multipleOperate') }}</span>
        <el-select v-model="multiOperate" :placeholder="$t('risk.pleaseSelect')" clearable>
          <el-option
            v-for="dict in multiOperateList"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
        <el-button
          type="primary"
          @click="multipleOperate"
          :disabled="
            (selectedIds && !selectedIds.length) ||
            (multiOperate !== '0' && multiOperate !== '1')
          "
          >{{ $t('risk.elepmemnt') }}</el-button
        >
      </el-col>
    </el-row>
    <el-table :data="tableData" @selection-change="handleSelectionChange" :empty-text="$t('risk.noData')">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column :label="$t('risk.handle')" align="center">
        <template #default="{ row }">
          <el-button @click="editLevel(row)" type="primary" size="small"
            >{{ $t('risk.edit') }}</el-button
          >
          <el-button @click="delLevel(row)" type="danger" size="small"
            >{{ $t('risk.delete') }}</el-button
          >
        </template>
      </el-table-column>
      <el-table-column :label="$t('risk.type')" prop="type" align="center">
        <template #default="{ row }">
          <span>{{ filterLabel(sys_risk_blacklist_type,row.type) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('risk.valueNoQuote')" prop="value" align="center">
        <template #default="{ row }">
          <span>{{ row.value ? row.value : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('risk.blackGroupNoQuote')" prop="groupName" align="center">
        <template #default="{ row }">
          <span>{{ row.groupName ? row.groupName : "-" }}</span>
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
    <AddOrEditConfigDia 
      v-model:open="open" 
      :type="type" 
      :id="id"
      :sys_risk_blacklist_type="sys_risk_blacklist_type" 
      @onrefresh="getList"
      v-if="open" />
    <MultiAdjustDialog 
      v-model:openAdjust="openAdjust"  
      v-if="openAdjust" 
      :sys_risk_blacklist_type="sys_risk_blacklist_type"
      @onrefreshgroup="getList"
      />
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import AddOrEditConfigDia from "./AddOrEditConfigDia.vue";
import MultiAdjustDialog from "./MultiAdjustDialog.vue";
import { filterLabel } from "@/utils/index";
import { getBlackGroupList,getBlackList,deleteBlackSingle,deleteBlackMulti } from "@/api/risk/config/index";

import { getCurrentInstance, onMounted } from "vue";

const { proxy } = getCurrentInstance();
const { sys_risk_blacklist_type } = proxy.useDict("sys_risk_blacklist_type");
const queryRef = ref(null);
const queryParams = ref({
  type:null, // 黑名单类型
  value:null, //值
  groupId:null, //黑名单群组
  pageNum: 1,
  pageSize: 10,
});
const blackGroupList = ref([]); //黑名单群组列表
const tableData = ref([]);
const total = ref(0);
const type = ref(null);
const open = ref(false); //新增和编辑弹窗
const id = ref(null);
const openAdjust = ref(false); //新增和编辑弹窗
const selectedIds = ref([]); //表格选中项
const multiOperate = ref(null);
const multiOperateList = ref([
  {
    label: i18n.global.t("risk.multipleDelete"),
    value: "0",
  },
  {
    label: i18n.global.t("risk.multipleAdjust"),
    value: "1",
  },
]); //执行批量操作选项，'0'为批量删除，'1'为批量调整

onMounted(async ()=>{
  await qeuryBlackGroupList()
  await getList();
})
function qeuryBlackGroupList(){
  return getBlackGroupList({}).then(res=>{
    blackGroupList.value = res || [];
  })
}
function getList() {
  return getBlackList(queryParams.value).then(res=>{
    tableData.value = res.records || [];
    total.value = res.total || 0;
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
  type.value = "edit";
  open.value = true;
  id.value = row.id;
}
function delLevel(row) {
  proxy.$modal
    .confirms(i18n.global.t("risk.sureToDelete"), i18n.global.t("risk.tips"))
    .then(() => {
        deleteBlackSingle(row.id).then(res=>{
        getList();
        proxy.$modal.msgSuccess(i18n.global.t("risk.deleteSuccessfully"));
      })
    })
    .catch(() => {});
}
function multipleOperate() {
  if (multiOperate.value === "0") {
    proxy.$modal
      .confirms(i18n.global.t("risk.sureToDelete"), i18n.global.t("risk.tips"))
      .then(() => {
        deleteBlackMulti(selectedIds.value).then(res=>{
          getList();
          proxy.$modal.msgSuccess(i18n.global.t("risk.deleteSuccessfully"));
        })
      })
      .catch(() => {});
  } else if (multiOperate.value === "1") {
    openAdjust.value = true;
  }
}
function handleSelectionChange(selection) {
  selectedIds.value = selection.map((item) => item.id);
}
</script>

<style lang="scss" scoped>
.black-list-config {
  .add-btn {
    background: #f59a23;
    color: #fff;
  }
}
</style>
