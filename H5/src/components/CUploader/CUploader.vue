<template>
  <van-uploader
    v-model="fileList"
    :max-count="props.maxCount"
    :disable-preview="props.disablePreview"
    :after-read="onRead"
    :max-size="10 * 1024 * 1024"
    :before-read="beforeRead"
    multiple
    @delete="onDelete"
  >
    <slot></slot>
  </van-uploader>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getImageUpload } from '@/api/recharge'
import eventBus from '@/utils/eventBus'
import { showToast } from 'vant'
import i18n from '@/i18n'
const emit = defineEmits(['updateList'])
const props = defineProps({
  maxCount: {
    type: Number,
    default: 1
  },
  disablePreview: {
    type: Boolean,
    default: true
  }
})
onMounted(() => {
  eventBus.on('emptyImg', () => {
    index.value = 0
    fileList.value = []
  })
})
onUnmounted(() => {
  eventBus.off('emptyImg')
})
// 图片数组
const fileList = ref([])

// 当前图片索引 默认为0
const index = ref(0)

const beforeRead = (file) => {
  if (Array.isArray(file)) {
    file.forEach((item) => {
      if (!['image/jpeg', 'image/png'].includes(item.type)) {
        showToast(i18n.global.t('common.uploadPicTip'))
        return false
      }
    })
    if (!['image/jpeg', 'image/png'].includes(item.type)) {
      showToast(i18n.global.t('common.uploadPicTip'))
      return false
    }
  }
  return true
}

const onRead = (file) => {
  // 将文件对象作为FormData的一部分
  let content = file
  let formData = new FormData()
  if (Array.isArray(content)) {
    content.forEach((item) => {
      formData.append('file', item.file)
    })
  } else {
    formData.append('file', content.file)
  }
  getImageUpload(formData).then((res) => {
    if (res.data) {
      fileList.value.forEach((item, k) => {
        if (index.value == k) {
          item.imgUrl = res.data
        }
      })
      index.value += 1
      emit('updateList', fileList)
    }
  })
}

const onDelete = () => {
  index.value = 0
  emit('updateList', fileList)
}
</script>
<style lang="scss" scoped></style>
