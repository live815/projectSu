import { defineStore } from 'pinia'
import { getChatroomConfig } from '@/api/chatroom'

export const useChatroomStore = defineStore('chatroom', {
    state: () => ({
        chatroomConfig: {},
        loading: false,
        memberUntie: {}
    }),
    actions: {
        getChatroomConfig(chatRoomType) {
            // 获取聊天室配置信息
            getChatroomConfig({
                chatRoomType
            }).then((res) => {
                this.chatroomConfig = res.data
                this.loading = true
            }).catch(() => {
                this.loading = true
            })
        },
        updateChatroomConfig(newConfig) {
            this.chatroomConfig = newConfig
        },
        updateMemberUntie(newConfig) {
            this.memberUntie = newConfig
        }
    }
})