<template>
  <div class="withdraw-alert-config">
    <!-- 银行卡提现 -->
    <el-row :gutter="10">
      <el-col
        :span="12"
        v-for="(formData, formIndex) in formList"
        :key="formData.id"
        :style="{ order: formData.order }"
      >
        <div class="content">
          <div class="common">
            <div class="left">
              <span class="title-bar"></span>
              <h3>{{ titleChange(formData.wdWayType) }}</h3>
            </div>
            <div class="right">
              <el-button
                type="primary"
                size="small"
                v-if="formData.isDisabled"
                @click="formData.isDisabled = false"
                >{{ $t('funds.edit') }}</el-button
              >
              <el-button
                size="small"
                v-if="!formData.isDisabled"
                @click="formData.isDisabled = true"
                >{{ $t('funds.cancel') }}</el-button
              >
              <el-button
                type="primary"
                size="small"
                v-if="!formData.isDisabled"
                @click="submitBank(formData, formIndex)"
                >{{ $t('funds.save') }}</el-button
              >
            </div>
          </div>
          <el-form :model="formData" ref="form" :rules="rules">
            <el-row>
              <el-col :span="24" style="padding-bottom: 20px;">
                <el-form-item
                  label=""
                  :prop="'formList.' + formIndex + '.content'"
                  class="full-width"
                  :rules="rules.content"
                >
                  <Editor
                    v-model="formData.content"
                    class="full-width"
                    :readOnly="formData.isDisabled"
                    :key="formData.isDisabled"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { getContentList, editContentList } from "@/api/funds/config/index";
import { Base64 } from "js-base64";
const form = ref(null);
const { proxy } = getCurrentInstance();

const formList = ref([]);
const rules = ref({
  // content: [{ required: true, message: "请输入提现提示内容", trigger: "blur" }],
});

// 获取提现提示设置
queryContentList();
function queryContentList() {
  getContentList().then((res) => {
    formList.value = res || [];
    formList.value &&
      formList.value.forEach((item) => {
        item.content = item.content
          ? Base64.decode(item.content)
          : "";
        item.isDisabled = true;
        item.order = setOrder(item.wdWayType)
      });
  });
}

function setOrder(wdWayType){
  switch (wdWayType) {
    case "0":
      return 1; // 如果状态为0，排序顺序1
    case "1":
      return 3; // 如果状态为1，排序顺序3
    case "2":
      return 5; // 如果状态为2，排序顺序5
    case "3":
      return 10; // 如果状态为3，排序顺序7
    case "4":
      return 2; // 如果状态为4，排序顺序2
    case "5":
      return 4; // 如果状态为5，排序顺序4
    case "6":
      return 6; // 如果状态为6，排序顺序6
    case "7":
      return 9; // 如果状态为7，排序顺序8
    case "8":
      return 7; // 如果状态为7，排序顺序8
    case "9":
      return 8; // 如果状态为7，排序顺序8
    default:
      return 1; // 默认情况下，应用黑色字体的class
  }
}


function titleChange(wdWayType) {
  switch (wdWayType) {
    case "0":
      return i18n.global.t("funds.bankCardWithdrawlTip"); // 如果状态为0，银行卡提现提示
    case "1":
      return i18n.global.t("funds.personalWithdrawlTip"); // 如果状态为1，专属提现提示
    case "2":
      return i18n.global.t("funds.usdtWithdrawlTip"); // 如果状态为2，USDT提现提示
    case "3":
      return i18n.global.t("funds.reserveWithdrawlObserve"); // 如果状态为3，预约提现说明
    case "4":
      return i18n.global.t("funds.bankCardWithdrawlingTip"); // 如果状态为4，银行卡提现中提示
    case "5":
      return i18n.global.t("funds.personalWithdrawlingTip"); // 如果状态为5，专属提现中提示
    case "6":
      return i18n.global.t("funds.usdtWithdrawlingTip"); // 如果状态为6，USDT提现中提示
    case "7":
      return i18n.global.t("funds.howToGetFreeWithdrawlTimes"); // 如果状态为7，如何获取免费提现次数
    case "8":
      return i18n.global.t("funds.ebpayWithdrawal"); // 如果状态为8，EBPAY提现提示
    case "9":
      return i18n.global.t("funds.ebpayIsWithdrawing"); // 如果状态为9，EBPAY提现中提示
    default:
      return "text-black"; // 默认情况下，应用黑色字体的class
  }
}
// 银行卡提现编辑保存
function submitBank(formData, index) {
  form.value[index].validate((valid) => {
    if (valid) {
      formData.content = Base64.encode(formData.content);
      editContentList(formData).then((res) => {
        proxy.$modal.msgSuccess(i18n.global.t("funds.editSuccessfully"));
        queryContentList();
      });
    }
  });
}
//校验编辑器内容
// function validateEditor(rule,value,callback){
//   console.log(value,667788)
//   if(value==='<h3><br></h3>'||value==='<p><br></p>'){
//     callback(new Error('富文本内容不能为空'))
//   }else{
//     callback()
//   }
// }
</script>

<style lang="scss" scoped>
.withdraw-alert-config {
  .common {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    .left {
      display: flex;
      & h3 {
        margin: 0;
        font-weight: 600;
      }
      .title-bar {
        width: 15px;
        height: 21px;
        background-color: #1890ff;
        margin-right: 8px;
      }
    }
  }
}
</style>
