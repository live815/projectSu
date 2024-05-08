<template>
  <div class="refuse-back-dialog">
    <el-dialog
      v-model="dialogVisible"
      width="60%"
      :title="$t('funds.refuseBack')"
      :before-close="cancel"
      :close-on-click-modal="false"
    >
      <el-form :model="queryParams" :rules="rules" ref="queryRef">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item :label="$t('funds.returnType')" prop="wdReturnType" class="rewrite-radio">
              <el-radio-group v-model="queryParams.wdReturnType">
                <el-radio label="0" size="large">{{ $t('funds.returnAll') }}</el-radio>
                <el-radio label="1" size="large">{{ $t('funds.returnSome') }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="$t('funds.returnAmount')" prop="wdReturnAmt" v-if="queryParams.wdReturnType==='1'">
              <el-input
                v-model="queryParams.wdReturnAmt"
                :placeholder="$t('funds.pleaseInput')"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="$t('funds.uploadAttachment')" prop="imgUrls">
              <el-upload
                multiple
                :file-list="queryParams.imgUrls"
                action="/admin/file/fund/upload"
                list-type="picture-card"
                :limit="5"
                :on-exceed="handleExceed"
                :on-success="handleUploadSuccessBig"
                :on-error="handleUploadError"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :headers="headers"
              >
                <el-icon><Plus /></el-icon>
              </el-upload>
              <el-dialog v-model="dialogImg" :title="$t('funds.preview')" width="400px">
                <img w-full :src="getImgUrl(dialogImageUrl)" alt="Preview Image" class="refuse-back-img" />
              </el-dialog>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="$t('funds.remarkQuote')" prop="operApplicantMark">
              <el-input
                type="textarea"
                v-model="queryParams.operApplicantMark"
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
          <el-button @click="cancel" class="common-cancel">{{ $t('funds.cancel') }}</el-button>
          <el-button type="primary" @click="submit">{{ $t('funds.submit') }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { getToken } from "@/utils/auth";
import { getImgUrl } from "@/utils";
import { getCurrentInstance } from "vue";
import { paymentRefund } from "@/api/funds/record/index";
import usePermissionStore from "@/store/modules/permission";

const headers = ref({ Authorization: "Bearer " + getToken() });
const props = defineProps(["openRefuseBack","cloneRow"]);
const emit = defineEmits(["update:openRefuseBack","refundBackRefresh"]);
const { proxy } = getCurrentInstance()

const queryRef = ref(null);
const queryParams = ref({
  wdReturnType:'0',
  wdReturnAmt:null,
  imgUrls:[],
  operApplicantMark: null,
});
const dialogImg = ref(false)
const dialogImageUrl = ref(null)
const rules = ref({
  wdReturnType:[{ required: true, message: i18n.global.t("funds.pleaseSelectReturnType"), trigger: "change" }],
  wdReturnAmt:[{ required: true, message: i18n.global.t("funds.pleaseInputReturnAmount"), trigger: "blur" }],
  operApplicantMark: [{ required: true, message: i18n.global.t("funds.pleaseInputRemark"), trigger: "blur" }],
});

const dialogVisible = computed({
  get() {
    return props.openRefuseBack;
  },
  set(val) {
    emit("update:openRefuseBack", val);
  },
});

const handleUploadSuccessBig = (res) => {
  res.data&&queryParams.value.imgUrls.push(res.data)
  proxy.$modal.msgSuccess(i18n.global.t("funds.uploadSuccessfully"));
};
function handleExceed(){
  proxy.$modal.msgError(i18n.global.t("funds.maxUploadNumIsFive"));
}
function handleUploadError(err){
  console.log(err,'错误')
}
function handlePictureCardPreview(uploadFile){
  dialogImageUrl.value = uploadFile.response.data
  dialogImg.value = true
}
function handleRemove(uploadFile,uploadFiles){
  //删除的那列列和剩下长度
  console.log(uploadFile,uploadFiles)
}
function cancel() {
  dialogVisible.value = false;
}
function submit() {
  queryRef.value.validate((valid) => {
    if (valid) {
      paymentRefund({
        ...queryParams.value,
        orderNo:props.cloneRow.orderNo
      }).then(res=>{
        proxy.$modal.msgSuccess(i18n.global.t("funds.operateSuccessfully"))
        dialogVisible.value = false;
        //出款退回操作成功之后去刷新财务提款审核未读数
        usePermissionStore().getFundsUnreview();
        emit("refundBackRefresh");
      })
    } else {
      return;
    }
  });
}
</script>

<style lang="scss" scoped>
.refuse-back-dialog {
  .avatar-uploader-icon{
    width:105px;
    height:105px;
    border:1px dashed gray;
  }
  .refuse-back-img{
    display: block;
    max-width: 100%;
    margin:0 auto;
  }
  .rewrite-icon{
    display: flex;
    flex-direction: column;
  }
  .rewrite-radio{
    align-items: center;
  }
  :deep() {
    .el-dialog__title {
      font-weight: 600;
    }
    .el-dialog__body {
      padding-top:0
    }
  }
  .common-cancel {
    background: #ffffff;
    border: 1px solid rgba(0, 121, 254, 1);
    color: #0079fe;
    font-size: 12px;
    font-weight: 600;
  }
    .el-button{
      width:80px;
      height: 30px;
    }
}
</style>
