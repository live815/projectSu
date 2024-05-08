<template>
  <div class="funds-config-seperate-index">
    <div class="header">
      <div class="left">
        <span class="bar-chart"></span>
        <span class="title">{{ $t('funds.withdrawalSeparateOrderSetting') }}</span>
        <el-button type="primary" size="small" @click="addRecord"
          >{{ $t('funds.add') }}</el-button
        >
        <div class="right"></div>
      </div>
    </div>
    <div class="content">
      <el-form
        v-for="(formData, index) in formList"
        :key="formData.assignId"
        :model="formData"
        ref="form"
        :rules="rules"
        label-width="80px"
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
                :disabled="formData.isDisabled"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="14" style="text-align: right">
            <el-button
              type="primary"
              size="small"
              @click="editData(index)"
              v-if="formData.isDisabled"
              >{{ $t('funds.edit') }}</el-button
            >
            <el-button
              size="small"
              v-if="!formData.isDisabled"
              @click="cancel(index)"
              >{{ $t('funds.cancel') }}</el-button
            >
            <el-button
              type="primary"
              size="small"
              v-if="!formData.isDisabled"
              @click="submitForm(index)"
              >{{ $t('funds.save') }}</el-button
            >
            <el-button type="danger" size="small" @click="deleteItem(index)"
              >{{ $t('funds.delete') }}</el-button
            >
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item
              :label="$t('funds.financialTier')"
              prop="financeTierClone"
              class="full-width"
            >
              <el-select
                v-model="formData.financeTierClone"
                :placeholder="$t('funds.pleaseSelect')"
                clearable
                multiple
                class="full-width"
                :disabled="formData.isDisabled"
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
              prop="vipLevelClone"
              class="full-width"
            >
              <el-select
                v-model="formData.vipLevelClone"
                :placeholder="$t('funds.pleaseSelect')"
                clearable
                multiple
                class="full-width"
                :disabled="formData.isDisabled"
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
          <el-col :span="10">
            <el-form-item :label="$t('funds.amountRange')" required>
              <el-col :span="8">
                <el-form-item label="" prop="minPayAmount">
                  <el-input
                    v-model="formData.minPayAmount"
                    clearable
                    :placeholder="$t('funds.pleaseInput')"
                    :disabled="formData.isDisabled"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2" style="text-align: center">~</el-col>
              <el-col :span="8">
                <el-form-item label="" prop="maxPayAmount">
                  <el-input
                    v-model="formData.maxPayAmount"
                    clearable
                    :placeholder="$t('funds.pleaseInput')"
                    :disabled="formData.isDisabled"
                    
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item :label="$t('funds.withdrawChannel')">
              <el-table
                :data="formData.poaChannelsShow"
                border
                @select="handleSelect($event, formData)"
                @select-all="handleSelectAll($event, formData)"
                row-key="mchChannelId"
                ref="tablesRef"
                max-height="500"
              >
                <el-table-column
                  type="selection"
                  width="55"
                  align="center"
                  :key="formData.isDisabled"
                  :selectable="() => !formData.isDisabled"
                />
                <el-table-column
                  :label="$t('funds.weightsNoQuote')"
                  prop="weights"
                  align="center"
                ></el-table-column>
                <el-table-column
                  :label="$t('funds.withdrawalStoreName')"
                  prop="mchName"
                  align="center"
                ></el-table-column>
                <el-table-column
                  :label="$t('funds.channelTypeNoquote')"
                  prop="channelTypeName"
                  align="center"
                ></el-table-column>
                <el-table-column
                  :label="$t('funds.availableBalance')"
                  prop="channelBal"
                  align="center"
                  width="260"
                >
                <template #default="{row}">
                  <span v-if="row.channelTypeCode==='BANK'">{{ row.channelBal }}</span>
                  <template v-if="row.channelTypeCode==='USDT'">
                    <template v-if="row.wallets">
                      <div v-for="([key,wallet]) in Object.entries(row.wallets)" :key="key">
                      <span>{{ key }}:</span>
                      <span>{{ wallet.balance }}</span>
                      </div>
                    </template>
                    <span v-else>-</span>
                  </template>
                </template>
              </el-table-column>
                <el-table-column
                  :label="$t('funds.autoWithdrawalLimitAmount')"
                  prop="limitAmount"
                  align="center"
                  width="180"
                >
                  <template #default="{ row, $index }">
                    <el-form-item
                      :prop="`poaChannelsShow.${$index}.limitAmount`"
                      :rules="rules.limitAmount"
                      class="value-recharge"
                    >
                      <el-input
                        v-model="row.limitAmount"
                        clearable
                        :placeholder="$t('funds.pleaseInput')"
                        :disabled="formData.isDisabled"
                      ></el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('funds.handle')" align="center">
                  <template #default="{ row }">
                    <el-button type="primary" size="small" @click="syncBalance(row)">{{ $t('funds.syncBalance') }}</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script setup name="Seperate">
