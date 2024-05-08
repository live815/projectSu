<template>
  <div class="collected">
    <div class="title">
      <img class="arrow" :src="arrowLeft" />
      <span>{{ $t('Iletter.myreward') }}</span>
      <img class="arrow" :src="arrowRight" />
    </div>
    <div class="number-people">{{ $t('Iletter.ValidnvitNumber') }}{{ vipConfig['subCount'] }}</div>
    <div class="top">
      <div class="top-in"></div>
    </div>
    <div class="collected-bg">
      <div class="receive-box">
        <div class="left-box">
          <p class="wait">{{ $t('Iletter.Ilettile11') }}</p>
          <p class="symbol">
            <CurrencyUnit />
            <span class="number">{{
              vipConfig['unDrawDepAward'] ? toFormatNumber(Number(vipConfig['unDrawDepAward'])) : 0
            }}</span>
          </p>
          <p class="already">
            {{ $t('Iletter.Ilettile12') }}{{ toFormatNumber(Number(vipConfig['drawDepAward'])) }}
          </p>
        </div>
        <div class="right-box">
          <van-button
            class="receive-but"
            :disabled="vipConfig['unDrawDepAward'] + '' === '0'"
            @click="handleReceive(vipConfig['unDrawDepAward'], 1)"
            >{{ $t('Iletter.receive') }}</van-button
          >
        </div>
      </div>
      <div class="line"></div>
      <div class="receive-box">
        <div class="left-box">
          <p class="wait">{{ $t('Iletter.Ilettile111') }}</p>
          <p class="symbol">
            <CurrencyUnit />
            <span class="number">{{
              vipConfig['unDrawBetAward'] ? toFormatNumber(Number(vipConfig['unDrawBetAward'])) : 0
            }}</span>
          </p>
          <p class="already">
            {{ $t('Iletter.Ilettile112') }}{{ toFormatNumber(Number(vipConfig['drawBetAward'])) }}
          </p>
        </div>
        <div class="right-box">
          <van-button
            class="receive-but"
            :disabled="vipConfig['unDrawBetAward'] + '' === '0'"
            @click="handleReceive(vipConfig['unDrawBetAward'], 2)"
            >{{ $t('Iletter.receive') }}</van-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue'
import { showToast } from 'vant'
import { drawAward } from '@/api/user'
import arrowLeft from '../../img/arrow-left.png'
import arrowRight from '../../img/arrow-right.png'
import { ERR_OK } from '@/utils/config'
import { toFormatNumber } from '@/utils'
import i18n from '@/i18n'
import { getToken } from '@/utils/cache'
import { useMobileEvent } from '@/hooks/useMobileEvent'

const { token } = useMobileEvent()
const isLogin = getToken()
defineProps(['vipConfig'])
const emit = defineEmits(['getInviteInfo'])

const handleReceive = (val, type) => {
  const data = { awardAmount: val * 1, type }
  if (isLogin || token) {
    drawAward(data).then((res) => {
      if (res?.['code'] === ERR_OK) {
        showToast(i18n.global.t('Fletter.FletterTip2'))
        emit('getInviteInfo')
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.collected {
  .title {
    @include center-content();
    margin-top: 15px;
    span {
      margin: 0 10px 0 10px;
      color: #111;

      font-size: 16px;
      font-weight: 600;
      text-align: center;
    }
    .arrow {
      width: 102px;
      height: 15px;
    }
  }
  .number-people {
    @include center-content();
    color: #ff5000;

    font-size: 14px;
    font-weight: 400;
    margin: 15px;
  }
  .top {
    position: relative;
    width: 345px;
    height: 28px;
    border-radius: 60px;
    background: #ff905a;
    box-shadow: 0 4px 6px 0 #ffc8ae inset;
    z-index: -1;
    .top-in {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 329px;
      height: 13px;
      border-radius: 80px;
      background: var(--1, linear-gradient(93deg, #ff9000 0%, #ff5000 100%));
      box-shadow: 0 4px 4px 0 #ea530a inset;
    }
  }
  .collected-bg {
    padding-top: 20px;
    margin: -17px auto;
    width: 330px;
    height: 237px;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url('./img/collected-bg.png');
    .receive-box {
      padding: 0 20px 0 20px;
      display: flex;
      justify-content: space-between;
      .left-box {
        .wait {
          color: #333;
          font-size: 12px;
          font-weight: 400;
        }
        .symbol {
          color: #111;
          font-size: 14px;
          font-weight: 600;
          margin: 10px 0 15px 0;
        }
        .number {
          margin-left: 5px;
          color: #111;
          font-size: 26px;
          font-weight: 600;
        }
        .already {
          color: #ff9000;
          font-size: 10px;
          font-weight: 400;
        }
      }
      .right-box {
        @include center-content();
        .receive-but {
          width: 94px;
          height: 40px;
          color: #fff;
          border-radius: 90px;
          background: linear-gradient(180deg, #ff9000 0%, #ff5000 100%);
          border: none;
        }
      }
    }
    .line {
      margin: 20px auto;
      content: '';
      width: 306px;
      height: 1px;
      background: #ffdcad;
      border-bottom: 1.5px dashed #ccc;
    }
  }
}
</style>
