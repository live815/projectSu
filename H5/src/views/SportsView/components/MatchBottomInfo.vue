<template>
  <!-- 足球 -->
  <div class="extra-info football" v-if="match.sid === SPORT_IDS.Soccer">
    <!-- 角球 -->
    <div class="triangle">
      <iconTriangle />
      <p>
        {{ getTeamDetailByTyg(match, 0, 6, 1000) || 0 }}-{{
          getTeamDetailByTyg(match, 1, 6, 1000) || 0
        }}
      </p>
    </div>
    <!-- 半场 -->
    <div class="ht">
      <IconHT />
      <span
        >{{ getTeamDetailByTyg(match, 0, 5, 1002) || 0 }}-{{
          getTeamDetailByTyg(match, 1, 5, 1002) || 0
        }}</span
      >
    </div>
  </div>
  <!-- 支持展示 单节比分列表/回合列表 的球类 -->
  <template v-else-if="isShowTurnBasedList">
    <div class="score-list-wrapper">
      <!-- 篮球赛事增加上半场和下半场比分 -->
      <template v-if="match.sid === SPORT_IDS.Basketball">
        <div class="ht pre-ht basketball">
          <IconHT />
          <span
            >{{ getTeamDetailByTyg(match, 0, 5, 3003) || 0 }}-{{
              getTeamDetailByTyg(match, 1, 5, 3003) || 0
            }}</span
          >
        </div>

        <div class="ht next-ht basketball" v-if="match.fid === 2 && match.mc?.pe === 3004">
          <IconHT style="transform: rotate(180deg)" />
          <span
            >{{ getTeamDetailByTyg(match, 0, 5, 3004) || 0 }}-{{
              getTeamDetailByTyg(match, 1, 5, 3004) || 0
            }}</span
          >
        </div>
      </template>

      <!-- 单节比分列表 -->
      <div class="extra-info score-list" v-if="getNsgScoreList && getNsgScoreList.length">
        <div
          :class="{ active: idx === getNsgScoreList.length - 1 }"
          class="each"
          v-for="(eachone, idx) in getNsgScoreList"
          :key="idx"
        >
          <span>{{ eachone[0] || 0 }}-{{ eachone[1] || 0 }}</span>
        </div>
      </div>
    </div>

    <!-- 赛制几局几胜 + 总分 -->
    <div class="total" v-if="isShowFid && isNeedShowFid">
      <span>{{ getFid(match.fid) }}</span>
      <template v-if="isShowTotalScore">
        <span class="split" style="margin: 0 3px">|</span>
        <span>{{ $t('Sportsview.totalscore') }}</span>
        <span class="primary"
          >{{ getTeamScore(match, 0, getTygPesBySid) }}-{{
            getTeamScore(match, 1, getTygPesBySid)
          }}
          ({{
            getTeamScore(match, 0, getTygPesBySid) + getTeamScore(match, 1, getTygPesBySid)
          }})</span
        >
      </template>
    </div>
  </template>
</template>

<script setup>
import { SPORT_IDS, getTeamDetailByTyg } from '@/hooks/useSportDict'
import i18n from '@/i18n'
const props = defineProps({
  match: {
    type: Object,
    default: () => ({})
  },
  isNeedShowFid: {
    type: Boolean,
    default: true
  }
})
// 单节比分列表/回合列表
const isShowTurnBasedList = computed(() => {
  // 不展示单节比分列表/回合列表
  const noSupportTurnBasedMatchList = [SPORT_IDS.EFootball, SPORT_IDS.Boxing]
  return !noSupportTurnBasedMatchList.includes(props.match.sid)
})

// 赛事-几局几胜制+总分
const isShowFid = computed(() => {
  // 不支持几局几胜制的赛事类型集合
  const noSupportFidMatchList = [
    SPORT_IDS.Basketball,
    SPORT_IDS.EBasketball,
    SPORT_IDS.Handball,
    SPORT_IDS.Snooker,
    SPORT_IDS.AmericanFootball,
    SPORT_IDS.Rugby,
    SPORT_IDS.Rugby
  ]
  return !noSupportFidMatchList.includes(props.match.sid)
})
// 展示总分
const isShowTotalScore = computed(() => {
  // 不支持总分展示的球类集合
  const noSupportShowTotalScoreMatchList = [SPORT_IDS.Snooker]
  return !noSupportShowTotalScoreMatchList.includes(props.match.sid)
})

// 获取单节比分列表
const getNsgScoreList = computed(() => {
  const { tyg, pes } = getTygPesBySid.value
  let list = pes
    .map((pe) => {
      return props.match.nsg?.find((o) => o.tyg === tyg && o.pe === pe)?.sc
    })
    .filter((arr) => arr)
  // 取最新6节/回
  return list.slice(-6)
})

