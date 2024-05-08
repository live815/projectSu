<template>
  <div class="header">
    <p @click="home">
      <IconClose class="icon" />
      <span>{{ $t('Lletter.Llettertip21') }}</span>
    </p>
    <img @click="selectLiveChat" src="@/assets/img/icon-service.png" alt="" />
  </div>
  <LiveChat ref="liveChat" />
</template>

<script setup>
import IconClose from '@/components/icons/IconClose'
import { useRouter,useRoute } from 'vue-router'
import LiveChat from '@/components/LiveChat/LiveChat.vue'
const liveChat = ref(null)
const router = useRouter()
const route = useRoute()
const home = () => {
  router.push(route.query.from || '/')
}
const selectLiveChat = () => {
  liveChat.value.open()
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 44px;
  p {
    font-size: 15px;
    display: flex;
    align-items: center;
  }
  .icon {
    fill: var(--color-text);
    margin-right: 5px;
  }
  img {
    width: 30px;
    height: 23px;
  }
}
</style>
