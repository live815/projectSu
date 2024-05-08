<template>
  <div class="boxCenter">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="auto"
      class="demo-ruleForm"
      :size="formSize"
      status-icon
      v-if="showIs"
    >
      <el-form-item :label="$t('AnchorPlay.Height')" prop="height">
        <el-input v-model="ruleForm.height" :placeholder="$t('AnchorPlay.HeightTips')" style="width: 320px" />
      </el-form-item>
      <el-form-item :label="$t('AnchorPlay.Weight')" prop="weight">
        <el-input v-model="ruleForm.weight" :placeholder="$t('AnchorPlay.WeightTips')" style="width: 320px" />
      </el-form-item>
      <el-form-item :label="$t('AnchorPlay.Birthday')" prop="birthday">
        <el-date-picker
          style="width: 320px"
          v-model="ruleForm.birthday"
          type="date"
          value-format="YYYY-MM-DD"
          :placeholder="$t('AnchorPlay.BirthdayTips')"
        />
      </el-form-item>
      <el-form-item :label="$t('AnchorPlay.Hobby')">
        <el-input
          v-model="ruleForm.hobby"
          :placeholder="$t('AnchorPlay.HobbyTips')"
          style="width: 320px"
        />
      </el-form-item>
      <el-form-item :label="$t('AnchorPlay.EmotionalState')" prop="emotion">
        <el-select v-model="ruleForm.emotion" :placeholder="$t('AnchorPlay.EmotionalStateTips')" style="width: 320px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('AnchorPlay.PhotoWall')" prop="photoWall" class="full-width">
        <el-upload
          v-model:file-list="fileList"
          action="/api/file/live/image/upload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleUploadWall"
          :headers="headers"
          :data="{}"
          :before-upload="beforeUpload"
          :class="[fileListTwo.length == 9 ? 'hideBox' : '']"
        >
          <div
            style="
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            "
          >
            <el-icon><Plus /></el-icon>
            <div>{{$t('AnchorPlay.Upload')}}({{ fileListTwo.length }}/9)</div>
          </div>
          <template v-if="fileListTwo.length == 9">
            <div class="tipBox">{{$t('AnchorPlay.UploadTips_1')}}</div>
          </template>
          <template #tip>
            <div class="prompt">{{$t('AnchorPlay.UploadTips_2')}}</div>
          </template>
        </el-upload>
        <el-dialog v-model="dialogVisiblebig" width="40%">
          <div class="bigbox">
            <img w-full :src="dialogImageUrl" alt="Preview Image" />
          </div>
        </el-dialog>
      </el-form-item>
      <el-form-item>
        <div @click="submitForm(ruleFormRef)" class="debutBtn">{{$t('AnchorPlay.Save')}}</div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import { Plus } from '@element-plus/icons-vue'
import { onMounted, toRaw, ref, reactive } from 'vue'
import { getToken, getImgUrl } from '@/utils/cache'
import { getAnchorInfo, updateAnchor } from '@/api/liveBroadcast'
import { useUserStore } from '@/stores/user'
const headers = ref({ Authorization: 'Bearer ' + getToken() })
const user = useUserStore()
const userInfo = computed(() => {
  return user.userInfo
})
const ruleForm = ref({})
const showIs = ref(false)
const options = [
  {
    value: '0',
    label: i18n.global.t('AnchorPlay.Private')
  },
  {
    value: '1',
    label: i18n.global.t('AnchorPlay.Single')
  },
  {
    value: '2',
    label: i18n.global.t('AnchorPlay.Married')
  }
]
// 身高校验规则
const checkheight = (rule, value, callback) => {
  const reguserName = /^[0-9]+(\.[0-9]+)?$/
  if (reguserName.test(value)) {
    callback()
  } else {
    callback(new Error(i18n.global.t('AnchorPlay.OnlyNumbers')))
  }
}
const checkweight = (rule, value, callback) => {
  const reguserName = /^[0-9]+(\.[0-9]+)?$/
  if (reguserName.test(value)) {
    callback()
  } else {
    callback(new Error(i18n.global.t('AnchorPlay.OnlyNumbers')))
  }
}

const checkphotoWall = (rule, value, callback) => {
  if (fileListTwo.value.length < 10) {
    callback()
  } else {
    callback(new Error(i18n.global.t('AnchorPlay.UploadTips_1')))
  }
}
const rules = reactive({
  height: [
    { required: true, trigger: 'change', message: i18n.global.t('AnchorPlay.HeightTips_1') },
    {
      validator: checkheight,
      trigger: 'blur'
    }
  ],
  weight: [
    { required: true, trigger: 'change', message: i18n.global.t('AnchorPlay.HeightTips_1') },
    {
      validator: checkweight,
      trigger: 'blur'
    }
  ],
  birthday: [{ required: true, trigger: 'change', message: i18n.global.t('AnchorPlay.BirthdayTips') }],
  emotion: [{ required: true, trigger: 'change', message: i18n.global.t('AnchorPlay.EmotionalStateTips') }],
  photoWall: [
    { required: true, trigger: 'change', message: i18n.global.t('AnchorPlay.PhotoWallTips')},
    { validator: checkphotoWall, trigger: 'blur' }
  ]
})

