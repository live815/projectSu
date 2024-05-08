<template>
  <div class="SportTop-view">
    <div class="top-left">
      <el-input
        v-show="showInput"
        v-model="input1"
        class="w-50 m-2"
        :placeholder="$t('SportsView.SearchLeagueAndTeamName')"
        :prefix-icon="Search"
        @click="clickSearch"
      />
      <div :class="[showInput?'':'toleft' ]"  @click="opendialog('myorder',$t('SportsView.MyBet'))">{{$t('SportsView.MyBet')}}</div>
      <div class="activebtn" >{{$t('SportsView.SportingEvents')}}</div>
      <div  @click="opendialog('resultscore',$t('SportsView.ResultsScores'))">{{$t('SportsView.ResultsScores')}}</div>
    </div>
    <div class="top-right">
      <div class="item"   @click="opendialog('sportrule',$t('SportsView.SportsRules'))">{{$t('SportsView.SportsRules')}}</div>
      <!-- <div class="item"   @click="opendialog('betteach',$t('SportsView.BettingTutorial'))">{{$t('SportsView.BettingTutorial')}}</div> -->
      <!-- 盘口选择 -->
      <div class="handicaps item" @click.stop="openBox('handicaps')">
        <span >{{ getOddFormatText(fbStore.settings.oddsFormat) }}</span>
        <el-icon v-if="!showvalue1" class="btnicon"><CaretBottom /></el-icon>
        <el-icon v-else  class="btnicon"><CaretTop /></el-icon>
        <!-- 盘口设置 -->
        <div class="hidebox handicapsbox" v-if="showhandicaps"  ref="handicapsDiv">
          <ul>
            <li v-for="(item,index) of options1" :key="index"  @click.stop="changeHandicap(item)">{{ item.value }}</li>
          </ul>
        </div>
      </div>
      
      
      <!-- 语言设置 -->
      <!-- <div class="language item"  @click="openBox('language')">
        <img :src="chinaflag" alt="" class="flag">
        <span v-text="value2"></span>
        <el-icon v-if="!showvalue2" class="btnicon"><CaretBottom /></el-icon>
        <el-icon v-else  class="btnicon"><CaretTop /></el-icon>
        <div class="hidebox languagebox"  v-show="showlanguage">
          <ul>
            <li v-for="(item,index) of options2" :key="index" @click.stop="changeLanguge(item)">{{ item.value }}</li>
          </ul>
        </div>
      </div> -->

      <!-- 设置 -->
      <div class="setting item"  @click.stop="openBox('setting')">
        <span v-text="value3"></span>
        <el-icon v-if="!showvalue3" class="btnicon"><CaretBottom /></el-icon>
        <el-icon v-else  class="btnicon"><CaretTop /></el-icon>
      </div>
      <div class="hidebox settingbox" ref="settingDiv"  v-show="showsetting">
        <div class="settingbox-wrap">
          <!-- <div class="settingbox-item">
            <div class="settingbox-left">颜色模式</div>
            <div class="settingbox-right">
              <el-radio-group v-model="radio1" class="ml-4">
                <el-radio label="1" size="large">日间版</el-radio>
                <el-radio label="2" size="large">夜间版</el-radio>
              </el-radio-group>
            </div>
          </div> -->
          <div class="settingbox-item">
            <div class="settingbox-left">{{$t('SportsView.EarlySettlement')}}</div>
            <div class="settingbox-right">
              <el-radio-group v-model="radio2" class="ml-4">
                <el-radio label="1" size="large">{{$t('SportsView.AcceptEarlySettlementChanges')}}</el-radio>
                <el-radio label="2" size="large">{{$t('SportsView.DoNotAcceptValuationChanges')}}</el-radio>
              </el-radio-group>
            </div>
          </div>
          <div class="settingbox-item">
            <div class="settingbox-left">{{$t('SportsView.BettingRules')}}</div>
            <div class="settingbox-right">
              <el-radio-group v-model="fbStore.settings.oddsChange" class="ml-4" @change="change">
                <el-radio :label="1" size="large">{{$t('SportsView.AcceptBetterOdds')}}</el-radio>
                <el-radio :label="2" size="large">{{$t('SportsView.AcceptAnyOdds')}}</el-radio>
                <el-radio :label="0" size="large">{{$t('SportsView.NotAcceptAnyOdds')}}</el-radio>
              </el-radio-group>
            </div>
          </div>
        </div>
      </div>

    </div>

  
    <!-- 弹窗 -->
    <el-dialog  v-model="dialogTableVisible" class="dialog" width="70%" height="40%" @close="close">
      <template #header>
        <div class="title">
          <img :src="tyicon" alt="">
          <span>{{ dialogtitle }}</span>
        </div>
      </template>
      <SportBetRule v-if="dialogcon == 'sportrule'"/>
      <MyOrder v-if="dialogcon == 'myorder'"/>
      <ResultScore v-if="dialogcon == 'resultscore'"/>
    </el-dialog>
    <!-- 投注教程 -->
    <el-dialog v-model="teachDialog" width="70%" height="40%" class="teachDialog">
      <template #header>
        <div class="my-header">
          <ul>
            <li v-for="(item,index) of teachList" :key="index">{{ item.title }}</li>
          </ul>
        </div>
      </template>
      <BetTutorial />
    </el-dialog>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import {ref, watch} from 'vue'
