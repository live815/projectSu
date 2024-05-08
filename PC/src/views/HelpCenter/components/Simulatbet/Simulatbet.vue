<template>
  <div class="simulatbet">
    <p>{{$t('HelpCenter.SimulatedBetting')}}</p>
    <div class="slideItem">
      <div
        v-for="(item, index) in dataList"
        :key="index"
        class="tab-box"
        @click="slideClicked(index, item)"
        :class="{ slideActive: index == activeIndex }"
      >
        {{ item.tabname }}
      </div>
    </div>
    <div class="game-content">
      <span class="content-title">{{$t('HelpCenter.MultipleChoiceQuestions')}}</span>
      <span class="content-note">{{$t('HelpCenter.ChooseProfitable')}}</span>
    </div>
    <!--  让球-->
    <div class="game-card" v-if="activeIndex == 0">
      <!-- 左侧队伍 -->
      <CardLeft :cardLeft="rangqiu"></CardLeft>
      <!-- 右侧 -->
      <CardRightwo
        :asenaList="rangqiuList"
        :qiexierList="qiexieList"
        :iconShow="iconShow"
        :activeIndex="activeIndex"
        @clickItem="handleClickItem"
      ></CardRightwo>
    </div>
    <!-- 大小 -->
    <div class="game-card" v-if="activeIndex == 1">
      <!-- 左侧队伍 -->
      <CardLeft :cardLeft="rangqiu"></CardLeft>
      <!-- 右侧 -->
      <CardRightwo
        :asenaList="daxiaoListone"
        :qiexierList="daxiaoListwo"
        :iconShow="iconShowtwo"
        :activeIndex="activeIndex"
        @clickItem="handleClickItem"
      ></CardRightwo>
    </div>
    <!-- 独赢 -->
    <div class="game-card" v-if="activeIndex == 2">
      <CardLeft :cardLeft="rangqiu"></CardLeft>
      <!-- 右侧 -->
      <CardRightwo
        :activeIndex="activeIndex"
        :duyingList="duyingList"
        @clickItem="handleClickItem"
      ></CardRightwo>
    </div>
    <!-- 角球 -->
    <div class="game-card" v-if="activeIndex == 3">
      <CardLeft :cardLeft="jiaoqiu"></CardLeft>
      <!-- 右侧 -->
      <CardRightwo
        :asenaList="jiaoqiuList"
        :qiexierList="jiaoqiuListwo"
        :iconShow="iconShow"
        :activeIndex="activeIndex"
        @clickItem="handleClickItem"
      ></CardRightwo>
    </div>
    <!-- 单双 -->
    <div class="game-card" v-if="activeIndex == 4">
      <CardLeft :cardLeft="rangqiu"></CardLeft>
      <!-- 右侧 -->
      <CardRightwo
        :activeIndex="activeIndex"
        :duyingList="danshuList"
        @clickItem="handleClickItem"
      ></CardRightwo>
    </div>
    <!-- 波胆 -->
    <div class="game-card" v-if="activeIndex == 5">
      <CardLeft :cardLeft="rangqiu"></CardLeft>
      <!-- 右侧 -->
      <CardRightwo
        :activeIndex="activeIndex"
        :duyingList="bodanList"
        @clickItem="handleClickItem"
      ></CardRightwo>
    </div>
    <div v-if="betShow">
      <div class="content-title mg">{{$t('HelpCenter.BettingResults')}}</div>
      <BetResult :resultObj="resultObjtwo" :activeIndex="activeIndex"></BetResult>
    </div>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import BetResult from './components/BetResult.vue'
import CardLeft from './components/CardLeft.vue'
import CardRightwo from './components/CardRightwo.vue'
import { useAppStore } from '@/stores/app'
const appStore = useAppStore()

const dataList = ref([
  { tabname: i18n.global.t('HelpCenter.SavehelpListTitle_2') },
  { tabname: i18n.global.t('HelpCenter.SavehelpListTitle_3') },
  { tabname: i18n.global.t('HelpCenter.WinAlone') },
  { tabname: i18n.global.t('HelpCenter.CornerKick')},
  { tabname: i18n.global.t('HelpCenter.OddAndEven')},
  { tabname: i18n.global.t('HelpCenter.SavehelpListTitle_6')}
])
const activeIndex = ref(0)
const resultObjtwo = ref({})
const betShow = ref(false)
const iconShow = ref(true)
const iconShowtwo = ref(false)

