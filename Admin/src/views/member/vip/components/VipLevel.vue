<!-- vip等级配置 -->
<template>
  <div class="app-container">
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
                prop="vipLevel"
                :label="$t('member.vipLevelNoQuote')"
                width=""
                align="center"
              />
              <el-table-column
                prop="vipName"
                :label="$t('member.vipLevelName')"
                width="200"
                align="center"
              >
                <template #default="{ row }">
                  <el-input
                    :placeholder="$t('member.pleaseInput')"
                    v-model="row.vipName"
                    clearable
                  >
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="upgradeLeastDp"
                :label="$t('member.upgradeCondition')"
                width="180"
                align="center"
              >
                <template #default="{ row, $index }">
                  <el-form-item
                    :prop="`tableData.${$index}.upgradeLeastDp`"
                    :rules="rules.upgradeLeastDp"
                  >
                    <el-input
                      :placeholder="$t('member.pleaseInput')"
                      v-model="row.upgradeLeastDp"
                      clearable
                    >
                    </el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                prop="upgradeLeastTurnover"
                :label="$t('member.upgradeLeastTurnover')"
                width="180px"
                align="center"
              >
                <template #default="{ row, $index }">
                  <el-form-item
                    :prop="`tableData.${$index}.upgradeLeastTurnover`"
                    :rules="rules.upgradeLeastTurnover"
                  >
                    <el-input
                      :placeholder="$t('member.pleaseInput')"
                      v-model="row.upgradeLeastTurnover"
                      clearable
                      :disabled="row.vipLevel===1"
                    >
                    </el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                prop="relegationLeastTurnover"
                :label="$t('member.relegationLeastTurnover')"
                width="210"
                align="center"
              >
                <template #default="{ row, $index }">
                  <el-form-item
                    :prop="`tableData.${$index}.relegationLeastTurnover`"
                    :rules="rules.relegationLeastTurnover"
                  >
                    <el-input
                      :placeholder="$t('member.pleaseInput')"
                      v-model="row.relegationLeastTurnover"
                      :disabled="row.vipLevel===1"
                      clearable
                    >
                    </el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                prop="relegationValidDay"
                :label="$t('member.relegationValidDay')"
                width="210px"
                align="center"
              >
                <template #default="{ row, $index }">
                  <el-form-item
                    :prop="`tableData.${$index}.relegationValidDay`"
                    :rules="rules.relegationValidDay"
                  >
                    <el-input
                      :placeholder="$t('member.pleaseInput')"
                      v-model="row.relegationValidDay"
                      clearable
                    >
                    </el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                prop="wdTimesLimit"
                :label="$t('member.wdTimesLimit')"
                width="200"
                align="center"
              >
                <template #default="{ row, $index }">
                  <el-form-item
                    :prop="`tableData.${$index}.wdTimesLimit`"
                    :rules="rules.wdTimesLimit"
                  >
                    <el-input
                      :placeholder="$t('member.pleaseInput')"
                      v-model="row.wdTimesLimit"
                      clearable
                    >
                    </el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                prop="wdAmountsLimit"
                :label="$t('member.wdAmountsLimit')"
                width="200"
                align="center"
              >
                <template #default="{ row, $index }">
                  <el-form-item
                    :prop="`tableData.${$index}.wdAmountsLimit`"
                    :rules="rules.wdAmountsLimit"
                  >
                    <el-input
                      :placeholder="$t('member.pleaseInput')"
                      v-model="row.wdAmountsLimit"
                      clearable
                    >
                    </el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                prop="weeklyLeastDp"
                :label="$t('member.weeklyLeastDp')"
                width="200"
                align="center"
              >
                <template #default="{ row, $index }">
                  <el-form-item
                    :prop="`tableData.${$index}.weeklyLeastDp`"
                    :rules="rules.weeklyLeastDp"
                  >
                    <el-input
                      :placeholder="$t('member.pleaseInput')"
                      v-model="row.weeklyLeastDp"
                      clearable
                    >
                    </el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                prop="weeklyLeastTurnover"
                :label="$t('member.weeklyLeastTurnover')"
                width="200"
                align="center"
              >
                <template #default="{ row, $index }">
                  <el-form-item
                    :prop="`tableData.${$index}.weeklyLeastTurnover`"
                    :rules="rules.weeklyLeastTurnover"
                  >
                    <el-input
                      :placeholder="$t('member.pleaseInput')"
                      v-model="row.weeklyLeastTurnover"
                      clearable
                    >
                    </el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                prop="monthLeastDp"
                :label="$t('member.monthLeastDp')"
                width="200"
                align="center"
              >
                <template #default="{ row, $index }">
                  <el-form-item
                    :prop="`tableData.${$index}.monthLeastDp`"
                    :rules="rules.monthLeastDp"
                  >
                    <el-input
                      :placeholder="$t('member.pleaseInput')"
                      v-model="row.monthLeastDp"
                      clearable
                    >
                    </el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                prop="monthLeastTurnover"
                :label="$t('member.monthLeastTurnover')"
                width="200"
                align="center"
              >
                <template #default="{ row, $index }">
                  <el-form-item
                    :prop="`tableData.${$index}.monthLeastTurnover`"
                    :rules="rules.monthLeastTurnover"
                  >
                    <el-input
                      :placeholder="$t('member.pleaseInput')"
                      v-model="row.monthLeastTurnover"
                      clearable
                    >
                    </el-input>
                  </el-form-item>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row class="vip-save">
      <div class="button-save">
        <el-button type="primary" @click="submit">{{ $t('member.save') }}</el-button>
        <el-button @click="recoveryLastData">{{ $t('member.recoverLastSetting') }}</el-button>
      </div>
    </el-row>
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { getViplevelList, editViplevelList } from "@/api/member/vip/index";
import { getCurrentInstance, onMounted } from "vue";
import { deepCopy } from "@/utils/index";

