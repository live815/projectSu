<template>
  <div class="dialog-login-action">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-row :gutter="10">
        <el-col :span="10">
          <el-form-item :label="$t('risk.loginTime')" class="full-width">
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
        <el-col :span="4">
          <el-form-item label="IP:" prop="loginIp" class="full-width">
            <el-input
              v-model="queryParams.loginIp"
              :placeholder="$t('risk.pleaseInput')"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item :label="$t('risk.loginDomain')" prop="loginDomain" class="full-width">
            <el-input
              v-model="queryParams.loginDomain"
              :placeholder="$t('risk.pleaseInput')"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item :label="$t('risk.deviceNo')" prop="deviceNo" class="full-width">
            <el-input
              v-model="queryParams.deviceNo"
              :placeholder="$t('risk.pleaseInput')"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('risk.operateClient')" prop="loginClient" class="full-width">
            <el-select
              v-model="queryParams.loginClient"
              :placeholder="$t('risk.pleaseSelect')"
              class="full-width"
              clearable
            >
              <el-option
                v-for="dict in operateList"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-button type="primary" icon="Search" @click="handleQuery"
            >{{ $t('risk.search') }}</el-button
          >
          <el-button icon="Refresh" @click="resetQuery">{{ $t('risk.reset') }}</el-button>
        </el-col>
      </el-row>
    </el-form>

    <el-table :data="tableData" :empty-text="$t('risk.noData')">
      <el-table-column
        :label="$t('risk.loginTimeNoQuote')"
        align="center"
        width="180"
      >
        <template #default="{ row }">
          <span>{{ row.loginTime || "-" }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column
        label="状态"
        align="center"
        :show-overflow-tooltip="true"
        width="80"
      >
        <template #default="{ row }">
          <span>
            {{ row.status === 0 ? "成功" : row.status === 1 ? "失败" : "-" }}
          </span>
        </template>
      </el-table-column> -->
      <el-table-column
        :label="$t('risk.IPAddress')"
        align="center"
        :show-overflow-tooltip="true"
        width="180"
      >
        <template #default="{ row }">
          <span>
            {{ row.loginIp || "-" }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('risk.loginArea')"
        align="center"
        :show-overflow-tooltip="true"
        width="180"
      >
        <template #default="{ row }">
          <span>{{ row.loginArea || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('risk.loginDomainNoQuote')"
        align="center"
        :show-overflow-tooltip="true"
        width="180"
      >
        <template #default="{ row }">
          <span>{{ row.loginDomain || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('risk.loginDomainNoQuote')"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ filterLabel(operateList,row.loginClient) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('risk.deviceNoNoQuote')"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ row.deviceNo || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('risk.clientModel')"
        align="center"
        :show-overflow-tooltip="true"
        width="180"
      >
        <template #default="{ row }">
          <span>{{ row.clientModel || "-" }}</span>
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
import { getLoginlogList } from "@/api/member/list/index";
import { filterLabel } from "@/utils/index";
import { defaultTime, shortcuts } from "@/utils/config";

const props = defineProps(["userName"])
const queryRef = ref(null);
const queryParams = ref({
  loginIp: null, //ip地址
  loginDomain: null, //登录网址
  userName: props.userName, //会员账号
  deviceNo: null, //设备号
  loginClient: null, //操作端
  beginTime: null,
  endTime: null,
  pageNum: 1,
  pageSize: 10,
});
const operateList = ref([
  {
    label: "PC",
    value: 1,
  },
  {
    label: "H5",
    value: 2,
  },
  {
    label: "IOS",
    value: 3,
  },
  {
    label: "Android",
    value: 4,
  },
]);
const dateRange = ref([]);
const tableData = ref([]);
const total = ref(0);

onMounted(()=>{
  getList()
})
// 选择时间
function handleChange() {
  if ((dateRange.value && !dateRange.value.length) || dateRange.value == null) {
    queryParams.value.beginTime = null;
    queryParams.value.endTime = null;
  } else {
    queryParams.value.beginTime = dateRange.value[0];
    queryParams.value.endTime = dateRange.value[1];
  }
}

function getList() {
  return getLoginlogList(queryParams.value).then(res=>{
    tableData.value = res.rows || []
    total.value = res.total || 0
  })
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
</script>

<style lang="scss" scoped>
.dialog-login-action {
}
</style>
