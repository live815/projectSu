<template>
  <div class="vip-content">
    <NavBar :title="$t('Vletter.vipcenter')" />
    <VipHeader />
    <VipSlideshow />
    <VipCard />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import VipHeader from './components/VipHeader/VipHeader.vue'
import VipSlideshow from './components/VipSlideshow/VipSlideshow.vue'
import VipCard from './components/VipCard/VipCard.vue'
import { useSlidesStore } from '@/stores/vipSlides'
import { useUserStore } from '@/stores/user'
const slidesStore = useSlidesStore()
const user = useUserStore()
onMounted(() => {
  user.getUserInfoAction()
  slidesStore.getList()
})
</script>

<style lang="scss" scoped>
.vip-content {
  position: relative;
  background: #f6f7fb;
  // overflow: hidden;
}
</style>
