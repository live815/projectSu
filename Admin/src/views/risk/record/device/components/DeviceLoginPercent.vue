<template>
  <div class="device-login-percent" v-loading="loading">
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
          <el-form-item label="会员账号:" prop="userName" class="full-width">
            <el-input v-model="queryParams.userName" placeholder="请输入" clearable></el-input>
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
    <el-table :data="tableData" style="margin-top: 20px" :empty-text="$t('member.noData')">
      <el-table-column
        label="设备号(登录次数/占比)"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <div>Android-aadd89dde9988e99dfdfbb</div>
          <div>(1/100%)</div>
          <div>共39人</div>
        </template>
      </el-table-column>
      <el-table-column
        label="设备号(登录次数/占比)"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <div>Android-aadd89dde9988e99dfdfbb</div>
          <div>(1/100%)</div>
          <div>共39人</div>
        </template>
      </el-table-column>
      <el-table-column
        label="设备号(登录次数/占比)"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <div>Android-aadd89dde9988e99dfdfbb</div>
          <div>(1/100%)</div>
          <div>共39人</div>
        </template>
      </el-table-column>
      <el-table-column
        label="设备号(登录次数/占比)"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <div>Android-aadd89dde9988e99dfdfbb</div>
          <div>(1/100%)</div>
          <div>共39人</div>
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
  </div>
</template>

<script setup>
import {
  getCurrentInstance,
  onMounted,
} from "vue";
import { getOrderList } from "@/api/funds/record/index";
import { getVIPList } from "@/api/funds/config/index";

const { proxy } = getCurrentInstance();
const queryRef = ref(null);
const queryParams = ref({
  userName:null, //会员账号
  beginTime: null,
  endTime: null,
});
const dateRange = ref([]);
const tableData = ref([
  {
    id:11111,
    riskScore:56,
    spicyName:"策略一"
  }
]);
const loading = ref(false);

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
</script>

<style lang="scss" scoped>
.device-login-percent {
  padding:20px;
}
</style>
