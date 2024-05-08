export const upwhiteUser = (data) => {
  return request({
    url: "system/advice/whiteUser/update",
    method: "PUT",
    data,
  });
};
