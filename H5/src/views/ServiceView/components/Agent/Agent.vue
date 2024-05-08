<template>
  <div class="rect-angle">
    <div class="service-img-box" @click="selectLiveChat">
      <img src="./img/service.png" alt="error" class="servive-img" />
      <span class="servive-title">{{ $t('serviceview.onlineservice') }}</span>
    </div>
    <div class="middle"></div>
    <div class="group-img-box">
      <img src="./img/Group.png" alt="error" class="group-img" />
      <span class="group-title" @click="goBusiness">{{ $t('serviceview.content1') }}</span>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useMobileEvent } from '@/hooks/useMobileEvent'
import { useUserStore } from '@/stores/user'

const user = useUserStore()
const isLogin = user.isLogin
const { isEmbeddedInMobile,token,loginRedirect } = useMobileEvent()
const router = useRouter()
const emit = defineEmits(['selectLiveChat'])
const goBusiness = () => {
  if (isEmbeddedInMobile) {
    loginRedirect()
    return
  } else if (isLogin || token) {
    router.push({
      path:'/business-agent',
      query:{
        token
      }
    })
  } else {
    router.push('/login')
  }
}
const selectLiveChat = () => {
  emit('selectLiveChat')
}
</script>

<style lang="scss" scoped>
.rect-angle {
  width: 100%;
  height: 70px;
  background: url('./img/Rectangle.png') no-repeat center;
  background-size: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .service-img-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .servive-img {
      width: 30px;
      height: 30px;
      margin-right: 6px;
    }
    .servive-title {
      color: #e8d8ad;
      font-size: 15px;
      font-weight: 400;
    }
  }
  .middle {
    width: 1px;
    height: 25px;
    background: #5c5c5e;
  }
  .group-img-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .group-img {
      padding-top: 10px;
      width: 30px;
      margin-right: 6px;
    }
    .group-title {
      color: #e8d8ad;
      font-size: 15px;
      font-weight: 400;
    }
  }
}
</style>
