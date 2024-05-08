import { defineStore } from 'pinia'
import {getRoomConfig} from '@/api/liveBroadcast'

export const useChatRoomStore = defineStore('chatRoom', {
    state: () => ({
        chatRoomConfig: {},
        chatRoomProhibition:[]
    }),
    actions: {
        getChatroomConfig(chatRoomType) {
            // 获取聊天室配置信息
            getRoomConfig({
                chatRoomType
            }).then((res) => {
                this.chatRoomConfig = res.data
            })
        }
    }
})