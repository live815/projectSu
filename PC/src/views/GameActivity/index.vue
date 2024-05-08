<template>
  <div class="main-container">
    <!-- 头部海报 -->
    <img :src="getImgUrl(activityConfig.activityTopWeb)" class="header-image" />
    <div class="activity-container">
      <div class="block">
        <div class="block-content block1" :class="{ type1: activityConfig.timeType === 1 }">
          <div>
            <h1>{{ $t('Fletter.ActivityTime') }}</h1>
            <p>
              {{
                activityConfig.timeType === 2 ? $t('Fletter.Long') : `${activityConfig.startTime}`
              }}
            </p>
            <p v-if="activityConfig.timeType === 1">{{ activityConfig.endTime }}</p>
          </div>
          <div>
            <h1>{{ $t('Activity.label1') }}</h1>
            <p>{{ $t('Activity.label20') }}</p>
          </div>
          <div>
            <h1>{{ $t('Activity.label3') }}</h1>
            <p>{{ Currency }}</p>
          </div>
        </div>
      </div>
      <section class="subtitle">
        <h3>{{ $t('Fletter.Activities') }}</h3>
      </section>
      <div class="block">
        <div class="block-content block2">
          <template
            v-for="(item, index) in activityConfig.activityContentList"
            :key="item.type + index"
          >
            <p v-if="item.type === 1">
              {{ item.content }}
            </p>
            <img :src="getImg(item.appImg)" alt="" srcset="" v-else style="width: 100%" />
          </template>
          <div class="btns">
            <el-button @click="eventBus.emit('showCharge', { isOpen: true })">
              {{ $t('Activity.label4') }}
            </el-button>
            <el-button @click="$router.push('/sports')">
              {{ $t('Activity.label5') }}
            </el-button>
          </div>
        </div>
      </div>
      <section class="subtitle">
        <h3>{{ $t('Activity.label6') }}</h3>
      </section>
      <div class="block">
        <div class="block-content block3" v-if="!fbStore.ifMaintain">
          <Team v-for="item in filterMatchList" :key="item.matchId" :info="item" />
        </div>
        <div class="maintain-view block-content block3" v-else>
          <div class="right">
            <h2>{{ $t('SportsView.FBSports') }}{{ $t('SportsView.Maintance') }}</h2>
            <h2>
              {{ $t('SportsView.maintainTime') }}：<span class="time">{{ fbStore.maintime }}</span>
            </h2>
          </div>
          <!-- <div class="left">
            <img :src="maintain" alt="" />
          </div> -->
        </div>
      </div>
      <div class="block table1">
        <div class="block-content">
          <table>
            <thead>
              <tr>
                <th>{{ $t('Activity.label7') }}</th>
                <th>
                  {{
                    matchConfig?.reward?.length
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
        </div>
      </div>
      <section class="subtitle">
        <h3>{{ $t('Activity.label10') }}</h3>
      </section>
      <div class="block table2">
        <div class="block-content">
          <table>
            <thead>
              <tr>
                <th>{{ $t('Activity.label11') }}</th>
                <th>{{ $t('Activity.label12') }}</th>
                <th>
                  {{
                    $t('Activity.label13', [
                      matchConfig?.reward?.length
                        ? aType.find((e) => e.value == matchConfig?.reward[0]?.businessType)?.label
                        : aType[1].label
                    ])
                  }}
                </th>
                <th>{{ $t('Activity.label14') }}</th>
                <th>{{ $t('Activity.label15') }}</th>
                <th class="fixed-col">{{ $t('Activity.label16') }}</th>
              </tr>
            </thead>
            <tbody v-if="records?.length">
              <tr v-for="item in records" :key="item.id">
                <td>{{ formatTime(Number(item?.bt)) }}</td>
                <td>{{ item.mn }}</td>
                <td>{{ item.totalAmount.toLocaleString() }}</td>
                <td>{{ item.vl ? `VIP${item.vl}` : '-' }}</td>
                <td>{{ item.sendAmount.toLocaleString() }}</td>
                <td class="received" @click="claimReward(item)">
                  {{ receiveStatus[item.status] }}
                </td>
              </tr>
            </tbody>
          </table>
          <el-button
            class="bet-btn"
            @click="
              user.setLoginDialogAction({
                isShowLoginDialog: true,
                currentPage: 'login'
              })
            "
            v-if="!isLogin"
          >
            {{ $t('Activity.label18') }}
          </el-button>
        </div>
      </div>
      <section class="subtitle">
        <h3>{{ $t('Fletter.ActivityRules') }}</h3>
      </section>
      <div class="block">
        <article class="block-content block4">
          <template
            v-for="(item, index) in activityConfig.activityRuleList"
            :key="item.type + index"
          >
            <p v-if="item.type === 1">
              {{ item.content }}
            </p>
            <img :src="getImgUrl(item.appImg)" alt="" srcset="" v-else style="width: 100%" />
          </template>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { useRoute } from 'vue-router'
import { getImgUrl, formatTime } from '@/utils'
import {
  getActivityDetil,
  getMatchConfig,
  getFirstChargeData,
  claimActivity
} from '@/api/promotion'
import { getPublicIPAddress } from '@/utils'
import { useI18n } from 'vue-i18n'
import Team from './components/Team.vue'
import { useFBStore } from '@/stores/fb'
import { ElMessage } from 'element-plus'
import useCurrency from '@/hooks/useCurrency'
import eventBus from '@/utils/eventBus'
import dayjs from 'dayjs'
import maintain from './img/maintain.png'

const { Currency } = useCurrency()
const user = useUserStore()
const isLogin = user.isLogin
const route = useRoute()
const i18n = useI18n()
const loading = ref('true') // 加载状态
const activityConfig = ref({})
const matchConfig = ref({ reward: [], match: [] })
const records = ref({})
const fbStore = useFBStore()

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
    ElMessage({ message: i18n.t('Fletter.FletterTip2'), type: 'success' })
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
  const { advertiseId, activityId, type } = route.query
  const requestData = { advertiseId, activityId, enterLocation: Number(type), deviceType: 1 }

  try {
    loading.value = true

    if (!isLogin) {
      await getPublicIPAddress().then((ip) => {
        requestData.memberUserName = ip
        requestData.tenantId = '1'
      })
    } else getRecord()

    const { data } = await getActivityDetil(requestData)
    activityConfig.value = data

    const res = await getMatchConfig({ activityId })
    matchConfig.value = res.data
  } catch (error) {
    console.log('catch中')
    console.log(error)
  } finally {
    loading.value = false
  }
})
</script>

