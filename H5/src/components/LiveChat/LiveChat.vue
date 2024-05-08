<template>
  <div class="live-chat-view">
    <van-popup v-model:show="showBottom" position="bottom">
      <div class="item" @click="openCustomerServiceLink">{{ $t('common.mainService') }}</div>
      <div class="item" @click="openSecondaryLine">{{ $t('common.secondService') }}</div>
    </van-popup>
    <LiveChatWidget
      v-if="showBottom"
      license="17512305"
      :visibility="status"
      :customerName="userName"
      @Visibility-Changed="closure"
    />
  </div>
</template>

<script setup>
import { openCustomerServiceLink } from '@/utils/customerService'
import { LiveChatWidget } from '@livechat/widget-vue'
import { useUserStore } from '@/stores/user'

const showBottom = ref(false)
const status = ref('hidden')
const user = useUserStore()
const userName = user.userInfo.userName

const open = () => {
  showBottom.value = true
}
defineExpose({ open })

const openSecondaryLine = () => {
  status.value = 'maximized'
}
const closure = (data) => {
  if (data.visibility === 'minimized') {
    status.value = 'hidden'
    showBottom.value = false
  }
}
</script>

<style lang="scss" scoped>
.live-chat-view {
  .item {
    padding: 15px;
    text-align: center;
    color: #111;
    font-size: 16px;
    font-weight: 600;
  }
}
</style>
