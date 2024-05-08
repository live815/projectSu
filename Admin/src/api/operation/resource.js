import request from '@/utils/request'
export const getReConfigList = (data) => {
    return request({
      url: '/system/advice/config/list',
      method: 'post',
      data
    })
}
export const getSiteList = (data) => {
    return request({
      url: '/system/advice/site/list',
      method: 'post',
      data
    })
}
export const setSiteSave = (data) => {
    return request({
      url: '/system/advice/site/save',
      method: 'post',
      data
    })
}
export const updateSiteSave = (data) => {
    return request({
      url: '/system/advice/site/update',
      method: 'PUT',
      data
    })
}
export const delSite = (id) => {
    console.log(id,'id')
    return request({
      url: '/system/advice/site/delete/'+id,
      method: 'delete'
    })
}
export const getWhiteListConfig = (data) => {
  return request({
    url: "system/advice/whiteList/list",
    method: "post",
    data,
  });
};
export const delWhite = (id) => {
  return request({
    url: '/system/advice/whiteList/delete/'+id,
    method: 'delete'
  })
}
export const setWhiteListConfig = (data) => {
  return request({
    url: "system/advice/whiteList/save",
    method: "post",
    data,
  });
};
export const upWhiteListConfig = (data) => {
  return request({
    url: "system/advice/whiteList/update",
    method: "PUT",
    data,
  });
};
export const upWhiteStatus = (data) => {
  return request({
    url: "system/advice/whiteList/status",
    method: "PUT",
    data,
  });
};
export const setwhiteUserConfig = (data) => {
  return request({
    url: "system/advice/whiteUser/save",
    method: "post",
    data,
  });
};
export const setwhiteUserList = (data) => {
  return request({
    url: "system/advice/whiteUser/list",
    method: "post",
    data,
  });
};
export const upwhiteUser = (data) => {
  return request({
    url: "system/advice/whiteUser/update",
    method: "PUT",
    data,
  });
};
export const delWhiteUser = (id) => {
  return request({
    url: '/system/advice/whiteUser/delete/'+id,
    method: 'delete'
  })
}
export const upWhiteUserStatus = (data) => {
  return request({
    url: "system/advice/whiteUser/status",
    method: "PUT",
    data,
  });
};
export const getIpAccountCount = () => {
  return request({
    url: '/system/advice/whiteList/queryIpAccountCount',
    method: "get",
  });
};

export const getIpAccountStatus = (id) => {
  return request({
    url: '/system/advice/config/status/'+id,
    method: 'get'
  })
}

export const getMaintainStatus = (data) => {
  return request({
    url: '/system/advice/site/updateStatus',
    method: 'PUT',
    data,
  })
}