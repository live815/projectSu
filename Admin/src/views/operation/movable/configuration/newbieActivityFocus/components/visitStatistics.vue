<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-form-item :label="$t('operation.interviewtime1')" prop="interviewTime">
        <el-date-picker
          v-model="interviewTime"
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
      </el-form-item>
    </el-form>
    <div class="distribution">{{ $t('operation.tip72') }}</div>
    <el-table :data="equipmentTypeDataList" style="width: 100%">
      <el-table-column
        prop="serialNumber"
        type="index"
        :label="$t('newbie.table.label16')"
        width="400"
      />
      <el-table-column prop="deviceType" :label="$t('operation.accessdevice')" width="400">
        <template #default="scope">
          <span v-if="scope.row.deviceType == 1">Web</span>
          <span v-if="scope.row.deviceType == 2">{{ $t('operation.Android') }}</span>
          <span v-if="scope.row.deviceType == 3">ios</span>
          <span v-if="scope.row.deviceType == 4">H5</span>
        </template>
      </el-table-column>
      <el-table-column prop="enterTimes" :label="$t('operation.Visits')" width="400" />
      <el-table-column prop="distinctEnterTimes" :label="$t('operation.tip135')" />
    </el-table>
    <div class="distribution">{{ $t('operation.tip74') }}</div>
    <el-table :data="userTypeDataList" style="width: 100%">
      <el-table-column prop="1" type="index" :label="$t('newbie.table.label16')" width="400" />
      <el-table-column prop="memberType" :label="$t('operation.usertype')" width="400">
        <template #default="scope">
          <span v-if="scope.row.memberType == 0">{{ $t('operation.ordinary') }}</span>
          <span v-if="scope.row.memberType == 1">{{ $t('operation.highquality') }}</span>
          <span v-if="scope.row.memberType == 2">{{ $t('operation.focuson') }}</span>
          <span v-if="scope.row.memberType == null">{{ $t('operation.tourists') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="enterTimes" :label="$t('operation.Visits')" width="400" />
      <el-table-column prop="distinctEnterTimes" :label="$t('operation.tip73')" />
    </el-table>
    <div class="distribution">{{ $t('operation.tip75') }}</div>
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-form-item>
        <el-table :data="sourceDataList" style="width: 100%">
          <el-table-column prop="" type="index" :label="$t('newbie.table.label16')" width="155" />
          <el-table-column prop="createTime" :label="$t('operation.interviewtime')" width="155" />
          <el-table-column prop="total" :label="$t('operation.totalvisits')" width="155" />
          <el-table-column prop="homeCarouselTotal" :label="$t('operation.tip76')" width="155" />
          <el-table-column prop="activityListTotal" :label="$t('operation.tip15')" width="155" />
          <el-table-column prop="homePopupTotal" :label="$t('operation.tip16')" width="155" />
          <el-table-column
            prop="appLaunchTotal"
            :label="$t('operation.APPstartupPage')"
            width="155"
          />
          <el-table-column prop="floatWindowTotal" :label="$t('operation.tip18')" width="155" />
          <el-table-column
            prop="payAdvertiseTotal"
            :label="$t('operation.Payadvert')"
            width="155"
          />
          <el-table-column prop="userCenterTotal" :label="$t('operation.userCenter')" width="155" />
        </el-table>
      </el-form-item>
    </el-form>
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
import {
  getTypeDistributionsApi,
  getDemandStatisticTotalApi
} from '@/api/operation/activeConfiguration'
import { useRoute } from 'vue-router'
const route = useRoute()

const queryParams = ref({
  activityId: 0,
  createStart: '',
  createEnd: '',
  memberRegisterTimeStart: '',
  memberRegisterTimeEnd: '',
  pageNum: 1,
  pageSize: 10
})
const total = ref(5)
const loading = ref(false)
const getList = () => {
  loading.value = true
  getDemandStatisticTotalApi(queryParams.value)
    .then((res) => {
      loading.value = false
      sourceDataList.value = res.rows || []
      total.value = res.total
    })
    .catch((err) => {
      loading.value = false
    })
}

//访问类型列表
const equipmentTypeDataList = ref([])
const userTypeDataList = ref([])
const sourceDataList = ref([])
const getEquipmentTypeDataList = async () => {
  queryParams.value.activityId = route.query.id
  try {
    let res = await getTypeDistributionsApi(queryParams.value)
    equipmentTypeDataList.value = res.asByDeviceRespVo
    userTypeDataList.value = res.asByMemberTypeRespVo
    // total.value = res.total;
  } catch (e) {
    console.log(e)
  }
}
//访问来源列表
const getSourceDataList = async () => {
  queryParams.value.activityId = route.query.id
  try {
    let res = await getDemandStatisticTotalApi(queryParams.value)
    sourceDataList.value = res.rows
    total.value = res.total
  } catch (e) {
    console.log(e)
  }
}

const interviewTime = ref([]) //活动开始时间
// 查询列表
function handleQuery() {
  if (interviewTime.value) {
    queryParams.value.createStart = interviewTime.value[0].split(' ')[0]
    queryParams.value.createEnd = interviewTime.value[1].split(' ')[0]
    queryParams.value.memberRegisterTimeStart = interviewTime.value[0]
    queryParams.value.memberRegisterTimeEnd = interviewTime.value[1]
  } else {
    queryParams.value.createStart = null
    queryParams.value.createEnd = null
    queryParams.value.memberRegisterTimeStart = null
    queryParams.value.memberRegisterTimeEnd = null
  }

  getEquipmentTypeDataList()
  getSourceDataList()
}
/** 重置按钮操作 */
function resetQuery() {
  queryParams.value.memberRegisterTimeStart = ''
  queryParams.value.memberRegisterTimeEnd = ''
  queryParams.value.createStart = ''
  queryParams.value.createEnd = ''
  interviewTime.value = ''
  getEquipmentTypeDataList()
  getSourceDataList()
}

onMounted(() => {
  getEquipmentTypeDataList()
  getSourceDataList()
})
</script>

<style scoped>
.distribution {
  font-size: 30px;
  line-height: 30px;
  /* border-bottom: 1px solid grey; */
  padding-bottom: 20px;
  margin: 20px 0 20px 0;
}
</style>
