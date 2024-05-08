<template>
  <div class="EventLists-view">
    <div class="eventlists">
        <div class="listcard" v-for="(item,index) of fbStore.matchList" :key="index">
          <div class="listcard-tit">
            <img :src="item.lg.lurl || defaultTeamIcon" alt="" class="MatchList-icon"> 
            {{ item.lg.na }}
          </div>
          <div class="listcard-con" v-for="(ite,inde) of item.list" :key="inde">
            <div class="timebox">
              <p v-if="ite.mc" class="eventtitle">{{ getMatchStatus(ite, fbStore) }}</p>
              <!-- 走表类型 -->
              <Counter
                v-if="ite.mc.hasOwnProperty('s') && ite.mc.s >= 0"
                :tp="ite.mc.tp"
                :s="ite.mc.s"
                :r="ite.mc.r"
              />
            </div>
            <div class="match-team" @click="toSingleEvent(ite,'eventdetail')">
              <div class="teambox">
                <div class="teams" v-for="(team,idx) of ite.ts" :key="team.id" >
                  <div>
                    <img :src="team.lurl || defaultTeamIcon" alt="" class="smallicon">
                    <span class="teamsname" :title="team.na">{{ team.na }}</span>
                  </div>
                  <!-- 足球半场比分 -->
                  <div class="score Soccer"  v-if="item.sid === SPORT_IDS.Soccer || item.sid === SPORT_IDS.EFootball">
                    <span>{{ getTeamHalfTime(ite, idx) || 0 }}</span>
                  </div>
                  <!-- 篮球半场得分 -->
                  <div v-if="item.sid == SPORT_IDS.Basketball" class="Basketball">
                    <span>{{ getTeamHalfTimeBasketball(ite, idx) || 0 }}</span>
                  </div>
                  <!-- <HalfScore v-else :item="it" :idx="idx"/> -->
                  <!-- 乒乓球全场比分 -->
                  <div class="score"  v-if="showpingpong(ite)">
                    <span>{{ getScorepingpong(ite.nsg, idx) || 0 }}</span>
                  </div>
                  <!--全场比分所有球类  -->
                  <div class="score" v-else>
                    <span>{{ getTeamDetailByTyg(ite, idx, 5) || 0 }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="teamtools">
              <div class="teamtools-fir">
                <img :src="videoactive" alt="" :title="$t('SportsView.Video')"  v-if="item.liveUrl">
                <img :src="cartoon" v-if="ite.as"/>
              </div>
              <div class="teamtools-sec" v-if="show(item)">
                <!-- 足球上半场和角球比分 -->
                <div v-if="item.sid==SPORT_IDS.Soccer || item.sid==SPORT_IDS.EFootball">
                  <!-- 角球 -->
                  <img :src="flag" alt="" :title="$t('SportsView.CornerKick')">
                  <span>{{ getTeamDetailByTyg(item.list[0], 0, 6) || 0 }}-{{ getTeamDetailByTyg(item.list[0], 1, 6) || 0 }}</span>
                  <!-- 半场 -->
                  <img :src="firsthalf" alt="" :title="$t('SportsView.Firsthalf')">
                  <span>{{ getTeamHalfTime(item.list[0], 0) || 0 }}-{{ getTeamHalfTime(item.list[0], 1) || 0 }}</span>
                </div>
                 <!-- 其他球 -->
                <div class="score" v-else>
                    <img class="half" :src="firsthalf" :title="$t('SportsView.Firsthalf')" alt="" /><span  >{{ getTeamHalfTime(ite, 0) || 0 }}-{{ getTeamHalfTime(ite, 1) || 0 }}</span>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script setup>
import { SPORT_IDS, getMatchStatus} from '@/hooks/useSportDict'
import {
  getTeamHalfTime,
  getTeamDetailByTyg,
  getScorepingpong,
  getTeamHalfTimeBasketball,
} from '@/hooks/sportsView'
import Counter from '../MiddleSide/Counter.vue'
import videoactive from './img/video-active.png'
import flag from './img/flag.png'
import firsthalf from './img/first-half.png'
import cartoon from './img/cartoon.png'
import defaultTeamIcon from './img/default-team-logo.png'
import { useRouter } from 'vue-router'
const router = useRouter()

import { useFBStore } from '@/stores/fb'
const fbStore = useFBStore()

const showpingpong = (item) => item.sid == SPORT_IDS.TableTennis 
const show = (item) => item.sid == SPORT_IDS.Soccer || item.sid == SPORT_IDS.Basketball ||  item.sid == SPORT_IDS.EFootball 

async function toSingleEvent(val1,val2){
  // console.log(val1,val2,5555555,val1.id)
  
  if(val1.list){
    fbStore.curEvent = val1.list[0]
    fbStore.rightList = val1.list[0]
    router.push(`/sports/sportsdetail?gameId=${val1.list[0].id}&sid=${val1.list[0].sid}&page=${val2}`)
  }else{
    router.push(`/sports/sportsdetail?gameId=${val1.id}&sid=${val1.sid}&page=${val2}`)
    fbStore.curEvent = val1
    fbStore.rightList = val1
  }
  
  fbStore.curPage = val2
  
  await fbStore.getMatchDetail({
    	matchId: val1.id
  	})
}

</script>

<style lang="scss" scoped>
.EventLists-view{
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
            img{
              width: 14px;
              height:14px;
            }
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