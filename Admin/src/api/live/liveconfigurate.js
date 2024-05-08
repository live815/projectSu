import request from "@/utils/request";

// 直播配置
export function setLiveConfigurate(data) {
  return request({
    url: "/system/live/domain/save",
    method: "post",
    data: data,
  });
}
