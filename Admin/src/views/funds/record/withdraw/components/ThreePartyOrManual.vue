<template>
  <div class="three-party-manual-dialog">
    <el-dialog
      v-model="dialogVisible"
      width="60%"
      :title="withdrawType === 'three' ? $t('funds.threePartyPayment') : $t('funds.manualWithdrawal')"
      :before-close="cancel"
      :close-on-click-modal="false"
    >
      <el-form
        :model="form"
        ref="queryRef"
        :inline="true"
        label-position="right"
      >
        <h3>{{ $t('funds.memberInformation') }}</h3>
        <el-row>
          <el-col :span="6">
            <el-form-item :label="$t('funds.userName')" prop="userName">
              <span>{{ form.userName || "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.vipLevel')" prop="vipLevel">
              <span>{{ form.vipLevel ||form.vipLevel===0 ?form.vipLevel: "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.financialTierQuote')" prop="vipLevel">
              <span>{{ form.financeTierName || "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.riskTierQuote')" prop="riskTierName">
              <span>{{ form.riskTierName || "-" }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <h3>{{ $t('funds.orderInformation') }}</h3>
        <el-row>
          <el-col :span="6">
            <el-form-item :label="$t('funds.orderNoQuote')" prop="orderNo">
              <span>{{ form.orderNo || "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.withdrawlWay')" prop="wdWayType">
              <span>{{
                switchWdWayTypeStatus(wdWayTypeList, form.wdWayType)
              }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.withdrawType')" prop="wdType">
              <span>{{ switchWdTypeStatus(wdTypeList, form.wdType) }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.orderStatus')" prop="status">
              <span :class="colorChange(form.status)">{{
                switchStatus(statusArrList, form.status)
              }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.recieveMoneyTime')" prop="paymentTime">
              <span>{{ form.paymentTime || "-" }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <h3>{{ $t('funds.withdrawAmount') }}</h3>
        <el-row>
          <el-col :span="6">
            <el-form-item :label="$t('funds.withdrawAmount')" prop="amount">
              <span>{{ formatNumber(form.amount) }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="form.orderType === '1'">
            <el-form-item :label="$t('funds.rechargeRateQuote')" prop="rate">
              <span>{{ !isNaN(form.rate) ? form.rate : "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="form.orderType === '1'">
            <el-form-item :label="$t('funds.usdtNumber')" prop="usdtNum">
              <span>{{ !isNaN(form.usdtNum) ? form.usdtNum : "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.reserveLimitHour')" prop="appmentHours">
              <span>{{
                !isNaN(form.appmentHours) ? form.appmentHours + "h" : "-"
              }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.addPercent')" prop="addPercent">
              <span>{{
                !isNaN(form.addPercent) ? form.addPercent + "%" : "-"
              }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.addBonus')" prop="addBouns">
              <span>{{ formatNumber(form.addBouns) }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.wdFee')" prop="wdFee">
              <span>{{ formatNumber(form.wdFee) }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <h3>{{ $t('funds.recieveMoneyInformation') }}</h3>
        <el-row v-if="form.orderType === '0'">
          <el-col :span="6">
            <el-form-item :label="$t('funds.recieveMoneyPersonName')" prop="payeeName">
              <span>{{ form.payeeName || "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.recieveMoneyBank')" prop="payeeBankName">
              <span>{{ form.payeeBankName || "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.recieveMoneyCardNo')" prop="payeeCardNo">
              <span>{{ form.payeeCardNo || "-" }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="form.orderType === '1'">
          <el-col :span="6">
            <el-form-item :label="$t('funds.protocol')" prop="tradeProtocol">
              <span>{{ form.tradeProtocol || "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.tradeAddr')" prop="tradeAddr">
              <span>{{ form.tradeAddr || "-" }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider></el-divider>
      </el-form>
      <el-form :model="queryParams" ref="submitRef" :rules="rules">
        <el-row>
          <el-col :span="14">
            <el-form-item :label="$t('funds.outMoneyAmount')" prop="widtdrawMoney">
              <!-- <el-input
                v-model="form.amount-form.wdFee"
                clearable
                disabled
              ></el-input> -->
              <span>{{ form.amount - form.wdFee }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="14" v-if="withdrawType === 'three'">
            <el-form-item :label="$t('funds.withdrawalStoreNameQuote')" prop="mchId" class="full-width">
              <el-select
                v-model="queryParams.mchId"
                :placeholder="$t('funds.pleaseSelect')"
                clearable
                class="full-width"
              >
                <el-option
                  v-for="dict in accountShowList"
                  :key="dict.mchId"
                  :label="dict.mchName"
                  :value="dict.mchId"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item :label="$t('funds.remarkQuote')" prop="paymentMark">
              <el-input
                type="textarea"
                v-model="queryParams.paymentMark"
                maxlength="200"
                :placeholder="$t('funds.pleaseInput')"
                show-word-limit
                :rows="5"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="cancel"> {{ $t('funds.cancel') }} </el-button>
          <el-button type="primary" @click="submit"> {{ $t('funds.ensureOutMoney') }} </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { getToken } from "@/utils/auth";
import { getImgUrl } from "@/utils";
import {
  getWithdrawlOrderInfo,
  manualPayout,
  thirdPayout,
} from "@/api/funds/record/index";
import { getMchchannelList } from "@/api/funds/common";
import { onMounted } from "vue";
import {
  colorChange,
  switchStatus,
  switchWdTypeStatus,
  switchWdWayTypeStatus,
} from "../common";
import { formatNumber } from "@/utils/index";

const props = defineProps([
  "openThreeOrManual",
  "cloneRow",
  "withdrawType",
  "statusArrList",
  "wdTypeList",
  "wdWayTypeList",
]);
const emit = defineEmits(["update:openThreeOrManual", "threeOrManualfresh"]);
const headers = ref({ Authorization: "Bearer " + getToken() });

const { proxy } = getCurrentInstance();
const queryRef = ref(null);
const dialogVisible = computed({
  get() {
    return props.openThreeOrManual;
  },
  set(val) {
    emit("update:openThreeOrManual", val);
  },
});
const form = ref({});

const submitRef = ref(null);
const queryParams = ref({
  mchName:null,
  mchId: null,
  paymentMark: null,
});
const rules = ref({
  mchId: [{ required: true, message: i18n.global.t("funds.pleasePaymentStore"), trigger: "change" }],
  paymentMark: [{ required: true, message: i18n.global.t("funds.pleaseInputRemark"), trigger: "blur" }],
});

const accountList = ref([]);
const accountShowList = ref([]);
onMounted(async () => {
  await queryDetailInfo();
  props.withdrawType === "three" && (await queryChannelList());
});
function queryDetailInfo() {
  return getWithdrawlOrderInfo(props.cloneRow.orderNo).then((res) => {
    form.value = res || {};
  });
}
function queryChannelList() {
  return getMchchannelList().then((res) => {
    if (form.value.orderType === "0") {
      accountList.value = res.filter((bank) => bank.channelTypeCode === "BANK");
      accountShowList.value = JSON.parse(JSON.stringify(accountList.value));
      accountShowList.value.forEach(item=>{
        item.mchName = item.mchName + i18n.global.t("funds.balanceChracters") + item.channelBal + i18n.global.t("funds.endChracters")
      })
    } else if(form.value.orderType === "1") {
      accountList.value = res.filter((bank) => bank.channelTypeCode === "USDT");
      accountShowList.value = JSON.parse(JSON.stringify(accountList.value));
      accountShowList.value.forEach(item => {
        let walletInfo = Object.entries(item.wallets).map(([key, value]) => {
          let type = key.split('_')[1] || key;
          return `${type}${i18n.global.t("funds.balance")}${value.balance}`;
        }).join(',');

        item.mchName = `${item.mchName}(${walletInfo})`;
      })
    }else if(form.value.orderType === "3"){
      accountList.value = res.filter((bank) => bank.channelTypeCode === "EBPAY");
      accountShowList.value = JSON.parse(JSON.stringify(accountList.value));
      accountShowList.value.forEach(item=>{
        item.mchName = item.mchName + i18n.global.t("funds.balanceChracters") + item.channelBal + i18n.global.t("funds.endChracters")
      })
    }
  });
}
function cancel() {
  dialogVisible.value = false;
}
function submit() {
  submitRef.value.validate((valid) => {
    if (valid) {
      if (props.withdrawType === "manual") {
        manualPayout({
          paymentMark: queryParams.value.paymentMark,
          orderNo: props.cloneRow.orderNo,
        }).then((res) => {
          proxy.$modal.msgSuccess(i18n.global.t("funds.operateSuccessfully"));
          dialogVisible.value = false;
          emit("threeOrManualfresh");
        });
      } else {
        let item  = accountList.value.find(mchName=>mchName.mchId ===  queryParams.value.mchId)
        if(item){
          queryParams.value.mchName = item.mchName
        }
        thirdPayout({
          ...queryParams.value,
          orderNo: props.cloneRow.orderNo,
        }).then((res) => {
          proxy.$modal.msgSuccess(i18n.global.t("funds.operateSuccessfully"));
          dialogVisible.value = false;
          emit("threeOrManualfresh");
        });
      }
    } else {
      return;
    }
  });
}
</script>

<style lang="scss" scoped>
.three-party-manual-dialog {
  h3 {
    margin: 0;
    border-left: 2px solid #1890ff;
    padding-left: 6px;
    font-size: 13px;
    color: #333333;
    font-weight: 600;
  }
  .overflow-container {
    width: 100px; /* 设置容器的宽度 */
    white-space: nowrap; /* 防止文本换行 */
    overflow: hidden; /* 隐藏溢出的内容 */
    text-overflow: ellipsis;
  }
  .order-operlog {
    margin-top: 10px;
  }
  .avatar-uploader-icon {
    width: 105px;
    height: 105px;
    text-align: center;
    line-height: 105px;
    border: 1px dashed gray;
  }
  :deep() {
    .el-dialog__title {
      font-weight: 600;
    }
    .el-dialog__body {
      padding-top: 0;
    }
  }
}
</style>
