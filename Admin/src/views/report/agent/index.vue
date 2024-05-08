<template>
  <div class="proxy-win-lose app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-form-item :label="$t('report.timeRange')" class="full-width">
            <el-date-picker
                v-model="dateRange"
                value-format="YYYY-MM-DD HH:mm:ss"
                type="datetimerange"
                range-separator="-"
                :clearable="false"
                :editable="false"
                @change="handleChange"
                class="full-width"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item class="full-width">
            <el-select
                v-model="req"
                class="full-width"
            >
              <el-option
                  v-for="item in reqList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item prop="userName" class="full-width">
            <el-input
                v-model="queryParams.userName"
                :placeholder="$t('member.pleaseInput')"
                clearable
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item class="full-width">
            <el-button
                type="primary"
                icon="Search"
                @click="handleQuery"
            >{{ $t('member.search') }}
            </el-button
            >
            <el-button icon="Refresh" @click="reset">{{ $t('member.reset') }}</el-button>
            <el-button
                icon="download"
                @click="handleExport"
                class="exoport-btn"
            >{{ $t('member.export') }}
            </el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="tableData" :empty-text="$t('member.noData')">
      <el-table-column :label="$t('report.parentNameNoQuote')" align="center" width="115">
        <template #default="{ row }">
          <span v-if="!row.dateTimeStr">{{ $t('report.sum') }}</span>
          <span @click="goBetOrderDetail(row)" class="pointer" v-else>{{ row.dateTimeStr }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('report.registerNumber')" align="center" width="115">
        <template #default="{ row }">
          <span>{{ row.regCount || row.regCount === 0 ? row.regCount : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('report.firstDepCount')" align="center" width="115">
        <template #default="{ row }">
          <span>{{ row.firstDepCount || row.firstDepCount === 0 ? row.firstDepCount : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('report.depositAmount')" align="center" width="115">
        <template #default="{ row }">
          <span>{{ formatNumber(row.rechargeAmount) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('report.depositCount')" align="center" width="115">
        <template #default="{ row }">
          <span>{{ row.rechargeCount || row.rechargeCount === 0 ? row.rechargeCount : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('report.withdrawlAmount')" align="center" width="115">
        <template #default="{ row }">
          <span>{{ formatNumber(row.withdrawAmount) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('report.withdrawlCount')" align="center" width="115">
        <template #default="{ row }">
          <span>{{ row.withdrawCount || row.withdrawCount === 0 ? row.withdrawCount : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('report.gamesCount')" align="center" width="115">
        <template #default="{ row }">
          <span>{{ row.withdrawCount || row.withdrawCount === 0 ? row.withdrawCount : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('report.betamount')" align="center" width="115">
        <template #default="{ row }">
          <span>{{ formatNumber(row.downInjectAmount) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('report.betNumberAmount')" align="center" width="115">
        <template #default="{ row }">
          <span>{{ formatNumber(row.betAmount) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('report.payoutAmount')" align="center" width="115">
        <template #default="{ row }">
          <span>{{ formatNumber(row.settleAmount) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('report.platformWinPaper')" align="center" width="115">
        <template #default="{ row }">
          <span>{{ formatNumber(row.platformWin) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('report.companyPlatformSiphon')" align="center" width="115">
        <template #default="{ row }">
          <span>{{ formatNumber(row.platformBrokerage) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('report.bonusAmount')" align="center" width="115">
        <template #default="{ row }">
          <span>{{ formatNumber(row.bonusAmount) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('report.rebateAmount')" align="center" width="115">
        <template #default="{ row }">
          <span>{{ formatNumber(row.rebateAmount) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('report.fundsAdjustPlusCoin')" align="center" width="115">
        <template #default="{ row }">
          <span>{{ formatNumber(row.fundsPlus) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('report.fundsAdjustReduceCoin')" align="center" width="115">
        <template #default="{ row }">
          <span>{{ formatNumber(row.fundsReduce) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('report.validBetAmountNoYuan')" align="center" width="115">
        <template #default="{ row }">
          <span>{{ formatNumber(row.validBetAmount) }}</span>
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
import i18n from "@/i18n";
import {getProxyWinOrLose} from "@/api/report/proxy/index";
import {onMounted, ref} from "vue";
import {formatNumber} from "@/utils/index";
import {useRouter} from "vue-router";

const {proxy} = getCurrentInstance();
const router = useRouter();
const queryRef = ref(null);
const queryParams = ref({
  timeBegin: getMonthStartDateAndNow('start'),
  timeEnd: getMonthStartDateAndNow('end'),
  userName: null,
  pageNum: 1,
  pageSize: 10
});
const dateRange = ref(getMonthStartDateAndNow());
const req = ref(0);
const reqList = ref([
  { label: i18n.global.t("report.superiorProxy"), value: 0 },
  { label: i18n.global.t("report.subordinateProxy"), value: 1 },
  { label: i18n.global.t("report.allSubordinate"), value: 2 },
]);
const tableData = ref([]);
const total = ref(0);

onMounted(() => {
  getList();
})

function getList() {
  getProxyWinOrLose(queryParams.value).then(res => {
    tableData.value = res.list || [];
    total.value = res.total || 0;
    if (res && res.list.length) {
      tableData.value.push(res.sumTotal)
    }
  })
}

function handleChange() {
  if ((dateRange.value && !dateRange.value.length) || dateRange.value == null) {
    queryParams.value.timeBegin = null;
    queryParams.value.timeEnd = null;
  } else {
    queryParams.value.timeBegin = dateRange.value[0];
    queryParams.value.timeEnd = dateRange.value[1];
  }
}

function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}

function reset() {
  queryRef.value.resetFields();
  dateRange.value = getMonthStartDateAndNow();
  handleChange();
  req.value = 0;
  handleQuery();
}

const handleExport = () => {
  // proxy.download(
  //   "system/user/export",
  //   {
  //     ...queryParams.value,
  //   },
  //   `玩家限制_${new Date().toLocaleDateString()}.xlsx`
  // );
};

function goBetOrderDetail(row) {
  router.push({
    path: "/report-management/agent/" + row.dateTimeStr,
    query: {
      userName: row.userName
    }
  })
}

function getMonthStartDateAndNow(type) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // 月份从0开始，需要加1
  const day = now.getDate(); // 今天

  // 今天0时0分0秒的时间
  const monthStartDate = new Date(`${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T00:00:00`);

  // 今天现在的时间
  const nowDate = new Date();
  if (type === 'start') {
    return formatDate(monthStartDate)
  }
  if (type === 'end') {
    return formatDate(nowDate)
  }
  return [formatDate(monthStartDate), formatDate(nowDate)]
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
</script>

<style lang="scss" scoped>
.proxy-win-lose {
  .el-col {
    &:nth-child(2) {
      margin-right: -20px;
    }
  }
  :deep(.el-table) {
    tr {
      &:nth-last-child(1) {
        background-color: #f5f7fa;
      }
    }
  }
  :deep(.el-pagination) {
    right: 20px;
  }
}
</style>