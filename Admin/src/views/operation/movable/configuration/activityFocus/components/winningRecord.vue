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
      <el-form-item :label="$t('operation.VIPlevel')" prop="memberVipLevel">
        <el-select
          v-model="queryParams.memberVipLevel"
          class="m-2"
          :placeholder="$t('operation.paleaseChose')"
          style="width: 120px"
        >
          <el-option
            v-for="item in vipGrades"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('operation.CollectTime')" prop="createTime">
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
        <el-button icon="Refresh" @click="resetQuery">{{ $t('operation.reset') }}</el-button>
        <el-button type="warning" icon="Download" @click="handleExport">{{
          $t('operation.export')
        }}</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableTewardsList" style="width: 100%">
      <el-table-column prop="" type="index" :label="$t('operation.serialnumber')" width="200" />
      <el-table-column prop="memberUserName" :label="$t('operation.memberaccount')" width="200" />
      <el-table-column prop="memberVipLevel" :label="$t('operation.VIPlevel1')" width="200">
        <template #default="scope"> VIP{{ scope.row.memberVipLevel }} </template>
      </el-table-column>
      <el-table-column prop="agentName" :label="$t('operation.SuperiorAgent')" width="200" />
      <el-table-column prop="amount" :label="$t('operation.firstdepositamount')" width="200" />
      <el-table-column prop="totalAmount" :label="$t('operation.AccumulatValidbet')" width="200" />
      <el-table-column prop="createTime" :label="$t('operation.CollectTime')" width="200" />
      <el-table-column prop="sendAmount" :label="$t('operation.Distributebonuses')" width="200" />
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
import { getActivityRecordApi } from '@/api/operation/activeConfiguration'
import i18n from '@/i18n'

const props = defineProps({
  awardWinning: {
    type: String
  }
})

const queryParams = ref({
  activityId: 0,
  createTimeEnd: '',
  createTimeStart: '',
  memberUserName: '',
  memberVipLevel: '',
  createTime: '',
  pageNum: 1,
  pageSize: 10
})
const total = ref(5)
const { proxy } = getCurrentInstance()
const loading = ref(false)
const vipGrades = [
  {
    value: '',
    label: i18n.global.t('operation.all')
  },
  {
    value: 0,
    label: 'VIP0'
  },
  {
    value: 1,
    label: 'VIP1'
  },
  {
    value: 2,
    label: 'VIP2'
  },
  {
    value: 3,
    label: 'VIP3'
  },
  {
    value: 4,
    label: 'VIP4'
  },
  {
    value: 5,
    label: 'VIP5'
  },
  {
    value: 6,
    label: 'VIP6'
  },
  {
    value: 7,
    label: 'VIP7'
  },
  {
    value: 8,
    label: 'VIP8'
  },
  {
    value: 9,
    label: 'VIP9'
  },
  {
    value: 10,
    label: 'VIP10'
  },
  {
    value: 11,
    label: 'VIP11'
  }
]
const tableTewardsList = ref([])
//列表
const getTableDataList = async () => {
  queryParams.value.activityId = props.awardWinning

  try {
    let res = await getActivityRecordApi(queryParams.value)
    // console.log(res, "ref.data.rows");
    tableTewardsList.value = res.rows
    total.value = res.total
  } catch (e) {
    console.log(e)
  }
}
/** 搜索按钮操作 */
// 查询
const registerTime = ref([])
function handleQuery() {
  if (registerTime.value) {
    queryParams.value.createTimeStart = registerTime.value[0]
    queryParams.value.createTimeEnd = registerTime.value[1]
  } else {
    queryParams.value.createTimeStart = null
    queryParams.value.createTimeEnd = null
  }
  getTableDataList()
}
/** 重置按钮操作 */
function resetQuery() {
  queryParams.value.memberUserName = ''
  queryParams.value.memberVipLevel = ''
  queryParams.value.createTimeStart = ''
  queryParams.value.createTimeEnd = ''
  registerTime.value = ''
  getTableDataList()
}
//导出
const handleExport = () => {
  proxy.download(
    '/system/activity/reward/record/export',
    queryParams.value,
    `首存活动获奖记录${new Date().toDateString()}.xlsx`
  )
}
// 分页
function getList() {
  loading.value = true
  getActivityRecordApi(queryParams.value)
    .then((res) => {
      loading.value = false
      tableTewardsList.value = res.rows || []
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