// 左侧list
const rangqiu = ref({
  teamOne: i18n.global.t('HelpCenter.rangqiuteamOne'),
  teamTwo: i18n.global.t('HelpCenter.rangqiuteamTwo'),
  imgOne: new URL('./img/imageone2x.png', import.meta.url).href,
  imgTwo: new URL('./img/image112x.png', import.meta.url).href,
  gameResult: '2-0'
})

const jiaoqiu = ref({
  teamOne: i18n.global.t('HelpCenter.rangqiuteamOne'),
  teamTwo: i18n.global.t('HelpCenter.rangqiuteamTwo'),
  imgOne: new URL('./img/imageone2x.png', import.meta.url).href,
  imgTwo: new URL('./img/image112x.png', import.meta.url).href,
  gameResult: '7-5'
})
// 右侧让球list
const rangqiuList = ref([
  {
    num1: '0',
    num2: '1.98',
    team: i18n.global.t('HelpCenter.rangqiuteamOne'),
    id: '1',
    resultImg: new URL(`./img/${appStore.language}/winpng2x.png`, import.meta.url).href,
    resultText: i18n.global.t('HelpCenter.rangqiuListresultText_1')
  },
  {
    num1: '-0/0.5',
    num2: '1.98',
    team: i18n.global.t('HelpCenter.rangqiuteamOne'),
    id: '2',
    resultImg: new URL(`./img/${appStore.language}/winpng2x.png`, import.meta.url).href,
    resultText:i18n.global.t('HelpCenter.rangqiuListresultText_2')
  },
  {
    num1: '-1',
    num2: '1.98',
    team: i18n.global.t('HelpCenter.rangqiuteamOne'),
    id: '3',
    resultImg: new URL(`./img/${appStore.language}/winpng2x.png`, import.meta.url).href,
    resultText: i18n.global.t('HelpCenter.rangqiuListresultText_3')
  },
  {
    num1: '-1.5/2',
    num2: '1.98',
    team: i18n.global.t('HelpCenter.rangqiuteamOne'),
    id: '4',
    imgpath: new URL('./img/peilv2x.png', import.meta.url).href,
    resultImg: new URL(`./img/${appStore.language}/winhalf2x.png`, import.meta.url).href,
    resultText:i18n.global.t('HelpCenter.rangqiuListresultText_4')
  }
])
const qiexieList = ref([
  {
    num1: '0',
    num2: '1.98',
    team: i18n.global.t('HelpCenter.rangqiuteamTwo'),
    id: '5',
    imgpathred: new URL('./img/peilvup2x.png', import.meta.url).href,
    resultImg: new URL(`./img/${appStore.language}/shu2x.png`, import.meta.url).href,
    resultText: i18n.global.t('HelpCenter.rangqiuListresultText_5')
  },
  {
    num1: '+0/0.5',
    num2: '1.98',
    team: i18n.global.t('HelpCenter.rangqiuteamTwo'),
    id: '6',
    resultImg: new URL(`./img/${appStore.language}/shu2x.png`, import.meta.url).href,
    resultText: i18n.global.t('HelpCenter.rangqiuListresultText_6')
  },
  {
    num1: '+1',
    num2: '1.98',
    team: i18n.global.t('HelpCenter.rangqiuteamTwo'),
    id: '7',
    resultImg: new URL(`./img/${appStore.language}/shu2x.png`, import.meta.url).href,
    resultText: i18n.global.t('HelpCenter.rangqiuListresultText_7')
  },
  {
    num1: '+1.5/2',
    num2: '1.98',
    team: i18n.global.t('HelpCenter.rangqiuteamTwo'),
    id: '8',
    imgpath: new URL('./img/peilv2x.png', import.meta.url).href,
    resultImg: new URL(`./img/${appStore.language}/shuhalf2x.png`, import.meta.url).href,
    resultText:i18n.global.t('HelpCenter.rangqiuListresultText_8')
  }
])

