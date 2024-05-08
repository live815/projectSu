<template>
  <div class="MatchBottomInfo-view" >
    <!-- 足球 -->
    <!-- <div class="extra-info" v-if="event.sid === SPORT_IDS.Soccer ">
      <div class="left">
        <div >
          <img :src="flag" alt="角球" title="角球">
          <span>{{ getTeamDetailByTyg(event, 0, 6) || 0 }}-{{ getTeamDetailByTyg(event, 1, 6) || 0 }}</span>
          <img :src="firsthalf" alt="" title="得分">
          <span>{{ getTeamHalfTime(event, 0) || 0 }}-{{ getTeamHalfTime(event, 1) || 0 }}</span>
        </div>
        
      </div>
    </div> -->
    <!-- 篮球 -->
    <div class="extra-info" v-if="event.sid === SPORT_IDS.Basketball"  @click="toSingleEvent(event,'eventdetail')">
      <div class="basketball-left">
        <img :src="video" alt="" :title="$t('SportsView.Video')"  v-if="event.liveUrl">
        <img :src="cartoon" alt="" :title="$t('SportsView.Animation')"  v-if="event.as">
        <span>{{ props.event.tms }}</span>
        <el-icon><CaretRight /></el-icon>
      </div>
      <!-- 比分 -->
      <div class="score" v-if="getBasketBallStagesScore && getBasketBallStagesScore.length">
        <template v-for="(eachone, idx) in getBasketBallStagesScore" :key="idx">
          <div v-if="eachone.pe == 3003 || eachone.pe == 3004" class="pre-ht"> 
            <!-- 上半场 -->
            <template v-if="eachone.pe == 3003">
              <img class="half" :src="firsthalf" :title="$t('SportsView.Firsthalf')" alt=""/><span>{{ eachone.score[0] || 0 }}-{{ eachone.score[1] || 0 }}</span>
            </template>
            <!-- 下半场 -->
            <template v-else-if="eachone.pe == 3004 && event.fid == 2">
              <img class="half" :src="secondhalf" :title="$t('SportsView.Firsthalf')" alt=""/><span>{{ eachone.score[0] || 0 }}-{{ eachone.score[1] || 0 }}</span> 
            </template>
          </div>
          </template>
        <template v-for="(eachone, idx) in getBasketBallStagesScore" :key="idx">
          <!-- 某节 -->
          <div class="each" :class="{ active: idx === getBasketBallStagesScore.length - 1 }" v-show="eachone.pe !== 3003 && eachone.pe !== 3004">
              <span>{{ eachone.score[0] || 0 }}-{{ eachone.score[1] || 0 }}</span>
          </div>
        </template>
      </div>
    </div>
    <!-- 电竞篮球 -->
    <div class="extra-info" v-if="event.sid === SPORT_IDS.EBasketball"   @click="toSingleEvent(event,'eventdetail')">
      <div class="basketball-left">
        <img :src="video" alt="" :title="$t('SportsView.Video')"  v-if="event.liveUrl">
        <img :src="cartoon" alt="" :title="$t('SportsView.Animation')"  v-if="event.as">
        <span>{{ props.event.tms }}</span>
        <el-icon><CaretRight /></el-icon>
      </div>
      <!-- 比分 -->
      <div class="score" v-if="getEBasketballScore && getEBasketballScore.length">
        <div class="each" :class="{ active: idx === getEBasketballScore.length - 1 }" v-for="(eachone, idx) in getEBasketballScore" :key="idx">
          <img class="half" :src="firsthalf" :title="$t('SportsView.Firsthalf')" alt="" v-if="eachone.pe==178003"/><span>{{ eachone.score[0] || 0 }}-{{ eachone.score[1] || 0 }}</span>
          <!-- <img :src="firsthalf" alt="" /><span>{{ eachone[0] || 0 }}-{{ eachone[1] || 0 }}{{ eachone.pe }}</span> -->
        </div>
      </div>
    </div>
    <!-- 网球 -->
    <template v-if="event.sid === SPORT_IDS.Tennis">
      <div  class="extra-info"   @click="toSingleEvent(event,'eventdetail')">
        <div class="left">
          <img :src="video" alt="" :title="$t('SportsView.Video')"  v-if="event.liveUrl">
          <img :src="cartoon" alt="" :title="$t('SportsView.Animation')" v-if="event.as">
          <span>{{ props.event.tms }}</span>
          <el-icon><CaretRight /></el-icon>
        </div>
        <!-- 左侧 -->
        <div class="right">
          <div class="rightscore">
            <div
              :class="{ active: idx === getTennisScore.length - 1 }"
              v-for="(eachone, idx) in getTennisScore"
              :key="idx"
            >
              <div>
                <span class="each">{{ eachone.score[0] || 0 }}-{{ eachone.score[1] || 0 }}</span>
              </div>
            </div>
          </div>
          <!-- 右侧 -->
          <div class="total">
            <!-- 赛制几局几胜 -->
            <span>{{ getFid(event.fid) }} | {{$t('SportsView.TotalScore')}} </span>
            <span class="primary">
              {{ getAnyYouRequestByParams(event, 5556, 5001, 0) }}-{{getAnyYouRequestByParams(event, 5556, 5001, 1)}}
              ({{getAnyYouRequestByParams(event, 5556, 5001, 0) + getAnyYouRequestByParams(event, 5556, 5001, 1)}})
            </span>
          </div>
        </div>
      </div>
    </template>
    <!-- 乒乓球 -->
    <template v-if="event.sid === SPORT_IDS.TableTennis">
      <div class="extra-info "  @click="toSingleEvent(event,'eventdetail')">
        <div class="left">
          <img :src="video" alt="" :title="$t('SportsView.Video')"  v-if="event.liveUrl">
          <img :src="cartoon" alt="" :title="$t('SportsView.Animation')" v-if="event.as">
          <span>{{ props.event.tms }}</span>
          <el-icon><CaretRight /></el-icon>
        </div>
        <div class="right">
          <div class="rightscore">
            <div
              :class="{ active: idx === gettabletennies.length - 1 }"
              v-for="(eachone, idx) in gettabletennies"
              :key="idx"
            >
              <div>
                <span class="each">{{ eachone.score[0] || 0 }}-{{ eachone.score[1] || 0 }}</span>
              </div>
            </div>
          </div>
          <div class="total">
            <!-- 赛制几局几胜 -->
            <span>{{ getFid(event.fid) }} | {{$t('SportsView.TotalScore')}} </span>
            <span class="primary">
              {{ getAnyYouRequestByParams(event, 5559, 15001, 0) }}-{{getAnyYouRequestByParams(event, 5559, 15001, 1)}}
              ({{getAnyYouRequestByParams(event, 5559, 15001, 0) + getAnyYouRequestByParams(event, 5559, 15001, 1)}})
            </span>
          </div>
        </div>
      </div>
    </template>
    <!-- 排球 -->
    <template v-if="event.sid === SPORT_IDS.Volleyball">
      <div class="extra-info "  @click="toSingleEvent(event,'eventdetail')">
        <div class="left">
          <img :src="video" alt="" :title="$t('SportsView.Video')"  v-if="event.liveUrl">
          <img :src="cartoon" alt="" :title="$t('SportsView.Animation')" v-if="event.as">
          <span>{{ props.event.tms }}</span>
          <el-icon><CaretRight /></el-icon>
        </div>
        <div class="right">
          <div class="rightscore">
            <div
              :class="{ active: idx === getVolleyball.length - 1 }"
              v-for="(eachone, idx) in getVolleyball"
              :key="idx"
            >
              <div>
                <span class="each">{{ eachone.score[0] || 0 }}-{{ eachone.score[1] || 0 }}</span>
              </div>
            </div>
          </div>
          <div class="total">
            <!-- 赛制几局几胜 -->
            <span>{{ getFid(event.fid) }} | {{$t('SportsView.TotalScore')}} </span>
            <span class="primary">
              {{ getAnyYouRequestByParams(event, 5556, 13001, 0) }}-{{getAnyYouRequestByParams(event, 5556, 13001, 1)}}
              ({{getAnyYouRequestByParams(event, 5556, 13001, 0) + getAnyYouRequestByParams(event, 5556, 13001, 1)}})
            </span>
          </div>
        </div>
      </div>
    </template>
    <!-- 羽毛球 -->
    <template v-if="event.sid === SPORT_IDS.Badminton">
      <div class="extra-info "  @click="toSingleEvent(event,'eventdetail')">
        <div class="left">
          <img :src="video" alt="" :title="$t('SportsView.Video')"  v-if="event.liveUrl">
          <img :src="cartoon" alt="" :title="$t('SportsView.Animation')" v-if="event.as">
          <span>{{ props.event.tms }}</span>
          <el-icon><CaretRight /></el-icon>
        </div>
        <div class="right">
          <div class="rightscore">
            <div
              :class="{ active: idx === getVolleyball.length - 1 }"
              v-for="(eachone, idx) in getVolleyball"
              :key="idx"
            >
              <div>
                <span class="each">{{ eachone.score[0] || 0 }}-{{ eachone.score[1] || 0 }}</span>
              </div>
            </div>
          </div>
          <div class="total">
            <!-- 赛制几局几胜 -->
            <span>{{ getFid(event.fid) }} | {{$t('SportsView.TotalScore')}} </span>
            <span class="primary">
              {{ getAnyYouRequestByParams(event, 5559, 47001, 0) }}-{{getAnyYouRequestByParams(event, 5559, 47001, 1)}}
              ({{getAnyYouRequestByParams(event, 5559, 47001, 0) + getAnyYouRequestByParams(event, 5559, 47001, 1)}})
            </span>
          </div>
        </div>
      </div>
    </template>
    <!-- 棒球 -->
    <template v-if="event.sid === SPORT_IDS.Baseball">
      <div class="extra-info "  @click="toSingleEvent(event,'eventdetail')">
        <div class="left">
          <img :src="video" alt="" :title="$t('SportsView.Video')"  v-if="event.liveUrl">
          <img :src="cartoon" alt="" :title="$t('SportsView.Animation')" v-if="event.as">
          <span>{{ props.event.tms }}</span>
          <el-icon><CaretRight /></el-icon>
        </div>
        <div class="right">
          <div class="rightscore">
            <div
              :class="{ active: idx === getBaseball.length - 1 }"
              v-for="(eachone, idx) in getBaseball"
              :key="idx"
            >
              <div>
                <span class="each">{{ eachone.score[0] || 0 }}-{{ eachone.score[1] || 0 }}</span>
              </div>
            </div>
          </div>
          <div class="total">
            <!-- 赛制几局几胜 -->
            <span>{{ getFid(event.fid) }} | {{$t('SportsView.TotalScore')}} </span>
            <span class="primary">
              {{ getAnyYouRequestByParams(event, 5, 7001, 0) }}-{{getAnyYouRequestByParams(event, 5, 7001, 1)}}
              ({{getAnyYouRequestByParams(event, 5, 7001, 0) + getAnyYouRequestByParams(event, 5, 7001, 1)}})
            </span>
          </div>
        </div>
      </div>
    </template>
    <!-- 斯诺克 -->
    <template v-if="event.sid === SPORT_IDS.Snooker">
      <div class="extra-info "  @click="toSingleEvent(event,'eventdetail')">
        <div class="left">
          <img :src="video" alt="" :title="$t('SportsView.Video')"  v-if="event.liveUrl">
          <img :src="cartoon" alt="" :title="$t('SportsView.Animation')" v-if="event.as">
          <span>{{ props.event.tms }}</span>
          <el-icon><CaretRight /></el-icon>
        </div>
        <div class="right">
          <div class="rightscore">
            <div
              :class="{ active: idx === getSnooker.length - 1 }"
              v-for="(eachone, idx) in getSnooker"
              :key="idx"
            >
              <div>
                <span class="each">{{ eachone.score[0] || 0 }}-{{ eachone.score[1] || 0 }}</span>
              </div>
            </div>
          </div>
          <div class="total">
            <!-- 赛制几局几胜 -->
            <span>{{ getFid(event.fid) }}
               <!-- | {{$t('SportsView.TotalScore')}}  -->
            </span>
            <!-- <span class="primary">
              {{ getAnyYouRequestByParams(event, 5, 16001, 0) }}-{{getAnyYouRequestByParams(event, 5, 16001, 1)}}
              ({{getAnyYouRequestByParams(event, 5, 16001, 0) + getAnyYouRequestByParams(event, 5, 16001, 1)}})
            </span> -->
          </div>
        </div>
      </div>
    </template>
    <!-- 沙滩排球 -->
    <template v-if="event.sid === SPORT_IDS.BeachVolleyball">
      <div class="extra-info "  @click="toSingleEvent(event,'eventdetail')">
        <div class="left">
          <img :src="video" alt="" :title="$t('SportsView.Video')"  v-if="event.liveUrl">
          <img :src="cartoon" alt="" :title="$t('SportsView.Animation')" v-if="event.as">
          <span>{{ props.event.tms }}</span>
          <el-icon><CaretRight /></el-icon>
        </div>
        <div class="right">
          <div class="rightscore">
            <div
              :class="{ active: idx === getScoreBeachVolleyball.length - 1 }"
              v-for="(eachone, idx) in getScoreBeachVolleyball"
              :key="idx"
            >
              <div>
                <span class="each">{{ eachone.score[0] || 0 }}-{{ eachone.score[1] || 0 }}</span>
              </div>
            </div>
          </div>
          <div class="total">
            <!-- 赛制几局几胜 -->
            <span>{{ getFid(event.fid) }} | {{$t('SportsView.TotalScore')}} </span>
            <span class="primary">
              {{ getAnyYouRequestByParams(event, 5, 51001, 0) }}-{{getAnyYouRequestByParams(event, 5, 51001, 1)}}
              ({{getAnyYouRequestByParams(event, 5, 51001, 0) + getAnyYouRequestByParams(event, 5, 51001, 1)}})
            </span>
          </div>
        </div>
      </div>
    </template>
    <!-- 美式足球 -->
    <template v-if="event.sid === SPORT_IDS.AmericanFootball">
      <div class="extra-info "  @click="toSingleEvent(event,'eventdetail')">
        <div class="left">
          <img :src="video" alt="" :title="$t('SportsView.Video')"  v-if="event.liveUrl">
          <img :src="cartoon" alt="" :title="$t('SportsView.Animation')" v-if="event.as">
          <span>{{ props.event.tms }}</span>
          <el-icon><CaretRight /></el-icon>
        </div>
        <div class="right">
          <div class="rightscore">
            <div
              :class="{ active: idx === getAmericanFootball.length - 1 }"
              v-for="(eachone, idx) in getAmericanFootball"
              :key="idx"
            >
              <div>
                <span class="each">{{ eachone.score[0] || 0 }}-{{ eachone.score[1] || 0 }}</span>
              </div>
            </div>
          </div>
          <div class="total">
            <!-- 赛制几局几胜 -->
            <span>{{ getFid(event.fid) }} | {{$t('SportsView.TotalScore')}} </span>
            <span class="primary">
              {{ getAnyYouRequestByParams(event, 5, 6001, 0) }}-{{getAnyYouRequestByParams(event, 5, 6001, 1)}}
              ({{getAnyYouRequestByParams(event, 5, 6001, 0) + getAnyYouRequestByParams(event, 5, 6001, 1)}})
            </span>
          </div>
        </div>
      </div>
    </template>
    <!-- 橄榄球 -->
    <template v-if="event.sid === SPORT_IDS.Rugby" >
      <div class="extra-info "   @click="toSingleEvent(event,'eventdetail')">
        <div class="left">
          <img :src="video" alt="" :title="$t('SportsView.Video')"  v-if="event.liveUrl">
          <img :src="cartoon" alt="" :title="$t('SportsView.Animation')" v-if="event.as">
          <span>{{ props.event.tms }}</span>
          <el-icon><CaretRight /></el-icon>
        </div>
        <div class="right">
          <div class="rightscore" style="display:none;">
            <div
              :class="{ active: idx === getRugby.length - 1 }"
              v-for="(eachone, idx) in getRugby"
              :key="idx"
            >
              <div>
                <span class="each">{{ eachone.score[0] || 0 }}-{{ eachone.score[1] || 0 }}</span>
              </div>
            </div>
          </div>
          <div class="total">
            <!-- 赛制几局几胜 -->
            <!-- <span>{{ getFid(event.fid) }} | {{$t('SportsView.TotalScore')}} </span>
            <span class="primary">
              {{ getAnyYouRequestByParams(event, 5, 4000, 0) }}-{{getAnyYouRequestByParams(event, 5, 4000, 1)}}
              ({{getAnyYouRequestByParams(event, 5, 4000, 0) + getAnyYouRequestByParams(event, 5, 4000, 1)}})
            </span> -->
          </div>
        </div>
      </div>
    </template>
    <!-- 手球 -->
    <template v-if="event.sid === SPORT_IDS.Handball">
      <div class="extra-info "   @click="toSingleEvent(event,'eventdetail')">
        <div class="left">
          <img :src="video" alt="" :title="$t('SportsView.Video')"  v-if="event.liveUrl">
          <img :src="cartoon" alt="" :title="$t('SportsView.Animation')" v-if="event.as">
          <span>{{ props.event.tms }}</span>
          <el-icon><CaretRight /></el-icon>
        </div>
        <div class="right">
          <div class="rightscore" style="display:none;">
            <div
              :class="{ active: idx === getHandball.length - 1 }"
              v-for="(eachone, idx) in getHandball"
              :key="idx"
            >
              <div>
                <span class="each">{{ eachone.score[0] || 0 }}-{{ eachone.score[1] || 0 }}</span>
              </div>
            </div>
          </div>
          <div class="total">
            <!-- 赛制几局几胜 -->
            <!-- <span>{{ getFid(event.fid) }} </span> -->
            <!-- <span class="primary">
              {{ getAnyYouRequestByParams(event, 5, 4000, 0) }}-{{getAnyYouRequestByParams(event, 5, 4000, 1)}}
              ({{getAnyYouRequestByParams(event, 5, 4000, 0) + getAnyYouRequestByParams(event, 5, 4000, 1)}})
            </span> -->
          </div>
        </div>
      </div>
    </template>
    <!-- 冰球 -->
    <template v-if="event.sid === SPORT_IDS.IceHockey">
      <div class="extra-info "  @click="toSingleEvent(event,'eventdetail')">
        <div class="left">
          <img :src="video" alt="" :title="$t('SportsView.Video')"  v-if="event.liveUrl">
          <img :src="cartoon" alt="" :title="$t('SportsView.Animation')" v-if="event.as">
          <span>{{ props.event.tms }}</span>
          <el-icon><CaretRight /></el-icon>
        </div>
        <div class="right">
          <div class="rightscore">
            <div
              :class="{ active: idx === getIceHockey.length - 1 }"
              v-for="(eachone, idx) in getIceHockey"
              :key="idx"
            >
              <div>
                <span class="each">{{ eachone.score[0] || 0 }}-{{ eachone.score[1] || 0 }}</span>
              </div>
            </div>
          </div>
          <div class="total">
            <!-- 赛制几局几胜 -->
            <!-- <span>{{ getFid(event.fid) }} </span> -->
            <!-- <span class="primary">
              {{ getAnyYouRequestByParams(event, 5, 4000, 0) }}-{{getAnyYouRequestByParams(event, 5, 4000, 1)}}
              ({{getAnyYouRequestByParams(event, 5, 4000, 0) + getAnyYouRequestByParams(event, 5, 4000, 1)}})
            </span> -->
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import { SPORT_IDS } from '@/hooks/useSportDict'
import video from './img/video.png'
import flag from './img/flag.png'
import cartoon from './img/cartoon.png'
import firsthalf from './img/first-half.png'
import secondhalf from './img/second-half.png'
import {CaretRight} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
const router = useRouter()
import { useFBStore } from '@/stores/fb'
const fbStore = useFBStore()

