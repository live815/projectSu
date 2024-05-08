<template>
  <div class="container">
    <div
      class="background-image"
      :style="{
        backgroundImage: `url(${imgBgPath(slidesStore.getActiveSlideIndex)})`,
        animation: 'fade 0.3s'
      }"
      :key="slidesStore.getActiveSlideIndex"
    >
      <div class="placeholder" v-show="loading"></div>
    </div>

    <div class="container-radius">
      <transition name="rotate">
        <img :src="bground" alt="" :style="{ transform: `rotate(${rotationAngle}deg)` }" />
      </transition>
    </div>
    <div class="container-dot">
      <img :src="dot" alt="" />
    </div>
    <div class="container-head">
      <template v-if="user.userInfo.avatar && avatarList[user.userInfo.avatar]">
        <img class="head-img" :src="avatarList[user.userInfo.avatar].img" />
      </template>
      <template v-else>
        <img class="head-img" :src="avatarList[0].img" />
      </template>
      <div class="head-name">{{ user.userInfo.userName }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useSlidesStore } from '@/stores/vipSlides'
import { useUserStore } from '@/stores/user'
import bground from './img/bground.png'
import dot from './img/dot.png'

const user = useUserStore()
const slidesStore = useSlidesStore()

const loading = ref(true) // 初始加载状态

// 头像地址
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

// 引入静态背景图
const imgBgPath = (index) => {
  return new URL(`./img/vip${index}.png`, import.meta.url).href
}

// 监听图片加载完成事件
const handleImageLoad = () => {
  loading.value = false // 图片加载完成后，更新加载状态
}
const preloadedImages = ref([])

onMounted(() => {
  // 解决背景图切换过快有白屏
  for (let i = 1; i <= 11; i++) {
    const img = new Image()
    img.src = imgBgPath(i)
    img.onload = handleImageLoad
    preloadedImages.value.push(img)
  }
})
// 通过计算属性计算旋转角度
const rotationAngle = computed(() => {
  // 根据您的业务逻辑计算旋转角度
  const activeSlideIndex = slidesStore.getActiveSlideIndex
  let angle = 0
  // 在这里添加根据索引计算旋转角度的逻辑
  switch (activeSlideIndex) {
    case 1:
      return (angle = -17)
    case 2:
      return (angle = -33)
    case 3:
      return (angle = -49.5)
    case 4:
      return (angle = -66)
    case 5:
      return (angle = -82)
    case 6:
      return (angle = -98.5)
    case 7:
      return (angle = -115)
    case 8:
      return (angle = -131.5)
    case 9:
      return (angle = -147.5)
    case 10:
      return (angle = -164)
    case 11:
      return (angle = -180.5)
  }
  // 其他情况下可以设置不旋转（0度）
  return angle
})
</script>

<style scoped lang="scss">
.container {
  position: relative;
  width: 375px;
  height: 245px;
  overflow: hidden;
  .background-image {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    transition: background-image 0.3s, opacity 0.3s;
    position: absolute;
    top: 0;
    left: 0;
    transition: opacity 0.3s; /* 添加透明度过渡 */
    .placeholder {
      /* 占位图或者背景颜色样式 */
      width: 100%;
      height: 100%;
      background-color: #19191b; /* 使用背景颜色作为占位图 */
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s; /* 过渡的持续时间 */
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0; /* 进入/离开时的起始和结束状态 */
  }

  .fade-appear {
    opacity: 0; /* 初始渲染时的起始状态 */
  }
  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .container-radius {
    position: absolute;
    top: 12%;
    left: -106px;
    width: 600px;
    height: 600px;
    // background-image: url('./img/bground.png'); /* 背景图像的URL */
    // background-size: cover;
    // background-position: center;
    // background-repeat: no-repeat;

    overflow: hidden; /* 隐藏超出的部分 */
    img {
      width: 600px;
      height: 600px;
    }
  }
  .container-dot {
    position: absolute;
    top: 54px;
    left: 187px;
    width: 12px;
    height: 12px;
    z-index: 1;
    img {
      width: 100%;
      height: 100%;
    }
    .rotate-enter-active,
    .rotate-leave-active {
      transition: transform 0.3s; /* 过渡的持续时间 */
    }

    .rotate-enter,
    .rotate-leave-to {
      transform: rotate(0); /* 进入/离开时的起始和结束状态 */
    }
  }
  .container-head {
    position: absolute;
    top: 85px;
    left: 165px;
    text-align: center;
    .head-img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 1px solid #ccc;
      margin-bottom: 6px;
    }
    .head-name {
      color: #fff;
      font-size: 12px;
    }
  }
}
</style>
