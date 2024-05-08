<template>
  <div class="member-info-check-list">
    <!-- 流水已稽核列表 -->
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-form-item
            :label="$t('member.turnoverType')"
            prop="lsType"
            class="full-width"
            clearable
          >
            <el-select
              v-model="queryParams.lsType"
              :placeholder="$t('member.pleaseSelect')"
              clearable
              class="full-width"
            >
              <el-option
                v-for="dict in lsTypeList"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item
            :label="$t('member.turnoverZeroStatus')"
            prop="manualZeroStatus"
            class="full-width"
            clearable
          >
            <el-select
              v-model="queryParams.manualZeroStatus"
              :placeholder="$t('member.pleaseSelect')"
              clearable
              class="full-width"
            >
              <el-option
                v-for="dict in manualZeroStatusList"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="full-width">
            <el-button type="primary" icon="Search" @click="handleQuery"
              >{{ $t('member.search') }}</el-button
            >
            <el-button icon="Refresh" @click="resetQuery">{{ $t('member.reset') }}</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="tableData" :empty-text="$t('member.noData')">
      <el-table-column :label="$t('member.serialNumber')" width="55" type="index" align="center">
        <template #default="scope">
          <span>{{
            (queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.relationOrderNo')"
        prop="orderNo"
        align="center"
        width="190"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        :label="$t('member.userNameNoQuote')"
        prop="userName"
        align="center"
        width="190"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        :label="$t('member.turnoverTypeNoQuote')"
        prop="lsTypeName"
        align="center"
        width="100"
        :show-overflow-tooltip="false"
      >
      </el-table-column>
      <el-table-column
        :label="$t('member.activityName')"
        align="center"
        :show-overflow-tooltip="false"
        width="100"
      >
        <template #default="{ row }">
          <span>{{ row.activityName?row.activityName:"-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.changeAmtStartNoQuote')"
        prop="amount"
        align="center"
        :show-overflow-tooltip="false"
      >
        <template #default="{ row }">
          <span>{{
            formatNumber(row.amount) 
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.turnoverMultipleNoQuote')"
        prop="multiple"
        align="center"
        :show-overflow-tooltip="false"
      >
      <template #default="{ row }">
          <span>{{
            !isNaN(row.multiple) ? row.multiple : "-"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.betRequest')"
        prop="betRequest"
        align="center"
        width="110"
        :show-overflow-tooltip="false"
      >
        <template #default="{ row }">
          <span>{{
            formatNumber(row.betRequest) 
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.betFinished')"
        prop="betFinished"
        align="center"
        width="100"
        :show-overflow-tooltip="false"
      >
        <template #default="{ row }">
          <span>{{
            formatNumber(row.betFinished)
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.betUnfinished')"
        prop="betUnfinished"
        align="center"
        width="110"
        :show-overflow-tooltip="false"
      >
        <template #default="{ row }">
          <span>{{
            formatNumber(row.betUnfinished)
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.auditStartTime')"
        align="center"
        width="220"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ row.auditStartTime ? row.auditStartTime : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
      :label="$t('member.auditStatus')"
        align="center"
        width="100"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span v-if="row.auditStatus==='0'">{{ $t('member.auditReject') }}</span>
          <span v-else-if="row.auditStatus==='1'">{{ $t('member.auditPass') }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
      :label="$t('member.withdrawTime')"
        align="center"
        width="220"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ row.withdrawTime ? row.withdrawTime : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
      :label="$t('member.turnoverZeroStatusNoQuote')"
        align="center"
        width="110"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span v-if="row.manualZeroStatus==='0'">{{ $t('member.unClearZero') }}</span>
          <span v-else-if="row.manualZeroStatus==='0'">{{ $t('member.clearZero') }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
      :label="$t('member.clearZeroTime')"
        align="center"
        width="220"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ row.manualZeroTime ? row.manualZeroTime : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
      :label="$t('member.remarkNoQuote')"
        align="center"
        width="220"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ row.remark ? row.remark : "-" }}</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-row class="total-table-row">
      <el-col :span="24" class="total-table">
        <span>总流水统计</span>
        <span>
          <span class="mr-8">共需完成流水:</span>
          <span class="mr-16">{{ totalBetRequest }}</span>
          <span class="mr-8">已完成流水:</span>
          <span class="mr-16">{{ totalBetFinished }}</span>
          <span class="mr-8">还需完成流水:</span>
          <span>{{ totalBetFinished>=totalBetRequest?0:totalBetRequest-totalBetFinished }}</span>
        </span>
        <span>{{ auditStatus==='0'?"稽核不通过":auditStatus==='1'?"稽核通过":"未知" }}</span>
      </el-col>
    </el-row> -->
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
import { watch } from 'vue';
import { formatNumber } from "@/utils/index";
import { getHistoryList } from "@/api/member/runningdetail/index";

const props = defineProps(["activeName", "activeRunning", "userName"]);

const queryRef = ref(null);
const queryParams = ref({
  userName: null, //会员账号
  lsType: null, //流水类型
  manualZeroStatus:null, //流水清零状态
  pageNum: 1,
  pageSize: 10,
});
const lsTypeList = ref([
  {
    label: i18n.global.t("member.rechargeTurnover"),
    value: '1',
  },
  {
    label: i18n.global.t("member.manualTurnover"),
    value: '2',
  },
  {
    label: i18n.global.t("member.activityProfitsTurnover"),
    value: '3',
  },
  {
    label: i18n.global.t("member.manualAddProfitTurnover"),
    value: '4',
  },
  {
    label: i18n.global.t("member.everydayTurnBackTurnover"),
    value: '5',
  },
  {
    label: i18n.global.t("member.manualTurnBackTurnover"),
    value: '6',
  },
  {
    label: i18n.global.t("member.otherAdjustTurnover"),
    value: '7',
  },
  // {
  //   label: "人工添加流水",
  //   value: '8',
  // },
]);
const manualZeroStatusList = ref([
  {
    label:i18n.global.t("member.unClearZero"),
    value:"0"
  },
  {
    label:i18n.global.t("member.clearZero"),
    value:"1"
  }
])

const tableData = ref([]);
const total = ref(0);
const totalBetRequest = ref(0); //需要完成总流水
const totalBetFinished = ref(0); //已完成流水
const auditStatus = ref(null); //最终稽核状态

function getList() {
  console.log("流水已稽核列表", props.userName);
  getHistoryList(queryParams.value)
    .then((res) => {
      tableData.value = res.rows || [];
      total.value = res.total;
      totalBetRequest.value = res.totalBetRequest||0
      totalBetFinished.value = res.totalBetFinished||0
      auditStatus.value = res?.auditStatus
    })
}
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}
function resetQuery() {
  queryRef.value.resetFields();
}

watch(
  [() => props.activeName, () => props.activeRunning,() => props.userName],
  () => {
    queryParams.value.userName = props.userName
    if (
      props.activeName === "9" &&
      props.activeRunning === "2" &&
      props.userName
    ) {
      getList();
    }
  }
);
</script>

<style lang="scss" scoped>
.member-info-check-list {
  .total-table-row{
    border-bottom:1px solid #eee;
    padding:16px 0;
    .total-table{
      display: flex;
      justify-content: space-between;
      font-size:14px;
      // padding-left:16px;
      .num{
        position:absolute;
        left:760px
      }
    }
  }
}
</style>
