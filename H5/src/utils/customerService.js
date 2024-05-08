import { webviewBridgeRedirect } from '@/utils'
import { useUserStore } from '@/stores/user'
export function openCustomerServiceLink() {
  const userStore = useUserStore()
  const username = userStore.userInfo.userName || ''
  const site = import.meta.env.VITE_SITE
  let url = getLiveChatSDKByPlatform(site) + `&CUSTOM!username=${username}`
  webviewBridgeRedirect({ url, appFunName: 'openBrowser' })
}
function getLiveChatSDKByPlatform(site) {
  switch (site) {
    case 'cn':
      return 'https://lwesoes.lco8k2pbwg.com/chatwindow.aspx?siteId=65001361&planId=850059ff-b70a-4dbc-a355-75fc605cf9a3&chatGroup=1'
    case 'vietnam':
      return 'https://psowoexvd.1lzq7zyjyce.com/chatwindow.aspx?siteId=65001573&planId=78ef8a66-9626-4603-bbd3-21349c1526a2&chatGroup=2'
  }
}
