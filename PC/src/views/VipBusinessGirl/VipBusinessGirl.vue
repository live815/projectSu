<template>
  <div class="vipBusinessGirl">
    <img class="vipBusinessGirl-top" :src="imgTopComputed" />
    <div class="vipBusinessGirl-box">
      <div class="vipBusinessGirl-box-one">
        <div class="title">{{ $t('GeneralUserCenter.vipPrivilege') }}</div>
        <div class="text">
          <div class="text-item">
            {{ $t('GeneralUserCenter.vipPrivilegeTip1') }}
          </div>
          <div class="text-item" v-html="$t('GeneralUserCenter.vipPrivilegeTip2')"></div>
        </div>
      </div>
      <div class="vipBusinessGirl-box-two">
        <div class="title">{{ $t('GeneralUserCenter.flow') }}</div>
        <div class="min">
          <div class="min-item" v-for="item in flowList" :key="item.id">
            <img :src="item.img" />
          </div>
        </div>
      </div>
      <div class="vipBusinessGirl-box-three">
        <div class="title">{{ $t('GeneralUserCenter.vipModel') }}</div>
        <div class="vipBusinessGirl-box-three-carousel">
          <el-carousel class="el-carousel-box" :interval="5000" arrow="always" height="448px">
            <el-carousel-item v-for="item in listData" :key="item.id">
              <div class="el-carousel-items">
                <img :src="item.img" class="img" />
                <div class="vipBusinessGirl-box-three-text">
                  {{ item.text }}
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <div class="vipBusinessGirl-box-four">
        <div class="title">{{ $t('GeneralUserCenter.InteractionRule') }}</div>
        <div class="text">
          <p>{{ $t('GeneralUserCenter.InteractionRuleTip1') }}</p>
          <p>{{ $t('GeneralUserCenter.InteractionRuleTip2') }}</p>
          <p>{{ $t('GeneralUserCenter.InteractionRuleTip3') }}</p>
          <p>{{ $t('GeneralUserCenter.InteractionRuleTip4') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import { reactive } from 'vue'
import { useAppStore } from '@/stores/app'
const appStore = useAppStore()

const imgTopComputed = computed(() => {
  return new URL(`./img/${appStore.language}/imgTop.jpg`, import.meta.url).href
})

const listData = reactive([
  {
    id: 1,
    img: new URL('./img/img1.png', import.meta.url).href,
    text: i18n.global.t('GeneralUserCenter.vipModelTip1')
  },
  {
    id: 2,
    img: new URL('./img/img2.png', import.meta.url).href,
    text: i18n.global.t('GeneralUserCenter.vipModelTip2')
  },
  {
    id: 3,
    img: new URL('./img/img3.png', import.meta.url).href,
    text: i18n.global.t('GeneralUserCenter.vipModelTip3')
  },
  {
    id: 4,
    img: new URL('./img/img4.png', import.meta.url).href,
    text: i18n.global.t('GeneralUserCenter.vipModelTip4')
  },
  {
    id: 5,
    img: new URL('./img/img5.png', import.meta.url).href,
    text: i18n.global.t('GeneralUserCenter.vipModelTip5')
  },
  {
    id: 6,
    img: new URL('./img/img6.png', import.meta.url).href,
    text: i18n.global.t('GeneralUserCenter.vipModelTip6')
  },
  {
    id: 7,
    img: new URL('./img/img7.png', import.meta.url).href,
    text: i18n.global.t('GeneralUserCenter.vipModelTip7')
  },
  {
    id: 8,
    img: new URL('./img/img8.png', import.meta.url).href,
    text: i18n.global.t('GeneralUserCenter.vipModelTip8')
  },
  {
    id: 9,
    img: new URL('./img/img9.png', import.meta.url).href,
    text: i18n.global.t('GeneralUserCenter.vipModelTip9')
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
</script>
<style lang='scss' scoped>
.vipBusinessGirl {
  background: rgba(21, 21, 37, 0.8);
  margin: 0 -15px -20px -15px;
  font-family: ABeeZee;
  .vipBusinessGirl-top {
    width: 1920px;
    height: 500px;
  }

  .vipBusinessGirl-box {
    width: 1100px;
    height: 1138px;
    background: #121828;
    padding: 0px 32px;
    margin: 0 auto;
    overflow: hidden;
    .vipBusinessGirl-box-one,
    .vipBusinessGirl-box-two,
    .vipBusinessGirl-box-three,
    .vipBusinessGirl-box-four {
      .title {
        margin: 40px 0 20px 0;
        color: #fff;
        font-size: 22px;
        font-style: italic;
        font-weight: 400;
        line-height: normal;
      }
    }
    .vipBusinessGirl-box-one {
      .text {
        width: 670px;
        min-height: 48px;
        color: #bec7df;
        font-size: 14px;
        font-style: normal;
        line-height: 24px;
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
        justify-content: space-between;
        .min-item {
          width: 228px;
          height: 64px;
          border-radius: 6px;
          border: 1px solid #1d2845;
          background: linear-gradient(105deg, #131b2f 2.78%, #182035 94.15%);
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .vipBusinessGirl-box-three {
      .vipBusinessGirl-box-three-carousel {
        width: 1036px;
        height: 448px;
        margin: 20px auto 10px;
        :deep() {
          .el-carousel-box {
            .el-carousel__arrow--left,
            .el-carousel__arrow--right {
              opacity: 0.5;
              background-color: #000;
              .el-icon {
                font-size: 18px;
              }
            }
          }
        }
        .el-carousel-items {
          position: relative;
          width: 1036px;
          height: 448px;
          .img {
            width: 1036px;
            height: 448px;
          }
          .vipBusinessGirl-box-three-text {
            position: absolute;
            left: 30px;
            bottom: 50px;
            width: 600px;
            height: 72px;
            color: #e3e6d9;
            font-family: TencentSans;
            font-size: 28px;
            font-style: normal;
            font-weight: 700;
            line-height: 36px;
          }
        }
      }
    }

    .vipBusinessGirl-box-four {
      color: #bec7df;
      font-family: ABeeZee;
      text-align: justify;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 28px;
      .text {
        width: 573px;
        min-height: 112px;
      }
    }
  }
}
</style>
