<template>
  <div class="item">
    <div class="left">
      <div class="icon">
        <img :src="icon" alt="" />
      </div>
      <div class="text">
        <h3>{{ title }}</h3>
      </div>
    </div>
    <div class="right">
      <SmallBtn @click="$emit('click')">{{ btnText }}</SmallBtn>
    </div>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  btnText: {
    type: String,
    default: ''
  }
})
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    display: flex;
    align-items: center;
    .icon {
      height: 25px;
      width: 25px;
      border-radius: 25px;
      background: var(--color-primary);
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 6px;
      img {
        width: 17px;
        height: 17px;
      }
    }
    .text {
      color: var(--color-text-dark);
    }
  }
  .right{
    
  }
}
</style>
