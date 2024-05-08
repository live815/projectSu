<template>
  <div class="chatroom" :class="chatroomClass">
    <van-notice-bar scrollable background="#fff5f0">
      <template #left-icon>
        <img :src="trumpet" />
      </template>
      <span>
        {{ chatStore.chatroomConfig?.bulletin }}
      </span>
    </van-notice-bar>
    <div
      v-if="downloadSlogan"
      class="download"
      :style="{ backgroundImage: `url(${getImg(isStreamerLive?.imAppImage)})` }"
    >
      <van-icon
        name="clear"
        size="10px"
        color="rgba(0, 0, 0, 0.30)"
        @click="downloadSlogan = false"
      />
      <p class="text">{{ $t('Mletter.mlettertip1') }}</p>
      <img width="20" height="20" :src="download" @click="clickOpen" />
      <div class="line"></div>
      <p class="anchorID">
        {{ $t('Mletter.anchorid') }}

        <span class="name" id="anchorID">{{ isStreamerLive?.imNumber }}</span>
      </p>
      <div class="copy" data-clipboard-target="#anchorID">{{ $t('Mletter.copy') }}</div>
    </div>
    <div class="message-box" :class="messageBoxClass" ref="scrollBox" @scroll="scrollfn">
      <div v-for="item in messageList" :key="item.id" class="received-message">
        <div
          v-if="!['gift'].includes(item.content?.data) && item.type !== 'system'"
          ref="newsBox"
          class="mes-box"
          @click.stop="focusInput(item)"
        >
          <div class="head">
            <img
              v-if="item.cloudCustomData?.role === 2 || item.cloudCustomData?.userId == anchorId"
              class="title-icon"
              :src="item.cloudCustomData?.role === 1 ? anchor : admin"
            />
            <img
              v-if="![1, 2].includes(item.cloudCustomData?.role)"
              class="vip"
              :src="vipIcon[item.cloudCustomData?.vipLevel]"
            />
            <div>
              <span class="name">
                {{
                  item.cloudCustomData?.nickName
                    ? item.cloudCustomData?.nickName
                    : HandlerAccountName(item.from)
                }}：</span
              >
              <span
                class="mes-content"
                :class="{ 'mes-color': item.from === user.userInfo.userName }"
                v-if="item.content?.data !== 'exhibit-Order' && item.content?.data !== '@'"
              >
                {{ item.content }}</span
              >
              <span v-if="item.content?.data === 'exhibit-Order'" class="post-orders">
                {{ $t('Mletter.Postorder') }}
              </span>

              <template v-if="item.content?.data === '@'">
                <span class="targetUser" v-if="item.content.id === user.userInfo.id"
                  >@{{ $t('Mletter.me') }}</span
                >
                <span class="targetUser" v-else>@{{ item.content.user }}</span>
                {{ item.content.mes }}
              </template>
            </div>

            <!-- <div class="date">{{ dayjs.unix(item.date).format('HH:mm') }}</div> -->
          </div>
          <!-- <div
            class="message"
            :class="{
              'other-highlight':
                item.cloudCustomData?.vipLevel >= 4 ||
                item.cloudCustomData?.role === 2 ||
                item.cloudCustomData?.userId == anchorId,
              'message-color': item.cloudCustomData?.vipLevel > 3
            }"
          >
            表情消息
            <template v-if="item.content?.data === 'emoji1'">
              <img
                v-for="item in matchEmoticonsById(item.content.description)"
                :key="item.id"
                width="24"
                height="24"
                :src="item.imgSrc"
              />
            </template>
          </div> -->
          <!-- 晒单组件 -->
          <ExhibitOrders
            v-if="item.content?.data === 'exhibit-Order'"
            :data="item.content.description"
          />
        </div>
        <!-- 聊天室小助手消息 -->
        <div v-if="item.type === 'system'" class="assistant-message">
          <div>
            <span class="assistant">{{ $t('Mletter.mlettertip2') }}</span
            >：<span class="message">{{ item.content }}</span>
          </div>
          <!-- <span >{{ item.content }} </span> -->
        </div>
        <!-- 礼物消息 -->
        <div v-if="item.content?.data === 'gift'" class="gift-message">
          <div style="display: flex; align-items: center">
            <span class="name">{{ HandlerAccountName(item.from) }}</span>
            <span class="text send-out">{{ $t('Mletter.send') }}</span>
            <span class="text">{{ item.content.description.giftName }}</span>
            <img width="20" height="20" :src="getImg(item.content.description.giftSmallImage)" />
            <span class="giftNum">x {{ item.content.description.giftNum }}</span>
          </div>
        </div>
      </div>
      <template v-if="tabsName === 'chatroom'">
        <van-back-top bottom="400" right="10" :style="{ background: '#fff' }"
          ><van-icon color="#202020" size="18" name="arrow-up" />
        </van-back-top>
      </template>
      <div
        v-if="route.query.liveID && liveStore.anchorsPushOrders?.length"
        class="oddsEntrance"
        @click="anchorsPushOrdersDom.showHide()"
      >
        {{ $t('Mletter.Anchorpushorder') }}
      </div>
    </div>
    <div class="bottom" :class="{ 'bottom-hight': inputStatus }" ref="replyTemplate">
      <div v-show="inputStatus" class="reply-text">
        <van-icon name="clear" color="rgba(0, 0, 0, 0.30)" size="10px" @click="cancelReply" />
        <span class="name">{{ $t('Mletter.reply') }} l @{{ targetedMessage?.name }}:</span>
        <span class="text">{{ targetedMessage?.message }}</span>
      </div>
      <input
        :class="{ inputValue: inputStatus, lengthen: !isMatch }"
        type="text"
        :placeholder="placeholderText"
        :maxlength="100"
        ref="inputValue"
        v-model="message"
        @keyup.enter="send"
        @click="handleUserBanned(isBan, vipArr)"
        :readonly="
          (!chatStore.chatroomConfig?.speakEnable ||
            !vipArr?.includes(user.userInfo.vipLevel) ||
            isBan) &&
          ![1, 2].includes(user.userInfo.role)
        "
      />
      <img
        class="sendIcon"
        :class="{ sendIcons: inputStatus, 'sendIcon-right': !isMatch }"
        :src="download"
        @click="send"
      />

      <!-- <img
        class="emoticons"
        :class="{ emoticonss: inputStatus }"
        :src="emoticons"
        @click="selectEmoticon"
      /> -->
      <div v-show="!inputStatus" class="icon-box">
        <div v-if="isMatch" class="item" @click="ShareNShopPopup.showHide()">
          <img :src="order" />
          <p>{{ $t('Mletter.Postorders') }}</p>
          <teleport to="#app">
            <ShareNShop ref="ShareNShopPopup" />
          </teleport>
        </div>
        <div v-if="isMatch" class="item" @click="ShowcaseOnlyPopup.showHide()">
          <img :src="bet" />
          <p>{{ $t('Mletter.onlylookorder') }}</p>
          <teleport to="#app">
            <ShowcaseOnly ref="ShowcaseOnlyPopup" />
          </teleport>
        </div>
        <div v-if="fromLive" class="item" @click="sendAGift">
          <img :src="gift" />
          <p>{{ $t('Mletter.gift') }}</p>
        </div>
        <div v-else class="item" @click="router.push('/user-center-bet-record')">
          <img :src="JustWatchOrder" />
          <p>{{ $t('Mletter.betbill') }}</p>
        </div>
      </div>
      <!-- 返回底部控件 -->
      <div v-if="messageCounter" class="backToBottom" @click="scrollToBottom">
        {{ $t('Mletter.newmessage', { num: messageCounter }) }}
      </div>
      <div v-if="!isLogin" class="mask" @click="judge"></div>
    </div>

    <!-- 场控面板 -->
    <FieldControl ref="fieldControls" @reply="reply" />
    <!-- 表情组件 -->
    <Emoticons ref="emoticonsDom" @callKeyboard="callKeyboard" />
    <!-- 礼物组件 -->
    <GiftPopUp ref="giftPopUpDom" :giftList="giftList" />
    <!-- 主播推单 -->
    <AnchorsPushOrders
      v-if="route.query.liveID && liveStore.anchorsPushOrders?.length"
      ref="anchorsPushOrdersDom"
    />
    <div id="svgaWrapper"></div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import trumpet from './img/trumpet.png'
