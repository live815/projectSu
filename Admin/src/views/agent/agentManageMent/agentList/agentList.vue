<template>
  <div class="app-container">
    <!-- {{ requestData }} -->
    <el-form :model="requestData" :inline="true" label-width="auto" label-position="left">
      <el-row>
        <el-form-item :label="$t('agent.lastLoginTime')">
          <el-date-picker
            style="width: 360px"
            v-model="loginTime"
            value-format="YYYY-MM-DD HH:mm:ss"
            type="datetimerange"
            range-separator="-"
            :start-placeholder="$t('agent.startTime')"
            :end-placeholder="$t('agent.endTime')"
            :default-time="defaultTime"
            :shortcuts="shortcuts"
          ></el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('agent.createTimeQuote')">
          <el-date-picker
            style="width: 360px"
            v-model="createTime"
            value-format="YYYY-MM-DD HH:mm:ss"
            type="datetimerange"
            range-separator="-"
            :start-placeholder="$t('agent.startTime')"
            :end-placeholder="$t('agent.endTime')"
            :default-time="defaultTime"
            :shortcuts="shortcuts"
          ></el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('agent.lastUpdateTime')">
          <el-date-picker
            style="width: 360px"
            v-model="updateTime"
            value-format="YYYY-MM-DD HH:mm:ss"
            type="datetimerange"
            range-separator="-"
            :start-placeholder="$t('agent.startTime')"
            :end-placeholder="$t('agent.endTime')"
            :default-time="defaultTime"
            :shortcuts="shortcuts"
          >
          </el-date-picker>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item :label="$t('agent.agentAccountQuote')">
          <el-input v-model="requestData.agentUsername" />
        </el-form-item>
        <el-form-item>
          <el-radio-group v-model="requestData.subFlag">
            <el-radio label="0">{{ $t('agent.directlyReporting') }}</el-radio>
            <el-radio label="1">{{ $t('agent.allSubordinates') }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('agent.agentType')">
          <el-select
            v-model="requestData.agentType"
            class="m-2"
            :placeholder="$t('agent.pleaseSelect')"
            style="width: 120px"
            clearable
          >
            <el-option
              v-for="item in agentTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('agent.agentModel')">
          <el-select
            v-model="requestData.agentMode"
            class="m-2"
            :placeholder="$t('agent.pleaseSelect')"
            style="width: 120px"
            clearable
          >
            <el-option
              v-for="item in agentMode"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item :label="$t('agent.agentTagQuot')">
          <el-select
            style="width: 190px"
            v-model="selectTag"
            multiple
            collapse-tags
            default-first-option
            :reserve-keyword="false"
          >
            <el-option
              v-for="item in tagList"
              :key="item.id"
              :label="item.tagName"
              :value="item.tagName"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('agent.agentLevelQuote')">
          <el-select style="width: 192px" v-model="requestData.agentLevel" clearable>
            <el-option
              v-for="item in agentLevel"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              clearable
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('agent.immediateSuperiorQuote')">
          <el-input v-model="requestData.superiorAgentName" />
        </el-form-item>
        <el-form-item :label="$t('agent.maintainerQuot')">
          <el-input v-model="requestData.defender" />
        </el-form-item>
        <el-form-item :label="$t('agent.createByQuote')">
          <el-input v-model="requestData.createBy" />
        </el-form-item>
        <el-form-item :label="$t('agent.agentName')">
          <el-input v-model="requestData.agentRealName" />
        </el-form-item>
        <el-form-item :label="$t('agent.developerQuot')">
          <el-input v-model="requestData.developer" />
        </el-form-item>
        <el-form-item :label="$t('agent.lastUpdateBy')">
          <el-input v-model="requestData.updateBy" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" icon="Search" @click="getQueryData">{{
            $t('agent.search')
          }}</el-button>
          <el-button icon="Refresh" @click="resetQuery">{{ $t('agent.reset') }}</el-button>
          <el-button type="warning" icon="Download" @click="handleExport">{{
            $t('agent.export')
          }}</el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="agentUsername" :label="$t('agent.agentAccount')" width="180">
        <template #default="{ row }">
          <span class="blue-text" @click="toDetail(row.id)">{{ row.agentUsername }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="agentLevel" :label="$t('agent.agentLevel')" width="180">
        <template #default="{ row }">
          <span>{{ row.agentLevel + 1 || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="superiorAgentName" :label="$t('agent.immediateSuperior')" width="180">
        <template #default="{ row }">
          <span>{{ row.superiorAgentName || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="agentType" :label="$t('agent.agentTypeNoQuote')" width="180">
        <template #default="{ row }">
          {{ row.agentType ? $t('agent.outerAgent') : $t('agent.innerAgent') }}
        </template>
      </el-table-column>
      <el-table-column prop="agentMode" :label="$t('agent.agentModelNoQuote')" width="180">
        <template #default="{ row }">
          {{ row.agentMode ? $t('agent.dispatchMode') : $t('agent.commissionMode') }}
        </template>
      </el-table-column>
      <!-- <el-table-column prop="address" label="代理层级" /> -->
      <el-table-column prop="tags" :label="$t('agent.agentTag')" width="180">
        <template #default="{ row }">
          {{ row.tags || '-' }}
        </template>
      </el-table-column>

      <el-table-column prop="status" :label="$t('agent.accountStatusQuot')" width="180">
        <template #default="{ row }">
          <el-tag effect="plain" type="success" v-if="row.status == 0">{{
            $t('agent.nomral')
          }}</el-tag>
          <el-tag effect="plain" type="danger" v-if="row.status == 1">{{
            $t('agent.loginLockQuote')
          }}</el-tag>
          <el-tag effect="plain" type="danger" v-if="row.status == 2">{{
            $t('agent.withdrawLock')
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="commissionPeriod" :label="$t('agent.commissionCycleQuot')" width="180">
        <template #default>
          <span>{{ $t('agent.naturalMonth') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="grantCommissionWay" :label="$t('agent.commissionMethod')" width="180">
        <template #default="{ row }">
          <span v-if="row.grantCommissionWay == 0">{{ $t('agent.issueFirstLevelAgents') }}</span>
          <span v-else>{{ $t('agent.releaseAllAgents') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="availableBalance"
        :label="$t('agent.commissionWalletBalance')"
        width="180"
      >
        <template #default="{ row }">
          <span>{{ row.availableBalance.toFixed(2) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="creditBalance"
        :label="$t('agent.creditWalletBalance')"
        width="180"
        center
      >
        <template #default="{ row }">
          <span>{{ row.creditBalance.toFixed(2) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="subAgents" :label="$t('agent.lowerLevelAgent')" width="180">
        <template #default="{ row }">
          <span class="blue-text" @click="viewSubAgent(row, row.tenantId, 1)">{{
            row.subAgents
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="subMembers" :label="$t('agent.lowerLevelMember')" width="180">
        <template #default="{ row }">
          <span class="blue-text" @click="viewSubAgent(row, row.tenantId, 2)">{{
            row.subMembers
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="activeMembers" :label="$t('agent.activeMember')" width="180">
        <template #default="{ row }">
          <span class="blue-text" @click="viewSubAgent(row, row.tenantId, 3)">{{
            row.activeMembers
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="developer" :label="$t('agent.developer')" width="180">
        <template #default="{ row }">
          <span>
            {{ row.developer || '-' }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="defender" :label="$t('agent.maintainer')" width="180">
        <template #default="{ row }">
          <span>
            {{ row.defender || '-' }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="lastLoginIp" :label="$t('agent.lastLoginIp')" width="180">
        <template #default="{ row }">
          <span>
            {{ row.lastLoginIp || '-' }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="lastLoginTime" :label="$t('agent.lastLoginTimeQuot')" width="180">
        <template #default="{ row }">
          <span>
            {{ row.lastLoginTime || '-' }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="createBy" :label="$t('agent.createBy')" width="180" />
      <el-table-column prop="createTime" :label="$t('agent.createTime')" width="180" />
      <el-table-column prop="updateBy" :label="$t('agent.lastUpdateByQuot')" width="180">
        <template #default="{ row }">
          <span>
            {{ row.updateBy || '-' }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" :label="$t('agent.lastUpdateTimeQuot')" width="180">
        <template #default="{ row }">
          <span>
            {{ row.updateTime || '-' }}
          </span>
        </template>
      </el-table-column>
    </el-table>
    <div class="pag-row">
      <div class="pag">
        <el-pagination
          v-show="total > 0"
          v-model:current-page="requestData.pageNum"
          background
          :page-sizes="[10, 20, 30, 40]"
          :total="total"
          @current-change="handleCurrentChange"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
        />
      </div>
    </div>

    <!-- {{$t('agent.search')}}下级弹窗 -->
    <el-dialog v-model="subAgentPopup" :title="subAgentTitle" width="700" :center="true">
      <subAgnt v-if="subAgentPopup" :agentId="agentId" :tenantId="tenantId" :viewType="viewType" />
    </el-dialog>
  </div>
</template>

<script setup>
import subAgnt from './components/subAgnt.vue'
import { defaultTime, shortcuts } from '@/utils/config'
import { getAgentListApi } from '@/api/agent/agentList.js'
import { getAgentTagListApi } from '@/api/agent/agentList.js'
import { useRouter } from 'vue-router'
import i18n from '@/i18n'
const { proxy } = getCurrentInstance()
const router = useRouter()
onMounted(() => {
  getTableData()
  queryTagApi()
})

// 获取数据
const getTableData = () => {
  getStartEndTime()
  getAgentListApi(requestData.value).then((res) => {
    tableData.value = res.records
    total.value = res.total
  })
}

// 获取查询}数据
const selectTag = ref([])
const getQueryData = () => {
  requestData.value.pageNum = 1
  requestData.value.tags = selectTag.value.join(',')
  console.log(requestData.value.tags)
  getTableData()
}
// 重置功能
const resetQuery = () => {
  requestData.value = {
    agentUsername: '',
    agentType: '',
    agentMode: '',
    subFlag: '',
    lastLoginStartTime: '',
    lastLoginEndTime: '',
    createStartTime: '',
    createEndTime: '',
    updateStartTime: '',
    updateEndTime: '',
    pageSize: requestData.value.pageSize || 10
  }
  selectTag.value = []
  loginTime.value = createTime.value = updateTime.value = null
}

// 导出
const handleExport = () => {
  proxy.download(
    '/system/agent/agentManage/export',
    {
      ...requestData.value
    },
    `${i18n.global.t('agent.agentDataList')}${new Date().toLocaleDateString()}.xlsx`
  )
}

// 表格
const tableData = ref([])
// 时间选择数据
const loginTime = ref([])
const createTime = ref([])
const updateTime = ref([])
// 时间赋值
const formatTime = (arr, obj, startKey, endKey) => {
  if (!arr || arr.length == 0) {
    obj[startKey] = ''
    obj[endKey] = ''
  } else {
    obj[startKey] = arr[0]
    obj[endKey] = arr[1]
  }
}

const getStartEndTime = () => {
  formatTime(loginTime.value, requestData.value, 'lastLoginStartTime', 'lastLoginEndTime')
  formatTime(createTime.value, requestData.value, 'createStartTime', 'createEndTime')
  formatTime(updateTime.value, requestData.value, 'updateStartTime', 'updateEndTime')
}
// 请求体
const requestData = ref({
  agentUsername: '',
  agentType: '',
  agentMode: '',
  subFlag: '',
  lastLoginStartTime: '',
  lastLoginEndTime: '',
  createStartTime: '',
  createEndTime: '',
  updateStartTime: '',
  updateEndTime: '',
  pageNum: 1,
  pageSize: 10
})

// 下级代理弹窗控制
const subAgentTitle = computed(() => {
  if (viewType.value == 1) {
    return i18n.global.t('agent.lowerLevelAgent')
  }
  if (viewType.value == 2) {
    return i18n.global.t('agent.lowerLevelMember')
  }
  if (viewType.value == 3) {
    return i18n.global.t('agent.activeMember')
  }
})
const subAgentPopup = ref(false)
const viewType = ref(0)
const agentId = ref()
const tenantId = ref()

const viewSubAgent = (row, tenId, type) => {
  console.log(type, row.subAgents == 0)
  switch (type) {
    case 1:
      // 下级代理
      if (row.subAgents == 0) {
        proxy.$modal.msgWarning(i18n.global.t('agent.noSubAgent'))
        return
      }
      break
    case 2:
      // 下级会员
      if (row.subMembers == 0) {
        proxy.$modal.msgWarning(i18n.global.t('agent.noSubAccount'))
        return
      }
      break
    case 3:
      // 活跃会员
      if (row.activeMembers == 0) {
        proxy.$modal.msgWarning(i18n.global.t('agent.noActiveMember'))
        return
      }
      break
  }

  viewType.value = type
  agentId.value = BigInt(row.id).toString()
  tenantId.value = tenId
  subAgentPopup.value = true
}
// 分页器
const total = ref(0)
const handleCurrentChange = (val) => {
  requestData.value.pageNum = val
  getTableData()
}
const handleSizeChange = (val) => {
  if (total.value == 0) {
    return
  }
  requestData.value.pageSize = val
  getTableData()
}

// 跳转去详情
const toDetail = (id) => {
  let tempId = BigInt(id).toString()
  router.push({
    path: 'agentDetail',
    query: {
      id: tempId
    }
  })
}
// 选择框数据
// 代理类型
const agentTypeList = ref([
  {
    label: i18n.global.t('agent.all'),
    value: ''
  },
  {
    label: i18n.global.t('agent.innerAgent'),
    value: '0'
  },
  {
    label: i18n.global.t('agent.outerAgent'),
    value: '1'
  }
])
const agentMode = ref([
  {
    label: i18n.global.t('agent.all'),
    value: ''
  },
  {
    label: i18n.global.t('agent.commissionMode'),
    value: '0'
  },
  {
    label: i18n.global.t('agent.dispatchMode'),
    value: '1'
  }
])
// 获取标签列表
const queryTagApi = () => {
  getAgentTagListApi().then((res) => {
    tagList.value = res
  })
}
// 标签列表
const tagList = ref([])
// 代理等级
const agentLevel = ref([
  {
    label: i18n.global.t('agent.all'),
    value: ''
  },
  {
    label: '1',
    value: '0'
  },
  {
    label: '2',
    value: '1'
  },
  {
    label: '3',
    value: '2'
  },
  {
    label: '4',
    value: '3'
  },
  {
    label: '5',
    value: '4'
  }
])
// 用于预留字段的临时变量
const tempDemo = ref()
</script>

<style lang="scss" scoped>
.blue-text {
  color: rgb(43, 167, 255);
  cursor: pointer;
}

.pag-row {
  display: flex;
  margin-top: 30px;
}

.pag {
  margin-left: auto;
  margin-right: 100px;
}
</style>
