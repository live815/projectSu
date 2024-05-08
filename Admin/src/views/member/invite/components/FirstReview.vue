<template>
  <div class="invite-first-review">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-form-item :label="$t('member.invitedAccount') + '：'" prop="subName">
        <el-input
          v-model="queryParams.subName"
          :placeholder="$t('member.pleaseInput')"
          clearable
          style="width: 235px"
        ></el-input>
      </el-form-item>
      <el-form-item :label="$t('member.inviterAccount') + '：'" prop="inviteName">
        <el-input
          v-model="queryParams.inviteName"
          :placeholder="$t('member.pleaseInput')"
          clearable
          style="width: 235px"
        ></el-input>
      </el-form-item>
      <el-form-item :label="$t('friends.useTime')">
        <el-date-picker
          v-model="dateRange"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="datetimerange"
          range-separator="-"
          :start-placeholder="$t('member.beginTime')"
          :end-placeholder="$t('member.endTime')"
          @change="handleChange"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item class="primary-button">
        <el-button icon="Refresh" @click="reset">{{ $t('risk.reset') }} </el-button>
        <el-button type="primary" icon="download">{{ $t('risk.export') }} </el-button>
        <el-button type="primary" @click="handleQuery">{{ $t('member.search') }} </el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" v-loading="loading">
      <el-table-column
        :label="$t('member.invitedAccount')"
        align="center"
        prop="subName"
        width="160"
      >
        <template #default="{ row }">
          <span>{{ row['subName'] || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.inviterAccount')"
        align="center"
        prop="inviteName"
        width="160"
      >
        <template #default="{ row }">
          <span>{{ row['inviteName'] || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.inviterVipRank')"
        align="center"
        prop="inviteVipLevelName"
      >
        <template #default="{ row }">
          <span>{{ row['inviteVipLevelName'] || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.invitedRegisterTime')" align="center" width="160">
        <template #default="{ row }">
          <span>{{ row['regTime'] || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.invitedFirstDepositTime')"
        align="center"
        prop="firstDepTime"
        width="160"
      >
        <template #default="{ row }">
          <span>{{ row['firstDepTime'] || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.invitedFirstDepositBalance')"
        align="center"
        prop="firstDepAmount"
      >
        <template #default="{ row }">
          <span>{{ row['firstDepAmount'] || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.inviterForwardTime')" align="center" width="160">
        <template #default="{ row }">
          <span>{{ row['awardTime'] || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.inviterFirstDepositForward')"
        align="center"
        prop="inviteFirstAward"
      >
        <template #default="{ row }">
          <span>{{ row['inviteFirstAward'] || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.invitedFirstForwardTime')"
        align="center"
        prop="firstAward"
      >
        <template #default="{ row }">
          <span>{{ row['firstAward'] || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.invitedDeviceId')" align="center" prop="deviceNo">
        <template #default="{ row }">
          <span>{{ row['deviceNo'] || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.handle')" align="center" fixed="right">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="pass(success,row)">通过</el-button>
          <el-button type="warning" size="small" @click="pass(reject,row)">拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />
    <PassOrRejectDialog
      v-model:openRefuse="openRefuse"
      :operateType="operateType"
      :cloneRow="cloneRow"
      v-if="openRefuse"
      @refresh="getList"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { querySubFirstList } from '@/api/member/invite/index'
import PassOrRejectDialog from './PassOrRejectDialog.vue'

const queryRef = ref(null)
const dateRange = ref([])
const loading = ref(false)
const queryParams = ref({
  subName: null,
  inviteName: null,
  pageNum: 1,
  pageSize: 10
})
const tableData = ref([])
const total = ref(0)
const success = ref('first-success')
const reject = ref('first-fail')
const operateType = ref(null)
const openRefuse = ref(false)
const cloneRow = ref(null)

onMounted(async () => {
  await getList()
})

const getList = () => {
  loading.value = true
  return querySubFirstList({ ...queryParams.value }).then((res) => {
    loading.value = false
    tableData.value = res?.['rows'] || []
    total.value = res?.['total'] || 0
  })
}

const handleQuery = () => {
  queryParams.value.pageNum = 1
  getList()
}

const reset = () => {
  queryRef.value.resetFields()
}

// 选择时间
const handleChange = () => {
  if ((dateRange.value && !dateRange.value.length) || dateRange.value === null) {
    queryParams.value.regTimeStart = null
    queryParams.value.regTimeEnd = null
  } else {
    queryParams.value.regTimeStart = dateRange.value[0]
    queryParams.value.regTimeEnd = dateRange.value[1]
  }
}
function pass(type, row) {
  operateType.value = type
  openRefuse.value = true
  cloneRow.value = row
}
</script>

<style scoped lang="scss">
.invite-first-review {
  padding: 20px;
}
</style>
