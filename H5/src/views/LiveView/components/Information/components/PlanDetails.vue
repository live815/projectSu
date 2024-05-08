<template>
  <div class="planDetail-views">
    <NavBar :title="$t('Lletter.plandetails')" :isShowRight="false" />

    <div class="planDetail-wrap">
      <div class="first-wrap">
        <div class="first">
          <img class="first-img" :src="getImg(data?.expertAvatar)" />
          <div class="first-con">
            <div class="first-up">
              <span class="fname">{{ data?.expertName }}</span>
              <span class="ftime">{{ calculateHoursAgo(data?.createTime) }}</span>
            </div>
            <div class="first-down">
              <div class="tag-box">
                <div class="active tag">
                  {{ $t('Lletter.nearfuture') }}{{ expert?.middleRoundCount }}
                </div>
                <div class="tag" v-for="(item, index) in handleTag(expert?.expertTag)" :key="index">
                  {{ item }}
                </div>
              </div>
            </div>
          </div>
          <div class="first-right">
            <p class="rate">{{ expert?.recentHitRate }}%</p>
            <p>{{ $t('Lletter.recenthitrate') }}</p>
          </div>
        </div>
      </div>
      <div class="planRecord">
        <p>{{ $t('Lletter.recentresults') }}</p>
        <div class="line"></div>
        <div class="round-box">
          <div class="planRecord-right" v-for="(item, index) in planContent" :key="index">
            <div class="red" v-if="item === 0">{{ $t('Lletter.red') }}</div>
            <div class="black" v-else-if="item === 1">{{ $t('Lletter.black') }}</div>
            <div class="yellow" v-else>{{ $t('Lletter.and') }}</div>
          </div>
        </div>
      </div>

      <div class="plan-con">
        <div class="plan-wrap">
          <div class="planCon">
            <div class="planCon-left">
              <div class="img-wrap">
                <img :src="fbStore.matchDetailList.ts?.[0].lurl || defaultIcon" />
              </div>
              <p>{{ data?.mainName }}</p>
            </div>
            <div class="planCon-mid">
              <p class="name">{{ data?.leagueName }}</p>
              <p class="dtime">{{ dayjs(data?.gameTime).format('MM-DD HH:mm') }}</p>
              <p class="vs">VS</p>
            </div>
            <div class="planCon-right">
              <div class="img-wrap">
                <img :src="fbStore.matchDetailList.ts?.[1].lurl || defaultIcon" />
              </div>
              <p>{{ data?.cusName }}</p>
            </div>
          </div>
          <div class="palntype">
            <p>{{ data?.betName }}</p>
            <span class="underLine"></span>
          </div>
          <div class="odds-box">
            <!-- 赔率Group -->
            <OddsGroup
              :item="oddsData"
              :betStyle="data?.betStyle"
              :marketId="data?.marketId"
              :head="false"
            />
            <div v-if="!odds" class="mask" @click="warn"></div>
          </div>
        </div>
      </div>

      <div class="rom">
        <div class="rom-wrap">
          <div class="rom-tit">{{ $t('Lletter.recommendreasons') }}</div>
          <div class="rom-con">
            {{ data?.planDesc }}
          </div>
        </div>
      </div>
      <div class="betBtn">
        <div class="betBtn-wrap" @click="betNow($event)">{{ $t('Lletter.betnow') }}</div>
      </div>
    </div>
    <!-- 投注购物车 -->
    <BetCart />
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import BetCart from '@/views/SportsView/components/BetCart/BetCart.vue'
import { usePlanStore } from '@/stores/plan'
import { getImg } from '@/utils'
import dayjs from 'dayjs'
import { useFBStore } from '@/stores/fb'
import OddsGroup from '@/components/OddsGroup/OddsGroup.vue'
import { showToast } from 'vant'
import defaultIcon from '@/assets/img/default-team-logo.png'
import { getToken } from '@/utils/cache'
import { statisticsPlanViews } from '@/api/live'
import { isSolding } from '@/hooks/useSportDict'
import { useBetCartStore } from '@/stores/betCart'
import i18n from '@/i18n'

const isLogin = getToken()
const fbStore = useFBStore()
const planStore = usePlanStore()
const route = useRoute()
const router = useRouter()
const betCartStore = useBetCartStore()

const data = computed(() => {
  return planStore.planList.find((item) => item.id == route.query.id)
})
const expert = computed(() => {
  return planStore.mastersList.find((item) => item.id == route.query.expertId)
})

const planContent = computed(() => {
  const data = expert.value?.planContent ? JSON.parse(expert.value?.planContent) : {}
  const resultArray = []
  Object.entries(data).forEach(([key, value]) => {
    for (let i = 0; i < value; i++) {
      resultArray.push(Number(key))
    }
  })
  resultArray.sort(() => Math.random() - 0.5)
  return resultArray
})