import order from './img/order.png'
import bet from './img/bet.png'
import JustWatchOrder from './img/JustWatchOrder.png'
import gift from './img/gift.png'
import download from './img/download.png'
import ShareNShop from '../ShareNShop/ShareNShop'
import ShowcaseOnly from '../ShowcaseOnly/ShowcaseOnly.vue'
import FieldControl from '../FieldControl/FieldControl'
import ExhibitOrders from '../ExhibitOrders/ExhibitOrders'
import AnchorsPushOrders from '../AnchorsPushOrders/AnchorsPushOrders.vue'
import Emoticons from '../Emoticons/Emoticons'
import GiftPopUp from '../GiftPopUp/GiftPopUp'
import { useAnimation } from '@/hooks/useAnimation'
import Clipboard from 'clipboard'
import { useTencentIM } from '@/hooks/useTencentIM.js'
import { useUserStore } from '@/stores/user.js'
import eventBus from '@/utils/eventBus'
import dayjs from 'dayjs'
import storage from 'good-storage'
import { vipIcon } from '@/utils/config.js'
import { getToken } from '@/utils/cache'
import { showToast } from 'vant'
import { useFBStore } from '@/stores/fb'
import {
  getGiftList,
  getSensitiveWordList,
  getUserBanStatus,
  addShieldedRecord
} from '@/api/chatroom.js'
import { liveStatistics } from '@/api/live'
import { getImg, HandlerAccountName } from '@/utils'
import Reg from '@/utils/reg'
import { useLiveList } from '@/stores/live'
import { useChatroomStore } from '@/stores/chatroom'
import {
  handleUserBanned,
  floodDetection,
  setGroupMemberMute,
  containsSensitiveWords,
  maskText,
  isUrl,
  calculateUnbanTime
} from './method.js'
import { useClickAway } from '@vant/use'
import i18n from '@/i18n'
import { useAppStore } from '@/stores/app'
import { watchEffect } from 'vue'

