<template>
  <div class="waiting-review" v-loading="loading">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item :label="$t('risk.betTime')" class="full-width">
            <el-date-picker
              v-model="dateRangeBet"
              value-format="YYYY-MM-DD HH:mm:ss"
              type="datetimerange"
              range-separator="-"
              :start-placeholder="$t('risk.beginTime')"
              :end-placeholder="$t('risk.endTime')"
              @change="handleChangeBet"
              :default-time="defaultTime"
              :shortcuts="shortcuts"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('risk.userName')" prop="userName" class="full-width">
            <el-input v-model="queryParams.userName" :placeholder="$t('risk.pleaseInput')" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('risk.financialTier')" prop="financeTier" class="full-width">
            <el-select
              v-model="queryParams.financeTier"
              :placeholder="$t('risk.pleaseSelect')"
              class="full-width"
              multiple
              clearable
              collapse-tags
              collapse-tags-tooltip
            >
              <el-option
                v-for="dict in financalList"
                :key="dict.id"
                :label="dict.layerName"
                :value="dict.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('risk.riskControlTier')" prop="riskControlTier" class="full-width">
            <el-select
              v-model="queryParams.riskControlTier"
              :placeholder="$t('risk.pleaseSelect')"
              class="full-width"
              multiple
              clearable
              collapse-tags
              collapse-tags-tooltip
            >
              <el-option
                v-for="dict in riskList"
                :key="dict.id"
                :label="dict.layerName"
                :value="dict.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('risk.vipLevel')" prop="vipLevel" class="full-width">
            <el-select
              v-model="queryParams.vipLevel"
              :placeholder="$t('risk.pleaseSelect')"
              class="full-width"
              multiple
              clearable
              collapse-tags
              collapse-tags-tooltip
            >
              <el-option
                v-for="dict in vipLevelList"
                :key="dict.vipLevel"
                :label="dict.vipName"
                :value="dict.vipLevel"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('risk.gameId')" prop="matchName" class="full-width">
            <el-input v-model="queryParams.matchName" :placeholder="$t('risk.pleaseInput')" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item class="full-width">
            <el-button type="primary" icon="Search" @click="handleQuery"
              >{{ $t("risk.search") }}</el-button
            >
            <el-button icon="Refresh" @click="resetQuery">{{ $t("risk.reset") }}</el-button>
            <el-button
              icon="download"
              @click="handleExport"
              class="export-btn"
              >{{ $t("risk.export") }}</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-row :gutter="10" style="margin-bottom: 12px">
      <el-col :span="10" class="flex-refresh">
        <div>
          <span class="refresh-title">{{ $t("risk.dataUpdateTime") }}</span>
          <span class="refresh-title">{{ updateTime?updateTime:"-" }}</span>
        </div>
      </el-col>
    </el-row>
    <!-- 表格数据 -->
    <el-table :data="tableData" style="margin-top: 20px" :empty-text="$t('risk.noData')">
      <el-table-column :label="$t('risk.serialNumber')" width="55" type="index" align="center">
        <template #default="scope">
          <span>{{
            (queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('risk.orderNo')"
        align="center"
        width="260"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <template v-if="row.orderNo || row.id">
            <div>
              <span>{{$t('risk.betNo')}}:</span>
              <span>{{ row.id ? row.id : "-" }}</span>
            </div>
            <div>
              <span>{{$t('risk.thirdPartyOrderNumber')}}:</span>
              <span>{{ row.orderNo ? row.orderNo : "-" }}</span>
            </div>
          </template>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('risk.userNameInformation')"
        align="center"
        width="180"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <template v-if="row.userName || (row.vipLevel||row.vipLevel===0)">
            <div>
            <span>{{ $t('risk.userName') }}</span>
              <span>{{ row.userName ? row.userName : "-" }}</span>
            </div>
            <div>
              <span>{{ $t('risk.vipLevel') }}</span>
              <span>{{ !isNaN(row.vipLevel) ? row.vipLevel : "-" }}</span>
            </div>
          </template>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('risk.userLevel')"
        align="center"
        :show-overflow-tooltip="true"
        width="130"
      >
        <template #default="{ row }">
          <template v-if="row.financeTierName || row.riskTierName">
            <div>
              <span>{{ $t('risk.financialTier') }}</span>
              <span>{{ row.financeTierName ? row.financeTierName : "-" }}</span>
            </div>
            <div>
              <span>{{ $t('risk.riskControlTier') }}</span>
              <span>{{ row.riskTierName ? row.riskTierName : "-" }}</span>
            </div>
          </template>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('risk.betAmount')"
        prop="orderAmount"
        align="center"
        width="110"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ formatNumber(row.orderAmount) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('risk.coinType')"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ row.currencyCode||"-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('risk.homeTeam')" align="center" width="160">
        <template #default="{row}">
          <span>{{ row.mainName||"-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('risk.awayTeam')" align="center" width="160">
        <template #default="{row}">
          <span>{{ row.cusName||"-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('risk.gameIdNoQuote')" align="center" 
      width="160">
        <template #default="{row}">
          <span>{{ row.matchName||"-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('risk.similarMember')"
        align="center"
        width="100"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span class="pointer" @click="openSimilarDia(row)">{{ row.similarCount }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('risk.betTimeNoQuote')"
        align="center"
        width="240"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ row.betTime||"-" }}</span>
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
      <SimilarBetMember 
      v-model:open="openSimilarDialog"
      :id="id"
      v-if="openSimilarDialog"
      />
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import {
  getCurrentInstance,
  onMounted,
} from "vue";
import SimilarBetMember from "./SimilarBetMember.vue";
import { formatNumber } from "@/utils/index";
import { getRiskSimilarBettingList } from "@/api/risk/review/index";
import { defaultTime, shortcuts } from "@/utils/config";

const { proxy } = getCurrentInstance();
const props = defineProps(["financalList","riskList","vipLevelList"]);
const queryRef = ref(null);
const queryParams = ref({
  userName:null, //会员账号
  financeTier:[], //财务层级
  riskControlTier:[], //风控层级
  vipLevel:[], //vip等级
  matchName:null, //赛事id
  beginTime: null,
  endTime: null,
  pageNum: 1,
  pageSize: 10,
});
const dateRange = ref([]); //生成时间集合
const dateRangeBet = ref([]); //下注时间集合
const tableData = ref([]);
const total = ref(0);
const loading = ref(false);
const id = ref(null); //相似投注会员
const openSimilarDialog = ref(false); //相似投注会员
const updateTime = ref(null);

onMounted(async ()=>{
  await getList();
})
function getList() {
  loading.value = true;
  return getRiskSimilarBettingList(queryParams.value)
    .then((res) => {
      loading.value = false;
      tableData.value = res.rows || [];
      total.value = res.total||0;
      updateTime.value = new Date().toLocaleString()
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
  dateRange.value = [];
  dateRangeBet.value = [];
  handleChange();
  handleChangeBet();
}
function handleExport() {
  // proxy.download(
  //   "/system/fund/withdrawl/order/export",
  //   {
  //     ...queryParams.value,
  //   },
  //   `${i18n.global.t("funds.financialTierCannotEmpty")}${new Date().toLocaleDateString()}.xlsx`
  // );
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
function handleChangeBet() {
  if ((dateRangeBet.value && !dateRangeBet.value.length) || dateRangeBet.value == null) {
    queryParams.value.beginBetTime = null;
    queryParams.value.endBetTime = null;
  } else {
    queryParams.value.beginBetTime = dateRangeBet.value[0];
    queryParams.value.endBetTime = dateRangeBet.value[1];
  }
}
function openSimilarDia(row){
  id.value = row.id;
  openSimilarDialog.value = true;
}
</script>

<style lang="scss" scoped>
.waiting-review {
  // padding:0 20px;
  padding-bottom: 10px;
  .flex-refresh {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .refresh-title {
    padding-right: 10px;
    min-width: 70px;
    font-size: 14px;
  }
}
</style>
