<template>
  <div class="third-box flex-column">
    <div class="top-box">
      <img :src="imgHandler" />
    </div>
    <div class="top-text">{{ $t('VentureInvest.tips_3') }}</div>

    <div class="bom-box">
      <div class="left-img">
        <img :src="appInfo" alt="" />
      </div>
      <div class="right-box">
        <div class="flex">
          <div class="flex-column">
            <div class="right-item-img">
              <img src="../img/Group34884.png" alt="" />
            </div>
            <div class="item-text">{{ $t('VentureInvest.MoreProfessional') }}</div>
          </div>
          <div class="flex-column">
            <div class="right-item-img">
              <img src="../img/Group348841.png" alt="" />
            </div>
            <div class="item-text">{{ $t('VentureInvest.MoreSecure') }}</div>
          </div>
          <div class="flex-column">
            <div class="right-item-img">
              <img src="../img/Group348842.png" alt="" />
            </div>
            <div class="item-text">{{ $t('VentureInvest.MoreConvenient') }}</div>
          </div>
          <div class="flex-column">
            <div class="right-item-img">
              <img src="../img/Group348843.png" alt="" />
            </div>
            <div class="item-text">{{ $t('VentureInvest.MoreStable') }}</div>
          </div>
        </div>
        <div class="right-bom">
          <div class="bom-item flex-column">
            <div class="item-img">
              <!-- <img src="../img/Rectangle46.png" alt="" /> -->
              <QrCode :link="downloadLink" :size="200" style="position: absolute" />
              <LogoIcon class="logo" />
            </div>
            <div class="itemr-text">{{ $t('VentureInvest.CSportsBettingAPP') }}</div>
          </div>
          <div class="bom-item flex-column">
            <div class="item-img">
              <QrCode :link="VITE_APP_AGENT_H5" :size="200" style="position: absolute" />
              <LogoIcon class="logo" />
            </div>
            <div class="itemr-text">{{ $t('VentureInvest.AgentH5Site') }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { downloadLink } from '@/utils/config'
import { useAppStore } from '@/stores/app'
const VITE_APP_AGENT_H5 = import.meta.env.VITE_APP_AGENT_H5
const appStore = useAppStore()
const imgHandler = computed(() => {
  return new URL(`../img/${appStore.language}/Group34867.png`, import.meta.url).href
})
const appInfo = new URL(`../img/${appStore.language}/appInfo.png`, import.meta.url).href
</script>
<style lang="scss" scoped>
@media screen and (max-width: 1450px) {
  .flex-column {
    zoom: 0.9;
  }
  .top-box {
    margin-top: 100px;
  }
}
.flex-column {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.flex {
  display: flex;
  justify-content: space-between;
}
img {
  width: 100%;
  height: 100%;
}
.third-box {
  padding-top: 70px;
  .top-box {
    height: 90px;
    max-width: 1440px;
  }
  .top-text {
    font-size: 26px;
    font-weight: 600;
    margin: 20px 0 43px 0;
  }
  .bom-box {
    display: flex;
    justify-content: center;
    .left-img {
      width: 575px;
      height: 582px;
      margin-right: 150px;
    }
    .right-box {
      width: 580px;
      padding-top: 62px;
      .right-item-img {
        width: 100px;
        height: 100px;
      }
      .item-text {
        font-size: 18px;
        line-height: 18px;
        font-weight: 400;
        margin-top: 10px;
      }
    }
    .right-bom {
      display: flex;
      justify-content: space-around;
      margin-top: 90px;
      .bom-item {
        .item-img {
          width: 210px;
          height: 210px;
          margin-bottom: 12px;
          position: relative;
          .logo {
            position: absolute;
            width: 35px;
            height: 35px;
            left: 50%;
            top: 50%;
            transform: translate3d(-50%, -50%, 0);
          }
        }
        .itemr-text {
          font-size: 20px;
          color: var(-----100, #fff);
          font-weight: 600;
          line-height: 26px;
        }
      }
    }
  }
}
</style>
