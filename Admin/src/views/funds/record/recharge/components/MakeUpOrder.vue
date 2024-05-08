<template>
  <div class="make-up-order-dialog">
    <el-dialog
      v-model="dialogVisible"
      width="60%"
      :title="$t('funds.makeUpOrderApplication')"
      :before-close="cancel"
      :close-on-click-modal="false"
      append-to-body
    >
      <el-form :model="form" ref="queryRef">
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
        <h3>{{ $t('funds.orderInformation') }}</h3>
        <el-row>
          <el-col :span="6">
            <el-form-item :label="$t('funds.orderNo')" prop="orderNo">
              <span>{{ form.orderNo || "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.relationOrder')" prop="orderRelno">
              <span>{{ form.orderRelno || "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="form.orderType === '0'">
            <el-form-item :label="$t('funds.channelType')" prop="orderType">
              <span>{{ form.channelTypeName || "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-else>
            <el-form-item :label="$t('funds.rechargeType')" prop="orderType">
              <span>{{ form.channelTypeName || "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="form.orderType === '0'">
            <el-form-item :label="$t('funds.belongStoreNameQuote')" prop="orderType">
              <span>{{ form.mchName || "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-else>
            <el-form-item :label="$t('funds.rechargeChannel')" prop="orderType">
              <span>{{ form.mchName || "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.orderStatus')" prop="status">
              <span :class="colorChange(form.status)">{{ switchStatus(list,form.status) }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.rechargeTime')" prop="time">
              <span>{{ form.createTime || "-" }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <h3>{{ $t('funds.rechargeAmount') }}</h3>
        <el-row>
          <el-col :span="6">
            <el-form-item :label="$t('funds.rechargeAmountQuote')" prop="amount">
              <span>{{ formatNumber(form.amount) }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="form.orderType === '1'">
            <el-form-item :label="$t('funds.rechargeRate')" prop="rate">
              <span>{{ form.rate || "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="form.orderType === '1'">
            <el-form-item :label="$t('funds.usdtNumber')" prop="usdtNum">
              <span>{{ form.usdtNum || "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.addPercent')" prop="addPercent">
              <span>{{ form.addPercent ? form.addPercent + "%" : "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.addBonus')" prop="addBouns">
              <span>{{ formatNumber(form.addBouns) }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.actualAmount')" prop="actualAmt">
              <span>{{ formatNumber(form.actualAmt) }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <h3>{{ $t('funds.rechargeInformation') }}</h3>
        <el-row>
          <el-col :span="6" v-if="form.orderType === '0'">
            <el-form-item :label="$t('funds.rechargeName')" prop="realName">
              <span>{{ form.realName || "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="form.orderType === '0'">
            <el-form-item :label="$t('funds.uploadProvidence')" prop="contactNo">
              <span class="check-attachment pointer" @click="checkDetail"
                >{{ $t('funds.checkDetails') }}</span
              >
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="form.orderType === '1'">
            <el-form-item :label="$t('funds.walletprotocol')" prop="protocol">
              <span>{{ form.protocol || "-" }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <h3 v-if="form.orderType === '0'">{{ $t('funds.C2CDealTime') }}</h3>
        <el-row v-if="form.orderType === '0'">
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
      </el-form>
      <el-form :model="queryParams" ref="submitRef" :rules="rules">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item :label="$t('funds.reorderAmount')" prop="reorderAmt">
              <el-input v-model="queryParams.reorderAmt" clearable @change="calcBounsAmt"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('funds.reorderAddAmount')" prop="reorderBounsAmt">
              <span>{{ queryParams.reorderBounsAmt||queryParams.reorderBounsAmt===0?queryParams.reorderBounsAmt.toFixed(2):"-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="$t('funds.uploadAttachment')" prop="imgUrls">
              <!-- <el-upload
                ref="uploadRef"
                multiple
                :file-list="queryParams.imgUrls"
                action="/admin/file/fund/upload"
                list-type="picture-card"
                :limit="limit"
                :on-exceed="handleExceed"
                :on-success="handleUploadSuccess"
                :on-error="handleUploadError"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :headers="headers"
              >
                <el-icon><Plus /></el-icon>
              </el-upload>
              <el-dialog v-model="dialogImg" :title="$t('funds.preview')" width="400px">
                <img
                  w-full
                  :src="getImgUrl(dialogImageUrl)"
                  alt="Preview Image"
                  class="make-up-img"
                />
              </el-dialog> -->
              <CopyImageUpload v-model:file-list="queryParams.imgUrls" :limit="5" />
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item :label="$t('funds.remarkQuote')" prop="reorderApplicantMark" required>
              <el-input
                type="textarea"
                v-model="queryParams.reorderApplicantMark"
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
          <el-button type="primary" @click="cancel"> {{ $t('funds.cancel') }} </el-button>
          <el-button type="primary" @click="submit"> {{ $t('funds.applicationOrder') }} </el-button>
        </span>
      </template>
    </el-dialog>
    <AttachmentDetail
      v-model:openAttachment="openAttachment"
      v-if="openAttachment"
      v-model:cloneRow="form"
    />
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { getToken } from "@/utils/auth";
import { getImgUrl } from "@/utils";
import { getOrderInfo, getReorder } from "@/api/funds/record/index";
import { onMounted } from "vue";
import {switchStatus,colorChange} from "../common"
import AttachmentDetail from "./AttachmentDetail.vue";
import { formatNumber } from "@/utils";
import CopyImageUpload from "@/components/CopyImageUpload/index.vue";
import usePermissionStore from "@/store/modules/permission";

const { proxy } = getCurrentInstance();
const props = defineProps(["openMakeUpOrder", "cloneRow","list"]);
const emit = defineEmits(["update:openMakeUpOrder","makeupRefresh"]);
const headers = ref({ Authorization: "Bearer " + getToken() });

const queryRef = ref(null);
const uploadRef = ref(null);
const dialogVisible = computed({
  get() {
    return props.openMakeUpOrder;
  },
  set(val) {
    emit("update:openMakeUpOrder", val);
  },
});
const form = ref({});
const submitRef = ref(null);
const queryParams = ref({
  reorderAmt: null,
  reorderBounsAmt: 0,
  imgUrls: [],
  reorderApplicantMark: null,
});
const rules = ref({
  reorderAmt:[
    {required:true,message:i18n.global.t("funds.pleaseInputReorderAmount"),trigger:"blur"},
    {pattern:/^\d+(\.\d{1,2})?$/,message:i18n.global.t("funds.MaxNumIsTwoPositive"),trigger:"blur"}
  ],
  reorderApplicantMark:[{required:true,message:i18n.global.t("funds.pleaseInputRemark"),trigger:"blur"}]
})
const dialogImg = ref(false);
const dialogImageUrl = ref("");
const limit = ref(5);
const openAttachment = ref(false);

onMounted(async () => {
  // window.addEventListener('paste',handlePaste)
  await queryOrderInfo();
});
// onBeforeUnmount(() => {
//   window.removeEventListener('paste', handlePaste)
// })
// onUnmounted(()=>{
//   console.log(222)
//   window.removeEventListener("paste", copyUpload.value.handlePaste);
// })
const handlePaste = (event) => {
  const items = (event.clipboardData || event.originalEvent.clipboardData).items;
  // event.preventDefault();
  // event.returnValue = false;
  let file = null
  for (const item of items) {
    if (item.type.includes('image')) {
      file = item.getAsFile();
      break;
    }
  }
  if(!file){
    return 
  }
  if(queryParams.value.imgUrls.length >= limit.value){
    proxy.$modal.msgError(i18n.global.t("funds.uploadFileCannotExceed",{num:limit.value}));
    return
  }
  uploadRef.value.handleStart(file);
  uploadRef.value.submit();
}
function queryOrderInfo() {
  return getOrderInfo(props.cloneRow.orderNo).then((res) => {
    form.value = res || {};
  });
}
function handleUploadSuccess(res) {
  res.data && queryParams.value.imgUrls.push(res.data);
}
function handleUploadError(err) {
  console.log(err, "错误");
}
function handleRemove(uploadFile, uploadFiles) {
  //删除的那列列和剩下长度
  console.log(uploadFile, uploadFiles);
}
function handleExceed() {
  proxy.$modal.msgError(i18n.global.t("funds.pleaseInputReorderAmount",{num:limit.value}));
}
function calcBounsAmt(val){
  submitRef.value.validateField('reorderAmt',(valid)=>{
    if(valid){
      if(val){
        queryParams.value.reorderBounsAmt = !isNaN(form.value.addPercent) ? val * (form.value.addPercent/100):0
      }else{
        queryParams.value.reorderBounsAmt = 0
      }
    }else{
      return 
    }
  })
}
function handlePictureCardPreview(uploadFile) {
  dialogImageUrl.value = uploadFile.response.data;
  dialogImg.value = true;
}
function checkDetail() {
  openAttachment.value = true;
}
function cancel() {
  dialogVisible.value = false;
}
function submit() {
  submitRef.value.validate((valid) => {
    if (valid) {
      getReorder({ ...queryParams.value, orderNo: form.value.orderNo }).then(
        (res) => {
          proxy.$modal.msgSuccess(i18n.global.t("funds.applyOrderSuccessfully"));
          dialogVisible.value = false;
          //补单成功之后去刷新充值补单审核未读数
          usePermissionStore().getFundsUnreview();
          emit("makeupRefresh");
        }
      );
    } else {
      return;
    }
  });
}
</script>

<style lang="scss" scoped>
.make-up-order-dialog {
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
  .check-attachment{
    color: #1890ff; 
    cursor: pointer
  }
  .make-up-img{
    display: block; 
    max-width: 100%; 
    margin: 0 auto
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
