<template>
  <div class="boxPersonal">
    <UserHaeder></UserHaeder>
    <SelectTab @handlChangeTab="handlChangeTab"></SelectTab>
    <component :is="currentComponent"></component>
  </div>
</template>

<script setup>
import UserHaeder from './components/UserHaeder.vue'
import SelectTab from './components/SelectTab.vue'
import BetRecord from './components/BetRecord.vue'
import '@/assets/styles/fromUi.scss'
import { useUserStore } from '@/stores/user'
const user = useUserStore()
const currentComponent = shallowRef(BetRecord)
function handlChangeTab(n) {
  user.getUserInfoAction()
  currentComponent.value = n.component
}
</script>

<style lang="scss" scoped>
.boxPersonal {
  min-width: 1320px;
  max-width: 1320px;
  margin: 0 auto;
}
</style>
