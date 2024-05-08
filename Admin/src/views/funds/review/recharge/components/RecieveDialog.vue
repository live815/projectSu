<template>
  <div class="recieve-dialog">
    <el-dialog
      v-model="dialogVisible"
      width="60%"
      :title="$t('funds.reorderReview')"
      :before-close="cancel"
      :close-on-click-modal="false"
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
              <span>{{ !isNaN(form.vipLevel)?form.vipLevel:'-' }}</span>
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
            <el-form-item :label="$t('funds.orderNoQuote')" prop="orderNo">
              <span>{{ form.orderNo || "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.relationOrder')" prop="orderRelno">
              <span>{{ form.orderRelno || "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="form.orderType==='0'">
            <el-form-item :label="$t('funds.channelType')" prop="channelTypeName">
              <span>{{ form.channelTypeName || "-" }}</span>
            </el-form-item>
          </el-col>
          
          <el-col :span="6" v-if="form.orderType==='0'">
            <el-form-item :label="$t('funds.belongStoreNameQuote')" prop="mchName">
              <span>{{ form.mchName || "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="form.orderType==='1'">
            <el-form-item :label="$t('funds.rechargeType')" prop="channelTypeName">
              <span>{{ form.channelTypeName || "-" }}</span>
            </el-form-item>
          </el-col>
          
          <el-col :span="6" v-if="form.orderType==='1'">
            <el-form-item :label="$t('funds.rechargeChannel')" prop="mchName">
              <span>{{ form.mchName || "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.orderStatus')" prop="status">
              <span v-if="form.status==='2'" style="color: #f59a23">{{ $t('funds.reorderWaitReview') }}</span>
              <span v-else-if="form.status==='3'"> {{ $t('funds.reorderReviewReject') }} </span>
              <span v-else-if="form.status==='4'" style="color: #1890FF">{{ $t('funds.reorderReviewPass') }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.rechargeTime')" prop="createTime">
              <span>{{ form.createTime }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <h3>{{ $t('funds.rechargeAmount') }}</h3>
        <el-row>
          <el-col :span="6">
            <el-form-item :label="$t('funds.rechargeAmountQuote')" prop="amount">
              <span>{{ form.amount || "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="form.orderType === '1'">
            <el-form-item :label="$t('funds.rechargeRateQuote')" prop="rate">
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
            <el-form-item :label="$t('funds.addBonus')" prop="reorderBounsAmt">
              <span>{{ formatNumber(form.reorderBounsAmt) }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <h3>{{ $t('funds.rechargeInformation') }}</h3>
        <el-row>
          <el-col :span="6" v-if="form.orderType === '0'">
            <el-form-item :label="$t('funds.rechargeNameQuote')" prop="realName">
              <span>{{ form.realName || "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="form.orderType === '0'">
            <el-form-item :label="$t('funds.uploadProvidence')" prop="contactNo">
              <span style="color: #1890ff; cursor: pointer" @click="checkDetail"
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
        <h3 v-if="form.orderType === '0'">{{$t('funds.C2CDealTime')}}</h3>
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
        <h3>{{ $t('funds.reorderInformation') }}</h3>
        <el-row>
          <el-col :span="6">
            <el-form-item :label="$t('funds.reorderAmount')" prop="reorderAmt">
              <span>{{ formatNumber(form.reorderAmt) }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.reorderAddAmount')" prop="reorderBounsAmt">
              <span>{{ formatNumber(form.reorderBounsAmt) }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.reorderApplicantQuote')" prop="reorderApplicant">
              <span>{{ form.reorderApplicant || "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.reorderApplicantTime')" prop="reorderApplicantTime">
              <span>{{ form.reorderApplicantTime || "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="$t('funds.reorderApplicantMark')" prop="reorderApplicantMark">
              <!-- <div
                class="overflow-container"
                :title="form.reorderApplicantMark"
              >
                {{ form.reorderApplicantMark || "-" }}
              </div> -->
              {{ form.reorderApplicantMark || "-" }}
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
              <el-dialog v-model="dialogImgRecord" :title="$t('funds.preview')" width="40%">
                <img w-full :src="getImgUrl(dialogImageUrl)" alt="Preview Image" class="withdrawl-attachment-img" />
              </el-dialog>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="type!=='edit'">
            <el-form-item :label="$t('funds.reorderApprover')" prop="reorderApprover">
              <span>{{ form.reorderApprover || "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="type!=='edit'">
            <el-form-item :label="$t('funds.reorderApprovalTime')" prop="reorderApprovalTime">
              <span>{{ form.reorderApprovalTime || "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="type!=='edit'">
            <el-form-item :label="$t('funds.reorderApprovalMark')" prop="reorderApprovalMark">
              <span>{{ form.reorderApprovalMark || "-" }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-form :model="queryParams" ref="queryRefParams" :rules="rules">
        <el-row>
          <el-col  v-if="type==='edit'">
            <el-form-item :label="$t('funds.reviewRemark')" prop="reorderApprovalMark">
              <el-input 
                type="textarea" 
                v-model="queryParams.reorderApprovalMark"
                maxlength="200"
                :placeholder="$t('funds.pleaseInput')"
                show-word-limit></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            @click="cancel"
            style="border-color: rgb(0, 121, 254); color: #0079fe"
            >{{ $t('funds.close') }}</el-button
          >
          <el-button type="danger" @click="submit(inject)" v-if="type==='edit'"> {{ $t('funds.reviewReject') }} </el-button>
          <el-button type="primary" @click="submit(success)" v-if="type==='edit'"> {{ $t('funds.reviewPass') }} </el-button>
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
import { getOrderInfo } from "@/api/funds/record/index";
import { approveOrder } from "@/api/funds/review/index";
import AttachmentDetail from "./AttachmentDetail.vue";
import { formatNumber } from "@/utils/index";
import usePermissionStore from "@/store/modules/permission";

const props = defineProps(["open", "cloneRow","type","approveRefresh"]);
const emit = defineEmits(["update:open"]);
const headers = ref({ Authorization: "Bearer " + getToken() });
const { proxy } = getCurrentInstance()
const queryRef = ref(null)
const queryRefParams = ref(null)
const dialogVisible = computed({
  get() {
    return props.open;
  },
  set(val) {
    emit("update:open", val);
  },
});
const form = ref({});
const queryParams = ref({
  reorderApprovalMark:null
})
const rules = ref({
  reorderApprovalMark:[{ required:true,message:i18n.global.t("funds.pleaseInputRemark"),trigger:"blur"}]
})
const openAttachment = ref(false)
const dialogImgRecord = ref(false)
const dialogImageUrl = ref(null)
const success = ref('4')
const inject = ref('3')


onMounted(async () => {
  await queryOrderInfo();
});
function queryOrderInfo() {
  return getOrderInfo(props.cloneRow.orderNo).then((res) => {
    form.value = res || {};
    if(form.value.attaches&&form.value.attaches.length){
      form.value.attaches = form.value.attaches.map(item=>{
        return {
          url:getImgUrl(item.imgUrl),
          name:item.id
        }
      })
    }
  });
}
function checkDetail(){
  openAttachment.value = true;
}
function handlePictureCardPreviewRecord(uploadFile){
  dialogImageUrl.value = uploadFile.url
  dialogImgRecord.value = true
}
function cancel() {
  dialogVisible.value = false;
}
function submit(status) {
  queryRefParams.value.validate(valid=>{
    if(valid){
      approveOrder({
        orderNo:props.cloneRow.orderNo,
        status:status,
        ...queryParams.value
      }).then(res=>{
          proxy.$modal.msgSuccess(i18n.global.t("funds.operateSuccessfully"));
          usePermissionStore().getFundsUnreview();
          dialogVisible.value = false;
          emit("approveRefresh");
      })
    }else{
      return 
    }
  })
}
</script>

<style lang="scss" scoped>
.recieve-dialog {
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
  .withdrawl-attachment-img{
    margin:0 auto;
    display: block;
    max-width: 100%;
  }
  :deep(){
    .el-dialog__title {
      font-weight: 600;
    }
    .el-dialog__body {
      padding-top: 0;
    }
    .el-form-item {
      margin-bottom: 0;
    }
    .el-upload--picture-card{
      display: none;
    }
    .el-icon--delete{
      display: none;
    }
  }
}
</style>
