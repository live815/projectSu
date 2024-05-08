<template>
  <div class="member-win-lose-detail">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-form-item
            :label="$t('member.userName')"
            prop="userName"
            class="full-width"
          >
            <el-input
              v-model="queryParams.userName"
              :placeholder="$t('member.pleaseInput')"
              clearable
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item class="full-width">
            <el-button type="primary" icon="Search" @click="handleQuery">{{
              $t("member.search")
            }}</el-button>
            <el-button icon="Refresh" @click="reset">{{
              $t("member.reset")
            }}</el-button>
            <el-button
              icon="download"
              @click="handleExport"
              class="exoport-btn"
              >{{ $t("member.export") }}</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="tableData" :empty-text="$t('member.noData')">
      <el-table-column
        :label="$t('member.userNameNoQuote')"
        align="center"
        width="150"
      >
        <template #default="{ row }">
          <span v-if="row.userName === null||row.userName === ''">{{
            $t('report.sum')
          }}</span>
          <span @click="goBetOrderDetail(row)" class="pointer" v-else>{{
            row.userName
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.agentNameNoQuote')"
        align="center"
        width="115"
      >
        <template #default="{ row }">
          <span>{{ row.parentName || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.vipLevelNoQuote')"
        align="center"
        width="115"
      >
        <template #default="{ row }">
          <span>{{ row.vipLevel||row.vipLevel===0 ? row.vipLevel:"-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('report.firstDepositAmount')"
        align="center"
        width="115"
      >
        <template #default="{ row }">
          <span>{{ formatNumber(row.firstDpAmount) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('report.depositAmount')"
        align="center"
        width="115"
      >
        <template #default="{ row }">
          <span>{{ formatNumber(row.rechargeAmount) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('report.depositFee')"
        align="center"
        width="115"
      >
        <template #default="{ row }">
          <span>{{ formatNumber(row.rechargeHandlingFee) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('report.withdrawlAmount')"
        align="center"
        width="115"
      >
        <template #default="{ row }">
          <span>{{ formatNumber(row.withdrawAmount) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('report.withdrawlFee')"
        align="center"
        width="115"
      >
        <template #default="{ row }">
          <span>{{ formatNumber(row.withdrawHandlingFee) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('report.betamount')"
        align="center"
        width="115"
      >
        <template #default="{ row }">
          <span>{{ formatNumber(row.betAmount) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('report.betNumberAmount')"
        align="center"
        width="115"
      >
        <template #default="{ row }">
          <span>{{ formatNumber(row.orderAmount) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('report.payoutAmount')"
        align="center"
        width="115"
      >
        <template #default="{ row }">
          <span>{{ formatNumber(row.settleAmount) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('report.platformWinPaper')"
        align="center"
        width="115"
      >
        <template #default="{ row }">
          <span>{{ formatNumber(row.platformWin) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('report.companyPlatformSiphon')"
        align="center"
        width="115"
      >
        <template #default="{ row }">
          <span>{{ formatNumber(row.platformBrokerage) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('report.bonusAmount')"
        align="center"
        width="115"
      >
        <template #default="{ row }">
          <span>{{ formatNumber(row.bonusAmount) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('report.rebateAmount')"
        align="center"
        width="115"
      >
        <template #default="{ row }">
          <span>{{ formatNumber(row.rebateAmount) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('report.fundsAdjustPlusCoin')"
        align="center"
        width="115"
      >
        <template #default="{ row }">
          <span>{{ formatNumber(row.fundsPlus) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('report.fundsAdjustReduceCoin')"
        align="center"
        width="115"
      >
        <template #default="{ row }">
          <span>{{ formatNumber(row.fundsReduce) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('report.validBetAmountNoYuan')"
        align="center"
        width="115"
      >
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

<script setup name="memberWinLoseDetail">
import i18n from "@/i18n";
import { getMemberWinOrLoseDetails } from "@/api/report/member/index";
import { onMounted } from "vue";
import { formatNumber } from "@/utils/index";
import { useRoute, useRouter } from "vue-router";

const { proxy } = getCurrentInstance();
const route = useRoute();
const router = useRouter();
const queryRef = ref(null);
const queryParamsInfo = ref({
  timeBegin:route.params.date,
  timeEnd:route.params.date,
  userName: route.query.userName,
  pageNum: 1,
  pageSize: 10,
});
const queryParams = ref({
  timeBegin:route.params.date,
  timeEnd:route.params.date,
  userName: null,
  pageNum: 1,
  pageSize: 10,
});
const tableData = ref([]);
const total = ref(0);
const isFirstLoad = ref(true);

onMounted(async() => {
  if(isFirstLoad.value){
    await getUserNameInfo();
    isFirstLoad.value = false
  }
});
function getList() {
  return getMemberWinOrLoseDetails(queryParams.value).then((res) => {
    tableData.value = res.list || [];
    total.value = res.total || 0;
    if(res && res.list.length){
      tableData.value.push(res.sumTotal)
    }
  });
}
function getUserNameInfo(){
  return getMemberWinOrLoseDetails(queryParamsInfo.value).then((res) => {
    tableData.value = res.list || [];
    total.value = res.total || 0;
    if(res && res.list.length){
      tableData.value.push(res.sumTotal)
    }
  });
}
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}
function reset() {
  queryRef.value.resetFields();
}
// 导出
function handleExport() {
  proxy.download(
      '/system/report/member/export/memberWinOrLoseDetails',
      {
        ...queryParams.value
      },
      `${i18n.global.t('report.memberWinOrLoseDetail')}${new Date().toLocaleDateString()}.xlsx`
  )
}
function goBetOrderDetail(row){
  router.push({
    path: "/member/detail-basic/info/" + row.userName,
    query: {
      tenantId: row.tenantId,
      userId: row.userId,
    },
  });
}
onActivated(async()=>{
  if(!isFirstLoad.value){
    await getList();
  }
})
</script>

<style lang="scss" scoped>
.member-win-lose-detail {
  padding: 20px;
}
</style>
