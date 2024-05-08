<template>
  <div class="newsList-view">
    <div v-if="planStore.planList.length" class="newsList">
      <div class="newsCard" v-for="(item, index) in planStore.planList" :key="index">
        <div class="first" @click="goDetails(item)">
          <img class="first-img" :src="getImg(item.expertAvatar)" />
          <div class="first-con">
            <div class="first-up">
              <span class="fname">{{ getMasters(item.expertId)?.expertName }}</span>
              <span class="ftime">{{ calculateHoursAgo(item.createTime) }}</span>
            </div>
            <div class="first-down">
              <ul>
                <li class="active">
                  {{ $t('Lletter.nearfuture') }}{{ getMasters(item.expertId)?.middleRoundCount }}
                </li>
                <li
                  v-for="(ite, idx) in handleTag(getMasters(item.expertId)?.expertTag)"
                  :key="idx"
                >
                  {{ ite }}
                </li>
              </ul>
            </div>
          </div>
          <div class="first-right">
            <p class="rate">{{ getMasters(item.expertId)?.recentHitRate }}%</p>
            <p>{{ $t('Lletter.recenthitrate') }}</p>
          </div>
          <img src="../img/icon-right.png" class="iconRight" />
        </div>
        <div class="second">
          <div class="tag">
            {{ item.leagueName }}
          </div>
          <div class="startTime">
            {{ $t('Lletter.Starttime') }}{{ dayjs(item.gameTime).format('MM月DD日 HH:mm') }}
          </div>
          <span class="line"></span>
          <img :src="eyeOpen" class="eyeOpen" />
          <div class="num">{{ item.browseNum }}</div>
        </div>
        <div class="third">
          <p class="tname1">{{ item.mainName }}</p>
          &nbsp;
          <span>VS</span>
          <p class="tname2">{{ item.cusName }}</p>
        </div>
        <div class="forth">
          <div class="forth-wrap">
            <div class="forth-left">
              <p class="rm">{{ $t('Lletter.Betrecommend') }}</p>
              <p class="al">{{ item.betName }}</p>
            </div>
            <div class="line"></div>
            <div class="forth-con">
              <div class="bet-team-name">{{ item.betTeamName }}</div>
              <div class="type-odds">
                {{ item.recommendation?.split(' ')[0] }} @{{ item.recommendation?.split(' ')[1] }}
              </div>
            </div>
            <div class="forth-right" @click="goDetails(item)">{{ $t('Lletter.followinvest') }}</div>
          </div>
        </div>
      </div>
    </div>
    <NoResult v-else :noTxt="$t('Lletter.Nodata')" />
  </div>
</template>

<script setup>
import eyeOpen from '../img/eye-open.png'
import NoResult from '@/components/NoResult/NoResult.vue'
import { useRouter } from 'vue-router'
import { getImg } from '@/utils'
import dayjs from 'dayjs'
import { usePlanStore } from '@/stores/plan'
import i18n from '@/i18n'

const router = useRouter()
const planStore = usePlanStore()

const getMasters = (id) => {
  return planStore.mastersList.find((item) => item.id === id)
}
const goDetails = (item) => {
  router.push({
    path: `/plandetail/${item.leagueId}`,
    query: {
      id: item.id,
      marketId: item.marketId,
      expertId: item.expertId
    }
  })
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
const handleTag = (string) => {
  return string?.split(',')
}
</script>

<style lang="scss" scoped>
.newsList-view {
  height: calc(var(--app-height) - 310px);
  overflow: auto;
  .newsList {
    width: 93%;
    margin: 0 auto;
    padding-bottom: 60px;
    .newsCard {
      display: block;
      border-bottom: 1px solid #eee;
      padding-top: 5px;
      padding-bottom: 20px;
      margin-bottom: 20px;
      .first {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .first-img {
          width: 44px;
          height: 44px;
          border-radius: 50%;
        }
        .first-con {
          .first-up {
            .fname {
              color: #333;

              font-size: 16px;
              font-style: normal;
              font-weight: 500;
              line-height: 16px;
            }
            .ftime {
              color: #999;

              font-size: 12px;
              font-style: normal;
              font-weight: 400;
              line-height: 16px;
              margin-left: 10px;
            }
          }
          .first-down {
            margin-top: 5px;
            ul {
              display: flex;
              white-space: nowrap;
              overflow-x: auto;
              max-width: 200px;
              li {
                color: #ff5000;
                font-size: 10px;
                border-radius: 100px;
                background: var(--4, #fff5f0);
                padding: 5px 7px;
                text-align: center;
                margin-right: 8px;
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
            font-style: normal;
            font-weight: 400;
            line-height: 16px;
          }
          .rate {
            color: var(--2, #ff5000);
            font-family: DIN Alternate;
            font-size: 20px;
            font-style: normal;
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
      .second {
        display: inline-flex;
        align-items: center;
        margin: 10px 0;
        .tag {
          @include textToOmit(80px);
          background: url(../img/tag-bg.png) no-repeat center;
          background-size: 100% 100%;
          width: 80px;
          height: 20px;
          line-height: 20px;
          text-align: center;
          color: white;
          font-size: 13px;
          padding: 0 6px;
        }
        .startTime {
          color: #666;

          font-size: 13px;
          font-style: normal;
          font-weight: 400;
          line-height: 16px;
          margin-left: 10px;
        }
        .line {
          display: block;
          width: 1px;
          height: 10px;
          background: #d9d9d9;
          margin: 0 15px;
        }
        .eyeOpen {
          display: block;
          width: 16px;
          height: 16px;
          margin-right: 5px;
        }
        .num {
          color: #999;

          font-size: 13px;
          font-style: normal;
          font-weight: 400;
          line-height: 16px;
        }
      }
      .third {
        display: flex;
        color: #333;
        font-size: 16px;
        font-weight: 500;
        line-height: 17px;
        margin-bottom: 10px;
        .tname1 {
          @include textToOmit(150px);
        }
        .tname2 {
          @include textToOmit(150px);
          margin-left: 10px;
        }
      }
      .forth {
        display: block;
        border-radius: 8px;
        border: 1px solid rgba(255, 80, 0, 0.3);
        background: #fff5f0;
        width: 100%;
        height: 50px;
        .forth-wrap {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          .forth-left {
            display: flex;
            flex-direction: column;
            p {
              margin-left: 10px;

              font-size: 12px;
              font-style: normal;
              font-weight: 500;
              line-height: 16px;
            }
            .rm {
              color: #ff5000;
            }
            .al {
              color: #333;
            }
          }
          .line {
            width: 1px;
            height: 28px;
            background: #ffe8dd;
          }
          .forth-con {
            color: #333;
            font-size: 13px;
            line-height: 16px;
            display: flex;
            .bet-team-name {
              @include textToOmit(80px);
            }
            .type-odds {
              @include textToOmit(120px);
              margin: 0 20px;
            }
          }
          .forth-right {
            display: flex;
            width: 68px;
            height: 50px;
            border-radius: 0px 8px 8px 0px;
            background: var(--1, linear-gradient(90deg, #ff9000 0.17%, #ff5000 101.4%));
            align-items: center;
            justify-content: center;
            color: #fff;
            font-size: 14px;
            font-weight: 500;
            line-height: 16px;
          }
        }
      }
    }
  }
  .box {
    margin-top: 200px;
  }
}
</style>
