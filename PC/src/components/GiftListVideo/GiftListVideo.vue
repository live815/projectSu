<template>
    <div :class="[liveStore.liveBtn?'boxGift':'boxGiftFalse']">
      <div class="gift" v-for="(item,index) in liveStore.giftList" :key="index" v-if="liveStore.giftList?.length>0">
          <div class="giftNum">x{{item.content.description.giftNum}}</div>
          <div class="giftDiv">
              <div class="giftImg">
                  <img width="32" height="32" :src="getImgUrl(item.content.description.giftSmallImage)">
              </div>
              <div class="giftName">
                  <div class="nameTxt">
                      <p class="p1">{{item.from}}</p>
                      <p class="p2">{{$t('Components.SendOut')}} {{item.content.description.giftName}}</p>
                  </div>
                  <img class="giftUserImg" width="28" height="28" v-if="item.content.description.avatar" :src="avatarList[item.content.description.avatar].img">
                  <img class="giftUserImg" width="28" height="28" v-else :src="avatarList[0].img">
              </div>
          </div>
      </div>
    </div>
  </template>
  <script setup>
  import { useLiveStore } from '@/stores/liveBroadcast'
  import { watch } from 'vue';
  import { getImgUrl } from '@/utils/cache'
  import { avatarList } from '@/utils/config'
  const liveStore = useLiveStore()
  watch(
      ()=>liveStore.giftList,
      (newGiftList) => { 
          if(newGiftList && newGiftList.length>0){
              setTimeout(() => {
                  liveStore.giftList.shift()
              }, 2000) 
              console.log(newGiftList)
          }
      },
      { deep: true }
  )
  </script>
  <style scoped lang="scss">
  .boxGift,.boxGiftFalse {
      position: absolute;
      top: 120px;
      .gift{
          display: flex;
          align-items: center;
          margin-bottom: 10px;
      }
      .giftNum{
          color: #FFF;
          text-shadow: 0px 1px 2px #FF5C00;
          font-family: TencentSans;
          font-size: 28px;
          font-style: normal;
          font-weight: 700;
          line-height: 16px; /* 57.143% */
          margin-right: 15px;
         
      }
      .giftImg{
          padding-left: 8px;
      }
      .giftDiv{
          width: 176px;
          height: 44px;
          flex-shrink: 0;
          border-radius: 8px;
          background: #070C1B;
          display: flex;
          align-items: center;
          justify-content: space-between;
      }
      .giftName{
          display: flex;
          align-items: center;
          .nameTxt{
              display: flex;
              flex-direction: column;
              align-items: end;
              padding-right: 6px;
          }
          .p1{
              max-width: 80px;
              color: #FFF;
              
              font-size: 12px;
              font-style: normal;
              font-weight: 400;
              line-height: 12px; /* 100% */
              white-space: nowrap;      /* 防止文本换行 */
              text-overflow: ellipsis;
              overflow: hidden;   
          }
          .p2{
              color: #FF9000;
              
              font-size: 14px;
              font-style: normal;
              font-weight: 400;
              line-height: 12px; /* 85.714% */ 
              padding-top: 4px;
          }
          .giftUserImg{
              border-radius: 50%;
              margin-right: 8px;
          }
      }
  }
  .boxGiftFalse{
      position: absolute;
      top: 120px;
      left: none !important;
      right: 20px !important;
  }
  .boxGift{
      position: absolute;
      left: 750px;
  }
  </style>