import i18n from "@/i18n";
import {
  getVIPList,
  getChannelList,
  getAssignList,
  getAssignEdit,
  getAssignAdd,
  getAssignDelete,
  getBalance
} from "@/api/funds/config/index";
import { getRiskFinancalList } from "@/api/risk/level/index";
import { getCurrentInstance, nextTick, onMounted } from "vue";
import { deepCopy } from "@/utils/index";

const { proxy } = getCurrentInstance();
const form = ref(null);
const tablesRef = ref([]);
const formList = ref([]);
const formListClone = ref([]); 
const rules = ref({
  financeTierClone: [
    {
      type: "array",
      required: true,
      message: i18n.global.t("funds.financialTierCannotEmpty"),
      trigger: "change",
    },
  ],
  vipLevelClone: [
    {
      type: "array",
      required: true,
      message: i18n.global.t("funds.VIPLevelCannotEmpty"),
      trigger: "change",
    },
  ],
  minPayAmount: [
    {
      required: true,
      validator: validateMinMaxValue,
      trigger: ["change", "blur"],
    },
  ],
  maxPayAmount: [
    {
      required: true,
      validator: validateMinMaxValue,
      trigger: ["change", "blur"],
    },
  ],
  limitAmount:[{
      pattern: /^(0|[1-9]\d{0,4})(\.\d{1,2})?$/,
      message: i18n.global.t("funds.fivePositiveIntegerAndTwoDecimal"),
      trigger: "blur",
    }]
});
const financeLevelList = ref([]);
const vipLevelList = ref([]);
const channelList = ref([]);

