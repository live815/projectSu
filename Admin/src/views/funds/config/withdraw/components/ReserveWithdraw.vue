<template>
  <div class="funds-config-reserve-withdraw">
    <div class="header">
      <div class="left">
        <span class="bar-chart"></span>
        <span class="title">{{ $t('funds.reserveWithdrawalSetting') }}</span>
      </div>
      <div class="right">
        <el-button
          size="small"
          type="primary"
          v-if="reserveType === 'info'"
          @click="editTable"
          >{{ $t('funds.edit') }}</el-button
        >
        <el-button
          size="small"
          type="primary"
          v-if="reserveType === 'edit'"
          @click="saveRecharge"
          >{{ $t('funds.save') }}</el-button
        >
        <el-button
          size="small"
          type="primary"
          v-if="reserveType === 'edit'"
          @click="cancelRecharge"
          >{{ $t('funds.cancel') }}</el-button
        >
      </div>
    </div>
    <el-form :model="formData" ref="form" :rules="rules">
      <h3>{{$t('funds.reserveWithdrawalSwitch')}}:</h3>
      <el-row>
        <el-col :span="3">
          <el-form-item :label="$t('funds.bankCardWithdrawal')" prop="bankcardSwitch">
            <el-switch
              v-model="formData.bankcardSwitch"
              active-value="0"
              inactive-value="1"
              :disabled="reserveType==='info'"
            ></el-switch>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="3">
          <el-form-item label="普通提现:" prop="common">
            <el-switch
              v-model="formData.common"
              :active-value="1"
              :inactive-value="0"
              :disabled="reserveType==='info'"
            ></el-switch>
          </el-form-item>
        </el-col> -->
        <el-col :span="3">
          <el-form-item :label="$t('funds.personalWithdrawal')" prop="exclusiveSwitch">
            <el-switch
              v-model="formData.exclusiveSwitch"
              active-value="0"
              inactive-value="1"
              :disabled="reserveType==='info'"
            ></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="$t('funds.USDTwithdrawal')" prop="usdtSwitch">
            <el-switch
              v-model="formData.usdtSwitch"
              active-value="0"
              inactive-value="1"
              :disabled="reserveType==='info'"
            ></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="$t('funds.EBpayWithdrawal')" prop="ebpaySwitch">
            <el-switch
              v-model="formData.ebpaySwitch"
              active-value="0"
              inactive-value="1"
              :disabled="reserveType==='info'"
            ></el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <h3>{{$t('funds.reserveWithdrawalSetting')}}:</h3>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item :label="$t('funds.autoWithdrawalLeftTime')" prop="hoursLeftPayout">
            <el-input
              v-model="formData.hoursLeftPayout"
              clearable
              :placeholder="$t('funds.pleaseInput')"
              :disabled="reserveType==='info'"
            >
              <template #append>{{ $t('funds.hours') }}</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item :label="$t('funds.instantWithdrawal')" prop="immwdHours">
            <el-input
              v-model="formData.immwdHours"
              clearable
              :placeholder="$t('funds.pleaseInput')"
              :disabled="reserveType==='info'"
            >
            <template #prepend>0~</template>
              <template #append>{{ $t('funds.hours') }}</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('funds.addPercentNoQuote')" prop="immwdAddPercent">
            <el-input
              v-model="formData.immwdAddPercent"
              clearable
              :placeholder="$t('funds.pleaseInput')"
              :disabled="reserveType==='info'"
            >
              <template #append>%</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('funds.labelNoQuote')">
            <el-input v-model="formData.immwdLabel" clearable :placeholder="$t('funds.pleaseInput')" :disabled="reserveType==='info'">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item :label="$t('funds.reserveWithdrawalFirse')" prop="appmentwd1Hours">
            <el-input
              v-model="formData.appmentwd1Hours"
              clearable
              :placeholder="$t('funds.pleaseInput')"
              :disabled="reserveType==='info'"
            >
              <template #append>{{ $t('funds.hours') }}</template>
              <template #prepend>0~</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('funds.addPercentNoQuote')" prop="appmentwd1AddPercent">
            <el-input
              v-model="formData.appmentwd1AddPercent"
              clearable
              :placeholder="$t('funds.pleaseInput')"
              :disabled="reserveType==='info'"
            >
              <template #append>%</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('funds.labelNoQuote')">
            <el-input
              v-model="formData.appmentwd1Label"
              clearable
              :placeholder="$t('funds.pleaseInput')"
              :disabled="reserveType==='info'"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item :label="$t('funds.reserveWithdrawalTwo')" prop="appmentwd2Hours">
            <el-input
              v-model="formData.appmentwd2Hours"
              clearable
              :placeholder="$t('funds.pleaseInput')"
              :disabled="reserveType==='info'"
            >
              <template #append>{{ $t('funds.hours') }}</template>
              <template #prepend>0~</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('funds.addPercentNoQuote')" prop="appmentwd2AddPercent">
            <el-input
              v-model="formData.appmentwd2AddPercent"
              clearable
              :placeholder="$t('funds.pleaseInput')"
              :disabled="reserveType==='info'"
            >
              <template #append>%</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('funds.labelNoQuote')">
            <el-input
              v-model="formData.appmentwd2Label"
              clearable
              :placeholder="$t('funds.pleaseInput')"
              :disabled="reserveType==='info'"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item :label="$t('funds.reserveWithdrawalThree')" prop="appmentwd3Hours">
            <el-input
              v-model="formData.appmentwd3Hours"
              clearable
              :placeholder="$t('funds.pleaseInput')"
              :disabled="reserveType==='info'"
            >
              <template #append>{{$t('funds.hours')}}</template>
              <template #prepend>0~</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('funds.addPercentNoQuote')" prop="appmentwd3AddPercent">
            <el-input
              v-model="formData.appmentwd3AddPercent"
              clearable
              :placeholder="$t('funds.pleaseInput')"
              :disabled="reserveType==='info'"
            >
              <template #append>%</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('funds.labelNoQuote')">
            <el-input
              v-model="formData.appmentwd3Label"
              clearable
              :placeholder="$t('funds.pleaseInput')"
              :disabled="reserveType==='info'"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="5">
          <el-form-item
            :label="$t('funds.doubleMultipleBate')"
            prop="brMultiple"
            class="full-width"
          >
            <el-input v-model="formData.brMultiple" clearable placeholder="请输入" :disabled="reserveType==='info'">
              <template #append>{{$t('funds.bate')}}</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item :label="$t('funds.everyDayAddLimitAmount')" prop="brDayLimit">
            <el-input
              v-model="formData.brDayLimit"
              clearable
              :placeholder="$t('funds.pleaseInput')"
              :disabled="reserveType==='info'"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { getAppmentwdList,saveAppmentwdList } from "@/api/funds/config/index"
