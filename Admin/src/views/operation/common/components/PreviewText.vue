<template>
  <div>
    <div class="content" v-html="previewContent.tabContent"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  previewContent: {
    default: null,
  },
});
onMounted(() => {
  console.log(props.previewContent);
});
</script>

<style lang="scss" scoped>
.content {
  width: 650px;
  border: 1px solid rgba(0, 0, 0, 0.2);
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
