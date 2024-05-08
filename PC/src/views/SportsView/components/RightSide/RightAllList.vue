<template>
  <div class="RightAllList-view">
    <div class="RightAllList-wrap">
      <div class="status">
        <div :class="activeTab == 0?'active':''" @click="change('0')">{{$t('SportsView.InProgress')}}</div>
        <div :class="activeTab == 1?'active':''" @click="change('1')">{{$t('SportsView.StartSoon')}}</div>
      </div>
      <BallType :id="Number(fbStore.queryMatchListParams.sportId)" :curentpage="'rightside'" />
      <EventLists v-if="activeTab == 0" />
      <TodayEvent v-if="activeTab == 1"/>
    </div>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import {ref} from 'vue'
import BallType from '../MiddleSide/BallType.vue'
import eventBus from '@/utils/eventBus'
import EventLists from './EventLists.vue'
import TodayEvent from './TodayEvent.vue'
import { useFBStore } from '@/stores/fb'
const fbStore = useFBStore()

const activeTab = ref(0)
const ssl=ref([])

function change(val){
  activeTab.value = val
  if(val == 1){
    fbStore.ClickComingSoon = true
    fbStore.clickProcess = false
    const alldata = {
      current: 1,
      isPC: true,
      orderBy: fbStore.queryMatchListParams.orderBy,
      sportId:1,
      type:3
    }
    return fbStore.getMatchList(alldata)
  }
  if(val == 0){
    fbStore.ClickComingSoon = false
    fbStore.isShowAll = true
    fbStore.clickProcess = true
    const alldata = {
      current: 1,
      isPC: true,
      orderBy: fbStore.queryMatchListParams.orderBy,
      sportIds:[],
      type:1
    }
    return fbStore.getMatchList(alldata)
  }
}
eventBus.on('ssl',(val)=>{
  ssl.value = val
})
onUnmounted(()=>{
  eventBus.off('ssl')
})
</script>

<style lang="scss" scoped>
.RightAllList-view{
  .RightAllList-wrap{
    .status{
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      height: 35px;
      margin-top: 20px;
      margin-bottom: 20px;
      div{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 45%;
        height: 100%;
        border-radius: 4px;
        background: #0D0F1C;
        color: var(--60, rgba(255, 255, 255, 0.60));
        cursor: pointer;
        &:hover{
          background: var(--unnamed, linear-gradient(90deg, #FF9000 25%, #F35F1B 89.06%));
          color: #fff;
        }
      }
      .active{
        background: var(--unnamed, linear-gradient(90deg, #FF9000 25%, #F35F1B 89.06%));
        color: #fff;
      }
    }
    .eventlists{
      // max-height: 537px;
      height: calc(100vh - 419px);
      overflow-y: scroll;
      scrollbar-width: none;//火狐浏览器 隐藏滚动条
      background-color: #151525;
      .listcard{
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid rgba(255, 255, 255, 0.10);
        margin-top: 14px;
        .listcard-tit{
          display: flex;
          width: 100%;
          height: 35px;
          align-items: center;
          color: var(--40, rgba(255, 255, 255, 1));
          font-weight: 600;
        }
        .MatchList-icon{
          width: 16px;
          height: 16px;
          margin: 0 15px;
        }
        .timebox{
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          // text-indent: 10px;
          min-width: 60px;
          border-right: 0.5px dotted #2E3660;
          cursor: pointer;
          .counter{
            margin-top: 10px;
            font-size: 12px;
          }
          .eventtitle{
            font-size: 12px;
          }
        }
        .match-team{
          width: 218px;
          .teambox{
            padding: 10px 5px;
            cursor: pointer;
          }
          .teambox{
            .teams{
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
              color: var(--60, rgba(255, 255, 255, 0.60));
              
              margin-bottom: 5px;
              >div{
                display: flex;
                align-items: center;
                height: 25px;
                font-size: 14px;
              }
              .teamsname{
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                width: 80px;
                text-align: left;
                height: 25px;
                line-height: 25px;
                display: block;
                align-items: center;
                font-size: 14px;
              }
            }
            .smallicon{
              width: 16px;
              height: 16px;
              margin-right: 5px;
              margin-left: 5px;
            }
            .score{
              margin-left: 5px;
              color: var(--100, #FFF);
              margin-right: 15px;
            }
          }
          
        }
        .teamtools{
          display: flex;
          flex-direction: column;
          flex: 1;
          justify-content: space-around;
          padding: 10px 0px;
          div{
            display: flex;
            align-items: center;
          }
          span{
            display: inline-block;
            
          }
          img{
            margin: 0px 5px;
          }
          .el-icon{
            cursor: pointer;
          }
          .teamtools-fir{
            display: flex;
            justify-content: end;
          }
          .teamtools-sec{
            display: flex;
            justify-content: space-between;
            min-width: 90px;
          }
        }
        .listcard-con{
          display: flex;
          flex-direction: row;
          // margin-bottom: 10px;
        }
      }
      
    }
  }
}
</style>