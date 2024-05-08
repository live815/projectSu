<template>
  <div class="boxRecords">
    <div class="bodyDiv" v-for="(item, index) in liveStore.anchorGift" :key="index">
      <div class="giftDiv">
        <div class="giftLeft">
          <img
            height="16"
            width="36"
            :src="vipLive[item.content.description.vip]"
          />
          <div class="g1">{{ item.from }}</div>
          <div class="g2">{{$t('AnchorPlay.SendOut')}} {{ item.content.description.giftName }}</div>
          <img height="20" width="20" :src="getImgUrl(item.content.description.giftSmallImage)" />
          <div class="g3">x {{ item.content.description.giftNum }}</div>
        </div>
        <div class="g4">{{ dayjs.unix(item.date).format('HH:mm') }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getImgUrl } from '@/utils'
import dayjs from 'dayjs'
import { useLiveStore } from '@/stores/liveBroadcast'
import { vipLive } from '@/utils/config.js'
const liveStore = useLiveStore()
</script>

<style lang="scss" scoped>
.boxRecords {
  margin: 20px 10px;
  .bodyDiv {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .giftDiv {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .giftLeft{
        display: flex;
        align-items: center;
      }
      .g1 {
        max-width: 70px;
        color: var(--100, #fff);
        
        font-size: 12px;
        font-style: normal;
        font-weight: 600;
        white-space: nowrap; /* 防止文字换行 */
        overflow: hidden; /* 隐藏溢出的部分 */
        text-overflow: ellipsis; /* 显示省略号 */
        margin: 0 3px;
      }
      .g2 {
        color: var(--100, #fff);
        
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        margin-right: 3px;
      }
      .g3 {
        color: var(--unnamed, #ff9000);
        font-family: TencentSans;
        font-size: 12px;
        font-style: normal;
        font-weight: 700;
        margin-left: 2px;
      }
      .g4 {
        color: var(--60, rgba(255, 255, 255, 0.6));
        
        font-size: 10px;
        font-style: normal;
        font-weight: 400;
        margin-left: 4px;
      }
    }
    .txt {
      margin-left: 5px;
    }
  }
}
</style>