import { Search } from '@element-plus/icons-vue'
import { CaretBottom } from '@element-plus/icons-vue'
import { CaretTop } from '@element-plus/icons-vue'
// import chinaflag from '../img/flag-china.png'
import eventBus from '@/utils/eventBus'
import tyicon from '../img/tyicon.svg'
import SportBetRule from './SportTop/SportBetRule.vue'
import MyOrder from './SportTop/MyOrder.vue'
import BetTutorial from './SportTop/BetTutorial.vue'
import ResultScore from './SportTop/ResultScore.vue'
import { getTimeStampByPassDay } from '@/utils'
import { useFBStore } from '@/stores/fb'
const fbStore = useFBStore()
import { getOddFormatText } from '@/hooks/useSportDict'
const input1 = ref('')
const value3 = ref(i18n.global.t('SportsView.Setting'))
const showhandicaps = ref(false)
const showlanguage = ref(false)
const showsetting = ref(false)
const showvalue1 =ref(false)
const showvalue3 =ref(false)
const showInput = ref(true)
const showSearchBox = ref(false)
const dialogTableVisible = ref(false)
const dialogtitle = ref()
const dialogcon = ref()
const teachDialog = ref(false)
const activebtn = ref('sportevent')
const options1 = [
  {value: i18n.global.t('SportsView.EuropeanHandicap'),label:1},
  {value: i18n.global.t('SportsView.HongKongDisk'),label:2 }
]
// const options2 = [
//   {value: '繁体中文',label: '繁体中文'},
//   {value: '简体中文',label: '简体中文'},
//   {value: 'English',label: 'English'},
//   {value: 'Việt Nam',label: '越南语'}
// ]
// const radio1 = ref('1')
const radio2 = ref('1')
const radio3 = ref('1')
const teachList = [
  {id:0,title:i18n.global.t('SportsView.MatchBetting')},
  {id:1,title:i18n.global.t('SportsView.BatchCrossBetting')},
  {id:2,title:i18n.global.t('SportsView.ReserveBetting')},
  {id:3,title:i18n.global.t('SportsView.CheckOrder')},
  {id:4,title:i18n.global.t('SportsView.EarlySettlement')},
  {id:5,title:i18n.global.t('SportsView.PartialEarlySettlement')},
  {id:6,title:i18n.global.t('SportsView.SettleInAdvance')},
]
const settingDiv = ref(null)
const handicapsDiv = ref(null)
//默认自动接受任何赔率
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  fbStore.settings.oddsChange = getSettings().oddsChange
});
// 初始化时间
const timeRange = ref({
  startTime:'',
  endTime:''
})
const timeData = ref([])

