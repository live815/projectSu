import service from "@/utils/request";
export function entryGameApi(data) {
  return service({
    url: "/api/game/bet/single-wallet/jump",
    method: "post",
    data,
  });
}
// 获取游客模式下的FBToken
export function getGuestModeFBToken(/*data*/) {
  return new Promise((res) => {
    res({
      code: 200,
      msg: "操作成功",
      data: {
        token: "", // token传空
        apiServerAddress: import.meta.env.VITE_FB_SPORT_DEFAULT_API,
      },
    });
  });
  // return service({
  //   url: '/api/game/bet/single-wallet/guestToken',
  //   method: 'post',
  //   data
  // })
}
