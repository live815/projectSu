<template>
  <div class="member-transfer-record" v-loading="loading">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-row :gutter="10">
        <el-col :span="8">
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
          <el-form-item :label="$t('member.userName')" prop="merchantUserName" class="full-width">
            <el-input
              v-model="queryParams.merchantUserName"
              :placeholder="$t('member.pleaseInput')"
              clearable
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('member.dealNo')" prop="transactionId" class="full-width">
            <el-input
              v-model="queryParams.transactionId"
              :placeholder="$t('member.pleaseInput')"
              clearable
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('member.orderNo')" prop="orderNo" class="full-width">
            <el-input
              v-model="queryParams.orderNo"
              :placeholder="$t('member.pleaseInput')"
              clearable
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('member.vipLevel')" prop="vipLevelName" class="full-width">
            <el-select
              v-model="queryParams.vipLevelName"
              :placeholder="$t('member.pleaseSelect')"
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
          <el-form-item :label="$t('member.financeTier')" prop="financeTierId" class="full-width">
            <el-select
              v-model="queryParams.financeTierId"
              :placeholder="$t('member.pleaseSelect')"
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
          <el-form-item :label="$t('member.riskTier')" prop="riskTierId" class="full-width">
            <el-select
              v-model="queryParams.riskTierId"
              :placeholder="$t('member.pleaseSelect')"
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
          <el-form-item
            :label="$t('member.moveInLooby')"
            prop="inLobby"
            class="full-width"
          >
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
                v-for="dict in lobby_score_status"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="4">
          <el-form-item
            label="转账状态:"
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
                v-for="dict in local_transfer_status"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
        </el-col> -->
        <el-col :span="4">
          <el-form-item :label="$t('member.tranferAmount')" class="full-width">
            <el-col :span="11">
              <el-form-item prop="minTransferAmount" class="full-width">
                <el-input
                  v-model="queryParams.minTransferAmount"
                  :placeholder="$t('member.pleaseInput')"
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
                  :placeholder="$t('member.pleaseInput')"
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
              <span>{{$t('member.userName')}}</span>
              <span>{{ row.merchantUserName ? row.merchantUserName : "-" }}</span>
            </div>
            <div>
              <span>{{$t('member.vipLevel')}}</span>
              <span>{{ row.vipLevel||row.vipLevel===0 ? row.vipLevel : "-" }}</span>
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
              <span>{{$t('member.financeTier')}}</span>
              <span>{{ row.financeTierName ? row.financeTierName : "-" }}</span>
            </div>
            <div>
              <span>{{$t('member.riskTier')}}</span>
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
          <span>{{ row.outWallet || "-"}}</span>
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
          <span>{{ row.inWallet || "-"}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.upAndDownStatusNoQuote')"
        prop="upDownStatus"
        align="center"
        width="110"
        :show-overflow-tooltip="false"
      >
        <template #default="{ row }">
          <span>{{ row.upDownStatusDesc || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.tranferAmountNoQuote')"
        align="center"
        width="160"
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
          <span>{{ row.remark ? row.remark : '-' }}</span>
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

<script setup name="Transfer-record">
import i18n from "@/i18n";
import {
  getCurrentInstance,
  onMounted,
} from "vue";
import { getVIPList } from "@/api/funds/common";
import { getTransferList } from "@/api/member/transfer/index";
import { getRiskFinancalList } from "@/api/risk/level/index";
import { formatNumber } from "@/utils/index";
import { defaultTime, shortcuts } from "@/utils/config";

const { proxy } = getCurrentInstance();
const { lobby_score_status } = proxy.useDict("lobby_score_status"); //上下分状态下拉
// const { local_transfer_status } = proxy.useDict("local_transfer_status"); //上下分状态下拉
const queryRef = ref(null);
const queryParams = ref({
  merchantUserName: null, //会员账号
  transactionId:null, //交易号
  orderNo:null, //订单号
  vipScope: null,
  vipLevelName: [],
  financeTierId: [], //财务层级 
  riskTierId: [], //风控层级
  outLobby: null, //转出场馆
  inLobby: null, //转入场馆
  upDownStatus: null, //上下分状态
  transferStatus: null, //转账状态
  minTransferAmount: null, //最小转账金额
  maxTransferAmount: null, //最大转账金额
  startTime: null,
  endTime: null,
  pageNum: 1,
  pageSize: 10,
});
const vipLevelList = ref([]);
const riskList = ref([]); // 风控层级数组
const financalList = ref([]); //财务层级数组
const outLobbyList = ref([
  {
    label: i18n.global.t("member.centerWallet"),
    value: 1,
  },
  {
    label: i18n.global.t("member.otherAllLobbyWallet"),
    value: 2,
  }
]);
const inLobbyList = ref([
  {
    label: i18n.global.t("member.centerWallet"),
    value: 1,
  },
  {
    label: i18n.global.t("member.otherAllLobbyWallet"),
    value: 2,
  }
]);

const dateRange = ref([]);
const tableData = ref([]);
const total = ref(0);
const loading = ref(false);
const isFirstLoad = ref(true);

onMounted(async () => {
  await queryVIPList();
  await queryRiskList();
  await queryFinancalList();
  if(isFirstLoad.value){
    await getList();
    isFirstLoad.value = false;
  }
});
function queryVIPList() {
  return getVIPList().then((res) => {
    vipLevelList.value = res || [];
  });
}
//查询风控层级
function queryRiskList(){
  return getRiskFinancalList(2).then(res=>{
    riskList.value = res || [];
  })
}
//查询财务层级
function queryFinancalList(){
  return getRiskFinancalList(1).then(res=>{
    financalList.value = res || [];
  })
}
// 选择时间
function handleChange() {
  if ((dateRange.value && !dateRange.value.length) || dateRange.value == null) {
    queryParams.value.startTime = "";
    queryParams.value.endTime = "";
  } else {
    queryParams.value.startTime = dateRange.value[0];
    queryParams.value.endTime = dateRange.value[1];
  }
}
function getList() {
  loading.value = true;
  return getTransferList(queryParams.value)
    .then((res) => {
      loading.value = false;
      console.log(res)
      tableData.value = res.records || [];
      total.value = res.total;
    })
    .catch(() => {
      loading.value = false;
    });
}
function handleQuery() {
  queryParams.value.pageNum = 1;
  queryParams.value.vipScope = queryParams.value.vipLevelName.join(",");
  getList();
}
function resetQuery() {
  queryRef.value.resetFields();
  dateRange.value = [];
  handleChange();
}
onActivated(()=>{
  !isFirstLoad.value && getList()
})
</script>

<style lang="scss" scoped>
.member-transfer-record {
  padding: 20px;
  padding-bottom: 10px;
  .download-btn {
    background: #f59a23;
    color: #fff;
  }
  .status-one {
    color: #04f21c;
  }
  .status-two {
    color: #1890ff;
  }
  .status-three {
    color: rgba(217, 0, 27, 0.8117647058823529);
  }
  .status-four {
    color: #f59a23;
  }
  .status-five {
    color: #1890ff;
  }
  .status-six {
    color: rgba(217, 0, 27, 0.8117647058823529);
  }
  .btn-group {
    display: flex;
    flex-wrap: wrap;
    :deep() {
      .el-button:nth-child(4) {
        margin-left: 0;
        margin-top: 12px;
      }
      .el-button:nth-child(5) {
        margin-top: 12px;
      }
    }
  }
}
</style>
