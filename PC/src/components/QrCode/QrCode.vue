<template>
  <div ref="qrcode" class="qr-code">
    <img :src="qrCodeUrl" />
  </div>
</template>
<script setup>
import QRCode from 'qrcode'
import { ref, onMounted } from 'vue'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  link: {
    type: String,
    default: ''
  },
  size: {
    type: [String, Number],
    default: 100
  }
})
const qrcode = ref(null)
const qrCodeUrl = ref()
onMounted(async () => {
  try {
    const textToEncode = props.link // 替换成你的动态内容
    const options = {
      width: props.size, // 二维码宽度
      height: props.size, // 二维码高度
      colorDark: '#000',
      colorLight: '#000',
      correctLevel: 1
    }

    // 生成二维码
    const url = await QRCode.toDataURL(textToEncode, options)

    emit('update:modelValue', url)
    // 将生成的 URL 设置到数据属性中，以便在模板中使用
    qrCodeUrl.value = url
  } catch (error) {
    // console.error('Error generating QR code:', error)
  }
})
</script>
<style lang="scss" scoped></style>
