<template>
  <div class="bet-header">
    <div class="content">
      <div class="left">
        <span class="bet-num">{{ betCartStore.betNums }}</span>
        <span class="bet-slip">{{ $t('Sportsview.bet') }}</span>
      </div>
      <div class="right">
        <Balance />
        <div class="line"></div>
        <div class="close" @click="closePop">
          <img src="./img/close-arrow.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBetCartStore } from '@/stores/betCart'
const betCartStore = useBetCartStore()
const closePop = () => {
  betCartStore.isOpenBetCart = false
}
</script>

<style lang="scss" scoped>
.bet-header {
  background: #fff;
  // box-shadow: 4px 0px 8px 0px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #eee;
  // padding: 6px 19px 6px 15px;
  padding: 6px 0 6px 15px;
  position: relative;
  .content {
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      .bet-num {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        text-align: center;
        line-height: 24px;
        color: #fff;
        margin-right: 6px;
        background: #ff5000;
      }
      .bet-slip {
        color: #111;
        font-size: 14px;
        line-height: 16px;
      }
    }
    .right {
      display: flex;
      align-items: center;
      .account-money {
        text-align: right;
        margin-right: 15px;
        .account {
          color: #111;
          font-size: 11px;
          line-height: 16px;
        }
        .money {
          color: #f53f3f;
          .currency {
            font-size: 14px;
            font-weight: 600;
          }
          .amount {
            font-size: 20px;
            line-height: 16px;
            margin-top: 6px;
            font-weight: 600;
          }
        }
      }
      .line {
        width: 1px;
        height: 20px;
        background: #eee;
        margin-left: 10px;
      }
      .close {
        padding: 0 15px;
        line-height: 36px;
        img {
          width: 13px;
        }
      }
    }
  }
}
</style>
