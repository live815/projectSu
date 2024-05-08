<template>
  <div class="Information-view">
    <div class="information-top-wrap">
      <div class="bannerImg">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item
            v-for="(item, index) of promotion.promotionData.planBanner"
            :key="index"
            @click="jumpActivity({ event: item, router })"
          >
            <img class="banner" :src="getImg(item.appUrl)" />
          </van-swipe-item>
        </van-swipe>
      </div>

      <div v-if="planStore.mastersList.length" class="listWrap">
        <div class="allMasters" @click="toGo">
          <div class="allList">
            <div class="allIcon">
              <img :src="allIcon" />
            </div>
            <p>{{ $t('Lletter.allgreatgods') }}</p>
            <p>{{ planStore.mastersList.length }}</p>
          </div>
        </div>

        <div class="masterWrap">
          <div class="masters-select">
            <div
              v-for="(item, index) in planStore.mastersList"
              :key="index"
              class="masterCard"
              @click="openPersonPage(item.id)"
            >
              <img class="iconImg" :src="getImg(item.expertAvatar)" />
              <p class="name">{{ item?.expertName }}</p>
              <div class="lab">{{ $t('Lletter.nearfuture') }}{{ item?.middleRoundCount }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="con">
        <van-tabs>
          <van-tab :title="$t('Lletter.bymatch')" name="game">
            <GameLists />
          </van-tab>
          <van-tab :title="$t('Lletter.bybreaknews')" name="news">
            <NewsLists />
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script setup>
import allIcon from './img/allIcon.png'
import { useRouter } from 'vue-router'
import GameLists from './components/GameLists.vue'
import NewsLists from './components/NewsLists.vue'
import { getImg } from '@/utils'
import { usePlanStore } from '@/stores/plan'
import { promotionStore } from '@/stores/promotion'
import { jumpActivity } from '@/utils/jumpActivity'
const promotion = promotionStore()
const router = useRouter()
const planStore = usePlanStore()

const init = () => {
  if (!promotion.promotionData.planBanner) {
    promotion.getAdvertise()
  }
  planStore.getExpertList()
  planStore.getPlanList()
}
init()

function openPersonPage(id) {
  router.push(`/masterDetail/${id}`)
}

const toGo = () => {
  router.push('/allmasterslist')
}
</script>

<style lang="scss" scoped>
@include tabStyle(); //引入tab选中状态的样式
.Information-view {
  .listWrap {
    display: block;
    height: 135px;
    background: white;
  }
  .bannerImg {
    width: 343px;
    height: 106px;
    margin: 0 auto;
    img {
      width: 343px;
      height: 106px;
      border-radius: 8px;
    }
  }
  .allMasters {
    display: inline-block;
    height: 89px;
    text-align: center;
    margin: 25px 0px;
    position: absolute;
    .allList {
      display: block;
      width: 80px;
      height: 89px;
      border-right: 1px solid #eee;
      p {
        color: #333;

        font-size: 13px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px;
      }
    }
    .allIcon {
      display: block;
      width: 40px;
      height: 40px;
      margin: 5px auto;

      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
  .masterWrap {
    position: relative;
    margin-left: 80px;
    display: flex;
    align-items: center;
    height: 100%;
  }
  .masters-select {
    position: relative;
    display: flex;
    overflow-x: auto;
    height: 100%;
    .masterCard {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex: none;
      margin: 10px 10px 0px;
      .iconImg {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      .name {
        color: #333;

        font-size: 13px;
        font-style: normal;
        font-weight: 400;
        line-height: 16px;
        margin: 10px auto 5px;
      }
      .lab {
        display: flex;
        height: 18px;
        padding: 10px;
        justify-content: center;
        align-items: center;
        gap: 10px;
        flex-shrink: 0;
        background: var(--1, linear-gradient(90deg, #ff9000 0.17%, #ff5000 101.4%));
        border-radius: 20px;
        color: white;
        font-size: 10px;
      }
    }
  }
  .con {
    background: white;
    position: absolute;
    width: 100%;
    :deep() {
      .van-tabs__wrap {
        width: 40%;
        position: sticky;
      }
      .van-tab__text--ellipsis {
        color: #111;
      }
      .van-tabs__line {
        width: 45px;
      }
      .van-tabs__content {
        // position: absolute
        position: relative;
        width: 95%;
        left: 10px;
      }
    }
  }
}
</style>
