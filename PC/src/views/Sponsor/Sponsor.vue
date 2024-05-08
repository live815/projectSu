<template>
  <div class="sponsor-content">
    <div class="sponsor-content-tab" v-if="dataList.length">
      <div
        class="sponsor-content-tab-item"
        v-for="(item, index) in dataList"
        :key="item.id"
        @click="onClickTab(item, index)"
        :class="{ active: countTab == index }"
      >
      </div>
    </div>
    <div class="sponsor-content-min" v-if="countTab == 0">
      <div :style="{ backgroundImage: `url(${hdbg})` }" class="sponsor-content-min-top"></div>
      <div class="bg">
        <div class="sponsor-content-min-box">
          <div class="sponsor-content-min-box-item">
            <div class="sponsor-content-min-box-item-title">{{ $t('Sponsort.coperation') }}</div>
            <div class="sponsor-content-min-box-item-con">
              <div class="little-tit">
                <span>{{ $t('Sponsort.text_1') }}</span>
              </div>
              <div class="con">
                <div class="con-tit">
                  <p>{{  $t('Sponsort.text_2')  }}</p>
                  <p>{{  $t('Sponsort.text_3')  }}</p>
                </div>
                <img :src="gfhz" alt="">
              </div>
            </div>
          </div>
        </div>
        <div class="sponsor-content-min-footer">
          <div class="sponsor-content-min-footer-item">
            <div class="sponsor-content-min-footer-item-title">{{ $t('Sponsort.highLight') }}</div>
            <div class="con2">
              <div class="sponsor-content-min-footer-item-left">
                <div class="sponsor-content-min-footer-item-img">
                  <img :src="tp2" alt="">
                </div>
              </div>
              <div class="sponsor-content-min-footer-item-right">
                <ul>
                  <li><div class="square"></div>
                    <div class="tx">
                      <p>{{  $t('Sponsort.text_4')  }}</p>
                      <p>{{  $t('Sponsort.text_5')  }}</p>
                    </div>
                  </li>
                  <li><div class="square"></div>
                    <div class="tx">
                      <p>{{  $t('Sponsort.text_6')  }}</p>
                      <p>{{  $t('Sponsort.text_7')  }}</p>
                    </div>
                  </li>
                  <li><div class="square"></div>
                    <div class="tx">
                      <p>{{  $t('Sponsort.text_8')  }}</p>
                      <p>{{  $t('Sponsort.text_9')  }}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="sponsor-content-mins" v-else>
      <div :style="{ backgroundImage: `url(${uzibg})` }" class="sponsor-content-mins-top"></div>
      <div class="sponsor-content-mins-box">
        <div class="sponsor-content-mins-box-item">
          <div class="sponsor-content-mins-box-item-title">{{ $t('Sponsort.coperation') }}</div>
          <div class="sponsor-content-mins-box-item-left">
            <img src="./img/uzi2.png" />
          </div>
          <div class="sponsor-content-mins-box-item-right">
            <div class="sponsor-content-mins-box-item-right-title">
              {{ $t('Sponsort.content18') }}
            </div>
            <div class="sponsor-content-mins-box-item-right-text">
              <p style="margin-bottom: 15px">
                {{ $t('Sponsort.content19') }}
              </p>
              <p>
                {{ $t('Sponsort.content20') }}
              </p>
            </div>
            <div class="sponsor-content-mins-box-item-right-titles">
              {{ $t('Sponsort.content21') }}
            </div>
            <div class="sponsor-content-mins-box-item-right-footer">
              {{ $t('Sponsort.content22') }}<br />
              {{ $t('Sponsort.content23') }}<br />
              {{ $t('Sponsort.content24') }}<br />
              {{ $t('Sponsort.content25') }}<br />
              {{ $t('Sponsort.content26') }}<br />
              {{ $t('Sponsort.content27') }}<br />
              {{ $t('Sponsort.content28') }}<br />
              {{ $t('Sponsort.content29') }}<br />
              {{ $t('Sponsort.content30') }}<br />
              {{ $t('Sponsort.content31') }}<br />
              {{ $t('Sponsort.content32') }}<br />
              {{ $t('Sponsort.content33') }}<br />
            </div>
          </div>
        </div>
      </div>
      <div class="sponsor-content-mins-footer">
        <div class="sponsor-content-mins-footer-item">
          <div class="sponsor-content-mins-footer-item-title">{{ $t('Sponsort.highLight') }}</div>
          <div class="sponsor-content-mins-footer-item-left">
            <div class="sponsor-content-mins-footer-item-img">
              <img :src="uziImg ? uziImg : arrImgs[0].img" />
            </div>
            <div class="sponsor-content-mins-footer-item-text">{{ arrImgs[uziIndex].text }}</div>
          </div>
          <div class="sponsor-content-mins-footer-item-right">
            <div
              class="sponsor-content-mins-footer-item-right-item"
              v-for="(item, index) in arrImgs"
              :key="item.id"
              @click="onClickItems(item, index)"
            >
              <img :src="item.img" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import { getSponsorList } from '@/api/sponsor'
