<template>
  <div class="title-comp-common">
    <div class="header">
      <div class="left">
        <span class="bar-chart"></span>
        <span class="title" :style="{fontWeight: isBold ? '600' : '400'}">{{ title }}</span>
        <span class="add-btn">
          <slot name="add"></slot>
        </span>
      </div>
      <div class="right">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["title","isBold"])
</script>

<style lang="scss" scoped>
.title-comp-common {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    .left {
      display: flex;
      align-items: center;
      .bar-chart {
        display: inline-block;
        width: 15px;
        height: 21px;
        background: #1890ff;
      }
      .title {
        font-size: 18px;
        color: #333333;
        margin-left: 4px;
        margin-right: 12px;
      }
      .add-btn{
        cursor: pointer;
        color:#1890ff;
        font-size:18px;
      }
    }
  }
}
</style>
