<template>
  <div class="risk-record-ip-index" v-loading="loading">
    <el-form :model="queryParams" ref="queryRef" :inline="true" :rules="rules">
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item :label="$t('member.registerTime')" class="full-width">
            <el-date-picker
              v-model="dateRange"
              value-format="YYYY-MM-DD HH:mm:ss"
              type="datetimerange"
              range-separator="-"
              :start-placeholder="$t('member.beginTime')"
              :end-placeholder="$t('member.endTime')"
              @change="handleChange"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('member.userName')" prop="userName" class="full-width">
            <el-input
              v-model="queryParams.userName"
              :placeholder="$t('risk.pleaseInput')"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('risk.IPAddress')" prop="ip" class="full-width">
            <el-input
              v-model="queryParams.ip"
              :placeholder="$t('risk.pleaseInput')"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item class="full-width">
            <el-button type="primary" icon="Search" @click="handleQuery"
              >{{ $t('risk.search') }}</el-button
            >
            <el-button icon="Refresh" @click="resetQuery">{{ $t('risk.reset') }}</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 表格数据 -->
    <el-table :data="tableData" :empty-text="$t('member.noData')">
      <!-- <el-table-column label="序号" width="55" type="index" align="center">
        <template #default="scope">
          <span>{{
            (queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1
          }}</span>
        </template>
      </el-table-column> -->
      <el-table-column
        :label="$t('member.userNameNoQuote')"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ row.userName ? row.userName : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.realNameNoQuote')"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ row.bankholder ? row.bankholder : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.agentNameNoQuote')"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ row.parentName || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.accountStatus')"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <div
            v-if="row.status"
            style="display: flex; flex-wrap: wrap; justify-content: center"
          >
            <el-tag
              v-for="item in row.status.split(',')"
              :type="colorSwitch(item)"
              style="margin-right: 4px; margin-bottom: 4px"
            >
              {{ statusSwitchToLabel(item) }}
            </el-tag>
          </div>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.remarkNoQuote')"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ row.remark ? row.remark : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.memberLabel')"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="openDia(row)">{{
            $t("member.check")
          }}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('system.phoneNumber')"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ row.userName ? row.userName : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.registerTimeNoQuote')"
        sortable
        width="160"
        align="center"
      >
        <template #default="{ row }">
          <span>{{ row.regTime || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('risk.loginTotalTimes')"
        align="center"
        width="260"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ row.userName ? row.userName : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.IPAddressTimesPercent')"
        width="220"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span class="mr-8" @click="goDetail(row)" style="cursor: pointer">
            {{ row.ip }}({{ row.loginTimes }} /
            <span v-if="row.percent || row.percent === 0"
              >{{ (row.percent * 100).toFixed(2) }}%</span
            >
            <span v-else>-</span>
            )
          </span>
          <!-- <span>{{ $t("member.totalNumber", { num: row.users }) }}</span> -->
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.IPArea')"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ row.address ? row.address : "-" }}</span>
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
    <CheckLabelDialog v-model:open="open" :id="id" v-if="open" />
  </div>
</template>

<script setup name="Ip-query-record">
import i18n from "@/i18n";
import { getCurrentInstance, onMounted } from "vue";
import CheckLabelDialog from "../device/components/CheckLabelDialog.vue";
import { getLoginUserByIp } from "@/api/member/profitanalysis/index";
import {
  statusSwitchToLabel,
  colorSwitch,
} from "@/views/member/list/common/common";

const { proxy } = getCurrentInstance();
const queryRef = ref(null);
const queryParams = ref({
  userName: null, //会员账号
  ip: null, //ip地址
  beginTime: null,
  endTime: null,
  pageNum: 1,
  pageSize: 10,
});
const rules = ref({
  userName:[{required:true,message:i18n.global.t("risk.pleaseInputMemberAccount"),trigger:"blur"}],
  ip:[{required:true,message:i18n.global.t("risk.pleaseInputIPAddress"),trigger:"blur"}]
})
const dateRange = ref([]);
const tableData = ref([]);
const total = ref(0);
const loading = ref(false);
const open = ref(false);
const id = ref(null);

onMounted(async () => {
});
function getList() {
  loading.value = true;
  return getLoginUserByIp(queryParams.value)
    .then((res) => {
      loading.value = false;
      tableData.value = res.rows || [];
      total.value = res.total;
    })
    .catch(() => {
      loading.value = false;
    });
}
function handleQuery() {
  queryRef.value.validate((valid) => {
    if (valid) {
      queryParams.value.pageNum = 1;
      getList();
    } else {
      return;
    }
  });
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
function openDia(row) {
  id.value = row.id;
  open.value = true;
}
onActivated(async()=>{
  if(queryParams.value.userName && queryParams.value.ip){
    await getList();
  }
})
</script>

<style lang="scss" scoped>
.risk-record-ip-index {
  padding: 20px;
}
</style>