const props = defineProps({
  event:{
    type: Object,
    default: () => ({})
  }
})

// 计算任意字段
function getAnyYouRequestByParams(item, tyg, pe, idx) {
  if (item.nsg && item.nsg.length) {
    return item.nsg.find((o) => o.tyg === tyg && o.pe === pe)?.sc[idx]
  }else{
    return 0
  }
}
// 点击跳转到内页
async function toSingleEvent(val1,val2){
  // router.push('/sports/sportsdetail')
  router.push(`/sports/sportsdetail?gameId=${val1.id}&sid=${val1.sid}&page=${val2}`)
  // console.log(val1,'val1')
  fbStore.rightSideDropBox = false
  fbStore.isOperatedMarketsListCollapse = false
  fbStore.curEvent = val1
  fbStore.curPage = val2
  fbStore.curEventId = val1.id
  fbStore.rightList = val1
  fbStore.defaultActiveEvent = val1.id
  
  await fbStore.getMatchDetail({
    	matchId: val1.id
  })
}
// 获取赛制
function getFid(fid) {
  // console.log(fid,'fid')
  switch (fid) {
    case 3:
      return i18n.global.t('SportsView.BestOfThree')
    case 5:
      return i18n.global.t('SportsView.BestOfFive')
    case 7:
      return i18n.global.t('SportsView.BestOfSeven')
    case 9:
      return i18n.global.t('SportsView.BestOfNine')
    case 19:
      return i18n.global.t('SportsView.BestOfNineteen')
    default: 
    return 0
  }
}
// 篮球 pe 赛事阶段比分数据
const getBasketBallStagesScore = computed(() => {
  if (props.event?.sid === SPORT_IDS.Basketball) {
    if (props.event.nsg && props.event.nsg?.length>0) {
      return [3005, 3006, 3003,3007, 3008, 3009,3001].map((pe) => {
          const score = props.event.nsg?.find((o) => o.tyg === 5 && o.pe === pe)?.sc;
          return { pe, score }; // 返回一个包含 pe 和 score 的对象
        })
        .filter((obj) => obj.score !== undefined && obj.score !== null);
    }
  }
});
// 电竞篮球 pe 赛事阶段比分数据
const getEBasketballScore = computed(() => {
  if (props.event?.sid === SPORT_IDS.EBasketball) {
    if (props.event.nsg && props.event.nsg?.length>0) {
      return [178005, 178006, 178003,178007, 178008, 178009,178001].map((pe) => {
          const score = props.event.nsg?.find((o) => o.tyg === 5 && o.pe === pe)?.sc;
          return { pe, score }; // 返回一个包含 pe 和 score 的对象
        })
        .filter((obj) => obj.score !== undefined && obj.score !== null);
    }
  }
}); 

