<template>
  <div class="boxApp">
    <div class="leftDiv">
      <img :src="leftBg" />
    </div>
    <div class="rightDiv">
      <div class="title">{{ $t('AppDownload.tip1') }}</div>
      <div class="appDiv">
        <div class="appBg">
          <QrCode :link="downloadLink" :size="200" style="position: absolute" />
          <img class="cFrame" :src="Cpng" alt="" />
          <!-- <template v-if="!user.isLogin">
            <div class="mask"></div>
            <button class="login" @click="login">{{ $t('Components.GoToLogin') }}</button>
          </template> -->
        </div>
        <div class="txt">
          <div class="t1">{{ $t('AppDownload.tip2') }}</div>
          <div class="t2">{{ $t('AppDownload.tip3') }}</div>
          <div class="t3">iOS & Android</div>
        </div>
      </div>
      <div class="imgCard">
        <div class="card" v-for="item in cardList" :key="item.id">
          <div class="cardTitle">
            <span>{{ item.title }}</span>
          </div>
          <div class="imgBg"><img :src="item.img" /></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { downloadLink } from '@/utils/config'
import QrCode from '@/components/QrCode/QrCode.vue'
import { reactive } from 'vue'
import i18n from '@/i18n'
import { useAppStore } from '@/stores/app'
import { useUserStore } from '@/stores/user.js'
const appStore = useAppStore()
const user = useUserStore()
const Cpng = new URL(`../../assets/img/${appStore.language}/c.png`, import.meta.url).href
const leftBg = new URL(`./img/${appStore.language}/leftBg.png`, import.meta.url).href
const cardList = reactive([
  {
    id: 1,
    title: i18n.global.t('AppDownload.tip5'),
    img: new URL('./img/card01.png', import.meta.url).href
  },
  {
    id: 2,
    title: i18n.global.t('AppDownload.tip6'),
    img: new URL('./img/card02.png', import.meta.url).href
  },
  {
    id: 3,
    title: i18n.global.t('AppDownload.tip7'),
    img: new URL('./img/card03.png', import.meta.url).href
  },
  {
    id: 4,
    title: i18n.global.t('AppDownload.tip8'),
    img: new URL('./img/card04.png', import.meta.url).href
  },
  {
    id: 5,
    title: i18n.global.t('AppDownload.tip9'),
    img: new URL('./img/card05.png', import.meta.url).href
  },
  {
    id: 6,
    title: i18n.global.t('AppDownload.tip10'),
    img: new URL('./img/card06.png', import.meta.url).href
  }
])
function login() {
  user.setLoginDialogAction({
    isShowLoginDialog: true,
    currentPage: 'login'
  })
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 1450px) {
  .boxApp {
    zoom: 0.9;
  }
  .leftDiv {
    margin: 20px 0 20px 10px !important;
    zoom: 0.9;
  }
  .leftDiv img {
    zoom: 0.9;
  }
  .rightDiv {
    margin-top: 35px !important;
    margin: 0 !important;
  }
  .appDiv {
    margin-top: 20px !important;
  }
  .imgCard {
    margin-top: 20px !important;
  }
}
.boxApp {
  display: flex;
  width: 100%;
  margin: 0 auto;

  .leftDiv {
    width: 754px;
    height: 773px;
    flex-shrink: 0;
    margin: 20px;

    img {
      width: 754px;
      height: 773px;
      flex-shrink: 0;
    }
  }

  .rightDiv {
    display: flex;
    flex-direction: column;
    margin: 35px 0 0 100px;

    .title {
      font-family: REEJI-HongGuangGB-Flash;
      font-size: 70px;
      font-style: normal;
      font-weight: 900;
      line-height: 105px;
      /* 150% */
      letter-spacing: -0.7px;
      background: var(-----, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .appDiv {
      display: flex;
      margin-top: 40px;

      // img {
      //   width: 233px;
      //   height: 230px;
      //   flex-shrink: 0;
      // }
      .appBg {
        position: relative;
        width: 233px;
        height: 230px;
        flex-shrink: 0;
        border: 1px solid #3a437e;
        background: #232a4d;
        display: flex;
        align-items: center;
        justify-content: center;
        .mask {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background: black;
          opacity: 0.9;
          text-align: center;
          line-height: 150px;
        }
        .login {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: max-content;
          height: 30px;
          padding: 0 10px;
          border: 1px solid var(--unnamed, #f35f1b);
          border-radius: 30px;
          font-weight: 600;
          background: #f36625;
          color: #fff;
          cursor: pointer;
        }
      }
      .cFrame {
        width: 40px;
        z-index: 100;
      }
      .txt {
        width: 403px;
        margin-left: 30px;

        .t1 {
          color: var(-----100, #fff);

          font-size: 26px;
          font-style: normal;
          font-weight: 500;
          line-height: 39px;
          /* 150% */
        }

        .t2 {
          color: var(-----100, #fff);
          text-align: justify;

          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: 28px;
          margin-top: 12px;
          /* 175% */
        }
        .t3 {
          display: flex;
          width: 180px;
          height: 56px;
          padding: 10px;
          justify-content: center;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
          border-radius: 60px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: var(-----, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
          color: var(-----100, #fff);
          cursor: pointer;
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: 28px;
          margin-top: 37px;
          /* 175% */
        }
      }
    }

    .imgCard {
      width: 672px;
      margin-top: 80px;
      display: flex;
      column-gap: 15px;
      row-gap: 25px;
      flex-wrap: wrap;
      .card {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .cardTitle {
          width: 141px;
          height: 23px;
          flex-shrink: 0;
          color: var(-----100, #fff);

          font-size: 14px;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
          display: flex;
          align-items: center;
          justify-content: center;
          background-image: url('./img/cardTop.png') !important;
          background-size: cover !important;
          z-index: 100;
          span {
            width: 90px;
            text-align: center;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }

        .imgBg {
          width: 214px;
          height: 132px;
          flex-shrink: 0;
          border-radius: 10px;
          border: 6px solid #323c6f;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: -14px;

          img {
            width: 208px;
            height: 126px;
            box-shadow: 0px 4px 12px 0px rgba(143, 143, 143, 0.1);
          }
        }
      }
    }
  }
}
</style>