// 右侧大小list
const daxiaoListone = ref([
  {
    num1:i18n.global.t('HelpCenter.daxiaoListonenum1_1'),
    num2: '1.98',
    team: i18n.global.t('HelpCenter.rangqiuteamOne'),
    id: '9',
    resultImg: new URL(`./img/${appStore.language}/winpng2x.png`, import.meta.url).href,
    resultText:i18n.global.t('HelpCenter.daxiaoListoneresultText_1')
  },
  {
    num1: i18n.global.t('HelpCenter.daxiaoListonenum1_2'),
    num2: '1.98',
    team: i18n.global.t('HelpCenter.rangqiuteamOne'),
    id: '10',
    resultImg: new URL(`./img/${appStore.language}/winhalf2x.png`, import.meta.url).href,
    resultText:i18n.global.t('HelpCenter.daxiaoListoneresultText_2')
  },
  {
    num1: i18n.global.t('HelpCenter.daxiaoListonenum1_3'),
    num2: '1.98',
    team:i18n.global.t('HelpCenter.rangqiuteamOne'),
    id: '11',
    resultImg: new URL(`./img/${appStore.language}/tuiqian.png`, import.meta.url).href,
    resultText:i18n.global.t('HelpCenter.daxiaoListoneresultText_3')
  },
  {
    num1: i18n.global.t('HelpCenter.daxiaoListonenum1_4'),
    num2: '1.98',
    team: i18n.global.t('HelpCenter.rangqiuteamOne'),
    id: '12',
    imgpath: new URL('./img/peilv2x.png', import.meta.url).href,
    resultImg: new URL(`./img/${appStore.language}/shuhalf2x.png`, import.meta.url).href,
    resultText:i18n.global.t('HelpCenter.daxiaoListoneresultText_4')
  }
])
const daxiaoListwo = ref([
  {
    num1: i18n.global.t('HelpCenter.daxiaoListwonum1_1'),
    num2: '1.98',
    team: i18n.global.t('HelpCenter.rangqiuteamTwo'),
    id: '13',
    imgpathred: new URL('./img/peilvup2x.png', import.meta.url).href,
    resultImg: new URL(`./img/${appStore.language}/shu2x.png`, import.meta.url).href,
    resultText: i18n.global.t('HelpCenter.daxiaoListworesultText_1')
  },
  {
    num1: i18n.global.t('HelpCenter.daxiaoListwonum1_2'),
    num2: '1.98',
    team: i18n.global.t('HelpCenter.rangqiuteamTwo'),
    id: '14',
    resultImg: new URL(`./img/${appStore.language}/shuhalf2x.png`, import.meta.url).href,
    resultText:i18n.global.t('HelpCenter.daxiaoListworesultText_2')
  },
  {
    num1:  i18n.global.t('HelpCenter.daxiaoListwonum1_3'),
    num2: '1.98',
    team: i18n.global.t('HelpCenter.rangqiuteamTwo'),
    id: '15',
    imgpath: new URL('./img/peilv2x.png', import.meta.url).href,
    resultImg: new URL(`./img/${appStore.language}/tuiqian.png`, import.meta.url).href,
    resultText: i18n.global.t('HelpCenter.daxiaoListworesultText_3')
  },
  {
    num1: i18n.global.t('HelpCenter.daxiaoListwonum1_4'),
    num2: '1.98',
    team: i18n.global.t('HelpCenter.rangqiuteamTwo'),
    id: '16',
    resultImg:  new URL(`./img/${appStore.language}/winhalf2x.png`, import.meta.url).href,
    resultText:i18n.global.t('HelpCenter.daxiaoListworesultText_4')
  }
])
// 角球
const jiaoqiuList = ref([
  {
    num1: '-1.5',
    num2: '1.98',
    team:i18n.global.t('HelpCenter.rangqiuteamOne'),
    id: '17',
    resultImg: new URL(`./img/${appStore.language}/winpng2x.png`, import.meta.url).href,
    resultText:i18n.global.t('HelpCenter.jiaoqiuListresultText_1')
  },
  {
    num1: '-1.5/2',
    num2: '1.98',
    team: i18n.global.t('HelpCenter.rangqiuteamOne'),
    id: '18',
    resultImg: new URL(`./img/${appStore.language}/winhalf2x.png`, import.meta.url).href,
    resultText:i18n.global.t('HelpCenter.jiaoqiuListresultText_2')
  }
])
const jiaoqiuListwo = ref([
  {
    num1: '+1.5',
    num2: '1.98',
    team: i18n.global.t('HelpCenter.rangqiuteamTwo'),
    id: '19',
    resultImg: new URL(`./img/${appStore.language}/shu2x.png`, import.meta.url).href,
    resultText: i18n.global.t('HelpCenter.jiaoqiuListresultText_3')
  },
  {
    num1: '+1.5/2',
    num2: '1.98',
    team: i18n.global.t('HelpCenter.rangqiuteamTwo'),
    id: '20',
    resultImg: new URL(`./img/${appStore.language}/shuhalf2x.png`, import.meta.url).href,
    resultText:i18n.global.t('HelpCenter.jiaoqiuListresultText_4')
  }
])
// 独赢list
const duyingList = ref([
  {
    num1:i18n.global.t('HelpCenter.duyingListnum1_1'),
    num2: '1.98',
    id: '21',
    imgpathred: new URL('./img/peilvup2x.png', import.meta.url).href,
    resultImg: new URL(`./img/${appStore.language}/winpng2x.png`, import.meta.url).href,
    resultText: i18n.global.t('HelpCenter.duyingListresultText_1')
  },
  {
    num1: i18n.global.t('HelpCenter.duyingListnum1_2'),
    num2: '1.98',
    id: '22',
    imgpath: new URL('./img/peilv2x.png', import.meta.url).href,
    resultImg: new URL(`./img/${appStore.language}/shu2x.png`, import.meta.url).href,
    resultText: i18n.global.t('HelpCenter.duyingListresultText_2')
  },
  {
    num1: i18n.global.t('HelpCenter.duyingListnum1_3'),
    num2: '1.98',
    id: '23',
    imgpath: new URL('./img/peilv2x.png', import.meta.url).href,
    resultImg: new URL(`./img/${appStore.language}/shu2x.png`, import.meta.url).href,
    resultText: i18n.global.t('HelpCenter.duyingListresultText_3')
  }
])
// 单双
const danshuList = ref([
  {
    num1: i18n.global.t('HelpCenter.danshuListnum1_1'),
    num2: '1.98',
    id: '23',
    imgpathred: new URL('./img/peilvup2x.png', import.meta.url).href,
    resultImg: new URL(`./img/${appStore.language}/shu2x.png`, import.meta.url).href,
    resultText: i18n.global.t('HelpCenter.danshuListresultText_1')
  },
  {
    num1: i18n.global.t('HelpCenter.danshuListnum1_2'),
    num2: '1.98',
    id: '24',
    imgpath: new URL('./img/peilv2x.png', import.meta.url).href,
    resultImg: new URL(`./img/${appStore.language}/winpng2x.png`, import.meta.url).href,
    resultText: i18n.global.t('HelpCenter.danshuListresultText_2')
  }
])
// 波胆
const bodanList = ref([
  {
    num1: '2-0',
    num2: '1.98',
    id: '25',
    imgpathred: new URL('./img/peilvup2x.png', import.meta.url).href,
    resultImg: new URL(`./img/${appStore.language}/winpng2x.png`, import.meta.url).href,
    resultText: i18n.global.t('HelpCenter.bodanListresultText_1')
  },
  {
    num1: i18n.global.t('HelpCenter.bodanListnum1_2'),
    num2: '1.98',
    id: '26',
    imgpath: new URL('./img/peilv2x.png', import.meta.url).href,
    resultImg: new URL(`./img/${appStore.language}/shu2x.png`, import.meta.url).href,
    resultText:i18n.global.t('HelpCenter.bodanListresultText_2')
  },
  {
    num1: '0-2',
    num2: '1.98',
    id: '27',
    imgpathred: new URL('./img/peilvup2x.png', import.meta.url).href,
    resultImg: new URL(`./img/${appStore.language}/shu2x.png`, import.meta.url).href,
    resultText: i18n.global.t('HelpCenter.bodanListresultText_3')
  }
])
//tab点击切换
const slideClicked = (index, item) => {
  activeIndex.value = index
  betShow.value = false
}
// 子组件点击事件
const handleClickItem = (val) => {
  resultObjtwo.value = val
  betShow.value = true
}
</script>

<style lang="scss" scoped>
.mg {
  margin: 30px 0 16px 0;
}
.simulatbet {
  color: var(--60, rgba(255, 255, 255, 0.6));
  font-size: 16px;
  
  p {
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 30px;
    line-height: normal;
    color: #fff;
  }
  .slideItem {
    display: flex;
    margin-bottom: 30px;
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
  .slideActive {
    background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
    color: #ffffff;
  }
  .content-title {
    color: #ffffff;
    margin-right: 12px;
  }
  .game-content {
    display: flex;
    align-items: center;
    margin-bottom: 16px;

    .content-note {
      font-size: 12px;
    }
  }
  .game-card {
    border-radius: 6px;
    background: var(--unnamed, #1d223c);
    height: 120px;
    display: flex;
  }
}
</style>
