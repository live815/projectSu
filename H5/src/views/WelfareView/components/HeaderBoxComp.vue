<template lang="">
  <div class="head-box flex">
    <div class="amount bg2">
      <img src="../img/total.png" alt="" />
      <div class="text-box">
        <div class="text">{{ $t('Wletter.Accumulatcollect') }}</div>
        <div class="loading-box">
          <van-loading v-if="loading" type="spinner" size="15px" color="#fff" />
        </div>

        <div class="num" v-if="!loading">
          <CurrencyUnit /><span>{{ grandTotal }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { getWelfareStatisticApi } from '@/api/welfare'
const grandTotal = ref(0)
const loading = ref(true)
onMounted(() => {
  getWelfareStatisticApi(1).then((res) => {
    console.log(res.data[0].total)
    grandTotal.value = res.data[0].total
    loading.value = false
  })
})
</script>
<style scoped lang="scss">
.head-box {
  img {
    width: 64px;
    height: 64px;
    margin-right: 6px;
  }
  .amount {
    display: flex;
    align-items: center;
    width: 100%;
    height: 68px;
    border-radius: 10px;
    background: linear-gradient(92deg, #ffeee4 22.51%, #ffd4cb 78.19%);
    padding-left: 12px;
  }
}
.text-box {
  position: relative;
  top: 1px;
}
.text {
  color: #801c1a;

  font-size: 14px;
  font-weight: 400;
  margin-bottom: 10px;
}
.num {
  color: #801c1a;
  font-family: DIN Alternate;
  font-size: 16px;
  font-weight: 700;
  line-height: 15px;
}
</style>
