<template>
  <div class="currentPlan-views">
    <div class="currentPlan-wrap">
      <div class="planCard-wrap" v-for="(item, index) in data" :key="index">
        <div class="planCard">
          <div class="top">
            <div class="sessions">{{ $t('AllmastersListview.Singlegame') }}</div>
            <div class="line"></div>
            <div class="name">{{ item.planTitle }}</div>
            <div class="record">{{ $t('AllmastersListview.Red') }}</div>
          </div>
          <div class="mid">
            <div class="mid-up">
              <div class="datetime">{{ dayjs(item.gameTime).format('MM-DD HH:mm') }}</div>
              <div class="line"></div>
              <div class="leagueName">{{ item.leagueName }}</div>
              <div class="line"></div>
              <div class="mainName">{{ item.mainName }}</div>
              <span>VS</span>
              <div class="cusName">{{ item.cusName }}</div>
              <van-icon name="arrow" size="16px" @click="toDetails(item)" />
            </div>
            <OddsGroup
              :item="getOddsData(item.betContent)"
              :betStyle="item.betStyle"
              :marketId="item.marketId"
              :head="false"
              :disabled="true"
            />
          </div>
          <div class="down">
            <div class="down-left">
              {{ dayjs(item.createTime).format('MM-DD HH:mm')
              }}{{ $t('AllmastersListview.release') }}
            </div>
            <div class="down-right">
              <div><img src="../img/icon-eye.png" />{{ item.browseNum }}</div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="data.length < 3" class="nomore">{{ $t('AllmastersListview.nomore') }}</div>
    </div>
  </div>
</template>

<script setup>
import OddsGroup from '@/components/OddsGroup/OddsGroup.vue'
import dayjs from 'dayjs'
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps({
  data: {
    type: Array,
    required: true
  }
})

const getOddsData = (data) => {
  return data ? JSON.parse(data) : {}
}
const toDetails = (item) => {
  router.push({
    path: `/plandetail/${item.leagueId}`,
    query: {
      id: item.id,
      marketId: item.marketId,
      expertId: item.expertId
    }
  })
}
</script>

<style lang="scss" scoped>
.currentPlan-views {
  display: flex;
  width: 100%;
  .currentPlan-wrap {
    display: flex;
    width: 100%;
    flex-direction: column;
    background: #fafafa;
    .planCard-wrap {
      display: flex;
      width: 100%;
      background-color: white;
      margin: 5px 0;
    }
    .planCard {
      display: flex;
      flex-direction: column;
      width: 94%;
      margin: 10px auto 0px;
      .top {
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid #eee;
        justify-content: space-between;
        padding: 5px 0;
        .sessions {
          color: #ff5000;

          font-size: 15px;
          font-style: normal;
          font-weight: 500;
          line-height: 16px;
        }
        .line {
          width: 1px;
          height: 14px;
          background: #ddd;
          margin: 0px 10px;
        }
        .name {
          color: #111;

          font-size: 15px;
          font-style: normal;
          font-weight: 500;
          line-height: 16px;
          margin-right: auto;
        }
        .record {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #fe6506;
          color: #fff;
          font-weight: 500;
          text-align: center;
          line-height: 24px;
          margin-top: -4px;
        }
      }
      .mid {
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
        .mid-up {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-around;
          color: #666;
          font-size: 13px;
          line-height: 16px;
          margin: 10px 0;
          .line {
            width: 1px;
            height: 10px;
            background: #d9d9d9;
          }
          .leagueName {
            @include textToOmit();
          }
          .mainName {
            @include textToOmit(55px);
          }
          .cusName {
            @include textToOmit(55px);
          }
        }
        .mid-down {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-around;
          .type {
            color: #ff5000;
            text-align: center;

            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: 16px;
          }
          .type-btn {
            display: flex;
            align-items: center;
            justify-content: space-around;
            width: 148px;
            height: 38px;
            border-radius: 2px;
            background: #f7f7f7;
            position: relative;
            border: 1px solid transparent;
            .type-rate {
              color: #666;
              text-align: center;

              font-size: 12px;
              font-style: normal;
              font-weight: 400;
              line-height: 16px;
            }
            .type-num {
              color: #111;
              text-align: center;
              font-family: DIN Alternate;
              font-size: 14px;
              font-style: normal;
              font-weight: 700;
              line-height: 16px;
            }
          }
          .active-tab::after {
            content: '';
            background: url(../img//recommend.png);
            background-size: 100% 100%;
            display: block;
            width: 20px;
            height: 10px;
            position: absolute;
            top: -1px;
            right: -1px;
          }
          .active-tab {
            border-radius: 4px;
            border: 1px solid var(--1, #ff9000);
            background: var(--4, #fff5f0);
          }
        }
      }
      .down {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        border-top: 1px solid #eee;
        padding: 10px 0;
        .down-left,
        .down-right {
          color: #999;

          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 16px;
        }
        .down-right {
          display: flex;
          flex-direction: row;
          div {
            display: flex;
            align-items: center;
          }
          img {
            display: inline-block;
            width: 16px;
            height: 16px;
            margin-right: 3px;
          }
        }
      }
    }
    .nomore {
      text-align: center;
      margin-top: 10px;
      color: #999;
      text-align: center;
      font-size: 14px;
      font-weight: 400;
      line-height: 16px;
    }
  }
}
</style>
