import service from '@/utils/request'

// 查询礼物信息列表
export function getGiftList(data) {
    data = data || {}
    return service({
        url: '/api/live/gift/list',
        method: 'post',
        data
    })
}

// 用户送礼物
export function giveGifts(data) {
    data = data || {}
    return service({
        url: '/api/live/gift/profit/save',
        method: 'post',
        data
    })
}

// 聊天室配置信息
export function getChatroomConfig(data) {
    data = data || {}
    return service({
        url: '/api/live/chatroom/config/info',
        method: 'post',
        data
    })
}

// 敏感词列表
export function getSensitiveWordList() {
    return service({
        url: `/api/live/sensitive/word/list`,
        method: 'get',
    })
}

// 新增会员禁言记录
export function addMemberMuteLog(data) {
    data = data || {}
    return service({
        url: '/api/user/banLog/save',
        method: 'post',
        data
    })
}

// 查询用户是否被禁言
export function getUserBanStatus(data) {
    data = data || {}
    return service({
        url: '/api/user/banLog/banInfo',
        method: 'post',
        data
    })
}

// 查询会员禁言记录列表
export function getBanLogList(data) {
    data = data || {}
    return service({
        url: '/api/user/banLog/list',
        method: 'post',
        data
    })
}

// 新增敏感词屏蔽记录
export function addShieldedRecord(data) {
    data = data || {}
    return service({
        url: '/api/live/word/shielded/save',
        method: 'post',
        data
    })
}

// 生成用户登录即时通信IM密码
export function genTestUserSig(userName) {
    return service({
        url: `/api/live/chatroom/getSig/${userName}`,
        method: 'get',
    })
}

// 新增会员跟单信息
export function userFollowOrderSave(data) {
    return service({
        url: '/api/live/follow/order/save',
        method: 'post',
        data
    })
}