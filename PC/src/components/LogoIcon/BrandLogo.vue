<template>
  <img  :src="Cpng" alt="" />
</template>

<script setup>
const appStore = useAppStore()
const Cpng = new URL(`./img/${appStore.language}/brandLogo.png`, import.meta.url).href
</script>

<style lang="scss" scoped></style>
