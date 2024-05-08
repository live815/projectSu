<template>
  <!-- 强制成功弹窗 -->
  <div class="force-success-dialog">
    <el-dialog
      v-model="dialogVisible"
      width="30%"
      :title="$t('funds.forceSuccess')"
      :before-close="cancel"
      :close-on-click-modal="false"
    >
      <el-form :model="queryParams" label-position="top" ref="queryRef" :rules="rules">
        <el-row :gutter="20">
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
              <el-dialog v-model="dialogImg" :title="$t('funds.review')" width="400px">
                <img w-full :src="getImgUrl(dialogImageUrl)" alt="Preview Image" class="force-success-img" />
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
          <el-button @click="cancel">{{ $t('funds.cancel') }}</el-button>
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
import { forcedSuccess } from "@/api/funds/record/index";
import usePermissionStore from "@/store/modules/permission";

const headers = ref({ Authorization: "Bearer " + getToken() });
const props = defineProps(["openForceSuccess", "cloneRow"]);
const emit = defineEmits(["update:openForceSuccess","forceSuccessRefresh"]);

const { proxy } = getCurrentInstance()
const queryParams = ref({
  id:null,
  imgUrls:[],
  operApplicantMark:null
})
const dialogImg = ref(false)
const dialogImageUrl = ref(null)
const queryRef = ref(null)
const rules = ref({
  operApplicantMark:[{required: true, message: i18n.global.t("funds.pleaseInputRemark"), trigger: 'blur'}]
})
const dialogVisible = computed({
  get() {
    return props.openForceSuccess;
  },
  set(val) {
    emit("update:openForceSuccess", val);
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
function submit(){
  queryRef.value.validate(valid=>{
    if(valid){
      forcedSuccess({
        ...queryParams.value,
        orderNo:props.cloneRow.orderNo
      }).then(res=>{
        proxy.$modal.msgSuccess(i18n.global.t("funds.forceSuccess"))
        dialogVisible.value = false;
        //强制成功之后去刷新财务提款审核未读数
        usePermissionStore().getFundsUnreview();
        emit("forceSuccessRefresh");
      })
    }else{
      console.log('submit error')
      return 
    }
  })
}
</script>

<style lang="scss" scoped>
.force-success-dialog {
  .avatar-uploader-icon{
    width:105px;
    height:105px;
    // text-align:center;
    // line-height: 105px;
    border:1px dashed gray;
  }
  .rewrite-icon{
    display: flex;
    flex-direction: column;
  }
  .force-success-img{
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
