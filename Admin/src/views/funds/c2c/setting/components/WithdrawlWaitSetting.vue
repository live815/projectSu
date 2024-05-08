<template>
  <div class="withdrawl-wait-setting">
    <el-form
        :model="queryParams"
        label-position="right"
        ref="queryRef"
        :rules="rules"
      >
    <div class="withdrawl-switch">
      <span class="title mr-16">{{ $t("funds.withdrawalRiskManagementSwitch") }}</span>
      <el-switch
        v-model="queryParams.riskSwitch"
        active-value="0"
        inactive-value="1"
        class="mr-16"
      ></el-switch>
      <el-button type="danger" v-if="!isEdit" @click="isEdit = !isEdit"
        >{{ $t("funds.config") }}</el-button
      >
      <el-button type="danger" v-if="isEdit" @click="cancel"
        >{{ $t("funds.cancel") }}</el-button
      >
      <el-button type="danger" v-if="isEdit" @click="saveConfig"
        >{{ $t("funds.save") }}</el-button
      >
      <div class="wait-tip">
        {{ waitTip }}
      </div>
    </div>
    <div class="attend-member">
      <div class="title">{{ $t("funds.joinMember") }}</div>
      <div class="vip-level">
        <span class="mr-20"><span>*</span>{{ $t("funds.vipLevel") }}</span>
        <el-checkbox
          v-model="checkAll"
          :indeterminate="isIndeterminate"
          @change="handleCheckAllChange"
          >{{ $t("funds.all") }}</el-checkbox
        >
        <el-checkbox-group
          v-model="queryParams.vipLevelItem"
          @change="handleSingleChange"
          class="ml-20"
        >
          <el-checkbox
            v-for="item in vipLevelList"
            :label="item.vipLevel"
            :key="item.vipLevel"
          >
            {{ item.vipName }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="last-time mb-20">
        <!-- <span class="mr-8 label-13">{{ contentLastTime }}</span> -->
        <el-form-item :label="contentLastTime" prop="betweenLdpAndCurrwdTime">
          <el-input v-model="queryParams.betweenLdpAndCurrwdTime" :placeholder="$t('funds.pleaseInput')" clearable>
            <template #append>
              <span>{{ $t('funds.minitus') }}</span>
            </template>
          </el-input>
        </el-form-item>
      </div>
      <div class="average-bate mb-20">
        <el-form-item :label="contentAverageBate" prop="avgmulOfValidbets">
          <!-- <span class="mr-8 label-13">{{ contentAverageBate }}</span> -->
          <el-input
            v-model="queryParams.avgmulOfValidbets"
            :placeholder="$t('funds.pleaseInput')"
            clearable
          >
            <template #append>
              <span>{{ $t('funds.multipePercent') }}</span>
            </template>
          </el-input>
        </el-form-item>
      </div>
      <div class="wait-hour mb-20">
        <el-form-item :label="contentWaitTime" prop="orderHoldHours">
          <!-- <span class="mr-8 label-13">{{ contentWaitTime }}</span> -->
          <el-input v-model="queryParams.orderHoldHours" :placeholder="$t('funds.pleaseInput')" clearable>
            <template #append>
              <span>{{ $t('funds.hours') }}</span>
            </template>
          </el-input>
          <el-form-item prop="autoWithdrawalSwitch">
          <span class="ml-16 label-13">{{ contentAutoWithdrawl }}</span>
          <el-switch
            v-model="queryParams.autoWithdrawalSwitch"
            active-value="0"
            inactive-value="1"
          ></el-switch>
          <span class="ml-16 label-blue">{{ switchTip }}</span>
        </el-form-item>
        </el-form-item>
        
      </div>
      <span class="label-13">{{ lastPercent }}</span>
      <div class="add-btn mt-12 mb-12">
        <el-button type="primary" size="default" @click="add">{{ $t('funds.add') }}</el-button>
      </div>
    </div>
    </el-form>
    <el-table :data="tableData" :empty-text="$t('member.noData')">
      <el-table-column :label="$t('funds.serialNumber')" width="55" type="index" align="center">
        <template #default="scope">
          <span>{{
            (queryParamsTable.pageNum - 1) * queryParamsTable.pageSize + scope.$index + 1
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.deposit')"
        prop="mchName"
        align="center"
        :show-overflow-tooltip="true"
      >
      <template #default="{row}">
        <span>{{ row.lastDpMin||row.lastDpMin===0?row.lastDpMin+$t('funds.contain'):"-" }}</span>
        <span>~</span>
        <span>{{ row.lastDpMax||row.lastDpMax===0?row.lastDpMax+$t('funds.contain'):"-" }}</span>
      </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.withdrawalRatio')"
        prop="channelTypeName"
        align="center"
        :show-overflow-tooltip="true"
      >
      <template #default="{row}">
        <span>{{ row.wdRatioMin||row.wdRatioMin===0?row.wdRatioMin+$t('funds.containPercent'):"-" }}</span>
        <span>~</span>
        <span>{{ row.wdRatioMax||row.wdRatioMax===0?row.wdRatioMax+$t('funds.containPercent'):"-" }}</span>
      </template>
      </el-table-column>
      <el-table-column :label="$t('funds.handle')" width="180" align="center">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="edit(row)"
            >{{ $t('funds.edit') }}</el-button
          >
          <el-button type="danger" size="small" @click="del(row)"
            >{{ $t('funds.delete') }}</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="queryParamsTable.pageNum"
      v-model:limit="queryParamsTable.pageSize"
      @pagination="queryDwRatioList"
    />
    <HistoryTableData ref="history" />
    <AddOrEditSettingDia
      v-model:open="open"
      :type="type"
      :id="id"
      @onrefresh="queryDwRatioList"
      v-if="open"
    />
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { getVIPList } from "@/api/funds/config/index";
import { getCurrentInstance, onMounted } from "vue";
import AddOrEditSettingDia from "./AddOrEditSettingDia.vue";
import HistoryTableData from "./HistoryTableData.vue";
import {getConfigInfo,editConfig,delDwRatio,getDwRatioList } from "@/api/funds/c2c/index";

const { proxy } = getCurrentInstance();
const isEdit = ref(false); //能否配置
const checkAll = ref(false); //vip多选
const isIndeterminate = ref(false);
const vipLevelList = ref([]); //vip等级列表
const waitTip = ref(
  i18n.global.t('funds.waitTip')
);
const contentLastTime = ref(i18n.global.t('funds.lastTimeTip'));
const contentAverageBate = ref(i18n.global.t('funds.averageBateTip'));
const contentWaitTime = ref(i18n.global.t('funds.withdrawalDataHold'));
const contentAutoWithdrawl = ref(i18n.global.t('funds.autoWithdrawal'));
const switchTip = ref(i18n.global.t('funds.noNeedHandleByperson'));
const lastPercent = ref(i18n.global.t('funds.lastDepositRatio'));
const queryRef = ref(null);
const queryParams = ref({
  riskSwitch:"0",
  vipLevelItem: [], // 勾选中的等级
  vipLevel:null,
  betweenLdpAndCurrwdTime: null,
  avgmulOfValidbets: null,
  orderHoldHours: null,
  autoWithdrawalSwitch: "0",
});
const rules = ref({
  betweenLdpAndCurrwdTime:[{
      pattern: /^[1-9]\d*$/,
      message: i18n.global.t('funds.positiveInteger'),
      trigger: "blur",
    }],
  avgmulOfValidbets:[{
      pattern: /^\d{1,2}$/,
      message: i18n.global.t('funds.twoPositiveInteger'),
      trigger: "blur",
    }],
  orderHoldHours:[{
      pattern: /^\d*\.?\d+$/,
      message: i18n.global.t('funds.positiveAndDecimal'),
      trigger: "blur",
    }]
});
const queryParamsTable = ref({
  pageNum: 1,
  pageSize: 10,
});
const total = ref(0);
const tableData = ref([]);
const open = ref(false);
const type = ref(null);
const id = ref(null);
const history = ref(null);
const isFirstLoad = ref(true);

onMounted(async () => {
  await queryVIP();
  if(isFirstLoad.value){
    await queryConfigInfo();
    await queryDwRatioList();
    isFirstLoad.value = false;
  }
});

//查询VIP层级
async function queryVIP() {
  return getVIPList().then((res) => {
    vipLevelList.value = res || [];
  });
}
//查询存取款占比配置列表
function queryDwRatioList(){
  return getDwRatioList(queryParamsTable.value).then(res=>{
    tableData.value = res.rows || [];
    total.value = res.total || 0 ;
  })
}
//查询配置信息
function queryConfigInfo(){
  return getConfigInfo().then(res=>{
    queryParams.value = res || {};
    queryParams.value.vipLevelItem = queryParams.value.vipLevel?queryParams.value.vipLevel.split(',').map(item=>Number(item)):[]
    handleSingleChange(queryParams.value.vipLevelItem)
  })
}
//全选按钮的checkbox选中与取消
function handleCheckAllChange(val) {
  queryParams.value.vipLevelItem = val
    ? vipLevelList.value.map((item) => item.vipLevel)
    : [];
  isIndeterminate.value = false;
}
//打开编辑时弹窗，拿到数据之后，先调用此方法去回显多选项
function handleSingleChange(value) {
  const checkedVip = value.length;
  checkAll.value = checkedVip === vipLevelList.value.length;
  isIndeterminate.value =
    checkedVip > 0 && checkedVip < vipLevelList.value.length;
}
function cancel(){
  isEdit.value = false;
  queryRef.value.clearValidate();
}
function saveConfig() {
  queryRef.value.validate(valid=>{
    if(valid){
      queryParams.value.vipLevel = queryParams.value.vipLevelItem.join(",")
      editConfig(queryParams.value).then(res=>{
        proxy.$modal.msgSuccess(i18n.global.t('funds.editSuccessfully'));
        queryConfigInfo();
        isEdit.value = false;
        history.value.getList();
      })
    }else{
      return 
    }
  })
}
function add() {
  open.value = true;
  type.value = "add";
}
function edit(row) {
  open.value = true;
  type.value = "edit";
  id.value = row.id;
}
function del(row) {
  delDwRatio(row.id).then(res=>{
    proxy.$modal.msgSuccess(i18n.global.t('funds.deleteSuccessfully'));
    queryDwRatioList();
  })
}
onActivated(async()=>{
  if(!isFirstLoad.value){
    await queryConfigInfo();
    await queryDwRatioList();
    history.value.getList();
  }
})
</script>

<style lang="scss" scoped>
.withdrawl-wait-setting {
  .withdrawl-switch {
    .title {
      font-size: 14px;
      color: #333333;
      font-weight: 600;
    }
    .wait-tip {
      font-size: 13px;
      color: #ff0000;
      margin: 16px 0;
    }
  }
  .attend-member {
    .title {
      font-size: 13px;
      color: rgba(0, 0, 0, 0.847);
      font-weight: 700;
    }
    .vip-level {
      display:flex;
      align-items:center;
      & span {
        font-size: 13px;
        color: #555555;
      }
    }
    .label-13 {
      font-size: 13px;
      color: #333333;
    }
    .label-blue {
      font-size: 13px;
      color: #1890ff;
    }
    .wait-hour{
      display: flex;
    }
  }
  :deep() {
    .attend-member .el-input {
      width: 20%;
    }
  }
}
</style>
