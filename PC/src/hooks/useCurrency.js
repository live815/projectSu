import { useUserStore } from '@/stores/user'
export default function useCurrency() {
  const user = useUserStore()
  const Currency = ref('')
  let site = import.meta.env.VITE_SITE
  Currency.value = user.userInfo.regCurrency || getCurrency(site)
  return { Currency }
}
function getCurrency(site) {
  switch (site) {
    case 'cn':
      return 'CNY'
    case 'vietnam':
      return 'VND'
    case 'en':
      return 'USD'
    default:
      return 'USDT'
  }
}

export function useFBCurrency() {
  const { Currency } = useCurrency()
  switch (Currency.value) {
    case 'CNY':
      return 1
    case 'VND':
      return 10
    case 'USD':
      return 2
    default:
      return 200
  }
}