const warn = () => {
  if (!odds.value) {
    showToast(i18n.global.t('Lletter.handicapclosed'))
  }
}
const getTheLatestOdds = () => {
  fbStore.getMatchDetail({
    languageType: fbStore.settings.languageType,
    matchId: Number(route.params.id)
  })
}

let timer = null // 定时器
const init = async () => {
  if (!planStore.planList.length || !planStore.mastersList.length) {
    await planStore.getExpertList()
    await planStore.getPlanList()
  }

  // 没有token则先获取token
  if (!fbStore.FBConfig.FBToken) {
    try {
      await fbStore.getFBToken()
    } catch (e) {
      // console.log(i18n.global.t('common.serverBusy'))
    }
  }

  getTheLatestOdds()
  timer = setInterval(() => {
    getTheLatestOdds()
  }, 5000)

  statisticsPlanViews({
    browseNum: Math.floor(Math.random() * 10) + 1,
    planId: Number(route.query.id)
  })
}
init()

const handleTag = (string) => {
  return string?.split(',')
}

// 找到对应推荐的玩法分类，让球-大小-波胆。。。。
const odds = computed(() => {
  if (!fbStore.matchDetailList || !fbStore.matchDetailList.mg) {
    return null
  }
  const recommendOdds = fbStore.matchDetailList?.mg.find((item) => {
    const isRecommend = item.mks.some((mksItem) => {
      return mksItem.id == route.query.marketId
    })
    return isRecommend
  })
  return recommendOdds || null
})

// 没有最新可投注数据，就展示后台传递的历史数据
const oddsData = computed(() => {
  const res = data.value?.betContent ? JSON.parse(data.value?.betContent) : {}
  return odds.value || res
})

// 找到对应推荐的赔率选项
const findObjectByIdAndTy = () => {
  const arr = odds.value?.mks
  const { marketId: id, betStyle: ty } = data.value
  for (let i = 0; i < arr?.length; i++) {
    if (arr[i].id === id) {
      for (let j = 0; j < arr[i].op.length; j++) {
        if (arr[i].op[j].ty === ty) {
          return { option: arr[i], team: arr[i].op[j] }
        }
      }
    }
  }
  return null
}

const betNow = (e) => {
  if (!odds.value) {
    showToast(i18n.global.t('Lletter.handicapclosed'))
    return
  } else if (!isLogin) {
    router.push(`/login?redirect=${route.fullPath}`)
  }

  const { option, team } = findObjectByIdAndTy()
  const matchId = route.params.id
  const match = fbStore.matchDetailList

  if (!isSolding(option.ss, team.od)) return
  const betObj = {
    id: option.id,
    ss: option.ss,
    au: option.au,
    uniStake: '',
    matchId,
    betMatchMarket: {
      matchId,
      marketId: option.id, // 玩法id
      odds: team.od, // 赔率
      optionType: team.ty // 投注类型
    },
    // 展示类型数据
    visible: {
      teamName: team.na, // 球队名称
      betOpTitle: team.nm, // 投注项名称 -0/0.5
      title: match.nm, // 比赛标题 teamA vs teamB
      marketTitle: data.value.betName, //  盘口玩法简称
      lgName: match.lg.na, // 联赛名称
      begainTime: match.bt // 开始时间
    }
  }
  betCartStore.toggleBet(betObj, { x: e.pageX, y: e.pageY })
}

const calculateHoursAgo = (date) => {
  const targetDate = dayjs(date)
  const currentDate = dayjs()

  // 计算时间差，得到小时差
  const hoursAgo = currentDate.diff(targetDate, 'hour')
  if (hoursAgo < 24) {
    return i18n.global.t('Lletter.releasehouretime', { num: hoursAgo })
  } else {
    const daysAgo = Math.floor(hoursAgo / 24)
    return i18n.global.t('Lletter.releasedaytime', { num: daysAgo })
  }
}

onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>

