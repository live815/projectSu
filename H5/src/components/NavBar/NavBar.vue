<template>
  <div :class="{ 'fixed-wrapper': fixed }">
    <div class="custom-nav-bar" :class="{ border, fixed }" :style="{ backgroundColor: background }">
      <div @click="onClickLeft" class="left">
        <IconArrowLeft v-if="showBackIcon" />
        <slot v-else name="backIcon" />
        <slot name="left" />
      </div>
      <h2
        v-if="title"
        :class="[`title-${titleAlign} title`, ellipsis]"
        :style="{ color: titleColor }"
      >
        {{ title }}
      </h2>
      <div style="position: relative" v-else><slot /></div>
      <div class="right">
        <img
          v-if="isShowRight"
          @click="selectLiveChat"
          src="@/assets/img/icon-service.png"
          alt=""
        />
        <slot v-else name="right" />
      </div>
    </div>
    <LiveChat ref="liveChat" />
  </div>
</template>

<script setup>
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue'
import { useRouter } from 'vue-router'
import i18n from '@/i18n'
import LiveChat from '@/components/LiveChat/LiveChat.vue'

const liveChat = ref(null)
const router = useRouter()
const emit = defineEmits(['onClickLeft'])
const props = defineProps({
  title: {
    type: String,
    defualt: i18n.global.t('common.title')
  },
  isShowLeft: {
    type: Boolean,
    default: true
  },
  isShowRight: {
    type: Boolean,
    default: true
  },
  isBack: {
    type: Boolean,
    default: true
  },
  border: {
    type: Boolean,
    default: false
  },
  fixed: {
    type: Boolean,
    default: true
  },
  titleAlign: {
    type: String,
    default: 'center'
  },
  background: {
    type: String,
    default: '#fff'
  },
  titleColor: {
    type: String,
    default: '#333'
  },
  showBackIcon: {
    type: Boolean,
    default: true
  },
  ellipsis: {
    type: String,
    default: 'van-ellipsis'
  }
})

const onClickLeft = () => {
  if (props.isBack) {
    router.back()
  } else {
    emit('onClickLeft')
  }
}
const selectLiveChat = () => {
  liveChat.value.open()
}
</script>

<style lang="scss" scoped>
$navbarHeight: 44px;
.fixed-wrapper {
  padding-bottom: $navbarHeight;
}
.custom-nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: $navbarHeight;
  background: #fff;
  position: relative;
  &.fixed {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
  }
  &.border {
    border-bottom: 1px solid #f5f5f5;
  }
  .left {
    display: flex;
    align-items: center;
    @include mobile-padding();
    svg {
      font-size: 100px;
      transform: scale(1);
    }
  }
  h2 {
    font-size: 16px;
    color: #333;
    position: absolute;
    left: 50%;
    width: 80%;
    transform: translate3d(-50%, 0, 0);
    text-align: center;
    &.title-left {
      text-align: left;
    }
  }
  .right {
    @include mobile-padding();
    img {
      width: 30px;
    }
  }
  .van-ellipsis {
    //max-width: 160px;
    width: auto;
    line-height: 44px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.custom-font {
  color: #1f2022;
  font-size: 16px;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  &:first-child {
    border-bottom: 1px solid #eee;
  }
}
</style>
