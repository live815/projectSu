<template>
  <div class="header">
    <div class="left" @click="openMenu">
      <van-badge :content="unreadNum" :show-zero="false">
        <img src="./img/menu.png" alt="" />
      </van-badge>
    </div>
    <div class="center">
      <Notice class="notice" />
      <Balance />
    </div>
    <div class="right" @click="selectLiveChat">
      <img src="@/assets/img/icon-service.png" alt="" />
    </div>
  </div>
  <van-popup
    v-model:show="appStore.menuStatus"
    position="left"
    :style="{ width: '70%', height: '100%' }"
  >
    <Menu @closeMenu="closeMenu" />
  </van-popup>
  <LiveChat ref="liveChat" />
</template>

<script setup>
import { useAppStore } from '@/stores/app'
import { useAnnouncementStore } from '@/stores/announcement'
import LiveChat from '@/components/LiveChat/LiveChat.vue'

const liveChat = ref(null)
const appStore = useAppStore()
const announcement = useAnnouncementStore()
function closeMenu() {
  appStore.menuStatus = false
}
function openMenu() {
  appStore.menuStatus = true
}
const unreadNum = computed(() => announcement.totalUnread)
const selectLiveChat = () => {
  liveChat.value.open()
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  // border: 1px solid red;
  padding: 8px 0;
  height: 50px;
  .left {
    padding-left: 15px;
    padding-right: 10px;
    img {
      width: 20px;
      height: 20px;
    }
  }
  .right {
    padding-right: 10px;

    img {
      width: 26px;
    }
  }
  .center {
    flex: 1;
    display: flex;
    align-items: center;
    .notice {
      flex: 1;
    }
    .balance-refresh {
      margin-left: -8px;
      margin-right: 6px;
    }
  }
  .notice {
    padding-left: 0;
  }
}
</style>
