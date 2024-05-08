<template>
  <div class="deposit-template 我不信_再来">
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
          <div style="color: red; font-size: 12px">{{ $t('operation.tip91') }}</div>
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
      <el-form-item :label="$t('operation.label4')" prop="cashBackConfDtos">
        <el-tabs
          v-model="activeTabValue"
          type="card"
          style="width: 100%"
          addable
          @edit="handleTabsEdit">
          <div style="border: 1px solid #e4e7ed; border-top: unset; padding: 15px">
            <el-tab-pane
              :key="item.nameCn"
              :label="item.nameCn"
              :name="item.nameCn"
              v-for="(item, index) in queryParams.cashBackConfDtos"
              :closable="index > 0">
              <template #label>
                <span class="custom-tabs-label">
                  <el-icon
                    @click="renameTab(item)"
                    style="font-size: 15px; vertical-align: text-bottom; margin-right: 10px">
                    <Edit />
                  </el-icon>
                  <span>{{ item.nameCn }}</span>
                </span>
              </template>
              <el-checkbox
                class="bold"
                v-model="item.selectAll"
                @change="selectAllItems(item.nameCn)">
                {{ $t('operation.selectall') }}
              </el-checkbox>
              <div v-for="(item2, index2) in item.cashBackVenues" :key="index2">
                <el-checkbox
                  :label="item2.lobbyName"
                  class="bold"
                  v-model="item2.check"
                  @change="handleParentCheckboxChange(item2)" />
                <el-checkbox
                  v-for="(subItem, subIndex) in item2.lobbyList"
                  v-model="subItem.check"
                  :label="subItem.lobbyName"
                  :key="subIndex"
                  @change="handleChildCheckboxChange(subItem)"
                  :disabled="subItem.disabled"
                  size="large" />
              </div>
              <el-divider content-position="left">{{ $t('rebateTemplate.label1') }}</el-divider>
              <Arguments :list="item.cashBackThresholds" />
            </el-tab-pane>
          </div>
        </el-tabs>
      </el-form-item>
      <el-form-item :label="$t('operation.TurnoverMultiple1')" prop="multiple">
        <el-input
          v-model="queryParams.multiple"
          :placeholder="$t('operation.pleaseEnter')"
          type="number"
          style="width: 440px" />
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
import { ref, onMounted, reactive, toRaw } from 'vue'
import EventContentList from '../EventContentList.vue'
import { defaultTime, shortcuts } from '@/utils/config'
import {
  addConfigurationApi,
  editConfigurationApi,
  palyInGameNameApi,
  getCashbackDetail
} from '@/api/operation/activeConfiguration'
import { ElMessageBox, ElMessage } from 'element-plus'
import { VipList } from '@/utils/config.js'
import { useI18n } from 'vue-i18n'
import { deepClone } from '@/utils'
import Arguments from './Arguments.vue'
import cloneDeep from 'lodash/cloneDeep'
import { getImgURI } from '@/utils'

const i18n = useI18n()
const activeTabValue = ref(i18n.t('operation.label3'))
const emit = defineEmits(['submitBtn'])
const ruleFormRef = ref()
const viteSite = import.meta.env.VITE_SITE
const props = defineProps({ opRow: { type: Object, default: () => {} } })
const gameTypeList = ref([]) // 获取参与游戏列表
const queryParams = reactive({
  id: '',
  activityCategory: '8', //活动分类：1新人, 2日常, 3优惠, 4限时
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
  type: 8, //模板类型 1首存 2赛事 3新手任务 4大转盘 5红包雨 8天天反水
  vipLimitGroupJion: [],
  vipSet: '', //vip等级设置 all 或者多个 ，逗号间隔
  cashBackConfDtos: [],
  multiple: ''
})

// 编辑标签名称
const renameTab = (item) => {
  ElMessageBox.prompt(i18n.t('rebateTemplate.label5'), i18n.t('rebateTemplate.label4'), {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    inputValue: item.nameCn
  })
    .then(({ value }) => {
      if (value === '' || value === null) {
        return ElMessage({ type: 'error', message: i18n.t('rebateTemplate.label9') })
      }

      if (queryParams.cashBackConfDtos.some((e) => e.nameCn === value)) {
        ElMessage({ type: 'error', message: i18n.t('rebateTemplate.label6') })
      } else {
        queryParams.cashBackConfDtos.forEach((e, i) => {
          if (e.nameCn === item.nameCn) {
            e.nameCn = value
            activeTabValue.value = value
          }
        })
      }
    })
    .catch(() => {})
}

