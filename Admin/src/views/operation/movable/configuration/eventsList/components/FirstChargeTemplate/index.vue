<template>
  <div class="deposit-template">
    <el-form :model="queryParams" ref="ruleFormRef" :rules="rules" label-width="130px">
      <el-form-item :label="$t('operation.Eventname')" prop="name">
        <el-input
          v-model="queryParams.name"
          :maxlength="viteSite === 'cn' ? 36 : 128"
          :placeholder="$t('operation.pleaseEnter')"
          show-word-limit
          type="text"
          style="width: 440px" />
      </el-form-item>
      <el-form-item :label="$t('operation.activityCycle')" prop="timeType">
        <el-radio-group v-model="queryParams.timeType">
          <el-radio :label="2" size="large" border>{{ $t('operation.longtermeffect') }}</el-radio>
          <el-radio :label="1" size="large" border>{{ $t('operation.specifitime') }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="$t('operation.tip77')" prop="onTime">
        <el-date-picker
          v-model="queryParams.onTime"
          type="datetime"
          :placeholder="$t('operation.tip87')"
          style="width: 440px"
          value-format="YYYY-MM-DD HH:mm:ss" />
      </el-form-item>
      <el-form-item
        :label="$t('operation.tip88')"
        prop="startTime"
        v-if="queryParams.timeType == 1">
        <div class="long-term">
          <el-date-picker
            v-model="queryParams.dateRange"
            type="datetimerange"
            value-format="YYYY-MM-DD HH:mm:ss"
            style="width: 440px"
            range-separator="-"
            :start-placeholder="$t('operation.beginTime')"
            :end-placeholder="$t('operation.endTime')"
            :default-time="defaultTime"
            :shortcuts="shortcuts" />
        </div>
      </el-form-item>

      <el-form-item :label="$t('operation.tip89')" prop="agentSet">
        <el-radio-group v-model="queryParams.agentSet" style="width: 100%">
          <el-radio :label="3" size="large">{{ $t('operation.Allparticipate') }}</el-radio>
          <el-radio :label="1" size="large">{{ $t('operation.exclude') }}</el-radio>
          <el-radio :label="2" size="large">{{ $t('operation.Specify') }}</el-radio>
        </el-radio-group>
        <div>
          <el-input
            v-model="queryParams.agentSetString"
            :rows="8"
            type="textarea"
            :placeholder="$t('operation.tip67')"
            style="width: 440px"
            @input="inputTextarea" />
          <div class="table-jumpContent">
            <span>{{ $t('operation.tip90', { num: onComputedCount }) }}</span>

            <el-button type="primary" @click="onClickDuplicates">
              {{ $t('operation.Removeduplicat') }}
            </el-button>
          </div>
          <div style="color: red; font-size: 12px">
            {{ $t('operation.tip91') }}
          </div>
        </div>
      </el-form-item>
      <el-form-item :label="$t('operation.tip92')" prop="vipLimitGroupJion">
        <el-checkbox
          v-model="checkAll"
          :indeterminate="isIndeterminate"
          @change="handleCheckAllChange">
          {{ $t('operation.selectall') }}
        </el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-checkbox-group
          v-model="queryParams.vipLimitGroupJion"
          @change="handleCheckedCitiesChange">
          <el-checkbox v-for="item in VipList" :key="item.id" :label="item">
            {{ item.label }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item :label="$t('operation.tip93')" prop="rewardConfiguration">
        <RewardConfiguration :rewardList="queryParams.rewardConfigList" />
      </el-form-item>
      <el-form-item :label="$t('operation.tip94')" prop="venueList">
        <PlayTheGame :gameTypeList="gameTypeList" :disabled="Boolean(opRow.id)" />
      </el-form-item>
      <el-form-item :label="$t('operation.tip95')" prop="pictureList">
        <TopImage @topPicture="topPicture" :pictureList="pictureList" />
      </el-form-item>
      <el-form-item :label="$t('operation.tip96')" prop="activityContentList">
        <EventContentList :list="queryParams.activityContentList" type="content" />
      </el-form-item>
      <el-form-item :label="$t('operation.tip97')" prop="activityRuleList">
        <EventContentList :list="queryParams.activityRuleList" type="rules" />
      </el-form-item>
      <el-form-item>
        <el-button style="width: 150px" @click="resetForm(ruleFormRef)">
          {{ $t('operation.cancel') }}
        </el-button>
        <el-button type="primary" style="width: 150px" @click="submitForm(ruleFormRef)">
          {{ $t('operation.Finish') }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import EventContentList from '../EventContentList.vue'
import PlayTheGame from '../PlayTheGame.vue'
import RewardConfiguration from './RewardConfiguration.vue'
import TopImage from '../TopImage.vue'
import { defaultTime, shortcuts } from '@/utils/config'
import { addConfigurationApi, editConfigurationApi } from '@/api/operation/activeConfiguration'
import { ElMessageBox, ElMessage } from 'element-plus'
import { palyInGameNameApi } from '@/api/operation/activeConfiguration'
import { VipList } from '@/utils/config.js'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()
const viteSite = import.meta.env.VITE_SITE
const props = defineProps({ opRow: { type: Object, default: () => {} } })
// 获取参与游戏列表
const gameTypeList = ref([])
const getPlayInGameList = async () => {
  let res = await palyInGameNameApi()
  let subGameList = res[0]
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

const queryParams = reactive({
  id: '',
  activityContentList: [], //活动内容和图片
  activityRuleList: [], //活动规则内容和图片
  activityTopApp: '', //活动内页顶部图-app/h5,
  activityTopWeb: '', //活动内页顶部图web,
  agentSet: 3, //代理线设置1排除 2指定 3全部参与
  agentSetString: '', // 代理线设置内容字符串
  agentSetContentList: [], //代理线设置内容-代理线账号数组,
  createBy: '', //创建人
  createTime: '', //创建时间,
  endTime: '', //活动结束时间
  name: '', //活动名称
  onTime: '', //活动上架时间
  rewardConfigList: [], //奖励配置
  dateRange: [], // 进行时数组
  startTime: '', //活动开始时间
  status: '', //状态 0禁用 1启用
  tenantId: '', //租户id,
  timeType: '', //进行时间类型 1时间范围 才设置时间 2长期有效 不设置时间,
  type: 1, //模板类型 1首存 2赛事 3新手任务 4大转盘 5红包雨
  venueList: [], //参与游戏，场馆 all 或者多个逗号间隔,
  vipLimitGroupJion: [],
  vipSet: '' //vip等级设置 all 或者多个 ，逗号间隔
})
const emit = defineEmits(['submitBtn'])
const ruleFormRef = ref()

// 顶部图片
const topPicture = (val) => {
  queryParams.activityTopApp = val.value.activityTopApp
  queryParams.activityTopWeb = val.value.activityTopWeb
}
const pictureList = ref({
  activityTopApp: '',
  activityTopWeb: ''
})

// 去重
const onClickDuplicates = () => {
  if (queryParams.agentSetString) {
    const memberStringArr = queryParams.agentSetString.split(',').map((item) => item.trim())
    queryParams.agentSetContentList = [...new Set(memberStringArr)].filter(
      (item) => item !== null && item !== undefined && item !== ''
    )
    queryParams.agentSetString = queryParams.agentSetContentList.join(',')
  }
}
// 统计账号数据
const onComputedCount = computed(() => {
  if (queryParams.agentSetContentList.length > 0) {
    return queryParams.agentSetContentList.length
  }
  return 0
})
// 监听输入逗号
const inputTextarea = () => {
  queryParams.agentSetString = queryParams.agentSetString.replace(/，/g, ',')
}
// 用户VIP设置
const checkAll = ref(false)
const isIndeterminate = ref(false)

//全选
const handleCheckAllChange = (val) => {
  queryParams.vipLimitGroupJion = val ? VipList : []
  isIndeterminate.value = false
}
// 单选
const handleCheckedCitiesChange = (value) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === VipList.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < VipList.length
}
onMounted(async () => {
  await getPlayInGameList()
  if (props.opRow.id) {
    Object.assign(queryParams, props.opRow)

    queryParams.agentSetContentList = props.opRow.agentSetContentList || []
    queryParams.agentSetString =
      props.opRow.agentSetContentList && props.opRow.agentSetContentList.join(',')

    // 根据进行时间类型显示 开始时间结束时间
    if (queryParams.timeType == 1) {
      queryParams.dateRange = [props.opRow.startTime, props.opRow.endTime]
    }

    // 根据vip限制 回显选择器数据
    if (queryParams.vipSet) {
      const arr = queryParams.vipSet.split(',')
      queryParams.vipLimitGroupJion = arr.map((value) => {
        const match = VipList.find((item) => item.id == value)
        return match ? match : null
      })
      if (queryParams.vipLimitGroupJion.length == VipList.length) {
        checkAll.value = true
      } else {
        isIndeterminate.value = true
      }
    }

    //参与游戏
    gameTypeList.value.forEach((gameType) => {
      const matchingCallBackType = queryParams.venueList.find(
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

    //顶部图片
    pictureList.value.activityTopApp = queryParams.activityTopApp
    pictureList.value.activityTopWeb = queryParams.activityTopWeb
  }
})

//新增
const submitForm = async (formEl) => {
  if (!props.opRow.id) {
    // 参与游戏
    queryParams.venueList = []
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
        queryParams.venueList.push(temp)
      }
    })
  }

  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      // 代理线
      if (queryParams.agentSetString) {
        const memberStringArr = queryParams.agentSetString.split(',').map((item) => item.trim())
        queryParams.agentSetContentList = [...new Set(memberStringArr)].filter(
          (item) => item !== null && item !== undefined && item !== ''
        )
        queryParams.agentSetString = queryParams.agentSetContentList.join(',')
      } else {
        queryParams.agentSetContentList = []
      }

      if (props.opRow.id) {
        queryParams.vipSet = queryParams.vipLimitGroupJion.map((item) => item.id).join(',')
        // 顶部图片
        if (pictureList.value) {
          queryParams.activityTopApp = pictureList.value.activityTopApp
          queryParams.activityTopWeb = pictureList.value.activityTopWeb
        }
        queryParams.startTime = queryParams.timeType == 1 ? queryParams.dateRange[0] : null
        queryParams.endTime = queryParams.timeType == 1 ? queryParams.dateRange[1] : null

        editConfigurationApi(queryParams).then((res) => {
          emit('submitBtn', 1)
          ElMessage({
            type: 'success',
            message: i18n.t('operation.tip98')
          })
        })
      } else {
        if (queryParams.timeType == 1) {
          queryParams.startTime = queryParams.dateRange[0]
          queryParams.endTime = queryParams.dateRange[1]
          console.log(queryParams.startTime, queryParams.endTime)
        }
        // vip
        queryParams.vipSet = queryParams.vipLimitGroupJion.map((item) => item.id).join(',')

        // 如果账号大于10w 提示
        if (onComputedCount.value > 100000) {
          return ElMessageBox.confirm(i18n.t('operation.tip69'), i18n.t('operation.tip70'), {
            confirmButtonText: i18n.t('operation.sure'),
            cancelButtonText: i18n.t('operation.cancel'),
            type: 'warning'
          })
            .then(() => {})
            .catch(() => {})
        }
        // 奖励等级
        console.log('奖励列表')
        queryParams.rewardConfigList.forEach((item, index) => {
          console.log(item, 123123123123, index)
          item.level = index + 1
        })
        addConfigurationApi(queryParams)
          .then(() => {
            emit('submitBtn', 1)
            ElMessage({
              type: 'success',
              message: i18n.t('operation.addsuccessful')
            })
          })
          .catch((err) => {
            console.log(err)
          })
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}

// 重置表单
const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
  ruleFormRef.value.resetFields()
  emit('submitBtn', 2)
}
const rules = ref({
  name: [
    {
      required: true,
      message: i18n.t('operation.tip99'),
      trigger: 'blur'
    }
  ],
  timeType: [
    {
      required: true,
      message: i18n.t('operation.tip100'),
      trigger: 'blur'
    }
  ],
  onTime: [
    {
      required: true,
      message: i18n.t('operation.tip101'),
      trigger: 'blur'
    }
  ],
  vipLimitGroupJion: [
    {
      required: true,
      message: i18n.t('operation.tip102'),
      trigger: 'blur'
    }
  ],
  venueList: [
    {
      required: true,
      message: i18n.t('operation.tip218'),
      trigger: 'blur'
    }
  ]
})
</script>

<style lang="scss" scoped>
.client {
  margin-right: 50px;
  text-align: center;

  .port {
    margin: 0 auto;
  }
}

.table-jumpContent {
  display: flex;
  align-items: center;
  margin-top: 10px;

  span {
    margin-right: 10px;
  }
}

.rewrite-icon {
  width: 130px;
  height: 130px;
  text-align: center;
  line-height: 100px;
  border: 1px dashed #eee;
}

.long-term {
  display: flex;
  gap: 10px;
  font-size: 16px;

  .time-pick {
    display: flex;
    gap: 5px;

    .long-time {
      display: flex;
      gap: 10px;
    }
  }
}
</style>
