<template>
  <div class="content-container">
    <div class="sub-type" v-if="letType == 3">
      <div
        :class="messageSubType == index ? 'sub-type-btn active' : 'sub-type-btn'"
        v-for="(item, index) in annTypeList"
        :key="index"
        @click="changeSubType(index)"
      >
        {{ item }}
      </div>
    </div>
    <div class="sub-type" v-if="letType == 2">
      <div
        :class="messageSubType == index ? 'sub-type-btn active' : 'sub-type-btn'"
        v-for="(item, index) in sportTypeList"
        :key="index"
        @click="changeSubType(index)"
      >
        <div class="unread-dot" v-if="eventUnreadSub[index]">{{ eventUnreadSub[index] }}</div>
        {{ item }}
      </div>
    </div>

    <div class="empty-box" v-if="!isHaveData">
      <img src="../img/empty-icon.png" />
      <p>{{ $t('Mletter.nonewmessage') }}</p>
    </div>

    <div class="message-box-container" v-else>
      <div
        class="content-row"
        :style="`transform: translateX(${translateX});`"
        v-for="(item, index) in letterListFilter"
        :key="index"
      >
        <MessageSubBox :item="item" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { deleLetterApi } from '@/api/announcement.js'
import eventBus from '@/utils/eventBus'
import { useAnnouncementStore } from '@/stores/announcement'
import MessageSubBox from './MessageSubBox.vue'
import i18n from '@/i18n'
const announcement = useAnnouncementStore()

const props = defineProps({
  letType: {
    type: [Number, String],
    default: 1
  },
  translateX: {
    type: String,
    default: '25px'
  },
  letterListData: {
    type: Array
  },
  eventUnreadSub: {
    type: Array
  }
})

// 切换子类型
const messageSubType = ref(inject('messageSubType'))
const changeSubType = (idx) => {
  messageSubType.value = idx
}
// 判断是否有数据
const isHaveData = computed(() => {
  if (letterListFilter.value && letterListFilter.value.length > 0) {
    return true
  } else {
    return false
  }
})

// 过滤显示内容
const letterListFilter = computed(() => {
  // 公告
  if (props.letterListData) {
    if (props.letType == 3) {
      if (messageSubType.value == 0) {
        return announcement.normalAnn
      } else {
        return announcement.deposAnn
      }
    }
    // 赛事
    if (props.letType == 2) {
      let temp = null
      temp = props.letterListData.filter((item) => {
        return item.gameType == messageSubType.value && item.gameType != ''
      })
      return temp.sort((a, b) => {
        if (a.status === '0' && b.status === '1') {
          return -1
        }

        if (a.status === '1' && b.status === '0') {
          return 1
        }

        return 0
      })
    }
    // 通知和活动
    return props.letterListData.sort((a, b) => {
      if (a.status === '0' && b.status === '1') {
        return -1
      }

      if (a.status === '1' && b.status === '0') {
        return 1
      }

      return 0
    })
  } else {
    return []
  }
})
const annTypeList = ref([
  i18n.global.t('Mletter.generalannounce'),
  i18n.global.t('Mletter.mlettertip26')
])
const sportTypeList = ref([
  i18n.global.t('Mletter.csports'),
  i18n.global.t('Mletter.fbsports'),
  i18n.global.t('Mletter.DBsports')
])

// 删除所有已读
eventBus.on('toDeleAllRead', () => {
  deleAllRead()
})
const n = ref(0)
const deleAllRead = async () => {
  await letterListFilter.value.forEach((item) => {
    if (item.status == 1) {
      deleLetterApi({ id: item.id })
    }
  })
  n.value++
  console.log('删除所有', n.value)
}
onUnmounted(() => {
  eventBus.off('toDeleAllRead')
})
</script>

<style lang="scss" scoped>
.sub-type {
  display: flex;
  gap: 24px;
  height: 28px;
  width: 100%;
  padding-left: 10px;
  .sub-type-btn {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 70px;
    height: 28px;
    border-radius: 60px;
    background: #fff5f0;
    background-color: rgb(238, 238, 238);
    color: rgb(0, 0, 0);

    font-size: 12px;
    font-weight: 400;
    .unread-dot {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      top: -4px;
      right: -1px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: #f53f3f;
      color: #fff;

      font-size: 9px;
      font-weight: 400;
    }
  }
  .sub-type-btn.active {
    border: 0.5px solid #ff5000;
    color: #ff5000;
    background: #fff5f0;
  }
}
.message-box-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.content-container {
  position: relative;
}

.content-row {
  gap: 10px;
  display: flex;
  position: relative;
}
.massage-container::after {
  content: '';
  position: absolute;
  width: 4px;
  height: 18px;
  top: 11px;
  left: 0;
  border-radius: 0px 60px 60px 0px;
  background: #ff5000;
}

.important-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  width: 36px;
  height: 20px;
  padding: 4px;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  background: var(--1, linear-gradient(90deg, #ff9000 0.17%, #ff5000 101.4%));
  color: #fff;
  font-size: 12px;
}
.important-icon::after {
  content: '';
  position: absolute;
  left: -5px;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 6px solid #ff9000;
  transform: rotate(-90deg);
}
.dele-box {
  display: inline-block;
  width: 40px;
  height: 159px;
  border-radius: 10px;
  background: #eee;
  justify-content: center;
  align-items: center;
  .dele-inter {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.content-row {
  transition: transform 0.5s;
}
.readmsg {
  opacity: 0.7;
}
.empty-box {
  width: 100vw; /* 让它充满整个父容器宽度 */
  height: 100vh; /* 让它充满整个父容器高度 */
  text-align: center; /* 水平居中 */
  color: #999;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  top: 20%;
  margin-left: -25px;
  img {
    width: 200px;
    height: 125px;
  }
}
</style>