import { getImgUrl } from '@/utils'
import gfhz from './img/tp-1.png'
// import tp2 from './img/tp-2.png'
import { useAppStore } from '@/stores/app'
import i18n from '@/i18n'
const appStore = useAppStore()

const tp2 = new URL(`./img/${appStore.language}/tp-2.png`, import.meta.url).href
const hdbg = new URL(`./img/${appStore.language}/hdbj1.png`, import.meta.url).href
const uzibg = new URL(`./img/${appStore.language}/uzibj1.png`, import.meta.url).href

const hadeng = new URL(`./img/${appStore.language}/hd2.png`, import.meta.url).href
onMounted(() => {
  // getList()
})

// const getList = () => {
//   getSponsorList().then((res) => {
//     dataList.value = res.data || []
//   })
// }
const dataList = reactive([
  {
    id: 1,
    img: new URL(`./img/${appStore.language}/tabHd.png`, import.meta.url).href
  },
  // {
  //   id: 2,
  //   img: new URL(`./img/${appStore.language}/tabUzi.png`, import.meta.url).href
  // }
])

// 当前选项
const countTab = ref(0)

const onClickTab = (item, index) => {
  countTab.value = index
  hdIndex.value = 0
  hdImg.value = ''
  uziIndex.value = 0
  uziImg.value = ''
}

// 轮播显示当前值
const hdIndex = ref(0)

// 当前哈登显示图片
const hdImg = ref('')
const arrImg = reactive([
  {
    id: 1,
    img: new URL('./img/hd3.png', import.meta.url).href,
    text: i18n.global.t('Sponsort.hdHighLightContent1')
  },
  {
    id: 2,
    img: new URL('./img/hd4.png', import.meta.url).href,
    text: i18n.global.t('Sponsort.hdHighLightContent2')
  },
  {
    id: 3,
    img: new URL('./img/hd5.png', import.meta.url).href,
    text: i18n.global.t('Sponsort.hdHighLightContent3')
  }
])

// 点击当前项
const onClickItem = (item, index) => {
  hdImg.value = item.img
  hdIndex.value = index
}

// 轮播显示当前值
const uziIndex = ref(0)

// 当前哈登显示图片
const uziImg = ref('')
const arrImgs = reactive([
  {
    id: 1,
    img: new URL('./img/uzi3.png', import.meta.url).href,
    text: i18n.global.t('Sponsort.uziHighLightContent1')
  },
  {
    id: 2,
    img: new URL('./img/uzi4.png', import.meta.url).href,
    text: i18n.global.t('Sponsort.uziHighLightContent2')
  },
  {
    id: 3,
    img: new URL('./img/uzi5.png', import.meta.url).href,
    text: i18n.global.t('Sponsort.uziHighLightContent3')
  }
])

// 点击当前项
const onClickItems = (item, index) => {
  uziImg.value = item.img
  uziIndex.value = index
}
</script>
<style lang="scss" scoped>

