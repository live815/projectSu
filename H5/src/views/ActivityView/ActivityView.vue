<template>
  <div class="activity-view">
    <van-tabs
      v-model:active="activeTab"
      sticky
      animated
      swipeable
      @change="changeType"
      :ellipsis="false"
    >
      <van-tab v-for="(tab, index) in tab" :title="tab" :key="index" class="tabs">
        <div class="list">
          <div v-for="(item, idx) in eventList" :key="idx">
            <div class="item" @click="toEvent(item)">
              <div class="icon">
                <img :src="iconImg[item.activityTag]" height="22" />
              </div>
              <div class="img-box">
                <van-image class="img" lazy-load :src="getImg(item.appUrl)">
                  <template v-slot:loading>
                    <DefaultImg styleObj="height:60px" />
                  </template>
                  <template v-slot:error>
                    <DefaultImg styleObj="height:60px" />
                  </template>
                </van-image>
              </div>
              <div class="tip">
                <p class="van-ellipsis">{{ item.title }}</p>
                <div>
                  <span
                    >{{ item.onTime }}<span v-if="item.endTime"> - {{ item.endTime }}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="empty" v-show="!eventList.length">
          <img src="./img/empty-icon.png" alt="" />
          <span>{{ $t('Activity.NoData') }}</span>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import i18n from '@/i18n'
import { promotionStore } from '@/stores/promotion'
import { getImg } from '@/utils'
import { jumpActivity } from '@/utils/jumpActivity'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
const router = useRouter()
const promotion = promotionStore()
const activeTab = ref(0)
const eventList = computed(() => {
  if (promotion.promotionData.eventList) {
    return promotion.promotionData.eventList.filter((item) => {
      return item.activityType == activeTab.value || activeTab.value == 0
    })
  }
  return []
})

const tab = reactive([
  i18n.global.t('Activity.All'),
  i18n.global.t('Activity.Limit'),
  i18n.global.t('Activity.NewMember'),
  i18n.global.t('Activity.Daliy'),
  i18n.global.t('Activity.Vip')
])
const iconImg = ref({
  1: new URL(`./img/${appStore.language}/limit.png`, import.meta.url).href,
  2: new URL(`./img/${appStore.language}/newplayer.png`, import.meta.url).href,
  3: new URL(`./img/${appStore.language}/daliy.png`, import.meta.url).href,
  4: new URL(`./img/${appStore.language}/VIP.png`, import.meta.url).href,
  5: new URL(`./img/${appStore.language}/sport.png`, import.meta.url).href,
  6: new URL(`./img/${appStore.language}/hot.png`, import.meta.url).href
})

const toEvent = (event) => {
  jumpActivity({ event, router })
}
const changeType = () => {
  promotion.getAdvertise()
}
onMounted(() => {
  promotion.getAdvertise()
})
</script>
<style lang="scss" scoped>
@include tabStyle();
.list {
  padding: 0 15px;
  background: #f7f7f7;
  padding-bottom: 25px;
  .item {
    margin-top: 13px;
    height: 196px;
    border-radius: 10px 10px 10px 10px;
    box-shadow: 0 0 1px lightgray, 0.3em 0.3em 1em rgba(0, 0, 0, 0.1);
    background: white;
    position: relative;
    .img-box {
      height: 150px;
      width: 100%;
      overflow: hidden;
      border-radius: 10px 10px 0 0;
      .img {
        width: 100%;
        height: 100%;
      }
    }
    .icon {
      position: absolute;
      width: 120px;
      height: 22px;
      top: 10px;
      left: 0;
    }
    .tip {
      height: 50px;
      width: 100%;
      padding: 5px 20px;
      p {
        color: #111;

        font-size: 13px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px; /* 186.667% */
        letter-spacing: 0.5px;
      }
      span {
        font-style: normal;
        font-weight: 400;
        width: 100%;
        font-size: 12px;
        color: var(--999, #999);
      }
    }
  }
}
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 70px;

  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  color: var(--999, #999);
  img {
    width: 200px;
    height: 126px;
  }
}
.activity-view {
  :deep(.van-sticky) {
    .van-tab--active {
      color: #ff5000;
    }
    .van-tabs__line {
      bottom: 4vw;
      height: 3px; // var(--van-tabs-bottom-bar-height)
      width: 20px;
      background: #ff5000;
    }
    // .van-tab{
    //   padding:0!important;
    // }
  }
}
</style>
<style lang="scss">
.activity-view {
  .van-tab__panel {
    min-height: calc(var(--app-height) - 44px - 60px - 90px);
  }
}
</style>
