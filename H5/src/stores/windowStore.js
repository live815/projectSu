import { defineStore } from 'pinia'
import {  setWindowUrl, removeWindowUrl } from '@/utils/cache'


export const useWindowStore = defineStore('window', {
  state: () => ({
    newWindow: null
  }),
  actions: {
    setNewWindow(windowInstance) {
      console.log(windowInstance,11)
      this.newWindow = windowInstance
      setWindowUrl(this.newWindow)
    },
    clearNewWindow() {
      this.newWindow = null
      removeWindowUrl()
    }
  }
})