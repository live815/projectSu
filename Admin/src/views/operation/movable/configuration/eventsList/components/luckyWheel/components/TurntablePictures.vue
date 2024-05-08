<template>
  <div class="upload-view">
    <p>{{ data.title }}</p>
    <el-upload
      class="avatar-uploader"
      action="/admin/file/tutorial/image/upload"
      :data="{}"
      :show-file-list="false"
      :on-success="handleUploadSuccess"
      :headers="headers"
    >
      <img v-if="imgUrl" :src="getImgUrl(imgUrl)" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon rewrite-icon"
        ><Plus
      /></el-icon>
    </el-upload>
    <p>
      推荐：Png 大小不超过{{ capacity }}
      <br />
      推荐尺寸：{{ data.size }}
    </p>
  </div>
</template>

<script setup>
import { getToken } from "@/utils/auth";
import { getImgUrl } from "@/utils";
import { watchEffect } from "vue";
const headers = ref({ Authorization: "Bearer " + getToken() });
const { proxy } = getCurrentInstance();
const emit = defineEmits(["getImg"]);
const props = defineProps({
  data: {
    type: Object,
  },
  capacity: {
    type: String,
    default: "500K",
  },
});
const imgUrl = ref();

const init = () => {
  imgUrl.value = props.data.url;
};
watchEffect(() => {
  imgUrl.value = props.data.url;
});
onMounted(() => {
  init();
});

const handleUploadSuccess = (res) => {
  if (res.code === 200) {
    imgUrl.value = res.data;
    proxy.$modal.msgSuccess("上传成功");
    emit("getImg", imgUrl.value, props.data.param);
  }
};
</script>

<style scoped lang="scss">
.upload-view {
  margin-left: 50px;
  text-align: center;
  .rewrite-icon {
    width: 150px;
    height: 150px;
    text-align: center;
    line-height: 100px;
    border: 1px dashed #eee;
  }
  .avatar {
    width: 150px;
    height: 150px;
  }
  .client-img {
    display: flex;
    .client {
      margin-right: 50px;
      text-align: center;
      .port {
        margin: 0 auto;
      }
    }
  }
}
</style>