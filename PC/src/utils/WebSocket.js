import { ref, onMounted, onBeforeUnmount } from 'vue';

const useWebSocket = (url) => {
  const websocket = ref(null);
  const receivedMessage = ref('');
  const isOpen=ref(false)
  const initWebSocket = () => {
    // 创建 WebSocket 连接
    websocket.value = new WebSocket(url);
    // 监听 WebSocket 连接打开事件
    websocket.value.addEventListener('open', (event) => {
      console.log('WebSocket connection opened:', event);
    });
    // 监听 WebSocket 消息事件
    websocket.value.addEventListener('message', (event) => {
      isOpen.value=true
      if(event.data){
        // console.log('123')
        receivedMessage.value = JSON.parse(event.data)
      }else{
        receivedMessage.value=[]
      }
    });
    // 监听 WebSocket 连接关闭事件
    websocket.value.addEventListener('close', (event) => {
      console.log('WebSocket connection closed:', event);
      if(isOpen.value && websocket.value){
        initWebSocket();
      }
    });
    // 监听 WebSocket 错误事件
    websocket.value.addEventListener('error', (event) => {
      console.error('WebSocket error:', event);
    });
  };

  const sendMessage = (message) => {
    if (websocket.value && websocket.value.readyState === WebSocket.OPEN) {
      websocket.value.send(JSON.stringify(message));
    }
  };

  onMounted(() => {
    initWebSocket();
  });

  onBeforeUnmount(() => {
    if (websocket.value) {
      isOpen.value=false
      websocket.value.close();
    }
  }); 

  return { receivedMessage, sendMessage };
};

export default useWebSocket;
