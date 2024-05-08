<template>
  <div
    draggable="true"
    @mousedown="startDrag"
    :style="`top:${elTop}px;left:${elLeft}px`"
    :class="applyTransition ? 'drag-ball back-to-right' : 'drag-ball'"
  >
    <!-- class="drag-ball"  -->
    <div class="closeIcon" @mousedown.stop="handleClose"><img src="../img/closeIcon.png" /></div>
    <el-carousel
      indicator-position="none"
      height="100px"
      arrow="never"
      @change="changeSwip"
      ref="swip"
    >
      <el-carousel-item v-for="item in imgData" :key="item.id">
        <img :src="getImgUrl(item.webUrl)" alt="" @click="toActive(item)" />
      </el-carousel-item>
    </el-carousel>
    <div class="list-bar">
      <div
        :class="activeImg == index ? 'bar active' : 'bar'"
        v-for="(item, index) in imgData"
        :key="index"
        @click="changeImgIndex(index)"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { jumpActivity } from '@/utils/jumpActivity'
import { getImgUrl } from '@/utils'
import { useRouter } from 'vue-router'
const router = useRouter()
// 跳转页面
const toActive = (event) => {
  jumpActivity({ event, router })
}
// 接收数据
defineProps({
  imgData: {
    type: Array
  }
})
const emit = defineEmits(['closeDragAds'])
const swip = ref(null)
// 悬浮框初始坐标定位
const elTop = ref(window.innerHeight - 180)
const elLeft = ref(window.innerWidth - 180)

// 拖拽逻辑
let isDragging = false
const applyTransition = ref(false)
const startDrag = (e) => {
  event.preventDefault()
  applyTransition.value = false
  const initialX = e.clientX - elLeft.value
  const initialY = e.clientY - elTop.value
  const handleMouseMove = (e) => {
    elTop.value = e.clientY - initialY
    elLeft.value = e.clientX - initialX
    isDragging = true
  }
  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
    if (!isDragging) {
      // 单击悬浮窗时执行的函数
      console.log('跳转')
    }
    applyTransition.value = true
    elLeft.value = window.innerWidth - 180
    isDragging = false
  }
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}
// 轮播图切换时修改指示器
const activeImg = ref(0)
const changeSwip = (index) => {
  activeImg.value = index
}

// 点击指示器切换轮播图
const changeImgIndex = (index) => {
  swip.value.setActiveItem(index)
}
// 关闭悬浮窗
const handleClose = (e) => {
  e.stopPropagation()
  emit('closeDragAds')
}
</script>
<style scoped lang="scss">
.back-to-right {
  transition: left 0.5s ease-in-out;
}

.drag-ball {
  z-index: 1000;
  cursor: pointer;
  position: fixed;
  width: 100px;
  box-shadow: 0 6px 16px -8px rgb(0 0 0 / 8%), 0px 9px 28px 0px rgb(0 0 0 / 5%),
    0 12px 48px 16px rgb(0 0 0 / 3%);
  color: #fff;
}

img {
  width: 100%;
  height: 100%;
}

.closeIcon {
  position: absolute;
  right: -10px;
  top: -17px;
  z-index: 2000;
}

.list-bar {
  margin-top: 4px;
  display: flex;
  justify-content: center;
  gap: 3px;
  height: 3px;

  .bar {
    flex: 1;
    max-width: 7px;
    border-radius: 10px;
    background-color: rgb(57, 52, 75);
  }

  .bar.active {
    background-color: rgb(243, 95, 27);
  }
}
</style>
