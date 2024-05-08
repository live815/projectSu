<!-- 活动内容 -->
<template>
  <el-button type="primary" @click="rewardEdit" style="margin-bottom: 10px">
    {{ $t('operation.tip83') }}
  </el-button>
  <el-table :data="list" height="200">
    <el-table-column :label="$t('system.serialnumber')" width="180" type="index" />
    <el-table-column prop="matchName" :label="$t('gameTemplate.label30')" />
    <el-table-column prop="sportId" :label="$t('gameTemplate.label32')">
      <template #default="{ row }">
        <span>{{ video_sports_type.find((e) => e.value == row.sportId)?.label || '-' }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="name" :label="$t('operation.operate')" align="center">
      <template #default="scope">
        <el-button class="ml-2" type="primary" size="small" @click="rewardEdit(scope)">
          {{ $t('operation.editInfomation') }}
        </el-button>
        <el-button class="ml-2" type="danger" size="small" @click="list.splice(scope.$index, 1)">
          {{ $t('operation.delete') }}
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="visible" :title="$t('operation.edit')" width="1280px" :center="true">
    <el-form :model="queryParams" ref="queryRef" label-width="130px">
      <el-form-item :label="$t('gameTemplate.label33')" prop="matchName">
        <el-input
          v-model="queryParams.matchName"
          :placeholder="$t('newbie.form.placeholder1')"
          style="width: 440px"
          disabled
        />
      </el-form-item>
      <el-form-item :label="$t('gameTemplate.label35')" prop="sportType">
        <el-select
          v-model="queryParams.sportId"
          :placeholder="$t('member.pleaseSelect')"
          clearable
          style="width: 440px"
        >
          <el-option
            v-for="dict in video_sports_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <el-divider style="margin: 0 0 20px 0" />
    <el-form :model="queryParams2" :inline="true">
      <el-form-item :label="$t('schedule.contestID')" prop="gameId">
        <el-input v-model="queryParams2.gameId" :placeholder="$t('member.pleaseInput')" />
      </el-form-item>
      <el-form-item :label="$t('schedule.contestName')" prop="leagueName">
        <el-input v-model="queryParams2.leagueName" :placeholder="$t('member.pleaseInput')" />
      </el-form-item>
      <el-form-item :label="$t('schedule.leagueId')" prop="leagueId">
        <el-input v-model="queryParams2.leagueId" :placeholder="$t('member.pleaseInput')" />
      </el-form-item>
      <el-form-item :label="$t('schedule.mainName')" prop="mainName">
        <el-input v-model="queryParams2.mainName" :placeholder="$t('member.pleaseInput')" />
      </el-form-item>
      <el-form-item :label="$t('schedule.cusName')" prop="cusName">
        <el-input v-model="queryParams2.cusName" :placeholder="$t('member.pleaseInput')" />
      </el-form-item>
      <el-form-item :label="$t('schedule.contestStatus')" prop="gameStatus">
        <el-select
          v-model="queryParams2.gameStatus"
          :placeholder="$t('member.pleaseSelect')"
          clearable
        >
          <el-option
            v-for="dict in gameStatusList"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('schedule.contestTime')">
        <el-date-picker
          v-model="dateRange"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="datetimerange"
          range-separator="-"
          :start-placeholder="$t('member.beginTime')"
          :end-placeholder="$t('member.endTime')"
          :default-time="defaultTime"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">
          {{ $t('member.search') }}
        </el-button>
        <el-button icon="Refresh" @click="resetQuery">{{ $t('member.reset') }}</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格数据 -->
    <el-table :data="tableData" :empty-text="$t('member.noData')">
      <el-table-column :label="$t('funds.serialNumber')" width="55" type="index" align="center">
        <template #default="scope">
          <span>{{ (queryParams2.pageNum - 1) * queryParams2.pageSize + (scope.$index + 1) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('schedule.contestTimeNoQuote')"
        prop="gameTime"
        align="center"
        width="180px"
      />
      <el-table-column
        :label="$t('schedule.contestStatusNoQuote')"
        prop="gameStatus"
        align="center"
      >
        <template #default="{ row }">
          <span>{{ gameStatusList.find((e) => e.value === row.gameStatus).label }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('schedule.leagueName')"
        prop="leagueNameLocal"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column :label="$t('schedule.leagueIdNoQuote')" prop="leagueId" align="center" />
      <el-table-column
        :label="$t('schedule.mainNameNoQuote')"
        prop="mainNameLocal"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        :label="$t('schedule.cusNameNoQuote')"
        prop="cusNameLocal"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column :label="$t('schedule.contestIDNoQuote')" prop="gameId" align="center" />
      <el-table-column :label="$t('operation.operate')" align="center">
        <template #default="{ row }">
          <span
            @click="pickOrNot(row)"
            style="color: #1890ff"
            v-if="row.gameId === Number(queryParams.matchId)"
          >
            {{ $t('system.cancleChoose') }}
          </span>
          <span
            style="color: #888"
            v-if="gameIDList.includes(row.gameId) && row.gameId !== Number(queryParams.matchId)"
          >
            {{ $t('system.selected') }}
          </span>
          <span
            @click="pickOrNot(row)"
            style="color: #1890ff"
            v-if="!gameIDList.includes(row.gameId) && row.gameId !== Number(queryParams.matchId)"
          >
            {{ $t('system.choose') }}
          </span>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="queryParams2.pageNum"
      v-model:limit="queryParams2.pageSize"
      @pagination="getList"
    />
    <el-form-item class="bottom left">
      <el-button type="primary" @click="addGear()">{{ $t('operation.sure1') }}</el-button>
      <el-button @click="visible = false">{{ $t('operation.close') }}</el-button>
    </el-form-item>
  </el-dialog>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { getCurrentInstance, onMounted, ref, watch } from 'vue'
import { getScheduleLit } from '@/api/schedule/list'
import cloneDeep from 'lodash/cloneDeep'
import { defaultTime } from '@/utils/config'

const { proxy } = getCurrentInstance()
const { video_sports_type } = proxy.useDict('video_sports_type')

const i18n = useI18n()
const gameStatusList = [
  { label: i18n.t('risk.all'), value: '' },
  { label: i18n.t('schedule.gameNotStartYet'), value: 0 },
  { label: i18n.t('schedule.gameStart'), value: 1 },
  { label: i18n.t('schedule.gameOver'), value: 2 }
]

const props = defineProps({ list: { type: Array } })
const editIndex = ref(-1)
const visible = ref(false)
const dateRange = ref([])
const tableData = ref([])
const total = ref(0)
const loading = ref(false)
const queryRef = ref()

const queryParams = ref({})
const queryParams2 = ref({
  gameId: null,
  leagueName: null,
  leagueId: null,
  mainName: null,
  resourceCode: null,
  cusName: null,
  gameStatus: null,
  beginTime: null,
  endTime: null,
  pageNum: 1,
  pageSize: 10
})

// 确认
const addGear = async () => {
  await queryRef.value.validate((valid, fields) => {
    if (valid && queryParams.value.matchId !== '') {
      if (editIndex.value < 0) props.list.push(queryParams.value)
      else props.list[editIndex.value] = queryParams.value

      visible.value = false
    } else {
      console.log('error submit!', fields)
    }
  })
}

// 编辑修改
const rewardEdit = (scope) => {
  if (scope.$index === undefined) {
    editIndex.value = -1
    queryParams.value = {
      matchId: '',
      matchName: '',
      sportId: '',
      lobby: '',
      home: '',
      away: '',
      beginTime: ''
    }
  } else {
    editIndex.value = scope.$index
    queryParams.value = { ...cloneDeep(scope.row), sportId: String(scope.row.sportId) }
  }
  visible.value = true
}

function handleChange() {
  if ((dateRange.value && !dateRange.value.length) || dateRange.value == null) {
    queryParams2.value.beginTime = ''
    queryParams2.value.endTime = ''
  } else {
    queryParams2.value.beginTime = dateRange.value[0]
    queryParams2.value.endTime = dateRange.value[1]
  }
}

function getList() {
  loading.value = true
  getScheduleLit({ ...queryParams2.value, sportsType: queryParams.value.sportId })
    .then((res) => {
      loading.value = false
      tableData.value = res.rows || []
      total.value = res.total
    })
    .catch(() => (loading.value = false))
}

function handleQuery() {
  queryParams2.value.pageNum = 1
  getList()
}

function resetQuery() {
  queryRef.value.resetFields()
  dateRange.value = []
  handleChange()
  handleQuery()
}

function pickOrNot(row) {
  if (queryParams.value.matchId == row.gameId) {
    gameIDList.value.splice(gameIDList.value.indexOf(row.gameId), 1)
    queryParams.value = {
      matchId: '',
      matchName: '',
      sportId: '',
      lobby: '',
      home: '',
      away: '',
      beginTime: ''
    }
  } else {
    const index = gameIDList.value.indexOf(queryParams.value.matchId)
    if (index > -1) gameIDList.value.splice(index, 1)

    queryParams.value = {
      matchId: row.gameId,
      matchName: row.mainNameLocal + ' VS ' + row.cusNameLocal,
      sportId: String(row.sportsType),
      lobby: 'FB体育',
      home: row.mainNameLocal,
      away: row.cusNameLocal,
      beginTime: Date.parse(row.gameTime)
    }
  }
}

watch(
  () => queryParams.value.sportId,
  () => getList()
)

const gameIDList = ref([])
watch(
  () => props.list,
  () => (gameIDList.value = props.list.flatMap((e) => Number(e.matchId))),
  { deep: true }
)

onMounted(() => getList())
</script>

<style scoped>
:deep(.el-form-item) {
  margin-bottom: 18px;
}
</style>
