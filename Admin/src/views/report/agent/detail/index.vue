<template>
  <div class="proxy-win-lose-detail app-container">
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
          <span v-else>{{
              row.userName
            }}</span>
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
          :label="$t('report.depositAmount')"
          align="center"
          width="115"
      >
        <template #default="{ row }">
          <span>{{ formatNumber(row.rechargeAmount) }}</span>
        </template>
      </el-table-column>
      <el-table-column
          :label="$t('report.lastDpTime')"
          align="center"
          width="115"
      >
        <template #default="{ row }">
          <span>{{ formatNumber(row.lastDpTime) }}</span>
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
          :label="$t('report.gamesCount')"
          align="center"
          width="115"
      >
        <template #default="{ row }">
          <span>{{ formatNumber(row.gamesCount) }}</span>
        </template>
      </el-table-column>
      <el-table-column
          :label="$t('report.lastLoginTime')"
          align="center"
          width="115"
      >
        <template #default="{ row }">
          <span>{{ formatNumber(row.lastLoginTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column
          :label="$t('report.betamount')"
          align="center"
          width="115"
      >
        <template #default="{ row }">
          <span>{{ formatNumber(row.downInjectAmount) }}</span>
        </template>
      </el-table-column>
      <el-table-column
          :label="$t('report.betNumberAmount')"
          align="center"
          width="115"
      >
        <template #default="{ row }">
          <span>{{ formatNumber(row.betAmount) }}</span>
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

<script setup>
import { getProxyWinOrLoseDetails } from "@/api/report/proxy/index";
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

onMounted(() => {
  getUserNameInfo();
});
function getList() {
  getProxyWinOrLoseDetails(queryParams.value).then((res) => {
    tableData.value = res.list || [];
    total.value = res.total || 0;
    if(res && res.list.length){
      tableData.value.push(res.sumTotal)
    }
  });
}
function getUserNameInfo(){
  getProxyWinOrLoseDetails(queryParamsInfo.value).then((res) => {
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
  handleQuery();
}
function handleExport() {}
</script>

<style lang="scss" scoped>
.proxy-win-lose-detail {
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