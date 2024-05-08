<template>
  <van-uploader
    v-model="fileList"
    :max-count="props.maxCount"
    :disable-preview="props.disablePreview"
    :after-read="onRead"
    :before-read="beforeRead"
    multiple
    accept=".jpg,.png,.jpeg,.bmp,.mp4,.mov"
    @delete="onDelete"
  >
    <slot></slot>
  </van-uploader>
</template>

<script setup>
import { showToast } from 'vant'
import { ref } from 'vue'
import { getItemUpload } from '@/api/promotion.js'
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
// 图片数组
const fileList = ref([])
// 当前图片索引 默认为0
const index = ref(0)

const beforeRead = (file) => {
  if (checkFile(file.type)) {
    // console.log(fileList.value)
    return true
  }
  showToast('文件格式不符合')
  return false
}
const checkFile = (n) => {
  return accceptFormat.some((format) => n.includes(format))
}
const accceptFormat = ['jpg', 'png', 'jpeg', 'bmp', 'mp4', 'mov']
const onRead = (file) => {
  // 将文件对象作为FormData的一部分

  file.status = 'uploading'
  let content = file
  let formData = new FormData()
  if (Array.isArray(content)) {
    content.forEach((item) => {
      formData.append('file', item.file)
    })
  } else {
    formData.append('file', content.file)
  }

  getItemUpload(formData)
    .then((res) => {
      if (res.data) {
        file.status = 'done'
        fileList.value.forEach((item, k) => {
          if (index.value == k) {
            item.imgUrl = res.data
          }
        })
        index.value += 1
        emit('updateList', fileList)
      }
    })
    .catch((err) => {
      if (err == 'Request failed with status code 413') {
        showToast(i18n.global.t('setview.Filelarge'))
      }
      file.status = 'failed'
      file.message = i18n.global.t('setview.uploadfail')
    })
}
const onDelete = () => {
  emit('updateList', fileList)
}
</script>
<style lang="scss" scoped></style>