const appStore = useAppStore()
const liveStore = useLiveList()
const messageList = ref([])
const scrollBox = ref(null)
const fieldControls = ref(null)
const inputValue = ref(null)
const ShareNShopPopup = ref(null)
const ShowcaseOnlyPopup = ref(null)
const emoticonsDom = ref(null)
const giftPopUpDom = ref(null)
const anchorsPushOrdersDom = ref(null)
const message = ref(null)
const inputStatus = ref(false)
const messageCounter = ref(0) // 新消息计数器
const router = useRouter()
const route = useRoute()
const downloadSlogan = ref(false)
const { onReceiveAnimationMessage } = useAnimation()
const user = useUserStore()
const isLogin = getToken()
const fbStore = useFBStore()
const chatStore = useChatroomStore()
const giftList = ref([])
const targetedMessage = ref()
const isBan = ref(false)
const temMessage = ref([]) // 临时消息存储，用于计算刷屏规则
const sensitiveWords = ref([]) // 敏感词
const replyTemplate = ref(null)
const newsBox = ref(null)
const targetUser = ref() // 暂存被@用户的ID
const emit = defineEmits(['update-message-counter'])
const chatRoomId = route.query.liveID ? route.query.liveID : route.params.id
const anchorId = route.query.anchorId
const randomInteger = Math.floor(Math.random() * (8 - 5 + 1)) + 5 // 热度值：取5-8随机正整数
const fromLive = route.query.data === 'fromLive'
const roomCode = fromLive ? route.query.roomCode : route.params.id // 统计接口参数
const muteTime = ref(0)
const intervalId = ref()
const untieTime = ref()
const continuousMes = ref(false) // 消息连续发送
defineProps({
  tabsName: {
    type: String
  },
  isMatch: {
    type: Boolean,
    default: true
  }
})

const anchor = computed(() => {
  return new URL(`./img/${appStore.language}/anchor.png`, import.meta.url).href
})

const admin = computed(() => {
  return new URL(`./img/${appStore.language}/admin.png`, import.meta.url).href
})

const vipArr = computed(() => {
  return chatStore.chatroomConfig.speakVipLevel.split(',').map(Number)
})
// 是否有卫星直播
const isSatelliteLive = computed(() => {
  return liveStore.satelliteLive[liveStore.videoSource]?.some((source) => Number(source.fbId) === route.params.id)
})
// 查找主播数据
const isStreamerLive = computed(() => {
  if (
    liveStore.streamerLive &&
    Array.isArray(liveStore.streamerLive.list) &&
    liveStore.streamerLive.list.length > 0
  ) {
    return liveStore.streamerLive.list.find(
      (item) => Number(item.memberId) === Number(route.query.anchorId)
    )
  }
  return null
})
// 点击底部外部元素关闭回复状态
useClickAway(
  replyTemplate,
  () => {
    if (inputStatus.value) {
      inputStatus.value = false
      message.value = ''
    }
  },
  { eventName: 'click' }
)

const cancelReply = () => {
  message.value = ''
  inputStatus.value = false
}

const getViewHigh = () => {
  if (newsBox.value?.length) {
    const bottom = replyTemplate.value.getBoundingClientRect()
    const newNews = newsBox.value[newsBox.value?.length - 1]?.getBoundingClientRect()
    return newNews.top + 100 > bottom.top
  } else return false
}

// 收到ws消息解除禁言
watchEffect(() => {
  const chatRoomIds = chatStore.memberUntie.chatRoomIds || []
  const memberIds = chatStore.memberUntie.memberIds || []

  if (chatRoomIds.includes(chatRoomId) && memberIds.includes(user.userInfo.id)) {
    isBan.value = false
  }
})

