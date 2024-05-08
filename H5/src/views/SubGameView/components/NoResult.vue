<template>
  <div class="box">
    <img src="../../../assets//img//noList.png" />
    <div class="txt">{{ title }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const props = defineProps(['noTxt'])
const title = ref('')
onMounted(() => {
  console.log(props)
  title.value = props.noTxt
})
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  padding-top: 110px;
  img {
    width: 200px;
    height: 125.644px;
  }
  .txt {
    color: #999;
    text-align: center;

    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    margin-top: 10px;
  }
}
</style>