import { getCurrentInstance } from "vue";

const { proxy } = getCurrentInstance()
const form = ref(null)
const reserveType = ref("info");
const cloneFormData = ref({})
const formData = ref({
  bankcardSwitch: 1,
  exclusiveSwitch: 1,
  usdtSwitch: 1,
  ebpaySwitch:0,
  hoursLeftPayout: null,
  immwdHours: null,
  immwdAddPercent: null,
  immwdLabel: null,
  appmentwd1Hours: null,
  appmentwd1AddPercent: null,
  appmentwd1Label: null,
  appmentwd2Hours: null,
  appmentwd2AddPercent: null,
  appmentwd2Label: null,
  appmentwd3Hours: null,
  appmentwd3AddPercent: null,
  appmentwd3Label: null,
  brMultiple: null,
  brDayLimit: null,
});
const rules = ref({
  hoursLeftPayout:[
    {
      pattern: /^\d{1,2}(\.\d{0,1})?$/,
      message: i18n.global.t("funds.MaxTwoNumberAndOneDecimal"),
      trigger: 'blur',
    }
  ],
  immwdHours:[{required:true,message:i18n.global.t("funds.instantWithdrawalCannotBeEmpty"),trigger:"blur"},
    {
      pattern: /^\d{1,2}(\.\d{0,1})?$/,
      message: i18n.global.t("funds.MaxTwoNumberAndOneDecimal"),
      trigger: 'blur',
    }
  ],
  immwdAddPercent:[{required:true,message:i18n.global.t("funds.addPercentCannotBeEmpty"),trigger:"blur"},
    {
      pattern: /^(100(\.0{1,2})?|\d{1,2}(\.\d{1,2})?)$/,
      message: i18n.global.t("funds.decimalRangeFromZeroToOneHundred"),
      trigger: "blur",
    }
  ],
  immwdLabel:[{
      pattern: /^[\u4e00-\u9fa5a-zA-Z]{1,3}$/,
      message: i18n.global.t("funds.threeCharacterOrLetters"),
      trigger: "blur",
    }],
  appmentwd1Hours:[{required:true,message:i18n.global.t("funds.reserveWithdrawalFirseCannotBeEmpty"),trigger:"blur"},
    {
      pattern: /^\d{1,2}(\.\d{0,1})?$/,
      message: i18n.global.t("funds.MaxTwoNumberAndOneDecimal"),
      trigger: 'blur',
    }
  ],
  appmentwd1AddPercent:[{required:true,message:i18n.global.t("funds.addPercentCannotBeEmpty"),trigger:"blur"},
  {
      pattern: /^(100(\.0{1,2})?|\d{1,2}(\.\d{1,2})?)$/,
      message: i18n.global.t("funds.decimalRangeFromZeroToOneHundred"),
      trigger: "blur",
  }
],
  appmentwd1Label:[{
      pattern: /^[\u4e00-\u9fa5a-zA-Z]{1,3}$/,
      message: i18n.global.t("funds.threeCharacterOrLetters"),
      trigger: "blur",
    }],
  appmentwd2Hours:[{required:true,message:i18n.global.t("funds.reserveWithdrawalTwoCannotBeEmpty"),trigger:"blur"},
    {
      pattern: /^\d{1,2}(\.\d{0,1})?$/,
      message: i18n.global.t("funds.MaxTwoNumberAndOneDecimal"),
      trigger: 'blur',
    }
  ],
  appmentwd2AddPercent:[{required:true,message:i18n.global.t("funds.addPercentCannotBeEmpty"),trigger:"blur"},
  {
      pattern: /^(100(\.0{1,2})?|\d{1,2}(\.\d{1,2})?)$/,
      message: i18n.global.t("funds.decimalRangeFromZeroToOneHundred"),
      trigger: "blur",
  }],
  appmentwd2Label:[{
      pattern: /^[\u4e00-\u9fa5a-zA-Z]{1,3}$/,
      message: i18n.global.t("funds.threeCharacterOrLetters"),
      trigger: "blur",
    }],
  appmentwd3Hours:[{required:true,message:i18n.global.t("funds.reserveWithdrawalThreeCannotBeEmpty"),trigger:"blur"},
    {
      pattern: /^\d{1,2}(\.\d{0,1})?$/,
      message: i18n.global.t("funds.MaxTwoNumberAndOneDecimal"),
      trigger: 'blur',
    }
  ],
  appmentwd3AddPercent:[{required:true,message:i18n.global.t("funds.MaxTwoNumberAndOneDecimal"),trigger:"blur"},
  {
      pattern: /^(100(\.0{1,2})?|\d{1,2}(\.\d{1,2})?)$/,
      message: i18n.global.t("funds.decimalRangeFromZeroToOneHundred"),
      trigger: "blur",
  }],
  appmentwd3Label:[{
      pattern: /^[\u4e00-\u9fa5a-zA-Z]{1,3}$/,
      message: i18n.global.t("funds.threeCharacterOrLetters"),
      trigger: "blur",
    }],
  brMultiple:[{required:true,message:i18n.global.t("funds.doubleMultipleBateCannotBeEmpty"),trigger:"blur"},
    {
      pattern: /^\d{1,3}$/,
      message: i18n.global.t("funds.threePositiveInteger"),
      trigger: "blur",
    }
  ],
  brDayLimit:[{required:true,message:i18n.global.t("funds.everyDayAddLimitAmountCannotBeEmpty"),trigger:"blur"},
    {
      pattern: /^\d{1,6}$/,
      message: i18n.global.t("funds.maxSixPositiveInteger"),
      trigger: "blur",
    }
  ],
})
const isFirstLoad = ref(true);


onMounted(async()=>{
  if(isFirstLoad.value){
    await getReserveList()
    isFirstLoad.value = false
  }
})
function getReserveList(){
  return getAppmentwdList().then(res=>{
    res&&(formData.value = res)
    cloneFormData.value = JSON.parse(JSON.stringify(res))
  })
}
function editTable() {
  reserveType.value = "edit";
}
function saveRecharge() {
  form.value.validate(valid=>{
    if(valid){
      saveAppmentwdList(formData.value).then(res=>{
        proxy.$modal.msgSuccess(i18n.global.t("funds.editSuccessfully"))
        reserveType.value = "info";
      })
    }else{
      return
    }
  })
}
function cancelRecharge() {
  form.value.clearValidate()
  formData.value = JSON.parse(JSON.stringify(cloneFormData.value))
  reserveType.value = "info";
}
onActivated(async()=>{
  if(!isFirstLoad.value){
    await getList();
  }
})
</script>

<style lang="scss" scoped>
.funds-config-reserve-withdraw {
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
  h3{
    font-size:15px;
    color:#333333;
    font-weight: 600;
  }
}
</style>
