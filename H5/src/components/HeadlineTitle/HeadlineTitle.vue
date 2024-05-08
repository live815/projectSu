<template>
  <div class="headeline-title">
    <div class="headeline-title-left">
      <div class="headeline-title-left-icon" v-if="isShowIcon"></div>
      <div class="headeline-title-left-text">{{ leftTitle }}</div>
    </div>
    <div class="headeline-title-right" :class="{ 'headeline-title-right-color': styleRgiht }">
      {{ rightTitle }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  // 左侧显示橘黄色图标
  isShowIcon: {
    type: Boolean,
    default: false
  },
  // 左侧文字
  leftTitle: {
    type: String,
    defualt: ''
  },
  // 右侧文字是否蓝色
  styleRgiht: {
    type: Boolean,
    default: false
  },
  // 右侧文字
  rightTitle: {
    type: String,
    defualt: ''
  }
})
</script>
<style lang='scss' scoped>
.headeline-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0 10px 0;

  .headeline-title-left {
    display: flex;
    align-items: center;
    .headeline-title-left-icon {
      width: 4px;
      height: 12px;
      border-radius: 0px 8px 8px 0px;
      background: #ff5000;
      margin-right: 8px;
    }
    .headeline-title-left-text {
      color: var(--gray-1, #111);

      font-size: 16px;
      font-style: normal;
      font-weight: 600;
    }
  }
  .headeline-title-right {
    color: var(--999, #999);

    font-size: 11px;
    font-style: normal;
    font-weight: 400;
  }
  .headeline-title-right-color {
    color: var(--unnamed, var(--unnamed, #486bb2));
  }
}
</style>