const init = async () => {
  // 获取礼物列表
  getGiftList().then((res) => {
    giftList.value = res.data.list
  })

  getSensitiveWordList().then((res) => {
    sensitiveWords.value = res.data
  })

  if (isLogin) {
    await getUserBanStatus({
      chatRoomId: Number(chatRoomId),
      memberId: user.userInfo.id
    }).then((res) => {
      if (res.code === 200 && res.data) {
        isBan.value = res.data.status
        untieTime.value = res.data.untieTime
      }
    })
  }

  // 进入人数统计
  if (fromLive || isSatelliteLive.value) {
    downloadSlogan.value = true
    liveStatistics({
      enterNum: 1,
      roomCode
    })
  }

  // 观看人数统计
  const flagged = storage.get('liveViewNum') || []
  if ((isSatelliteLive.value || fromLive) && isLogin && !flagged.includes(roomCode)) {
    setTimeout(() => {
      liveStatistics({
        viewNum: 1,
        roomCode,
        heat: randomInteger
      }).then((res) => {
        if (res.code === 200) {
          if (flagged.length >= 50) {
            flagged.length = 0 // 清空数组
          }
          flagged.push(roomCode)
          storage.set('liveViewNum', flagged)
        }
      })
    }, 90000)
  }
  if (Object.keys(liveStore.streamerLive).length === 0) {
    liveStore.getStreamerLive()
  }
  if (isBan.value) {
    countdown(untieTime.value)
  }
}
init()

// 更新主播推单信息
watchEffect(() => {
  const pushOrderData = liveStore.liveList.find((item) => {
    return item.id == route.query.liveID
  })?.orderList
  liveStore.anchorsPushOrders = pushOrderData
})
// 礼物动画
const svgaUrl = computed(() => {
  // 使用 reduce 函数将 giftList 转换为对象
  const svgaObject = giftList.value.reduce((accumulator, element) => {
    // 将 element.id 作为属性名，element.giftBigImage 作为属性值，添加到对象中
    accumulator[element.id] = element.giftBigImage
    return accumulator
  }, {})

  return svgaObject
})

// 根据条件动态设置视图高度
const chatroomClass = computed(() => {
  const isMatchDetail234 = [0, 4].includes(fbStore.matchDetailList?.ms)

  return {
    'chatroom-234': isMatchDetail234 && !liveStore.matchAnchorArr?.length,
    'chatroom-300': fromLive
  }
})

const messageBoxClass = computed(() => {
  const isMatchDetail234 = [0, 4].includes(fbStore.matchDetailList?.ms)
  return {
    'message-box-380': isMatchDetail234 && !fromLive
  }
})

const judge = (event) => {
  if (!isLogin) {
    event.stopPropagation() // 阻止事件冒泡
    showToast(i18n.global.t('Mletter.loginfirst'))
  }
}

// 复制
const clipboard = new Clipboard('.copy')
clipboard.on('success', (e) => {
  e.clearSelection()
  showToast(i18n.global.t('Mletter.copysucess'))
})

const focusInput = (item) => {
  if (!isLogin || item.from === user.userInfo.userName) {
    return
  } else if (isBan.value) {
    showToast(i18n.global.t('Mletter.mlettertip3'))
    return
  }

  if (user.userInfo.role === 2 || anchorId == user.userInfo.id) {
    fieldControls.value.showHide(item)
  } else {
    const name = item.cloudCustomData.nickName
      ? item.cloudCustomData.nickName
      : HandlerAccountName(item.from)

    targetedMessage.value = {
      name,
      message: item.content.data ? '' : item.content
    }
    inputValue.value.focus()
    inputStatus.value = true
    targetUser.value = item.cloudCustomData.userId
  }
}

// 管理员点击操作面板内的 "回复" 触发
const reply = (data) => {
  fieldControls.value.showHide()
  inputValue.value.focus()
  targetedMessage.value = {
    name: data.from,
    message: data.content
  }
  message.value = '@' + data.from + '  '
  setTimeout(() => {
    inputStatus.value = true
  }, 300)
}
// 滚动到底部
const scrollToBottom = () => {
  if (scrollBox.value) {
    setTimeout(() => {
      scrollBox.value.scrollTo({
        top: scrollBox.value.scrollHeight,
        behavior: 'smooth' // 启用平滑滚动
      })
    }, 300)
    messageCounter.value = 0
  }
}

//表情输入框内点击键盘触发
const callKeyboard = () => {
  inputValue.value.focus()
}

