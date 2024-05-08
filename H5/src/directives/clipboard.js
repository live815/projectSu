import i18n from '@/i18n/index'
import Clipboard from 'clipboard'
import { showToast } from 'vant'
export default {
  beforeMount(el, binding) {
    el.clipboard = new Clipboard(el, {
      text: () => binding.value
    })

    el.clipboard.on('success', function (e) {
      showToast(i18n.global.t('common.copySuccess'))
      e.clearSelection()
    })

    el.clipboard.on('error', function (e) {
      showToast(i18n.global.t('common.copyFail'), e)
    })
  },
  beforeUnmount(el) {
    el.clipboard.destroy()
  }
}
