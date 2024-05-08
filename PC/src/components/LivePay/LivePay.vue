<template>
  <div class="payMain">
    <div class="lock">
      <LockIcon />
    </div>
    <div class="pay1">{{$t('Components.PayToView')}}</div>
    <div class="pay2">{{$t('Components.PayTips_1')}}</div>
    <div class="pay3">{{ liveStore.liveRoom.viewPayAmount }}</div>
    <div class="pay4">{{$t('Components.AmountToBePaid')}}</div>
    <div class="pay5" @click="goPay">{{$t('Components.ToPay')}}</div>
  </div>
  <BalanceNo :isShow="isShow" :txt="txt" v-if="isShow" @closeGift="closeGift" />
</template>

<script setup>
import i18n from '@/i18n'
import { onMounted } from 'vue'
import { useLiveStore } from '@/stores/liveBroadcast'
import { setPay } from '@/api/liveBroadcast'
import LockIcon from '@/components/icons/LockIcon.vue'
import { useUserStore } from '@/stores/user.js'
import { getToken } from '@/utils/cache'
import BalanceNo from '@/components/BalanceNo/BalanceNo.vue'
const liveStore = useLiveStore()
const emit = defineEmits(['paySuccess'])
const user = useUserStore()
const isShow = ref(false)
const txt = ref('')
onMounted(() => { })
//支付
const goPay = async () => {
  let isLogin = getToken()
  if (!isLogin) {
    user.setLoginDialogAction({
      isShowLoginDialog: true,
      currentPage: 'login'
    })
    return
  }
  if (user.userInfo.role === 1) {
    return
  }
  if (liveStore.liveRoom.viewPayAmount > user.balance || !user.balance) {
    let differMoney=0
    if(user.balance){
      differMoney= (liveStore.liveRoom.viewPayAmount - Number(user.balance)).toFixed(2)
    }else{
      differMoney= (liveStore.liveRoom.viewPayAmount).toFixed(2)
    }
    txt.value = i18n.global.t('Components.Notice_10',{differMoney})
    isShow.value = true
    return
  }
  const data = {
    liveStreamId: liveStore.liveRoom.id,
    memberId: user.userInfo.id,
    memberName: user.userInfo.userName,
    amount: liveStore.liveRoom.viewPayAmount
  }
  try {
    let res = await setPay(data)
    if (res.code == 200) {
      emit('paySuccess')
    }
  } catch (e) {
    console.log(e)
  }
}
const closeGift = () => {
  isShow.value = false
}
</script>

<style lang="scss" scoped>
.payMain {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;

  .lock {
    display: flex;
    width: 80px;
    height: 80px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    border-radius: 40px;
    background: rgba(0, 0, 0, 0.3);
  }

  .pay1 {
    color: var(--unnamed, #f35f1b);
    
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    margin-top: 20px;
  }

  .pay2 {
    color: var(--100, #fff);
    
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin: 10px 0;
  }

  .pay3 {
    color: var(--100, #fff);
    
    font-size: 40px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  .pay4 {
    color: var(--60, rgba(255, 255, 255, 0.6));
    
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .pay5 {
    width: 300px;
    height: 50px;
    flex-shrink: 0;
    border-radius: 6px;
    background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
    color: #fff;
    text-align: center;
    
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    cursor: pointer;
  }
}</style>
