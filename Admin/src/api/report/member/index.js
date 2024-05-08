import request from "@/utils/request";

//报表管理-查询会员输赢
export function getMemberWinOrLose(data) {
  return request({
    url: "/system/report/member/queryMemberWinOrLose",
    method: "get",
    params: data,
  });
}

//报表管理-查询会员输赢详情
export function getMemberWinOrLoseDetails(data) {
  return request({
    url: "/system/report/member/queryMemberWinOrLoseDetails",
    method: "get",
    params: data,
  });
}