<style lang="scss" scoped>
.planDetail-views {
  .first-wrap {
    display: block;
    width: 100%;
    background-color: white;
  }
  .first {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 94%;
    margin: 0px auto;
    padding: 20px 0px;
    .first-img {
      width: 44px;
      height: 44px;
      border-radius: 50%;
    }
    .first-con {
      margin-right: auto;
      margin-left: 12px;
      .first-up {
        .fname {
          color: #333;
          font-size: 16px;
          font-weight: 500;
          line-height: 16px;
        }
        .ftime {
          color: #999;
          font-size: 12px;
          line-height: 16px;
          margin-left: 10px;
        }
      }
      .first-down {
        margin-top: 5px;
        .tag-box {
          display: flex;
          max-width: 230px;
          overflow-x: auto;
          white-space: nowrap;
          .tag {
            color: #ff5000;
            font-size: 12px;
            background: var(--4, #fff5f0);
            margin-right: 2.666667vw;
            border-radius: 5.333333vw;
            padding: 3px 7px;
            display: inline-block;
            text-align: center;
          }
          .active {
            background: var(--1, linear-gradient(90deg, #ff9000 0.17%, #ff5000 101.4%));
            color: white;
          }
        }
      }
    }
    .first-right {
      text-align: right;
      p {
        color: #666;
        font-size: 12px;
        font-weight: 400;
        line-height: 16px;
      }
      .rate {
        color: var(--2, #ff5000);
        font-family: DIN Alternate;
        font-size: 20px;
        font-weight: 700;
        line-height: 16px;
        margin-bottom: 5px;
      }
    }
    .iconRight {
      width: 12px;
      height: 12px;
    }
  }
  .planRecord {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f7f7f7;
    width: 350px;
    height: 38px;
    border-radius: 5px;
    margin: auto;
    > p {
      color: #666;
      font-size: 12px;
      margin-right: 8px;
      white-space: nowrap;
    }
    .line {
      width: 1px;
      height: 14px;
      background: #ddd;
    }
    .round-box {
      display: flex;
      max-width: 280px;
      overflow: auto;
      margin-left: 12px;
      .planRecord-right {
        margin-right: 8px;
        div {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          text-align: center;
          line-height: 24px;
          color: #fff;
        }
        .red {
          background: linear-gradient(181deg, #fe8064 1.04%, #fe494e 96.96%);
          box-shadow: 0px 2px 2px rgba(255, 79, 81, 0.2);
        }
        .black {
          background: linear-gradient(90deg, #29323c 0%, #485563 100%);
          box-shadow: 0px 2px 2px rgba(69, 81, 95, 0.2);
        }
        .yellow {
          background: linear-gradient(179deg, #ffc306 3.06%, #d6a205 96.9%);
          box-shadow: 0px 2px 2px rgba(221, 168, 6, 0.2);
        }
      }
    }
  }
  .trangle {
    width: 0;
    height: 0;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-bottom: 7px solid #f7f7f7;
    position: absolute;
    top: -6px;
    left: 25px;
  }
  .plan-con {
    background: #fff;
    .plan-wrap {
      display: flex;
      flex-direction: column;
      width: 94%;
      margin: 10px auto;
      padding-bottom: 20px;
      .planCon {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        margin-top: 15px;
        .planCon-left,
        .planCon-right {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex: 1;
        }
        .planCon-left p,
        .planCon-right p {
          color: #333;
          text-align: center;
          font-size: 14px;
          font-weight: 500;
          line-height: 16px;
          margin: 10px 0px;
        }
        .planCon-left .img-wrap,
        .planCon-right .img-wrap {
          display: block;
          width: 56px;
          height: 56px;
          background: #f7f7f7;
          border-radius: 50%;
        }
        .planCon-left .img-wrap img,
        .planCon-right .img-wrap img {
          display: block;
          width: 38px;
          height: 38px;
          margin: 10px auto;
        }
        .planCon-mid {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          .name {
            color: #333;
            text-align: center;
            font-size: 12px;
            line-height: 16px;
          }
          .dtime {
            color: #333;
            text-align: center;
            font-size: 12px;
            line-height: 16px;
            margin: 12px 18px;
          }
          .vs {
            color: #202020;
            text-align: center;
            font-family: DIN Alternate;
            font-size: 20px;
            font-weight: 700;
            line-height: 24px;
          }
        }
      }
      .palntype {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 50px;
        color: #333;
        font-size: 15px;
        font-weight: 600;
        line-height: 16px;
        position: relative;
        p {
          position: absolute;
          z-index: 2;
        }
        .underLine {
          position: absolute;
          z-index: 1;
          width: 30px;
          height: 6px;
          background: linear-gradient(90deg, #ff9000 0%, #ff5000 100%);
          top: 28px;
          opacity: 0.8;
          border-radius: 5px;
        }
      }
      .odds-box {
        max-height: 200px;
        overflow: auto;
        position: relative;
        .mask {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
        }
      }
    }
  }
  .rom {
    background: white;
    display: block;
    .rom-wrap {
      display: flex;
      flex-direction: column;
      width: 94%;
      margin: 10px auto;
      padding: 15px 10px 30px;
    }
    .rom-tit {
      color: #333;
      font-size: 16px;
      font-weight: 500;
      line-height: 16px;
      margin-bottom: 15px;
    }
    .rom-con {
      color: #333;
      text-align: justify;
      font-size: 14px;
      font-weight: 400;
      line-height: 26px;
      height: 260px;
      max-height: 280px;
      overflow: auto;
    }
  }
  .betBtn {
    display: block;
    width: 100%;
    position: fixed;
    bottom: 0px;
    background: white;
    .betBtn-wrap {
      display: flex;
      width: 94%;
      height: 50px;
      justify-content: center;
      align-items: center;
      color: white;
      border-radius: 6px;
      background: linear-gradient(90deg, #ff9000 16%, #ff4d00 87.23%);
      margin: 10px auto;
    }
  }
  :deep() .bet-header {
    height: 60px;
  }
}
</style>
