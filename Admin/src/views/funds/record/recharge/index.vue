<template>
  <div class="funds-record-recharge" v-loading="loading">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item :label="$t('funds.rechargeTime')" class="full-width">
            <el-date-picker
              v-model="dateRangeRecharge"
              value-format="YYYY-MM-DD HH:mm:ss"
              type="datetimerange"
              range-separator="-"
              :start-placeholder="$t('funds.beginTime')"
              :end-placeholder="$t('funds.endTime')"
              @change="handleChangeRecharge"
              class="full-width"
              :default-time="defaultTime"
              :shortcuts="shortcuts"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('funds.arrivalTime')" class="full-width">
            <el-date-picker
              v-model="dateRangeArrival"
              value-format="YYYY-MM-DD HH:mm:ss"
              type="datetimerange"
              range-separator="-"
              :start-placeholder="$t('funds.beginTime')"
              :end-placeholder="$t('funds.endTime')"
              @change="handleChangeArrival"
              class="full-width"
              :default-time="defaultTime"
              :shortcuts="shortcuts"
            ></el-date-picker>
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
          <el-form-item :label="$t('funds.rechargeNameQuote')" prop="realName" class="full-width">
            <el-input
              v-model="queryParams.realName"
              :placeholder="$t('funds.pleaseInput')"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('funds.RechargeorderNo')" prop="orderNo" class="full-width">
            <el-input
              v-model="queryParams.orderNo"
              :placeholder="$t('funds.pleaseInput')"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('funds.relationOrder')" prop="orderRelno" class="full-width">
            <el-input
              v-model="queryParams.orderRelno"
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
                v-for="dict in channelTypeIdList"
                :key="dict.id"
                :label="dict.channelName"
                :value="dict.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('funds.belongStoreNameQuote')" prop="mchId" class="full-width">
            <el-select
              v-model="queryParams.mchId"
              :placeholder="$t('funds.pleaseSelect')"
              clearable
              class="full-width"
            >
              <el-option
                v-for="dict in rechargeTypeList"
                :key="dict.mchId"
                :label="dict.mchName"
                :value="dict.mchId"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('funds.orderStatus')" prop="statusArr" class="full-width">
            <el-select
              multiple
              v-model="queryParams.statusArr"
              :placeholder="$t('funds.pleaseSelect')"
              clearable
              class="full-width"
              collapse-tags
              collapse-tags-tooltip
            >
              <el-option
                v-for="dict in fund_deposit_order_status"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item class="full-width">
            <el-button type="primary" icon="Search" @click="handleQuery"
              >{{ $t('funds.search') }}</el-button
            >
            <el-button icon="Refresh" @click="resetQuery">{{ $t('funds.reset') }}</el-button>
            <el-button
              @click="openCreateOrderDia"
              class="create-btn"
              v-hasPermi="['deposit:order:add']"
              >{{ $t('funds.createOrder') }}</el-button
            >
            <el-button
              icon="download"
              v-hasPermi="['deposit:order:export']"
              @click="handleExport"
              class="download-btn"
              >{{ $t('funds.export') }}</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 表格数据 -->
    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%" :empty-text="$t('funds.noData')">
          <el-table-column :label="$t('funds.serialNumber')" width="55" type="index" align="center">
            <template #default="scope">
              <span>{{
                (queryParams.pageNum - 1) * queryParams.pageSize +
                scope.$index +
                1
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('funds.handle')"
            align="center"
            width="140"
            :show-overflow-tooltip="true"
          >
            <template #default="{ row }">
              <el-button
                type="primary"
                v-hasPermi="['deposit:order:reorder']"
                size="small"
                @click="openMakeUpOrderDia(row)"
                v-if="
                  row.status === '0' ||
                  row.status === '5' ||
                  row.status === '6' ||
                  row.status === '7' ||
                  row.status === '8'
                "
                >{{$t('funds.makeUpOrder')}}</el-button
              >
              <el-button
                type="primary"
                size="small"
                @click="openDetail(row)"
                v-hasPermi="['deposit:order:query']"
                >{{$t('funds.detail')}}</el-button
              >
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('funds.orderNo')"
            align="center"
            width="260"
            :show-overflow-tooltip="true"
          >
            <template #default="{ row }">
              <template v-if="row.orderNo || row.orderRelno">
                <div>
                  <span>{{ $t('funds.RechargeorderNo') }}</span>
                  <span>{{ row.orderNo ? row.orderNo : "-" }}</span>
                </div>
                <div>
                  <span>{{ $t('funds.relationOrder') }}</span>
                  <span>{{ row.orderRelno ? row.orderRelno : "-" }}</span>
                </div>
              </template>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('funds.memberInformation')"
            align="center"
            width="180"
            :show-overflow-tooltip="true"
          >
            <template #default="{ row }">
              <template v-if="row.userName || row.vipLevel">
                <div>
                  <span>{{ $t('funds.userName') }}</span>
                  <span>{{ row.userName ? row.userName : "-" }}</span>
                </div>
                <div>
                  <span>{{ $t('funds.vipLevel') }}</span>
                  <span>{{ !isNaN(row.vipLevel) ? row.vipLevel : "-" }}</span>
                </div>
              </template>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('funds.userLevel')"
            align="center"
            width="200"
          >
            <template #default="{ row }">
              <template v-if="row.financeTierName || row.riskTierName">
                <div>
                  <span>{{$t('funds.financialTierQuote')}}</span>
                  <span>{{
                    row.financeTierName ? row.financeTierName : "-"
                  }}</span>
                </div>
                <div>
                  <span>{{$t('funds.riskTierQuote')}}</span>
                  <span>{{ row.riskTierName ? row.riskTierName : "-" }}</span>
                </div>
              </template>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('funds.rechargeAmount')"
            prop="amount"
            align="center"
            width="150"
            :show-overflow-tooltip="true"
          >
            <template #default="{ row }">
              <span v-if="row.orderType === '0'">{{formatNumber(row.amount)}}</span>
              <div v-else>
                <div>
                  <span>{{ $t('funds.rechargeAmountQuote') }}</span>
                  <span>{{formatNumber(row.amount)}}</span>
                </div>
                <div>
                  <span>{{ $t('funds.rate') }}</span>
                  <span>{{ row.rate ? row.rate : "-" }}</span>
                </div>
                <div>
                  <span>{{ $t('funds.usdtNumber') }}</span>
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
              <span v-if="row.orderType === '0'">{{formatNumber(row.actualAmt)}}</span>
              <div v-else>
                <div>
                  <span>{{ $t('funds.actualAmount') }}</span>
                  <span>{{formatNumber(row.actualAmt)}}</span>
                </div>
                <div>
                  <span>{{ $t('funds.usdtNumber') }}</span>
                  <span>{{ formatNumber(row.actualUsdtNum) }}</span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('funds.rechargeInformation')"
            align="center"
            width="180"
            :show-overflow-tooltip="true"
          >
            <template #default="{ row }">
              <template
                v-if="row.realName || row.channelTypeName || row.mchName"
              >
                <div>
                  <span>{{ $t('funds.rechargeNameQuote') }}</span>
                  <span>{{ row.realName ? row.realName : "-" }}</span>
                </div>
                <div>
                  <span>{{ $t('funds.channelType') }}</span>
                  <span>{{
                    row.channelTypeName ? row.channelTypeName : "-"
                  }}</span>
                </div>
                <div>
                  <span>{{ $t('funds.belongStoreNameQuote') }}</span>
                  <span>{{ row.mchName ? row.mchName : "-" }}</span>
                </div>
              </template>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('member.recieveInformation')"
            align="center"
            width="210"
          >
            <template #default="{ row }">
              <template
                v-if="
                  row.payeeBankName ||
                  row.payeeCardNo ||
                  row.payeeName ||
                  row.tradeAddr ||
                  row.tradeProtocol
                "
              >
                <div v-if="row.orderType === '0'">
                  <span>{{ $t('member.bankname') }}</span>
                  <span>{{ row.payeeBankName ? row.payeeBankName : "-" }}</span>
                </div>
                <div v-if="row.orderType === '0'">
                  <span>{{ $t('member.bankcardNo') }}</span>
                  <span>{{ row.payeeCardNo ? row.payeeCardNo : "-" }}</span>
                </div>
                <div v-if="row.orderType === '0'">
                  <span>{{ $t('member.reciever') }}</span>
                  <span>{{ row.payeeName ? row.payeeName : "-" }}</span>
                </div>
                <div v-if="row.orderType === '1'">
                  <span>{{ $t('member.protocolOfDeal') }}</span>
                  <span>{{ row.tradeProtocol ? row.tradeProtocol : "-" }}</span>
                </div>
                <div v-if="row.orderType === '1'">
                  <span>{{ $t('member.recieveMoneyAddress') }}</span>
                  <span>{{ row.tradeAddr ? row.tradeAddr : "-" }}</span>
                </div>
              </template>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('funds.orderStatusNoQuote')"
            prop="status"
            align="center"
            width="110"
            :show-overflow-tooltip="true"
          >
            <template #default="{ row }">
              <span :class="colorChange(row.status)">{{
                switchStatus(fund_deposit_order_status, row.status)
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('funds.addDetail')"
            align="center"
            width="180"
            :show-overflow-tooltip="true"
          >
            <template #default="{ row }">
              <template v-if="row.addPercent || row.addBouns">
                <div>
                  <span>{{ $t('funds.addPercent') }}</span>
                  <span>{{ row.addPercent ? row.addPercent + "%" : "-" }}</span>
                </div>
                <div>
                  <span>{{ $t('funds.addBonus') }}</span>
                  <span>{{ formatNumber(row.addBouns) }}</span>
                </div>
              </template>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('funds.attchmentInformation')"
            align="center"
            width="90"
            :show-overflow-tooltip="true"
          >
            <template #default="{ row }">
              <span class="pointer" @click="checkDetail(row)"
                >{{$t('funds.checkDetails')}}</span
              >
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('funds.time')"
            align="center"
            width="240"
            :show-overflow-tooltip="true"
          >
            <template #default="{ row }">
              <template v-if="row.createTime || row.arrivalTime">
                <div>
                  <span>{{ $t('funds.rechargeTime') }}</span>
                  <span>{{ row.createTime ? row.createTime : "-" }}</span>
                </div>
                <div>
                  <span>{{ $t('funds.arrivalTime') }}</span>
                  <span>{{ row.arrivalTime ? row.arrivalTime : "-" }}</span>
                </div>
              </template>
              <span v-else>-</span>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row class="total-table-row">
      <el-col class="total-table">
        <span>{{ $t('funds.total') }}</span>
        <div class="num">
            <div>
              <span>{{$t('funds.rechargeAmount')}}:</span>
              <span>{{ formatNumber(totalRecord.amount) }}</span>
            </div>
            <div>
              <span>{{$t('funds.usdtNumber')}}</span>
              <span>{{ formatNumber(totalRecord.usdtNum) }}</span>
            </div>
        </div>
        <div class="add-bonus">
          <div>
              <span>{{$t('funds.actualAmount')}}</span>
              <span>{{ formatNumber(totalRecord.actualAmount) }}</span>
            </div>
            <div>
              <span>{{$t('funds.actualUsdtNumberQuote')}}</span>
              <span>{{ formatNumber(totalRecord.actUsdtNum) }}</span>
            </div>
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
    <OrderDetail
      v-model:open="open"
      :cloneRow="cloneRow"
      :list="fund_deposit_order_status"
      v-if="open"
    />
    <AttachmentDetail
      v-model:openAttachment="openAttachment"
      v-if="openAttachment"
      v-model:cloneRow="cloneRow"
    />
    <MakeUpOrder
      v-model:openMakeUpOrder="openMakeUpOrder"
      v-if="openMakeUpOrder"
      :list="fund_deposit_order_status"
      v-model:cloneRow="cloneRow"
      @makeupRefresh="getList"
    />
    <CreateOrder
      v-model:openCreateOrder="openCreateOrder"
      v-if="openCreateOrder"
      v-model:cloneRow="cloneRow"
      @addRefresh="getList"
    />
  </div>
</template>

<script setup name="Funds-record">
import i18n from "@/i18n";
import {
  getCurrentInstance,
  onMounted,
} from "vue";
import {
  getVIPList,
  getChannelList,
  getDpMchinfoList,
} from "@/api/funds/common";
import { deepCopy } from "@/utils/index";
import { getOrderList,getTotalList } from "@/api/funds/record/index";
import { getRiskFinancalList } from "@/api/risk/level/index";
import AttachmentDetail from "./components/AttachmentDetail.vue";
import OrderDetail from "./components/OrderDetail.vue";
import MakeUpOrder from "./components/MakeUpOrder.vue";
import CreateOrder from "./components/CreateOrder.vue";
import { switchStatus, colorChange } from "./common";
import { formatNumber } from "@/utils/index";
import { defaultTime, shortcuts } from "@/utils/config";

const { proxy } = getCurrentInstance();
const { fund_deposit_order_status } = proxy.useDict(
  "fund_deposit_order_status"
);
const queryRef = ref(null);
const queryParams = ref({
  userName:null, //会员账号
  realName:null, //充值人姓名
  orderNo:null, //充值订单号
  orderRelno:null, //关联订单号
  vipLevels: [], //VIP等级
  financeIds:[], // 财务层级数组
  riskIds:[], // 风控层级数组
  channelTypeId: null, //通道类型
  mchId: null, //商户
  statusArr: [],
  arrivalStartTime: null, //到账开始时间
  arrivalEndTime: null, //到账结束时间
  depositStartTime:null, //充值开始时间
  depositEndTime:null, //充值结束时间
  pageNum: 1,
  pageSize: 10,
});
const vipLevelList = ref([]);
const riskList = ref([]); // 风控层级数组
const financalList = ref([]); //财务层级数组
const channelTypeIdList = ref([]);
const rechargeTypeList = ref([]);

const tableData = ref([]);
const total = ref(0);
const loading = ref(false);
const open = ref(false);
const openAttachment = ref(false);
const openMakeUpOrder = ref(false);
const openCreateOrder = ref(false);
const cloneRow = ref(null);
const dateRangeRecharge = ref([]);
const dateRangeArrival = ref([]);
const totalRecord = ref({}); //总计
const isFirstLoad = ref(true);

onMounted(async () => {
  await queryVIPList();
  await queryRiskList();
  await queryFinancalList()
  await queryDpMchinfoList();
  await queryChannelList();
  if(isFirstLoad.value){
    await getList();
    isFirstLoad.value = false
  }
  await queryTotalList();
});
function handleChangeRecharge(){
  if ((dateRangeRecharge.value && !dateRangeRecharge.value.length) || dateRangeRecharge.value == null) {
    queryParams.value.depositStartTime = null;
    queryParams.value.depositEndTime = null;
  } else {
    queryParams.value.depositStartTime = dateRangeRecharge.value[0];
    queryParams.value.depositEndTime = dateRangeRecharge.value[1];
  }
}
function handleChangeArrival() {
  if ((dateRangeArrival.value && !dateRangeArrival.value.length) || dateRangeArrival.value == null) {
    queryParams.value.arrivalStartTime = null;
    queryParams.value.arrivalEndTime = null;
  } else {
    queryParams.value.arrivalStartTime = dateRangeArrival.value[0];
    queryParams.value.arrivalEndTime = dateRangeArrival.value[1];
  }
} 
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
function queryDpMchinfoList() {
  return getDpMchinfoList().then((res) => {
    rechargeTypeList.value = res || [];
  });
}
function queryChannelList() {
  return getChannelList().then((res) => {
    channelTypeIdList.value = res || [];
  });
}
function getList() {
  loading.value = true;
  let cloneData = deepCopy(queryParams.value);
  if (queryParams.value.statusArr && queryParams.value.statusArr.length === 0) {
    cloneData.statusArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
  }
  return getOrderList(cloneData)
    .then((res) => {
      loading.value = false;
      tableData.value = res.rows || [];
      total.value = res.total;
    })
    .catch(() => {
      loading.value = false;
    });
}
function queryTotalList(){
  let cloneData = deepCopy(queryParams.value);
  if (queryParams.value.statusArr && queryParams.value.statusArr.length === 0) {
    cloneData.statusArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
  }
  return getTotalList(cloneData).then(res=>{
    totalRecord.value = res||{}
  })
}
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
  queryTotalList();
}
function resetQuery() {
  queryRef.value.resetFields();
  dateRangeArrival.value = [];
  dateRangeRecharge.value = [];
  handleChangeRecharge();
  handleChangeArrival();
}
function handleExport() {
  let cloneData = deepCopy(queryParams.value);
  if (queryParams.value.statusArr && queryParams.value.statusArr.length === 0) {
    cloneData.statusArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
  }
  proxy.download(
    "/system/fund/deposit/order/export",
    {
      ...cloneData,
    },
    `${i18n.global.t("funds.chargeRecordUnderline")}${new Date().toLocaleDateString()}.xlsx`
  );
}
function checkDetail(row) {
  openAttachment.value = true;
  cloneRow.value = JSON.parse(JSON.stringify(row));
}
function openDetail(row) {
  cloneRow.value = JSON.parse(JSON.stringify(row));
  open.value = true;
}
function openMakeUpOrderDia(row) {
  cloneRow.value = JSON.parse(JSON.stringify(row));
  openMakeUpOrder.value = true;
}
function openCreateOrderDia() {
  openCreateOrder.value = true;
}
onActivated(async()=>{
  if(!isFirstLoad.value){
    await getList();
    await queryTotalList();
  }
})
</script>

<style lang="scss" scoped>
.funds-record-recharge {
  padding: 20px;
  padding-bottom: 10px;
  .create-btn {
    background: #16e61e;
    color: #fff;
  }
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
        left:830px
      }
      .add-bonus{
        position:absolute;
        left:1000px
      }
    }
  }
}
</style>
