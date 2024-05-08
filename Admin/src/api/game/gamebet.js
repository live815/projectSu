import request from "@/utils/request";

// 查询第三方投注列表
export function getRecordList(data) {
  return request({
    url: "/game/api/game/record/thirdList",
    method: "post",
    data: data,
  });
}
// 跟单次数查询
export function getFolloworderList(data) {
  return request({
    url: "/game/api/game/record/followOrderItem",
    method: "post",
    data: data,
  });
}
