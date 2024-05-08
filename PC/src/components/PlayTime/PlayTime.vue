<template>
  <span>{{ formatNum(formattedTime.minutes)}}:{{formatNum(formattedTime.seconds) }}</span>
</template>
  
<script setup>
import { ref, onMounted, onBeforeUnmount} from 'vue';
const props=defineProps(['matchStartTime'])
const elapsedTime=ref(0)
const intervalId=ref()
const formattedTime = computed(() => {
    let minutes = Math.floor(elapsedTime.value / (1000 * 60));
    let seconds = Math.floor((elapsedTime.value / 1000) % 60);
    return { minutes, seconds };
})
const updateElapsedTime = () => {
    const currentTime = Date.now();
    elapsedTime.value = currentTime - props.matchStartTime;
}
onMounted(()=>{
    clearInterval(intervalId.value)
    intervalId.value = setInterval(() => {
        updateElapsedTime()
    }, 1000);
})
onBeforeUnmount(()=>{
    clearInterval(intervalId.value);
})
const formatNum=(num)=>{
  if (num < 10) {
    return '0' + num
  }
  return num
}

</script>

<style lang="scss" scoped>

</style>
  