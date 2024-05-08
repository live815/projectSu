<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-form-item :label="$t('operation.Accounttype1')" prop="memberType">
        <el-select
          v-model="queryParams.memberType"
          class="m-2"
          :placeholder="$t('operation.paleaseChose')"
          style="width: 120px"
        >
          <el-option
            v-for="item in _memberType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('operation.memberaccount')" prop="memberUserName">
        <el-input
          v-model="queryParams.memberUserName"
          :placeholder="$t('operation.pleaseEnter')"
          clearable
          style="width: 180px"
        >
        </el-input>
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
        ></el-date-picker>
      </el-form-item>
      <el-form-item :label="$t('operation.Prizecollectiontime')" prop="receiveTime">
        <el-date-picker
          v-model="receiveTime"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="datetimerange"
          range-separator="-"
          :start-placeholder="$t('operation.beginTime')"
          :end-placeholder="$t('operation.endTime')"
          :default-time="defaultTime"
          :shortcuts="shortcuts"
        ></el-date-picker>
      </el-form-item>
      <el-form-item :label="$t('operation.Prizedistributstatus')" prop="status">
        <el-select
          v-model="queryParams.status"
          class="m-2"
          :placeholder="$t('operation.paleaseChose')"
          style="width: 120px"
        >
          <el-option
            v-for="item in receiveStatus"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
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
      <el-table-column prop="memberUserName" :label="$t('operation.memberaccount')">
        <template #default="{ row }">
          <span style="position: relative">
            {{ row.memberUserName }}
            <div class="memberType">
              <span v-if="[0, 1, 2].includes(row.memberType)">
                {{ _memberType.find((e) => e.value === row.memberType).label }}
              </span>
            </div>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="memberRegisterTime" :label="$t('operation.RegistratTime1')" />
      <el-table-column prop="bindMobileTime" :label="$t('operation.tip131')" />
      <el-table-column prop="bindBankTime" :label="$t('operation.tip132')" />
      <el-table-column prop="getTime" :label="$t('operation.Prizecollectime')" />
      <el-table-column prop="giftAmount" :label="$t('operation.BonusAmount')" />
      <el-table-column prop="status" :label="$t('operation.status')">
        <template #default="{ row }">
          <span v-if="[0, 1, 2].includes(row.status)">
            {{ receiveStatus.find((e) => e.value === row.status).label }}
          </span>
        </template>
      </el-table-column>
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
import { newbieGiftRecord } from '@/api/operation/activeConfiguration'
import { useRoute } from 'vue-router'
import { accountTypes as _memberType, receiveStatus } from '../../../models'
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
  receiveEndTime: '',
  receiveStartTime: '',
  memberType: '',
  status: ''
})

const total = ref(5)
const tableDataList = ref([])
const loading = ref(false)

//列表
const getTableDataList = async () => {
  queryParams.activityId = route.query.id
  try {
    let res = await newbieGiftRecord(queryParams)
    tableDataList.value = res.rows
    total.value = res.total
  } catch (e) {
    console.log(e)
  }
}

// 查询
const registerTime = ref([])
const receiveTime = ref([])
function handleQuery() {
  if (registerTime.value) {
    queryParams.startTime = registerTime.value[0]
    queryParams.endTime = registerTime.value[1]
  } else {
    queryParams.startTime = null
    queryParams.endTime = null
  }

  if (receiveTime.value) {
    queryParams.receiveStartTime = receiveTime.value[0]
    queryParams.receiveEndTime = receiveTime.value[1]
  } else {
    queryParams.receiveStartTime = null
    queryParams.receiveEndTime = null
  }

  getTableDataList()
}
/** 重置按钮操作 */
function resetQuery() {
  registerTime.value = []
  receiveTime.value = []
  queryParams.memberUserName = ''
  queryParams.memberType = ''
  queryParams.status = ''
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

  if (receiveTime.value) {
    queryParams.receiveStartTime = receiveTime.value[0]
    queryParams.receiveEndTime = receiveTime.value[1]
  } else {
    queryParams.receiveStartTime = null
    queryParams.receiveEndTime = null
  }
  queryParams.activityId = route.query.id

  proxy.download(
    '/system/activity/newbie/gift/record/list/export',
    queryParams,
    `${i18n.t('operation.tip137')}-${route.query.name}.xlsx`
  )
}

//分页
function getList() {
  loading.value = true
  newbieGiftRecord(queryParams)
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
