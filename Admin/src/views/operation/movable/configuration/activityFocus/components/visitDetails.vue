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
      <el-form-item :label="$t('operation.Accounttype1')" prop="memberType">
        <el-select
          v-model="queryParams.memberType"
          class="m-2"
          :placeholder="$t('operation.paleaseChose')"
          style="width: 120px"
        >
          <el-option
            v-for="item in accountTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
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
      <el-form-item :label="$t('operation.Equiptype')" prop="deviceType">
        <el-select
          v-model="queryParams.deviceType"
          class="m-2"
          :placeholder="$t('operation.paleaseChose')"
          style="width: 120px"
        >
          <el-option
            v-for="item in equipmentTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('operation.accessentrance')" prop="enterLocation">
        <el-select
          v-model="queryParams.enterLocation"
          class="m-2"
          :placeholder="$t('operation.paleaseChose')"
          style="width: 160px"
        >
          <el-option
            v-for="item in accessEntrances"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('operation.RegistratTime')" prop="memberRegisterTimeStart">
        <el-date-picker
          v-model="registerTime"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="datetimerange"
          range-separator="-"
          :start-placeholder="$t('operation.beginTime')"
          :end-placeholder="$t('operation.endTime')"
          :default-time="defaultTime"
        ></el-date-picker>
      </el-form-item>
      <el-form-item :label="$t('operation.interviewtime1')" prop="enterTimeStart">
        <el-date-picker
          v-model="interviewTime"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="datetimerange"
          range-separator="-"
          :start-placeholder="$t('operation.beginTime')"
          :end-placeholder="$t('operation.endTime')"
          :default-time="defaultTime"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">{{
          $t('operation.search')
        }}</el-button>
        <el-button icon="Refresh" @click="resetQuery">{{ $t('operation.reset') }}</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableDataList" style="width: 100%">
      <el-table-column prop="" type="index" :label="$t('operation.serialnumber')" width="80" />
      <el-table-column prop="memberUserName" :label="$t('operation.memberaccount1')" width="180">
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
      <el-table-column prop="memberVipLevel" :label="$t('operation.VIPlevel')">
        <template #default="scope"> VIP{{ scope.row.memberVipLevel }} </template>
      </el-table-column>
      <el-table-column prop="deviceType" :label="$t('operation.accessdevice')">
        <template #default="scope">
          <span v-if="scope.row.deviceType == 1">Web</span>
          <span v-if="scope.row.deviceType == 2">ios</span>
          <span v-if="scope.row.deviceType == 3">{{ $t('operation.Android') }}</span>
          <span v-if="scope.row.deviceType == 4">H5</span>
        </template>
      </el-table-column>
      <el-table-column prop="enterLocation" :label="$t('operation.accessentrance')">
        <template #default="scope">
          <span v-if="scope.row.enterLocation == 1">{{ $t('operation.Homepagecarousel') }}</span>
          <span v-if="scope.row.enterLocation == 2">{{ $t('operation.tip15') }}</span>
          <span v-if="scope.row.enterLocation == 3">{{ $t('operation.tip16') }}</span>
          <span v-if="scope.row.enterLocation == 4">{{ $t('operation.tip71') }} </span>
          <span v-if="scope.row.enterLocation == 5">{{ $t('operation.tip18') }} </span>
          <span v-if="scope.row.enterLocation == 6">{{ $t('operation.Payadvert') }} </span>
          <span v-if="scope.row.enterLocation == 7">{{ $t('operation.userCenter') }} </span>
        </template>
      </el-table-column>
      <el-table-column prop="memberRegisterTime" :label="$t('operation.RegistratTime')" sortable />
      <el-table-column prop="enterTime" :label="$t('operation.interviewtime1')" sortable />
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
import { getDemandStatisticApi } from '@/api/operation/activeConfiguration'
import i18n from '@/i18n'

const props = defineProps({
  VisitBetails: {
    type: String
  }
})

