<!-- 充值教程滑动tab栏组件 -->

<template>
  <div class="slideTab">
    <div class="swiperBox">
      <swiperLeft
        class="leftBtn"
        @click="prevGroup"
        :class="{ disabled: isBeginning }"
        v-if="iconShow"
      />
      <div class="swiper-item" :class="{ margin: iconShow }">
        <div class="swiper-wrapper">
          <div
            v-for="(item, index) in dataList"
            :key="item.id"
            class="tab-box swiper-slide"
            @click="slideClicked(index, item)"
            :class="{ 'swiper-slideActive': index == activeIndex }"
          >
            {{ item.tabName }}
          </div>
        </div>
      </div>
      <swiperLeft
        class="rightBtn"
        @click="nextGroup"
        :class="{ disabled: isEnd }"
        v-if="iconShow"
      />
    </div>
    <div class="main-content" v-html="helpData" v-if="tabShow"></div>
  </div>
</template>

<script setup>
import swiperLeft from '@/components/icons/swiperLeft.vue'
import Swiper from 'swiper'
import 'swiper/swiper-bundle.css'
import { getTutoriaSublListApi, getTutorialDetailApi } from '@/api/announcement.js'
import { useAppStore } from '@/stores/app'
import { Base64 } from 'js-base64'

const helpData = ref({})
const appStore = useAppStore()
const isEnd = ref(false) //判断是不是结束
const isBeginning = ref(true) //判断是不是开始
const props = defineProps({ tuId: { type: String, default: '' } })
const tabShow = ref(false)
const dataList = ref([])
const activeIndex = ref(0) // 用于跟踪当前激活的 Slide 索引
let myitemSwiper = null // 保存 Swiper 实例的引用
const tabId = ref('')
const iconShow = ref(true)

// 点击上一组按钮
const prevGroup = () => {
  if (!isBeginning.value) {
    myitemSwiper.slidePrev()
    isBeginning.value = myitemSwiper.isBeginning
    isEnd.value = myitemSwiper.isEnd
  }
}
// 点击下一组按钮
const nextGroup = () => {
  // 自定义逻辑，这里只是示例，你可以根据需要修改
  if (!isEnd.value) {
    myitemSwiper.slideNext()
    isBeginning.value = myitemSwiper.isBeginning
    isEnd.value = myitemSwiper.isEnd
  }
}
//监听滑动
const handleSlideChange = (objSwiper) => {
  activeIndex.value = objSwiper.activeIndex
  // 处理滑动事件
  isBeginning.value = objSwiper.isBeginning
  isEnd.value = objSwiper.isEnd
  // console.log('Slide 已切换',objSwiper);
}
//点击切换
const slideClicked = (index, item) => {
  activeIndex.value = index
  tabId.value = item.id
}

watch(
  () => tabId.value,
  () => {
    if (tabId.value !== '') {
      tabShow.value = false
      // 获取内容
      getTutorialDetailApi({ id: tabId.value }).then((res) => {
        tabShow.value = true
        helpData.value = Base64.decode(res.data?.tabContent || '')
        setTimeout(() => document.querySelectorAll('video').forEach((v) => v.load()), 1)
      })
    }
  },
  { immediate: true }
)

watch(
  () => props.tuId,
  () => {
    tabShow.value = false
    prevGroup()
    getTutoriaSublListApi({ tuId: props.tuId }).then((res) => {
      // 获取dataList
      dataList.value = res.data
      tabId.value = dataList.value[0].id
      tabShow.value = true
      // 判断站点
      if (appStore.language == 'vi') {
        iconShow.value = dataList.value.length > 2
      } else if (appStore.language == 'zh-cn') {
        iconShow.value = dataList.value.length > 6
      }

      // 初始化 Swiper
      myitemSwiper = new Swiper('.swiper-item', {
        slidesPerView: 'auto', // 设置每个 Slide 自动适应容器宽度
        virtual: {
          slides: dataList.value // 设置虚拟 Slide 数据
        },
        slidesPerGroup: 2, //几个为一组
        spaceBetween: '0', //边距20px
        grabCursor: true //光标显示手指滑动
      })

      // 添加滑动事件监听器
      myitemSwiper.on('slideChange', handleSlideChange)

      activeIndex.value = 0
    })
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
:deep() {
  .swiper-slide {
    width: auto;
  }
}
.slideTab {
  width: 100%;

  .disabled {
    opacity: 0.5;
    cursor: no-drop;
  }
  .swiper-slideActive {
    background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
    color: #ffffff;
  }

  .swiperBox {
    width: 100%;
    height: 42px;
    display: flex;
    align-items: center;
    position: relative;
    margin-bottom: 20px;
    .leftBtn {
      position: absolute;
      left: 0;
      width: 30px;
      height: 40px;
      display: flex;
      align-items: center;
    }
    .margin {
      margin: 0 32px;
    }
    .swiper-item {
      width: 93%;
      // width:100%;
      position: absolute;
      overflow: hidden;
      display: flex;
      height: 40px;
      color: var(--60, rgba(255, 255, 255, 0.6));
      font-size: 16px;
      .swiper-wrapper {
        .tab-box {
          height: 40px;
          text-align: center;
          padding: 10px 12px;
          border-right: 1px solid #52556a;
          border-top: 1px solid #52556a;
          border-bottom: 1px solid #52556a;
          white-space: nowrap;
          cursor: pointer;
        }
        .tab-box-vi {
          width: 380px;
        }
        div:last-child {
          border-radius: 0px 6px 6px 0px;
        }
        div:first-child {
          border-left: 1px solid #52556a;
          border-radius: 6px 0px 0px 6px;
        }
      }
    }
    .rightBtn {
      position: absolute;
      right: 0;
      width: 30px;
      height: 40px;
      display: flex;
      align-items: center;
      cursor: pointer;
      transform: rotate(180deg);
    }
  }
}
.main-content {
  width: 100%;
  padding: 15px;
  white-space: pre-wrap;
  color: #ffffff;
}
.main-content :deep() {
  img {
    width: 45%;
    max-width: 70%;
    display: block;
    margin: 0 auto;
  }
  video {
    width: 80px;
    height: auto;
  }
  p {
    margin-bottom: 12px;
  }
}
</style>
