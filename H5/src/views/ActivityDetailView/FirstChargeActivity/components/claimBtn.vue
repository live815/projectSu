<template>
  <div :class="isActive ? 'btn-container ' : 'btn-container disactive'">
    <span class="text" @click="handleClick">{{ btnText }}</span>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import i18n from '@/i18n'
import { useMobileEvent } from '@/hooks/useMobileEvent'

const userStore = useUserStore()
const props = defineProps(['userAcitivtyData', 'isQualified'])
const emit = defineEmits(['toClaim'])
const { depositRedirect, loginRedirect, isEmbeddedInMobile, token } = useMobileEvent()

const statusCode = computed(() => {
  if ((!userStore.isLogin && !token) || isEmbeddedInMobile) {
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
    case 2:
      loginRedirect()
      break
    case 3:
      depositRedirect()
      break
  }
}
</script>

<style lang="scss" scoped>
.btn-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 55px;

  background-image: url('../img/btn_act.png');
  background-size: cover;
}
.disactive {
  background-image: url('../img/btn_unact.png');
}
.text {
  color: #7b3e02;

  font-size: 22px;
  font-weight: 600;
}
</style>