const queryParams = ref({
  activityId: 0, //活动ID
  deviceType: '', //访问设备类型
  enterLocation: '', //访问入口
  enterTimeEnd: '', //访问时间查询-结束时间
  enterTimeStart: '', //访问时间查询-开始时间
  memberRegisterTimeEnd: '', //会员注册时间查询-结束时间
  memberRegisterTimeStart: '', //会员注册时间查询-开始时间
  memberType: '', //账号类型
  memberUserName: '', //会员账号
  memberVipLevel: '', //vip等级
  pageNum: 1, //页数
  pageSize: 10 //每页显示记录数
})

const total = ref(5)
const tableDataList = ref([])
const loading = ref(false)

const accountTypes = [
  {
    value: '',
    label: i18n.global.t('operation.all')
  },
  {
    value: 0,
    label: i18n.global.t('operation.ordinary')
  },
  {
    value: 1,
    label: i18n.global.t('operation.highquality')
  },
  {
    value: 2,
    label: i18n.global.t('operation.focuson')
  }
]
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
const equipmentTypes = [
  {
    value: '',
    label: i18n.global.t('operation.all')
  },
  {
    value: 1,
    label: 'Web'
  },
  {
    value: 2,
    label: 'ios'
  },
  {
    value: 3,
    label: i18n.global.t('operation.Android')
  },
  {
    value: 4,
    label: 'H5'
  }
]
const accessEntrances = [
  {
    value: '',
    label: i18n.global.t('operation.all')
  },
  {
    value: 1,
    label: i18n.global.t('operation.Homepagecarousel')
  },
  {
    value: 2,
    label: i18n.global.t('operation.tip15')
  },
  {
    value: 3,
    label: i18n.global.t('operation.tip16')
  },
  {
    value: 4,
    label: i18n.global.t('operation.APPstartupPage')
  },
  {
    value: 5,
    label: i18n.global.t('operation.tip18')
  },
  {
    value: 6,
    label: i18n.global.t('operation.Payadvert')
  },
  {
    value: 7,
    label: i18n.global.t('operation.userCenter')
  }
]
onMounted(() => {})
//列表
const getTableDataList = async () => {
  queryParams.value.activityId = props.VisitBetails
  try {
    let res = await getDemandStatisticApi(queryParams.value)
    // console.log(res, "ref.data.rows");
    tableDataList.value = res.rows
    total.value = res.total
  } catch (e) {
    console.log(e)
  }
}

// 查询
const registerTime = ref([])
const interviewTime = ref([])
function handleQuery() {
  if (registerTime.value) {
    queryParams.value.memberRegisterTimeStart = registerTime.value[0]
    queryParams.value.memberRegisterTimeEnd = registerTime.value[1]
  } else {
    queryParams.value.memberRegisterTimeStart = null
    queryParams.value.memberRegisterTimeEnd = null
  }

  if (interviewTime.value) {
    queryParams.value.enterTimeStart = interviewTime.value[0]
    queryParams.value.enterTimeEnd = interviewTime.value[1]
  } else {
    queryParams.value.enterTimeStart = null
    queryParams.value.enterTimeEnd = null
  }
  getTableDataList()
}
/** 重置按钮操作 */
function resetQuery() {
  queryParams.value.memberUserName = ''
  queryParams.value.memberType = ''
  queryParams.value.memberVipLevel = ''
  queryParams.value.deviceType = ''
  queryParams.value.enterLocation = ''
  queryParams.value.enterTimeStart = ''
  queryParams.value.createTime = ''
  registerTime.value = ''
  interviewTime.value = ''
  getTableDataList()
}
//分页
function getList() {
  loading.value = true
  getDemandStatisticApi(queryParams.value)
    .then((res) => {
      loading.value = false
      tableDataList.value = res.rows || []
      total.value = res.total
    })
    .catch((err) => {
      loading.value = false
    })
  console.log(tableData.value)
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
