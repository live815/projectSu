<template>
  <span>{{ CurrencyUnit }}</span>
</template>

<script setup>
import useCurrency from '@/hooks/useCurrency'
const { Currency } = useCurrency()
const CurrencyUnit = computed(() => {
  switch (Currency.value) {
    case 'CNY':
      return '￥'
    case 'VND':
      return '₫'
    case 'USDT':
      return '$'
    case 'USD':
      return '$'
    default:
      return ''
  }
})
</script>

<style lang="scss" scoped></style>
