<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-form-item :label="$t('report.chooseDateTime')" class="full-width">
            <el-date-picker
              v-model="dateRange"
              value-format="YYYY-MM-DD HH:mm:ss"
              type="datetimerange"
              range-separator="-"
              :start-placeholder="$t('member.beginTime')"
              :end-placeholder="$t('member.endTime')"
              @change="handleChange"
              :default-time="defaultTime"
              :shortcuts="shortcuts"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('member.userName')" prop="memberName" class="full-width">
                <el-input
                  v-model="queryParams.memberName"
                  :placeholder="$t('member.pleaseInput')"
                  clearable
                >
                </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('agent.agentAccountQuote')" prop="parentName" class="full-width">
                <el-input
                  v-model="queryParams.parentName"
                  :placeholder="$t('member.pleaseInput')"
                  clearable
                >
                </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('report.platform')" prop="lobbyCodeList" class="full-width">
            <el-select
              v-model="queryParams.lobbyCodeList"
              :placeholder="$t('member.pleaseSelect')"
              clearable
              multiple
              collapse-tags
              collapse-tags-tooltip
              class="full-width"
            >
              <el-option
                v-for="dict in lobby_code"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item class="full-width">
            <el-button
              type="primary"
              icon="Search"
              @click="handleQuery"
              >{{ $t('member.search') }}</el-button
            >
            <el-button icon="Refresh" @click="reset">{{ $t('member.reset') }}</el-button>
            <el-button
              icon="download"
              @click="handleExport"
              class="exoport-btn"
              >{{ $t('member.export') }}</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="tableData" :empty-text="$t('member.noData')" border>
      <el-table-column :label="$t('report.platformNoQuote')" prop="lobbyName" align="center">
        <template #default="{ row }">
          <span @click="goBetOrderDetail" class="pointer">{{ row.lobbyName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('report.transferIn')" prop="scoreIn" align="center">
        <template #default="{ row }">
          <span>{{ formatNumber(row.scoreIn) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('report.transferOut')" prop="scoreOut" align="center">
        <template #default="{ row }">
          <span>{{ formatNumber(row.scoreOut) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('report.orderCount')" prop="betUsers" align="center">
        <template #default="{ row }">
          <span>{{ row.betUsers||row.betUsers === 0 ? row.betUsers : "-"}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('report.betTimes')" prop="ticketNumbers" align="center">
        <template #default="{ row }">
          <span>{{ row.ticketNumbers||row.ticketNumbers === 0 ? row.ticketNumbers : "-"}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('report.betamount')" prop="" align="center">
        <template #default="{ row }">
          <span>{{ formatNumber(row.betAmount2) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('report.betNumberAmount')" prop="betAmount" align="center">
        <template #default="{ row }">
          <span>{{ formatNumber(row.betAmount) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('report.payoutAmount')" prop="settleAmount" align="center">
        <template #default="{ row }">
          <span>{{ formatNumber(row.settleAmount) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('report.platformSiphon')" prop="platformSiphon" align="center">
        <template #default="{ row }">
          <span>{{ formatNumber(row.platformSiphon) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('report.platformWinPaper')" prop="platformWin" align="center">
        <template #default="{ row }">
          <span>{{ formatNumber(row.platformWin) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('report.validBetAmountNoYuan')" prop="" align="center">
        <template #default="{ row }">
          <span>{{ formatNumber(row.validAmount) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('report.averageBetAmount')" prop="" align="center">
        <template #default="{ row }">
          <span>{{ formatNumber(row.betAmountAve) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('report.averageBetTimes')" prop="ticketNumbersAve" align="center"></el-table-column>
    </el-table>
  </div>
</template>

<script setup name="Lobby-data">
import i18n from "@/i18n";
import { getLobbyDataSumList } from "@/api/report/lobby/index";
import { onMounted } from "vue";
import { defaultTime, shortcuts } from "@/utils/config";
import { formatNumber } from "@/utils/index";

const { proxy } = getCurrentInstance();
const {  lobby_code } = proxy.useDict("lobby_code");
const router = useRouter();
const queryRef = ref(null);
const queryParams = ref({
  startTime:getTodayRange('start'),
  endTime:getTodayRange('end'),
  lobbyCodeList:[],
  memberName:null,
  parentName:null,
});
const isFirstLoad = ref(true);
const dateRange = ref(getTodayRange());
const tableData = ref([]);

onMounted(async()=>{
  if(isFirstLoad.value){
    await getList();
    isFirstLoad.value = false
  }
})
function getList(){
  return getLobbyDataSumList(queryParams.value).then(res=>{
    tableData.value = res || [];
  })
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
function handleQuery(){
  getList();
}
function reset(){
  queryRef.value.resetFields();
  dateRange.value = getTodayRange();
  handleChange();
}
function handleExport(){

}
function getTodayRange(type) {
  const today = new Date();
  
  // 获取当天的开始时间（0 点）
  const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);

  // 格式化日期为 'yyyy-MM-dd HH:mm:ss'
  const formattedStartOfDay = `${startOfDay.getFullYear()}-${(startOfDay.getMonth() + 1).toString().padStart(2, '0')}-${startOfDay.getDate().toString().padStart(2, '0')} 00:00:00`;
  
  // 格式化今天的日期为 'yyyy-MM-dd HH:mm:ss'
  const formattedToday = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')} ${today.getHours().toString().padStart(2, '0')}:${today.getMinutes().toString().padStart(2, '0')}:${today.getSeconds().toString().padStart(2, '0')}`;

  if(type === 'start'){
    return formattedStartOfDay
  }
  if(type === 'end'){
    return formattedToday
  }
  return [formattedStartOfDay, formattedToday];
}
function goBetOrderDetail(){
  router.push('/game/gamebet/betrecord')
}
onActivated(async()=>{
  if(!isFirstLoad.value){
    await getList();
  }
})
</script>

<style lang="scss" scoped>

</style>