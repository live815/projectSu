<!-- 黑名单 -->
<template>
  <div class="black-manage-withdraw-deposit">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('funds.reharge')" name="1">
      </el-tab-pane>
      <el-tab-pane :label="$t('funds.withdraw')" name="2">
      </el-tab-pane>
    </el-tabs>

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
        <el-col :span="4">
          <el-form-item :label="$t('funds.lastUpdateBy')" prop="updateBy" class="full-width">
            <el-input
              v-model="queryParams.updateBy"
              :placeholder="$t('funds.pleaseInput')"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('funds.lastUpdateTime')" class="full-width">
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
        <el-col :span="8">
          <el-form-item class="full-width">
            <el-button type="primary" icon="Search" @click="handleQuery"
              >{{ $t('funds.search') }}</el-button
            >
            <el-button icon="Refresh" @click="resetQuery">{{ $t('funds.reset') }}</el-button>
            <el-button icon="Plus" @click="add" class="btn-d97000"
              >{{ $t('funds.add') }}</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-table :data="tableData" :empty-text="$t('member.noData')" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column :label="$t('funds.serialNumber')" width="55" type="index" align="center">
        <template #default="scope">
          <span>{{
            (queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1
          }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('funds.userNameNoQuote')" prop="userName" align="center">
        <template #default="{ row }">
          <span>{{ row.userName ? row.userName : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('funds.statusC2C')" prop="status" align="center">
        <template #default="{ row }">
          <el-tag type="success" v-if="row.status === '0'">{{ $t('funds.starting') }}</el-tag>
          <el-tag type="danger" v-else-if="row.status === '1'">{{ $t('funds.disabled') }}</el-tag>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('funds.remark')" prop="remark" align="center">
        <template #default="{ row }">
          <span>{{ row.remark ? row.remark : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('funds.lastUpdateByNoQuote')" prop="updateBy" align="center">
        <template #default="{ row }">
          <span>{{ row.updateBy ? row.updateBy : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('funds.lastUpdateTimeNoQuote')" prop="updateTime" align="center">
        <template #default="{ row }">
          <span>{{ row.updateTime ? row.updateTime : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('funds.handle')" align="center" width="180">
        <template #default="{ row }">
          <el-button @click="changeStatus(row)" class="btn-start" size="small"
            v-if="row.status==='1'">{{ $t('funds.start') }}</el-button
          >
          <el-button @click="changeStatus(row)" class="btn-close" size="small"
            v-else>{{ $t('funds.close') }}</el-button
          >
          <el-button @click="Del(row)" class="btn-f58f23" size="small"
            > {{ $t('funds.delete') }} </el-button
          >
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
    <AddDialog 
      v-model:open="open" 
      :type="type"
      :blackType="activeName"
      v-if="open"
      @onrefresh="getList"
         />
  </div>
</template>

<script setup name="Recharge-black">
import i18n from "@/i18n";
import AddDialog from "./components/AddDialog.vue";
import { getBlackList ,delBlackList,updateBlackList } from "@/api/funds/c2c/index";
import { getCurrentInstance } from "vue";
import { defaultTime,shortcuts } from "@/utils/config";

const { proxy } = getCurrentInstance();
const activeName = ref("1");
const queryRef = ref(null);
const queryParams = ref({
  userName: null,
  updateBy: null,
  startTime: null,
  endTime: null,
  pageNum: 1,
  pageSize: 10,
});
const dateRange = ref([]);
const tableData = ref([]);
const total = ref(0);
const type = ref(null);
const open = ref(false);

onMounted(()=>{
  getList();
})
function getList() {
  return getBlackList({
    ...queryParams.value,
    blackType:activeName.value
  }).then(res=>{
    tableData.value = res.rows || []
    total.value = res.total || 0
  })
}
function handleSelectionChange(selection) {}
function handleChange() {
  if ((dateRange.value && !dateRange.value.length) || dateRange.value == null) {
    queryParams.value.startTime = null;
    queryParams.value.endTime = null;
  } else {
    queryParams.value.startTime = dateRange.value[0];
    queryParams.value.endTime = dateRange.value[1];
  }
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
function add() {
  type.value = "add";
  open.value = true;
}
function changeStatus(row){
  updateBlackList({
    id:row.id,
    status:row.status==="0"?"1":"0"
  }).then(res=>{
    proxy.$modal.msgSuccess(i18n.global.t("funds.updateStatusSuccessfully"));
    getList();
  })
}
function Del(row){
  delBlackList(row.id).then(res=>{
    proxy.$modal.msgSuccess(i18n.global.t("funds.deleteSuccessfully"));
    getList();
  })
}

watch(activeName,()=>{
  resetQuery();
  getList();
},{})
</script>

<style lang="scss" scoped>
.black-manage-withdraw-deposit {
  padding:0 20px;
  .btn-start{
    background:rgba(1, 46, 184, 1);
    color:#FFFFFF;
  }
  .btn-close{
    background:rgba(102, 102, 101, 1);
    color:#FFFFFF;
  }
}
</style>
