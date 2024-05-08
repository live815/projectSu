<template>
  <div class="image-slot">
    <brandLogo :style="styleObj" />
    <!-- <Loading /> -->
  </div>
</template>

<script setup>
defineProps({
  styleObj: {
    type: String,
    default: ''
  }
})
</script>

<style lang="scss" scoped>
.image-slot {
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, #DBE5FB, #F9FAFF);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