// 获取指定比赛球类 单节的pe集合 和 tyg
const getTygPesBySid = computed(() => {
  let tyg = null
  let pes = []
  let fullTimePe = null
  switch (props.match.sid) {
    case SPORT_IDS.Basketball:
      fullTimePe = 3001
      tyg = 5
      pes = [
        3005, // 第1节
        3006, // 第2节
        3007, // 第3节
        3008, // 第4节
        3009 // 加时
      ]
      break
    case SPORT_IDS.EBasketball:
      fullTimePe = 178001
      tyg = 5
      pes = [
        178005, // 第1节
        178006, // 第2节
        178007, // 第3节
        178008, // 第4节
        178009 // 加时
      ]
      break
    case SPORT_IDS.Tennis:
      fullTimePe = 5001
      tyg = 5556
      pes = [5002, 5003, 5004, 5005, 5006]
      break
    case SPORT_IDS.Baseball:
      fullTimePe = 7001
      tyg = 5
      pes = [7004, 7005, 7006, 7007, 7008, 7009, 7010, 7011, 7012, 7013]
      break
    case SPORT_IDS.Volleyball:
      fullTimePe = 13001
      tyg = 5556
      pes = [13002, 13003, 13004, 13005, 13006, 13007, 13008]
      break

    case SPORT_IDS.Badminton:
      fullTimePe = 47001
      tyg = 5559
      pes = [47002, 47003, 47004, 47005, 47006]
      break

    case SPORT_IDS.TableTennis:
      fullTimePe = 15001
      tyg = 5559
      pes = [15002, 15003, 15004, 15005, 15006, 15007, 15008]
      break

    case SPORT_IDS.Boxing: // un test
      fullTimePe = 15001
      tyg = 5559
      pes = [15002, 15003, 15004, 15005, 15006, 15007, 15008]
      break

    case SPORT_IDS.Snooker:
      fullTimePe = 16001
      tyg = 12
      pes = [16002, 16003, 16004, 16005, 16006, 16007, 16008, 16009, 16010]
      break

    case SPORT_IDS.AmericanFootball:
      fullTimePe = 6001
      tyg = 5
      pes = [6005, 6006, 6007, 6008, 6009]
      break

    case SPORT_IDS.Rugby:
      fullTimePe = 4000
      tyg = 5
      pes = [4003, 4004, 4005, 4009]
      break

    case SPORT_IDS.IceHockey:
      fullTimePe = 2000
      tyg = 5
      pes = [2003, 2004, 2005, 2006, 2007]
      break
    case SPORT_IDS.BeachVolleyball:
      fullTimePe = 51001
      tyg = 5556
      pes = [51002, 51003, 51004, 51005, 51006]
      break
    case SPORT_IDS.Handball:
      fullTimePe = 8000
      tyg = 5
      pes = [8003, 8004, 8005, 8006]
      break
  }
  return { tyg, pes, fullTimePe }
})

// 获取赛制
function getFid(fid) {
  switch (fid) {
    case 3:
      return i18n.global.t('Sportsview.tip13')
    case 5:
      return i18n.global.t('Sportsview.tip14')
    case 7:
      return i18n.global.t('Sportsview.tip15')
    case 9:
      return i18n.global.t('Sportsview.tip16')
  }
}

function getTeamScore(match, index, tygPesBySid) {
  return getTeamDetailByTyg(match, index, tygPesBySid.tyg, tygPesBySid.fullTimePe) || 0
}
</script>

<style lang="scss" scoped>
// 扩展比分等相关信息
.extra-info {
  display: flex;
  align-items: center;
  font-size: 12px;
  flex-wrap: wrap;
  // 足球角球
  .triangle {
    display: flex;
    align-items: center;
    color: var(--color-primary);
    svg {
      width: 16px;
      height: 16px;
      fill: var(--color-orange);
      margin-right: 3px;
    }
  }
  // 足球半场
  .ht {
    display: flex;
    align-items: center;
    margin-left: 10px;
    svg {
      margin-top: 1px;
      margin-right: 2px;
    }
  }
}
// 非足球赛事比分容器
.score-list-wrapper {
  display: flex;
  align-items: center;
  // 篮球半场
  .ht.basketball {
    display: flex;
    align-items: center;
    svg {
      margin-top: 1px;
      margin-right: 2px;
    }
    span {
      font-size: 12px;
    }
    // 分割线
    &.pre-ht {
      position: relative;
      padding-right: 7px;
      margin-right: 5px;
      &::after {
        content: ' ';
        background: #ccc;
        display: inline-block;
        width: 1px;
        height: 10px;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translate(0, -50%);
      }
    }
  }
  // 单节比分
  .each {
    margin-right: 8px;
    flex: none;
    line-height: 1.2;
    color: var(--color-text-light);
    &.active {
      color: var(--color-primary);
      font-size: 12px;
      margin-right: 0;
      span {
        font-weight: 600;
      }
    }
  }
}

// 赛制几局几胜 + 总分
.total {
  font-size: 10px;
  color: var(--color-text-light);
  margin-top: 3px;
  .primary {
    color: var(--color-primary);
    font-weight: 600;
    margin-left: 2px;
  }
}
</style>
