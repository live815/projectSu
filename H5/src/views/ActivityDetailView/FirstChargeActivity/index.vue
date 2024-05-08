<template>
  <div class="first-charge-container">
    <div v-if="loading" class="loading-box">
      <van-loading vertical>{{ $t('common.loading') }}</van-loading>
    </div>
    <!-- 头部海报 -->
    <div class="main-header" v-show="!loading">
      <div class="header-img">
        <img :src="getImg(bannerData.imgUrl || '')" alt="" />
      </div>
      <ul class="header-info-bar">
        <li>
          <h3>{{ $t('Fletter.ActivityTime') }}</h3>
          <p class="small-text">
            {{
              bannerData.startTime == null
                ? $t('Fletter.Long')
                : `${getFromatDate(bannerData.startTime)} - ${getFromatDate(bannerData.endTime)}`
            }}
          </p>
        </li>
        <li>
          <h3>{{ $t('Fletter.ParticipatWay') }}</h3>
          <p>{{ $t('Fletter.MembershipRecharge') }}</p>
        </li>
        <li>
          <h3>{{ $t('Activity.Royal.label1') }}</h3>
          <p>{{ $t('Fletter.Applicableallplat') }}</p>
        </li>
      </ul>
    </div>
    <!-- 活动内容 -->
    <div class="card" v-if="contentData" v-show="!loading">
      <h1>
        <span> {{ $t('Fletter.Activities') }} </span>
      </h1>
      <article>
        <template v-for="(item, index) in contentData" :key="index">
          <p v-if="item.type == 1">{{ item.content }}</p>
          <img v-else :src="getImg(item.appImg || '')" />
        </template>
      </article>
    </div>
    <!-- 活动条件 -->
    <div class="card" v-if="contentData" v-show="!loading">
      <h1>
        <span>{{ $t('Fletter.ActivityCondit') }}</span>
      </h1>
      <EventCondition
        ref="eventCondition"
        :conditionData="conditionData"
        :userAcitivtyData="userAcitivtyData"
        :currentBill="currentBill"
      />
      <table>
        <thead>
          <tr class="tr-row">
            <th>{{ $t('Fletter.FirstDepositAmount') }}({{ Currency }})</th>
            <th class="middle-con">{{ $t('Fletter.AccumulaValidBet') }}</th>
            <th>{{ $t('Fletter.RewardAmount') }}</th>
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
    <!-- 领取按钮 -->
    <claimBtn
      :userAcitivtyData="userAcitivtyData"
      v-show="!loading"
      @toClaim="toClaim"
      :isQualified="isQualified"
    />
    <!-- 活动规则 -->
    <div class="card" v-if="ruleData" v-show="!loading">
      <h1>
        <span>{{ $t('Fletter.Activities') }}</span>
      </h1>
      <article>
        <template v-for="(item, index) in ruleData" :key="index">
          <p v-if="item.type == 1">{{ item.content }}</p>
          <img v-else :src="getImg(item.appImg || '')" />
        </template>
      </article>
    </div>
  </div>
</template>

<script setup>
import EventCondition from './components/EventCondition'
import claimBtn from './components/claimBtn'
import { useUserStore } from '@/stores/user'
import { getImg, getFromatDate } from '@/utils'
import { showToast } from 'vant'
import { useRoute } from 'vue-router'
import { getFirstChargeData, getBetTotal, claimActivity } from '@/api/promotion'
import i18n from '@/i18n'
import { useMobileEvent } from '@/hooks/useMobileEvent'
import useCurrency from '@/hooks/useCurrency'

const { Currency } = useCurrency()
const user = useUserStore()
const { isEmbeddedInMobile } = useMobileEvent()
const route = useRoute()
const eventCondition = ref(null)
const props = defineProps(['activityConfig'])

onMounted(async () => {
  try {
    loading.value = true

    const promises = []

    if (user.isLogin || !isEmbeddedInMobile) {
      promises.push(getFirstChargeData(route.query.activityId))
      promises.push(getBetTotal(route.query.activityId))
    }
    const results = await Promise.all(promises)
    const firstChargeRes = results[0]
    const betTotalRes = results[1]

    if (firstChargeRes && firstChargeRes.code === 200) {
      userAcitivtyData.value = firstChargeRes.data
    }

    if (betTotalRes && betTotalRes.code === 200) {
      betTotalRes.data.forEach((item) => {
        currentBill.value += item.lobbyTypeValidBet.validBet
      })
    }
  } catch (error) {
    console.log('catch中')
    console.log(error)
  } finally {
    loading.value = false
  }
})

