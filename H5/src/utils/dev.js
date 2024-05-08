import i18n from '@/i18n/index'
import { showToast } from 'vant'
export function dev() {
  showToast({
    message: i18n.global.t('common.wait'),
    icon: 'clock-o'
  })
}
