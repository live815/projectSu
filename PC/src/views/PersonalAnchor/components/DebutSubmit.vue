<template>
  <div>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="auto"
      class="demo-ruleForm"
      :size="formSize"
      status-icon
    >
      <el-form-item :label="$t('AnchorPlay.SelectChannel')">
        <el-radio-group v-model="ruleForm.roomStyle" :disabled="props.type == 2">
          <el-radio :label="1">{{ $t('AnchorPlay.Football') }}</el-radio>
          <el-radio :label="3">{{ $t('AnchorPlay.Basketball') }}</el-radio>
          <el-radio :label="4">{{ $t('AnchorPlay.Entertainment') }}</el-radio>
          <el-radio :label="6">{{ $t('AnchorPlay.Other') }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        :label="$t('AnchorPlay.RelatedEvents')"
        prop="associatedLeague"
        v-if="ruleForm.roomStyle == 1 || ruleForm.roomStyle == 3"
      >
        <el-input
          v-model="ruleForm.associatedLeague"
          readonly
          style="width: 87%"
          :placeholder="$t('AnchorPlay.SelectRelatedEvents')"
        />
        <div
          class="gameBtn"
          @click="gameBtn"
          v-if="props.type == 1 && (ruleForm.roomStyle == 1 || ruleForm.roomStyle == 3)"
        >
          {{ $t('AnchorPlay.SelectEvent') }}
        </div>
      </el-form-item>
      <el-form-item :label="$t('AnchorPlay.LiveTitle')" prop="roomTitle">
        <el-input
          v-model="ruleForm.roomTitle"
          :placeholder="$t('AnchorPlay.InputLiveTitle')"
          style="width: 87%"
        />
      </el-form-item>
      <el-form-item :label="$t('AnchorPlay.SelectCoverLabel')">
        <el-radio-group v-model="ruleForm.frontCoverTag">
          <el-radio v-for="item in tagData" :key="item.id" :label="item.tagCode">{{
            item.tagName
          }}</el-radio>
          <!-- <el-radio :label="2" >篮球</el-radio>
                    <el-radio :label="3" >充值提现</el-radio>
                    <el-radio :label="4" >体育赛事</el-radio> -->
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="$t('AnchorPlay.LiveCover')">
        <el-upload
          action="/api/file/live/image/upload"
          :on-success="handleUploadSuccess"
          :before-upload="beforeUpload"
          :data="{ lobbyId: '12345' }"
          :headers="headers"
          :show-file-list="false"
          v-loading="uploadClass"
        >
          <!-- :class="{'el-upload-hidden':uploadClass}" -->
          <div v-if="ruleForm.frontCoverImage" style="height: 90px">
            <img :src="getImgUrl(ruleForm.frontCoverImage)" class="avatarImg" />
            <el-icon class="devClose" @click.stop="handleRemove"><Close class="guanbi" /></el-icon>
          </div>
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          <!-- <el-icon v-if="!ruleForm.frontCoverImage"> 
                        <Plus />
                    </el-icon> -->
        </el-upload>
        <div class="prompt">
          {{ $t('AnchorPlay.UploadLiveCoverTips') }}
        </div>
      </el-form-item>

      <el-form-item
        :label="$t('AnchorPlay.BookBroadcastTime')"
        prop="playStartTime"
        v-if="props.type == 2"
      >
        <el-date-picker
          v-model="ruleForm.playStartTime"
          value-format="YYYY-MM-DD HH:mm:ss"
          :disabled-date="pickerOptions"
          type="datetime"
          :placeholder="$t('AnchorPlay.SelectDateTime')"
        />
        <span v-if="[1,3].includes(resource)" class="warn-text">{{ $t('AnchorPlay.warnText') }}</span>
      </el-form-item>
      <el-form-item
        :label="$t('AnchorPlay.PayStreamingRights')"
        v-if="ruleForm.roomStyle == 4 || ruleForm.roomStyle == 6"
      >
        <el-input
          v-model="ruleForm.viewPayAmount"
          oninput="value = value.replace(/[^\d]/g,'')"
          style="width: 30%"
          :placeholder="$t('AnchorPlay.EnterAmount')"
          maxlength="5"
        />
      </el-form-item>
      <el-form-item :label="$t('AnchorPlay.PushAddress')">
        <el-input
          ref="copyInput"
          v-model="ruleForm.webrtcPushUrl"
          readonly
          :placeholder="$t('AnchorPlay.WaitAddress')"
          style="width: 87%"
        />
        <div class="copy" @click="copyToClipboard">{{ $t('AnchorPlay.Copy') }}</div>
      </el-form-item>
      <el-form-item>
        <div @click="submitForm(ruleFormRef)" class="debutBtn">
          {{ btnTitle }}
        </div>
        <div
          @click="goSubmitForm(ruleFormRef)"
          v-if="props.uid !== 0"
          class="debutBtn"
          style="margin-left: 10px"
        >
          {{ $t('AnchorPlay.StartImmediately') }}
        </div>
      </el-form-item>
    </el-form>
    <CustomizeDialog
      :dialogShow="dialogShow"
      @closeBtn="closeBtn"
      :title="$t('AnchorPlay.SelectRelatedEvents')"
      v-if="dialogShow"
    >
      <GameList v-if="dialogShow" @anchorSubmit="anchorSubmit" />
    </CustomizeDialog>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import { getToken, getImgUrl, formatCurrentTime } from '@/utils/cache'
import { Plus, Close } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { onMounted, ref, reactive, onBeforeUnmount } from 'vue'
import CustomizeDialog from '@/components/CustomizeDialog/CustomizeDialog.vue'
import GameList from './GameList.vue'
import { getAnchorDebut, getReserveDetail, getStreamUpdate, getTagList } from '@/api/liveBroadcast'
import { useUserStore } from '@/stores/user'
const user = useUserStore()
const userInfo = computed(() => {
  return user.userInfo
})
// import {getAnchorDebut} from '@/api/liveBroadcast'
const headers = ref({ Authorization: 'Bearer ' + getToken() })

const router = useRouter()
const uploadClass = ref(false)
const dialogImageUrl = ref('')
const props = defineProps({
  title: {
    type: String
  },
  // 1 立即开播 2 预约开播
  type: {
    type: Number
  },
  //开播类型
  resource: {
    type: Number,
    default: 1
  },
  //修改id
  uid: {
    type: Number,
    default: 0
  },
  gameId: {
    type: Number
  },
  associatedLeague: {
    type: String
  },
  mainName: {
    type: String
  },
  cusName: {
    type: String
  },
  KickOffTime: {
    type: String
  }
})

const copyInput = ref()
const emit = defineEmits(['debutClick'])
const formSize = ref('default')
const ruleFormRef = ref()
const btnTitle = ref('')
const dialogShow = ref(false)
const tagData = ref([])
const ruleForm = ref({
  presenterId: userInfo.value.id,
  frontCoverImage: '',
  frontCoverTag: 1,
  webrtcPushUrl: '',
  roomStyle: props.resource,
  roomTitle: '',
  playStartTime: '',
  associatedContest: '',
  associatedLeague: '', //关联联赛
  viewPayAmount: 0, //付款观看
  presenterName: userInfo.value.nickName, //主播账号
  gameId: '', //联赛id
  presenterAvatar: userInfo.value.avatar, //主播头像
  id: '',
  mainName: '', //主队
  cusName: '' //客队
})
const pickerOptions = (time) => {
  if ([1,3].includes(props.resource)) {
    // 禁用小于开赛时间的日期时间
  return time.getTime() > Date.parse(props.KickOffTime)
  } else {
    // 禁用小于当前时间的日期时间
  return time.getTime() < Date.now() - 8.64e7 // 8.64e7表示一天的毫秒数
  }
  
}

 
const rules = reactive({
  associatedLeague: [
    { required: true, message: i18n.global.t('AnchorPlay.SelectRelatedEvents'), trigger: 'change' }
  ],
  roomTitle: [
    { required: true, message: i18n.global.t('AnchorPlay.InputLiveTitleTips_1'), trigger: 'blur' }
  ],
  frontCoverImage: [
    { required: true, message: i18n.global.t('AnchorPlay.UploadTips_5'), trigger: 'change' }
  ],
  playStartTime: [
    {
      required: true,
      message: i18n.global.t('AnchorPlay.SelectBroadcastTime'),
      trigger: 'change'
    }
  ]
})
onMounted(() => {
  console.log(props.uid, 'props.uid')
  btnTitle.value = props.uid == 0 ? props.title : i18n.global.t('AnchorPlay.Save')
  tagList()
  if (props.resource == 1 || props.resource == 3) {
    ruleForm.value.gameId = props.gameId
    ruleForm.value.associatedLeague = props.associatedLeague
    ruleForm.value.mainName = props.mainName
    ruleForm.value.cusName = props.cusName
  }
  if (props.uid != 0) {
    reserveDetail()
  }
})
//封面标签列表
const tagList = async () => {
  try {
    let res = await getTagList({ page: 1, pageSize: 99 })
    if (res.data.list) {
      tagData.value = res.data.list
      ruleForm.value.frontCoverTag = res.data.list[0].tagCode
    } else {
      tagData.value = []
    }

    console.log(res, 'res')
  } catch (e) {
    console.log(e)
  }
}
const reserveDetail = async () => {
  try {
    let res = await getReserveDetail(props.uid)
    console.log(res, 'res')
    for (const key in ruleForm.value) {
      ruleForm.value[key] = res.data[key]
    }

    localStorage.setItem('AnchorDebut', JSON.stringify(res.data))
    console.log(ruleForm.value, 'ruleForm.value')
  } catch (e) {
    console.log(e)
  }
}
const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      //添加
      if (props.uid == 0) {
        getAnchorDebut(ruleForm.value).then((res) => {
          console.log(res, 'res')
          ruleForm.value.webrtcPushUrl = res.data.webrtcPushUrl
          localStorage.setItem('AnchorDebut', JSON.stringify(res.data))
          if (props.type == 1) {
            setTimeout(() => {
              emit('debutClick')
              openNewWindow()
            }, 3000)
          } else {
            setTimeout(() => {
              emit('debutClick')
            }, 1500)
          }
        })
      } else {
        //修改
        getStreamUpdate(ruleForm.value).then((res) => {
          if (res.code == 200) {
            ElMessage({
              message: i18n.global.t('AnchorPlay.SuccessfullyModified'),
              type: 'success'
            })
            emit('debutClick')
          }
        })
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}
const goSubmitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      ruleForm.value.status = 2
      ruleForm.value.playStartTime = formatCurrentTime()
      // console.log(ruleForm.value,'ruleForm.value')
      getStreamUpdate(ruleForm.value).then(() => {
        ElMessage({
          message: i18n.global.t('AnchorPlay.SuccessfullyImmediately'),
          type: 'success'
        })
        setTimeout(() => {
          emit('debutClick')
          openNewWindow()
        }, 3000)
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}
//删除
const handleRemove = (file) => {
  console.log(file.url)
  dialogImageUrl.value = ''
  ruleForm.value.frontCoverImage = ''
  // uploadClass.value=false
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
  uploadClass.value = true
  uploadClass.value = false
  return isJPGorPNG && isLt1M
}
// 上传成功回调
const handleUploadSuccess = (res, file) => {
  console.log(res, 'res', file)
  if (res.code == 200) {
    ruleForm.value.frontCoverImage = res.data
    uploadClass.value = false
  }
}
const copyToClipboard = () => {
  // 获取输入框的引用
  const input = copyInput.value
  console.log(copyInput.value, 'copyInput.value')
  // 选择输入框的内容
  input.select()
  // 尝试执行复制操作
  try {
    const successful = document.execCommand('copy')
    if (successful) {
      ElMessage({
        message: i18n.global.t('AnchorPlay.Copy_1'),
        type: 'success'
      })
    } else {
      ElMessage.error(i18n.global.t('AnchorPlay.Copy_2'))
    }
  } catch (err) {
    ElMessage.error(i18n.global.t('AnchorPlay.Copy_2'))
  }
}
//选择赛事
const gameBtn = () => {
  dialogShow.value = true
}
const closeBtn = (type) => {
  dialogShow.value = type
}
const anchorSubmit = (obj) => {
  console.log(obj, 'obj')
  dialogShow.value = false
  ruleForm.value.associatedLeague = props.type == 1 ? obj.leagueNameLocal : obj.leagueName
  ruleForm.value.gameId = obj.gameId
  ruleForm.value.mainName = props.type == 1 ? obj.mainNameLocal : obj.mainName
  ruleForm.value.cusName = props.type == 1 ? obj.cusNameLocal : obj.cusName
  if (props.uid != 0) {
    reserveDetail()
  }
}
const openNewWindow = () => {
  // 使用 window.open 打开新窗口，并在其中跳转到指定的路由路径
  const newWindow = window.open('', '_blank')
  if (newWindow) {
    newWindow.location.href = router.resolve('/anchorPlay').href // 替换为你要跳转的路由路径
  }
}
onBeforeUnmount(() => {
  ruleForm.value.gameId = ''
  ruleForm.value.associatedLeague = ''
  ruleForm.value.mainName = ''
  ruleForm.value.cusName = ''
})
</script>

<style lang="scss" scoped>
:deep() .el-radio__inner {
  background-color: #272b45;
  border: 1px solid #9292bf;
}
:deep() .el-radio__input.is-checked + .el-radio__inner {
  border-color: #f35f1b !important;
  background: #f35f1b;
}
:deep() .el-date-table td.disabled .el-date-table-cell {
  background-color: #2a2b39;
}
:deep() .el-radio__input.is-checked + .el-radio__label {
  color: #f35f1b;
}
:deep() .el-form-item__label,
:deep() .el-radio__label,
:deep() .el-input__inner {
  color: #fff;
}
:deep() .el-radio__input.is-disabled .el-radio__inner {
  background-color: #272b45;
}
:deep() {
  .el-input__wrapper {
    background-color: #272b45;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.2) !important;
  }
  .el-radio__input.is-checked .el-radio__inner {
    border-color: #f35f1b !important;
    background: #f35f1b !important;
  }
  .el-radio__input.is-checked + .el-radio__label {
    color: #f35f1b;
  }
  .el-radio__inner {
    background-color: #272b45;
    border: 1px solid #9292bf;
  }
  .el-radio__inner:hover {
    border-color: #f35f1b !important;
  }
  .el-date-table td.disabled .el-date-table-cell {
    background-color: #2a2b39 !important;
  }
}
.gameBtn {
  display: flex;
  min-width: 103px;
  height: 34px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 0px 3px 3px 0px;
  background: #ff9000;
  color: #fff;

  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px; /* 157.143% */
  cursor: pointer;
  text-align: center;
}
.prompt {
  color: rgba(255, 255, 255, 0.6);

  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 114.286% */
  margin-left: 10px;
}
:deep() .el-upload--picture-card,
:deep() .el-upload {
  width: 160px;
  height: 90px;
  background-color: #171a2f;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}
:deep() .el-upload-list__item {
  width: 160px;
  height: 90px;
  background-color: #171a2f;
  border: 1px solid rgba(255, 255, 255, 0.2);
}
:deep() .el-upload--picture-card i {
  font-size: 24px;
}
.copy {
  height: 24px;
  padding: 0 10px;
  flex-shrink: 0;
  border-radius: 60px;
  border: 1px solid #ff9000;
  color: #ff9000;

  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px; /* 157.143% */
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  cursor: pointer;
}
.debutBtn {
  display: flex;
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
.avatarImg {
  width: 160px;
  height: 90px;
}
.el-upload-hidden :deep() .el-upload,
.el-upload-hidden :deep() .el-upload--picture-card {
  display: none;
}
.el-upload-hidden :deep() .el-upload-list__item-actions .el-upload-list__item-preview {
  display: none;
}
.devClose {
  left: 146px;
  right: -10px;
  top: -10px;
  font-size: 20px;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  position: absolute;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 50%;
}
.guanbi {
  color: #fff;
  font-size: 18px;
}
</style>
<style>
.el-date-table td.disabled .el-date-table-cell {
  background-color: #2a2b39 !important;
}
.warn-text {
  margin-left: 10px;
  color: red;
}
</style>
