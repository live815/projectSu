<template>
  <div>
    <div class="login-btn-box" :style="{ width: width, height: height }">
      <button class="login-btn" :class="{ active: active }" :disabled="disable">{{ text }}</button>
    </div>
  </div>
</template>

<script setup>
defineProps(['width', 'height', 'text', 'active', 'disable'])
</script>

<style lang="scss" scoped>
.login-btn-box {
  height: 40px;
  .login-btn {
    width: 100%;
    height: 100%;
    color: var(--40, rgba(255, 255, 255, 0.4));
    font-size: 16px;
    font-weight: 400;
    border: none;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 6px;
  }
  .login-btn.active {
    background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%)) !important;
    color: #fff !important;
  }
  .login-btn:hover {
    cursor: no-drop;
  }
  .active {
    // border: 1px solid var(--unnamed, #ff9000);
    background: var(--1, linear-gradient(90deg, #ff9000 0.17%, #ff5000 101.4%));
    cursor: pointer !important;
  }
}
</style>
