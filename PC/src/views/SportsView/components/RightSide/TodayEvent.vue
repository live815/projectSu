<template>
  <div class="TodayEvent-view">
    <div class="eventlists">
        <div class="listcard" v-for="(item,index) of fbStore.todayEvent" :key="index">
          <div class="listcard-tit">
            <img :src="item.lg.lurl || defaultTeamIcon" alt="" class="MatchList-icon"> 
            {{ item.lg.na }}
          </div>
          <div class="listcard-con">
            <div class="timebox">
              <p v-if="item.list[0].mc" class="eventtitle">{{ getMatchStatus(item.list[0], fbStore) }}</p>
              <!-- 走表类型 -->
              <!-- <Counter
                v-if="item.list[0].mc.hasOwnProperty('s') && item.list[0].mc.s >= 0"
                :tp="item.list[0].mc.tp"
                :s="item.list[0].mc.s"
                :r="item.list[0].mc.r"
              /> -->
            </div>
            <div class="match-team" @click="toSingleEvent(item,'rightallList')">
              <div class="teambox">
                <div class="teams" v-for="(team,idx) of item.list[0].ts" :key="team.id" >
                  <div>
                    <img :src="team.lurl || defaultTeamIcon" alt="" class="smallicon">
                    <span class="teamsname" :title="team.na">{{ team.na }}</span>
                  </div>
                  <!-- <div class="cards score" v-if="item.sid === SPORT_IDS.Soccer">
                    <div class="card red" v-if="Number(getTeamDetailByTyg(item, idx, 8))">
                      <span>{{ getTeamDetailByTyg(item, idx, 8) }}</span>
                    </div>
                    <div class="card yellow" v-if="Number(getTeamDetailByTyg(item, idx, 7))">
                      <span>{{ getTeamDetailByTyg(item, idx, 7) }}</span>
                    </div>
                  </div>
                  <div class="score">
                    <span>{{ getTeamDetailByTyg(item, idx, 5) || 0 }}</span>
                  </div> -->
                </div>
              </div>
              
            </div>
            <div class="teamtools">
              <div class="teamtools-fir">
                <img :src="videoactive" alt="" :title="$t('SportsView.Video')">
              </div>
              <!-- <div class="teamtools-sec">
                <div>
                  <img :src="firsthalf" alt="" :title="$t('SportsView.Score')">
                  <span>{{ getTeamHalfTime(item.list[0], 0) || 0 }}-{{ getTeamHalfTime(item.list[0], 1) || 0 }}</span>
                </div>
                <div>
                  <img :src="flag" alt="" :title="$t('SportsView.CornerKick')">
                  <span>{{ getTeamDetailByTyg(item.list[0], 0, 6) || 0 }}-{{ getTeamDetailByTyg(item.list[0], 1, 6) || 0 }}</span>
                </div>
                
              </div> -->
              
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import i18n from '@/i18n'
import { SPORT_IDS, getMatchStatus} from '@/hooks/useSportDict'
// import Counter from '../MiddleSide/Counter.vue'
import videoactive from './img/video-active.png'
import flag from './img/flag.png'
import firsthalf from './img/first-half.png'
import defaultTeamIcon from './img/default-team-logo.png'

import { useFBStore } from '@/stores/fb'
const fbStore = useFBStore()

async function toSingleEvent(val1,val2){
  fbStore.curEvent = val1
  fbStore.curPage = val2
  fbStore.rightList = val1
  console.log(22222)
  await fbStore.getMatchDetail({
    	matchId: val1.id
  	})
}
// // 足球上半场
// function getTeamHalfTime(item, idx) {
//   if (item.nsg && item.nsg.length) {
//     return item.nsg.find((o) => o.tyg === 5 && o.pe === 1002)?.sc[idx]
//   }
// }
// // 计算球队数据function
// function getTeamDetailByTyg(item, idx, tyg) {
//   if (item.nsg && item.nsg.length) {
//     return item.nsg.find((o) => o.tyg === tyg)?.sc[idx]
//   }
// }
</script>

<style lang="scss" scoped>
.TodayEvent-view{
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
            // width: 30px;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
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
</style>