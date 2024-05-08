<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <div class="active">{{ $t('operation.EventName') }}{{ route.query.name }}</div>
      <el-tab-pane :label="$t('operation.Visitdetails')" name="1">
        <visitDetails v-if="activeName == 1" :VisitBetails="VisitBetails" />
      </el-tab-pane>
      <el-tab-pane :label="$t('operation.statistics')" name="2">
        <visitStatistics v-if="activeName == 2" :accessStatistics="accessStatistics" />
      </el-tab-pane>
      <el-tab-pane :label="title[route.query.type]" name="3">
        <template v-if="activeName == 3">
          <winningRecord v-if="route.query.type == 1" :awardWinning="awardWinning" />
          <gameActivityRecord v-else-if="route.query.type == 2" />
          <RouletteLotteryRec v-else-if="route.query.type == 4" />
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import gameActivityRecord from './components/gameActivityRecord.vue'
import visitDetails from './components/visitDetails.vue'
import visitStatistics from './components/visitStatistics.vue'
import winningRecord from './components/winningRecord.vue'
import RouletteLotteryRec from './components/RouletteLotteryRec'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()
const route = useRoute()

const VisitBetails = computed(() => route.query.id)
const accessStatistics = computed(() => route.query.id)
const awardWinning = computed(() => route.query.id)
const activeName = ref('1')

const title = {
  1: i18n.t('operation.AwardWinrecord'),
  2: i18n.t('operation.label2'),
  4: i18n.t('operation.label1')
}
</script>

<style lang="scss">
.member-manage-friend {
  padding: 20px;
}
.active {
  font-size: 20px;
  font-weight: bold;
}
</style>
