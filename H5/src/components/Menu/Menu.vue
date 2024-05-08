<template>
  <!-- 侧边设置菜单 -->
  <div>
    <div class="menu-content">
      <h2 class="content-title">{{ $t('common.quickSet') }}</h2>
      <!-- 我的消息 -->
      <div class="item message">
        <van-cell is-link @click="toMessage">
          <template #title>
            <div class="left-cell">
              <img src="@/assets/img/message.png" alt="load fail" />
              <span class="custom-title">{{ $t('common.Message') }}</span>
              <span class="message-total" v-show="unreadNum">{{ unreadNum }}</span>
            </div>
          </template>
        </van-cell>
      </div>
      <div class="item">
        <h4>{{ $t('common.hadSet') }}</h4>
        <van-radio-group
          v-model="fbStore.settings.oddsFormat"
          direction="horizontal"
          class="bet-group"
        >
          <van-radio :name="1">
            {{ $t('common.Decimal') }}
            <template #icon="props">
              <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" />
            </template>
          </van-radio>
          <van-radio :name="2">
            {{ $t('common.HongKong') }}
            <template #icon="props">
              <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" />
            </template>
          </van-radio>
        </van-radio-group>
      </div>
      <div class="item">
        <h4>{{ $t('common.betSet') }}</h4>
        <van-radio-group v-model="fbStore.settings.oddsChange" class="bet-group mb-15">
          <van-radio :name="1">
            {{ $t('common.acceptBetter') }}
            <template #icon="props">
              <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" />
            </template>
          </van-radio>
          <van-radio :name="2">
            {{ $t('common.acceptAny') }}
            <template #icon="props">
              <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" />
            </template> </van-radio
          ><van-radio :name="0">
            {{ $t('common.dontAcceptAny') }}
            <template #icon="props">
              <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" />
            </template>
          </van-radio>
        </van-radio-group>
      </div>
      <div class="item" v-if="IS_DEV">
        <h4>{{ $t('common.language') }}</h4>
        <LangSelect />
      </div>
    </div>
    <div class="pop-bottom">
      <span class="title">
        <img :src="logo" :class="{ 'logo-vi': appStore.language === 'vi' }" />
      </span>
      <div>
        <span class="title" @click="selectLiveChat">{{ $t('common.service') }}</span>
        <IcoArrowRight class="svg-icon" /> 
      </div>
    </div>
  </div>
  <LiveChat ref="liveChat" />
</template>

<script setup>
import { IS_DEV } from '@/utils/config'
const activeIcon = ref(new URL('@/assets/img/checked.png', import.meta.url).href)
const inactiveIcon = ref(new URL('@/assets/img/unchecked.png', import.meta.url).href)
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useFBStore } from '@/stores/fb'
import { useAnnouncementStore } from '@/stores/announcement'
import { useAppStore } from '@/stores/app'
import LiveChat from '@/components/LiveChat/LiveChat.vue'
const liveChat = ref(null)
const appStore = useAppStore()
const announcement = useAnnouncementStore()
const fbStore = useFBStore()
const router = useRouter()
watchEffect(() => {
  fbStore.setSettings(fbStore.settings)
})
const emits = defineEmits(['closeMenu'])
// 未读
const unreadNum = computed(() => announcement.unreadLetter)
const toMessage = () => {
  emits('closeMenu')
  router.push({
    name: 'message',
    query: {
      type: 3
    }
  })
}
const logo = computed(
  () => new URL(`../../assets/img/${appStore.language}/logoVIP.png`, import.meta.url).href
)
const selectLiveChat = () => {
  liveChat.value.open()
}
</script>

<style lang="stylus" scoped>
.menu-content {
  padding: 15px;

  .content-title {
    color: #111;
    font-weight: 600;
    font-size: 25px;
  }

  .van-icon-close {
    position: absolute;
    right: 20px;
    top: 20px;
  }

  h2 {
    margin-bottom: 20px;
  }

  .item {
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
    margin-bottom: 15px;

    h4 {
      font-weight: 600;
      margin-bottom: 10px;
      color: #111;
      font-size: 14px;
      line-height: 16px;
    }

    &:last-child {
      padding-bottom: 0;
      border-bottom: 0;
    }

    &.message {
      .van-cell {
        padding: 0;
      }

      .left-cell {
        display: flex;
        align-items: center;

        span {
          margin-left: 5px;
        }

        img {
          width: 18px;
        }

        .message-total {
          position: absolute;
          right: 20px;
          width: 16px;
          height: 16px;
          line-height: 16px;
          background: #F53F3F;
          border-radius: 50%;
          text-align: center;
          color: #fff;
          font-size: 9px;
        }
      }
    }

    .van-radio {
      margin-bottom: 5px;
    }
  }

  .bet-setting {
    display: flex;
    padding: top 12px;
    padding-bottom: 15px;

    .sport {
      color: #111;
      font-size: 14px;
      width: 74px;
      height: 30px;
      border-radius: 6px;
      border: 1px solid #EEE;
      background: #F5F5F5;
      text-align: center;
      line-height: 30px;
      font-weight: 400;
      margin-right: 10px;
    }

    .activebtn {
      border: 1px solid #FF5000;
      background: #FFF5F0;
      color: #FF5000;
    }
  }

  .bet-group {
    img {
      width: 18px;
    }

    ::v-deep() .van-radio__label {
      color: #666;
    }

    ::v-deep() [aria-checked='true'] {
      .van-radio__label {
        color: #111;
      }
    }
  }

  .language {
    img {
      width: 18px;
    }

    ::v-deep() .van-radio__label {
      color: #111;
      font-size: 14px;
      font-weight: 400;
    }
  }

  .mb-15 {
    .van-radio {
      margin-bottom: 15px;
    }
  }
}

.pop-bottom {
  width: 100%;
  padding: 0 23px 21px 18px;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .title {
    color: #111;

    img {
      width: 60px;
      height: 28px;
      margin-bottom: 3px;
    }

    .logo-vi {
      width: 100px;
    }
  }

  .svg-icon {
    width: 10px;
    height: 10px;
    margin-left: 4px;
  }
}
</style>
