<template>
  <div class="funds-review-recharge-recieve" v-loading="loading">
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
        <!-- <el-col :span="8">
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
        </el-col> -->
        <el-col :span="8">
          <el-form-item :label="$t('funds.applicationTimeQuote')" class="full-width">
            <el-date-picker
              v-model="dateRangeApply"
              value-format="YYYY-MM-DD HH:mm:ss"
              type="datetimerange"
              range-separator="-"
              :start-placeholder="$t('funds.beginTime')"
              :end-placeholder="$t('funds.endTime')"
              @change="handleChangeApply"
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
          <el-form-item :label="$t('funds.operApplicantQuote')" prop="reorderApplicant" class="full-width">
            <el-input
              v-model="queryParams.reorderApplicant"
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
        <el-col :span="6">
          <el-form-item class="full-width">
            <el-button type="primary" icon="Search" @click="handleQuery"
              >{{ $t('funds.search') }}</el-button
            >
            <el-button icon="Refresh" @click="resetQuery">{{ $t('funds.reset') }}</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-row :gutter="10">
      <el-col :span="4" class="flex-refresh">
        <span class="refresh-title">{{ $t('funds.autoRefresh') }}</span>
        <el-select v-model="refreshTime" :placeholder="$t('funds.pleaseSelect')" clearable>
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
          <span class="refresh-title">{{ $t('funds.dataUpdateTime') }}</span>
          <span class="refresh-title">{{ updateTime||"-" }}</span>
        </div>
      </el-col>
    </el-row>
    <!-- 表格数据 -->
    <el-table :data="tableData" style="margin-top: 20px" :empty-text="$t('funds.noData')">
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
        width="140"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <el-button
            type="primary"
            size="small"
            @click="openReview(row)"
            v-hasPermi="['deposit:order:approve']"
            >{{$t('funds.review')}}</el-button
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
        :show-overflow-tooltip="true"
        width="130"
      >
        <template #default="{ row }">
          <template v-if="row.financeTierName || row.riskTierName">
            <div>
              <span>{{$t('funds.financialTierQuote')}}</span>
              <span>{{ row.financeTierName ? row.financeTierName : "-" }}</span>
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
        width="180"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span v-if="row.orderType === '0'">{{
            formatNumber(row.amount)
          }}</span>
          <div v-else>
            <div>
              <span>充值金额:</span>
              <span>{{
                formatNumber(row.amount)
              }}</span>
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
        :label="$t('funds.rechargeInformation')" 
        align="center"
        width="180"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <template v-if="row.realName || row.channelTypeName || row.mchName">
            <div>
              <span>{{ $t('funds.rechargeNameQuote') }}</span>
              <span>{{ row.realName ? row.realName : "-" }}</span>
            </div>
            <div>
              <span>{{ $t('funds.channelType') }}</span>
              <span>{{ row.channelTypeName ? row.channelTypeName : "-" }}</span>
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
        :label="$t('funds.reorderAmountNoQuote')" 
        align="center"
        width="180"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <template v-if="row.addPercent || row.reorderBounsAmt">
            <div>
              <span>{{ $t('funds.reorderAmount') }}</span>
              <span>{{ formatNumber(row.reorderAmt) }}</span>
            </div>
            <div>
              <span>{{ $t('funds.addBonus') }}</span>
              <span>{{
                formatNumber(row.reorderBounsAmt)
              }}</span>
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
          <span style="color: #f59a23">{{ $t('funds.reorderWaitReview') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.addDetail')"
        align="center"
        width="180"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <template v-if="row.addPercent || row.reorderBounsAmt">
            <div>
              <span>{{ $t('funds.addPercent') }}</span>
              <span>{{ row.addPercent ? row.addPercent + "%" : "-" }}</span>
            </div>
            <div>
              <span>{{ $t('funds.addBonus') }}</span>
              <span>{{
                formatNumber(row.reorderBounsAmt)
              }}</span>
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
          <span
            style="color: #02a7f0; cursor: pointer"
            @click="checkDetail(row)"
            >{{ $t('funds.checkDetails') }}</span
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
              <span>{{ $t('funds.rechargeTimeNoquote') }}</span>
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
      <el-table-column
        :label="$t('funds.makeUpOrderApplication')"
        align="center"
        width="240"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <template v-if="row.reorderApplicant  || row.reorderApplicantTime  || row.reorderApprovalMark">
            <div>
              <span>{{ $t('funds.operApplicant') }}:</span>
              <span>{{ row.reorderApplicant  ? row.reorderApplicant  : "-" }}</span>
            </div>
            <div>
              <span>{{ $t('funds.applicationTime') }}:</span>
              <span>{{ row.reorderApplicantTime   ? row.reorderApplicantTime   : "-" }}</span>
            </div>
            <div>
              <span>{{ $t('funds.reorderApplicantMark') }}</span>
              <span>{{ row.reorderApplicantMark ? row.reorderApplicantMark : "-" }}</span>
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
    <RecieveDialog
      v-model:open="open"
      v-model:cloneRow="cloneRow"
      v-if="open"
      :type="type"
      @approveRefresh="getList"
    />
    <AttachmentDetail
      v-model:openAttachment="openAttachment"
      v-if="openAttachment"
      v-model:cloneRow="cloneRow"
    />
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import {
  getCurrentInstance,
  onBeforeMount,
  onMounted,
  onUnmounted,
  watch,
} from "vue";
import RecieveDialog from "./RecieveDialog.vue";
import AttachmentDetail from "./AttachmentDetail.vue";
import { getOrderList } from "@/api/funds/record/index";
import { formatNumber } from "@/utils/index";
import { defaultTime, shortcuts } from "@/utils/config";

const props = defineProps(["vipLevelList","rechargeTypeList","channelTypeIdList","riskList","financalList"])
const { proxy } = getCurrentInstance();
// const { sys_sports_type } = proxy.useDict("sys_sports_type");
const queryRef = ref(null);
const queryParams = ref({
  userName:null, //会员账号
  realName:null, //充值人姓名
  orderNo:null, //充值订单号
  orderRelno:null, //关联订单号
  reorderApplicant:null, //申请人
  vipLevels: [], //VIP等级
  channelTypeId: null, //通道类型
  mchId: null, //商户
  statusArr: ["2"],
  arrivalStartTime: null, //到账开始时间
  arrivalEndTime: null, //到账结束时间
  depositStartTime:null, //充值开始时间
  depositEndTime:null, //充值结束时间
  applicantStartTime:null, //申请开始时间
  applicantEndTime:null, //申请结束时间
  pageNum: 1,
  pageSize: 10,
});
const refreshTime = ref(null);
const updateTime = ref(null);
const refreshTimeList = ref([
  {
    label: i18n.global.t("risk.oneMinitus"),
    value: 4,
  },
  {
    label: i18n.global.t("funds.fiveMin"),
    value: 0,
  },
  {
    label: i18n.global.t("funds.fivteenMin"),
    value: 1,
  },
  {
    label: i18n.global.t("funds.thirtyMin"),
    value: 2,
  },
  {
    label: i18n.global.t("funds.abandon"),
    value: 3,
  },
]);
const dateRangeRecharge = ref([]); //充值时间
const dateRangeArrival = ref([]); //到账时间
const dateRangeApply = ref([]); //申请时间
const tableData = ref([]);
const total = ref(0);
const loading = ref(false);
const open = ref(false);
const cloneRow = ref(null);
const openAttachment = ref(false); //打开附件详情
const type = ref(null); //编辑审核或者查看审核详情
const isFirstLoad = ref(true);

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
function handleChangeApply(){
  if ((dateRangeApply.value && !dateRangeApply.value.length) || dateRangeApply.value == null) {
    queryParams.value.applicantStartTime = null;
    queryParams.value.applicantEndTime = null;
  } else {
    queryParams.value.applicantStartTime = dateRangeApply.value[0];
    queryParams.value.applicantEndTime = dateRangeApply.value[1];
  }
}
function getList() {
  loading.value = true;
  return getOrderList(queryParams.value)
    .then((res) => {
      loading.value = false;
      tableData.value = res.rows || [];
      total.value = res.total;
      updateTime.value = new Date().toLocaleString();
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
  dateRangeArrival.value = [];
  dateRangeRecharge.value = [];
  dateRangeApply.value = [];
  handleChangeRecharge();
  handleChangeArrival();
  handleChangeApply();
}
function openReview(row) {
  type.value = "edit";
  cloneRow.value = JSON.parse(JSON.stringify(row));
  open.value = true;
}
function checkDetail(row) {
  openAttachment.value = true;
  cloneRow.value = JSON.parse(JSON.stringify(row));
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
</script>

<style lang="scss" scoped>
.funds-review-recharge-recieve {
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
