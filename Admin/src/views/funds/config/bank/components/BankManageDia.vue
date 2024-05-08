<template>
  <div class="bank-manage-dialog">
    <el-dialog
      v-model="dialogVisible"
      width="30%"
      :title="$t('funds.editBank')"
      :before-close="cancel"
      :close-on-click-modal="false"
    >
      <el-form
        :model="queryParams"
        ref="queryRef"
        :inline="true"
        label-position="top"
        :rules="rules"
      >
        <el-row>
          <el-col>
            <el-form-item
              :label="$t('funds.bankName')"
              prop="bankName"
              class="full-width"
            >
              <el-input
                v-model="queryParams.bankName"
                class="full-width"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <!-- <el-form-item label="上传附件" prop="icon">
              <el-upload
                class="avatar-uploader"
                action="/admin/file/fund/upload"
                :data="{ lobbyId: queryParams.id }"
                :show-file-list="false"
                :on-success="handleUploadSuccessBig"
                :before-upload="beforeUploadBig"
                :headers="headers"
              >
                <img
                  v-if="queryParams.icon"
                  :src="getImgUrl(queryParams.icon)"
                  class="avatar"
                />
                <el-icon v-else class="avatar-uploader-icon rewrite-icon"
                  ><Plus
                /></el-icon>
              </el-upload>
            </el-form-item> -->
            <el-form-item :label="$t('funds.uploadAttachment')" prop="iconName">
              <el-upload
                multiple
                :file-list="queryParams.iconName"
                action="/admin/file/fund/upload"
                list-type="picture-card"
                :limit="1"
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
                <img w-full :src="getImgUrl(dialogImageUrl)" alt="Preview Image" class="bank-manage-img" />
              </el-dialog>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item :label="$t('funds.remarkQuote')" prop="remark" class="full-width">
              <el-input
                v-model="queryParams.remark"
                type="textarea"
                :placeholder="$t('funds.pleaseInputContent')"
                show-word-limit
                maxlength="100"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">{{$t('funds.cancel')}}</el-button>
          <el-button type="primary" @click="submit"> {{$t('funds.submit')}} </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { computed, onMounted, proxyRefs } from "vue";
import { getToken } from "@/utils/auth";
import { getImgUrl } from "@/utils";
import { getBankInfo,updateBankInfo } from "@/api/funds/config/index";

const props = defineProps(["open", "cloneId"]);
const emit = defineEmits(["update:open", "onrefresh"]);
const headers = ref({ Authorization: "Bearer " + getToken() });
const { proxy } = getCurrentInstance();

const queryRef = ref(null)
const queryParams = ref({
  id: null,
  bankName: null,
  icon: null,
  iconName:[],
  remark: null,
});
const dialogImg = ref(false)
const dialogImageUrl = ref('')
const rules = ref({
  bankName: [{ required: true, message: i18n.global.t("funds.pleaseInputBankName"), trigger: "blur" }],
  remark: [{ required: true, message: i18n.global.t("funds.pleaseInputRemark"), trigger: "blur" }]
});

const dialogVisible = computed({
  get() {
    return props.open;
  },
  set(val) {
    emit("update:open", val);
  },
});

queryInfo();
//根据ID查询详情
function queryInfo() {
  getBankInfo(props.cloneId).then((res) => {
    queryParams.value = res;
    queryParams.value.iconName = res.icon?res.icon.split().map(item=>{
      return {
        url:getImgUrl(item)
      }
    }):[]
  });
}
const cancel = () => {
  dialogVisible.value = false;
};
const submit = () => {
  queryRef.value.validate(valid=>{
    if(valid){
      queryParams.value.icon = queryParams.value.iconName.every(item => typeof item === 'object' && item !== null)?queryParams.value.iconName.map(item=>item.url).join():queryParams.value.iconName.join()
      updateBankInfo(queryParams.value).then(res => {
        proxy.$modal.msgSuccess(i18n.global.t("funds.editSuccessfully"));
        dialogVisible.value = false;
        emit("onrefresh");
      });
    }else{
      return 
    }
  })
};
const handleUploadSuccessBig = (res) => {
  res.data&&queryParams.value.iconName.push(res.data)
  proxy.$modal.msgSuccess(i18n.global.t("funds.uploadSuccessfully"));
};
function handleExceed(){
  proxy.$modal.msgError(i18n.global.t("funds.uploadMaxValueOnePicture"));
}
function handleUploadError(err){
}
function handlePictureCardPreview(uploadFile){
  dialogImageUrl.value = uploadFile.url
  dialogImg.value = true
}
function handleRemove(uploadFile,uploadFiles){
  //删除的那列列和剩下长度
  console.log(uploadFile,uploadFiles)
}
</script>

<style lang="scss" scoped>
.bank-manage-dialog {
  :deep().el-dialog__title {
    font-size: 16px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.85);
  }
  .dialog-footer {
    display: flex;
    justify-content: center;
  }
  img {
    width: 80px;
    height: 80px;
  }
  .rewrite-icon {
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    border: 1px dashed #eee;
  }
  .bank-manage-img{
    display:block;
    max-width:100%;
    margin:0 auto;
  }
}
</style>
