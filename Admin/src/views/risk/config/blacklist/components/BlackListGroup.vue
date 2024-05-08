<template>
  <div class="black-list-group">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-form-item :label="$t('risk.blackGroup')" prop="groupName" class="full-width">
            <el-input v-model="queryParams.groupName" :placeholder="$t('risk.pleaseInput')" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item class="full-width">
            <el-button type="primary" icon="Search" @click="handleQuery">{{ $t('risk.search') }}</el-button>
            <el-button icon="Refresh" @click="resetQuery">{{ $t('risk.reset') }}</el-button>
            <el-button icon="Plus" @click="addLevel" class="add-btn">{{ $t('risk.add') }}</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-table :data="tableData">
      <el-table-column :label="$t('risk.handle')" align="center" width="180">
        <template #default="{ row }">
          <el-button @click="editLevel(row)" type="primary" size="small"
            >{{ $t('risk.edit') }}</el-button
          >
          <el-button @click="delLevel(row)" type="danger" size="small"
            >{{ $t('risk.delete') }}</el-button
          >
        </template>
      </el-table-column>
      <el-table-column :label="$t('risk.blackGroupNoQuote')" prop="groupName" align="center">
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
    <!-- <AddOrEditGroupDia 
      v-model:open="open" 
      :type="type" 
      :id="id"
      v-if="open" 
      /> -->
      <AddOrEditBlackGroupDia 
      v-model:open="open" 
      :type="type" 
      :id="id"
      @onrefresh="getList"
      v-if="open" 
      />
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import AddOrEditBlackGroupDia from "./AddOrEditBlackGroupDia.vue";
import { getBlackGroupListTable,deleteBlackGroup } from "@/api/risk/config/index";

const { proxy } = getCurrentInstance();
const queryRef = ref(null);
const queryParams = ref({
  groupName:null, //黑名单群组
  pageNum:1,
  pageSize:10
});
const tableData = ref([]);
const total = ref(0);
const type = ref(null);
const open = ref(false);
const id = ref(null);

getList()
function getList(){
  getBlackGroupListTable(queryParams.value).then(res=>{
    tableData.value = res.rows || [];
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
  open.value = true;
  type.value = "add";
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
      deleteBlackGroup(row.id).then(res=>{
        proxy.$modal.msgSuccess(i18n.global.t("risk.deleteSuccessfully"));
        getList();
      })
    })
    .catch(() => {});
}
</script>

<style lang="scss" scoped>
.black-list-group{
  .add-btn {
    background: #f59a23;
    color: #fff;
  }
}
</style>