onMounted(async () => {
  await queryVIP();
  await queryChannel();
  await queryAssignList();
  await queryTier();
});
async function queryVIP() {
  return getVIPList().then((res) => {
    vipLevelList.value = res || [];
  });
}
async function queryTier() {
  return getRiskFinancalList(1).then((res) => {
    financeLevelList.value = res || [];
  });
}
async function queryChannel() {
  return getChannelList().then((res) => {
    channelList.value = res || [];
  });
}
async function queryAssignList() {
  return getAssignList().then((res) => {
    formList.value = res.sort((a, b) => a.assignId - b.assignId) || [];
    formList.value.forEach((item, index) => {
      item.isDisabled = true;
      item.vipLevelClone =
        item.vipLevel.split(",").map((child) => Number(child)) || [];
      item.financeTierClone =
        item.financeTier.split(",").map((child) => Number(child)) || [];
      item.poaChannelsShow = combineData(item.poaChannels);

      nextTick(() => {
        item.poaChannels.forEach((row) => {
          let currentRow = item.poaChannelsShow.find(
            (item) => row.mchChannelId === item.mchChannelId
          );
          if (currentRow) {
            tablesRef.value[index].toggleRowSelection(currentRow, true);
          }
        });
        console.log(item.poaChannels.length===item.poaChannelsShow.length)
        item.poaChannels.length!==item.poaChannelsShow.length&&tablesRef.value[index].toggleAllSelection()
      });
    });
    formListClone.value = deepCopy(formList.value)
  });
}
function setCurrentIndex(index) {
  currentIndex.value = index;
}
function syncBalance(row){
  getBalance({
    mchId:row.mchId,
    channelTypeCode:row.channelTypeCode
  }).then(res=>{
    if(row.channelTypeCode==="BANK"){
      row.channelBal = res.balance || 0
    }else if(row.channelTypeCode==='USDT'){
      row.wallets = res.wallets || {}
    }
  })
}
function addRecord() {
  const lastIndex = formList.value.length - 1;
  if (lastIndex >= 0) {
    form.value[lastIndex].validate((valid) => {
      if (!valid) {
        setCurrentIndex(lastIndex);
        console.log("上一个表单数据未填写完毕，不允许新增");
        return; // 上一个表单数据未填写完毕，不允许新增
      }
      // 上一个表单数据已填写完毕，可以新增
      console.log(channelList.value);
      formList.value.push({
        isDisabled: false,
        assignName: null,
        financeTier: null,
        financeTierClone: [],
        vipLevel: null,
        vipLevelClone: [],
        minPayAmount: null,
        maxPayAmount: null,
        poaChannels: [],
        poaChannelsShow: JSON.parse(JSON.stringify(channelList.value)), //
      });
    });
  } else {
    // 第一个表单数据
    formList.value.push({
      isDisabled: false,
      assignName: null,
      financeTier: null,
      financeTierClone: [],
      vipLevel: null,
      vipLevelClone: [],
      minPayAmount: null,
      maxPayAmount: null,
      poaChannels: [],
      poaChannelsShow: JSON.parse(JSON.stringify(channelList.value)),
    });
  }
  setCurrentIndex(lastIndex >= 0 ? lastIndex + 1 : 0);
  scrollToBottom();
}
function scrollToBottom() {
  // 获取页面内容的高度
  setTimeout(() => {
    const pageHeight = document.querySelector(".content").scrollHeight;

    // 滚动到底部，滚动位置设置为页面内容的底部
    document.querySelector(".content").scrollTo({
      top: pageHeight,
      behavior: "smooth", // 添加平滑滚动效果
    });
  }, 0);
}
function deleteItem(index) {
  proxy.$modal
    .confirms(i18n.global.t("funds.areYouSureToDeleteData"),i18n.global.t("funds.tip"))
    .then(() => {
      if (formList.value[index].assignId) {
        getAssignDelete(formList.value[index].assignId).then((res) => {
          proxy.$modal.msgSuccess(i18n.global.t("funds.deleteSuccessfully"));
          queryAssignList();
        });
      } else {
        formList.value.splice(index, 1);
      }
    })
    .catch(() => {});
  // !formList.value.length&&(type.value = 'info')
}
function editData(index) {
  formList.value[index].isDisabled = false;
}
function submitForm(index) {
  form.value[index].validate((valid) => {
    if (valid) {
      formList.value[index].financeTier =
        formList.value[index].financeTierClone.join(",");
      formList.value[index].vipLevel =
        formList.value[index].vipLevelClone.join(",");
      formList.value[index].poaChannelsShow.forEach(poaShow=>{
        formList.value[index].poaChannels.forEach(poa=>{
          if(poa.mchChannelId===poaShow.mchChannelId){
            poa.limitAmount = poaShow.limitAmount
          }
        })
      })
      console.log(formList.value[index].poaChannels,666)
      if (formList.value[index].assignId) {
        getAssignEdit(formList.value[index]).then((res) => {
          proxy.$modal.msgSuccess(i18n.global.t("funds.editSuccessfully"));
          queryAssignList();
        });
      } else {
        getAssignAdd(formList.value[index]).then((res) => {
          proxy.$modal.msgSuccess(i18n.global.t("funds.addedSuccessfully"));
          queryAssignList();
        });
      }
    } else {
      return;
    }
  });
}
function cancel(index) {
  // form.value[index].clearValidate();
  // formList.value[index].isDisabled = true;
  // formList.value[index].isDisabled = true;
  if(formList.value[index].assignId){
      formList.value[index] = deepCopy(formListClone.value)[index];
      nextTick(() => {
        formList.value[index].poaChannels.forEach((row) => {
          let currentRow = formList.value[index].poaChannelsShow.find(
            (item) => row.mchChannelId === item.mchChannelId
          );
          if (currentRow) {
            tablesRef.value[index].toggleRowSelection(currentRow, true);
          }
        });
      })
      form.value[index].resetFields();
      formList.value[index].isDisabled = true;
  }else{
      form.value[index].resetFields();
      formList.value[index] = {
        isDisabled: false,
        assignName: null,
        financeTier: null,
        financeTierClone: [],
        vipLevel: null,
        vipLevelClone: [],
        minPayAmount: null,
        maxPayAmount: null,
        poaChannels: [],
        poaChannelsShow: JSON.parse(JSON.stringify(channelList.value)),
      }
  }
}
function handleSelect(selection, formData) {
  console.log(selection, formData);
  formData.poaChannels = selection;
}
function handleSelectAll(selection, formData) {
  formData.poaChannels = selection;
}

//校验金额区间规则
const currentIndex = ref(0);
function validateMinMaxValue(rule, value, callback) {
  // 自定义校验逻辑
  if (isNaN(value)) {
    callback(new Error(i18n.global.t("funds.pleaseInputInvaildNumber")));
  } else if (!Number.isInteger(Number(value)) || parseInt(value, 10) < 0) {
    callback(new Error(i18n.global.t("funds.positiveInteger")));
  } else if (value === "") {
    callback(new Error(i18n.global.t("funds.pleaseInputAmountRange")));
  } else {
    callback(); // 校验通过
  }
}

//组合数据方法
function combineData(selectedList) {
  let newChannelList = JSON.parse(JSON.stringify(channelList.value));
  selectedList.forEach((item) => {
    newChannelList.forEach((channel) => {
      if (item.mchChannelId === channel.mchChannelId) {
        channel.limitAmount = item.limitAmount;
      }
    });
  });
  return newChannelList;
}
</script>

<style lang="scss" scoped>
.funds-config-seperate-index {
  padding: 20px;
  height: 100%;
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
        margin-right: 12px;
      }
    }
  }
  .content {
    height: calc(100vh - 84px - 44px - 40px);
    overflow: auto;
    .value-recharge {
      margin: 18px 0;
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
