<template>
  <div class="all-support">
    <span class="support-right">&gt;&gt;</span>
    <span class="support-title"><slot /></span>
    <span class="support-right">&lt;&lt;</span>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.all-support {
  text-align: center;
  color: #111;
  line-height: 28px;
  margin-top: 13px;
  .support-title {
    font-weight: 600;
    margin: 0 6px;
    font-size: 15px;
  }
  .support-right {
    font-weight: 600;
    color: #ff5000;
  }
}
</style>
