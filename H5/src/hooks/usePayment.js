import { getOrderNo } from '@/api/recharge'
import { getWithdrawOrderNo } from '@/api/withdraw'
export async function useDepositOrderCheck(orderNo = '') {
  const res = await getOrderNo({ orderNo })
  const data = res.data
  // 存在订单
  const hasOrder = data && [0, 2, 7, 8].includes(Number(data.status))
  return { hasOrder, data }
}

export async function useWithdrawOrderCheck(orderNo = '') {
  const res = await getWithdrawOrderNo({ orderNo })
  const data = res.data
  // 不存在订单
  const noOrder = !data || [2, 3].includes(Number(data.orderStatus))
  // 存在订单
  const hasOrder = !noOrder
  return { hasOrder, data }
}
