<template>
  <div class="sponsorDetail-content">
    <NavBar :title="$t('Sponsort.Sponinformat')" v-if="rowItemObj.appFlag" />
    <div class="sponsorDetail-content-bg" :style="`background-image: url(${imageUrlbg})`">
      <img v-if="rowItemObj.index == 0" :src="hd1" class="sponsorDetail-content-top" />
      <img v-else :src="uzi1" class="sponsorDetail-content-top" />
      <template v-if="rowItemObj.index == 0">
        <div class="sponsorDetail-content-min">
          <img :src="hd2" class="sponsorDetail-content-min-top" />
          <img :src="hd3" class="sponsorDetail-content-min-img" />
          <div class="title">
            <span>{{ $t('Sponsort.text_1') }}</span>
          </div>
          <div class="text">
            {{ $t('Sponsort.text_2') }}<br />
            {{ $t('Sponsort.text_3') }}<br />
            <!-- {{ $t('Sponsort.content4') }} -->
          </div>
          <!-- <div class="title">{{ $t('Sponsort.personalglory') }}</div>
          <div class="text">
            {{ $t('Sponsort.content5') }}<br />
            {{ $t('Sponsort.content6') }}<br />
            {{ $t('Sponsort.content7') }}<br />
            {{ $t('Sponsort.content8') }}<br />
            {{ $t('Sponsort.content9') }}<br />
            {{ $t('Sponsort.content10') }}<br />
            {{ $t('Sponsort.content11') }}<br />
            {{ $t('Sponsort.content12') }}<br />
            {{ $t('Sponsort.content13') }}<br />
            {{ $t('Sponsort.content14') }}<br />
            {{ $t('Sponsort.content15') }}<br />
            {{ $t('Sponsort.content16') }}<br />
            {{ $t('Sponsort.content17') }}<br />
          </div> -->
        </div>
        <div class="sponsorDetail-content-footer-wrapper">
          <div class="sponsorDetail-content-footer">
            <img :src="hd4" class="sponsorDetail-content-footer-top" />
            <!-- <img :src="hd5"  class="sponsorDetail-content-min-img" />
            <div class="text">
              {{ $t('Sponsort.text_4') }}<br />
              {{ $t('Sponsort.text_5') }}<br />
            </div> -->
            <div class="sponsorDetail-content-footer-carousel">
              <van-swipe
                :autoplay="5000"
                indicator-color="white"
                :initial-swipe="index"
                @change="onChange"
              >
                <van-swipe-item v-for="item in arrImg" :key="item.id">
                  <img :src="item.img" class="img"
                /></van-swipe-item>
              </van-swipe>
            </div>
            <div class="sponsorDetail-content-footer-text">
              <p>{{ arrImg[index].text }}</p>
              <p>{{ arrImg[index].text1 }}</p>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="sponsorDetail-content-min">
          <img :src="uzi2" class="sponsorDetail-content-min-top" />
          <img :src="uzi3" class="sponsorDetail-content-min-img" />
          <div class="title titles">{{ $t('Sponsort.content18') }}</div>
          <div class="text">
            {{ $t('Sponsort.content19') }}<br />
            {{ $t('Sponsort.content20') }}
          </div>
          <div class="title titles">{{ $t('Sponsort.content21') }}</div>
          <div class="text">
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
            {{ $t('Sponsort.content33') }}；<br />
          </div>
        </div>
        <div class="sponsorDetail-content-footer-wrapper">
          <div class="sponsorDetail-content-footer">
            <img :src="uzi4" class="sponsorDetail-content-footer-top" />
            <div class="sponsorDetail-content-footer-carousel">
              <van-swipe
                :autoplay="5000"
                indicator-color="white"
                :initial-swipe="index"
                @change="onChange"
              >
                <van-swipe-item v-for="item in arrImgs" :key="item.id">
                  <img :src="item.img" class="img"
                /></van-swipe-item>
              </van-swipe>
            </div>
            <div class="sponsorDetail-content-footer-text">
              {{ arrImgs[index].text }}
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import hdbg from './img/hdbg.png'
// import hd2 from './img/hd2.png'
// import hd3 from './img/hd3.png'
// import hd4 from './img/hd4.png'
import uzibg from './img/uzibg.png'
// import uzi1 from './img/uzi1.png'
// import uzi2 from './img/uzi2.png'
import uzi3 from './img/uzi3.png'
// import uzi4 from './img/uzi4.png'
import i18n from '@/i18n'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
const route = useRoute()
// 轮播显示当前值
const index = ref(0)

const arrImg = reactive([
  {
    id: 1,
    img: new URL('./img/carousel1.png', import.meta.url).href,
    text: i18n.global.t('Sponsort.text_4'),
    text1: i18n.global.t('Sponsort.text_5')
  },
  {
    id: 2,
    img: new URL('./img/carousel2.png', import.meta.url).href,
    text: i18n.global.t('Sponsort.text_6'),
    text1: i18n.global.t('Sponsort.text_7')
  },
  {
    id: 3,
    img: new URL('./img/carousel3.png', import.meta.url).href,
    text: i18n.global.t('Sponsort.text_8'),
    text1: i18n.global.t('Sponsort.text_9')
  }
  // {
  //   id: 4,
  //   img: new URL('./img/carousel4.png', import.meta.url).href,
  //   text: i18n.global.t('Sponsort.text4')
  // }
])
const arrImgs = reactive([
  {
    id: 1,
    img: new URL('./img/carousel5.png', import.meta.url).href,
    text: i18n.global.t('Sponsort.text5')
  },
  {
    id: 2,
    img: new URL('./img/carousel5.png', import.meta.url).href,
    text: i18n.global.t('Sponsort.text5')
  },
  {
    id: 3,
    img: new URL('./img/carousel6.png', import.meta.url).href,
    text: i18n.global.t('Sponsort.text6')
  },
  {
    id: 4,
    img: new URL('./img/carousel7.png', import.meta.url).href,
    text: i18n.global.t('Sponsort.text7')
  }
])

