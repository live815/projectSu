<!-- 会员额度调整（批量调整） -->
<template>
  <div class="app-container">
    <div class="app-body">
      <el-upload
        ref="uploadRef"
        v-model:file-list="fileList"
        class="upload-demo"
        action="/admin/system/fund/adjustment/batch-add"
        multiple
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :on-change="handleChange"
        :on-success="handleSuccess"
        :headers="headers"
        :auto-upload="false"
        name="files"
      >
        <el-button icon="UploadFilled" class="document">{{$t("funds.selectFile")}}</el-button>
        <!-- <el-button type="primary">点击上传</el-button>
        <el-button @click.stop="cancelUpload">取消上传</el-button> -->
      </el-upload>

      <div class="download">
        <a @click="handleExport">{{$t("funds.downloadTemplate")}}</a>
      </div>
    </div>
    <el-form
      :model="queryParams"
      ref="queryRef"
      :inline="true"
      class="submit-button"
    >
      <el-form-item>
        <el-button @click="cancelUpload">{{$t("funds.cancel")}}</el-button>
        <el-button type="primary" @click="onSubmit" :disabled="!fileList.length">{{$t("funds.submit")}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import { getCurrentInstance, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { getToken } from "@/utils/auth";
import { multipleAddAdjustment } from "@/api/funds/adjustment/index";
import i18n from "@/i18n";
import usePermissionStore from "@/store/modules/permission";

const headers = ref({ Authorization: "Bearer " + getToken() });
const { proxy } = getCurrentInstance()
const queryParams = ref({});
const uploadRef = ref(null)

const fileList = ref([]);

const handleRemove = (file, uploadFiles) => {
  console.log(file, uploadFiles);
};

const handlePreview = (uploadFile) => {
  console.log(uploadFile);
};

const beforeRemove = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(i18n.global.t("funds.ensureDelete",{num:uploadFile.name})).then(
    () => true,
    () => false
  );
};
function handleSuccess(res){
  if(res.data.failList && res.data.failList.length === 0){
    proxy.$modal.msgSuccess(i18n.global.t("funds.uploadSuccessfully"));
    // uploadRef.value.clearFiles();
  }else{
    proxy.$modal.msgError(i18n.global.t("funds.uploadDataError"))
  }
  //批量用户整操作成功之后去刷新资金调整审核未读数
  usePermissionStore().getFundsUnreview();
}
// 取消上传
const cancelUpload = () => {
  // 取消上传操作，将fileList清空
  fileList.value = [];
};
// 确定按钮
const onSubmit = () => {
  // const formData = new FormData();
  // formData.append("files", fileList.value);
  // console.log(formData,66666)
  // multipleAddAdjustment(formData).then(res=>{
  //   proxy.$modal.msgSuccess("成功")
  // })
  uploadRef.value.submit()
};
function handleChange(uploadFile, uploadFiles){
  fileList.value = uploadFiles
}
function handleExport(){
  proxy.download(
    "/system/fund/adjustment/export-template",
    {

    },
    `${i18n.global.t("funds.fundsAdjustTemplate")}${new Date().toLocaleString()}.xlsx`
  );
}
</script>
<style lang="scss">
.submit-button {
  padding-top: 30px;
  width: 683px;
  margin: 0 auto;
  text-align: right;
}
.el-upload-list__item {
  width: 73%;
  margin-left: 80px;
  line-height: 25px;
}
.app-body {
  border: 1px solid #e9eaee;
  width: 622px;
  margin: 0 auto;
  text-align: center;
  padding-top: 60px;
  .document {
    margin-right: 120px;
  }
}
.download {
  color: #1890ff;
  font-size: 14px;
  text-align: right;
  margin: 20px 90px 20px 0;
  a {
    text-decoration: underline;
  }
}
</style>
