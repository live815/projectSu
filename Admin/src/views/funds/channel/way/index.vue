<template>
  <div class="funds-channel-way-index">
    <div class="left">
      <span class="bar-chart"></span>
      <span class="title">{{ $t('funds.withdrawalWayDistribute') }}</span>
      <el-button type="primary" size="small" @click="addRecord" v-hasPermi="['fund:wd-way-assign:add']">{{ $t('funds.add') }}</el-button>
      <div class="right"></div>
    </div>
    <div class="content">
      <el-form
        v-for="(formData, index) in formList"
        :key="index"
        :model="formData"
        ref="form"
        :rules="rules"
        label-width="110px"
        @click="setCurrentIndex(index)"
        :class="{ active: currentIndex === index }"
        class="form-data"
      >
        <el-row>
          <el-col :span="10">
            <el-form-item :label="$t('funds.distributeName')" prop="assignName">
              <el-input
                v-model="formData.assignName"
                clearable
                :placeholder="$t('funds.pleaseInput')"
                :disabled="formData.isEdit"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="14" style="text-align: right">
            <el-button
              type="danger"
              v-hasPermi="['fund:wd-way-assign:edit']"
              size="small"
              @click="editItem(index)"
              v-if="formData.isEdit"
              >{{ $t('funds.edit') }}</el-button
            >
            <el-button
              type="danger"
              size="small"
              @click="cancelItem(index)"
              v-if="!formData.isEdit"
              >{{ $t('funds.cancel') }}</el-button
            >
            <el-button
              type="danger"
              size="small"
              @click="saveItem(index)"
              v-if="!formData.isEdit"
              >{{ $t('funds.save') }}</el-button
            >
            <el-button type="danger" size="small" @click="deleteItem(index)"
            v-hasPermi="['fund:wd-way-assign:remove']">{{ $t('funds.delete') }}</el-button
            >
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item
              :label="$t('funds.financialTier')"
              prop="financeTierName"
              class="full-width"
            >
              <el-select
                v-model="formData.financeTierName"
                :placeholder="$t('funds.pleaseSelect')"
                clearable
                multiple
                class="full-width"
                :disabled="formData.isEdit"
              >
                <el-option
                  v-for="dict in financeLevelList"
                  :key="dict.id"
                  :label="dict.layerName"
                  :value="dict.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item
              :label="$t('funds.vipLevelNoQuote')"
              prop="vipLevelName"
              class="full-width"
            >
              <el-select
                v-model="formData.vipLevelName"
                :placeholder="$t('funds.pleaseSelect')"
                clearable
                multiple
                class="full-width"
                :disabled="formData.isEdit"
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
        </el-row>
        <el-row>
          <el-form-item :label="$t('funds.depositWay')" prop="type">
            <el-checkbox-group v-model="formData.type" :disabled="formData.isEdit">
              <el-checkbox
                v-for="(option, idx) in withdrawList"
                :key="idx"
                :label="option.value"
                @change="setIndex($event, option, index)"
                >{{ option.label }}</el-checkbox
              >
            </el-checkbox-group>
          </el-form-item>
        </el-row>
        <el-row style="padding-left: 60px">
  
          <el-col
            :span="6"
            v-for="(checkboxItem, checkIdx) in formData.wdChannelConfigs"
            :key="checkIdx"
          >
            <div class="bank-card">
              <h3 class="withdraw-h3">{{ checkboxItem.title }}</h3>
              <el-form-item
                :label="$t('funds.quickAmount')"
                :prop="'wdChannelConfigs.' + checkIdx + '.quickAmountName'"
                :rules="rules.quickAmountName"
              >
                <el-select
                  v-model="checkboxItem.quickAmountName"
                  :placeholder="$t('funds.pleaseSelect')"
                  clearable
                  multiple
                  class="full-width"
                  :disabled="formData.isEdit"
                >
                  <el-option
                    v-for="dict in fund_quick_amount"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item :label="$t('funds.inputByHand')" prop="isCustomizeInput">
                <el-switch
                  v-model="checkboxItem.isCustomizeInput"
                  active-value="1"
                  inactive-value="0"
                  :disabled="formData.isEdit"
                ></el-switch>
              </el-form-item>
              <el-form-item :label="$t('funds.normalWithdrawalLimitAmount')" required>
                <el-col :span="8">
                  <el-form-item
                    label=""
                    :prop="'wdChannelConfigs.' + checkIdx + '.normalMinWd'"
                    :rules="rules.normalMinWd"
                  >
                    <el-input
                      v-model="checkboxItem.normalMinWd"
                      :placeholder="$t('funds.pleaseInput')"
                      clearable
                      :disabled="formData.isEdit"
                      maxlength="18"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="2" style="text-align: center">~</el-col>
                <el-col :span="8">
                  <el-form-item
                    label=""
                    :prop="'wdChannelConfigs.' + checkIdx + '.normalMaxWd'"
                    :rules="rules.normalMaxWd"
                  >
                    <el-input
                      v-model="checkboxItem.normalMaxWd"
                      clearable
                      :placeholder="$t('funds.pleaseInput')"
                      :disabled="formData.isEdit"
                      maxlength="18"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <el-form-item :label="$t('funds.largeWithdrawalLimitAmount')" required>
                <el-col :span="8">
                  <el-form-item
                    label=""
                    :prop="'wdChannelConfigs.' + checkIdx + '.largeMinWd'"
                    :rules="rules.largeMinWd"
                  >
                    <el-input
                      v-model="checkboxItem.largeMinWd"
                      :placeholder="$t('funds.pleaseInput')"
                      clearable
                      :disabled="formData.isEdit"
                      maxlength="18"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="2" style="text-align: center">~</el-col>
                <el-col :span="8">
                  <el-form-item
                    label=""
                    :prop="'wdChannelConfigs.' + checkIdx + '.largeMaxWd'"
                    :rules="rules.largeMaxWd"
                  >
                    <el-input
                      v-model="checkboxItem.largeMaxWd"
                      clearable
                      :placeholder="$t('funds.pleaseInput')"
                      :disabled="formData.isEdit"
                      maxlength="18"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script setup name="Dispensing-way">
