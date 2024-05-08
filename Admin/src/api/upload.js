import request from "@/utils/request";

export function upload(file) {
  const formData = new FormData();
  formData.append("file", file);
  return request({
    url: "/file/tutorial/image/upload",
    method: "post",
    data: formData,
    headers: { "Content-Type": "multipart/mixed" },
  });
}
