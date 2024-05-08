<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-form-item :label="$t('operation.Accounttype1')" prop="memberType">
        <el-select
          v-model="queryParams.memberType"
          :placeholder="$t('operation.paleaseChose')"
          style="width: 160px"
        >
          <el-option
            v-for="item in accountTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('operation.memberaccount1')" prop="memberUserName">
        <el-input
          v-model="queryParams.memberUserName"
          :placeholder="$t('operation.pleaseEnter')"
          clearable
          style="width: 160px"
        >
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('operation.Prizedistributstatus')" prop="status">
        <el-select
          v-model="queryParams.status"
          class="m-2"
          :placeholder="$t('operation.paleaseChose')"
          style="width: 160px"
        >
          <el-option
            v-for="item in receiveStatus"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('operation.VIPlevel')" prop="memberVipLevel">
        <el-select
          v-model="queryParams.memberVipLevel"
          :placeholder="$t('operation.paleaseChose')"
          style="width: 160px"
        >
          <el-option
            v-for="item in vipGrades"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('gameTemplate.label13')" prop="businessType">
        <el-select
          v-model="queryParams.businessType"
          :placeholder="$t('newbie.form.placeholder2')"
          style="width: 160px"
        >
          <el-option
            v-for="item in aType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('newbie.form.label19')" prop="giftType">
        <el-select
          v-model="queryParams.giftType"
          class="m-2"
          :placeholder="$t('newbie.form.placeholder2')"
          style="width: 160px"
        >
          <el-option
            v-for="item in giftType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('live.event1')" prop="matchId">
        <el-input
          v-model="queryParams.matchId"
          :placeholder="$t('operation.pleaseEnter')"
          clearable
          style="width: 160px"
        >
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('live.hometeam1')" prop="home">
        <el-input
          v-model="queryParams.home"
          :placeholder="$t('operation.pleaseEnter')"
          clearable
          style="width: 160px"
        >
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('live.awayteam1')" prop="away">
        <el-input
          v-model="queryParams.away"
          :placeholder="$t('operation.pleaseEnter')"
          clearable
          style="width: 160px"
        >
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('live.CompetTime')" prop="createTime">
        <el-date-picker
          v-model="createTime"
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
        <el-button type="primary" icon="Search" @click="handleQuery">
          {{ $t('operation.search') }}
        </el-button>
        <el-button icon="Refresh" @click="resetQuery">{{ $t('operation.reset') }}</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableDataList" style="width: 100%">
      <el-table-column
        prop=""
        type="index"
        :label="$t('newbie.table.label16')"
        width="80"
        align="center"
      />
      <el-table-column
        prop="memberUserName"
        :label="$t('operation.memberaccount')"
        width="180"
        align="center"
      >
        <template #default="scope">
          <span style="position: relative">
            {{ scope.row.memberUserName }}
            <div class="memberType">
              <span v-if="scope.row.memberType == 0">{{ $t('operation.ordinary') }}</span>
              <span v-if="scope.row.memberType == 1">{{ $t('operation.highquality') }}</span>
              <span v-if="scope.row.memberType == 2">{{ $t('operation.focuson') }}</span>
            </div>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="memberVipLevel" :label="$t('operation.VIPlevel1')" align="center">
        <template #default="scope"> VIP{{ scope.row.memberVipLevel }} </template>
      </el-table-column>
      <el-table-column prop="businessType" :label="$t('gameTemplate.label79')" align="center">
        <template #default="{ row }">
          {{ aType.find((e) => e.value === row.businessType)?.label }}
        </template>
      </el-table-column>
      <el-table-column prop="businessValue" :label="$t('gameTemplate.label20')" align="center" />
      <el-table-column
        prop="giftType"
        :label="$t('newbie.table.label19')"
        width="210"
        align="center"
      >
        <template #default="{ row }">
          <span v-if="row.giftType">
            {{ giftType.find((e) => e.value === row.giftType).label }}
          </span>
          <span v-else>{{ row.giftType }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="sendAmount" :label="$t('gameTemplate.label22')" align="center" />
      <el-table-column prop="multiple" :label="$t('gameTemplate.label23')" align="center" />
      <el-table-column prop="status" :label="$t('operation.status')" align="center">
        <template #default="{ row }">
          <span v-if="[0, 1, 2].includes(Number(row.status))">
            {{ receiveStatus.find((e) => e.value === row.status)?.label }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="enterTime"
        :label="$t('schedule.contestTimeNoQuote')"
        width="180"
        align="center"
      >
        <template #default="{ row }">{{ parseTime(row.beginTime) }} </template>
      </el-table-column>
      <el-table-column prop="matchName" :label="$t('live.event')" width="180" align="center" />
      <el-table-column prop="home" :label="$t('live.hometeam')" align="center" />
      <el-table-column prop="away" :label="$t('live.awayteam')" align="center" />
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
import { useRoute } from 'vue-router'
import { accountTypes, vipGrades, receiveStatus, giftType } from '../../../models'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const i18n = useI18n()
const queryParams = ref({
  activityId: 0, //活动ID
  bte: '', //访问时间查询-结束时间
  bts: '', //访问时间查询-开始时间
  giftType: '',
  memberType: '', //账号类型
  memberUserName: '', //会员账号
  memberVipLevel: '', //vip等级
  away: '',
  home: '',
  matchId: '',
  businessType: '',
  pageNum: 1, //页数
  pageSize: 10, //每页显示记录数
  status: ''
})

const total = ref(5)
const tableDataList = ref([])
const loading = ref(false)

//列表

const getTableDataList = async () => {
  queryParams.value.activityId = route.query.id
  try {
    let res = await getActivityRecordApi(queryParams.value)
    // console.log(res, "ref.data.rows");
    tableDataList.value = res.rows
    total.value = res.total
  } catch (e) {
    console.log(e)
  }
}

// 查询
const createTime = ref([])
function handleQuery() {
  if (createTime.value) {
    queryParams.value.bts = createTime.value[0]
    queryParams.value.bte = createTime.value[1]
  } else {
    queryParams.value.bts = null
    queryParams.value.bte = null
  }
  getTableDataList()
}
/** 重置按钮操作 */
function resetQuery() {
  queryParams.value.memberUserName = ''
  queryParams.value.memberType = ''
  queryParams.value.memberVipLevel = ''
  queryParams.value.bts = ''
  queryParams.value.bte = ''
  queryParams.value.status = ''
  queryParams.value.businessType = ''
  queryParams.value.giftType = ''
  queryParams.value.matchId = ''
  queryParams.value.home = ''
  queryParams.value.away = ''
  createTime.value = ''
  getTableDataList()
}
//分页
function getList() {
  loading.value = true
  getActivityRecordApi(queryParams.value)
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

const aType = [
  { label: i18n.t('operation.all'), value: '' },
  { label: i18n.t('gameTemplate.label18'), value: 1 },
  { label: i18n.t('gameTemplate.label19'), value: 2 }
]
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
