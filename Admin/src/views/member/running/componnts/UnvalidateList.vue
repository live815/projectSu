<template>
  <div class="member-running-detail-unvalidate-list" v-loading="loading">
    <!-- 流水校验列表 -->
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-form-item :label="$t('member.userName')" prop="userName" class="full-width">
            <el-input
              v-model="queryParams.userName"
              :placeholder="$t('member.pleaseInput')"
              style="width: 100%"
              clearable
            >
            </el-input>
          </el-form-item>
        </el-col>
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
        <el-col :span="8">
          <el-form-item class="full-width">
            <el-button type="primary" icon="Search" @click="handleQuery"
              >{{ $t('member.search') }}</el-button
            >
            <el-button icon="Refresh" @click="resetQuery">{{ $t('member.reset') }}</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 表格数据 -->
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
        width="210"
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
        width="130"
        :show-overflow-tooltip="false"
      >
      </el-table-column>
      <el-table-column
        :label="$t('member.activityName')"
        align="center"
        :show-overflow-tooltip="false"
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
        width="100"
        :show-overflow-tooltip="false"
      >
      <template #default="{ row }">
          <span>{{
            row.multiple||row.multiple===0 ? row.multiple : "-"
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
    </el-table>
    <el-row class="total-table-row" v-if="tableData&&tableData.length!==0">
      <el-col :span="24" class="total-table">
        <span>{{ $t('member.totalTurnoverStatistics') }}</span>
        <span>
          <span class="mr-8">{{ $t('member.betRequest') }}:</span>
          <span class="mr-16">{{ formatNumber(totalBetRequest) }}</span>
          <span class="mr-8">{{ $t('member.betFinished') }}:</span>
          <span class="mr-16">{{ formatNumber(totalBetFinished) }}</span>
          <span class="mr-8">{{ $t('member.betUnfinished') }}:</span>
          <span>{{ formatNumber(totalBetUnfinished) }}</span>
        </span>
        <span>{{ auditStatus==='0'?$t('member.auditReject'):auditStatus==='1'?$t('member.auditPass'):$t('member.unknow') }}</span>
      </el-col>
    </el-row>
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
import { formatNumber } from "@/utils/index";
import { getCurrentInstance, onMounted, watch } from "vue";
import { getTransactionList } from "@/api/member/runningdetail/index";

const { proxy } = getCurrentInstance();
const queryRef = ref(null);
const queryParams = ref({
  userName: null, //会员账号
  lsType: null, //流水类型
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

const tableData = ref([]);
const total = ref(0);
const loading = ref(false);
const totalBetRequest = ref(0); //需要完成总流水
const totalBetFinished = ref(0); //已完成流水
const totalBetUnfinished = ref(0); //还需完成流水
const auditStatus = ref(null); //最终稽核状态

onMounted(async () => {
  // await getList();
});
function getList() {
  loading.value = true;
  return getTransactionList(queryParams.value)
    .then((res) => {
      loading.value = false;
      tableData.value = res.rows || [];
      total.value = res.total;
      totalBetRequest.value = res.totalBetRequest || 0
      totalBetFinished.value = res.totalBetFinished || 0
      totalBetUnfinished.value = res?.totalBetUnfinished || 0
      auditStatus.value = res?.auditStatus
    })
    .catch(() => {
      loading.value = false;
    });
}
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}
function resetQuery() {
  queryRef.value.resetFields();
}
onActivated(()=>{
  queryParams.value.userName && getList()
})
</script>

<style lang="scss" scoped>
.member-running-detail-unvalidate-list {
  .total-table-row{
    border-bottom:1px solid #eee;
    padding:16px 0;
    .total-table{
      display: flex;
      justify-content: space-between;
      font-size:14px;
      padding-left:16px;
      .num{
        position:absolute;
        left:760px
      }
    }
  }
}
</style>
