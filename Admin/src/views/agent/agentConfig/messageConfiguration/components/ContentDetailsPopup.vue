<template>
  <div class="content" v-html="content"></div>
</template>

<script setup>
import { Base64, decode } from "js-base64";
const props = defineProps({
  previewContent: {
    default: null,
  },
});
const content = computed(() => {
  return Base64.decode(props.previewContent.noticeContent);
});
</script>

<style lang="scss" scoped>
.content {
  width: 650px;
  white-space: pre-wrap;
  margin: 0 auto;
}
.content :deep() {
  img {
    max-width: 100%;
    white-space: pre-wrap;
  }
}
</style>