const handleTabsEdit = (targetName, action) => {
  // 新增标签
  if (action === 'add') {
    ElMessageBox.prompt(i18n.t('rebateTemplate.label5'), i18n.t('rebateTemplate.label7'), {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel'
    })
      .then(({ value }) => {
        if (value === '' || value === null) {
          return ElMessage({ type: 'error', message: i18n.t('rebateTemplate.label9') })
        }

        if (queryParams.cashBackConfDtos.some((e) => e.nameCn === value)) {
          // 配置名城重复
          ElMessage({ type: 'error', message: i18n.t('rebateTemplate.label8') })
        } else {
          // 新增成功
          queryParams.cashBackConfDtos.push({
            cashBackThresholds: [],
            selectAll: false,
            cashBackVenues: deepClone(gameTypeList.value),
            nameCn: value
          })

          // 取得已经选取的场馆
          const selected = queryParams.cashBackConfDtos.flatMap((e) =>
            e.cashBackVenues.flatMap((e2) => e2.lobbyList.filter((e3) => e3.check))
          )

          // 修改checkbox状态
          selected.forEach((e) => handleChildCheckboxChange(e))
          activeTabValue.value = value
        }
      })
      .catch(() => {})
  }

  // 删除标签
  if (action === 'remove') {
    const tabs = queryParams.cashBackConfDtos
    let activeName = activeTabValue.value
    if (activeName === targetName) {
      tabs.forEach((tab, index) => {
        if (tab.nameCn === targetName) {
          const nextTab = tabs[index + 1] || tabs[index - 1]
          if (nextTab) activeName = nextTab.nameCn
        }
      })
    }

    // 取得已经选取的场馆
    const selected = tabs
      .filter((tab) => tab.nameCn === targetName)[0]
      .cashBackVenues.flatMap((e2) => e2.lobbyList.filter((e3) => e3.check))

    activeTabValue.value = activeName
    queryParams.cashBackConfDtos = tabs.filter((tab) => tab.nameCn !== targetName)

    selected.forEach((e) => {
      e.check = false
      handleChildCheckboxChange(e)
    })
  }
}

// 全选场馆
function selectAllItems(name) {
  const tab = queryParams.cashBackConfDtos.find((e) => e.nameCn === name)
  tab.cashBackVenues.forEach((item) => {
    item.check = tab.selectAll
    item.lobbyList.forEach((subItem) => {
      if (!subItem.disabled) {
        subItem.check = tab.selectAll
        handleChildCheckboxChange(subItem)
      }
    })
  })
}

// 单选场馆
const handleChildCheckboxChange = (item) => {
  queryParams.cashBackConfDtos.forEach((e) => {
    e.cashBackVenues.forEach((e2) => {
      const element = e2.lobbyList.find((e3) => e3.lobbyName === item.lobbyName && !e3.check)
      if (element) element.disabled = element && item.check
    })
  })
}

