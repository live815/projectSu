<template>
  <div class="outter-main">
    <NavBar :title="$t('Hletter.SimulatBet')" v-if="!isCTYWebApp() && !isIOSPure() && !token" />
    <div class="bet-type-row">
      <div
        :class="index == currentBetType ? 'bet-type-btn active' : 'bet-type-btn'"
        v-for="(item, index) in betType"
        :key="index"
        @click="currentBetType = index"
      >
        {{ item }}
      </div>
    </div>
    <!-- 让球 -->
    <div class="bet-container" v-show="currentBetType == 0">
      <div class="sub-title">
        {{ $t('Hletter.SigleChose') }}<span>{{ $t('Hletter.HletterTip2') }}</span>
      </div>
      <div class="bet-box">
        <div class="match-row">
          <div class="team-name">
            {{ $t('Hletter.TeamName1') }}
            <img src="./img/arsenal_small.png" />
          </div>
          <div class="score">
            <div>{{ $t('Hletter.GameResult') }}</div>
            <span>2 - 0</span>
          </div>
          <div class="team-name">
            <img src="./img/chelsea_big.png" />
            {{ $t('Hletter.TeamName2') }}
          </div>
        </div>
        <div class="bet-view">
          <img src="./img/arsenal_small.png" />
          <div
            :class="currentBox == item.id ? 'active detail' : 'detail'"
            v-for="(item, index) in upBetDetail"
            :key="index"
            @click="currentBox = item.id"
          >
            <span>{{ item.top }}</span>
            <div>{{ item.bot }}</div>
          </div>
        </div>
        <div class="bet-view">
          <img src="./img/chelsea_small.png" />
          <div
            :class="currentBox == item.id ? 'active detail' : 'detail'"
            v-for="(item, index) in underBetDetail"
            :key="index"
            @click="currentBox = item.id"
          >
            <span>{{ item.top }}</span>
            <div>{{ item.bot }}</div>
          </div>
        </div>
      </div>
      <div v-for="(item, index) in betResult" :key="index">
        <template v-if="currentBox == item.id">
          <div class="sub-title">{{ $t('Hletter.BetResult') }}</div>
          <div class="bet-result">
            <img class="logo" :src="item.img" alt="" />
            <div class="bet-result-title">
              {{ item.title }}<span>{{ item.titleNum }}</span>
            </div>
            <div class="bet-content">
              {{ item.content }}
            </div>
          </div>
        </template>
      </div>
    </div>
    <!-- 大小 -->
    <div class="bet-container" v-show="currentBetType == 1">
      <div class="sub-title">
        {{ $t('Hletter.SigleChose') }}<span> {{ $t('Hletter.HletterTip2') }}</span>
      </div>
      <div class="bet-box">
        <div class="match-row">
          <div class="team-name">
            {{ $t('Hletter.TeamName1') }}
            <img src="./img/arsenal_small.png" width="40" height="40" />
          </div>
          <div class="score">
            <div>{{ $t('Hletter.GameResult') }}</div>
            <span>2 - 0</span>
          </div>
          <div class="team-name">
            <img src="./img/chelsea_big.png" width="40" height="40" />
            {{ $t('Hletter.TeamName2') }}
          </div>
        </div>
        <div class="bet-view">
          <img src="./img/arsenal_small.png" />
          <div
            :class="currentBox == item.id ? 'active detail' : 'detail'"
            v-for="(item, index) in upBetDetail"
            :key="index"
            @click="currentBox = item.id"
          >
            <span>{{ item.bigSmall }}</span>
            <div>{{ item.bot }}</div>
          </div>
        </div>
        <div class="bet-view full-line" style="">
          <img src="./img/chelsea_small.png" />
          <div
            :class="currentBox == item.id ? 'active detail' : 'detail'"
            v-for="(item, index) in underBetDetail"
            :key="index"
            @click="currentBox = item.id"
          >
            <span>{{ item.bigSmall }}</span>
            <div>{{ item.bot }}</div>
          </div>
        </div>
      </div>
      <div v-for="(item, index) in betResult" :key="index">
        <template v-if="currentBox == item.id">
          <div class="sub-title">{{ $t('Hletter.BetResult') }}</div>
          <div class="bet-result">
            <img class="logo" :src="item.img" alt="" />
            <div class="bet-result-title">
              {{ item.bigSmallTitle }}<span>{{ item.bigSmallTitleNum }}</span>
            </div>
            <div class="bet-content">
              {{ item.bigSmallTitleContent }}
            </div>
          </div>
        </template>
      </div>
    </div>
    <!-- 独赢 -->
    <div class="bet-container" v-show="currentBetType == 2">
      <div class="sub-title">
        {{ $t('Hletter.SigleChose') }}<span> {{ $t('Hletter.HletterTip2') }}</span>
      </div>
      <div class="bet-box">
        <div class="match-row">
          <div class="team-name">
            {{ $t('Hletter.TeamName1') }}
            <img src="./img/arsenal_small.png" width="40" height="40" />
          </div>
          <div class="score">
            <div>{{ $t('Hletter.GameResult') }}</div>
            <span>2 - 0</span>
          </div>
          <div class="team-name">
            <img src="./img/chelsea_big.png" width="40" height="40" />
            {{ $t('Hletter.TeamName2') }}
          </div>
        </div>
        <div class="bet-view">
          <div
            :class="currentBox == item.id ? 'active detail' : 'detail'"
            v-for="(item, index) in aloneWinDetail"
            :key="index"
            @click="currentBox = item.id"
            style="width: 105px; height: 50px"
          >
            <span>{{ item.upper }}</span>
            <div>{{ item.lower }}</div>
          </div>
        </div>
      </div>
      <div v-for="(item, index) in aloneWinDetail" :key="index">
        <template v-if="currentBox == item.id">
          <div class="sub-title">{{ $t('Hletter.BetResult') }}</div>
          <div class="bet-result">
            <img class="logo" :src="item.img" alt="" />
            <div class="bet-result-title">{{ item.upper }}<span>@1.98</span></div>
            <div class="bet-content">
              {{ item.content }}
            </div>
          </div>
        </template>
      </div>
    </div>
    <!-- 角球 -->
    <div class="bet-container" v-show="currentBetType == 3">
      <div class="sub-title">
        {{ $t('Hletter.SigleChose') }}<span>{{ $t('Hletter.HletterTip2') }}</span>
      </div>
      <div class="bet-box">
        <div class="match-row">
          <div class="team-name">
            {{ $t('Hletter.TeamName1') }}
            <img src="./img/arsenal_small.png" width="40" height="40" />
          </div>
          <div class="score">
            <div>{{ $t('Hletter.GameResult') }}</div>
            <span>2 - 0</span>
          </div>
          <div class="team-name">
            <img src="./img/chelsea_big.png" width="40" height="40" />
            {{ $t('Hletter.TeamName2') }}
          </div>
        </div>
        <div class="bet-view">
          <img src="./img/arsenal_small.png" />
          <div
            :class="currentBox == item.id ? 'active detail' : 'detail'"
            v-for="(item, index) in upperCornerDetail"
            :key="index"
            @click="currentBox = item.id"
            v-show="index < 3"
          >
            <span>{{ item.upper }}</span>
            <div>{{ item.lower }}</div>
          </div>
        </div>
        <div class="bet-view">
          <img src="./img/chelsea_small.png" />
          <div
            :class="currentBox == item.id ? 'active detail' : 'detail'"
            v-for="(item, index) in lowerCornerDetail"
            :key="index"
            @click="currentBox = item.id"
            v-show="index < 3"
          >
            <span>{{ item.upper }}</span>
            <div>{{ item.lower }}</div>
          </div>
        </div>
      </div>
      <div v-for="(item, index) in cornerDetailResult" :key="index">
        <template v-if="currentBox == item.id">
          <div class="sub-title">{{ $t('Hletter.BetResult') }}</div>
          <div class="bet-result">
            <img class="logo" :src="item.img" alt="" />
            <div class="bet-result-title">
              {{ item.title }}<span>{{ item.titleNum }}</span>
            </div>
            <div class="bet-content">
              {{ item.content }}
            </div>
          </div>
        </template>
      </div>
    </div>
    <!-- 单双 -->
    <div class="bet-container" v-show="currentBetType == 4">
      <div class="sub-title">
        {{ $t('Hletter.SigleChose') }}<span>{{ $t('Hletter.HletterTip2') }}</span>
      </div>
      <div class="bet-box">
        <div class="match-row">
          <div class="team-name">
            {{ $t('Hletter.TeamName1') }}
            <img src="./img/arsenal_small.png" width="40" height="40" />
          </div>
          <div class="score">
            <div>{{ $t('Hletter.GameResult') }}</div>
            <span>2 - 0</span>
          </div>
          <div class="team-name">
            <img src="./img/chelsea_big.png" width="40" height="40" />
            {{ $t('Hletter.TeamName2') }}
          </div>
        </div>
        <div class="bet-view">
          <img src="./img/arsenal_small.png" />
          <div
            :class="currentBox == item.id ? 'active detail' : 'detail'"
            v-for="(item, index) in OddEvenDetail"
            :key="index"
            @click="currentBox = item.id"
          >
            <span>{{ item.upper }}</span>
            <div>{{ item.lower }}</div>
          </div>
        </div>
      </div>
      <div v-for="(item, index) in OddEvenDetail" :key="index">
        <template v-if="currentBox == item.id">
          <div class="sub-title">{{ $t('Hletter.BetResult') }}</div>
          <div class="bet-result">
            <img class="logo" :src="item.img" alt="" />
            <div class="bet-result-title">
              {{ item.upper }}<span> @{{ item.lower }}</span>
            </div>
            <div class="bet-content">
              {{ item.content }}
            </div>
          </div>
        </template>
      </div>
    </div>
    <!-- 波胆 -->
    <div class="bet-container" v-show="currentBetType == 5">
      <div class="sub-title">
        {{ $t('Hletter.SigleChose') }}<span> {{ $t('Hletter.HletterTip2') }}</span>
      </div>
      <div class="bet-box">
        <div class="match-row">
          <div class="team-name">
            {{ $t('Hletter.TeamName1') }}
            <img src="./img/arsenal_small.png" width="40" height="40" />
          </div>
          <div class="score">
            <div>{{ $t('Hletter.GameResult') }}</div>
            <span>2 - 0</span>
          </div>
          <div class="team-name">
            <img src="./img/chelsea_big.png" width="40" height="40" />
            {{ $t('Hletter.TeamName2') }}
          </div>
        </div>
        <div class="bet-view">
          <img src="./img/arsenal_small.png" />
          <div
            :class="currentBox == item.id ? 'active detail' : 'detail'"
            v-for="(item, index) in aloneWinDetail"
            :key="index"
            @click="currentBox = item.id"
          >
            <span>{{ item.correctScoreUpper }}</span>
            <div>{{ item.lower }}</div>
          </div>
        </div>
      </div>
      <div v-for="(item, index) in aloneWinDetail" :key="index">
        <template v-if="currentBox == item.id">
          <div class="sub-title">{{ $t('Hletter.BetResult') }}</div>
          <div class="bet-result">
            <img class="logo" :src="item.img" alt="" />
            <div class="bet-result-title">
              {{ $t('Hletter.Bet') }}<span> {{ item.correctScoreUpper }}@ {{ item.lower }}</span>
            </div>
            <div class="bet-content">
              {{ item.content }}
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavBar from '@/components/NavBar/NavBar.vue'
import i18n from '@/i18n'
import { useAppStore } from '@/stores/app'
import { isCTYWebApp, isIOSPure } from '@/utils'
import { useRoute } from 'vue-router'