<style lang="scss" scoped>
.header-image {
  width: 100%;
}

div.main-container {
  background-color: #101010;
  min-height: 100vh;
  width: 90vw;
  overflow-x: hidden;
  margin: 0 -20px -20px -5px;
  .activity-container {
    display: flex;
    flex-direction: column;
    margin: 0;
    background-size: 100% auto;
    padding: 0px 16px 50px 16px;
    background-repeat: no-repeat;
    margin-top: -120px;

    .block {
      width: 100%;
      margin: 0 auto;
      width: 1100px;

      &::before,
      &::after {
        content: '';
        border: 4px #6d0809 solid;
        height: 28px;
        display: block;
        box-sizing: border-box;
        line-height: 1;
      }

      &::before {
        border-bottom: unset;
        background: linear-gradient(135deg, #6d0809 18px, #101010 0) top left,
          linear-gradient(-135deg, #6d0809 18px, #101010 0) top right;
        background-size: 60% 100%;
        background-repeat: no-repeat;
        clip-path: polygon(0 28px, 28px 0, calc(100% - 28px) 0, 100% 28px);
      }

      &::after {
        border: unset;
        background-image: url(./img/frame.png);
        background-size: contain;
        height: 38px;
      }

      .block-content {
        border: 4px #6d0809 solid;
        border-top: unset;
        border-bottom: unset;

        &.block1 {
          height: 80px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #101010;
          > div {
            width: calc(100% / 3);
            text-align: center;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 80px;

            h1 {
              color: white;
              font-size: 24px;
              font-weight: 400;
              line-height: 30px;
              word-wrap: break-word;
            }
            p {
              color: white;
              font-size: 24px;
              font-weight: 400;
              word-wrap: break-word;
              flex-grow: 1;
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }

          &.type1 > div:first-child p {
            font-size: 18px;
          }
        }

        &.block2 {
          padding: 5px 30px;
          p {
            // 会员在指定赛事比赛开始前24小时内满足存款≥500元并于指定场馆（V体育、FB体育、DB体育）投注指定赛事即可，本场赛事的总负盈利可获得最高100%的本金返还，按照VIP等级的不同最高返还1888元。
            color: white;
            font-size: 20px;
            font-weight: 400;
            line-height: 36px;
            word-wrap: break-word;
          }

          .btns {
            justify-content: space-between;
            display: flex;
            margin-top: 35px;
            button {
              background: linear-gradient(180deg, #bc3535 0%, #901515 100%);
              border-radius: 4px;
              white-space: break-spaces;
              // 比赛前24小时充值
              color: white;
              font-size: 24px;
              font-weight: 400;
              line-height: 30px;
              word-wrap: break-word;
              padding: 0;
              width: 510px;
              height: 80px;
              border: unset;
              margin-left: 0;
            }
          }
        }

        &.block3 {
          text-align: center;
          padding: 15px 12px;
        }

        &.block4 {
          padding: 10px 30px;
          p {
            // 会员在指定赛事比赛开始前24小时内满足存款≥500元并于指定场馆（V体育、FB体育、DB体育）投注指定赛事即可，本场赛事的总负盈利可获得最高100%的本金返还，按照VIP等级的不同最高返还1888元。
            color: white;
            font-size: 16px;
            font-weight: 400;
            line-height: 30px;
            word-wrap: break-word;
            margin-bottom: 20px;
            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }
    }

    table {
      border-collapse: collapse;
      border-right: none;
      margin: 0 auto;

      th {
        color: white;
        font-size: 20px;
        font-weight: 400;
        line-height: 70px;
        word-wrap: break-word;
        background-color: #7a1414;
      }

      td {
        line-height: 70px;
        text-align: center;
        color: white;
        font-size: 20px;
        font-weight: 400;
        word-wrap: break-word;

        &.amount {
          color: #edd0a0;
        }
      }
    }

    .table1 {
      margin-top: 30px;
      .block-content {
        padding: 20px 0;
        table {
          border: 1px solid #4c4c5b;
          width: 1000px;

          th {
            border: 1px solid #4c4c5b;
          }

          td {
            border: 1px solid #4c4c5b;
            &.amount {
              color: #edd0a0;
            }
          }
        }
      }
    }

    .table2 {
      .block-content {
        padding: 10px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        table {
          border: 1px solid #000000;
          width: 1080px;

          th {
            border: 1px solid #000000;
          }

          td {
            border: 1px solid #000000;

            &.received {
              color: #edd0a0;
            }
          }

          tr {
            background-color: #1d1d1d;
            &:nth-child(odd) {
              background-color: #252525;
            }
          }
        }

        button {
          width: 160px;
          margin-top: 30px;
        }
      }
    }

    .subtitle {
      h3 {
        color: white;
        font-size: 48px;
        font-weight: 400;
        word-wrap: break-word;
        margin: 0 10px;
      }

      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      margin: 70px 0 45px 0;
      &::after,
      &::before {
        content: '';
        background: #eeeeee;
        height: 30px;
        width: 144px;
        background-image: url(./img/title-dec.png);
        background-size: contain;
        background-repeat: no-repeat;
        background-color: transparent;
        margin-top: 15px;
      }

      &::after {
        transform: rotateY(180deg);
      }
    }
  }

  .bet-btn {
    background-image: url(./img/bet-btn.png);
    background-position: bottom;
    border: none;
    height: 42px;
    min-width: 135px;
    background-size: cover;
    color: white;
    font-size: 18px;
    background-repeat: no-repeat;
    margin-top: 10px;
  }
}

.maintain-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .left {
    img {
      width: 700px;
    }
  }
  .right {
    color: white;
    text-align: center;
    h2 {
      margin-bottom: 10px;
    }
    .time {
      color: red;
    }
  }
}
</style>
