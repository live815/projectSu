<template>
  <div class="content" v-html="previewContent.domainName"></div>
</template>

<script setup>
const props = defineProps({
  previewContent: {
    default: null,
  },
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
