<template>
  <div class="member-info-transfer-record">
    <!-- 会员转账记录 -->

    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-row :gutter="10">
        <el-col :span="7">
          <el-form-item :label="$t('member.transferTime')" class="full-width">
            <el-date-picker
              v-model="dateRange"
              value-format="YYYY-MM-DD HH:mm:ss"
              type="datetimerange"
              range-separator="-"
              :start-placeholder="$t('member.beginTime')"
              :end-placeholder="$t('member.endTime')"
              @change="handleChange"
              :default-time="defaultTime"
              :shortcuts="shortcuts"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item
            :label="$t('member.moveOutLooby')"
            prop="outLobby"
            class="full-width"
            clearable
          >
            <el-select
              v-model="queryParams.outLobby"
              :placeholder="$t('member.pleaseSelect')"
              clearable
              class="full-width"
            >
              <el-option
                v-for="dict in outLobbyList"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('member.moveInLooby')" prop="inLobby" class="full-width">
            <el-select
              v-model="queryParams.inLobby"
              :placeholder="$t('member.pleaseSelect')"
              clearable
              class="full-width"
            >
              <el-option
                v-for="dict in inLobbyList"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item
            :label="$t('member.upAndDownStatus')"
            prop="upDownStatus"
            class="full-width"
          >
            <el-select
              v-model="queryParams.upDownStatus"
              :placeholder="$t('member.pleaseSelect')"
              clearable
              class="full-width"
            >
              <el-option
                v-for="dict in lobbyScoreList"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item
            :label="$t('member.transferStatus')"
            prop="transferStatus"
            class="full-width"
          >
            <el-select
              v-model="queryParams.transferStatus"
              :placeholder="$t('member.pleaseSelect')"
              clearable
              class="full-width"
            >
              <el-option
                v-for="dict in lobbyTransferList"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('member.tranferAmount')" class="full-width">
            <el-col :span="11">
              <el-form-item prop="minTransferAmount" class="full-width">
                <el-input
                  v-model="queryParams.minTransferAmount"
                  :placeholder="$t('member.pleaseInputMinAmount')"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <span style="display: flex; justify-content: center">-</span>
            </el-col>
            <el-col :span="11">
              <el-form-item prop="maxTransferAmount" class="full-width">
                <el-input
                  v-model="queryParams.maxTransferAmount"
                  :placeholder="$t('member.pleaseInputMaxAmount')"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item class="full-width">
            <el-button type="primary" icon="Search" @click="handleQuery"
              >{{ $t('member.search') }}</el-button
            >
            <el-button icon="Refresh" @click="resetQuery">{{ $t('member.reset') }}</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="tableData" class="transfer-record-table" :empty-text="$t('member.noData')">
      <el-table-column :label="$t('member.serialNumber')" width="55" type="index" align="center">
        <template #default="scope">
          <span>{{
            (queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.dealNoNoQuote')"
        prop="transactionId"
        align="center"
        width="190"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        :label="$t('member.orderNoNoQuote')"
        prop="orderNo"
        align="center"
        width="190"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        :label="$t('member.memberInformation')"
        align="center"
        width="190"
        :show-overflow-tooltip="false"
      >
        <template #default="{ row }">
          <template v-if="row.merchantUserName || row.vipLevel">
            <div>
              <span>{{ $t('member.userName') }}</span>
              <span>{{
                row.merchantUserName ? row.merchantUserName : "-"
              }}</span>
            </div>
            <div>
              <span>{{ $t('member.vipLevel') }}</span>
              <span>{{ !isNaN(row.vipLevel) ? row.vipLevel : "-" }}</span>
            </div>
          </template>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.userLevel')"
        align="center"
        :show-overflow-tooltip="false"
        width="140"
      >
        <template #default="{ row }">
          <template v-if="row.financeTierName || row.riskTierName">
            <div>
              <span>{{ $t('member.financeTier') }}</span>
              <span>{{ row.financeTierName ? row.financeTierName : "-" }}</span>
            </div>
            <div>
              <span>{{ $t('member.riskTier') }}</span>
              <span>{{ row.riskTierName ? row.riskTierName : "-" }}</span>
            </div>
          </template>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.transferWallet')"
        prop="outWallet"
        align="center"
        width="110"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ row.outWallet||"-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.transferInWallet')"
        prop="inWallet"
        align="center"
        width="170"
        :show-overflow-tooltip="false"
      >
        <template #default="{ row }">
          <span>{{ row.inWallet||"-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.upAndDownStatusNoQuote')"
        prop="upDownStatusDesc"
        align="center"
        width="170"
        :show-overflow-tooltip="false"
      >
        <template #default="{ row }">
          <span>{{ row.upDownStatusDesc || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.transferStatusNoQuote')"
        prop="transferStatusDesc"
        align="center"
        width="170"
        :show-overflow-tooltip="false"
      >
        <template #default="{ row }">
          <span>{{ row.transferStatusDesc || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.tranferAmountNoQuote')"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ formatNumber(row.amount) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.transferTimeNoQuote')"
        align="center"
        width="220"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ row.createTime ? row.createTime : "-" }}</span>
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
import { getTransferList } from "@/api/member/transfer/index";
import { getDicts } from "@/api/system/dict/data";
import { getCurrentInstance } from "vue";
import { formatNumber } from "@/utils/index";
import { defaultTime, shortcuts } from "@/utils/config";

const props = defineProps(["userName", "activeName"]);

const { proxy } = getCurrentInstance();
// const { lobby_score_status } = proxy.useDict("lobby_score_status"); //上下分状态下拉
// const { local_transfer_status } = proxy.useDict("local_transfer_status"); //转账状态下拉
const lobbyScoreList = ref([]);
const lobbyTransferList = ref([]);
const queryRef = ref(null);
const queryParams = ref({
  startTime: null, //转账开始时间
  endTime: null, //转账结束时间
  outLobby: null, //转出场馆
  inLobby: null, //转入场馆
  upDownStatus: null, //上下分状态
  transferStatus: null, //转账状态
  minTransferAmount: null, //最小转账金额
  maxTransferAmount: null, //最大转账金额
  merchantUserName: null, //会员账号
  pageNum: 1,
  pageSize: 10,
});
const outLobbyList = ref([
  {
    label: i18n.global.t("member.centerWallet"),
    value: 1,
  },
  {
    label: i18n.global.t("member.otherAllLobbyWallet"),
    value: 2,
  },
]);
const inLobbyList = ref([
  {
    label: i18n.global.t("member.centerWallet"),
    value: 1,
  },
  {
    label: i18n.global.t("member.otherAllLobbyWallet"),
    value: 2,
  },
]);
const dateRange = ref([]);
const tableData = ref([]);
const total = ref(0);

function handleChange() {
  if ((dateRange.value && !dateRange.value.length) || dateRange.value == null) {
    queryParams.value.startTime = null;
    queryParams.value.endTime = null;
  } else {
    queryParams.value.startTime = dateRange.value[0];
    queryParams.value.endTime = dateRange.value[1];
  }
}
function queryLobbyScore(){
 return getDicts("lobby_score_status").then(res=>{
  lobbyScoreList.value = res || []
 })
}
function queryLobbyTransfer(){
  return getDicts("local_transfer_status").then(res=>{
  lobbyTransferList.value = res || []
 })
}
function getList() {
  return getTransferList(queryParams.value).then((res) => {
    tableData.value = res.records || [];
    total.value = res.total;
  });
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

watch([() => props.userName, () => props.activeName],async () => {
  queryParams.value.merchantUserName = props.userName;
  if (props.activeName === "10" && props.userName) {
    await queryLobbyTransfer()
    await queryLobbyScore()
    getList();
  }
});
</script>

<style lang="scss" scoped>
.member-info-transfer-record {
  .transfer-record-table {
    margin-top: 20px;
  }
}
</style>
