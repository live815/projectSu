<template>
  <div class="open-account">
    <div class="open-header">
      <div class="header-linear"></div>
      <div class="header-title">{{ $t('BusinessAgentView.TitleTwo') }}</div>
      <div class="header-linear-right"></div>
    </div>
    <div class="open-middle">
      {{ $t('BusinessAgentView.TitleThree') }}
    </div>
    <div class="open-v-button">
      <v-button @click="selectLiveChat"> {{ $t('BusinessAgentView.ApplyAccount') }}</v-button>
    </div>
  </div>
  <LiveChat ref="liveChat" />
</template>

<script setup>
import LiveChat from '@/components/LiveChat/LiveChat.vue'
const liveChat = ref(null)

const selectLiveChat = () => {
  liveChat.value.open()
}
</script>

<style lang="scss" scoped>
.open-account {
  border-radius: 20px 20px 0px 0px;
  background: #fff;
  box-shadow: 5px 0px 15px 0px #e5e5e5;
  margin: 24px -15px 0;
  padding: 15px 0;
  .open-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .header-linear {
      margin-left: 30px;
      width: 80px;
      height: 2px;
      background: linear-gradient(90deg, rgba(255, 80, 0, 0) 0%, #ff5000 100%);
    }
    .header-title {
      color: #000;
      font-size: 15px;
      line-height: 28px;
      font-weight: 600;
    }
    .header-linear-right {
      margin-right: 30px;
      width: 80px;
      height: 2px;
      background: linear-gradient(90deg, #ff5000 0%, rgba(255, 80, 0, 0) 100%);
    }
  }
  .open-middle {
    text-align: center;
    color: var(--color-text-dark);
    font-size: 13px;
    line-height: 24px;
    padding: 10px 20px;
  }
  .open-v-button {
    margin: 0 25px;
  }
}
</style>
