<template>
  <div>
    <van-dropdown-menu>
      <van-dropdown-item v-model="currentRule" :options="ruleOpt" @change="handChange">
      </van-dropdown-item>
    </van-dropdown-menu>
    <FootBallRule v-if="currentRule == 6" />
    <div v-else class="rule-list">
      <van-collapse v-model="activeNum">
        <van-collapse-item
          v-for="(seitem, index) in RightTitle"
          :key="index"
          :title="seitem.rightTitle"
          :name="index"
        >
          <div class="haode">
            <div v-for="(thitem, ind) in seitem.Tips" :key="ind">
              <p>{{ thitem.tips }}</p>
              <table v-if="thitem.TableData">
                <thead v-if="thitem.TableData[0]?.headers">
                  <tr>
                    <td v-for="header in thitem.TableData[0].headers" :key="header">
                      {{ header }}
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in thitem.TableData[0].data" :key="row.id">
                    <td v-for="(value, key) in row" :key="key">{{ value }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </van-collapse-item>
      </van-collapse>
    </div>
  </div>
</template>

<script setup>
import FootBallRule from './FootBallRule/FootBallRule.vue'
import { SportBetRule } from '@/views/HelpView/BetRuleView/components/SportBetRule.js'
import i18n from '@/i18n'

const currentRule = ref(0)
const activeNum = ref(['1'])
const RightTitle = ref([])
const ruleOpt = ref([
  { text: i18n.global.t('SportBetRule.SportBetRuleTitle_1'), value: 0 },
  { text: i18n.global.t('SportBetRule.SportBetRuleTitle_13'), value: 1 },
  { text: i18n.global.t('SportBetRule.SportBetRuleTips_974'), value: 2 },
  { text: i18n.global.t('SportBetRule.SportBetRuleTitle_29'), value: 3 },
  { text: i18n.global.t('SportBetRule.SportBetRuleTitle_30'), value: 4 },
  { text: i18n.global.t('SportBetRule.SportBetRuleTitle_33'), value: 5 },
  { text: i18n.global.t('SportBetRule.SportBetRuleTitle_34'), value: 6 },
  { text: i18n.global.t('SportBetRule.SportBetRuleTitle_35'), value: 7 },
  { text: i18n.global.t('SportBetRule.SportBetRuleTitle_50'), value: 8 },
  { text: i18n.global.t('SportBetRule.SportBetRuleTitle_56'), value: 9 },
  { text: i18n.global.t('SportBetRule.SportBetRuleTitle_66'), value: 10 },
  { text: i18n.global.t('SportBetRule.SportBetRuleTitle_75'), value: 11 },
  { text: i18n.global.t('SportBetRule.SportBetRuleTitle_79'), value: 12 },
  { text: i18n.global.t('SportBetRule.SportBetRuleTitle_86'), value: 13 },
  { text: i18n.global.t('SportBetRule.SportBetRuleTitle_89'), value: 14 },
  { text: i18n.global.t('SportBetRule.SportBetRuleTips_491'), value: 15 },
  { text: i18n.global.t('SportBetRule.SportBetRuleTips_975'), value: 16 },
  { text: i18n.global.t('SportBetRule.SportBetRuleTips_551'), value: 17 },
  { text: i18n.global.t('SportBetRule.SportBetRuleTips_646'), value: 18 },
  { text: i18n.global.t('SportBetRule.SportBetRuleTips_738'), value: 19 },
  { text: i18n.global.t('SportBetRule.SportBetRuleTips_781'), value: 20 },
  { text: i18n.global.t('SportBetRule.SportBetRuleTips_811'), value: 21 },
  { text: i18n.global.t('SportBetRule.SportBetRuleTips_976'), value: 22 },
  { text: i18n.global.t('SportBetRule.SportBetRuleTips_848'), value: 23 },
  { text: i18n.global.t('SportBetRule.SportBetRuleTips_891'), value: 24 },
  { text: i18n.global.t('SportBetRule.SportBetRuleTips_902'), value: 25 },
  { text: i18n.global.t('SportBetRule.SportBetRuleTips_918'), value: 26 },
  { text: i18n.global.t('SportBetRule.SportBetRuleTips_931'), value: 27 },
  { text: i18n.global.t('SportBetRule.SportBetRuleTips_940'), value: 28 },
  { text: i18n.global.t('SportBetRule.SportBetRuleTips_944'), value: 29 },
  { text: i18n.global.t('SportBetRule.SportBetRuleTips_955'), value: 30 },
  { text: i18n.global.t('SportBetRule.SportBetRuleTips_963'), value: 31 }
])
onMounted(() => {
  changeList()
})

function handChange(val) {
  currentRule.value = val
  changeList()
}
function changeList() {
  if (currentRule.value == 0) {
    RightTitle.value = SportBetRule()[0].RightTitle
  } else if (currentRule.value == 1) {
    RightTitle.value = SportBetRule()[1].RightTitle
  } else if (currentRule.value == 2) {
    RightTitle.value = SportBetRule()[2].RightTitle
  } else if (currentRule.value == 3) {
    RightTitle.value = SportBetRule()[3].RightTitle
  } else if (currentRule.value == 4) {
    RightTitle.value = SportBetRule()[4].RightTitle
  } else if (currentRule.value == 5) {
    RightTitle.value = SportBetRule()[5].RightTitle
  } else if (currentRule.value == 7) {
    RightTitle.value = SportBetRule()[7].RightTitle
  } else if (currentRule.value == 8) {
    RightTitle.value = SportBetRule()[8].RightTitle
  } else if (currentRule.value == 9) {
    RightTitle.value = SportBetRule()[9].RightTitle
  } else if (currentRule.value == 10) {
    RightTitle.value = SportBetRule()[10].RightTitle
  } else if (currentRule.value == 11) {
    RightTitle.value = SportBetRule()[11].RightTitle
  } else if (currentRule.value == 12) {
    RightTitle.value = SportBetRule()[12].RightTitle
  } else if (currentRule.value == 13) {
    RightTitle.value = SportBetRule()[13].RightTitle
  } else if (currentRule.value == 14) {
    RightTitle.value = SportBetRule()[14].RightTitle
  } else if (currentRule.value == 15) {
    RightTitle.value = SportBetRule()[15].RightTitle
  } else if (currentRule.value == 16) {
    RightTitle.value = SportBetRule()[16].RightTitle
  } else if (currentRule.value == 17) {
    RightTitle.value = SportBetRule()[17].RightTitle
  } else if (currentRule.value == 18) {
    RightTitle.value = SportBetRule()[18].RightTitle
  } else if (currentRule.value == 19) {
    RightTitle.value = SportBetRule()[19].RightTitle
  } else if (currentRule.value == 20) {
    RightTitle.value = SportBetRule()[20].RightTitle
  } else if (currentRule.value == 21) {
    RightTitle.value = SportBetRule()[21].RightTitle
  } else if (currentRule.value == 22) {
    RightTitle.value = SportBetRule()[22].RightTitle
  } else if (currentRule.value == 23) {
    RightTitle.value = SportBetRule()[23].RightTitle
  } else if (currentRule.value == 24) {
    RightTitle.value = SportBetRule()[24].RightTitle
  } else if (currentRule.value == 25) {
    RightTitle.value = SportBetRule()[25].RightTitle
  } else if (currentRule.value == 26) {
    RightTitle.value = SportBetRule()[26].RightTitle
  } else if (currentRule.value == 27) {
    RightTitle.value = SportBetRule()[27].RightTitle
  } else if (currentRule.value == 28) {
    RightTitle.value = SportBetRule()[28].RightTitle
  } else if (currentRule.value == 29) {
    RightTitle.value = SportBetRule()[29].RightTitle
  } else if (currentRule.value == 30) {
    RightTitle.value = SportBetRule()[30].RightTitle
  } else if (currentRule.value == 31) {
    RightTitle.value = SportBetRule()[31].RightTitle
  }
}
</script>

<style lang="scss" scoped>
:deep() {
  .van-dropdown-menu {
    flex: none;
  }
  .van-dropdown-menu__bar {
    box-shadow: none;
    border-radius: 6px;
    border: 1px solid #eee;
    background: #fff;
  }
  .van-ellipsis {
    color: #ff5000;

    font-size: 15px;
    font-weight: 400;
    line-height: 22px;
  }
  .van-dropdown-menu__title::after {
    position: absolute;
    right: 0;
  }
  .van-dropdown-menu__title {
    width: 290px;
  }
  .van-dropdown-item__content {
    position: relative;
    left: 15px;
    width: 345px;
    border-radius: 0 0 15px 15px;
  }
  .van-overlay {
    background: none;
  }
  .van-collapse-item {
    margin-bottom: 10px;
    border: none;
  }
  .van-cell {
    border-radius: 6px;
    border: none;
  }
  .rule-list {
    margin-top: 12px;
  }
}
.haode {
  color: #666;

  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  word-break: break-all;
}
.text-content {
  color: #666;

  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  word-break: break-all;
  .title,
  h5 {
    margin: 20px 0 0 0;
    color: #111;

    font-size: 15px;
    font-weight: 600;
    line-height: 20px;
  }
}
.text-content .title:first-child {
  margin-top: 0;
}
table {
  margin: 0 auto;
  width: 300px;
  border: 1px solid #666;
  border-collapse: collapse;
}
th,
td {
  text-align: center;
  border: 1px solid #666;
}
</style>
