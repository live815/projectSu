<template>
  <div class="wait-review-index" v-loading="loading">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item :label="$t('risk.withdrawTime')" class="full-width">
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
        <el-col :span="4">
          <el-form-item :label="$t('risk.userName')" prop="userName" class="full-width">
            <el-input v-model="queryParams.userName" :placeholder="$t('risk.pleaseInput')" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('risk.withdrawNo')" prop="orderNo" class="full-width">
            <el-input v-model="queryParams.orderNo" :placeholder="$t('risk.pleaseInput')" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('risk.riskType')" prop="riskTypes" class="full-width">
            <el-select
              v-model="queryParams.riskTypes"
              multiple
              :placeholder="$t('risk.pleaseSelect')"
              clearable
              class="full-width"
              collapse-tags
              collapse-tags-tooltip
            >
              <el-option
                v-for="dict in riskTypeList"
                :key="dict.id"
                :label="dict.ruleName"
                :value="dict.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('risk.financialTier')" prop="financeTier" class="full-width">
            <el-select
              v-model="queryParams.financeTier"
              multiple
              :placeholder="$t('risk.pleaseSelect')"
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
          <el-form-item :label="$t('risk.riskControlTier')" prop="riskControlTier" class="full-width">
            <el-select
              v-model="queryParams.riskControlTier"
              multiple
              :placeholder="$t('risk.pleaseSelect')"
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
        <el-col :span="5">
          <el-form-item :label="$t('risk.withdrawAmountQuote')" class="full-width">
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
        <el-col :span="8">
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

    <el-row :gutter="10">
      <el-col :span="4" class="flex-refresh">
        <span class="refresh-title">{{ $t('risk.autoRefresh') }}</span>
        <el-select v-model="refreshTime" :placeholder="$t('risk.pleaseSelect')" clearable>
          <el-option
            v-for="dict in refreshTimeList"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-col>
      <el-col :span="4" class="flex-refresh">
        <div>
          <span class="refresh-title">{{ $t('risk.dataUpdateTime') }}</span>
          <span class="refresh-title">{{ updateTime || "-" }}</span>
        </div>
      </el-col>
      <el-col :span="16" style="text-align: right">
        <span class="mr-4 refresh-title">{{ $t('risk.recieveOrderSwitch') }}</span>
        <el-switch v-model="orderStatus" :active-value="1" :inactive-value="0"
          @click="changeStatus"></el-switch>
        <span class="ml-12 refresh-title">{{ $t('risk.multipleOperate') }}</span>
        <el-select v-model="multiOperate" :placeholder="$t('risk.pleaseSelect')" clearable>
          <el-option
            v-for="dict in multiOperateList"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
        <el-button
          type="primary"
          @click="multipleOperate"
          :disabled="
            (orderNos && !orderNos.length) ||
            (multiOperate !== '3' &&
            multiOperate !== '1'&&
            multiOperate !=='2')
          "
          >{{ $t('risk.elepmemnt') }}</el-button
        >
      </el-col>
    </el-row>
    <!-- 表格数据 -->
    <el-table :data="tableData" max-height="350" style="margin-top: 20px;" @selection-change="handleSelectionChange"
    :empty-text="$t('risk.noData')">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column :label="$t('risk.serialNumber')" width="55" type="index" align="center">
        <template #default="scope">
          <span>{{
            (queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('risk.handle')"
        align="center"
        width="90"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <el-button
            type="primary"
            size="small"
            @click="openReview(row)"
            >{{ $t('risk.review') }}</el-button
          >
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('risk.withdrawNoNoQuote')"
        align="center"
        width="260"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ row.orderNo ? row.orderNo : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('risk.withdrawTimeNoQuote')"
        align="center"
        width="240"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ row.createTime ? row.createTime : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('risk.userNameInformation')"
        align="center"
        width="180"
        :show-overflow-tooltip="true"
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
        width="180"
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
        :label="$t('risk.withdrawAmountNoQuote')"
        prop="amount"
        align="center"
        width="110"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span v-if="row.orderType === '0'">{{
            formatNumber(row.amount)
          }}</span>
          <div v-else>
            <div>
              <span>{{ $t('risk.withdrawAmountQuote') }}</span>
              <span>{{
                formatNumber(row.amount)
              }}</span>
            </div>
            <div>
              <span>{{ $t('risk.rate') }}</span>
              <span>{{ row.rate ? row.rate : "-" }}</span>
            </div>
            <div>
              <span>{{ $t('risk.usdtNumber') }}</span>
              <span>{{ row.usdtNum ? row.usdtNum : "-" }}</span>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('risk.withdrawMethod')"
        align="center"
        width="180"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span v-if="row.wdWayType==='0'">{{ $t('risk.bankcardWithdraw') }}</span>
          <span v-else-if="row.wdWayType==='1'">{{ $t('risk.personalWithdraw') }}</span>
          <span v-else-if="row.wdWayType==='2'">{{ $t('risk.usdtWithdraw') }}</span>
          <span v-else-if="row.wdWayType==='3'">{{ $t('risk.EBWithdraw') }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('risk.withdrawType')"
        align="center"
        width="180"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span v-if="row.wdType==='0'">{{ $t('risk.normalWithdraw') }}</span>
          <span v-else-if="row.wdType==='1'">{{ $t('risk.largeWithdraw') }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('risk.orderUpdateTime')" align="center" width="240">
        <template #default="{ row }">
          <span>{{ row.updateTime || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('risk.reviewStatusNoQuote')"
        prop="status"
        align="center"
        width="110"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span style="color: #f59a23">{{ $t('risk.riskControlWaitReview') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('risk.riskTypeNoQuote')"
        align="center"
        width="240"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <template v-if="row.programNames">
            <el-tag class="tag-mr-4" type="success" v-for="item in row.programNames.split(',')">{{ item }}</el-tag>
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
    <DetailDialog
      v-model:open="open"
      :cloneRow="cloneRow"
      v-if="open"
      :type="type"
      @onrefresh="getList"
    />
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import {
  getCurrentInstance,
  onMounted,
  onUnmounted,
  watch,
} from "vue";
import DetailDialog from "./DetailDialog.vue";
import { getWithdrawlOrderList,getMulReviewOrder,getCurrentUserSwitch,updateCurrentUserSwitch } from "@/api/risk/review/index";
import { filterLabel,formatNumber } from "@/utils/index";
import { getConfigList,eidtConfigList } from "@/api/risk/config/index";
import useUserStore from '@/store/modules/user';
import { defaultTime, shortcuts } from "@/utils/config";
import usePermissionStore from "@/store/modules/permission";

const props = defineProps(["financalList","riskList","riskTypeList"]);
const { proxy } = getCurrentInstance();
const store = useUserStore();
const queryRef = ref(null);
const queryParams = ref({
  userName:null, // 会员账号
  orderNo:null, // 提现单号
  riskTypes:[], // 风险类型
  financeTier:[], // 财务层级
  riskControlTier:[], // 风控层级
  beginAmount:null, //提现金额最小值
  endAmount:null, //提现金额最大值
  status: 0,
  beginTime: null,
  endTime: null,
  pageNum: 1,
  pageSize: 10,
});
const refreshTime = ref(null);
const updateTime = ref(null);
const multiOperate = ref(null);
const orderNos = ref([]);
const refreshTimeList = ref([
  {
    label: i18n.global.t("risk.oneMinitus"),
    value: 4,
  },
  {
    label: i18n.global.t("risk.fiveMinitus"),
    value: 0,
  },
  {
    label: i18n.global.t("risk.fivteenMinitus"),
    value: 1,
  },
  {
    label: i18n.global.t("risk.thirtyMinitus"),
    value: 2,
  },
  {
    label: i18n.global.t("risk.abandon"),
    value: 3,
  },
]);
const multiOperateList = ref([
  {
    label: i18n.global.t("risk.pass"),
    value: "3",
  },
  {
    label: i18n.global.t("risk.holdOn"),
    value: "1",
  },
  {
    label: i18n.global.t("risk.reject"),
    value: "2",
  }
]);
const dateRange = ref([]);
const orderStatus = ref(null); //接单开关
const tableData = ref([]);
const total = ref(0);
const loading = ref(false);
const open = ref(false);
const cloneRow = ref(null);
const type = ref(null); //编辑审核或者查看审核详情
const isFirstLoad = ref(true);


function getList() {
  loading.value = true;
  return getWithdrawlOrderList(queryParams.value)
    .then((res) => {
      loading.value = false;
      tableData.value = res.rows || [];
      total.value = res.total || 0;
      updateTime.value = new Date().toLocaleString();
    })
    .catch(() => {
      loading.value = false;
    });
}
function queryRecieveOrderSwitch(){
  return getCurrentUserSwitch(store.userInfo.userName).then(res=>{
   orderStatus.value =  res;
  })
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
    "/system/risk/withdrawl/order/listExcel",
    {
      ...queryParams.value,
    },
    `${i18n.global.t("risk.reserveWithdrawWaitReviewList")}${new Date().toLocaleDateString()}.xlsx`
  );
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
function changeStatus(){
  proxy.$modal.confirms(i18n.global.t("risk.sureToChangeStatus"), i18n.global.t("risk.tips")).then(()=>{
    updateCurrentUserSwitch(store.userInfo.userName,orderStatus.value).then(res=>{
      queryRecieveOrderSwitch();
      proxy.$modal.msgSuccess(i18n.global.t("risk.operateSuccessfully"))
  })
  }).catch(()=>{
    orderStatus.value = orderStatus.value===0?1:0
  })
}
function multipleOperate() {
  // if (multiOperate.value === "3") {
  //   type.value = "multi-success";
  //   open.value = true;
  // } else if (multiOperate.value === "1") {
  //   type.value = "multi-wait";
  //   open.value = true;
  // } else if (multiOperate.value === "2") {
  //   type.value = "multi-fail";
  //   open.value = true;
  // }
  getMulReviewOrder({
    type:multiOperate.value,
    orderNos:orderNos.value
  }).then(res=>{
    proxy.$modal.msgSuccess(i18n.global.t("risk.operateSuccessfully"));
    getList();
    //搁置、通过、或者通过,操作成功之后去刷新提现风控审核未读数
    usePermissionStore().getRiskUnreview();
  })
}
function handleSelectionChange(selection) {
  orderNos.value = selection.map((item) => item.orderNo);
}
function openReview(row) {
  type.value = "edit";
  cloneRow.value = JSON.parse(JSON.stringify(row));
  open.value = true;
}
const timer = ref(null);
function startInterval(time) {
  timer.value = setInterval(() => {
    getList();
  }, time);
}
function stopInterval() {
  timer.value && clearInterval(timer.value);
  timer.value = null;
}
function freshData(val){
  if (val === 0) {
    stopInterval();
    startInterval(1000*60*5);
  } else if (val === 1) {
    stopInterval();
    startInterval(1000*60*15);
  } else if (val === 2) {
    stopInterval();
    startInterval(1000*60*30);
  }else if(val === 4){
    stopInterval();
    startInterval(1000*60*1);
  } else {
    stopInterval();
  }
}
onMounted(async () => {
  await queryRecieveOrderSwitch();
  if(isFirstLoad.value){
    await getList();
    isFirstLoad.value = false
  }
});
onUnmounted(() => {
  stopInterval();
});
onActivated(async()=>{
  if(!isFirstLoad.value){
    await queryRecieveOrderSwitch();
    await getList();
    freshData(refreshTime.value);
  }
})
onDeactivated(()=>{
  stopInterval();
})

watch(refreshTime, (val) => {
  freshData(val)
});
defineExpose({
  handleQuery
})
</script>

<style lang="scss" scoped>
.wait-review-index {
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
  .tag-mr-4{
    margin-right:4px;
  }
}
</style>
