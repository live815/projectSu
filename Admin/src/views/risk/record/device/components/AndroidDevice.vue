<template>
  <div class="risk-record-android-index" v-loading="loading">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="时间范围:" class="full-width">
            <el-date-picker
              v-model="dateRange"
              value-format="YYYY-MM-DD HH:mm:ss"
              type="datetimerange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              @change="handleChange"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="设备号:" prop="device" class="full-width">
            <el-input v-model="queryParams.device" placeholder="请输入" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item class="full-width">
            <el-button type="primary" icon="Search" @click="handleQuery"
              >搜索</el-button
            >
            <el-button icon="Refresh" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 表格数据 -->
    <el-table :data="tableData" style="margin-top: 20px">
      <el-table-column label="序号" width="55" type="index" align="center">
        <template #default="scope">
          <span>{{
            (queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="用户名"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ row.userName ? row.userName : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="姓名"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ row.userName ? row.userName : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="所属代理"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ row.userName ? row.userName : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="用户状态"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ row.userName ? row.userName : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="账户类型"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ row.userName ? row.userName : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="用户备注"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ row.userName ? row.userName : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="标签"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="openDia(row)">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="会员层级"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ row.userName ? row.userName : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="手机号码"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ row.userName ? row.userName : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="注册时间"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ row.userName ? row.userName : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="最后登录时间"
        align="center"
        width="260"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ row.userName ? row.userName : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="设备号(登录次数/占比)"
        width="220"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ row.userName ? row.userName : "-" }}</span>
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
    <CheckLabelDialog 
      v-model:open="open"
      :id="id"
      v-if="open"
      />
  </div>
</template>

<script setup>
import {
  getCurrentInstance,
  onMounted,
} from "vue";
import CheckLabelDialog from "./CheckLabelDialog.vue";
import { getOrderList } from "@/api/funds/record/index";
import { getVIPList } from "@/api/funds/config/index";

const { proxy } = getCurrentInstance();
const queryRef = ref(null);
const queryParams = ref({
  device:null, //设备号
  beginTime: null,
  endTime: null,
  pageNum: 1,
  pageSize: 10,
});
const dateRange = ref([]);
const tableData = ref([
  {
    id:11111,
    riskScore:56,
    spicyName:"策略一"
  }
]);
const total = ref(1);
const loading = ref(false);
const open = ref(false);
const id = ref(null);

onMounted(async ()=>{
  await getList();
})
function getList() {
  // loading.value = true;
  // return getOrderList(queryParams.value)
  //   .then((res) => {
  //     loading.value = false;
  //     tableData.value = res.rows || [];
  //     total.value = res.total;
  //   })
  //   .catch(() => {
  //     loading.value = false;
  //   });
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
.risk-record-android-index {
  padding:20px;
}
</style>
