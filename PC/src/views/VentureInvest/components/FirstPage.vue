<template>
  <div class="big-content flex">
    <div class="item-left flex-column">
      <div class="top-title">
        <img :src="titleBg" alt="" />
      </div>
      <div class="top-two">{{ $t('VentureInvest.tips_1') }}</div>
      <div class="top-three flex-two">
        <div class="little-box" v-for="(item, index) in subList" :key="index">
          <div class="little-img">
            <img :src="item.imgpath" alt="" />
          </div>
          <div>
            <div class="font18-c mg-bom8">{{ item.title }}</div>
            <div class="font10">{{ item.text }}</div>
          </div>
        </div>
      </div>
      <div class="top-four flex-two" v-if="appStore.language == 'zh-cn'">
        <div class="mid-box flex-column" v-for="(itemr, index) in connectList" :key="index">
          <div class="mid-img mg-bom8">
            <img :src="itemr.imgpath" />
          </div>
          <div class="title-mid">{{ itemr.title1 }}</div>
          <div class="font18 mg-bom17">{{ itemr.title2 }}</div>
          <div
            class="bom-btn consult-btn"
            style="position: relative"
            @click="goBtn(index)"
            @mouseleave="showChannels2 = false"
            v-if="itemr.title3.length == 1"
          >
            {{ $t('VentureInvest.Consult') }}
            <CSChannels :isServicePop="showChannels2" style="top: 35px; left: -30px" />
          </div>
          <div class="btn-box flex-two" v-else>
            <div class="bom-btn consult-btn" @click="goBtn(index)">
              {{ $t('VentureInvest.Consult') }}
            </div>
            <div class="bom-btn copy-btn" v-clipboard="itemr.title2">
              {{ $t('VentureInvest.Copy') }}
            </div>
          </div>
        </div>
      </div>
      <div
        class="top-five font18"
        @mouseleave="showChannels = false"
        @click="showChannels = !showChannels"
      >
        <CSChannels :isServicePop="showChannels" style="top: -95px; left: 80px" />
        {{ $t('VentureInvest.JoinUs') }}
      </div>
    </div>
    <div class="item-right">
      <img src="../img/Group348661.png" alt="" />
    </div>
  </div>
</template>
<script setup>
import { useAppStore } from '@/stores/app'
import vClipboard from '@/directives/clipboard'
import CSChannels from '@/components/CSChannels'
import i18n from '@/i18n'

const appStore = useAppStore()
const showChannels = ref(false)
const showChannels2 = ref(false)
const titleBg = new URL(`../img/${appStore.language}/biglogo2x.png`, import.meta.url).href
const subList = ref([
  {
    imgpath: new URL('@/views/VentureInvest/img/title_1.png', import.meta.url).href,
    title: i18n.global.t('VentureInvest.title_1'),
    text: i18n.global.t('VentureInvest.title_7')
  },
  {
    imgpath: new URL('@/views/VentureInvest/img/title_2.png', import.meta.url).href,
    title: i18n.global.t('VentureInvest.title_5'),
    text: i18n.global.t('VentureInvest.title_7')
  },
  {
    imgpath: new URL('@/views/VentureInvest/img/title_3.png', import.meta.url).href,
    title: i18n.global.t('VentureInvest.title_6'),
    text: i18n.global.t('VentureInvest.title_7')
  }
])
const connectList = ref([
  {
    imgpath: new URL('@/views/VentureInvest/img/daili2x.png', import.meta.url).href,
    title1: i18n.global.t('VentureInvest.title_2'),
    title2: i18n.global.t('VentureInvest.title_3'),
    title3: [{ name: i18n.global.t('VentureInvest.title_4') }]
  },
  {
    imgpath: new URL('@/views/VentureInvest/img/whatsapp2x.png', import.meta.url).href,

    title1: i18n.global.t('VentureInvest.Whatsapp'),
    title2: 's8gcyd',
    title3: [
      { name: i18n.global.t('VentureInvest.title_4') },
      { name: i18n.global.t('VentureInvest.Copy') }
    ]
  },
  {
    imgpath: new URL('@/views/VentureInvest/img/telegram2x.png', import.meta.url).href,
    title1: i18n.global.t('VentureInvest.Telegram'),
    title2: '@vtyzsdl',
    title3: [
      { name: i18n.global.t('VentureInvest.title_4') },
      { name: i18n.global.t('VentureInvest.Copy') }
    ]
  }
])
const goBtn = (index) => {
  if (index == 2) {
    window.open('https://t.me/vtyzsdl', '_blank')
  } else if (index == 1) {
    window.open('https://66chat1.com', '_blank')
  } else {
    showChannels2.value = !showChannels2.value
  }
}
</script>
<style lang="scss" scoped>
@media screen and (max-width: 1450px) {
  .big-content {
    zoom: 0.9;
    padding: 0;
  }
  .item-right {
    margin-top: 70px;
  }
  .item-left {
    padding-top: 0 !important;
    // margin-left: 220px;
  }
}
img {
  width: 100%;
  height: 100%;
}
.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
.flex-two {
  display: flex;
  justify-content: space-between;
}
.flex-column {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.font18-c {
  font-size: 18px !important;
  font-weight: 600;
}
.font18 {
  font-size: 18px;
}
.font10 {
  font-size: 10px !important;
}
.mg-bom8 {
  margin-bottom: 8px;
}
.mg-bom17 {
  margin-bottom: 17px;
}
.big-content {
  padding: 50px 0px 0 0;
}
.item-left {
  width: 760px;
  padding-top: 79px;
  margin-right: 73px;
  .top-title {
    width: 564px;
  }
  .top-two {
    width: 520px;
    font-size: 26px;
    font-style: normal;
    font-weight: 600;
    line-height: 45px;
    margin: 20px 0 30px 0;
  }
  .top-three {
    width: 100%;
    .little-box {
      display: flex;
      align-items: center;
      .little-img {
        width: 56px;
        height: 56px;
        margin-right: 8px;
      }
    }
  }
  .top-four {
    width: 676px;
    margin: 60px 0 0 0;
    .mid-box {
      width: 172px;
      height: 190px;
      padding: 18px 16px 21px 16px;
      background: linear-gradient(180deg, rgba(147, 88, 75, 0.5) 0%, rgba(44, 24, 15, 0.5) 100%);
      border-radius: 10px;
      border: 4px solid rgba(197, 121, 104, 0.5);
      .mid-img {
        width: 39px;
        height: 39px;
      }
      .title-mid {
        font-size: 14px;
        color: var(-----60, rgba(255, 255, 255, 0.6));
        margin-bottom: 10px;
      }
      .btn-box {
        width: 140px;
      }
      .bom-btn {
        width: 64px;
        height: 32px;
        line-height: 30px;
        border-radius: 90px;
        font-size: 12px;
        line-height: 32px;
        text-align: center;
        cursor: pointer;
      }
      .consult-btn {
        background: var(-----, #f35f1b);
      }
      .copy-btn {
        color: var(-----, #f35f1b);
        border: 1px solid var(-----, #f35f1b);
      }
    }
  }
  .top-five {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 274px;
    height: 55px;
    padding: 10px;
    text-align: center;
    border-radius: 200px;
    border: 1px solid #ffce95;
    border-radius: 200px;
    background: var(-----, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
    font-weight: 500;
    margin-top: 60px;
    cursor: pointer;
    position: relative;
  }
}
.item-right {
  width: 652px;
}
</style>
