import request from "@/utils/request";

// 赛程映射分页查询
export function getScheduleplanList(data) {
  return request({
    url: "system/admin/live/video/mappingList",
    method: "post",
    data: data,
  });
}

// PM数据分页查询
export function getPmList(data) {
  return request({
    url: "system/admin/live/video/resourceList",
    method: "post",
    data: data,
  });
}
// 关联映射数据
export function assoCiatMap(data) {
  return request({
    url: "system/admin/live/video/mapping",
    method: "post",
    data: data,
  });
}
//赛程映射-赛事映射详情 
export function getMppingDetail(id) {
  return request({
    url: `system/admin/live/video/mappingDetail/${id}`,
    method: "get"
  });
}