const onChange = (val) => {
  index.value = val
}

const imageUrlbg = computed(() => {
  if (rowItemObj.value?.index == 0) {
    return hdbg
  }
  return uzibg
})

// 当前详情信息
const rowItemObj = ref({
  id: null,
  index: null,
  appFlag: null
})
onMounted(() => {
  const id = new URLSearchParams(window.location.search).get('id')
  const index = new URLSearchParams(window.location.search).get('index')
  const appFlag = new URLSearchParams(window.location.search).get('appFlag')
  rowItemObj.value.id = id
  rowItemObj.value.index = index
  rowItemObj.value.appFlag = appFlag
  if (appFlag == 'true') {
    rowItemObj.value.appFlag = false
  } else {
    rowItemObj.value.appFlag = true
  }
})

const hd1 = computed(() => {
  return new URL(`./img/${appStore.language}/hd1.png`, import.meta.url).href
})
const hd2 = computed(() => {
  return new URL(`./img/${appStore.language}/hd2.png`, import.meta.url).href
})
const hd3 = computed(() => {
  return new URL(`./img/${appStore.language}/hd3.png`, import.meta.url).href
})
const hd4 = computed(() => {
  return new URL(`./img/${appStore.language}/hd4.png`, import.meta.url).href
})
const uzi1 = computed(() => {
  return new URL(`./img/${appStore.language}/uzi1.png`, import.meta.url).href
})
const uzi2 = computed(() => {
  return new URL(`./img/${appStore.language}/uzi2.png`, import.meta.url).href
})
const uzi4 = computed(() => {
  return new URL(`./img/${appStore.language}/uzi4.png`, import.meta.url).href
})
</script>

<style lang="scss" scoped>
.sponsorDetail-content {
  .sponsorDetail-content-bg {
    // height: 600px;
    width: 100%;
    background-repeat: repeat-y;
    background-size: contain;
    padding-bottom: 20px;

    .sponsorDetail-content-top {
      width: 375px;
      height: auto;
      margin-bottom: 15px;
    }
    .sponsorDetail-content-min {
      position: relative;
      width: 355px;
      min-height: 500px;
      border-radius: 10px;
      background: #fff;
      margin: 10px auto;
      padding: 0 10px 20px 10px;
      .sponsorDetail-content-min-top {
        position: absolute;
        left: 50%;
        top: -9px;
        width: 310px;
        height: 48px;
        transform: translateX(-50%);
        text-align: center;
        line-height: 48px;
        color: #fff;
        font-size: 18px;
        font-weight: 600;
      }
      .sponsorDetail-content-min-img {
        width: 335px;
        height: 190px;
        margin: 40px auto 0;
      }
      .title {
        margin: 20px 0 11px 0;
        text-align: center;
        span {
          min-width: 120px;
          padding: 3px 5px;
          height: 24px;
          font-family: 'PingFang SC';
          line-height: 24px;
          background: #4eb6fd;
          color: #fff;
          font-size: 16px;
          font-weight: 600;
        }
      }
      .titles {
        background: #e19c43;
      }
      .text {
        width: 335px;
        color: var(--333, #333);
        font-size: 15px;
        font-style: normal;
        font-weight: 400;
        line-height: 23px;
      }
    }
    .sponsorDetail-content-footer-wrapper {
      margin: 20px auto;
      display: flex;
      justify-content: center;
      width: 100%;
      .sponsorDetail-content-footer {
        position: relative;
        width: 355px;
        min-height: 332px;
        border-radius: 10px;
        background: #fff;
        padding: 20px 10px;
        margin: 20px auto 0;
        .sponsorDetail-content-footer-top {
          position: absolute;
          left: 50%;
          top: -9px;
          width: 310px;
          height: 48px;
          transform: translateX(-50%);
          text-align: center;
          line-height: 48px;
          color: #fff;
          font-size: 18px;
          font-weight: 600;
        }
        .sponsorDetail-content-min-img {
          width: 335px;
          height: 190px;
          margin: 20px auto 20px;
        }
        .text {
          width: 335px;
          color: var(--333, #333);
          font-size: 15px;
          font-style: normal;
          font-weight: 400;
          line-height: 23px;
        }
        .sponsorDetail-content-footer-carousel {
          width: 335px;
          height: 196px;
          margin-top: 15px;
          .img {
            width: 335px;
            height: 196px;
          }
        }
        .sponsorDetail-content-footer-text {
          width: 335px;
          color: var(--333, #333);

          font-size: 15px;
          font-style: normal;
          font-weight: 400;
          line-height: 23px;
          margin-top: 10px;
        }
      }
    }
  }
}
</style>
