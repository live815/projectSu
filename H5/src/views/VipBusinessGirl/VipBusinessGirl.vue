<template>
  <div class="vipBusinessGirl">
    <NavBar
      :title="$t('Vletter.BusinessGirl')"
      v-if="!isCTYWebApp() && !isIOSPure() && !token"
      :isShowRight="false"
    />
    <img class="vipBusinessGirl-top" :src="imgTopComputed" />
    <div class="vipBusinessGirl-box">
      <div class="vipBusinessGirl-box-one">
        <div class="title">{{ $t('Vletter.vipPrivilege') }}</div>
        <div class="text">
          <div class="text-item">
            {{ $t('Vletter.vipPrivilegeTip1') }}
          </div>
          <div
            class="text-item"
            style="white-space: nowrap"
            v-html="$t('Vletter.vipPrivilegeTip2')"
          ></div>
        </div>
      </div>
      <div class="vipBusinessGirl-box-two">
        <div class="title">{{ $t('Vletter.flow') }}</div>
        <div class="min">
          <div class="min-item" v-for="item in flowList" :key="item.id">
            <img :src="item.img" />
          </div>
        </div>
      </div>
      <div class="vipBusinessGirl-box-three">
        <div class="title">{{ $t('Vletter.vipModel') }}</div>
        <div class="vipBusinessGirl-box-three-carousel">
          <van-swipe
            :autoplay="5000"
            indicator-color="white"
            :initial-swipe="index"
            @change="onChange"
          >
            <van-swipe-item v-for="item in listData" :key="item.id">
              <img :src="item.img" class="img"
            /></van-swipe-item>
          </van-swipe>
        </div>
        <div class="vipBusinessGirl-box-three-text">
          {{ listData[index].text }}
        </div>
      </div>
      <div class="vipBusinessGirl-box-four">
        <div class="title">{{ $t('Vletter.InteractionRule') }}</div>
        <div class="text">
          <p>{{ $t('Vletter.InteractionRuleTip1') }}</p>
          <p>{{ $t('Vletter.InteractionRuleTip2') }}</p>
          <p>{{ $t('Vletter.InteractionRuleTip3') }}</p>
          <p>{{ $t('Vletter.InteractionRuleTip4') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import NavBar from '@/components/NavBar/NavBar.vue'
import { reactive } from 'vue'
import { isCTYWebApp, isIOSPure } from '@/utils'
import { useAppStore } from '@/stores/app'
import { useMobileEvent } from '@/hooks/useMobileEvent'
const { token } = useMobileEvent()

const appStore = useAppStore()

const imgTopComputed = computed(() => {
  return new URL(`./img/${appStore.language}/imgTop.png`, import.meta.url).href
})
const index = ref(0)

const listData = reactive([
  {
    id: 1,
    img: new URL('./img/img1.png', import.meta.url).href,
    text: i18n.global.t('Vletter.vipModelTip1')
  },
  {
    id: 2,
    img: new URL('./img/img2.png', import.meta.url).href,
    text: i18n.global.t('Vletter.vipModelTip2')
  },
  {
    id: 3,
    img: new URL('./img/img3.png', import.meta.url).href,
    text: i18n.global.t('Vletter.vipModelTip3')
  },
  {
    id: 4,
    img: new URL('./img/img4.png', import.meta.url).href,
    text: i18n.global.t('Vletter.vipModelTip4')
  },
  {
    id: 5,
    img: new URL('./img/img5.png', import.meta.url).href,
    text: i18n.global.t('Vletter.vipModelTip5')
  },
  {
    id: 6,
    img: new URL('./img/img6.png', import.meta.url).href,
    text: i18n.global.t('Vletter.vipModelTip6')
  },
  {
    id: 7,
    img: new URL('./img/img7.png', import.meta.url).href,
    text: i18n.global.t('Vletter.vipModelTip7')
  },
  {
    id: 8,
    img: new URL('./img/img8.png', import.meta.url).href,
    text: i18n.global.t('Vletter.vipModelTip8')
  },
  {
    id: 9,
    img: new URL('./img/img9.png', import.meta.url).href,
    text: i18n.global.t('Vletter.vipModelTip9')
  }
])

const flowList = reactive([
  {
    id: 1,
    img: new URL(`./img/${appStore.language}/flow1.png`, import.meta.url).href
  },
  {
    id: 2,
    img: new URL(`./img/${appStore.language}/flow2.png`, import.meta.url).href
  },
  {
    id: 3,
    img: new URL(`./img/${appStore.language}/flow3.png`, import.meta.url).href
  },
  {
    id: 4,
    img: new URL(`./img/${appStore.language}/flow4.png`, import.meta.url).href
  }
])

const onChange = (val) => {
  index.value = val
}
</script>
<style lang='scss' scoped>
.vipBusinessGirl {
  background: #0d0f1c;
  .vipBusinessGirl-top {
    width: 375px;
    height: 110px;
  }

  .vipBusinessGirl-box {
    height: 100%;
    overflow: auto;
    padding: 10px;
    .vipBusinessGirl-box-one,
    .vipBusinessGirl-box-two,
    .vipBusinessGirl-box-three,
    .vipBusinessGirl-box-four {
      .title {
        margin: 10px 0 12px 5px;
        color: #fff;
        font-family: PingFang SC;
        font-size: 18px;
        font-weight: 500;
      }
    }
    .vipBusinessGirl-box-one {
      .text {
        width: 345px;
        min-height: 72px;
        color: #bec7df;
        font-family: PingFang SC;
        font-size: 14px;
        font-style: normal;
        line-height: 24px;
        margin: 0 auto;
        .text-item {
          display: flex;
          // margin-left: 5px;
        }
      }
    }
    .vipBusinessGirl-box-two {
      .min {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        .min-item {
          width: 155px;
          height: 46px;
          margin: 7px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .vipBusinessGirl-box-three {
      .vipBusinessGirl-box-three-carousel {
        width: 320px;
        height: 136px;
        margin: 20px auto 10px;
        .img {
          width: 320px;
          height: 136px;
        }
      }
      .vipBusinessGirl-box-three-text {
        width: 300px;
        height: 60px;
        color: #e3e6d9;
        text-align: center;
        font-family: TencentSans;
        font-size: 15px;
        font-style: normal;
        font-weight: 700;
        line-height: 20px;
        margin: 0 auto;
      }
    }

    .vipBusinessGirl-box-four {
      color: #bec7df;
      text-align: justify;
      font-family: 'PingFang SC';
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 26px;
      .text {
        width: 345px;
        min-height: 130px;
        margin: 0 auto;
      }
    }
  }
}
</style>