const appStore = useAppStore()

const route = useRoute()
const token = ref('')
onMounted(() => {
  if (route.query.token) {
    token.value = route.query.token
  }
})
const currentBetType = ref(0)
const currentBox = ref(0)
const betType = ref([
  i18n.global.t('Hletter.HandiCap'),
  i18n.global.t('Hletter.BigSmall'),
  i18n.global.t('Hletter.WinAlone'),
  i18n.global.t('Hletter.CornerKick'),
  i18n.global.t('Hletter.OddEven'),
  i18n.global.t('Hletter.WaveBile')
])
// 让球，大小投注数据与结果
const upBetDetail = ref([
  {
    top: '0',
    bot: '1.98',
    bigSmall: i18n.global.t('Hletter.Big') + '1.5',
    id: '1'
  },
  {
    top: '-0/0.5',
    bot: '1.98',
    bigSmall: i18n.global.t('Hletter.Big') + '1.5/2',
    id: '2'
  },
  {
    top: '-1',
    bot: '1.98',
    bigSmall: i18n.global.t('Hletter.Big') + '2',
    id: '3'
  },
  {
    top: '-1.5/2',
    bigSmall: i18n.global.t('Hletter.Big') + '2/2.5',
    bot: '1.98',
    id: '4'
  }
])
const underBetDetail = ref([
  {
    top: '0',
    bot: '1.98',
    bigSmall: i18n.global.t('Hletter.Small') + '1.5',
    id: '5'
  },
  {
    top: '+0/0.5',
    bot: '1.98',
    bigSmall: i18n.global.t('Hletter.Small') + '1.5/2',
    id: '6'
  },
  {
    top: '+1',
    bot: '1.98',
    bigSmall: i18n.global.t('Hletter.Small') + '2',
    id: '7'
  },
  {
    top: '+1.5/2',
    bot: '1.98',
    bigSmall: i18n.global.t('Hletter.Small') + '2/2.5',
    id: '8'
  }
])
const betResult = ref([
  {
    id: '1',
    title: i18n.global.t('Hletter.TeamName1'),
    titleNum: '0 @1.98',
    content: i18n.global.t('Hletter.Content1'),
    img: new URL(`./img/${appStore.language}/win.png`, import.meta.url).href,
    bigSmallTitle: i18n.global.t('Hletter.BigSmallTitle1'),
    bigSmallTitleNum: '1.5 @1.98',
    bigSmallTitleContent: i18n.global.t('Hletter.BigSmallTitleContent1'),
    bigSmallImg: new URL(`./img/${appStore.language}/win.png`, import.meta.url).href
  },
  {
    id: '2',
    title: i18n.global.t('Hletter.TeamName1'),
    titleNum: '-0/0.5 @1.98',
    content: i18n.global.t('Hletter.Content2'),
    img: new URL(`./img/${appStore.language}/win.png`, import.meta.url).href,
    bigSmallTitle: i18n.global.t('Hletter.BigSmallTitle1'),
    bigSmallTitleNum: '1.5/2 @1.98',
    bigSmallTitleContent: i18n.global.t('Hletter.BigSmallTitleContent2'),
    bigSmallImg: new URL(`./img/${appStore.language}/win_half.png`, import.meta.url).href
  },
  {
    id: '3',
    title: i18n.global.t('Hletter.TeamName1'),
    titleNum: '-1 @1.98',
    content: i18n.global.t('Hletter.Content3'),
    img: new URL(`./img/${appStore.language}/win.png`, import.meta.url).href,
    bigSmallTitle: i18n.global.t('Hletter.BigSmallTitle1'),
    bigSmallTitleNum: '2 @1.98',
    bigSmallTitleContent: i18n.global.t('Hletter.BigSmallTitleContent3'),
    bigSmallImg: new URL(`./img/${appStore.language}/return.png`, import.meta.url).href
  },
  {
    id: '4',
    title: i18n.global.t('Hletter.TeamName1'),
    titleNum: '-1.5/2 @1.98',
    content: i18n.global.t('Hletter.Content4'),
    img: new URL(`./img/${appStore.language}/win_half.png`, import.meta.url).href,
    bigSmallTitle: i18n.global.t('Hletter.BigSmallTitle1'),
    bigSmallTitleNum: '2/2.5 @1.98',
    bigSmallTitleContent: i18n.global.t('Hletter.BigSmallTitleContent4'),
    bigSmallImg: new URL(`./img/${appStore.language}/lose_half.png`, import.meta.url).href
  },
  {
    id: '5',
    title: i18n.global.t('Hletter.TeamName2'),
    titleNum: '0 @1.98',
    content: i18n.global.t('Hletter.Content5'),
    img: new URL(`./img/${appStore.language}/lose.png`, import.meta.url).href,
    bigSmallTitle: i18n.global.t('Hletter.SmallTitle2'),
    bigSmallTitleNum: '1.5 @1.98',
    bigSmallTitleContent: i18n.global.t('Hletter.BigSmallTitleContent5'),
    bigSmallImg: new URL(`./img/${appStore.language}/lose.png`, import.meta.url).href
  },
  {
    id: '6',
    title: i18n.global.t('Hletter.TeamName2'),
    titleNum: '+0/0.5 @1.98',
    content: i18n.global.t('Hletter.Content6'),
    img: new URL(`./img/${appStore.language}/lose.png`, import.meta.url).href,
    bigSmallTitle: i18n.global.t('Hletter.SmallTitle2'),
    bigSmallTitleNum: '1.5/2 @1.98',
    bigSmallTitleContent: i18n.global.t('Hletter.BigSmallTitleContent6'),
    bigSmallImg: new URL(`./img/${appStore.language}/lose_half.png`, import.meta.url).href
  },
  {
    id: '7',
    title: i18n.global.t('Hletter.TeamName2'),
    titleNum: '+1 @1.98',
    content: i18n.global.t('Hletter.Content7'),
    img: new URL(`./img/${appStore.language}/lose.png`, import.meta.url).href,
    bigSmallTitle: i18n.global.t('Hletter.SmallTitle2'),
    bigSmallTitleNum: '2 @1.98',
    bigSmallTitleContent: i18n.global.t('Hletter.BigSmallTitleContent7'),
    bigSmallImg: new URL(`./img/${appStore.language}/return.png`, import.meta.url).href
  },
  {
    id: '8',
    title: i18n.global.t('Hletter.TeamName2'),
    titleNum: '+1.5/2 @1.98',
    content: i18n.global.t('Hletter.Content8'),
    img: new URL(`./img/${appStore.language}/win_half.png`, import.meta.url).href,
    bigSmallTitle: i18n.global.t('Hletter.SmallTitle2'),
    bigSmallTitleNum: '2/2.5 @1.98',
    bigSmallTitleContent: i18n.global.t('Hletter.BigSmallTitleContent8'),
    bigSmallImg: new URL(`./img/${appStore.language}/win_half.png`, import.meta.url).href
  }
])
// 独赢,波胆投注数据与结果
const aloneWinDetail = ref([
  {
    id: '1',
    upper: i18n.global.t('Hletter.Pcontent691'),
    lower: '1.98',
    content: i18n.global.t('Hletter.Content9'),
    img: new URL(`./img/${appStore.language}/win.png`, import.meta.url).href,
    correctScoreUpper: '2-0',
    correctScoreContent: i18n.global.t('Hletter.CorrectScoreContent1')
  },
  {
    id: '2',
    upper: i18n.global.t('Hletter.Pcontent692'),
    lower: '1.98',
    content: i18n.global.t('Hletter.Content10'),
    img: new URL(`./img/${appStore.language}/lose.png`, import.meta.url).href,
    correctScoreUpper: i18n.global.t('Hletter.Pcontent694'),
    correctScoreContent: i18n.global.t('Hletter.CorrectScoreContent1')
  },
  {
    id: '3',
    upper: i18n.global.t('Hletter.Pcontent693'),
    lower: '1.98',
    content: i18n.global.t('Hletter.Content11'),
    img: new URL(`./img/${appStore.language}/lose.png`, import.meta.url).href,
    correctScoreUpper: '0-2',
    correctScoreContent: i18n.global.t('Hletter.CorrectScoreContent2')
  }
])
// 角球投注数据与结果
const upperCornerDetail = ref([
  {
    id: '1',
    upper: '-1.5',
    lower: '1.98'
  },
  {
    id: '2',
    upper: '-1.5/2',
    lower: '1.98'
  }
])
const lowerCornerDetail = ref([
  {
    id: '3',
    upper: '+1.5',
    lower: '1.98',
    title: i18n.global.t('Hletter.TeamName2')
  },
  {
    id: '4',
    upper: '+1.5/2',
    lower: '1.98'
  }
])
const cornerDetailResult = ref([
  {
    id: '1',
    title: i18n.global.t('Hletter.TeamName1'),
    titleNum: '-1.5 @1.98',
    content: i18n.global.t('Hletter.Content12'),
    img: new URL(`./img/${appStore.language}/win.png`, import.meta.url).href
  },
  {
    id: '2',
    title: i18n.global.t('Hletter.TeamName1'),
    titleNum: '-1.5/2 @1.98',
    content: i18n.global.t('Hletter.Content13'),
    img: new URL(`./img/${appStore.language}/win_half.png`, import.meta.url).href
  },
  {
    id: '3',
    title: i18n.global.t('Hletter.TeamName2'),
    titleNum: '+1.5 @1.98',
    content: i18n.global.t('Hletter.Content14'),
    img: new URL(`./img/${appStore.language}/lose_half.png`, import.meta.url).href
  },
  {
    id: '4',
    title: i18n.global.t('Hletter.TeamName2'),
    titleNum: '+1.5/2 @1.98',
    content: i18n.global.t('Hletter.Content15'),
    img: new URL(`./img/${appStore.language}/lose_half.png`, import.meta.url).href
  }
])
// 单双投注数据与结果
const OddEvenDetail = ref([
  {
    id: '1',
    upper: i18n.global.t('Hletter.Title196'),
    lower: '1.98',
    content: i18n.global.t('Hletter.Content16'),
    img: new URL(`./img/${appStore.language}/lose.png`, import.meta.url).href
  },
  {
    id: '2',
    upper: i18n.global.t('Hletter.Title197'),
    lower: '1.98',
    content: i18n.global.t('Hletter.Content17'),
    img: new URL(`./img/${appStore.language}/win.png`, import.meta.url).href
  }
])
</script>