// 网球 pe 赛事阶段比分数据
const getTennisScore = computed(() => {
  if (props.event.sid === SPORT_IDS.Tennis) {
    if (props.event.nsg && props.event.nsg?.length) {
      return [5002, 5003, 5004, 5005, 5006]
        .map((pe) => {
          const score = props.event.nsg?.find((o) => o.tyg === 5556 && o.pe === pe)?.sc;
          return { pe, score }; 
        })
        .filter((obj) => obj.score !== undefined && obj.score !== null);
    }
  }
})
// 乒乓球 pe 赛事阶段比分数据
const gettabletennies = computed(() => {
  if (props.event.sid === SPORT_IDS.TableTennis) {
    if (props.event.nsg && props.event.nsg.length) {
      return [15002, 15003, 15004, 15005, 15006,15001]
        .map((pe) => {
          const score = props.event.nsg.find((o) => o.tyg === 5559 && o.pe === pe)?.sc;
          return { pe, score }; 
        })
        .filter((obj) => obj.score !== undefined && obj.score !== null);
    }
  }
})
// 棒球 pe 赛事阶段比分数据
const getBaseball = computed(() => {
  if (props.event.sid === SPORT_IDS.Baseball) {
    if (props.event.nsg && props.event.nsg.length) {
      return [7004, 7005, 7006, 7007, 7008,7009,7010,7011,7012,7013,7001]
        .map((pe) => {
          const score = props.event.nsg.find((o) => o.tyg === 5 && o.pe === pe)?.sc;
          return { pe, score }; 
        })
        .filter((obj) => obj.score !== undefined && obj.score !== null);
    }
  }
})
// 排球 pe 赛事阶段比分数据
const getVolleyball = computed(() => {
  if (props.event.sid === SPORT_IDS.Volleyball) {
    if (props.event.nsg && props.event.nsg.length) {
      return [13002, 13003, 13004, 13005, 13006]
        .map((pe) => {
          const score = props.event.nsg.find((o) => o.tyg === 5556 && o.pe === pe)?.sc;
          return { pe, score }; 
        })
        .filter((obj) => obj.score !== undefined && obj.score !== null);
    }
  }
})
// 斯诺克 赛事阶段比分数据
const getSnooker = computed(() => {
  if (props.event.sid === SPORT_IDS.Snooker) {
    if (props.event.nsg && props.event.nsg.length) {
      return [16002, 16003, 16004, 16005, 16006,16007,16008,16009,16010,16011,16012,16013,16014,16015,16016,16017,16018,16019,16020,16021,16022,16023,16024,16025,16026,16027,16028,16029,16030,16031,16032,16033,16034,16035,16036,16001,]
        .map((pe) => {
          const score = props.event.nsg.find((o) => o.tyg === 12 && o.pe === pe)?.sc;
          return { pe, score }; 
        })
        .filter((obj) => obj.score !== undefined && obj.score !== null);
    }
  }
})
// 手球 pe 赛事阶段比分数据
const getHandball = computed(() => {
  if (props.event.sid === SPORT_IDS.Handball) {
    if (props.event.nsg && props.event.nsg.length) {
      return [8003,8004, 8005, 8006,8000]
        .map((pe) => {
          const score = props.event.nsg.find((o) => o.tyg === 5 && o.pe === pe)?.sc;
          return { pe, score }; 
        })
        .filter((obj) => obj.score !== undefined && obj.score !== null);
    }
  }
})
// 冰球 pe 赛事阶段比分数据
const getIceHockey = computed(() => {
  if (props.event.sid === SPORT_IDS.IceHockey) {
    if (props.event.nsg && props.event.nsg.length) {
      return [2003,2004, 2005, 2006,2000,2007]
        .map((pe) => {
          const score = props.event.nsg.find((o) => o.tyg === 5 && o.pe === pe)?.sc;
          return { pe, score }; 
        })
        .filter((obj) => obj.score !== undefined && obj.score !== null);
    }
  }
})
// 橄榄球tyg：5比分 pe 赛事阶段比分数据
const getRugby = computed(() => {
  if (props.event?.sid === SPORT_IDS.Rugby) {
    if (props.event.nsg && props.event.nsg?.length>0) {
      return [4003, 4004, 4005,4006, 4000].map((pe) => {
          const score = props.event.nsg?.find((o) => o.tyg === 5 && o.pe === pe)?.sc;
          return { pe, score }; // 返回一个包含 pe 和 score 的对象
        })
        .filter((obj) => obj.score !== undefined && obj.score !== null);
    }
  }
});
// 美式足球tyg：5比分 pe 赛事阶段比分数据
const getAmericanFootball = computed(() => {
  if (props.event?.sid === SPORT_IDS.AmericanFootball) {
    if (props.event.nsg && props.event.nsg?.length>0) {
      return [6005, 6006, 6003,6007, 6008,6001,6009].map((pe) => {
          const score = props.event.nsg?.find((o) => o.tyg === 5 && o.pe === pe)?.sc;
          return { pe, score }; // 返回一个包含 pe 和 score 的对象
        })
        .filter((obj) => obj.score !== undefined && obj.score !== null);
    }
  }
});
// 沙滩排球 pe 赛事阶段比分数据
const getScoreBeachVolleyball = computed(() => {
  if (props.event.sid === SPORT_IDS.BeachVolleyball) {
    if (props.event.nsg && props.event.nsg.length) {
      return [51002, 51003, 51004,51005,51006]
        .map((pe) => {
          const score = props.event.nsg.find((o) => o.tyg === 5556 && o.pe === pe)?.sc;
          return { pe, score }; 
        })
        .filter((obj) => obj.score !== undefined && obj.score !== null);
    }
  }
});
// 其他球类比分数据
const getOtherBallStagesScore = computed(() => {
  const peArray = props.event.nsg?.map(item => item.pe);
  if(props.event.sid == 14){//板球
    if (props.event.nsg && props.event.nsg?.length>0) {
      return peArray.map((pe) => {
          const score = props.event.nsg?.find((o) => o.tyg === 5 && o.pe === pe)?.sc;
          return { pe, score }; // 返回一个包含 pe 和 score 的对象
        })
        .filter((obj) => obj.score !== undefined && obj.score !== null);
        
    }
  }
  else{
    if (props.event.nsg && props.event.nsg?.length>0) {
      return peArray.map((pe) => {
          const score = props.event.nsg?.find((o) => o.tyg === 5 && o.pe === pe)?.sc;
          return { pe, score }; // 返回一个包含 pe 和 score 的对象
        })
        .filter((obj) => obj.score !== undefined && obj.score !== null)
        // .reverse(); // 添加 .reverse() 进行倒序处理
    }
  }
});
</script>

