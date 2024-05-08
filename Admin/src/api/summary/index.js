import request from "@/utils/request";

//数据汇总-今日数据
export function getTodayData(data) {
  return request({
    url: "/system/report/member/queryOverall",
    method: "get",
    params: data,
  });
}

//数据汇总-玩家盈利排行
export function getUserWinRank(data) {
  return request({
    url: "/system/report/member/queryWinRank",
    method: "get",
    params: data,
  });
}

//数据汇总-玩家亏损排行
export function getUserLoseRank(data) {
  return request({
    url: "/system/report/member/queryLoseRank",
    method: "get",
    params: data,
  });
}

//数据汇总-异常数据提醒
export function getOverallAberrant(data) {
  return request({
    url: "/system/report/member/queryOverallAberrant",
    method: "get",
    params: data,
  });
}

//数据汇总-场馆亏损排行
export function getLobbyLossSort(data) {
  return request({
    url: "/system/report/game/queryLobbyLossSort",
    method: "post",
    data: data,
  });
}

//数据汇总-场馆盈利排行
export function getLobbyWinSort(data) {
  return request({
    url: "/system/report/game/queryLobbyWinSort",
    method: "post",
    data: data,
  });
}

//数据汇总-查询在线人数柱状图
export function getOnLineCount(data) {
  return request({
    url: "/system/report/member/queryOnLineCount",
    method: "get",
    params: data,
  });
}