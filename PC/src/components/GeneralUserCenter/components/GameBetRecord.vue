<template>
  <div class="GameBetRecord-view">
    <div class="table-spacing">
      <div class="table-content">
        <el-table :data="tabledatas" style="width: 100%; height: 350px">
          <el-table-column prop="betTime" :label="$t('GeneralUserCenter.BettingTime')" align="center" width="155" />
          <el-table-column prop="orderNo" :label="$t('GeneralUserCenter.OrderNumber')" align="center" min-width="220">
            <template #default="scope">
              <p  class="orderNum">{{ scope.row.orderNo }}
                <!-- <span class="copybtn" v-clipboard="scope.row.orderNo">{{$t('GeneralUserCenter.Copy')}}</span> -->
                <span class="copybtn" @click="handleCopyButtonClick(scope.row.orderNo)">{{$t('GeneralUserCenter.Copy')}}</span>
              </p>
            </template> 
          </el-table-column>
          <!-- <el-table-column prop="lobbyName" :label="$t('GeneralUserCenter.Platforms')" align="center" ></el-table-column> -->
          <!-- 游戏内容 -->
          <el-table-column prop="gameName" :label="$t('GeneralUserCenter.GameContent')" align="center" min-width="220">
            <template #default="scope">
              <div v-if="scope.row.betContentList">
                <div v-for="(item,index) in scope.row.betContentList" :key="index">
                  <p>{{ item.tournamentName }}</p>
                  <p>{{ item.hostVsGuest }}</p>
                  <p>{{ item.matchTime }}</p>
                  <p>{{item.playName}} {{ item.optionName }} <span style="margin-left: 3px;">{{ item.oddsFormat }}</span>
                    <span v-if="item.betOdds" style="color: #f35f1b;">@{{ item.betOdds }}</span> 
                    <span v-if="item.matchScore">({{ item.matchScore.includes("S:") ?item.matchScore.replace("S:", ""):item.matchScore }})</span>
                  </p>
                </div>
              </div>
              <div v-else>
                <p>{{ scope.row.gameName }}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="orderAmount" :label="$t('GeneralUserCenter.BetAmount')" align="center" />
          <el-table-column prop="validBet" :label="$t('GeneralUserCenter.EffectiveFlow')" align="center" />
          <el-table-column prop="profitAmount" :label="$t('GeneralUserCenter.WinLose')" align="center">
            <template #default="scope">
              <p :class="getProfitClass(scope.row.profitAmount)">{{ scope.row.profitAmount }}</p>
            </template>
          </el-table-column>
          <el-table-column prop="betResult" :label="$t('GeneralUserCenter.betResult')" align="center"  width="160">
            <template  #default="scope">
              <p :class="getProfitClass(scope.row.profitAmount)">{{getStatusText(scope.row.betResult)}} </p>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="footer">
      <Pagination
        v-if="total>0"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        @update:current-page="handleCurrentPageUpdate"
        @update:page-size="handlePageSizeUpdate"
      />
    </div>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
