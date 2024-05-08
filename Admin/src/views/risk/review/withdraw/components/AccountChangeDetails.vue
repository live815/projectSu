<template>
  <div class="dialog-account-change-detail" v-loading="loading">
    <!-- 会员账变记录 -->
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item :label="$t('risk.accountChangeTime')" class="full-width">
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
        <el-col :span="6">
          <el-form-item :label="$t('risk.orderNoQuote')" prop="orderNo" class="full-width">
            <el-input
              v-model="queryParams.orderNo"
              :placeholder="$t('risk.pleaseInput')"
              style="width: 100%"
              clearable
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item
            :label="$t('risk.bussinessType')"
            prop="bizTypeList"
            class="full-width"
          >
            <el-select
              v-model="queryParams.bizTypeList"
              :placeholder="$t('risk.pleaseSelect')"
              multiple
              clearable
              collapse-tags
              collapse-tags-tooltip
              class="full-width"
            >
              <el-option
                v-for="dict in bizTypeList"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item :label="$t('risk.accountChangeType')" prop="subBizTypeList" class="full-width">
            <el-select
              v-model="queryParams.subBizTypeList"
              :placeholder="$t('risk.pleaseSelect')"
              multiple
              clearable
              collapse-tags
              collapse-tags-tooltip
              class="full-width"
            >
              <el-option
                v-for="dict in fund_transaction_sub_biz_type"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('risk.accountChangeAmount')" class="full-width">
            <el-col :span="11">
              <el-form-item prop="changeAmtStart" class="full-width">
                <el-input
                  v-model="queryParams.changeAmtStart"
                  :placeholder="$t('risk.pleaseInputMinAmount')"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <span style="display: flex; justify-content: center">-</span>
            </el-col>
            <el-col :span="11">
              <el-form-item prop="changeAmtEnd" class="full-width">
                <el-input
                  v-model="queryParams.changeAmtEnd"
                  :placeholder="$t('risk.pleaseInputMaxAmount')"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item class="full-width">
            <el-button type="primary" icon="Search" @click="handleQuery"
              >{{ $t('risk.search') }}</el-button
            >
            <el-button icon="Refresh" @click="resetQuery">{{ $t('risk.reset') }}</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 表格数据 -->
    <el-table :data="tableData" :empty-text="$t('risk.noData')">
      <el-table-column :label="$t('risk.serialNumber')" width="55" type="index" align="center">
        <template #default="scope">
          <span>{{
            (queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('risk.relationOrderNo')"
        prop="orderNo"
        align="center"
        width="190"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        :label="$t('risk.userNameInformation')"
        align="center"
        width="190"
        :show-overflow-tooltip="false"
      >
        <template #default="{ row }">
          <template v-if="row.userName || row.vipLevel">
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
        :show-overflow-tooltip="false"
        width="140"
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
        :label="$t('risk.bussinessTypeNoQuote')"
        prop="bizType"
        align="center"
        width="110"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ commonSwitch(bizTypeList, row.bizType) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('risk.accountChangeTypeNoQuote')"
        prop="subBizType"
        align="center"
        width="170"
        :show-overflow-tooltip="false"
        >
        <template #default="{ row }">
          <span>{{ commonSwitch(fund_transaction_sub_biz_type, row.subBizType) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('risk.transactionTypeNoQuote')"
        prop="transactionType"
        align="center"
        width="170"
        :show-overflow-tooltip="false"
      >
        <template #default="{ row }">
          <span v-if="row.transactionType === 0">{{ $t('risk.income') }}</span>
          <span v-else-if="row.transactionType === 1">{{ $t('risk.expenditure') }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('risk.accountChangeBeforeBalance')"
        prop="beforeBalance"
        align="center"
        width="170"
        :show-overflow-tooltip="false"
      >
        <template #default="{ row }">
          <span>{{
            formatNumber(row.beforeBalance)
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('risk.accountChangeAmountNoQuote')"
        prop="changeAmt"
        align="center"
        width="170"
        :show-overflow-tooltip="false"
      >
        <template #default="{ row }">
          <span>{{
            formatNumber(row.changeAmt)
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('risk.accountChangeAfterBalance')"
        prop="afterBalance"
        align="center"
        width="170"
        :show-overflow-tooltip="false"
      >
        <template #default="{ row }">
          <span>{{
            formatNumber(row.afterBalance)
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('risk.accountChangeTimeNoQuote')"
        align="center"
        width="220"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ row.changeTime ? row.changeTime : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('risk.remarkNoQuote')"
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
import { getCurrentInstance, onMounted } from "vue";
import { getChangeRecordList } from "@/api/member/change/index";
import { formatNumber } from "@/utils/index";
import { defaultTime, shortcuts } from "@/utils/config";
import { memberDepositList,memberWithdrawList,proxyDepositList,walletTransferList
  ,memberGameList,memberRebateList,memberProfitList,otherList,profitReleaseList,liveGiftsList} from "@/views/member/change/common/common";

const props = defineProps(["userName"])
const { proxy } = getCurrentInstance();
const { fund_transaction_sub_biz_type } = proxy.useDict("fund_transaction_sub_biz_type")
const queryRef = ref(null);
const queryParams = ref({
  userName: props.userName, //会员账号
  orderNo: null, //订单号
  vipLevel: null, //vip等级
  vipLevelName: [],
  financeTierId: null, //财务层级
  riskTierId: null, //风控层级
  bizTypeList: [], //业务类型
  subBizTypeList: null, //子业务类型
  changeAmtStart: null, //最小转账金额
  changeAmtEnd: null, //最大转账金额
  changeTimeStart: null, //账变开始时间
  changeTimeEnd: null, //账变结束时间
  pageNum: 1,
  pageSize: 10,
});
const bizTypeList = ref([
  {
    label: i18n.global.t('member.memberDeposit'),
    value: 1
  },
  {
    label: i18n.global.t('member.memberWithdraw'),
    value: 2
  },
  // {
  //   label: "代理代存",
  //   value: 9
  // },
  {
    label: i18n.global.t('risk.walletTransferEachOther'),
    value: 3
  },
  {
    label: i18n.global.t('member.memberGame'),
    value: 4
  },
  {
    label: i18n.global.t('member.memberRebate'),
    value: 5
  },
  {
    label: i18n.global.t('member.memberProfits'),
    value: 6
  },
  {
    label: i18n.global.t('member.otherAdjust'),
    value: 7
  },
  // {
  //   label: "红利发放",
  //   value: 10
  // },
  {
    label: i18n.global.t('member.livingGifts'),
    value: 8
  }
])
const dataList = ref({
  1:memberDepositList,
  2:memberWithdrawList,
  9:proxyDepositList,
  3:walletTransferList,
  4:memberGameList,
  5:memberRebateList,
  6:memberProfitList,
  7:otherList,
  10:profitReleaseList,
  8:liveGiftsList
})

const dateRange = ref([]);
const tableData = ref([]);
const total = ref(0);
const loading = ref(false);
const accountList = computed(()=>{
  return queryParams.value.bizTypeList.flatMap(option=>dataList.value[option])
})

onMounted(async () => {
  await getList();
});
// 选择时间
function handleChange() {
  if ((dateRange.value && !dateRange.value.length) || dateRange.value == null) {
    queryParams.value.changeTimeStart = null;
    queryParams.value.changeTimeEnd = null;
  } else {
    queryParams.value.changeTimeStart = dateRange.value[0];
    queryParams.value.changeTimeEnd = dateRange.value[1];
  }
}
function getList() {
  loading.value = true;
  return getChangeRecordList(queryParams.value)
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
  dateRange.value = [];
  handleChange();
}
function commonSwitch(list, val) {
  let bizTypeItem = list.find((item) => item.value == val);
  return bizTypeItem ? bizTypeItem.label : "-";
}
function businessChange(val){
  queryParams.value.subBizTypeList = accountList.value.filter
  (data=>queryParams.value.subBizTypeList.includes(data.value)).map(item=>item.value)
}
</script>

<style lang="scss" scoped>
.dialog-account-change-detail {
  .download-btn {
    background: #f59a23;
    color: #fff;
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
