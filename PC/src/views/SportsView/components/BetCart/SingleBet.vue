<template>
  <div class="SingleBet-views">
    <template v-if="betCartStore.betList.length">
      <div
      class="bet-list"
      :class="{
        hasMoreBetList: betCartStore.betList.length > 1,
        onekeyBetOpen: betCartStore.betList.length > 1
      }"
    >
      <BetItem
        v-for="item in betCartStore.betList"
        :isBooking="item.isBooking"
        :key="item.id"
        :item="item"
        :min="item.smin"
        :max="item.smax"
        :showQuick="item.showQuick"
        :amounts="Number(item.unitStake)"
        @updateAmount="updateAmount"
        @delete="deleteItem"
      />
    </div>
    </template>
    
    <!-- 底部投注栏 -->
    <FixedBotomOperation v-if="!betCartStore.betList.some((bet) => bet.isBooking)" /> 
    <!-- 是否接受更好赔率 -->
    <div class="moreRates" @click="show = !show">
      <p  v-text="morerate" class="morerate"></p>
      <el-icon class="icon" v-if="show"><ArrowUp /></el-icon>
      <el-icon class="icon" v-else><ArrowDown /></el-icon>
    </div>
    <div class="rateslist" v-if="show">
      <el-radio-group v-model="fbStore.settings.oddsChange" class="ml-4" @change="change">
        <el-radio :label="1" size="large">{{$t('SportsView.AcceptBetterOdds')}}</el-radio>
        <el-radio :label="2" size="large">{{$t('SportsView.AcceptAnyOdds')}}</el-radio>
        <el-radio :label="0" size="large">{{$t('SportsView.NotAcceptAnyOdds')}}</el-radio>
      </el-radio-group>
    </div>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import { ref, watch} from 'vue'
import BetItem from './BetItem.vue'
import FixedBotomOperation from './FixedBotomOperation.vue'
import {ArrowUp} from '@element-plus/icons-vue'
import {ArrowDown} from '@element-plus/icons-vue'
// import { ElMessage } from 'element-plus'
import { useBetCartStore } from '@/stores/betCart'
const betCartStore = useBetCartStore()
import { useFBStore } from '@/stores/fb'
const fbStore = useFBStore()

const morerate = ref(i18n.global.t('SportsView.AcceptAnyOdds'))
const show = ref(false)
//默认自动接受任何赔率
onMounted(()=>{
  // document.addEventListener('click', handleClickOutside);
  fbStore.settings.oddsChange = getSettings().oddsChange
  if(getSettings().oddsChange == 1){
    morerate.value = i18n.global.t('SportsView.AcceptBetterOdds')
  }
  if(getSettings().oddsChange == 0){
    morerate.value = i18n.global.t('SportsView.NotAcceptAnyOdds')
  }
  if(getSettings().oddsChange == 2){
    morerate.value = i18n.global.t('SportsView.AcceptAnyOdds')
  }
})
// 添加预约标识
betCartStore.betList.forEach((bet) => (bet.isBooking = false))
// 删除注单
function deleteItem(betItem) {
  betCartStore.removeBet(betItem)
}
function updateAmount(val,val1){
  val1.unitStake = val
}
function change(){
  show.value = !show.value
  if(fbStore.settings.oddsChange == 1){
    morerate.value = i18n.global.t('SportsView.AcceptBetterOdds')
  }
  if(fbStore.settings.oddsChange == 0){
    morerate.value = i18n.global.t('SportsView.NotAcceptAnyOdds')
  }
  if(fbStore.settings.oddsChange == 2){
    morerate.value = i18n.global.t('SportsView.AcceptAnyOdds')
  }
}

watch(
  ()=>betCartStore.oneKeyNumber,
  ()=>{
    betCartStore.betList.forEach((bet) => {
      // console.log(bet,'bet')
      bet.unitStake = betCartStore.oneKeyNumber
    })
  }
)
watchEffect(() => {
  fbStore.setSettings(fbStore.settings)
})
watch(
  ()=>betCartStore.betList,
  ()=>{
    // console.log(betCartStore.betList,76786868)
  },{deep:true,immediate:true}
)
</script>

<style lang="scss" scoped>
.SingleBet-views{
  position: relative;
  
  .moreRates{
    display: flex;
    width: 93%;
    margin: 10px auto;
    height: 30px;
    align-items: center;
    background: #1D223C;
    justify-content: space-between;
    cursor: pointer;
    p{
      color: var(--unnamed, #409EFF);
      margin-left: 5px;
    }
    .icon{
      margin-right: 5px;
    }
  }
  .rateslist{
    display: flex;
    width: 93%;
    margin: 10px auto;
  }
  :deep(){
    .el-radio,.el-radio__input.is-checked+.el-radio__label{
      color: var(--60, rgba(255, 255, 255, 0.60));
    }
    .el-radio__label{
      width: 100%;
      text-overflow: ellipsis;
      white-space: normal;
    }
    .el-radio__input .el-radio__inner{
      border-color: var(--unnamed, #9292BF);
      background:transparent;
    }
    .el-radio__input.is-checked .el-radio__inner{
      border-color: var(--unnamed, #F35F1B);
      background:transparent;
    }
    .el-radio__inner::after{
      background-color:var(--unnamed, #F35F1B);
    }
    .el-radio__inner:hover{
      border-color: var(--unnamed, #F35F1B);
    }
    .el-radio__input.is-checked .el-radio__inner::after{
      transform: translate(-50%,-50%) scale(1.5);
    }
  }
}
</style>