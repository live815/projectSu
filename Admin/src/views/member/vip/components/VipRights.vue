<!-- vip权益配置 -->
<template>
  <div class="app-container" v-loading="loading">
    <el-form
      :model="queryParams"
      ref="queryRef"
      label-position="top"
      :rules="rules"
      class="form-data"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item label="" prop="tableData" class="full-width">
            <el-table :data="queryParams.tableData" style="width: 100%" :empty-text="$t('member.noData')">
              <el-table-column
                prop="vipName"
                :label="$t('member.vipLevelNoQuote')"
                width="150"
                align="center"
              />
              <!-- 升级礼金 -->
              <el-table-column :label="$t('member.upgradeAmount')" align="center">
                <template v-slot:header="{ column }">
                  <div>
                    {{ column.label }}
                    <el-switch
                      v-model="upgradeRewardSwitch"
                      active-value="0"
                      inactive-value="1"
                      @click="changeSwitch"
                    />
                  </div>
                </template>
                <el-table-column
                  prop="birthdayRewardType"
                  :label="$t('member.awardType')"
                  width="200"
                  align="center"
                >
                  <template #default="{ row,$index }">
                    <el-select
                      v-model="row.upgradeRewardType"
                      :placeholder="$t('member.pleaseSelect')"
                      clearable
                      class="full-width"
                      :disabled="row.vipLevel===0"
                      @change="upgradeChange($event,row,$index)"
                    >
                      <el-option
                        v-for="item in birthdayRewardTypeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('member.prizeSetting')" width="400" align="center">
                  <template #default="{ row, $index }">
                    <el-form-item
                      :prop="`tableData.${$index}.upgradeRewardAmounts`"
                      :rules="rules.upgradeRewardAmounts"
                      class="width-40"
                    >
                      <el-input
                        v-model="row.upgradeRewardAmounts"
                        :placeholder="$t('member.pleaseInputAmount')"
                        clearable
                        class="mr-20"
                        :disabled="row.vipLevel===0"
                      ></el-input>
                    </el-form-item>
                    <el-form-item
                      :prop="`tableData.${$index}.upgradeRewardWdMultiple`"
                      :rules="upgradeRules(row)"
                      class="width-40"
                    >
                      <el-input
                        v-model="row.upgradeRewardWdMultiple"
                        :placeholder="$t('member.pleaseInputWithdrawMultiple')"
                        clearable
                        :disabled="row.vipLevel===0||row.upgradeRewardType===3"
                      ></el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('member.recieveValidDate')"
                  width="200"
                  align="center"
                >
                  <template #default="{ row, $index }">
                    <el-form-item
                      :prop="`tableData.${$index}.upgradeRewardExp`"
                      :rules="rules.relegationRewardExp"
                      class="width-40"
                    >
                      <el-input
                        v-model="row.upgradeRewardExp"
                        :placeholder="$t('member.pleaseInputRecieveValidDate')"
                        clearable
                        class="mr-20"
                        :disabled="row.vipLevel===0"
                      ></el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
              </el-table-column>
              <!-- 生日礼金 -->
              <el-table-column :label="$t('member.birthdayAmount')" align="center">
                <template v-slot:header="{ column }">
                  <div>
                    {{ column.label }}
                    <el-switch
                      v-model="birthdayRewardSwitch"
                      active-value="0"
                      inactive-value="1"
                      @click="changeSwitch"
                    />
                  </div>
                </template>
                <el-table-column
                  prop="name"
                  :label="$t('member.awardType')"
                  width="200"
                  align="center"
                >
                  <template #default="{ row,$index }">
                    <el-select
                      v-model="row.birthdayRewardType"
                      :placeholder="$t('member.pleaseSelect')"
                      clearable
                      class="full-width"
                      :disabled="row.vipLevel===0"
                      @change="birthdayChange($event,row,$index)"
                    >
                      <el-option
                        v-for="item in birthdayRewardTypeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('member.prizeSetting')" width="400" align="center">
                  <template #default="{ row, $index }">
                    <el-form-item
                      :prop="`tableData.${$index}.birthdayRewardAmounts`"
                      :rules="rules.upgradeRewardAmounts"
                      class="width-40"
                    >
                      <el-input
                        v-model="row.birthdayRewardAmounts"
                        :placeholder="$t('member.pleaseInputAmount')"
                        clearable
                        class="mr-20"
                        :disabled="row.vipLevel===0"
                      ></el-input>
                    </el-form-item>
                    <el-form-item
                      :prop="`tableData.${$index}.birthdayRewardWdMultiple`"
                      :rules="birthdayRules(row)"
                      class="width-40"
                    >
                      <el-input
                        v-model="row.birthdayRewardWdMultiple"
                        :placeholder="$t('member.pleaseInputWithdrawMultiple')"
                        clearable
                        :disabled="row.vipLevel===0||row.birthdayRewardType===3"
                      ></el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('member.recieveValidDate')"
                  width="200"
                  align="center"
                >
                  <template #default="{ row, $index }">
                    <el-form-item
                      :prop="`tableData.${$index}.birthdayRewardExp`"
                      :rules="rules.relegationRewardExp"
                      class="width-40"
                    >
                      <el-input
                        v-model="row.birthdayRewardExp"
                        :placeholder="$t('member.pleaseInputRecieveValidDate')"
                        clearable
                        class="mr-20"
                        :disabled="row.vipLevel===0"
                      ></el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
              </el-table-column>
              <!-- 周礼金 -->
              <el-table-column :label="$t('member.weekGiftMoney')" align="center">
                <template v-slot:header="{ column }">
                  <div>
                    {{ column.label }}
                    <el-switch
                      v-model="weeklyRewardSwitch"
                      active-value="0"
                      inactive-value="1"
                      @click="changeSwitch"
                    />
                  </div>
                </template>
                <el-table-column
                  prop="name"
                  :label="$t('member.awardType')"
                  width="200px"
                  align="center"
                >
                  <template #default="{ row,$index }">
                    <el-select
                      v-model="row.weeklyRewardType"
                      :placeholder="$t('member.pleaseSelect')"
                      clearable
                      class="full-width"
                      :disabled="row.vipLevel===0"
                      @change="weeklyChange($event,row,$index)"
                    >
                      <el-option
                        v-for="item in birthdayRewardTypeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('member.prizeSetting')" width="400" align="center">
                  <template #default="{ row, $index }">
                    <el-form-item
                      :prop="`tableData.${$index}.weeklyRewardAmounts`"
                      :rules="rules.upgradeRewardAmounts"
                      class="width-40"
                    >
                      <el-input
                        v-model="row.weeklyRewardAmounts"
                        :placeholder="$t('member.pleaseInputAmount')"
                        clearable
                        class="mr-20"
                        :disabled="row.vipLevel===0"
                      ></el-input>
                    </el-form-item>
                    <el-form-item
                      :prop="`tableData.${$index}.weeklyRewardWdMultiple`"
                      :rules="weekRules(row)"
                      class="width-40"
                    >
                      <el-input
                        v-model="row.weeklyRewardWdMultiple"
                        :placeholder="$t('member.pleaseInputWithdrawMultiple')"
                        style="width: 130px"
                        :disabled="row.vipLevel===0||row.weeklyRewardType===3"
                      ></el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('member.recieveValidDate')"
                  width="200"
                  align="center"
                >
                  <template #default="{ row, $index }">
                    <el-form-item
                      :prop="`tableData.${$index}.weeklyRewardExp`"
                      :rules="rules.relegationRewardExp"
                      class="width-40"
                    >
                      <el-input
                        v-model="row.weeklyRewardExp"
                        :placeholder="$t('member.pleaseInputRecieveValidDate')"
                        clearable
                        class="mr-20"
                        :disabled="row.vipLevel===0"
                      ></el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
              </el-table-column>
              <!-- 月礼金 -->
              <el-table-column :label="$t('member.monthGiftMoney')" align="center">
                <template v-slot:header="{ column }">
                  <div>
                    {{ column.label }}
                    <el-switch
                      v-model="monthRewardSwitch"
                      active-value="0"
                      inactive-value="1"
                      @click="changeSwitch"
                    />
                  </div>
                </template>
                <el-table-column
                  prop="name"
                  :label="$t('member.awardType')"
                  width="200"
                  align="center"
                >
                  <template #default="{ row,$index }">
                    <el-select
                      v-model="row.monthRewardType"
                      :placeholder="$t('member.pleaseSelect')"
                      clearable
                      class="full-width"
                      :disabled="row.vipLevel===0"
                      @change="monthChange($event,row,$index)"
                    >
                      <el-option
                        v-for="item in birthdayRewardTypeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="Address"
                  :label="$t('member.prizeSetting')"
                  width="400px"
                  align="center"
                >
                  <template #default="{ row, $index }">
                    <el-form-item
                      :prop="`tableData.${$index}.monthRewardAmounts`"
                      :rules="rules.upgradeRewardAmounts"
                      class="width-40"
                    >
                      <el-input
                        v-model="row.monthRewardAmounts"
                        :placeholder="$t('member.pleaseInputAmount')"
                        clearable
                        class="mr-20"
                        :disabled="row.vipLevel===0"
                      ></el-input>
                    </el-form-item>
                    <el-form-item
                      :prop="`tableData.${$index}.monthRewardWdMultiple`"
                      :rules="monthRules(row)"
                      class="width-40"
                    >
                      <el-input
                        v-model="row.monthRewardWdMultiple"
                        :placeholder="$t('member.pleaseInputWithdrawMultiple')"
                        clearable
                        :disabled="row.vipLevel===0||row.monthRewardType===3"
                      ></el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('member.recieveValidDate')"
                  width="200"
                  align="center"
                >
                  <template #default="{ row, $index }">
                    <el-form-item
                      :prop="`tableData.${$index}.monthRewardExp`"
                      :rules="rules.relegationRewardExp"
                      class="width-40"
                    >
                      <el-input
                        v-model="row.monthRewardExp"
                        :placeholder="$t('member.pleaseInputRecieveValidDate')"
                        clearable
                        class="mr-20"
                        :disabled="row.vipLevel===0"
                      ></el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
              </el-table-column>
              <!-- 保级礼金 -->
              <el-table-column :label="$t('member.saveLevelGift')" align="center">
                <template v-slot:header="{ column }">
                  <div>
                    {{ column.label }}
                    <el-switch
                      v-model="relegationRewardSwitch"
                      active-value="0"
                      inactive-value="1"
                      @click="changeSwitch"
                    />
                  </div>
                </template>
                <el-table-column
                  prop="name"
                  :label="$t('member.awardType')"
                  width="200"
                  align="center"
                >
                  <template #default="{ row,$index }">
                    <el-select
                      v-model="row.relegationRewardType"
                      :placeholder="$t('member.pleaseSelect')"
                      clearable
                      class="full-width"
                      :disabled="row.vipLevel===0"
                      @change="relegationChange($event,row,$index)"
                    >
                      <el-option
                        v-for="item in birthdayRewardTypeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="Address"
                  :label="$t('member.prizeSetting')"
                  width="400px"
                  align="center"
                >
                  <template #default="{ row, $index }">
                    <el-form-item
                      :prop="`tableData.${$index}.relegationRewardAmounts`"
                      :rules="rules.upgradeRewardAmounts"
                      class="width-40"
                    >
                      <el-input
                        v-model="row.relegationRewardAmounts"
                        :placeholder="$t('member.pleaseInputAmount')"
                        clearable
                        class="mr-20"
                        :disabled="row.vipLevel===0"
                      ></el-input>
                    </el-form-item>
                    <el-form-item
                      :prop="`tableData.${$index}.relegationRewardWdMultiple`"
                      :rules="relegationRules(row)"
                      class="width-40"
                    >
                      <el-input
                        v-model="row.relegationRewardWdMultiple"
                        :placeholder="$t('member.pleaseInputWithdrawMultiple')"
                        clearable
                        :disabled="row.vipLevel===0||row.relegationRewardType===3"
                      ></el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('member.recieveValidDate')"
                  width="200"
                  align="center"
                >
                  <template #default="{ row, $index }">
                    <el-form-item
                      :prop="`tableData.${$index}.relegationRewardExp`"
                      :rules="rules.relegationRewardExp"
                      class="width-40"
                    >
                      <el-input
                        v-model="row.relegationRewardExp"
                        :placeholder="$t('member.pleaseInputRecieveValidDate')"
                        clearable
                        class="mr-20"
                        :disabled="row.vipLevel===0"
                      ></el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row class="vip-save">
      <el-button type="primary" @click="submit">{{ $t('member.save') }}</el-button>
      <el-button @click="recoveryLastData">{{ $t('member.recoverLastSetting') }}</el-button>
    </el-row>
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { onMounted, ref, watch, watchEffect } from "vue";
import {
  getViprightsfigList,
  editViprightsfigList,
  editViplevelSwitch,
} from "@/api/member/vip/index";
import { deepCopy } from "@/utils/index";

