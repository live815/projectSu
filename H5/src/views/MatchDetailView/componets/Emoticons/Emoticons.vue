<template>
  <div class="emoticons-view" id="emoticons-view">
    <van-popup v-model:show="showBottom" position="bottom">
      <div style="padding: 0 8px">
        <div class="input">
          <div class="lable" v-if="!info.length">{{ $t('Mletter.mlettertip9') }}</div>
          <div v-else>
            <img
              v-for="(item, index) in info"
              :key="index"
              width="24"
              height="24"
              :src="item.imgSrc"
            />
          </div>
          <div class="input-right">
            <img class="icon" :src="keyboard" @click="callKeyboard" />
            <img class="icon" :src="sendIcon" @click="send" />
          </div>
        </div>
      </div>
      <div class="emoticons-box">
        <div class="emoji-group">
          <div class="item" :class="{ active: emoticonsType === 1 }" @click="switchs(1)">
            {{ Mletter.base }}
          </div>
          <div class="item" :class="{ active: emoticonsType === 2 }" @click="switchs(2)">
            {{ Mletter.personality }}
          </div>
          <div class="item" :class="{ active: emoticonsType === 3 }" @click="switchs(3)">
            {{ Mletter.collect }}
          </div>
          <div style="margin-left: auto">
            <img width="40" height="40" :src="backspace" @click="info.pop()" />
          </div>
        </div>
        <van-swipe class="my-swipe" indicator-color="#FF5000">
          <van-swipe-item>
            <div class="emoticons-content">
              <img
                class="item-icon"
                v-for="items in emoticons1"
                :key="items.id"
                :src="items.imgSrc"
                @click="choose(items)"
              />
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import keyboard from './img/keyboard.png'
import sendIcon from './img/send.png'
import backspace from './img/backspace.png'
import { useTencentIM } from '@/hooks/useTencentIM.js'
import eventBus from '@/utils/eventBus'
import { useUserStore } from '@/stores/user.js'

const user = useUserStore()
const { sendMessage } = useTencentIM()
const showBottom = ref(false)
const emoticonsType = ref(1)
const info = ref([])
const emit = defineEmits(['callKeyboard'])

const send = () => {
  if (info.value.length) {
    const arr = info.value.map((item) => item.id)
    const role = user.userInfo.role
    const vipLevel = user.userInfo.vipLevel
    const cloudCustomData = JSON.stringify({ role, vipLevel })
    const data = {
      type: 'customize',
      text: 'emoji1',
      description: JSON.stringify(arr),
      cloudCustomData
    }
    sendMessage(data).then((res) => {
      eventBus.emit('SendMessage', res)
      showHide()
      info.value = []
    })
  }
}

const switchs = (v) => {
  emoticonsType.value = v
}
const showHide = () => {
  showBottom.value = !showBottom.value
}
const choose = (icon) => {
  info.value.push(icon)
}

const callKeyboard = () => {
  showBottom.value = false
  emit('callKeyboard')
}

defineExpose({ showHide })
</script>

<style lang="scss" scoped>
:deep() {
  .van-swipe__indicator {
    background: #ccc;
  }
  .van-overlay {
    background: transparent;
  }
}
.emoticons-view {
  :deep() {
    .van-popup {
      height: 290px;
    }
  }
  .input {
    @include center-content();
    justify-content: space-between;
    width: 100%;
    border-radius: 92px;
    background: #f6f6f8;
    padding: 5px;
    color: #999;
    font-size: 14px;
  }
  .input-right {
    display: flex;
    .icon {
      widows: 24px;
      height: 24px;
      margin-left: 10px;
    }
  }
  .emoticons-box {
    @include mobile-padding();
    width: 100%;
    height: 245px;
    background: rgba(252, 252, 252);
    margin-top: 10px;
    .emoji-group {
      display: flex;
      .item {
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
      }
      .active {
        background: #f9f9f9;
      }
    }
    .my-swipe {
      height: 150px;
      .emoticons-content {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .item-icon {
          width: 40px;
          height: 40px;
        }
      }
    }
  }
}
</style>
