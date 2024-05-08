<template>
  <div class="rightTop">
    <div :class="[currenTab == index ? 'actvie tabDiv' : 'tabDiv']" @click="tabBtn(index)"
      v-for="(item, index) in tabData" :key="index">
      {{ item.lable }}
    </div>
  </div>
  <div>
    <!-- 聊天室  heightType 1 用户直播间 2是直播直播间-->
    <ChatRoom v-show="currenTab == 0 && chatStore.chatRoomConfig?.chatRoomEnable == 1" :heightType="1" />
    <BettingObj v-if="(currenTab == 1 && liveStore.liveRoom.roomStyle !== 4 && liveStore.liveRoom.roomStyle !== 6 )
    || (currenTab == 1 && liveStore.roomSportType !== 0 && tabData?.length>0) 
    || (tabData?.length>0 && currenTab == 1 && (liveStore.liveRoom?.roomStyle == 1 || liveStore.liveRoom?.roomStyle == 2) 
    || (tabData?.length>0 &&  chatStore.chatRoomConfig?.chatRoomEnable == 0))
      " />
    <!-- <NoList v-else style="height: 500px;" /> -->
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import BettingObj from '@/components/BettingObj/BettingObj.vue'
import ChatRoom from '@/components/ChatRoom/ChatRoom.vue'
// import NoList from '@/components/NoList/NoList.vue'
import { useLiveStore } from '@/stores/liveBroadcast'
import { useChatRoomStore } from '@/stores/chatRoom'
import { onMounted } from 'vue';
const currenTab = ref(0)
const liveStore = useLiveStore()
const chatStore = useChatRoomStore()
const tabList = ref([
  {
    lable: i18n.global.t('Components.Chat'),
    status: true
  },
  {
    lable: i18n.global.t('Components.Bet'),
    status: true
  }
])
const tabData = computed(() => {
  console.log(liveStore.liveRoom.roomStyle,chatStore.chatRoomConfig?.chatRoomEnable, 'chatStore.chatRoomConfig?.chatRoomEnable')
  if (liveStore.liveRoom.roomStyle || liveStore.roomSportType == 1 || liveStore.roomSportType == 2) {
    tabList.value[0].status = chatStore.chatRoomConfig?.chatRoomEnable == 1 ? true : false//关闭聊天室
    tabList.value[1].status = liveStore.liveRoom.roomStyle == 1 || liveStore.liveRoom.roomStyle == 3 || liveStore.roomSportType == 1 || liveStore.roomSportType == 2 ? true : false
    // console.log(tabList.value, ' tabList.value[0].status')
    liveStore.liveBtn=tabList.value.filter((item) => item.status).length>0 ?true :false
    // console.log(liveStore.liveBtn,'liveStore.liveBtn')
    return tabList.value.filter((item) => item.status) || []
  } else {
    liveStore.liveBtn=tabList.value?.length>0 ?true :false
    return tabList.value
  }

})

onMounted(() => {
  chatStore.getChatroomConfig(liveStore.roomSportType == 0 ? 1 : 2)
})
const tabBtn = (index) => {
  currenTab.value = index
}
</script>

<style lang="scss" scoped>
.rightTop {
  height: 73px;
  display: flex;
  align-items: center;
  font-size: 18px;

  .tabDiv {
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    color: var(--80, var(---80, rgba(255, 255, 255, 0.8)));
    
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    cursor: pointer;
  }

  .actvie {
    color: #f35f1b;
    transition: all 0.3s ease-in-out;
  }

  .actvie::before {
    content: '';
    position: absolute;
    display: flex;
    width: 165px;
    height: 4px;
    border-radius: 50px;
    background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
    top: 70px;
    transition: all 0.3s ease-in-out;
  }
}
</style>