.sponsor-content {
  position: relative;
  width: 100%;
  height: calc(100vh - 60px);
  
  .sponsor-content-tab {
    position: absolute;
    top: 50%;
    left: 40px;
    transform: translateY(-50%);
    width: 290px;
    display: flex;
    flex-direction: column;
    .sponsor-content-tab-item {
      margin: 10px 0;
      // border-radius: 10px;
      opacity: 0.5;
      // background: #fff;
      .sponsor-content-tab-item-box {
        position: relative;
        img {
          width: 290px;
          height: 120px;
        }
        .icon {
          position: absolute;
          right: 15px;
          top: 0;
          font-weight: 700;
        }
      }
    }
    .active {
      opacity: 1;
      // border: 1px solid #f35f1b;
    }
  }
  .sponsor-content-min {
    width: 100%;

    .sponsor-content-min-top,
    .sponsor-content-min-box,
    .sponsor-content-min-footer {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      min-height: 834px;
      // min-height:735px;
      // background: url(./img/hdbj.png) no-repeat;
      background-size: 100% auto;
      // padding-top: 60px;
    }
    .sponsor-content-min-top {
      background: url(./img/hdbj1.png) no-repeat;
      background-size: 100% auto;
    }
    .bg{
      background-image: url(./img/bg.png);
      padding-top: 10px;
    }
    .sponsor-content-min-box {
      .sponsor-content-min-box-item {
        position: relative;
        display: flex;
        width: 1200px;
        min-height: 700px;
        border-radius: 20px;
        background: #fff;
        .sponsor-content-min-box-item-title {
          background-image: url(./img/hd1.png);
          position: absolute;
          left: 50%;
          top: -25px;
          transform: translate(-50%);
          width: 840px;
          height: 128px;
          color: #fff;
          text-align: center;
          font-size: 40px;
          font-style: normal;
          font-weight: 600;
          line-height: 80px; /* 150% */
        }
        .sponsor-content-min-box-item-left {
          width: 357px;
          height: 512px;
          margin: 125px 100px 63px 76px;
          img {
            width: 357px;
            height: 512px;
          }
        }
        .sponsor-content-min-box-item-right {
          margin-top: 107px;
          .sponsor-content-min-box-item-right-title,
        
          .sponsor-content-min-box-item-right-titles {
            display: flex;
            justify-content: center;
            width: 0;
            min-width: 245px;
            height: 24px;
            background: #d9404b;
            color: #fff;
            text-align: center;
            line-height: 24px;
            font-size: 16px;
            font-weight: 600;
            padding: 0 8px;
          }
          .sponsor-content-min-box-item-right-titles {
          
            margin-top: 0;
          }
          .sponsor-content-min-box-item-right-text {
            width: 577px;
            color: var(---333, #333);
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 21px;
            margin: 12px 0 10px 0;
          }
          .sponsor-content-min-box-item-right-footer {
            width: 577px;
            margin-top: 12px;
            color: var(---333, #333);
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 21px; /* 150% */
          }
        }
        .sponsor-content-min-box-item-con{
          height: auto;
          width:790px;
          margin: 100px auto 0;
          // text-align: center;
          .little-tit{
            // display: block;
            text-align: center;
            span{
              width: 207px;
              height: 24px;
              line-height: 24px;
              background: #39ABFA;
              font-weight: 400;
              font-size: 16px;
              color: #FFF;
              width: auto;
              padding: 3px 5px;
            }
            
          }
          .con{
            margin-top: 20px;
            .con-tit{
              width: 96%;
              margin: 0 auto;
            }
            p{
              // text-indent: 20px;
              line-height: 25px;
              color: var(---333, #333);
              font-size: 14px;
              letter-spacing: 2px;
              font-family: Times New Roman;
            }
            img{
              margin: 0 auto;
              margin-top: 20px;
              padding-bottom: 20px;
              width: 100%;
              
            }
          }
        }
      }
    }
    .sponsor-content-min-footer {
      .sponsor-content-min-footer-item {
        position: relative;
        display: flex;
        width: 1200px;
        min-height: 600px;
        flex-shrink: 0;
        border-radius: 20px;
        background: #fff;
        .sponsor-content-min-footer-item-title {
          background-image: url(./img/hd1.png);
          position: absolute;
          left: 50%;
          top: -25px;
          transform: translate(-50%);
          width: 840px;
          height: 128px;
          color: #fff;
          text-align: center;
          font-size: 40px;
          font-style: normal;
          font-weight: 600;
          line-height: 80px; /* 150% */
        }
        .sponsor-content-min-footer-item-left {
          width: 504px;
          // margin-left: 45px;
          .sponsor-content-min-footer-item-img {
            width: 100%;
            height: auto;
            margin-top: 110px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .sponsor-content-min-footer-item-text {
            color: var(---333, #333);
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            margin: 0 auto;
            line-height: 21px;
            margin: 22px 0 17px 0;
          }
        }
        .sponsor-content-min-footer-item-right {
          width: 580px;
          margin-top: 106px;
          // margin-left: 30px;
          .sponsor-content-min-footer-item-right-item {
            width: 100%;
            height: 157px;
            margin: 20px 0;
            img {
              width: 100%;
              height: 100%;
            }
          }
          li{
            color: var(---333, #333);
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 24px;
            font-family: Times New Roman;
            margin-bottom: 15px;
            display: flex;
            flex-direction: row;
            // list-style-type: square;
            list-style: none;
            .square{
              display: block;
              width: 6px;
              height: 6px;
              background: #FF8310;
              margin-top: 7px;
              flex-shrink: 0;
            }
            .tx{
              margin-left: 10px;
            }
            // &::marker{
            //   color: #FF8310;
            //   width: 6px;
            //   height: 6px;
            // }
          }
        }
        .con2{
          display: flex;
          flex-direction: row;
          width:90%;
          justify-content: space-around;
          margin: 0 auto;
        }
      }
    }
  }

  .sponsor-content-mins {
    width: 100%;

    .sponsor-content-mins-top,
    .sponsor-content-mins-box,
    .sponsor-content-mins-footer {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 834px;
      background-image: url(./img/uzibj.png);
    }
    .sponsor-content-mins-top {
      background-image: url(./img/uzibj1.png);
    }
    .sponsor-content-mins-box {
      .sponsor-content-mins-box-item {
        position: relative;
        display: flex;
        width: 1200px;
        min-height: 700px;
        padding-bottom: 15px;
        border-radius: 20px;
        background: #fff;
        .sponsor-content-mins-box-item-title {
          background-image: url(./img/uzi1.png);
          position: absolute;
          left: 50%;
          top: -25px;
          transform: translate(-50%);
          width: 840px;
          height: 128px;
          color: #fff;
          text-align: center;
          font-size: 40px;
          font-style: normal;
          font-weight: 600;
          line-height: 80px; /* 150% */
        }
        .sponsor-content-mins-box-item-left {
          width: 357px;
          height: 512px;
          margin: 125px 100px 63px 76px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .sponsor-content-mins-box-item-right {
          margin-top: 107px;
          .sponsor-content-mins-box-item-right-title,
          .sponsor-content-mins-box-item-right-titles {
            display: flex;
            justify-content: center;
            width: 0;
            min-width: 100px;
            height: 24px;
            background: #e19c43;
            color: #fff;
            text-align: center;
            line-height: 24px;
            font-size: 16px;
            font-weight: 600;
            padding: 0 8px;
           
          }
          .sponsor-content-mins-box-item-right-titles {
            margin-top: 0;
          }
          .sponsor-content-mins-box-item-right-text {
            width: 577px;
            color: var(---333, #333);
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 21px;
            margin: 12px 0 10px 0;
          }
          .sponsor-content-mins-box-item-right-footer {
            width: 577px;
            margin-top: 12px;
            color: var(---333, #333);
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 21px; /* 150% */
          }
          
        }
      }
    }
    .sponsor-content-mins-footer {
      .sponsor-content-mins-footer-item {
        position: relative;
        display: flex;
        width: 1200px;
        height: 700px;
        flex-shrink: 0;
        border-radius: 20px;
        background: #fff;
        .sponsor-content-mins-footer-item-title {
          background-image: url(./img/uzi1.png);
          position: absolute;
          left: 50%;
          top: -25px;
          transform: translate(-50%);
          width: 840px;
          height: 128px;
          color: #fff;
          text-align: center;
          font-size: 40px;
          font-style: normal;
          font-weight: 600;
          line-height: 80px; /* 150% */
        }
        .sponsor-content-mins-footer-item-left {
          width: 800px;
          margin-left: 45px;
          .sponsor-content-mins-footer-item-img {
            width: 100%;
            height: 450px;
            margin-top: 110px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .sponsor-content-mins-footer-item-text {
            color: var(---333, #333);
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            margin: 0 auto;
            line-height: 21px;
            margin: 22px 0 17px 0;
          }
        }

        .sponsor-content-mins-footer-item-right {
          width: 280px;
          margin-top: 90px;
          margin-left: 30px;
          .sponsor-content-mins-footer-item-right-item {
            width: 100%;
            height: 157px;
            margin: 20px 0;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }
}
@media screen and (min-width:2520px) {
  .sponsor-content .sponsor-content-min .sponsor-content-min-top{
    min-height:1150px !important;
  }
}
</style>
