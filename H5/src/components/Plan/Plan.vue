<template>
  <div v-for="item in data" :key="item.id">
    <div class="head">
      <img class="left" :src="getImg(getExpert(item.expertId)?.expertAvatar)" />
      <div class="center">
        <div class="title">
          <div class="name">{{ item?.expertName }}</div>
          <div class="label">
            {{ $t('common.recentsHits') }}{{ getExpert(item.expertId)?.middleRoundCount }}
          </div>
          <div class="tab-box">
            <div
              v-for="(item, index) in handlelTag(getExpert(item.expertId)?.expertTag)"
              :key="index"
              class="label label2"
            >
              {{ item }}
            </div>
          </div>
        </div>
        <div class="text">{{ getExpert(item.expertId)?.summary }}</div>
      </div>
      <div class="right">
        <div class="number">{{ getExpert(item.expertId)?.recentHitRate }}%</div>
        <div class="text">{{ $t('common.recentsHitsRate') }}</div>
      </div>
    </div>
    <div class="conten">
      <div class="scheme-title">
        <p>{{ item.planTitle }}</p>
        <van-icon name="arrow" size="16" @click="toDetails(item)" />
      </div>
      <div class="odds-card">
        <div class="game-name">{{ item.matchedDetail?.nm }}</div>
        <!-- 赔率Group -->
        <OddsGroup
          v-if="item.matchedDetail"
          :item="item.matchedDetail"
          :betStyle="item.betStyle"
          :marketId="item.marketId"
          :disabled="true"
          :head="false"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import OddsGroup from '@/components/OddsGroup/OddsGroup.vue'
import { getImg } from '@/utils'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  mastersList: {
    type: Array,
    required: true
  }
})

const getExpert = (id) => {
  return props.mastersList.find((item) => item.id == id)
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
const handlelTag = (string) => {
  return string?.split(',')
}
</script>

<style lang="scss" scoped>
.head {
  @include center-content(space-between, center);
  margin: 15px 0;
  .left {
    width: 40px;
    height: 40px;
    margin-right: 8px;
    border-radius: 50%;
  }
  .center {
    .title {
      display: flex;
      .name {
        color: #333;
        font-size: 14px;
        font-weight: 600;
        line-height: 20px;
      }
      .label {
        height: 18px;
        line-height: 18px;
        padding: 0 4px;
        border-radius: 100px;
        background: #ff5701;
        color: #fff;
        font-size: 10px;
        margin-left: 3px;
        border: 1px solid #ff5000;
        white-space: nowrap;
      }
      .tab-box {
        display: flex;
        max-width: 115px;
        overflow-x: auto;
        white-space: nowrap;
      }
      .label2 {
        background: transparent;
        border: 1px solid #ff5000;
        color: var(--2, #ff5000);
      }
    }
    .text {
      @include textToOmit(200px);
      color: #999;
      font-size: 12px;
      font-weight: 400;
      margin-top: 8px;
    }
  }
  .right {
    margin-left: auto;
    text-align: right;
    .number {
      color: var(--1, #f53f3f);
      font-family: DIN Alternate;
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 3px;
    }
    .text {
      color: #666;
      font-size: 11px;
      font-weight: 400;
    }
  }
}
.conten {
  width: 351px;
  border-radius: 8px;
  background: #f8f8f8;
  .scheme-title > p {
    @include textToOmit(300px);
    height: 40px;
    color: #111;
    font-size: 15px;
    font-weight: 600;
    line-height: 40px;
    padding: 0 12px;
  }
  .scheme-title {
    position: relative;
    .van-icon {
      position: absolute;
      right: 10px;
      top: 13px;
    }
  }

  .odds-card {
    width: 351px;
    border-radius: 8px;
    border: 0.5px solid #ececec;
    background: #fff;
    padding: 12px;
    .game-name {
      color: var(--2, #ff5000);
      font-weight: 600;
      margin-bottom: 8px;
    }
  }
}
</style>
