<template>
  <div>
    <div v-for="(item, index) in imgData" :key="index">
      <video v-if="isMP4OrMOV(item)" :src="getImgUrl(item)" controls></video>
      <img v-else class="imgWidth" :src="getImgUrl(item)" />
    </div>
  </div>
</template>

<script setup>
import { getImgUrl } from "@/utils";

const props = defineProps({
  previewContent: {
    default: null,
  },
});
function isMP4OrMOV(link) {
  // 获取链接中的文件扩展名
  const extension = link.substring(link.lastIndexOf(".") + 1).toLowerCase();
  // 检查文件扩展名是否是 MP4 或 MOV
  if (extension === "mp4" || extension === "mov") {
    return true; // 如果是 MP4 或 MOV 格式，返回 true
  } else {
    return false; // 否则返回 false
  }
}
const imgData = computed(() => {
  const arr = props.previewContent.dataAddress.split(",");

  return arr.filter((item) => item !== "");
});
onMounted(() => {
  console.log(props.previewContent);
});
</script>

<style lang="scss" scoped>
div {
  text-align: center;
  .imgWidth {
    max-width: 650px;
  }
}
</style>
