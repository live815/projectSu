<template>
  <div class="swiperBox">
    <div class="leftBtn" @click="prevGroup">
      <swiperLeft :class="{ disabled: isBeginning }" />
    </div>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <!-- 这里可以根据需要添加虚拟 Slide 的内容 -->
        <div
          v-for="(item, index) in fbStore.matchAnchorList"
          :key="index"
          @click="slideClicked(index, item)"
          :class="{ 'swiper-slideActive': index == activeIndex, 'swiper-slide': true }"
        >
          <div class="match-item">
            <div class="matcTop">
              <div class="title">{{ item.lg?.na }}</div>
              <div class="svgImg">
                <videotape  style="margin-right: 6px;"/>
                <resource />
              </div>
            </div>
            <div class="matcMain">
              <div class="iconDiv">
                <playIcon  v-if="item.ms===5" style="margin-right: 4px;"/>
                <span class="t1">{{getMatchStatus(item, fbStore) }}</span>
              </div>
            </div>
            <div class="matcBom">
              <div class="bomLeft t2" v-if="item.ts">
                <span class="t3">{{ item.ts[0]?.na }}</span>
                <img :src="item.ts[0]?.lurl" />
              </div>
              <div class="bomCen">
                <div class="t2" style="font-size: 20px" v-if="item.nsg">
                  {{ item.nsg[0]?.sc[0] }}-{{ item.nsg[0]?.sc[1] }}
                </div>
                <div class="t2" style="font-size: 20px" v-else>0-0</div>
              </div>
              <div class="bomRight t2" v-if="item.ts">
                <img :src="item.ts[1]?.lurl" />
                <span class="t3">{{ item.ts[1]?.na }}</span>
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
import { ref, onMounted } from 'vue'
import Swiper from 'swiper'
import 'swiper/swiper-bundle.css'
import { getMatchStatus } from '@/hooks/useSportDict'
import swiperLeft from '@/components/icons/swiperLeft.vue'
import playIcon from '@/components/icons/playIcon.vue'
import resource from '@/components/icons/resource.vue'
import videotape from '@/components/icons/videotape.vue'
import { useLiveStore } from '@/stores/liveBroadcast'
import { useFBStore } from '@/stores/fb'
const fbStore = useFBStore()
const virtualSlides = ref([]) // 用于存储虚拟 Slide 的数据
const liveStore = useLiveStore()
// const props=defineProps({
//     tableData:{
//         type:Array
//     }
// })
const emit = defineEmits(['activeClick'])
let mySwiper = null // 保存 Swiper 实例的引用
const isBeginning = ref(true) //判断是不是开始
const isEnd = ref(false) //判断是不是结束
const activeIndex = ref(0) // 用于跟踪当前激活的 Slide 索引
// 在组件加载后初始化 Swiper
onMounted(() => {
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
  virtualSlides.value = liveStore.matchList //props.tableData
  // 添加滑动事件监听器
  mySwiper.on('slideChange', handleSlideChange)
})

// 点击下一组按钮
const nextGroup = () => {
  // 自定义逻辑，这里只是示例，你可以根据需要修改
  mySwiper.slideNext()
  isBeginning.value = mySwiper.isBeginning
  isEnd.value = mySwiper.isEnd
}

// 点击上一组按钮
const prevGroup = () => {
  mySwiper.slidePrev()
  isBeginning.value = mySwiper.isBeginning
  isEnd.value = mySwiper.isEnd
}
//点击切换
const slideClicked = (index, item) => {
  console.log(index,'index')
  activeIndex.value = index
  emit('activeClick', item)
  // console.log(mySwiper.clickedIndex,'mySwiper',index)
}
//监听滑动
const handleSlideChange = (objSwiper) => {
  activeIndex.value = objSwiper.activeIndex
  // 处理滑动事件
  isBeginning.value = objSwiper.isBeginning
  isEnd.value = objSwiper.isEnd
  // console.log('Slide 已切换',objSwiper.isBeginning);
}
watch(
  () => liveStore.roomSportType,
  (roomSportType) => {
   if(roomSportType){
      activeIndex.value=0
   }
  }
)
</script>

<style lang="scss" scoped>
.swiperBox {
  width: 100%;
  display: flex;
  position: relative;
}
.leftBtn {
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
}
.match-item {
  .matcTop {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 20px;
    margin: 0 20px;
    .title {
      max-width: 250px;
      height: 24px;
      color: var(--100, #fff);
      
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      // margin-left: 72px;
    }
    .svgImg {
      display: flex;
      align-items: center;
      position: absolute;
      right: 18px;
      // margin-left: 46px;
    }
  }
  .matcMain {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .iconDiv {
      display: flex;
      align-items: center;
      margin-top: 10px;
      .t1 {
        color: var(--60, rgba(255, 255, 255, 0.6));
        
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
    }
  }
  .matcBom {
    display: flex;
    justify-content: space-between;
    .t3 {
      max-width: 85px;
      line-height: normal;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .bomLeft {
      width: 100px;
      display: flex;
      align-items: center;
      margin-left: 20px;
      img {
        margin-left: 4px;
      }
    }
    .t2 {
      color: var(--100, #fff);
      
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
    .bomRight {
      width: 100px;
      display: flex;
      align-items: center;
      margin-right: 20px;
      img {
        margin-right: 4px;
      }
    }
    img {
      width: 24px;
      height: 24px;
    }
  }
}
</style>
