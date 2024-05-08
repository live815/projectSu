<template>
  <div>
    <NavBar :border="true">
      <Tab @index="getTab"></Tab>
    </NavBar>
    <component :is="typeComponentMap[type]"></component>
  </div>
</template>

<script setup>
import Tab from './components/Tab'
import SportBet from './components/sport/SportBet.vue'
import GameBet from './components/game/GameBet.vue'
import { ref } from 'vue'
const type = ref(0)
const typeComponentMap = {
  0: SportBet,
  1: GameBet
}

const getTab = (typeNumber) => {
  type.value = typeNumber
}
</script>

<style lang="scss" scoped></style>
