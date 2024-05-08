<template>
  <div>
    <el-upload
      v-model:file-list="fileList"
      action="/api/file/fund/image/upload"
      :headers="headers"
      list-type="picture-card"
      :on-success="handleUploadSuccess"
      :before-upload="beforeUpload"
      :limit="limit"
    >
      <div>
        <el-icon><Plus /></el-icon>
        <p class="text">{{ text }}</p>
      </div>
      <template #file="{ file }">
        <div>
          <img class="el-upload-list__item-thumbnail" :src="file.url" />
          <span class="el-upload-list__item-actions">
            <span class="el-upload-list__item-delete" @click="handleRemove(file)">
              <el-icon><Delete /></el-icon>
            </span>
          </span>
        </div>
      </template>
    </el-upload>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import { getToken } from '@/utils/cache'
import { Plus, Delete } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const headers = ref({ Authorization: 'Bearer ' + getToken() })

const emit = defineEmits(['pushData'])

const props = defineProps({
  text: {
    type: String,
    default: ''
  },
  limit: {
    type: Number,
    default: 1
  },
  receiptType: {
    type: Number,
    default: 1
  }
})

// 防止连续点击
const uploadClass = ref(false)

// 上传图片数组
const fileList = reactive([])
// 上传成功回调
const handleUploadSuccess = (res, file) => {
  if (res.code === 200) {
    const uploadedFile = {
      url: res.data, // 设置图片路径
      name: file.name, // 设置文件名称
      uid: Date.now() // 设置唯一标识符
      // 其他需要的属性
    }
    fileList.push(uploadedFile)
    uploadClass.value = false
    emit('pushData', fileList, props.receiptType)
  }
}
const handleRemove = (file, index) => {
  console.log('🚀 ~ file: Uploader.vue:105 ~ handleRemove ~ file:', file, index)
}
const beforeUpload = (file) => {
  const isImage = file.type.startsWith('image/')
  if (!isImage) {
    ElMessage.error(i18n.global.t('DepositWithdraw.OnlyImage'))
    return false
  }
  const isJPGorPNG = file.type === 'image/jpeg' || file.type === 'image/png'
  const isLt1M = file.size / 1024 / 1024 < 10

  if (!isJPGorPNG) {
    ElMessage.error(i18n.global.t('DepositWithdraw.UploadTips_1'))
  }
  if (!isLt1M) {
    ElMessage.error(i18n.global.t('DepositWithdraw.UploadTips_2'))
  }

  return isImage && isJPGorPNG && isLt1M
}
</script>

<style lang="scss" scoped>
.text {
  margin-top: 30px;
  color: #636589;
  font-size: 14px;
}
:deep() {
  .el-upload-list__item,
  .el-upload {
    position: relative;
    width: 110px;
    height: 110px;
    background: #171a2f;
    border: none;
  }
  .el-icon {
    position: absolute;
    left: 50%;
    top: 25%;
    transform: translate(-50%);
  }
}
.hide :deep() {
  .el-upload--picture-card {
    display: none;
  }
}
</style>
