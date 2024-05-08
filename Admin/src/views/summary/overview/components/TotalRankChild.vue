<template>
  <div class="total-rank-child">
    <div class="rank-title" @click="goRankData">
      <span>{{ title }}</span>
      <el-icon><ArrowRightBold /></el-icon>
    </div>
    <el-table :data="tableData" :empty-text="$t('member.noData')" border max-height="350">
      <el-table-column :label="$t('summary.rank')" prop="rank" align="center">
        <template #default="{ row }">
          <span>{{ row.rank }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('summary.userName')"
        prop="userName"
        align="center"
        v-if="status === 1 || status === 2"
      >
        <template #default="{ row }">
          <span class="underline" @click="goMemberDetail(row)">{{ row.userName || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('summary.lobby')"
        prop="lobbyName"
        align="center"
        v-if="status === 3 || status === 4"
      >
        <template #default="{ row }">
          <span class="underline" @click="goLobbyData">{{ row.lobbyName || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('summary.profits')"
        prop="profitAmount"
        align="center"
        sortable
        v-if="status === 1 || status === 3"
      >
        <template #default="{ row }">
          <span v-if="status === 1">{{ formatNumber(row.profitAmount) }}</span>
          <span v-if="status === 3">{{ formatNumber(row.platformWin) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('summary.losses')"
        prop="profitAmount"
        align="center"
        sortable
        v-if="status === 2 || status === 4"
      >
        <template #default="{ row }">
          <span v-if="status === 2">{{ formatNumber(row.profitAmount) }}</span>
          <span v-if="status === 4">{{ formatNumber(row.platformWin) }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { getUserWinRank, getUserLoseRank,getLobbyLossSort,getLobbyWinSort } from "@/api/summary/index";
import { formatNumber } from "@/utils/index";
import { getMonthFirstAndToday } from "../../../report/cashflow/common";
import { useRouter } from "vue-router";

const props = defineProps(["title", "status"]);
const router = useRouter();

const queryParams = ref({
  startTime:getMonthFirstAndToday('now'),
  endTime:getMonthFirstAndToday('now')
})
const tableData = ref([]);
onMounted(() => {
  props.status === 1 && queryUserWinRank();
  props.status === 2 && queryUserLoseRank();
  props.status === 3 && queryLobbyWinSort();
  props.status === 4 && queryLobbyLossSort();
});
function queryUserWinRank() {
  getUserWinRank().then((res) => {
    tableData.value = filterSort(res || []);
  });
}
function queryUserLoseRank() {
  getUserLoseRank().then((res) => {
    tableData.value = filterSort(res || []);
  });
}
function queryLobbyLossSort(){
  getLobbyLossSort(queryParams.value).then(res=>{
    tableData.value = filterSort(res || []);
  })
}
function queryLobbyWinSort(){
  getLobbyWinSort(queryParams.value).then(res=>{
    tableData.value = filterSort(res || []);
  })
}
function filterSort(list){
  list.forEach((item,index)=>{
    item.rank = index + 1
  })
  return list
}
function goMemberDetail(row){
  router.push({path:"/member/detail-basic/info/" + row.userName,query:{
    tenantId:row.tenantId,
    userId:row.userId,
    activeTab:2
  }});
}
function goLobbyData(){
  router.push({path:"/report-management/lobby-data"});
}
function goRankData(){
  router.push({path:"/report-management/data-rank",query:{
    activeTab:(props.status === 1 || props.status === 2) ? '1' : '3'
  }});
}
</script>

<style lang="scss" scoped>
.total-rank-child {
  .rank-title {
    width: 50%;
    display: flex;
    justify-content: space-between;
    color: #333333;
    font-size: 18px;
    font-weight: 600;
    align-items: center;
    line-height: 40px;
    cursor: pointer;
  }
  .underline{
    text-decoration: underline;
    cursor:pointer;
  }
}
</style>
