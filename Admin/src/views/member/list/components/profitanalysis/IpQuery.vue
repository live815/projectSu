<template>
  <div class="profit-ip-qeury">
    <h3 class="h3-title">{{ $t('member.sameIpQuery') }}</h3>
    <el-table :data="tableDataDeviceQuery">
      <el-table-column :label="$t('member.IPAddressTimesPercent')">
        <template #default="{ row }">
          <span class="mr-8" @click="checkIpInfo(row)" style="cursor: pointer">
            {{ row.ip }}({{ row.loginTimes }} /
            <span v-if="row.percent||row.percent ===0">{{ (row.percent * 100).toFixed(2) }}%</span>
            <span v-else>-</span>
             )
          </span>
          <span>{{ $t("member.totalNumber", { num: row.users }) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.IPArea')">
        <template #default="{ row }">
          <span>{{ row.address || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.lastTimeLoginTime')">
        <template #default="{ row }">
          <span>{{ row.lastLogin || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.recentlyThreeMonth')">
        <template #default="{ row }">
          <span>{{ row.loginTimes || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.handle')" width="90">
        <template #default="{ row }">
          <!-- <el-button type="primary" size="small" @click="queryIp">查看</el-button> -->
          <span @click="checkIpInfo(row)" style="cursor:pointer;color: #ff0000; font-size: 12px"
            >{{ $t('member.check') }}</span
          >
        </template>
      </el-table-column>
    </el-table>
    <h3 class="h3-title">{{ $t('member.sameIpInfo') }}</h3>
    <el-table
      :data="tableData"
      :empty-text="$t('member.noData')"
      class="device-ip-table"
      max-height="300"
      @filter-change="handleFilterChange"
    >
      <el-table-column
        :label="$t('member.userNameNoQuote')"
        prop="userName"
        align="center"
      ></el-table-column>
      <el-table-column
        :label="$t('member.agentNameNoQuote')"
        prop="parentName"
        align="center"
      >
        <template #default="{ row }">
          <span>{{ row.parentName || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.memberLabel')"
        prop="memberTag"
        class-name="filter-icon"
        column-key="statusList"
        :filters="memberTagList"
        width="100"
        align="center"
      >
        <template #default="{ row }">
          <span>{{ row.memberTag ? row.memberTag : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.accountStatus')"
        prop="status"
        width="100"
        align="center"
        class-name="filter-icon"
        column-key="statusList"
        :filters="[
          { text: $t('member.regular'), value: '0' },
          { text: $t('member.loginLock'), value: '1' },
          { text: $t('member.rechargeWithdrawLock'), value: '2' },
          { text: $t('member.abandonWithdrawLock'), value: '3' },
          { text: $t('member.offerLock'), value: '4' },
          { text: $t('member.rebateLock'), value: '5' },
          { text: $t('member.gameLock'), value: '6' },
        ]"
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
        :label="$t('member.isBindingPhoneNumber')"
        prop=""
        width="120"
        align="center"
      ></el-table-column>
      <el-table-column
        :label="$t('member.registerTimeNoQuote')"
        sortable
        prop="regTime"
        width="160"
        align="center"
      >
        <template #default="{ row }">
          <span>{{ row.regTime || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.lastLoginTimeNoQuote')"
        sortable
        prop="lastLoginTime"
        width="160"
        align="center"
      >
        <template #default="{ row }">
          <span>{{ row.lastLoginTime || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.recentlyThreeMonth')"
        prop=""
        width="140"
        align="center"
      ></el-table-column>
      <el-table-column
        :label="$t('member.rechargeAmount')"
        prop="depositAmt"
        align="center"
      >
        <template #default="{ row }">
          <span>{{ formatNumber(row.depositAmt) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.withdrawAmountNoQuote')"
        prop="withdrawAmt"
        align="center"
      >
        <template #default="{ row }">
          <span>{{ formatNumber(row.withdrawAmt) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.balanceLeftMoneyL')"
        prop=""
        align="center"
      >
        <template #default="{ row }">
          <span>{{ formatNumber(row.balance) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.companyWinLosses')"
        prop="platformWin"
        align="center"
      >
        <template #default="{ row }">
          <span>{{ formatNumber(row.platformWin) }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="queryParamsIp.pageNum"
      v-model:limit="queryParamsIp.pageSize"
      @pagination="goDetail"
    />
  </div>
</template>

<script setup>
import { formatDataPercent } from "@/utils";
import { formatNumber } from "@/utils";
import {
  getUserSameIp,
  getLoginUserByIp,
} from "@/api/member/profitanalysis/index";
import { getLabelSelect } from "@/api/member/list/index";
import { statusSwitchToLabel, colorSwitch } from "../../common/common";

const props = defineProps(["activeName", "activeProfitInfo", "userName"]);

const queryParams = ref({
  userName: null,
});
const queryParamsIp = ref({
  ip: null,
  pageNum: 1,
  pageSize: 10,
});
const tableDataDeviceQuery = ref([
  // {
  //   addr:'103.141.202.162',
  //   deviceNo:'Android-593bbe8d8ac78fb2543c1a7c73050f65',
  //   loginTimes:6,
  //   percent:60,
  //   total:9
  // }
]);
const tableData = ref([]);
const total = ref(0);
const memberTagList = ref([]);
const filterCondition = ref({}); //表格筛选字段全局保存
const globalIp = ref(null);

function getList() {
  getUserSameIp(queryParams.value).then((res) => {
    tableDataDeviceQuery.value = res;
  });
}
function checkIpInfo(row){
  globalIp.value = row.ip;
  queryParamsIp.value.pageNum = 1;
  queryParamsIp.value.ip = globalIp.value;
  goDetail();
}
function goDetail() {
  getLoginUserByIp({
    ...queryParamsIp.value,
    ...filterCondition.value,
  }).then((res) => {
    tableData.value = res.rows || [];
    total.value = res.total;
  });
}
function queryMemberTag() {
  return getLabelSelect().then((res) => {
    memberTagList.value = res || [];
    memberTagList.value.forEach((item) => {
      item.text = item.labelName;
      item.value = item.id;
    });
  });
}
function handleFilterChange(val) {
  for (const key in val) {
    if (val.hasOwnProperty(key)) {
      filterCondition.value[key] = val[key];
    }
  }
  goDetail();
}

watch(
  [() => props.activeName, () => props.activeProfitInfo, () => props.userName],
  () => {
    queryParams.value.userName = props.userName;
    if (
      props.activeName === "4" &&
      props.activeProfitInfo === "2" &&
      props.userName
    ) {
      getList();
      queryMemberTag();
    }
  }
);
</script>

<style lang="scss" scoped>
.profit-ip-qeury {
  .h3-title {
    font-size: 16px;
    font-weight: 600;
  }
  .device-ip-table {
    :deep() {
      .filter-icon .el-icon svg {
        display: none;
      }
      .filter-icon .el-icon {
        content: url("@/assets/icons/svg/filter.svg") !important;
      }
    }
  }
}
</style>
