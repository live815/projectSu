import Hammer from 'hammerjs'
export default async function openVConsole() {
  const { default: vConsole } = await import('vconsole')
  if (import.meta.env.VITE_APP_ENV !== 'PROD') {
    new vConsole()
  }
}
const hammer = new Hammer(document.body)

let pressTimeout

hammer.on('press', () => {
  // 设置长按的时间阈值，单位为毫秒
  const longPressThreshold = 6000
  pressTimeout = setTimeout(() => {
    openVConsole()
  }, longPressThreshold)
})

hammer.on('tap', () => {
  clearTimeout(pressTimeout) // 取消长按事件
})
