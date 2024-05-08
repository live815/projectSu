export function openCustomerServicePop() {
  // let url = ''
  // let site = import.meta.env.VITE_SITE
  // if (site === 'cn') {
  //   url =
  //     'https://lwesoes.lco8k2pbwg.com/4359d33d5f9dd7c961ejkfle-keli385590d0c569ef1f8b07c07a441d7bfcba03b5150715df8c56c075bcffb9da63'
  // }
  // if (site === 'vietnam') {
  //   url =
  //     'https://lwesoes.lco8k2pbwg.com/26836d8ffd77a9e1djkfle-keli6f85fc7aaee8dc112df492b044f9949eab47c3ded8ff7b8b2c47df4cadb6c2f3'
  // }
  // window.open(url, 'live100')
  // 弹框形式
  let id = ''
  let site = import.meta.env.VITE_SITE
  if (site === 'cn') {
    id = '850059ff-b70a-4dbc-a355-75fc605cf9a3'
  }
  if (site === 'vietnam') {
    id = '78ef8a66-9626-4603-bbd3-21349c1526a2'
  }
  OnlineHelpAPI.do('livechat.button.click', id)
}
