<template>
  <div class="field-control">
    <van-popup v-model:show="showBottom" position="bottom">
      <div class="row title">{{ $t('Mletter.fiecontrol') }}</div>
      <div
        v-for="(item, index) in muteOption"
        :key="index"
        @click="setGroupMemberMute(item)"
        class="row"
      >
        <span v-if="item.type == 2">{{ $t('Mletter.mlettertip12', { num: item.time }) }}</span>
        <span v-else>{{ $t('Mletter.mlettertip13', { num: item.time }) }}</span>
      </div>
      <div class="row color" @click="reply">{{ $t('Mletter.reply') }}</div>
      <div class="placeholder"></div>
      <div class="row color" @click="showHide">{{ $t('Mletter.cancel') }}</div>
    </van-popup>
  </div>
</template>

<script setup>
import { useTencentIM } from '@/hooks/useTencentIM.js'
import { useUserStore } from '@/stores/user.js'
import { addMemberMuteLog } from '@/api/chatroom'
import { useChatroomStore } from '@/stores/chatroom'
import { useRoute } from 'vue-router'
import dayjs from 'dayjs'
import eventBus from '@/utils/eventBus'
import { calculateUnbanTime } from '../Chatroom/method.js'
import { showToast } from 'vant'
import i18n from '@/i18n'
const chatStore = useChatroomStore()
const user = useUserStore()
const route = useRoute()
const { sendMessage } = useTencentIM()
const showBottom = ref(false)
const operatingUser = ref()
const emit = defineEmits(['reply'])

const muteOption = computed(() => {
  return JSON.parse(chatStore.chatroomConfig?.clientBanItem)
})

const setGroupMemberMute = (item) => {
  const duration = Number(item.time) //禁言时长
  const banModel = Number(item.type) // 禁言类型
  const param = {
    user: { from: operatingUser.value.from, userId: operatingUser.value.cloudCustomData.userId },
    time: duration,
    type: banModel
  }
  const data = {
    type: 'customize',
    text: 'Ban',
    description: JSON.stringify(param)
  }
  sendMessage(data).then((res) => {
    const chatRoomId = route.query.liveID ? route.query.liveID : route.params.id
    const banTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
    const param = {
      memberId: operatingUser.value.cloudCustomData.userId,
      chatRoomId,
      banType: 2,
      duration,
      content: operatingUser.value.content,
      banBy: user.userInfo.userName,
      banTime: banTime,
      untieTime: calculateUnbanTime(duration),
      banModel
    }
    addMemberMuteLog(param).then((v) => {
      if (v.code === 200) {
        eventBus.emit('SendMessage', res)

        if (item.type === 2) {
          showToast(i18n.global.t('Mletter.mlettertip14'))
        } else {
          showToast(i18n.global.t('Mletter.mlettertip15'))
        }
      }
    })
    showHide()
  })
}

const showHide = (data) => {
  operatingUser.value = data
  showBottom.value = !showBottom.value
}
const reply = () => {
  emit('reply', operatingUser.value)
}
defineExpose({ showHide })
</script>

<style lang="scss" scoped>
.field-control {
  :deep() {
    .van-popup {
      height: 308px;
      border-radius: 20px 20px 0px 0px;
    }
    .van-icon-cross:before {
      color: #333;
    }
  }
  .row {
    width: 100%;
    height: 50px;
    color: var(--1, #f53f3f);
    text-align: center;

    font-size: 16px;
    font-weight: 500;
    line-height: 50px;
    border-bottom: 1px solid #f7f7f7;
  }
  .title {
    color: #333;
    font-weight: 600;
  }
  .color {
    color: #333;
  }
  .placeholder {
    width: 100%;
    height: 8px;
    background: #f7f7f7;
  }
}
</style>
