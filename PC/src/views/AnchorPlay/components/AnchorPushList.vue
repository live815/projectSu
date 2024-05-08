<template>
    <div class="swiperPushO">
        <div class="leftBtn" @click="prevGroup" v-show="orderList && orderList.length>5">
            <swiperLeft   :class="{ 'disabled': isBeginning }" />
        </div>
        <div class="swiper-swiperPushO">
            <div class="swiper-wrapper">
                <!-- 这里可以根据需要添加虚拟 Slide 的内容 -->
                <div v-for="(item, index) in orderList" :key="index" @click="slideClicked(index,item)" 
                    :class="{'swiper-slide':true}" 
                >
                    <div class="order-info">
                        <div class="pushOTop">{{$t('AnchorPlay.GoldMedalTutor')}}</div>
                        <div class="pushMain">
                            <div class="po1">{{item.orderTitle}}</div>
                            <div class="po2">
                                <p>{{ item.betMarket }}</p>
                                <p class="orage">{{item.betOdds}}</p>
                            </div>
                            <div class="pushOBtn" @click.stop="pushOdds(item)">{{$t('AnchorPlay.FollowOrders')}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="rightBtn" @click="nextGroup" v-show="orderList && orderList.length>5">
            <swiperLeft   :class="{ 'disabled': isEnd }" style="transform: rotate(180deg);" />
        </div>
    </div>
    
</template>
  
<script setup>
    import { ref, onMounted} from 'vue';
    // import { useLiveStore } from '@/stores/liveBroadcast'
    // import { useBetCartStore } from '@/stores/betCart'
    import Swiper from 'swiper';
    // import { getToken } from '@/utils/cache'
    import 'swiper/swiper-bundle.css';
    import swiperLeft from '@/components/icons/swiperLeft.vue'
    const virtualSlides = ref([]); // 用于存储虚拟 Slide 的数据
    const props=defineProps({
        orderList:{
            type:Array
        }
    })
    // const betCartStore = useBetCartStore()
    // const liveStore=useLiveStore()
    // const emit=defineEmits(['activeClick'])
    let mySwiperPush = null; // 保存 Swiper 实例的引用
    const isBeginning = ref(true)//判断是不是开始
    const isEnd = ref(false)//判断是不是结束
    const activeIndex = ref(0); // 用于跟踪当前激活的 Slide 索引
    // 在组件加载后初始化 Swiper
    onMounted( () => {
        // 初始化 Swiper
        mySwiperPush = new Swiper('.swiper-swiperPushO', {
            slidesPerView: 'auto', // 设置每个 Slide 自动适应容器宽度
            virtual: {
                slides: virtualSlides.value, // 设置虚拟 Slide 数据
            },
            slidesPerGroup : 8,//几个为一组 
            spaceBetween:'12',//边距20px
            grabCursor:props.orderList.length>5?true:false,//光标显示手指滑动
        });
        // 添加虚拟 Slide 的数据，可以根据需要修改
        virtualSlides.value =props.tableData
        // 添加滑动事件监听器
        mySwiperPush.on('slideChange', handleSlideChange);
    })
    
    // 点击下一组按钮
    const nextGroup = () => {
        // 自定义逻辑，这里只是示例，你可以根据需要修改
        mySwiperPush.slideNext();
        isBeginning.value=mySwiperPush.isBeginning
        isEnd.value=mySwiperPush.isEnd
    }

    // 点击上一组按钮
    const prevGroup = () => {
        mySwiperPush.slidePrev();
        isBeginning.value=mySwiperPush.isBeginning
        isEnd.value=mySwiperPush.isEnd
    }
    //点击切换
    const slideClicked = (index) => {
        activeIndex.value = index
        // emit('activeClick',item)
        // console.log(mySwiperPush.clickedIndex,'mySwiperPush',index)
    }
    //监听滑动
    const handleSlideChange = (objSwiper) => {
        activeIndex.value = objSwiper.activeIndex
        // 处理滑动事件
        isBeginning.value=objSwiper.isBeginning
        isEnd.value=objSwiper.isEnd
        // console.log('Slide 已切换',objSwiper.isBeginning);
    };
    const pushOdds=()=>{
        // let isLogin = getToken()
        // betCartStore.anchorBetType=1
        // betCartStore.anchorBetObj=item
        // console.log(betCartStore.anchorBetObj,'--')
    }
</script>
  
<style lang="scss" scoped>
    .swiperPushO{
        width: 100%;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 30px;
        padding-bottom: 16px;
        z-index: 1;
        height: 100px;
    }
    .leftBtn{
        display: flex;
        align-items: center;
        padding: 0 3px;
    }
    .rightBtn{
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 3px;
        cursor: pointer;
    }
    .swiper-swiperPushO {
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        position: relative;
        overflow: hidden;
        list-style: none;
        padding: 0 0 0 10px;
        z-index: 1;
        height: 100px;
    }
    .swiper-slide{
        width: 110px;
        height: 100px;
        border-radius: 4px;
        flex-shrink: 0;
        background: var(--unnamed, #171A2F);
    }
    // .swiper-slide-active{
    //     border: 1px solid #fff;
    //     border-radius: 8px;
    //     background: rgba(255, 255, 255, 0.14);
    // }
    
    .disabled {
        opacity: 0.5;
    }
    .order-info{
        display: flex;
        flex-direction: column;
        .pushOTop{
            height: 20px;
            border-radius: 4px 4px 0px 0px;
            background: var(--unnamed, linear-gradient(90deg, #FF9000 25%, #F35F1B 89.06%));
            display: flex;
            justify-content: center;
            align-items: center;
            color: #FFF;
            
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 22px; /* 157.143% */
        }
        .pushMain{
            width: 110px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .po1{
                width: 110px;
                color: var(--60, rgba(255, 255, 255, 0.60));
                
                font-size: 12px;
                font-style: normal;
                font-weight: 400;
                line-height: 24px; /* 183.333% */
                // display: flex;
                // justify-content: center;
                // align-items: center;
                text-align:center;
                flex-direction:column;
                white-space: nowrap;      /* 防止文本换行 */
                text-overflow: ellipsis;
                overflow: hidden;        /* 隐藏超出容器的部分 */
            }
            .po2{
                width: 100px;
                height: 20px;
                flex-shrink: 0;
                border-radius: 4px;
                background: #232949;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 8px;
                p{
                    color: var(--40, rgba(255, 255, 255, 0.40));
                    
                    font-size: 12px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 22px; /* 183.333% */
                }
                .orage{
                    color: var(--1, #FF9000);
                }
            }
            .pushOBtn{
                width: 56px;
                height: 20px;
                flex-shrink: 0;
                border-radius: 4px;
                background: var(--unnamed, linear-gradient(90deg, #FF9000 25%, #F35F1B 89.06%));
                color: #FFF;
                
                font-size: 12px;
                font-style: normal;
                font-weight: 400;
                line-height: 22px; /* 183.333% */
                display: flex;
                align-items: center;
                justify-content: center;
                margin-top: 6px;
                cursor: pointer;
            }
        }
    }

</style>
  
  