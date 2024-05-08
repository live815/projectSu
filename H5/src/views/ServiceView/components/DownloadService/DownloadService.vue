<template>
  <div
    class="rect-angle-center"
    @click="goExclusive"
    :style="{ backgroundImage: `url(${imgHandler})` }"
  ></div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

const router = useRouter()
//跳转专属客服页面
const goExclusive = () => {
  router.push('/service-customer')
}
const imgHandler = computed(() => {
  return new URL(`./img/${appStore.language}/Rectangle.png`, import.meta.url).href
})
</script>

<style lang="scss" scoped>
.rect-angle-center {
  width: 345px;
  height: 80px;
  margin: 15px 0;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  border-radius: 12px;
}
</style>
