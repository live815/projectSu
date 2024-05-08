import { onBeforeUnmount } from 'vue'
import TencentCloudChat from '@tencentcloud/chat';
import TIMUploadPlugin from 'tim-upload-plugin';
import TIMProfanityFilterPlugin from 'tim-profanity-filter-plugin';
import { useUserStore } from '@/stores/user.js'
import { nanoid } from 'nanoid'
import { useLiveStore } from '@/stores/liveBroadcast'
import { getBanLogList, genTestUserSig } from '@/api/liveBroadcast'
import { useChatRoomStore } from '@/stores/chatRoom'
import router from '@/router'
let chat = null
let groupID = ''
let groupName = ''
export function useTencentIM(handleNewMessage) {
    const liveStore = useLiveStore()
    const user = useUserStore()
    const initUserIm = () => {
        //用户直播间
        groupID = liveStore.liveRoom.id
        groupName = liveStore.roomSportType == 0 ? 'Live' : 'match'
        groupID = `@TGS#_${groupID}`
        //主播直播间
        if (router.currentRoute.value?.path == '/anchorPlay') {
            let anchorDebut = JSON.parse(localStorage.getItem('AnchorDebut'))
            groupID = `@TGS#_${anchorDebut.id}`
            groupName = 'Live'
        }
        if (!chat) {
            chat = TencentCloudChat.create({
                SDKAppID: import.meta.env.VITE_IM_ID
            });
            chat.setLogLevel(1) // 日志打印级别0开发，1生产
            chat.registerPlugin({ 'tim-upload-plugin': TIMUploadPlugin }) // 注册腾讯云即时通信 IM 上传插件
            chat.registerPlugin({ 'tim-profanity-filter-plugin': TIMProfanityFilterPlugin }) // 注册腾讯云即时通信 IM 本地审核插件

            const isLogin = getToken()
            const nanoIds = nanoid()
            const userID = isLogin ? user.userInfo.userName : nanoIds
            genTestUserSig(userID).then((res) => {
                if (res.code === 200) {
                    // 登录 IM SDK
                    const login = () => {
                        return chat.login({
                            userID,
                            userSig: res.data
                        })
                    }
                    login()
                        .then(function (imResponse) {
                            if (imResponse.data.repeatLogin === true) {
                            }
                        })
                        .catch(function (imError) {
                        })
                }
            })

            // SDK 进入 ready 状态时触发
            const onSdkReady = () => {
                // 先查询是否已经创建群组
                chat.searchGroupByID(groupID).then(function () {
                    // 查询成功直接加入该群组
                    // 查询已加入的群组列表，不在群中调用joinGroup加入群组
                    chat.getGroupList().then(res => {
                        const alreadyExists = res.data.groupList.some(item => item.groupID === groupID)
                        if (alreadyExists) {
                            getHistoryMessage()
                            return
                        } else {
                            chat.joinGroup({
                                groupID,
                                type: TencentCloudChat.TYPES.GRP_AVCHATROOM
                            })
                                .then(function (imResponse) {
                                    switch (imResponse.data.status) {
                                        case TencentCloudChat.TYPES.JOIN_STATUS_SUCCESS: // 加群成功
                                            getHistoryMessage() // 获取历史消息
                                            console.log('加群成功')
                                            break;
                                        case TencentCloudChat.TYPES.JOIN_STATUS_ALREADY_IN_GROUP: // 已经在群中
                                            console.log('已经在群中')
                                            break;
                                        default:
                                            break;
                                    }
                                })
                        }

                    })
                }).catch(function () {
                    // 查询失败，创建群组
                    getHistoryMessage() // 获取历史消息
                    chat.createGroup({
                        name: groupName, // 群组名称
                        type: TencentCloudChat.TYPES.GRP_COMMUNITY, // 创建的群组类型，这里是“社群”
                        groupID // 群组ID
                    }).then((imResponse) => {
                        // 创建的群的资料
                    }).catch(function (imError) {
                    })
                })
                chat.on(TencentCloudChat.EVENT.MESSAGE_RECEIVED, onMessageReceived)

            }
            chat.on(TencentCloudChat.EVENT.SDK_READY, onSdkReady)

            // // 登录 IM SDK
            // const login = () => {
            //     return chat.login({
            //         userID: user.userInfo.userName ? user.userInfo.userName : nanoids,
            //         userSig: userSig
            //     })
            // }

            // login()
            //     .then(function (imResponse) {
            //         if (imResponse.data.repeatLogin === true) {
            //         }
            //     })
            //     .catch(function (imError) {
            //     })

        }
    }
    if (router.currentRoute.value?.path == '/anchorPlay') {
        initUserIm()
    }
    // 收到消息
    const onMessageReceived = (event) => {
        const messageList = event.data
        if (messageList?.[0].to !== groupID) return
        if (Array.isArray(messageList)) {
            messageList.forEach((message) => {
                let messageText = null;
                if (message.type === TencentCloudChat.TYPES.MSG_TEXT) {
                    messageText = {
                        type: 'text',
                        content: message.payload.text,
                        from: message.from,
                        date: message.clientTime,
                        cloudCustomData: message.cloudCustomData
                    };
                    handleNewMessage(messageText)
                }
                else if (message.type === TencentCloudChat.TYPES.MSG_IMAGE) {
                    // 图片消息 - https://web.sdk.qcloud.com/im/doc/v3/zh-cn/Message.html#.ImagePayload
                } else if (message.type === TencentCloudChat.TYPES.MSG_CUSTOM) {
                    // 自定义消息 - https://web.sdk.qcloud.com/im/doc/v3/zh-cn/Message.html#.CustomPayload
                    messageText = {
                        type: 'customize',
                        content: message.payload,
                        from: message.from,
                        date: message.clientTime,
                        cloudCustomData: message.cloudCustomData
                    };
                    handleNewMessage(messageText)
                } else if (message.type === TencentCloudChat.TYPES.MSG_GRP_TIP) {
                    // 群提示消息 - https://web.sdk.qcloud.com/im/doc/v3/zh-cn/Message.html#.GroupTipPayload
                } else if (message.type === TencentCloudChat.TYPES.MSG_GRP_SYS_NOTICE) {
                    // 群系统通知 - https://web.sdk.qcloud.com/im/doc/v3/zh-cn/Message.html#.GroupSystemNoticePayload
                }
            })
        }
    }
    // 发送消息
    const sendMessage = (data) => {
        let message = null
        if (data.type === 'text') {
            // 文本消息
            message = chat.createTextMessage({
                to: groupID,
                conversationType: TencentCloudChat.TYPES.CONV_GROUP,
                payload: {
                    text: data.text
                },
                cloudCustomData: data.cloudCustomData
            })
        } else if (data.type === 'customize') {
            // 自定义消息
            message = chat.createCustomMessage({
                to: groupID,
                conversationType: TencentCloudChat.TYPES.CONV_GROUP,
                payload: {
                    data: data.text,
                    description: data.description,
                },
                cloudCustomData: data.cloudCustomData
            });

        }
        return chat.sendMessage(message)
    }




    const destroyIM = async () => {
        if (chat) {
            // chat.logout();
            chat.destroy();  // 销毁 SDK 实例,断开 WebSocket 长连接，并释放资源。
            chat = null;
        }
    }
    const fetchMessages = async () => {
        let combinedResponse = []; // 用于存储合并后的结果
        let nextReqMessageID = null; // 初始时不设置
        let maxTries = 5; // 总共尝试拉取的次数

        for (let i = 0; i < maxTries; i++) {
            // 调用 getMessageList
            const response = await chat.getMessageList({
                conversationID: 'GROUP' + groupID,
                nextReqMessageID
            });

            // 合并消息
            if (response && response.data && response.data.messageList) {
                combinedResponse.unshift(...response.data.messageList);
                nextReqMessageID = response.data.nextReqMessageID; // 准备下一次请求的ID

                // 如果没有更多的消息ID来续拉，则退出循环
                if (!nextReqMessageID) {
                    break;
                }
            } else {
                // 如果响应不是预期的格式，也退出循环
                break;
            }
        }

        return combinedResponse; // 返回合并后的结果
    };
    // 获取历史消息
    const getHistoryMessage = async () => {
        try {
            const chatRoomId = liveStore.liveRoom.id
            const banListResponse = await getBanLogList({ chatRoomId, pageNum: 1, pageSize: 999 })
            const banList = banListResponse.data?.records.filter(item => item.banModel === 2)

            // 筛选出列表中相同用户的最新禁言记录
            const filteredData = banList.reduce((acc, current) => {
                if (!acc[current.memberId] || new Date(current.banTime) > new Date(acc[current.memberId].banTime)) {
                    // 当acc初始值是一个空对象，或者当前记录的禁言时间更晚，就更新为当前记录
                    acc[current.memberId] = current;
                }
                return acc
            }, {})
            const resultArray = Object.values(filteredData);

            const imResponse = await fetchMessages()
            const historyMessage = imResponse
                .filter(item => item.from !== '@TIM#SYSTEM') // 过滤掉IM系统消息
                .slice(-100) // 只展示最新一百条记录

            let processedHistoryMessages = historyMessage.map(message => {
                const type = message.payload.data !== 'text' ? 'customize' : 'text'
                const content = message.payload.description ? message.payload : message.payload.text
                return {
                    type,
                    content,
                    from: message.from,
                    date: message.clientTime,
                    cloudCustomData: message.cloudCustomData,
                    isHistory: true // 禁止播放礼物和滚动到底部
                }
            })

            // 清除禁言时间之前的历史消息
            processedHistoryMessages = processedHistoryMessages.filter(message => {
                const banTime = resultArray.find(item => item.userName === message.from)?.banTime
                if (banTime) {
                    // 如果禁言时间小于消息时间，返回true表示保留这条消息
                    return new Date(banTime).getTime() < message.date * 1000
                }
                return true
            })
            // 添加聊天室小助手消息
            const chatStore = useChatRoomStore()
            const { tinyAssistant1, tinyAssistant2, tinyAssistant3 } = chatStore.chatRoomConfig
            const systemMes = [
                tinyAssistant1, tinyAssistant2, tinyAssistant3
            ].map(content => ({ type: 'system', content }))
            processedHistoryMessages = [...processedHistoryMessages, ...systemMes]
            // 将筛选后的历史消息上屏
            processedHistoryMessages.forEach(message => {
                handleNewMessage(message)
            })
        } catch (e) { }

    }
    //禁言的时候会推出IM
    // onBeforeUnmount(async () => {
    //     if (chat) {
    //         chat.destroy().then(()=>{})
    //         chat = null;
    //     }
    // });
    // watch(
    //     () => liveStore.liveRoom.id,
    //     (newLiveRoom) => {
    //         if (newLiveRoom) {
    //             groupID = liveStore.liveRoom.id
    //             groupName = liveStore.roomSportType == 0 ? 'Live' : 'match'
    //             groupID = `@TGS#_${groupID}`
    //             initUserIm()
    //         }
    //     }
    // )
    // watch(
    //     ()=>liveStore.anchorStatus,
    //     (anchorStatus) => {
    //         if(anchorStatus==1 && user.userInfo.userName){
    //             let anchorDebut=JSON.parse(localStorage.getItem('AnchorDebut'))
    //             groupID =anchorDebut.id.toString()
    //             initUserIm()
    //         }
    //       },
    //     { deep: true }
    // )

    return { onMessageReceived, sendMessage, initUserIm, destroyIM, getHistoryMessage }
}
