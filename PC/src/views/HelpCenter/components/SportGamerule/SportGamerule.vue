<!-- 体育游戏规则 -->
<template>
  <div class="SportGamerule">
    <p class="sport-title">{{ rules[props.tuId].title }}</p>
    <div v-for="(item, index) in rules[props.tuId].rule" :key="index">
      <p class="title-p">{{ item.title }}</p>
      <div class="tip-content">
        <div class="tip-item" v-for="(itemr, index) in item.TipList" :key="index">
          <p>{{ itemr.tips }}</p>
          <table v-if="itemr.TableData">
            <thead v-if="itemr.TableData[0]?.headers">
              <tr>
                <td v-for="header in itemr.TableData[0].headers" :key="header">{{ header }}</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in itemr.TableData[0].data" :key="row.id">
                <td v-for="(value, key) in row" :key="key">{{ value }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { SportGamerule } from './SportGamerule.js'
import { EntertainRules } from './EntertainRules.js'
import { Electronicgame } from './Electronicgame.js'
import { LotterybetRules } from './LotterybetRules.js'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()
const props = defineProps({ tuId: { type: String, default: '' } })
const rules = {
  '4-1': { title: i18n.t('HelpCenter.SportsGameRules'), rule: SportGamerule },
  '4-2': { title: i18n.t('HelpCenter.LiveEntertainmentRules'), rule: EntertainRules },
  '4-3': { title: i18n.t('HelpCenter.ElectronicgameRules'), rule: Electronicgame },
  '4-4': { title: i18n.t('HelpCenter.LotterybetRules'), rule: LotterybetRules }
}
</script>

<style lang="scss" scoped>
.SportGamerule {
  white-space: pre-line;
  font-size: 16px;
  line-height: 26px;
  .sport-title {
    font-size: 24px;
    font-weight: 500;

    color: #ffffff;
  }
  .title-p {
    color: #ffffff;
    font-weight: 500;
    margin: 28px 0 16px 0;
  }
  .tip-content {
    color: var(--60, rgba(255, 255, 255, 0.6));
    .tip-item {
      margin-bottom: 12px;
    }
  }
}
table {
  border: 1px solid white;
  text-align: center;
  border-bottom: none;
  border-right: none;
  margin: 10px 0;

  td {
    border: 1px solid white;
    padding: 10px 20px;
    border-left: none;
    border-top: none;
    font-size: 14px;
  }
}
</style>