// 有效下注流水
const currentBill = ref(0)
// 用户的活动数据
const userAcitivtyData = ref({})
// 领取奖励
const claimData = ref({ activityId: '', id: '', level: 0 })
const toClaim = async () => {
  claimData.value.id = userAcitivtyData.value.id
  claimData.value.activityId = props.activityConfig.id
  claimData.value.level = isQualified.value
  await user.getUserInfoAction()
  if (user.userInfo.status.includes('6')) {
    showToast(i18n.global.t('Fletter.FletterTip1'))
  } else {
    claimActivity(claimData.value).then((res) => {
      if (res.code == 200) {
        userAcitivtyData.value.status = 2
        showToast(i18n.global.t('Fletter.FletterTip2'))
      }
    })
  }
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
  temp.startTime = props.activityConfig.startTime || null
  temp.endTime = props.activityConfig.endTime || null
  temp.imgUrl = props.activityConfig.activityTopApp || null
  return temp
})
// 活动内容
const contentData = computed(() => {
  if (props.activityConfig.activityContentList && props.activityConfig.activityContentList.length) {
    return props.activityConfig.activityContentList
  } else {
    return null
  }
})
// 活动条件
const conditionData = computed(() => {
  if (props.activityConfig.rewardConfigList && props.activityConfig.rewardConfigList.length) {
    return props.activityConfig.rewardConfigList
  } else {
    return null
  }
})
// 活动规则
const ruleData = computed(() => {
  if (props.activityConfig.activityRuleList && props.activityConfig.activityRuleList.length) {
    return props.activityConfig.activityRuleList
  } else {
    return null
  }
})

// 加载状态
const loading = ref('true')
</script>

<style lang="scss" scoped>
.main-header {
  width: 100%;
  img {
    width: 100vw;
    height: 200px;
    margin: 0 -15px;
  }
}

ul.header-info-bar {
  position: relative;
  display: flex;
  justify-content: space-between;
  // align-items: center;
  width: 100%;
  li {
    text-align: center;
    list-style-type: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    width: 113.051px;
    h3 {
      border-radius: 6px 6px 0px 0px;
      width: 100%;
      color: #fff;
      font-size: 16px;
      background: linear-gradient(180deg, #ff7c13 0%, #eb4e1a 100%);
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      &::before {
        content: '';
        background-image: url(./img/watermark.png);
        position: absolute;
        width: 100%;
        height: 38px;
        left: 0;
        background-repeat: no-repeat;
        background-size: 80%;
        background-position: center;
      }
    }
    p {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      color: #ee5519;
      font-size: 14px;
      background-color: #fff;
      line-height: 18px;
      margin-top: 2px;
      border-radius: 0px 0px 6px 6px;
      height: 45px;
    }
  }
}

.small-text {
  margin-top: 4px;
  font-weight: 600;
  font-size: 12px;
}

.card {
  background: #fff;
  width: 100%;
  padding: 10px 15px;
  border-radius: 15px;
  border-top: 3px solid rgb(254, 47, 1);

  > h1 {
    color: #f05919;
    font-size: 20px;
    font-weight: 600;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
    position: relative;
    span {
      z-index: 1;
    }
    &::before {
      content: '';
      position: absolute;
      top: 2px;
      display: block;
      background-image: url(./img/watermark2.png);
      background-size: contain;
      height: 18px;
      width: 130px;
      background-position: center;
      background-repeat: no-repeat;
    }
    &::after {
      content: '';
      display: block;
      background-image: url(./img/tag.png);
      height: 5px;
      width: 205px;
      background-position: center;
      background-repeat: no-repeat;
      margin-top: 5px;
    }
  }

  article {
    p {
      color: #c1630c;
      font-size: 14px;
      font-weight: 400;
      line-height: 24px;
      word-wrap: break-word;
      margin-bottom: 10px;
    }
  }

  .btn {
    position: relative;
    margin: 14px -15px 0;
    &::before,
    &::after {
      content: '';
      position: absolute;
      height: 40px;
      width: 12px;
      background-size: contain;
      top: 1px;
      left: 0;
      background-image: url(./img/scroll-btn.png);
    }
    &::before {
      transform: rotateY(180deg);
    }
    &::after {
      left: calc(100% - 12px);
    }
  }

  table {
    width: 100%;
    color: #c1630c;
    text-align: center;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    th {
      font-size: 14px;
      background: linear-gradient(180deg, #ffa120 0%, #ffb320 100%);
      height: 50px;
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
      font-size: 14px;
      height: 50px;
    }
  }
}

.first-charge-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0;
  padding: 0px 15px 15px 15px;
  background-color: #ffad3c;
}
.loading-box {
  margin: 20px auto;
}
</style>
