<template>
  <div>
    <van-popup v-model:show="show" :style="{ width: '80%' }">
      <template v-if="toLogin">
        <p class="text">{{ $t('Activity.Newbie.label21') }}</p>
        <div class="btn-box">
          <button class="login-btn cancel" @click="show = false">
            {{ $t('Activity.Newbie.Cancel') }}
          </button>
          <button class="login-btn" @click="login">
            {{ $t('Activity.Newbie.label24') }}
          </button>
        </div>
      </template>
      <template v-else>
        <div class="content">
          <img v-if="data?.giftAmount" :src="yesImg" /><img v-else :src="noImg" />
        </div>
        <p class="text">
          <span v-if="data?.giftAmount">{{ $t('Activity.LuckyWheel.Congratulations') }}</span>
          <span v-else>{{ $t('Activity.LuckyWheel.ThankYou') }}</span>
        </p>
        <p v-if="data?.giftAmount" class="number"><CurrencyUnit /> {{ data?.giftAmount }}</p>
        <button class="btn" @click="show = false">
          {{ $t('Activity.Newbie.label20') }}
        </button>
      </template>
    </van-popup>
  </div>
</template>

<script setup>
import yesImg from '../img/yes.png'
import noImg from '../img/no.png'
import { useMobileEvent } from '@/hooks/useMobileEvent'
const { loginRedirect } = useMobileEvent()

const show = ref(false)
const toLogin = ref(false)
const showPopup = (a) => {
  show.value = true
  toLogin.value = a
}
defineExpose({ showPopup })
defineProps({ data: { type: Object } })

const login = () => {
  show.value = false
  loginRedirect()
}
</script>

<style scoped lang="scss">
:deep() {
  .van-popup--center {
    border-radius: 12px;
    padding: 50px 25px 24px 24px;
  }
}
button {
  border: none;
  font-size: 16px;
  border-radius: 6px;
  color: #fff;
  font-weight: 600;
  background: var(---1, linear-gradient(90deg, #ff9000 0.17%, #ff5000 101.4%));
}
.content {
  position: relative;
  width: 250px;
  height: 66px;
  background-image: url('../img/popUp.png');
  margin-bottom: 50px;
  background-size: cover;
  background-repeat: no-repeat;
  img {
    width: 126px;
    height: 126px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
.btn-box {
  display: flex;
  justify-content: center;
  margin: 24px 0;
  .login-btn {
    width: 125px;
    height: 40px;
  }
  .cancel {
    background: var(---4, #fff5f0);
    color: var(---2, #ff5000);
    margin-right: 12px;
  }
}
.text {
  color: #333;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
}
.number {
  color: #333;
  font-size: 36px;
  font-weight: 700;
  text-align: center;
  margin-top: 20px;
}
.btn {
  width: 263px;
  height: 40px;
  margin-top: 20px;
}
</style>