const { proxy } = getCurrentInstance();
const queryParams = ref({
  tableData: [],
});
const rules = ref({
  upgradeLeastDp: [
    {
      pattern: /^\d+(\.\d{1,2})?$/,
      message: i18n.global.t("member.pleaseInputMaxTwoNumberDecimal"),
      trigger: "blur",
    },
  ],
  upgradeLeastTurnover: [
    {
      pattern: /^\d+(\.\d{1,2})?$/,
      message: i18n.global.t("member.pleaseInputMaxTwoNumberDecimal"),
      trigger: "blur",
    },
  ],
  relegationLeastTurnover: [
    {
      pattern: /^\d+(\.\d{1,2})?$/,
      message: i18n.global.t("member.pleaseInputMaxTwoNumberDecimal"),
      trigger: "blur",
    },
  ],
  relegationValidDay: [
    {
      pattern: /^[1-9]\d*$/,
      message: i18n.global.t("member.pleaseInputPositive"),
      trigger: "blur",
    },
  ],
  wdTimesLimit: [
    {
      pattern: /^[1-9]\d*$/,
      message: i18n.global.t("member.pleaseInputPositive"),
      trigger: "blur",
    },
  ],
  wdAmountsLimit: [
    {
      pattern: /^[1-9]\d*$/,
      message: i18n.global.t("member.pleaseInputPositive"),
      trigger: "blur",
    },
  ],
  weeklyLeastDp: [
    {
      pattern: /^[1-9]\d*$/,
      message: i18n.global.t("member.pleaseInputPositive"),
      trigger: "blur",
    },
  ],
  weeklyLeastTurnover: [
    {
      pattern: /^[1-9]\d*$/,
      message: i18n.global.t("member.pleaseInputPositive"),
      trigger: "blur",
    },
  ],
  monthLeastDp: [
    {
      pattern: /^[1-9]\d*$/,
      message: i18n.global.t("member.pleaseInputPositive"),
      trigger: "blur",
    },
  ],
  monthLeastTurnover: [
    {
      pattern: /^[1-9]\d*$/,
      message: i18n.global.t("member.pleaseInputPositive"),
      trigger: "blur",
    },
  ],
});
const tableDataClone = ref([]);
const isFirstLoad = ref(true);

onMounted(async()=>{
  if(isFirstLoad.value){
    await getList();
    isFirstLoad.value = false;
  }
})
function getList() {
  return getViplevelList().then((res) => {
    queryParams.value.tableData = res || [];
    tableDataClone.value = res ? deepCopy(queryParams.value.tableData) : [];
  });
}
function submit() {
  editViplevelList(queryParams.value.tableData).then((res) => {
    proxy.$modal.msgSuccess(i18n.global.t("member.operateSuccessfully"));
    getList();
  });
}
function recoveryLastData() {
  queryParams.value.tableData = deepCopy(tableDataClone.value);
}
onActivated(()=>{
  !isFirstLoad.value && getList()
})
</script>

<style lang="scss" scoped>
.vip-save {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: flex-end; /* 垂直底部对齐 */
  margin-top: 16px;
  // height: 50vh;
}
.form-data {
  :deep() {
    .el-table .cell {
      padding-bottom: 16px !important;
    }
  }
}
:deep(.el-table .el-table__cell.is-center) {
  height: 60px !important;
}
:deep(.is-horizontal) {
  display: block !important;
  height: 10px;
}
</style>
