<template>
  <div class="UserAgreement-view">
    <template v-if="mainContent">
      <div class="text" v-html="mainContent"></div>
    </template>
  </div>
</template>

<script setup>
import { getTutoriaSublListApi } from '@/api/announcement.js'
import { Base64 } from 'js-base64'
import { watchEffect } from 'vue'

const mainContent = ref('')
const props = defineProps({ tuId: { type: String, default: '' } })

watchEffect(() => {
  getTutoriaSublListApi({ tuId: props.tuId }).then((res) => {
    mainContent.value = Base64.decode(res.data[0].tabContent)
  })
})
</script>

<style lang="scss" scoped>
.UserAgreement-view {
  color: #ffffff;

  p {
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 16px;
    line-height: normal;
  }
  .item-text {
    line-height: 28px;
    text-align: justify;
    font-size: 16px;
    color: var(-----60, rgba(255, 255, 255, 0.6)) !important;
  }
}
.text {
  padding: 15px;
  color: var(-----60, rgba(255, 255, 255, 0.6)) !important;

  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 26px;
  white-space: pre-wrap;
}

.text :deep() {
  img {
    max-width: 100%;
  }
  iframe {
    width: 100%;
    height: auto;
  }
  strong {
    color: var(-----60, rgba(255, 255, 255, 0.6)) !important;
    font-weight: 500;
  }
  span {
    color: var(-----60, rgba(255, 255, 255, 0.6)) !important;
  }
}
</style>
