import { ref } from 'vue'

export default function useWebSocket(url, handleNewMessage) {
    const socket = ref(null)
    const isConnected = ref(false)
    const reconnectInterval = 5000
    const heartbeatInterval = 30000
    let reconnectAttempts = 0
    const maxReconnectAttempts = 3
    const shouldReconnect = ref(true) // 重连行为
    let reconnectTimer = null
    let heartbeatTimer = null

    const initWs = () => {
        if (socket.value) {
            socket.value.close()
        }

        socket.value = new WebSocket(url)

        socket.value.onopen = () => {
            console.log('WebSocket connected')
            isConnected.value = true
            reconnectAttempts = 0
            startHeartbeat()
        }

        socket.value.onmessage = (event) => {
            if (handleNewMessage) {
                handleNewMessage(event.data)
            }
        }

        socket.value.onclose = () => {
            console.log('WebSocket 已断开')
            isConnected.value = false
            stopHeartbeat()
            if (shouldReconnect.value && reconnectAttempts < maxReconnectAttempts) {
                reconnect()
            }
        }

        socket.value.onerror = (error) => {
            console.error('WebSocket error:', error)
            socket.value.close()
        }
    }

    const startHeartbeat = () => {
        stopHeartbeat()
        heartbeatTimer = setInterval(() => {
            if (socket.value && socket.value.readyState === WebSocket.OPEN) {
                // 发送心跳消息
                const heartbeatMessage = {
                    businessType: 'ping',
                    businessContent: []
                }
                sendMessage(JSON.stringify(heartbeatMessage))
            }
        }, heartbeatInterval)
    }

    const stopHeartbeat = () => {
        if (heartbeatTimer) {
            clearInterval(heartbeatTimer)
            heartbeatTimer = null
        }
    }

    const reconnect = () => {
        if (reconnectTimer) {
            clearTimeout(reconnectTimer)
        }
        reconnectTimer = setTimeout(() => {
            console.log('正在尝试重新连接...')
            reconnectAttempts++
            initWs()
        }, reconnectInterval)
    }

    const sendMessage = (message) => {
        if (socket.value && isConnected.value) {
            socket.value.send(message)
        } else {
            console.error('WebSocket 未连接')
        }
    }

    const close = () => {
        isConnected.value = false
        shouldReconnect.value = false // 设置标志，避免重连
        stopHeartbeat()
        if (socket.value) {
            socket.value.close()
        }
        if (reconnectTimer) {
            clearTimeout(reconnectTimer)
        }
    }

    return {
        initWs,
        sendMessage,
        close,
    }
}