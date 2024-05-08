<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-form-item :label="$t('operation.memberaccount1')" prop="memberUserName">
        <el-input
          v-model="queryParams.memberUserName"
          :placeholder="$t('operation.pleaseEnter')"
          clearable
          style="width: 180px"
        >
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('operation.Checktime')" prop="signTime">
        <el-date-picker
          v-model="signTime"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="datetimerange"
          range-separator="-"
          :start-placeholder="$t('operation.beginTime')"
          :end-placeholder="$t('operation.endTime')"
          :default-time="defaultTime"
          :shortcuts="shortcuts"
        />
      </el-form-item>
      <el-form-item :label="$t('operation.RegistratTime')" prop="startTime">
        <el-date-picker
          v-model="registerTime"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="datetimerange"
          range-separator="-"
          :start-placeholder="$t('operation.beginTime')"
          :end-placeholder="$t('operation.endTime')"
          :default-time="defaultTime"
          :shortcuts="shortcuts"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">{{
          $t('operation.search')
        }}</el-button>
        <el-button icon="Refresh" @click="resetQuery">{{ $t('operation.reset') }}</el-button>
        <el-button type="warning" icon="Download" @click="handleExport">{{
          $t('operation.export')
        }}</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableDataList" style="width: 100%">
      <el-table-column prop="" type="index" :label="$t('newbie.table.label16')" width="80" />
      <el-table-column prop="memberUserName" :label="$t('operation.memberaccount')" width="180" />
      <el-table-column prop="memberRegisterTime" :label="$t('operation.RegistratTime1')" />
      <el-table-column prop="signTime" :label="$t('operation.Checktime1')" />
      <el-table-column prop="signDepositAmount" :label="$t('operation.Signdeposit')" />
      <el-table-column prop="signBetAmount" :label="$t('operation.Signbet')" />
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
      style="height: 40px"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { defaultTime, shortcuts } from '@/utils/config'
import { newbieSignRecord } from '@/api/operation/activeConfiguration'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()
const route = useRoute()
const queryParams = reactive({
  activityId: 0, //活动ID
  startTime: '', //注册开始时间查询-开始时间 格式2023-09-27 00:00:00
  endTime: '', //注册结束时间查询-结束时间 格式2023-09-27 23:59:59
  pageNum: 1, //页数
  pageSize: 10, //每页显示记录数
  memberUserName: '',
  signStartTime: '',
  signEndTime: ''
})

const total = ref(5)
const tableDataList = ref([])
const loading = ref(false)

//列表
const getTableDataList = async () => {
  queryParams.activityId = route.query.id
  try {
    let res = await newbieSignRecord(queryParams)
    tableDataList.value = res.rows
    total.value = res.total
  } catch (e) {
    console.log(e)
  }
}

// 查询
const registerTime = ref([])
const signTime = ref([])
function handleQuery() {
  if (registerTime.value) {
    queryParams.startTime = registerTime.value[0]
    queryParams.endTime = registerTime.value[1]
  } else {
    queryParams.startTime = null
    queryParams.endTime = null
  }

  if (signTime.value) {
    queryParams.signStartTime = signTime.value[0]
    queryParams.signEndTime = signTime.value[1]
  } else {
    queryParams.signStartTime = null
    queryParams.signEndTime = null
  }

  getTableDataList()
}
/** 重置按钮操作 */
function resetQuery() {
  registerTime.value = []
  signTime.value = []
  queryParams.memberUserName = ''
  getTableDataList()
}

const { proxy } = getCurrentInstance()
function handleExport() {
  if (registerTime.value) {
    queryParams.startTime = registerTime.value[0]
    queryParams.endTime = registerTime.value[1]
  } else {
    queryParams.startTime = null
    queryParams.endTime = null
  }

  if (signTime.value) {
    queryParams.signStartTime = signTime.value[0]
    queryParams.signEndTime = signTime.value[1]
  } else {
    queryParams.signStartTime = null
    queryParams.signEndTime = null
  }
  queryParams.activityId = route.query.id

  proxy.download(
    '/system/activity/sign/record/list/export',
    queryParams,
    `${i18n.t('operation.tip140')}-${route.query.name}.xlsx`
  )
}

//分页
function getList() {
  loading.value = true
  newbieSignRecord(queryParams)
    .then((res) => {
      loading.value = false
      tableDataList.value = res.rows || []
      total.value = res.total
    })
    .catch((err) => {
      loading.value = false
    })
}

onMounted(() => {
  getTableDataList()
})
</script>

<style lang="scss" scoped>
.memberType {
  position: absolute;
  top: -8px;
  right: -27px;
  font-size: 12px;
  color: rgba(245, 34, 45, 0.5);
}
</style>
