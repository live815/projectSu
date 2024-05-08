<template>
  <div class="deposit-template">
    <el-form :model="queryParams" ref="ruleFormRef" :rules="rules" label-width="130px">
      <el-form-item :label="$t('newbie.form.label1')" prop="name">
        <el-input
          v-model="queryParams.name"
          :maxlength="viteSite === 'cn' ? 36 : 128"
          :placeholder="$t('newbie.form.placeholder1')"
          show-word-limit
          type="text"
          style="width: 440px" />
      </el-form-item>
      <el-form-item :label="$t('newbie.form.label2')" prop="activityCategory">
        <el-select
          v-model="queryParams.activityCategory"
          class="m-2"
          :placeholder="$t('newbie.form.placeholder2')"
          style="width: 440px">
          <el-option
            v-for="item in eventtype"
            :key="item.value"
            :label="item.label"
            :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('newbie.form.label3')" prop="timeType">
        <el-radio-group v-model="queryParams.timeType" class="ml-4">
          <el-radio :label="2" size="large" border>{{ $t('operation.longtermeffect') }}</el-radio>
          <el-radio :label="1" size="large" border>{{ $t('operation.specifitime') }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="$t('newbie.form.label4')" prop="onTime">
        <el-date-picker
          v-model="queryParams.onTime"
          type="datetime"
          :placeholder="$t('newbie.form.placeholder3')"
          style="width: 440px"
          value-format="YYYY-MM-DD HH:mm:ss" />
      </el-form-item>
      <el-form-item
        :label="$t('newbie.form.label5')"
        prop="startTime"
        v-if="queryParams.timeType == 1">
        <div class="long-term">
          <el-date-picker
            v-model="queryParams.dateRange"
            type="datetimerange"
            value-format="YYYY-MM-DD HH:mm:ss"
            style="width: 440px"
            range-separator="-"
            :start-placeholder="$t('newbie.form.placeholder4')"
            :end-placeholder="$t('newbie.form.placeholder5')"
            :default-time="defaultTime"
            :shortcuts="shortcuts" />
        </div>
      </el-form-item>
      <el-form-item :label="$t('newbie.form.label6')" prop="agentSet">
        <div>
          <el-radio-group v-model="queryParams.agentSet" style="width: 1000px">
            <el-radio :label="3" size="large">{{ $t('operation.Allparticipate') }}</el-radio>
            <el-radio :label="1" size="large">{{ $t('operation.exclude') }}</el-radio>
            <el-radio :label="2" size="large">{{ $t('common.specify') }}</el-radio>
          </el-radio-group>
        </div>
        <div>
          <el-input
            v-model="queryParams.agentSetString"
            :rows="8"
            type="textarea"
            :placeholder="$t('operation.tip67')"
            style="width: 440px"
            @input="inputTextarea" />
          <div class="table-jumpContent">
            <span> {{ $t('newbie.hint1', [onComputedCount]) }} </span>
            <el-button type="primary" @click="onClickDuplicates">
              {{ $t('operation.Removeduplicat') }}
            </el-button>
          </div>
          <div style="color: red; font-size: 12px">
            {{ $t('operation.tip91') }}
          </div>
        </div>
      </el-form-item>
      <el-form-item :label="$t('newbie.form.label7')" prop="vipLimitGroupJion">
        <el-checkbox
          v-model="checkAll"
          :indeterminate="isIndeterminate"
          @change="handleCheckAllChange"
          >{{ $t('operation.selectall') }}</el-checkbox
        >
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
      <el-form-item :label="$t('newbie.form.label8')" prop="pictureList">
        <div class="client-img">
          <div class="client">
            <div class="port">APP/H5</div>
            <ImageUpload
              v-model:modelValue="opRow.activityTopApp"
              :fileSize="10"
              :fileType="['png', 'jpg']" />
            <div>{{ $t('operation.tip122') }}</div>
          </div>
          <div class="client">
            <div class="port">Web</div>
            <ImageUpload
              v-model:modelValue="opRow.activityTopWeb"
              :fileSize="10"
              :fileType="['png', 'jpg']" />
            <div>{{ $t('operation.tip122') }}</div>
          </div>
        </div>
      </el-form-item>
      <el-form-item :label="$t('newbie.form.label9')" prop="activityContentList">
        <span style="color: red">{{ $t('newbie.form.label39', [$t('newbie.table.label9')]) }}</span>
        <EventContentList :list="queryParams.activityContentList" type="content" />
      </el-form-item>
      <el-form-item :label="$t('newbie.form.label10')" prop="activityRuleList">
        <span style="color: red">{{
          $t('newbie.form.label39', [$t('newbie.table.label10')])
        }}</span>
        <EventContentList :list="queryParams.activityRuleList" type="rule" />
      </el-form-item>
      <el-form-item :label="$t('newbie.form.label11')"> </el-form-item>
      <el-tabs v-model="activeName">
        <el-tab-pane
          :label="$t('newbie.tab1', [getTabOptions(1)?.activitySwitch ? `ON` : `OFF`])"
          name="1">
          <NewBieActivityParametersTab1 v-show="activeName == 1" :queryParams="getTabOptions(1)" />
        </el-tab-pane>
        <el-tab-pane
          :label="$t('newbie.tab2', [getTabOptions(2)?.activitySwitch ? `ON` : `OFF`])"
          name="2">
          <NewBieActivityParametersTab2 v-show="activeName == 2" :queryParams="getTabOptions(2)" />
        </el-tab-pane>
        <el-tab-pane
          :label="$t('newbie.tab3', [getTabOptions(3)?.activitySwitch ? `ON` : `OFF`])"
          name="3">
          <NewBieActivityParametersTab3 v-show="activeName == 3" :queryParams="getTabOptions(3)" />
        </el-tab-pane>
      </el-tabs>
      <el-form-item>
        <el-button style="width: 150px" @click="resetForm(ruleFormRef)">
          {{ $t('common.cancel') }}
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
import { defaultTime, shortcuts } from '@/utils/config'
import {
  addConfigurationApi,
  editConfigurationApi,
  newbieConfigDetail,
  palyInGameNameApi
} from '@/api/operation/activeConfiguration'
import { ElMessageBox, ElMessage } from 'element-plus'
import NewBieActivityParametersTab1 from './NewbieActivityParametersTab1.vue'
import NewBieActivityParametersTab2 from './NewbieActivityParametersTab2.vue'
import NewBieActivityParametersTab3 from './NewbieActivityParametersTab3.vue'
import { VipList } from '@/utils/config.js'
import { getImgURI } from '@/utils'
import { useI18n } from 'vue-i18n'
import cloneDeep from 'lodash/cloneDeep'

const i18n = useI18n()
const viteSite = import.meta.env.VITE_SITE
const props = defineProps({ opRow: { type: Object } })

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

const activeName = ref('1')
const queryParams = reactive({
  id: '',
  activityCategory: 1, //活动分类：1新人, 2日常, 3优惠, 4限时
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
  newbieConfDTOS: [
    {
      achievedDays: null,
      activityDesc: '',
      activitySwitch: 0,
      appPlayImg: '',
      appTitleImg: '',
      giftType: 1,
      gifts: [],
      limitDays: null,
      pcPlayImg: '',
      taskRequire: 0
    },
    {
      achievedDays: null,
      activityDesc: '',
      activitySwitch: 0,
      appPlayImg: '',
      appTitleImg: '',
      giftType: 2,
      gifts: [],
      limitDays: null,
      pcPlayImg: '',
      taskRequire: 1,
      venueList: []
    },
    {
      achievedDays: null,
      activityDesc: '',
      activitySwitch: 0,
      appPlayImg: '',
      appTitleImg: '',
      giftType: 3,
      gifts: [],
      limitDays: null,
      pcPlayImg: '',
      taskRequire: 0,
      venueList: []
    }
  ], //新手活动参数配置
  onTime: '', //活动上架时间
  rewardConfigList: [], //奖励配置
  dateRange: [], // 进行时数组
  startTime: '', //活动开始时间
  status: '', //状态 0禁用 1启用
  tenantId: '', //租户id,
  timeType: '', //进行时间类型 1时间范围 才设置时间 2长期有效 不设置时间,
  type: 3, //模板类型 1首存 2赛事 3新手任务 4大转盘 5红包雨
  venueList: [], //参与游戏，场馆 all 或者多个逗号间隔,
  vipLimitGroupJion: [],
  vipSet: '' //vip等级设置 all 或者多个 ，逗号间隔
})
const emit = defineEmits(['submitBtn'])
const ruleFormRef = ref()
const { proxy } = getCurrentInstance()

const getTabOptions = (index) => {
  return queryParams.newbieConfDTOS.find((e) => e.giftType === index)
}

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
    if (props.opRow.timeType == 1) {
      queryParams.dateRange = [props.opRow.startTime, props.opRow.endTime]
    }

    const data = await newbieConfigDetail({ activityId: props.opRow.id })
    data.forEach((e) => {
      const index = queryParams.newbieConfDTOS.findIndex((i) => i.giftType === e.giftType)
      queryParams.newbieConfDTOS[index] = e
    })

    if (props.opRow.vipSet) {
      const arr = props.opRow.vipSet.split(',')
      queryParams.vipLimitGroupJion = arr.map((value) => {
        const match = VipList?.find((item) => item.id == value)
        return match ? match : null
      })
      if (queryParams.vipLimitGroupJion.length == VipList.length) {
        checkAll.value = true
      } else {
        isIndeterminate.value = true
      }
    }
  }
})