const scrollfn = (event) => {
  const scrollY = event.target.scrollTop // 获取垂直滚动位置
  const windowHeight = event.target.clientHeight // 获取窗口可见区域的高度
  const contentHeight = event.target.scrollHeight // 获取内容区域的高度
  if (scrollY + windowHeight >= contentHeight) {
    messageCounter.value = 0
    emit('update-message-counter', messageCounter.value)
  }
}
// 不同类型消息的处理函数映射对象
const messageTypeHandlers = {
  // 处理礼物消息
  'customize-gift': (messageText) => {
    const data = JSON.parse(messageText.content.description)
    const newMessage = {
      from: messageText.from,
      type: 'customize',
      content: {
        data: 'gift',
        description: data
      }
    }
    // 历史消息不播放礼物动画
    if (!messageText.isHistory) {
      onReceiveAnimationMessage(getImg(svgaUrl.value[data.id])) // 播放礼物动画

      // 发送弹幕
      const param = {
        description: data,
        name: messageText.from
      }
      eventBus.emit('SendBarrages', param)
    }

    messageList.value.push(newMessage)
    return Promise.resolve()
  },
  // 处理表情消息
  'customize-emoji1': (messageText) => {
    const data = JSON.parse(messageText.content.description)
    const cloudCustomData = JSON.parse(messageText.cloudCustomData)
    const newMessage = {
      from: messageText.from,
      type: 'customize',
      date: messageText.date,
      content: {
        data: 'emoji1',
        description: data
      },
      cloudCustomData
    }
    messageList.value.push(newMessage)
    return Promise.resolve()
  },
  // 处理晒单消息
  'customize-exhibit-Order': (messageText) => {
    const data = JSON.parse(messageText.content.description)
    const cloudCustomData = JSON.parse(messageText.cloudCustomData)
    const newMessage = {
      from: messageText.from,
      type: 'customize',
      date: messageText.date,
      content: {
        data: 'exhibit-Order',
        description: data
      },
      cloudCustomData
    }
    messageList.value.push(newMessage)
    return Promise.resolve()
  },
  'customize-@': (messageText) => {
    const data = JSON.parse(messageText.content.description)
    const cloudCustomData = JSON.parse(messageText.cloudCustomData)
    const newMessage = {
      from: messageText.from,
      date: messageText.date,
      content: {
        data: '@',
        user: data.userName,
        mes: data.mes,
        id: data.id
      },
      cloudCustomData
    }
    messageList.value.push(newMessage)
    return Promise.resolve()
  }
}

const handleNewMessage = async (messageText) => {
  if (messageText.content && messageText.content?.data !== 'Ban') {
    // 构建消息类型字符串
    const messageType = `${messageText.type}-${messageText.content?.data}`
    // 根据消息类型查找对应的处理函数，找不到则使用默认处理函数
    const handler = messageTypeHandlers[messageType] || defaultMessageHandler
    // 调用相应的处理函数处理消息
    await handler(messageText)
    if (messageText.isHistory) {
      // 滚动到底部
      scrollToBottom()
    } else {
      // 新消息位置超过底部才展示新消息图标
      if (getViewHigh()) {
        messageCounter.value++
        emit('update-message-counter', messageCounter.value)
      }
    }
  }

  // 用户禁言
  if (!messageText.isHistory && messageText.content?.data === 'Ban') {
    const data = JSON.parse(messageText.content?.description)
    if (data.user.from === user.userInfo.userName) {
      isBan.value = true
      countdown(data.untieTime)
    }
    // 清除聊天记录
    if (data.type === 2) {
      messageList.value = messageList.value.filter(
        (item) => item.cloudCustomData.userId !== data.user.userId
      )
    }
  }
}

// 默认的消息处理函数
const defaultMessageHandler = (messageText) => {
  let cloudCustomData = ''
  if (messageText.cloudCustomData) {
    cloudCustomData = JSON.parse(messageText.cloudCustomData)
  }

  const newMessage = {
    ...messageText,
    cloudCustomData
  }
  // 将消息添加到消息列表
  messageList.value.push(newMessage)
  return Promise.resolve()
}

const { initializeChat, destroy, onMessageReceived, sendMessage } = useTencentIM(handleNewMessage)
initializeChat()