const { proxy } = getCurrentInstance();
const props = defineProps(["activeName"]);
const tenantId = ref(null); //平台ID
const queryRef = ref(null);
const upgradeRewardSwitch = ref("0"); //升级礼金开关
// const upgradeRewardSwitchClone = ref(null); //升级礼金开关克隆
const birthdayRewardSwitch = ref("0"); //生日礼金开关
// const birthdayRewardSwitchClone = ref(null); //升级礼金开关克隆
const weeklyRewardSwitch = ref("0"); //周礼金开关
// const weeklyRewardSwitchClone = ref(null); //升级礼金开关克隆
const monthRewardSwitch = ref("0"); //月礼金开关
// const monthRewardSwitchClone = ref(null); //升级礼金开关克隆
const relegationRewardSwitch = ref("0"); //保级礼金开关
const birthdayRewardTypeList = [
  {
    value: 0,
    label: i18n.global.t("member.cash"),
  },
  {
    value: 1,
    label: i18n.global.t("member.cashCoupons"),
  },
  {
    value: 2,
    label: i18n.global.t("member.depositCoupons"),
  },
  {
    value: 3,
    label: i18n.global.t("member.turnoverCoupons"),
  },
];
const queryParams = ref({
  tableData: [],
});
const rules = ref({
  upgradeRewardAmounts: [
    {
      pattern: /^\d+(\.\d{1,2})?$/,
      message: i18n.global.t("member.pleaseInputMaxTwoNumberDecimal"),
      trigger: "blur",
    },
  ],
  upgradeRewardWdMultiple: [
    {
      pattern: /^[1-9]\d*$/,
      message: i18n.global.t("member.pleaseInputPositive"),
      trigger: "blur",
    },
  ],
  relegationRewardExp: [
    {
      pattern: /^[1-9]\d*$/,
      message: i18n.global.t("member.pleaseInputPositive"),
      trigger: "blur",
    },
  ],
});
const tableDataClone = ref([]);
const loading = ref(false);

