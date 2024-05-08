import Clipboard from 'clipboard'
import i18n from '@/i18n'
export default {
  beforeMount(el, binding) {
    el.clipboard = new Clipboard(el, {
      text: () => binding.value
    })

    el.clipboard.on('success', function (e) {
      ElMessage(i18n.global.t('Components.CopiedSuccessfully'))
      e.clearSelection()
    })

    el.clipboard.on('error', function (e) {
      // showToast('复制失败:', e)
      ElMessage(i18n.global.t('Components.CopyFailed'), e)
    })
  },
  beforeUnmount(el) {
    el.clipboard.destroy()
  }
}
