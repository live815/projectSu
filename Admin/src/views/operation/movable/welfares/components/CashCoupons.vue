<!-- 现金 -->
<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-form-item prop="dateRange">
        <el-select
          v-model="queryParams.timeCount"
          :placeholder="$t('operation.paleaseChose')"
          style="width: 120px"
        >
          <el-option
            v-for="item in timeData"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-date-picker
          v-model="queryParams.dateRange"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="datetimerange"
          range-separator="-"
          :start-placeholder="$t('operation.beginTime')"
          :end-placeholder="$t('operation.endTime')"
          :default-time="defaultTime"
          :shortcuts="shortcuts"
        ></el-date-picker>
      </el-form-item>
      <el-form-item :label="$t('operation.ordernumber')" prop="number">
        <el-input
          v-model="queryParams.number"
          :placeholder="$t('operation.pleaseEnter')"
          clearable
          style="width: 180px"
        >
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('operation.memberaccount1')" prop="memberUserName">
        <el-input
          v-model="queryParams.memberUserName"
          :placeholder="$t('operation.pleaseEnter')"
          clearable
          style="width: 180px"
        >
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('operation.activeTitle1')" prop="activityTitle">
        <el-input
          v-model="queryParams.activityTitle"
          :placeholder="$t('operation.pleaseEnter')"
          clearable
          style="width: 180px"
        >
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('operation.Amount')" prop="amount">
        <el-input
          v-model="queryParams.amountStart"
          :placeholder="$t('operation.pleaseEnter')"
          clearable
          style="width: 180px"
        >
        </el-input>
        <span>-</span>
        <el-input
          v-model="queryParams.amountEnd"
          :placeholder="$t('operation.pleaseEnter')"
          clearable
          style="width: 180px"
        >
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('operation.tip175')" prop="status">
        <el-select
          v-model="queryParams.status"
          :placeholder="$t('operation.paleaseChose')"
          style="width: 120px"
        >
          <el-option
            v-for="item in prizeTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('operation.tip176')" prop="sendType">
        <el-select
          v-model="queryParams.sendType"
          :placeholder="$t('operation.paleaseChose')"
          style="width: 120px"
        >
          <el-option
            v-for="item in releaseSources"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">
          {{ $t('operation.search') }}</el-button
        >
        <el-button icon="Refresh" @click="resetQuery"> {{ $t('operation.reset') }}</el-button>
        <el-button type="warning" icon="Download" @click="handleExport">{{
          $t('operation.export')
        }}</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="carouselList" style="width: 100%">
      <el-table-column prop="number" :label="$t('operation.ordernumber')" width="250" />
      <el-table-column prop="sendTime" :label="$t('operation.Releasetime')" sortable width="160" />
      <el-table-column prop="receiveTime" :label="$t('operation.CollectTime')" sortable width="160">
        <template #default="scope">
          <div v-if="scope.row.status === 2">
            {{ scope.row.receiveTime }}
          </div>
          <div v-else>-</div>
        </template>
      </el-table-column>
      <el-table-column prop="memberUserName" :label="$t('operation.memberaccount')" width="150" />
      <el-table-column prop="memberAgent" :label="$t('operation.Agentaccount')" width="150" />
      <el-table-column prop="activityTitle" :label="$t('operation.Eventtitle')" width="160" />
      <el-table-column prop="defineType" :label="$t('operation.Bonustype1')" width="100">
        <template #default="scope">
          <div v-if="scope.row.defineType === 1">
            {{ $t('operation.firstdeposit') }}
          </div>
          <div v-if="scope.row.defineType === 2">
            {{ $t('operation.event') }}
          </div>
          <div v-if="scope.row.defineType === 3">
            {{ $t('operation.tip81') }}
          </div>
          <div v-if="scope.row.defineType === 4">
            {{ $t('operation.bigturntable') }}
          </div>
          <div v-if="scope.row.defineType === 5">
            {{ $t('operation.tip82') }}
          </div>
          <div v-if="scope.row.defineType === 6">Vip</div>
          <div v-if="scope.row.defineType === 7">
            {{ $t('operation.customize') }}
          </div>
          <div v-if="scope.row.defineType === 8">
            {{ $t("friends.inviterForward") }}
          </div>
          <div v-if="scope.row.defineType === 9">
            {{ $t("friends.invitedForward") }}
          </div>
          <div v-if="scope.row.defineType === 10">
            {{ $t("friends.waterMoney") }}
          </div>
          <div v-if="scope.row.defineType === 11">
            {{ $t("friends.friendMoney") }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="amount" :label="$t('operation.Amount')" width="120" />
      <el-table-column prop="multiple" :label="$t('operation.TurnoverMultiple')" width="90" />
      <el-table-column prop="status" :label="$t('operation.tip175')" width="100">
        <template #default="scope">
          <el-tag type="warning" v-if="scope.row.status === 1">{{
            $t('operation.unaccalimed')
          }}</el-tag>
          <el-tag type="success" v-if="scope.row.status === 2">{{
            $t('operation.Received')
          }}</el-tag>
          <el-tag type="danger" v-if="scope.row.status === 3">{{ $t('operation.tip177') }}</el-tag>
          <el-tag type="danger" v-if="scope.row.status === 4">{{ $t('operation.tip178') }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="sendType" :label="$t('operation.tip179')" width="150">
        <template #default="scope">
          <div v-if="scope.row.sendType === 1">
            {{ $t('operation.tip180') }}
          </div>
          <div v-if="scope.row.sendType === 2">
            {{ $t('operation.tip181') }}
          </div>
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
import { onMounted, reactive } from 'vue'
import { defaultTime, shortcuts } from '@/utils/config'
import { getWelfareListApi } from '@/api/operation/welfare'
import i18n from '@/i18n'

const queryParams = reactive({
  activityTitle: '', // 活动标题
  amountEnd: '', // 结束范围金额
  amountStart: '', // 开始范围金额
  memberUserName: '', // 会员账号
  number: '', // 编号
  pageNum: 1,
  pageSize: 10,
  sendTimeEnd: '', // 发放结束时间
  sendTimeStart: '', // 发放开始时间
  receiveTimeEnd: '', // 领取结束时间
  receiveTimeStart: '', // 领取开始时间
  sendType: '', // 发放类型
  status: '', // 领取状态
  tenantId: '',
  type: '1', // 存入类型
  dateRange: [], // 发放时间 跟领取时间值
  timeCount: '' // 默认发放时间
})

const carouselList = ref([])
const total = ref(0)

const timeData = [
  {
    value: 1,
    label: i18n.global.t('operation.Releasetime')
  },
  {
    value: 2,
    label: i18n.global.t('operation.CollectTime')
  }
]

const prizeTypes = [
  {
    value: '',
    label: i18n.global.t('operation.all')
  },
  {
    value: 1,
    label: i18n.global.t('operation.unaccalimed')
  },
  {
    value: 2,
    label: i18n.global.t('operation.Received')
  },
  {
    value: 3,
    label: i18n.global.t('operation.tip177')
  }
]
const releaseSources = [
  {
    value: '',
    label: i18n.global.t('operation.all')
  },
  {
    value: 1,
    label: i18n.global.t('operation.tip180')
  },
  {
    value: 2,
    label: i18n.global.t('operation.tip181')
  }
]
onMounted(() => {
  getList()
})

const getList = async () => {
  if (queryParams.timeCount == 1) {
    queryParams.sendTimeEnd = queryParams.dateRange[1]
    queryParams.sendTimeStart = queryParams.dateRange[0]
  } else {
    queryParams.receiveTimeEnd = queryParams.dateRange[1]
    queryParams.receiveTimeStart = queryParams.dateRange[0]
  }
  const params = {
    activityTitle: queryParams.activityTitle, // 活动标题
    amountEnd: queryParams.amountEnd, // 结束范围金额
    amountStart: queryParams.amountStart, // 开始范围金额
    memberUserName: queryParams.memberUserName, // 会员账号
    number: queryParams.number, // 编号
    pageNum: queryParams.pageNum,
    pageSize: queryParams.pageSize,
    sendTimeStart: queryParams.sendTimeStart, // 发放开始时间
    sendTimeEnd: queryParams.sendTimeEnd, // 发放结束时间
    receiveTimeEnd: queryParams.receiveTimeEnd, // 领取结束时间
    receiveTimeStart: queryParams.receiveTimeStart, // 领取开始时间
    sendType: queryParams.sendType, // 发放类型
    status: queryParams.status || '', // 领取状态
    tenantId: queryParams.tenantId,
    type: queryParams.type // 存入类型
  }
  const res = await getWelfareListApi(params)
  if (res.rows.length) {
    carouselList.value = res.rows
    total.value = res.total
  } else {
    carouselList.value = []
    total.value = res.total
  }
}

// 重置
const resetQuery = () => {
  queryParams.pageNum = 1
  queryParams.pageSize = 10
  queryParams.activityTitle = ''
  queryParams.amountEnd = ''
  queryParams.amountStart = ''
  queryParams.memberUserName = ''
  queryParams.number = ''
  queryParams.sendTimeEnd = ''
  queryParams.sendTimeStart = ''
  queryParams.receiveTimeEnd = ''
  queryParams.receiveTimeStart = ''
  queryParams.sendType = ''
  queryParams.status = ''
  queryParams.tenantId = ''
  queryParams.type = '1'
  queryParams.timeCount = ''
  queryParams.dateRange = []
  getList()
}

// 导出
const handleExport = () => {
  proxy.download(
    '/system/live/stream/export',
    {},
    `${i18n.global.t('operation.tip182')}${new Date().toDateString()}.xlsx`
  )
}

// 搜索
const handleQuery = () => {
  getList()
}
</script>

<style lang="scss" scoped></style>
