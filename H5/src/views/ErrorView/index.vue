<template>
  <div class="page-bg">
    <img :src="imgURL" />
    <p class="title">{{ store.maintainInfo.title }}</p>
    <div class="sub-title">
      <p>{{ $t('common.maintainTime') }}</p>
      <p>
        {{ store.maintainInfo.startTime }} {{ $t('common.to') }} {{ store.maintainInfo.endTime }}
      </p>
    </div>
    <p class="content">
      {{ store.maintainInfo.content }}
    </p>
    <van-button class="cs-btn" @click="openCustomerServiceLink">
      {{ $t('serviceview.onlineservice') }}
    </van-button>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { openCustomerServiceLink } from '@/utils/customerService'

const store = useAppStore()
const route = useRoute()
const imgURL = ref()
const code = ref('')

const router = useRouter()
let timer = null
onMounted(async () => {
  code.value = route.path.replace('/', '')
  imgURL.value = new URL(`./img/${code.value}.png`, import.meta.url).href

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
.page-bg {
  background-image: url('./img/image.png');
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  word-wrap: break-word;
  img {
    width: 360px;
    height: 265px;
  }
  .title {
    color: #111111;
    font-size: 20px;
    font-weight: 600;
    line-height: 28px;
    margin-top: 70px;
  }
  .sub-title {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #ff5000;
    font-size: 14px;
    font-weight: 400;
    line-height: 28px;
    margin-top: 10px;
  }
  .content {
    margin: 10px 30px 30px;
    color: #666666;
    font-size: 14px;
    font-weight: 400;
    line-height: 28px;
    text-align: center;
  }
  .cs-btn {
    background: linear-gradient(90deg, #ff9000 0%, #ff5000 100%);
    border-radius: 6px;
    width: 325px;
    color: white;
    font-size: 15px;
    font-weight: 600;
    line-height: 22px;
  }
}
</style>
