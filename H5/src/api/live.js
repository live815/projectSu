import service from '@/utils/request'

// 查询直播信息列表
export function getLiveList(data) {
    data = data || {}
    return service({
        url: '/api/live/stream/list',
        method: 'post',
        data
    })
}

// 查询直播详情
export function getLiveInfo(params) {
    return service({
        url: `/api/live/stream/getInfo/${params}`,
        method: 'get',
    })
}

// 查询主播信息列表
export function getPresenterList(data) {
    data = data || {}
    return service({
        url: '/api/user/presenter/list',
        method: 'post',
        data
    })
}


// 获取主播详细信息
export function getPresenterInfo(params) {
    return service({
        url: `/api/user/presenter/getInfo/${params}`,
        method: 'get',
    })
}

// 预约直播
export function setReserveLive(data) {
    return service({
        url: '/api/live/relation/save',
        method: 'post',
        data
    })
}

// 查询已预约直播列表
export function getReserveLiveList(params) {
    return service({
        url: `/api/live/relation/list?memberId=${params}`,
        method: 'get',
    })
}

// 取消预约直播
export function cancelReserve(data) {
    return service({
        url: '/api/live/relation/cancel',
        method: 'post',
        data
    })
}

// 赛程列表
export function getMatchListFront(data) {
    data = data || {}
    return service({
        url: '/api/live/video/matchList2',
        method: 'post',
        data
    })
}

// 推单信息列表
export function getPushOrderList(data) {
    data = data || {}
    return service({
        url: '/api/live/push/order/list2',
        method: 'post',
        data
    })
}

// 专家列表
export function getExpertList(data) {
    data = data || {}
    return service({
        url: '/api/live/expert/list',
        method: 'post',
        data
    })
}

// 获取专家信息详细信息
export function getExpertInfo(params) {
    return service({
        url: `/api/live/expert/getInfo/${params}`,
        method: 'get',
    })
}

// 关注专家
export function attentionExpert(data) {
    data = data || {}
    return service({
        url: '/api/live/expert/attention',
        method: 'post',
        data
    })
}

// 取消关注
export function cancelExpert(data) {
    data = data || {}
    return service({
        url: '/api/live/expert/cancel',
        method: 'post',
        data
    })
}

// 查询专家已关注信息列表
export function getAttentionList(data) {
    data = data || {}
    return service({
        url: '/api/live/expert/getAttentionList',
        method: 'post',
        data
    })
}

// 爆料方案列表
export function getPlanList(data) {
    data = data || {}
    return service({
        url: '/api/live/expert/plan/list',
        method: 'post',
        data
    })
}

// 统计爆料浏览量
export function statisticsPlanViews(data) {
    data = data || {}
    return service({
        url: '/api/live/expert/plan/sum/browseNum',
        method: 'post',
        data
    })
}

// 新增推单信息
export function pushOrderSave(data) {
    data = data || []
    return service({
        url: '/api/live/push/order/save',
        method: 'post',
        data
    })
}

// 主播动态列表
export function getDynamicsList(data) {
    data = data || {}
    return service({
        url: '/api/live/presenter/dynamics/list',
        method: 'post',
        data
    })
}

// 给主播动态点赞
export function dynamicLikes(data) {
    data = data || {}
    return service({
        url: '/api/live/presenter/dynamics/attention',
        method: 'post',
        data
    })
}

// 获取用户已点赞主播动态列表
export function getLikesList(data) {
    data = data || {}
    return service({
        url: '/api/live/presenter/dynamics/getLikeList',
        method: 'post',
        data
    })
}

// 取消点赞
export function cancelLikes(data) {
    data = data || {}
    return service({
        url: '/api/live/presenter/dynamics/cancel',
        method: 'post',
        data
    })
}

// 获取主播动态详细信息
export function getDynamicsInfo(params) {
    return service({
        url: `/api/live/presenter/dynamics/getInfo/${params}`,
        method: 'get',
    })
}

// 查询会员观看是否付费
export function getUserLivePayStatus(data) {
    data = data || {}
    return service({
        url: '/api/live/relation/isFee',
        method: 'post',
        data
    })
}

// 直播付费
export function livePay(data) {
    data = data || {}
    return service({
        url: '/api/live/relation/fee',
        method: 'post',
        data
    })
}

// 赛事视频源
export function getSatelliteLiveList(query) {
    return service({
        url: '/api/live/video/videoList',
        method: 'get',
        params: query,
    })
}

// 通过赛事ID实时查询直播中的赛事比分
export function getLiveMatchScore(data) {
    data = data || {}
    return service({
        url: '/api/live/match/score',
        method: 'post',
        data
    })
}

// 直播相关的数据统计
export function liveStatistics(data) {
    data = data || {}
    return service({
        url: '/api/live/statistics/sum',
        method: 'post',
        data
    })
}

// 新增卫星直播统计信息
export function addSatelliteLiveInfo(data) {
    data = data || {}
    return service({
        url: '/api/live/satellite/save',
        method: 'post',
        data
    })
}