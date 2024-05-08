<template>
  <div class="">
    <div class="text" v-html="mainContent"></div>
  </div>
</template>

<script setup>
import { getTutoriaSublListApi } from '@/api/announcement.js'
import { Base64 } from 'js-base64'

const mainContent = ref('')
const props = defineProps({
  tuId: {
    type: String,
    default: ''
  }
})
console.log(props.tuId, '888')

onMounted(() => {
  getTutoriaSublListApi({ tuId: props.tuId }).then((res) => {
    mainContent.value = Base64.decode(res.data[0].tabContent)

    console.log(res.data)
  })
})
</script>

<style lang="scss" scoped>
.text {
  padding: 15px;
  color: var(-----60, rgba(255, 255, 255, 0.6));
  
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
    color: var(-----100, #fff);
    font-weight: 500;
  }
}
</style>