// 场馆分类选取
const handleParentCheckboxChange = (item) => {
  item.lobbyList.forEach((e) => {
    e.check = item.check
    handleChildCheckboxChange(e)
  })
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
  return queryParams.agentSetContentList?.length > 0 ? queryParams.agentSetContentList?.length : 0
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
  let res = await palyInGameNameApi()
  res[0].forEach((item) => {
    item.check = false
    item.lobbyList = res[item.id]
    item.lobbyList.forEach((e) => (e.check = false))
  })
  gameTypeList.value = res[0]

  if (props.opRow.id) {
    const detail = await getCashbackDetail({ activityId: props.opRow.id })
    Object.assign(queryParams, props.opRow, detail)

    activeTabValue.value = queryParams.cashBackConfDtos[0].nameCn // 当前标签
    queryParams.multiple = queryParams.cashBackConfDtos[0].multiple // 流水倍数

    const agentSetContentList = props.opRow.agentSetContentList
    queryParams.agentSetContentList = agentSetContentList || []
    queryParams.agentSetString = agentSetContentList && agentSetContentList.join(',')

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

    // 显示已被选取的场馆
    queryParams.cashBackConfDtos.forEach((e1) => {
      const temp = deepClone(e1.cashBackVenues)
      e1.cashBackVenues = deepClone(gameTypeList.value)
      e1.cashBackVenues.forEach((e2) => {
        if (temp.some((e3) => e3.lobbyCode === e2.lobbyCode)) {
          const t = temp.find((venue) => venue.lobbyCode === e2.lobbyCode)
          e2.lobbyList.forEach((venue) => {
            venue.check = t.lobbyList.some((e5) => e5.lobbyCode === venue.lobbyCode)
          })
        } else {
          e2.lobbyList.forEach((venue) => (venue.check = false))
        }
      })
    })

    queryParams.cashBackConfDtos.forEach((e1) => {
      e1.cashBackVenues.forEach((e2) => {
        e2.lobbyList.forEach((e3) => {
          // 其他场馆相同场馆不得在被选取
          if (e3.check) handleChildCheckboxChange(e3)
        })

        // 场馆类型全选
        e2.check = e2.lobbyList.length === e2.lobbyList.filter((e3) => e3.check).length
      })
    })
  } else {
    queryParams.cashBackConfDtos.push({
      cashBackThresholds: [],
      selectAll: false,
      cashBackVenues: deepClone(gameTypeList.value),
      nameCn: i18n.t('operation.label3')
    })
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

      if (params.timeType == 1) {
        params.startTime = params.dateRange[0]
        params.endTime = params.dateRange[1]
      }

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

      params.activityTopApp = getImgURI(props.opRow.activityTopApp)
      params.activityTopWeb = getImgURI(props.opRow.activityTopWeb)
      params.activityCategory = 8
      params.cashBackConfDtos.forEach((e) => {
        e.venuesThresholds = null
        e.venues = null
        e.multiple = params.multiple
        e.cashBackVenues = e.cashBackVenues.filter((e2) => {
          e2.lobbyList = e2.lobbyList.filter((e3) => e3.check)
          return e2.lobbyList.length
        })

        e.cashBackThresholds.forEach((e2) => (e2.operatorDisplay = null))
      })

      if (props.opRow.id) {
        editConfigurationApi(params).then((res) => {
          emit('submitBtn', 1)
          ElMessage({ type: 'success', message: i18n.t('operation.tip98') })
        })
      } else {
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

        addConfigurationApi(params)
          .then(() => {
            emit('submitBtn', 1)
            ElMessage({ type: 'success', message: i18n.t('operation.addsuccessful') })
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

const rules = {
  name: [{ required: true, message: i18n.t('operation.tip99'), trigger: 'blur' }],
  timeType: [{ required: true, message: i18n.t('operation.tip100'), trigger: 'blur' }],
  onTime: [{ required: true, message: i18n.t('operation.tip101'), trigger: 'blur' }],
  vipLimitGroupJion: [{ required: true, message: i18n.t('operation.tip102'), trigger: 'blur' }],
  multiple: [{ required: true, message: i18n.t('operation.tip145'), trigger: 'blur' }],
  cashBackConfDtos: [
    {
      validator: (rule, value, callback) => {
        value.every((e) => {
          let len = 0
          e.cashBackVenues.forEach((e2) => e2.lobbyList.forEach((e3) => e3.check && len++))
          if (!e.cashBackThresholds.length) {
            callback(new Error(i18n.t('rebateTemplate.label10', [e.nameCn])))
            return false
          }

          if (!len) {
            callback(new Error(i18n.t('rebateTemplate.label11', [e.nameCn])))
            return false
          }

          callback()
        })
      },
      trigger: 'blur',
      required: true
    }
  ]
}
</script>

<style lang="scss" scoped>
.client-img {
  display: flex;
  .client {
    margin-right: 50px;
    text-align: center;
  }
}
:deep() {
  .el-tabs__header {
    margin-bottom: 0;
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