<style lang="scss" scoped>
.outter-main {
  background: #f7f7f7;
}
.bet-type-row {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100vw;
  height: 54px;
  padding: 0 15px 0 15px;
  margin-top: 1px;
  background-color: #fff;
  overflow: scroll;
}
.bet-type-btn {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 24px;
  border-radius: 90px;
  background: #f7f7f7;
  color: #666;
  text-align: center;

  font-size: 12px;
  font-weight: 400;
  line-height: 28px;
}
.bet-type-btn.active {
  border: 0.5px solid #ff5000;
  color: var(--2, #ff5000);
  background: #fff5f0;
}
.bet-container {
  padding: 15px 7px 15px 7px;
}
.sub-title {
  margin-left: 8px;
  margin-bottom: 15px;
  color: #111;

  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
  span {
    margin-left: 10px;
    color: #666;

    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
  }
}
.bet-box {
  width: 361px;

  border-radius: 6px;
  background: #fff;
  padding: 11px 15px 8px 15px;
  margin-bottom: 20px;
  .match-row {
    display: flex;
    justify-content: center;
    height: 40px;
    margin-bottom: 15px;
    .team-name {
      display: flex;
      align-items: center;
      gap: 12px;
      height: 40px;

      color: #111;

      font-size: 14px;
      font-weight: 400;
      line-height: 16px;
      img {
        width: 40px;
        height: 40px;
      }
    }
    .score {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      width: 100px;
      height: 40px;
      color: #999;

      font-size: 12px;
      font-weight: 400;
      line-height: 16px;
      span {
        color: #111;
        font-family: DIN Alternate;
        font-size: 24px;
        font-weight: 700;
      }
    }
  }

  .bet-view {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 7px;
    height: 50px;
    margin-bottom: 7px;
    img {
      height: 20px;
      width: 20px;
      margin-left: 3px;
    }

    .detail {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex: 1;
      gap: 3px;
      width: 70px;
      height: 50px;
      background-color: rgb(249, 251, 255);
      border-radius: 6px;
      span {
        font-size: 13px;
        color: #888;
      }
      div {
        font-size: 14px;
        color: rgb(17, 17, 17);
      }
    }
  }
}
.active {
  border: 1px solid #ff5000 !important;
  background-color: #fff5f0 !important;
  span {
    color: #ff5000 !important;
  }
  div {
    color: #ff5000 !important;
  }
}
.bet-result {
  position: relative;
  width: 361px;
  height: 106px;
  padding: 15px 60px 15px 15px;
  border-radius: 6px;
  background: #fff;
  .bet-result-title {
    color: #111;

    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    span {
      margin-left: 10px;
      color: var(--1, #ff9000);
    }
  }
  .bet-content {
    margin-top: 15px;
    color: #666;
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
  }
  .logo {
    position: absolute;
    top: -6px;
    right: 6px;
    width: 60px;
    height: 60px;
  }
}
</style>
