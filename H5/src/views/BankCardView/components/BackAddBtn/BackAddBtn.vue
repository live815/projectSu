<template>
  <div class="addBtn">
    <img class="addBtn-img" :src="add" />
    <div class="addBtn-title"><slot name="title"></slot></div>
    <div class="addBtn-text"><slot name="text"></slot></div>
  </div>
</template>

<script setup >
import add from './img/add.png'
</script>
<style lang='scss' scoped>
.addBtn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 345px;
  height: 140px;
  border-radius: 10px;
  background: #fff;

  font-style: normal;
  font-weight: 400;
  .addBtn-img {
    width: 40px;
    height: 40px;
  }
  .addBtn-title {
    font-size: 16px;
    color: #111;
    margin: 8px 0;
  }
  .addBtn-text {
    color: #999;
    font-size: 14px;
  }
}
</style>