getList();
function getList() {
  loading.value = true
  return getViprightsfigList().then((res) => {
    queryParams.value.tableData = res.list || [];
    tableDataClone.value = res ? deepCopy(queryParams.value.tableData) : [];
    tenantId.value = res?.tenantId;
    upgradeRewardSwitch.value = res?.upgradeRewardSwitch;
    // upgradeRewardSwitchClone.value = res?deepCopy(res.upgradeRewardSwitch):null
    birthdayRewardSwitch.value = res?.birthdayRewardSwitch;
    // birthdayRewardSwitchClone.value = res?deepCopy(res.birthdayRewardSwitch):null
    weeklyRewardSwitch.value = res?.weeklyRewardSwitch;
    // weeklyRewardSwitchClone.value = res?deepCopy(res.weeklyRewardSwitch):null
    monthRewardSwitch.value = res?.monthRewardSwitch;
    // monthRewardSwitchClone.value = res?deepCopy(res.monthRewardSwitch):null
    relegationRewardSwitch.value = res?.relegationRewardSwitch
    // upgradeRewardSwitchClone.value = res?deepCopy(res.relegationRewardSwitch):null
    loading.value = false
  }).catch(()=>{
    loading.value = false
  });
}

function submit() {
  queryRef.value.validate(valid=>{
    if(valid){
      editViprightsfigList(queryParams.value.tableData).then((res) => {
        proxy.$modal.msgSuccess(i18n.global.t("member.operateSuccessfully"));
        getList();
      });
    }else{
      return
    }
  })
}
function changeSwitch() {
  editViplevelSwitch({
    tenantId: tenantId.value,
    upgradeRewardSwitch: upgradeRewardSwitch.value,
    birthdayRewardSwitch: birthdayRewardSwitch.value,
    weeklyRewardSwitch: weeklyRewardSwitch.value,
    monthRewardSwitch: monthRewardSwitch.value,
    relegationRewardSwitch:relegationRewardSwitch.value
  }).then((res) => {
    proxy.$modal.msgSuccess(i18n.global.t("member.operateSuccessfully"));
    getList();
  });
}
function recoveryLastData() {
  queryParams.value.tableData = deepCopy(tableDataClone.value);
  // monthRewardSwitch.value = deepCopy(monthRewardSwitchClone.value)
  // weeklyRewardSwitch.value = deepCopy(weeklyRewardSwitchClone.value)
  // birthdayRewardSwitch.value = deepCopy(birthdayRewardSwitchClone.value)
  // upgradeRewardSwitch.value = deepCopy(upgradeRewardSwitchClone.value)
  // relegationRewardSwitch.value = deepCopy(rebateSwitchClone.value)
}
function upgradeChange(val,row,index){
  queryRef.value.clearValidate(`tableData.${index}.upgradeRewardWdMultiple`);
  val===3 && (row.upgradeRewardWdMultiple = null)
}
function birthdayChange(val,row,index){
  queryRef.value.clearValidate(`tableData.${index}.birthdayRewardWdMultiple`);
  val===3 && (row.birthdayRewardWdMultiple = null)
}
function weeklyChange(val,row,index){
  queryRef.value.clearValidate(`tableData.${index}.weeklyRewardWdMultiple`);
  val===3 && (row.weeklyRewardWdMultiple = null)
}
function monthChange(val,row,index){
  queryRef.value.clearValidate(`tableData.${index}.monthRewardWdMultiple`);
  val===3 && (row.monthRewardWdMultiple = null)
}
function relegationChange(val,row,index){
  queryRef.value.clearValidate(`tableData.${index}.relegationRewardWdMultiple`);
  val===3 && (row.relegationRewardWdMultiple = null)
}
// function upgradeRules(row){
//   if((row.upgradeRewardType===0||row.upgradeRewardType===1||row.upgradeRewardType===2)
//   &&(row.upgradeRewardAmounts)){
//     return [{required:true,message:i18n.global.t("member.pleaseInputWithdrawMultiple"),trigger:"blur"}]
//   }else{
//     return []
//   }
// }
const upgradeRules = computed(()=>{
  return (row)=>{
    if((row.upgradeRewardType===0||row.upgradeRewardType===1||row.upgradeRewardType===2)
    &&(row.upgradeRewardAmounts)){
      return [{required:true,message:i18n.global.t("member.pleaseInputWithdrawMultiple"),trigger:"blur"}]
    }else{
      return [{required:false}]
    }
  }
})
function birthdayRules(row){
  if((row.birthdayRewardType===0||row.birthdayRewardType===1||row.birthdayRewardType===2)
  &&(row.birthdayRewardAmounts)){
    return [{required:true,message:i18n.global.t("member.pleaseInputWithdrawMultiple"),trigger:"blur"}]
  }else{
    return [{required:false}]
  }
}
function weekRules(row){
  if((row.weeklyRewardType===0||row.weeklyRewardType===1||row.weeklyRewardType===2)
  &&(row.weeklyRewardAmounts)){
    return [{required:true,message:i18n.global.t("member.pleaseInputWithdrawMultiple"),trigger:"blur"}]
  }else{
    return [{required:false}]
  }
}
function monthRules(row){
  if((row.monthRewardType===0||row.monthRewardType===1||row.monthRewardType===2)
  &&(row.monthRewardAmounts)){
    return [{required:true,message:i18n.global.t("member.pleaseInputWithdrawMultiple"),trigger:"blur"}]
  }else{
    return [{required:false}]
  }
}
function relegationRules(row){
  if((row.relegationRewardType===0||row.relegationRewardType===1||row.relegationRewardType===2)
  &&(row.relegationRewardAmounts)){
    return [{required:true,message:i18n.global.t("member.pleaseInputWithdrawMultiple"),trigger:"blur"}]
  }else{
    return [{required:false}]
  }
}
</script>

<style lang="scss" scoped>
.vip-save {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: flex-end; /* 垂直底部对齐 */
  height: 16vh;
}
:deep(.is-horizontal) {
  display: block !important;
  height: 10px;
}
:deep(.el-table .el-table__cell.is-center) {
  height: 60px !important;
}
.form-data {
  :deep() {
    .el-table .cell {
      display: flex;
      justify-content: center;
      padding-bottom: 16px !important;
    }
  }
}
</style>