import i18n from "@/i18n";
import { getVIPList } from "@/api/funds/config/index";
import { getRiskFinancalList } from "@/api/risk/level/index";
import {
  getWdWayAssignAdd,
  getWdWayAssignDelete,
  getWdWayAssignEdit,
  getWdWayAssignList,
} from "@/api/funds/channel/index";
import { deepCopy } from "@/utils/index";

const { proxy } = getCurrentInstance();
const { fund_quick_amount } = proxy.useDict("fund_quick_amount");
const form = ref(null);
const formList = ref([]);
const formListClone = ref([]);
const rules = ref({
  financeTierName: [
    {
      type: "array",
      required: true,
      message: i18n.global.t("funds.financialTierCannotEmpty"),
      trigger: "change",
    },
  ],
  vipLevelName: [
    {
      type: "array",
      required: true,
      message: i18n.global.t("funds.VIPLevelCannotEmpty"),
      trigger: "change",
    },
  ],
  quickAmountName: [
    {
      type: "array",
      required: true,
      message: i18n.global.t("funds.quickAmountCannotEmpty"),
      trigger: "change",
    },
  ],
  normalMinWd: [{ required: true,validator: validateMinMaxValue,trigger:'blur' }],
  normalMaxWd: [{ required: true,validator: validateMinMaxValue,trigger:'blur' }],
  largeMinWd:[{ required: true,validator: validateMinMaxValue, trigger: 'blur' }],
  largeMaxWd:[{ required: true,validator: validateMinMaxValue, trigger: 'blur' }]
});
const financeLevelList = ref([]);
const vipLevelList = ref([]);
const withdrawList = ref([
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
  }
]);
function setIndex(checked, item, index) {
  let idx = formList.value[index].wdChannelConfigs.findIndex(
    (itm) => itm.title === item.label
  );
  if (checked && idx < 0) {
    formList.value[index].wdChannelConfigs.push({
      title: item.label,
      wdWayType: item.value.toString(),
      isCustomizeInput: 0,
      normalMinWd: null,
      normalMaxWd: null,
      largeMaxWd: null,
      largeMinWd: null,
      quickAmount: null,
      quickAmountName: [],
    });
  } else {
    formList.value[index].wdChannelConfigs.splice(idx, 1);
  }
  formList.value[index].wdChannelConfigs.sort((a,b)=>a.wdWayType-b.wdWayType)
}
onMounted(async () => {
  await queryVIP();
  await getList();
  await queryTier();
});
//查询VIP层级
async function queryVIP() {
  return getVIPList().then((res) => {
    vipLevelList.value = res || [];
  });
}
//查询财务层级
async function queryTier() {
  return getRiskFinancalList(1).then((res) => {
    financeLevelList.value = res || [];
  });
}
function getList() {
  return getWdWayAssignList().then((res) => {
    formList.value = res || [];
    formList.value.forEach((item) => {
      item.vipLevelName = item.vipLevel.split(",").map((item) => Number(item));
      item.financeTierName = item.financeTier
        .split(",")
        .map((item) => Number(item));
      item.type = item.wdChannelConfigs.map((typeItem) => typeItem.wdWayType);
      item.wdChannelConfigs.forEach((list) => {
        list.quickAmountName = list.quickAmount
          .split(",")
          // .map((item) => Number(item));
        let obj = withdrawList.value.find(
          (withdraw) => withdraw.value == list.wdWayType
        );
        obj && (list.title = obj.label);
      });
      item.isEdit = true
      item.cloneData = JSON.parse(JSON.stringify(item))
    });
    formListClone.value = deepCopy(formList.value);
  });
}
function setCurrentIndex(index){
  currentIndex.value = index
}
function addRecord() {
    const lastIndex = formList.value.length - 1;
  if (lastIndex >= 0) {
    form.value[lastIndex].validate((valid) => {
      if (!valid) {
        setCurrentIndex(lastIndex)
        return; // 上一个表单数据未填写完毕，不允许新增
      }
      // 上一个表单数据已填写完毕，可以新增
      formList.value.push({
        isEdit: false,
        assignName: null,
        financeTier: null,
        financeTierName: [],
        vipLevel: null,
        vipLevelName: [],
        type: [],
        wdChannelConfigs: []
      });
    });
  } else {
    // 第一个表单数据
    formList.value.push({
      isEdit: false,
      assignName: null,
      financeTier: null,
      financeTierName: [],
      vipLevel: null,
      vipLevelName: [],
      type: [],
      wdChannelConfigs: []
    });
  }
  setCurrentIndex(lastIndex>=0?lastIndex+1:0)
  scrollToBottom()
}
// 新增的时候回到底部
function scrollToBottom() {
  // 获取页面内容的高度
  setTimeout(()=>{
    const pageHeight = document.querySelector('.content').scrollHeight;
  
  // 滚动到底部，滚动位置设置为页面内容的底部
  document.querySelector('.content').scrollTo({
    top: pageHeight,
    behavior: 'smooth' // 添加平滑滚动效果
  })
  },0);
}
function deleteItem(index) {
  proxy.$modal.confirm(i18n.global.t("funds.areYouSureToDeleteData")).then(() => {
  if(formList.value[index].assignId){
    getWdWayAssignDelete(formList.value[index].assignId).then(()=>{
      proxy.$modal.msgSuccess(i18n.global.t("funds.deleteSuccessfully"))
      getList()
    })
  }else{
    form.value[index].clearValidate()
    formList.value.splice(index, 1);
  }
  }).catch(()=>{})
}
function editItem(index) {
  formList.value[index].isEdit = false;
}
function saveItem(index) {
  form.value[index].validate((valid) => {
    if (valid) {
      let obj = formList.value[index];
      obj.vipLevel = obj.vipLevelName.join(",");
      obj.financeTier = obj.financeTierName.join(",");
      obj.wdChannelConfigs.forEach((itm) => {
        itm.quickAmount = itm.quickAmountName.join(",");
      });
      if (formList.value[index].assignId) {
        getWdWayAssignEdit(formList.value[index]).then((res) => {
          proxy.$modal.msgSuccess(i18n.global.t("funds.editSuccessfully"));
          getList();
        });
      } else {
        getWdWayAssignAdd(formList.value[index]).then((res) => {
          proxy.$modal.msgSuccess(i18n.global.t("funds.addedSuccessfully"));
          getList();
        });
      }
    } else {
      return;
    }
  });
}
function cancelItem(index) {
  formList.value[index].isEdit = true;
  if(formList.value[index].assignId){
      console.log(formList.value[index].assignId,'ID')
      formList.value[index] = deepCopy(formListClone.value)[index]
      form.value[index].resetFields()
  }else{
      form.value[index].resetFields()
  }
  
}
//校验金额区间规则
const currentIndex = ref(0);
function validateMinMaxValue(rule, value, callback) {
  // 自定义校验逻辑
  if (isNaN(value)) {
    callback(new Error(i18n.global.t("funds.pleaseInputInvaildNumber")));
  } else if (!Number.isInteger(Number(value)) || parseInt(value, 10) < 0) {
    callback(new Error(i18n.global.t("funds.positiveInteger")));
  }else if (value==='') {
    callback(new Error(i18n.global.t("funds.pleaseInputLimitAmount")));
  } else {
      callback(); // 校验通过
  }
}
function validateMinMaxValuePersonal(rule, value, callback) {
  // 自定义校验逻辑
  if (isNaN(value)) {
    callback(new Error(i18n.global.t("funds.pleaseInputInvaildNumber")));
  } else if (!Number.isInteger(Number(value)) || parseInt(value, 10) < 0) {
    callback(new Error(i18n.global.t("funds.positiveInteger")));
  } else {
    const minValue = parseFloat(
      formList.value[currentIndex.value].personal.normalMinWd
    );
    const maxValue = parseFloat(
      formList.value[currentIndex.value].personal.normalMaxWd
    );

    if (!isNaN(minValue) && !isNaN(maxValue) && minValue > maxValue) {
      callback(new Error(i18n.global.t("funds.startValueCannotBeGreaterThanEndValue")));
    } else {
      callback(); // 校验通过
    }
  }
}
function validateMinMaxValueUSDT(rule, value, callback) {
  // 自定义校验逻辑
  if (isNaN(value)) {
    callback(new Error(i18n.global.t("funds.pleaseInputInvaildNumber")));
  } else if (!Number.isInteger(Number(value)) || parseInt(value, 10) < 0) {
    callback(new Error(i18n.global.t("funds.positiveInteger")));
  } else {
    const minValue = parseFloat(
      formList.value[currentIndex.value].usdt.normalMinWd
    );
    const maxValue = parseFloat(
      formList.value[currentIndex.value].usdt.normalMaxWd
    );

    if (!isNaN(minValue) && !isNaN(maxValue) && minValue > maxValue) {
      callback(new Error(i18n.global.t("funds.startValueCannotBeGreaterThanEndValue")));
    } else {
      callback(); // 校验通过
    }
  }
}
</script>

<style lang="scss" scoped>
.funds-channel-way-index {
  padding: 20px;
  height:100%;
  .left {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
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
      margin-right: 12px;
    }
  }
  .content {
    height: calc(100vh - 84px - 40px - 40px);
    overflow: auto;
    .bank-card {
      border-right: 1px solid gray;
      padding: 0 12px;
      .withdraw-h3 {
        font-size: 13px;
        color: #333333;
        font-weight: 600;
      }
    }
    .form-data {
      margin: 15px;
      padding: 15px;
      &.active {
        background-color: rgba(95, 164, 232, 0.1);
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
        border-radius: 15px;
      }
    }
  }
}
</style>
