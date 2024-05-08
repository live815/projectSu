<template>
  <div class="funds-config-virtual-index">
    <div class="header">
      <div class="left">
        <span class="bar-chart"></span>
        <span class="title">{{ $t('funds.virtualCurrencyChargeBate') }}</span>
      </div>
      <div class="right">
        <el-button
          size="small"
          type="primary"
          v-if="rechargeType === 'info'"
          @click="editTable"
          >{{ $t('funds.edit') }}</el-button
        >
        <el-button
          size="small"
          type="primary"
          v-if="rechargeType === 'edit'"
          @click="saveRecharge"
          >{{ $t('funds.save') }}</el-button
        >
        <el-button
          size="small"
          type="primary"
          v-if="rechargeType === 'edit'"
          @click="cancelRecharge"
          >{{ $t('funds.cancel') }}</el-button
        >
      </div>
    </div>
    <el-form :model="formDataRecharge" ref="form" :rules="rules">
      <el-table :data="formDataRecharge.rechargetData" class="recharge-table">
        <el-table-column :label="$t('funds.legalCurrency')" prop="legalTender"></el-table-column>
        <el-table-column :label="$t('funds.virtualCurrency')" prop="virtualcy"></el-table-column>
        <el-table-column
          :label="$t('funds.benchmarkRate')"
          prop="benchmarkRate"
        ></el-table-column>
        <el-table-column :label="$t('funds.deviationValue')" prop="deviationValue">
          <template #default="{ row, $index }">
            <el-form-item
              :prop="`rechargetData.${$index}.deviationValue`"
              :rules="rules.deviationValue"
              class="value-recharge"
            >
              <el-input
                v-model="row.deviationValue"
                clearable
                :placeholder="$t('funds.pleaseInput')"
                :disabled="rechargeType === 'info'"
              ></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column :label="$t('funds.lastRate')" prop="lastRate"></el-table-column>
        <el-table-column :label="$t('funds.lastUpdateByNoQuote')" prop="updateBy">
          <template #default="{ row }">
            <span>{{ row.updateBy ? row.updateBy : "-" }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('funds.lastUpdateTimeNoQuote')" prop="updateTime">
          <template #default="{ row }">
            <span>{{ row.updateTime ? row.updateTime : "-" }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <div class="header">
      <div class="left">
        <span class="bar-chart"></span>
        <span class="title">{{ $t('funds.virtualCurrencyWithdrawalBate') }}</span>
      </div>
      <div class="right">
        <el-button
          size="small"
          type="primary"
          v-if="withdrawType === 'info'"
          @click="editTableWithdraw"
          >{{ $t('funds.edit') }}</el-button
        >
        <el-button
          size="small"
          type="primary"
          v-if="withdrawType === 'edit'"
          @click="saveWithdraw"
          >{{ $t('funds.save') }}</el-button
        >
        <el-button
          size="small"
          type="primary"
          v-if="withdrawType === 'edit'"
          @click="cancelWithdraw"
          >{{ $t('funds.cancel') }}</el-button
        >
      </div>
    </div>
    <el-form :model="formDataWithdraw" ref="formWithdraw" :rules="rules">
      <el-table :data="formDataWithdraw.withdrawData">
        <el-table-column :label="$t('funds.legalCurrency')" prop="legalTender"></el-table-column>
        <el-table-column :label="$t('funds.virtualCurrency')" prop="virtualcy"></el-table-column>
        <el-table-column
          :label="$t('funds.benchmarkRate')"
          prop="benchmarkRate"
        ></el-table-column>
        <el-table-column :label="$t('funds.deviationValue')" prop="deviationValue">
          <template #default="{ row, $index }">
            <el-form-item
              :prop="`withdrawData.${$index}.deviationValue`"
              :rules="rules.deviationValue"
              class="value-recharge"
            >
              <el-input
                v-model="row.deviationValue"
                clearable
                :placeholder="$t('funds.pleaseInput')"
                :disabled="withdrawType === 'info'"
              ></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column :label="$t('funds.lastRate')" prop="lastRate"></el-table-column>
        <el-table-column :label="$t('funds.lastUpdateByNoQuote')" prop="updateBy">
          <template #default="{ row }">
            <span>{{ row.updateBy ? row.updateBy : "-" }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('funds.lastUpdateTimeNoQuote')" prop="updateTime">
          <template #default="{ row }">
            <span>{{ row.updateTime ? row.updateTime : "-" }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
  </div>
</template>

<script setup name="Virtual">
import i18n from "@/i18n";
import { getVirtcyList,updateList } from "@/api/funds/config/index";
import { getCurrentInstance, onMounted } from "vue";

const { proxy } = getCurrentInstance()
const form = ref(null);
const formWithdraw = ref(null);
const formDataRecharge = ref({
  rechargetData: [],
});
const formDataWithdraw = ref({
  withdrawData: [],
});
const rechargeType = ref("info");
const withdrawType = ref("info");
const rules = ref({
  deviationValue: [
    { required: true, message: i18n.global.t("funds.deviationValueCannotBeEmpty"), trigger: "blur" },
    {
      validator: validateNumber,
      trigger: "blur",
    },
  ],
});
const isFirstLoad = ref(true);

onMounted(async()=>{
  if(isFirstLoad.value){
    await getList();
    isFirstLoad.value = false
  }
})
function getList() {
  return getVirtcyList().then((res) => {
    res &&
      res.forEach((item) => {
        if (item.rateType === "1") {
          item.lastRate = (
            parseFloat(item.benchmarkRate) + parseFloat(item.deviationValue)
          ).toFixed(2);
          formDataRecharge.value.rechargetData.push(item);
        }
        if (item.rateType === "2") {
          item.lastRate = (
            parseFloat(item.benchmarkRate) + parseFloat(item.deviationValue)
          ).toFixed(2);
          formDataWithdraw.value.withdrawData.push(item);
        }
      });
  });
}
function editTable() {
  rechargeType.value = "edit";
}
function saveRecharge() {
  console.log(formDataRecharge.value.rechargetData);
  form.value.validate((valid) => {
    if (valid) {
      updateList({
        id:formDataRecharge.value.rechargetData[0].id,
        deviationValue: formDataRecharge.value.rechargetData[0].deviationValue
      }).then(res=>{
        formDataRecharge.value.rechargetData = []
        formDataWithdraw.value.withdrawData = []
        getList()
        rechargeType.value = "info";
        proxy.$modal.msgSuccess(i18n.global.t("risk.editSuccessfully"))
      })
    } else {
      return;
    }
  });
}
function cancelRecharge() {
  form.value.resetFields();
  rechargeType.value = "info";
}
function editTableWithdraw() {
  withdrawType.value = "edit";
}
function saveWithdraw() {
  console.log(formDataWithdraw.value.withdrawData);
  formWithdraw.value.validate((valid) => {
    if (valid) {
      updateList({
        id:formDataWithdraw.value.withdrawData[0].id,
        deviationValue: formDataWithdraw.value.withdrawData[0].deviationValue
      }).then(res=>{
        formDataRecharge.value.rechargetData = []
        formDataWithdraw.value.withdrawData = []
        getList()
        withdrawType.value = "info";
        proxy.$modal.msgSuccess(i18n.global.t("risk.editSuccessfully"))
      })
    } else {
      return;
    }
  });
}
function cancelWithdraw() {
  formWithdraw.value.resetFields();
  withdrawType.value = "info";
}
function validateNumber(rule, value, callback) {
  const regex = /^(\+)?-?(\d{1,2}(\.\d{0,2})?|\d{0,1}(\.\d{1,2})?)$/;
  if (regex.test(value)) {
    const floatValue = parseFloat(value.replace(/\+/, ''));
    if (!isNaN(floatValue) && floatValue >= -9.99 && floatValue <= 9.99) {
      callback(); // 校验通过
    } else {
      callback(new Error(i18n.global.t("funds.rangeNinePointNineNine")));
    }
  } else {
    callback(new Error(i18n.global.t("funds.rangeNinePointNineNine")));
  }
}
onActivated(async()=>{
  if(!isFirstLoad.value){
    await getList();
  }
})
</script>

<style lang="scss" scoped>
.funds-config-virtual-index {
  padding: 20px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    .left {
      display: flex;
      align-items: center;
      .bar-chart {
        display: inline-block;
        width: 15px;
        height: 21px;
        background: #1890ff;
      }
      .title {
        font-size: 18px;
        font-weight: 600;
        color: #333333;
        margin-left: 4px;
      }
    }
  }
  .recharge-table {
    margin-bottom: 20px;
  }
  .value-recharge {
    margin-top: 18px;
  }
}
</style>
