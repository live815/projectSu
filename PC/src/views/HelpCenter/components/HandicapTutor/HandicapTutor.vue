<!-- 盘口教程 -->
<template>
  <div class="handicapTutor">
    <p>{{ $t('HelpCenter.HandicapTutorial') }}</p>
    <div class="slideItem">
      <div
        v-for="(item, index) in dataList"
        :key="index"
        class="tab-box"
        @click="slideClicked(index, item)"
        :class="{ slideActive: activeIndex == index }"
      >
        {{ item.tabname }}
      </div>
    </div>
    <!-- 让球 -->
    <div class="teach-box" v-if="activeIndex == 0">
      <div class="teach-text">
        {{ $t('HelpCenter.HandicapTutorTips_1') }}
      </div>
      <div class="img-box">
        <div class="img-item" v-for="(item, index) in imgList" :key="index">
          <img :src="[appStore.language=='zh-cn'?item.imgpath:item.imgpath2]" />
        </div>
      </div>
    </div>
    <!-- 大小 -->
    <div class="teach-box" v-if="activeIndex == 1">
      <div class="img-box">
        <div class="img-item" v-for="(item, index) in daxiaoList" :key="index">
          <img :src="[appStore.language=='zh-cn'?item.imgpath:item.imgpath2]" />
        </div>
      </div>
    </div>
    <!-- 独赢 -->
    <div class="teach-box" v-if="activeIndex == 2">
      <div class="img-box">
        <div class="img-item" v-for="(item, index) in duyingList" :key="index">
          <img :src="[appStore.language=='zh-cn'?item.imgpath:item.imgpath2]" />
        </div>
      </div>
    </div>
    <!-- 角球 -->
    <div class="teach-box" v-if="activeIndex == 3">
      <div class="teach-text">
        {{ $t('HelpCenter.HandicapTutorTips_2') }}
      </div>
      <div class="img-box">
        <div class="img-item" v-for="(item, index) in jiaoqiuList" :key="index">
          <img :src="[appStore.language=='zh-cn'?item.imgpath:item.imgpath2]" />
        </div>
      </div>
    </div>
    <!-- 单双 -->
    <div class="teach-box" v-if="activeIndex == 4">
      <div class="img-box">
        <div class="img-item" v-for="(item, index) in danshuList" :key="index">
          <img :src="[appStore.language=='zh-cn'?item.imgpath:item.imgpath2]" />
        </div>
      </div>
    </div>
    <div class="teach-box" v-if="activeIndex == 5">
      <div class="img-box">
        <div class="img-itemr" v-for="(item, index) in bodanList" :key="index">
          <img :src="[appStore.language=='zh-cn'?item.imgpath:item.imgpath2]" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import { useAppStore } from '@/stores/app'
const appStore = useAppStore() 

const dataList = ref([
  { tabname: i18n.global.t('HelpCenter.SavehelpListTitle_2') },
  { tabname: i18n.global.t('HelpCenter.SavehelpListTitle_3') },
  { tabname: i18n.global.t('HelpCenter.WinAlone') },
  { tabname: i18n.global.t('HelpCenter.CornerKick') },
  { tabname: i18n.global.t('HelpCenter.OddAndEven') },
  { tabname: i18n.global.t('HelpCenter.SavehelpListTitle_6') }
])
const activeIndex = ref(0)
const imgList = ref([
  { imgpath: new URL('./img/1.png', import.meta.url).href ,imgpath2: new URL('./img/1-1.png', import.meta.url).href},
  { imgpath: new URL('./img/2.png', import.meta.url).href ,imgpath2: new URL('./img/2-2.png', import.meta.url).href },
  { imgpath: new URL('./img/3.png', import.meta.url).href  ,imgpath2: new URL('./img/3-3.png', import.meta.url).href},
  { imgpath: new URL('./img/4.png', import.meta.url).href ,imgpath2: new URL('./img/4-4.png', import.meta.url).href },
  { imgpath: new URL('./img/5.png', import.meta.url).href  ,imgpath2: new URL('./img/5-5.png', import.meta.url).href},
  { imgpath: new URL('./img/6.png', import.meta.url).href  ,imgpath2: new URL('./img/6-6.png', import.meta.url).href},
  { imgpath: new URL('./img/7.png', import.meta.url).href  ,imgpath2: new URL('./img/7-7.png', import.meta.url).href},
  { imgpath: new URL('./img/8.png', import.meta.url).href  ,imgpath2: new URL('./img/8-8.png', import.meta.url).href}
])
const daxiaoList = ref([{ imgpath: new URL('./img/daxiao.png', import.meta.url).href,imgpath2: new URL('./img/daxiao-1.png', import.meta.url).href }])
const duyingList = ref([{ imgpath: new URL('./img/duying.png', import.meta.url).href,imgpath2: new URL('./img/duying-1.png', import.meta.url).href }])
const danshuList = ref([{ imgpath: new URL('./img/danshu.png', import.meta.url).href,imgpath2: new URL('./img/danshu-1.png', import.meta.url).href }])
const jiaoqiuList = ref([{ imgpath: new URL('./img/jiaoqiu.png', import.meta.url).href,imgpath2: new URL('./img/jiaoqiu-1.png', import.meta.url).href }])
const bodanList = ref([{ imgpath: new URL('./img/bodan.png', import.meta.url).href,imgpath2: new URL('./img/bodan-1.png', import.meta.url).href  }])

//点击切换
const slideClicked = (index, item) => {
  activeIndex.value = index
}
</script>

<style lang="scss" scoped>
.handicapTutor {
  p {
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 30px;
    color: #fff;
    line-height: normal;
  }
  .slideItem {
    display: flex;
    margin-bottom: 20px;
    color: var(--60, rgba(255, 255, 255, 0.6));
    .tab-box {
      width: 104px;
      height: 40px;
      text-align: center;
      padding: 10px 12px;
      border-right: 1px solid #52556a;
      border-top: 1px solid #52556a;
      border-bottom: 1px solid #52556a;
      white-space: nowrap;
      cursor: pointer;
    }
    div:last-child {
      border-radius: 0px 6px 6px 0px;
    }
    div:first-child {
      border-radius: 6px 0px 0px 6px;
      border-left: 1px solid #52556a;
    }
  }
  .teach-box {
    .teach-text {
      font-size: 12px;
      padding: 16px;
      height: 48px;
      line-height: 48px;
      color: var(--60, rgba(255, 255, 255, 0.6));

      line-height: 16px;
      border-radius: 6px;
      background: var(--unnamed, #1d223c);
      margin-bottom: 30px;
    }
    .img-box {
      .img-item {
        margin-bottom: 20px;
        img {
          width: 1000px;
        }
      }
      .img-itemr {
        margin-bottom: 20px;
        img {
          width: 501px;
        }
      }
    }
  }
}
.slideActive {
  background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
  color: #ffffff;
}
</style>
