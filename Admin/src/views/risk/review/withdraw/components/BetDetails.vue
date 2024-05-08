<template>
  <div class="dialog-bet-detail app-container" v-loading="loading">
    <el-form
      :model="queryParams"
      ref="queryRef"
      :inline="true"
      label-width="90px"
      :rules="rules"
    >
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="" class="full-width">
            <el-col :span="8" style="padding-right: 0">
              <el-form-item prop="businessType" class="full-width">
                <el-select
                  v-model="queryParams.businessType"
                  :placeholder="$t('risk.pleaseSelect')"
                  clearable
                >
                  <el-option
                    v-for="dict in option1"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="16" style="padding-left: 0">
              <el-form-item class="full-width">
                <el-date-picker
                  v-model="dateRange"
                  value-format="YYYY-MM-DD HH:mm:ss"
                  type="datetimerange"
                  range-separator="-"
                  :start-placeholder="$t('risk.beginTime')"
                  :end-placeholder="$t('risk.endTime')"
                  :default-time="defaultTime"
                  :shortcuts="shortcuts"
                  @change="handleChange"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('risk.betNo')" prop="orderNo" class="full-width">
            <el-input
              v-model="queryParams.orderNo"
              :placeholder="$t('risk.pleaseInput')"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('risk.thirdPartyOrderNumber')" prop="thirdOrderNo" class="full-width">
            <el-input
              v-model="queryParams.thirdOrderNo"
              :placeholder="$t('risk.pleaseInput')"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            :label="$t('risk.lobbyCodeList')"
            prop="lobbyCodeList"
            class="full-width"
          >
            <el-select
              v-model="queryParams.lobbyCodeList"
              multiple
              collapse-tags
              collapse-tags-tooltip
              :placeholder="$t('risk.pleaseSelect')"
              class="full-width"
            >
              <el-option
                v-for="item in lobby_code"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('risk.gameName')" prop="gameName" class="full-width">
            <el-input
              v-model="queryParams.gameName"
              :placeholder="$t('risk.pleaseInput')"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('risk.betStatus')" prop="statusList" class="full-width">
            <el-select
              v-model="queryParams.statusList"
              multiple
              :placeholder="$t('risk.pleaseSelect')"
              clearable
              collapse-tags
              collapse-tags-tooltip
              class="full-width"
            >
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('risk.leagueNo')" prop="leagueNo" class="full-width">
            <el-input
              v-model="queryParams.leagueNo"
              :placeholder="$t('risk.pleaseInput')"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('risk.betIP')" prop="betIp" class="full-width">
            <el-input
              v-model="queryParams.betIp"
              :placeholder="$t('risk.pleaseInput')"
              clearable
            />
          </el-form-item>
        </el-col>
        <!-- <el-col :span="6">
          <el-form-item label="联赛名称" prop="leagueName" class="full-width">
            <el-input
              v-model="queryParams.leagueName"
              placeholder="针对体育注单,输入英文"
              clearable
            />
          </el-form-item>
        </el-col> -->
        <el-col :span="6">
          <el-form-item
            :label="$t('risk.preSettleType')"
            prop="preSettleType"
            class="full-width"
          >
            <el-select
              v-model="queryParams.preSettleType"
              :placeholder="$t('risk.pleaseSelect')"
              clearable
              class="full-width"
            >
              <el-option
                v-for="dict in option"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            :label="$t('risk.lobbyTypeNoQuote')"
            prop="lobbyTypeList"
            class="full-width"
          >
            <el-select
              v-model="queryParams.lobbyTypeList"
              multiple
              collapse-tags
              collapse-tags-tooltip
              :placeholder="$t('risk.pleaseSelect')"
              class="full-width"
            >
              <el-option
                v-for="dict in lobby_type"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-button type="primary" icon="Search" @click="handleQuery"
            >{{ $t('risk.search') }}</el-button
          >
          <el-button icon="Refresh" @click="resetQuery">{{ $t('risk.reset') }}</el-button>
          <el-button type="primary" icon="Search" @click="handleExport"
            >{{ $t('risk.export') }}</el-button
          >
        </el-col>
      </el-row>
    </el-form>
    <div class="table-head">
      <div class="head-item">
        <div>
          {{ $t('risk.totalOrderAmount') }}<span>{{ totalOrderAmount }}</span>
        </div>
        <div>
          {{ $t('risk.totalPayOutAmount') }}<span>{{ totalPayOutAmount }}</span>
        </div>
      </div>
      <div class="head-item">
        <div>
          {{ $t('risk.totalBetAmount') }}<span>{{ totalBetAmount }}</span>
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
    <el-table :data="tableData" :empty-text="$t('risk.noData')">
      <el-table-column
        :label="$t('risk.orderNoAndThirdOrderNo')"
        prop="moduleorder"
        :show-overflow-tooltip="true"
        align="center"
        width="180"
      >
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
        width="180"
      >
        <template #default="scope">
          <div v-if="scope.row.betTime">{{ parseTime(scope.row.betTime) }}</div>
          <div v-else>--</div>
          <div v-if="scope.row.settleTime">
            {{ parseTime(scope.row.settleTime) }}
          </div>
          <div v-else>--</div>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('risk.userNameAndGameAccount')"
        prop="operator"
        align="center"
        :show-overflow-tooltip="true"
        width="150"
      >
        <template #default="scope">
          <div v-if="scope.row.userName">{{ scope.row.userName }}</div>
          <div v-else>--</div>
          <div v-if="scope.row.gameAccount">{{ scope.row.gameAccount }}</div>
          <div v-else>--</div>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('risk.lobbyNameAndGameName')"
        align="center"
        prop=""
        width="180"
      >
        <template #default="scope">
          <div v-if="scope.row.lobbyName">{{ scope.row.lobbyName }}</div>
          <div v-else>--</div>
          <div v-if="scope.row.gameName">{{ scope.row.gameName }}</div>
          <div v-else>--</div>
        </template>
      </el-table-column>

      <el-table-column :label="$t('risk.competionIDAnd')" align="center" prop="leagueNo">
      </el-table-column>
      <el-table-column :label="$t('risk.betContent')" prop="" align="center" width="200">
        <template #default="scope">
          <!-- 体育和电竞 -->
          <div
            v-if="
              scope.row.lobbyType == 'SPORTS' || scope.row.lobbyType == 'GAMING'
            "
          >
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
                <span v-if="item && item.optionName">{{
                  item.optionName
                }}</span>
                <span v-if="(item && item.oddsFormat) || (item && item.betOdds)"
                  >({{ item.betOdds }})</span
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
              <span><text>{{ $t('risk.play') }}</text>{{ item.playName }}<text>,</text></span>
              <span><text>{{ $t('risk.location') }}</text>--<text>,</text></span>
              <span
                ><text>{{ $t('risk.numner') }}</text>{{ item.gameRoundNo }}<text>,</text></span
              >
              <span
                ><text>{{ $t('risk.betMultiple') }}</text>{{ item.betMultiple }}<text>,</text></span
              >
              <span
                ><text>{{ $t('risk.resultCompetion') }}</text>{{ item.ticketResult
                }}<text>,</text></span
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
      <el-table-column :label="$t('risk.winLoseResult')" prop="betResultDesc" align="center" width="120">
        <template #default="scope">
          {{ scope.row.betResultDesc }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('risk.followTimes')" prop="followTimes" align="center">
        <template #default="scope">
          <span class="text-color" @click="handleClick(scope.row)"
            >{{ scope.row.followTimes }}</span
          >
        </template>
      </el-table-column>
      <el-table-column :label="$t('risk.betAmountAndSettleAmount')" prop="" align="center">
        <template #default="scope">
          <div v-if="scope.row.orderAmount || scope.row.orderAmount == 0">
            {{ scope.row.orderAmount }}
          </div>
          <div v-else>--</div>

          <div v-if="scope.row.settleAmount || scope.row.settleAmount == 0">
            {{ scope.row.settleAmount }}
          </div>
          <div v-else>--</div>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('risk.betAmountAndValidBet')"
        prop="stadgname"
        align="center"
      >
        <template #default="scope">
          <div v-if="scope.row.betAmount || scope.row.betAmount == 0">
            {{ scope.row.betAmount }}
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
        align="center"
      >
        <template #default="scope">
          <div v-if="scope.row.platformWin">{{ scope.row.platformWin }}</div>
          <div v-else>--</div>
          <div v-if="scope.row.platformSiphon">
            {{ scope.row.platformSiphon }}
          </div>
          <div v-else>--</div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('risk.betIP')" prop="betIp" align="center" width="150" />
      <!-- <el-table-column :label="$t('risk.userID')" prop="gameAccount" align="center" width="150" /> -->
      <!-- <el-table-column label="单场赔率" prop="" align="center" />
      <el-table-column label="下注内容" prop="" align="center" />
      <el-table-column label="盘口" prop="" align="center" />
      <el-table-column label="总赔率" prop="" align="center" /> -->
      <el-table-column :label="$t('risk.IsPreSettleType')" prop="preSettleType" align="center" width="110">
        <template #default="scope">
          <div v-if="scope.row.preSettleType == '0'">{{ $t('risk.UnpreSettleType') }}</div>
          <div v-else-if="scope.row.preSettleType == '1'">{{ $t('risk.preSettleType') }}</div>
          <div v-else>--</div>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('risk.syncTime')"
        prop="syncTime"
        align="center"
        width="180"
      />
      <el-table-column :label="$t('risk.remarkNoQuote')" prop="comment" align="center">
        <template #default="{row}">
         <span>{{ row.comment||"-" }}</span>
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
  </div>
</template>
<script setup name="">
import i18n from "@/i18n";
import { useRouter } from "vue-router";
import { defaultTime, shortcuts } from "@/utils/config";
import { getRecordList } from "@/api/game/gamebet";

const props = defineProps(["userName"]);
const router = useRouter();
const { proxy } = getCurrentInstance();
const {  lobby_code, lobby_type } = proxy.useDict(
  "lobby_code",
  "lobby_type"
);
const dateRange = ref([]);
const tableData = ref([]);
const total = ref(0);
const loading = ref(false);
const totalOrderAmount = ref("");
const totalPayOutAmount = ref("");
const totalBetAmount = ref("");
const totalValidBetAmount = ref("");
const totalProfitAmount = ref("");
const totalSiphonAmount = ref("");

const option = [
{
    value: false,
    label: i18n.global.t("risk.UnpreSettleType"),
  },
  {
    value: true,
    label: i18n.global.t("risk.preSettleType"),
  },
];
const option1 = [
  {
    value: 1,
    label: i18n.global.t("risk.betTimeNoQuote"),
  },
  {
    value: 2,
    label: i18n.global.t("risk.dispatchBonus"),
  },
  {
    value: 3,
    label: i18n.global.t("risk.syncTime"),
  },
];

const options2 = [
  {
    value: "1",
    label: i18n.global.t("risk.unSettled"),
  },
  {
    value: "2",
    label: i18n.global.t("risk.settled"),
  },
  {
    value: "3",
    label: i18n.global.t("risk.cancelled"),
  },
  {
    value: "4",
    label: i18n.global.t("risk.invalidOrder"),
  },
];
const nqtList = ref([
  {
    value: "1",
    label: i18n.global.t("risk.betNo"),
  },
  {
    value: "2",
    label: i18n.global.t("risk.thirdPartyOrderNumber"),
  },
]);

const queryParams = ref({
  startTime:null,
  endTime:null,
  pageNum: 1,
  pageSize: 10,
  memberName: props.userName,
  orderNo: null, // 订单号
  thirdOrderNo:null, //三方订单号
  businessType: null, //聚合查询 时间类
  lobbyCodeList: [], //场馆平台
  gameName: null, //场馆游戏
  statusList: [], //注单状态
  leagueNo: null, //赛事id
  betIp: null, //下注IP
  leagueName: null, //联赛名称
  preSettleType: null, //提前结算
  lobbyTypeList: [], //场馆类型
});
const rules = ref({
  leagueName:[{pattern: /^[a-zA-Z]+$/,message:i18n.global.t("risk.pleaseInputEnglishForSportBetNo"),trigger:"blur"}]
})

onMounted(()=>{
  getList();
})
/** 查询角色列表 */
function getList() {
  loading.value = true;
  getRecordList(queryParams.value)
    .then((res) => {
      loading.value = false;
      tableData.value = res.pageList.records || [];
      total.value = res.pageList.total;
      totalOrderAmount.value = res.totalOrderAmount;
      totalPayOutAmount.value = res.totalPayOutAmount;
      totalBetAmount.value = res.totalBetAmount;
      totalValidBetAmount.value = res.totalValidBetAmount;
      totalProfitAmount.value = res.totalProfitAmount;
      totalSiphonAmount.value = res.totalSiphonAmount;
    })
    .catch(() => {
      loading.value = false;
    });
}
function handleChange() {
  if ((dateRange.value && !dateRange.value.length) || dateRange.value == null) {
    queryParams.value.startTime = null;
    queryParams.value.endTime = null;
  } else {
    queryParams.value.startTime = dateRange.value[0];
    queryParams.value.endTime = dateRange.value[1];
  }
}
/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}
/** 重置按钮操作 */
function resetQuery() {
  dateRange.value = [];
  handleChange();
  proxy.resetForm("queryRef");
}
// 导出
function handleExport() {
  proxy.download(
    "/system/live/stream/export",
    {},
    `注单详情_${new Date().toLocaleString()}.xlsx`
  );
}
// 点击跟单次数跳转
function handleClick(row) {
  router.push({
    path: "/game/copytimes",
    query: { id: row.orderNo },
  });
}
</script>

<style lang="scss" scoped>
.dialog-bet-detail {
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
}
</style>
