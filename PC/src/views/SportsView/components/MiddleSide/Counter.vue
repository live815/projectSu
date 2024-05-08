<template>
  <span class="counter">{{ formatNum(minutes) }}:{{ formatNum(seconds) }}</span>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
const props = defineProps({
  // 走表类型
  tp: {
    type: Number,
    default: 1 // 默认正序
  },
  // 秒数
  s: {
    type: Number,
    default: 0
  },
  // 是否走表
  r: {
    type: Boolean,
    default: false
  }
})
const minutes = ref(0)
const seconds = ref(0)
let intervalId = null
watchEffect(() => {
  startTimer()
})

function startTimer() {
  formatTime()
  stopTimer()
  if (props.r && props.s) {
    intervalId = setInterval(() => {
      if (props.tp === 1) {
        seconds.value++
        if (seconds.value === 60) {
          seconds.value = 0
          minutes.value++
        }
      } else {
        seconds.value--
        if (seconds.value === 0) {
          seconds.value = 59
          minutes.value--
        }
      }
    }, 1000)
  }
}
function stopTimer() {
  clearInterval(intervalId)
}
function formatNum(num) {
  if (num < 10) {
    return '0' + num
  }
  return num
}

function formatTime() {
  minutes.value = Math.floor(props.s / 60)
  seconds.value = props.s % 60
}
</script>
