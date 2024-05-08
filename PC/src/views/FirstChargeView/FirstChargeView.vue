<template>
  <div class="main-container">
    <header>
      <img :src="getImg(bannerData.imgUrl)" alt="" />
    </header>
    <div class="content">
      <section>
        <ul>
          <li>
            <h3>{{ $t('FirstChargeView.ActivityTime') }}</h3>
            <p class="small-text">
              {{
                bannerData.startTime == null
                  ? $t('FirstChargeView.Long')
                  : `${getFromatDate(bannerData.startTime)}-${getFromatDate(bannerData.endTime)}`
              }}
            </p>
          </li>
          <li>
            <h3>{{ $t('FirstChargeView.WayOfParticipation') }}</h3>
            <p>{{ $t('FirstChargeView.FirstTimeRechargeMembership') }}</p>
          </li>
          <li>
            <h3>{{ $t('FirstChargeView.ApplicablePlatforms') }}</h3>
            <p>{{ $t('FirstChargeView.ApplicableToAllPlatforms') }}</p>
          </li>
        </ul>
        <!-- 活动内容 -->
        <div class="card" v-if="contentData" v-show="!loading">
          <div class="card-content">
            <h1>
              <span>{{ $t('Activity.Royal.label6') }}</span>
            </h1>
            <article>
              <template v-for="(item, index) in contentData" :key="index">
                <p v-if="item.type == 1">{{ item.content }}</p>
                <img v-else :src="getImg(item.webImg)" />
              </template>
            </article>
          </div>
        </div>
        <!-- 活动条件 -->
        <div class="card" v-if="contentData" v-show="!loading">
          <div class="card-content">
            <h1>
              <span>{{ $t('FirstChargeView.ActivityConditions') }}</span>
            </h1>
            <EventCondition
              ref="eventCondition"
              :conditionData="conditionData"
              :userAcitivtyData="userAcitivtyData"
              :currentBill="currentBill"
              v-show="!loading"
            />
            <table>
              <thead>
                <tr class="tr-row">
                  <th>{{ $t('FirstChargeView.FirstDepositAmount') }}（{{ Currency }}）</th>
                  <th class="middle-con">{{ $t('FirstChargeView.AccumulatedValidBets') }}</th>
                  <th>{{ $t('FirstChargeView.RewardAmount') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in conditionData" :key="index">
                  <td>≥{{ (item.initialDeposit * 1).toLocaleString() }}</td>
                  <td class="middle-con">{{ (item.totalBetAmount * 1).toLocaleString() }}</td>
                  <td>{{ (item.rewardAmount * 1).toLocaleString() }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 领取按钮 -->
        <claimBtn
          :userAcitivtyData="userAcitivtyData"
          v-show="!loading"
          @toClaim="toClaim"
          :isQualified="isQualified"
        />
        <!-- 活动规则 -->
        <div class="card">
          <div class="card-content">
            <h1>
              <span>{{ $t('FirstChargeView.ActivityRules') }}</span>
            </h1>
            <article>
              <template v-for="(item, index) in ruleData" :key="index">
                <p v-if="item.type == 1">{{ item.content }}</p>
                <img v-else :src="getImg(item.webImg)" />
              </template>
            </article>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { getImg, getFromatDate } from '@/utils'
import EventCondition from './components/EventCondition'
import claimBtn from './components/claimBtn'
import { useUserStore } from '@/stores/user'
import { useRoute } from 'vue-router'
import { getActivityDetil, getFirstChargeData, getBetTotal, claimActivity } from '@/api/promotion'
import { getPublicIPAddress } from '@/utils'
import i18n from '@/i18n'
import useCurrency from '@/hooks/useCurrency'

const { Currency } = useCurrency()
const user = useUserStore()
const route = useRoute()
const eventCondition = ref(null)
onMounted(async () => {
  getData()
})
const getData = async () => {
  try {
    loading.value = true
    requestData.value.advertiseId = route.query.advertise
    requestData.value.activityId = route.query.activity
    requestData.value.enterLocation = route.query.type * 1
    if (!user.isLogin) {
      await getPublicIPAddress().then((ip) => {
        requestData.value.memberUserName = ip
        requestData.value.tenantId = '1'
      })
    }
    const [activityRes, firstChargeRes, betTotalRes] = await Promise.all([
      getActivityDetil(requestData.value),
      user.isLogin ? getFirstChargeData(requestData.value.activityId) : null,
      user.isLogin ? getBetTotal(requestData.value.activityId) : null
    ])
    if (activityRes && activityRes.code === 200) {
      activityData.value = activityRes.data
    }

    if (firstChargeRes) {
      userAcitivtyData.value = firstChargeRes.data
    }

    if (betTotalRes) {
      betTotalRes.data.forEach((item) => {
        currentBill.value += item.lobbyTypeValidBet.validBet
      })
    }
  } finally {
    loading.value = false
  }
}

// 有效下注流水
const currentBill = ref(0)
// 活动数据
const activityData = ref({})
// 用户的活动数据
const userAcitivtyData = ref({})
// 领取奖励
const isLoading = ref(false) //防止重复领取
const claimData = ref({
  activityId: '',
  id: '',
  level: 0
})
const toClaim = () => {
  if (isLoading.value) {
    return
  } else {
    isLoading.value = true
  }
  claimData.value.id = userAcitivtyData.value.id
  claimData.value.activityId = activityData.value.id
  claimData.value.level = isQualified.value
  claimActivity(claimData.value)
    .then((res) => {
      if (res.code == 200) {
        ElMessage.success(i18n.global.t('common.claimSuccess'))
        userAcitivtyData.value.status = 2
        isLoading.value = false
      } else {
        ElMessage.warning(i18n.global.t('common.claimFail'))
        isLoading.value = false
      }
    })
    .catch((err) => {
      console.log(err, 'err')
      ElMessage.warning(i18n.global.t('common.claimFail'))
      isLoading.value = false
    })
}

// 判断流水等级和是否达到要求
const isQualified = computed(() => {
  if (eventCondition.value) {
    return eventCondition.value.currentLevel
  }
})

// 头部海报
const bannerData = computed(() => {
  let temp = {}
  temp.startTime = activityData.value.startTime || null
  temp.endTime = activityData.value.endTime || null
  temp.imgUrl = activityData.value.activityTopWeb || null
  return temp
})

const contentData = computed(() => {
  if (activityData.value.activityContentList && activityData.value.activityContentList.length) {
    return activityData.value.activityContentList
  } else {
    return null
  }
})
// 活动条件
const conditionData = computed(() => {
  if (activityData.value.rewardConfigList && activityData.value.rewardConfigList.length) {
    return activityData.value.rewardConfigList
  } else {
    return null
  }
})
// 活动规则
const ruleData = computed(() => {
  if (activityData.value.activityRuleList && activityData.value.activityRuleList.length) {
    return activityData.value.activityRuleList
  } else {
    return null
  }
})

const requestData = ref({
  activityId: '',
  advertiseId: '',
  deviceType: 1,
  enterLocation: 0
})

// 加载状态
const loading = ref('true')
</script>

<style scoped lang="scss">
div.main-container {
  margin: 0 -20px -20px -5px;
  background-color: #e6f7ff;
  min-height: 100vh;
  overflow-x: hidden;
  background-color: #ffa935;
  header img {
    width: 100%;
  }
  .content {
    padding-bottom: 70px;
    // background-image: url(./img/container-bg.png);
    background-size: 100%;
    background-repeat: no-repeat;
    position: relative;
    box-sizing: border-box;
    > section {
      width: 1100px;
      margin: -30px auto 0;
      ul {
        display: flex;
        gap: 25px;
        padding-left: 0;

        li {
          text-align: center;
          list-style-type: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-weight: 500;
          width: 356px;
          h3 {
            width: 100%;
            color: #fff;
            font-size: 32px;
            border-radius: 10px 10px 0px 0px;
            background: linear-gradient(180deg, #ff7c13 0%, #eb4e1a 100%);
            line-height: 75px;
            position: relative;
            &::before {
              content: '';
              background-image: url(./img/watermark.png);
              position: absolute;
              width: 100%;
              height: 75px;
              left: 0;
              background-repeat: no-repeat;
              background-size: 70%;
              background-position: center;
            }
          }
          p {
            width: 100%;
            color: #ee5519;
            font-size: 24px;
            background-color: #fff;
            line-height: 84px;
            border-radius: 0px 0px 10px 10px;
          }
        }
      }
      .card {
        border-radius: 17px 17px 20px 20px;
        margin-top: 35px;
        position: relative;
        background-image: linear-gradient(269deg, #ff3e00 0.03%, #ff0101 98.74%);
        padding-top: 8px;

        .card-content {
          background: #fff;
          width: 100%;
          padding: 30px;
          border-radius: 20px;
          > h1 {
            color: #f05919;
            font-size: 48px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-bottom: 30px;
            position: relative;
            span {
              z-index: 1;
              font-weight: 600;
            }
            &::before {
              content: '';
              top: 5px;
              position: absolute;
              display: block;
              background-image: url(./img/watermark2.png);
              background-size: contain;
              height: 45px;
              width: 400px;
              background-position: center;
              background-repeat: no-repeat;
            }
            &::after {
              content: '';
              display: block;
              background-image: url(./img/tag.png);
              height: 10px;
              width: 470px;
              background-size: contain;
              background-position: center;
              background-repeat: no-repeat;
              margin-top: 15px;
            }
          }
        }

        article {
          p {
            color: #c1630c;
            font-size: 16px;
            font-weight: 400;
            margin-bottom: 20px;
            line-height: 25px;
          }
        }

        table {
          width: 100%;
          color: #804e14;
          text-align: center;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
          th {
            font-size: 18px;
            background: linear-gradient(180deg, #ffa120 0%, #ffb320 100%);
            height: 60px;
            color: #e43010;
          }
          tbody {
            tr {
              &:nth-child(even) td {
                background: #fff3e0;
              }
              &:nth-child(odd) td {
                background: #fff8ed;
              }
            }
          }
          td {
            font-size: 16px;
            height: 60px;
          }
        }
      }
    }
  }
}
</style>
