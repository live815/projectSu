<template>
  <div class="background">
    <div class="maintain">
      <div class="maintain-fiveHundred">
        <img :src="imgURL" width="891" height="532" />
      </div>
      <div class="maintain-notice">
        <div class="maintain-logo">
          <img :src="logo" />
        </div>
        <template v-if="route.path !== '/404'">
          <div class="maintain-protect">{{ store.maintainInfo.title }}</div>
          <div class="maintain-time">
            {{ store.maintainInfo.startTime }} {{ $t('common.to') }}
            {{ store.maintainInfo.endTime }}
          </div>
          <div class="maintain-inform">
            {{ store.maintainInfo.content }}
          </div>
        </template>

        <div class="online-service" @click="openCustomerServicePop">
          {{ $t('Error404View.OnlineService') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { openCustomerServicePop } from '@/utils/customerService'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'

const store = useAppStore()
const route = useRoute()
const imgURL = ref()
const code = ref('')
const logo = ref()
const router = useRouter()
let timer = null
onMounted(async () => {
  code.value = route.path.replace('/', '')
  imgURL.value = new URL(`./img/${code.value}.png`, import.meta.url).href
  logo.value = new URL(`./img/${store.language}/logo.png`, import.meta.url).href
  if (code.value === '500') {
    await store.getMaintainInfo()
    if (!store.getMaintainStatus) {
      clearInterval(timer)
      router.push('/')
    } else {
      timer = setInterval(async () => {
        await store.getMaintainInfo()
        if (!store.getMaintainStatus) {
          clearInterval(timer)
          router.push('/')
        }
      }, 10000)
    }
  }
})
</script>

<style lang="scss" scoped>
.background {
  background-image: url('./img/Rectangle.png');
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .maintain {
    display: flex;
    .maintain-notice {
      div {
        margin-bottom: 50px;
      }
      .maintain-logo {
        color: #333333;

        font-size: 50px;
        font-style: normal;
        font-weight: 400;
        line-height: 50px;
      }
      .maintain-protect {
        color: #333333;

        font-size: 70px;
        font-style: normal;
        font-weight: 600;
        line-height: 70px; /* 40% */
      }
      .maintain-time {
        color: #ff5000;

        font-size: 22px;
        font-style: normal;
        font-weight: 400;
        line-height: 28px; /* 127.273% */
      }
      .maintain-inform {
        color: #666666;

        font-size: 22px;
        font-style: normal;
        font-weight: 400;
        line-height: 32px; /* 145.455% */
      }
      .online-service {
        width: 172px;
        height: 50px;
        background-image: url('./img/button.png');
        color: var(--100, #fff);
        text-align: center;

        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: 50px;
        cursor: pointer;
      }
    }
  }
}
</style>
