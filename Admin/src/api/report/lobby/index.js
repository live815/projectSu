import request from "@/utils/request";

//报表管理-查询场馆统计数据
export function getLobbyDataSumList(data) {
  return request({
    url: "/system/report/game/queryLobbyDataSumList",
    method: "post",
    data: data,
  });
}