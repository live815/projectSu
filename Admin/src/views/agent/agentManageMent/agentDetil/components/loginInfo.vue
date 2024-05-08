<template>
  <div class="loginInfo-container">
    <div class="header-row">
      <el-form-item :label="$t('agent.statusQuote')">
        <el-select
          v-model="requestData.status"
          class="m-2"
          :placeholder="$t('agent.pleaseSelect')"
          style="width: 120px"
        >
          <el-option
            v-for="item in agentStatus"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('agent.logInTime')">
        <el-date-picker
          v-model="loginTime"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="datetimerange"
          range-separator="-"
          :start-placeholder="$t('agent.startTime')"
          :end-placeholder="$t('agent.endTime')"
          :default-time="defaultTime"
          :shortcuts="shortcuts"
        ></el-date-picker>
      </el-form-item>
      <el-button @click="toQuery" type="primary">{{
        $t("agent.search")
      }}</el-button>
    </div>

    <!-- 表格 -->
    <el-table :data="tableData.rows">
      <el-table-column
        prop="loginTime"
        :label="$t('agent.logInTime')"
        width="180"
      />
      <el-table-column prop="status" :label="$t('agent.status')" width="90">
        <template #default="{ row }">
          <span v-if="row.status == 1">{{ $t("agent.success") }}</span>
          <span v-else style="color: red">{{ $t("agent.fail") }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="loginIp" :label="$t('agent.IpAddress')" />
      <el-table-column prop="loginArea" :label="$t('agent.IpLocation')" />
      <el-table-column
        prop="loginDomain"
        :label="$t('agent.loginUrl')"
        width="300"
      />
      <el-table-column
        prop="loginClient"
        :label="$t('agent.logInToTheTerminal')"
        width="90"
      />
      <el-table-column prop="clientModel" :label="$t('agent.loginModel')" />
      <el-table-column prop="deviceNo" :label="$t('agent.deviceNo')" />
    </el-table>
    <div class="pagination-box">
      <el-pagination
        background
        layout="total,sizes, prev, pager, next"
        :total="tableData.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<!-- 1pc 2h5 3android 4ios -->
<script setup>
import { getAgentLoginInfoApi } from "@/api/agent/agentList.js";
import { defaultTime, shortcuts } from "@/utils/config";

import i18n from "@/i18n";
const route = useRoute();
onMounted(() => {
  getTableData();
});
const getTableData = () => {
  getAgentLoginInfoApi(requestData.value).then((res) => {
    tableData.value = res;
  });
};

const toQuery = () => {
  formatTime(
    loginTime.value,
    requestData.value,
    "loginStartTime",
    "loginEndTime"
  );
  getTableData();
};

const loginTime = ref([]);
const requestData = ref({
  agentId: route.query.id,
  loginEndTime: "",
  loginStartTime: "",
  pageNum: 1,
  pageSize: 10,
  status: "", //0=成功 1=失败
});
const tableData = ref({
  row: [],
  total: 0,
});
const agentStatus = ref([
  {
    label: i18n.global.t("agent.all"),
    value: "",
  },
  {
    label: i18n.global.t("agent.success"),
    value: 1,
  },
  {
    label: i18n.global.t("agent.fail"),
    value: 0,
  },
]);
// 分页器
const handleCurrentChange = (num) => {
  requestData.value.pageNum = num;
  getTableData();
};
const handleSizeChange = (num) => {
  requestData.value.pageSize = num;
  getTableData();
};

const formatTime = (arr, obj, startKey, endKey) => {
  if (!arr || arr.length == 0) {
    obj[startKey] = "";
    obj[endKey] = "";
  } else {
    obj[startKey] = arr[0];
    obj[endKey] = arr[1];
  }
};
</script>

<style lang="scss" scoped>
.loginInfo-container {
  padding: 20px;
}

.header-row {
  display: flex;
  gap: 30px;
}

.fill {
  width: 30px;
}

.pagination-box {
  display: flex;
  justify-content: end;
  margin: 20px;
}
</style>
