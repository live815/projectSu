<!-- 意见反馈 -->
<template>
  <div class="main-container FeedBack">
    <div class="drop-down">
      <div class="drop-downtop">
        <el-form
          :model="form"
          ref="queryRef"
          v-show="showSearch"
          :inline="true"
          :rules="rules"
          label-width="100px"
          labelPosition="left"
        >
          <div>
            <el-form-item :label="$t('GeneralUserCenter.QuestionType')" prop="problemType">
              <el-select
                v-model="form.problemType"
                clearable
                :placeholder="$t('GeneralUserCenter.PleaseChoose')"
                style="width: 316px"
              >
                <el-option
                  v-for="item in problemType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </div>
          <div>
            <el-form-item :label="$t('GeneralUserCenter.Title')" prop="title">
              <el-input
                v-model="form.title"
                :placeholder="$t('GeneralUserCenter.EnteraTitle')"
                style="width: 800px"
              />
            </el-form-item>
          </div>
          <div>
            <el-form-item :label="$t('GeneralUserCenter.ContentSescription')" prop="content">
              <el-input
                v-model="form.content"
                maxlength="100"
                :placeholder="$t('GeneralUserCenter.Notice_17')"
                show-word-limit
                type="textarea"
                :rows="6"
                style="width: 800px"
              />
            </el-form-item>
          </div>
          <div>
            <el-form-item :label="$t('GeneralUserCenter.UploadInformation')">
              <el-upload
                :class="{ 'hide-upload': fileList.length >= 3 }"
                ref="uploadRef"
                v-model:file-list="fileList"
                list-type="picture-card"
                action="/api/file/tutorial/image/upload"
                :on-preview="handlePictureCardPreview"
                :on-exceed="handleExceed"
                :on-success="handleSuccess"
                :headers="headers"
                style="width: 500px"
                :limit="3"
              >
                <template #default>
                  <div class="defaultDiv">
                    <el-icon> <Plus /></el-icon>
                    <div>{{ $t('GeneralUserCenter.Upload') }}({{ fileList.length }}/3)</div>
                  </div>
                </template>
                <template #tip>
                  <div class="file-size">
                    <div class="size-one">{{ $t('GeneralUserCenter.UploadTips_1') }}</div>
                    <div>{{ $t('GeneralUserCenter.UploadTips_2') }}</div>
                  </div>
                </template>
              </el-upload>
              <el-dialog v-model="dialogVisible">
                <img w-full :src="dialogImageUrl" alt="Preview Image" />
              </el-dialog>
            </el-form-item>
          </div>
          <div class="submit-feedback">
            <div @click="submit(queryRef)">{{ $t('GeneralUserCenter.SubmitFeedback') }}</div>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import { ref, registerRuntimeCompiler } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { submitAdvice } from '@/api/announcement.js'
import { getImgUrl } from '@/utils'
import { template } from 'lodash'
const headers = ref({ Authorization: getToken() })
const queryRef = ref()
const form = ref({
  problemType: '',
  title: '',
  content: '',
  dataAddress: ''
})

const showSearch = ref(true)
const uploadRef = ref(null)

// 上传
const fileList = ref([])
const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url
  dialogVisible.value = true
}
const handleExceed = () => {
  ElMessage.warning(i18n.global.t('GeneralUserCenter.UploadTips_3'))
}

