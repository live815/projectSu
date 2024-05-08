<template>
  <img :src="Cpng" alt="" />
</template>

<script setup>
const appStore = useAppStore()
const Cpng = new URL(`./img/${appStore.language}/logo.png`, import.meta.url).href
</script>

<style lang="scss" scoped></style>
