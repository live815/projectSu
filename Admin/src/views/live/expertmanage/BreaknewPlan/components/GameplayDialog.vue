<template>
  <div class="customize-dialog">
    <el-dialog
      v-model="dialogVisible"
      width="50%"
      :title="$t('live.tip125')"
      center
      @close="handleClose"
    >
      <div class="head-title">
        <div>
          <span>{{ $t("live.hometeam") }}:&nbsp;</span>
          <span class="head-name">{{ fbStore.recommendItem.mainName }}</span>
        </div>
        <div>
          <span>{{ $t("live.awayteam") }}:&nbsp;</span>
          <span class="head-name">{{ fbStore.recommendItem.cusName }}</span>
        </div>
      </div>
      <div class="boxPush">
        <div class="pushTop">
          <div class="round">
            <div class="showHide" @click="toggleAll">
              <retract :style="{ transform: `rotate(${rotation}deg)` }" />
            </div>
            <div
              :class="{ active: item.key == activeTab, tabBtn: true }"
              v-for="(item, index) in tabList"
              :key="index"
              @click="activeBtn(item.key, item.value)"
            >
              {{ item.value }}
            </div>
          </div>
        </div>

        <div class="pushMain">
          <el-collapse
            v-if="oddsList.length"
            v-model="fbStore.mgListIdxs"
            ref="collapse"
          >
            <el-collapse-item
              v-for="(item, index) in oddsList"
              :key="index"
              :name="item.idx"
              :title="item.nm"
            >
              <div class="odds-box">
                <!-- 球队头信息 -->
                <div
                  v-if="!oneInoneRow(item.mty) && hideTeamTitle(item.mty)"
                  class="title"
                >
                  <div>
                    <img height="24" width="24" :src="teamInfo[0]?.lurl" />
                    <span class="teamName">{{ teamInfo[0]?.na }}</span>
                  </div>
                  <div v-if="showTie(item.mty)">{{ $t("live.and") }}</div>
                  <div>
                    <img height="24" width="24" :src="teamInfo[1]?.lurl" />
                    <span class="teamName">{{ teamInfo[1]?.na }}</span>
                  </div>
                </div>
                <!-- 某种玩法多线路 -->
                <div
                  :class="{
                    multiple: option.op.length > 3,
                    oneInoneRow: oneInoneRow(item.mty),
                    twoIineRow: twoIineRow(item.mty),
                  }"
                  class="item-line"
                  v-for="(option, lineIdx) in item.mks"
                  :key="lineIdx"
                >
                  <!-- 单个线路下的2个或多个选项 -->
                  <div
                    class="odds-item"
                    v-for="(team, idx) in option.op"
                    :key="idx"
                    @click="
                      handleBetting(
                        team,
                        { index, idx, id: option.id },
                        item,
                        isSolding(option.ss, team.od)
                      )
                    "
                    :class="{
                      active:
                        activeObj.index === index &&
                        activeObj.idx === idx &&
                        activeObj.id === option.id,
                    }"
                  >
                    <div class="sold" v-if="isSolding(option.ss, team.od)">
                      <div class="score-number">
                        {{ team.nm }}
                      </div>
                      <div
                        class="odds"
                        :class="getChangeState(team.od, idx, lineIdx, index)"
                      >
                        <div class="num">
                          {{
                            getOddFormat(team.od, fbStore.settings.oddsFormat)
                          }}
                        </div>
                        <IconKLineArrow
                          v-if="getChangeState(team.od, idx, lineIdx, index)"
                          class="arrow"
                        />
                      </div>
                    </div>
                    <div v-else class="ss-closed">
                      <IconLocked />
                    </div>
                  </div>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
          <div v-else>{{ $t("live.Nodata") }}</div>
        </div>
      </div>
      <template #footer>
        <el-button @click="handleCancle">{{ $t("live.return") }}</el-button>
        <el-button @click="handleNext">{{ $t("live.makesure") }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import retract from "@/components/icons/retract.vue";
import useFBStore from "@/store/modules/fb.js";
import { uniq } from "lodash";
import { SPORT_GAMEPLAY } from "@/hooks/useSportDict";
import { getOddFormat, isSolding } from "@/hooks/useSportDict";
import { useBetCartStore } from "@/store/modules/betCart";
import IconKLineArrow from "@/components/icons/IconKLineArrow.vue";
import IconLocked from "@/components/icons/IconLocked.vue";
import eventBus from "@/utils/eventBus";
import i18n from "@/i18n";
const fbStore = useFBStore();

const emit = defineEmits(["closegameDialog", "nextDialog"]);
const props = defineProps(["gamedialog"]);
const formObj = ref({ betName: i18n.global.t("live.all") });
const activeObj = ref({
  index: null,
  idx: null,
  id: null,
});

//投注 初始化
let timerId = null;
let prevMatchInterval = null;
// 初始化
async function init() {
  // 没有token则先获取token
  if (!fbStore.FBConfig.FBToken) {
    try {
      await fbStore.getFBToken();
    } catch (e) {
      // console.log("系统繁忙，稍后重试");
    }
  }
  await fetchMatchDetail();
  startTimer();
}
init();

// 创建定时器函数
function startTimer() {
  stopTimer();
  timerId = setInterval(() => {
    updateMatchDetail();
  }, 8000);
}
function updateMatchDetail() {
  // 先保存上一个赛事详情数据
  setPreviousMatch();
  // 获取赛事详情数据
  fetchMatchDetail();
}
async function fetchMatchDetail() {
  fbStore.getMatchDetail({
    matchId: fbStore.recommendItem.leagueId,
  });
}

function setPreviousMatch() {
  fbStore.previousMatchDetailData = { ...fbStore.matchDetailList };
  // 先清掉定时器
  if (prevMatchInterval) {
    clearTimeout(prevMatchInterval);
    prevMatchInterval = null;
  }
  // 启动定时器
  prevMatchInterval = setTimeout(() => {
    fbStore.previousMatchDetailData = {};
    clearTimeout(prevMatchInterval);
    prevMatchInterval = null;
  }, 2500);
}

// 停止定时器
function stopTimer() {
  clearInterval(timerId);
  timerId = null;
}
onBeforeUnmount(() => {
  stopTimer();
});
const dialogVisible = computed({
  get() {
    return props.gamedialog;
  },
  set(val) {
    emit("closegameDialog", val);
  },
});

const betCartStore = useBetCartStore();
const activeTab = ref("all");
const rotation = ref(0);

const collapse = ref(null);
fbStore.isOperatedMarketsListCollapse = false; // 每次进入页面重置操作状态，默认展开所有玩法
const tabList = computed(() => {
  const mg = fbStore.matchDetailList.mg;
  const mergedTps = mg?.reduce((merged, item, idx) => {
    item.idx = idx;
    if (item.tps) {
      merged.push(...item.tps);
    }
    return merged;
  }, []);
  const uniqueTps = uniq(mergedTps);
  const filteredArray = SPORT_GAMEPLAY.filter((item) =>
    uniqueTps.includes(item.key)
  );
  const allItem = { key: "all", value: i18n.global.t("live.all") };
  return [allItem, ...filteredArray];
});
const isCollapse = computed(() => {
  return fbStore.mgListIdxs.length ? false : true;
});
// tab栏切换
const activeBtn = (key, value) => {
  activeTab.value = key;
  formObj.value.betName = value;
  // console.log(key, value, "key");
};
const toggleAll = () => {
  if (isCollapse.value) {
    // 如果是折叠状态则展开列表
    fbStore.mgListIdxs = oddsList.value.map((item) => item.idx);
  } else {
    fbStore.mgListIdxs = [];
  }
  // 标识用户手动操作了详情页玩法列表折叠面板
  fbStore.isOperatedMarketsListCollapse = true;
  rotation.value = rotation.value === 180 ? 0 : (rotation.value += 180);
};
const oddsList = computed(() => {
  if (activeTab.value === "all") {
    return fbStore.matchDetailList.mg || [];
  } else {
    return (
      fbStore.matchDetailList.mg?.filter(
        (item) => item.tps.length && item.tps.includes(activeTab.value)
      ) || []
    );
  }
});
const oldOddsList = computed(() => {
  if (activeTab.value === "all") {
    return fbStore.previousMatchDetailData.mg || [];
  } else {
    return (
      fbStore.previousMatchDetailData.mg?.filter(
        (item) => item.tps.length && item.tps.includes(activeTab.value)
      ) || []
    );
  }
});

// 一行展示mty
function oneInoneRow(mty) {
  return [].includes(mty);
}
// 展示头部的mty
function hideTeamTitle(mty) {
  //1005  1099
  return [
    3001, 3002, 5002, 5006, 5011, 16003, 16001, 16014, 13004, 15002, 15004,
    8008, 8006, 6001, 6009, 6010, 4004, 4003, 4001, 4008, 51006, 51002, 1000,
    1006,
  ].includes(mty);
}
// 展示和的mty
function showTie(mty) {
  return [1042, 1009, 1005, 3001, 1005, 1099, 16014, 4003, 6009].includes(mty);
}
// 两行展示的mty
const twoIineRow = (mty) => {
  return [
    19004, 1109, 1110, 1028, 1101, 1103, 1104, 1105, 1106, 1033, 1012, 1030,
    1032, 1115, 1031, 1079, 3040, 3017, 3041, 3027, 3016, 1018, 5015, 6020,
    6012, 6015, 51005, 5006, 5011, 15004,
  ].includes(mty);
};
function getChangeState(newOd, idx, lineIdx, index) {
  let oldOd;
  let mg = oldOddsList.value;
  if (mg && mg.length && mg[index] && mg[index].mks && mg[index].mks.length) {
    oldOd = oldOddsList.value[index].mks[lineIdx]?.op[idx]?.od;
  }
  if (newOd > oldOd) return "up";
  if (newOd < oldOd) return "down";
}
const teamInfo = computed(() => {
  return fbStore.matchDetailList.ts || [];
});
watchEffect(() => {
  // 如果用户手动点击收起开关将列表折叠起来了，则不要随数据更新自动展开
  if (!fbStore.isOperatedMarketsListCollapse) {
    fbStore.mgListIdxs = oddsList.value.map((item) => item.idx);
  }
});

// 选中注单
const handleBetting = (team, obj, item, isSolDing, option) => {
  if (!isSolDing) {
    return;
  }
  const { index, idx, id } = obj;
  Object.assign(activeObj.value, { index, idx, id });

  const param = {
    betName: item.nm,
    status: 0,
    marketId: id,
    recommendation: `${team.nm} ${team.od}`,
    betStyle: team.ty,
    betTeamName: team.na,
    betContent: JSON.stringify(item),
  };
  fbStore.recommendItem = { ...fbStore.recommendItem, ...param };
};
// 确认
function handleNext() {
  dialogVisible.value = false;
  emit("nextDialog");
}
// 返回
function handleCancle() {
  dialogVisible.value = false;
  emit("closegameDialog", "cancle");
}
// 关闭
function handleClose() {
  betCartStore.betList = [];
  dialogVisible.value = false;
  emit("closegameDialog", "close");
}
//推单
// const pushOrderBtn = async () => {
//   console.log("betCartStore.betList,", betCartStore.betList);
//   try {
//     if (betCartStore.betList && betCartStore.betList.length > 0) {
//       betCartStore.betList.then((res) => {
//         console.log(res, "-----------");
//         if (res.code == 200) {
//           let obj = betCartStore.betList;
//           betCartStore.betList = obj;
//           ElMessage({
//             message: "推单成功",
//             type: "success",
//           });
//           emit("closegameDialog");
//         }
//       });
//     }
//   } catch (e) {
//     console(e);
//   }
// };
onBeforeUnmount(() => {
  eventBus.off("openGameDialog");
});
</script>

<style lang="scss" scoped>
::v-deep .el-table .cell {
  white-space: pre-wrap;
}
.head-title {
  display: flex;
  padding: 12px 0;
  color: #fff;
  div {
    margin-right: 16px;
  }
  .head-name {
    font-size: 12px;
    color: #c4c7d6;
  }
}
.boxPush {
  .pushTop {
    display: flex;
    align-items: center;
    .round {
      display: flex;
      align-items: center;
      column-gap: 10px;
    }
    .showHide {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      border: 1px solid rgba(255, 255, 255, 0.6);
      cursor: pointer;
    }
    .tabBtn {
      min-width: 50px;
      height: 24px;
      border-radius: 46px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-family: PingFang SC;
      font-size: 13px;
      font-style: normal;
      font-weight: 400;
      line-height: 0;
      cursor: pointer;
      padding: 0 6px;
    }
    .active {
      background: var(
        --1,
        linear-gradient(90deg, #ff9000 0.17%, #ff5000 101.4%)
      );
      border: 0;
    }
  }

  .pushMain {
    height: 600px;
    overflow-y: auto;
    margin-top: 10px;
  }
}
.pushMain :deep() {
  .el-collapse,
  .el-collapse-item,
  .el-collapse-item__header,
  .el-collapse-item__wrap,
  .el-collapse-item__content {
    background: none;
    border: 0;
    color: #fff;
    padding-bottom: 2px;
  }
  .el-collapse-item__header {
    height: 40px;
    color: var(--100, #fff);
    font-family: PingFang SC;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px; /* 114.286% */
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  .is-active i {
    transform: rotate(90deg);
  }
  .el-collapse-item__arrow {
    transform: rotate(-90deg);
  }
  .el-sub-menu__title {
    display: flex;
    color: rgba(255, 255, 255, 1);
  }
  .el-sub-menu .el-sub-menu__icon-arrow {
    color: #fff;
  }
  //   .el-collapse-item > div:first-child {
  //     width:100%;
  //     display: flex;
  //     align-items: center;
  //     justify-content:space-between;
  //   }
}
.odds-box {
  margin-top: 10px;
  .title {
    display: flex;
    align-items: center;

    color: var(--color-text);
    font-family: PingFang SC;
    font-size: 14px;
    font-weight: 400;
    gap: 20px;

    div {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      margin-bottom: 10px;
    }
    img {
      margin-right: 5px;
    }
    .teamName {
      color: var(--100, #fff);
      font-family: PingFang SC;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 16px; /* 114.286% */
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100px;
    }
  }
  .item-line {
    display: flex;
    margin-bottom: 10px;
    gap: 10px;
    column-gap: 20px;
    &.multiple {
      flex-wrap: wrap;
      .odds-item {
        flex-basis: calc(33.33% - 10px); /* 1/3 宽度，减去间隔 */
      }
    }
    &.twoIineRow {
      .odds-item {
        flex-basis: calc(50% - 10px);
      }
    }
    &.oneInoneRow {
      flex-direction: column;
    }
  }
  .odds-item {
    padding: 0 8px;
    border-radius: 8px;
    background: #1a1f37;
    border: 1px solid transparent;
    flex: 1;
    height: 32px;
    cursor: pointer;
    .sold {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 32px;
    }
    .score-number {
      font-family: PingFang SC;
      font-size: 14px;
      font-weight: 400;
      line-height: 16px;
      color: var(--60, rgba(255, 255, 255, 0.6));
    }
    .odds {
      display: flex;
      align-items: center;
      .num {
        color: var(--100, #fff);
        font-family: DIN Alternate;
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: 16px; /* 100% */
      }
      .arrow {
        width: 10px;
        height: 10px;
        margin-left: 2px;
      }
      &.up {
        .num {
          color: var(--color-danger);
        }
        .arrow {
          fill: var(--color-danger);
          transform: rotateX(180deg);
        }
      }
      &.down {
        .num {
          color: #00b42a;
        }
        .arrow {
          fill: #00b42a;
          opacity: 1;
        }
      }
    }

    .ss-closed {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: no-drop;
      svg {
        fill: #cccccc;
      }
      .score-number {
        font-family: PingFang SC;
        font-size: 14px;
        font-weight: 400;
        color: var(--60, rgba(255, 255, 255, 0.6));
        margin-top: 4px;
      }
    }
    &.active {
      border-color: #353f70;
      background: #353f70;
    }
  }

  .correct-score {
    width: 107px;
    height: 40px;
  }
  .goalDifference {
    width: 343px;
    height: 40px;
  }
}
.customize-dialog :deep() {
  .el-dialog {
    background: var(--unnamed, #323c6f) !important;
    border-radius: 8px;
  }
  .el-dialog__header {
    padding: 12px 20px 12px 20px;
    margin-right: 0px !important;
    // padding-bottom: 20px;
    border-radius: 8px 8px 0px 0px;
    background: var(--unnamed, #323c6f) !important;
  }
  .el-dialog__title {
    color: var(--100, #fff);
    font-family: PingFang SC;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px; /* 100% */
    opacity: 0.8;
  }
  .el-dialog__headerbtn .el-dialog__close {
    font-size: 26px;
    color: #fff;
    top: -14px;
    svg {
      height: 20px;
      width: 20px;
    }
  }
  .el-dialog__body {
    background: #232949;
    border-radius: 0px 0px 8px 8px;
    padding-top: 0;
  }
}
</style>