const formSize = ref('default')
const ruleFormRef = ref()
const dialogVisiblebig = ref(false)
const dialogImageUrl = ref('')
const fileList = ref([])
const fileListTwo = ref([])
const datar = ref('')
// 处理相片墙数据
onMounted(() => {
  getAnchorInfos()
})
// const fileLister = computed(()=>{
//     // fileList.value = []
//     if (ruleForm.value.photoWall!== "") {
//         fileListTwo.value.map((item) => {
//             const obj = {}
//             obj.url = getImgUrl(item);
//             fileList.value.push(obj);
//         });
//         return fileList.value
//     }else{
//         return ''
//     }
// })
const getAnchorInfos = async () => {
  let presenterId = userInfo.value.id
  try {
    let res = await getAnchorInfo(presenterId)
    fileList.value = []
    fileListTwo.value = res.data.photoWall.split(',')
    fileListTwo.value.map((item) => {
      const obj = {}
      obj.url = getImgUrl(item)
      fileList.value.push(obj)
    })
    ruleForm.value = res.data
    showIs.value = true
  } catch (e) {
    console.log(e.message)
  }
}
// 相片墙上传图片成功处理数据
const handleUploadWall = (res) => {
  fileListTwo.value.push(res.data)
  ruleForm.value.photoWall = toRaw(fileListTwo.value).toString()
}

const handlePictureCardPreview = (file) => {
  dialogImageUrl.value = file.url
  dialogVisiblebig.value = true
}
const beforeUpload = (file) => {
  const isJPGorPNG = file.type === 'image/jpeg' || file.type === 'image/png'
  const isLt1M = file.size / 1024 / 1024 < 1

  if (!isJPGorPNG) {
    ElMessage(i18n.global.t('AnchorPlay.UploadTips_3'))
  }
  if (!isLt1M) {
    ElMessage(i18n.global.t('AnchorPlay.UploadTips_4'))
  }
  return isJPGorPNG && isLt1M
}
const handleRemove = (res) => {
  // console.log(res, 'testestest')
  // const data = toRaw(res).url
  // const head = import.meta.env.VITE_IMG_API
  // console.log(data, head.length, '111')

  // if (data.indexOf(head) !== -1) {
  //   datar.value = data.substr(head.length)
  // } else {
  //   datar.value = toRaw(res).response.data
  // }

  datar.value = toRaw(res).response.data


  const index = fileListTwo.value.indexOf(datar.value)
  fileListTwo.value.splice(index, 1)
  ruleForm.value.photoWall = toRaw(fileListTwo.value).toString()
  //   console.log(ruleForm.value.photoWall, "2222");
}
const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      updateAnchor(ruleForm.value).then((res) => {
        if (res.code == 200) {
          ElMessage({
            message: i18n.global.t('AnchorPlay.ModifiedSuccessfully'),
            type: 'success'
          })

          showIs.value = false
          getAnchorInfos()
        } else {
          ElMessage({
            message: res.msg,
            type: 'error'
          })
        }
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<style lang="scss" scoped>
.boxCenter {
  padding-top: 30px;
  height: 100vh;
  .debutBtn {
    display: flex;
    width: 104px;
    height: 40px;
    padding: 10px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    border-radius: 4px;
    background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
    color: #fff;
    
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 157.143% */
    cursor: pointer;
  }
  .prompt {
    margin-top: 20px;
    color: rgba(255, 255, 255, 0.6);
    
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px; /* 114.286% */
  }
  .defaultDiv {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .bigbox {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.boxCenter :deep() {
  .el-input__wrapper {
    background-color: #232949;
  }
  .el-radio__inner {
    background-color: #272b45;
    border: 1px solid #9292bf;
  }
  .el-form-item__label,
  .el-radio__label,
  .el-input__inner {
    color: #fff;
  }
  .el-input__wrapper {
    background-color: #272b45;
    // box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.20) !important;
  }
  .demo-ruleForm .el-form-item {
    margin-bottom: 30px;
  }
  .el-upload--picture-card {
    background-color: #171a2f;
    border-radius: 4px;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  .el-upload--picture-card i {
    font-size: 24px;
  }

  .el-upload-list .el-upload:hover > .defaultDiv {
    color: #fff;
  }
}
.hideBox {
  :deep(.el-upload--picture-card) {
    display: none;
  }
}
</style>
<style>
.el-picker__popper.el-popper,
.el-popper.is-light {
  background: #1d223c !important;
}
</style>
