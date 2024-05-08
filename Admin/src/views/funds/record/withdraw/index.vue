<template>
  <div class="funds-record-withdraw" v-loading="loading">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('funds.waitForPayment')" name="1"> </el-tab-pane>
      <el-tab-pane :label="$t('funds.all')" name="2"> </el-tab-pane>
    </el-tabs>
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item :label="$t('funds.recieveMoneyTime')" class="full-width">
            <el-date-picker
              v-model="dateRangeWithdrawl"
              value-format="YYYY-MM-DD HH:mm:ss"
              type="datetimerange"
              range-separator="-"
              :start-placeholder="$t('funds.beginTime')"
              :end-placeholder="$t('funds.endTime')"
              @change="handleChangeWithdrawl"
              class="full-width"
              :default-time="defaultTime"
              :shortcuts="shortcuts"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('funds.paymentTime')" class="full-width">
            <el-date-picker
              v-model="dateRangeOutpay"
              value-format="YYYY-MM-DD HH:mm:ss"
              type="datetimerange"
              range-separator="-"
              :start-placeholder="$t('funds.beginTime')"
              :end-placeholder="$t('funds.endTime')"
              @change="handleChangeOutpay"
              class="full-width"
              :default-time="defaultTime"
              :shortcuts="shortcuts"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('funds.reviewTime')" class="full-width">
            <el-date-picker
              v-model="dateRangeReview"
              value-format="YYYY-MM-DD HH:mm:ss"
              type="datetimerange"
              range-separator="-"
              :start-placeholder="$t('funds.beginTime')"
              :end-placeholder="$t('funds.endTime')"
              @change="handleChangeReview"
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
          <el-form-item :label="$t('funds.orderNoQuote')" prop="orderNo" class="full-width">
            <el-input
              v-model="queryParams.orderNo"
              :placeholder="$t('funds.pleaseInput')"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('funds.reviewer')" prop="riskApprover" class="full-width">
            <el-input
              v-model="queryParams.riskApprover"
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
            :label="$t('funds.withdrawlWay')"
            prop="wdWayType"
            class="full-width"
            clearable
          >
            <el-select
              v-model="queryParams.wdWayType"
              :placeholder="$t('funds.pleaseSelect')"
              clearable
              class="full-width"
            >
              <el-option
                v-for="dict in wdWayTypeList"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item
            :label="$t('funds.paymentMethod')"
            prop="paymentMethod"
            class="full-width"
          >
            <el-select
              v-model="queryParams.paymentMethod"
              :placeholder="$t('funds.pleaseSelect')"
              clearable
              class="full-width"
            >
              <el-option
                v-for="dict in paymentMethodList"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('funds.withdrawalStoreNameQuote')" prop="mchId" class="full-width">
            <el-select
              v-model="queryParams.mchId"
              :placeholder="$t('funds.pleaseSelect')"
              clearable
              class="full-width"
            >
              <el-option
                v-for="dict in channelNameList"
                :key="dict.mchId"
                :label="dict.mchName"
                :value="dict.mchId"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item :label="$t('funds.orderStatus')" prop="statusArr" class="full-width">
            <el-select
              v-model="queryParams.statusArr"
              :placeholder="$t('funds.pleaseSelect')"
              clearable
              multiple
              collapse-tags
              collapse-tags-tooltip
              class="full-width"
            >
              <el-option
                v-for="dict in statusArrList"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item class="full-width">
            <el-button type="primary" icon="Search" @click="handleQuery"
              >{{$t('funds.search')}}</el-button
            >
            <el-button icon="Refresh" @click="resetQuery">{{$t('funds.reset')}}</el-button>
            <el-button
              icon="download"
              v-hasPermi="['withdrawl:order:export']"
              @click="handleExport"
              class="download-btn"
              >{{$t('funds.export')}}</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 表格数据 -->
    <el-table :data="tableData" class="withdraw-table" :empty-text="$t('funds.noData')">
      <el-table-column :label="$t('funds.serialNumber')" width="55" type="index" align="center">
        <template #default="scope">
          <span>{{
            (queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.handle')"
        align="center"
        :width="activeName === '1' ? 280 : 90"
      >
        <template #default="{ row }">
          <div
            class="btn-group"
            v-if="
              (activeName === '1' && row.status === '3') ||
              (activeName === '1' && row.status === '5') ||
              (activeName === '1' && row.status === '6') ||
              (activeName === '1' && row.status === '10') ||
              (activeName === '1' && row.status === '13') ||
              (activeName === '1' && row.status === '14') ||
              (activeName === '1' && row.status === '15')
            "
          >
            <el-button
              type="danger"
              v-hasPermi="['withdrawl:order:payment-reject']"
              size="small"
              @click="openRefuseDia(row)"
              v-if="
                (activeName === '1' && row.status === '3') ||
                (activeName === '1' && row.status === '6') ||
                (activeName === '1' && row.status === '10') ||
                (activeName === '1' && row.status === '13')
              "
              >{{ $t('funds.refuseOutMoney') }}</el-button
            >
            <el-button
              type="primary"
              v-hasPermi="['withdrawl:order:forced-success']"
              size="small"
              @click="openForceSuccessDia(row)"
              v-if="
                (activeName === '1' && row.status === '3') ||
                (activeName === '1' && row.status === '5') ||
                (activeName === '1' && row.status === '6') ||
                (activeName === '1' && row.status === '13') ||
                (activeName === '1' && row.status === '14') ||
                (activeName === '1' && row.status === '15')
              "
              >{{ $t('funds.forceSuccess') }}</el-button
            >
            <el-button
              type="danger"
              v-hasPermi="['withdrawl:order:payment-refund']"
              size="small"
              @click="openRefuseBackDia(row)"
              v-if="row.status === '14' || row.status === '15'"
              >{{ $t('funds.paymentReturn') }}</el-button
            >
            <el-button
              type="primary"
              v-hasPermi="['withdrawl:order:third-payout']"
              size="small"
              @click="openThreePartylDia(row)"
              v-if="
                (activeName === '1' && row.status === '3') ||
                (activeName === '1' && row.status === '6') ||
                (activeName === '1' && row.status === '10')
              "
              >{{ $t('funds.threePartyPayment') }}</el-button
            >
            <el-button
              type="primary"
              v-hasPermi="['withdrawl:order:manual-payout']"
              size="small"
              @click="openManualDia(row)"
              v-if="
                (activeName === '1' && row.status === '3') ||
                (activeName === '1' && row.status === '6') ||
                (activeName === '1' && row.status === '10')
              "
              >{{ $t('funds.manualWithdrawal') }}</el-button
            >
          </div>
          <el-button
            type="primary"
            v-hasPermi="['withdrawl:order:query']"
            size="small"
            @click="openDetailDia(row)"
            v-else-if="activeName === '2'"
            >{{ $t('funds.detail') }}</el-button
          >
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.orderNo')"
        prop="orderNo"
        align="center"
        width="190"
        :show-overflow-tooltip="true"
      >
      <template #default="{ row }">
        <span :class="{pointer:row.splitFlag === '1'||row.splitFlag === '2' }" @click="openSplitOrderDia(row)">{{ row.orderNo || "-" }}</span>
      </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.memberInformation')"
        prop="information"
        align="center"
        width="190"
        :show-overflow-tooltip="false"
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
        :show-overflow-tooltip="false"
        width="160"
      >
        <template #default="{ row }">
          <template v-if="row.financeTierName || row.riskTierName">
            <div>
              <span>{{ $t('funds.financialTierQuote') }}</span>
              <span>{{ row.financeTierName ? row.financeTierName : "-" }}</span>
            </div>
            <div>
              <span>{{ $t('funds.riskTierQuote') }}</span>
              <span>{{ row.riskTierName ? row.riskTierName : "-" }}</span>
            </div>
          </template>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.withdrawAmount')"
        prop="amount"
        align="center"
        width="160"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span v-if="row.orderType === '0'||row.orderType === '3'">{{formatNumber(row.amount)}}</span>
          <div v-else>
            <div>
              <span>{{ $t('funds.withdrawAmountQuote') }}</span>
              <span>{{ formatNumber(row.amount) }}</span>
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
        width="180"
      >
        <template #default="{ row }">
          <span v-if="row.orderType === '0'||row.orderType === '3'">{{formatNumber(row.actualAmt)}}</span>
          <div v-else>
            <div>
              <span>{{ $t('funds.actualAmount') }}</span>
              <span>{{ formatNumber(row.actualAmt) }}</span>
            </div>
            <div>
              <span>{{ $t('funds.actualUsdtNumber') }}</span>
              <span>{{ row.actualUsdtNum||row.actualUsdtNum===0 ? row.actualUsdtNum : "-" }}</span>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.withdrawInformation')"
        align="center"
        width="170"
        :show-overflow-tooltip="false"
      >
        <template #default="{ row }">
          <template v-if="row.wdWayType || row.paymentMethod || row.mchName">
            <div>
              <span>{{$t('funds.withdrawlWay')}}</span>
              <span>{{
                row.wdWayType
                  ? switchWdWayTypeStatus(wdWayTypeList, row.wdWayType)
                  : "-"
              }}</span>
            </div>
            <div>
              <span>{{$t('funds.paymentMethod')}}</span>
              <span>{{
                row.paymentMethod
                  ? switchpaymentMethodStatus(
                      paymentMethodList,
                      row.paymentMethod
                    )
                  : "-"
              }}</span>
            </div>
            <div>
              <span>{{$t('funds.withdrawalStoreNameQuote')}}</span>
              <span>{{ row.mchName ? row.mchName : "-" }}</span>
            </div>
          </template>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.withdrawTypeNoQuote')"
        align="center"
        width="145"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <template v-if="row.wdType || row.wdFee">
            <div>
              <span>{{ $t('funds.withdrawType') }}</span>
              <span>{{
                row.wdType ? switchWdTypeStatus(wdTypeList, row.wdType) : "-"
              }}</span>
            </div>
            <div>
              <span>{{ $t('funds.wdFee') }}</span>
              <span>{{ formatNumber(row.wdFee) }}</span>
            </div>
          </template>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.orderStatusNoQuote')"
        prop="status"
        align="center"
        width="160"
        :show-overflow-tooltip="false"
      >
        <template #default="{ row }">
          <span :class="colorChange(row.status)">{{
            switchStatus(statusArrList, row.status)
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.recieveMoneyInformation')"
        align="center"
        width="210"
        :show-overflow-tooltip="true"
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
              <span>{{$t('funds.bankName')}}</span>
              <span>{{ row.payeeBankName ? row.payeeBankName : "-" }}</span>
            </div>
            <div v-if="row.orderType === '0'">
              <span>{{$t('funds.bankCardNo')}}</span>
              <span>{{ row.payeeCardNo ? row.payeeCardNo : "-" }}</span>
            </div>
            <div v-if="row.orderType === '0'">
              <span>{{$t('funds.recieveMoneyPerson')}}</span>
              <span>{{ row.payeeName ? row.payeeName : "-" }}</span>
            </div>
            <div v-if="row.orderType === '1'">
              <span>{{$t('funds.tradeProtocol')}}</span>
              <span>{{ row.tradeProtocol ? row.tradeProtocol : "-" }}</span>
            </div>
            <div v-if="row.orderType === '1' || row.orderType === '3'">
              <span>{{$t('funds.tradeAddr')}}</span>
              <span>{{ row.tradeAddr ? row.tradeAddr : "-" }}</span>
            </div>
          </template>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.reserveDetail')"
        align="center"
        width="110"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <template v-if="row.appmentHours || row.addPercent || row.addBouns">
            <div>
              <span>{{ $t('funds.reserveLimitHour') }}</span>
              <span>{{ row.appmentHours ? row.appmentHours : "-" }}</span>
            </div>
            <div>
              <span>{{ $t('funds.addPercent') }}</span>
              <span>{{ row.addPercent ? row.addPercent + "%" : "-" }}</span>
            </div>
            <div>
              <span>{{ $t('funds.addBonus') }}</span>
              <span>{{ row.addBouns ? row.addBouns : "-" }}</span>
            </div>
          </template>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.time')"
        align="center"
        width="220"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <template v-if="row.createTime || row.paymentTime">
            <div>
              <span>{{$t('funds.recieveMoneyTime')}}</span>
              <span>{{ row.createTime ? row.createTime : "-" }}</span>
            </div>
            <div>
              <span>{{$t('funds.paymentTime')}}</span>
              <span>{{ row.paymentTime ? row.paymentTime : "-" }}</span>
            </div>
          </template>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.riskConttrolReview')"
        align="center"
        width="220"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <template
            v-if="
              row.riskApprover || row.riskApprovalTime || row.riskApprovalMark
            "
          >
            <div>
              <span>{{ $t('funds.reviewer') }}</span>
              <span>{{ row.riskApprover ? row.riskApprover : "-" }}</span>
            </div>
            <div>
              <span>{{ $t('funds.reviewTime') }}</span>
              <span>{{
                row.riskApprovalTime ? row.riskApprovalTime : "-"
              }}</span>
            </div>
            <div>
              <span>{{ $t('funds.reviewRemark') }}</span>
              <span>{{
                row.riskApprovalMark ? row.riskApprovalMark : "-"
              }}</span>
            </div>
          </template>
          <span v-else>-</span>
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
    <ForceSuccess
      v-model:openForceSuccess="openForceSuccess"
      v-if="openForceSuccess"
      @forceSuccessRefresh="getList"
      :cloneRow="cloneRow"
    />
    <ThreePartyOrManual
      v-model:openThreeOrManual="openThreeOrManual"
      v-model:cloneRow="cloneRow"
      :withdrawType="withdrawType"
      :statusArrList="statusArrList"
      :wdTypeList="wdTypeList"
      :wdWayTypeList="wdWayTypeList"
      :paymentMethodList="paymentMethodList"
      v-if="openThreeOrManual"
      @threeOrManualfresh="getList"
    />
    <RefuseDialog
      v-model:openRefuse="openRefuse"
      v-if="openRefuse"
      :cloneRow="cloneRow"
      @paymentRejectRefresh="getList"
    />
    <RefuseBack
      v-model:openRefuseBack="openRefuseBack"
      v-if="openRefuseBack"
      @refundBackRefresh="getList"
    />
    <WithdrawlRecordDetail
      v-model:openDetail="openDetail"
      v-if="openDetail"
      :cloneRow="cloneRow"
      :statusArrList="statusArrList"
      :wdTypeList="wdTypeList"
      :wdWayTypeList="wdWayTypeList"
      :paymentMethodList="paymentMethodList"
    />
    <SplitOrderDetail
      v-model:openSplitOrder="openSplitOrder"
      :cloneRow="cloneRow"
      v-if="openSplitOrder"
    />
  </div>
</template>

<script setup name="Withdraw-record">
import i18n from "@/i18n";
import { formatNumber } from "@/utils/index";
import {
  getCurrentInstance,
  nextTick,
  onBeforeMount,
  onMounted,
  onUnmounted,
  watch,
} from "vue";
import { getVIPList } from "@/api/funds/common";
import { getWithdrawlOrderList } from "@/api/funds/record/index";
import { getRiskFinancalList } from "@/api/risk/level/index";
import ForceSuccess from "./components/ForceSuccess.vue";
import ThreePartyOrManual from "./components/ThreePartyOrManual.vue";
import RefuseDialog from "./components/RefuseDialog.vue";
import RefuseBack from "./components/RefuseBack.vue";
import WithdrawlRecordDetail from "./components/WithdrawlRecordDetail.vue";
import SplitOrderDetail from "./components/SplitOrderDetail.vue";
import { getMchchannelWithdrawlList } from "@/api/funds/common";
import {
  dataStatus,
  dataStatusAll,
  colorChange,
  switchStatus,
  switchWdTypeStatus,
  switchWdWayTypeStatus,
  switchpaymentMethodStatus,
} from "./common";
import { deepCopy } from "@/utils/index";
import { defaultTime, shortcuts } from "@/utils/config";

const { proxy } = getCurrentInstance();
// const { fund_wd_channel_type } = proxy.useDict("fund_wd_channel_type");
// console.log(fund_wd_channel_type,66666)
const activeName = ref("1");
const queryRef = ref(null);
const queryParams = ref({
  userName:null, //会员账号
  orderNo: null, // 订单号
  riskApprover:null, // 风控审核人
  vipLevels: [], //VIP等级数组
  financeIds:[], // 财务层级数组
  riskIds:[], // 风控层级数组
  wdWayType: null, //提现方式
  paymentMethod: null, //出款方式
  mchId: null, //出款商户
  statusArr: [
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
  ], //订单状态
  withdrawStartTime: null, //提款开始时间
  withdrawEndTime: null, // 提款结束时间
  payoutStartTime: null, //出款开始时间
  payoutEndTime: null, // 出款结束时间
  riskApprovalStartTime: null, //风控审核开始时间
  riskApprovalEndTime: null, // 风控审核结束时间
  pageNum: 1,
  pageSize: 10,
});
const vipLevelList = ref([]); // VIP等级数组
const riskList = ref([]); // 风控层级数组
const financalList = ref([]); //财务层级数组
const wdWayTypeList = ref([
  {
    label: i18n.global.t("funds.bankCardWithdrawal"),
    value: "0",
  },
  {
    label: i18n.global.t("funds.personalWithdrawal"),
    value: "1",
  },
  {
    label: i18n.global.t("funds.USDTwithdrawal"),
    value: "2",
  },
  {
    label: i18n.global.t("funds.EBpayWithdrawal"),
    value: "3",
  },
]);
const paymentMethodList = ref([
  {
    label: i18n.global.t("funds.threePartyAutoPayment"),
    value: "0",
  },
  {
    label: i18n.global.t("funds.threePartyHandPayment"),
    value: "1",
  },
  {
    label: i18n.global.t("funds.manualWithdrawal"),
    value: "2",
  },
]);
const channelNameList = ref([]);
const statusArrList = ref([]);
const wdTypeList = ref([
  {
    label: i18n.global.t("funds.commonWithdrawal"),
    value: "0",
  },
  {
    label: i18n.global.t("funds.largeWithdrawal"),
    value: "1",
  },
]);

const dateRangeWithdrawl = ref([]);
const dateRangeOutpay = ref([]);
const dateRangeReview = ref([]);
const tableData = ref([]);
const total = ref(0);
const loading = ref(false);
const openForceSuccess = ref(false);
const openThreeOrManual = ref(false);
const openRefuse = ref(false);
const openRefuseBack = ref(false);
const openDetail = ref(false);
const openSplitOrder = ref(false);
const cloneRow = ref(null);
const withdrawType = ref(null);

onMounted(async () => {
  await queryVIPList();
  await queryRiskList();
  await queryFinancalList()
  await queryChannelList();
  // await getList()
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
  return getMchchannelWithdrawlList().then((res) => {
    channelNameList.value = res || [];
  });
}
// 选择提现时间
function handleChangeWithdrawl() {
  if ((dateRangeWithdrawl.value && !dateRangeWithdrawl.value.length) || dateRangeWithdrawl.value == null) {
    queryParams.value.withdrawStartTime = null;
    queryParams.value.withdrawEndTime = null;
  } else {
    queryParams.value.withdrawStartTime = dateRangeWithdrawl.value[0];
    queryParams.value.withdrawEndTime = dateRangeWithdrawl.value[1];
  }
}
// 选择出款时间
function handleChangeOutpay() {
  if ((dateRangeOutpay.value && !dateRangeOutpay.value.length) || dateRangeOutpay.value == null) {
    queryParams.value.payoutStartTime = null;
    queryParams.value.payoutEndTime = null;
  } else {
    queryParams.value.payoutStartTime = dateRangeOutpay.value[0];
    queryParams.value.payoutEndTime = dateRangeOutpay.value[1];
  }
}
// 选择审核时间
function handleChangeReview() {
  if ((dateRangeReview.value && !dateRangeReview.value.length) || dateRangeReview.value == null) {
    queryParams.value.riskApprovalStartTime = null;
    queryParams.value.riskApprovalEndTime = null;
  } else {
    queryParams.value.riskApprovalStartTime = dateRangeReview.value[0];
    queryParams.value.riskApprovalEndTime = dateRangeReview.value[1];
  }
}
function getList() {
  loading.value = true;
  let cloneData = deepCopy(queryParams.value);
  if (
    queryParams.value.statusArr &&
    queryParams.value.statusArr.length === 0 &&
    activeName.value === "1"
  ) {
    cloneData.statusArr = [
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
    ];
  } else if (
    queryParams.value.statusArr &&
    queryParams.value.statusArr.length === 0 &&
    activeName.value === "2"
  ) {
    cloneData.statusArr = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18"
    ];
  }
  return getWithdrawlOrderList(cloneData)
    .then((res) => {
      loading.value = false;
      tableData.value = res.rows || [];
      total.value = res.total;
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
  dateRangeWithdrawl.value = [];
  dateRangeOutpay.value = [];
  dateRangeReview.value = [];
  
  handleChangeWithdrawl();
  handleChangeOutpay();
  handleChangeReview();
}
function handleExport() {
  let cloneData = deepCopy(queryParams.value);
  if (
    queryParams.value.statusArr &&
    queryParams.value.statusArr.length === 0 &&
    activeName.value === "1"
  ) {
    cloneData.statusArr = [
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
    ];
  } else if (
    queryParams.value.statusArr &&
    queryParams.value.statusArr.length === 0 &&
    activeName.value === "2"
  ) {
    cloneData.statusArr = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
    ];
  }
  proxy.download(
    "/system/fund/withdrawl/order/export",
    {
      ...cloneData,
    },
    `${i18n.global.t("funds.withdrawalRecord")}_${new Date().toLocaleDateString()}.xlsx`
  );
}

function openForceSuccessDia(row) {
  openForceSuccess.value = true;
  cloneRow.value = deepCopy(row);
}
function openThreePartylDia(row) {
  withdrawType.value = "three";
  openThreeOrManual.value = true;
  cloneRow.value = deepCopy(row);
}
function openManualDia(row) {
  withdrawType.value = "manual";
  openThreeOrManual.value = true;
  cloneRow.value = deepCopy(row);
}
function openRefuseBackDia(row) {
  openRefuseBack.value = true;
  cloneRow.value = deepCopy(row);
}
function openRefuseDia(row) {
  cloneRow.value = deepCopy(row);
  openRefuse.value = true;
}
function openDetailDia(row) {
  cloneRow.value = deepCopy(row);
  openDetail.value = true;
}
function openSplitOrderDia(row) {
  if(!row.splitFlag || row.splitFlag === '0') return 
  cloneRow.value = deepCopy(row);
  openSplitOrder.value = true;
}

watch(
  activeName,
  (newVal) => {
    if (newVal === "1") {
      statusArrList.value = dataStatus;
      queryParams.value.statusArr = [];
    } else {
      statusArrList.value = dataStatusAll;
      queryParams.value.statusArr = [];
    }
    handleQuery();
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.funds-record-withdraw {
  padding: 20px;
  padding-bottom: 10px;
  height: 100%;
  .download-btn {
    background: #f59a23;
    color: #fff;
  }
  .withdraw-table {
    // height: calc(100vh - 280px);
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
    justify-content: center;
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
