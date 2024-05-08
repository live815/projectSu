<template>
  <el-dialog :title="title" v-model="open" width="600px" append-to-body :before-close="handleClose">
    <el-form :model="ruleForm" :rules="rules" ref="ruleFormRef" label-width="110px">
      <el-form-item :label="$t('operation.title')" prop="title">
        <el-input v-model="ruleForm.title" :placeholder="$t('operation.tip8')" />
      </el-form-item>
      <el-form-item :label="$t('operation.APPpictures')" prop="appUrl">
        <el-upload
          action="/admin/file/ad/image/upload"
          list-type="picture-card"
          :show-file-list="false"
          :on-exceed="handleExceedApp"
          :on-success="handleUploadSuccessBigApp"
          :on-error="handleUploadErrorApp"
          :on-preview="handlePictureCardPreviewApp"
          accept=".bmp,.gif,.jpg,.jpge,.png"
          :headers="headers"
          :auto-upload="true"
        >
          <img v-if="ruleForm.appUrl" :src="getImgUrl(ruleForm.appUrl)" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon rewrite-icon"><Plus /></el-icon>
        </el-upload>
        <el-dialog v-model="dialogImgApp" :title="$t('operation.Preview')" width="750">
          <img
            w-full
            :src="getImgUrl(ruleForm.appUrl)"
            alt="Preview Image"
            class="channel-manage-img"
          />
        </el-dialog>
      </el-form-item>
      <el-form-item :label="$t('operation.Webpictures')" prop="webUrl">
        <el-upload
          action="/admin/file/ad/image/upload"
          list-type="picture-card"
          :show-file-list="false"
          :on-exceed="handleExceedWeb"
          :on-success="handleUploadSuccessBigWeb"
          :on-error="handleUploadErrorWeb"
          :on-preview="handlePictureCardPreviewWeb"
          accept=".bmp,.gif,.jpg,.jpge,.png"
          :headers="headers"
          :auto-upload="true"
        >
          <img v-if="ruleForm.webUrl" :src="getImgUrl(ruleForm.webUrl)" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon rewrite-icon"><Plus /></el-icon>
        </el-upload>
        <el-dialog v-model="dialogImgWeb" :title="$t('operation.Preview')" width="750">
          <img
            w-full
            :src="getImgUrl(ruleForm.webUrl)"
            alt="Preview Image"
            class="channel-manage-img"
          />
        </el-dialog>
      </el-form-item>
      <el-form-item :label="$t('operation.weightsort')" prop="weight">
        <el-input
          type="number"
          v-model="ruleForm.weight"
          :placeholder="$t('operation.tip50')"
          style="width: 200px"
        />
      </el-form-item>
      <el-form-item :label="$t('operation.Jumptype')" prop="jumpType">
        <el-radio-group v-model="ruleForm.jumpType">
          <el-radio :label="1">{{ $t('operation.URL') }}</el-radio>
          <el-radio :label="2">{{ $t('operation.Nojump') }}</el-radio>
          <el-radio :label="3">{{ $t('operation.activityModule') }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <template v-if="ruleForm.jumpType == 1">
        <el-form-item :label="$t('operation.URLaddress')" prop="jumpUrl">
          <el-input v-model="ruleForm.jumpUrl" style="width: 200px"></el-input>
        </el-form-item>
      </template>
      <template v-if="ruleForm.jumpType == 3">
        <el-form-item label="" prop="jumpActive">
          <el-select v-model="ruleForm.jumpActive" :placeholder="$t('operation.tip51')">
            <el-option v-for="item in dataList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </template>
      <el-form-item :label="$t('operation.Visitordisplay')" prop="vistorShow">
        <el-radio-group v-model="ruleForm.vistorShow">
          <el-radio :label="0">{{ $t('operation.Dodisplay') }}</el-radio>
          <el-radio :label="1">{{ $t('operation.exhibit') }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="$t('operation.status')" prop="status">
        <el-radio-group v-model="ruleForm.status">
          <el-radio :label="1">{{ $t('operation.turnOn') }}</el-radio>
          <el-radio :label="0">{{ $t('operation.deactivate') }}</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="submitForm(ruleFormRef)">{{
          $t('operation.sure')
        }}</el-button>
        <el-button @click="resetForm(ruleFormRef)">{{ $t('operation.cancel') }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getToken } from '@/utils/auth'
import { getImgUrl } from '@/utils'
import { addSponsorApi, editSponsorApi } from '@/api/operation/sponsor'
import { getAdvertisingntListTitleApi } from '@/api/operation/carousel'
import i18n from '@/i18n'

const emit = defineEmits(['submitBtn'])
const { proxy } = getCurrentInstance()
const props = defineProps({
  title: {
    type: String,
    default: i18n.global.t('operation.add')
  },
  rowItems: {
    type: Object,
    default: () => {}
  }
})
// 活动标题数组
const dataList = ref([])
const open = ref(true)
// 编辑还是新增
const title = computed(() => {
  return props.title
})

const dialogImgApp = ref(false)
const dialogImgWeb = ref(false)

// 传递过来的当前项值
const rowItems = computed(() => {
  return props.rowItems
})

onMounted(() => {
  getAdvertisingntListTitleApi().then((res) => {
    dataList.value = res
  })
  if (rowItems.value.id) {
    // 根据跳转类型进行回显
    if (ruleForm.value.jumpType == 1) {
      ruleForm.value.jumpUrl = ruleForm.value.jumpContent
    }
    if (ruleForm.value.jumpType == 3) {
      ruleForm.value.jumpActive = ruleForm.value.jumpContent
    }
  }
})
const ruleFormRef = ref()
const ruleForm = ref({
  id: rowItems.value.id, // 当前id
  title: rowItems.value.title, // 轮播标题
  appUrl: rowItems.value.appUrl, // app图片
  webUrl: rowItems.value.webUrl, // WEB图片
  weight: rowItems.value.weight, // 权重顺序
  jumpType: rowItems.value.jumpType, // 跳转类型
  jumpContent: rowItems.value.jumpContent, // 跳转网址 只有跳转类型网址才有
  vistorShow: rowItems.value.vistorShow, // 游客展示
  status: rowItems.value.status, // 状态类型
  createBy: rowItems.value.createBy, //  创建人
  createTime: rowItems.value.createTime, //  创建时间
  jumpUrl: '', // 跳转网址
  jumpActive: '' // 活动模块
})
const headers = ref({ Authorization: 'Bearer ' + getToken() })

const rules = ref({
  title: [
    {
      required: true,
      message: i18n.global.t('operation.tip52'),
      trigger: 'blur'
    }
  ],
  jumpType: [
    {
      required: true,
      message: i18n.global.t('operation.plsSelectjumpType'),
      trigger: 'blur'
    }
  ],
  status: [
    {
      required: true,
      message: i18n.global.t('operation.plsSelectStatus'),
      trigger: 'blur'
    }
  ],
  vistorShow: [
    {
      required: true,
      message: i18n.global.t('operation.plsSelectShowToUser'),
      trigger: 'blur'
    }
  ],
  weight: [
    {
      required: true,
      message: i18n.global.t('operation.plsInputWeight'),
      trigger: 'blur'
    }
  ],
  appUrl: [
    {
      required: true,
      message: i18n.global.t('operation.plsUploadImg'),
      trigger: 'blur'
    }
  ],
  webUrl: [
    {
      required: true,
      message: i18n.global.t('operation.plsUploadImg'),
      trigger: 'blur'
    }
  ]
})

const handleUploadSuccessBigApp = (res) => {
  if (res.data) ruleForm.value.appUrl = res.data
  proxy.$modal.msgSuccess(i18n.global.t('operation.Uploadsuccess'))
}

const handleExceedApp = () => {
  proxy.$modal.msgError(i18n.global.t('operation.tip53'))
}

const handleUploadErrorApp = () => {
  console.log(err, '错误')
}
const handlePictureCardPreviewApp = () => {
  // ruleForm.value.appUrl = uploadFile.url;
  dialogImgApp.value = true
}
const handleUploadSuccessBigWeb = (res, file) => {
  if (res.data) ruleForm.value.webUrl = res.data
  proxy.$modal.msgSuccess(i18n.global.t('operation.Uploadsuccess'))
}
const handleExceedWeb = () => {
  proxy.$modal.msgError(i18n.global.t('operation.tip53'))
}
const handleUploadErrorWeb = () => {
  console.log(err, '错误')
}

const handlePictureCardPreviewWeb = () => {
  dialogImgWeb.value = true
}

// 提交表单
const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      // 跳转类型判断
      if (ruleForm.value.jumpType == 1) {
        ruleForm.value.jumpContent = ruleForm.value.jumpUrl
      }
      if (ruleForm.value.jumpType == 2) {
        ruleForm.value.jumpContent = ''
      }
      if (ruleForm.value.jumpType == 3) {
        ruleForm.value.jumpContent = ruleForm.value.jumpActive
      }
      if (ruleForm.value.id) {
        editSponsorApi(ruleForm.value).then((res) => {
          emit('submitBtn', 1)
          proxy.$modal.msgSuccess(i18n.global.t('operation.Editsuccessful'))
        })
      } else {
        addSponsorApi(ruleForm.value)
          .then((res) => {
            emit('submitBtn', 1)
            proxy.$modal.msgSuccess(i18n.global.t('operation.addsuccessful'))
          })
          .catch((res) => {})
      }

      // console.log(ruleForm.value,"ruleForm")
    } else {
      console.log('error submit!', fields)
    }
  })
}
const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
  emit('submitBtn', 2)
}

const handleClose = (done) => {
  done()
  ruleFormRef.value.resetFields()
  emit('submitBtn', 2)
}
</script>

<style scoped lang="scss">
img {
  width: 80px;
  height: 80px;
}
.rewrite-icon {
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  border: 1px dashed #eee;
}

.channel-manage-img {
  width: 700px;
  height: auto;
}

.table-jumpContent {
  display: flex;
  align-items: center;
  margin-top: 10px;
  span {
    margin-right: 10px;
  }
}
</style>