// import vClipboard from '@/directives/clipboard'
import eventBus from '@/utils/eventBus'
import { useFBStore } from '@/stores/fb'
const fbStore = useFBStore()
const total = ref(props.totalNum)
const props = defineProps(['totalNum'])
// const props = defineProps(['tabledata','total','detailData','totalNum'])
const tabledatas = ref()
const currentPage = ref(1)
const pageSize = ref(10)
const emit = defineEmits(['updatePage','upadtePageSize','goDetail'])
eventBus.on('updateGameData',(val)=>{
  tabledatas.value = val
})
onUnmounted(()=>{
  eventBus.off('updateGameData')
})
// 获取输赢值class
function getProfitClass(profitAmount) {
  if (profitAmount > 0) {
    return 'red'
  }
  if (profitAmount < 0) {
    return 'green'
  }
}
watchEffect(()=>{
  total.value = props.totalNum
})
// 翻页
const handleCurrentPageUpdate = (newPage) => {
  currentPage.value = newPage
  fbStore.queryMatchListParams.current = newPage
  emit('updatePage',newPage,'game')
}
// 一页多少条数据
const handlePageSizeUpdate = (newSize) => {
  pageSize.value = newSize
  emit('upadtePageSize',newSize,'game')
}
function getStatusText(statusCode) {
  switch (Number(statusCode)) {
    case 1004001:
      return i18n.global.t('SportsView.EarlySettle')
    case 1004002:
      return i18n.global.t('SportsView.Win')
    case 1004003:
      return i18n.global.t('SportsView.WinHalf')
    case 1004004:
      return i18n.global.t('SportsView.LoseHalf')
    case 1004005:
      return i18n.global.t('SportsView.Lose')
    case 1004006:
      return i18n.global.t('SportsView.Tie')
    case 1004007:
      return i18n.global.t('SportsView.ReturnPrincipal')
    case 1004008:
      return i18n.global.t('SportsView.InvalidOrder')
    case 1004009:
      return i18n.global.t('SportsView.Confirming')
    case 1004010:
      return i18n.global.t('SportsView.BetSuccess')
    default:
      return i18n.global.t('SportsView.Confirming')
  }
}
function getDynamicContent(id) {
  return id; // 返回需要复制的内容，这里以 row.id 为例
}
function  handleCopyButtonClick(id) {
  // 在复制按钮的点击事件处理程序中获取当前内容并复制到剪贴板
  const currentContent = getDynamicContent(id);

  navigator.clipboard.writeText(currentContent)
    .then(() => {
      console.log('内容已成功复制到剪贴板');
    })
    .catch((error) => {
      console.error('复制内容到剪贴板时出错:', error);
    });
}

</script>

<style lang="scss" scoped>
.GameBetRecord-view{
  .table-spacing {
    min-width: 1240px;
    max-width: 1240px;
    margin: 0 auto;
    margin-top: 10px;
    .table-content {
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    .order-number {
      border: 1px solid var(--20, rgba(255, 255, 255, 0.2));
      border-radius: 2px;
      width: 100px;
      margin: 0 auto;
    }
    .copybtn{
      cursor: pointer;
      color: var(--unnamed, #409EFF);
      margin-left: 5px;
      font-size: 12px;
    }
  }
  .footer {
    display: flex;
    justify-content: end;
    margin-top: 20px;
    padding:0 40px 20px;
  }
  :deep() {
    .el-table__body tr:hover > td.el-table__cell {
      background-color: #171a2f;
    }
    .el-form--inline .el-form-item {
      margin-right: 10px;
    }
    .el-form-item__label {
      color: var(--100, #fff);
      
      font-size: 14px;
      font-style: normal;
    }
    .el-table {
      --el-table-border-color: 1px solid rgba(255, 255, 255, 0.2);
      --el-table-header-bg-color: var(--unnamed, #171a2f);
      --el-table-border: 1px solid rgba(255, 255, 255, 0.2);
    }
    .el-table tr {
      background-color: #272b45;
      color: var(--100, #fff);
    }
    .el-button--info {
      --el-button-hover-border-color: #f35f1b;
      --el-button-bg-color: #272b45;
      background-color: #272b45 !important;
    }
    .el-button:focus,
    .el-button:hover {
      color: #f35f1b;
    }
    .el-input {
      --el-input-bg-color: #272b45;
    }
    .el-input__inner {
      color: var(--100, #fff);
    }
    .el-input__inner:hover {
      box-shadow: none;
    }
    .el-input__wrapper {
      background-color: #272b45;
      border: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: none;
    }
    .el-date-editor .el-range-separator {
      color: var(--100, #fff);
    }
    .el-date-editor .el-range-input {
      color: var(--100, #fff);
    }
    .el-select {
      --el-select-input-focus-border-color: none;
    }
    .el-range-editor.is-active:hover {
      box-shadow: none;
    }
    .el-text.el-text--danger {
      --el-text-color: #e93d3d;
    }
    .el-scrollbar__wrap{
      background: #272b45;
    }
    .red{
      color: var(--color-danger);
    }
    .green {
      color: var(--color-green);
    }
    .orderNum{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      align-content: center;
      justify-content: center;
    }
    .el-table td.el-table__cell div{
      max-height: 100px;
      overflow: scroll;
    }
  }
}
</style>