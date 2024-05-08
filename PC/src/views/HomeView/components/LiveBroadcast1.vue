<template>
  <div class="swiperBox">
    <div class="leftBtn" @click="prevGroup">
      <swiperLeft :class="{ disabled: isBeginning }" />
    </div>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <!-- 这里可以根据需要添加虚拟 Slide 的内容 -->
        <div
          v-for="(item, index) in liveStore.dataList"
          :key="index"
          @click="slideClicked(index, item)"
          :class="{ 'swiper-slideActive': item.id == activeIndex, 'swiper-slide': true }"
        >
          <div class="match-item">
            <div class="matcTop">
              <div class="topLeft">
                <div class="t1">{{ getType(item.frontCoverTag,item.roomStyle) }}</div>
                <div class="t2" v-if="item.roomStyle == 1 || item.roomStyle == 3">
                  {{ item.associatedLeague }}
                </div>
                <div class="t2" v-else></div>
              </div>
              <div class="topRight">
                <playIcon v-if="item.status == 2" style="margin-right: 5px" />
                <!-- 下半场 51:03 -->
                <!-- <span class="t3" v-if="(item.roomStyle==1||item.roomStyle==2) && item.status==2">时间</span> -->
                <span class="t3" v-if="item.status == 2"
                  ><PlayTime :matchStartTime="item.startTimestamp"
                /></span>
                <span class="t3" v-if="item.status == 1">{{
                  formatTime(item.startTimestamp)
                }}</span>
              </div>
            </div>
            <div class="matcMain">
              <!-- 足球 篮球 展示 -->
              <div class="mainLeft" v-if="item.roomStyle == 1 || item.roomStyle == 3">
                <div class="leftDiv">
                  <div class="mainLeft_score" v-if="item.status == 2">
                    {{ liveScore(item.gameId, 0) }}
                  </div>
                  <img :src="getIntercept(item.icons, 0)" />
                  <div class="mainLeft_title">{{ item.mainName }}</div>
                </div>
                <div class="leftDiv">
                  <div class="mainLeft_score" v-if="item.status == 2">
                    {{ liveScore(item.gameId, 1) }}
                  </div>
                  <img :src="getIntercept(item.icons, 1)" />
                  <div class="mainLeft_title">{{ item.cusName }}</div>
                </div>
              </div>
              <!-- 其他 娱乐 -->
              <div class="mainLeft" v-else>
                <div class="leftDiv">
                  <!-- <img src="../../../assets/img/competitionLogo1.png"> -->
                  <div class="mainLeft_title">{{ item.roomTitle }}</div>
                </div>
              </div>
              <!-- 头像 名称 -->
              <div class="mainRight">
                <div class="anchorImg">
                  <img
                    class="fcImg"
                    v-if="item.presenterAvatar"
                    :src="getImgUrl(item.presenterAvatar)"
                  />
                  <img v-else src="../../../assets/img/anchorImg.png" />
                </div>
                <div class="anchorName">{{ item.presenterName }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="rightBtn" @click="nextGroup">
      <swiperLeft :class="{ disabled: isEnd }" style="transform: rotate(180deg)" />
    </div>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import { ref, onMounted } from 'vue'
import Swiper from 'swiper'
import { getImgUrl, getIntercept, formatTime, liveScore } from '@/utils/cache'
import 'swiper/swiper-bundle.css'
import swiperLeft from '@/components/icons/swiperLeft.vue'
import playIcon from '@/components/icons/playIcon.vue'
import PlayTime from '@/components/PlayTime/PlayTime.vue'
import { useLiveStore } from '@/stores/liveBroadcast'
const liveStore = useLiveStore()
const virtualSlides = ref([]) // 用于存储虚拟 Slide 的数据
const emit = defineEmits(['activeClick'])
let mySwiper = null // 保存 Swiper 实例的引用
const isBeginning = ref(true) //判断是不是开始
const isEnd = ref(false) //判断是不是结束
const activeIndex = ref(0) // 用于跟踪当前激活的 Slide 索引
// 在组件加载后初始化 Swiper
onMounted(() => {
  // 初始化 Swiper
  mySwiper = new Swiper('.swiper-container', {
    slidesPerView: 'auto', // 设置每个 Slide 自动适应容器宽度
    virtual: {
      slides: virtualSlides.value // 设置虚拟 Slide 数据
    },
    slidesPerGroup: 3, //几个为一组
    spaceBetween: '20', //边距20px
    grabCursor: true //光标显示手指滑动
  })
  // 添加虚拟 Slide 的数据，可以根据需要修改
  // virtualSlides.value =props.tableData
  // 添加滑动事件监听器
  mySwiper.on('slideChange', handleSlideChange)
  if (liveStore.dataList && liveStore.dataList.length) {
    activeIndex.value = liveStore.dataList[0].id
  }
})

// 点击下一组按钮
const nextGroup = () => {
  // 自定义逻辑，这里只是示例，你可以根据需要修改
  if (!isEnd.value) {
    mySwiper.slideNext()
    isBeginning.value = mySwiper.isBeginning
    isEnd.value = mySwiper.isEnd
    // activeIndex.value = mySwiper.activeIndex
    // console.log('nextGroup',mySwiper)
  }
}

// 点击上一组按钮
const prevGroup = () => {
  if (!isBeginning.value) {
    mySwiper.slidePrev()
    isBeginning.value = mySwiper.isBeginning
    isEnd.value = mySwiper.isEnd
    // activeIndex.value = mySwiper.activeIndex
    // console.log('prevGroup')
  }
}
//点击切换
const slideClicked = (index, item) => {
  activeIndex.value = item.id
  emit('activeClick', item)
  // console.log(mySwiper.clickedIndex,'mySwiper',index)
}
//监听滑动
const handleSlideChange = (objSwiper) => {
  // activeIndex.value = objSwiper.activeIndex
  // 处理滑动事件
  isBeginning.value = objSwiper.isBeginning
  isEnd.value = objSwiper.isEnd
  // console.log('Slide 已切换',objSwiper);
}
const getType = (tagId,roomStyle) => {
  if(roomStyle === 4) return i18n.global.t('HomeView.bigshow')
  switch (Number(tagId)) {
    case 1:
      return i18n.global.t('HomeView.Football')
    case 2:
      return i18n.global.t('HomeView.Basketball')
    case 3:
      return i18n.global.t('HomeView.payment')
    case 4:
      return i18n.global.t('HomeView.sports')
  }
}
</script>

<style lang="scss" scoped>
.swiperBox {
  width: 100%;
  display: flex;
  position: relative;
}
.leftBtn {
  // width: 60px;
  // height: 131px;
  // display: flex;
  // align-items: center;
  // margin-right: 15px;
  // margin-top: 30px;
  margin-top: 30px;
  position: relative;
  left: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 120px;
}
.rightBtn {
  margin-top: 30px;
  position: absolute;
  right: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 120px;
  cursor: pointer;
  background: rgba(11, 11, 30, 0.5);
}
.swiper-container {
  margin-left: auto;
  margin-right: auto;
  position: relative;
  overflow: hidden;
  list-style: none;
  padding: 0;
  z-index: 1;
}
.swiper-slide {
  width: 370px !important;
  height: 131px !important;
  flex-shrink: 0;
  margin-top: 30px;
  border-radius: 8px;
  background: url('../../../assets/img/swiperBg.png') 50% / cover no-repeat transparent;
}
.swiper-slideActive {
  background: url('../../../assets/img/swiperActiveBg.png') 50% / cover no-repeat transparent;
}
.disabled {
  opacity: 0.5;
  cursor: no-drop;
}
.match-item {
  .matcTop {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 9px 0;
    margin: 0 10px;
    height: 40px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    .topLeft {
      display: flex;
      align-items: center;
    }
    .t1 {
      height: 16px;
      border-radius: 20px;
      background: var(--1, linear-gradient(90deg, #ff9000 0.17%, #ff5000 101.4%));
      color: #fff;
      padding: 0 8px;

      font-size: 10px;
      font-style: normal;
      font-weight: 400;
      line-height: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .t2 {
      width: 185px;
      margin-left: 4px;
      color: var(--100, #fff);

      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .t3 {
      color: var(--60, rgba(255, 255, 255, 0.6));
      text-align: right;

      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
    .topRight {
      display: flex;
      align-items: center;
      svg {
        margin-right: 3px;
      }
    }
  }
  .matcMain {
    margin: 0 15px 0 15px;
    display: flex;
    justify-content: space-between;
    .mainLeft {
      width: 260px;
      margin: 12px 0 12px 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .leftDiv {
        display: flex;
        align-items: center;
        img {
          width: 24px;
          height: 24px;
          margin-left: 8px;
        }
      }
      .leftDiv:nth-of-type(2) {
        margin-top: 6px;
      }
      .mainLeft_score {
        color: var(--unnamed, #f35f1b);
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
      }
      .mainLeft_title {
        color: var(--100, #fff);

        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        margin-left: 6px;
      }
    }
    .mainRight {
      width: 80px;
      max-width: 100px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 7px;
      .anchorImg {
        width: 46px;
        height: 46px;
        .fcImg {
          width: 46px;
          height: 46px;
          border: 2px solid var(--unnamed, #f35f1b);
          border-radius: 50%;
        }
      }
      img {
        width: 46px;
        height: 46px;
      }
      .anchorName {
        max-width: 100px;
        color: #fff;

        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        margin-top: 2px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
}
</style>
