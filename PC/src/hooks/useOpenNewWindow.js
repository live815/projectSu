import { ref } from 'vue'

let newWindow = ref(null)
// 打开新窗口并自动处理重复打开新窗口函数
export function useOpenNewWindow() {
  function openNewWindow(url) {
    if (newWindow.value && !newWindow.value.closed) {
      newWindow.value.location.href = url
    } else {
      newWindow.value = window.open(url)
    }
  }

  function closeNewWindow() {
    if(newWindow.value && !newWindow.value.closed) {
      newWindow.value.close()
    }
  }
  
  return { openNewWindow,closeNewWindow }
}