const send = () => {
  if (message.value && !continuousMes.value) {
    if (chatStore.chatroomConfig?.phoneNumberEnable && Reg.phoneVagueReg.test(message.value)) {
      showToast(i18n.global.t('Mletter.mlettertip4'))
      return
    } else if (
      chatStore.chatroomConfig?.internetUrlEnable &&
      (Reg.urlRegex.test(message.value) || isUrl(message.value))
    ) {
      showToast(i18n.global.t('Mletter.mlettertip4'))
      return
    } else if (
      containsSensitiveWords(sensitiveWords.value, message.value) &&
      user.userInfo.id != anchorId
    ) {
      const speakTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
      const param = {
        createBy: 'H5',
        memberName: user.userInfo.userName,
        sensitiveWord: maskText(message.value, sensitiveWords.value).matchedWords,
        shieldedContent: maskText(message.value, sensitiveWords.value).maskedText,
        speakContent: message.value,
        speakTime
      }
      addShieldedRecord(param)
      message.value = maskText(message.value, sensitiveWords.value).maskedText
    }

    const newMessage = message.value.trim()

    // 存储消息到临时数组
    temMessage.value.push(newMessage)

    // 判断是否触发刷屏规则
    const { repeatNum, repeatContentRatio } = chatStore.chatroomConfig
    if (temMessage.value?.length >= repeatNum + 1) {
      const isFlood = floodDetection(temMessage.value, repeatContentRatio, repeatNum + 1)
      if (isFlood) {
        showToast(i18n.global.t('Mletter.mlettertip6'))
        isBan.value = true // 禁言
        message.value = ''
        const chatRoomId = route.query.liveID ? route.query.liveID : route.params.id
        const param = {
          chatRoomId,
          userId: user.userInfo.id,
          time: chatStore.chatroomConfig.systemBanDuration,
          content: newMessage,
          banModel: Number(chatStore.chatroomConfig.systemBanItem),
          banType: 1
        }
        setGroupMemberMute(param)
        const untieTime = calculateUnbanTime(param.time)
        countdown(untieTime) // 解禁时间倒计时
        if (chatStore.chatroomConfig.systemBanItem == 2) {
          // 清空聊天记录
          messageList.value = messageList.value.filter(
            (item) => item.cloudCustomData.userId !== user.userInfo.id
          )

          const param = {
            user: { from: user.userInfo.userName, userId: user.userInfo.id },
            time: chatStore.chatroomConfig.systemBanDuration
          }
          const data = {
            type: 'customize',
            text: 'Ban',
            description: JSON.stringify(param)
          }
          sendMessage(data) // 发送全局消息清除聊天记录
        }
        temMessage.value = []
        return
      }
    }

    const { role, vipLevel, id: userId, nickName } = user.userInfo
    const cloudCustomData = JSON.stringify({ role, vipLevel, userId, nickName }) // 发送消息带上用户角色和VIP等级
    let data
    if (!inputStatus.value) {
      data = {
        type: 'text',
        text: message.value,
        cloudCustomData
      }
    } else {
      const obj = { mes: message.value, id: targetUser.value, userName: targetedMessage.value.name }
      data = {
        type: 'customize',
        text: '@',
        description: JSON.stringify(obj),
        cloudCustomData
      }
    }
    continuousMes.value = true
    sendMessage(data)
      .then(function (imResponse) {
        continuousMes.value = false
        if (!inputStatus.value) {
          messageList.value.push({
            from: imResponse.data.message.from,
            content: message.value,
            date: imResponse.data.message.clientTime,
            cloudCustomData: { role, vipLevel, userId, nickName }
          })
        } else {
          const obj = {
            data: '@',
            user: targetedMessage.value.name,
            mes: message.value
          }
          messageList.value.push({
            from: imResponse.data.message.from,
            date: imResponse.data.message.clientTime,
            cloudCustomData: { role, vipLevel, userId, nickName },
            content: obj
          })
          inputStatus.value = false
        }

        message.value = null
        scrollToBottom()

        // 热度:聊天室发言每条，随机浮动值数5~8
        if (isSatelliteLive.value || fromLive) {
          liveStatistics({
            roomCode,
            heat: randomInteger
          })
        }

        // 发言人数统计
        const flagged = storage.get('liveSpeakNum') || []
        if ((isSatelliteLive.value || fromLive) && !flagged.includes(roomCode)) {
          liveStatistics({
            speakNum: 1,
            roomCode,
            heat: randomInteger
          }).then((res) => {
            if (res.code === 200) {
              if (flagged.length >= 50) {
                flagged.length = 0 // 清空数组
              }
              flagged.push(roomCode)
              storage.set('liveSpeakNum', flagged)
            }
          })
        }
      })
      .catch(function (imError) {
        continuousMes.value = true
        if (imError.code === 10017) {
          showToast(i18n.global.t('Mletter.mlettertip3'))
        }
      })
  }
}
onMessageReceived(handleNewMessage)

eventBus.on('SendMessage', (res) => {
  const v = res.data.message
  const data = JSON.parse(v.payload.description)
  let newMessage = null
  if (v.payload.data === 'gift') {
    newMessage = {
      from: v.from,
      type: 'customize',
      date: v.clientTime,
      content: {
        data: 'gift',
        description: data
      }
    }
    onReceiveAnimationMessage(getImg(svgaUrl.value[data.id]))
  } else if (v.payload.data === 'emoji1') {
    const cloudCustomData = JSON.parse(v.cloudCustomData)
    newMessage = {
      from: v.from,
      type: 'customize',
      date: v.clientTime,
      content: {
        data: 'emoji1',
        description: data
      },
      cloudCustomData
    }
  } else if (v.payload.data === 'exhibit-Order') {
    const cloudCustomData = JSON.parse(v.cloudCustomData)
    newMessage = {
      from: v.from,
      type: 'customize',
      date: v.clientTime,
      content: {
        data: 'exhibit-Order',
        description: data
      },
      cloudCustomData
    }
  }
  if (v.payload.data === 'Ban') {
    // 禁言并清除聊天记录
    if (data.type === 2) {
      messageList.value = messageList.value.filter(
        (item) => item.cloudCustomData.userId !== data.user.userId
      )
    }

    return
  }
  messageList.value.push(newMessage)
  // 滚动到底部
  scrollToBottom()
})