// function init(){
//   fbStore.skeletonLoading = true
//   timeData.value = getTimeStampByPassDay(3)
//   if(timeData.value){
//     timeRange.value.startTime =  timeData?.value[0]
//     timeRange.value.endTime = timeData?.value[1]
//   }
// }
// //初始化
// init()
function openBox(val){
  fbStore.rightSideDropBox = false;
  if(val == 'handicaps'){
    showhandicaps.value = !showhandicaps.value
    showlanguage.value = false
    showsetting.value = false
  } 
  if(val == 'language'){
    showlanguage.value = !showlanguage.value
    showhandicaps.value = false
    showsetting.value = false
  } 
  if(val == 'setting'){
    showsetting.value = !showsetting.value
    showlanguage.value = false
    showhandicaps.value = false
  } 
}
eventBus.on('showSearchBox',(val)=>{
  showSearchBox.value = val
})
function clickSearch(){
  showInput.value = false
  fbStore.curPage = 'searchbox'
}
eventBus.on('showInput',(val)=>{
  showInput.value = val
})
function opendialog(val1,val2){ 
  if(val1 == 'betteach'){
    teachDialog.value = true
  }else{
    dialogtitle.value = val2
    dialogTableVisible.value = true
    dialogcon.value = val1
    activebtn.value = val1
    if(val1 == 'resultscore'){
      fbStore.isMatchResult = true
      // timeData.value = getTimeStampByPassDay(3)
      // if(timeData.value){
      //   timeRange.value.startTime =  timeData?.value[0]
      //   timeRange.value.endTime = timeData?.value[1]
      // }
      // const data ={
      //   beginTime:timeRange.value.startTime || '',
      //   endTime: timeRange.value.endTime || '',
      //   languageType: "CMN",
      //   leagueIds: [],
      //   sportId: 1,
      //   current:1,
      //   size:50
      // }
      // fbStore.getMatchResultPage(data)
    }else{
      fbStore.isMatchResult = false
    }
  }
}
function changeHandicap(val){
  fbStore.settings.oddsFormat = val.label
  showhandicaps.value = false
}
watchEffect(() => {
  fbStore.setSettings(fbStore.settings)
})
// function changeLanguge(val){
//   showlanguage.value = false
//   value2.value = val.value
// }
// 关闭弹窗的回调
function close(){
  activebtn.value = ''
  dialogcon.value=''
  dialogTableVisible.value = false
}

const handleClickOutside = (event) => {
  const settingDivs = settingDiv.value;
  const handicapsDivs = handicapsDiv.value;

  if (settingDivs && !settingDivs.contains(event.target)) {
    showsetting.value = false;
  }
  if (handicapsDivs && !handicapsDivs.contains(event.target)) {
    showhandicaps.value = false;
  }
};


onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  eventBus.off('showSearchBox')
  eventBus.off('showInput')
});
function change(){
  // console.log()
}
watch(
  ()=>fbStore.closeSearch,
  ()=>{
    if(fbStore.closeSearch){
      showInput.value = true
    }
  }
)
watch(
  ()=>fbStore.curPage,
  ()=>{
    if(fbStore.curPage !== 'searchbox'){
      showInput.value = true
    }
  }
)
watchEffect(() => {
  fbStore.setSettings(fbStore.settings)
})
</script>

<style lang="scss" scoped>
@media screen and (max-width:1450px) {
  .SportTop-view{
    min-width:1370px !important;
    zoom: 0.9;
  }

}

