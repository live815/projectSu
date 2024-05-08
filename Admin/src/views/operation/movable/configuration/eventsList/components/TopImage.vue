//顶部图片上传
<template>
  <div class="client-img">
    <div class="client">
      <div class="port">APP/H5</div>
      <el-upload
        class="avatar-uploader"
        action="/admin/file/tutorial/image/upload"
        :data="{}"
        :show-file-list="false"
        :on-success="handleUploadSuccessBigApp"
        :headers="headers"
        :on-remove="handleRemove">
        <img
          v-if="queryParams.activityTopApp"
          :src="getImgUrl(queryParams.activityTopApp)"
          class="avatar" />
        <el-icon v-else class="avatar-uploader-icon rewrite-icon"><Plus /></el-icon>
      </el-upload>
      <div>{{ $t('operation.tip122') }}</div>
    </div>
    <div class="client">
      <div class="port">Web</div>
      <el-upload
        class="avatar-uploader"
        action="/admin/file/tutorial/image/upload"
        :data="{}"
        :show-file-list="false"
        :on-success="handleUploadSuccessBigWeb"
        :headers="headers"
        :on-remove="handleRemove">
        <img
          v-if="queryParams.activityTopWeb"
          :src="getImgUrl(queryParams.activityTopWeb)"
          class="avatar" />
        <el-icon v-else class="avatar-uploader-icon rewrite-icon"><Plus /></el-icon>
      </el-upload>
      <div>{{ $t('operation.tip122') }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getToken } from '@/utils/auth'
import { getImgUrl } from '@/utils'
import i18n from '@/i18n'

const headers = ref({ Authorization: 'Bearer ' + getToken() })
const emit = defineEmits(['topPicture'])
const { proxy } = getCurrentInstance()
const props = defineProps({
  pictureList: {
    type: Object
  }
})
const queryParams = ref({
  activityTopApp: '',
  activityTopWeb: ''
})
const handleUploadSuccessBigApp = (res) => {
  queryParams.value.activityTopApp = res.data
  proxy.$modal.msgSuccess(i18n.global.t('operation.Uploadsuccess'))
  emit('topPicture', queryParams)
}
const handleUploadSuccessBigWeb = (res) => {
  queryParams.value.activityTopWeb = res.data
  proxy.$modal.msgSuccess(i18n.global.t('operation.Uploadsuccess'))
  emit('topPicture', queryParams)
}
const handleRemove = (res) => {
}

onMounted(() => {
  if (props.pictureList) {
    queryParams.value = props.pictureList
  }
})
</script>

<style lang="scss" scoped>
.rewrite-icon {
  width: 150px;
  height: 150px;
  text-align: center;
  line-height: 100px;
  border: 1px dashed #eee;
}
.avatar {
  width: 150px;
  height: 150px;
}
.client-img {
  display: flex;
  .client {
    margin-right: 50px;
    text-align: center;
    .port {
      margin: 0 auto;
    }
  }
}
</style>