// 禁言时长倒计时
const countdown = (targetDate) => {
  const targetTime = new Date(targetDate).getTime()

  const updateCountdown = () => {
    const currentTime = new Date().getTime()
    const timeDifference = targetTime - currentTime

    if (timeDifference > 0) {
      const totalHours = timeDifference / (1000 * 60 * 60)
      const hours = Math.floor(totalHours)
      const minutes = Math.floor((totalHours % 1) * 60) // 取小数部分，转换为分钟
      const seconds = Math.floor((totalHours * 3600) % 60)

      // 使用 padStart 确保小时和分钟以两位数表示
      const formattedHours = hours.toString().padStart(2, '0')
      const formattedMinutes = minutes.toString().padStart(2, '0')
      const formattedSeconds = seconds.toString().padStart(2, '0')

      if (hours && minutes) {
        muteTime.value = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
      } else if (minutes) {
        muteTime.value = `${formattedMinutes}:${formattedSeconds}`
      } else {
        muteTime.value = `${formattedSeconds}`
      }
    } else {
      isBan.value = false
      clearInterval(intervalId.value)
    }
  }

  // 初始调用一次，避免页面加载时显示 0ms
  updateCountdown()

  // 每秒更新一次倒计时
  intervalId.value = setInterval(updateCountdown, 1000) // 初始化 intervalId
}
const placeholderText = computed(() => {
  if (!chatStore.chatroomConfig?.speakEnable) {
    return i18n.global.t('Mletter.mlettertip7')
  } else if (isBan.value) {
    return `${i18n.global.t('Mletter.banned')}${muteTime.value}`
  } else if (
    !vipArr.value.includes(user.userInfo.vipLevel) &&
    ![1, 2].includes(user.userInfo.role)
  ) {
    return i18n.global.t('Mletter.mlettertip8')
  } else {
    return i18n.global.t('Mletter.mlettertip9')
  }
})

const sendAGift = () => {
  if (chatStore.chatroomConfig?.giftEnable) {
    giftPopUpDom.value.showHide()
  } else {
    showToast(i18n.global.t('Mletter.mlettertip10'))
  }
}

// 点下载进行跳转
const clickOpen = () => {
  window.open(isStreamerLive.value.imJumpUrl, '_blank')
}

watchEffect(() => {
  if (message.value?.length == 100) {
    showToast(i18n.global.t('Mletter.mlettertip11'))
  }
})

onUnmounted(() => {
  eventBus.off('SendMessage')
  clearInterval(intervalId.value)
  destroy()
})
</script>

