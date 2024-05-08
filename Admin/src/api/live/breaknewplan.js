import request from "@/utils/request";

// 发布爆料
export function createBreakNew(data) {
  return request({
    url: "/system/expert/plan/save",
    method: "post",
    data: data,
  });
}
