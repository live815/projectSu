<template>
  <div class="withdraw-dialog">
    <el-dialog
      v-model="dialogVisible"
      width="60%"
      :title="type === 'edit' ? $t('funds.forceSuccessReview') : $t('funds.orderDetail')"
      :before-close="cancel"
      :close-on-click-modal="false"
    >
      <el-form :model="form" ref="queryRef" label-position="right">
        <h3>{{ $t('funds.memberInformation') }}</h3>
        <el-row>
          <el-col :span="6">
            <el-form-item :label="$t('funds.userName')" prop="userName">
              <span>{{ form.userName || "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.vipLevel')" prop="vipLevel">
              <span>{{ form.vipLevel }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.financialTierQuote')" prop="financeTierName">
              <span>{{ form.financeTierName || "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.riskTierQuote')" prop="riskTierName">
              <span>{{ form.riskTierName || "-" }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <h3>{{$t('funds.orderInformation')}}</h3>
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
            <el-form-item :label="$t('funds.paymentMethod')" prop="paymentMethod">
              <span>{{ form.paymentMethod || "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.withdrawalStoreNameQuote')" prop="mchName">
              <span>{{ form.mchName || "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.withdrawType')" prop="wdType">
              <span>{{ switchWdTypeStatus(wdTypeList, form.wdType) }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="form.orderType === '0'">
            <el-form-item :label="$t('funds.wdFee')" prop="wdFee">
              <span>{{
                formatNumber(form.wdFee)
              }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.orderStatus')" prop="status">
              <span style="color:#F59A23;">{{ switchStatus(form.status) }}</span>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="6">
            <el-form-item label="关联单号:" prop="contactNo">
              <span>{{ form.contactNo ? form.contactNo : "-" }}</span>
            </el-form-item>
          </el-col> -->
          <el-col :span="6">
            <el-form-item :label="$t('funds.recieveMoneyTime')" prop="paymentTime">
              <span>{{ form.paymentTime || "-" }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <h3>{{ $t('funds.withdrawAmount') }}</h3>
        <el-row>
          <el-col :span="6">
            <el-form-item :label="$t('funds.withdrawAmountQuote')" prop="amount">
              <span>{{ formatNumber(form.amount) }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="form.orderType === '1'">
            <el-form-item :label="$t('funds.rechargeRate')" prop="rate">
              <span>{{ !isNaN(form.rate) ? form.rate : "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="form.orderType === '1'">
            <el-form-item :label="$t('funds.usdtNumber')" prop="usdtNum">
              <span>{{ formatNumber(form.usdtNum) }}</span>
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
              <span>{{ formatNumber(form.addBouns)}}</span>
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
        <h3 v-if="form.orderType === '0'">{{ $t('funds.C2CDealTime') }}</h3>
        <el-row v-if="form.orderType === '0'">
          <el-col :span="6">
            <el-form-item :label="$t('funds.withdrawalBeginTime')" prop="createTime">
              <span>{{ form.createTime || "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.ensurePaymentTime')" prop="confirmPaymentTimeC2c">
              <span>{{ form.confirmPaymentTimeC2c || "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('funds.ensureGetMoneyTime')" prop="confirmReceiptTimeC2c">
              <span>{{ form.confirmReceiptTimeC2c || "-" }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <h3>{{ $t('funds.applyDetail') }}</h3>
        <el-row>
          <el-col :span="6">
            <el-form-item :label="$t('funds.operApplicantQuote')" prop="operApplicant">
              <span>{{ form.operApplicant || "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.applicationTimeQuote')" prop="operApplicantTime">
              <span>{{ form.operApplicantTime || "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('funds.reorderApplicantMark')" prop="operApplicantMark">
              <div class="overflow-container" :title="form.operApplicantMark">
                {{ form.operApplicantMark || "-" }}
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="$t('funds.attachmentScreen')" prop="attaches">
              <el-upload
                multiple
                :file-list="form.attaches"
                action="/admin/file/fund/upload"
                list-type="picture-card"
                :on-preview="handlePictureCardPreviewRecord"
                :headers="headers"
              >
                <el-icon><Plus /></el-icon>
              </el-upload>
              <el-dialog v-model="dialogImgRecord" title="预览" width="40%">
                <img
                  w-full
                  :src="getImgUrl(dialogImageUrl)"
                  alt="Preview Image"
                  class="withdrawl-attachment-img"
                />
              </el-dialog>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="type !== 'edit'">
            <el-form-item :label="$t('funds.reviewer')" prop="reorderApprover">
              <span>{{ form.reorderApprover || "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="type !== 'edit'">
            <el-form-item :label="$t('funds.reviewTime')" prop="reorderApprovalTime">
              <span>{{ form.reorderApprovalTime || "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="type !== 'edit'">
            <el-form-item :label="$t('funds.reviewRemark')" prop="reorderApprovalMark">
              <span>{{ form.reorderApprovalMark || "-" }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-form :model="queryParams" ref="queryRefParams" :rules="rules">
        <el-row>
          <el-col v-if="type === 'edit'">
            <el-form-item :label="$t('funds.reviewRemark')" prop="operApprovalMark">
              <el-input
                type="textarea"
                v-model="queryParams.operApprovalMark"
                maxlength="200"
                :placeholder="$t('funds.pleaseInput')"
                show-word-limit
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            @click="cancel"
            style="border-color: rgb(0, 121, 254); color: #0079fe"
            v-if="type === 'edit'"
            >{{ $t('funds.close') }}</el-button
          >
          <el-button
            type="danger"
            @click="submit(injectType)"
            v-if="type === 'edit'"
          >
          {{ $t('funds.reviewReject') }}
          </el-button>
          <el-button
            type="primary"
            @click="submit(successType)"
            v-if="type === 'edit'"
          >
          {{ $t('funds.reviewPass') }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { getToken } from "@/utils/auth";
import { getImgUrl } from "@/utils";
import { switchWdTypeStatus, switchWdWayTypeStatus } from "../common";
import { getWithdrawlOrderInfo } from "@/api/funds/record/index";
import { approveOrderWithdrawl } from "@/api/funds/review/index";
import { onMounted } from "vue";
import { formatNumber } from "@/utils/index";
import usePermissionStore from "@/store/modules/permission";

const props = defineProps([
  "open",
  "cloneRow",
  "type",
  "statusArrList",
  "wdTypeList",
  "wdWayTypeList",
]);
const emit = defineEmits(["update:open", "approveRefresh"]);
const headers = ref({ Authorization: "Bearer " + getToken() });
const { proxy } = getCurrentInstance()

const queryRef = ref(null);
const queryRefParams = ref(null)
const dialogVisible = computed({
  get() {
    return props.open;
  },
  set(val) {
    emit("update:open", val);
  },
});
// const form = computed({
//   get() {
//     return props.cloneRow;
//   },
// });
const form = ref({})
const queryParams = ref({
  operApprovalMark: null,
});
const rules = ref({
  operApprovalMark: [
    { required: true, message: i18n.global.t("funds.pleaseInputRemark"), trigger: "blur" },
  ],
});
const dialogImgRecord = ref(false);
const dialogImageUrl = ref(null);
const successType = "success";
const injectType = "inject";

onMounted(async () => {
  await queryDetailInfo();
});
function queryDetailInfo() {
  return getWithdrawlOrderInfo(props.cloneRow.orderNo).then((res) => {
    form.value = res || {};
    if (form.value.attaches && form.value.attaches.length) {
      form.value.attaches = form.value.attaches.map((item) => {
        return {
          url: getImgUrl(item.imgUrl),
          name: item.id,
        };
      });
    }
  });
}
function handlePictureCardPreviewRecord(uploadFile) {
  dialogImageUrl.value = uploadFile.url;
  dialogImgRecord.value = true;
}
function cancel() {
  dialogVisible.value = false;
}
function submit(type) {
  queryRefParams.value.validate((valid) => {
    if (valid) {
      approveOrderWithdrawl({
        orderNo: props.cloneRow.orderNo,
        status: filterStatus(type),
        ...queryParams.value,
      }).then((res) => {
        proxy.$modal.msgSuccess(i18n.global.t("funds.operateSuccessfully"));
        usePermissionStore().getFundsUnreview();
        dialogVisible.value = false;
        emit("approveRefresh");
      });
    } else {
      return;
    }
  });
}
function filterStatus(type) {
  if (form.value.status === "8" && type === "success") {
    return "9";
  } else if (form.value.status === "11" && type === "success") {
    return "12";
  } else if (form.value.status === "8" && type === "inject") {
    return "10";
  } else if (form.value.status === "11" && type === "inject") {
    return "13";
  }
}
function switchStatus(status) {
  switch (status) {
    case "8":
      return i18n.global.t("funds.forceSuccessWaitReview");
    case "9":
      return i18n.global.t("funds.forceSuccessPass");
    case "10":
      return i18n.global.t("funds.forceSuccessInject");
    case "11":
      return i18n.global.t("funds.paymentReturnWaiReview");
    case "12":
      return i18n.global.t("funds.paymentReturnPass");
    case "13":
      return i18n.global.t("funds.paymentReturnRefuse");
    default:
      return i18n.global.t("funds.forceSuccessWaitReview");
  }
}
</script>

<style lang="scss" scoped>
.withdraw-dialog {
  h3 {
    margin: 0;
    border-left: 2px solid #1890ff;
    padding-left: 6px;
    font-size: 13px;
    color: #333333;
    font-weight: 600;
    margin-bottom: 5px;
  }
  .overflow-container {
    width: 100px; /* 设置容器的宽度 */
    white-space: nowrap; /* 防止文本换行 */
    overflow: hidden; /* 隐藏溢出的内容 */
    text-overflow: ellipsis;
  }
  .withdrawl-attachment-img {
    display: block;
    max-width: 100%;
    margin: 0 auto;
  }
  :deep() {
    .el-dialog__title {
      font-weight: 600;
    }
    .el-dialog__body {
      padding-top: 0;
    }
    .el-upload--picture-card {
      display: none;
    }
    .el-icon--delete {
      display: none;
    }
  }
}
</style>
