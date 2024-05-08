<template>
  <div v-for="item in 10" :key="item" class="skeleton-box" >
    <div></div>
    <div></div>
  </div>
</template>

<script setup>
import {ref} from 'vue'

</script>

<style lang="scss" scoped>

.skeleton-box{
  width: 100%;
  margin-bottom: 5px;
  border-radius: 3px;
  div{
    width: 100%;
    height: 30px;
    background: #1D223C;
    margin-bottom: 5px;
  }
}
</style>