const handleSuccess = (res, file, fileList) => {
  if (file.raw.type.includes('video')) {
    const video = document.createElement('video')
    video.src = getImgUrl(res.data)
    video.crossOrigin = 'anonymous'
    video.onloadeddata = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      video.currentTime = 1
      video.oncanplay = () => {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight)
        file.url = canvas.toDataURL('image/png')
      }
      video.currentTime = 1
    }
  }
  file.submitUrl = res.data
}
const urlList = ref([])
const submit = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      form.value.source = 'PC'
      let temp = fileList.value.map((obj) => obj.submitUrl)
      form.value.dataAddress = temp.join(',')
      form.dataAddress = temp.join(',')
      submitAdvice(form.value).then((res) => {
        if (res.code == 200) {
          ElMessage.success(i18n.global.t('GeneralUserCenter.FeedbackSuccessful'))
          reset()
        } else {
          ElMessage.error(res.msg)
        }
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}
function reset() {
  form.value.problemType = ''
  form.value.title = ''
  form.value.content = ''
  form.value.dataAddress = ''
  uploadRef.value.clearFiles()
}
const problemType = [
  {
    value: i18n.global.t('GeneralUserCenter.FinancialProblem'),
    label: i18n.global.t('GeneralUserCenter.FinancialProblem')
  },
  {
    value: i18n.global.t('GeneralUserCenter.AccountProblem'),
    label: i18n.global.t('GeneralUserCenter.AccountProblem')
  },
  {
    value: i18n.global.t('GeneralUserCenter.GameProblem'),
    label: i18n.global.t('GeneralUserCenter.GameProblem')
  },
  {
    value: i18n.global.t('GeneralUserCenter.ActivityProblem'),
    label: i18n.global.t('GeneralUserCenter.ActivityProblem')
  },
  {
    value: i18n.global.t('GeneralUserCenter.PlatformRecommendations'),
    label: i18n.global.t('GeneralUserCenter.PlatformRecommendations')
  },
  {
    value: i18n.global.t('GeneralUserCenter.Complaints'),
    label: i18n.global.t('GeneralUserCenter.Complaints')
  }
]
const rules = reactive({
  problemType: [
    { required: true, trigger: 'blur', message: i18n.global.t('GeneralUserCenter.QuestionTypes') }
  ],
  title: [
    { required: true, trigger: 'blur', message: i18n.global.t('GeneralUserCenter.EnteraTitle') }
  ],
  content: [
    {
      required: true,
      trigger: 'blur',
      message: i18n.global.t('GeneralUserCenter.ContentSescriptionS')
    }
  ]
})
</script>

<style lang="scss" scoped>
.FeedBack {
  min-width: 1320px;
  max-width: 1320px;
  margin-top: 5px;
  background: #272b45;
  border-radius: 8px;
  padding-bottom: 50px;
  .defaultDiv {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
  }
  .drop-down {
    width: 1250px;
    margin: 0 auto;
    .drop-downtop {
      padding-top: 30px;
    }
  }
  .file-size {
    color: var(--60, rgba(255, 255, 255, 0.6));
    
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    .size-one {
      margin: 10px 0 5px 0;
    }
  }
  .submit-feedback {
    margin-top: 30px;
    margin-left:100px;
    div {
      width: 104px;
      height: 40px;
      color: var(--character-primary-inverse, #fff);
      text-align: center;
      
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 40px;
      border-radius: 4px;
      background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
      box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.04);
      cursor: pointer;
    }
  }
}

:deep() {
  .el-form-item__label {
    
    font-size: 14px;
    color: var(--100, #fff);
  }
  .el-input__wrapper {
    background-color: #272b45;
    box-shadow: none;
    // border: 1px solid var(--20, rgba(255, 255, 255, 0.2));
  }
  .el-textarea__inner {
    background-color: #272b45;
    box-shadow: none;
    border: 1px solid var(--20, rgba(255, 255, 255, 0.2));
    color: var(--100, #fff);
    
    font-size: 14px;
    font-style: normal;
  }
  .el-textarea .el-input__count {
    background-color: #272b45;
  }
  .el-upload--picture-card {
    background-color: #272b45;
  }
  .el-input__inner {
    color: var(--100, #fff);
    
    font-size: 14px;
    font-style: normal;
  }
  .el-upload--picture-card,
  .el-upload--picture-card:hover {
    border: 1px solid var(--20, rgba(255, 255, 255, 0.2));
  }

  .hide-upload .el-upload--picture-card {
    display: none;
  }
}
</style>
<style>
.el-picker__popper.el-popper {
  background: #171a2f;
}
.el-popper.is-light .el-popper__arrow::before {
  /* 三角形背景颜色 */
  background: var(--unnamed, #171a2f);
  border: 1px solid #1d223c;
}
</style>
