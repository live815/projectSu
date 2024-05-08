import six8KefuIcon from './img/icon/service-68.png'
import TelegramIcon from './img/icon/telegram.png'
import whatsAppIcon from './img/icon/whats-app.png'
import QQIcon from './img/icon/QQ.png'
import WechatIcon from './img/icon/wechat.png'
import skypeIcon from './img/icon/skype.png'
import emailIcon from './img/icon/email.png'

import { ref } from 'vue'
const dataInfo = ref([])
dataInfo.value = [
  {
    icon: six8KefuIcon,
    appName: '68代理合作',
    appId: '47l3gb4f57',
    downloadLink: 'http://youtube.com'
  },
  {
    icon: TelegramIcon,
    appName: 'Telegram',
    appId: 'https:/t.me/bbjya1',
    downloadLink: 'http://youtube.com'
  },
  {
    icon: whatsAppIcon,
    appName: 'WhatsApp',
    appId: 'https://www.whatsapp.com/1',
    downloadLink: 'https://www.whatsapp.com/1'
  },
  {
    icon: QQIcon,
    appName: 'QQ1',
    appId: '123456'
  },
  {
    icon: QQIcon,
    appName: 'QQ2',
    appId: '654321'
  },
  {
    icon: WechatIcon,
    appName: '微信',
    appId: 'aa3456'
  },
  {
    icon: skypeIcon,
    appName: 'Skype1',
    appId: 'live:.cid.700cc84608ed15e'
  },
  {
    icon: skypeIcon,
    appName: 'Skype1',
    appId: 'live:.cid.700cc84608ed15e'
  },
  {
    icon: emailIcon,
    appName: 'Email',
    appId: 'dldlzhiban@gmail.com'
  }
]
export default dataInfo
