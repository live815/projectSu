<template>
  <div class="copy-image-upload">
    <el-col :span="24">
      <el-upload
        ref="uploadRef"
        multiple
        :file-list="fileList"
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
      </el-dialog>
    </el-col>
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { getToken } from "@/utils/auth";
import { getImgUrl } from "@/utils";
import { onMounted, onUnmounted,onBeforeUnmount, computed } from "vue";

const { proxy } = getCurrentInstance();
const props = defineProps(["file-list", "limit"]);
const emit = defineEmits(["file-list"]);
const headers = ref({ Authorization: "Bearer " + getToken() });

const uploadRef = ref(null);
const dialogImg = ref(false);
const dialogImageUrl = ref("");

const fileList = computed({
  get(){
    return props.fileList
  },
  set(val){
    emit("file-list",val)
  }
})
console.log(fileList.value,123)
onMounted(() => {
  window.addEventListener("paste", handlePaste);
});
const handlePaste = (event) => {
  const items = (event.clipboardData || event.originalEvent.clipboardData)
    .items;
  // event.preventDefault();
  // event.returnValue = false;
  let file = null;
  for (const item of items) {
    if (item.type.includes("image")) {
      file = item.getAsFile();
      break;
    }
  }
  if (!file) {
    return;
  }
  if (fileList.value.length >= props.limit) {
    proxy.$modal.msgError(
      i18n.global.t("funds.uploadFileCannotExceed", { num: props.limit })
    );
    return;
  }
  uploadRef.value.handleStart(file);
  uploadRef.value.submit();
};
function handleUploadSuccess(res) {
  res.data && fileList.value.push(res.data);
}
function handleUploadError(err) {
  console.log(err, "错误");
}
function handleRemove(uploadFile, uploadFiles) {
  //删除的那列列和剩下长度
  // emit("file:list", uploadFiles);
  fileList.value = uploadFiles
  console.log(uploadFile, uploadFiles);
}
function handleExceed() {
  proxy.$modal.msgError(
    i18n.global.t("funds.uploadFileCannotExceed", { num: props.limit })
  );
}
function handlePictureCardPreview(uploadFile) {
  dialogImageUrl.value = uploadFile.response.data;
  dialogImg.value = true;
}
onBeforeUnmount(() => {
  window.removeEventListener("paste", handlePaste);
});
</script>

<style lang="scss" scoped>
.copy-image-upload {
  .make-up-img {
    display: block;
    max-width: 100%;
    margin: 0 auto;
  }
}
</style>
