<template>
  <div class="app-container" v-loading="loading">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-form-item :label="$t('live.sportsType')" prop="sportsType">
        <el-select v-model="queryParams.sportsType" :placeholder="$t('live.pleaseChose')" clearable>
          <el-option
            v-for="dict in game_mapping_sports_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('live.EventID2')" prop="leagueId">
        <el-input
          v-model="queryParams.leagueId"
          :placeholder="$t('live.pleaseEnter')"
          clearable
          style="width: 230px"
        ></el-input>
      </el-form-item>
      <el-form-item :label="$t('live.event1')" prop="leagueName">
        <el-input
          v-model="queryParams.leagueName"
          :placeholder="$t('live.pleaseEnter')"
          clearable
          style="width: 230px"
        ></el-input>
      </el-form-item>
      <el-form-item :label="$t('live.hometeam1')" prop="mainName">
        <el-input
          v-model="queryParams.mainName"
          :placeholder="$t('live.pleaseEnter')"
          clearable
          style="width: 230px"
        ></el-input>
      </el-form-item>
      <el-form-item :label="$t('live.awayteam1')" prop="cusName">
        <el-input
          v-model="queryParams.cusName"
          :placeholder="$t('live.pleaseEnter')"
          clearable
          style="width: 230px"
        >
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          icon="Search"
          @click="handleQuery"
          v-hasPermi="['live:video:list']"
          >{{ $t('live.Inquire') }}</el-button
        >
        <el-button icon="Refresh" @click="resetQuery">{{ $t('live.reset') }}</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格数据 -->
    <el-table :data="tableData" :empty-text="$t('member.noData')">
      <el-table-column
        :label="$t('live.Scheduleplan1')"
        prop="leagueId"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <p>{{ $t('live.Scheduleplan12') }}</p>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('live.Scheduleplan2')"
        prop="sportsTypeName"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        :label="$t('live.Scheduleplan3')"
        prop="leagueName"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <p>{{ row.leagueNameLocal ? row.leagueNameLocal : '-' }}</p>
          <p>{{ row.leagueName ? row.leagueName : '-' }}</p>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('live.Scheduleplan4')"
        prop="mainName"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <p>{{ row.mainNameLocal ? row.mainNameLocal : '-' }}</p>
          <p>{{ row.mainName ? row.mainName : '-' }}</p>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('live.Scheduleplan5')"
        prop="cusNameLocal"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <p>{{ row.cusNameLocal ? row.cusNameLocal : '-' }}</p>
          <p>{{ row.cusName ? row.cusName : '-' }}</p>
        </template>
      </el-table-column>
      <el-table-column :label="$t('live.EventID2')" prop="leagueId" />
      <!-- <el-table-column :label="$t('live.matchStatus')">
        <template #default="{ row }">
          <p v-if="row.gameStatus === 0">{{ $t('live.Notstartyet') }}</p>
          <p v-else-if="row.gameStatus === 1">{{ $t('live.matchstart') }}</p>
          <p v-else-if="row.gameStatus === 2">{{ $t('live.matchsend') }}</p>
        </template>
      </el-table-column> -->
      <el-table-column
        :label="$t('live.Scheduleplan6')"
        prop="gameTime"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        :label="$t('live.Scheduleplan7')"
        prop="videoUrl"
        align="center"
        width="160"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <p class="checkBox" @click="openAnimationDia(row.pmVideo, 'PM')" v-if="row.pmVideo">
            {{ $t('live.PMdata') }}
          </p>
          <p
            class="checkBox"
            @click="openAnimationDia(row.dawnVideo, $t('live.dawn'))"
            v-if="row.dawnVideo"
          >
            {{ $t('live.dawnData') }}
          </p>

          <p class="checkBox" @click="openAnimationDia(row.namiVideo, 'FB')" v-if="row.namiVideo">
            {{ $t('live.FBData') }}
          </p>
          <span v-if="!row.namiVideo && !row.pmVideo">-</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('live.Scheduleplan8')" align="center" width="">
        <template #default="scope">
          <div>
            <!-- <el-button
              size="small"
              type="success"
              v-hasPermi="['gift:info:edit']"
              @click=""
              >纳米关联</el-button
            > -->
            <el-button
              size="small"
              type="primary"
              v-hasPermi="['gift:info:delete']"
              @click="handClickPm(scope.row)"
              >{{ $t('live.Scheduleplan9') }}</el-button
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('live.Scheduleplan10')" align="center" width="">
        <template #default="scope">
          <div>
            <el-button
              size="small"
              type="primary"
              v-hasPermi="['gift:info:delete']"
              @click="editClickPm(scope.row)"
              >{{ $t('live.Scheduleplan11') }}</el-button
            >
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
    />
    <PmDialog
      v-model:open="open"
      v-model:leagueId="leagueId"
      @onreFrash="onreFrash"
      v-if="open"
    ></PmDialog>
    <AnimationDialog
      v-model:openAnimation="openAnimation"
      v-model:cloneRow="cloneRow"
      :videoType="videoType"
      v-if="openAnimation"
    />
    <!-- 修改映射 -->
    <ViewMapDialog
      :viewMapShow="viewMapShow"
      :leagueIdObj="leagueIdObj"
      @closeShow="closeShow"
      v-if="viewMapShow"
      :numType="numType"
    />
  </div>
</template>

<script setup>
import { getCurrentInstance } from 'vue'
import { getScheduleplanList } from '@/api/live/scheduleplan.js'
import PmDialog from './components/PmDialog.vue'
import AnimationDialog from './components/AnimationDialog.vue'
import ViewMapDialog from './components/ViewMapDialog.vue'

const { proxy } = getCurrentInstance()

const { game_mapping_sports_type } = proxy.useDict('game_mapping_sports_type')
const queryRef = ref(null)
const queryParams = ref({
  pageNum: 1,
  pageSize: 10,
  sportsType: '0'
})
const numType = ref(0) //1 查看 2修改
const dateRange = ref([])
const tableData = ref([])
const total = ref(1)
const loading = ref(false)
const open = ref(false)
const leagueId = ref(null)
const cloneRow = ref(null)
const openAnimation = ref(false)
const viewMapShow = ref(false)
const leagueIdObj = ref(null)
const videoType = ref('')
getList()
function getList() {
  loading.value = true
  if (!queryParams.value.leagueId) delete queryParams.value.leagueId
  getScheduleplanList(queryParams.value)
    .then((res) => {
      loading.value = false
      tableData.value = res.list || []
      total.value = res.total
    })
    .catch(() => {
      // proxy.$modal.msgError('123')
      loading.value = false
    })
}
function handleQuery() {
  queryParams.value.pageNum = 1
  getList()
}
function resetQuery() {
  queryRef.value.resetFields()
  dateRange.value = []

  handleQuery()
}
function handClickPm(row) {
  leagueIdObj.value = row
  // open.value = true;
  numType.value = 1
  viewMapShow.value = true
}
const editClickPm = (row) => {
  leagueIdObj.value = row
  numType.value = 2
  viewMapShow.value = true
}
const closeShow = () => {
  viewMapShow.value = false
}
function openAnimationDia(row, type) {
  cloneRow.value = JSON.parse(JSON.stringify(row))
  openAnimation.value = true
  videoType.value = type
}
function onreFrash() {
  getList()
}
onActivated(async()=>{
  if(!isFirstLoad.value){
    await getList();
  }
})
</script>

<style lang="scss" scoped>
.checkBox {
  color: #1890ff;
}
</style>
