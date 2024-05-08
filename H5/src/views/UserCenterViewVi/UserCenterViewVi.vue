<template>
  <div class="user-center-view">
    <UserHeader />
    <Center />
    <MyMenu />
  </div>
</template>

<script setup>
import UserHeader from './components/UserHeader/UserHeader.vue'
import MyMenu from './components/MyMenu/MyMenu.vue'
import Center from './components/Center/Center.vue'
</script>

<style scoped lang="scss">
.user-center-view {
  height: calc(var(--app-height));
  overflow: hidden;
}
</style>