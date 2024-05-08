<template>
  <div class="footer">
    <div class="content">
      <div class="main">
        <div class="logo-box">
          <div class="title">{{ $t('Components.PartnerPaymentProvider') }}</div>
          <div class="img-box">
            <img class="imgPayer" :src="Payer" />
          </div>
        </div>
        <div class="line"></div>
        <div class="logo-box">
          <div class="title">{{ $t('Components.BusinessLicense') }}</div>
          <div class="boxRight">
            <div class="otherV">
              <img class="footerImg1" src="./img/footerImg1.png" />
              <p class="p1">{{ $t('Components.License_1') }}</p>
            </div>
            <div class="otherV">
              <img class="footerImg2" src="./img/footerImg2.png" />
              <p class="p1">{{ $t('Components.License_2') }}</p>
            </div>
            <div class="otherV">
              <img class="footerImg3" src="./img/footerImg3.png" />
              <p class="p1">{{ $t('Components.License_3') }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="imgDiv">
        <img v-for="(item, index) in imgList" :key="index" :src="item.imgUrl" class="imgUrl" />
      </div>
      <div class="bottem-text">
        <div class="copyright">Copyright © 2024 V Sports . All Rights Reserved.</div>
        <div style="display: flex; align-items: center">
          <div class="label AboutUs" @click="handleClick('1-1')">{{ $t('Components.AboutUs') }}</div>
          <div class="label GamblingStatement" @click="handleClick('2-1')">
            {{ $t('Components.GamblingStatement') }}
          </div>
          <div class="label ResponsibleGambling" @click="handleClick('2-2')">
            {{ $t('Components.ResponsibleGambling') }}
          </div>
          <div class="label UserAgreement" @click="handleClick('2-4')">{{ $t('Components.UserAgreement') }}</div>
          <div class="label PrivacyPolicy" @click="handleClick('2-6')">{{ $t('Components.PrivacyPolicy') }}</div>
          <div class="label last-label" @click="handleClick('3-1')">
            {{ $t('Components.HelpCenter') }}
          </div>
          <div class="cooperate" @click="goCooperate" >{{ $t('Components.BusinessCooperation') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useAppStore } from '@/stores/app'
import { useRouter } from 'vue-router'
const router = useRouter()

function handleClick(val) {
  console.log(11111111,val)
  router.push({
    path: '/HelpCenter',
    query: { current: val }
  })
}
const goCooperate=()=>{
  router.push('/VentureInvest')
}
const appStore = useAppStore()
const Payer = new URL(`./img/${appStore.language}/Payer.png`, import.meta.url).href
const imgList = reactive([
  { imgUrl: new URL('./img/oImg1.png', import.meta.url).href },
  { imgUrl: new URL(`./img/oImg2.png`, import.meta.url).href },
  { imgUrl: new URL(`./img/oImg3.png`, import.meta.url).href },
  { imgUrl: new URL('./img/oImg4.png', import.meta.url).href },
  { imgUrl: new URL('./img/oImg5.png', import.meta.url).href },
  { imgUrl: new URL('./img/oImg6.png', import.meta.url).href },
  { imgUrl: new URL('./img/oImg8.png', import.meta.url).href },
  { imgUrl: new URL(`./img/${appStore.language}/oImg9.png`, import.meta.url).href },
  { imgUrl: new URL('./img/oImg10.png', import.meta.url).href },
  { imgUrl: new URL('./img/oImg11.png', import.meta.url).href },
])
</script>

<style lang="scss" scoped>
@media screen and (max-width: 1450px) {
  .footer {
    zoom: 0.9;
  }
}
.footer {
  height: 300px;
  background: #151525;
  padding-top: 40px;
  padding: 40px 40px 0;
  z-index: 10;

  .content {
    width: 1320px;
    margin: 0 auto;

    .main {
      display: flex;
      align-items: center;

      // justify-content: space-between;
      .logo-box {
        height: 111px;

        .img-box {
          .imgPayer {
            width: 260px;
            height: 70px;
          }
        }

        .boxRight {
          width: 988px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .otherV {
          display: flex;
          align-items: center;

          .footerImg1 {
            width: 171px;
            height: 31px;
            flex-shrink: 0;
          }

          .footerImg2 {
            width: 107px;
            height: 31px;
            flex-shrink: 0;
          }

          .footerImg3 {
            width: 92px;
            height: 31px;
            flex-shrink: 0;
          }

          .p1 {
            color: #fff;
            
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            margin-left: 20px;
          }
        }

        .img-box.last {
          border: none;
        }

        .title {
          margin-bottom: 22px;
          color: #fff;
          
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }
      }

      .line {
        width: 1px;
        height: 66px;
        flex-shrink: 0;
        margin: 0 35px;
        margin-top: 41px;
        background: var(--20, rgba(255, 255, 255, 0.2));
      }
    }

    .bottem-text {
      display: flex;
      justify-content: space-between;
      color: var(--60, rgba(255, 255, 255, 0.6));
      
      font-size: 13px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;

      .copyright {
        white-space: nowrap;
      }

      .label {
        margin-right: 39px;
        white-space: nowrap;
        cursor: pointer;
      }

      .cooperate {
        white-space: nowrap;
        cursor: pointer;
      }

      .label.last-label {
        padding-right: 40px;
        border-right: 1px solid var(--20, rgba(255, 255, 255, 0.2));
      }
    }

    .imgDiv {
      margin: 50px 0 40px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .imgUrl {
        width: 102px;
        height: 20px;
      }
    }
  }
}
</style>
