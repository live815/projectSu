<template>
  <div class="deposit-template">
    <el-form :model="queryParams" ref="ruleFormRef" :rules="rules" label-width="130px">
      <el-form-item :label="$t('newbie.form.label1')" prop="name">
        <el-input
          v-model="queryParams.name"
          maxlength="32"
          :placeholder="$t('newbie.form.placeholder1')"
          show-word-limit
          type="text"
          style="width: 440px" />
      </el-form-item>
      <el-form-item :label="$t('newbie.form.label2')" prop="activityCategory">
        <el-select
          v-model="queryParams.activityCategory"
          :placeholder="$t('newbie.form.placeholder2')"
          style="width: 440px">
          <el-option
            v-for="item in eventtype"
            :key="item.value"
            :label="item.label"
            :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('newbie.form.label6')" prop="agentSet">
        <el-radio-group v-model="queryParams.agentSet" style="width: 1000px">
          <el-radio :label="3" size="large">{{ $t('operation.Allparticipate') }}</el-radio>
          <el-radio :label="1" size="large">{{ $t('operation.exclude') }}</el-radio>
          <el-radio :label="2" size="large">{{ $t('common.specify') }}</el-radio>
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
      <el-form-item :label="$t('gameTemplate.label37')" prop="agentSet">
        <el-radio-group v-model="queryParams.agentSet">
          <el-radio :label="1" size="large">{{ $t('gameTemplate.label38') }}</el-radio>
          <el-radio :label="2" size="large">{{ $t('gameTemplate.label39') }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="$t('gameTemplate.label40')" prop="agentSet">
        <el-input
          v-model="queryParams.agentSetString"
          :placeholder="$t('newbie.form.placeholder2')"
          style="width: 180px"
          disabled />
        <span style="margin: 0 10px">~</span>
        <el-input
          v-model="queryParams.agentSetString"
          :placeholder="$t('newbie.form.placeholder2')"
          style="width: 230px">
          <template #append>{{ $t('gameTemplate.label49') }}</template>
        </el-input>
        <span style="color: red; font-size: 12px; margin-left: 20px">
          {{ $t('gameTemplate.label48') }}
        </span>
      </el-form-item>
      <el-form-item :label="$t('gameTemplate.label37')" prop="agentSet">
        <el-radio-group v-model="queryParams.agentSet">
          <el-radio :label="1" size="large">{{ $t('gameTemplate.label38') }}</el-radio>
          <el-radio :label="2" size="large">{{ $t('gameTemplate.label39') }}</el-radio>
        </el-radio-group>
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
      <el-form-item :label="$t('gameTemplate.label41')" prop="agentSet">
        <el-input
          v-model="queryParams.agentSetString"
          :placeholder="$t('newbie.form.placeholder1')"
          style="width: 440px">
          <template #append>{{ $t('gameTemplate.label54') }}</template>
        </el-input>
        <span style="color: red; font-size: 12px; margin-left: 20px">
          {{ $t('gameTemplate.label50') }}
        </span>
      </el-form-item>
      <el-form-item :label="$t('gameTemplate.label42')" prop="timeType">
        <el-radio-group v-model="queryParams.timeType" class="ml-4">
          <el-radio :label="1" size="large">{{ $t('operation.none') }}</el-radio>
          <el-radio :label="2" size="large">{{ $t('gameTemplate.label43') }}</el-radio>
          <el-radio :label="3" size="large">{{ $t('gameTemplate.label44') }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="$t('gameTemplate.label45')" prop="agentSet">
        <el-input
          v-model="queryParams.agentSetString"
          :placeholder="$t('newbie.form.placeholder1')"
          style="width: 440px">
          <template #append>{{ $t('gameTemplate.label55') }}</template>
        </el-input>
        <span style="color: red; font-size: 12px; margin-left: 20px">
          {{ $t('gameTemplate.label51') }}
        </span>
      </el-form-item>
      <el-form-item :label="$t('gameTemplate.label46')" prop="agentSet">
        <el-input
          v-model="queryParams.agentSetString"
          :placeholder="$t('newbie.form.placeholder1')"
          style="width: 440px">
          <template #append>{{ $t('gameTemplate.label57') }}</template>
        </el-input>
        <span style="color: red; font-size: 12px; margin-left: 20px">
          {{ $t('gameTemplate.label52') }}
        </span>
      </el-form-item>
      <el-form-item :label="$t('gameTemplate.label47')" prop="agentSet">
        <el-input
          v-model="queryParams.agentSetString"
          :placeholder="$t('newbie.form.placeholder1')"
          style="width: 440px">
          <template #append>{{ $t('gameTemplate.label56') }}</template>
        </el-input>
        <span style="color: red; font-size: 12px; margin-left: 20px">
          {{ $t('gameTemplate.label53') }}
        </span>
      </el-form-item>
      <el-form-item :label="$t('gameTemplate.label2')" prop="activityContentList">
        <StatisticalPeriod
          :list="[
            { name: 'vip1' },
            { name: 'vip2' },
            { name: 'vip3' },
            { name: 'vip4' },
            { name: 'vip5' },
            { name: 'vip6' },
            { name: 'vip7' },
            { name: 'vip8' },
            { name: 'vip9' },
            { name: 'vip10' },
            { name: 'vip11' }
          ]" />
      </el-form-item>
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
import { defaultTime, shortcuts } from '@/utils/config'
import {
  addConfigurationApi,
  editConfigurationApi,
  newbieConfigDetail
} from '@/api/operation/activeConfiguration'
import { ElMessageBox, ElMessage } from 'element-plus'
import { VipList } from '@/utils/config.js'
import { useI18n } from 'vue-i18n'
import cloneDeep from 'lodash/cloneDeep'
import StatisticalPeriod from './StatisticalPeriod.vue'

const props = defineProps({ opRow: { type: Object } })
const i18n = useI18n()
const queryParams = reactive({
  id: '',
  activityCategory: 1, //活动分类：1新人, 2日常, 3优惠, 4限时
  activityContentList: [], //活动内容和图片
  activityRuleList: [], //活动规则内容和图片
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
  type: 2, //模板类型 1首存 2赛事 3新手任务 4大转盘 5红包雨
  venueList: [], //参与游戏，场馆 all 或者多个逗号间隔,
  vipLimitGroupJion: [],
  vipSet: '', //vip等级设置 all 或者多个 ，逗号间隔
  title: ''
})
const emit = defineEmits(['submitBtn'])
const ruleFormRef = ref()

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
  if (props.opRow.id) {
    Object.assign(queryParams, props.opRow)
    queryParams.agentSetContentList = props.opRow.agentSetContentList || []

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
      params.newbieConfDTOS = params.newbieConfDTOS.filter((e) => e.activitySwitch)

      // 代理线
      const memberStringArr = params.agentSetString.split(',').map((item) => item.trim())
      params.agentSetContentList = [...new Set(memberStringArr)].filter(
        (item) => item !== null && item !== undefined && item !== ''
      )
      params.agentSetString = params.agentSetContentList.join(',')

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
  {
    value: 1,
    label: i18n.t('newbie.eventType1')
  },
  {
    value: 2,
    label: i18n.t('newbie.eventType2')
  },
  {
    value: 3,
    label: i18n.t('newbie.eventType3')
  },
  {
    value: 4,
    label: i18n.t('newbie.eventType4')
  }
]
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
  .mark {
    color: red;
  }
}
</style>
