<template>
  <div class="backList-item" v-for="item in onComptedListData" :key="item.id">
    <div class="backList-item-top">
      <div class="backList-item-top-box">
        <img v-if="isBankCard" class="backList-item-top-img" :src="getImg(item.icon)" />
        <img v-else class="backList-item-top-img" :src="getVrtualIcon()" />
        <div class="backList-item-top-title">{{ isBankCard ? item.bankname : item.currency }}</div>
      </div>
      <div class="backList-item-top-disabled" v-if="item.status == 1">
        {{ $t('BankcardView.Disabled') }}
      </div>
    </div>
    <template v-if="isBankCard">
      <div class="backList-item-min-card">
        <div>****</div>
        <div>****</div>
        <div>****</div>
        <div>{{ item.cardNo.substr(-4) }}</div>
      </div>
    </template>
    <template v-else>
      <div class="backList-item-min">
        {{ item.addr.substr(0, 6) }}****{{ item.addr.substr(-6) }}
      </div>
    </template>
    <div class="backList-item-footer">
      <div class="backList-item-footer-left">
        {{ isBankCard ? $t('BankcardView.DebitCard') : item.protocol }}
      </div>
      <template v-if="isBankCard && onComptedListData.length > 1">
        <div class="backList-item-footer-right" @click="onClickDelete(item)">
          {{ $t('BankcardView.Delete') }}
        </div>
      </template>
      <template v-else-if="!isBankCard">
        <div class="backList-item-footer-right" @click="onClickDelete(item)">
          {{ $t('BankcardView.Delete') }}
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { getImg } from '@/utils'

const emit = defineEmits(['delete'])
const props = defineProps({
  listData: {
    type: Array,
    default: () => []
  },
  // 是否为银行卡
  isBankCard: {
    type: Boolean,
    default: false
  },
  // 是否为Ebpay
  isEbPay: {
    type: Boolean,
    default: false
  }
})

const onComptedListData = computed(() => {
  return props.listData
})

const onClickDelete = (item) => {
  emit('delete', item)
}

const getVrtualIcon = () => {
  if (props.isEbPay) {
    return new URL(`./img/ebpayIogo.png`, import.meta.url).href
  } else {
    return new URL(`./img/virtualIcon.png`, import.meta.url).href
  }
}
</script>
<style lang="scss" scoped>
.backList-item {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 345px;
  height: 140px;
  border-radius: 10px;
  background: linear-gradient(99deg, #e9edf3 9.05%, #fff 54.69%, #eaeef4 91.37%);

  font-style: normal;
  font-weight: 400;
  padding: 0 24px;
  margin-bottom: 15px;
  .backList-item-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .backList-item-top-box {
      display: flex;
      align-items: center;
      .backList-item-top-img {
        width: 16px;
        height: 16px;
      }
      .backList-item-top-title {
        margin-left: 5px;
        font-size: 14px;
        color: #111;
      }
    }

    .backList-item-top-disabled {
      color: var(--1, #f53f3f);
      font-size: 14px;
      font-weight: 600;
    }
  }
  .backList-item-min-card {
    color: #111;
    font-family: DIN Alternate;
    font-size: 28px;
    display: flex;
    justify-content: space-between;
  }
  .backList-item-min {
    color: #111;
    font-family: DIN Alternate;
    font-size: 28px;
    font-style: normal;
    font-weight: 700;
  }

  .backList-item-footer {
    display: flex;
    justify-content: space-between;
    .backList-item-footer-left {
      color: #666;
      font-size: 14px;
    }
    .backList-item-footer-right {
      width: 64px;
      height: 26px;
      text-align: center;
      line-height: 26px;
      border-radius: 2px;
      border: 0.5px solid #ccc;
    }
  }
}
</style>
