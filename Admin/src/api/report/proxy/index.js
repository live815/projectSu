import request from "@/utils/request";

// 代理输赢报表-查询
export function getProxyWinOrLose(data) {
  return request({
    url: "/system/report/member/queryMemberWinOrLose",
    method: "get",
    params: data,
  });
}

// 代理输赢详情-查询
export function getProxyWinOrLoseDetails(data) {
  return request({
    url: "/system/report/member/queryMemberWinOrLoseDetails",
    method: "get",
    params: data,
  });
}