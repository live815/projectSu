<template>
  <div class="app-container" v-loading="loading">
    <el-form :model="queryParams" ref="queryRef" v-show="showSearch" :inline="true" label-width="">
      <!-- 下注时间 -->
      <el-form-item label="" prop="businessType">
        <div class="box-head">
          <el-input placeholder="" class="input-with-select">
            <template #prepend>
              <el-select v-model="queryParams.businessType" placeholder="" clearable>
                <el-option
                  v-for="dict in option1"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value" />
              </el-select>
            </template>
            <template #append>
              <el-date-picker
                v-model="dateRange"
                value-format="YYYY-MM-DD HH:mm:ss"
                type="datetimerange"
                range-separator="-"
                :start-placeholder="$t('member.beginTime')"
                :end-placeholder="$t('member.endTime')"
                @change="handleChange"
                :default-time="defaultTime">
              </el-date-picker>
            </template>
          </el-input>
        </div>
      </el-form-item>
      <!-- 会员账号 -->
      <el-form-item label="" prop="">
        <el-input
          v-model="input1"
          :placeholder="$t('member.pleaseInput')"
          class="input-with-select"
          @change="changeInput">
          <template #prepend>
            <el-select v-model="select1" placeholder="" @change="handleSelect1">
              <el-option :label="$t('member.userNameNoQuote')" value="1" />
              <el-option :label="$t('member.gameAccountNoQuote')" value="2" />
            </el-select>
          </template>
        </el-input>
      </el-form-item>
      <!-- 注单号 -->
      <el-form-item label="" prop="">
        <el-input
          v-model="input2"
          :placeholder="$t('member.pleaseInput')"
          class="input-with-select"
          @change="changeInput2">
          <template #prepend>
            <el-select v-model="select2" placeholder="" @change="handleSelect2">
              <el-option :label="$t('risk.betNo')" value="1" />
              <el-option :label="$t('risk.thirdPartyOrderNumber')" value="2" />
            </el-select>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('risk.lobbyCodeList1')" prop="lobbyCodeList">
        <el-select
          v-model="queryParams.lobbyCodeList"
          multiple
          clearable
          collapse-tags
          collapse-tags-tooltip
          :placeholder="$t('member.pleaseSelect')">
          <el-option
            v-for="item in lobby_code"
            :key="item.value"
            :label="item.label"
            :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('risk.gameName1')" prop="gameName">
        <el-input
          v-model="queryParams.gameName"
          :placeholder="$t('member.pleaseInput')"
          clearable
          @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item :label="$t('risk.betStatus1')" prop="statusList">
        <el-select
          v-model="queryParams.statusList"
          multiple
          clearable
          collapse-tags
          collapse-tags-tooltip
          :placeholder="$t('member.pleaseSelect')">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('risk.leagueNo1')" prop="leagueNo">
        <el-input
          v-model="queryParams.leagueNo"
          :placeholder="$t('member.pleaseInput')"
          clearable
          @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item :label="$t('risk.betIP1')" prop="betIp">
        <el-input
          v-model="queryParams.betIp"
          :placeholder="$t('member.pleaseInput')"
          clearable
          @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item :label="$t('risk.leagueName1')" prop="leagueName">
        <el-input
          v-model="queryParams.leagueName"
          :placeholder="$t('risk.pleaseInputLetterForSportBetNo')"
          clearable
          @keyup.enter="handleQuery" />
      </el-form-item>

      <el-form-item :label="$t('risk.preSettleType1')" prop="preSettleType">
        <el-select
          v-model="queryParams.preSettleType"
          :placeholder="$t('member.pleaseSelect')"
          clearable>
          <el-option
            v-for="dict in option"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('risk.coinTypeQuote')" prop="currencyCode">
        <el-select
          v-model="queryParams.currencyCode"
          multiple
          clearable
          collapse-tags
          collapse-tags-tooltip
          :placeholder="$t('member.pleaseSelect')">
          <el-option
            v-for="item in currency_code"
            :key="item.value"
            :label="item.label"
            :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('risk.lobbyType')" prop="lobbyTypeList">
        <el-select
          v-model="queryParams.lobbyTypeList"
          multiple
          clearable
          collapse-tags
          collapse-tags-tooltip
          :placeholder="$t('member.pleaseSelect')">
          <el-option
            v-for="dict in lobby_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">{{
          $t('risk.search')
        }}</el-button>
        <el-button icon="Refresh" @click="resetQuery">{{ $t('risk.reset') }}</el-button>
        <el-button type="primary" icon="download" @click="handleExport" :loading="btnLoading">{{
          $t('risk.export')
        }}</el-button>
      </el-form-item>
    </el-form>
    <div class="table-head">
      <div class="head-item">
        <div>
          {{ $t('risk.totalOrderAmount') }}<span>{{ totalBetAmount }}</span>
        </div>
        <div>
          {{ $t('risk.totalPayOutAmount') }}<span>{{ totalPayOutAmount }}</span>
        </div>
      </div>
      <div class="head-item">
        <div>
          {{ $t('risk.totalBetAmount') }}<span>{{ totalOrderAmount }}</span>
        </div>
        <div>
          {{ $t('risk.totalValidBetAmount') }}<span>{{ totalValidBetAmount }}</span>
        </div>
      </div>
      <div class="head-item">
        <div>
          {{ $t('risk.totalProfitAmount') }}<span>{{ totalProfitAmount }}</span>
        </div>
        <div>
          {{ $t('risk.totalSiphonAmount') }}<span>{{ totalSiphonAmount }}</span>
        </div>
      </div>
    </div>

    <!-- 表格数据 -->
    <el-table
      :data="tableData"
      class="game-bet-record"
      :empty-text="$t('member.noData')"
      :max-height="maxHeight">
      <el-table-column
        :label="$t('risk.orderNoAndThirdOrderNo')"
        prop="moduleorder"
        :show-overflow-tooltip="true"
        align="center"
        width="180">
        <template #default="scope">
          <div v-if="scope.row.orderNo">{{ scope.row.orderNo }}</div>
          <div v-else>--</div>

          <div v-if="scope.row.thirdOrderNo">{{ scope.row.thirdOrderNo }}</div>
          <div v-else>--</div>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('risk.betTimeAndSettleTime')"
        prop=""
        :show-overflow-tooltip="true"
        align="center"
        width="180">
        <template #default="scope">
          <div v-if="scope.row.betTime">{{ scope.row.betTime }}</div>
          <div v-else>--</div>
          <div v-if="scope.row.settleTime">
            {{ scope.row.settleTime }}
          </div>
          <div v-else>--</div>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('risk.userNameAndGameAccount')"
        prop="operator"
        align="center"
        :show-overflow-tooltip="true"
        width="150">
        <template #default="scope">
          <div v-if="scope.row.userName">{{ scope.row.userName }}</div>
          <div v-else>--</div>
          <div v-if="scope.row.gameAccount">{{ scope.row.gameAccount }}</div>
          <div v-else>--</div>
        </template>
      </el-table-column>

      <el-table-column :label="$t('risk.lobbyNameAndGameName')" align="center" prop="" width="180">
        <template #default="scope">
          <div v-if="scope.row.lobbyName">{{ scope.row.lobbyName }}</div>
          <div v-else>--</div>
          <div v-if="scope.row.gameName">{{ scope.row.gameName }}</div>
          <div v-else>--</div>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('risk.competionIDAnd')"
        align="center"
        prop="leagueNo"
        width="180px">
        <!-- <template #default="scope">
          <div v-if="scope.row.lobbyType == 'SPORTS'">
            <div v-for="item in scope.row.betContentList">
              {{ item.tournamentId }}
            </div>
          </div>
          <div v-else>
            <div v-for="item in scope.row.betContentList">
              {{ item.gameRoundNo }}
            </div>
          </div>
        </template> -->
      </el-table-column>
      <el-table-column :label="$t('risk.betContent')" prop="" align="center" width="200">
        <template #default="scope">
          <!-- 体育和电竞 -->
          <div v-if="scope.row.lobbyType == 'SPORTS' || scope.row.lobbyType == 'GAMING'">
            <div class="betbox" v-for="item in scope.row.betContentList">
              <div>{{ item.tournamentName }}</div>
              <div>{{ item.hostVsGuest }}</div>
              <div v-if="item.cashOutFlag || item.matchTime">
                <span v-if="item.cashOutFlag == true">{{ $t('risk.preSettleType') }}</span>
                <span v-if="item.cashOutFlag == false">{{ $t('risk.UnpreSettleType') }}</span>
                <span class="betbox-one">{{ item.matchTime }}</span>
              </div>
              <div>
                <span v-if="item && item.playName">{{ item.playName }}</span>
                <span v-if="item && item.optionName">{{ item.optionName }}</span>
                <span v-if="(item && item.oddsFormat) || (item && item.betOdds)"
                  >({{ betCountry(item.oddsFormat) }} {{ item.betOdds }})</span
                >
              </div>
            </div>
          </div>

          <!-- 真人 -->
          <div v-if="scope.row.lobbyType == 'REAL'">
            <div class="betbox" v-for="item in scope.row.betContentList">
              <span>{{ $t('risk.playName') }}{{ item.playName }}</span>
              <span>{{ $t('risk.gameRoundNo') }}{{ item.gameRoundNo }}</span>
            </div>
          </div>
          <!-- 彩票 -->
          <div v-if="scope.row.lobbyType == 'LOTTERY'">
            <div class="betbox" v-for="item in scope.row.betContentList">
              <span
                ><text>{{ $t('risk.play') }}</text
                >{{ item.playName }}<text>,</text></span
              >
              <span
                ><text>{{ $t('risk.location') }}</text
                >--<text>,</text></span
              >
              <span
                ><text>{{ $t('risk.numner') }}</text
                >{{ item.gameRoundNo }}<text>,</text></span
              >
              <span
                ><text>{{ $t('risk.betMultiple') }}</text
                >{{ item.betMultiple }}<text>,</text></span
              >
              <span
                ><text>{{ $t('risk.resultCompetion') }}</text
                >{{ item.ticketResult }}<text>,</text></span
              >
            </div>
          </div>
          <!-- 棋牌 -->
          <div v-if="scope.row.lobbyType == 'POKER'">--</div>
          <!-- 电子 -->
          <div v-if="scope.row.lobbyType == 'SLOT'">--</div>
        </template>
      </el-table-column>

      <el-table-column :label="$t('risk.betStatus')" prop="status" align="center">
        <template #default="scope">
          <span v-if="scope.row.status == '1'">{{ $t('risk.unSettled') }}</span>
          <span v-if="scope.row.status == '2'">{{ $t('risk.settled') }}</span>
          <span v-if="scope.row.status == '3'">{{ $t('risk.cancelled') }}</span>
          <span v-if="scope.row.status == '4'">{{ $t('risk.invalidOrder') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('risk.winLoseResult')"
        prop="betResultDesc"
        align="center"
        width="150px">
        <template #default="scope">
          {{ scope.row.betResultDesc }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('risk.followTimes')" prop="followTimes" align="center">
        <template #default="scope">
          <span class="text-color" @click="handleClick(scope.row)">{{
            scope.row.followTimes
          }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('risk.betAmountAndSettleAmount')" prop="" align="center">
        <template #default="scope">
          <div v-if="scope.row.betAmount || scope.row.betAmount == 0">
            {{ scope.row.betAmount }}
          </div>
          <div v-else>--</div>

          <div v-if="scope.row.settleAmount || scope.row.settleAmount == 0">
            {{ scope.row.settleAmount }}
          </div>
          <div v-else>--</div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('risk.betAmountAndValidBet')" prop="stadgname" align="center">
        <template #default="scope">
          <div v-if="scope.row.orderAmount || scope.row.orderAmount == 0">
            {{ scope.row.orderAmount }}
          </div>
          <div v-else>--</div>

          <div v-if="scope.row.validBet || scope.row.validBet == 0">
            {{ scope.row.validBet }}
          </div>
          <div v-else>--</div>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('risk.platformWinAndplatformSiphon')"
        prop="stadgname"
        align="center">
        <template #default="scope">
          <div v-if="scope.row.platformWin || scope.row.platformWin == 0">
            {{ scope.row.platformWin }}
          </div>
          <div v-else>--</div>
          <div v-if="scope.row.platformSiphon || scope.row.platformSiphon == 0">
            {{ scope.row.platformSiphon }}
          </div>
          <div v-else>--</div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('risk.betIP')" prop="betIp" align="center" width="150">
        <template #default="scope">
          <span v-if="scope.row.betIp"> {{ scope.row.betIp }}</span>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <!-- <el-table-column
        :label="$t('risk.userID')"
        prop="gameAccount"
        align="center"
        width="150"
      /> -->
      <!-- <el-table-column label="单场赔率" prop="" align="center" /> -->
      <!-- <el-table-column label="下注内容" prop="" align="center" /> -->
      <!-- <el-table-column label="盘口" prop="" align="center" /> -->
      <!-- <el-table-column label="总赔率" prop="totalOdds" align="center" /> -->
      <el-table-column
        :label="$t('risk.IsPreSettleType')"
        prop="preSettleType"
        align="center"
        width="120">
        <template #default="scope">
          <div v-if="scope.row.preSettleType == '0'">
            {{ $t('risk.UnpreSettleType') }}
          </div>
          <div v-else-if="scope.row.preSettleType == '1'">
            {{ $t('risk.preSettleType') }}
          </div>
          <div v-else>--</div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('risk.syncTime')" prop="syncTime" align="center" width="180" />
      <el-table-column :label="$t('risk.remarkNoQuote')" prop="comment" align="center">
        <template #default="scope">
          <div v-if="scope.row.comment">{{ scope.row.comment }}</div>
          <div v-else>--</div>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList" />
  </div>
</template>
<script setup name="Betrecord">
import i18n from '@/i18n'
import { useRouter } from 'vue-router'
import { getRecordList } from '@/api/game/gamebet'
import { defaultTime } from '@/utils/config'
import { onMounted, onUnmounted } from 'vue'
import { freshMaxHeight } from '@/utils/index'

const router = useRouter()
const { proxy } = getCurrentInstance()
const { sys_normal_disable, lobby_code, currency_code, lobby_type } = proxy.useDict(
  'sys_normal_disable',
  'lobby_code',
  'lobby_type',
  'currency_code'
)
const dateRange = ref([])
const showSearch = ref(true)
const select1 = ref('1')
const select2 = ref('1')
const input1 = ref('')
const input2 = ref('')
const tableData = ref([])
const total = ref(0)
const loading = ref(true)
const totalOrderAmount = ref('')
const totalPayOutAmount = ref('')
const totalBetAmount = ref('')
const totalValidBetAmount = ref('')
const totalProfitAmount = ref('')
const totalSiphonAmount = ref('')
const maxHeight = ref(null) //表格最大高度
const btnLoading = ref(false)
const isFirstLoad = ref(true) //是否首次加载

const option = [
  {
    value: false,
    label: i18n.global.t('risk.UnpreSettleType')
  },
  {
    value: true,
    label: i18n.global.t('risk.preSettleType')
  }
]
const option1 = [
  {
    value: 1,
    label: i18n.global.t('risk.betTimeNoQuote')
  },
  {
    value: 2,
    label: i18n.global.t('risk.dispatchBonus')
  },
  {
    value: 3,
    label: i18n.global.t('risk.syncTime')
  }
]

const options2 = [
  {
    value: '1',
    label: i18n.global.t('risk.unSettled')
  },
  {
    value: '2',
    label: i18n.global.t('risk.settled')
  },
  {
    value: '3',
    label: i18n.global.t('risk.cancelled')
  },
  {
    value: '4',
    label: i18n.global.t('risk.invalidOrder')
  }
]

const data = reactive({
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    businessType: 1
  }
})
const { queryParams } = toRefs(data)

/** 查询角色列表 */
function getList() {
  loading.value = true
  return getRecordList(queryParams.value)
    .then((res) => {
      loading.value = false
      tableData.value = res.pageList.records || []
      total.value = res.pageList.total
      totalOrderAmount.value = res.totalOrderAmount
      totalPayOutAmount.value = res.totalPayOutAmount
      totalBetAmount.value = res.totalBetAmount
      totalValidBetAmount.value = res.totalValidBetAmount
      totalProfitAmount.value = res.totalProfitAmount
      totalSiphonAmount.value = res.totalSiphonAmount
    })
    .catch(() => {
      // proxy.$modal.msgError('123')
      loading.value = false
    })
}
// 选择时间
function handleChange() {
  if ((dateRange.value && !dateRange.value.length) || dateRange.value == null) {
    queryParams.value.startTime = null
    queryParams.value.endTime = null
  } else {
    queryParams.value.startTime = dateRange.value[0]
    queryParams.value.endTime = dateRange.value[1]
  }
}
// 会员账号
function handleSelect1(val) {
  select1.value = val
  input1.value = ''
}
// 注单号
function handleSelect2(val) {
  select2.value = val
  input2.value = ''
}

// 输入框改变
function changeInput(val) {
  if (select1.value == '2') {
    queryParams.value.gameAccount = val
    queryParams.value.memberName = null
  } else if (select1.value == '1') {
    queryParams.value.memberName = val
    queryParams.value.gameAccount = null
  }
}
// 输入框改变
function changeInput2(val) {
  if (select2.value == '1') {
    queryParams.value.orderNo = val
    queryParams.value.thirdOrderNo = null
  } else if (select2.value == '2') {
    queryParams.value.orderNo = null
    queryParams.value.thirdOrderNo = val
  }
}

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1
  getList()
}
/** 重置按钮操作 */
function resetQuery() {
  select1.value = '1'
  select2.value = '1'
  input1.value = ''
  input2.value = ''
  dateRange.value = []
  queryParams.value = {
    pageNum: 1,
    pageSize: 10,
    businessType: 1
  }
  handleChange()
  proxy.resetForm('queryRef')
  handleQuery()
}
// 导出
function handleExport() {
  if (
    !queryParams.value.businessType ||
    (dateRange.value && !dateRange.value.length) ||
    dateRange.value == null
  ) {
    proxy.$modal.msgWarning(i18n.global.t('risk.businessTypeAndStartEndTime'))
    return
  }
  btnLoading.value = true
  proxy
    .download(
      '/system/api/game/record/export',
      { ...queryParams.value },
      `${i18n.global.t('risk.allPlatformBetRecord')}${new Date().toDateString()}.xlsx`
    )
    .then((res) => {
      console.log(1234)
      btnLoading.value = false
    })
    .catch((_) => {
      btnLoading.value = false
    })
}
// 点击跟单次数跳转
function handleClick(row) {
  // console.log(row.orderNo, "000");
  router.push({
    path: '/game/copytimes',
    query: { id: row.thirdOrderNo, orderNo: row.orderNo }
  })
}
onMounted(async () => {
  if (isFirstLoad.value) {
    await getList()
    isFirstLoad.value = false // 首次加载后修改标志
  }
  setMaxHeight()
  window.addEventListener('resize', setMaxHeight)
})
function setMaxHeight() {
  maxHeight.value = freshMaxHeight('.game-bet-record', 95)
}
onBeforeUnmount(() => {
  window.removeEventListener('resize', setMaxHeight)
})
onActivated(() => {
  !isFirstLoad.value && getList()
  setMaxHeight()
  window.addEventListener('resize', setMaxHeight)
})
onDeactivated(() => {
  window.removeEventListener('resize', setMaxHeight)
})

const betCountry = (val) => {
  switch (val) {
    case '1':
      return '欧盘'

    case '2':
      return '港盘'
    case '3':
      return '马来盘'
    case '4':
      return '印尼盘'

    default:
      break
  }
}
</script>

<style lang="scss" scoped>
.table-head {
  background-color: #f0f1fa;
  padding: 12px 16px;
  display: flex;
  box-sizing: content-box;
  font-size: 12px;
  .head-item {
    border: 0.5px solid #59b9ff;
    margin-right: 30px;
    border-radius: 5px;
    padding: 8px 10px;
    background-color: #e2f1ff;
  }
}
:deep() .el-table .cell {
  white-space: pre-wrap;
}
.box-head {
  :deep(.el-input-group--append > .el-input__wrapper) {
    display: none;
  }
  :deep(.el-input-group__append) {
    padding: 0;
  }
}
.text-color {
  color: #1890ff;
}
.betbox {
  margin-bottom: 16px;
  font-size: 12px;
  .betbox-one {
    color: #9f9f9f;
  }
  span {
    display: inline-block;
    margin-right: 8px;
  }
}
</style>
