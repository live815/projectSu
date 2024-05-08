<template>
  <div class="balance-refresh">
    <template v-if="isLogin">
      <p>
        <CurrencyUnit class="currency" />
        <Amount class="amount" />
      </p>
      <Refresh class="refresh-icon" />
    </template>
    <button
      v-else
      class="btn"
      @click="router.push(`/login?redirect=${route.fullPath}`)"
    >
      {{ $t('Lletter.login')
      }}<span v-if="appStore.language === 'zh-cn'">/{{ $t('Lletter.register') }}</span>
    </button>
  </div>
</template>

<script setup>
import { getToken } from '@/utils/cache'
import { useRouter,useRoute } from 'vue-router'
import { useAppStore } from '@/stores/app'

const isLogin = getToken()
const router = useRouter()
const route = useRoute()
const appStore = useAppStore()
</script>

<style lang="scss" scoped>
.balance-refresh {
  display: flex;
  align-items: center;
  .currency {
    font-size: 14px;
    font-weight: 600;
    color: var(--color-danger);
  }
  .amount {
    font-size: 20px;
    line-height: 16px;
    font-weight: 600;
    color: var(--color-danger);
  }
  .refresh-icon {
    margin-left: 5px;
  }
  .btn {
    height: 26px;
    border-radius: 50px;
    background: var(--1, linear-gradient(90deg, #ff9000 0.17%, #ff5000 101.4%));
    color: #fff;
    font-size: 12px;
    border: none;
  }
}
</style>
