<template>
  <div class="funds-record-deposit-index" v-loading="loading">
    <!-- 存款加送记录 -->
    <el-form :model="queryParams" ref="queryRef" :inline="true" :rules="rules">
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item :label="$t('funds.arrivalTime')" class="full-width">
            <el-date-picker
              v-model="dateRange"
              value-format="YYYY-MM-DD HH:mm:ss"
              type="datetimerange"
              range-separator="-"
              :start-placeholder="$t('funds.beginTime')"
              :end-placeholder="$t('funds.endTime')"
              @change="handleChange"
              :default-time="defaultTime"
              :shortcuts="shortcuts"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('funds.userName')" prop="userName" class="full-width">
            <el-input
              v-model="queryParams.userName"
              :placeholder="$t('funds.pleaseInput')"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('funds.orderNoQuote')" prop="orderNo" class="full-width">
            <el-input
              v-model="queryParams.orderNo"
              :placeholder="$t('funds.pleaseInput')"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('funds.RechargeorderNo')" prop="depositNo" class="full-width">
            <el-input
              v-model="queryParams.depositNo"
              :placeholder="$t('funds.pleaseInput')"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('funds.vipLevel')" prop="vipLevels" class="full-width">
            <el-select
              v-model="queryParams.vipLevels"
              :placeholder="$t('funds.pleaseSelect')"
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
          <el-form-item :label="$t('funds.financialTierQuote')" prop="financeIds" class="full-width">
            <el-select
              v-model="queryParams.financeIds"
              multiple
              :placeholder="$t('funds.pleaseSelect')"
              clearable
              class="full-width"
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
          <el-form-item :label="$t('funds.riskTierQuote')" prop="riskIds" class="full-width">
            <el-select
              v-model="queryParams.riskIds"
              multiple
              :placeholder="$t('funds.pleaseSelect')"
              clearable
              class="full-width"
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
            :label="$t('funds.channelType')"
            prop="channelTypeId"
            class="full-width"
          >
            <el-select
              v-model="queryParams.channelTypeId"
              :placeholder="$t('funds.pleaseSelect')"
              clearable
              class="full-width"
            >
              <el-option
                v-for="dict in channelNameList"
                :key="dict.id"
                :label="dict.channelName"
                :value="dict.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('funds.addBonus')" class="full-width">
            <el-col :span="11">
              <el-form-item prop="bonusMin" class="full-width">
                <el-input
                  v-model="queryParams.bonusMin"
                  :placeholder="$t('funds.pleaseInput')"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <span style="display: flex; justify-content: center">-</span>
            </el-col>
            <el-col :span="11">
              <el-form-item prop="bonusMax" class="full-width">
                <el-input
                  v-model="queryParams.bonusMax"
                  :placeholder="$t('funds.pleaseInput')"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item class="full-width">
            <el-button type="primary" icon="Search" @click="handleQuery"
              >{{ $t('funds.search') }}</el-button
            >
            <el-button icon="Refresh" @click="resetQuery">{{ $t('funds.reset') }}</el-button>
            <el-button
              icon="download"
              @click="handleExport"
              class="download-btn"
              >{{ $t('funds.export') }}</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 表格数据 -->
    <el-table :data="tableData" :empty-text="$t('member.noData')">
      <el-table-column :label="$t('funds.serialNumber')" width="55" type="index" align="center">
        <template #default="scope">
          <span>{{
            (queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.orderNo')"
        align="center"
        width="240"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <template v-if="row.orderNo || row.depositNo">
            <div>
              <span>{{ $t('funds.orderNoQuote') }}</span>
              <span>{{ row.orderNo ? row.orderNo : "-" }}</span>
            </div>
            <div>
              <span>{{ $t('funds.RechargeorderNo') }}</span>
              <span>{{ row.depositNo ? row.depositNo : "-" }}</span>
            </div>
          </template>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.memberInformation')"
        align="center"
        width="190"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <template v-if="row.userName || row.vipLevel">
            <div>
              <span>{{$t('funds.userName')}}</span>
              <span>{{ row.userName ? row.userName : "-" }}</span>
            </div>
            <div>
              <span>{{$t('funds.vipLevel')}}</span>
              <span>{{ !isNaN(row.vipLevel) ? row.vipLevel : "-" }}</span>
            </div>
          </template>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.userLevel')"
        align="center"
        width="190"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <template v-if="row.financeTierName || row.riskTierName">
            <div>
              <span>{{$t('funds.financialTier')}}:</span>
              <span>{{ row.financeTierName ? row.financeTierName : "-" }}</span>
            </div>
            <div>
              <span>{{$t('funds.financialTier')}}:</span>
              <span>{{ row.riskTierName ? row.riskTierName : "-" }}</span>
            </div>
          </template>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.rechargeAmount')"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span v-if="row.orderType === '0'">{{
            formatNumber(row.amount)
          }}</span>
          <div v-else>
            <div>
              <span>{{$t('funds.rechargeAmount')}}:</span>
              <span>{{
                formatNumber(row.amount)
              }}</span>
            </div>
            <div>
              <span>{{$t('funds.rate')}}</span>
              <span>{{ row.rate ? row.rate : "-" }}</span>
            </div>
            <div>
              <span>{{$t('funds.usdtNumber')}}</span>
              <span>{{ row.usdtNum ? row.usdtNum : "-" }}</span>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.actualAmountNoQuote')"
        prop="actualAmt"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span v-if="row.orderType === '0'">{{
            formatNumber(row.actualAmt)
          }}</span>
          <div v-else>
            <div>
              <span>{{$t('funds.actualAmount')}}</span>
              <span>{{
                formatNumber(row.actualAmt)
              }}</span>
            </div>
            <div>
              <span>{{$t('funds.usdtNumber')}}</span>
              <span>{{ formatNumber(row.actualUsdtNum) }}</span>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.addPercentNoQuote')"
        prop="addPercent"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          {{ row.addPercent ? row.addPercent + "%" : "-" }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.addBonusNoQuote')"
        prop="addBouns"
        align="center"
        :show-overflow-tooltip="true"
      >
      <template #default="{ row }">
        <span>{{ formatNumber(row.addBouns) }}</span>
      </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.channelTypeNoquote')"
        prop="channelTypeName"
        align="center"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        :label="$t('funds.arrivalTimeNoQuote')"
        prop="arrivalTime"
        align="center"
        width="160"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
    </el-table>
    <el-row class="total-table-row" v-if="tableData&&tableData.length!==0">
      <el-col  class="total-table">
        <span>{{ $t('funds.subTotal') }}</span>
        <div class="num">
            <div>
              <span>{{$t('funds.rechargeAmount')}}:</span>
              <span>{{ formatNumber(subTotalRecord.totalDpAmount) }}</span>
            </div>
            <div>
              <span>{{$t('funds.usdtNumber')}}</span>
              <span>{{ formatNumber(subTotalRecord.totalUsdtNum) }}</span>
            </div>
        </div>
        <div class="add-bonus">
          <span>{{ formatNumber(subTotalRecord.totalDpBonus) }}</span>
        </div>
      </el-col>
    </el-row>
    <el-row class="total-table-row" v-if="tableData&&tableData.length!==0">
      <el-col class="total-table">
        <span>{{ $t('funds.total') }}</span>
        <div class="num">
            <div>
              <span>{{$t('funds.rechargeAmount')}}:</span>
              <span>{{ formatNumber(totalRecord.totalDpAmount) }}</span>
            </div>
            <div>
              <span>{{$t('funds.usdtNumber')}}</span>
              <span>{{ formatNumber(totalRecord.totalUsdtNum) }}</span>
            </div>
        </div>
        <div class="add-bonus">
          <span>{{ formatNumber(totalRecord.totalDpBonus) }}</span>
        </div>
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

<script setup name="Deposit-record-plus">
import i18n from "@/i18n";
import { getCurrentInstance, onMounted } from "vue";
import { getVIPList, getChannelList } from "@/api/funds/common";
import { getDepositBonusList } from "@/api/funds/record/index";
import { getRiskFinancalList } from "@/api/risk/level/index";
import { formatNumber } from "@/utils/index";
import { defaultTime, shortcuts } from "@/utils/config";

const { proxy } = getCurrentInstance();
// const { sys_sports_type } = proxy.useDict("sys_sports_type");
const queryRef = ref(null);
const queryParams = ref({
  userName:null, //会员账号
  orderNo:null, //订单号
  depositNo:null, //充值订单号
  nqt: null, //聚合查询(1：会员账号 2：订单号 3：充值订单号)
  nqtValue: null,
  vipScope: null,
  vipLevels: [],//vip等级
  financeIds:[],//财务层级
  riskIds:[],//风控层级
  cqt: null, //层级查询类型(1：财务层级 2：风控层级)
  cqtValue: null, //层级查询类型对应的值(1：财务层级 2：风控层级)
  cqtValueName: [],
  channelTypeId: null,
  bonusMin: null,
  bonusMax: null,
  arrivalStartTime: null,
  arrivalEndTime: null,
  pageNum: 1,
  pageSize: 10,
});
const rules = ref({
  bonusMin: [{ validator: validateMinMaxValue, trigger: "blur" }],
  bonusMax: [{ validator: validateMinMaxValue, trigger: "blur" }],
});
const vipLevelList = ref([]);
const riskList = ref([]); // 风控层级数组
const financalList = ref([]); //财务层级数组
const channelNameList = ref([]);

const dateRange = ref([]);
const tableData = ref([]);
const total = ref(0);
const loading = ref(false);
const subTotalRecord = ref({}); //小计
const totalRecord = ref({}); //总计
const isFirstLoad = ref(true);

onMounted(async () => {
  await queryVIPList();
  await queryRiskList();
  await queryFinancalList();
  await queryChannelList();
  if(isFirstLoad.value){
    await getList();
    isFirstLoad.value = false
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
function queryChannelList() {
  return getChannelList().then((res) => {
    channelNameList.value = res || [];
  });
}

function handleChange() {
  if ((dateRange.value && !dateRange.value.length) || dateRange.value == null) {
    queryParams.value.arrivalStartTime = null;
    queryParams.value.arrivalEndTime = null;
  } else {
    queryParams.value.arrivalStartTime = dateRange.value[0];
    queryParams.value.arrivalEndTime = dateRange.value[1];
  }
}
function getList() {
  loading.value = true;
  return getDepositBonusList(queryParams.value)
    .then((res) => {
      loading.value = false;
      tableData.value = res.rows || [];
      total.value = res.total;
      subTotalRecord.value = res.subTotalRecord||{};
      totalRecord.value = res.totalRecord||{}
    })
    .catch(() => {
      loading.value = false;
    });
}
function handleQuery() {
  queryRef.value.validate((valid) => {
    if (valid) {
      queryParams.value.pageNum = 1;
      getList();
    } else {
      return;
    }
  });
}
function resetQuery() {
  queryRef.value.resetFields();
  dateRange.value = [];
  handleChange();
}
function handleExport() {
  proxy.download(
    "/system/fund/deposit/bonus/record/export",
    {
      ...queryParams.value,
    },
    `${i18n.global.t("funds.depositAddRecord")}${new Date().toLocaleString()}.xlsx`
  );
}
//校验规则
function validateMinMaxValue(rule, value, callback) {
  // 自定义校验逻辑
  if (isNaN(value)) {
    callback(new Error(i18n.global.t("funds.pleaseInputInvaildNumber")));
  } else {
    const minValue = parseFloat(queryParams.value.bonusMin);
    const maxValue = parseFloat(queryParams.value.bonusMax);

    if (!isNaN(minValue) && !isNaN(maxValue) && minValue > maxValue) {
      callback(new Error(i18n.global.t("funds.minValueCannotBeyondMaxvalue")));
    } else {
      callback(); // 校验通过
    }
  }
}
onActivated(async()=>{
  if(!isFirstLoad.value){
    await getList();
  }
})
</script>

<style lang="scss" scoped>
.funds-record-deposit-index {
  padding: 20px;
  padding-bottom: 10px;
  .download-btn {
    background: #f59a23;
    color: #fff;
  }
  .total-table-row{
    border-bottom:1px solid #eee;
    padding:16px 0;
    .total-table{
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size:14px;
      padding-left:16px;
      .num{
        position:absolute;
        left:695px
      }
      .add-bonus{
        position:absolute;
        left:1235px
      }
    }
  }
}
</style>
