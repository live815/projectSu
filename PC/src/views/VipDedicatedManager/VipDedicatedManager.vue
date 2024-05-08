<template>
  <div class="vipDedicatedManager">
    <img class="vipDedicatedManager-top" :src="ImgTopComputed" />
    <div class="vipDedicatedManager-box">
      <div class="vipDedicatedManager-box-item" v-for="item in listData" :key="item.id">
        <div class="vipDedicatedManager-box-item-left">
          <img :src="item.img" />
        </div>
        <div class="vipDedicatedManager-box-item-right">
          <div class="title">{{ item.title }}</div>
          <div class="text">
            <div>{{ $t('GeneralUserCenter.individuality') }}:</div>
            <div class="span">{{ item.individuality }}</div>
          </div>
          <div class="text">
            <div>{{ $t('GeneralUserCenter.wisdom') }}:</div>
            <div class="span">{{ item.wisdom }}</div>
          </div>
          <div class="text">
            <div>{{ $t('GeneralUserCenter.birthday') }}:</div>
            <div class="span">{{ item.birthday }}</div>
          </div>
          <div class="text">
            <div>{{ $t('GeneralUserCenter.hegihts') }}:</div>
            <div class="span">{{ item.hegiht }}</div>
          </div>
          <div class="text">
            <div>{{ $t('GeneralUserCenter.weight') }}:</div>
            <div class="span">{{ item.weight }}</div>
          </div>
          <div class="text">
            <div>{{ $t('GeneralUserCenter.constellation') }}:</div>
            <div class="span">{{ item.constellation }}</div>
          </div>
          <div class="text">
            <div>{{ $t('GeneralUserCenter.interest') }}:</div>
            <div class="span">{{ item.interest }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import { computed, reactive } from 'vue'
import { useAppStore } from '@/stores/app'
const appStore = useAppStore()

const ImgTopComputed = computed(() => {
  return new URL(`./img/${appStore.language}/imgTop.jpg`, import.meta.url).href
})
const listData = reactive([
  {
    id: 1,
    img: new URL('./img/img1.png', import.meta.url).href,
    title: i18n.global.t('GeneralUserCenter.nameTip1'),
    individuality: i18n.global.t('GeneralUserCenter.individualityTip1'),
    wisdom: i18n.global.t('GeneralUserCenter.wisdomTip1'),
    birthday: i18n.global.t('GeneralUserCenter.birthdayTip1'),
    hegiht: i18n.global.t('GeneralUserCenter.heightsTip1'),
    weight: i18n.global.t('GeneralUserCenter.weightTip1'),
    constellation: i18n.global.t('GeneralUserCenter.constellationTip1'),
    interest: i18n.global.t('GeneralUserCenter.interestTip1')
  },
  {
    id: 2,
    img: new URL('./img/img2.png', import.meta.url).href,
    title: i18n.global.t('GeneralUserCenter.nameTip2'),
    individuality: i18n.global.t('GeneralUserCenter.individualityTip2'),
    wisdom: i18n.global.t('GeneralUserCenter.wisdomTip2'),
    birthday: i18n.global.t('GeneralUserCenter.birthdayTip2'),
    hegiht: i18n.global.t('GeneralUserCenter.heightsTip2'),
    weight: i18n.global.t('GeneralUserCenter.weightTip2'),
    constellation: i18n.global.t('GeneralUserCenter.constellationTip2'),
    interest: i18n.global.t('GeneralUserCenter.interestTip2')
  },
  {
    id: 3,
    img: new URL('./img/img3.png', import.meta.url).href,
    title: i18n.global.t('GeneralUserCenter.nameTip3'),
    individuality: i18n.global.t('GeneralUserCenter.individualityTip3'),
    wisdom: i18n.global.t('GeneralUserCenter.wisdomTip3'),
    birthday: i18n.global.t('GeneralUserCenter.birthdayTip3'),
    hegiht: i18n.global.t('GeneralUserCenter.heightsTip3'),
    weight: i18n.global.t('GeneralUserCenter.weightTip3'),
    constellation: i18n.global.t('GeneralUserCenter.constellationTip3'),
    interest: i18n.global.t('GeneralUserCenter.interestTip3')
  },
  {
    id: 4,
    img: new URL('./img/img4.png', import.meta.url).href,
    title: i18n.global.t('GeneralUserCenter.nameTip4'),
    individuality: i18n.global.t('GeneralUserCenter.individualityTip4'),
    wisdom: i18n.global.t('GeneralUserCenter.wisdomTip4'),
    birthday: i18n.global.t('GeneralUserCenter.birthdayTip4'),
    hegiht: i18n.global.t('GeneralUserCenter.heightsTip4'),
    weight: i18n.global.t('GeneralUserCenter.weightTip4'),
    constellation: i18n.global.t('GeneralUserCenter.constellationTip4'),
    interest: i18n.global.t('GeneralUserCenter.interestTip4')
  },
  {
    id: 5,
    img: new URL('./img/img5.png', import.meta.url).href,
    title: i18n.global.t('GeneralUserCenter.nameTip5'),
    individuality: i18n.global.t('GeneralUserCenter.individualityTip5'),
    wisdom: i18n.global.t('GeneralUserCenter.wisdomTip5'),
    birthday: i18n.global.t('GeneralUserCenter.birthdayTip5'),
    hegiht: i18n.global.t('GeneralUserCenter.heightsTip5'),
    weight: i18n.global.t('GeneralUserCenter.weightTip5'),
    constellation: i18n.global.t('GeneralUserCenter.constellationTip5'),
    interest: i18n.global.t('GeneralUserCenter.interestTip5')
  },
  {
    id: 6,
    img: new URL('./img/img6.png', import.meta.url).href,
    title: i18n.global.t('GeneralUserCenter.nameTip6'),
    individuality: i18n.global.t('GeneralUserCenter.individualityTip6'),
    wisdom: i18n.global.t('GeneralUserCenter.wisdomTip6'),
    birthday: i18n.global.t('GeneralUserCenter.birthdayTip6'),
    hegiht: i18n.global.t('GeneralUserCenter.heightsTip6'),
    weight: i18n.global.t('GeneralUserCenter.weightTip6'),
    constellation: i18n.global.t('GeneralUserCenter.constellationTip6'),
    interest: i18n.global.t('GeneralUserCenter.interestTip6')
  },
  {
    id: 7,
    img: new URL('./img/img7.png', import.meta.url).href,
    title: i18n.global.t('GeneralUserCenter.nameTip7'),
    individuality: i18n.global.t('GeneralUserCenter.individualityTip7'),
    wisdom: i18n.global.t('GeneralUserCenter.wisdomTip7'),
    birthday: i18n.global.t('GeneralUserCenter.birthdayTip7'),
    hegiht: i18n.global.t('GeneralUserCenter.heightsTip7'),
    weight: i18n.global.t('GeneralUserCenter.weightTip7'),
    constellation: i18n.global.t('GeneralUserCenter.constellationTip7'),
    interest: i18n.global.t('GeneralUserCenter.interestTip7')
  },
  {
    id: 8,
    img: new URL('./img/img8.png', import.meta.url).href,
    title: i18n.global.t('GeneralUserCenter.nameTip8'),
    individuality: i18n.global.t('GeneralUserCenter.individualityTip8'),
    wisdom: i18n.global.t('GeneralUserCenter.wisdomTip8'),
    birthday: i18n.global.t('GeneralUserCenter.birthdayTip8'),
    hegiht: i18n.global.t('GeneralUserCenter.heightsTip8'),
    weight: i18n.global.t('GeneralUserCenter.weightTip8'),
    constellation: i18n.global.t('GeneralUserCenter.constellationTip8'),
    interest: i18n.global.t('GeneralUserCenter.interestTip8')
  },
  {
    id: 9,
    img: new URL('./img/img9.png', import.meta.url).href,
    title: i18n.global.t('GeneralUserCenter.nameTip9'),
    individuality: i18n.global.t('GeneralUserCenter.individualityTip9'),
    wisdom: i18n.global.t('GeneralUserCenter.wisdomTip9'),
    birthday: i18n.global.t('GeneralUserCenter.birthdayTip9'),
    hegiht: i18n.global.t('GeneralUserCenter.heightsTip9'),
    weight: i18n.global.t('GeneralUserCenter.weightTip9'),
    constellation: i18n.global.t('GeneralUserCenter.constellationTip9'),
    interest: i18n.global.t('GeneralUserCenter.interestTip9')
  },
  {
    id: 10,
    img: new URL('./img/img10.png', import.meta.url).href,
    title: i18n.global.t('GeneralUserCenter.nameTip10'),
    individuality: i18n.global.t('GeneralUserCenter.individualityTip10'),
    wisdom: i18n.global.t('GeneralUserCenter.wisdomTip10'),
    birthday: i18n.global.t('GeneralUserCenter.birthdayTip10'),
    hegiht: i18n.global.t('GeneralUserCenter.heightsTip10'),
    weight: i18n.global.t('GeneralUserCenter.weightTip10'),
    constellation: i18n.global.t('GeneralUserCenter.constellationTip10'),
    interest: i18n.global.t('GeneralUserCenter.interestTip10')
  },
  {
    id: 11,
    img: new URL('./img/img11.png', import.meta.url).href,
    title: i18n.global.t('GeneralUserCenter.nameTip11'),
    individuality: i18n.global.t('GeneralUserCenter.individualityTip11'),
    wisdom: i18n.global.t('GeneralUserCenter.wisdomTip11'),
    birthday: i18n.global.t('GeneralUserCenter.birthdayTip11'),
    hegiht: i18n.global.t('GeneralUserCenter.heightsTip11'),
    weight: i18n.global.t('GeneralUserCenter.weightTip11'),
    constellation: i18n.global.t('GeneralUserCenter.constellationTip11'),
    interest: i18n.global.t('GeneralUserCenter.interestTip11')
  },
  {
    id: 12,
    img: new URL('./img/img12.png', import.meta.url).href,
    title: i18n.global.t('GeneralUserCenter.nameTip12'),
    individuality: i18n.global.t('GeneralUserCenter.individualityTip12'),
    wisdom: i18n.global.t('GeneralUserCenter.wisdomTip12'),
    birthday: i18n.global.t('GeneralUserCenter.birthdayTip12'),
    hegiht: i18n.global.t('GeneralUserCenter.heightsTip12'),
    weight: i18n.global.t('GeneralUserCenter.weightTip12'),
    constellation: i18n.global.t('GeneralUserCenter.constellationTip12'),
    interest: i18n.global.t('GeneralUserCenter.interestTip12')
  }
])
</script>
<style lang='scss' scoped>
@media screen and (max-width: 1920px){
  .vipDedicatedManager-top{
    min-height: 450px !important;
  }
  
}
.vipDedicatedManager {
  background: rgba(21, 21, 37, 0.8);
  margin: 0 -15px -20px -15px;
  .vipDedicatedManager-top {
    // min-width: 1920px;
    width: 100%;
    min-height: 500px;
  }
  .vipDedicatedManager-box {
    width: 1100px;
    min-height: 1846px;
    padding: 22px;
    background: #121828;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 0 auto;
    .vipDedicatedManager-box-item {
      display: flex;
      align-items: center;
      width: 506px;
      min-height: 277px;
      flex-shrink: 0;
      margin: 10px auto;
      border-radius: 6px;
      border: 1px solid #1d2845;
      background: linear-gradient(105deg, #131b2f 2.78%, #182035 94.15%);
      .vipDedicatedManager-box-item-left {
        margin-top: 15px;
        margin-left: 10px;
        width: 206px;
        height: 258px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .vipDedicatedManager-box-item-right {
        .title {
          color: #fff;
          font-family: ABeeZee;
          font-size: 22px;
          font-style: italic;
          font-weight: 400;
          margin: 30px 0 10px 20px;
        }
        .text {
          display: flex;
          color: #bec7df;
          font-size: 12px;
          line-height: normal;
          margin: 10px 0 10px 20px;
          .span {
            color: #bec7df;
            width: 180px;
            margin-left: 3px;
            line-height: normal;
          }
        }
      }
    }
  }
}
</style>
