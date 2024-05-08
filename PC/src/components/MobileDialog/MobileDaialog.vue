<template>
  <CustomizeDialog
    :dialogShow="showMobile"
    :width="600"
    :title="
      isBindComptued == 1
        ? $t('Components.NoMobilePhoneNumberBound')
        : $t('Components.NotBoundToBankCard')
    "
    v-if="showMobile"
    :alignCenter="true"
    @closeBtn="closeBtn"
  >
    <div class="title">
      {{ isBindComptued == 1 ? $t('Components.Notice_17') : $t('Components.Notice_18') }}
    </div>
    <div class="footer">
      <div class="footer-cancel" @click="closeBtn">{{ $t('Components.Cancel') }}</div>
      <div class="footer-btn" @click="onClickGo">{{ $t('Components.GoToBinding') }}</div>
    </div>
  </CustomizeDialog>
</template>

<script setup>
import { computed, ref } from 'vue'
import CustomizeDialog from '@/components/CustomizeDialog/CustomizeDialog.vue'
import eventBus from '@/utils/eventBus'
import { useUserStore } from '@/stores/user.js'
import { useRouter } from 'vue-router'
const user = useUserStore()

const router = useRouter()

const showMobile = ref(false)

const isBindComptued = computed(() => {
  if (!user.userInfo.mobile && !user.userInfo.bank) {
    return 1
  } else if (user.userInfo.mobile && !user.userInfo.bank) {
    return 2
  } else if (!user.userInfo.mobile && user.userInfo.bank) {
    return 1
  }
  return 1
})

eventBus.on('isShowMobile', () => {
  showMobile.value = true
})
onUnmounted(() => {
  eventBus.off('isShowMobile')
})
// 关闭弹窗
const closeBtn = () => {
  showMobile.value = false
}

const onClickGo = () => {
  // 获取当前路由路径
  const currentPath = router.currentRoute.value.path
  const currentName = router.currentRoute.value.path
  // 判断当前路径是否包含需要跳转的路径
  if (!currentPath.includes('/personal/6')) {
    // 移除路径中的重复部分
    const newPath = currentPath.replace(currentName, '')
    // 进行路由跳转
    router.push('/personal/6' + newPath)
  }
  showMobile.value = false
}
</script>
<style lang='scss' scoped>
.title {
  color: var(--100, #fff);

  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: -0.01px;
  height: 86px;
}
.footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .footer-cancel {
    display: flex;
    width: 60px;
    height: 32px;
    padding: 4px 8px;
    justify-content: center;
    align-items: center;
    text-align: center;
    line-height: 32px;
    gap: 4px;
    border-radius: 4px;
    background: var(--unnamed, #171a2f);
    box-shadow: 0px 30px 60px 0px rgba(0, 0, 0, 0.5);
  }
  .footer-btn {
    margin-left: 15px;
    // width: 74px;
    width: auto;
    padding: 0 5px;
    height: 32px;
    color: var(--color-white, #fff);
    text-align: center;
    line-height: 32px;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    letter-spacing: -0.01px;
    border-radius: 4px;
    background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
  }
}
</style>