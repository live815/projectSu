<template>
  <div class="boxFieldControl">
    <el-dropdown trigger="click" placement="bottom-start">
      <span class="el-dropdown-link">
        {{
          item.cloudCustomData.nickName
          ? item.cloudCustomData.nickName
          : HandlerAccountName(item.from)
        }}
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <div class="fieldTitle">{{$t('Components.FieldControl')}}</div>
          <el-dropdown-item v-if="item.content.data!=='exhibit-Order' && ( user.userInfo.role === 2 || (user.userInfo.role == 1 && (user.userInfo.id === roomType))) "
            v-for="(item, index) in muteOption" :key="index" @click="setGroupMemberMute(item)">
            <span v-if="item.type == 2">{{$t('Components.Ban')}}{{ item.time }}{{$t('Components.Minutes')}}，{{$t('Components.Notice_9')}}</span>
            <span v-else>{{$t('Components.Ban')}}{{ item.time }}{{$t('Components.Minutes')}}</span>
          </el-dropdown-item>
          <el-dropdown-item @click="reply(item)">{{$t('Components.Reply')}}</el-dropdown-item>
          <el-dropdown-item>{{$t('Components.Cancel')}}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script setup>
import { useChatRoomStore } from '@/stores/chatRoom'
import { useUserStore } from '@/stores/user.js'
import { onMounted } from 'vue';
import { setBanLogSave } from '@/api/liveBroadcast'
import { calculateUnbanTime } from '../ChatRoom/method.js'
import {HandlerAccountName } from '@/utils/cache'
import { useTencentIM } from '@/utils/useTencentIM.js'
import { useRoute } from 'vue-router'
import { useLiveStore } from '@/stores/liveBroadcast'
import dayjs from 'dayjs'
const props = defineProps({
  item: {
    type: Object
  }
})
const emit = defineEmits(['reply'])
const user = useUserStore()
const chatStore = useChatRoomStore()
const route = useRoute()
const { sendMessage } = useTencentIM()
const liveStore = useLiveStore()
const anchorDebut = ref(JSON.parse(localStorage.getItem('AnchorDebut')))
const muteOption = computed(() => {
  return JSON.parse(chatStore.chatRoomConfig?.clientBanItem)
})
const roomType = computed(() => {
  return route?.name == 'anchorPlay' ? anchorDebut.value.presenterId : liveStore.liveRoom.presenterId
})

const setGroupMemberMute = (item) => {
  const duration = Number(item.time) //禁言时长
  const banModel = Number(item.type) // 禁言类型
  const param = {
    user: { from: props.item.from, userId: props.item.cloudCustomData.userId },
    time: duration,
    type: banModel,
    untieTime:calculateUnbanTime(duration)
  }
  const data = {
    type: 'customize',
    text: 'Ban',
    description: JSON.stringify(param)
  }
  sendMessage(data).then((res) => {
    const chatRoomId = anchorDebut.value?.id ? anchorDebut.value.id : liveStore.liveRoom.id
    const banTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
    const param = {
      memberId: props.item.cloudCustomData.userId,
      chatRoomId,
      banType: 2,
      duration,
      content: props.item.content,
      banBy: user.userInfo.userName,
      banTime: banTime,
      untieTime: calculateUnbanTime(duration),
      banModel
    }
    setBanLogSave(param)
    eventBus.emit('SendMessage', res)
  })
}
onMounted(() => {
  // console.log(props.item.content.data,'item')
})
const reply = (item) => {
  emit('reply', item)
}
</script>
<style scoped lang="scss">
.fieldTitle {
  height: 36px;
  padding: 7px 12px;
  background: #283057;
  color: var(--60, rgba(255, 255, 255, 0.6));
  
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  /* 157.143% */
  text-align: center;
}
</style>
<style lang="scss">
.el-dropdown-link {
  display: flex;
  align-items: center;
  color: var(--unnamed, #fff);
  
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  background: none;
  cursor: pointer;
}

.el-dropdown {
  background: none;
  border: 0;
}

.el-dropdown-menu {
  border-radius: 4px;
  background: #232949;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.23);
  border: 0;
}

.el-popper.is-pure {
  background: #232949;
  border: 1px solid #232949;
}

.el-dropdown-menu__item {
  height: 36px;
  color: rgba(255, 255, 255, 0.7);
}

.el-popper.is-pure .el-popper__arrow::before {
  background: none;
  background: #232949;
  border: 1px solid #232949;
}

.el-dropdown-menu__item:not(.is-disabled):focus {
  background: #232949;
  color: rgba(255, 255, 255, 0.6);
}

.el-dropdown-menu__item:hover {
  background: #323c6f !important;
  color: #fff !important;
}
</style>
