<template>
  <div class="high-member-profits" v-loading="loading">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item :label="$t('risk.userName')" prop="userName" class="full-width">
            <el-input v-model="queryParams.userName" :placeholder="$t('risk.pleaseInput')" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
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
        <el-col :span="6">
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
        <el-col :span="6">
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
        <el-col :span="6">
          <el-form-item :label="$t('risk.playerWinOrLose')" class="full-width">
            <el-col :span="11">
              <el-form-item label="" prop="beginAmount" class="full-width">
                <el-input
                  v-model="queryParams.beginAmount"
                  :placeholder="$t('risk.pleaseInput')"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="2" style="text-align: center;">-</el-col>
            <el-col :span="11">
              <el-form-item label="" prop="endAmount" class="full-width">
                <el-input
                  v-model="queryParams.endAmount"
                  :placeholder="$t('risk.pleaseInput')"
                  clearable
                />
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="status===2">
          <el-form-item :label="$t('risk.gameType')" prop="type" class="full-width">
            <el-select
              v-model="queryParams.type"
              :placeholder="$t('risk.pleaseSelect')"
              class="full-width"
              multiple
              clearable
              collapse-tags
              collapse-tags-tooltip
            >
              <el-option
                v-for="dict in gameList"
                :key="dict.lobbyCode"
                :label="dict.lobbyName"
                :value="dict.lobbyCode"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="status===3">
          <el-form-item :label="$t('risk.lobbyType')" prop="type" class="full-width">
            <el-select
              v-model="queryParams.type"
              :placeholder="$t('risk.pleaseSelect')"
              class="full-width"
              multiple
              clearable
              collapse-tags
              collapse-tags-tooltip
            >
              <el-option
                v-for="dict in lobbyCodeList"
                :key="dict.lobbyCode"
                :label="dict.lobbyName"
                :value="dict.lobbyCode"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7" v-if="status===2||status===3">
          <el-form-item :label="$t('risk.createTime')" class="full-width">
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
        <el-col :span="5">
          <el-form-item class="full-width">
            <el-button type="primary" icon="Search" @click="handleQuery"
              >{{ $t('risk.search') }}</el-button
            >
            <el-button icon="Refresh" @click="resetQuery">{{ $t('risk.reset') }}</el-button>
            <el-button
              icon="download"
              @click="handleExport"
              class="export-btn"
              >{{ $t('risk.export') }}</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 表格数据 -->
    <el-table :data="tableData" :empty-text="$t('risk.noData')">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column :label="$t('risk.serialNumber')" width="55" type="index" align="center">
        <template #default="scope">
          <span>{{
            (queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('risk.userNameInformation')"
        align="center"
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
              <span>{{ (row.vipLevel||row.vipLevel===0) ? row.vipLevel : "-" }}</span>
            </div>
          </template>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('risk.userLevel')"
        align="center"
        :show-overflow-tooltip="true"
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
        :label="$t('risk.playerWinOrLoseNoQuote')"
        prop="winLostAmount"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ formatNumber(row.winLostAmount) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('risk.rankNumber')"
        prop="rankNumber"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ row.rankNumber||row.rankNumber===0?row.rankNumber:"-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('risk.gameTypeNoQuote')"
        prop="type"
        align="center"
        :show-overflow-tooltip="true"
        v-if="status === 2"
      >
        <template #default="{ row }">
          <span>{{ row.type?row.type:"-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('risk.lobbyTypeNoQuote')"
        align="center"
        :show-overflow-tooltip="true"
        v-if="status === 3"
      >
        <template #default="{ row }">
          <span>{{ row.type?row.type:"-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('risk.createTimeNoQuote')"
        prop="generTime"
        align="center"
        :show-overflow-tooltip="true"
        v-if="status===2||status===3"
      >
        <template #default="{ row }">
          <span>{{ row.generTime||"-" }}</span>
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
import {
  getCurrentInstance,
  onMounted,
} from "vue";
import { getHighProfitMemberList,getLobbycodeAndGameList } from "@/api/risk/review/index";
import { formatNumber } from "@/utils/index"
import { defaultTime, shortcuts } from "@/utils/config";

const props = defineProps(["vipLevelList","riskList","financalList","status"])
const { proxy } = getCurrentInstance();
const queryRef = ref(null);
const queryParams = ref({
  userName:null, //会员账号
  financeTier:null, //财务层级
  riskControlTier:null, //风控层级
  vipLevel:null, //VIP等级
  beginAmount:null, //玩家输赢最小值
  endAmount:null, //玩家输赢最大值
  type:[], //游戏类型或者场馆类型
  status:props.status,
  pageNum: 1,
  pageSize: 10,
});
const dateRange  = ref([]);
const tableData = ref([]);
const total = ref(0);
const loading = ref(false);
const lobbyCodeList = ref([]);
const gameList = ref([]);

onMounted(async ()=>{
  await getList();
  props.status === 2 && await queryGameList();
  props.status === 3 && await queryLobbycodeList();
})
function queryGameList(){
  return getLobbycodeAndGameList(1).then(res=>{
    gameList.value = res || []
  })
}
function queryLobbycodeList(){
  return getLobbycodeAndGameList(2).then(res=>{
    lobbyCodeList.value = res || []
  })
}
function getList() {
  loading.value = true;
  return getHighProfitMemberList(queryParams.value)
    .then((res) => {
      loading.value = false;
      tableData.value = res.rows || [] ;
      total.value = res.total || 0;
    })
    .catch(() => {
      loading.value = false;
    });
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
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}
function resetQuery() {
  queryRef.value.resetFields();
  dateRange.value = [];
  handleChange();
}
function handleExport() {
  proxy.download(
    "/system/risk/highProfitStatic/listExcel",
    {
      ...queryParams.value,
    },
  `${i18n.global.t("risk.highMemberProfits")}_${new Date().toLocaleString()}.xlsx`
  );
}
</script>

<style lang="scss" scoped>
.high-member-profits {
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
