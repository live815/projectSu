<template>
  <div class="fc-btn-container" @click="handleClick">
    <div :class="isActive ? 'btn-container ' : 'btn-container disactive'">
      <span class="text">{{ btnText }}</span>
    </div>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
const props = defineProps(['userAcitivtyData', 'isQualified'])
const emit = defineEmits(['toClaim'])

// 派发状态 0 可领取  2未登录 3未满足领取条件 4已过期 5已领取
const statusCode = computed(() => {
  if (!userStore.isLogin) {
    return 2
  }
  if (props.userAcitivtyData == null || !props.isQualified) {
    return 3
  }
  if (props.userAcitivtyData.status == 1) {
    return 5
  }
  if (props.userAcitivtyData.status == 0) {
    return 0
  }
  if (props.userAcitivtyData.status == 2) {
    return 4
  }
})
const isActive = computed(() => {
  if (statusCode.value < 4) {
    return true
  } else {
    return false
  }
})
// 派发状态 0 可领取  2未登录 3未满足领取条件 4已过期 5已领取
const btnText = computed(() => {
  switch (statusCode.value) {
    case 0:
      return i18n.global.t('Fletter.ReceiveAward')
    case 2:
      return i18n.global.t('Fletter.LoginNow')
    case 3:
      return i18n.global.t('Fletter.FirstreCharge')
    case 4:
      return i18n.global.t('Fletter.Received')
    case 5:
      return i18n.global.t('Fletter.Received')
  }
})

const handleClick = () => {
  switch (statusCode.value) {
    case 0:
      emit('toClaim')
      break
    case 1:
      break
    case 2:
      userStore.setLoginDialogAction({
        isShowLoginDialog: true,
        currentPage: 'login'
      })
      break
    case 3:
      if (
        !userStore.userInfo.mobile ||
        !userStore.userInfo.bankCardCount ||
        !userStore.userInfo.bankCardCount
      ) {
        eventBus.emit('isShowMobile')
      } else {
        const params = {
          isOpen: true
        }
        eventBus.emit('showCharge', params)
      }
  }
}
</script>

<style lang="scss" scoped>
.fc-btn-container {
  display: flex;
  justify-content: center;
  margin-top: 50px;
}
.btn-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 856px;
  height: 110px;
  margin-top: 15px;
  margin-bottom: 15px;
  background-image: url('../img/btn_act.png');
  background-size: 100% 100%;
  cursor: pointer;
}
.disactive {
  background-image: url('../img/btn_unact.png');
}
.text {
  color: #7b3e02;

  font-size: 46px;
  font-weight: 600;
  line-height: normal;
}
</style>
