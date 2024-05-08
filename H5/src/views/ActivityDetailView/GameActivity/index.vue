<template>
  <div class="main-container Gameactivity">
    <!-- 头部海报 -->
    <img :src="getImg(activityConfig.activityTopApp || '')" class="header-image" />
    <div class="activity-container">
      <div class="block block1">
        <div>
          <h1>{{ $t('Fletter.ActivityTime') }}</h1>
          <p v-if="activityConfig.timeType === 2">{{ $t('Fletter.Long') }}</p>
          <template v-if="activityConfig.timeType === 1">
            <p class="time" style="margin-top: 3px">{{ activityConfig.startTime }}</p>
            <p class="time">{{ activityConfig.endTime }}</p>
          </template>
        </div>
        <div>
          <div>
            <h1>{{ $t('Activity.label1') }}</h1>
            <p>{{ $t('Activity.label20') }}</p>
          </div>
        </div>
        <div>
          <h1>{{ $t('Activity.label3') }}</h1>
          <p>{{ Currency }}</p>
        </div>
      </div>
      <section class="subtitle">
        <h3>{{ $t('Fletter.Activities') }}</h3>
      </section>
      <article class="block block2">
        <template
          v-for="(item, index) in activityConfig.activityContentList"
          :key="item.type + index"
        >
          <p v-if="item.type === 1">
            {{ item.content }}
          </p>
          <img :src="getImg(item.appImg || '')" alt="" srcset="" v-else style="width: 100%" />
        </template>
        <div class="btns">
          <van-button @click="loginOrDeposit()">
            {{ $t('Activity.label4') }}
          </van-button>
          <van-button @click="sportRedirect()"> {{ $t('Activity.label5') }} </van-button>
        </div>
      </article>
      <section class="subtitle">
        <h3>{{ $t('Activity.label6') }}</h3>
      </section>
      <div class="block block3">
        <template v-if="!fbStore.ifMaintain">
          <Team v-for="item in filterMatchList" :key="item.matchId" :info="item" />
        </template>
        <div class="maintain-view" v-else>
          <div class="right">
            <h2>{{ $t('Sportsview.FBSports') }}{{ $t('Sportsview.Maintance') }}</h2>
            <h2>
              <span class="time">{{ fbStore.maintime }}</span>
            </h2>
          </div>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>{{ $t('Activity.label7') }}</th>
            <th>
              {{
                matchConfig.reward?.length
                  ? aType.find((e) => e.value == matchConfig?.reward[0]?.businessType)?.label
                  : aType[0].label
              }}
            </th>
            <th>{{ $t('Activity.label8') }}</th>
            <th>{{ $t('Activity.label9') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in matchConfig?.reward" :key="item.matchId">
            <td>{{ item.vip ? `VIP${item.vip}` : '-' }}</td>
            <td>{{ item.businessValue.toLocaleString() }}</td>
            <td class="amount">{{ item.rewardAmount.toLocaleString() }}</td>
            <td>{{ $t('Activity.label17', [item.multiple]) }}</td>
          </tr>
        </tbody>
      </table>
      <section class="subtitle">
        <h3>{{ $t('Activity.label10') }}</h3>
      </section>
      <div class="gg">
        <img src="./img/scroll-btn.png" alt="" srcset="" class="btn-right" />
        <img src="./img/scroll-btn.png" alt="" srcset="" class="btn-left" />
        <div class="fixed-table-div">
          <table>
            <thead>
              <tr>
                <th>{{ $t('Activity.label11') }}</th>
                <th>{{ $t('Activity.label12') }}</th>
                <th>
                  {{
                    $t('Activity.label13', [
                      matchConfig.reward?.length
                        ? aType.find((e) => e.value == matchConfig?.reward[0]?.businessType)?.label
                        : aType[0].label
                    ])
                  }}
                </th>
                <th>{{ $t('Activity.label14') }}</th>
                <th>{{ $t('Activity.label15') }}</th>
                <th class="fixed-col">{{ $t('Activity.label16') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in records" :key="item.id">
                <td>{{ formatTime(Number(item?.bt)) }}</td>
                <td>{{ item.mn }}</td>
                <td>{{ item.totalAmount.toLocaleString() }}</td>
                <td>{{ item.vl ? `VIP${item.vl}` : '-' }}</td>
                <td>{{ item.sendAmount.toLocaleString() }}</td>
                <td
                  class="fixed-col"
                  :class="{ received: item.status !== 0 }"
                  @click="claimReward(item)"
                >
                  {{ receiveStatus[item.status] }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="btn-div" v-if="!isLogin && !token">
        <van-button class="bet-btn" @click="loginRedirect()">
          {{ $t('Activity.label18') }}
        </van-button>
      </div>
      <section class="subtitle">
        <h3>{{ $t('Fletter.ActivityRules') }}</h3>
      </section>
      <article class="block block4">
        <template v-for="(item, index) in activityConfig.activityRuleList" :key="item.type + index">
          <p v-if="item.type === 1">
            {{ item.content }}
          </p>
          <img :src="getImg(item.appImg || '')" alt="" srcset="" v-else style="width: 100%" />
        </template>
      </article>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { useRoute } from 'vue-router'
import { getImg, formatTime } from '@/utils'
import { getMatchConfig, getFirstChargeData, claimActivity } from '@/api/promotion'
import { useI18n } from 'vue-i18n'
import Team from './Team.vue'
import { useFBStore } from '@/stores/fb'
import { showToast } from 'vant'
import useCurrency from '@/hooks/useCurrency'
import { useMobileEvent } from '@/hooks/useMobileEvent'
// import dayjs from 'dayjs'

const { loginRedirect, depositRedirect, sportRedirect, isEmbeddedInMobile, token } =
  useMobileEvent()

const { Currency } = useCurrency()
const user = useUserStore()
const isLogin = user.isLogin
const route = useRoute()
const i18n = useI18n()
const matchConfig = ref({ reward: [], match: [] })
const records = ref({})
const fbStore = useFBStore()

defineProps(['activityConfig'])

const filterMatchList = computed(() => {
  // const teams = matchConfig.value?.match?.filter((e) => dayjs().isBefore(e.beginTime))
  return matchConfig.value?.match?.sort((a, b) => a.beginTime - b.beginTime)
})

const receiveStatus = {
  0: i18n.t('Activity.label21'),
  1: i18n.t('Activity.label22'),
  2: i18n.t('Activity.label23')
}

const aType = [
  { label: i18n.t('Activity.label25'), value: 1 },
  { label: i18n.t('Activity.label26'), value: 2 }
]

const claimReward = async (item) => {
  const activityId = route.query.activityId
  const { id } = item
  const res = await claimActivity({ id, activityId })
  if (res.code === 200) {
    showToast(i18n.t('Fletter.FletterTip2'))
    getRecord()
  }
}

const getRecord = async () => {
  const { activityId } = route.query
  const { data: ChargeDataRes } = await getFirstChargeData(activityId)
  records.value = ChargeDataRes
}

onMounted(async () => {
  // 没有token则先获取token
  if (!fbStore.FBConfig.FBToken) {
    try {
      await fbStore.getFBToken()
    } catch (e) {
      // console.log('系统繁忙，稍后重试')
    }
  }

  fbStore.getStatistical()

  try {
    const res = await getMatchConfig({ activityId: route.query.activityId })
    matchConfig.value = res.data
  } catch (error) {
    console.log('catch中')
    console.log(error)
  }
})

const loginOrDeposit = () => {
  if (isEmbeddedInMobile) loginRedirect()
  if (token !== '') depositRedirect()
}
</script>

<style lang="scss" scoped>
.header-image {
  width: 100%;
}

.Gameactivity {
  background-color: #e6f7ff;
  min-height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  .activity-container {
    display: flex;
    flex-direction: column;
    margin: 0;
    background-size: 100% auto;
    padding: 0px 16px 50px 16px;
    background-repeat: no-repeat;
    margin-top: -165px;

    .block {
      width: 100%;
      background: white;
      border-radius: 12px;
      border: 1px #ffbd62 solid;

      &.block1 {
        height: 70px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .time {
          font-size: 10px;
          line-height: 1;
        }
        > div {
          width: calc(100% / 3);
          text-align: center;
          position: relative;
          h1 {
            color: #333333;
            font-size: 14px;
            font-weight: 400;
            line-height: 21px;
          }
          p {
            color: #666666;
            font-size: 14px;
            font-weight: 400;
            line-height: 21px;
          }
          &:nth-child(2) {
            div {
              width: 100%;
              display: inline-block;
            }
            &::after,
            &::before {
              content: '';
              background: #eeeeee;
              position: absolute;
              height: 45px;
              width: 2px;
            }
          }
        }
      }

      &.block2 {
        padding: 15px 12px;
        p {
          // 会员在指定赛事比赛开始前24小时内满足存款≥500元并于指定场馆（V体育、FB体育、DB体育）投注指定赛事即可，本场赛事的总负盈利可获得最高100%的本金返还，按照VIP等级的不同最高返还1888元。
          font-size: 14px;
          font-weight: 400;
          line-height: 24px;
          word-wrap: break-word;
          margin-bottom: 10px;
        }

        .btns {
          justify-content: space-between;
          display: flex;
          margin-top: 10px;
          button {
            background: linear-gradient(180deg, #bc3535 0%, #901515 100%);
            border-radius: 4px;

            // 比赛前24小时充值
            color: white;
            font-size: 14px;
            font-weight: 400;
            line-height: 20px;
            word-wrap: break-word;
            padding: 0 10px;
            width: 158px;
            border: unset;
            height: auto;
          }
        }
      }

      &.block3 {
        text-align: center;
        padding: 25px 5px;
      }

      &.block4 {
        padding: 15px 12px;
        p {
          // 会员在指定赛事比赛开始前24小时内满足存款≥500元并于指定场馆（V体育、FB体育、DB体育）投注指定赛事即可，本场赛事的总负盈利可获得最高100%的本金返还，按照VIP等级的不同最高返还1888元。
          color: #333333;
          font-size: 14px;
          font-weight: 400;
          line-height: 24px;
          word-wrap: break-word;
          margin-bottom: 10px;
        }
      }
    }

    table {
      margin-top: 20px;
      border: 1px solid #ffbd62;
      border-collapse: collapse;
      border-right: none;

      th {
        border: 1px solid #ffbd62;
        color: white;
        font-size: 14px;
        font-weight: 400;
        line-height: 50px;
        word-wrap: break-word;
        background-color: #7a1414;
      }

      td {
        line-height: 40px;
        border: 1px solid #ffbd62;
        background-color: white;
        text-align: center;
        color: #333333;
        font-size: 14px;
        font-weight: 400;
        word-wrap: break-word;
        &.amount {
          color: #ff8b02;
        }

        &.received {
          color: #999999;
        }
      }
    }

    .gg {
      position: relative;
      .btn-right,
      .btn-left {
        position: absolute;
        height: 52px;
        top: 21px;
        width: 15px;
      }

      .btn-left {
        transform: rotateY(180deg);
      }

      .btn-right {
        left: 228px;
      }
    }

    .fixed-table-div {
      width: calc(100% - 100px);
      overflow-x: scroll;
      overflow-y: visible;
      padding: 0;

      table {
        width: 700px;
      }
      .fixed-col {
        position: absolute;
        width: 100px;
        right: 0;
        top: auto;
        border-top-width: 1px;
        margin-top: -1px;
      }
    }

    .subtitle {
      h3 {
        // 活动内容
        color: #333333;
        font-size: 20px;
        font-weight: 400;
        word-wrap: break-word;
        margin: 0 10px;
      }

      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      margin: 30px 0 15px 0;
      &::after,
      &::before {
        content: '';
        background: #eeeeee;
        height: 10px;
        width: 54px;
        background-image: url(./img/title-dec.png);
        background-size: contain;
        background-repeat: no-repeat;
        background-color: transparent;
      }

      &::after {
        transform: rotateY(180deg);
      }
    }
  }
}

.btn-div {
  background-color: white;
  display: flex;
  justify-content: center;
  padding: 20px 0;
  .bet-btn {
    background-image: url(./img/bet-btn.png);
    border: none;
    height: 30px;
    background-size: cover;
    color: white;
    font-size: 18px;
    background-repeat: no-repeat;
    margin-top: 10px;
    background-position: bottom;
  }
}

.arrow {
  top: 8px;
  left: 8px;
  position: absolute;
}

.maintain-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .right {
    h2 {
      margin-bottom: 10px;
      font-size: 16px;
    }
    .time {
      color: red;
    }
  }
}
</style>
