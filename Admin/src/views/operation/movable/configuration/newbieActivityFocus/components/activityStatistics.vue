<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
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
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">{{
          $t('operation.search')
        }}</el-button>
        <el-button type="warning" icon="Download" @click="handleExport">{{
          $t('operation.export')
        }}</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableDataList" style="width: 100%">
      <el-table-column prop="" type="index" :label="$t('newbie.table.label16')" width="80" />
      <el-table-column prop="reportDay" :label="$t('operation.RegistratTime1')" />
      <el-table-column prop="regNum" :label="$t('operation.tip123')" />
      <el-table-column prop="enterRate" :label="$t('operation.tip124')" />
      <el-table-column prop="newbieRate" :label="$t('operation.tip125')" />
      <el-table-column prop="resurrectionRate" :label="$t('operation.tip126')" />
      <el-table-column prop="signRate" :label="$t('operation.tip127')" />
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
import { newbieActivityReport } from '@/api/operation/activeConfiguration'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()
const route = useRoute()

const queryParams = ref({
  activityId: 0, //活动ID
  startTime: '', //注册开始时间查询-开始时间 格式2023-09-27 00:00:00
  endTime: '', //注册结束时间查询-结束时间 格式2023-09-27 23:59:59
  pageNum: 1, //页数
  pageSize: 10 //每页显示记录数
})

const total = ref(5)
const tableDataList = ref([])
const loading = ref(false)

//列表

const getTableDataList = async () => {
  queryParams.value.activityId = route.query.id
  try {
    let res = await newbieActivityReport(queryParams.value)
    tableDataList.value = res.rows
    total.value = res.total
  } catch (e) {
    console.log(e)
  }
}

// 查询
const registerTime = ref([])
function handleQuery() {
  if (registerTime.value) {
    queryParams.value.startTime = registerTime.value[0]
    queryParams.value.endTime = registerTime.value[1]
  } else {
    queryParams.value.startTime = null
    queryParams.value.endTime = null
  }

  getTableDataList()
}

const { proxy } = getCurrentInstance()
function handleExport() {
  if (registerTime.value) {
    queryParams.value.startTime = registerTime.value[0]
    queryParams.value.endTime = registerTime.value[1]
  } else {
    queryParams.value.startTime = null
    queryParams.value.endTime = null
  }
  queryParams.value.activityId = route.query.id

  proxy.download(
    '/system/activity/newbie/report/export',
    queryParams.value,
    `${i18n.t('operation.activstatist')}-${route.query.name}.xlsx`
  )
}

/** 重置按钮操作 */
function resetQuery() {
  registerTime.value = ''
  getTableDataList()
}

//分页
function getList() {
  loading.value = true
  newbieActivityReport(queryParams.value)
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
