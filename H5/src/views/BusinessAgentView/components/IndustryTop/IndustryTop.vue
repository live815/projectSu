<template>
  <BTitle>{{ $t('BusinessAgentView.TitleFour') }}</BTitle>
  <div class="football-superstar"></div>
</template>

<script setup>
import BTitle from '../BTitle.vue'
</script>

<style lang="scss" scoped>
.football-superstar {
  background: url('./img/football-superstar.png') no-repeat center;
  background-size: 100% 100%;
  height: 123px;
  margin-top: 20px;
}
</style>
