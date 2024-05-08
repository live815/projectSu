// 公告api
import service from '@/utils/request'

// 获取公告列表
export function getAnnouncementListApi() {
  return service({
    url: `/api/operation/announce/config/queryAnnByMember`,
    method: 'get'
  })
}
// 获取站内信列表
export const getLetterListApi = (data) => {
  return service({
    url: `/api/operation/letter/config/queryLetterConfigSendList`,
    method: 'post',
    data
  })
}

// 获取关于我们/教程一级菜单列表
export const getTutorialListApi = (data) => {
  return service({
    url: `/api/operation/tutorial/config/list`,
    method: 'post',
    data
  })
}

//获取关于我们/教程子菜单列表
export const getTutoriaSublListApi = (data) => {
  return service({
    url: `/api/operation/tutorial/config/listItem`,
    method: 'post',
    data
  })
}

// 提交意见反馈
export const submitAdvice = (data) => {
  return service({
    url: `/api/operation/advice/config/saveAdviceConfig`,
    method: 'post',
    data
  })
}

// 查询教程详细
export const getTutorialDetailApi = (data) => {
  return service({
    url: `/api/operation/tutorial/config/detailItem`,
    method: 'post',
    data
  })
}

// 查询公告详情
export const getannounceDetailApi = (data) => {
  return service({
    url: `/api/operation/announce/config/queryAnnByMemberDetail`,
    method: 'post',
    data
  })
}

// 查询站内信详情
export const getLetterDetailApi = (data) => {
  return service({
    url: `/api/operation/letter/config/queryLetterConfigDetail`,
    method: 'post',
    data
  })
}

// 站内信已读
export const readLetterApi = (data) => {
  return service({
    url: `/api/operation/letter/config/updateLetterStatus`,
    method: 'put',
    data
  })
}

// 站内信删除
export const deleLetterApi = (data) => {
  return service({
    url: `/api/operation/letter/config/deleteLetter`,
    method: 'put',
    data
  })
}

// 获取站内信未读
export const getAllUnreadApi = () => {
  return service({
    url: `/api/operation/letter/config/queryLetterCount`,
    method: 'get'
  })
}

// 站内信各类型的数量
export function getUnreadLetterTypeCountApi() {
  return service({
    url: `/api/operation/letter/config/queryLetterTypeCount`,
    method: 'get'
  })
}

// 批量已读
export const readAllLetterApi = (data) => {
  return service({
    url: `/api/operation/letter/config/updateLetterStatusBatch`,
    method: 'put',
    data
  })
}

// 批量删除
export const deleAllLetterApi = (data) => {
  return service({
    url: `/api/operation/letter/config/deleteLetters`,
    method: 'put',
    data
  })
}
