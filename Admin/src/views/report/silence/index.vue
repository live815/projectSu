<template>
  <div class="silence-member">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-form-item :label="$t('report.labelTypList')" prop="labelTypList" class="full-width">
            <el-select
                v-model="queryParams.labelTypList"
                :placeholder="$t('report.pleaseSelect')"
                class="full-width"
                multiple
                clearable
                collapse-tags
                collapse-tags-tooltip
            >
              <el-option
                  v-for="item in labelTypListArr"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="$t('report.userName')" prop="userName" class="full-width">
            <el-input
                v-model="queryParams.userName"
                :placeholder="$t('report.pleaseInput')"
                clearable
                class="full-width"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="$t('report.type')" prop="type" class="full-width">
            <el-select
                v-model="queryParams.type"
                :placeholder="$t('report.pleaseSelect')"
                clearable
                class="full-width"
            >
              <el-option
                  v-for="item in typeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item :label="$t('report.regTime')" class="full-width">
            <el-date-picker
                v-model="dateRange"
                value-format="YYYY-MM-DD HH:mm:ss"
                :default-time="defaultTime"
                type="datetimerange"
                range-separator="-"
                :start-placeholder="$t('report.regTimeBegin')"
                :end-placeholder="$t('report.regTimeEnd')"
                @change="handleChange"
                class="full-width"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="$t('report.parentName')" prop="parentName" class="full-width">
            <el-input
                v-model="queryParams.parentName"
                :placeholder="$t('report.pleaseInput')"
                clearable
                class="full-width"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="full-width">
            <el-button
                type="primary"
                icon="Search"
                @click="handleQuery"
            >{{ $t('report.search') }}</el-button
            >
            <el-button  icon="Refresh" @click="reset">{{ $t('report.reset') }}</el-button>
            <el-button
                icon="download"
                @click="handleExport"
                class="exoport-btn"
            >{{ $t('report.export') }}</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table ref="tableRef" :data="silenceMemberList" @filter-change="handleFilterChange" :empty-text="$t('report.noData')">
      <el-table-column :label="$t('report.userNameNoQuote')" align="center" prop="userName" width="140">
        <template #default="{ row }">
          <span>{{ row.userName ? row.userName : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('report.parentAnotherName')" align="center" prop="parentName" width="140">
      </el-table-column>
      <el-table-column
          class-name="filter-icon"
          :label="$t('member.accountStatus')"
          align="center"
          width="140"
          column-key="statusList"
          :filters="[
          { text: $t('member.regular'), value: '0' },
          { text: $t('member.loginLock'), value: '1' },
          { text: $t('member.rechargeWithdrawLock'), value: '2' },
          { text: $t('member.abandonWithdrawLock'), value: '3' },
          { text: $t('member.offerLock'), value: '4' },
          { text: $t('member.rebateLock'), value: '5' },
          { text: $t('member.gameLock'), value: '6' },
        ]">
        <template #default="{ row }">
          <div v-if="row.status" style="display:flex;flex-wrap: wrap;justify-content: center;">
            <el-tag v-for="item in row.status.split(',')"
                    :type="colorSwitch(item)" style="margin-right:4px;margin-bottom: 4px;">
              {{ statusSwitchToLabel(item) }}
            </el-tag>
          </div>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
          class-name="filter-icon"
          :label="$t('member.financeTierNoQuote')"
          align="center"
          width="140"
          column-key="financeTierList"
          :filters="financalList"
      >
        <template #default="{ row }">
          <span>{{ row.financeTierName ? row.financeTierName : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
          class-name="filter-icon"
          :label="$t('member.riskTierNoQuote')"
          align="center"
          width="140"
          column-key="riskControlTierList"
          :filters="riskList"
      >
        <template #default="{ row }">
          <span>{{ row.riskControlTierName ? row.riskControlTierName : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
          class-name="filter-icon"
          :label="$t('member.vipLevelNoQuote')"
          align="center"
          prop="vipLevel"
          column-key="vipLevelList"
          width="140"
          :filters="[
          { text: 'VIP0', value: '0' },
          { text: 'VIP1', value: '1' },
          { text: 'VIP2', value: '2' },
          { text: 'VIP3', value: '3' },
          { text: 'VIP4', value: '4' },
          { text: 'VIP5', value: '5' },
          { text: 'VIP6', value: '6' },
          { text: 'VIP7', value: '7' },
          { text: 'VIP8', value: '8' },
          { text: 'VIP9', value: '9' },
          { text: 'VIP10', value: '10' },
          { text: 'VIP11', value: '11' },
        ]"
      >
      </el-table-column>
      <el-table-column :label="$t('report.firstDpTime')" align="center" prop="firstDpTime" width="160">
      </el-table-column>
      <el-table-column :label="$t('report.regTimeNoQuote')" align="center" prop="regTime" width="160">
      </el-table-column>
      <el-table-column :label="$t('report.lastDpTime')" align="center" prop="lastDpTime" width="160">
      </el-table-column>
      <el-table-column :label="$t('report.remark')" align="center" prop="remark" width="140">
      </el-table-column>
      <el-table-column :label="$t('report.unLoginDay')" align="center" prop="unLoginDay" width="140">
      </el-table-column>
      <el-table-column :label="$t('report.unRechargeDay')" align="center" prop="unRechargeDay" width="140">
      </el-table-column>
      <el-table-column :label="$t('report.unBetDay')" align="center" prop="unBetDay" width="140">
      </el-table-column>
      <el-table-column :label="$t('report.rechargeAmount')" align="center" prop="rechargeAmount" width="140">
      </el-table-column>
      <el-table-column :label="$t('report.betAmount')" align="center" prop="betAmount" width="140">
      </el-table-column>
      <el-table-column :label="$t('report.platformWin')" align="center" prop="platformWin" width="140">
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
      style="height: 40px"
    />
  </div>
</template>

<script setup name="Silence-member">
import { onMounted, ref } from "vue";
import { getSilenceMemberList } from "@/api/report/analysismanage/index";
import i18n from "@/i18n";
import {colorSwitch, statusSwitchToLabel} from "@/views/member/list/common/common";
import { getRiskFinancalList } from "@/api/risk/level/index";

const { proxy } = getCurrentInstance();
const queryRef = ref(null);
const tableRef = ref(null);
const financalList = ref([]); //财务层级
const riskList = ref([]); // 风控层级
const filterCondition = ref({}); //表格筛选条件存储的对象

const unLoginDay7 = i18n.global.t("report.unLoginDay7");
const unLoginDay15 = i18n.global.t("report.unLoginDay15");
const unLoginDay30 = i18n.global.t("report.unLoginDay30");
const unRechargeDay7 = i18n.global.t("report.unRechargeDay7");
const unRechargeDay15 = i18n.global.t("report.unRechargeDay15");
const unRechargeDay30 = i18n.global.t("report.unRechargeDay30");
const unBetDay7 = i18n.global.t("report.unBetDay7");
const unBetDay15 = i18n.global.t("report.unBetDay15");
const unBetDay30 = i18n.global.t("report.unBetDay30");
const isFirstLoad = ref(true);
const labelTypListAll = [unLoginDay7, unLoginDay15, unLoginDay30, unRechargeDay7, unRechargeDay15, unRechargeDay30, unBetDay7, unBetDay15, unBetDay30];

const queryParams = ref({
  labelTypList: labelTypListAll,
  userName: null,
  type: null,
  regTimeBegin: null,
  regTimeEnd: null,
  parentName: null,
  pageNum: 1,
  pageSize: 10,
});
const total = ref(0);
const labelTypListArr = ref([
  { label: unLoginDay7, value: unLoginDay7 },
  { label: unLoginDay15, value: unLoginDay15 },
  { label: unLoginDay30, value: unLoginDay30 },
  { label: unRechargeDay7, value: unRechargeDay7 },
  { label: unRechargeDay15, value: unRechargeDay15 },
  { label: unRechargeDay30, value: unRechargeDay30 },
  { label: unBetDay7, value: unBetDay7 },
  { label: unBetDay15, value: unBetDay15 },
  { label: unBetDay30, value: unBetDay30 },
]);
const typeList = ref([
  { label: i18n.global.t("report.type0"), value: 0 },
  { label: i18n.global.t("report.type1"), value: 1 },
  { label: i18n.global.t("report.type2"), value: 2 },
]);
const dateRange = ref([]);
const defaultTime = [
  new Date(0, 0, 0, 0, 0, 0),
  new Date(0, 0, 0, 23, 59, 59),
]
const silenceMemberList = ref([]);

onMounted(async() => {
  if(isFirstLoad.value){
    await getList();
    isFirstLoad.value = false
  }
  queryFinancalList()
  queryRiskList()
});
const getList = () => {
  if(!queryParams.value.labelTypList.length) {
    queryParams.value.labelTypList = labelTypListAll;
  }
  return getSilenceMemberList({ ...queryParams.value, ...filterCondition.value }).then((res) => {
    silenceMemberList.value = res?.rows;
    total.value = res?.total;
  });
};
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
};
// 选择时间
function handleChange() {
  if ((dateRange.value && !dateRange.value.length) || dateRange.value == null) {
    queryParams.value.regTimeBegin = null;
    queryParams.value.regTimeEnd = null;
  } else {
    queryParams.value.regTimeBegin = dateRange.value[0];
    queryParams.value.regTimeEnd = dateRange.value[1];
  }
}
const handleExport = () => {
  // proxy.download(
  //   "system/user/export",
  //   {
  //     ...queryParams.value,
  //   },
  //   `玩家限制_${new Date().toLocaleDateString()}.xlsx`
  // );
};
const reset = () => {
  queryRef.value.resetFields();
  dateRange.value = [];
  handleChange();
  tableRef.value?.clearFilter();
  filterCondition.value = {};
  handleQuery();
};
//筛选条件，将条件存在全局变量
function handleFilterChange(val) {
  for (const key in val) {
    if (val.hasOwnProperty(key)) {
      filterCondition.value[key] = val[key];
    }
  }
  getList();
}
//查询财务层级
function queryFinancalList(){
  return getRiskFinancalList(1).then(res=>{
    financalList.value = res || [];
    financalList.value = filterLevel(financalList.value);
  })
}
//查询风控层级
function queryRiskList(){
  return getRiskFinancalList(2).then(res=>{
    riskList.value = res || [];
    riskList.value = filterLevel(riskList.value);
  })
}
function filterLevel(list){
  list.forEach(item=>{
    item.text = item.layerName
    item.value = item.id
  })
  return list
}
onActivated(async()=>{
  if(!isFirstLoad.value){
    await getList();
  }
})
</script>

<style lang="scss" scoped>
.silence-member {
  padding: 20px;
  :deep(.el-pagination) {
    right: 20px;
  }
  :deep() {
    .filter-icon .el-icon {
      content: url("../../../assets/icons/svg/filter.svg") !important;
    }
  }
}
</style>
