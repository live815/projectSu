<template>
  <div class="masterDetail-view">
    <div class="header">
      <div class="header-wrap">
        <div class="header-left" @click="router.back()">
          <img class="backIcon" :src="backIcon" />
        </div>
        <div class="header-tit">{{ $t('AllmastersListview.ExpertHomepage') }}</div>
        <div class="header-right">
          <div class="followbtn" v-if="notFollowed" @click="subscription">
            + {{ $t('AllmastersListview.Focus') }}
          </div>
          <div
            class="followbtn"
            v-else
            @click="unsubscribe"
            :class="[notFollowed == false ? 'activeBtn' : '']"
          >
            {{ $t('AllmastersListview.AlreadyFocus') }}
          </div>
          <div class="num">
            {{ $t('AllmastersListview.FocusNumber', { num: expertInfo?.actualAttentionNum }) }}
          </div>
        </div>
      </div>

      <div class="masterInfo">
        <div class="masterInfo-wrap">
          <div class="img">
            <img :src="getImg(expertInfo?.expertAvatar)" />
          </div>
          <div class="mid">
            <div class="name">{{ expertInfo?.expertName }}</div>
            <div class="labels">
              <div class="tag-box">
                <div class="tag active">
                  {{ $t('AllmastersListview.NearFuture') }}{{ expertInfo?.middleRoundCount }}
                </div>
                <div
                  class="tag"
                  v-for="(ite, index) in handleTags(expertInfo?.expertTag)"
                  :key="index"
                >
                  {{ ite }}
                </div>
              </div>
            </div>
            <div class="tip">{{ expertInfo?.summary }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="con-container">
      <div class="con-wrap">
        <div class="showData">
          <div class="showData-wrap">
            <div class="showData-box">
              <p class="show-num">{{ expertInfo?.allRoundCount }}</p>
              <p>{{ $t('AllmastersListview.All') }}</p>
            </div>
            <div class="line"></div>
            <div class="showData-box">
              <p class="show-num">{{ expertInfo?.monthWinRate }}%</p>
              <p>{{ $t('AllmastersListview.MonthWinRate') }}</p>
            </div>
            <div class="line"></div>
            <div class="showData-box">
              <p class="show-num">{{ expertInfo?.middleRoundCount }}</p>
              <p>{{ $t('AllmastersListview.LongestRed') }}</p>
            </div>
          </div>
        </div>
        <div class="planRecord">
          <div class="planRecord-wrap">
            <div class="planRecord-left">
              <p>{{ $t('AllmastersListview.ProjectRecord') }}</p>
              <p>{{ $t('AllmastersListview.NumberGame') }}</p>
            </div>
            <div class="line"></div>
            <div class="round-box">
              <div class="planRecord-right" v-for="(item, index) in planContent" :key="index">
                <div class="red" v-if="item === 0">{{ $t('AllmastersListview.Red') }}</div>
                <div class="black" v-else-if="item === 1">{{ $t('AllmastersListview.Black') }}</div>
                <div class="yellow" v-else>{{ $t('AllmastersListview.Tie') }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="plansList">
          <div class="tabHeader">
            <div class="tab tabLeft" @click="active = true" :class="{ active: active }">
              <p>{{ $t('AllmastersListview.CurrentPlan') }} ({{ currentData.length }})</p>
            </div>
            <div class="line"></div>
            <div class="tab tabRight" @click="active = false" :class="{ active: !active }">
              <p>{{ $t('AllmastersListview.HistoryPlan') }} ({{ historyData.length }})</p>
            </div>
          </div>
        </div>
        <div class="tabCon">
          <PlanList :data="tabData" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import backIcon from '../img/iconBack.png'
import { useRouter, useRoute } from 'vue-router'
import PlanList from './PlanList.vue'
import { getExpertInfo, attentionExpert, cancelExpert, getAttentionList } from '@/api/live'
import { getImg } from '@/utils'
import { useUserStore } from '@/stores/user.js'
import { getMatchList } from '@/api/fb'
import { getPlanList } from '@/api/live'

const user = useUserStore()
const router = useRouter()
const route = useRoute()
const expertInfo = ref()
const notFollowed = ref(true)
const active = ref(true)
const currentData = ref([]) // 当前方案
const historyData = ref([]) // 历史方案
const param = {
  expertId: Number(route.params.id),
  memberId: user.userInfo.id
}

const init = async () => {
  getExpertInfo(route.params.id).then((res) => {
    expertInfo.value = res.data
  })
  await getAttentionList(param).then((res) => {
    const isActive = res.data.some((item) => item.expertId == route.params.id)
    notFollowed.value = !isActive
  })

  // 当前专家所有推荐方案
  getPlanList().then((res) => {
    const data = res.data.filter((item) => {
      return item.expertId == route.params.id
    })

    // 所有推荐赛事的id
    const arr = data.map((item) => {
      return item.leagueId
    })
    // 三方接口批量查询赛事,查询出的为当前方案
    getMatchList({ matchIds: arr }).then((res) => {
      const arr = res?.records?.map((item) => {
        return item.id
      })
      // 当前方案
      currentData.value = data.filter((item) => arr?.includes(item.leagueId))

      // 历史方案
      historyData.value = arr?.length ? data.filter((item) => !arr?.includes(item.leagueId)) : data
    })
  })
}
init()

const tabData = computed(() => (active.value ? currentData.value : historyData.value))

const planContent = computed(() => {
  const data = expertInfo.value?.planContent ? JSON.parse(expertInfo.value?.planContent) : {}
  let resultArray = []
  Object.entries(data).forEach(([key, value]) => {
    for (let i = 0; i < value; i++) {
      resultArray.push(Number(key))
    }
  })
  resultArray = resultArray.slice(-8)
  return resultArray
})

const subscription = () => {
  attentionExpert(param).then((res) => {
    if (res.code === 200) {
      notFollowed.value = false
      expertInfo.value.actualAttentionNum++
    }
  })
}
const unsubscribe = () => {
  cancelExpert(param).then((res) => {
    if (res.code === 200) {
      notFollowed.value = true
      expertInfo.value.actualAttentionNum--
    }
  })
}
const handleTags = (string) => {
  return string?.split(',')
}
</script>

<style lang="scss" scoped>
.masterDetail-view {
  .header {
    position: fixed;
    height: 176px;
    width: 100%;
    display: flex;
    background: url('../img/masterdetail-bg.png');
    background-size: 100% 100%;
    z-index: 1;
    .header-wrap {
      position: absolute;
      height: 50px;
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      top: 0;
      .backIcon {
        width: 24px;
        height: 24px;
        margin-top: 5px;
      }
      .followbtn {
        display: flex;
        height: 20px;
        padding: 10px 7px 10px 7px;
        justify-content: center;
        align-items: center;
        gap: 10px;
        flex-shrink: 0;
        flex-direction: row;
        border-radius: 200px;
        border: 1px solid #fff;
        color: #fff;
        font-size: 12px;
        width: auto;
      }

      .header-tit {
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        color: #fff;
        font-size: 16px;
      }
      .header-left {
        margin-left: 15px;
      }
      .header-right {
        margin-right: 15px;
        margin-top: 21px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-end;
        .num {
          color: rgba(255, 255, 255, 0.8);

          font-size: 10px;
          font-style: normal;
          font-weight: 400;
          line-height: 20px;
          margin-top: 5px;
        }
        .activeBtn {
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid transparent;
        }
      }
    }
    .masterInfo {
      display: block;
      width: 100%;
      margin-top: 60px;
      padding: 0 15px;
      .masterInfo-wrap {
        display: flex;
        width: 100%;
        height: 84%;
        .img {
          margin-right: 15px;
          img {
            width: 40px;
            height: 40px;
            border-radius: 40px;
            background: url(<path-to-image>), lightgray 50% / cover no-repeat;
          }
        }
        .mid {
          color: #fff;
          .name {
            font-size: 16px;
            font-weight: 500;
            line-height: 16px;
          }
          .labels {
            margin: 10px 0px;
          }
          .tag-box {
            display: flex;
            white-space: nowrap;
            max-width: 300px;
            overflow-x: auto;
            .tag {
              background: rgba(255, 255, 255, 0.2);
              padding: 6px 10px 4px 10px;

              margin-right: 10px;
              border-radius: 20px;
            }
            .active {
              background: var(--1, linear-gradient(90deg, #ff9000 0.17%, #ff5000 101.4%));
            }
          }
          .tip {
            color: rgba(255, 255, 255, 0.8);
            text-align: justify;
            font-size: 12px;
            line-height: 18px;
          }
        }
      }
    }
  }
  .con-container {
    position: relative;
    width: 100%;
    margin: 180px auto 0px;
    background: #f7f7f7;
    .con-wrap {
      display: flex;
      flex-direction: column;
      margin: 0 auto;
      background: #f7f7f7;
      .showData {
        display: block;
        height: 80px;
        margin: 0px auto;
        width: 100%;
        background-color: white;
        .showData-wrap {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-around;
          height: 55px;
          margin: 15px auto;
          width: 94%;
        }
        .line {
          width: 1px;
          height: 40px;
          background: #e3e3e3;
        }
        p {
          color: #666;

          font-size: 13px;
          font-style: normal;
          font-weight: 400;
          line-height: 20px;
        }
        .show-num {
          color: #333;
          text-align: center;
          font-family: DIN Alternate;
          font-size: 24px;
          font-style: normal;
          font-weight: 700;
          line-height: 16px;
          margin-bottom: 10px;
        }
        .showData-box {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      }
      .planRecord {
        height: 58px;
        background: #fff;
        width: 100%;
        display: block;
        margin-bottom: 10px;
        .planRecord-wrap {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          width: 95%;
          background: #f7f7f7;
          height: 48px;
          margin: 0 auto;
        }
        .line {
          width: 1px;
          height: 14px;
          background: #ddd;
          margin-left: 5px;
        }
        .planRecord-left {
          p {
            color: #666;
            text-align: center;

            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: 16px;
          }
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
              font-size: 12px;
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
      .plansList {
        background: #f7f7f7;
        .tabHeader {
          display: inline-flex;
          height: 50px;
          width: 100%;
          align-items: center;
          justify-content: space-around;
          margin-bottom: 10px;
          background: #fff;
          .tab {
            display: flex;
            height: 100%;
            align-items: center;
            justify-content: center;
            flex: 2;
            color: #666;
            font-size: 15px;
            font-weight: 400;
            line-height: 16px;
          }
          .active {
            color: #ff5000;
            font-size: 15px;
            font-weight: 600;
            line-height: 16px;
          }
          .line {
            width: 1px;
            height: 20px;
            background: #e3e3e3;
          }
        }
        .tabCon {
          display: flex;
          width: 100%;
          background: #fff;
          padding-bottom: 40px;
          height: calc(var(--app-height) - 332px);
          overflow: auto;
          .hisPlan,
          .curPlan {
            display: flex;
            width: 100%;
            padding-bottom: 30px;
          }
        }
      }
      .tabCon {
        .hisPlan {
          margin-top: -5px;
        }
      }
    }
  }
}
</style>
