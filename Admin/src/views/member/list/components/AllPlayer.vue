<template>
  <div class="all-player">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-form-item :label="$t('member.accountType')" prop="type" class="full-width">
            <el-select
              v-model="queryParams.type"
              :placeholder="$t('member.pleaseSelect')"
              clearable
              class="full-width"
            >
              <el-option
                v-for="item in accountList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('member.userName')" prop="userName" class="full-width">
            <el-input
              v-model="queryParams.userName"
              :placeholder="$t('member.pleaseInput')"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('member.realName')" prop="realName" class="full-width">
            <el-input
              v-model="queryParams.realName"
              :placeholder="$t('member.pleaseInput')"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('member.agentName')" prop="parentName" class="full-width">
            <el-input
              v-model="queryParams.parentName"
              :placeholder="$t('member.pleaseInput')"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('member.phoneNumber')" prop="mobile" class="full-width">
            <el-input
              v-model="queryParams.mobile"
              :placeholder="$t('member.pleaseInput')"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('member.registerIP')" prop="regIp" class="full-width">
            <el-input
              v-model="queryParams.regIp"
              :placeholder="$t('member.pleaseInput')"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('member.registerDomain')" prop="regDomain" class="full-width">
            <el-input
              v-model="queryParams.regDomain"
              :placeholder="$t('member.pleaseInput')"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('member.loginIP')" prop="lastLoginIp" class="full-width">
            <el-input
              v-model="queryParams.lastLoginIp"
              :placeholder="$t('member.pleaseInput')"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('member.registerTime')" class="full-width">
            <el-date-picker
              v-model="dateRange"
              value-format="YYYY-MM-DD HH:mm:ss"
              type="datetimerange"
              range-separator="-"
              :start-placeholder="$t('member.beginTime')"
              :end-placeholder="$t('member.endTime')"
              @change="handleChange"
              class="full-width"
              :default-time="defaultTime"
              :shortcuts="shortcuts"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('member.remark')" prop="remark" class="full-width">
            <el-input
              v-model="queryParams.remark"
              :placeholder="$t('member.pleaseInput')"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('member.nationQuote')" prop="regNation" class="full-width">
            <el-select
              v-model="queryParams.regNation"
              :placeholder="$t('member.pleaseSelect')"
              clearable
              class="full-width"
            >
              <el-option
                v-for="item in countryList"
                :key="item.countryCn"
                :label="item.countryLocal"
                :value="item.countryCn"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item :label="$t('member.firstDepositTime')" class="full-width">
            <el-date-picker
              v-model="dateRangeWithdraw"
              value-format="YYYY-MM-DD HH:mm:ss"
              type="datetimerange"
              range-separator="-"
              :start-placeholder="$t('member.beginTime')"
              :end-placeholder="$t('member.endTime')"
              @change="handleChangeWithdraw"
              class="full-width"
              :default-time="defaultTime"
              :shortcuts="shortcuts"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('member.lastLoginTime')" class="full-width">
            <el-date-picker
              v-model="dateRangeLastLogin"
              value-format="YYYY-MM-DD HH:mm:ss"
              type="datetimerange"
              range-separator="-"
              :start-placeholder="$t('member.beginTime')"
              :end-placeholder="$t('member.endTime')"
              @change="handleChangeLastLogin"
              class="full-width"
              :default-time="defaultTime"
              :shortcuts="shortcuts"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('member.offlineDays')" class="full-width">
            <el-col :span="11">
              <el-form-item label="" prop="loqtMin" class="full-width">
                <el-input
                  v-model="queryParams.loqtMin"
                  :placeholder="$t('member.minValue')"
                  clearable
                  class="full-width"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2" style="text-align: center">-</el-col>
            <el-col :span="11">
              <el-form-item label="" prop="loqtMax" class="full-width">
                <el-input
                  v-model="queryParams.loqtMax"
                  :placeholder="$t('member.maxValue')"
                  clearable
                  class="full-width"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('member.loginTimes')" class="full-width">
            <el-col :span="11">
              <el-form-item label="" prop="loginTimesMain" class="full-width">
                <el-input
                  v-model="queryParams.loginTimesMain"
                  :placeholder="$t('member.minValue')"
                  clearable
                  class="full-width"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2" style="text-align: center">-</el-col>
            <el-col :span="11">
              <el-form-item label="" prop="loginTimesMax" class="full-width">
                <el-input
                  v-model="queryParams.loginTimesMax"
                  :placeholder="$t('member.maxValue')"
                  clearable
                  class="full-width"
                ></el-input>
                <span v-if="queryParams.loginTimesMain && maxValueHint" class="hint"
                  >* {{ $t('member.maxValueHint') }}</span
                >
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item
            :label="$t('member.memberLabelQuote')"
            prop="memberTagList"
            class="full-width"
          >
            <el-select
              v-model="queryParams.memberTagList"
              :placeholder="$t('member.pleaseSelect')"
              class="full-width"
              multiple
              clearable
              collapse-tags
              collapse-tags-tooltip
            >
              <el-option
                v-for="item in memberTagList"
                :key="item.id"
                :label="item.labelName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="full-width">
            <el-button type="primary" icon="Search" @click="handleQuery">{{
              $t('member.search')
            }}</el-button>
            <el-button icon="Refresh" @click="reset">{{ $t('member.reset') }}</el-button>
            <el-button icon="download" type="primary" @click="handleExport" class="exoport-btn">{{
              $t('member.export')
            }}</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table
      ref="tableRef"
      row-key="id"
      :data="allPlayerList"
      class="table-data-all"
      @selection-change="handleSelectionChange"
      @filter-change="handleFilterChange"
      :empty-text="$t('member.noData')"
    >
      <el-table-column type="selection" width="50" align="center" />
      <el-table-column
        :label="$t('member.userNameNoQuote')"
        align="center"
        prop="userName"
        width="180"
      >
        <template #default="{ row }">
          <div class="user-name">
            <span class="member-account" @click="goDetail(row)">{{
              row.userName ? row.userName : '-'
            }}</span>
            <span class="account-type">{{ filterLabel(accountList, row.type) }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.realNameNoQuote')"
        align="center"
        prop="realName"
        width="160"
      >
        <template #default="{ row }">
          <span>{{ row.realName ? row.realName : '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.nation')" align="center" prop="regNation" width="160">
      </el-table-column>
      <el-table-column
        :label="$t('member.agentNameNoQuote')"
        align="center"
        prop="parentName"
        width="160"
      >
        <template #default="{ row }">
          <span>{{ row.parentName ? row.parentName : '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        class-name="filter-icon"
        :label="$t('member.riskTierNoQuote')"
        align="center"
        prop="riskControlTierStr"
        width="160"
        column-key="riskControlTierList"
        :filters="riskList"
      >
        <template #default="{ row }">
          <span>{{ row.riskControlTierStr ? row.riskControlTierStr : '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        class-name="filter-icon"
        :label="$t('member.financeTierNoQuote')"
        align="center"
        prop="financeTierStr"
        width="160"
        column-key="financeTierList"
        :filters="financalList"
      >
        <template #default="{ row }">
          <span>{{ row.financeTierStr ? row.financeTierStr : '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        class-name="filter-icon"
        :label="$t('member.memberLabel')"
        align="center"
        prop="memberTag"
        width="160"
      >
        <template #default="{ row }">
          <span>{{ row.memberTag ? row.memberTag : '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        class-name="filter-icon"
        :label="$t('member.accountStatus')"
        align="center"
        prop="status"
        width="180"
        column-key="statusList"
        :filters="[
          { text: $t('member.regular'), value: '0' },
          { text: $t('member.loginLock'), value: '1' },
          { text: $t('member.rechargeWithdrawLock'), value: '2' },
          { text: $t('member.abandonWithdrawLock'), value: '3' },
          { text: $t('member.offerLock'), value: '4' },
          { text: $t('member.rebateLock'), value: '5' },
          { text: $t('member.gameLock'), value: '6' }
        ]"
      >
        <template #default="{ row }">
          <div v-if="row.status" style="display: flex; flex-wrap: wrap; justify-content: center">
            <el-tag
              v-for="(item, index) in row.status.split(',')"
              :key="index"
              :type="colorSwitch(item)"
              style="margin-right: 4px; margin-bottom: 4px"
            >
              {{ statusSwitchToLabel(item) }}
            </el-tag>
          </div>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
        class-name="filter-icon"
        :label="$t('member.vipLevelNoQuote')"
        align="center"
        prop="vipLevel"
        column-key="vipLevelList"
        width="160"
        :filters="[
          { text: 'VIP0', value: '0' },
          { text: 'VIP1', value: '1' },
          { text: 'VIP2', value: '2' },
          { text: 'VIP3', value: '3' },
          { text: 'VIP4', value: '4' },
          { text: 'VIP5', value: '5' },
          { text: 'VIP6', value: '6' },
          { text: 'VIP7', value: '7' },
          { text: 'VIP8', value: '8' },
          { text: 'VIP9', value: '9' },
          { text: 'VIP10', value: '10' },
          { text: 'VIP11', value: '11' }
        ]"
      >
      </el-table-column>
      <el-table-column
        class-name="filter-icon"
        :label="$t('member.isBindingPhoneNumber')"
        align="center"
        prop="mobile"
        width="160"
        :filter-multiple="false"
        column-key="bindMobileList"
        :filters="[
          { text: $t('member.unbinding'), value: '0' },
          { text: $t('member.binding'), value: '1' }
        ]"
      >
        <template #default="{ row }">
          <span>{{ row.mobile ? row.mobile : $t('member.unbinding') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.registerDomainNoQuote')"
        align="center"
        prop="regDomain"
        width="160"
      >
      </el-table-column>
      <el-table-column
        class-name="filter-icon"
        :label="$t('member.registerClientNoQuote')"
        align="center"
        prop="regClient"
        width="160"
        column-key="regClientList"
        :filters="[
          { text: 'PC', value: 1 },
          { text: $t('member.nativeIOS'), value: 2 },
          { text: $t('member.webPageIOS'), value: 3 },
          { text: 'IOSH5', value: 4 },
          { text: $t('member.nativeAndroid'), value: 5 },
          { text: $t('member.webPageAndroid'), value: 6 },
          { text: 'Android H5', value: 7 },
          { text: $t('member.unknow'), value: 9 }
        ]"
      >
        <template #default="{ row }">
          {{ filterLabel(clientList, row.regClient) }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.registerTimeNoQuote')"
        align="center"
        prop="regTime"
        width="160"
      >
        <template #default="{ row }">
          <span>{{ row.regTime ? row.regTime : '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.registerIPNoQuote')"
        align="center"
        prop="regIp"
        width="160"
      >
      </el-table-column>
      <el-table-column
        :label="$t('member.firstDepositTimeNoQuote')"
        align="center"
        prop="firstDpTime"
        width="160"
      >
        <template #default="{ row }">
          <span>{{ row.firstDpTime ? row.firstDpTime : '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.loginArea')"
        align="center"
        prop="lastLoginArea"
        width="160"
      >
      </el-table-column>
      <el-table-column
        :label="$t('member.lastLoginIP')"
        align="center"
        prop="lastLoginIp"
        width="160"
      >
      </el-table-column>
      <el-table-column
        :label="$t('member.lastLoginTimeNoQuote')"
        align="center"
        prop="lastLoginTime"
        width="160"
      >
        <template #default="{ row }">
          <span>{{ row.lastLoginTime ? row.lastLoginTime : '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.loginTimesNoQuote')"
        align="center"
        prop="loginTimes"
        width="160"
      >
      </el-table-column>
      <el-table-column
        :label="$t('member.offlineDaysNoQuote')"
        align="center"
        prop="offlineDays"
        width="160"
      >
      </el-table-column>
      <el-table-column :label="$t('member.remarkNoQuote')" align="center" prop="remark" width="160">
        <template #default="{ row }">
          <span>{{ row.remark ? row.remark : '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.accountOperate')"
        align="center"
        width="160"
        fixed="right"
      >
        <template #default="{ row }">
          <el-dropdown trigger="click" @command="handleCommand($event, row)" max-height="400">
            <span class="el-dropdown-link">
              {{ $t('member.handle') }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="item in row.statusList"
                  :command="item.labelValue"
                  :key="item.labelValue"
                >
                  {{ item.labelText }}
                </el-dropdown-item>
                <el-dropdown-item command="18">{{
                  $t('member.financeTierNoQuote')
                }}</el-dropdown-item>
                <el-dropdown-item command="19">{{ $t('member.riskTierNoQuote') }}</el-dropdown-item>
                <el-dropdown-item command="20">{{ $t('member.playerLabel') }}</el-dropdown-item>
                <el-dropdown-item command="21">{{ $t('member.kickOffline') }}</el-dropdown-item>
                <el-dropdown-item command="22">{{
                  $t('member.resetMessageTimes')
                }}</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
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
    <LabelEditDialog
      v-model:openLabel="openLabel"
      :cloneRow="cloneRow"
      v-if="openLabel"
      @freshlabel="getList"
    />
    <ChangeAccountStatus
      v-model:openStatus="openStatus"
      :cloneRow="cloneRow"
      :type="editType"
      v-if="openStatus"
      @freshfield="getList"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import i18n from '@/i18n'
import {
  getUserList,
  getCountrycodeList,
  updateMemberStatus,
  getLabelSelect,
  memberRestVerifyCode,
  memberKickOffline
} from '@/api/member/list/index'
import { filterLabel } from '@/utils/index'
import { getRiskFinancalList } from '@/api/risk/level/index'
import ChangeAccountStatus from './ChangeAccountStatus.vue'
import LabelEditDialog from './basicinfo/LabelEditDialog.vue'
import { defaultTime, shortcuts, clientList } from '@/utils/config'
import { statusSwitchToLabel, colorSwitch } from '../common/common'

const { proxy } = getCurrentInstance()
const router = useRouter()

const queryRef = ref(null)
const tableRef = ref(null)
const queryParams = ref({
  type: null, //账号类型
  userName: null, //会员账号
  realName: null, //会员姓名
  parentName: null, //上级代理
  mobile: null, //手机号
  regIp: null, //注册IP
  regDomain: null, //注册域名
  lastLoginIp: null, //最后登录IP
  remark: null, // 备注
  regNation: null, //国籍
  regTimeBegin: null, //注册开始时间
  regTimeEnd: null, //注册结束时间
  firstDpTimeBegin: null, //首存开始时间
  firstDpTimeEnd: null, //首存结束时间
  lastLoginTimeBegin: null, //最后登录开始时间
  lastLoginTimeEnd: null, //最后登录结束时间
  loqtMin: null, //离线天数最小值
  loqtMax: null, //离线天数最大值
  loginTimesMain: null, //登录次数最小值
  loginTimesMax: null, //登录次数最大值
  memberTagList: [], //会员标签
  pageNum: 1,
  pageSize: 10
})
const filterCondition = ref({}) //表格筛选条件存储的对象
const total = ref(0)
const allPlayerList = ref([])
const dateRange = ref([]) //注册时间
const dateRangeWithdraw = ref([]) //首存时间
const dateRangeLastLogin = ref([]) //最后登录时间
const accountList = ref([
  { label: i18n.global.t('member.normal'), value: '0' },
  { label: i18n.global.t('member.excellent'), value: '1' },
  { label: i18n.global.t('member.follow'), value: '2' }
])
const countryList = ref([]) //国籍列表
const memberTagList = ref([]) //会员标签列表
const riskList = ref([]) // 风控层级
const financalList = ref([]) //财务层级
const open = ref(false)
const openLabel = ref(false) //在所有玩家页面打开修改标签
const cloneRow = ref(null) //将当前列的标签信息传入
const openStatus = ref(false) //修改财务和风控等一些状态弹窗
const editType = ref(null) //修改会员的信息，每个字段有不同的类型
const maxValueHint = ref(false)
const isFirstLoad = ref(true); //是否首次加载

onMounted(async () => {
  if(isFirstLoad.value){
    await queryCountryList()
    await queryMemberTag()
    await queryRiskList()
    await queryFinancalList()
    await getList()
    isFirstLoad.value = false
  }
})
function getList() {
  return getUserList({
    ...queryParams.value,
    ...filterCondition.value
  }).then((res) => {
    allPlayerList.value = res.rows || []
    total.value = res.total || 0
  })
}
function queryCountryList() {
  return getCountrycodeList().then((res) => {
    countryList.value = res || []
  })
}
function queryMemberTag() {
  return getLabelSelect().then((res) => {
    memberTagList.value = res || []
  })
}
//查询风控层级
function queryRiskList() {
  return getRiskFinancalList(2).then((res) => {
    riskList.value = res || []
    riskList.value = filterLevel(riskList.value)
  })
}
//查询财务层级
function queryFinancalList() {
  return getRiskFinancalList(1).then((res) => {
    financalList.value = res || []
    financalList.value = filterLevel(financalList.value)
  })
}
function filterLevel(list) {
  list.forEach((item) => {
    item.text = item.layerName
    item.value = item.id
  })
  return list
}
const handleQuery = () => {
  // 登录次数必须同时填入最大、最小值
  if (queryParams.value.loginTimesMain && !queryParams.value.loginTimesMax && !maxValueHint.value) {
    maxValueHint.value = true
    return
  } else {
    maxValueHint.value = false
  }
  queryParams.value.pageNum = 1
  getList()
}
// 选择时间
function handleChange() {
  if ((dateRange.value && !dateRange.value.length) || dateRange.value == null) {
    queryParams.value.regTimeBegin = null
    queryParams.value.regTimeEnd = null
  } else {
    queryParams.value.regTimeBegin = dateRange.value[0]
    queryParams.value.regTimeEnd = dateRange.value[1]
  }
}
function handleChangeWithdraw() {
  if (
    (dateRangeWithdraw.value && !dateRangeWithdraw.value.length) ||
    dateRangeWithdraw.value == null
  ) {
    queryParams.value.firstDpTimeBegin = null
    queryParams.value.firstDpTimeEnd = null
  } else {
    queryParams.value.firstDpTimeBegin = dateRangeWithdraw.value[0]
    queryParams.value.firstDpTimeEnd = dateRangeWithdraw.value[1]
  }
}
function handleChangeLastLogin() {
  if (
    (dateRangeLastLogin.value && !dateRangeLastLogin.value.length) ||
    dateRangeLastLogin.value == null
  ) {
    queryParams.value.lastLoginTimeBegin = null
    queryParams.value.lastLoginTimeEnd = null
  } else {
    queryParams.value.lastLoginTimeBegin = dateRangeLastLogin.value[0]
    queryParams.value.lastLoginTimeEnd = dateRangeLastLogin.value[1]
  }
}
const handleExport = () => {
  proxy.download(
    '/system/member/user/export',
    {
      ...queryParams.value
    },
    `${i18n.global.t('member.memberAccountList')}${new Date().toLocaleDateString()}.xlsx`
  )
}
const reset = () => {
  queryRef.value.resetFields()
  dateRange.value = []
  dateRangeWithdraw.value = []
  dateRangeLastLogin.value = []
  handleChange()
  handleChangeWithdraw()
  handleChangeLastLogin()
  tableRef.value?.clearFilter()
  filterCondition.value = {}
}
const handleSelectionChange = (selection) => {
  console.log(selection)
}
//筛选条件，将条件存在全局变量
function handleFilterChange(val) {
  for (const key in val) {
    if (val.hasOwnProperty(key)) {
      filterCondition.value[key] = val[key]
    }
  }
  getList()
}
const goDetail = (row) => {
  router.push({
    path: '/member/detail-basic/info/' + row.userName,
    query: {
      tenantId: row.tenantId,
      userId: row.id
    }
  })
}
function handleCommand(val, row) {
  if (val === '18') {
    openStatus.value = true
    cloneRow.value = JSON.parse(JSON.stringify(row))
    editType.value = 'edit_member_finance_tier'
  } else if (val === '19') {
    openStatus.value = true
    cloneRow.value = JSON.parse(JSON.stringify(row))
    editType.value = 'edit_member_risk_control_tier'
  } else if (val === '20') {
    openLabel.value = true
    cloneRow.value = JSON.parse(JSON.stringify(row))
  } else if (val === '21') {
    console.log('调踢下线接口')
    memberKickOffline({
      memberId:row.id
    }).then(res=>{
      proxy.$modal.msgSuccess(i18n.global.t('member.operateSuccessfully'))
      getList()
    })
  } else if (val === '22') {
    if (!row.mobile) {
      proxy.$modal.msgWarning(i18n.global.t('member.noBindingPhoneNumber'))
      return
    }
    memberRestVerifyCode(row.id).then((res) => {
      proxy.$modal.msgSuccess(i18n.global.t('member.operateSuccessfully'))
      getList()
    })
  } else {
    updateMemberStatus({
      id: row.id,
      status: val
    }).then((res) => {
      proxy.$modal.msgSuccess(i18n.global.t('member.operateSuccessfully'))
      getList()
    })
  }
}
onActivated(()=>{
  !isFirstLoad.value && getList()
})
</script>

<style lang="scss" scoped>
.all-player {
  .table-data-all {
    :deep() {
      .filter-icon .el-icon svg {
        display: none;
      }
      .filter-icon .el-icon {
        content: url('../../../../assets/icons/svg/filter.svg') !important;
      }
    }
  }
  .user-name {
    padding: 12px 0;
    .member-account {
      cursor: pointer;
      color: skyblue;
      margin-right: 8px;
    }
    .account-type {
      font-size: 12px;
      color: rgba(245, 34, 45, 0.498);
      position: absolute;
      top: 12px;
    }
  }
  .hint {
    position: relative;
    z-index: 1000;
    color: red;
    margin-bottom: -25px;
  }
}
</style>