//新增
const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      const params = cloneDeep(queryParams)
      // vip
      params.vipSet = params.vipLimitGroupJion.map((item) => item.id).join(',')
      params.startTime = params.timeType == 1 ? params.dateRange[0] : null
      params.endTime = params.timeType == 1 ? params.dateRange[1] : null
      params.newbieConfDTOS = params.newbieConfDTOS.filter((e) =>
        props.opRow.id ? e.activitySwitch || e.activityId : e.activitySwitch
      )

      // 代理线
      if (params.agentSetString) {
        const memberStringArr = params.agentSetString.split(',').map((item) => item.trim())
        params.agentSetContentList = [...new Set(memberStringArr)].filter(
          (item) => item !== null && item !== undefined && item !== ''
        )
        params.agentSetString = params.agentSetContentList.join(',')
      } else {
        params.agentSetContentList = []
      }

      const err = []
      params.newbieConfDTOS.forEach((e) => {
        const msg = {
          1: i18n.t('newbie.tab4'),
          2: i18n.t('newbie.tab5'),
          3: i18n.t('newbie.tab6')
        }

        if (e.appPlayImg === '' || e.pcPlayImg === '')
          err.push(`${msg[e.giftType]}-${i18n.t('newbie.form.message18')}`)
        if (!e.gifts.length) err.push(`${msg[e.giftType]}-${i18n.t('newbie.form.message19')}`)
      })

      if (err.length) {
        proxy.$modal.msgError(err[0])
        return
      }

      params.activityTopApp = getImgURI(props.opRow.activityTopApp)
      params.activityTopWeb = getImgURI(props.opRow.activityTopWeb)

      if (props.opRow.id) {
        editConfigurationApi(params).then((res) => {
          emit('submitBtn', 1)
          ElMessage({
            type: 'success',
            message: i18n.t('operation.tip98')
          })
        })
      } else {
        // 如果账号大于10w 提示
        if (onComputedCount.value > 100000) {
          return ElMessageBox.confirm(i18n.t('operation.tip69'), i18n.t('operation.tip70'), {
            confirmButtonText: i18n.t('common.sure'),
            cancelButtonText: i18n.t('common.cancel'),
            type: 'warning'
          })
            .then(() => {})
            .catch(() => {})
        }

        addConfigurationApi(params)
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
      message: i18n.t('newbie.form.message1'),
      trigger: 'blur'
    }
  ],
  activityCategory: [{ required: true, trigger: 'blur' }],
  timeType: [
    {
      required: true,
      message: i18n.t('newbie.form.message2'),
      trigger: 'blur'
    }
  ],
  onTime: [
    {
      required: true,
      message: i18n.t('newbie.form.message3'),
      trigger: 'blur'
    }
  ],
  vipLimitGroupJion: [
    {
      required: true,
      message: i18n.t('newbie.form.message4'),
      trigger: 'blur'
    }
  ]
})

const eventtype = [
  { value: 1, label: i18n.t('newbie.eventType1') },
  { value: 2, label: i18n.t('newbie.eventType2') },
  { value: 3, label: i18n.t('newbie.eventType3') },
  { value: 4, label: i18n.t('newbie.eventType4') }
]
</script>

<style lang="scss" scoped>
.client-img {
  display: flex;
  .client {
    margin-right: 50px;
    text-align: center;
  }
}
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
  .mark {
    color: red;
  }
}
</style>
