<template>
  <div class="swiperGift" :style="{ width: `${props.width - 20}px` }">
    <div class="leftBtn" @click="prevGroup">
      <swiperLeft :class="{ disabled: isBeginning }" />
    </div>
    <div class="swiper-containerGift">
      <div class="swiper-wrapper">
        <!-- 这里可以根据需要添加虚拟 Slide 的内容 -->
        <div v-for="(item, index) in tableData" :key="index" @click="slideClicked(index, item)"
          :class="{ 'swiper-slide-activeGift': index == activeIndex, 'swiper-slide': true }">
          <div class="gift-info">
            <img class="gift-img" :src="getImgUrl(item.giftSmallImage)" />
            <div class="gift-name ">{{ item.giftName }}</div>
            <div class="gift-price gift-name">
              <CurrencyUnit />{{ item.payAmount }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="rightBtn" @click="nextGroup">
      <swiperLeft :class="{ disabled: isEnd }" style="transform: rotate(180deg)" />
    </div>
  </div>
  <div class="giftContent" :style="{ width: `${props.width - 20}px` }">
    <div class="balance">
      <span>{{ $t('Components.Balance') }}：</span>
      <Balance />
    </div>
    <div class="giftRight">
      <div class="totalAmount">
        <span class="to1">{{ $t('Components.Totals') }}：</span>
        <span class="to2">
          <CurrencyUnit class="currency" />{{ giftMoney }}
        </span>
      </div>
      <div class="totalNumber">
        <span class="btnnum"><el-icon @click="reduceNum">
            <Minus />
          </el-icon></span>
        <input class="inp" v-model="totalNum" maxlength="2" oninput="value = value.replace(/[^\d]/g,'')" />
        <span class="btnnum"><el-icon @click="addNum">
            <Plus />
          </el-icon></span>
      </div>
      <div class="giveBtn" @click="deliverGift">{{ $t('Components.GiveAway') }}</div>
    </div>
  </div>
  <BalanceNo :isShow="isShow" :txt="txt" v-if="isShow" @closeGift="closeGift" />
</template>

<script setup>
import Balance from '@/components/Balance'
import { ref, onMounted, watch } from 'vue'
import Swiper from 'swiper'
import 'swiper/swiper-bundle.css'
import swiperLeft from '@/components/icons/swiperLeft.vue'
import { giveGifts } from '@/api/liveBroadcast'
import { Minus, Plus } from '@element-plus/icons-vue'
import { getImgUrl } from '@/utils'
import { useUserStore } from '@/stores/user.js'
import dayjs from 'dayjs'
import { useLiveStore } from '@/stores/liveBroadcast'
import { useTencentIM } from '@/utils/useTencentIM.js'
import BalanceNo from '@/components/BalanceNo/BalanceNo.vue'
import i18n from '@/i18n'
const user = useUserStore()
const isShow = ref(false)
const txt = ref('')
const virtualSlides = ref([]) // 用于存储虚拟 Slide 的数据

const props = defineProps({
  tableData: {
    type: Array
  },
  width: {
    type: [Number, String],
    default: 989
  },
  height: {
    type: [Number, String],
    default: 555
  },
})

const liveStore = useLiveStore()
const giftMoney = ref(0)
const activeObj = ref({})
const totalNum = ref(1)
// const emit=defineEmits(['activeClick'])
let mySwiperGift = null // 保存 Swiper 实例的引用
const isBeginning = ref(true) //判断是不是开始
const isEnd = ref(false) //判断是不是结束
const activeIndex = ref(0) // 用于跟踪当前激活的 Slide 索引
// 在组件加载后初始化 Swiper
onMounted(() => {
  // giftList()
  // 初始化 Swiper
  mySwiperGift = new Swiper('.swiper-containerGift', {
    slidesPerView: 'auto', // 设置每个 Slide 自动适应容器宽度
    virtual: {
      slides: virtualSlides.value // 设置虚拟 Slide 数据
    },
    slidesPerGroup: 8, //几个为一组
    spaceBetween: '17', //边距20px
    grabCursor: true //光标显示手指滑动
  })
  // 添加虚拟 Slide 的数据，可以根据需要修改
  virtualSlides.value = props.tableData
  // 添加滑动事件监听器
  mySwiperGift.on('slideChange', handleSlideChange)
  activeObj.value = props.tableData[0]
  giftMoney.value = props.tableData[0].payAmount
})

// 点击下一组按钮
const nextGroup = () => {
  // 自定义逻辑，这里只是示例，你可以根据需要修改
  mySwiperGift.slideNext()
  isBeginning.value = mySwiperGift.isBeginning
  isEnd.value = mySwiperGift.isEnd
}

// 点击上一组按钮
const prevGroup = () => {
  mySwiperGift.slidePrev()
  isBeginning.value = mySwiperGift.isBeginning
  isEnd.value = mySwiperGift.isEnd
}
//点击切换
const slideClicked = (index, item) => {
  console.log(item, 'item')
  activeIndex.value = index
  activeObj.value = item
  giftMoney.value = item.payAmount
  // emit('activeClick',item)
  // console.log(mySwiperGift.clickedIndex,'mySwiperGift',index)
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
  () => totalNum.value,
  (newTotalNum) => {
    const regex = /^[0-9]+$/
    if (newTotalNum) {
      if (regex.test(newTotalNum)) {
        totalNum.value = newTotalNum
        giftMoney.value = activeObj.value.payAmount * newTotalNum
      } else {
        totalNum.value = 1
        giftMoney.value = activeObj.value.payAmount
      }
    }
  }
)
const reduceNum = () => {
  if (totalNum.value>1) {
    totalNum.value -= 1
  }
}
const addNum = () => {
  if(totalNum.value==0){
    totalNum.value= 1
  }else{
    totalNum.value += 1
  }
}
// const giftList=async ()=>{
//   try {
//     let res= await getGiftList({})
//     console.log(res.data.list,'giftList')
//     list.value=res.data.list
//   } catch (error) {
//     console.log(error)
//   }
// }
const closeGift = () => {
  isShow.value = false
}
//赠送礼物
const deliverGift = () => {
  //数量大于0
  if (totalNum.value > 0) {
    if (giftMoney.value > user.balance || !user.balance) {
      let differMoney = 0
      if (user.balance) {
        differMoney = (giftMoney.value - Number(user.balance)).toFixed(2)
      } else {
        differMoney = (giftMoney.value).toFixed(2)
      }
      txt.value = i18n.global.t('Components.Notice_10', { differMoney })
      isShow.value = true
      return
    }

    const { sendMessage } = useTencentIM()
    const formattedDate = dayjs().format('YYYY-MM-DD HH:mm:ss')
    const dataGift = {
      giftId: activeObj.value.id,
      giftNum: totalNum.value,
      giftTotalAmount: giftMoney.value,
      giveToTime: formattedDate,
      paymentTime: formattedDate,
      memberId: user.userInfo.id,
      memberName: user.userInfo.userName,
      presenterId: liveStore.liveRoom.presenterId,
      presenterName: liveStore.liveRoom.presenterName,
      liveStreamId: liveStore.liveRoom.id
    }
    //赠送礼物接口
    activeObj.value.giftNum = totalNum.value //礼物数量
    activeObj.value.avatar = user.userInfo.avatar //用户头像
    activeObj.value.vip = user.userInfo.vipLevel //用户vip
    const data = {
      type: 'customize',
      text: 'gift',
      description: JSON.stringify(activeObj.value)
    }
    giveGifts(dataGift).then((resq) => {
      user.getBalanceAction() //刷新钱包
      if (resq.code === 200) {
        sendMessage(data).then((res) => {
          eventBus.emit('SendMessage', res)
        })
      }
    })
  }


}
</script>

<style lang="scss" scoped>
.swiperGift {
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  padding-bottom: 16px;
  z-index: 1;
  height: 120px;
}

.leftBtn {
  display: flex;
  align-items: center;
}

.rightBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.swiper-containerGift {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  overflow: hidden;
  list-style: none;
  padding: 0;
  z-index: 1;
  height: 120px;
}

.swiper-slide {
  width: 86px;
}

.swiper-slide-activeGift {
  border: 1px solid #fff;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.14);
}

.disabled {
  opacity: 0.5;
}

.gift-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .gift-img {
    width: 72px;
    height: 72px;
  }

  .gift-name {
    width: 80px;
    color: #fff;
    text-align: center;

    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-top: 4px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}

.giftContent {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;

  .balance {
    color: #fff;

    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
    display: flex;
    align-items: center;
  }

  .giftRight {
    display: flex;
    align-items: center;
  }

  .totalAmount {
    display: flex;
    min-width: 112px;
    height: 32px;
    padding: 10px;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.2);
    margin-right: 4px;
  }

  .totalNumber {
    width: 97px;
    height: 32px;
    flex-shrink: 0;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 4px;

    .btnnum {
      font-size: 16px;
      color: rgba(255, 255, 255, 0.5);
      cursor: pointer;
    }

    .inp {
      width: 40px;
      height: 32px;
      color: #fff;
      margin: 0 4px;
      text-align: center;
      font-size: 16px;
    }
  }

  .giveBtn {
    display: flex;
    min-width: 72px;
    height: 32px;
    padding: 10px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    border-radius: 4px;
    font-weight: 400 !important;
    background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
    color: #fff;

    font-size: 16px;
    font-style: normal;
    line-height: 16px;
    cursor: pointer;
  }

  .to1 {
    color: rgba(255, 255, 255, 0.5);

    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    /* 114.286% */
  }

  .to2 {
    color: #fff;

    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
  }
}</style>