.SportTop-view{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 52px;
  width: 100%;
  min-width: 1510px;
  color: var(--80, rgba(255, 255, 255, 0.8));
  
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  background: #171a2f;
  .top-left,
  .top-right {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 52px;
    
    >div {
      margin-left: 13px;
      cursor: pointer;
    }
  }
  .top-left {
    position: relative;
    min-width: 455px;
    div:hover {
      color: #f35f1b;
    }
    .activebtn{
      color: #f35f1b;
    }
    :deep(){
      .el-input__wrapper{
        box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.2) inset;
      }
      
    }
    .toleft{
      margin-left: 245px;
    }
  }
  
  .top-right {
    margin-right: 10px;
    .item {
      display: flex;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 40px;
      padding: 7px 13px;
      margin-left: 20px;
      span{
        margin-right: 5px;
      }
      .flag{
        display: inline-block;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        margin-right: 5px;
      }
    }
    .handicaps,.language,.setting{
      position: relative;
    }
    .hidebox{
      position: absolute;
      top: 37px;
      left: 0;
      z-index: 99;
      width: 100%;
      ul{
        list-style: none;
        padding: 0;
        border-radius: 4px;
        background: #232949;
        box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.18);
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 5px 5px;
        li{
          display: flex;
          height: 30px;
          width: 100%;
          align-items: center;
          justify-content: center;
          background: #171A2F;
          font-size: 14px;
          color: var(--60, rgba(255, 255, 255, 0.60));
          margin-bottom: 5px;
          &:hover{
            background: var(--unnamed, #323C6F);
          }
        }
      }
    }
    .settingbox{
      display: flex;
      width: 320px;
      height: 300px;
      border-radius: 4px;
      background: #2B3259;
      box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.23);
      left: unset;
      right: 24px;
      top: 64px;
      .settingbox-wrap{
        padding: 15px 20px;
        width: 100%;
        display: flex;
        flex-direction: column;
        .settingbox-item{
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          border-bottom:1px solid rgba(255, 255, 255, 0.10);

          .settingbox-left{
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .settingbox-right{
            display: flex;
            flex-direction: column;
            width: 180px;
          }
        }
      }
    }
  }

  :deep(){
    .dialog{
      min-height: 480px;
      background: #3F4671;
      min-width: 1052px;
      overflow: scroll;
      scrollbar-width: none;//火狐浏览器 隐藏滚动条
      overflow: hidden;
      position: relative;
      height: 660px;
    }
    .el-input {
      width: 220px;;
      min-width: 220px;
    }
    .el-input__wrapper {
      border-radius: 40px;
      // border: 1px solid rgba(255, 255, 255, 0.2);
      background-color: transparent;
    }
    .el-input__wrapper{
      box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.2) inset;
    }
    .el-select .el-input__wrapper.is-focus,.el-select .el-input.is-focus .el-input__wrapper{
      box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.2) inset!important;
    }
    .el-dialog__header{
      background: #3F4671;
      height:40px;
      margin-right: 0;
      display: flex;
      align-items: center;
      color: var(--100, #FFF);
      background: url(../img/top-bg.jpg);
      padding: 10px 20px;
      .el-dialog__title{
        color: var(--100, #FFF);
        line-height: 31px;
        height: 40px;
      }
      .title{
        // line-height: 31px;
        height: 40px;
        display: flex;
        align-items: center;
        img{
          vertical-align: middle;
        }
        span{
          // margin-top: 2px;
          margin-left: 3px;
        }
      }
      .el-dialog__headerbtn .el-dialog__close{
        color: var(--100, #FFF);
      }
      .el-dialog__headerbtn{
        top: 0;
        width: 47px;
        height: 47px;
      }
    }
    .el-dialog__body{
      background: #272B45;
      min-height: 440px;
      height: 100%;
      padding-top: 10px;
      // padding: 10px 0;
    }
    .el-radio.el-radio--large{
      width: 100%;
      color: var(--60, rgba(255, 255, 255, 0.60));
    }
    .el-radio__input.is-checked+.el-radio__label{
      color: var(--60, rgba(255, 255, 255, 0.60));
      
    }
    .el-radio__label{
      width: 100%;
      text-overflow: ellipsis;
      white-space: normal;
    }
    .el-radio-group{
      width: 200px;
      overflow: hidden;
    }
    .el-radio__input.is-checked .el-radio__inner{
      border-color: #F35F1B;
      background: #F35F1B;
    }
    .el-radio__inner:hover{
      border-color: #F35F1B;
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
      transform: translate(-63%,-59%) scale(1.5);
    }
    .teachDialog{
      min-height: 480px;
      background: #272B45;
      .el-dialog__body{
        background: #272B45;
      }
      .el-dialog__header{
        padding: 0 20px;
      }
      .my-header{
        height: 40px;
        ul{
          list-style: none;
          display: flex;
          flex-direction: row;
          padding: 0;
          height: 100%;
          align-items: center;
          li{
            display: flex;
            align-items: center;
            height: 100%;
            padding: 10px 10px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>