<style lang="scss" scoped>
#svgaWrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  pointer-events: none;
}
.chatroom {
  height: calc(var(--app-height) - 275px);
  overflow: auto;
  .van-notice-bar {
    color: var(--2, #ff5000);
    font-size: 13px;
    font-weight: 400;
    img {
      width: 20px;
      height: 20px;
      margin-right: 8px;
    }
  }
  .download {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 36px;
    background-size: cover;
    background-repeat: no-repeat;
    .down-icon {
      width: 30px;
      height: 30px;
      margin: 0 4px 0 8px;
    }
    .text {
      color: #002877;
      font-size: 15px;
      font-weight: 700;
      font-style: italic;
      margin: 0 10px 0 40px;
    }
    .line {
      width: 0.5px;
      height: 20px;
      opacity: 0.1;
      background: #002877;
      margin: 0 10px 0 15px;
    }
    .anchorID {
      // @include textToOmit();
      color: #002877;
      font-size: 12px;
      .name {
        color: #0084fe;
        font-weight: 700;
        margin-right: 5px;
      }
    }
    .copy {
      border-radius: 3px;
      background: #002877;
      color: #fff;
      font-size: 11px;
      text-align: center;
      line-height: 14px;
      border: none;
      margin-left: 6px;
      padding: 2px;
    }
  }
  .title-icon {
    width: 40px;
    height: 18px;
    float: left;
  }
  .vip {
    width: 40px;
    height: 18px;
    float: left;
  }
  .post-orders {
    color: #ff9000;
    border-radius: 24px;
    background: var(--4, #fff5f0);
    padding: 4px 4px 2px 4px;
    margin-right: 5px;
  }
  .message {
    display: inline-block;
    color: #666;
    font-size: 14px;
    // 禁止文本选中
    user-select: none;
    -webkit-user-select: none;
    line-height: 19px;
    .targetUser {
      color: var(--unnamed, #486bb2);
    }
  }
  .own-highlight {
    background: #ffe5d9;
    color: var(--2, #ff5000);
  }
  .other-highlight {
    background: #eee;
    color: var(--2, #ff5000);
  }
  .mes-box {
    margin-top: 5px;
    .targetUser {
      color: var(--unnamed, #486bb2);
    }
  }
  .message-box {
    @include mobile-padding();
    font-weight: 400;
    height: calc(var(--app-height) - 380px);
    overflow: auto;
    position: relative;
    padding-bottom: 80px;
    .head {
      line-height: 20px;
      margin-bottom: 5px;
      .name {
        color: #bbb;
        font-size: 14px;
        margin-left: 5px;
      }
      .mes-color {
        color: var(--2, #ff5000);
      }
      .mes-content {
        word-break: break-all;
      }
    }
    .own-message {
      float: right;
      text-align: right;
      margin-top: 5px;
      .head {
        display: flex;
        align-items: center;
        float: right;
        .date {
          margin-right: 5px;
        }
      }
      .message {
        max-width: 320px;
        overflow-wrap: break-word;
        text-align: left;
      }
    }
    .assistant-message {
      border-radius: 10px;
      background: #f7f7f7;
      margin-top: 10px;
      padding: 10px;
      .assistant {
        color: var(--2, #ff5000);
        font-size: 14px;
        font-weight: 600;
        margin-right: 3px;
      }
      .message {
        color: #333;
        font-weight: 400;
        margin-top: 5px;
        display: contents;
      }
    }
    .gift-message {
      height: 28px;
      padding: 0 12px;
      margin-top: 15px;
      border-radius: 24px;
      line-height: 28px;
      background: linear-gradient(
        90deg,
        rgba(135, 40, 255, 0.07) 0.17%,
        rgba(255, 0, 0, 0.07) 101.4%
      );
      margin-left: auto;
      margin-right: auto;
      display: table;
      .name {
        font-size: 12px;
        font-weight: 500;
        background: var(--1, linear-gradient(90deg, #ff9000 0.17%, #ff5000 101.4%));
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .text {
        color: #333;
        font-size: 12px;
        margin-right: 5px;
      }
      .send-out {
        margin: 0 3px;
      }
      .giftNum {
        color: var(--333, #333);
        font-family: TencentSans;
        font-weight: 700;
        font-size: 12px;
      }
    }
    .oddsEntrance {
      width: 32px;
      min-height: 32px;
      border-radius: 8px;
      border: 1px solid var(--1, #ff9000);
      background: linear-gradient(90deg, rgba(255, 144, 0, 0.1) 0.17%, rgba(255, 80, 0, 0.1) 101.4%),
        #fff;
      position: fixed;
      right: 0;
      bottom: 300px;
      font-family: TencentSans;
      font-size: 12px;
      color: #ff5000;
      text-align: center;
      font-weight: 700;
      padding-top: 4px;
    }
  }
  .message-box-493 {
    height: calc(var(--app-height) - 493px);
  }
  .message-box-380 {
    height: calc(var(--app-height) - 340px);
  }
  .bottom {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 60px;
    background: #fff;
    box-shadow: 4px 0px 8px 0px rgba(0, 0, 0, 0.1);
    padding: 8px 5px 0 12px;
    .sendIcon {
      position: absolute;
      top: 15px;
      right: 170px;
      width: 24px;
      height: 24px;
      transform: rotate(180deg);
    }
    .sendIcons {
      right: 15px;
      top: 40px;
    }
    .sendIcon-right {
      right: 75px;
    }
    .reply-text {
      height: 16px;
      margin-bottom: 10px;
      .van-icon-clear {
        margin-right: 5px;
      }
      .name {
        color: #999;
        font-size: 12px;
        font-weight: 400;
      }
      .text {
        color: #666;
        font-size: 12px;
      }
    }
    input {
      width: 200px;
      height: 36px;
      border-radius: 92px;
      background: #f6f6f8;
      padding: 0 40px 0 12px;
    }
    .inputValue {
      width: 100%;
    }
    .lengthen {
      width: 300px;
    }
    .emoticons {
      width: 24px;
      height: 24px;
      position: absolute;
      right: 200px;
      top: 15px;
    }
    .emoticonss {
      right: 42px;
      top: 40px;
    }
    .icon-box {
      max-width: 150px;
      float: right;
      text-align: center;
      @include center-content();
      img {
        width: 28px;
        height: 28px;
      }
      p {
        color: #666;
        text-align: center;
        font-size: 10px;
        font-weight: 400;
        opacity: 0.5;
      }
      .item {
        margin-right: 10px;
      }
    }
    .backToBottom {
      position: absolute;
      top: -24px;
      left: 42%;
      width: 70px;
      height: 19px;
      border-radius: 50px;
      background-color: #fff;
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.08);
      text-align: center;
      line-height: 16px;
      color: var(--2, #ff5000);
      font-size: 10px;
    }
    .mask {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 80px;
    }
  }
  .bottom-hight {
    height: 80px;
  }
}
.chatroom-300 {
  height: calc(var(--app-height) - 300px);
}
.chatroom-234 {
  height: calc(var(--app-height) - 234px);
}
</style>
