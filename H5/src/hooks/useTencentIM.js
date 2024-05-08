import TencentCloudChat from '@tencentcloud/chat'
import TIMUploadPlugin from 'tim-upload-plugin'
import TIMProfanityFilterPlugin from 'tim-profanity-filter-plugin'
import { useUserStore } from '@/stores/user.js'
import { nanoid } from 'nanoid'
import { getToken } from '@/utils/cache'
import { useRoute } from 'vue-router'
import { getBanLogList, genTestUserSig } from '@/api/chatroom'
import { useChatroomStore } from '@/stores/chatroom'

let chat = null

export function useTencentIM(handleNewMessage) {
  const route = useRoute()
  const groupName = route.name === 'match-detail' ? 'match' : 'Live'
  // 创建社群必须添加前缀@TGS#_
  const groupID = `@TGS#_${route.query.liveID ? route.query.liveID : route.params.id}`
  // 群主
  let isOwner = false
  const initializeChat = async () => {
    chat = TencentCloudChat.create({
      SDKAppID: import.meta.env.VITE_CHATROOM_SDKAPPID
    })

    chat.setLogLevel(1) // 日志打印级别0开发，1生产
    chat.registerPlugin({ 'tim-upload-plugin': TIMUploadPlugin }) // 注册腾讯云即时通信 IM 上传插件
    chat.registerPlugin({ 'tim-profanity-filter-plugin': TIMProfanityFilterPlugin }) // 注册腾讯云即时通信 IM 本地审核插件

    const user = useUserStore()
    const isLogin = getToken()
    const nanoIds = nanoid()
    const userID = isLogin ? user.userInfo.userName : nanoIds
    await genTestUserSig(userID).then(async (res) => {
      if (res.code === 200) {
        // 登录 IM SDK
        const login = () => {
          return chat.login({
            userID,
            userSig: res.data
          })
        }
        await login()
          .then(function (imResponse) {
            console.log(imResponse.data, 'login success')
            if (imResponse.data.repeatLogin === true) {
              console.log('登录IM失败', imResponse.data.errorInfo)
            }
          })
          .catch(function (imError) {
            console.warn('login fail:', imError)
          })

        // SDK 进入 ready 状态时触发
        const onSdkReady = () => {
          // 先查询是否已经创建群组
          chat
            .searchGroupByID(groupID)
            .then(function () {
              // 查询已加入的群组列表，不在群中调用joinGroup加入群组
              chat.getGroupList().then((res) => {
                const alreadyExists = res.data.groupList.some((item) => item.groupID === groupID)
                if (alreadyExists) {
                  getHistoryMessage() // 获取历史消息
                  const ownerID = res.data.groupList.find((item) => item.groupID === groupID).ownerID
                  isOwner = ownerID === user.userInfo.userName ? true : false
                  return
                } else {
                  chat
                    .joinGroup({
                      groupID,
                      type: TencentCloudChat.TYPES.GRP_COMMUNITY
                    })
                    .then(function (imResponse) {
                      switch (imResponse.data.status) {
                        case TencentCloudChat.TYPES.JOIN_STATUS_SUCCESS: // 加群成功
                          getHistoryMessage() // 获取历史消息

                          break
                        case TencentCloudChat.TYPES.JOIN_STATUS_ALREADY_IN_GROUP: // 已经在群中
                          break
                        default:
                          break
                      }
                    })
                }
              })
            })
            .catch(function () {
              getHistoryMessage()
              // 查询失败，创建群组
              chat
                .createGroup({
                  name: groupName, // 群组名称
                  type: TencentCloudChat.TYPES.GRP_COMMUNITY, // 创建的群组类型，这里是“社群”
                  groupID // 群组ID
                })
                .then(() => {
                  isOwner = true
                })
                .catch(function (imError) {
                  console.log('🚀 ~ 建群失败', imError)
                })
            })
          chat.on(TencentCloudChat.EVENT.MESSAGE_RECEIVED, onMessageReceived)
        }
        chat.on(TencentCloudChat.EVENT.SDK_READY, onSdkReady)
      }
    })
  }

  // 收到消息
  const onMessageReceived = (event) => {
    const messageList = event.data

    // 不是同一个聊天室，不处理新消息
    if (messageList?.[0].to !== groupID) return

    if (Array.isArray(messageList)) {
      messageList.forEach((message) => {
        let messageText = null
        if (message.type === TencentCloudChat.TYPES.MSG_TEXT) {
          messageText = {
            type: 'text',
            content: message.payload.text,
            from: message.from,
            date: message.clientTime,
            cloudCustomData: message.cloudCustomData
          }
          handleNewMessage(messageText)
        } else if (message.type === TencentCloudChat.TYPES.MSG_IMAGE) {
          // 图片消息 - https://web.sdk.qcloud.com/im/doc/v3/zh-cn/Message.html#.ImagePayload
        } else if (message.type === TencentCloudChat.TYPES.MSG_CUSTOM) {
          // 自定义消息 - https://web.sdk.qcloud.com/im/doc/v3/zh-cn/Message.html#.CustomPayload
          messageText = {
            type: 'customize',
            content: message.payload,
            from: message.from,
            date: message.clientTime,
            cloudCustomData: message.cloudCustomData
          }
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
          description: data.description
        },
        cloudCustomData: data.cloudCustomData
      })
    }
    return chat.sendMessage(message)
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
      const chatRoomId = route.query.liveID ? route.query.liveID : route.params.id
      const banListResponse = await getBanLogList({ chatRoomId, pageNum: 1, pageSize: 999 })
      const banList = banListResponse.data?.records.filter((item) => item.banModel === 2)

      // 筛选出列表中相同用户的最新禁言记录
      const filteredData = banList.reduce((acc, current) => {
        if (!acc[current.memberId] || new Date(current.banTime) > new Date(acc[current.memberId].banTime)) {
          // 当acc初始值是一个空对象，或者当前记录的禁言时间更晚，就更新为当前记录
          acc[current.memberId] = current;
        }
        return acc;
      }, {});

      const resultArray = Object.values(filteredData)

      const imResponse = await fetchMessages()
      const historyMessage = imResponse
        .filter((item) => item.from !== '@TIM#SYSTEM') // 过滤掉IM系统消息
        .slice(-100) // 只展示最新一百条记录

      let processedHistoryMessages = historyMessage.map((message) => {
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
      processedHistoryMessages = processedHistoryMessages.filter((message) => {
        const banTime = resultArray.find((item) => item.userName === message.from)?.banTime
        if (banTime) {
          // 如果禁言时间小于消息时间，返回true表示保留这条消息
          return new Date(banTime).getTime() < message.date * 1000
        }
        return true
      })

      // 添加聊天室小助手消息
      const chatStore = useChatroomStore()
      const { tinyAssistant1, tinyAssistant2, tinyAssistant3 } = chatStore.chatroomConfig
      const systemMes = [tinyAssistant1, tinyAssistant2, tinyAssistant3].map((content) => ({
        type: 'system',
        content
      }))
      processedHistoryMessages = [...processedHistoryMessages, ...systemMes]

      // 将筛选后的历史消息上屏
      processedHistoryMessages.forEach((message) => {
        handleNewMessage(message)
      })
    } catch (error) {
      // 处理错误
      console.error('Error in getHistoryMessage:', error)
    }
  }

  const destroy = async () => {
    // 群成员离开聊天室时退出群组
    if (!isOwner) {
      await chat.quitGroup(groupID)
    }
    chat.destroy()  // 销毁 SDK 实例,断开 WebSocket 长连接，并释放资源
    chat = null
  }

  return { onMessageReceived, sendMessage, getHistoryMessage, initializeChat, destroy }
}
