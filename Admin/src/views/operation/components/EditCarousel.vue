<template>
  <el-dialog :title="title" v-model="open" width="600px" append-to-body :before-close="handleClose">
    <el-form :model="ruleForm" :rules="rules" ref="ruleFormRef" label-width="110px">
      <el-form-item :label="onComputedType" prop="title">
        <el-input v-model="ruleForm.title" :placeholder="$t('operation.tip8')" />
      </el-form-item>
      <template v-if="props.type == 1">
        <el-form-item :label="$t('operation.Introduction')" prop="intro">
          <el-input
            v-model="ruleForm.intro"
            :rows="2"
            type="textarea"
            :placeholder="$t('operation.tip65')"
          />
        </el-form-item>
      </template>
      <template v-if="props.type == 2">
        <el-form-item :label="$t('operation.type')" prop="activityType">
          <el-radio-group v-model="ruleForm.activityType">
            <el-radio :label="1">{{ $t('operation.Limittime') }}</el-radio>
            <el-radio :label="2">{{ $t('operation.Newcomer') }}</el-radio>
            <el-radio :label="3">{{ $t('operation.daily') }}</el-radio>
            <el-radio :label="4">{{ $t('operation.VIP') }}</el-radio>
          </el-radio-group>
        </el-form-item>
      </template>
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
      <template v-if="props.type != 4 && props.type != 8">
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
      </template>

      <template v-if="props.type == 1">
        <el-form-item :label="$t('operation.webIcon')" prop="webSmallUrl">
          <el-upload
            action="/admin/file/ad/image/upload"
            list-type="picture-card"
            :show-file-list="false"
            :on-exceed="handleExceedWebIcon"
            :on-success="handleUploadSuccessWebIcon"
            :on-error="handleUploadErrorWebIcon"
            :on-preview="handlePictureCardPreviewWebIcon"
            accept=".bmp,.gif,.jpg,.jpge,.png"
            :headers="headers"
            :auto-upload="true"
          >
            <img
              v-if="ruleForm.webSmallUrl"
              :src="getImgUrl(ruleForm.webSmallUrl)"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon rewrite-icon"><Plus /></el-icon>
          </el-upload>
          <el-dialog v-model="dialogImgWebIcon" :title="$t('operation.Preview')" width="750">
            <img
              w-full
              :src="getImgUrl(ruleForm.webSmallUrl)"
              alt="Preview Image"
              class="channel-manage-img"
            />
          </el-dialog>
        </el-form-item>
      </template>
      <template v-if="props.type == 2">
        <el-form-item :label="$t('operation.activitytag')" prop="activityTag">
          <el-radio-group v-model="ruleForm.activityTag">
            <el-radio :label="1">{{ $t('operation.Limittime') }}</el-radio>
            <el-radio :label="2">{{ $t('operation.Newcomer') }}</el-radio>
            <el-radio :label="3">{{ $t('operation.daily') }}</el-radio>
            <el-radio :label="4">{{ $t('operation.VIPprivileges') }}</el-radio>
            <el-radio :label="5">{{ $t('operation.Exclusivesports') }}</el-radio>
            <el-radio :label="6">{{ $t('operation.Popularevents') }}</el-radio>
          </el-radio-group>
        </el-form-item>
      </template>
      <el-form-item :label="$t('operation.Addedtime')" prop="onTime">
        <el-date-picker
          style="width: 280px"
          v-model="ruleForm.onTime"
          type="datetime"
          :placeholder="$t('operation.choseTime')"
          :defaultTime="new Date(2000, 1, 1, 23, 59, 59)"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      </el-form-item>
      <el-form-item :label="$t('operation.Progresstime')" prop="timeType">
        <el-radio-group v-model="ruleForm.timeType">
          <el-radio :label="1">{{ $t('operation.time') }}</el-radio>
          <el-radio :label="2">{{ $t('operation.longtermeffect') }}</el-radio>
        </el-radio-group>

        <el-date-picker
          v-if="ruleForm.timeType == 1"
          v-model="ruleForm.dateRange"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="datetimerange"
          range-separator="-"
          :start-placeholder="$t('operation.beginTime')"
          :end-placeholder="$t('operation.endTime')"
          :default-time="defaultTime"
        />
      </el-form-item>
      <el-form-item :label="$t('operation.weightsort')" prop="weight">
        <el-input
          type="number"
          v-model="ruleForm.weight"
          :placeholder="$t('operation.tip50')"
          style="width: 200px"
        />
      </el-form-item>
      <template v-if="props.type == 3">
        <el-form-item :label="$t('operation.Popmode')" prop="popupType">
          <el-radio-group v-model="ruleForm.popupType">
            <el-radio :label="1">{{ $t('operation.tip9') }}</el-radio>
            <el-radio :label="2">{{ $t('operation.tip10') }}</el-radio>
          </el-radio-group>
        </el-form-item>
      </template>

      <el-form-item :label="$t('operation.Jumptype')" prop="jumpType">
        <el-radio-group v-model="ruleForm.jumpType">
          <el-radio :label="1">{{ $t('operation.URL') }}</el-radio>
          <el-radio :label="2">{{ $t('operation.Nojump') }}</el-radio>
          <el-radio :label="3">{{ $t('operation.activityModule') }}</el-radio>
          <el-radio :label="4">{{ $t('operation.Venue') }}</el-radio>
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
            <el-option
              v-for="item in dataList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
              @click="selectJumpPath(item.type)"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </template>
      <template v-if="ruleForm.jumpType == 4">
        <el-form-item label="" prop="jumpContent">
          <el-radio-group
            v-model="ruleForm.stadiumId"
            v-for="item in GameNameData[0]"
            :key="item.id"
          >
            <el-radio :label="item.id" style="margin: 0 10px">{{ item.lobbyName }}</el-radio>
          </el-radio-group>
          <template v-if="ruleForm.stadiumId && ruleForm.stadiumId !== '1001104'">
            <el-radio-group
              v-model="ruleForm.lobbyId"
              v-for="item in GameNameData[ruleForm.stadiumId]"
              :key="item.id"
            >
              <el-radio :label="item.id" style="margin: 0 10px">{{ item.lobbyName }}</el-radio>
            </el-radio-group>
          </template>
        </el-form-item>
      </template>
      <template v-if="props.type != 4">
        <el-form-item :label="$t('operation.Visitordisplay')" prop="vistorShow">
          <el-radio-group v-model="ruleForm.vistorShow">
            <el-radio :label="0">{{ $t('operation.Dodisplay') }}</el-radio>
            <el-radio :label="1">{{ $t('operation.exhibit') }}</el-radio>
          </el-radio-group>
        </el-form-item>
      </template>
      <template v-if="props.type != 4">
        <el-form-item :label="$t('operation.VIPrestrict')" prop="vipLimitGroupJion">
          <el-checkbox
            v-model="checkAll"
            :indeterminate="isIndeterminate"
            @change="handleCheckAllChange"
            >{{ $t('operation.selectall') }}</el-checkbox
          >
          <el-checkbox-group
            v-model="ruleForm.vipLimitGroupJion"
            @change="handleCheckedCitiesChange"
          >
            <el-checkbox v-for="item in VipList" :key="item.id" :label="item">{{
              item.title
            }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </template>
      <template v-if="props.type != 4">
        <el-form-item :label="$t('operation.accounttype')" prop="memberType">
          <el-radio-group v-model="ruleForm.memberType">
            <el-radio :label="1">{{ $t('operation.Allmembers') }}</el-radio>
            <el-radio :label="2">{{ $t('operation.designatmember') }}</el-radio>
            <el-radio :label="3">{{ $t('operation.Fullagentline') }}</el-radio>
            <el-radio :label="4">{{ $t('operation.tip4') }}</el-radio>
          </el-radio-group>
        </el-form-item>
      </template>
      <template v-if="ruleForm.memberType == 2">
        <el-form-item :label="$t('operation.memberaccount')" prop="memberString">
          <el-input
            type="textarea"
            autosize
            :placeholder="$t('operation.tip65')"
            v-model="ruleForm.memberString"
            @input="inputTextarea"
          >
          </el-input>
          <div class="table-jumpContent">
            <span>{{ $t('operation.tip66', { num: onComputedCount }) }}</span>
            <el-button type="primary" @click="onClickDuplicates">{{
              $t('operation.Removeduplicat')
            }}</el-button>
          </div>
        </el-form-item>
      </template>

      <template v-if="ruleForm.memberType == 4">
        <el-form-item :label="$t('operation.Agentaccount')" prop="agencyString">
          <el-input
            type="textarea"
            autosize
            :placeholder="$t('operation.tip67')"
            v-model="ruleForm.agencyString"
            @input="inputTextareaAgency"
          >
          </el-input>
          <div class="table-jumpContent">
            <span>{{ $t('operation.tip68', { num: onComputedAgencyCount }) }}</span>

            <el-button type="primary" @click="onClickDuplicates">{{
              $t('operation.Removeduplicat')
            }}</el-button>
          </div>
        </el-form-item>
      </template>

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
import { ref, reactive, computed, onMounted } from 'vue'
import { defaultTime, h5ActivityPath } from '@/utils/config'
import { getToken } from '@/utils/auth'
import { getImgUrl } from '@/utils'
import {
  addAdvertisingntApi,
  editAdvertisingntApi,
  getAdvertisingntDetailsApi,
  getAdvertisingntListTitleApi
} from '@/api/operation/carousel'
import { palyInGameNameApi } from '@/api/operation/activeConfiguration'
import { ElMessageBox } from 'element-plus'
import i18n from '@/i18n'

const emit = defineEmits(['submitBtn'])
const { proxy } = getCurrentInstance()
const props = defineProps({
  configId: {
    type: [Number, String]
  },
  title: {
    type: String,
    default: i18n.global.t('operation.add')
  },
  rowItems: {
    type: Object,
    default: () => {}
  },
  type: {
    type: [Number, String]
  }
})
// 活动标题数组
const dataList = ref([])
// 场馆数据数组
const GameNameData = ref([])
const onComputedType = computed(() => {
  switch (props.type) {
    case '1':
      return i18n.global.t('operation.carouseltitle')
    case '2':
      return i18n.global.t('operation.Eventtitle')
    case '3':
      return i18n.global.t('operation.Popwindowtitle')
    case '4':
      return i18n.global.t('operation.tip12')
    case '5':
      return i18n.global.t('operation.floattitle')
    case '6':
      return i18n.global.t('operation.Adtitle')
    case '7':
      return i18n.global.t('operation.Adtitle')
    case '8':
      return i18n.global.t('operation.Adtitle')
  }
})

const checkAll = ref(false)
const isIndeterminate = ref(false)
const open = ref(true)
// 编辑还是新增
const title = computed(() => {
  return props.title
})

const dialogImgApp = ref(false)
const dialogImgWeb = ref(false)
const dialogImgWebIcon = ref(false)

// 传递过来的当前项值
const rowItems = computed(() => {
  return props.rowItems
})
// 获取会员账号数据
const getMemberDetails = (id) => {
  getAdvertisingntDetailsApi(id).then((res) => {
    const data = res
    if (ruleForm.value.memberType == 2) {
      ruleForm.value.memberContentList = data
      ruleForm.value.memberString = data.join(',')
      ruleForm.value.memberStringArr = ruleForm.value.memberString.split(',')
    }
    if (ruleForm.value.memberType == 4) {
      ruleForm.value.memberContentList = data
      ruleForm.value.agencyString = data.join(',')
      ruleForm.value.agencyStringArr = ruleForm.value.agencyString.split(',')
    }
  })
}

onMounted(async () => {
  const res = await palyInGameNameApi()
  GameNameData.value = res
  getAdvertisingntListTitleApi().then((res) => {
    dataList.value = res
  })
  if (rowItems.value.id) {
    // 判断账户类型 显示会员账号
    if (ruleForm.value.memberType == 2 || ruleForm.value.memberType == 4) {
      getMemberDetails(rowItems.value.id)
    }
    // 根据进行时间类型显示 开始时间结束时间
    if (ruleForm.value.timeType == 1) {
      ruleForm.value.dateRange[0] = ruleForm.value.startTime
      ruleForm.value.dateRange[1] = ruleForm.value.endTime
    }
    // 根据vip限制 回显选择器数据
    if (rowItems.value.vipLimit) {
      const arr = rowItems.value.vipLimit.split(',')
      ruleForm.value.vipLimitGroupJion = arr.map((value) => {
        const match = VipList.find((item) => item.id == value)
        return match ? match : null
      })
      if (ruleForm.value.vipLimitGroupJion.length == VipList.length) {
        checkAll.value = true
      } else {
        isIndeterminate.value = true
      }
    }
    // 根据跳转类型进行回显
    if (ruleForm.value.jumpType == 1) {
      ruleForm.value.jumpUrl = ruleForm.value.jumpContent
    }
    if (ruleForm.value.jumpType == 3) {
      ruleForm.value.jumpActive = ruleForm.value.jumpContent
    }
    if (ruleForm.value.jumpType == 4) {
      const arr = ruleForm.value.jumpContent.split('-')
      const foundItem = GameNameData.value[0].find((item) => {
        return item.lobbyName == arr[0]
      })
      ruleForm.value.stadiumId = foundItem.id
      if (foundItem.lobbyName !== i18n.global.t('operation.electronic')) {
        const foundItemChild = GameNameData.value[ruleForm.value.stadiumId].find((item) => {
          return item.lobbyName == arr[1]
        })
        ruleForm.value.lobbyId = foundItemChild.id
      }
    }
  }
})
const ruleFormRef = ref()
const ruleForm = ref({
  id: rowItems.value.id, // 当前id
  type: props.type, // 广告类型
  title: rowItems.value.title, // 轮播标题
  intro: rowItems.value.intro, // 广告简介
  appUrl: rowItems.value.appUrl, // app图片
  webUrl: rowItems.value.webUrl, // WEB图片
  webSmallUrl: rowItems.value.webSmallUrl, //web小图标
  onTime: rowItems.value.onTime, // 上架时间
  timeType: rowItems.value.timeType, // 进行时间
  dateRange: [], // 进行时数组
  endTime: rowItems.value.endTime, // 进行开始时间
  startTime: rowItems.value.startTime, // 进行结束时间
  weight: rowItems.value.weight, // 权重顺序
  jumpType: rowItems.value.jumpType, // 跳转类型
  jumpContent: rowItems.value.jumpContent, // 跳转网址 只有跳转类型网址才有
  vistorShow: rowItems.value.vistorShow, // 游客展示
  vipLimit: '', // vip限制 vip数组转换为字符串
  memberType: rowItems.value.memberType, // 账户类型
  memberString: '', // 输入会员账号的字符串
  agencyString: '', // 输入代理线账号的字符串
  memberContentList: [], // 账号数组
  status: rowItems.value.status, // 状态类型
  vipLimitGroupJion: [], // vip全选数组
  createBy: rowItems.value.createBy, //  创建人
  createTime: rowItems.value.createTime, //  创建时间
  popupType: rowItems.value.popupType, // 弹窗模式
  activityType: rowItems.value.activityType, // 活动类型
  activityTag: rowItems.value.activityTag, // 活动标签,
  stadiumId: '', // 场馆id
  lobbyId: '', //需要传递给后端的场馆id
  jumpUrl: '', // 跳转网址
  jumpActive: '', // 活动模块
  memberStringArr: [], // 会员数组
  agencyStringArr: [], // 代理线数组
  domainUrl: rowItems.value.domainUrl
})

const selectJumpPath = (type) => {
  const path = h5ActivityPath.find((item) => item.type == type).path
  ruleForm.value.domainUrl = path
}
const headers = ref({ Authorization: 'Bearer ' + getToken() })
const VipList = reactive([
  {
    id: 0,
    title: 'VIP0'
  },
  {
    id: 1,
    title: 'VIP1'
  },
  {
    id: 2,
    title: 'VIP2'
  },
  {
    id: 3,
    title: 'VIP3'
  },
  {
    id: 4,
    title: 'VIP4'
  },
  {
    id: 5,
    title: 'VIP5'
  },
  {
    id: 6,
    title: 'VIP6'
  },
  {
    id: 7,
    title: 'VIP7'
  },
  {
    id: 8,
    title: 'VIP8'
  },
  {
    id: 9,
    title: 'VIP9'
  },
  {
    id: 10,
    title: 'VIP10'
  },
  {
    id: 11,
    title: 'VIP11'
  }
])
const rules = ref({
  title: [
    {
      required: true,
      message: i18n.global.t('operation.mustHave'),
      trigger: 'blur'
    }
  ],
  intro: [
    {
      required: true,
      message: i18n.global.t('operation.mustHave'),
      trigger: 'blur'
    }
  ],
  activityType: [
    {
      required: true,
      message: i18n.global.t('operation.mustHave'),
      trigger: 'blur'
    }
  ],
  appUrl: [
    {
      required: true,
      message: i18n.global.t('operation.mustHave'),
      trigger: 'blur'
    }
  ],
  webUrl: [
    {
      required: true,
      message: i18n.global.t('operation.mustHave'),
      trigger: 'blur'
    }
  ],
  webSmallUrl: [
    {
      required: true,
      message: i18n.global.t('operation.mustHave'),
      trigger: 'blur'
    }
  ],
  activityTag: [
    {
      required: true,
      message: i18n.global.t('operation.mustHave'),
      trigger: 'blur'
    }
  ],
  onTime: [
    {
      required: true,
      message: i18n.global.t('operation.mustHave'),
      trigger: 'blur'
    }
  ],
  timeType: [
    {
      required: true,
      message: i18n.global.t('operation.mustHave'),
      trigger: 'blur'
    }
  ],
  popupType: [
    {
      required: true,
      message: i18n.global.t('operation.mustHave'),
      trigger: 'blur'
    }
  ],
  jumpType: [
    {
      required: true,
      message: i18n.global.t('operation.mustHave'),
      trigger: 'blur'
    }
  ],
  jumpUrl: [
    {
      required: true,
      message: i18n.global.t('operation.mustHave'),
      trigger: 'blur'
    }
  ],
  jumpActive: [
    {
      required: true,
      message: i18n.global.t('operation.mustHave'),
      trigger: 'blur'
    }
  ],
  jumpContent: [
    {
      required: true,
      message: i18n.global.t('operation.mustHave'),
      trigger: 'blur'
    }
  ],
  vistorShow: [
    {
      required: true,
      message: i18n.global.t('operation.mustHave'),
      trigger: 'blur'
    }
  ],
  vipLimitGroupJion: [
    {
      required: true,
      message: i18n.global.t('operation.mustHave'),
      trigger: 'blur'
    }
  ],
  memberType: [
    {
      required: true,
      message: i18n.global.t('operation.mustHave'),
      trigger: 'blur'
    }
  ],
  memberString: [
    {
      required: true,
      message: i18n.global.t('operation.mustHave'),
      trigger: 'blur'
    }
  ],
  agencyString: [
    {
      required: true,
      message: i18n.global.t('operation.mustHave'),
      trigger: 'blur'
    }
  ],
  status: [
    {
      required: true,
      message: i18n.global.t('operation.mustHave'),
      trigger: 'blur'
    }
  ],
  weight: [
    {
      required: true,
      message: i18n.global.t('operation.mustHave'),
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

const handleUploadSuccessWebIcon = (res) => {
  if (res.data) ruleForm.value.webSmallUrl = res.data
  proxy.$modal.msgSuccess(i18n.global.t('operation.Uploadsuccess'))
}

const handleExceedWebIcon = () => {
  proxy.$modal.msgError(i18n.global.t('operation.tip53'))
}

const handleUploadErrorWebIcon = () => {
  console.log(err, '错误')
}
const handlePictureCardPreviewWebIcon = () => {
  // ruleForm.value.appUrl = uploadFile.url;
  dialogImgWebIcon.value = true
}
// 提交表单
const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (ruleForm.value.timeType == 1) {
        ruleForm.value.startTime = ruleForm.value.dateRange[0]
        ruleForm.value.endTime = ruleForm.value.dateRange[1]
      }
      judge()
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
      if (ruleForm.value.jumpType == 4) {
        const foundItem = GameNameData.value[0].find((item) => {
          return item.id === ruleForm.value.stadiumId
        })
        if (foundItem.lobbyName !== i18n.global.t('operation.electronic')) {
          const foundItemChild = GameNameData.value[ruleForm.value.stadiumId].find((item) => {
            return item.id === ruleForm.value.lobbyId
          })
          const foundArr = []
          foundArr[0] = foundItem.lobbyName
          foundArr[1] = foundItemChild.lobbyName
          ruleForm.value.jumpContent = foundArr.join('-')
        } else {
          // 电子为单独项没有子集为空
          ruleForm.value.jumpContent = foundItem.lobbyName
        }
      }
      ruleForm.value.vipLimit = ruleForm.value.vipLimitGroupJion.map((item) => item.id).join(',')

      // 如果账号大于10w 提示
      if (onComputedCount.value > 100000) {
        return ElMessageBox.confirm(
          i18n.global.t('operation.tip69'),
          i18n.global.t('operation.tip70'),
          {
            confirmButtonText: i18n.global.t('operation.sure'),
            cancelButtonText: i18n.global.t('operation.cancel'),
            type: 'warning'
          }
        )
          .then(() => {})
          .catch(() => {})
      }

      if (ruleForm.value.id) {
        editAdvertisingntApi(ruleForm.value).then((res) => {
          emit('submitBtn', 1)
          proxy.$modal.msgSuccess(i18n.global.t('operation.Editsuccessful'))
        })
      } else {
        addAdvertisingntApi(ruleForm.value)
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

//全选
const handleCheckAllChange = (val) => {
  if (val) {
    ruleForm.value.vipLimitGroupJion = VipList
  } else {
    ruleForm.value.vipLimitGroupJion = []
  }
  isIndeterminate.value = false
}
// 单选
const handleCheckedCitiesChange = (value) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === VipList.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < VipList.length
}
const handleClose = (done) => {
  done()
  ruleFormRef.value.resetFields()
  emit('submitBtn', 2)
}

// 统计账号数据
const onComputedCount = computed(() => {
  if (ruleForm.value.memberString) {
    if (ruleForm.value.memberStringArr.length > 0) {
      return ruleForm.value.memberStringArr.length
    }
  }
  return 0
})

const onComputedAgencyCount = computed(() => {
  if (ruleForm.value.agencyString) {
    if (ruleForm.value.agencyStringArr.length > 0) {
      return ruleForm.value.agencyStringArr.length
    }
  }
  return 0
})
// 监听输入逗号
const inputTextarea = () => {
  ruleForm.value.memberString = ruleForm.value.memberString.replace(/，/g, ',')
}
const inputTextareaAgency = () => {
  ruleForm.value.agencyString = ruleForm.value.agencyString.replace(/，/g, ',')
}
// 去重
const onClickDuplicates = () => {
  judge()
}

const judge = () => {
  // 判断会员账号
  if (ruleForm.value.memberType == 2) {
    if (ruleForm.value.memberString) {
      const memberStringDataArr = ruleForm.value.memberString.split(',').map((item) => item.trim())
      ruleForm.value.memberContentList = [...new Set(memberStringDataArr)].filter(
        (item) => item !== null && item !== undefined && item !== ''
      )
      ruleForm.value.memberStringArr = ruleForm.value.memberContentList
      ruleForm.value.memberString = ruleForm.value.memberContentList.join(',')
    }
  }
  // 判断是代理账号
  if (ruleForm.value.memberType == 4) {
    if (ruleForm.value.agencyString) {
      const agencyStringDataArr = ruleForm.value.agencyString.split(',').map((item) => item.trim())
      ruleForm.value.memberContentList = [...new Set(agencyStringDataArr)].filter(
        (item) => item !== null && item !== undefined && item !== ''
      )
      ruleForm.value.agencyStringArr = ruleForm.value.memberContentList
      ruleForm.value.agencyString = ruleForm.value.memberContentList.join(',')
    }
  }
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
