<template>
  <!-- 充值姓名弹窗 -->
  <div style="width: 375px; height: 338px">
    <CPopup ref="cPopupDom" height="50%" position="bottom">
      <div class="heads-top">
        <div class="heads-top-left" @click="onClickCancel">{{ $t('Pletter.cancel') }}</div>
        <div class="heads-top-min">{{ $t('Pletter.Plettertip17') }}</div>
        <div class="heads-top-right" @click="onClickConfirm">{{ $t('Pletter.sure') }}</div>
      </div>
      <div class="heads-imgBox">
        <div
          class="heads-imgBox-item"
          v-for="(item, index) in avatarList"
          :class="{ active: activeIcon === index }"
          :key="item.id"
          @click="onClickActive(item, index)"
        >
          <img :src="item.img" />
          <img class="activeIcon-imgs" v-if="activeIcon == index" :src="activeIcons" />
        </div>
      </div>
    </CPopup>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import CPopup from '@/components/CPopup/Cpopup'
import activeIcons from '../img/avatarIcon.png'
import { useUserStore } from '@/stores/user.js'
import { getUpdateAvatar } from '@/api/bindInfo'
import { showLoadingToast, closeToast } from 'vant'
import i18n from '@/i18n'
const user = useUserStore()

const cPopupDom = ref(null)
// ref子组件声明的方法打开弹窗
const showhide = () => {
  cPopupDom.value.showhide()
}

defineExpose({ showhide })

// 头像信息
const avatarList = reactive([
  {
    id: 1,
    img: new URL('@/assets/img/headImg/avatar0.png', import.meta.url).href
  },
  {
    id: 2,
    img: new URL('@/assets/img/headImg/avatar1.png', import.meta.url).href
  },
  {
    id: 3,
    img: new URL('@/assets/img/headImg/avatar2.png', import.meta.url).href
  },
  {
    id: 4,
    img: new URL('@/assets/img/headImg/avatar3.png', import.meta.url).href
  },
  {
    id: 5,
    img: new URL('@/assets/img/headImg/avatar4.png', import.meta.url).href
  },
  {
    id: 6,
    img: new URL('@/assets/img/headImg/avatar5.png', import.meta.url).href
  },
  {
    id: 7,
    img: new URL('@/assets/img/headImg/avatar6.png', import.meta.url).href
  },
  {
    id: 8,
    img: new URL('@/assets/img/headImg/avatar7.png', import.meta.url).href
  },
  {
    id: 9,
    img: new URL('@/assets/img/headImg/avatar8.png', import.meta.url).href
  },
  {
    id: 10,
    img: new URL('@/assets/img/headImg/avatar9.png', import.meta.url).href
  }
])

// 默认第一张图片
const activeIcon = ref(0)
const activeImg = ref('')

onMounted(() => {
  if (user.userInfo?.avatar) {
    // 判断是否有图片，有让当前高亮定位到图片位置
    activeIcon.value = user.userInfo.avatar
  }
})
// 选择头像
const onClickActive = (item, index) => {
  activeIcon.value = index
  activeImg.value = item.id
}

// 确定按钮
const onClickConfirm = () => {
  showLoadingToast({
    message: i18n.global.t('common.loading'),
    forbidClick: true,
    duration: 0
  })
  const params = {
    avatar: activeIcon.value
  }
  getUpdateAvatar(params)
    .then(() => {
      user.getUserInfoAction()
      closeToast()
    })
    .catch(() => {
      closeToast()
    })
  cPopupDom.value.showhide()
}
// 取消按钮
const onClickCancel = () => {
  cPopupDom.value.showhide()
}
</script>
<style lang="scss" scoped>
:deep().van-popup {
  width: 100%;
  height: 100%;
}
.heads-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 375px;
  height: 58px;
  font-size: 14px;
  font-weight: 400;
  .heads-top-left {
    margin-left: 16px;
    color: var(--text-icon-font-gy-260, rgba(0, 0, 0, 0.6));
  }
  .heads-top-min {
    color: var(--text-icon-font-gy-190, rgba(0, 0, 0, 0.9));
    font-size: 18px;
    font-weight: 600;
  }
  .heads-top-right {
    margin-right: 16px;
    color: var(--2, #ff5000);
  }
}
.heads-imgBox {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  padding: 0 8px;
  .heads-imgBox-item {
    position: relative;
    width: 66px;
    height: 66px;
    margin: 11.75px;
    border-radius: 50%;
    img {
      width: 100%;
      height: 100%;
    }
    .activeIcon-imgs {
      position: absolute;
      left: 0;
      top: 0;
    }
  }
}
</style>
