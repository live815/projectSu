<template>
  <div class="gameList-view">
    <div v-if="groupedData.length" class="gameList">
      <div
        class="gameCard"
        v-for="(item, index) of groupedData"
        :key="index"
        @click="onClickEvent(item)"
      >
        <div class="left">
          <img :src="sportIconActive[item.sportsType] || defaultIcon" />
        </div>
        <div class="con">
          <div class="con-up">
            <span class="dateTime">{{ dayjs(item.gameTime).format('MM-DD HH:mm') }}</span>
            <span class="team-name">{{ item.leagueName }}</span>
          </div>
          <div class="con-down">
            <div class="tn mainName">{{ item.mainName }}</div>
            <div class="score">{{ item.score }}VS</div>
            <div class="tn">{{ item.cusName }}</div>
          </div>
        </div>
        <div class="right">
          <p>{{ item.child.length }}</p>
          <img src="../img/icon-right.png" class="iconRight" />
        </div>
      </div>
    </div>
    <NoResult v-else :noTxt="$t('Lletter.Nodata')" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { sportIconActive } from '@/utils/config'
import NoResult from '@/components/NoResult/NoResult.vue'
import defaultIcon from '@/assets/img/default-team-logo.png'
import dayjs from 'dayjs'
import { usePlanStore } from '@/stores/plan'

const router = useRouter()
const planStore = usePlanStore()

const groupedData = computed(() => {
  const groups = planStore.planList.reduce((groups, item) => {
    const groupKey = item.leagueId

    // 如果该分组尚不存在，则创建一个对象，包含 child 数组和 leagueId 对应的信息
    if (!groups[groupKey]) {
      groups[groupKey] = {
        child: [],
        mainName: item.mainName,
        cusName: item.cusName,
        gameTime: item.gameTime,
        leagueName: item.leagueName,
        sportsType: item.sportsType
      }
    }
    // 将当前项的引用添加到分组对象的 child 数组中
    groups[groupKey].child.push(item)
    return groups
  }, {})
  return Object.values(groups)
})

function onClickEvent(item) {
  const id = item.child[0].leagueId
  router.push(`/PlanList/${id}`)
}
</script>

<style lang="scss" scoped>
.gameList-view {
  height: calc(var(--app-height) - 332px);
  overflow: auto;
  padding-bottom: 20px;
  // position: absolute;
  .gameList {
    width: 93%;
    margin: 10px auto;
    padding-bottom: 40px;
    .gameCard {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 60px;
      border-bottom: 1px solid #eeee;
      .left {
        img {
          display: block;
          width: 20px;
          height: 20px;
        }
      }
      .con {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        line-height: 20px;
        width: 250px;
        .con-up {
          display: flex;
          color: #666;

          font-size: 12px;
          line-height: 16px;
          height: 14px;
          .dateTime {
            margin-right: auto;
            border-right: 1px solid lightgray;
            padding-right: 10px;
            margin-right: 10px;
          }
          .team-name {
            @include textToOmit(150px);
          }
        }
        .con-down {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 10px;
          .tn {
            @include textToOmit(90px);
            color: #111;

            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: 16px;
            width: 90px;
          }
          .mainName {
            text-align: right;
          }
          .score {
            color: #ff5000;
            font-family: DIN Alternate;
            font-size: 18px;
            font-style: normal;
            font-weight: 700;
            line-height: 16px;
            margin: 0 20px;
          }
        }
      }
      .right {
        display: flex;
        align-items: center;
        p {
          color: #000;

          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 16px;
          display: block;
          width: 18px;
          height: 18px;
          border: 1px solid #ddd;
          background: #fff;
          text-align: center;
        }
        img {
          margin-left: 12px;
        }
      }
      .iconRight {
        width: 12px;
        height: 12px;
      }
      .svg {
        transform: scale(1.3);
        fill: #999;
      }
    }
  }
  .box {
    margin-top: 200px;
  }
}
</style>
