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
      <el-form-item :label="$t('operation.tip77')" prop="addedTime">
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
      <el-form-item :label="$t('operation.tip78')" prop="startingTime">
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
      <el-form-item :label="$t('operation.tip79')" prop="startingTime">
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
        <el-button type="primary" icon="Search" @click="handleQuery">{{
          $t('operation.search')
        }}</el-button>
        <el-button icon="Refresh" @click="resetQuery">{{ $t('operation.reset') }}</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="tenantId" :label="$t('operation.tip80')" width="180" />
      <el-table-column prop="name" :label="$t('operation.Eventname1')" width="180" />
      <el-table-column prop="type" :label="$t('operation.activityType1')" width="180">
        <template #default="{ row }">
          <span>{{ templateName[row.type] }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="onTime" :label="$t('operation.tip77_1')" width="180" />
      <el-table-column prop="startTime" :label="$t('operation.tip78_1')" width="220">
        <template #default="{ row }">
          <p v-if="row.startTime">{{ $t('operation.beginTime1') }}{{ row.startTime }}</p>
          <p v-if="row.endTime">{{ $t('operation.endTime1') }}{{ row.endTime }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="createBy" :label="$t('operation.founder')" width="180" />
      <el-table-column prop="createTime" :label="$t('operation.creattime')" sortable width="180" />
      <el-table-column prop="updateBy" :label="$t('operation.Mostrecentoperat')" width="180" />
      <el-table-column prop="updateTime" :label="$t('operation.tip5')" sortable width="180" />
      <el-table-column
        prop="operate"
        :label="$t('operation.operate')"
        width="130"
        align="center"
        fixed="right">
        <template #default="scope">
          <el-button
            type="primary"
            size="small"
            v-copyText="getCopy(scope.row)"
            v-copyText:callback="copyTextSuccess"
            >{{ $t('operation.clone') }}</el-button
          >
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
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { defaultTime, shortcuts } from '@/utils/config'
import { getConfigurationApi } from '@/api/operation/activeConfiguration'
import i18n from '@/i18n'
import { templateName } from '../../../models'

const queryParams = ref({
  status: 2,
  pageNum: 1,
  pageSize: 10
})
const total = ref(5)
const loading = ref(false)
const tableData = ref([])
const eventtype = [
  {
    value: '',
    label: i18n.global.t('operation.all')
  },
  {
    value: 1,
    label: i18n.global.t('operation.firstdeposit')
  },
  {
    value: 2,
    label: i18n.global.t('operation.event')
  },
  {
    value: 3,
    label: i18n.global.t('operation.tip81')
  },
  {
    value: 4,
    label: i18n.global.t('operation.bigturntable')
  },
  {
    value: 5,
    label: i18n.global.t('operation.tip82')
  }
]

const getCopy = (v) => {
  const data = `${v.tenantId},${v.name},${v.type},${v.onTime},${v.startTime},${v.endTime},${v.createBy},${v.createTime},${v.updateBy},${v.updateTime}`
  return data
}
function copyTextSuccess() {
  proxy.$modal.msgSuccess(i18n.global.t('operation.copySucess'))
}
//列表
const getDataList = async () => {
  try {
    let res = await getConfigurationApi(queryParams.value)
    console.log(res, 'ref.data.rows')
    tableData.value = res.rows
    total.value = res.total
  } catch (e) {
    console.log(e)
  }
}
// 查询
const registerTime = ref([]) //活动上架时间
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
  getDataList()
}
// 重置
function resetQuery() {
  queryParams.value.name = ''
  queryParams.value.type = ''
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
  getDataList()
}
onMounted(() => {
  getDataList()
})
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
  console.log(tableData.value)
}
</script>
