<template>
  <div class="luckyWheel-view">
    <el-form :model="queryParams" ref="ruleFormRef" :rules="rules" label-width="130px">
      <el-form-item label="活动名称 :" prop="name">
        <el-input
          v-model="queryParams.name"
          :maxlength="viteSite === 'cn' ? 36 : 128"
          show-word-limit
          style="width: 440px" />
      </el-form-item>
      <el-form-item label="活动分类 :" prop="activityCategory">
        <el-select v-model="queryParams.activityCategory" class="m-2">
          <el-option
            v-for="item in activityOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="活动周期 :">
        <el-radio-group v-model="queryParams.timeType" class="ml-4">
          <el-radio :label="2" size="large" border>长期有效</el-radio>
          <el-radio :label="1" size="large" border>指定时间</el-radio>
        </el-radio-group>
      </el-form-item>
      <template v-if="queryParams.timeType == 1">
        <el-form-item label="活动进行时间 :" prop="startTime">
          <div class="long-term">
            <el-date-picker
              v-model="queryParams.dateRange"
              type="datetimerange"
              value-format="YYYY-MM-DD HH:mm:ss"
              style="width: 440px"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              :default-time="defaultTime"
              :shortcuts="shortcuts" />
          </div>
        </el-form-item>
      </template>
      <el-form-item label="活动上架时间 :" prop="onTime">
        <el-date-picker
          v-model="queryParams.onTime"
          type="datetime"
          placeholder="选择预热时间"
          style="width: 440px"
          value-format="YYYY-MM-DD HH:mm:ss" />
      </el-form-item>

      <el-form-item label="代理线设置 :" prop="agentSet">
        <div>
          <el-radio-group v-model="queryParams.agentSet" style="width: 1000px">
            <el-radio :label="3" size="large">{{ $t('operation.Allparticipate') }}</el-radio>
            <el-radio :label="1" size="large">排除</el-radio>
            <el-radio :label="2" size="large">指定</el-radio>
          </el-radio-group>
        </div>
        <div>
          <el-input
            v-model="queryParams.agentSetString"
            :rows="8"
            type="textarea"
            placeholder="请输入代理账号，多个会员账号请用，隔开  最多10W账号"
            style="width: 440px"
            @input="inputTextarea" />
          <div class="table-jumpContent">
            <span style="margin-right: 10px"
              >共计：{{ onComputedCount }}个代理账号 (需包含代理帐号和下级所有的帐号)</span
            >
            <el-button type="primary" @click="onClickDuplicates">去重</el-button>
          </div>
          <div style="color: red; font-size: 12px">(默认全部参与)</div>
        </div>
      </el-form-item>
      <el-form-item> </el-form-item>
      <el-form-item label="用户VIP设置 :">
        <el-checkbox
          v-model="checkAll"
          :indeterminate="isIndeterminate"
          @change="handleCheckAllChange"
          >全选</el-checkbox
        >
      </el-form-item>
      <el-form-item>
        <el-checkbox-group v-model="vipLimitGroupJion" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="item in VipList" :key="item.id" :label="item">
            {{ item.label }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="活动内页顶部图 :" prop="pictureList">
        <TopImage @topPicture="topPicture" :pictureList="pictureList"></TopImage>
      </el-form-item>
      <el-form-item label="活动内容 :" prop="activityContentList">
        <span class="mark">注：活动内容由序号1+序号1图片+序号2+序号2图片+......拼接而成</span>
        <EventContentList :list="queryParams.activityContentList" type="content"></EventContentList>
      </el-form-item>
      <el-form-item label="活动规则 :" prop="activityRuleList">
        <span class="mark">注：活动内容由序号1+序号1图片+序号2+序号2图片+......拼接而成</span>
        <EventContentList :list="queryParams.activityRuleList" type="rule"> </EventContentList>
      </el-form-item>
      <h2>活动参数</h2>
      <el-form-item label="发放方式">
        <el-select
          v-model="queryParams.turntableConf.giveType"
          style="width: 300px"
          :disabled="Boolean(props.opRow.id)">
          <el-option
            v-for="item in giveType"
            :key="item.value"
            :label="item.label"
            :value="item.value" />
        </el-select>
        <span class="mark">* 活动开启后不可再编辑</span>
      </el-form-item>
      <el-form-item label="活动标题">
        <el-input v-model="queryParams.turntableConf.title" style="width: 300px" />
      </el-form-item>
      <el-form-item>
        <template #label> <span class="mark">*</span>&nbsp; 参与游戏</template>
        <PlayTheGame :gameTypeList="gameTypeList" :disabled="Boolean(opRow.id)" />
        <span class="mark" v-if="!queryParams.turntableConf.venueList.length">参与游戏必选</span>
      </el-form-item>
      <el-form-item :label="queryParams.turntableConf.giveType === 1 ? '有效投注' : '存款'">
        <el-input
          v-model="queryParams.turntableConf.validBet"
          show-word-limit
          style="width: 300px"
          v-restrict-input
          :disabled="Boolean(props.opRow.id)">
          <template #append>抽奖次数/次</template>
        </el-input>
        <span class="mark">* 活动开启后不可再编辑</span>
      </el-form-item>
      <el-form-item label="获奖次数类型">
        <el-select v-model="queryParams.turntableConf.limitNumSwitch" style="width: 300px">
          <el-option
            v-for="item in limitNumSwitch"
            :key="item.value"
            :label="item.label"
            :value="item.value" />
        </el-select>
        <el-input
          v-if="queryParams.turntableConf.limitNumSwitch"
          v-model="queryParams.turntableConf.limitNum"
          show-word-limit
          style="width: 100px"
          v-restrict-input>
          <template #append>次</template>
        </el-input>
      </el-form-item>
      <el-form-item label="跳转场馆" prop="jumpType">
        <el-radio-group v-model="queryParams.turntableConf.jumpVenueSwitch">
          <el-radio :label="0">不跳转</el-radio>
          <el-radio :label="1">场馆</el-radio>
        </el-radio-group>
      </el-form-item>
      <template v-if="queryParams.turntableConf.jumpVenueSwitch === 1">
        <el-form-item label="" prop="jumpContent">
          <el-radio-group v-model="stadiumId" v-for="item in GameNameData[0]" :key="item.id">
            <el-radio :label="item.id" style="margin: 0 10px">{{ item.lobbyName }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="jumpContent">
          <template v-if="stadiumId">
            <el-radio-group
              v-model="jumpVenue"
              v-for="item in GameNameData[stadiumId]"
              :key="item.id">
              <el-radio :label="item.id" style="margin: 0 10px">{{ item.lobbyName }}</el-radio>
            </el-radio-group>
          </template>
        </el-form-item>
      </template>
      <el-form-item :label="$t('gameTemplate.label81')">
        <el-checkbox
          v-model="checkAll2"
          :indeterminate="isIndeterminate"
          @change="handleCheckAllChange2"
          >全选</el-checkbox
        >
      </el-form-item>
      <el-form-item>
        <el-checkbox-group v-model="vipLimitGroupJion2" @change="handleCheckedCitiesChange2">
          <el-checkbox v-for="item in VipList" :key="item.id" :label="item">
            {{ item.label }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <template v-if="queryParams.jumpVenueSwitch == 1">
        <el-form-item prop="jumpContent">
          <el-radio-group
            v-model="queryParams.stadiumId"
            v-for="item in GameNameData[0]"
            :key="item.id">
            <el-radio :label="item.id" style="margin: 0 10px">{{ item.lobbyName }}</el-radio>
          </el-radio-group>
          <template v-if="queryParams.stadiumId && queryParams.stadiumId !== '1001104'"> </template>
        </el-form-item>
        <el-form-item>
          <el-radio-group
            v-model="queryParams.stadiumChildId"
            v-for="item in GameNameData[queryParams.stadiumId]"
            :key="item.id">
            <el-radio :label="item.id" style="margin: 0 10px">{{ item.lobbyName }}</el-radio>
          </el-radio-group>
        </el-form-item>
      </template>
      <el-form-item label="玩法配图" prop="pictureList">
        <TurntablePictures
          v-for="(item, index) in h5Img"
          :key="index"
          :data="item"
          capacity="500K"
          @getImg="getH5Img" />
        <TurntablePictures
          v-for="(item, index) in webImg"
          :key="index"
          :data="item"
          capacity="1M"
          @getImg="getWebImg" />
      </el-form-item>
      <el-form-item label="奖品概率权重" prop="Weights">
        <span class="mark">* 转盘抽奖必须10个奖品，且项目内必须最少配置一个数量限制无上限</span>
        <WeightTable
          @getWeightsTabData="getWeightsTabData"
          :data="queryParams.turntableConf.turntableGifts"
          :isEdit="Boolean(props.opRow.id)" />
      </el-form-item>
      <el-form-item label="必中奖开关">
        <div>
          <p class="mark">* 若开启必中奖项，项目内必须最少配置一个数量限制无上限</p>
          <el-switch
            v-model="queryParams.turntableConf.alwaysSwitch"
            size="large"
            :active-value="1"
            :inactive-value="0" />
        </div>
        <MustWinTable
          v-if="queryParams.turntableConf.alwaysSwitch"
          :data="queryParams.turntableConf.mustGifts"
          :vipType="vipType"
          @getMustWinTabData="getMustWinTabData" />
      </el-form-item>
      <el-form-item>
        <el-button style="width: 150px" @click="cancel">取消</el-button>
        <el-button type="primary" style="width: 150px" @click="submitForm(ruleFormRef)"
          >完成</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { VipList } from '@/utils/config.js'
import TopImage from '../TopImage.vue'
import EventContentList from '../EventContentList.vue'
import PlayTheGame from '../PlayTheGame.vue'
import TurntablePictures from './components/TurntablePictures'
import WeightTable from './components/WeightTable'
import MustWinTable from './components/MustWinTable'
import { ElMessage } from 'element-plus'
import { palyInGameNameApi } from '@/api/operation/activeConfiguration'
import {
  addConfigurationApi,
  editConfigurationApi,
  getTurntableDetail
} from '@/api/operation/activeConfiguration'

const viteSite = import.meta.env.VITE_SITE
const ruleFormRef = ref()
const GameNameData = ref([])
const checkAll = ref(false)
const checkAll2 = ref(false)
const isIndeterminate = ref(false)
const isIndeterminate2 = ref(false)
const vipLimitGroupJion = ref([])
const vipLimitGroupJion2 = ref([])
const gameTypeList = ref([])
const stadiumId = ref()
const jumpVenue = ref()
const pictureList = ref({
  activityTopApp: '',
  activityTopWeb: ''
})
const props = defineProps({
  opRow: {
    type: Object,
    default: () => {}
  }
})
const emit = defineEmits(['submitBtn'])
const queryParams = ref({
  id: props.opRow.id,
  type: 4,
  createBy: props.opRow.createBy,
  createTime: props.opRow.createTime,
  status: props.opRow.status,
  tenantId: props.opRow.tenantId,
  name: '', //活动名称
  activityCategory: '', // 活动分类
  onTime: '',
  timeType: '', //进行时间类型 1时间范围 才设置时间 2长期有效 不设置时间
  agentSet: 3, //代理线设置1排除 2指定 3全部参与
  vipSet: '', //vip等级设置 all 或者多个 ，逗号间隔
  registerDayLimitSwitch: '', // 注册时间限制开关
  registerDayLimitStart: '', // 注册时间限制开始天数
  registerDayLimitEnd: '', // 注册时间限制截至天数
  agentSetContentList: [], //代理线设置内容-代理线账号数组
  activityTopApp: '', //活动内页顶部图-app/h5
  activityTopWeb: '', //活动内页顶部图web
  activityContentList: [], //活动内容和图片
  activityRuleList: [], //活动规则内容和图片
  stadiumId: '', // 场馆id
  stadiumChildId: '', // 场馆子id
  startTime: '', //活动开始时间
  dateRange: [], // 进行时数组
  turntableConf: {
    title: '',
    alwaysSwitch: 0,
    appBackImg: '',
    appFrontImg: '',
    appGiftImg: '',
    appPointerImg: '',
    appTurntableImg: '',
    giveType: '',
    id: '',
    stadiumId: '', // 场馆id
    jumpVenue: [],
    jumpVenueSwitch: 0,
    limitNumSwitch: '', // 获奖次数限制类型：0不限制，1总次数，2每日次数
    limitNum: '',
    mustGifts: [],
    turntableGifts: [],
    venueList: [],
    validBet: '',
    vipSet: ''
  }
})

const rules = ref({
  name: [{ required: true, message: '活动名称不能为空', trigger: 'blur' }],
  timeType: [{ required: true, message: '活动周期不能为空', trigger: 'blur' }],
  onTime: [{ required: true, message: '活动上架时间不能为空', trigger: 'blur' }],
  vipLimitGroupJion: [{ required: true, message: 'Vip设置不能为空', trigger: 'blur' }],
  title: [{ required: true, message: '标题设置不能为空', trigger: 'blur' }],
  validBet: [{ required: true, message: '有效投注不能为空', trigger: 'blur' }],
  limitNumSwitch: [{ required: true, message: '获奖次数类型不能为空', trigger: 'blur' }]
})

// 活动分类
const activityOptions = [
  {
    value: 1,
    label: '新人'
  },
  {
    value: 2,
    label: '日常'
  },
  {
    value: 3,
    label: '优惠'
  },
  {
    value: 4,
    label: '限时'
  }
]

const giveType = [
  {
    value: 1,
    label: '投注-主题抽奖'
  },
  {
    value: 2,
    label: '存款-主题抽奖'
  }
]
const limitNumSwitch = [
  {
    value: 0,
    label: '不限制'
  },
  {
    value: 1,
    label: '总次数'
  },
  {
    value: 2,
    label: '每日次数'
  }
]

// 获取参与游戏列表
const getPlayInGameList = async () => {
  let res = await palyInGameNameApi()
  let subGameList = res[0]
  GameNameData.value = res
  subGameList.forEach((item) => {
    item.checked = false
    for (let key in res) {
      if (item.id == key) {
        item.lobbyList = res[key].map((item) => {
          const { parentId, ...rest } = item
          return { ...rest, check: false }
        })
      }
    }
  })
  gameTypeList.value = subGameList
}

const vipType = computed(() => {
  return queryParams.value.turntableConf.turntableGifts.map((item) => {
    return {
      id: item.id,
      giftName: item.giftName
    }
  })
})

const init = async () => {
  await getPlayInGameList()
  if (Boolean(props.opRow.id)) {
    await getTurntableDetail({ activityId: props.opRow.id }).then((res) => {
      queryParams.value.turntableConf = res

      // 回显跳转场馆
      if (res.jumpVenueSwitch) {
        // 回显场馆类型
        const obj1 = GameNameData.value[0].find(
          (item) => item.lobbyCode === res.jumpVenue[0].lobbyCode
        )
        stadiumId.value = obj1.id

        // 回显具体场馆
        const lobbyCode = res.jumpVenue[0].lobbyList[0].lobbyCode
        for (const key in GameNameData.value) {
          if (GameNameData.value.hasOwnProperty(key)) {
            const lobbyList = GameNameData.value[key]
            for (const item of lobbyList) {
              if (item.lobbyCode === lobbyCode) {
                jumpVenue.value = item.id
              }
            }
          }
        }
      }

      // 回显等级要求
      if (res.vipSet) {
        const arr = res.vipSet.split(',')
        vipLimitGroupJion2.value = arr.map((value) => {
          const match = VipList.find((item) => item.id == value)
          return match ? match : null
        })
        if (vipLimitGroupJion2.value.length == VipList.length) {
          checkAll2.value = true
        } else {
          isIndeterminate.value = true
        }
      }

      // 回显H5玩法配图
      h5Img.value.forEach((item) => {
        if (res.hasOwnProperty(item.param)) {
          Object.assign(item, {
            url: res[item.param]
          })
        }
      })
      // 回显pc玩法配图
      webImg.value.forEach((item) => {
        if (res.hasOwnProperty(item.param)) {
          Object.assign(item, {
            url: res[item.param]
          })
        }
      })
    })

    const {
      name,
      activityCategory,
      timeType,
      onTime,
      agentSet,
      vipSet,
      activityTopApp,
      activityTopWeb,
      activityContentList,
      activityRuleList
    } = props.opRow
    queryParams.value.name = name
    queryParams.value.timeType = timeType
    queryParams.value.activityCategory = activityCategory
    queryParams.value.onTime = onTime
    queryParams.value.agentSet = agentSet
    pictureList.value.activityTopApp = activityTopApp
    pictureList.value.activityTopWeb = activityTopWeb
    queryParams.value.activityContentList = activityContentList
    queryParams.value.activityRuleList = activityRuleList
    queryParams.value.agentSetString =
      props.opRow.agentSetContentList && props.opRow.agentSetContentList.join(',')

    // 根据vip限制 回显选择器数据
    if (vipSet) {
      const arr = vipSet.split(',')
      vipLimitGroupJion.value = arr.map((value) => {
        const match = VipList.find((item) => item.id == value)
        return match ? match : null
      })
      if (vipLimitGroupJion.value.length == VipList.length) {
        checkAll.value = true
      } else {
        isIndeterminate.value = true
      }
    }

    //参与游戏
    gameTypeList.value.forEach((gameType) => {
      const matchingCallBackType = queryParams.value.turntableConf.venueList?.find(
        (callBackType) => gameType.lobbyCode === callBackType.lobbyCode
      )
      if (matchingCallBackType) {
        gameType.checked = true
        gameType.lobbyList.forEach((subGameType) => {
          const matchingCallBackSubType = matchingCallBackType.lobbyList.find(
            (callBackSubType) => subGameType.lobbyCode === callBackSubType.lobbyCode
          )
          if (matchingCallBackSubType) {
            subGameType.check = true
          }
        })
      }
    })
  }
}
init()
//vip全选1
const handleCheckAllChange = (val) => {
  if (val) {
    vipLimitGroupJion.value = VipList
  } else {
    vipLimitGroupJion.value = []
  }
  isIndeterminate.value = false
}
//vip全选2
const handleCheckAllChange2 = (val) => {
  if (val) {
    vipLimitGroupJion2.value = VipList
  } else {
    vipLimitGroupJion2.value = []
  }
  isIndeterminate2.value = false
}
// vip单选1
const handleCheckedCitiesChange = (value) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === VipList.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < VipList.length
}
// vip单选2
const handleCheckedCitiesChange2 = (value) => {
  const checkedCount = value.length
  checkAll2.value = checkedCount === VipList.length
  isIndeterminate2.value = checkedCount > 0 && checkedCount < VipList.length
}
// 去重
const onClickDuplicates = () => {
  if (queryParams.value.agentSetString) {
    const memberStringArr = queryParams.value.agentSetString.split(',').map((item) => item.trim())
    queryParams.value.agentSetContentList = [...new Set(memberStringArr)].filter(
      (item) => item !== null && item !== undefined && item !== ''
    )
    queryParams.value.agentSetString = queryParams.value.agentSetContentList.join(',')
  }
}
// 监听输入逗号
const inputTextarea = () => {
  queryParams.value.agentSetString = queryParams.value.agentSetString.replace(/，/g, ',')
}
// 统计账号数据
const onComputedCount = computed(() => {
  if (queryParams.value.agentSetContentList?.length > 0) {
    return queryParams.value.agentSetContentList?.length
  }
  return 0
})
// 顶部图片
const topPicture = (val) => {
  queryParams.value.activityTopApp = val.value.activityTopApp
  queryParams.value.activityTopWeb = val.value.activityTopWeb
}

const h5Img = ref([
  {
    title: 'APP/H5转盘指针',
    size: '170*170',
    param: 'appPointerImg'
  },
  {
    title: 'APP/H5转盘底盘',
    size: '572*572',
    param: 'appTurntableImg'
  },
  {
    title: 'APP/H5前景图',
    size: '720*334',
    param: 'appFrontImg'
  },
  {
    title: 'APP/H5底座',
    size: '400*140',
    param: 'appBackImg'
  }
])
const webImg = ref([
  {
    title: 'web转盘指针',
    size: '176*212',
    param: 'webPointerImg'
  },
  {
    title: 'web转盘底盘',
    size: '670*670',
    param: 'webTurntableImg'
  },
  {
    title: 'web前景图',
    size: '928*430',
    param: 'webGiftImg'
  },
  {
    title: 'web底座',
    size: '420*142',
    param: 'webBackImg'
  }
])

// 获取奖品概率权重配置列表
const getWeightsTabData = (data) => {
  queryParams.value.turntableConf.turntableGifts = data
}
// 获取必中奖项配置列表
const getMustWinTabData = (data) => {
  queryParams.value.turntableConf.mustGifts = data
}

const cancel = () => {
  emit('submitBtn')
}

const getLobbyInfoById = () => {
  const obj1 = GameNameData.value[0].find((item) => item.id == stadiumId.value)
  const obj2 = GameNameData.value[stadiumId.value].find((item) => item.id == jumpVenue.value)
  const arr = [
    {
      lobbyCode: obj1.lobbyCode,
      lobbyList: [
        {
          lobbyCode: obj2.lobbyCode,
          lobbyName: obj2.lobbyName
        }
      ]
    }
  ]

  queryParams.value.turntableConf.jumpVenue = arr
}

const submitForm = async (formEl) => {
  // 参与游戏
  queryParams.value.turntableConf.venueList = []
  gameTypeList.value.forEach((item) => {
    let temp = { lobbyCode: '', lobbyList: [] }
    if (item.checked) {
      temp.lobbyCode = item.lobbyCode
      item.lobbyList.forEach((subItem) => {
        if (subItem.check) {
          let subTemp = {
            lobbyCode: subItem.lobbyCode,
            lobbyName: subItem.lobbyName
          }
          temp.lobbyList.push(subTemp)
        }
      })
      queryParams.value.turntableConf.venueList.push(temp)
    }
  })
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    // 代理线
    if (queryParams.value.agentSetString) {
      const memberStringArr = queryParams.value.agentSetString.split(',').map((item) => item.trim())
      queryParams.value.agentSetContentList = [...new Set(memberStringArr)].filter(
        (item) => item !== null && item !== undefined && item !== ''
      )
      queryParams.value.agentSetString = queryParams.value.agentSetContentList.join(',')
    } else {
      queryParams.value.agentSetContentList = []
    }

    if (valid && queryParams.value.turntableConf.venueList.length) {
      // vip等级设置1
      queryParams.value.vipSet = vipLimitGroupJion.value?.map((item) => item.id).join(',')
      // vip等级设置2
      queryParams.value.turntableConf.vipSet = vipLimitGroupJion2.value
        ?.map((item) => item.id)
        .join(',')
      // 顶部图片
      if (pictureList.value) {
        queryParams.value.activityTopApp = pictureList.value.activityTopApp
        queryParams.value.activityTopWeb = pictureList.value.activityTopWeb
      }
      queryParams.value.startTime =
        queryParams.value.timeType == 1 ? queryParams.value.dateRange[0] : null
      queryParams.value.endTime =
        queryParams.value.timeType == 1 ? queryParams.value.dateRange[1] : null

      if (queryParams.value.turntableConf.jumpVenueSwitch) {
        getLobbyInfoById()
      }

      if (!Boolean(props.opRow.id)) {
        addActivity()
      } else {
        editActivity()
      }
    }
  })
}
const addActivity = () => {
  addConfigurationApi(queryParams.value).then(() => {
    emit('submitBtn')
    ElMessage({
      type: 'success',
      message: '新增成功'
    })
  })
}
const editActivity = () => {
  editConfigurationApi(queryParams.value).then(() => {
    emit('submitBtn')
    ElMessage({
      type: 'success',
      message: '修改成功'
    })
  })
}
const getH5Img = (img, param) => {
  queryParams.value.turntableConf[param] = img
}
const getWebImg = (img, param) => {
  queryParams.value.turntableConf[param] = img
}
</script>

<style lang="scss" scoped>
.luckyWheel-view {
  .bar {
    margin: 0 20px;
  }
  .input-box {
    display: flex;
    :deep() {
      .el-input__inner {
        text-align: center;
      }
    }
  }
  .mark {
    color: red;
  }
}
</style>
