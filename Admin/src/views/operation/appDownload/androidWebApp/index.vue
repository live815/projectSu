<template>
  <div class="app-container">
    <el-form>
      <el-form-item label="">
        <el-upload
          v-model:file-list="fileList"
          ref="upload"
          action="/admin/file/tutorial/image/upload"
          :limit="1"
          :headers="requestHeader"
          :on-success="handleSuccess"
          :on-exceed="handleExceed"
          :on-preview="handlePreview"
        >
          <template #trigger>
            <el-button type="primary">上传APP包</el-button>
          </template>
          <!-- <el-button class="ml-3" type="success" @click="submitUpload">
            upload to server
          </el-button> -->
          <template #tip>
            <div class="el-upload__tip text-red">
              <!-- limit 1 file, new file will cover the old file -->
              *限制一个文件，新文件会覆盖旧的文件
            </div>
          </template>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button @click="save" type="primary"> 保存 </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { genFileId } from 'element-plus'
import { getToken } from '@/utils/auth'
import { getImgUrl } from '@/utils'
import { copyTextToClipboard } from '@/directive/common/copyText'
import { saveAndroidWepAppConfig, getAndroidWebAppConfig } from '@/api/operation/appDownload'
import {
  ElMessage,
} from "element-plus";
const fileList = ref([])

getAndroidWebAppConfig()
// 配置上传
const requestHeader = {
  Authorization: getToken()
}
const upload = ref(null)
// 上传成功;
const handleSuccess = (res, file) => {
  fileList.value = [
    {
      name: file.name,
      url: res.data
    }
  ]
}
// 覆蓋
function handleExceed(files) {
  upload.value.clearFiles()
  const file = files[0]
  file.uid = genFileId()
  upload.value.handleStart(file)
  upload.value.submit()
}

// 点击文件
function handlePreview(file) {
  // 复制视频链接
  let url = file.url || file.response?.data
  copyTextToClipboard(getImgUrl(url))
}

function save() {
  console.log(fileList.value)
  if (!fileList.value.length) {
    ElMessage({ type: 'warning', message: '请上传app包' })
    return
  }
  saveAndroidWepAppConfig({
    config: fileList.value
  })
}
</script>

<style lang="scss" scoped>
.text-red {
  color: red;
}
</style>
