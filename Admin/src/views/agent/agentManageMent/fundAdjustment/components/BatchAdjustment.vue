<!-- 批量调整 -->
<template>
  <div class="app-container">
    <div class="app-body">
      <el-upload
        ref="uploadRef"
        v-model:file-list="fileList"
        class="upload-demo"
        action="/admin/system/agent/fundAdjust/batchFundAdjustSave"
        multiple
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :on-change="handleChange"
        :headers="headers"
        :auto-upload="false"
        :on-error="errorHook"
        :on-success="successHook"
        name="files"
      >
        <el-button icon="UploadFilled" class="document">{{
          $t("agent.selectADocument")
        }}</el-button>
        <!-- <el-button type="primary">点击上传</el-button>
        <el-button @click.stop="cancelUpload">取消上传</el-button> -->
      </el-upload>

      <div class="download">
        <a @click="handleExport">{{ $t("agent.downloadTemplate") }}</a>
      </div>
    </div>
    <el-form
      :model="queryParams"
      ref="queryRef"
      :inline="true"
      class="submit-button"
    >
      <el-form-item>
        <el-button @click="cancelUpload">{{ $t("agent.cancel") }}</el-button>
        <el-button
          type="primary"
          @click="onSubmit"
          :disabled="!fileList.length"
          >{{ $t("agent.ensure") }}</el-button
        >
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

const headers = ref({ Authorization: "Bearer " + getToken() });
const { proxy } = getCurrentInstance();
const queryParams = ref({});
const uploadRef = ref(null);

const fileList = ref([]);

const handleRemove = (file, uploadFiles) => {
  console.log(file, uploadFiles);
};

const handlePreview = (uploadFile) => {
  console.log(uploadFile);
};

const beforeRemove = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(
    `${i18n.global.t("agent.confirmDeletion")} ${uploadFile.name} ?`
  ).then(
    () => true,
    () => false
  );
};
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

  uploadRef.value.submit();
};
function handleChange(uploadFile, uploadFiles) {
  fileList.value = uploadFiles;
}
function handleExport() {
  let a = document.createElement("a");
  a.href = "/static/agentAdjustTemplate.xlsx";
  a.download = ` ${i18n.global.t(
    "agent.fundAdjustmentTemplate"
  )} ${new Date().toLocaleString()}.xlsx`;
  a.click();
  a.remove();
  // proxy.download(
  //   "/system/fund/adjustment/export-template",
  //   {},
  //   ` ${i18n.global.t(
  //     "agent.fundAdjustmentTemplate"
  //   )} ${new Date().toLocaleString()}.xlsx`
  // );
}
const errorHook = (err) => {
  console.log(err);
};
const successHook = (res) => {
  if (res.code === 200) {
    proxy.$modal.msgSuccess(`${i18n.global.t("agent.uploadSuccessfully")}`);
  } else {
    proxy.$modal.msgWarning(res.msg);
  }
};
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
