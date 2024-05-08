<template>
  <div class="vipDedicatedManager">
    <NavBar
      :title="$t('Vletter.dedicatedManager')"
      v-if="!isCTYWebApp() && !isIOSPure() && !token"
      :isShowRight="false"
    />
    <img class="vipDedicatedManager-top" :src="ImgTopComputed" />
    <div class="vipDedicatedManager-box">
      <div class="vipDedicatedManager-box-item" v-for="item in listData" :key="item.id">
        <div class="vipDedicatedManager-box-item-left">
          <img :src="item.img" />
        </div>
        <div class="vipDedicatedManager-box-item-right">
          <div class="title">{{ item.title }}</div>
          <div class="text">
            <div>{{ $t('Vletter.individuality') }}:</div>
            <div class="span">{{ item.individuality }}</div>
          </div>
          <div class="text">
            <div>{{ $t('Vletter.wisdom') }}:</div>
            <div class="span">{{ item.wisdom }}</div>
          </div>
          <div class="text">
            <div>{{ $t('Vletter.birthday') }}:</div>
            <div class="span">{{ item.birthday }}</div>
          </div>
          <div class="text">
            <div>{{ $t('Vletter.hegihts') }}:</div>
            <div class="span">{{ item.hegiht }}</div>
          </div>
          <div class="text">
            <div>{{ $t('Vletter.weight') }}:</div>
            <div class="span">{{ item.weight }}</div>
          </div>
          <div class="text">
            <div>{{ $t('Vletter.constellation') }}:</div>
            <div class="span">{{ item.constellation }}</div>
          </div>
          <div class="text">
            <div>{{ $t('Vletter.interest') }}:</div>
            <div class="span">{{ item.interest }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import NavBar from '@/components/NavBar/NavBar.vue'
import { computed, reactive } from 'vue'
import { useAppStore } from '@/stores/app'
import { isCTYWebApp, isIOSPure } from '@/utils'
import { useMobileEvent } from '@/hooks/useMobileEvent'
const { token } = useMobileEvent()

const appStore = useAppStore()

const ImgTopComputed = computed(() => {
  return new URL(`./img/${appStore.language}/imgTop.png`, import.meta.url).href
})
const listData = reactive([
  {
    id: 1,
    img: new URL('./img/img1.png', import.meta.url).href,
    title: i18n.global.t('Vletter.nameTip1'),
    individuality: i18n.global.t('Vletter.individualityTip1'),
    wisdom: i18n.global.t('Vletter.wisdomTip1'),
    birthday: i18n.global.t('Vletter.birthdayTip1'),
    hegiht: i18n.global.t('Vletter.heightsTip1'),
    weight: i18n.global.t('Vletter.weightTip1'),
    constellation: i18n.global.t('Vletter.constellationTip1'),
    interest: i18n.global.t('Vletter.interestTip1')
  },
  {
    id: 2,
    img: new URL('./img/img2.png', import.meta.url).href,
    title: i18n.global.t('Vletter.nameTip2'),
    individuality: i18n.global.t('Vletter.individualityTip2'),
    wisdom: i18n.global.t('Vletter.wisdomTip2'),
    birthday: i18n.global.t('Vletter.birthdayTip2'),
    hegiht: i18n.global.t('Vletter.heightsTip2'),
    weight: i18n.global.t('Vletter.weightTip2'),
    constellation: i18n.global.t('Vletter.constellationTip2'),
    interest: i18n.global.t('Vletter.interestTip2')
  },
  {
    id: 3,
    img: new URL('./img/img3.png', import.meta.url).href,
    title: i18n.global.t('Vletter.nameTip3'),
    individuality: i18n.global.t('Vletter.individualityTip3'),
    wisdom: i18n.global.t('Vletter.wisdomTip3'),
    birthday: i18n.global.t('Vletter.birthdayTip3'),
    hegiht: i18n.global.t('Vletter.heightsTip3'),
    weight: i18n.global.t('Vletter.weightTip3'),
    constellation: i18n.global.t('Vletter.constellationTip3'),
    interest: i18n.global.t('Vletter.interestTip3')
  },
  {
    id: 4,
    img: new URL('./img/img4.png', import.meta.url).href,
    title: i18n.global.t('Vletter.nameTip4'),
    individuality: i18n.global.t('Vletter.individualityTip4'),
    wisdom: i18n.global.t('Vletter.wisdomTip4'),
    birthday: i18n.global.t('Vletter.birthdayTip4'),
    hegiht: i18n.global.t('Vletter.heightsTip4'),
    weight: i18n.global.t('Vletter.weightTip4'),
    constellation: i18n.global.t('Vletter.constellationTip4'),
    interest: i18n.global.t('Vletter.interestTip4')
  },
  {
    id: 5,
    img: new URL('./img/img5.png', import.meta.url).href,
    title: i18n.global.t('Vletter.nameTip5'),
    individuality: i18n.global.t('Vletter.individualityTip5'),
    wisdom: i18n.global.t('Vletter.wisdomTip5'),
    birthday: i18n.global.t('Vletter.birthdayTip5'),
    hegiht: i18n.global.t('Vletter.heightsTip5'),
    weight: i18n.global.t('Vletter.weightTip5'),
    constellation: i18n.global.t('Vletter.constellationTip5'),
    interest: i18n.global.t('Vletter.interestTip5')
  },
  {
    id: 6,
    img: new URL('./img/img6.png', import.meta.url).href,
    title: i18n.global.t('Vletter.nameTip6'),
    individuality: i18n.global.t('Vletter.individualityTip6'),
    wisdom: i18n.global.t('Vletter.wisdomTip6'),
    birthday: i18n.global.t('Vletter.birthdayTip6'),
    hegiht: i18n.global.t('Vletter.heightsTip6'),
    weight: i18n.global.t('Vletter.weightTip6'),
    constellation: i18n.global.t('Vletter.constellationTip6'),
    interest: i18n.global.t('Vletter.interestTip6')
  },
  {
    id: 7,
    img: new URL('./img/img7.png', import.meta.url).href,
    title: i18n.global.t('Vletter.nameTip7'),
    individuality: i18n.global.t('Vletter.individualityTip7'),
    wisdom: i18n.global.t('Vletter.wisdomTip7'),
    birthday: i18n.global.t('Vletter.birthdayTip7'),
    hegiht: i18n.global.t('Vletter.heightsTip7'),
    weight: i18n.global.t('Vletter.weightTip7'),
    constellation: i18n.global.t('Vletter.constellationTip7'),
    interest: i18n.global.t('Vletter.interestTip7')
  },
  {
    id: 8,
    img: new URL('./img/img8.png', import.meta.url).href,
    title: i18n.global.t('Vletter.nameTip8'),
    individuality: i18n.global.t('Vletter.individualityTip8'),
    wisdom: i18n.global.t('Vletter.wisdomTip8'),
    birthday: i18n.global.t('Vletter.birthdayTip8'),
    hegiht: i18n.global.t('Vletter.heightsTip8'),
    weight: i18n.global.t('Vletter.weightTip8'),
    constellation: i18n.global.t('Vletter.constellationTip8'),
    interest: i18n.global.t('Vletter.interestTip8')
  },
  {
    id: 9,
    img: new URL('./img/img9.png', import.meta.url).href,
    title: i18n.global.t('Vletter.nameTip9'),
    individuality: i18n.global.t('Vletter.individualityTip9'),
    wisdom: i18n.global.t('Vletter.wisdomTip9'),
    birthday: i18n.global.t('Vletter.birthdayTip9'),
    hegiht: i18n.global.t('Vletter.heightsTip9'),
    weight: i18n.global.t('Vletter.weightTip9'),
    constellation: i18n.global.t('Vletter.constellationTip9'),
    interest: i18n.global.t('Vletter.interestTip9')
  },
  {
    id: 10,
    img: new URL('./img/img10.png', import.meta.url).href,
    title: i18n.global.t('Vletter.nameTip10'),
    individuality: i18n.global.t('Vletter.individualityTip10'),
    wisdom: i18n.global.t('Vletter.wisdomTip10'),
    birthday: i18n.global.t('Vletter.birthdayTip10'),
    hegiht: i18n.global.t('Vletter.heightsTip10'),
    weight: i18n.global.t('Vletter.weightTip10'),
    constellation: i18n.global.t('Vletter.constellationTip10'),
    interest: i18n.global.t('Vletter.interestTip10')
  },
  {
    id: 11,
    img: new URL('./img/img11.png', import.meta.url).href,
    title: i18n.global.t('Vletter.nameTip11'),
    individuality: i18n.global.t('Vletter.individualityTip11'),
    wisdom: i18n.global.t('Vletter.wisdomTip11'),
    birthday: i18n.global.t('Vletter.birthdayTip11'),
    hegiht: i18n.global.t('Vletter.heightsTip11'),
    weight: i18n.global.t('Vletter.weightTip11'),
    constellation: i18n.global.t('Vletter.constellationTip11'),
    interest: i18n.global.t('Vletter.interestTip11')
  },
  {
    id: 12,
    img: new URL('./img/img12.png', import.meta.url).href,
    title: i18n.global.t('Vletter.nameTip12'),
    individuality: i18n.global.t('Vletter.individualityTip12'),
    wisdom: i18n.global.t('Vletter.wisdomTip12'),
    birthday: i18n.global.t('Vletter.birthdayTip12'),
    hegiht: i18n.global.t('Vletter.heightsTip12'),
    weight: i18n.global.t('Vletter.weightTip12'),
    constellation: i18n.global.t('Vletter.constellationTip12'),
    interest: i18n.global.t('Vletter.interestTip12')
  }
])
</script>
<style lang='scss' scoped>
.vipDedicatedManager {
  background: #0d0f1c;
  .vipDedicatedManager-top {
    width: 375px;
    height: 110px;
  }
  .vipDedicatedManager-box {
    height: 100%;
    overflow: auto;
    padding: 10px;

    .vipDedicatedManager-box-item {
      display: flex;
      width: 345px;
      align-items: center;
      min-height: 220px;
      flex-shrink: 0;
      margin: 10px auto;
      border-radius: 6px;
      border: 1px solid #1d2845;
      background: linear-gradient(105deg, #131b2f 2.78%, #182035 94.15%);
      .vipDedicatedManager-box-item-left {
        margin-top: 15px;
        margin-left: 10px;
        width: 150px;
        height: 200px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .vipDedicatedManager-box-item-right {
        .title {
          color: #fff;
          font-weight: 500;
          font-size: 18px;
          margin: 24px 0 4px 10px;
        }
        .text {
          display: flex;
          color: #6a7897;
          font-size: 12px;
          line-height: normal;
          width: 192px;
          margin: 6px 0 6px 10px;
          white-space: nowrap;
          .span {
            color: #bec7df;
            width: 160px;
            margin-left: 3px;
            white-space: normal;
          }
        }
      }
    }
  }
}
</style>