<style lang="scss" scoped>
.MatchBottomInfo-view{
  width: 100%;
  .extra-info{
    height: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    div{
      display: flex;
      align-items: center;
    }
    span{
      display: inline-block;
    }
    img{
      margin: 0px 5px;
      width: 12px;
      height: 12px;
    }
    .el-icon{
      cursor: pointer;
    }
    .each{
      margin-right: 10px;
      
      .half{
        margin-top: 2px;
      }
    }
    .active{
      color: var(--unnamed, #F35F1B);
    }
    .basketball-left{
      width: 218px;
      display: flex;
      justify-content: flex-end;
    }
    .score{
      display: flex;
      justify-content: flex-start;
      .pre-ht{
        position: relative;
        margin-right: 8px;
        padding-right: 8px;
        &::after {
          content: ' ';
          background: #ccc;
          opacity: .4;
          display: inline-block;
          width: 1px;
          height: 10px;
          position: absolute;
          right: 0;
          top: 56%;
          transform: translate(0, -50%);
        }
        .half{
          margin-top: 1px;
          width: 12px;
          height: 12px;
          display: inline-block;
        }
      }
    }
    .left{
      width: 218px;
      display: flex;
      justify-content: flex-end;
      padding-right: 10px;
    }
    .right{
      display: flex;
      justify-content: space-between;
      flex: 1;
      padding-right: 18px;
    }
  }
  .total{
    display: flex;
    flex-direction: row;
    height: 30px;
    .left{
      width: 218px;
      display: flex;
      justify-content: flex-end;
      padding-right: 20px;
      align-items: center;
      img{
        margin: 0px 5px;
        width: 12px;
        height: 12px;
      }
    }
    .left ,.right{
      display: flex;
      justify-content: flex-end;
      padding-right: 20px;
    }
    .right{
      flex: 1;
    }
  }
}
</style>