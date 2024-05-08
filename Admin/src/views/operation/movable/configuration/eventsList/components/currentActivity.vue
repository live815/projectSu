<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-form-item :label="$t('operation.Eventname')" prop="name">
        <el-input
          v-model="queryParams.name"
          :placeholder="$t('operation.pleaseEnter')"
          clearable
          style="width: 180px">
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('operation.activityType')" prop="type">
        <el-select
          v-model="queryParams.type"
          class="m-2"
          :placeholder="$t('operation.paleaseChose')"
          style="width: 120px">
          <el-option
            v-for="item in eventtype"
            :key="item.value"
            :label="item.label"
            :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('operation.status2')" prop="status">
        <el-select
          v-model="queryParams.status"
          class="m-2"
          :placeholder="$t('operation.paleaseChose')"
          style="width: 120px">
          <el-option
            v-for="item in condition"
            :key="item.value"
            :label="item.label"
            :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item prop="onTimeStart" :label="$t('operation.tip77')">
        <el-date-picker
          v-model="registerTime"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="datetimerange"
          range-separator="-"
          :start-placeholder="$t('operation.beginTime')"
          :end-placeholder="$t('operation.endTime')"
          :default-time="defaultTime"
          :shortcuts="shortcuts"></el-date-picker>
      </el-form-item>
      <el-form-item prop="startTimeRangeStart" :label="$t('operation.tip78')">
        <el-date-picker
          v-model="interviewTime"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="datetimerange"
          range-separator="-"
          :start-placeholder="$t('operation.beginTime')"
          :end-placeholder="$t('operation.endTime')"
          :default-time="defaultTime"
          :shortcuts="shortcuts"></el-date-picker>
      </el-form-item>
      <el-form-item prop="startTimeRangeStart" :label="$t('operation.tip79')">
        <el-date-picker
          v-model="eventEndTime"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="datetimerange"
          range-separator="-"
          :start-placeholder="$t('operation.beginTime')"
          :end-placeholder="$t('operation.endTime')"
          :default-time="defaultTime"
          :shortcuts="shortcuts"></el-date-picker>
      </el-form-item>
      <el-form-item :label="$t('operation.founder2')" prop="createBy">
        <el-input
          v-model="queryParams.createBy"
          :placeholder="$t('operation.pleaseEnter')"
          clearable
          style="width: 180px">
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('operation.Mostrecentoperat2')" prop="updateBy">
        <el-input
          v-model="queryParams.updateBy"
          :placeholder="$t('operation.pleaseEnter')"
          clearable
          style="width: 180px">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">
          {{ $t('operation.search') }}
        </el-button>
        <el-button icon="Refresh" @click="resetQuery">{{ $t('operation.reset') }}</el-button>
        <el-button type="warning" icon="Plus" @click="swichIsShow(null)">
          {{ $t('operation.add') }}
        </el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="tenantId" :label="$t('operation.tip80')" width="180" />
      <el-table-column prop="status" :label="$t('operation.status')" width="180">
        <template #default="scope">
          <el-tag type="success" v-if="scope.row.status == 1">{{ $t('operation.Opening') }}</el-tag>
          <el-tag type="danger" v-else>{{ $t('operation.disabled') }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="type" :label="$t('operation.activityType1')" width="180">
        <template #default="{ row }">
          <span>{{ templateName[row.type] }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" :label="$t('operation.Eventname1')" width="180">
        <template #default="{ row }">
          <p style="color: #0079fe; cursor: pointer" @click="eventDetails(row)">{{ row.name }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="onTime" :label="$t('operation.tip77_1')" width="180" />
      <el-table-column prop="startTime" :label="$t('operation.tip78_1')" width="220">
        <template #default="{ row }">
          <div v-if="row.timeType === 1">
            <p v-if="row.startTime">{{ $t('operation.beginTime1') }} {{ row.startTime }}</p>
            <p v-if="row.endTime">{{ $t('operation.endTime1') }}{{ row.endTime }}</p>
          </div>
          <p v-else>{{ $t('operation.longtermeffect') }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="agentSet" :label="$t('operation.tip889')" width="180" align="center">
        <template #default="scope">
          <span v-if="scope.row.agentSet == 3">{{ $t('operation.Allparticipate') }} </span>
          <el-button type="primary" v-else @click="viewAgentLine(scope.row)">
            {{ $t('operation.tip4') }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="createBy" :label="$t('operation.founder')" width="180" />
      <el-table-column prop="createTime" :label="$t('operation.creattime')" sortable width="180" />
      <el-table-column prop="updateBy" :label="$t('operation.Mostrecentoperat')" width="180" />
      <el-table-column prop="updateTime" :label="$t('operation.tip5')" sortable width="180" />
      <el-table-column
        prop="operate"
        :label="$t('operation.operate')"
        width="300"
        align="center"
        fixed="right">
        <template #default="scope">
          <el-button
            type="success"
            size="small"
            v-if="scope.row.status == '0'"
            @click="disableBtn(scope.row)">
            {{ $t('operation.turnOn') }}
          </el-button>
          <el-button type="danger" size="small" v-else @click="disableBtn(scope.row)">
            {{ $t('operation.Disable') }}
          </el-button>
          <el-button type="primary" size="small" @click="editMain(scope.row)">
            {{ $t('operation.editInfomation') }}
          </el-button>
          <el-button type="danger" size="small" @click="delBtn(scope.row.id)">
            {{ $t('operation.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
      style="height: 40px" />

    <el-dialog
      v-model="isShowAdd"
      :title="popUpType ? $t('operation.addActivity') : $t('operation.editActivity')"
      width="1280px"
      @closed="restModelNum"
      :center="true">
      <!-- 新增模版 -->
      <addCurrentActivity v-if="modelNum == 0" @toModel="toModel" />
      <component :is="temp" :opRow="opRowitem" @submitBtn="submitBtn" v-else />
    </el-dialog>
    <el-dialog
      v-model="viewAgent"
      :title="agentLine == true ? $t('operation.tip4') : $t('operation.tip115')"
      width="800px"
      :center="true">
      <AgentLineList v-model:open="open" :type="type" :rowItems="rowItems" v-if="open" />
    </el-dialog>
    <el-dialog
      v-if="modelNum == 4"
      :title="agentLine == true ? $t('operation.tip4') : $t('operation.tip115')"
      width="800px"
      :center="true">
    </el-dialog>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import addCurrentActivity from './addCurrentActivity.vue'
import addDepositTemplate from './FirstChargeTemplate'
import LuckyWheel from './luckyWheel'
import addNewbieMissionTemplate from './NewbieTemplate'
import GameTemplate from './GameTemplate'
import RedEnvelope from './RedEnvelopeTemplate'
import {
  getConfigurationApi,
  deleteConfigurationApi,
  getConfigurationListApi
} from '@/api/operation/activeConfiguration'
import { ElMessageBox, ElMessage } from 'element-plus'
import { defaultTime, shortcuts } from '@/utils/config'
import AgentLineList from './AgentLineList.vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { templateName } from '../../../models'
import RebateTemplate from './RebateTemplate'

const i18n = useI18n()
const router = useRouter()
const queryParams = ref({
  pageNum: 1, //页数
  pageSize: 10, //每页显示记录数
  createBy: '', //创建人
  endTimeRangeEnd: '', //活动结束时间-结束范围
  endTimeRangeStart: '', //活动结束时间-开始范围
  name: '', //活动名称
  onTimeEnd: '', //活动结束上架时间
  onTimeStart: '', //活动开始上架时间
  startTimeRangeEnd: '', //活动开始时间-结束范围
  startTimeRangeStart: '', //活动开始时间-开始范围
  status: '', //活动状态
  type: '', //活动-模板类型
  updateBy: '' //最近操作人
})
const total = ref(5)
const open = ref(false)
const rowItems = ref({})
const type = ref(null)
const tableData = ref([])
const loading = ref(false)
const opRowitem = ref({})
const agentLine = ref(true)
const dialogTitle = ref('新增活动')
// 新增活动弹窗
const isShowAdd = ref(false)
const swichIsShow = () => {
  isShowAdd.value = !isShowAdd.value
  opRowitem.value = {}
  dialogTitle.value = '新增活动'
}
//代理线
const viewAgent = ref(false)
const viewAgentLine = (item) => {
  agentLine.value = !item.agentSet == 1
  open.value = true
  rowItems.value = item
  viewAgent.value = !viewAgent.value
}
// 重置弹窗码
const restModelNum = () => {
  modelNum.value = 0
}
// 编辑传参
const editMain = (row) => {
  modelNum.value = row.type
  opRowitem.value = row
  isShowAdd.value = true
  dialogTitle.value = '编辑活动'
}
// 显示相应的模板
const modelNum = ref(0)
const toModel = (num) => {
  modelNum.value = num
}

const temp = ref(null)
watch(
  () => modelNum.value,
  (val) => {
    switch (Number(val)) {
      case 1:
        temp.value = addDepositTemplate
        break
      case 2:
        temp.value = GameTemplate
        break
      case 3:
        temp.value = addNewbieMissionTemplate
        break
      case 4:
        temp.value = LuckyWheel
        break
      case 5:
        temp.value = RedEnvelope
        break
      case 8:
        temp.value = RebateTemplate
        break
    }
  }
)
//活动名称埋点弹窗 type 1.首存 2.赛事 3.新手任务 4.大转盘 5.红包雨

const eventDetails = ({ id, name, type }) => {
  switch (type) {
    case 3:
      router.push({
        path: '/operation/activity/eventsList/newbieActivityFocus',
        query: { id, name, type }
      })
      break
    default:
      router.push({
        path: '/operation/activity/eventsList/activityFocus',
        query: { id, name, type }
      })
      break
  }
}
// 删除
const delBtn = (id) => {
  ElMessageBox.confirm(i18n.t('operation.tip44'))
    .then(() => {
      deleteConfigurationApi(id).then(() => {
        ElMessage({ type: 'success', message: i18n.t('operation.deleteSuccess') })
        tableDataList()
      })
    })
    .catch(() => {})
}
//启用或者禁用
const disableBtn = (row) => {
  ElMessageBox.confirm(row.status == 0 ? i18n.t('operation.tip118') : i18n.t('operation.tip119'))
    .then(() => {
      getConfigurationListApi({ id: row.id, status: row.status == 0 ? 1 : 0 }).then(() => {
        ElMessage({ type: 'success', message: i18n.t('operation.operatSuccess') })
        tableDataList()
      })
    })
    .catch(() => {})
}

//列表
const tableDataList = async () => {
  try {
    let res = await getConfigurationApi(queryParams.value)
    tableData.value = res.rows
    total.value = res.total
  } catch (e) {
    console.log(e)
  }
}
/** 查询按钮操作 */
const registerTime = ref([]) //上架时间
const interviewTime = ref([]) //活动开始时间
const eventEndTime = ref([]) //活动结束时间
function handleQuery() {
  if (registerTime.value) {
    queryParams.value.onTimeStart = registerTime.value[0]
    queryParams.value.onTimeEnd = registerTime.value[1]
  } else {
    queryParams.value.onTimeStart = null
    queryParams.value.onTimeEnd = null
  }
  if (interviewTime.value) {
    queryParams.value.startTimeRangeStart = interviewTime.value[0]
    queryParams.value.startTimeRangeEnd = interviewTime.value[1]
  } else {
    queryParams.value.startTimeRangeStart = null
    queryParams.value.startTimeRangeEnd = null
  }
  if (eventEndTime.value) {
    queryParams.value.endTimeRangeStart = eventEndTime.value[0]
    queryParams.value.endTimeRangeEnd = eventEndTime.value[1]
  } else {
    queryParams.value.endTimeRangeStart = null
    queryParams.value.endTimeRangeEnd = null
  }
  tableDataList()
}

/** 重置按钮操作 */
function resetQuery() {
  queryParams.value.name = ''
  queryParams.value.type = ''
  queryParams.value.status = ''
  queryParams.value.createBy = ''
  queryParams.value.updateBy = ''
  queryParams.value.onTimeStart = ''
  queryParams.value.onTimeEnd = ''
  queryParams.value.startTimeRangeStart = ''
  queryParams.value.startTimeRangeEnd = ''
  queryParams.value.endTimeRangeStart = ''
  queryParams.value.endTimeRangeEnd = ''
  registerTime.value = ''
  interviewTime.value = ''
  eventEndTime.value = ''
  tableDataList()
}
onMounted(() => {
  tableDataList()
})
//分页
function getList() {
  loading.value = true
  getConfigurationApi(queryParams.value)
    .then((res) => {
      loading.value = false
      tableData.value = res.rows || []
      total.value = res.total
    })
    .catch((err) => {
      loading.value = false
    })
}

// 新增编辑弹窗确认
const submitBtn = () => {
  isShowAdd.value = false
  getList()
}

const eventtype = [
  { value: '', label: i18n.t('operation.all') },
  { value: 1, label: i18n.t('operation.firstdeposit') },
  { value: 2, label: i18n.t('operation.event') },
  { value: 3, label: i18n.t('operation.tip81') },
  { value: 4, label: i18n.t('operation.bigturntable') },
  { value: 8, label: i18n.t('operation.label6') }
  // {value: 5,label: i18n.t('operation.tip82')}
]
const condition = [
  { value: '', label: i18n.t('operation.all') },
  { value: 0, label: i18n.t('operation.disabled') },
  { value: 1, label: i18n.t('operation.Opening') }
]
</script>
